/* eslint-disable no-unused-vars */
import { Vec2, Vec3, Quat, Color, Box2, Box3 } from '../Math/index'
import { MathFunctions } from '../Utilities/MathFunctions'

/**
 * Reads binary data in a specific encoding. Used in loading binary data such as zcad files.
 */
class BinReader {
  protected __data: ArrayBuffer
  protected __byteOffset: number
  protected __dataView: DataView
  protected __isMobileDevice: boolean
  protected utf8decoder: TextDecoder
  /**
   * Create a bin reader.
   *
   * @param data - The data buffer.
   * @param byteOffset - The byte offset value to start reading the buffer.
   * @param isMobileDevice - The isMobileDevice value.
   */
  constructor(data: ArrayBuffer, byteOffset: number = 0, isMobileDevice: boolean = true) {
    this.__data = data
    this.__byteOffset = byteOffset
    this.__dataView = new DataView(this.__data)
    this.__isMobileDevice = isMobileDevice
    this.utf8decoder = new TextDecoder()
  }

  /**
   * Returns state of whether or not the `BinReader` object was instantiated from a mobile device.
   *
   * @return - Returns true is a mobile device is detected.
   */
  get isMobileDevice(): boolean {
    return this.__isMobileDevice
  }

  /**
   * Returns the data buffer we're reading from.
   *
   * @return - The data buffer we are reading from,
   */
  get data(): ArrayBuffer {
    return this.__data
  }

  /**
   * Returns the length of the buffer.
   *
   * @return - The total length of the buffer
   */
  get byteLength(): number {
    return this.__dataView.byteLength
  }

  /**
   * Returns remaining length of the buffer to read.
   *
   * @return - The remaining length of the buffer to read.
   */
  get remainingByteLength(): number {
    return this.__dataView.byteLength - this.__byteOffset
  }

  /**
   * Returns current byte offset in the buffer.
   * @return - The current offset in the binary buffer
   */
  pos(): number {
    return this.__byteOffset
  }

  /**
   * Sets the byte offset value.
   * @param byteOffset - The byteOffset param.
   */
  seek(byteOffset: number): void {
    this.__byteOffset = byteOffset
  }

  /**
   * Adds offset bytes to current offset value.
   *
   * @param byteOffset - The byte Offset amount.
   */
  advance(byteOffset: number): void {
    this.__byteOffset += byteOffset
  }

  /**
   * Returns the unsigned Uint8 value at current byte offset position,
   * and adds one byte to the offset.
   *
   * @return - The return value.
   */
  loadUInt8(): number {
    const result = this.__dataView.getUint8(this.__byteOffset)
    this.__byteOffset += 1
    return result
  }

  /**
   * Returns the unsigned Uint16 value at current byte offset position,
   * and adds two bytes to the offset.
   *
   * @return - The return value.
   */
  loadUInt16(): number {
    const result = this.__dataView.getUint16(this.__byteOffset, true)
    this.__byteOffset += 2
    return result
  }

  /**
   * Returns the unsigned Uint32 value at current byte offset position,
   * and adds four bytes to the offset.
   *
   * @return - The return value.
   */
  loadUInt32(): number {
    const result = this.__dataView.getUint32(this.__byteOffset, true)
    this.__byteOffset += 4
    return result
  }

  /**
   * Returns the signed Int32 value at current byte offset position,
   * and adds four bytes to the offset.
   *
   * @return - The return value.
   */
  loadSInt32(): number {
    const result = this.__dataView.getInt32(this.__byteOffset, true)
    this.__byteOffset += 4
    return result
  }

  /**
   * Returns the Float16 value at current byte offset position,
   * and adds four bytes to the offset.
   *
   * @return - The return value.
   */
  loadFloat16(): number {
    const uint16 = this.loadUInt16()
    return MathFunctions.decode16BitFloat(uint16)
  }

  /**
   * Returns the Float16 value at current byte offset position,
   * and adds two bytes to the offset.
   *
   * @return - The return value.
   */
  loadUFloat16(): number {
    const result = this.loadFloat16()
    if (result < 0.0) {
      return 2048.0 - result // Note: subtract a negative number to add it.
    } else {
      return result
    }
  }

  /**
   * Returns a single signed Float16 value at current byte offset position from 2 unsigned Int8 values,
   * and adds two bytes to the offset.
   *
   * @return - The return value.
   */
  loadFloat16From2xUInt8(): void {
    throw Error('loadFloat16From2xUInt8 not implemented!')
    // const result = this.__dataView.getFloat16(this.__byteOffset, true)
    // const uint8s = this.loadUInt8Array(2);
    // return Math.decode16BitFloat(uint8s);
    // this.__byteOffset += 2
    // return result
  }

  /**
   * Loads and returns a single Signed integer value from 2 Unsigned Float16 values.
   * @return - The return value.
   */
  loadUInt32From2xUFloat16(): number {
    const partA = this.loadUFloat16()
    const partB = this.loadUFloat16()
    return partA + partB * 4096
  }

