import { Lines } from '../Lines'

/**
 * Base Class for procedural lines generated by mathematical functions.
 *
 * @extends {Lines}
 */
class ProceduralLines extends Lines {
  /**
   * Creates an instance of ProceduralLines.
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
   * The clear method.
   */
  clear() {
    this.dirtyTopology = true
    this.dirtyVertices = true
    super.clear()
  }

  /**
   * The rebuild method.
   * @private
   */
  rebuild() {}

  /**
   * The resize method.
   * @private
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
   * this method explicitly forces the geometry to be recomputed.
   */
  update() {
    if (this.dirtyTopology) {
      this.dirtyTopology = false
      this.dirtyVertices = false
      this.rebuild()
    } else if (this.dirtyVertices) {
      this.dirtyVertices = false
      this.resize()
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

  /**
   * Returns the number of vertex attributes.
   *
   * @return {number} - The return value.
   */
  getNumVertices() {
    this.update()
    return super.getNumVertices()
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

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param {object} j - The json object this item must decode.
   * @param {object} context - The context value.
   */
  fromJSON(j, context) {
    super.fromJSON(j, context)
  }
}

export { ProceduralLines }
