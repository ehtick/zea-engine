import { Attribute } from './Attribute'
import { Vec2 } from '../../Math/Vec2'
import { Registry } from '../../Registry'

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
    const vec2 = new Vec2()
    Object.defineProperty(vec2, 'x', { get: () => valueData[0], set: (value) => (valueData[0] = value) })
    Object.defineProperty(vec2, 'y', { get: () => valueData[1], set: (value) => (valueData[1] = value) })
    vec2.set = (x: number, y: number): void => {
      valueData[0] = x
      valueData[1] = y
    }
    return vec2
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
    return new Vec2(valueData[0], valueData[1])
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
    const valueData = this.getFaceVertexValueRef_array(face, faceVertex)
    const vec2 = new Vec2()
    Object.defineProperty(vec2, 'x', { get: () => valueData[0], set: (value) => (valueData[0] = value) })
    Object.defineProperty(vec2, 'y', { get: () => valueData[1], set: (value) => (valueData[1] = value) })
    return vec2
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
}

Registry.register('Vec2Attribute', Vec2Attribute)

export { Vec2Attribute }
