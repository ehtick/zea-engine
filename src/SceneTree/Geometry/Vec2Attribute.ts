import { Attribute } from './Attribute'
import { Vec2 } from '../../Math/Vec2'
import { Registry } from '../../Registry'
import { Xfo } from '../../Math'

/**
 * Class representing an attribute.
 */
class Vec2Attribute extends Attribute {
  /**
   * Create a Vec2Attribute.
   */
  constructor() {
    super('Vec2', 2)
    this.normalized = false
  }

  /**
   * Returns the Vec2 value at the specified index.
   *
   * > Note: 'Ref' means that the value contains a reference to the data in the attribute.
   * > The components of the value can be changed causing the attributes data is changed.
   * > No need to call 'setValue'.
   *
   * @param index - The index value.
   * @returns Vec2 - The value at the specified index.
   */
  getValueRef(index: number): Vec2 {
    if (index >= this.data.length / this.stride)
      throw new Error('Invalid vertex index:' + index + '. Num Vertices:' + this.data.length / 3)

    const offset = index * this.stride
    const valueData = this.data.subarray(offset, offset + this.stride)
    return new Vec2(valueData)
  }

  /**
   * Returns the Vec2 from the specified index.
   *
   * @param index - The index value.
   * @return Vec2 - The return value.
   */
  getValue(index: number): Vec2 {
    if (index >= this.data.length / this.stride)
      throw new Error('Invalid vertex index:' + index + '. Num Vertices:' + this.data.length / 3)

    const offset = index * this.stride
    const valueData = this.data.slice(offset, offset + this.stride)
    return new Vec2(valueData)
  }

  /**
   * Sets Vec2 at the specified index.
   *
   * @param index - The index value.
   * @param value - The value param.
   */
  setValue(index: number, value: Vec2): void {
    if (index >= this.data.length / this.stride)
      throw new Error('Invalid vertex index:' + index + '. Num Vertices:' + this.data.length / 3)

    const offset = index * this.stride
    this.data.set(value.asArray(), offset)
  }

  /**
   * Gets the value of a corner vertex of a face.
   * > Note: 'Ref' means that the value contains a reference to the data in the attribute.
   * > The components of the value can be changed causing the attributes data is changed.
   * > No need to call 'setFaceVertexValue'.
   * @param face - The face index.
   * @param faceVertex - The index of vertex within the face. [0... num face vertices]
   * @return - The return value.
   */
  getFaceVertexValueRef(face: number, faceVertex: number): Vec2 {
    const array = this.getFaceVertexValueRef_array(face, faceVertex)
    return new Vec2(array)
  }

  /**
   * Sets the value of a corner vertex of a face.
   * @param face - The face index.
   * @param faceVertex - The index of vertex within the face. [0... num face vertices]
   * @param value - The value value.
   */
  setFaceVertexValue(face: number, faceVertex: number, value: Vec2): void {
    this.setFaceVertexValue_array(face, faceVertex, <Float32Array>value.asArray())
  }

  /**
   * The setSplitVertexValue method.
   * @param vertex - The vertex value.
   * @param face - The face index.
   * @param value - The value value.
   */
  setSplitVertexValue(vertex: number, face: number, value: Vec2): void {
    this.setSplitVertexValue_array(vertex, face, <Float32Array>value.asArray())
  }

  merge(other: Vec2Attribute, xfo: Xfo = new Xfo()) {
    const prevNumValues: number = this.getCount()
    const addedValues = other.getCount()
    this.setCount(prevNumValues + addedValues)
    for (let i = 0; i < addedValues; i++) {
      this.setValue(prevNumValues + i, other.getValue(i))
    }
    this.splitValues = [...this.splitValues, ...other.splitValues]
  }
}

Registry.register('Vec2Attribute', Vec2Attribute)

export { Vec2Attribute }
