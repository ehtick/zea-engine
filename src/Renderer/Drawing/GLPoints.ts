import { GLGeom } from './GLGeom'
import { generateShaderGeomBinding } from './GeomShaderBinding'
import { WebGL12RenderingContext } from '../types/webgl'
import { RenderState } from '../RenderStates/index'

/** Class representing GL points.
 * @extends GLGeom
 * @private
 */
class GLPoints extends GLGeom {
  /**
   * Create a GL point.
   * @param gl - The webgl rendering context.
   * @param points - The points value.
   */
  constructor(gl: WebGL12RenderingContext, points: any) {
    super(gl, points)
    this.genBuffers()
  }

  /**
   * The genBuffers method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  genBuffers(renderstate?: RenderState): void {
    super.genBuffers(renderstate)

    const gl = this.__gl

    const geomBuffers = this.geom.genBuffers()
    this.numVertices = this.geom.getNumVertices()

    // eslint-disable-next-line guard-for-in
    for (const attrName in geomBuffers.attrBuffers) {
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
  }

  /**
   * The updateBuffers method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  updateBuffers(renderstate?: RenderState): void {
    const gl = this.__gl
    const geomBuffers = this.geom.genBuffers()

    // Update the vertex attribute buffers
    const numVertsChanged = geomBuffers.numVertices != this.numVertices
    if (numVertsChanged) {
      this.clearBuffers()
    }
    // eslint-disable-next-line guard-for-in
    for (const attrName in geomBuffers.attrBuffers) {
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
  }

  /**
   * The bind method.
   * @param renderstate - The object tracking the current state of the renderer
   * @return - The return value.
   */
  bind(renderstate: RenderState): boolean {
    // @ts-ignore
    if (renderstate.shaderAttrBuffers) {
      if (this.buffersDirty) this.updateBuffers()

      let shaderBinding = this.__shaderBindings[renderstate.shaderkey!]
      if (!shaderBinding) {
        // Merge the points attrs with the quad attrs.
        const attrbuffers = Object.assign(this.__glattrbuffers, renderstate.shaderAttrBuffers)

        shaderBinding = generateShaderGeomBinding(
          this.__gl,
          renderstate.attrs,
          attrbuffers,
          renderstate.shaderIndexBuffer
        )
        this.__shaderBindings[renderstate.shaderkey!] = shaderBinding
      }
      shaderBinding.bind(renderstate)
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
    if (renderstate.shaderAttrBuffers) {
      gl.drawElementsInstanced(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0, this.numVertices)
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
