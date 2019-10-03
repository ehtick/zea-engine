import { GLGeom } from './GLGeom.js'
import '../SceneTree/Geometry/Mesh.js'

/** Class representing a GL mesh.
 * @extends GLGeom
 */
class GLMesh extends GLGeom {
  /**
   * Create a GL mesh.
   * @param {any} gl - The gl value.
   * @param {any} mesh - The mesh value.
   */
  constructor(gl, mesh) {
    super(gl, mesh)
    this.genBuffers()
  }

  /**
   * The getNumTriangles method.
   * @return {any} - The return value.
   */
  getNumTriangles() {
    return this.__numTriangles
  }

  // /////////////////////////////////////
  // Buffers

  /**
   * The genBuffers method.
   */
  genBuffers() {
    super.genBuffers()

    const gl = this.__gl

    const geomBuffers = this.__geom.genBuffers()
    const indices = geomBuffers.indices
    this.__numTriIndices = geomBuffers.indices.length
    if (indices instanceof Uint8Array)
      this.__indexDataType = this.__gl.UNSIGNED_BYTE
    if (indices instanceof Uint16Array)
      this.__indexDataType = this.__gl.UNSIGNED_SHORT
    if (indices instanceof Uint32Array)
      this.__indexDataType = this.__gl.UNSIGNED_INT

    this.__numTriangles = indices.length / 3
    this.__numRenderVerts = geomBuffers.numRenderVerts

    this.__indexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.__indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geomBuffers.indices, gl.STATIC_DRAW)

    // Create some vertex attribute buffers
    // const debugAttrValues = false;
    // let maxIndex;
    // if (debugAttrValues)
    //   maxIndex = Math.max(...indices);
    for (const attrName in geomBuffers.attrBuffers) {
      const attrData = geomBuffers.attrBuffers[attrName]

      const attrBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, attrBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, attrData.values, gl.STATIC_DRAW)

      this.__glattrbuffers[attrName] = {
        buffer: attrBuffer,
        dimension: attrData.dimension,
        normalized: attrData.normalized,
      }

