import { Vec3Attribute } from './Vec3Attribute'
import { Vec3 } from '../../Math/Vec3'
import { MathFunctions } from '../../Utilities'

/**
 * Class representing an attribute.
 */
class Vec3f16Attribute extends Vec3Attribute {
  protected init() {
    this.data = new Uint16Array(0)
    this.initRange(0)
  }

  /**
   * Returns the Vec3 value at the specified index.
   *
   * > Note: 'Ref' means that the value contains a reference to the data in the attribute.
   * > The components of the value can be changed causing the attributes data is changed.
   * > No need to call 'setValue'.
   *
   * @param index - The index value.
   * @returns Vec3 - The value at the specified index.
   */
  getValueRef(index: number): Vec3 {
    if (index >= this.data.length / this.stride)
      throw new Error('Invalid vertex index:' + index + '. Num Vertices:' + this.data.length / 3)

    const offset = index * this.stride
    const valueData = this.data.subarray(offset, offset + this.stride)
    const vec3 = new Vec3()

    Object.defineProperty(vec3, 'x', {
      get: () => MathFunctions.decode16BitFloat(valueData[0]),
      set: (value) => (valueData[0] = MathFunctions.encode16BitFloat(value)),
    })
    Object.defineProperty(vec3, 'y', {
      get: () => MathFunctions.decode16BitFloat(valueData[1]),
      set: (value) => (valueData[1] = MathFunctions.encode16BitFloat(value)),
    })
    Object.defineProperty(vec3, 'z', {
      get: () => MathFunctions.decode16BitFloat(valueData[2]),
      set: (value) => (valueData[2] = MathFunctions.encode16BitFloat(value)),
    })
    // @ts-ignore
    vec3.set = (x: number, y: number, z: number): void => {
      valueData[0] = x
      valueData[1] = y
      valueData[2] = z
    }
    return vec3
  }

  /**
   * Returns a copy of the Vec3 value at the specified index.
   *
   * @param index - The index value.
   * @return Vec3 - The value at the specified index.
   */
  getValue(index: number): Vec3 {
    if (index >= this.data.length / this.stride)
      throw new Error('Invalid vertex index:' + index + '. Num Vertices:' + this.data.length / 3)

    const offset = index * this.stride
    const valueData = this.data.subarray(offset, offset + this.stride)
    return new Vec3(
      MathFunctions.decode16BitFloat(valueData[0]),
      MathFunctions.decode16BitFloat(valueData[1]),
      MathFunctions.decode16BitFloat(valueData[2])
    )
  }

  /**
   * Sets Vec3 at the specified index.
   *
   * @param index - The index value.
   * @param value - The value param.
   */
  setValue(index: number, value: Vec3): void {
    if (index >= this.data.length / this.stride)
      throw new Error('Invalid vertex index:' + index + '. Num Vertices:' + this.data.length / 3)

    const offset = index * this.stride
    const valueData = this.data.subarray(offset, offset + this.stride)
    valueData[0] = MathFunctions.encode16BitFloat(value.x)
    valueData[1] = MathFunctions.encode16BitFloat(value.y)
    valueData[2] = MathFunctions.encode16BitFloat(value.z)
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
  getFaceVertexValueRef(face: number, faceVertex: number): Vec3 {
    const valueData = this.getFaceVertexValueRef_array(face, faceVertex)
    const vec3 = new Vec3()
    Object.defineProperty(vec3, 'x', {
      get: () => MathFunctions.decode16BitFloat(valueData[0]),
      set: (value) => (valueData[0] = MathFunctions.encode16BitFloat(value)),
    })
    Object.defineProperty(vec3, 'y', {
      get: () => MathFunctions.decode16BitFloat(valueData[1]),
      set: (value) => (valueData[1] = MathFunctions.encode16BitFloat(value)),
    })
    Object.defineProperty(vec3, 'z', {
      get: () => MathFunctions.decode16BitFloat(valueData[2]),
      set: (value) => (valueData[2] = MathFunctions.encode16BitFloat(value)),
    })
    vec3.set = (x: number, y: number, z: number): void => {
      valueData[0] = x
      valueData[1] = y
      valueData[2] = z
    }
    return vec3
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
  getFaceVertexValue(face: number, faceVertex: number): Vec3 {
    const array = this.getFaceVertexValueRef_array(face, faceVertex)
    return new Vec3(
      MathFunctions.decode16BitFloat(array[0]),
      MathFunctions.decode16BitFloat(array[1]),
      MathFunctions.decode16BitFloat(array[2])
    )
  }

  /**
   * Sets the value of a corner vertex of a face.
   * @param face - The face index.
   * @param faceVertex - The index of vertex within the face. [0... num face vertices]
   * @param value - The value value.
   */
  setFaceVertexValue(face: number, faceVertex: number, value: Vec3): void {
    const valueData = new Uint16Array(3)
    valueData[0] = MathFunctions.encode16BitFloat(value.x)
    valueData[1] = MathFunctions.encode16BitFloat(value.y)
    valueData[2] = MathFunctions.encode16BitFloat(value.z)
    this.setFaceVertexValue_array(face, faceVertex, valueData)
  }
}

export { Vec3f16Attribute }
