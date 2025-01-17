/* eslint-disable no-unused-vars */
import { Vec3 } from './Vec3'
import { Mat3 } from './Mat3'
import { Mat4 } from './Mat4'
import { EulerAngles } from './EulerAngles'
import { BinReader } from '../SceneTree/BinReader'
import { StringFunctions } from '../Utilities/StringFunctions'

/**
 * Class representing a quaternion. Quaternions are used to represent 3 dimensional rotations.
 *
 * While Quaternions are difficult to understand they have important mathematical properties that make them very useful in 3d engines.
 * They can be directly multiplied together in the same was as matrices.
 * They can be interpolated from one value to another while maintaining constant angular velocity.
 * They can be converted to other more easily understood representations such as EulerAngles or Matrices.
 *

 */
class Quat {
  __data: Float32Array
  /**
   * Creates a quaternion.
   *
   * @param x - The angle of the x axis. Default is 0.
   * @param y - The angle of the y axis. Default is 0.
   * @param z - The angle of the z axis. Default is 0.
   * @param w - The w value. Default is 1.
   */
  constructor(x: number | ArrayBuffer = 0, y = 0, z = 0, w = 1) {
    if (x instanceof Float32Array) {
      this.__data = x
    } else if (x instanceof ArrayBuffer) {
      console.warn(`deprecated, please use new Vec4(new Float32Array(buffer, byteOffset, 4))`)
      const buffer = x
      const byteOffset = y
      this.__data = new Float32Array(buffer, byteOffset, 4)
    } else {
      this.__data = new Float32Array(4)
      if (typeof x === 'object') {
        this.__data[0] = 0
        this.__data[1] = 0
        this.__data[2] = 0
        this.__data[3] = 1
        this.fromJSON(x)
        //  for (const key in x) {
        //  if (Array.isArray(x[key])) this[key].call(this, ...x[key])
        //  else this[key].call(this, x[key])
        //}
      } else {
        this.__data[0] = x
        this.__data[1] = y
        this.__data[2] = z
        this.__data[3] = w
      }
    }
  }

  /**
   * Getter for `x` axis rotation.
   *
   * @return - Returns the x axis rotation.
   */
  get x(): number {
    return this.__data[0]
  }

  /**
   * Setter for `x` axis rotation.
   *
   * @param val - The val param.
   */
  set x(val: number) {
    this.__data[0] = val
  }

  /**
   * Getter for `y` axis rotation.
   *
   * @return - Returns the y axis rotation.
   */
  get y(): number {
    return this.__data[1]
  }

  /**
   * Setter for `y` axis rotation.
   *
   * @param val - The val param.
   */
  set y(val: number) {
    this.__data[1] = val
  }

  /**
   * Getter for `z` axis rotation.
   *
   * @return - Returns the z axis rotation.
   */
  get z(): number {
    return this.__data[2]
  }

  /**
   * Setter for `z` axis rotation.
   *
   * @param val - The val param.
   */
  set z(val: number) {
    this.__data[2] = val
  }

  /**
   * Getter for `w` value.
   *
   * @return - Returns the w value.
   */
  get w(): number {
    return this.__data[3]
  }

  /**
   * Setter for `w`.
   * @param val - The val param.
   */
  set w(val: number) {
    this.__data[3] = val
  }

  /**
   * Setter from scalar components.
   *
   * @param x - The x axis rotation.
   * @param y  - The y axis rotation.
   * @param z  - The z axis rotation.
   * @param w  - The w value.
   */
  set(x: number, y: number, z: number, w: number): void {
    this.__data[0] = x
    this.__data[1] = y
    this.__data[2] = z
    this.__data[3] = w
  }

  /**
   * Sets the state of the Quat class using a Float32Array.
   *
   * @param float32Array - The float32Array value.
   */
  setDataArray(float32Array: Float32Array): void {
    this.__data = <Float32Array>float32Array // TODO: added cast
  }

