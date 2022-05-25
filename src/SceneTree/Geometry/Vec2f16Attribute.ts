import { Vec2Attribute } from './Vec2Attribute'
import { Vec2 } from '../../Math/Vec2'
import { MathFunctions } from '../../Utilities'

/**
 * Class representing an attribute.
 */
class Vec2f16Attribute extends Vec2Attribute {
  protected init() {
    this.data = new Uint16Array(0)
    this.initRange(0)
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

    Object.defineProperty(vec2, 'x', {
      get: () => MathFunctions.decode16BitFloat(valueData[0]),
      set: (value) => (valueData[0] = MathFunctions.encode16BitFloat(value)),
    })
    Object.defineProperty(vec2, 'y', {
      get: () => MathFunctions.decode16BitFloat(valueData[1]),
      set: (value) => (valueData[1] = MathFunctions.encode16BitFloat(value)),
    })
    // @ts-ignore
    vec2.set = (x: number, y: number): void => {
      valueData[0] = x
      valueData[1] = y
    }
    return vec2
  }

  /**
   * Returns a copy of the Vec2 value at the specified index.
   *
   * @param index - The index value.
   * @return Vec2 - The value at the specified index.
   */
  getValue(index: number): Vec2 {
    if (index >= this.data.length / this.stride)
      throw new Error('Invalid vertex index:' + index + '. Num Vertices:' + this.data.length / 3)

    const offset = index * this.stride
    const valueData = this.data.subarray(offset, offset + this.stride)
    return new Vec2(MathFunctions.decode16BitFloat(valueData[0]), MathFunctions.decode16BitFloat(valueData[1]))
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
    const valueData = this.data.subarray(offset, offset + this.stride)
    valueData[0] = MathFunctions.encode16BitFloat(value.x)
    valueData[1] = MathFunctions.encode16BitFloat(value.y)
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
    Object.defineProperty(vec2, 'x', {
      get: () => MathFunctions.decode16BitFloat(valueData[0]),
      set: (value) => (valueData[0] = MathFunctions.encode16BitFloat(value)),
    })
    Object.defineProperty(vec2, 'y', {
      get: () => MathFunctions.decode16BitFloat(valueData[1]),
      set: (value) => (valueData[1] = MathFunctions.encode16BitFloat(value)),
    })
    Object.defineProperty(vec2, 'z', {
      get: () => MathFunctions.decode16BitFloat(valueData[2]),
      set: (value) => (valueData[2] = MathFunctions.encode16BitFloat(value)),
    })
    // @ts-ignore
    vec2.set = (x: number, y: number, z: number): void => {
      valueData[0] = x
      valueData[1] = y
      valueData[2] = z
    }
    return vec2
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
  getFaceVertexValue(face: number, faceVertex: number): Vec2 {
    const array = this.getFaceVertexValueRef_array(face, faceVertex)
    return new Vec2(MathFunctions.decode16BitFloat(array[0]), MathFunctions.decode16BitFloat(array[1]))
  }

  /**
   * Sets the value of a corner vertex of a face.
   * @param face - The face index.
   * @param faceVertex - The index of vertex within the face. [0... num face vertices]
   * @param value - The value value.
   */
  setFaceVertexValue(face: number, faceVertex: number, value: Vec2): void {
    const valueData = new Uint16Array(3)
    valueData[0] = MathFunctions.encode16BitFloat(value.x)
    valueData[1] = MathFunctions.encode16BitFloat(value.y)
    this.setFaceVertexValue_array(face, faceVertex, valueData)
  }
}

export { Vec2f16Attribute }
