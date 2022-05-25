/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable require-jsdoc */
import { BaseClass } from '../../Utilities/BaseClass'
import { MathFunctions } from '../../Utilities/MathFunctions'
import { Mesh } from './Mesh'
import { BinReader } from '../../SceneTree/BinReader'

function approxEqual(a: Uint8Array | Uint16Array | Float32Array, b: Uint8Array | Uint16Array | Float32Array): boolean {
  return !a.some((value, index) => Math.abs(b[index] - value) > 0.001)
}
function isInitialized(a: Uint8Array | Uint16Array | Float32Array) {
  for (let i = 0; i < a.length; i++) {
    if (!Number.isNaN(a[i])) return true
  }
  return false
}
const resizeArray = (inArray: Uint8Array | Uint16Array | Float32Array, newSize: number) => {
  if (inArray instanceof Uint8Array) {
    const newArray = new Uint8Array(newSize)
    newArray.set(inArray)
    return newArray
  } else if (inArray instanceof Uint16Array) {
    const newArray = new Uint16Array(newSize)
    newArray.set(inArray)
    return newArray
  } else {
    const newArray = new Float32Array(newSize)
    newArray.set(inArray)
    return newArray
  }
}

class Attribute extends BaseClass {
  public dataTypeName: string
  public stride: number
  protected normalized!: boolean
  protected data: Uint8Array | Uint16Array | Float32Array

  protected mesh!: Mesh
  protected splitValues: Array<Uint8Array | Uint16Array | Float32Array> = []
  protected splits: Record<number, Record<number, number>> = {}

  constructor(dataTypeName: string, stride: number) {
    super()
    this.dataTypeName = dataTypeName
    this.stride = stride
    this.init()
  }

  protected init() {
    this.data = new Float32Array(0)
    this.initRange(0)
  }

  /**
   * Sets the Mesh reference to the VertexAttribute. This is needed for attributes
   * assigned to meshes, and is used to calculate face vertex indices.
   * > Note: the mesh automatically calls this method when a vertex attribute is assigned.
   *
   * @param mesh - The mesh object
   */
  setMesh(mesh: Mesh): void {
    this.mesh = mesh
  }

  /**
   * Returns the backing array for this attribute
   *
   * @return - The return value.
   */
  asArray(): Uint8Array | Uint16Array | Float32Array {
    return this.data
  }

  /**
   * Returns the name of the math type this attribute stores.
   *
   * @return - The return value.
   */
  getDataTypeName(): string {
    return this.dataTypeName
  }

  /**
   * Returns the count of attribute values in the data.
   *
   * @return - The return value.
   */
  getCount(): number {
    return this.data.length / this.stride
  }

  /**
   * Sets the count of attribute values in the data.
   *
   * @param size - The size value.
   */
  setCount(count: number): void {
    const prevLength = this.data.length
    const newLength = count * this.stride

    if (newLength > prevLength) {
      this.data = resizeArray(this.data, newLength)
      this.initRange(prevLength)
    } else if (newLength < prevLength) {
      this.data = this.data.slice(0, newLength)
    } else {
      // No change in size. (this can happen when an attribute was already loaded with data.)
    }

    this.splits = {}
    this.splitValues = []
  }

  /**
   * Fills up data values with default ones starting from the specified index.
   *
   * @param start - The start value.
   */
  protected initRange(start: number): void {
    // Initialize the values to invalid values.
    for (let i = start; i < this.data.length; i++) {
      this.data[i] = Number.NaN
    }
  }

  /**
   * Returns the number of elements stored in each `T`.
   *
   * @return - The return value.
   */
  get numElements(): number {
    return this.stride
  }

  /**
   * Returns data value of the specified index.
   *
   * @param index - The index value.
   * @return - The return value.
   */
  getFloat32Value(index: number): number {
    return this.data[index]
  }

  /**
   * Sets data value in the specified index.
   *
   * @param index - The index value.
   * @param value - The value param.
   */
  setFloat32Value(index: number, value: number): void {
    this.data[index] = value
  }

