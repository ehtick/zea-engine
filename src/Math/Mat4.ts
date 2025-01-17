import { Vec3 } from './Vec3'
import { Mat3 } from './Mat3'
import { Vec4 } from './Vec4'
import { BinReader } from '../SceneTree/BinReader'
import { StringFunctions } from '../Utilities/StringFunctions'

/**
 * A class representing a 4x4 matrix.
 * This matrix class is based on GLM, and is column major.
 *
 */
class Mat4 {
  __data: Float32Array
  /**
   * Initializes the Mat3 class with given data.
   *
   * @param m00 - Row 0, column 0.
   * @param m01 - Row 0, column 1.
   * @param m02 - Row 0, column 2.
   * @param m03 - Row 0, column 3.
   * @param m10 - Row 1, column 0.
   * @param m11 - Row 1, column 1.
   * @param m12 - Row 1, column 2.
   * @param m13 - Row 1, column 3.
   * @param m20 - Row 2, column 0.
   * @param m21 - Row 2, column 1.
   * @param m22 - Row 2, column 2.
   * @param m23 - Row 2, column 3.
   * @param m30 - Row 3, column 0.
   * @param m31 - Row 3, column 1.
   * @param m32 - Row 3, column 2.
   * @param m33 - Row 3, column 3.
   */
  constructor(
    m00: number | Float32Array | ArrayBuffer = 1,
    m01 = 0,
    m02 = 0,
    m03 = 0,
    m10 = 0,
    m11 = 1,
    m12 = 0,
    m13 = 0,
    m20 = 0,
    m21 = 0,
    m22 = 1,
    m23 = 0,
    m30 = 0,
    m31 = 0,
    m32 = 0,
    m33 = 1
  ) {
    if (m00 instanceof Float32Array) {
      this.__data = m00
    } else if (m00 instanceof ArrayBuffer) {
      const buffer = m00
      const byteOffset = m01
      this.__data = new Float32Array(buffer, byteOffset, 16)
    } else {
      this.__data = new Float32Array(16)
      this.set(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33)
    }
  }

  // /////////////////////////////////////////
  // properties

  /**
   * Getter for row 0, column 0.
   *
   * @return - Returns the m00 value.
   */
  get m00(): number {
    return this.__data[0]
  }

  /**
   * Setter for row 0, column 0.
   *
   * @param val - The val param.
   */
  set m00(val: number) {
    this.__data[0] = val
  }

  /**
   * Getter for row 0, column 1.
   *
   * @return - Returns the m01 value.
   */
  get m01(): number {
    return this.__data[1]
  }

  /**
   * Setter for row 0, column 1.
   *
   * @param val - The val param.
   */
  set m01(val: number) {
    this.__data[1] = val
  }

  /**
   * Getter for row 0, column 2.
   *
   * @return - Returns the m02 value.
   */
  get m02(): number {
    return this.__data[2]
  }

  /**
   * Setter for row 0, column 2.
   *
   * @param val - The val param.
   */
  set m02(val: number) {
    this.__data[2] = val
  }

  /**
   * Getter for row 0, column 3.
   *
   * @return - Returns the m03 value.
   */
  get m03(): number {
    return this.__data[3]
  }

  /**
   * Setter for row 0, column 3.
   *
   * @param val - The val param.
   */
  set m03(val: number) {
    this.__data[3] = val
  }

  /**
   * Getter for row 1, column 0.
   *
   * @return - Returns the m10 value.
   */
  get m10(): number {
    return this.__data[4]
  }

  /**
   * Setter for row 1, column 0.
   *
   * @param val - The val param.
   */
  set m10(val: number) {
    this.__data[4] = val
  }

  /**
   * Getter for row 1, column 1.
   *
   * @return - Returns the m11 value.
   */
  get m11(): number {
    return this.__data[5]
  }

  /**
   * Setter for row 1, column 1.
   *
   * @param val - The val param.
   */
  set m11(val: number) {
    this.__data[5] = val
  }

  /**
   * Getter for row 1, column 2.
   *
   * @return - Returns the m12 value.
   */
  get m12(): number {
    return this.__data[6]
  }

  /**
   * Setter for row 1, column 2.
   *
   * @param val - The val param.
   */
  set m12(val: number) {
    this.__data[6] = val
  }

  /**
   * Getter for row 1, column 3.
   *
   * @return - Returns the m13 value.
   */
  get m13(): number {
    return this.__data[7]
  }

  /**
   * Setter for row 1, column 3.
   *
   * @param val - The val param.
   */
  set m13(val: number) {
    this.__data[7] = val
  }

  /**
   * Getter for row 2, column 0.
   *
   * @return - Returns the m20 value.
   */
  get m20(): number {
    return this.__data[8]
  }

