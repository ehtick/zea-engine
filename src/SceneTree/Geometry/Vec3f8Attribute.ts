import { Vec3Attribute } from './Vec3Attribute'
import { Vec3 } from '../../Math/Vec3'
import { MathFunctions } from '../../Utilities'

/**
 * Class representing an attribute.
 */
class Vec3f8Attribute extends Vec3Attribute {
  private valueRange: number[]
  /**
   * Create a Vec3f8Attribute.
   */
  constructor(valueRange: number[] = [-1, 1]) {
    super('Vec3f8')
    this.valueRange = valueRange
  }

  protected init() {
    this.data = new Int8Array(0)
    this.initRange(0)
  }

  private mapIn(invalue: number): number {
    return MathFunctions.remap(invalue, this.valueRange[0], this.valueRange[1], -127, 127)
  }
  private mapOut(invalue: number): number {
    return MathFunctions.remap(invalue, -127, 127, this.valueRange[0], this.valueRange[1])
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
      get: () => this.mapOut(valueData[0]),
      set: (value) => (valueData[0] = this.mapIn(value)),
    })
    Object.defineProperty(vec3, 'y', {
      get: () => this.mapOut(valueData[1]),
      set: (value) => (valueData[1] = this.mapIn(value)),
    })
    Object.defineProperty(vec3, 'z', {
      get: () => this.mapOut(valueData[2]),
      set: (value) => (valueData[2] = this.mapIn(value)),
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
    return new Vec3(this.mapOut(valueData[0]), this.mapOut(valueData[1]), this.mapOut(valueData[2]))
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
    valueData[0] = this.mapIn(value.x)
    valueData[1] = this.mapIn(value.y)
    valueData[2] = this.mapIn(value.z)
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
      get: () => valueData[0] / 255,
      set: (value) => (valueData[0] = this.mapIn(value)),
    })
    Object.defineProperty(vec3, 'y', {
      get: () => valueData[1] / 255,
      set: (value) => (valueData[1] = this.mapIn(value)),
    })
    Object.defineProperty(vec3, 'z', {
      get: () => valueData[2] / 255,
      set: (value) => (valueData[2] = this.mapIn(value)),
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
    return new Vec3(this.mapOut(array[0]), this.mapOut(array[1]), this.mapOut(array[2]))
  }

  /**
   * Sets the value of a corner vertex of a face.
   * @param face - The face index.
   * @param faceVertex - The index of vertex within the face. [0... num face vertices]
   * @param value - The value value.
   */
  setFaceVertexValue(face: number, faceVertex: number, value: Vec3): void {
    const valueData = new Int8Array(3)
    valueData[0] = this.mapIn(value.x)
    valueData[1] = this.mapIn(value.y)
    valueData[2] = this.mapIn(value.z)
    this.setFaceVertexValue_array(face, faceVertex, valueData)
  }

  /**
   * The setSplitVertexValues method.
   * @param vertex - The vertex value.
   * @param faceGroup - The faceGroup value.
   * @param value - The value value.
   */
  setSplitVertexValues(vertex: number, faceGroup: number[], value: Vec3): void {
    if (!(vertex in this.splits)) this.splits[vertex] = {}
    const splitIndex = this.splitValues.length
    const valueData = new Int8Array(3)
    valueData[0] = this.mapIn(value.x)
    valueData[1] = this.mapIn(value.y)
    valueData[2] = this.mapIn(value.z)
    this.splitValues.push(valueData)
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
}

export { Vec3f8Attribute }