  /**
   * Setter from another vector.
   *
   * @param other - The other vector to set from.
   */
  setFromOther(other: Quat): void {
    this.__data[0] = other.x
    this.__data[1] = other.y
    this.__data[2] = other.z
    this.__data[3] = other.w
  }

  /**
   * Set this Quat from a euler rotation.
   *
   * @param eulerAngles - The euler angles rotation.
   */
  setFromEulerAngles(eulerAngles: EulerAngles): void {
    const ordered = new Vec3()

    switch (eulerAngles.order) {
      case 0:
        // 'XYZ'
        ordered.set(eulerAngles.x, -eulerAngles.y, eulerAngles.z)
        break
      case 1:
        // 'YZX'
        ordered.set(eulerAngles.y, -eulerAngles.z, eulerAngles.x)
        break
      case 2:
        // 'ZXY'
        ordered.set(eulerAngles.z, -eulerAngles.x, eulerAngles.y)
        break
      case 3:
        // 'XZY'
        ordered.set(eulerAngles.x, eulerAngles.z, eulerAngles.y)
        break
      case 4:
        // 'ZYX'
        ordered.set(eulerAngles.z, eulerAngles.y, eulerAngles.x)
        break
      case 5:
        // 'YXZ'
        ordered.set(eulerAngles.y, eulerAngles.x, eulerAngles.z)
        break
      default:
        throw new Error(`Invalid EulerAngles order: ${eulerAngles.order}`)
    }

    const ti = ordered.x * 0.5
    const tj = ordered.y * 0.5
    const tk = ordered.z * 0.5
    const ci = Math.cos(ti)
    const cj = Math.cos(tj)
    const ck = Math.cos(tk)
    const si = Math.sin(ti)
    const sj = Math.sin(tj)
    const sk = Math.sin(tk)
    const cc = ci * ck
    const cs = ci * sk
    const sc = si * ck
    const ss = si * sk
    const ai = cj * sc - sj * cs
    const aj = cj * ss + sj * cc
    const ak = cj * cs - sj * sc

    this.w = cj * cc + sj * ss

    switch (eulerAngles.order) {
      case 0:
        // ' XYZ'
        this.x = ai
        this.y = -aj
        this.z = ak
        break
      case 1:
        // 'YZX'
        this.x = ak
        this.y = ai
        this.z = -aj
        break
      case 2:
        // 'ZXY'
        this.x = -aj
        this.y = ak
        this.z = ai
        break
      case 3:
        // 'XZY'
        this.x = ai
        this.y = ak
        this.z = aj
        break
      case 4:
        // 'ZYX'
        this.x = ak
        this.y = aj
        this.z = ai
        break
      case 5:
        // 'YXZ'
        this.x = aj
        this.y = ai
        this.z = ak
        break
      default:
        throw new Error(`Invalid EulerAngles order: ${eulerAngles.order}`)
    }
  }

