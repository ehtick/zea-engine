import { BaseGeom } from './BaseGeom'
import { BinReader } from '../BinReader'
import { AssetLoadContext } from '../AssetLoadContext'

/**
 * @private
 * @extends BaseGeom
 */
class CompoundGeomLoader extends BaseGeom {
  protected numSubGeoms: number = 0
  protected indices: Uint8Array | Uint16Array | Uint32Array = new Uint8Array(0)
  private offsets: Record<string, number> = {}
  private counts: Record<string, number> = {}
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
    }

    this.emit('geomDataChanged', {})
  }
}

export { CompoundGeomLoader }
