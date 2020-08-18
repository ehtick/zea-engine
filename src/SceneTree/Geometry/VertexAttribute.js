/* eslint-disable camelcase */
/* eslint-disable guard-for-in */
import { Attribute } from './Attribute.js'
import { Float32 } from '../../Utilities/MathFunctions'

/**
 * Class representing vertex attributes.
 *
 * ```
 * const vertexAttribute = new VertexAttribute(this, Float32, 0)
 * ```
 *
 * @extends Attribute
 */
class VertexAttribute extends Attribute {
  /**
   * Create vertex attributes
   * @param {Mesh} geom - The geom value.
   * @param {AttrValue|number} dataType - The dataType value.
   * @param {number|TypedArray} expectedSize - The expectedSize value.
   * @param {number} defaultScalarValue - The default scalar value.
   */
  constructor(geom, dataType, expectedSize, defaultScalarValue) {
    super(dataType, expectedSize, defaultScalarValue)
    this.__geom = geom // TODO: WeakRef??

    this.__splits = {}
    this.__splitValues = []
  }

  /**
   * The getFaceVertexValueRef method.
   * @param {number} face - The face value.
   * @param {number} facevertex - The face vertex value.
   * @return {AttrValue} - The return value.
   */
  getFaceVertexValueRef(face, facevertex) {
    const vertex = this.__geom.getFaceVertexIndex(face, facevertex)
    if (vertex in this.__splits && face in this.__splits[vertex]) {
      return this.__splitValues[this.__splits[vertex][face]]
    }
    return this.getValueRef(vertex)
  }

  /**
   * The setFaceVertexValue method.
   * @param {number} face - The face value.
   * @param {number} facevertex - The facevertex value.
   * @param {AttrValue} value - The value value.
   */
  setFaceVertexValue(face, facevertex, value) {
    const vertex = this.__geom.getFaceVertexIndex(face, facevertex)
    this.setFaceVertexValue_ByVertexIndex(face, vertex, value)
  }

  /**
   * The setFaceVertexValue_ByVertexIndex method.
   * @param {number} face - The face value.
   * @param {number} vertex - The vertex value.
   * @param {AttrValue} value - The value value.
   */
  setFaceVertexValue_ByVertexIndex(face, vertex, value) {
    const valueRef = this.getValueRef(vertex)
    if (!valueRef.isValid()) {
      // the value is uninitialized. Initialize it.
      valueRef.setFromOther(value)
    } else if (valueRef.approxEqual(value)) {
      // Reusing vertex value. Do nothing
    } else {
      // The new value is different from the existing value

      if (vertex in this.__splits) {
        // Now check if any existing splits for this vertex match the value being set.
        // i.e. for faces around a vertex, there will often be a seam along 2 edges
        // where the values differ. On each side of the seam, all faces can use the same
        // value. We should see then only one split value for the vertex.
        const vertexSplitIds = this.__splits[vertex]
        for (const fid in vertexSplitIds) {
          const splitId = vertexSplitIds[fid]
          if (this.__splitValues[splitId].approxEqual(value)) {
            // re-use this split value
            vertexSplitIds[face] = splitId
            return
          }
        }

        // If a split already exists for this face, re-use it.
        if (face in this.__splits[vertex]) {
          const valueRef = this.__splitValues[this.__splits[vertex][face]]
          valueRef.setFromOther(value)
          return
        }
      } else {
        this.__splits[vertex] = {}
      }
      this.__splits[vertex][face] = this.__splitValues.length
      this.__splitValues.push(value)
    }
  }

  /**
   * The setSplitVertexValue method.
   * @param {number} vertex - The vertex value.
   * @param {number} face - The face value.
   * @param {AttrValue} value - The value value.
   */
  setSplitVertexValue(vertex, face, value) {
    if (!(vertex in this.__splits)) this.__splits[vertex] = {}
    if (face in this.__splits[vertex]) {
      const currValue = this.__splitValues[this.__splits[vertex][face]]
      if (currValue.approxEqual(value)) return
      console.warn('Face Vertex Already Split with different value')
    }
    this.__splits[vertex][face] = this.__splitValues.length
    this.__splitValues.push(value)
  }