  /**
   * Converts Quat to an EulerAngles
   *
   * @param rotationOrder - The order in which the rotations are applied.
   * @return - The return value.
   */
  toEulerAngles(rotationOrder: number | string): EulerAngles {
    const ordered = new Vec3()
    switch (rotationOrder) {
      case 0:
        /* ' XYZ' */
        ordered.set(this.z, this.x, this.y)
        break
      case 1:
        /* 'YZX' */
        ordered.set(this.x, this.y, this.z)
        break
      case 2:
        /* 'ZXY' */
        ordered.set(this.y, this.z, this.x)
        break
      case 3:
        /* 'XZY' */
        ordered.set(this.y, -this.x, this.z)
        break
      case 4:
        /* 'ZYX' */
        ordered.set(this.x, -this.z, this.y)
        break
      case 5:
        /* 'YXZ' */
        ordered.set(this.z, -this.y, this.x)
        break
      default:
        throw new Error('Invalid rotation order:' + rotationOrder)
    }

    const euler = new Vec3()
    const test = ordered.x * ordered.y + ordered.z * this.w
    if (test > 0.49999) {
      // singularity at north pole
      euler.y = 2.0 * Math.atan2(ordered.x, this.w)
      euler.z = Math.PI * 0.5
      euler.x = 0.0
    } else if (test < -0.49999) {
      // singularity at south pole
      euler.y = -2.0 * Math.atan2(ordered.x, this.w)
      euler.z = Math.PI * -0.5
      euler.x = 0.0
    } else {
      const sqx = ordered.x * ordered.x
      const sqy = ordered.y * ordered.y
      const sqz = ordered.z * ordered.z
      euler.y = Math.atan2(2.0 * ordered.y * this.w - 2.0 * ordered.x * ordered.z, 1.0 - 2.0 * sqy - 2.0 * sqz)
      euler.z = Math.asin(2.0 * test)
      euler.x = Math.atan2(2.0 * ordered.x * this.w - 2.0 * ordered.y * ordered.z, 1.0 - 2.0 * sqx - 2.0 * sqz)
    }

    switch (rotationOrder) {
      case 0:
        /* ' XYZ' */
        return new EulerAngles(euler.y, euler.z, euler.x, rotationOrder)
      case 1:
        /* 'YZX' */
        return new EulerAngles(euler.x, euler.y, euler.z, rotationOrder)
      case 2:
        /* 'ZXY' */
        return new EulerAngles(euler.z, euler.x, euler.y, rotationOrder)
      case 3:
        /* 'XZY' */
        return new EulerAngles(-euler.y, euler.x, euler.z, rotationOrder)
      case 4:
        /* 'ZYX' */
        return new EulerAngles(euler.x, euler.z, -euler.y, rotationOrder)
      case 5:
        /* 'YXZ' */
        return new EulerAngles(euler.z, -euler.y, euler.x, rotationOrder)
    }
  }

  /**
   * Set this Quat to a rotation defined by an axis and an angle (in radians).
   *
   * @param axis - The axis around which to rotate.
   * @param angle - The angle to rotate
   */
  setFromAxisAndAngle(axis: Vec3, angle: number): void {
    const halfAngle = angle / 2.0
    const vec = axis.normalize().scale(Math.sin(halfAngle))
    this.set(vec.x, vec.y, vec.z, Math.cos(halfAngle))
  }

  /**
   * Sets the state of the Quat to look in a particular direction along the z axis.
   * > The camera looks down the negative z axis, so to set a rotation value
   * > for the camera, remember to negate the direction vector.
   *
   * @param dir - The direction value.
   * @param up - The up vector.
   */
  setFromDirectionAndUpvector(dir: Vec3, up: Vec3): void {
    const mat3 = new Mat3()
    mat3.setFromDirectionAndUpvector(dir, up)
    this.setFromMat3(mat3)
  }

  /**
   * Sets the state of the `Quat` from two `Vec3`. The quaternion would then represent the rotation from v0 to v1 in 3d space.
   *
   * @param v0 - The v0 unit vector.
   * @param v1 - The v1 unit vector.
   */
  setFrom2Vectors(v0: Vec3, v1: Vec3): void {
    const c = v0.cross(v1)
    const d = v0.dot(v1)
    const s = Math.sqrt((1 + d) * 2)
    // this.set( s/2, c.x / s, c.y / s, c.z / s );
    this.set(c.x / s, c.y / s, c.z / s, s / 2)
    this.normalizeInPlace()
  }