  // //////////////////////////////////////////////////
  // Face Vertex Values

  /**
   * The getSplits method.
   * @return - The return value.
   */
  getSplits(): Record<number, Record<number, number>> {
    return this.splits
  }

  /**
   * Gets the value of a corner vertex of a face.
   * @param face - The face index.
   * @param faceVertex - The index of vertex within the face. [0... num face vertices]
   * @return - The return value.
   */
  getFaceVertexValueRef_array(face: number, faceVertex: number): Uint8Array | Uint16Array | Float32Array {
    const vertex = this.mesh.getFaceVertexIndex(face, faceVertex)
    if (vertex in this.splits && face in this.splits[vertex]) {
      return this.splitValues[this.splits[vertex][face]]
    }
    return this.data.subarray(vertex * this.stride, (vertex + 1) * this.stride)
  }

  /**
   * Sets the value of a corner vertex of a face.
   * @param face - The face index.
   * @param faceVertex - The index of vertex within the face. [0... num face vertices]
   * @param value - The value value.
   */
  setFaceVertexValue_array(face: number, faceVertex: number, value: Uint8Array | Uint16Array | Float32Array): void {
    const vertex = this.mesh.getFaceVertexIndex(face, faceVertex)
    this.setFaceVertexValue_ByVertexIndex(face, vertex, value)
  }

  /**
   * The setFaceVertexValue_ByVertexIndex method.
   * @param face - The face index.
   * @param vertex - The vertex value.
   * @param value - The value value.
   */
  setFaceVertexValue_ByVertexIndex(face: number, vertex: number, value: Uint8Array | Uint16Array | Float32Array): void {
    const currValue = this.data.subarray(vertex * this.stride, (vertex + 1) * this.stride)
    if (!isInitialized(currValue)) {
      // the value is uninitialized. Initialize it.
      currValue.set(value)
    } else if (approxEqual(currValue, value)) {
      // Reusing vertex value. Do nothing
    } else {
      // The new value is different from the existing value

      if (vertex in this.splits) {
        // Now check if any existing splits for this vertex match the value being set.
        // i.e. for faces around a vertex, there will often be a seam along 2 edges
        // where the values differ. On each side of the seam, all faces can use the same
        // value. We should see then only one split value for the vertex.
        const vertexSplitIds = this.splits[vertex]
        for (const fid in vertexSplitIds) {
          const splitId = vertexSplitIds[fid]
          if (approxEqual(this.splitValues[splitId], value)) {
            // re-use this split value
            vertexSplitIds[face] = splitId
            return
          }
        }

        // If a split already exists for this face, re-use it.
        if (face in this.splits[vertex]) {
          this.splitValues[this.splits[vertex][face]] = value
          return
        }
      } else {
        this.splits[vertex] = {}
      }
      this.splits[vertex][face] = this.splitValues.length
      this.splitValues.push(value)
    }
  }

  /**
   * The setSplitVertexValue method.
   * @param vertex - The vertex value.
   * @param face - The face index.
   * @param value - The value value.
   */
  setSplitVertexValue_array(vertex: number, face: number, value: Uint8Array | Uint16Array | Float32Array): void {
    if (!(vertex in this.splits)) this.splits[vertex] = {}
    if (face in this.splits[vertex]) {
      const currValue = this.splitValues[this.splits[vertex][face]]
      if (approxEqual(currValue, value)) return
      console.warn('Face Vertex Already Split with different value')
    }
    this.splits[vertex][face] = this.splitValues.length
    this.splitValues.push(value)
  }

