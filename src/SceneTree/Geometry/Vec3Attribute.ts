import { Attribute } from './Attribute'
import { Vec3 } from '../../Math/Vec3'
import { Registry } from '../../Registry'

/**
 * Class representing an attribute.
 */
class Vec3Attribute extends Attribute {
  /**
   * Create a Vec3Attribute.
   */
  constructor(dataTypeName: string = 'Vec3') {
    super(dataTypeName, 3)
    this.normalized = false
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
    Object.defineProperty(vec3, 'x', { get: () => valueData[0], set: (value) => (valueData[0] = value) })
    Object.defineProperty(vec3, 'y', { get: () => valueData[1], set: (value) => (valueData[1] = value) })
    Object.defineProperty(vec3, 'z', { get: () => valueData[2], set: (value) => (valueData[2] = value) })
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
    const valueData = this.data.slice(offset, offset + this.stride)
    return new Vec3(valueData[0], valueData[1], valueData[2])
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
  getFaceVertexValueRef(face: number, faceVertex: number): Vec3 {
    const valueData = this.getFaceVertexValueRef_array(face, faceVertex)
    const vec3 = new Vec3()
    Object.defineProperty(vec3, 'x', { get: () => valueData[0], set: (value) => (valueData[0] = value) })
    Object.defineProperty(vec3, 'y', { get: () => valueData[1], set: (value) => (valueData[1] = value) })
    Object.defineProperty(vec3, 'z', { get: () => valueData[2], set: (value) => (valueData[2] = value) })
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
    return new Vec3(array[0], array[1], array[2])
  }

  /**
   * Sets the value of a corner vertex of a face.
   * @param face - The face index.
   * @param faceVertex - The index of vertex within the face. [0... num face vertices]
   * @param value - The value value.
   */
  setFaceVertexValue(face: number, faceVertex: number, value: Vec3): void {
    this.setFaceVertexValue_array(face, faceVertex, value.asArray())
  }

  /**
   * The setSplitVertexValue method.
   * @param vertex - The vertex value.
   * @param face - The face index.
   * @param value - The value value.
   */
  setSplitVertexValue(vertex: number, face: number, value: Vec3): void {
    this.setSplitVertexValue_array(vertex, face, value.asArray())
  }
}

Registry.register('Vec3Attribute', Vec3Attribute)

export { Vec3Attribute }
