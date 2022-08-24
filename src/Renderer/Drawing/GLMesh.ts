import { GLGeom } from './GLGeom'
import '../../SceneTree/Geometry/Mesh'
import { Mesh } from '../../SceneTree/Geometry/Mesh'
import { RenderState } from '../RenderStates/index'
import { WebGL12RenderingContext } from '../types/webgl'
import { genDataTypeDesc } from './GeomShaderBinding'
import { MeshProxy } from '../../SceneTree'

/** Class representing a GL mesh.
 * @extends GLGeom
 * @private
 */
class GLMesh extends GLGeom {
  protected numTriIndices: number = 0
  protected indexDataType: number = 0
  protected numTriangles: number = 0

  /**
   * Create a GL mesh.
   * @param gl - The webgl rendering context.
   * @param mesh - The mesh value.
   */
  constructor(gl: WebGL12RenderingContext, mesh: Mesh | MeshProxy) {
    super(gl, mesh)
  }

  // /////////////////////////////////////
  // Buffers

  /**
   * The genBuffers method.
   */
  genBuffers(renderstate: RenderState): void {
    super.genBuffers(renderstate)

    const gl = this.__gl

    const geomBuffers = this.geom.genBuffers()
    const indices = geomBuffers.indices
    this.numTriIndices = geomBuffers.indices.length
    if (indices instanceof Uint8Array) this.indexDataType = this.__gl.UNSIGNED_BYTE
    if (indices instanceof Uint16Array) this.indexDataType = this.__gl.UNSIGNED_SHORT
    if (indices instanceof Uint32Array) this.indexDataType = this.__gl.UNSIGNED_INT

    this.numVertices = this.geom.getNumVertices()
    this.numTriangles = indices.length / 3

    if (this.__indexBuffer) {
      gl.deleteBuffer(this.__indexBuffer)
    }

    this.__indexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.__indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geomBuffers.indices, gl.STATIC_DRAW)

    // Create some vertex attribute buffers
    // const debugAttrValues = false;
    // let maxIndex;
    // if (debugAttrValues)
    //   maxIndex = Math.max(...indices);

    // eslint-disable-next-line guard-for-in
    for (const attrName in geomBuffers.attrBuffers) {
      const attrData = geomBuffers.attrBuffers[attrName]
      const attrDesc = genDataTypeDesc(gl, attrData.dataType)

      if (this.__glattrbuffers[attrName] && this.__glattrbuffers[attrName].buffer) {
        gl.deleteBuffer(this.__glattrbuffers[attrName].buffer)
      }

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

      if (attrName == 'textureCoords') this.__glattrbuffers['texCoords'] = this.__glattrbuffers['textureCoords']
    }
  }

  /**
   * The updateBuffers method.
   * @param opts - The options object.
   */
  updateBuffers(renderstate: RenderState): void {
    const gl = this.__gl

    if (this.numVertices != this.geom.getNumVertices()) {
      this.genBuffers(renderstate)
      return
    }

    const geomBuffers = this.geom.genBuffers({ includeIndices: false })
    // eslint-disable-next-line guard-for-in
    for (const attrName in geomBuffers.attrBuffers) {
      const attrData = geomBuffers.attrBuffers[attrName]
      const glattr = this.__glattrbuffers[attrName]
      gl.bindBuffer(gl.ARRAY_BUFFER, glattr.buffer)
      gl.bufferData(gl.ARRAY_BUFFER, attrData.values, gl.STATIC_DRAW)
    }
    this.buffersDirty = false
  }

  /**
   * The clearBuffers method.
   */
  clearBuffers(): void {
    const gl = this.__gl
    gl.deleteBuffer(this.__indexBuffer)
    this.__indexBuffer = null

    super.clearBuffers()
  }

  // /////////////////////////////////////
  // Binding

  /**
   * The bind method.
   * @param renderstate - The object tracking the current state of the renderer
   * @return - returns false if the binding failed.
   */
  bind(renderstate: RenderState): void {
    super.bind(renderstate)
    const { geomType } = renderstate.unifs
    if (geomType) this.__gl.uniform1i(geomType.location, 0 /*GeomType.TRIANGLES*/)
  }

  // ////////////////////////////////
  // Regular Drawing.

  /**
   * Draw an item to screen.
   * @param renderstate - The object tracking the current state of the renderer
   */
  draw(renderstate: RenderState): void {
    this.__gl.drawElements(this.__gl.TRIANGLES, this.numTriIndices, this.indexDataType, 0)
  }

  /**
   * The drawInstanced method.
   * @param renderstate - The object tracking the current state of the renderer
   * @param instanceCount - The instanceCount value.
   */
  drawInstanced(renderstate: RenderState, instanceCount: number): void {
    const gl = this.__gl
    gl.drawElementsInstanced(this.__gl.TRIANGLES, this.numTriIndices, this.indexDataType, 0, instanceCount)
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy(): void {
    super.destroy()
    const gl = this.__gl
    gl.deleteBuffer(this.__indexBuffer)
    this.__indexBuffer = null
    // if (this.__wireframesVao)
    //     gl.deleteVertexArray(this.__wireframesVao);
    // if (this.__hardEdgesVao)
    //     gl.deleteVertexArray(this.__hardEdgesVao);
  }
}

export { GLMesh }
