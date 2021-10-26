/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box3 } from '../../../Math/Box3'
import { Points } from '../Points'

/**
 * Base Class for procedural points generated by mathematical functions.
 *
 * @extends {Points}
 */
abstract class ProceduralPoints extends Points {
  dirtyTopology: boolean
  dirtyVertices: boolean
  topologyParams: string[]
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

  abstract rebuild(): void
  abstract resize(): void

  /**
   * This method can be overridden in derived classes
   * to perform general updates (see GLPass or BaseItem).
   * @param event - The event object emitted by the parameter.
   * @private
   */
  protected parameterValueChanged(event: Record<string, any>): void {
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

    super.parameterValueChanged(event)
  }

  /**
   * If the Procedural geometry is out of date, for example if a parameter has been changed,
   * this method explicitly forces the geometry to be recomputed.
   */
  update(): void {
    if (this.dirtyTopology) {
      this.rebuild()
      this.dirtyTopology = false
      this.dirtyVertices = false
      this.rebuild()
    } else if (this.dirtyVertices) {
      this.dirtyVertices = false
      this.resize()
      this.dirtyVertices = false
    }
  }

  /**
   * Returns the bounding box for geometry.
   * @return - The return value.
   */
  getBoundingBox(): Box3 {
    this.update()
    return super.getBoundingBox()
  }

  /**
   * Returns the number of vertex attributes.
   *
   * @return - The return value.
   */
  getNumVertices(): number {
    this.update()
    return super.getNumVertices()
  }

  // ////////////////////////////////////////
  // Rendering

  /**
   * The genBuffers method.
   * @param opts - The opts value.
   * @return - The return value.
   */
  genBuffers(opts?: Record<string, any>): Record<string, any> {
    this.update()
    return super.genBuffers(opts)
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param context - The context value.
   * @return - Returns the json object.
   */
  toJSON(context?: Record<string, any>): Record<string, unknown> {
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
