import { Mat4Parameter } from './Mat4Parameter'
import { Mat4 } from '../../Math'
import { BinReader } from '../BinReader'

describe('Mat4Parameter', () => {
  it('has an initial value.', () => {
    const mat4Parameter = new Mat4Parameter()

    expect(mat4Parameter.value).toEqual(new Mat4())
  })

  it('checks value type.', () => {
    const mat4Parameter = new Mat4Parameter()

    expect(mat4Parameter.getDataType()).toEqual('Mat4')
  })

  it('sets value.', () => {
    const mat4Parameter = new Mat4Parameter()
    const mat4 = new Mat4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)
    mat4Parameter.value = mat4

    expect(mat4Parameter.value).toEqual(mat4)
  })

  it('saves to JSON (serialization).', () => {
    const mat4Parameter = new Mat4Parameter()
    const mat4 = new Mat4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)
    mat4Parameter.value = mat4

    expect(mat4Parameter.toJSON()).toEqual({
      value: Float32Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)
    })
  })

  it('loads from JSON (serialization).', () => {
    const mat4Parameter = new Mat4Parameter()
    const mat4 = { value: Float32Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16) }
    mat4Parameter.fromJSON(mat4)

    expect(mat4Parameter.value).toEqual(new Mat4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16))
  })

  it('loads from binary (serialization).', () => {
    const mat4Parameter = new Mat4Parameter()

    const data = Float32Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)
    const reader = new BinReader(<Buffer>data.buffer)
    mat4Parameter.readBinary(reader)

    expect(mat4Parameter.value.toJSON()).toEqual(Float32Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16))
  })

  it('clones parameter object', () => {
    const parameter = new Mat4Parameter('TestParameter')
    const mat4 = new Mat4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)
    parameter.value = mat4

    const parameter2 = parameter.clone()

    expect(parameter.toJSON()).toEqual(parameter2.toJSON())
    expect(parameter.value).toEqual(mat4)
  })
})