  /**
   * Loads and returns a single Signed integer value from 2 signed Float16 values.
   * @return - The return value.
   */
  loadSInt32From2xFloat16(): number {
    const partA = this.loadFloat16()
    const partB = this.loadFloat16()
    return partA + partB * 2048
  }

  /**
   * Returns the Float32 value at current byte offset position,
   * and adds four bytes to the offset.
   *
   * @return - The return value.
   */
  loadFloat32(): number {
    const result = this.__dataView.getFloat32(this.__byteOffset, true)
    this.__byteOffset += 4
    return result
  }

  /**
   * Reads buffer and return an unsigned Int8 array with the specified size,
   * starting from current byte offset.
   * Byte offset is increased by the specified byte size.
   *
   * @param size - The size param.
   * @param clone - The clone param.
   * @return - The return value.
   */
  loadUInt8Array(size?: number, clone = false): Uint8Array {
    if (size == undefined) size = this.loadUInt32()
    let result
    if (clone) {
      result = new Uint8Array(this.__data.slice(this.__byteOffset, this.__byteOffset + size))
      if (result.length != size) console.log('broken')
    } else {
      result = new Uint8Array(this.__data, this.__byteOffset, size)
    }
    this.__byteOffset += size
    return result
  }

  /**
   * Reads buffer and return an unsigned Int16 array with the specified size,
   * starting from current byte offset.
   * Byte offset is increased by the specified byte size x 2.
   *
   * @param size - The size param.
   * @param clone - The clone param.
   * @return - The return value.
   */
  loadUInt16Array(size?: number, clone = false): Uint16Array {
    if (size == undefined) size = this.loadUInt32()
    if (size == 0) return new Uint16Array()
    this.readPad(2)
    let result
    if (this.__isMobileDevice) {
      result = new Uint16Array(size)
      for (let i = 0; i < size; i++) {
        result[i] = this.__dataView.getUint16(this.__byteOffset, true)
        this.__byteOffset += 2
      }
    } else {
      if (clone) {
        result = new Uint16Array(this.__data.slice(this.__byteOffset, this.__byteOffset + size * 2))
        if (result.length != size) console.log('broken')
      } else {
        result = new Uint16Array(this.__data, this.__byteOffset, size)
      }
      this.__byteOffset += size * 2
    }
    return result
  }

  /**
   * Reads buffer and return an unsigned Int32 array with the specified size,
   * starting from current byte offset.
   * Byte offset is increased by the specified byte size x 4.
   *
   * @param size - The size param.
   * @param clone - The clone param.
   * @return - The return value.
   */
  loadUInt32Array(size?: number, clone = false): Uint32Array {
    if (size == undefined) size = this.loadUInt32()
    if (size == 0) return new Uint32Array()
    this.readPad(4)
    let result
    if (this.__isMobileDevice) {
      result = new Uint32Array(size)
      for (let i = 0; i < size; i++) {
        result[i] = this.__dataView.getUint32(this.__byteOffset, true)
        this.__byteOffset += 4
      }
    } else {
      if (clone) {
        result = new Uint32Array(this.__data.slice(this.__byteOffset, this.__byteOffset + size * 4))
        if (result.length != size) console.log('broken')
      } else {
        result = new Uint32Array(this.__data, this.__byteOffset, size)
      }
      this.__byteOffset += size * 4
    }
    return result
  }

  /**
   * Reads buffer and return a Float32 array with the specified size,
   * starting from current byte offset.
   * Byte offset is increased by the specified byte size x 4.
   *
   * @param size - The size param.
   * @param clone - The clone param.
   * @return - The return value.
   */
  loadFloat32Array(size?: number, clone = false): Float32Array {
    if (size == undefined) size = this.loadUInt32()
    if (size == 0) return new Float32Array()
    this.readPad(4)
    let result
    if (this.__isMobileDevice) {
      result = new Float32Array(size)
      for (let i = 0; i < size; i++) {
        result[i] = this.__dataView.getFloat32(this.__byteOffset, true)
        this.__byteOffset += 4
      }
    } else {
      if (clone) {
        result = new Float32Array(this.__data.slice(this.__byteOffset, this.__byteOffset + size * 4))
      } else {
        result = new Float32Array(this.__data, this.__byteOffset, size)
      }
      this.__byteOffset += size * 4
    }
    return result
  }

  /**
   * Returns next string.
   * First looks for the string length description in the next four bytes in the buffer(Starting from byte offset).
   *
   * @return - The return value.
   */
  loadStr(): string {
    const numChars = this.loadUInt32()
    const chars = new Uint8Array(this.__data, this.__byteOffset, numChars)
    this.__byteOffset += numChars
    return this.utf8decoder.decode(chars)
  }

  /**
   * Returns an array of strings.
   * First reading the size of the array then reading each string.
   *
   * @return - The return value.
   */
  loadStrArray(): string[] {
    const size = this.loadUInt32()
    const result = []
    for (let i = 0; i < size; i++) {
      result[i] = this.loadStr()
    }
    return result
  }

