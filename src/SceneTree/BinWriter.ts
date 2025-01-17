/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { Vec2, Vec3, Quat, Color, Box2, Box3 } from '../Math/index'
import { MathFunctions } from '../Utilities/MathFunctions'

/**
 * Writes `TypedArray` types in binary using a specific encoding.
 */
class BinWriter {
  protected __data: ArrayBuffer
  protected __byteOffset: number
  protected __reserved: number
  protected __dataView: DataView
  /**
   * Create a bin writer.
   * @param dataSize - The dataSize value.
   */
  constructor(dataSize = 0) {
    this.__data = new ArrayBuffer(dataSize)
    this.__byteOffset = 0
    this.__reserved = dataSize
    this.__dataView = new DataView(this.__data)
  }

  /**
   * Returns the byte offset position.
   *
   * @return - The return value.
   */
  pos(): number {
    return this.__byteOffset
  }

  /**
   * Sets byte offset value.
   *
   * @param byteOffset - The byteOffset value.
   */
  seek(byteOffset: number): void {
    this.__byteOffset = byteOffset
  }

  /**
   * The seekEnd method.
   */
  seekEnd(): void {
    this.__byteOffset = this.__reserved
  }

  /**
   * Returns written buffer data to current point.
   *
   * @return - Returns an array buffer.
   */
  getBuffer(): ArrayBuffer {
    if (this.__data.byteLength == this.__byteOffset) {
      return this.__data
    } else {
      const unit8Array = new Uint8Array(this.__data)
      return unit8Array.slice(0, this.__byteOffset).buffer
    }
  }

  /**
   * The __grow method.
   * @private
   */
  __grow(): void {
    const newSize = (this.__reserved > 0 ? this.__reserved : 1) * 2
    const data = new ArrayBuffer(newSize)
    const unit8Array = new Uint8Array(data)
    const old_unit8Array = new Uint8Array(this.__data)
    unit8Array.set(old_unit8Array)
    this.__data = data
    this.__dataView = new DataView(this.__data)
    this.__reserved = newSize
  }

  /**
   * The __reserve method.
   * @param offset - The offset value.
   * @private
   */
  __reserve(offset: number): void {
    if (this.__byteOffset + offset > this.__reserved) {
      this.__grow()
    }
  }

  /**
   * The __offset method.
   * @param byteCount - The byteCount value.
   * @private
   */
  __offset(byteCount: number): void {
    this.__byteOffset += byteCount
    if (this.__byteOffset > this.__reserved) {
      this.__grow()
    }
  }

  /**
   * Writes an unsigned Int8 value in current byte offset.
   *
   * @param value - The value param.
   */
  writeUInt8(value: number): void {
    this.__reserve(1)
    this.__dataView.setUint8(this.__byteOffset, value)
    this.__offset(1)
  }

  /**
   * Writes an unsigned Int16 value in current byte offset.
   * @param value - The value param.
   */
  writeUInt16(value: number): void {
    this.__reserve(2)
    this.__dataView.setUint16(this.__byteOffset, value, true)
    this.__offset(2)
  }

  /**
   * Writes an unsigned Int32 value in current byte offset.
   * @param value - The value param.
   */
  writeUInt32(value: number): void {
    this.__reserve(4)
    this.__dataView.setUint32(this.__byteOffset, value, true)
    this.__offset(4)
  }

  /**
   * Writes a signed Int32 value in current byte offset.
   * @param value - The value param.
   */
  writeSInt32(value: number): void {
    this.__reserve(4)
    this.__dataView.setInt32(this.__byteOffset, value, true)
    this.__offset(4)
  }

  /**
   * Writes a Float16 value in current byte offset.
   *
   * @param value - The value param.
   */
  writeFloat16(value: number): void {
    const uint16 = MathFunctions.encode16BitFloat(value)
    this.writeUInt16(uint16)
  }