  /**
   * The setSplitVertexValues method.
   * @param {number} vertex - The vertex value.
   * @param {array} faceGroup - The faceGroup value.
   * @param {AttrValue} value - The value value.
   */
  setSplitVertexValues(vertex, faceGroup, value) {
    if (!(vertex in this.__splits)) this.__splits[vertex] = {}
    const splitIndex = this.__splitValues.length
    this.__splitValues.push(value)
    for (const face of faceGroup) {
      // if (face in this.__splits[vertex]) {
      //     let currValue = this.__splitValues[this.__splits[vertex][face]];
      //     if (currValue.approxEqual(value))
      //         return;
      //     console.warn("Face Vertex Already Split with different value");
      // }
      this.__splits[vertex][face] = splitIndex
    }
  }

  /**
   * The getSplits method.
   * @return {array} - The return value.
   */
  getSplits() {
    return this.__splits
  }

  /**
   * The getSplitCount method.
   * @return {number} - The return value.
   */
  getSplitCount() {
    let splitCount = 0
    for (const vertex in this.__splits) splitCount += Object.keys(this.__splits[vertex]).length
    return splitCount
  }

  /**
   * The generateSplitValues method.
   * @param {array} splitIndices - The splitIndices value.
   * @param {number} splitCount - The splitCount value.
   * @return {Float32Array} - The return value.
   */
  generateSplitValues(splitIndices, splitCount) {
    if (splitCount == 0) return this.__data

    const numUnSplitValues = this.length
    const count = this.length + splitCount
    const numElems = this.__dataType.numElements ? this.__dataType.numElements() : 1
    const data = new Float32Array(count * numElems)
    for (let i = 0; i < this.__data.length; i++) data[i] = this.__data[i]

    // Now duplicate the split values to generate an attributes array
    // usig the shared splits accross all attributes.
    // eslint-disable-next-line guard-for-in
    for (const vertex in splitIndices) {
      const faces = splitIndices[vertex]
      // eslint-disable-next-line guard-for-in
      for (const face in faces) {
        const tgt = numUnSplitValues + faces[face]
        if (vertex in this.__splits && face in this.__splits[vertex]) {
          // this attribue has a split value in its array.
          // we must use that value...
          const src = this.__splits[vertex][face]
          if (this.__dataType == Float32) data[tgt * numElems] = this.__splitValues[src]
          else this.__dataType.createFromBuffer(data.buffer, tgt * numElems * 4).setFromOther(this.__splitValues[src])
        } else {
          // Copy each scalar value to the new place in the array.
          const src = parseInt(vertex)
          for (let e = 0; e < numElems; e++) {
            if (src * numElems + e > this.__data.length) {
              console.log('Error remapping src:' + src * numElems + e)
            }
            if (tgt * numElems + e > data.length) {
              console.log('Error remapping tgt:' + tgt * numElems + e)
            }
            data[tgt * numElems + e] = this.__data[src * numElems + e]
          }
        }
      }
    }
    return data
  }

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param {object} context - The context value.
   * @return {object} - Returns the json object.
   */
  toJSON(context) {
    const json = super.toJSON(context)
    json.splits = this.__splits
    json.splitValues = this.__splitValues
    return json
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param {object} json - The json object this item must decode.
   * @param {object} context - The context value.
   */
  fromJSON(json, context) {
    super.fromJSON(json, context)
    this.__splits = json.splits || {}
    this.__splitValues = []
    if (json.splitValues) {
      for (const jsonVal of json.splitValues) {
        const dateTypeInstance = new this.__dataType()
        dateTypeInstance.fromJSON(jsonVal)
        this.__splitValues.push(dateTypeInstance)
      }
    }
  }

  /**
   * The loadSplitValues method.
   * @param {BinReader} reader - The reader value.
   */
  loadSplitValues(reader) {
    const splitIndices = reader.loadUInt32Array()
    if (splitIndices.length == 0) return
    let offset = 0
    let numSplitValues = 0
    while (true) {
      const vertexId = splitIndices[offset++]
      const numSplits = splitIndices[offset++]

      const splits = {}
      for (let i = 0; i < numSplits; i++) {
        const faceId = splitIndices[offset++]
        const splitId = splitIndices[offset++]
        splits[faceId] = splitId
        if (splitId >= numSplitValues) numSplitValues = splitId + 1
      }
      this.__splits[vertexId] = splits
      if (offset >= splitIndices.length) break
    }
    const dim = this.__numFloat32Elements
    const splitValues = reader.loadFloat32Array(numSplitValues * dim)
    this.__splitValues = []
    for (let i = 0; i < numSplitValues; i++) {
      const val = this.__dataType.createFromFloat32Array(splitValues.slice(i * dim, i * dim + dim))
      this.__splitValues.push(val)
    }
  }
}

export { VertexAttribute }