  /**
   * Set the Quat from a Mat3.
   *
   * @param mat3 - The mat3 value.
   */
  setFromMat3(mat3: Mat3): void {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    const data = mat3.asArray()
    const fTrace = data[0] + data[4] + data[8]
    let fRoot

    if (fTrace > 0.0) {
      // |w| > 1/2, may as well choose w > 1/2
      fRoot = Math.sqrt(fTrace + 1) // 2w
      this.__data[3] = 0.5 * fRoot
      fRoot = 0.5 / fRoot // 1/(4w)
      this.__data[0] = (data[5] - data[7]) * fRoot
      this.__data[1] = (data[6] - data[2]) * fRoot
      this.__data[2] = (data[1] - data[3]) * fRoot
    } else {
      // |w| <= 1/2
      let i = 0
      if (data[4] > data[0]) i = 1
      if (data[8] > data[i * 3 + i]) i = 2
      const j = (i + 1) % 3
      const k = (i + 2) % 3

      fRoot = Math.sqrt(data[i * 3 + i] - data[j * 3 + j] - data[k * 3 + k] + 1.0)
      this.__data[i] = 0.5 * fRoot
      fRoot = 0.5 / fRoot
      this.__data[3] = (data[j * 3 + k] - data[k * 3 + j]) * fRoot
      this.__data[j] = (data[j * 3 + i] + data[i * 3 + j]) * fRoot
      this.__data[k] = (data[k * 3 + i] + data[i * 3 + k]) * fRoot
    }
    this.normalizeInPlace()
  }

  /**
   * Set the Quat from a Mat4.
   *
   * @param mat4 - The mat4 value.
   */
  setFromMat4(mat4: Mat4): void {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    const data = mat4.asArray()
    const fTrace = data[0] + data[5] + data[10]
    let fRoot

    if (fTrace > 0.0) {
      // |w| > 1/2, may as well choose w > 1/2
      fRoot = Math.sqrt(fTrace + 1) // 2w
      this.__data[3] = 0.5 * fRoot
      fRoot = 0.5 / fRoot // 1/(4w)
      this.__data[0] = (data[6] - data[9]) * fRoot
      this.__data[1] = (data[8] - data[2]) * fRoot
      this.__data[2] = (data[1] - data[4]) * fRoot
    } else {
      // |w| <= 1/2
      let i = 0
      if (data[5] > data[0]) i = 1
      if (data[10] > data[i * 4 + i]) i = 2
      const j = (i + 1) % 3
      const k = (i + 2) % 3

      fRoot = Math.sqrt(data[i * 4 + i] - data[j * 4 + j] - data[k * 4 + k] + 1.0)
      this.__data[i] = 0.5 * fRoot
      fRoot = 0.5 / fRoot
      this.__data[3] = (data[j * 4 + k] - data[k * 4 + j]) * fRoot
      this.__data[j] = (data[j * 4 + i] + data[i * 4 + j]) * fRoot
      this.__data[k] = (data[k * 4 + i] + data[i * 4 + k]) * fRoot
    }
    this.normalizeInPlace()
  }

  /**
   * Checks if the angle of the Quat is less that ` Number.EPSILON`
   *
   * @return - Returns true or false.
   */
  isIdentity(): boolean {
    return this.getAngle() < Number.EPSILON
  }

  /**
   * Return the angle of the Quat.
   *
   * @return - The return value.
   */
  getAngle(): number {
    return Math.acos(this.w) * 2.0
  }

  /**
   * Checks if this Quat contains the same values as the other Quat.
   *
   * @param other - The other Quat to compare with.
   * @return - Returns `true` if are the same Vector, otherwise, `false`.
   */
  isEqual(other: Quat): boolean {
    return this.x == other.x && this.y == other.y && this.z == other.z && this.w == other.w
  }

  /**
   * Returns true if this Quat is NOT exactly the same other.
   *
   * @param other - The other Quat to compare with.
   * @return - Returns true or false.
   */
  notEquals(other: Quat): boolean {
    return this.x != other.x && this.y != other.y && this.z != other.z && this.w != other.w
  }

