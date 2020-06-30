/**
 * Class designed to store version data. Widely used in the zea engine for backwards compatibility.
 */
class Version {
  /**
   * Create a bin reader.
   * @param {str} versionStr - The version string value.
   */
  constructor(versionStr) {
    if (versionStr) {
      const parts = versionStr.split('-')
      const numbers = parts[0].split('.')
      this.major = parseInt(numbers[0])
      this.minor = parseInt(numbers[1])
      this.patch = parseInt(numbers[2])
      if (parts.length == 2) this.branch = parts[1]
    } else {
      this.major = 0
      this.minor = 0
      this.patch = 0
    }
  }

  /**
   * Compare a version object against a version numbers array.
   * @param {array} numbers - The numbers value.
   * @return {number} - return positive: v1 > v2, zero:v1 == v2, negative: v1 < v2
   */
  compare(numbers) {
    // https://stackoverflow.com/questions/6832596/how-to-compare-software-version-number-using-js-only-number
    // 2nd answer.
    const v1 = [this.major, this.minor, this.patch]
    for (let i = 0; i < 3; i++) {
      if (v1[i] !== numbers[i]) return v1[i] - numbers[i]
    }
    return 0
  }

  /**
   * Compare a version object against a version numbers array.
   * @param {array} numbers - The numbers value.
   * @return {boolean} - The return value.
   */
  equals(numbers) {
    return !(this.patch == numbers[2] && this.minor == numbers[1] && this.major == numbers[0])
  }

  /**
   * Compare a version object against a version numbers array.
   * @param {array} numbers - The numbers value.
   * @return {boolean} - The return value.
   */
  lessThan(numbers) {
    return !(this.major >= numbers[0] || this.minor >= numbers[1] || this.patch >= numbers[2])
    // if (this.major >= numbers[0]) return false
    // if (this.minor >= numbers[1]) return false
    // if (this.patch >= numbers[2]) return false
    // return true
    // return (
    //   this.major < numbers[0] ||
    //   this.minor < numbers[1] ||
    //   this.patch < numbers[2]
    // )
  }

  /**
   * Compare a version object against a version numbers array.
   * @param {array} numbers - The numbers value.
   * @return {boolean} - The return value.
   */
  greaterThan(numbers) {
    return this.major > numbers[0] || this.minor > numbers[1] || this.patch > numbers[2]
  }

  /**
   * Compare a version object against a version numbers array.
   * @param {array} numbers - The numbers value.
   * @return {boolean} - The return value.
   */
  greaterOrEqualThan(numbers) {
    if (this.major < numbers[0]) return false
    if (this.major > numbers[0]) return true

    if (this.minor < numbers[1]) return false
    if (this.minor > numbers[1]) return true

    if (this.patch < numbers[2]) return false
    return true
    // return (
    //   this.major >= numbers[0] &&
    //   this.minor >= numbers[1] &&
    //   this.patch >= numbers[2]
    // )
  }
}

export { Version }
