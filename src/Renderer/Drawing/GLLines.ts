import { Vec3 } from '../../Math/index'
import { GLGeom } from './GLGeom'
import { genDataTypeDesc, generateShaderGeomBinding } from './GeomShaderBinding'
import { GLTexture2D } from '../GLTexture2D'
import { Lines, LinesProxy } from '../../SceneTree'
import { RenderState } from '../RenderStates/index'
import { WebGL12RenderingContext } from '../types/webgl'
import { GLAttrBuffer } from '../types/renderer'

interface FatBuffers {
  drawCount: number
  positionsTexture: GLTexture2D | null
  glattrbuffers: Record<string, GLAttrBuffer>
}
/** Class representing GL lines.
 * @extends GLGeom
 * @private
 */
class GLLines extends GLGeom {
  protected numSegIndices: number = 0
  protected __fatBuffersNeedUpload: boolean = false
  protected fatBuffers: FatBuffers | null = null
  protected __buffersNeedUpload: boolean = false
  protected indexDataType: number = 0
  /**
   * Create a GL line.
   * @param gl - The webgl rendering context.
   * @param lines - The geom value.
   */
  constructor(gl: WebGL12RenderingContext, lines: Lines | LinesProxy) {
    super(gl, lines)

    this.numSegIndices = 0
    this.numVertices = 0
    this.__fatBuffersNeedUpload = true
  }

  /**
   * The dirtyBuffers method.
   * @param opts - options passed when geomDataChanged is emitted. (Currently ony used by the FreehandLines tool)
   */
  dirtyBuffers(opts: Record<string, any>): void {
    super.dirtyBuffers(opts)
    this.__fatBuffersNeedUpload = true
    this.emit('updated')
  }

  /**
   * The clearBuffers method.
   */
  clearBuffers(): void {
    const gl = this.__gl
    gl.deleteBuffer(this.__indexBuffer)
    this.__indexBuffer = null

    if (this.fatBuffers && this.fatBuffers.positionsTexture) {
      if (this.fatBuffers.positionsTexture) {
        this.fatBuffers.positionsTexture.destroy()
        this.fatBuffers.positionsTexture = null
      }
      const segmentIndices = this.fatBuffers.glattrbuffers.segmentIndices!
      if (segmentIndices.buffer) {
        gl.deleteBuffer(segmentIndices.buffer)
        this.fatBuffers.glattrbuffers.segmentIndices = null
      }
    }

    super.clearBuffers()
  }