  /**
   * Setter for row 2, column 0.
   *
   * @param val - The val param.
   */
  set m20(val: number) {
    this.__data[8] = val
  }

  /**
   * Getter for row 2, column 1.
   *
   * @return - Returns the m21 value.
   */
  get m21(): number {
    return this.__data[9]
  }

  /**
   * Setter for row 2, column 1
   *
   * @param val - The val param.
   */
  set m21(val: number) {
    this.__data[9] = val
  }

  /**
   * Getter for row 2, column 2.
   *
   * @return - Returns the m22 value.
   */
  get m22(): number {
    return this.__data[10]
  }

  /**
   * Setter for row 2, column 2.
   *
   * @param val - The val param.
   */
  set m22(val: number) {
    this.__data[10] = val
  }

  /**
   * Getter for row 2, column 3.
   *
   * @return - Returns the m23 value.
   */
  get m23(): number {
    return this.__data[11]
  }

  /**
   * Setter for row 2, column 3.
   *
   * @param val - The val param.
   */
  set m23(val: number) {
    this.__data[11] = val
  }

  /**
   * Getter for row 3, column 0
   *
   * @return - Returns the m30 value.
   */
  get m30(): number {
    return this.__data[12]
  }

  /**
   * Setter for row 3, column 0.
   *
   * @param val - The val param.
   */
  set m30(val: number) {
    this.__data[12] = val
  }

  /**
   * Getter for row 3, column 1.
   *
   * @return - Returns the m31 value.
   */
  get m31(): number {
    return this.__data[13]
  }

  /**
   * Setter for row 3, column 1.
   *
   * @param val - The val param.
   */
  set m31(val: number) {
    this.__data[13] = val
  }

  /**
   * Getter for row 3, column 2.
   *
   * @return - Returns the m32 value.
   */
  get m32(): number {
    return this.__data[14]
  }

  /**
   * Setter for row 3, column 2.
   *
   * @param val - The val param.
   */
  set m32(val: number) {
    this.__data[14] = val
  }

  /**
   * Getter for row 3, column 3.
   *
   * @return - Returns the m33 value.
   */
  get m33(): number {
    return this.__data[15]
  }

  /**
   * Setter for row 3, column 3.
   *
   * @param val - The val param.
   */
  set m33(val: number) {
    this.__data[15] = val
  }

  /**
   * Getter for the `x` axis.
   *
   * @return - Returns the `x` axis as a Vec3.
   */
  get xAxis(): Vec3 {
    return new Vec3(new Float32Array(this.__data.buffer, 0, 3))
  }

  /**
   * Setter for the `x` axis.
   *
   * @param vec3 - The vec3 value.
   */
  set xAxis(vec3: Vec3) {
    this.xAxis.set(vec3.x, vec3.y, vec3.z)
  }

  /**
   * Getter for the `y` axis.
   *
   * @return - Returns the `y` axis as a Vec3.
   */
  get yAxis(): Vec3 {
    return new Vec3(new Float32Array(this.__data.buffer, 4 * 4, 3))
  }

  /**
   * Setter for the `y` axis.
   *
   * @param vec3 - The vec3 value.
   */
  set yAxis(vec3: Vec3) {
    this.yAxis.set(vec3.x, vec3.y, vec3.z)
  }

  /**
   * Getter for the `z` axis.
   *
   * @return - Returns the `z` axis as a Vec3.
   */
  get zAxis(): Vec3 {
    return new Vec3(new Float32Array(this.__data.buffer, 8 * 4, 3))
  }

  /**
   * Setter for the `z` axis.
   *
   * @param vec3 - The vec3 value.
   */
  set zAxis(vec3: Vec3) {
    this.zAxis.set(vec3.x, vec3.y, vec3.z)
  }

  /**
   * Getter for the translation of the matrix. Assumes the translation values are 12, 13, & 14.
   *
   * @return - Returns the translation.
   */
  get translation(): Vec3 {
    return new Vec3(new Float32Array(this.__data.buffer, 12 * 4, 3))
  }

  /**
   * Setter for the translation of the matrix. Assumes the translation values are 12, 13, & 14.
   *
   * @param vec3 - The translation.
   */
  set translation(vec3: Vec3) {
    this.translation.set(vec3.x, vec3.y, vec3.z)
  }

  // /////////////////////////////////////////
  // Setters

