import { BinReader } from '../BinReader'
import { AssetLoadContext } from '../AssetLoadContext'
import { BaseItem, Material, MaterialLibrary } from '..'
import { BaseProxy } from './GeomProxies'

class SubGeom extends BaseItem {}

/**
 * Class representing a point primitive drawing type, every vertex specified is a point.
 *
 * ```
 * const compoundGeom = new CompoundGeom()
 * ```
 *
 * * **Events**
 * * **boundingBoxChanged:** Triggered when the bounding box changes.
 *
 * @extends BaseProxy
 */
class CompoundGeom extends BaseProxy {
  private counts: Record<string, number>
  private materials: Array<Material> = []
  protected subGeomMaterialIndices: Uint8Array = new Uint8Array(0)

  subGeoms: Array<SubGeom> = []
  /**
   * Create points.
   */
  constructor(data: any, materialLibrary: MaterialLibrary) {
    super(data)

    this.counts = data.geomBuffers.counts

    // Now use the indices in the geom to look up the actual materials
    // that will be used in rendering.
    const materials = materialLibrary.getMaterials()
    data.geomBuffers.materialLibraryIndices.forEach((materialIndex: number, index: number) => {
      this.materials[index] = materials[materialIndex]
    })
    this.subGeomMaterialIndices = data.geomBuffers.subGeomMaterialIndices

    this.__buffers.materials = this.materials
  }

  /**
   * Returns the number of triangles in this mesh proxy geometry.
   *
   * @return - The return value.
   */
  getNumTriangles() {
    return this.counts['TRIANGLES'] / 3
  }

  /**
   * Returns the number line segments in this lines proxy geometry
   *
   * @return - The return value.
   */
  getNumLineSegments() {
    return this.counts['LINES'] / 2
  }

  /**
   * Returns the number line segments in this lines proxy geometry
   *
   * @return - The return value.
   */
  getNumPoints() {
    return this.counts['POINTS']
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * Sets state of current geometry(Including line segments) using a binary reader object.
   *
   * @param {BinReader} reader - The reader value.
   * @param {Record<string, unknown>} context - The context value.
   */
  loadMetadata(metadataReader: BinReader, context: AssetLoadContext): void {
    const toc = metadataReader.loadUInt32Array()
    toc.forEach((offset, index) => {
      const subGeom = new SubGeom()
      metadataReader.seek(offset)
      subGeom.readBinary(metadataReader, context)
      this.subGeoms[index] = subGeom
    })
  }
}

export { CompoundGeom }