  /**
   * The setSplitVertexValues method.
   * @param vertex - The vertex value.
   * @param faceGroup - The faceGroup value.
   * @param value - The value value.
   */
  setSplitVertexValues(vertex: number, faceGroup: number[], value: Uint8Array | Uint16Array | Float32Array): void {
    if (!(vertex in this.splits)) this.splits[vertex] = {}
    const splitIndex = this.splitValues.length
    this.splitValues.push(value)
    for (const face of faceGroup) {
      // if (face in this.splits[vertex]) {
      //     let currValue = this.splitValues[this.splits[vertex][face]];
      //     if (currValue.approxEqual(value))
      //         return;
      //     console.warn("Face Vertex Already Split with different value");
      // }
      this.splits[vertex][face] = splitIndex
    }
  }

  /**
   * The generateSplitValues method.
   * @param splitIndices - The splitIndices value.
   * @param splitCount - The splitCount value.
   * @return - The return value.
   */
  generateSplitValues(
    splitIndices: Record<number, Record<number, number>>,
    splitCount: number
  ): Uint8Array | Uint16Array | Float32Array {
    if (splitCount == 0) return this.data

    const numUnSplitValues = this.getCount()
    const data = resizeArray(this.data, (numUnSplitValues + splitCount) * this.stride)

    // Now duplicate the split values to generate an attributes array
    // using the shared splits across all attributes.
    // eslint-disable-next-line guard-for-in
    for (const vertex in splitIndices) {
      const faces = splitIndices[vertex]
      // eslint-disable-next-line guard-for-in
      for (const face in faces) {
        const tgt = numUnSplitValues + faces[face]
        if (vertex in this.splits && face in this.splits[vertex]) {
          // this attribute has a split value in its array.
          // we must use that value...
          const src = this.splits[vertex][face]
          this.splitValues[src].forEach((value, index) => {
            data[tgt * this.stride + index] = value
          })
        } else {
          // Copy each scalar value to the new place in the array.
          const src = parseInt(vertex)
          for (let e = 0; e < this.stride; e++) {
            data[tgt * this.stride + e] = this.data[src * this.stride + e]
          }
        }
      }
    }
    return data
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param context - The context value.
   * @return - Returns the json object.
   */
  toJSON(context?: Record<string, any>): Record<string, any> {
    return {
      data: this.data,
      dataType: this.dataTypeName,
      length: this.data.length / this.stride,
    }
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param j - The json object this item must decode.
   */
  fromJSON(j: Record<string, any>): void {
    const data = j.data.map((dataElement: any) =>
      MathFunctions.isNumeric(dataElement) ? dataElement : Number.POSITIVE_INFINITY
    )
    this.data = Float32Array.from(data)
  }

  /**
   * The loadSplitValues method.
   * @param reader - The reader value.
   */
  loadSplitValues(reader: BinReader): void {
    const splitIndices = reader.loadUInt32Array()
    if (splitIndices.length == 0) return
    let offset = 0
    let numSplitValues = 0
    while (true) {
      const vertexId = splitIndices[offset++]
      const numSplits = splitIndices[offset++]

      const splits: Record<number, number> = {}
      for (let i = 0; i < numSplits; i++) {
        const faceId = splitIndices[offset++]
        const splitId = splitIndices[offset++]
        splits[faceId] = splitId
        if (splitId >= numSplitValues) numSplitValues = splitId + 1
      }
      this.splits[vertexId] = splits
      if (offset >= splitIndices.length) break
    }
    const dim = this.stride
    const splitValues = reader.loadFloat32Array(numSplitValues * dim)
    this.splitValues = []
    for (let i = 0; i < numSplitValues; i++) {
      const val = splitValues.slice(i * dim, i * dim + dim)
      this.splitValues.push(val)
    }
  }

  /**
   * Returns the string representation of the object's state.
   *
   * @return - The return value.
   */
  toString(): string {
    return JSON.stringify(this.toJSON(), null, 2)
  }

  // ////////////////////////////////////////
  // Memory

  /**
   * Returns vertex attributes buffers and its count.
   *
   * @return - The return value.
   */
  genBuffer(): Record<string, any> {
    return {
      values: this.data,
      count: this.getCount(),
      dataType: this.dataTypeName,
      normalized: this.normalized,
    }
  }
}

export { Attribute }