  /**
   * Sets the state of the Mat4 class
   *
   * @param m00 - Row 0, column 0.
   * @param m01 - Row 0, column 1.
   * @param m02 - Row 0, column 2.
   * @param m03 - Row 0, column 3.
   * @param m10 - Row 1, column 0.
   * @param m11 - Row 1, column 1.
   * @param m12 - Row 1, column 2.
   * @param m13 - Row 1, column 3.
   * @param m20 - Row 2, column 0.
   * @param m21 - Row 2, column 1.
   * @param m22 - Row 2, column 2.
   * @param m23 - Row 2, column 3.
   * @param m30 - Row 3, column 0.
   * @param m31 - Row 3, column 1.
   * @param m32 - Row 3, column 2.
   * @param m33 - Row 3, column 3.
   */
  set(
    m00 = 1,
    m01 = 0,
    m02 = 0,
    m03 = 0,
    m10 = 0,
    m11 = 1,
    m12 = 0,
    m13 = 0,
    m20 = 0,
    m21 = 0,
    m22 = 1,
    m23 = 0,
    m30 = 0,
    m31 = 0,
    m32 = 0,
    m33 = 1
  ): void {
    this.__data[0] = m00
    this.__data[1] = m01
    this.__data[2] = m02
    this.__data[3] = m03
    this.__data[4] = m10
    this.__data[5] = m11
    this.__data[6] = m12
    this.__data[7] = m13
    this.__data[8] = m20
    this.__data[9] = m21
    this.__data[10] = m22
    this.__data[11] = m23
    this.__data[12] = m30
    this.__data[13] = m31
    this.__data[14] = m32
    this.__data[15] = m33
  }

  /**
   * Sets state of the Mat4 with the identity  Matrix
   */
  setIdentity(): void {
    this.set()
  }

  /**
   * Sets the state of the Mat4 Object.
   *
   * @param float32Array - The float32Array value.
   */
  setDataArray(float32Array: Float32Array): void {
    this.__data = float32Array
  }

  /**
   * Sets state of the Mat4 from another Mat4
   *
   * Note: works with either Mat3 or Mat4.
   *
   * @param mat4 - The mat4 value.
   */
  setFromMat4(mat4: Mat4): void {
    this.__data[0] = mat4.m00
    this.__data[1] = mat4.m01
    this.__data[2] = mat4.m02
    this.__data[3] = mat4.m03
    this.__data[4] = mat4.m10
    this.__data[5] = mat4.m11
    this.__data[6] = mat4.m12
    this.__data[7] = mat4.m13
    this.__data[8] = mat4.m20
    this.__data[9] = mat4.m21
    this.__data[10] = mat4.m22
    this.__data[11] = mat4.m23
    this.__data[12] = mat4.m30
    this.__data[13] = mat4.m31
    this.__data[14] = mat4.m32
    this.__data[15] = mat4.m33
  }

  /**
   * Converts a Mat4 to a Mat3.
   *
   * @return - Returns a new Mat3.
   */
  toMat3(): Mat3 {
    return new Mat3(
      this.__data[0],
      this.__data[1],
      this.__data[2],
      this.__data[4],
      this.__data[5],
      this.__data[6],
      this.__data[8],
      this.__data[9],
      this.__data[10]
    )
  }

  /**
   * Transposes (exchanges columns with rows) this matrix.
   */
  transposeInPlace(): void {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    const a01 = this.__data[1]
    const a02 = this.__data[2]
    const a03 = this.__data[3]
    const a12 = this.__data[6]
    const a13 = this.__data[7]
    const a23 = this.__data[11]

    this.__data[1] = this.__data[4]
    this.__data[2] = this.__data[8]
    this.__data[3] = this.__data[12]
    this.__data[4] = a01
    this.__data[6] = this.__data[9]
    this.__data[7] = this.__data[13]
    this.__data[8] = a02
    this.__data[9] = a12
    this.__data[11] = this.__data[14]
    this.__data[12] = a03
    this.__data[13] = a13
    this.__data[14] = a23
  }

  /**
   * Transposes (exchanges columns with rows) this matrix
   * and returns the result as a new instance.
   *
   * @return - Return a new transposed Mat4.
   */
  transpose(): Mat4 {
    return new Mat4(
      this.__data[0],
      this.__data[4],
      this.__data[8],
      this.__data[12],
      this.__data[1],
      this.__data[5],
      this.__data[9],
      this.__data[13],
      this.__data[2],
      this.__data[6],
      this.__data[10],
      this.__data[14],
      this.__data[3],
      this.__data[7],
      this.__data[11],
      this.__data[15]
    )
  }

