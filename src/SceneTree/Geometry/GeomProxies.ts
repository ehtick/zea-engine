import { AssetLoadContext, Material } from '..'
import { Box3 } from '../../Math/index'
import { EventEmitter } from '../../Utilities/EventEmitter'
import { MaterialLibrary } from '../MaterialLibrary'
import { GeomBuffers } from '../types/scene'

/** ProxyGeometries are pupulated from data unpacked using a webworker while loading zcad files.
 * These geometries represent readonly geometries with very basic topologies.
 * @extends EventEmitter
 * @private
 */
class BaseProxy extends EventEmitter {
  protected name: string
  __buffers: GeomBuffers
  protected boundingBox: Box3
  protected __metaData: any

  /**
   * Create a base proxy.
   * @param data - The data value.
   */
  constructor(data: any) {
    super()
    this.name = data.name
    this.__buffers = data.geomBuffers as GeomBuffers
    if (this.__buffers.attrBuffers) {
      // eslint-disable-next-line guard-for-in
      // for (const attrName in this.__buffers.attrBuffers) {
      //   const attrData = this.__buffers.attrBuffers[attrName]
      //   const dataType = Registry.getBlueprint(attrData.dataType)
      //   attrData.dataType = dataType
      // }
    }

    this.boundingBox = new Box3()
    this.boundingBox.p0.__data = data.bbox.p0.__data
    this.boundingBox.p1.__data = data.bbox.p1.__data

    this.__metaData = new Map()
  }

  /**
   * Returns the number of vertex attributes.
   *
   * @return - The return value.
   */
  getNumVertices(): number {
    return <number>this.__buffers.numVertices // TODO: check cast
  }

  /**
   * Returns the bounding box for geometry.
   * @return - The return value.
   */
  getBoundingBox(): Box3 {
    return this.boundingBox
  }

  /**
   * The genBuffers method.
   * @return - The return value.
   */
  genBuffers(): GeomBuffers {
    return this.__buffers
  }

  /**
   * Once the buffers have been uploaded to the GPU, we are free to release them.
   * The GLGeomLibrary may call this function to let the geometry know it can release any handles.
   */
  freeBuffers(): void {
    for (const attrName in this.__buffers.attrBuffers) {
      const attrData = this.__buffers.attrBuffers[attrName]
      attrData.values = null
    }
    if (this.__buffers.indices) {
      this.__buffers.indices = null
    }
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
    const json: Record<string, unknown> = {
      geomBuffers: this.__buffers,
    }
    return json
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param json - The json object this item must decode.
   * @param context - The context value.
   */
  fromJSON(json: Record<string, any>, context?: AssetLoadContext): void {
    this.__buffers = json.geomBuffers
  }
}

/** Class representing a points proxy.
 * @extends BaseProxy
 * @private
 */
class PointsProxy extends BaseProxy {
  /**
   * Create a points proxy.
   * @param data - The data value.
   */
  constructor(data: any) {
    super(data)
  }
}

/** Class representing a lines proxy.
 * @extends BaseProxy
 * @private
 */
class LinesProxy extends BaseProxy {
  /**
   * Create a lines proxy.
   * @param data - The data value.
   */
  constructor(data: any) {
    super(data)
  }

  /**
   * Returns the number line segments in this lines proxy geometry
   *
   * @return - The return value.
   */
  getNumLineSegments(): number {
    return this.__buffers.indices.length / 2
  }
}

/** Class representing a mesh proxy.
 * @extends BaseProxy
 * @private
 */
class MeshProxy extends BaseProxy {
  /**
   * Create a mesh proxy.
   * @param data - The data value.
   */
  constructor(data: any) {
    super(data)
  }

  /**
   * Returns the number of triangles in this mesh proxy geometry.
   *
   * @return - The return value.
   */
  getNumTriangles(): number {
    return this.__buffers.indices.length / 3
  }
}

export { BaseProxy, PointsProxy, LinesProxy, MeshProxy }
