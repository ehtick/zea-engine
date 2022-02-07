import { BaseGeom } from './BaseGeom'
import { BinReader } from '../BinReader'
import { AssetLoadContext } from '../AssetLoadContext'

interface SubGeom {
  materialId: number
  offset: number
  count: number
}

/**
 * @private
 * @extends BaseGeom
 */
class CompoundGeomLoader extends BaseGeom {
  protected numSubGeoms: number = 0
  protected indices: Uint8Array | Uint16Array | Uint32Array = new Uint8Array(0)
  private offsets: Record<string, number> = {}
  private counts: Record<string, number> = {}
  // For each type of geom (TRIANGLES, LINES)
  // A material id, and each start and end of the block
  private materialSubGeoms: Record<string, Array<SubGeom>> = {}
  private subGeomOffsets: Record<string, Uint32Array> = {}
  private subGeomCounts: Record<string, Uint8Array | Uint16Array | Uint32Array> = {}

  protected materialLibraryIndices: Uint32Array = new Uint32Array(0)
  protected subGeomMaterialIndices: Uint8Array = new Uint8Array(0)
  /**
   * Create points.
   */
  constructor() {
    super()
  }

  genBuffers() {
    const attrBuffers: Record<string, any> = {}
    for (const [attrName, attr] of this.__vertexAttributes) {
      attrBuffers[attrName] = attr.genBuffer()
    }

    const numVertices = this.numVertices()
    const result = {
      numVertices,
      numRenderVerts: numVertices,
      indices: this.indices,
      attrBuffers,
      offsets: this.offsets,
      counts: this.counts,
      subGeomOffsets: this.subGeomOffsets,
      subGeomCounts: this.subGeomCounts,
      materialLibraryIndices: this.materialLibraryIndices,
      subGeomMaterialIndices: this.subGeomMaterialIndices,
      materialSubGeoms: this.materialSubGeoms,
    }
    return result
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * Sets state of current geometry(Including line segments) using a binary reader object.
   *
   * @param {BinReader} reader - The reader value.
   * @param {Record<string, unknown>} context - The context value.
   */
  readBinary(reader: BinReader, context: AssetLoadContext) {
    super.loadBaseGeomBinary(reader, context)

    const geomCountsByType = reader.loadUInt32Array(3)
    this.offsets['TRIANGLES'] = 0
    this.counts['TRIANGLES'] = geomCountsByType[0]
    this.offsets['LINES'] = geomCountsByType[0]
    this.counts['LINES'] = geomCountsByType[1]
    this.offsets['POINTS'] = geomCountsByType[0] + geomCountsByType[1]
    this.counts['POINTS'] = geomCountsByType[2]

    const bytes = reader.loadUInt8()
    if (bytes == 1) this.indices = reader.loadUInt8Array(undefined, true)
    else if (bytes == 2) this.indices = reader.loadUInt16Array(undefined, true)
    else if (bytes == 4) this.indices = reader.loadUInt32Array(undefined, true)

    // /////////////////////////////////
    // TRIANGLES subgeoms
    const bytesMeshSubGeoms = reader.loadUInt8()
    let subGeomCountsMesh: Uint8Array | Uint16Array | Uint32Array
    if (bytesMeshSubGeoms == 1) subGeomCountsMesh = reader.loadUInt8Array()
    else if (bytesMeshSubGeoms == 2) subGeomCountsMesh = reader.loadUInt16Array()
    else if (bytesMeshSubGeoms == 4) subGeomCountsMesh = reader.loadUInt32Array()
    else {
      throw Error('subGeomOffsets undefined')
    }
    const subGeomOffsetsMesh = new Uint32Array(subGeomCountsMesh.length)
    let offset = 0
    for (let i = 0; i < subGeomCountsMesh.length; i++) {
      subGeomOffsetsMesh[i] = offset
      offset += subGeomCountsMesh[i]
    }
    this.subGeomOffsets['TRIANGLES'] = subGeomOffsetsMesh
    this.subGeomCounts['TRIANGLES'] = subGeomCountsMesh

    // /////////////////////////////////
    // LINES subgeoms
    const bytesLinesSubGeoms = reader.loadUInt8()
    let subGeomCountsLines: Uint8Array | Uint16Array | Uint32Array
    if (bytesLinesSubGeoms == 1) subGeomCountsLines = reader.loadUInt8Array()
    else if (bytesLinesSubGeoms == 2) subGeomCountsLines = reader.loadUInt16Array()
    else if (bytesLinesSubGeoms == 4) subGeomCountsLines = reader.loadUInt32Array()
    else {
      throw Error('subGeomOffsets undefined')
    }
    const subGeomOffsetsLines = new Uint32Array(subGeomCountsLines.length)
    for (let i = 0; i < subGeomCountsLines.length; i++) {
      subGeomOffsetsLines[i] = offset
      offset += subGeomCountsLines[i]
    }
    this.subGeomOffsets['LINES'] = subGeomOffsetsLines
    this.subGeomCounts['LINES'] = subGeomCountsLines

    // /////////////////////////////////
    // POINTS subgeoms
    const numPointsSubGeoms = reader.loadUInt32()
    const subGeomOffsetsPoints = new Uint32Array(numPointsSubGeoms)
    const subGeomCountsPoints = new Uint8Array(numPointsSubGeoms)
    for (let i = 0; i < numPointsSubGeoms; i++) {
      subGeomOffsetsPoints[i] = offset
      subGeomCountsPoints[i] = 1
      offset++
    }
    this.subGeomOffsets['POINTS'] = subGeomOffsetsPoints
    this.subGeomCounts['POINTS'] = subGeomCountsPoints

    this.numSubGeoms = subGeomCountsMesh.length + subGeomCountsLines.length + numPointsSubGeoms
    // /////////////////////////////////
    // Materials
    const numMaterials = reader.loadUInt32()
    if (numMaterials > 0) {
      this.materialLibraryIndices = reader.loadUInt32Array(numMaterials)
      this.subGeomMaterialIndices = reader.loadUInt8Array(this.numSubGeoms)

      // /////////////////////////////////
      // Material Groups
      let offset = 0
      let currMaterial = -99
      let currMaterialSubGeom: SubGeom | null = null
      for (let i = 0; i < this.numSubGeoms; i++) {
        let key
        let subGeomOffset = 0
        if (i < this.subGeomCounts.TRIANGLES.length) {
          if (!this.materialSubGeoms.TRIANGLES) this.materialSubGeoms.TRIANGLES = []
          key = 'TRIANGLES'
        } else if (i < this.subGeomCounts.TRIANGLES.length + this.subGeomCounts.LINES.length) {
          subGeomOffset = this.subGeomCounts.TRIANGLES.length
          key = 'LINES'
          if (!this.materialSubGeoms.LINES) this.materialSubGeoms.LINES = []
        } else {
          subGeomOffset = this.subGeomCounts.TRIANGLES.length + this.subGeomCounts.LINES.length
          key = 'POINTS'
          if (!this.materialSubGeoms.POINTS) this.materialSubGeoms.POINTS = []
        }
        const materialId = this.subGeomMaterialIndices[i]
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
          for (; i < this.numSubGeoms; i++) {
            if (currMaterial != this.subGeomMaterialIndices[i]) {
              break
            }
            // When we get to the end og this geom type (e.g .TRIANGLES)
            // start a new subgeom.
            if (i - subGeomOffset == this.subGeomCounts[key].length) {
              // Force the material index to be reset on line 162 above.
              currMaterial = -99
              break
            }
            currMaterialSubGeom.count += this.subGeomCounts[key][i - subGeomOffset]
          }
          offset += currMaterialSubGeom.count
          this.materialSubGeoms[key].push(currMaterialSubGeom)
          i--
        }
      }
    } else {
      this.materialSubGeoms['TRIANGLES'] = [
        {
          materialId: -1,
          offset: 0,
          count: geomCountsByType[0],
        },
      ]
      if (geomCountsByType[1] > 0) {
        this.materialSubGeoms['LINES'] = [
          {
            materialId: -1,
            offset: geomCountsByType[0],
            count: geomCountsByType[1],
          },
        ]
      }
      if (geomCountsByType[2] > 0) {
        this.materialSubGeoms['POINTS'] = [
          {
            materialId: -1,
            offset: geomCountsByType[0] + geomCountsByType[1],
            count: geomCountsByType[2],
          },
        ]
      }
    }

    this.emit('geomDataChanged', {})
  }
}

export { CompoundGeomLoader }