  /**
   * Inverts a Mat4 and returns the result as a new instance.
   *
   * @return - Returns a new Mat4.
   */
  inverse(): Mat4 {
    const a00 = this.__data[0]
    const a01 = this.__data[1]
    const a02 = this.__data[2]
    const a03 = this.__data[3]
    const a10 = this.__data[4]
    const a11 = this.__data[5]
    const a12 = this.__data[6]
    const a13 = this.__data[7]
    const a20 = this.__data[8]
    const a21 = this.__data[9]
    const a22 = this.__data[10]
    const a23 = this.__data[11]
    const a30 = this.__data[12]
    const a31 = this.__data[13]
    const a32 = this.__data[14]
    const a33 = this.__data[15]

    const b00 = a00 * a11 - a01 * a10
    const b01 = a00 * a12 - a02 * a10
    const b02 = a00 * a13 - a03 * a10
    const b03 = a01 * a12 - a02 * a11
    const b04 = a01 * a13 - a03 * a11
    const b05 = a02 * a13 - a03 * a12
    const b06 = a20 * a31 - a21 * a30
    const b07 = a20 * a32 - a22 * a30
    const b08 = a20 * a33 - a23 * a30
    const b09 = a21 * a32 - a22 * a31
    const b10 = a21 * a33 - a23 * a31
    const b11 = a22 * a33 - a23 * a32

    // Calculate the determinant
    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06

    if (!det) {
      console.warn('Unable to invert Mat4')
      return this
    }
    det = 1.0 / det

    return new Mat4(
      (a11 * b11 - a12 * b10 + a13 * b09) * det,
      (a02 * b10 - a01 * b11 - a03 * b09) * det,
      (a31 * b05 - a32 * b04 + a33 * b03) * det,
      (a22 * b04 - a21 * b05 - a23 * b03) * det,
      (a12 * b08 - a10 * b11 - a13 * b07) * det,
      (a00 * b11 - a02 * b08 + a03 * b07) * det,
      (a32 * b02 - a30 * b05 - a33 * b01) * det,
      (a20 * b05 - a22 * b02 + a23 * b01) * det,
      (a10 * b10 - a11 * b08 + a13 * b06) * det,
      (a01 * b08 - a00 * b10 - a03 * b06) * det,
      (a30 * b04 - a31 * b02 + a33 * b00) * det,
      (a21 * b02 - a20 * b04 - a23 * b00) * det,
      (a11 * b07 - a10 * b09 - a12 * b06) * det,
      (a00 * b09 - a01 * b07 + a02 * b06) * det,
      (a31 * b01 - a30 * b03 - a32 * b00) * det,
      (a20 * b03 - a21 * b01 + a22 * b00) * det
    )
  }

