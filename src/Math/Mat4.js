import { AttrValue } from './AttrValue.js'
import { Vec3 } from './Vec3.js'
import { Mat3 } from './Mat3.js'
import { typeRegistry } from './TypeRegistry.js'

/** This matrix class is based on GLM, and is column major.
 * @extends AttrValue
 */
class Mat4 extends AttrValue {
  /**
   * Create a Mat4.
   * @param {number} m00 - The m00 value.
   * @param {number} m01 - The m01 value.
   * @param {number} m02 - The m02 value.
   * @param {number} m03 - The m03 value.
   * @param {number} m10 - The m10 value.
   * @param {number} m11 - The m11 value.
   * @param {number} m12 - The m12 value.
   * @param {number} m13 - The m13 value.
   * @param {number} m20 - The m20 value.
   * @param {number} m21 - The m21 value.
   * @param {number} m22 - The m22 value.
   * @param {number} m23 - The m23 value.
   * @param {number} m30 - The m30 value.
   * @param {number} m31 - The m31 value.
   * @param {number} m32 - The m32 value.
   * @param {number} m33 - The m33 value.
   */
  constructor(
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
  ) {
    super()

    if (m00 instanceof Float32Array) {
      this.__data = m00
    } else if (m00 instanceof ArrayBuffer) {
      const buffer = m00
      const byteOffset = m01
      this.__data = new Float32Array(buffer, byteOffset, 16)
    } else {
      this.__data = new Float32Array(16)
      this.set(
        m00,
        m01,
        m02,
        m03,
        m10,
        m11,
        m12,
        m13,
        m20,
        m21,
        m22,
        m23,
        m30,
        m31,
        m32,
        m33
      )
    }
  }

  // /////////////////////////////////////////
  // properties

  /**
   * Getter for m00.
   */
  get m00() {
    return this.__data[0]
  }

  /**
   * Setter for m00.
   * @param {number} val - The val param.
   */
  set m00(val) {
    this.__data[0] = val
  }

  /**
   * Getter for m01.
   */
  get m01() {
    return this.__data[1]
  }

  /**
   * Setter for m01.
   * @param {number} val - The val param.
   */
  set m01(val) {
    this.__data[1] = val
  }

  /**
   * Getter for m02.
   */
  get m02() {
    return this.__data[2]
  }

  /**
   * Setter for m02.
   * @param {number} val - The val param.
   */
  set m02(val) {
    this.__data[2] = val
  }

  /**
   * Getter for m03.
   */
  get m03() {
    return this.__data[3]
  }

  /**
   * Setter for m03.
   * @param {number} val - The val param.
   */
  set m03(val) {
    this.__data[3] = val
  }

  /**
   * Getter for m10.
   */
  get m10() {
    return this.__data[4]
  }

  /**
   * Setter for m10.
   * @param {number} val - The val param.
   */
  set m10(val) {
    this.__data[4] = val
  }

  /**
   * Getter for m11.
   */
  get m11() {
    return this.__data[5]
  }

  /**
   * Setter for m11.
   * @param {number} val - The val param.
   */
  set m11(val) {
    this.__data[5] = val
  }

  /**
   * Getter for m12.
   */
  get m12() {
    return this.__data[6]
  }

  /**
   * Setter for m12.
   * @param {number} val - The val param.
   */
  set m12(val) {
    this.__data[6] = val
  }

  /**
   * Getter for m13.
   */
  get m13() {
    return this.__data[7]
  }

  /**
   * Setter for m13.
   * @param {number} val - The val param.
   */
  set m13(val) {
    this.__data[7] = val
  }

  /**
   * Getter for m20.
   */
  get m20() {
    return this.__data[8]
  }

  /**
   * Setter for m20.
   * @param {number} val - The val param.
   */
  set m20(val) {
    this.__data[8] = val
  }

  /**
   * Getter for m21.
   */
  get m21() {
    return this.__data[9]
  }