  /**
   * Returns true if this Quat is approximately the same as other
   *
   * @param other - The other Quat to compare with.
   * @param precision - The precision to which the values must match.
   * @return - Returns true or false.
   */
  approxEqual(other: Quat, precision: number = Number.EPSILON): boolean {
    return (
      Math.abs(this.x - other.x) < precision &&
      Math.abs(this.y - other.y) < precision &&
      Math.abs(this.z - other.z) < precision &&
      Math.abs(this.w - other.w) < precision
    )
  }

  /**
   * Adds other to this Quat and return the result as a new Quat.
   *
   * @param other - The other Quat to add.
   * @return - Returns a new Quat.
   */
  add(other: Quat): Quat {
    return new Quat(this.x + other.x, this.y + other.y, this.z + other.z, this.w + other.w)
  }

  /**
   * Adds other to this Quat.
   *
   * @param other - The other Quat to add.
   */
  addInPlace(other: Quat): void {
    this.x += other.x
    this.y += other.y
    this.z += other.z
    this.w += other.w
  }

  /**
   * Subtracts other from this Quat and returns the result as a new Quat.
   *
   * @param other - The other Quat to subtract.
   * @return - Returns a new Quat.
   */
  subtract(other: Quat): Quat {
    return new Quat(this.x - other.x, this.y - other.y, this.z - other.z, this.w - other.w)
  }

  /**
   * Scales this Quat by scalar and returns the result as a new Quat.
   *
   * @param scalar - The scalar value.
   * @return - Returns a new Vec3.
   */
  scale(scalar: number): Quat {
    return new Quat(this.x * scalar, this.y * scalar, this.z * scalar, this.w * scalar)
  }

  /**
   * Scales this Quat by scalar.
   *
   * @param scalar - The scalar value.
   */
  scaleInPlace(scalar: number): void {
    this.x *= scalar
    this.y *= scalar
    this.z *= scalar
    this.w *= scalar
  }

  /**
   * Calculates the length of this Quat.
   *
   * @return - Returns the length.
   */
  length(): number {
    const x = this.__data[0]
    const y = this.__data[1]
    const z = this.__data[2]
    const w = this.__data[3]
    return Math.sqrt(x * x + y * y + z * z + w * w)
  }

  /**
   * Calculates the squared length of this Quat.
   *
   * @return - Returns the length.
   */
  lengthSquared(): number {
    const x = this.__data[0]
    const y = this.__data[1]
    const z = this.__data[2]
    const w = this.__data[3]
    return x * x + y * y + z * z + w * w
  }

  /**
   * Normalizes the Quat and returns it as a new Quat.
   *
   * @return - Returns the Quat normalized.
   */
  normalize(): Quat {
    const x = this.__data[0]
    const y = this.__data[1]
    const z = this.__data[2]
    const w = this.__data[3]
    let len = x * x + y * y + z * z + w * w
    if (len < Number.EPSILON) {
      return new Quat()
    }

    // TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len)
    return new Quat(x * len, y * len, z * len, w * len)
  }

  /**
   * Normalizes the Quat, modifying its values in place.
   */
  normalizeInPlace(): void {
    const x = this.__data[0]
    const y = this.__data[1]
    const z = this.__data[2]
    const w = this.__data[3]
    let len = x * x + y * y + z * z + w * w
    if (len < Number.EPSILON) {
      return
    }
    len = 1 / Math.sqrt(len)
    this.set(x * len, y * len, z * len, w * len)
  }

  /**
   * Calculates the dot product of this quat against another.
   *
   * @param other - The other Quat to compare with.
   * @return - Returns the dot product.
   */
  dot(other: Quat): number {
    return this.x * other.x + this.y * other.y + this.z * other.z + this.w * other.w
  }

  /**
   * Calculates the cross product of two Quats and returns the result as a new Quat.
   *
   * @param other - The other Quat to calculate with.
   * @return - Returns the cross product as a new Quat.
   */
  cross(other: Quat): Quat {
    const ax = this.x
    const ay = this.y
    const az = this.z
    const at = this.w
    const bx = other.x
    const by = other.y
    const bz = other.z
    const bt = other.w

    return new Quat(ay * bz - az * by, az * bt - at * bz, at * bx - ax * bt, ax * by - ay * bx)
  }

