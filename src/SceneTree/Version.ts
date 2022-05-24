/**
 * Class designed to store version data. Widely used in the zea engine for backwards compatibility.
 */
class Version {
  major: number = 0
  minor: number = 0
  patch: number = 0
  branch: string = ''
  /**
   * Creates a version.
   * The version string should have the following structure:
   * major, minor and patch separated by a dot(`.`) and parts separated by a dash(`-`).
   *
   * @param arg - The version string value, or an array of version numbers.
   */
  constructor(arg?: string | Array<number>) {
    if (typeof arg == 'string') {
      const parts = arg.split('-')
      const numbers = parts[0].split('.')
      this.major = parseInt(numbers[0])
      this.minor = numbers.length > 1 ? parseInt(numbers[1]) : 0
      this.patch = numbers.length > 2 ? parseInt(numbers[2]) : 0
      if (parts.length == 2) this.branch = parts[1]
    } else if (Array.isArray(arg)) {
      const numbers = arg
      this.major = numbers[0]
      this.minor = numbers.length > 1 ? numbers[1] : 0
      this.patch = numbers.length > 2 ? numbers[2] : 0
    }
  }

  /**
   * Compare a version object against a version numbers array.
   *
   * @param numbers - An array containing 3 version numbers. [Major, Minor, Patch]
   * @return - return positive: v1 > v2, zero:v1 == v2, negative: v1 < v2
   */
  compare(numbers: number[]): number {
    // https://stackoverflow.com/questions/6832596/how-to-compare-software-version-number-using-js-only-number
    // 2nd answer.
    const v1 = [this.major, this.minor, this.patch]
    for (let i = 0; i < 3; i++) {
      if (v1[i] !== numbers[i]) return v1[i] - numbers[i]
    }
    return 0
  }

  /**
   * Converts the Version class instance back to an array for comparisons with other version class instances.
   * e.g.
   * ```
   *   const version1 = new Version([1, 2, 3])
   *   const version2 = new Version([1, 2, 4])
   *   const res = version1.compare(version2.asArray())
   * ```
   * @returns an array containing the major, minor and patch version numbers.
   */
  asArray() {
    return [this.major, this.minor, this.patch]
  }

  toString(): string {
    return `v${this.major}.${this.minor}.${this.patch}` + (this.branch != '' ? `-${this.branch}` : '')
  }
}

export { Version }