  /**
   * Creates and returns a `Vec2` object with the next two signed Int32 values in the buffer.
   *
   * @return - Returns a Vec2.
   */
  loadSInt32Vec2(): Vec2 {
    const x = this.loadSInt32()
    const y = this.loadSInt32()
    return new Vec2(x, y)
  }

  /**
   * Creates and returns a `Vec2` object with the next two unsigned Int32 values in the buffer.
   * @return - Returns a Vec2.
   */
  loadUInt32Vec2(): Vec2 {
    const x = this.loadUInt32()
    const y = this.loadUInt32()
    return new Vec2(x, y)
  }

  /**
   * Creates and returns a `Vec2` object with the next two Float16 values in the buffer.
   *
   * @return - Returns a Vec2.
   */
  loadFloat16Vec2(): Vec2 {
    const x = this.loadFloat16()
    const y = this.loadFloat16()
    return new Vec2(x, y)
  }

  /**
   * Creates and returns a `Vec2` object with the next two Float32 values in the buffer.
   * @return - Returns a Vec2.
   */
  loadFloat32Vec2(): Vec2 {
    const x = this.loadFloat32()
    const y = this.loadFloat32()
    return new Vec2(x, y)
  }

  /**
   * Creates and returns a `Vec3` object with the next three Float16 values in the buffer.
   *
   * @return - Returns a Vec3.
   */
  loadFloat16Vec3(): Vec3 {
    const x = this.loadFloat16()
    const y = this.loadFloat16()
    const z = this.loadFloat16()
    return new Vec3(x, y, z)
  }

  /**
   * Creates and returns a `Vec3` object with the next three Float32 values in the buffer.
   *
   * @return - Returns a Vec3.
   */
  loadFloat32Vec3(): Vec3 {
    const x = this.loadFloat32()
    const y = this.loadFloat32()
    const z = this.loadFloat32()
    return new Vec3(x, y, z)
  }

  /**
   * Creates and returns a `Quat` object with the next four Float16 values in the buffer.
   *
   * @return - Returns a Quat.
   */
  loadFloat16Quat(): Quat {
    const x = this.loadFloat16()
    const y = this.loadFloat16()
    const z = this.loadFloat16()
    const w = this.loadFloat16()
    return new Quat(x, y, z, w)
  }

  /**
   * Creates and returns a `Quat` object with the next four Float32 values in the buffer.
   * @return - Returns a Quat.
   */
  loadFloat32Quat(): Quat {
    const x = this.loadFloat32()
    const y = this.loadFloat32()
    const z = this.loadFloat32()
    const w = this.loadFloat32()
    return new Quat(x, y, z, w)
  }

  /**
   * Creates and returns a `Color` object with the next three Float32 values in the buffer.
   *
   * @return - Returns a Color.
   */
  loadRGBFloat32Color(): Color {
    const r = this.loadFloat32()
    const g = this.loadFloat32()
    const b = this.loadFloat32()
    return new Color(r, g, b)
  }

  /**
   * Creates and returns a RGBA `Color` object with the next four Float32 values in the buffer.
   * @return - Returns a Color.
   */
  loadRGBAFloat32Color(): Color {
    const r = this.loadFloat32()
    const g = this.loadFloat32()
    const b = this.loadFloat32()
    const a = this.loadFloat32()
    return new Color(r, g, b, a)
  }

  /**
   * Creates and returns a `Color` object with the next three unsigned Int8 values in the buffer.
   * @return - Returns a Color.
   */
  loadRGBUInt8Color(): Color {
    const r = this.loadUInt8()
    const g = this.loadUInt8()
    const b = this.loadUInt8()
    return new Color(r / 255, g / 255, b / 255)
  }

  /**
   * Creates and returns a RGBA `Color` object with the next four unsigned Int8 values in the buffer.
   * @return - Returns a Color.
   */
  loadRGBAUInt8Color(): Color {
    const r = this.loadUInt8()
    const g = this.loadUInt8()
    const b = this.loadUInt8()
    const a = this.loadUInt8()
    return new Color(r / 255, g / 255, b / 255, a / 255)
  }

  /**
   * Creates and returns a `Box2` object with the next four Float32 values in the buffer.
   * Next four because it creates two Vec2.
   *
   * @return - Returns a Box2.
   */
  loadBox2(): Box2 {
    return new Box2(this.loadFloat32Vec2(), this.loadFloat32Vec2())
  }

  /**
   * Creates and returns a `Box2` object with the next six Float32 values in the buffer.
   * Next four because it creates two Vec3.
   *
   * @return - Returns a Box3.
   */
  loadBox3(): Box3 {
    return new Box3(this.loadFloat32Vec3(), this.loadFloat32Vec3())
  }

  /**
   * Given a stridee value, advance the pointer to the end of the current stride.
   * @param stride - The stride param.
   */
  readPad(stride: number): void {
    const pad = this.__byteOffset % stride
    if (pad != 0) this.__byteOffset += stride - pad
  }
}

export { BinReader }