  /**
   * Inverts a Mat4.
   *
   * @return - The return value.
   */
  invertInPlace(): boolean {
    const a00 = this.__data[0]
    const a01 = this.__data[1]
    const a02 = this.__data[2]
    const a03 = this.__data[3]
    const a10 = this.__data[4]
    const a11 = this.__data[5]
    const a12 = this.__data[6]
    const a13 = this.__data[7]
    const a20 = this.__data[8]
    const a21 = this.__data[9]
    const a22 = this.__data[10]
    const a23 = this.__data[11]
    const a30 = this.__data[12]
    const a31 = this.__data[13]
    const a32 = this.__data[14]
    const a33 = this.__data[15]

    const b00 = a00 * a11 - a01 * a10
    const b01 = a00 * a12 - a02 * a10
    const b02 = a00 * a13 - a03 * a10
    const b03 = a01 * a12 - a02 * a11
    const b04 = a01 * a13 - a03 * a11
    const b05 = a02 * a13 - a03 * a12
    const b06 = a20 * a31 - a21 * a30
    const b07 = a20 * a32 - a22 * a30
    const b08 = a20 * a33 - a23 * a30
    const b09 = a21 * a32 - a22 * a31
    const b10 = a21 * a33 - a23 * a31
    const b11 = a22 * a33 - a23 * a32

    // Calculate the determinant
    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06

    if (!det) {
      console.warn('Unable to invert Mat4')
      return false
    }
    det = 1.0 / det

    this.set(
      (a11 * b11 - a12 * b10 + a13 * b09) * det,
      (a02 * b10 - a01 * b11 - a03 * b09) * det,
      (a31 * b05 - a32 * b04 + a33 * b03) * det,
      (a22 * b04 - a21 * b05 - a23 * b03) * det,
      (a12 * b08 - a10 * b11 - a13 * b07) * det,
      (a00 * b11 - a02 * b08 + a03 * b07) * det,
      (a32 * b02 - a30 * b05 - a33 * b01) * det,
      (a20 * b05 - a22 * b02 + a23 * b01) * det,
      (a10 * b10 - a11 * b08 + a13 * b06) * det,
      (a01 * b08 - a00 * b10 - a03 * b06) * det,
      (a30 * b04 - a31 * b02 + a33 * b00) * det,
      (a21 * b02 - a20 * b04 - a23 * b00) * det,
      (a11 * b07 - a10 * b09 - a12 * b06) * det,
      (a00 * b09 - a01 * b07 + a02 * b06) * det,
      (a31 * b01 - a30 * b03 - a32 * b00) * det,
      (a20 * b03 - a21 * b01 + a22 * b00) * det
    )
    return true
  }
  /**
   * Sets this matrix as the inverse of the given Mat4.
   *
   * @param mat4 - The mat4 value.
   * @return - In case the `determinant` can't be calculated, a `null` will be returned, otherwise, nothing is returned
   */
  setInverse(mat4: Mat4): void {
    const a00 = mat4.__data[0]
    const a01 = mat4.__data[1]
    const a02 = mat4.__data[2]
    const a03 = mat4.__data[3]
    const a10 = mat4.__data[4]
    const a11 = mat4.__data[5]
    const a12 = mat4.__data[6]
    const a13 = mat4.__data[7]
    const a20 = mat4.__data[8]
    const a21 = mat4.__data[9]
    const a22 = mat4.__data[10]
    const a23 = mat4.__data[11]
    const a30 = mat4.__data[12]
    const a31 = mat4.__data[13]
    const a32 = mat4.__data[14]
    const a33 = mat4.__data[15]

    const b00 = a00 * a11 - a01 * a10
    const b01 = a00 * a12 - a02 * a10
    const b02 = a00 * a13 - a03 * a10
    const b03 = a01 * a12 - a02 * a11
    const b04 = a01 * a13 - a03 * a11
    const b05 = a02 * a13 - a03 * a12
    const b06 = a20 * a31 - a21 * a30
    const b07 = a20 * a32 - a22 * a30
    const b08 = a20 * a33 - a23 * a30
    const b09 = a21 * a32 - a22 * a31
    const b10 = a21 * a33 - a23 * a31
    const b11 = a22 * a33 - a23 * a32

    // Calculate the determinant
    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06

    if (!det) {
      throw new Error('Unable to invert Mat4')
    }
    det = 1.0 / det

    this.set(
      (a11 * b11 - a12 * b10 + a13 * b09) * det,
      (a02 * b10 - a01 * b11 - a03 * b09) * det,
      (a31 * b05 - a32 * b04 + a33 * b03) * det,
      (a22 * b04 - a21 * b05 - a23 * b03) * det,
      (a12 * b08 - a10 * b11 - a13 * b07) * det,
      (a00 * b11 - a02 * b08 + a03 * b07) * det,
      (a32 * b02 - a30 * b05 - a33 * b01) * det,
      (a20 * b05 - a22 * b02 + a23 * b01) * det,
      (a10 * b10 - a11 * b08 + a13 * b06) * det,
      (a01 * b08 - a00 * b10 - a03 * b06) * det,
      (a30 * b04 - a31 * b02 + a33 * b00) * det,
      (a21 * b02 - a20 * b04 - a23 * b00) * det,
      (a11 * b07 - a10 * b09 - a12 * b06) * det,
      (a00 * b09 - a01 * b07 + a02 * b06) * det,
      (a31 * b01 - a30 * b03 - a32 * b00) * det,
      (a20 * b03 - a21 * b01 + a22 * b00) * det
    )
  }
  /**
   * Multiplies two Mat4s and returns the result as a new instance.
   *
   * @param other - The other Mat4 to multiply with.
   * @return - Returns a new Mat4.
   */
  multiply(other: Mat4): Mat4 {
    const a00 = this.__data[0]
    const a01 = this.__data[1]
    const a02 = this.__data[2]
    const a03 = this.__data[3]
    const a10 = this.__data[4]
    const a11 = this.__data[5]
    const a12 = this.__data[6]
    const a13 = this.__data[7]
    const a20 = this.__data[8]
    const a21 = this.__data[9]
    const a22 = this.__data[10]
    const a23 = this.__data[11]
    const a30 = this.__data[12]
    const a31 = this.__data[13]
    const a32 = this.__data[14]
    const a33 = this.__data[15]

    // Cache only the current line of the second matrix
    const b = other.asArray()
    let b0 = b[0]
    let b1 = b[1]
    let b2 = b[2]
    let b3 = b[3]
    const result = new Mat4()
    result.m00 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
    result.m01 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
    result.m02 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
    result.m03 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

    b0 = b[4]
    b1 = b[5]
    b2 = b[6]
    b3 = b[7]
    result.m10 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
    result.m11 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
    result.m12 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
    result.m13 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

    b0 = b[8]
    b1 = b[9]
    b2 = b[10]
    b3 = b[11]
    result.m20 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
    result.m21 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
    result.m22 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
    result.m23 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

    b0 = b[12]
    b1 = b[13]
    b2 = b[14]
    b3 = b[15]
    result.m30 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
    result.m31 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
    result.m32 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
    result.m33 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33
    return result
  }