  /**
   * The genFatBuffers method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  genFatBuffers(renderstate: RenderState): void {
    // if (!(this.geom instanceof Lines)
    const gl = this.__gl

    this.numVertices = this.geom.getNumVertices()
    const geomBuffers = this.geom.genBuffers()
    const indices = geomBuffers.indices
    const numVertsChanged = geomBuffers.numVertices != this.numVertices

    if (!gl.__quadVertexIdsBuffer) {
      gl.setupInstancedQuad()
    }
    if (!this.fatBuffers) {
      this.fatBuffers = { drawCount: 0, positionsTexture: null, glattrbuffers: {} }
      this.fatBuffers.glattrbuffers.vertexIDs = gl.__quadattrbuffers.vertexIDs
    }

    const unit = renderstate.boundTextures++
    gl.activeTexture(this.__gl.TEXTURE0 + unit)

    this.fatBuffers.drawCount = indices.length / 2

    const positions = geomBuffers.attrBuffers.positions
    const lineThicknessAttr = geomBuffers.attrBuffers.lineThickness

    const stride = 4 // The number of floats per draw item.
    const dataArray = new Float32Array(positions.count * stride)
    for (let i = 0; i < positions.count; i++) {
      dataArray.set(positions.values.subarray(i * 3, (i + 1) * 3), i * 4)

      // The thickness of the line.
      if (lineThicknessAttr) dataArray[i * 4 + 3] = lineThicknessAttr.values[i]
      else dataArray[i * 4 + 3] = 1.0
    }

    if (numVertsChanged && this.fatBuffers.positionsTexture) {
      this.fatBuffers.positionsTexture.destroy()
      this.fatBuffers.positionsTexture = null
    }
    if (!this.fatBuffers.positionsTexture) {
      this.fatBuffers.positionsTexture = new GLTexture2D(this.__gl, {
        format: 'RGBA',
        type: 'FLOAT',
        width: positions.count,
        /* each pixel has 4 floats*/
        height: 1,
        filter: 'NEAREST',
        wrap: 'CLAMP_TO_EDGE',
        data: dataArray,
        mipMapped: false,
      })
    } else {
      this.fatBuffers.positionsTexture.bufferData(dataArray, positions.count, 1)
    }

    const makeIndices = (): Float32Array => {
      const indexArray = new Float32Array(indices.length)
      for (let i = 0; i < indices.length; i++) {
        let seqentialIndex
        if (i % 2 == 0) {
          seqentialIndex = i > 0 ? indices[i] == indices[i - 1] : indices[i] == indices[indices.length - 1]
        } else {
          seqentialIndex = i < indices.length - 1 ? indices[i] == indices[i + 1] : indices[i] == indices[0]
        }
        // encode the flag into the indices values.
        // this flag is decoded in GLSL.
        indexArray[i] = (seqentialIndex ? 1 : 0) + indices[i] * 2
      }
      return indexArray
    }

    if (!this.fatBuffers.glattrbuffers.segmentIndices) {
      const indexBuffer = gl.createBuffer()!
      gl.bindBuffer(gl.ARRAY_BUFFER, indexBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, makeIndices(), gl.STATIC_DRAW)

      this.fatBuffers.glattrbuffers.segmentIndices = {
        dataType: gl.FLOAT,
        name: 'segmentIndices',
        dimension: 2,
        elementSize: 4,
        normalized: false,
        shared: false,
        numValues: indices.length,
        buffer: indexBuffer,
      }
    } else {
      if (!this.genBufferOpts || (this.genBufferOpts && this.genBufferOpts.topologyChanged)) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.fatBuffers.glattrbuffers.segmentIndices.buffer)
        gl.bufferData(gl.ARRAY_BUFFER, makeIndices(), gl.STATIC_DRAW)
      }
    }
    this.numSegIndices = indices.length
    this.numVertices = geomBuffers.numVertices

    gl.bindTexture(gl.TEXTURE_2D, null)
    renderstate.boundTextures--

    this.__fatBuffersNeedUpload = false
  }

  /**
   * The genBuffers method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  genBuffers(renderstate: RenderState): void {
    const gl = this.__gl

    const geomBuffers = this.geom.genBuffers()
    const indices = geomBuffers.indices
    const numVertsChanged = geomBuffers.numVertices != this.numVertices
    {
      if (!this.__indexBuffer) {
        this.__indexBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.__indexBuffer)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)
      } else {
        // Note: the topology can change without the number of vertices changing
        // and vice versa.
        if (!this.genBufferOpts || (this.genBufferOpts && this.genBufferOpts.topologyChanged)) {
          if (this.numSegIndices != indices.length) {
            gl.deleteBuffer(this.__indexBuffer)
            this.__indexBuffer = gl.createBuffer()
          }
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.__indexBuffer)
          gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)
          this.numSegIndices = indices.length
        }
      }

      // eslint-disable-next-line guard-for-in
      for (const attrName in geomBuffers.attrBuffers) {
        const attrData = geomBuffers.attrBuffers[attrName]
        const attrDesc = genDataTypeDesc(gl, attrData.dataType)
        if (!this.__glattrbuffers[attrName]) {
          const attrBuffer = gl.createBuffer()
          gl.bindBuffer(gl.ARRAY_BUFFER, attrBuffer)
          gl.bufferData(gl.ARRAY_BUFFER, attrData.values, gl.STATIC_DRAW)

          this.__glattrbuffers[attrName] = {
            dataType: attrDesc.dataType,
            name: attrName,
            dimension: attrData.dimension,
            elementSize: attrDesc.elementSize,
            normalized: false,
            shared: false,
            numValues: attrData.count,
            buffer: attrBuffer,
          }
        } else {
          const glattr = this.__glattrbuffers[attrName]
          if (numVertsChanged) {
            gl.deleteBuffer(glattr.buffer)
            glattr.buffer = gl.createBuffer()
          }
          gl.bindBuffer(gl.ARRAY_BUFFER, glattr.buffer)
          gl.bufferData(gl.ARRAY_BUFFER, attrData.values, gl.STATIC_DRAW)
        }
      }

      // Cache the size so we know later if it changed
      this.numSegIndices = indices.length
      this.numVertices = geomBuffers.numVertices
      this.__buffersNeedUpload = false
    }

    if (indices instanceof Uint8Array) this.indexDataType = this.__gl.UNSIGNED_BYTE
    if (indices instanceof Uint16Array) this.indexDataType = this.__gl.UNSIGNED_SHORT
    if (indices instanceof Uint32Array) this.indexDataType = this.__gl.UNSIGNED_INT
  }

  /**
   * The bind method.
   * @param renderstate - The object tracking the current state of the renderer
   * @return - The return value.
   */
  bind(renderstate: RenderState): boolean {
    const gl = this.__gl
    const unifs = renderstate.unifs

    const { LineThickness, geomType } = renderstate.unifs
    if (geomType) this.__gl.uniform1i(geomType.location, 1 /*GeomType.LINES*/)

    if (LineThickness && gl.floatTexturesSupported) {
      if (this.__fatBuffersNeedUpload) this.genFatBuffers(renderstate) // (renderstate, true)

      const fatBuffers = this.fatBuffers!
      let shaderBinding = this.__shaderBindings[renderstate.shaderkey!]
      if (!shaderBinding) {
        shaderBinding = generateShaderGeomBinding(
          this.__gl,
          renderstate.attrs,
          fatBuffers.glattrbuffers,
          gl.__quadIndexBuffer
        )
        this.__shaderBindings[renderstate.shaderkey!] = shaderBinding
      }
      shaderBinding.bind(renderstate)

      const usePositionsTexture = true
      if (usePositionsTexture) {
        if (unifs.positionsTexture) {
          fatBuffers.positionsTexture!.bindToUniform(renderstate, unifs.positionsTexture)
          gl.uniform1i(unifs.positionsTextureSize.location, fatBuffers.positionsTexture!.width)
        }
      }

      return true
    } else {
      super.bind(renderstate)
      return true
    }
  }

  // ////////////////////////////////
  // Drawing Lines Points.

  /**
   * The drawPoints method.
   */
  drawPoints(): void {
    this.__gl.drawArrays(this.__gl.POINTS, 0, this.geom.getNumVertices())
  }

  // ////////////////////////////////
  // Regular Drawing.

  /**
   * The draw method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  draw(renderstate: RenderState): void {
    const gl = this.__gl
    if (renderstate.unifs.LineThickness && gl.floatTexturesSupported) {
      gl.drawElementsInstanced(gl.TRIANGLES, 6, gl.UNSIGNED_BYTE, 0, this.fatBuffers!.drawCount)

      // Note: We don't have a solution for drawing fat lines to the geom data buffer.
    } else {
      gl.drawElements(this.__gl.LINES, this.numSegIndices, this.indexDataType, 0)
    }
  }

  /**
   * The drawInstanced method.
   * @param renderstate - The object tracking the current state of the renderer
   * @param instanceCount - The instanceCount value.
   */
  drawInstanced(renderstate: RenderState, instanceCount: number): void {
    const gl = this.__gl
    const { occluded } = renderstate.unifs
    if (occluded) {
      gl.uniform1i(occluded.location, 0)
    }
    gl.drawElementsInstanced(this.__gl.LINES, this.numSegIndices, this.indexDataType, 0, instanceCount)

    if (occluded) {
      gl.uniform1i(occluded.location, 1)
      gl.depthFunc(gl.GREATER)
      gl.drawElementsInstanced(this.__gl.LINES, this.numSegIndices, this.indexDataType, 0, instanceCount)
      gl.depthFunc(gl.LEQUAL)
    }
  }
}

export { GLLines }