  /**
   * Writes a Float32 value in current byte offset.
   *
   * @param value - The value param.
   */
  writeFloat32(value: number): void {
    this.__reserve(4)
    this.__dataView.setFloat32(this.__byteOffset, value, true)
    this.__offset(4)
  }

  /**
   * Writes an unsigned Int8 array value from current byte offset.
   *
   * @param value - The value param.
   * @param writeSize - The writeSize value.
   */
  writeUInt8Array(value: Uint8Array, writeSize: boolean = true): void {
    const count = value.length ? value.length : value.length
    this.__reserve(count + (writeSize ? 4 : 0))
    if (writeSize) this.writeUInt32(count)
    for (let i = 0; i < count; i++) {
      this.writeUInt8(value[i])
    }
  }

  /**
   * Writes an unsigned Int16 array value from current byte offset.
   *
   * @param value - The value param.
   * @param writeSize - The writeSize value.
   */
  writeUInt16Array(value: Uint16Array, writeSize: boolean = true): void {
    const count = value.length ? value.length : value.length
    this.__reserve(count * 2 + (writeSize ? 4 : 0))
    if (writeSize) this.writeUInt32(count)
    for (let i = 0; i < count; i++) {
      this.writeUInt16(value[i])
    }
  }

  /**
   * Writes an unsigned Int32 array value from current byte offset.
   *
   * @param value - The value param.
   * @param writeSize - The writeSize value.
   */
  writeUInt32Array(value: Uint32Array, writeSize = true): void {
    const count = value.length ? value.length : value.length
    this.__reserve(count * 4 + (writeSize ? 4 : 0))
    if (writeSize) this.writeUInt32(count)
    for (let i = 0; i < count; i++) {
      this.writeUInt32(value[i])
    }
  }

  /**
   * Writes a Float32 array value from current byte offset.
   *
   * @param value - The value param.
   * @param writeSize - The writeSize value.
   */
  writeFloat32Array(value: Float32Array, writeSize = true): void {
    const count = value.length ? value.length : value.length
    this.__reserve(count * 4 + (writeSize ? 4 : 0))
    if (writeSize) this.writeUInt32(count)
    for (let i = 0; i < count; i++) {
      this.writeFloat32(value[i])
    }
  }

  /**
   * Writes string value in current position, first writing an unsigned Int32 describing its length, then adding the string in Float32 values.
   *
   * @param str - The str value.
   * @param writeSize - The writeSize value.
   */
  writeStr(str: string, writeSize = true): void {
    const count = str.length
    this.__reserve(count * 4 + (writeSize ? 4 : 0))
    if (writeSize) this.writeUInt32(count)
    for (let i = 0; i < count; i++) {
      this.writeFloat32(str.charCodeAt(i))
    }
  }

  /**
   * Writes a `Vec2` in the buffer using signed Int32 values(In `x,y` order).
   * @param value - The Vec2 to write.
   */
  writeSInt32Vec2(value: Vec2): void {
    this.writeSInt32(value.x)
    this.writeSInt32(value.y)
  }

  /**
   * Writes a `Vec2` in the buffer using unsigned Int32 values(In `x,y` order).
   *
   * @param value - The Vec2 to write.
   */
  writeUInt32Vec2(value: Vec2): void {
    this.writeUInt32(value.x)
    this.writeUInt32(value.y)
  }

  /**
   * Writes a `Vec2` in the buffer using Float16 values(In `x,y` order).
   * @param value - The Vec2 to write.
   */
  writeFloat16Vec2(value: Vec2): void {
    this.writeFloat16(value.x)
    this.writeFloat16(value.y)
  }

  /**
   * Writes a `Vec2` in the buffer using Float32 values(In `x,y` order).
   *
   * @param value - The Vec2 to write.
   */
  writeFloat32Vec2(value: Vec2): void {
    this.writeFloat32(value.x)
    this.writeFloat32(value.y)
  }