  /**
   * Multiplies two Mat4s in place explicitly not using SIMD.
   *
   * @param other - The other Mat4 to multiply with.
   * @return - Returns a new Mat4.
   */
  multiplyInPlace(other: Mat4): Mat4 {
    const a = this.asArray()
    const a00 = a[0]
    const a01 = a[1]
    const a02 = a[2]
    const a03 = a[3]
    const a10 = a[4]
    const a11 = a[5]
    const a12 = a[6]
    const a13 = a[7]
    const a20 = a[8]
    const a21 = a[9]
    const a22 = a[10]
    const a23 = a[11]
    const a30 = a[12]
    const a31 = a[13]
    const a32 = a[14]
    const a33 = a[15]

    // Cache only the current line of the second matrix
    const b = other.asArray()
    let b0 = b[0]
    let b1 = b[1]
    let b2 = b[2]
    let b3 = b[3]
    this.m00 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
    this.m01 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
    this.m02 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
    this.m03 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

    b0 = b[4]
    b1 = b[5]
    b2 = b[6]
    b3 = b[7]
    this.m10 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
    this.m11 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
    this.m12 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
    this.m13 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

    b0 = b[8]
    b1 = b[9]
    b2 = b[10]
    b3 = b[11]
    this.m20 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
    this.m21 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
    this.m22 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
    this.m23 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

    b0 = b[12]
    b1 = b[13]
    b2 = b[14]
    b3 = b[15]
    this.m30 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
    this.m31 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
    this.m32 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
    this.m33 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33
    return this
  }

  /**
   * Post multiplies two Mat4s in place explicitly not using SIMD.
   *
   * @param other - The other Mat4 to multiply with.
   * @return - Returns the result as a new Mat4.
   */
  postMultiplyInPlace(other: Mat4): Mat4 {
    const a = other.asArray()
    const a00 = a[0]
    const a01 = a[1]
    const a02 = a[2]
    const a03 = a[3]
    const a10 = a[4]
    const a11 = a[5]
    const a12 = a[6]
    const a13 = a[7]
    const a20 = a[8]
    const a21 = a[9]
    const a22 = a[10]
    const a23 = a[11]
    const a30 = a[12]
    const a31 = a[13]
    const a32 = a[14]
    const a33 = a[15]

    // Cache only the current line of the second matrix
    const b = this.asArray()
    let b0 = b[0]
    let b1 = b[1]
    let b2 = b[2]
    let b3 = b[3]
    this.m00 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
    this.m01 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
    this.m02 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
    this.m03 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

    b0 = b[4]
    b1 = b[5]
    b2 = b[6]
    b3 = b[7]
    this.m10 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
    this.m11 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
    this.m12 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
    this.m13 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

    b0 = b[8]
    b1 = b[9]
    b2 = b[10]
    b3 = b[11]
    this.m20 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
    this.m21 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
    this.m22 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
    this.m23 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

    b0 = b[12]
    b1 = b[13]
    b2 = b[14]
    b3 = b[15]
    this.m30 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
    this.m31 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
    this.m32 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
    this.m33 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33
    return this
  }

  /**
   * Translate a Mat4 by the given vector not using SIMD.
   *
   * @param v3 - The given vector to translate along.
   * @return - The return value.
   */
  translateInPlace(v3: Vec3): Mat4 {
    const a = this.__data
    const x = v3.x
    const y = v3.y
    const z = v3.z
    a[12] = a[0] * x + a[4] * y + a[8] * z + a[12]
    a[13] = a[1] * x + a[5] * y + a[9] * z + a[13]
    a[14] = a[2] * x + a[6] * y + a[10] * z + a[14]
    a[15] = a[3] * x + a[7] * y + a[11] * z + a[15]
    return this
  }

  /**
   * Generates a look-at matrix with the given position, focal point, and up axis.
   *
   * @param pos - Position of the viewer.
   * @param target - Point the viewer is looking at.
   * @param up - Vec3 pointing up.
   */
  setLookAt(pos: Vec3, target: Vec3, up: Vec3): void {
    const zAxis = pos.subtract(target)
    const zLen = zAxis.length()
    if (zLen < Number.EPSILON) {
      this.setIdentity()
      return
    }
    zAxis.scaleInPlace(1.0 / zLen)

    const xAxis = up.cross(zAxis)
    const xLen = xAxis.length()
    if (xLen > Number.EPSILON) xAxis.scaleInPlace(1.0 / xLen)

    const yAxis = zAxis.cross(xAxis)
    const yLen = yAxis.length()
    if (yLen > Number.EPSILON) yAxis.scaleInPlace(1.0 / yLen)

    /* eslint-disable prettier/prettier*/
    this.set(
      xAxis.x,
      xAxis.y,
      xAxis.z,
      0,
      yAxis.x,
      yAxis.y,
      yAxis.z,
      0,
      zAxis.x,
      zAxis.y,
      zAxis.z,
      0,
      pos.x,
      pos.y,
      pos.z,
      1
    )
    /* eslint-enable prettier/prettier*/
  }

