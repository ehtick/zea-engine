import { BinReader } from '../BinReader'
import { AssetLoadContext } from '../AssetLoadContext'
import { BaseItem } from '../BaseItem'
import { Material } from '../Material'
import { MaterialLibrary } from '../MaterialLibrary'
import { BaseProxy } from './GeomProxies'
import { Registry } from '../../Registry'

class SubGeom extends BaseItem {}
Registry.register('SubGeom', SubGeom)

interface MaterialGroup {
  materialId: number
  offset: number
  count: number
}
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
  materials: Array<Material> = []
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
    delete data.geomBuffers.materialLibraryIndices

    this.__buffers.materials = this.materials
  }

  /**
   * Returns the number of faces, edges and point sub-geoms in this compound geom.
   *
   * @return - The return value.
   */
  getNumSubGeoms() {
    return this.__buffers.numSubGeoms
  }

  /**
   * Returns the number of Face sub-geoms in this compound geom.
   *
   * @return - The return value.
   */
  getNumFaces() {
    return this.__buffers.subGeomCounts['TRIANGLES'].length
  }

  /**
   * Returns the number of Edge sub-geoms in this compound geom.
   *
   * @return - The return value.
   */
  getNumEdges() {
    return this.__buffers.subGeomCounts['LINES'].length
  }

  /**
   * Returns the number of triangles in this compound geom.
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
  // Materials

  /**
   * Assigns a material to a sub-geom by ID;
   * @param subGeomId - The ID of the sub-geom to assign the material.
   * @param material - The material to assign.
   */
  assignSubGeomMaterial(subGeomId: number, material: Material) {
    let materialIndex = this.materials.indexOf(material)
    if (materialIndex == -1) {
      materialIndex = this.materials.length
      this.materials[materialIndex] = material
    }
    if (this.__buffers.subGeomMaterialIndices.length == 0) {
      this.__buffers.subGeomMaterialIndices = new Uint8Array(this.__buffers.numSubGeoms)
    }
    // Note: subGeomMaterialIndices is Uint8Array, and 0 means no custom
    // material is assigned to the subGeom.
    // Subtract 1 to get the actual material id.
    this.__buffers.subGeomMaterialIndices[subGeomId] = materialIndex + 1
    this.calcMaterialGroups()
    this.emit('materialsChanged')
  }

  /**
   * Clears all sub--geom material assignments. This means the geometry will be drawn
   * using only the material of the GeomItem or CADBody.
   */
  clearMaterials() {
    this.materials.splice(0, this.materials.length)
    this.__buffers.subGeomMaterialIndices = this.__buffers.subGeomMaterialIndices.map(() => 0)
    this.emit('materialsChanged')
  }

  private calcMaterialGroups() {
    const materialSubGeoms: Record<string, Array<MaterialGroup>> = {}
    // /////////////////////////////////
    // Material Groups
    let offset = 0
    let currMaterial = -99
    let currMaterialSubGeom: MaterialGroup | null = null
    for (let i = 0; i < this.__buffers.numSubGeoms; i++) {
      let key
      let subGeomOffset = 0
      if (i < this.__buffers.subGeomCounts.TRIANGLES.length) {
        if (!materialSubGeoms.TRIANGLES) materialSubGeoms.TRIANGLES = []
        key = 'TRIANGLES'
      } else if (i < this.__buffers.subGeomCounts.TRIANGLES.length + this.__buffers.subGeomCounts.LINES.length) {
        subGeomOffset = this.__buffers.subGeomCounts.TRIANGLES.length
        key = 'LINES'
        if (!materialSubGeoms.LINES) materialSubGeoms.LINES = []
      } else {
        subGeomOffset = this.__buffers.subGeomCounts.TRIANGLES.length + this.__buffers.subGeomCounts.LINES.length
        key = 'POINTS'
        if (!materialSubGeoms.POINTS) materialSubGeoms.POINTS = []
      }
      const materialId = this.__buffers.subGeomMaterialIndices[i]
      if (currMaterial != materialId) {
        currMaterial = materialId

        // Note: subGeomMaterialIndices is Uint8Array, and 0 means no custom
        // material is assigned to the subGeom.
        // Subtract 1 to get the actual material id.
        currMaterialSubGeom = {
          materialId: materialId - 1,
          offset,
          count: 0,
        }
        for (; i < this.__buffers.numSubGeoms; i++) {
          if (currMaterial != this.__buffers.subGeomMaterialIndices[i]) {
            break
          }
          // When we get to the end og this geom type (e.g .TRIANGLES)
          // start a new subgeom.
          if (i - subGeomOffset == this.__buffers.subGeomCounts[key].length) {
            // Force the material index to be reset on line 162 above.
            currMaterial = -99
            break
          }
          currMaterialSubGeom.count += this.__buffers.subGeomCounts[key][i - subGeomOffset]
        }
        offset += currMaterialSubGeom.count
        materialSubGeoms[key].push(currMaterialSubGeom)
        i--
      }
    }
    this.__buffers.materialSubGeoms = materialSubGeoms
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * Sets state of current geometry(Including line segments) using a binary reader object.
   *
   * @param reader - The reader value.
   * @param context - The context value.
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
