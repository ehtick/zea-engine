import { Attribute } from './Attribute'
import { Color } from '../../Math/Color'
import { Registry } from '../../Registry'
import { Xfo } from '../../Math'

/**
 * Class representing an attribute.
 */
class ColorAttribute extends Attribute {
  /**
   * Create a ColorAttribute.
   */
  constructor() {
    super('Color', 4)
    this.normalized = false
  }

  /**
   * Returns the Color value at the specified index.
   *
   * > Note: 'Ref' means that the value contains a reference to the data in the attribute.
   * > The components of the value can be changed causing the attributes data is changed.
   * > No need to call 'setValue'.
   *
   * @param index - The index value.
   * @returns Color - The value at the specified index.
   */
  getValueRef(index: number): Color {
    if (index >= this.data.length / this.stride)
      throw new Error('Invalid vertex index:' + index + '. Num Vertices:' + this.data.length / 3)

    const offset = index * this.stride
    const valueData = this.data.subarray(offset, offset + this.stride)
    return new Color(valueData)
  }

  /**
   * Returns a copy of the Color value at the specified index.
   *
   * @param index - The index value.
   * @return Color - The return value.
   */
  getValue(index: number): Color {
    if (index >= this.data.length / this.stride)
      throw new Error('Invalid vertex index:' + index + '. Num Vertices:' + this.data.length / 3)

    const offset = index * this.stride
    const valueData = this.data.slice(offset, offset + this.stride)
    return new Color(valueData)
  }

  /**
   * Sets Color at the specified index.
   *
   * @param index - The index value.
   * @param value - The value param.
   */
  setValue(index: number, value: Color): void {
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
  getFaceVertexValueRef(face: number, faceVertex: number): Color {
    const array = this.getFaceVertexValueRef_array(face, faceVertex)
    return new Color(array)
  }

  /**
   * Sets the value of a corner vertex of a face.
   * @param face - The face index.
   * @param faceVertex - The index of vertex within the face. [0... num face vertices]
   * @param value - The value value.
   */
  setFaceVertexValue(face: number, faceVertex: number, value: Color): void {
    this.setFaceVertexValue_array(face, faceVertex, value.asArray())
  }

  /**
   * The setSplitVertexValue method.
   * @param vertex - The vertex value.
   * @param face - The face index.
   * @param value - The value value.
   */
  setSplitVertexValue(vertex: number, face: number, value: Color): void {
    this.setSplitVertexValue_array(vertex, face, value.asArray())
  }

  merge(other: ColorAttribute, xfo: Xfo = new Xfo()) {
    const prevNumValues: number = this.getCount()
    const addedValues = other.getCount()
    this.setCount(prevNumValues + addedValues)
    for (let i = 0; i < addedValues; i++) {
      this.setValue(prevNumValues + i, other.getValue(i))
    }
    this.splitValues = [...this.splitValues, ...other.splitValues]
  }
}

Registry.register('ColorAttribute', ColorAttribute)

export { ColorAttribute }