  /**
   * Creates a matrix from a given angle around a given axis.
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotate(dest, dest, rad, axis);
   *
   * @param axis - The axis to rotate around.
   * @param rad - The angle to rotate the matrix by.
   * @return - The return value.
   */
  setRotation(axis: Vec3, rad: number): Mat4 | null {
    const len = axis.length()

    if (Math.abs(len) < Number.EPSILON) {
      return null
    }

    const x = axis.x / len
    const y = axis.y / len
    const z = axis.z / len

    const s = Math.sin(rad)
    const c = Math.cos(rad)
    const t = 1 - c

    // Perform rotation-specific matrix multiplication
    const a = this.__data
    a[0] = x * x * t + c
    a[1] = y * x * t + z * s
    a[2] = z * x * t - y * s
    a[3] = 0
    a[4] = x * y * t - z * s
    a[5] = y * y * t + c
    a[6] = z * y * t + x * s
    a[7] = 0
    a[8] = x * z * t + y * s
    a[9] = y * z * t - x * s
    a[10] = z * z * t + c
    a[11] = 0
    a[12] = 0
    a[13] = 0
    a[14] = 0
    a[15] = 1
    return this
  }

  /**
   * Creates a matrix from the given angle around the X axis.
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotateX(dest, dest, rad);
   *
   * @param rad - The angle to rotate the matrix by.
   * @return - The return value.
   */
  setXRotation(rad: number): Mat4 {
    const s = Math.sin(rad)
    const c = Math.cos(rad)

    // Perform axis-specific matrix multiplication
    const a = this.__data
    /* eslint-disable prettier/prettier*/
    a[0] = 1
    a[1] = 0
    a[2] = 0
    a[3] = 0
    a[4] = 0
    a[5] = c
    a[6] = s
    a[7] = 0
    a[8] = 0
    a[9] = -s
    a[10] = c
    a[11] = 0
    a[12] = 0
    a[13] = 0
    a[14] = 0
    a[15] = 1
    /* eslint-enable prettier/prettier*/
    return this
  }

  /**
   * Creates a matrix from the given angle around the Y axis.
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotateY(dest, dest, rad);
   *
   * @param rad - The angle to rotate the matrix by.
   * @return - The return value.
   */
  setYRotation(rad: number): Mat4 {
    const s = Math.sin(rad)
    const c = Math.cos(rad)

    // Perform axis-specific matrix multiplication
    const a = this.__data
    /* eslint-disable prettier/prettier*/
    a[0] = c
    a[1] = 0
    a[2] = -s
    a[3] = 0
    a[4] = 0
    a[5] = 1
    a[6] = 0
    a[7] = 0
    a[8] = s
    a[9] = 0
    a[10] = c
    a[11] = 0
    a[12] = 0
    a[13] = 0
    a[14] = 0
    a[15] = 1
    /* eslint-enable prettier/prettier*/
    return this
  }

  /**
   * Creates a matrix from the given angle around the Z axis.
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotateZ(dest, dest, rad);
   *
   * @param rad - The angle to rotate the matrix by.
   * @return - The return value.
   */
  setZRotation(rad: number): Mat4 {
    const s = Math.sin(rad)
    const c = Math.cos(rad)

    // Perform axis-specific matrix multiplication
    const a = this.__data
    /* eslint-disable prettier/prettier*/
    a[0] = c
    a[1] = s
    a[2] = 0
    a[3] = 0
    a[4] = -s
    a[5] = c
    a[6] = 0
    a[7] = 0
    a[8] = 0
    a[9] = 0
    a[10] = 1
    a[11] = 0
    a[12] = 0
    a[13] = 0
    a[14] = 0
    a[15] = 1
    /* eslint-enable prettier/prettier*/
    return this
  }

  /**
   * Transforms the Vec4 with a Mat4.
   *
   * @param vec - The vec value.
   * @return - Return the result as a new Vec4.
   */
  transformVec4(vec: Vec4): Vec4 {
    const a = this.__data
    const x = vec.x
    const y = vec.y
    const z = vec.z
    const w = vec.t
    return new Vec4(
      a[0] * x + a[4] * y + a[8] * z + a[12] * w,
      a[1] * x + a[5] * y + a[9] * z + a[13] * w,
      a[2] * x + a[6] * y + a[10] * z + a[14] * w,
      a[3] * x + a[7] * y + a[11] * z + a[15] * w
    )
  }

  /**
   * Transforms the Vec3 with a Mat4.
   *
   * @param vec - The vec value.
   * @return - Return the result as a new Vec3.
   */
  transformVec3(vec: Vec3): Vec3 {
    const a = this.__data
    const x = vec.x
    const y = vec.y
    const z = vec.z
    return new Vec3(
      a[0] * x + a[4] * y + a[8] * z + a[12],
      a[1] * x + a[5] * y + a[9] * z + a[13],
      a[2] * x + a[6] * y + a[10] * z + a[14]
    )
  }

