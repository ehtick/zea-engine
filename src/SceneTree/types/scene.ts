export interface AttrBuffer {
  values: Uint8Array | Int8Array | Uint16Array | Float32Array
  count: number
  dimension: number
  normalized: boolean
  dataType: string
}

export interface GeomBuffers {
  attrBuffers: Record<string, AttrBuffer>
  numVertices: number
  numRenderVerts?: number
  indices?: Uint8Array | Uint16Array | Uint32Array
  vertexNeighbors?: Uint8Array | Uint16Array | Uint32Array

  // //////////////////////////////
  // Compound Geom buffer values...
  offsets?: Record<string, number>
  counts?: Record<string, number>
  // For each type of geom (TRIANGLES, LINES)
  // A material id, and each start and end of the block
  materialSubGeoms?: Record<string, Array<any>>
  subGeomOffsets?: Record<string, Uint32Array>
  subGeomCounts?: Record<string, Uint8Array | Uint16Array | Uint32Array>

  materialLibraryIndices?: Uint32Array
  subGeomMaterialIndices?: Uint8Array
  materials?: Array<any>
}
