import { Box3 } from '../../Math/index'
import { EventEmitter } from '../../Utilities/EventEmitter'
import { AttrBuffer, GeomBuffers } from '../types/scene'

/** ProxyGeometries are pupulated from data unpacked using a webworker while loading zcad files.
 * These geometries represent readonly geometries with very basic topologies.
 * @extends EventEmitter
 * @private
 */
class BaseProxy extends EventEmitter {
  protected name: string
  protected __buffers: GeomBuffers
  protected boundingBox: Box3
  public numVertices: number = 0

  /**
   * Create a base proxy.
   * @param data - The data value.
   */
  constructor(data: any) {
    super()
    this.name = data.name
    this.__buffers = data.geomBuffers

    this.boundingBox = new Box3()
    this.boundingBox.p0.__data = data.bbox.p0.__data
    this.boundingBox.p1.__data = data.bbox.p1.__data

    this.numVertices = this.__buffers.numVertices
  }

  get positions(): AttrBuffer {
    return this.__buffers.attrBuffers['positions']
  }

  /**
   * Returns the number of vertex attributes.
   *
   * @return - The return value.
   */
  getNumVertices(): number {
    return this.numVertices
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
  public numLineSegments: number = 0
  /**
   * Create a lines proxy.
   * @param data - The data value.
   */
  constructor(data: any) {
    super(data)
    this.numLineSegments = this.__buffers.indices.length / 2
  }

  /**
   * Returns the number line segments in this lines proxy geometry
   *
   * @return - The return value.
   */
  getNumLineSegments(): number {
    return this.numLineSegments
  }
}

/** Class representing a mesh proxy.
 * @extends BaseProxy
 * @private
 */
class MeshProxy extends BaseProxy {
  public numTriangles: number = 0
  /**
   * Create a mesh proxy.
   * @param data - The data value.
   */
  constructor(data: any) {
    super(data)
    this.numTriangles = this.__buffers.indices.length / 3
  }

  /**
   * Returns the number of triangles in this mesh proxy geometry.
   *
   * @return - The return value.
   */
  getNumTriangles(): number {
    return this.numTriangles
  }
}

export { BaseProxy, PointsProxy, LinesProxy, MeshProxy }