  /**
   * Setter for m21.
   * @param {number} val - The val param.
   */
  set m21(val) {
    this.__data[9] = val
  }

  /**
   * Getter for m22.
   */
  get m22() {
    return this.__data[10]
  }

  /**
   * Setter for m22.
   * @param {number} val - The val param.
   */
  set m22(val) {
    this.__data[10] = val
  }

  /**
   * Getter for m23.
   */
  get m23() {
    return this.__data[11]
  }

  /**
   * Setter for m23.
   * @param {number} val - The val param.
   */
  set m23(val) {
    this.__data[11] = val
  }

  /**
   * Getter for m30.
   */
  get m30() {
    return this.__data[12]
  }

  /**
   * Setter for m30.
   * @param {number} val - The val param.
   */
  set m30(val) {
    this.__data[12] = val
  }

  /**
   * Getter for m31.
   */
  get m31() {
    return this.__data[13]
  }

  /**
   * Setter for m31.
   * @param {number} val - The val param.
   */
  set m31(val) {
    this.__data[13] = val
  }

  /**
   * Getter for m32.
   */
  get m32() {
    return this.__data[14]
  }

  /**
   * Setter for m32.
   * @param {number} val - The val param.
   */
  set m32(val) {
    this.__data[14] = val
  }

  /**
   * Getter for m33.
   */
  get m33() {
    return this.__data[15]
  }

  /**
   * Setter for m33.
   * @param {number} val - The val param.
   */
  set m33(val) {
    this.__data[15] = val
  }

  /**
   * Getter for xAxis.
   */
  get xAxis() {
    return Vec3.createFromFloat32Buffer(this.__data.buffer, 0)
  }

  /**
   * Setter for xAxis.
   * @param {any} vec3 - The vec3 param.
   */
  set xAxis(vec3) {
    this.xAxis.set(vec3.x, vec3.y, vec3.z)
  }

  /**
   * Getter for yAxis.
   */
  get yAxis() {
    return Vec3.createFromFloat32Buffer(this.__data.buffer, 4)
  }

  /**
   * Setter for yAxis.
   * @param {any} vec3 - The vec3 param.
   */
  set yAxis(vec3) {
    this.yAxis.set(vec3.x, vec3.y, vec3.z)
  }

  /**
   * Getter for zAxis.
   */
  get zAxis() {
    return Vec3.createFromFloat32Buffer(this.__data.buffer, 8)
  }

  /**
   * Setter for zAxis.
   * @param {any} vec3 - The vec3 param.
   */
  set zAxis(vec3) {
    this.zAxis.set(vec3.x, vec3.y, vec3.z)
  }

  /**
   * Returns the translation of the matrix.
   * @return {vec3} - Translation
   */
  get translation() {
    return Vec3.createFromFloat32Buffer(this.__data.buffer, 12)
  }

  /**
   * Setter for translation.
   * @param {any} vec3 - The vec3 param.
   */
  set translation(vec3) {
    this.translation.set(vec3.x, vec3.y, vec3.z)
  }

  // /////////////////////////////////////////
  // Setters

  /**
   * The set method.
   * @param {number} m00 - The m00 value.
   * @param {number} m01 - The m01 value.
   * @param {number} m02 - The m02 value.
   * @param {number} m03 - The m03 value.
   * @param {number} m10 - The m10 value.
   * @param {number} m11 - The m11 value.
   * @param {number} m12 - The m12 value.
   * @param {number} m13 - The m13 value.
   * @param {number} m20 - The m20 value.
   * @param {number} m21 - The m21 value.
   * @param {number} m22 - The m22 value.
   * @param {number} m23 - The m23 value.
   * @param {number} m30 - The m30 value.
   * @param {number} m31 - The m31 value.
   * @param {number} m32 - The m32 value.
   * @param {number} m33 - The m33 value.
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
  ) {
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
   * The setIdentity method.
   */
  setIdentity() {
    this.set()
  }

