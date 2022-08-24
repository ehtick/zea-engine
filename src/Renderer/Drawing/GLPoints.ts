import { GLGeom } from './GLGeom'
import { genDataTypeDesc, generateShaderGeomBinding } from './GeomShaderBinding'
import { WebGL12RenderingContext } from '../types/webgl'
import { RenderState } from '../RenderStates/index'
import { Vec3 } from '../../Math'
import { GLTexture2D } from '../GLTexture2D'
import { MathFunctions } from '../../Utilities'
import { ColorAttribute, Points, PointsProxy } from '../../SceneTree'

/** Class representing GL points.
 * @extends GLGeom
 * @private
 */
class GLPoints extends GLGeom {
  protected indexArray: Int32Array = new Int32Array(0)
  protected distances: Float32Array = new Float32Array(0)
  protected drawIndexBuffer: WebGLBuffer | null = null
  protected pointsAttributesTexture: GLTexture2D | null = null
  protected pointsAttributesTextureStride: number = 1
  protected prevSortCameraPos: Vec3 = new Vec3()
  protected threshold: number = 0
  /**
   * Create a GL point.
   * @param gl - The webgl rendering context.
   * @param points - The points value.
   */
  constructor(gl: WebGL12RenderingContext, points: Points | PointsProxy) {
    super(gl, points)
  }

  /**
   * The genBuffers method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  genBuffers(renderstate: RenderState): void {
    super.genBuffers(renderstate)

    const gl = this.__gl

    const geomBuffers = this.geom.genBuffers()
    this.numVertices = this.geom.getNumVertices()

    if (!renderstate.attrs.positions && renderstate.unifs.pointsAttributes) {
      let stride = 4
      this.pointsAttributesTextureStride = 1
      const positions = geomBuffers.attrBuffers.positions
      const colors = geomBuffers.attrBuffers.colors
      const sizes = geomBuffers.attrBuffers.sizes
      if (colors) {
        stride = 8
        this.pointsAttributesTextureStride = 2
      }

      const size = MathFunctions.nextPow2(
        Math.round(Math.sqrt(this.numVertices * this.pointsAttributesTextureStride) + 0.5)
      )
      const data = new Float32Array(size * size * 4)
      for (let i = 0; i < positions.count; i++) {
        data.set(positions.values.subarray(i * 3, (i + 1) * 3), i * stride)
        if (sizes) data[i * stride + 3] = sizes.values[i]
        else data[i * stride + 3] = 1.0
        if (colors) {
          data.set(colors.values.subarray(i * 4, (i + 1) * 4), i * stride + 4)
        }
      }
      this.pointsAttributesTexture = new GLTexture2D(gl, {
        format: 'RGBA',
        type: 'FLOAT',
        width: size,
        height: size,
        data,
        filter: 'NEAREST',
        wrap: 'CLAMP_TO_EDGE',
        mipMapped: false,
      })
    }

    // eslint-disable-next-line guard-for-in
    for (const attrName in geomBuffers.attrBuffers) {
      if (!renderstate.attrs[attrName]) continue

      const attrData = geomBuffers.attrBuffers[attrName]
      const attrDesc = genDataTypeDesc(gl, attrData.dataType)

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
    }

    this.numVertices = geomBuffers.numVertices
    this.threshold = 0
  }

  /**
   * The updateBuffers method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  updateBuffers(renderstate: RenderState): void {
    if (this.numVertices != this.geom.getNumVertices()) {
      this.genBuffers(renderstate)
      return
    }

    const gl = this.__gl
    const geomBuffers = this.geom.genBuffers()

    // Update the vertex attribute buffers
    const numVertsChanged = geomBuffers.numVertices != this.numVertices
    if (numVertsChanged) {
      this.clearBuffers()
    }
    if (!renderstate.attrs.positions && renderstate.unifs.pointsAttributes) {
      // Only support power 2 textures. Else we get strange corruption on some GPUs
      // in some scenes.

      let stride = 4
      this.pointsAttributesTextureStride = 1
      const positions = geomBuffers.attrBuffers.positions
      const sizes = geomBuffers.attrBuffers.sizes
      const colors = geomBuffers.attrBuffers.colors
      if (colors) {
        stride = 8
        this.pointsAttributesTextureStride = 2
      }

      const size = MathFunctions.nextPow2(
        Math.round(Math.sqrt(this.numVertices * this.pointsAttributesTextureStride) + 0.5)
      )
      const data = new Float32Array(size * size * 4)
      for (let i = 0; i < positions.count; i++) {
        data.set(positions.values.subarray(i * 3, (i + 1) * 3), i * stride)
        if (sizes) data[i * stride + 3] = sizes.values[i]
        else data[i * stride + 3] = 1.0
        if (colors) {
          data.set(colors.values.subarray(i * 4, (i + 1) * 4), i * stride + 4)
        }
      }
      this.pointsAttributesTexture.populate(data, size, size)
    }

    // eslint-disable-next-line guard-for-in
    for (const attrName in geomBuffers.attrBuffers) {
      if (!renderstate.attrs[attrName]) continue
      const attrData = geomBuffers.attrBuffers[attrName]
      const attrDesc = genDataTypeDesc(gl, attrData.dataType)
      if (!this.__glattrbuffers[attrName]) {
        this.__glattrbuffers[attrName] = {
          name: attrName,
          dimension: attrData.dimension,
          elementSize: attrDesc.elementSize,
          buffer: gl.createBuffer(),
          dataType: attrDesc.dataType,
          normalized: attrData.normalized,
          shared: false,
          numValues: attrData.count,
        }
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, this.__glattrbuffers[attrName].buffer)
      gl.bufferData(gl.ARRAY_BUFFER, attrData.values, gl.STATIC_DRAW)
    }

    // Cache the size so we know later if it changed (see below)
    this.numVertices = geomBuffers.numVertices
    this.buffersDirty = false
    this.threshold = 0
  }

  /**
   * The sort method.
   * @param cameraPos - The cameraPos value.
   */
  sort(cameraPos: Vec3): void {
    const geomBuffers = this.geom.genBuffers()
    const positions = geomBuffers.attrBuffers.positions
    this.distances = new Float32Array(positions.count)

    let bufferSizeChanged = false
    if (this.indexArray.length != this.distances.length) {
      this.indexArray = new Int32Array(this.distances.length)
      bufferSizeChanged = true
    }
    for (let i = 0; i < positions.count; i++) {
      const pos = new Vec3(positions.values[i * 3], positions.values[i * 3 + 1], positions.values[i * 3 + 2])
      this.distances[i] = pos.distanceTo(cameraPos)
      this.indexArray[i] = i
    }
    this.indexArray.sort((a: number, b: number) => {
      return this.distances[a] > this.distances[b] ? -1 : 1
    })

    const gl = this.__gl!
    if (!this.__glattrbuffers['drawIndices']) {
      this.__glattrbuffers['drawIndices'] = {
        name: 'drawIndices',
        dimension: 1,
        elementSize: 4,
        buffer: gl.createBuffer(),
        dataType: gl.INT,
        normalized: false,
        shared: false,
        numValues: positions.count,
      }
    } else if (bufferSizeChanged) {
      if (this.drawIndexBuffer) gl.deleteBuffer(this.__glattrbuffers.drawIndices.buffer)
      this.__glattrbuffers.drawIndices.buffer = gl.createBuffer()
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, this.__glattrbuffers.drawIndices.buffer)
    gl.bufferData(gl.ARRAY_BUFFER, this.indexArray, gl.STATIC_DRAW)
  }

