import { JSON_stringify_fixedPrecision } from './Common.js'
import { Vec3 } from './Vec3.js'
import { Mat4 } from './Mat4.js'
import { Quat } from './Quat.js'
import { typeRegistry } from './TypeRegistry.js'

const sc_helper = new Vec3(1, 1, 1)

/** Class representing an Xfo transform. */
class Xfo {
  /**
   * Create a Xfo.
   * @param {any} tr - The translation value.
   * @param {any} ori - The orientation value.
   * @param {any} sc - The scaling value.
   */
  constructor(tr = undefined, ori = undefined, sc = undefined) {
    if (tr instanceof Float32Array) {
      this.setFromFloat32Array(tr)
      return
    }
    if (tr instanceof Vec3) {
      this.tr = tr
    } else if (tr instanceof Quat && ori == undefined && sc == undefined) {
      this.tr = new Vec3()
      this.ori = tr // Xfo constructor with just a Quat.
      this.sc = new Vec3(1, 1, 1)
      return
    } else {
      this.tr = new Vec3()
    }
    if (ori instanceof Quat) {
      this.ori = ori
    } else {
      this.ori = new Quat()
    }
    if (sc instanceof Vec3) {
      this.sc = sc
    } else {
      this.sc = new Vec3(1, 1, 1)
    }
  }

  /**
   * The set method.
   * @param {any} tr - The translation value.
   * @param {any} ori - The orientation value.
   * @param {any} sc - The scaling value.
   */
  set(tr, ori, sc = undefined) {
    this.tr = tr
    this.ori = ori
    if (sc instanceof Vec3) this.sc = sc
  }

  /**
   * Setter from another Xfo.
   * @param {Xfo} other - The other Xfo to set from.
   */
  setFromOther(other) {
    this.tr = other.tr
    this.ori = other.ori
    this.sc = other.sc
  }

  /**
   * The isIdentity method.
   * @return {any} - The return value.
   */
  isIdentity() {
    return this.tr.isNull() && this.ori.isIdentity() && this.sc.is111()
  }

  /**
   * The setLookAt method.
   * @param {any} pos - The position value.
   * @param {any} target - The target value.
   * @param {any} up - The up value.
   */
  setLookAt(pos, target, up) {
    // Note: We look along the -z axis. Negate the direction.
    const dir = pos.subtract(target)
    const dirLen = dir.length()
    if (dirLen < Number.EPSILON) {
      throw new Error('Invalid dir')
      return
    }
    this.ori.setFromDirectionAndUpvector(dir, up)
    this.tr = pos
  }

  /**
   * Multiplies two Xfo transforms.
   * @param {Xfo} xfo - The xfo to multiply with.
   * @return {Xfo} - Returns an Xfo.
   */
  multiply(xfo) {
    let this_sc = this.sc
    if (this.sc.x != this.sc.y || this.sc.x != this.sc.z) {
      this_sc = xfo.ori.rotateVec3(this.sc)
      if (Math.sign(this_sc.x) != Math.sign(this.sc.x)) this_sc.x = -this_sc.x
      if (Math.sign(this_sc.y) != Math.sign(this.sc.y)) this_sc.y = -this_sc.y
      if (Math.sign(this_sc.z) != Math.sign(this.sc.z)) this_sc.z = -this_sc.z
    }
    const result = new Xfo(
      this.tr.add(this.ori.rotateVec3(this_sc.multiply(xfo.tr))),
      this.ori.multiply(xfo.ori),
      this_sc.multiply(xfo.sc)
    )
    return result
  }