  /**
   * Writes a `Vec3` in the buffer using Float16 values(In `x,y,z` order).
   *
   * @param value - The Vec3 to write.
   */
  writeFloat16Vec3(value: Vec3): void {
    this.writeFloat16(value.x)
    this.writeFloat16(value.y)
    this.writeFloat16(value.z)
  }

  /**
   * Writes a `Vec3` in the buffer using Float32 values(In `x,y,z` order).
   * @param value - The Vec3 to write.
   */
  writeFloat32Vec3(value: Vec3): void {
    this.writeFloat32(value.x)
    this.writeFloat32(value.y)
    this.writeFloat32(value.z)
  }

  /**
   * Writes a `Quat` in the buffer using Float16 values(In `x,y,z,w` order).
   *
   * @param value - The Quat to write.
   */
  writeFloat16Quat(value: Quat): void {
    this.writeFloat16(value.x)
    this.writeFloat16(value.y)
    this.writeFloat16(value.z)
    this.writeFloat16(value.w)
  }

  /**
   * Writes a `Quat` in the buffer using Float32 values(In `x,y,z,w` order).
   *
   * @param value - The Quat to write.
   */
  writeFloat32Quat(value: Quat): void {
    this.writeFloat32(value.x)
    this.writeFloat32(value.y)
    this.writeFloat32(value.z)
    this.writeFloat32(value.w)
  }

  /**
   * Writes a RGB `Color` in the buffer using Float32 values(In `r,g,b` order).
   *
   * @param value - The Color to write.
   */
  writeRGBFloat32Color(value: Color): void {
    this.writeFloat32(value.r)
    this.writeFloat32(value.g)
    this.writeFloat32(value.b)
  }

  /**
   * Writes a RGBA `Color` in the buffer using Float32 values(In `r,g,b,a` order).
   *
   * @param value - The Color to write.
   */
  writeRGBAFloat32Color(value: Color): void {
    this.writeFloat32(value.r)
    this.writeFloat32(value.g)
    this.writeFloat32(value.b)
    this.writeFloat32(value.a)
  }

  /**
   * Writes a RGB `Color` in the buffer using unsigned Int8 values(In `r,g,b` order).
   *
   * @param value - The Color to write.
   */
  writeRGBUInt8Color(value: Color): void {
    this.writeUInt8(value.r)
    this.writeUInt8(value.g)
    this.writeUInt8(value.b)
  }

  /**
   * Writes a RGBA `Color` in the buffer using unsigned Int8 values(In `r,g,b,a` order).
   *
   * @param value - The Color to write.
   */
  writeRGBAUInt8Color(value: Color): void {
    this.writeUInt8(value.r)
    this.writeUInt8(value.g)
    this.writeUInt8(value.b)
    this.writeUInt8(value.a)
  }

  /**
   * Writes a `Box2` in the buffer using Floar32 values(In `p0,p1` order).
   *
   * @param value - The Box2 to write.
   */
  writeBox2(value: Box2): void {
    this.writeFloat32Vec2(value.p0)
    this.writeFloat32Vec2(value.p1)
  }

  /**
   * Writes a `Box3` in the buffer using Floar32 values(In `p0,p1` order).
   *
   * @param value - The Box3 to write.
   */
  writeBox3(value: Box3): void {
    this.writeFloat32Vec3(value.p0)
    this.writeFloat32Vec3(value.p1)
  }

  /**
   * The writePadd method.
   * @param size - The size value.
   */
  writePadd(size: number): void {
    const bytes = size - this.__byteOffset
    this.__reserve(bytes)
    this.__offset(bytes)
  }

  /**
   * The writeAlignment method.
   * @param numBytes - The numBytes value.
   */
  writeAlignment(numBytes: number): void {
    const bytes = this.__byteOffset % numBytes
    if (bytes != 0) {
      this.__reserve(numBytes - bytes)
      this.__offset(numBytes - bytes)
    }
  }
}

export { BinWriter }