  /**
   * Returns the rotational conjugate of this Quat.
   * Conjugation represents the same rotation of the Quat but
   * in the opposite direction around the rotational axis.
   *
   * @return - the return value.
   */
  conjugate(): Quat {
    return new Quat(-this.x, -this.y, -this.z, this.w)
  }

  /**
   * Return the inverse of the `Quat`
   *
   * @return - Returns a new Quat.
   */
  inverse(): Quat {
    return this.conjugate()
  }

  /**
   * Aligns this quaternion with another one ensuring that the delta between
   * the Quat values is the shortest path over the hyper-sphere.
   *
   *  @param other - The other Quat to divide by.
   */
  alignWith(other: Quat): void {
    if (this.dot(other) < 0.0) {
      this.set(-this.x, -this.y, -this.z, -this.w)
    }
  }

  /**
   * Multiplies two this quat by another returning the result as a new Quat.
   *
   * @param other - The other Quat to multiply.
   * @return - Returns a new Quat.
   */
  multiply(other: Quat): Quat {
    const ax = this.__data[0]
    const ay = this.__data[1]
    const az = this.__data[2]
    const aw = this.__data[3]
    const bx = other.__data[0]
    const by = other.__data[1]
    const bz = other.__data[2]
    const bw = other.__data[3]

    return new Quat(
      ax * bw + aw * bx + ay * bz - az * by,
      ay * bw + aw * by + az * bx - ax * bz,
      az * bw + aw * bz + ax * by - ay * bx,
      aw * bw - ax * bx - ay * by - az * bz
    )
  }

  /**
   * Multiplies this quat by another, modifying its values in place.
   *
   * @param other - The other Quat to multiply.
   */
  multiplyInPlace(other: Quat): void {
    const ax = this.__data[0]
    const ay = this.__data[1]
    const az = this.__data[2]
    const aw = this.__data[3]
    const bx = other.__data[0]
    const by = other.__data[1]
    const bz = other.__data[2]
    const bw = other.__data[3]

    this.set(
      ax * bw + aw * bx + ay * bz - az * by,
      ay * bw + aw * by + az * bx - ax * bz,
      az * bw + aw * bz + ax * by - ay * bx,
      aw * bw - ax * bx - ay * by - az * bz
    )
  }

  /**
   * Rotates a vector by this quaternion.
   * Don't forget to normalize the quaternion unless
   * you want axial translation as well as rotation.
   *
   * @param vec3 - The vec3 value.
   * @return - Returns a new Vec3.
   */
  rotateVec3(vec3: Vec3): Vec3 {
    const vq = new Quat(vec3.x, vec3.y, vec3.z, 0.0)
    const pq = this.multiply(vq).multiply(this.conjugate())
    return new Vec3(pq.x, pq.y, pq.z)
  }

  /**
   * Sets this quaternion to a rotation by the given angle about the X axis.
   *
   * @param rad - Angle (in radians) to rotate.
   */
  rotateX(rad: number): void {
    rad *= 0.5

    const ax = this.x
    const ay = this.y
    const az = this.z
    const aw = this.w
    const bx = Math.sin(rad)
    const bw = Math.cos(rad)

    this.x = ax * bw + aw * bx
    this.y = ay * bw + az * bx
    this.z = az * bw - ay * bx
    this.w = aw * bw - ax * bx
  }

  /**
   * Sets this quaternion to a rotation by the given angle about the Y axis.
   *
   * @param rad - Angle (in radians) to rotate.
   */
  rotateY(rad: number): void {
    rad *= 0.5

    const ax = this.x
    const ay = this.y
    const az = this.z
    const aw = this.w
    const by = Math.sin(rad)
    const bw = Math.cos(rad)

    this.x = ax * bw - az * by
    this.y = ay * bw + aw * by
    this.z = az * bw + ax * by
    this.w = aw * bw - ay * by
  }

