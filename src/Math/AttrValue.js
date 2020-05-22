// eslint-disable-next-line camelcase
import { JSON_stringify_fixedPrecision } from './Common.js'

/**
 * Base class for values that can be stored in vertex attributes.
 * <br>
 * **Note:** These values use {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array|Float32Array} values to store their data.
 */
class AttrValue {
  /**
   * Verifies that all the numeric values inside the `this.__data` variable are a valid number.
   * Returns `false` If at least one of the values is either {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Referencia/Objetos_globales/Infinity|Infinity} or
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Referencia/Objetos_globales/NaN|NaN}.
   *
   * @return {boolean} - Returns the result as a boolean.
   */
  isValid() {
    for (const v of this.__data) {
      if (v == Infinity || isNaN(v)) return false
    }

    return true
  }

  /**
   * Creates a new value to wrap memory in an existing buffer.
   *
   * @param {ArrayBuffer} buffer - the buffer value.
   * @param {number} offset - the offset value.
   *
   * @todo Implement this function
   */
  static createFromFloat32Buffer(buffer, offset) {
    throw new Error(
      'Not yet implemented for this type:' + this.constructor.name
    )
  }

  /**
   * Returns the number of Float32 elements used by this type. Used to calculate storage requirements for large arrays of this type.
   *
   * @todo Implement this function
   */
  static numElements() {
    throw new Error(
      'Not yet implemented for this type:' + this.constructor.name
    )
  }

  /**
   * Returns current Vec2 data as array. Often used to pass types to the GPU.
   *
   * @return {array} - Returns the result as an array.
   */
  asArray() {
    return this.__data
  }

  /**
   * Calls `toJSON` method and stringifies it.
   *
   * @return {string} - The return value.
   */
  toString() {
    // eslint-disable-next-line new-cap
    return JSON_stringify_fixedPrecision(this.toJSON())
  }

  /**
   * Represents the state of your class as a JSON Object.
   *
   * @todo Implement this function in the derived class.
   */
  toJSON() {
    throw new Error(
      'Not yet implemented for this type:' + this.constructor.name
    )
  }
}

export { AttrValue }
export default AttrValue