  /**
   * Rotates a given `Vec3` and the result is returned as a new `Vec3`, applying only the top left components of the matrix, so not applying any translation.
   * @param vec - The vec value.
   * @return - Return the result as a new Vec3.
   */
  rotateVec3(vec: Vec3): Vec3 {
    const a = this.__data
    const x = vec.x
    const y = vec.y
    const z = vec.z
    return new Vec3(a[0] * x + a[4] * y + a[8] * z, a[1] * x + a[5] * y + a[9] * z, a[2] * x + a[6] * y + a[10] * z)
  }

  /**
   * Set the perspective from a Mat4.
   *
   * @param fovY - The fovY value.
   * @param aspect - The aspect value.
   * @param near - The near value.
   * @param far - The far value.
   */
  setPerspectiveMatrix(fovy: number, aspect: number, near: number, far: number): void {
    const f = Math.tan(Math.PI * 0.5 - 0.5 * fovy)
    const rangeInv = 1.0 / (near - far)
    /* eslint-disable prettier/prettier*/
    this.set(f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (near + far) * rangeInv, -1, 0, 0, near * far * rangeInv * 2, 0)
    /* eslint-enable prettier/prettier*/
  }

  /**
   * Calculates the orthographic matrix and sets the state of the Mat4 class
   *
   * @param left - The left value.
   * @param right - The right value.
   * @param bottom - The bottom value.
   * @param top - The top value.
   * @param near - The near value.
   * @param far - The far value.
   */
  setOrthographicMatrix(left: number, right: number, bottom: number, top: number, near: number, far: number): void {
    const lr = 1 / (left - right)
    const bt = 1 / (bottom - top)
    const nf = 1 / (near - far)
    /* eslint-disable prettier/prettier*/
    this.set(
      -2 * lr,
      0,
      0,
      0,
      0,
      -2 * bt,
      0,
      0,
      0,
      0,
      2 * nf,
      0,
      (left + right) * lr,
      (top + bottom) * bt,
      (far + near) * nf,
      1
    )
    /* eslint-enable prettier/prettier*/
  }

  /**
   * Set the Matrix to be a scale matrix.
   *
   * @param x - The x value.
   * @param y - The y value.
   * @param z - The z value.
   */
  setScale(x: number | Vec3, y: number, z: number): void {
    /* eslint-disable prettier/prettier*/
    if (x instanceof Vec3) {
      this.set(x.x, 0, 0, 0, 0, x.y, 0, 0, 0, 0, x.z, 0, 0, 0, 0, 1)
    } else {
      this.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1)
    }
    /* eslint-enable prettier/prettier*/
  }

  /**
   * Transforms a 3x4 matrix into a 4x4 matrix and set the result to the Math4 state.
   *
   * @param m3x4 - The m3x4 value.
   */
  setFromMat3x4Array(m3x4: number[]): void {
    /* eslint-disable prettier/prettier*/
    this.set(
      m3x4[0],
      m3x4[1],
      m3x4[2],
      0,
      m3x4[3],
      m3x4[4],
      m3x4[5],
      0,
      m3x4[6],
      m3x4[7],
      m3x4[8],
      0,
      m3x4[9],
      m3x4[10],
      m3x4[11],
      1
    )
    /* eslint-enable prettier/prettier*/
  }

  /**
   * Clones this Mat4 returning a new instance.
   *
   * @return - Returns a new Mat4.
   */
  clone(): Mat4 {
    return new Mat4(
      this.__data[0],
      this.__data[1],
      this.__data[2],
      this.__data[3],
      this.__data[4],
      this.__data[5],
      this.__data[6],
      this.__data[7],
      this.__data[8],
      this.__data[9],
      this.__data[10],
      this.__data[11],
      this.__data[12],
      this.__data[13],
      this.__data[14],
      this.__data[15]
    )
  }

  // ///////////////////////////
  // Persistence

  /**
   * Converts this Vec3 to a string in JSON format.
   *
   * @return - The return value.
   */
  toString(): string {
    // eslint-disable-next-line new-cap
    return StringFunctions.stringifyJSONWithFixedPrecision(this.toJSON())
  }

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @return {Float32Array} - The json object.
   */
  toJSON(): Float32Array {
    return this.__data
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param json - The json param.
   */
  fromJSON(json: number[]): void {
    this.__data = new Float32Array(json)
  }

  /**
   * Loads the state of the value from a binary reader.
   *
   * @param reader - The reader value.
   */
  readBinary(reader: BinReader): void {
    this.__data = reader.loadFloat32Array(16)
  }

  /**
   * Returns current Math type data as array. Often used to pass types to the GPU.
   *
   * @return - Returns the result as an array.
   */
  asArray(): Float32Array {
    return this.__data
  }
}

export { Mat4 }