  /**
   * The inverse method.
   * @return {Xfo} - Returns a new Xfo.
   */
  inverse() {
    const result = new Xfo()
    result.ori = this.ori.inverse()

    if (this.sc.x != this.sc.y || this.sc.x != this.sc.z) {
      // Note: the following code has not been tested and
      // may not be quite correct. We need to setup
      // unit tests for this kind of sample.
      // An example would be to lay out some boxes on different rotations
      // and with non-uniform scale. Then parent them together. If they
      // remain stationary, after parenting, then this math is correct.
      result.sc = result.ori.rotateVec3(this.sc)
      if (Math.sign(result.sc.x) != Math.sign(this.sc.x)) result.sc.x = -result.sc.x
      if (Math.sign(result.sc.y) != Math.sign(this.sc.y)) result.sc.y = -result.sc.y
      if (Math.sign(result.sc.z) != Math.sign(this.sc.z)) result.sc.z = -result.sc.z
    } else {
      result.sc = this.sc.inverse()
    }
    result.tr = result.ori.rotateVec3(this.tr.negate().multiply(result.sc))
    return result
  }

  /**
   * The transformVec3 method.
   * @param {Vec3} vec3 - The vec3 value.
   * @return {any} - The return value.
   */
  transformVec3(vec3) {
    return this.tr.add(this.ori.rotateVec3(this.sc.multiply(vec3)))
  }

  /**
   * Converts this Xfo to a Mat4 (a 4x4 matrix).
   * @return {Mat4} - Returns a new Mat4.
   */
  toMat4() {
    const scl = new Mat4(
      this.sc.x,
      0,
      0,
      0,
      0,
      this.sc.y,
      0,
      0,
      0,
      0,
      this.sc.z,
      0,
      0,
      0,
      0,
      1.0
    )

    const rot = this.ori.toMat4()

    const trn = new Mat4()
    trn.translation = this.tr

    return trn.multiply(rot).multiply(scl)
  }

  /**
   * The fromMat4 method.
   * @param {Mat4} mat4 - The mat4 value.
   */
  fromMat4(mat4) {
    this.tr = mat4.translation
    this.ori.setFromMat4(mat4)
  }

  /**
   * The setFromFloat32Array method.
   * @param {array} float32array - The float32array value.
   */
  setFromFloat32Array(float32array) {
    if (float32array.length == 7) {
      this.tr = new Vec3(float32array.buffer, float32array.byteOffset)
      this.ori = new Quat(float32array.buffer, float32array.byteOffset + 12)
      this.sc = new Vec3(1, 1, 1)
      return
    }
    if (float32array.length == 8) {
      this.tr = new Vec3(float32array.buffer, float32array.byteOffset)
      this.ori = new Quat(float32array.buffer, float32array.byteOffset + 12)
      const scl = float32array[7]
      this.sc = new Vec3(scl, scl, scl)
      return
    }
    if (float32array.length == 10) {
      this.tr = new Vec3(float32array.buffer, float32array.byteOffset)
      this.ori = new Quat(float32array.buffer, float32array.byteOffset + 12)
      this.sc = new Vec3(float32array.buffer, float32array.byteOffset + 21)
      return
    }
  }

  /**
   * Clones this Xfo and returns a new Xfo.
   * @return {Xfo} - Returns a new Xfo.
   */
  clone() {
    return new Xfo(this.tr.clone(), this.ori.clone(), this.sc.clone())
  }

  // ////////////////////////////////////////
  // Static Methods

  /**
   * Creates a new Xfo.
   * @param {...object} ...args - The ...args param.
   * @return {Xfo} - eturns a new Xfo.
   * @private
   */
  static create(...args) {
    return new Xfo(...args)
  }

  // ///////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistences.
   * @return {object} - The json object.
   */
  toJSON() {
    const j = {
      tr: this.tr.toJSON(),
      ori: this.ori.toJSON(),
    }
    if (!this.sc.is111()) j.sc = this.sc.toJSON()
    return j
  }

  /**
   * The fromJSON method decodes a json object for this type.
   * @param {object} j - The json object.
   */
  fromJSON(j) {
    this.tr.fromJSON(j.tr)
    this.ori.fromJSON(j.ori)
    if (j.sc) {
      this.sc.fromJSON(j.sc)
    }
  }

  /**
   * The toString method.
   * @return {any} - The return value.
   */
  toString() {
    return JSON_stringify_fixedPrecision(this.toJSON())
  }
}

typeRegistry.registerType('Xfo', Xfo)

export { Xfo }