      if (attrName == 'textureCoords')
        this.__glattrbuffers['texCoords'] = this.__glattrbuffers[
          'textureCoords'
        ]
    }
  }

  /**
   * The updateBuffers method.
   * @param {any} opts - The opts param.
   */
  updateBuffers(opts) {
    const gl = this.__gl

    const geomBuffers = this.__geom.genBuffers({ includeIndices: false })
    for (const attrName in geomBuffers.attrBuffers) {
      const attrData = geomBuffers.attrBuffers[attrName]
      const glattr = this.__glattrbuffers[attrName]
      gl.bindBuffer(gl.ARRAY_BUFFER, glattr.buffer)
      gl.bufferData(gl.ARRAY_BUFFER, attrData.values, gl.STATIC_DRAW)
    }
  }

  /**
   * The getNumUnSplitVerts method.
   * @return {any} - The return value.
   */
  getNumUnSplitVerts() {
    return this.__geom.vertices.length
  }

  /**
   * The getNumSplitVerts method.
   * @return {any} - The return value.
   */
  getNumSplitVerts() {
    return this.__numRenderVerts
  }

  // ////////////////////////////////
  // Wireframes

  /**
   * The generateWireframesVAO method.
   * @return {any} - The return value.
   */
  generateWireframesVAO() {
    if (!this.__vao) return false

    if (!this.__geom.edgeVerts) this.__geom.genTopologyInfo()

    // generate the wireframes VAO.
    // It can share buffers with the regular VAO, but provide a different index buffer.
    if (this.__wireframesVao)
      this.__ext.deleteVertexArrayOES(this.__wireframesVao)
    this.__wireframesVao = this.__ext.createVertexArrayOES()
    this.__ext.bindVertexArrayOES(this.__wireframesVao)

    const gl = this.__gl
    const wireframeIndexBuffer = gl.createBuffer()
    const wireframeIndices = Uint32Array.from(this.__geom.edgeVerts)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, wireframeIndexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, wireframeIndices, gl.STATIC_DRAW)

    const positionsBuffer = this.__glattrbuffers['positions'].buffer
    gl.enableVertexAttribArray(0)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionsBuffer)
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 3 * 4, 0)

    this.__numWireIndices = wireframeIndices.length
    this.__ext.bindVertexArrayOES(null) // Note: is this necessary?
  }

  /**
   * The bindWireframeVAO method.
   * @param {any} renderstate - The renderstate param.
   * @return {any} - The return value.
   */
  bindWireframeVAO(renderstate) {
    if (this.__wireframesVao == undefined) return false
    this.__ext.bindVertexArrayOES(this.__wireframesVao)
    return true
  }

  /**
   * The unbindWireframeVAO method.
   */
  unbindWireframeVAO() {
    this.__ext.bindVertexArrayOES(null) // Note: is this necessary?
  }

  /**
   * Draw an item to screen.
   */
  drawWireframe() {
    if (this.__wireframesVao)
      this.__gl.drawElements(
        this.__gl.LINES,
        this.__numWireIndices,
        this.__gl.UNSIGNED_INT,
        0
      )
  }

  // ////////////////////////////////
  // Hard Edges

  /**
   * The generateHardEdgesVAO method.
   * @return {any} - The return value.
   */
  generateHardEdgesVAO() {
    if (!this.__vao) return false

    if (!this.__geom.edgeVerts) this.__geom.generateHardEdgesFlags()

    // generate the wireframes VAO.
    // It can share buffers with the regular VAO, but provide a different index buffer.
    if (this.__hardEdgesVao)
      this.__ext.deleteVertexArrayOES(this.__hardEdgesVao)
    this.__hardEdgesVao = this.__ext.createVertexArrayOES()
    this.__ext.bindVertexArrayOES(this.__hardEdgesVao)

    const gl = this.__gl
    const hardEdgeIndexBuffer = gl.createBuffer()
    const hardEdgeIndices = Uint32Array.from(
      this.__geom.computeHardEdgesIndices()
    )
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, hardEdgeIndexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, hardEdgeIndices, gl.STATIC_DRAW)

    const positionsBuffer = this.__glattrbuffers['positions'].buffer
    gl.enableVertexAttribArray(0)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionsBuffer)
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 3 * 4, 0)

    this.__numEdgeIndices = hardEdgeIndices.length
    this.__ext.bindVertexArrayOES(null) // Note: is this necessary?
  }

  /**
   * The bindHardEdgesVAO method.
   * @param {any} renderstate - The renderstate param.
   * @return {any} - The return value.
   */
  bindHardEdgesVAO(renderstate) {
    if (this.__hardEdgesVao == undefined) return false
    this.__ext.bindVertexArrayOES(this.__hardEdgesVao)
    return true
  }

  /**
   * The unbindHardEdgesVAO method.
   */
  unbindHardEdgesVAO() {
    this.__ext.bindVertexArrayOES(null) // Note: is this necessary?
  }

  /**
   * Draw an item to screen.
   */
  drawHardEdges() {
    if (this.__hardEdgesVao)
      this.__gl.drawElements(
        this.__gl.LINES,
        this.__numEdgeIndices,
        this.__gl.UNSIGNED_INT,
        0
      )
  }

  // ////////////////////////////////
  // Drawing Mesh Points.

  /**
   * The drawPoints method.
   */
  drawPoints() {
    this.__gl.drawArrays(this.__gl.POINTS, 0, this.__geom.numVertices())
  }

  // ////////////////////////////////
  // Regular Drawing.

  /**
   * Draw an item to screen.
   */
  draw() {
    this.__gl.drawElements(
      this.__gl.TRIANGLES,
      this.__numTriIndices,
      this.__indexDataType,
      0
    )
  }

  /**
   * The drawInstanced method.
   * @param {any} instanceCount - The instanceCount param.
   */
  drawInstanced(instanceCount) {
    this.__gl.drawElementsInstanced(
      this.__gl.TRIANGLES,
      this.__numTriIndices,
      this.__indexDataType,
      0,
      instanceCount
    )
  }

  /**
   * The destroy method.
   */
  destroy() {
    super.destroy()
    const gl = this.__gl
    gl.deleteBuffer(this.__indexBuffer)
    this.__indexBuffer = undefined
    // if (this.__wireframesVao)
    //     gl.deleteVertexArray(this.__wireframesVao);
    // if (this.__hardEdgesVao)
    //     gl.deleteVertexArray(this.__hardEdgesVao);
  }
}

export { GLMesh }
// export default GLMesh;
