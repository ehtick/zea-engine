import { GLGeom } from './GLGeom'
import { generateShaderGeomBinding } from './GeomShaderBinding'
import { WebGL12RenderingContext } from '../types/webgl'
import { RenderState } from '../RenderStates/index'
import { Vec3 } from '../../Math'
import { GLTexture2D } from '../GLTexture2D'
import { MathFunctions } from '../../Utilities'
import { ColorAttribute, Points } from '../../SceneTree'

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
  protected prevSortCameraPos: Vec3 =  new Vec3()
  protected threshold: number = 0

  /**
   * Create a GL point.
   * @param gl - The webgl rendering context.
   * @param points - The points value.
   */
  constructor(gl: WebGL12RenderingContext, points: Points) {
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
      const colors = this.geom.getVertexAttribute('colors') as ColorAttribute
      if (colors)  {
        stride = 8
        this.pointsAttributesTextureStride = 2
      }
      
      const positions = this.geom.positions
      const sizes = this.geom.getVertexAttribute('sizes')

      const size = MathFunctions.nextPow2(Math.round(Math.sqrt(this.numVertices * this.pointsAttributesTextureStride) + 0.5))
      const data = new Float32Array(size * size * 4)
      for (let i=0; i<positions.getCount(); i++) {
        const pos = positions.getValue(i)
        data[(i * stride) + 0] = pos.x
        data[(i * stride) + 1] = pos.y
        data[(i * stride) + 2] = pos.z
        if (sizes)  data[(i * stride) + 3] = sizes.getFloat32Value(i)
        else data[(i * stride) + 3] = 1.0
        if (colors)  {
          const color = colors.getValue(i)
          data[(i * stride) + 4] = color.r
          data[(i * stride) + 5] = color.g
          data[(i * stride) + 6] = color.g
          data[(i * stride) + 7] = color.a
        }
      }
      this.pointsAttributesTexture = new GLTexture2D(gl,  {
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

      const attrBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, attrBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, attrData.values, gl.STATIC_DRAW)

      this.__glattrbuffers[attrName] = {
        buffer: attrBuffer,
        dataType: attrData.dataType,
        normalized: attrData.normalized,
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
      const colors = this.geom.getVertexAttribute('colors') as ColorAttribute
      if (colors)  {
        stride = 8
        this.pointsAttributesTextureStride = 2
      }
      
      const positions = this.geom.positions
      const sizes = this.geom.getVertexAttribute('sizes')

      const size = MathFunctions.nextPow2(Math.round(Math.sqrt(this.numVertices * this.pointsAttributesTextureStride) + 0.5))
      const data = new Float32Array(size * size * 4)
      for (let i=0; i<positions.getCount(); i++) {
        const pos = positions.getValue(i)
        data[(i * stride) + 0] = pos.x
        data[(i * stride) + 1] = pos.y
        data[(i * stride) + 2] = pos.z
        if (sizes)  data[(i * stride) + 3] = sizes.getFloat32Value(i)
        else data[(i * stride) + 3] = 1.0
        if (colors)  {
          const color = colors.getValue(i)
          data[(i * stride) + 4] = color.r
          data[(i * stride) + 5] = color.g
          data[(i * stride) + 6] = color.g
          data[(i * stride) + 7] = color.a
        }
      }
      this.pointsAttributesTexture.populate(data, size, size)
    }

    // eslint-disable-next-line guard-for-in
    for (const attrName in geomBuffers.attrBuffers) {
      if (!renderstate.attrs[attrName]) continue
      const attrData = geomBuffers.attrBuffers[attrName]
      if (!this.__glattrbuffers[attrName]) {
        this.__glattrbuffers[attrName] = {
          buffer: gl.createBuffer(),
          dataType: attrData.dataType,
          normalized: attrData.normalized,
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
    const positions = this.geom.positions
    this.distances = new Float32Array(positions.getCount())
    
    let bufferSizeChanged = false
    if (this.indexArray.length != this.distances.length) {
      this.indexArray = new Int32Array(this.distances.length)
      bufferSizeChanged = true
    }
    for (let i=0; i<positions.getCount(); i++) {
      const pos = positions.getValue(i)
      this.distances[i] = pos.distanceTo(cameraPos)
      this.indexArray[i] = i
    }
    this.indexArray.sort((a: number, b: number) => {
      return this.distances[a] > this.distances[b] ? -1 : 1
    })

    const gl = this.__gl!
    if (!this.__glattrbuffers['drawIndices']) {
      this.__glattrbuffers['drawIndices'] = {
        buffer: gl.createBuffer(),
        dataType: 'SInt32',
        normalized: false,
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
        const positions = this.geom.positions
        if (positions.getCount() > 1) {
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
// GLPoints;