  /**
   * Sets this quaternion to a rotation by the given angle about the Z axis.
   *
   * @param rad - Angle (in radians) to rotate.
   */
  rotateZ(rad: number): void {
    rad *= 0.5

    const ax = this.x
    const ay = this.y
    const az = this.z
    const aw = this.w
    const bz = Math.sin(rad)
    const bw = Math.cos(rad)

    this.x = ax * bw + ay * bz
    this.y = ay * bw - ax * bz
    this.z = az * bw + aw * bz
    this.w = aw * bw - az * bz
  }

  /**
   * Converts this Quat to a Mat3 (a 3x3 matrix).
   *
   * @return - TReturns a new Mat3.
   */
  toMat3(): Mat3 {
    const x = this.x
    const y = this.y
    const z = this.z
    const w = this.w
    const x2 = x + x
    const y2 = y + y
    const z2 = z + z
    const xx = x * x2
    const yx = y * x2
    const yy = y * y2
    const zx = z * x2
    const zy = z * y2
    const zz = z * z2
    const wx = w * x2
    const wy = w * y2
    const wz = w * z2

    const mat3 = new Mat3()
    mat3.m00 = 1 - yy - zz
    mat3.m10 = yx - wz
    mat3.m20 = zx + wy

    mat3.m01 = yx + wz
    mat3.m11 = 1 - xx - zz
    mat3.m21 = zy - wx

    mat3.m02 = zx - wy
    mat3.m12 = zy + wx
    mat3.m22 = 1 - xx - yy

    return mat3
  }

  /**
   * Calculates a Vec3 value aligned with the X axis of this quaternion.
   *
   * @return - The resulting Vec3 value
   */
  getXaxis(): Vec3 {
    const xy = this.x * this.y
    const xz = this.x * this.z
    const yy = this.y * this.y
    const yw = this.y * this.w
    const zz = this.z * this.z
    const zw = this.z * this.w

    return new Vec3(1.0 - 2.0 * (zz + yy), 2.0 * (xy + zw), 2.0 * (xz - yw))
  }

  /**
   * Calculates a Vec3 value aligned with the Y axis of this quaternion.
   *
   * @return - The resulting Vec3 value
   */
  getYaxis(): Vec3 {
    const xx = this.x * this.x
    const xy = this.x * this.y
    const xw = this.x * this.w
    const yz = this.y * this.z
    const zz = this.z * this.z
    const zw = this.z * this.w

    return new Vec3(2.0 * (xy - zw), 1.0 - 2.0 * (zz + xx), 2.0 * (yz + xw))
  }

  /**
   * Calculates a Vec3 value aligned with the Z axis of this quaternion.
   *
   * @return - The resulting Vec3 value
   */
  getZaxis(): Vec3 {
    const xx = this.x * this.x
    const xz = this.x * this.z
    const xw = this.x * this.w

    const yy = this.y * this.y
    const yz = this.y * this.z
    const yw = this.y * this.w
    // const temp = new Vec3()

    return new Vec3(2.0 * (yw + xz), 2.0 * (yz - xw), 1.0 - 2.0 * (yy + xx))
  }

  /**
   * Reflects this quaternion according to the axis provided.
   *
   * @param axisIndex - An integer with value of 0 for the X axis, 1 for the Y axis, and 2 for the Z axis.
   * @return - Returns a new Quat.
   */
  mirror(axisIndex: number): Quat {
    switch (axisIndex) {
      case 0:
        return new Quat(this.z, this.w, this.x, this.y)
      case 1:
        return new Quat(-this.w, this.z, this.y, -this.x)
      case 2:
        return new Quat(this.x, this.y, this.z, -this.w)
      case 0:
      default:
        return new Quat(this.z, this.w, this.x, this.y)
    }
  }