  /**
   * The setDataArray method.
   * @param {any} float32Array - The float32Array value.
   */
  setDataArray(float32Array) {
    this.__data = float32Array
  }

  /**
   * The setFromMat method.
   * @param {any} mat4 - The mat4 value.
   */
  setFromMat4(mat4) {
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
   * The toMat3 method.
   * @param {any} mat4 - The mat4 value.
   * @return {any} - The return value.
   */
  toMat3(mat4) {
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
   * The transposeInPlace method.
   */
  transposeInPlace() {
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
   * The transpose method.
   * @return {any} - The return value.
   */
  transpose() {
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
   * Inverts a mat4 not using SIMD
   * @return {any} - The return value.
   */
  inverse() {
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
    let det =
      b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06

    if (!det) {
      console.warn('Unable to invert Mat4')
      return null
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
   * The invertInPlace method.
   * @return {any} - The return value.
   */
  invertInPlace() {
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
    let det =
      b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06

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
   * Sets this matrix as the inverse of the given mat4.
   * @param {any} mat4 - The mat4 param.
   * @return {any} - The return value.
   */
  setInverse(mat4) {
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
    let det =
      b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06

    if (!det) {
      throw new Error('Unable to invert Mat4')
      return null
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
   * Multiplies two mat4's explicitly not using SIMD.
   * @param {any} other - The other param.
   * @return {any} - The return value.
   */
  multiply(other) {
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
   * Multiplies by the give mat4 in place explicitly not using SIMD.
   * @param {any} other - The other param.
   * @return {any} - The return value.
   */
  multiplyInPlace(other) {
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
   * Multiplies by the give mat4 in place explicitly not using SIMD.
   * @param {any} other - The other param.
   * @return {any} - The return value.
   */
  postmultiplyInPlace(other) {
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
   * Translate a mat4 by the given vector not using SIMD.
   * @param {any} v3 - The v3 param.
   * @return {any} - The return value.
   */
  translateInPlace(v3) {
    const x = v3.x
    const y = v3.y
    const z = v3.z
    this.__data[12] =
      this.__data[0] * x +
      this.__data[4] * y +
      this.__data[8] * z +
      this.__data[12]
    this.__data[13] =
      this.__data[1] * x +
      this.__data[5] * y +
      this.__data[9] * z +
      this.__data[13]
    this.__data[14] =
      this.__data[2] * x +
      this.__data[6] * y +
      this.__data[10] * z +
      this.__data[14]
    this.__data[15] =
      this.__data[3] * x +
      this.__data[7] * y +
      this.__data[11] * z +
      this.__data[15]
    return this
  }

  /**
   * Generates a look-at matrix with the given pos position, focal point, and up axis.
   * @param {vec3} pos - Position of the viewer
   * @param {vec3} target - Point the viewer is looking at
   * @param {vec3} up - vec3 pointing up
   */
  setLookAt(pos, target, up) {
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
  }

  /**
   * Creates a matrix from a given angle around a given axis.
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotate(dest, dest, rad, axis);
   *
   * @param {vec3} axis - The axis to rotate around.
   * @param {number} rad - The angle to rotate the matrix by.
   * @return {any} - The return value.
   */
  setRotation(axis, rad) {
    let x = axis.x
    let y = axis.y
    let z = axis.z
    let len = axis.length()
    let s
    let c
    let t

    if (Math.abs(len) < Number.EPSILON) {
      return null
    }

    len = 1 / len
    x *= len
    y *= len
    z *= len

    s = Math.sin(rad)
    c = Math.cos(rad)
    t = 1 - c

    // Perform rotation-specific matrix multiplication
    this.__data[0] = x * x * t + c
    this.__data[1] = y * x * t + z * s
    this.__data[2] = z * x * t - y * s
    this.__data[3] = 0
    this.__data[4] = x * y * t - z * s
    this.__data[5] = y * y * t + c
    this.__data[6] = z * y * t + x * s
    this.__data[7] = 0
    this.__data[8] = x * z * t + y * s
    this.__data[9] = y * z * t - x * s
    this.__data[10] = z * z * t + c
    this.__data[11] = 0
    this.__data[12] = 0
    this.__data[13] = 0
    this.__data[14] = 0
    this.__data[15] = 1
    return this
  }

  /**
   * Creates a matrix from the given angle around the X axis.
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotateX(dest, dest, rad);
   *
   * @param {number} rad - The angle to rotate the matrix by.
   * @return {mat4} - The return value.
   */
  setXRotation(rad) {
    const s = Math.sin(rad)
    const c = Math.cos(rad)

    // Perform axis-specific matrix multiplication
    this.__data[0] = 1
    this.__data[1] = 0
    this.__data[2] = 0
    this.__data[3] = 0
    this.__data[4] = 0
    this.__data[5] = c
    this.__data[6] = s
    this.__data[7] = 0
    this.__data[8] = 0
    this.__data[9] = -s
    this.__data[10] = c
    this.__data[11] = 0
    this.__data[12] = 0
    this.__data[13] = 0
    this.__data[14] = 0
    this.__data[15] = 1
    return this
  }

  /**
   * Creates a matrix from the given angle around the Y axis.
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotateY(dest, dest, rad);
   *
   * @param {number} rad the angle to rotate the matrix by
   * @return {mat4} - The return value.
   */
  setYRotation(rad) {
    const s = Math.sin(rad)
    const c = Math.cos(rad)

    // Perform axis-specific matrix multiplication
    this.__data[0] = c
    this.__data[1] = 0
    this.__data[2] = -s
    this.__data[3] = 0
    this.__data[4] = 0
    this.__data[5] = 1
    this.__data[6] = 0
    this.__data[7] = 0
    this.__data[8] = s
    this.__data[9] = 0
    this.__data[10] = c
    this.__data[11] = 0
    this.__data[12] = 0
    this.__data[13] = 0
    this.__data[14] = 0
    this.__data[15] = 1
    return this
  }

  /**
   * Creates a matrix from the given angle around the Z axis.
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotateZ(dest, dest, rad);
   *
   * @param {number} rad - The angle to rotate the matrix by.
   * @return {mat4} - The return value.
   */
  setZRotation(rad) {
    const s = Math.sin(rad)
    const c = Math.cos(rad)

    // Perform axis-specific matrix multiplication
    this.__data[0] = c
    this.__data[1] = s
    this.__data[2] = 0
    this.__data[3] = 0
    this.__data[4] = -s
    this.__data[5] = c
    this.__data[6] = 0
    this.__data[7] = 0
    this.__data[8] = 0
    this.__data[9] = 0
    this.__data[10] = 1
    this.__data[11] = 0
    this.__data[12] = 0
    this.__data[13] = 0
    this.__data[14] = 0
    this.__data[15] = 1
    return this
  }

  /**
   * Transforms the vec4 with a mat4.
   * @param {any} vec - The vec param.
   * @return {vec4} - The return value.
   */
  transformVec4(vec) {
    const x = vec.x
    const y = vec.y
    const z = vec.z
    const w = vec.t
    return new Vec4(
      this.__data[0] * x +
        this.__data[4] * y +
        this.__data[8] * z +
        this.__data[12] * w,
      this.__data[1] * x +
        this.__data[5] * y +
        this.__data[9] * z +
        this.__data[13] * w,
      this.__data[2] * x +
        this.__data[6] * y +
        this.__data[10] * z +
        this.__data[14] * w,
      this.__data[3] * x +
        this.__data[7] * y +
        this.__data[11] * z +
        this.__data[15] * w
    )
  }

  /**
   * The transformVec3 method.
   * @param {any} vec - The vec param.
   * @return {vec3} - The return value.
   */
  transformVec3(vec) {
    const x = vec.x
    const y = vec.y
    const z = vec.z
    return new Vec3(
      this.__data[0] * x +
        this.__data[4] * y +
        this.__data[8] * z +
        this.__data[12],
      this.__data[1] * x +
        this.__data[5] * y +
        this.__data[9] * z +
        this.__data[13],
      this.__data[2] * x +
        this.__data[6] * y +
        this.__data[10] * z +
        this.__data[14]
    )
  }

  /**
   * The rotateVec3 method.
   * @param {any} vec - The vec param.
   * @return {vec3} - The return value.
   */
  rotateVec3(vec) {
    const x = vec.x
    const y = vec.y
    const z = vec.z
    return new Vec3(
      this.__data[0] * x + this.__data[4] * y + this.__data[8] * z,
      this.__data[1] * x + this.__data[5] * y + this.__data[9] * z,
      this.__data[2] * x + this.__data[6] * y + this.__data[10] * z
    )
  }

  /**
   * The setPerspectiveMatrix method.
   * @param {any} fovy - The fovy param.
   * @param {any} aspect - The aspect param.
   * @param {any} near - The near param.
   * @param {any} far - The far param.
   */
  setPerspectiveMatrix(fovy, aspect, near, far) {
    const f = Math.tan(Math.PI * 0.5 - 0.5 * fovy)
    const rangeInv = 1.0 / (near - far)
    this.set(
      f / aspect,
      0,
      0,
      0,
      0,
      f,
      0,
      0,
      0,
      0,
      (near + far) * rangeInv,
      -1,
      0,
      0,
      near * far * rangeInv * 2,
      0
    )
  }

  /**
   * The setOrthographicMatrix method.
   * @param {any} left - The left param.
   * @param {any} right - The right param.
   * @param {any} bottom - The bottom param.
   * @param {any} top - The top param.
   * @param {any} near - The near param.
   * @param {any} far - The far param.
   */
  setOrthographicMatrix(left, right, bottom, top, near, far) {
    const lr = 1 / (left - right)
    const bt = 1 / (bottom - top)
    const nf = 1 / (near - far)
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
  }

  /**
   * The setScale method.
   * @param {any} x - The x param.
   * @param {any} y - The y param.
   * @param {any} z - The z param.
   */
  setScale(x, y, z) {
    if (x instanceof Vec3) {
      this.set(x.x, 0, 0, 0, 0, x.y, 0, 0, 0, 0, x.z, 0, 0, 0, 0, 1)
    } else {
      this.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1)
    }
  }

  /**
   * The setFromMat3x4Array method.
   * @param {any} m3x4 - The m3x4 param.
   */
  setFromMat3x4Array(m3x4) {
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
  }

  /**
   * Creates a new Mat4 to wrap existing memory in a buffer.
   * @param {any} buffer - The buffer param.
   * @param {number} offset - The offset param.
   * @return {any} - The return value.
   */
  static createFromFloat32Buffer(buffer, offset = 0) {
    return new Mat4(buffer, offset * 4) // 4 bytes per 32bit float
  }

  /**
   * Clones this type returning a new instance.
   * @return {any} - The return value.
   */
  clone() {
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

  // ////////////////////////////////////////
  // Static Methods

  /**
   * The create method.
   * @param {...object} ...args - The ...args param.
   * @return {any} - The return value.
   */
  static create(...args) {
    return new Mat4(...args)
  }

  // ///////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistences.
   * @return {object} - The json object.
   */
  toJSON() {
    return this.__data
  }

  /**
   * The fromJSON method.
   * @param {object} json - The json param.
   */
  fromJSON(json) {
    this.__data = new Float32Array(json)
  }
}

typeRegistry.registerType('Mat4', Mat4)

export { Mat4 }
// export default Mat4;