  /**
   * The bind method.
   * @param renderstate - The object tracking the current state of the renderer
   * @return - The return value.
   */
  bind(renderstate: RenderState): boolean {
    if (renderstate.attrs.drawIndices) {
      const cameraPos = renderstate.viewXfo.tr
      const dist = cameraPos.distanceTo(this.prevSortCameraPos)
      // Avoid sorting if the camera did not move more than 3 meters.
      if (dist > this.threshold) {
        this.sort(cameraPos)
        this.prevSortCameraPos = cameraPos.clone()
        if (this.distances.length > 1) {
          const idx0 = this.indexArray[this.indexArray.length - 1]
          const dist0 = this.distances[idx0]
          this.threshold = dist0 * 0.25
        } else {
          this.threshold = 9999
        }
      }
    }

    // @ts-ignore
    if (renderstate.shaderInstancedGeom) {
      if (this.buffersDirty) this.updateBuffers(renderstate)

      let shaderBinding = this.__shaderBindings[renderstate.shaderkey!]
      if (!shaderBinding) {
        // Merge the points attrs with the quad attrs.
        const attrbuffers = Object.assign(this.__glattrbuffers, renderstate.shaderInstancedGeom.attrBuffers)

        shaderBinding = generateShaderGeomBinding(
          this.__gl,
          renderstate.attrs,
          attrbuffers,
          renderstate.shaderInstancedGeom.indexBuffer
        )
        this.__shaderBindings[renderstate.shaderkey!] = shaderBinding
      }
      shaderBinding.bind(renderstate)

      const { pointsAttributes, pointsAttributesStride } = renderstate.unifs
      if (pointsAttributes) {
        this.pointsAttributesTexture.bindToUniform(renderstate, pointsAttributes)
        this.__gl!.uniform1i(pointsAttributesStride.location, this.pointsAttributesTextureStride)
      }
      const { geomType } = renderstate.unifs
      if (geomType) this.__gl.uniform1i(geomType.location, 2 /*GeomType.POINTS*/)

      return true
    } else {
      super.bind(renderstate)
      return true
    }
  }

  /**
   * The draw method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  draw(renderstate: RenderState): void {
    const gl = this.__gl
    // @ts-ignore
    if (renderstate.shaderInstancedGeom) {
      gl.drawElementsInstanced(
        gl.TRIANGLES,
        renderstate.shaderInstancedGeom.numTriIndices,
        renderstate.shaderInstancedGeom.indexDataType,
        0,
        this.numVertices
      )
    } else {
      gl.drawArrays(gl.POINTS, 0, this.numVertices)
    }
  }

  /**
   * The drawInstanced method.
   * @param renderstate - The object tracking the current state of the renderer
   * @param instanceCount - The instanceCount value.
   */
  drawInstanced(renderstate: RenderState, instanceCount: number): void {
    const gl = this.__gl
    gl.drawArraysInstanced(this.__gl.POINTS, 0, this.numVertices, instanceCount)
  }
}
export { GLPoints }