  /**
   * Converts this Quat to a Mat4 (a 4x4 matrix).
   *
   * @return - Returns a new Mat4.
   */
  toMat4(): Mat4 {
    const x = this.x
    const y = this.y
    const z = this.z
    const w = this.w
    const x2 = x + x
    const y2 = y + y
    const z2 = z + z
    const xx = x * x2
    const yx = y * x2
    const yy = y * y2
    const zx = z * x2
    const zy = z * y2
    const zz = z * z2
    const wx = w * x2
    const wy = w * y2
    const wz = w * z2

    // Set the columns
    const mat4 = new Mat4()
    mat4.m00 = 1 - yy - zz
    mat4.m10 = yx - wz
    mat4.m20 = zx + wy

    mat4.m01 = yx + wz
    mat4.m11 = 1 - xx - zz
    mat4.m21 = zy - wx

    mat4.m02 = zx - wy
    mat4.m12 = zy + wx
    mat4.m22 = 1 - xx - yy

    return mat4
  }

  /**
   * Performs a linear interpolation of this Quat towards another Quat, returning the result as a new Quat.
   *
   * @param other  - The other Quat to interpolate towards.
   * @param t - Interpolation amount between the two inputs.
   * @return - Returns a new Quat.
   */
  lerp(other: Quat, t: number): Quat {
    const result = new Quat(
      this.x + t * (other.x - this.x),
      this.y + t * (other.y - this.y),
      this.z + t * (other.z - this.z),
      this.w + t * (other.w - this.w)
    )
    result.normalizeInPlace()
    return result
  }

  /**
   * Performs a spherical linear interpolation of this Quat towards another Quat, returning the result as a new Quat.
   *
   * @param other - The other Quat to interpolate towards.
   * @param t - Interpolation amount between the two inputs.
   * @return - Returns a new Quat.
   */
  slerp(other: Quat, lambda: number): Quat {
    /// https://www.geometrictools.com/Documentation/FastAndAccurateSlerp.pdf
    const dotProduct = this.dot(other)

    if (dotProduct > 0.999) return this

    // algorithm adapted from Shoemake's paper
    // lambda is in (0, π/2]
    const theta = Math.acos(dotProduct)
    const st = Math.sin(theta)
    const sut = Math.sin(lambda * theta)
    const sout = Math.sin((1 - lambda) * theta)
    const coeff1 = sout / st
    const coeff2 = sut / st

    const result = new Quat(
      coeff1 * this.x + coeff2 * other.x,
      coeff1 * this.y + coeff2 * other.y,
      coeff1 * this.z + coeff2 * other.z,
      coeff1 * this.w + coeff2 * other.w
    )
    result.normalizeInPlace()
    return result
  }

  /**
   * Clones this Quat and returns a new Quat.
   *
   * @return - Returns a new Quat.
   */
  clone(): Quat {
    return new Quat(this.__data[0], this.__data[1], this.__data[2], this.__data[3])
  }

  /**
   * Returns the type as an array. Often used to pass types to the GPU.
   *
   * @return - Returns as an array.
   */
  asArray(): Float32Array {
    return this.__data
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
   * @return - The json object.
   */
  toJSON(): Record<string, number> {
    return {
      x: this.x,
      y: this.y,
      z: this.z,
      w: this.w,
    }
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param j - The json object.
   */
  fromJSON(j: Record<string, number>): void {
    this.__data[0] = j.x
    this.__data[1] = j.y
    this.__data[2] = j.z
    this.__data[3] = j.w
    this.normalizeInPlace()
  }

  /**
   * Loads the state of the value from a binary reader.
   *
   * @param reader - The reader value.
   */
  readBinary(reader: BinReader): void {
    this.x = reader.loadFloat32()
    this.y = reader.loadFloat32()
    this.z = reader.loadFloat32()
    this.w = reader.loadFloat32()
  }
}

export { Quat }
