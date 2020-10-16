import { Points } from '../Points'

/**
 * Base Class for procedural points generated by mathematical functions.
 *
 * @extends {Points}
 */
class ProceduralPoints extends Points {
  /**
   * Creates an instance of ProceduralPoints.
   */
  constructor() {
    super()
    this.dirtyTopology = true
    this.dirtyVertices = true

    // Parameters that specify topology settings.
    // Add parameters to this list to ensure the topology is recomputed.
    // All other param changes will only trigger a resize
    this.topologyParams = []
  }

  /**
   * If the topology of the geometry has changed. For example, there are more or less vertices,
   * then the rebuild method must be called to re-generated the topology
   */
  rebuild() {}

  /**
   * If the dimensions of the geometry has changed. For example, a size parameter has changed,
   * then the resize method must be called to re-generated the vertex attributes
   */
  resize() {}

  /**
   * This method can be overridden in derived classes
   * to perform general updates (see GLPass or BaseItem).
   * @param {object} event - The event object emitted by the parameter.
   * @private
   */
  __parameterValueChanged(event) {
    this.setBoundingBoxDirty()
    if (this.topologyParams.includes(event.param.getName())) {
      this.dirtyTopology = true
      this.emit('geomDataTopologyChanged')
    } else {
      this.dirtyVertices = true
      this.setBoundingBoxDirty()
      // Let the renderer know that the geometry has changed and must be re-uploaded to the GPU.
      this.emit('geomDataChanged')
    }

    super.__parameterValueChanged(event)
  }

  /**
   * If the Procedural geometry is out of date, for example if a parameter has been changed,
   *  this method explicitly forces the geometry to be recomputed.
   */
  update() {
    if (this.dirtyTopology) {
      this.rebuild()
      this.dirtyTopology = false
    } else if (this.dirtyVertices) {
      this.resize()
      this.dirtyVertices = false
    }
  }

  /**
   * Returns the bounding box for geometry.
   * @return {Vec3} - The return value.
   */
  getBoundingBox() {
    this.update()
    return super.getBoundingBox()
  }

  // ////////////////////////////////////////
  // Rendering

  /**
   * The genBuffers method.
   * @param {object} opts - The opts value.
   * @return {object} - The return value.
   */
  genBuffers(opts) {
    this.update()
    return super.genBuffers(opts)
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param {object} context - The context value.
   * @return {object} - Returns the json object.
   */
  toJSON(context) {
    if (!context) context = {}
    context.skipTopology = true
    context.skipAttributes = ['positions', 'normals', 'texCoords']

    const j = super.toJSON(context)

    context.skipTopology = false
    context.skipAttributes = []
    return j
  }
}

export { ProceduralPoints }
