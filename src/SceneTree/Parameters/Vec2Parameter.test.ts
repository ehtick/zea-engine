import { Vec2 } from '../../Math/Vec2'
import { Vec2Parameter } from './Vec2Parameter'
import { BinReader } from '../BinReader'

describe('Vec2Parameter', () => {
  it('has an initial value.', () => {
    const vec2Parameter = new Vec2Parameter()
    const vec2 = new Vec2()

    expect(vec2Parameter.value.isEqual(vec2)).toBe(true)
  })

  it('checks value type.', () => {
    const vec2Parameter = new Vec2Parameter()

    expect(vec2Parameter.getDataType()).toEqual('Vec2')
  })

  it('sets value.', () => {
    const vec2Parameter = new Vec2Parameter()
    const value = new Vec2()
    vec2Parameter.value = value
    expect(vec2Parameter.value).toEqual(value)
  })

  it('saves to JSON (serialization).', () => {
    const vec2Parameter = new Vec2Parameter()
    const value = new Vec2(1, 2)
    vec2Parameter.value = value

    const expOutput = '{"name":"","value":{"x":1,"y":2}}'

    expect(JSON.stringify(vec2Parameter.toJSON())).toEqual(expOutput)
  })

  it('loads from JSON (serialization).', () => {
    const vec2Parameter = new Vec2Parameter()
    const input = { value: { x: 1, y: 2 } }
    vec2Parameter.fromJSON(input)

    expect(vec2Parameter.value.toJSON()).toEqual(input.value)
  })

  it('loads from binary (serialization).', () => {
    const vec2Parameter = new Vec2Parameter()

    const data = Float32Array.of(1, 2)
    const reader = new BinReader(<Buffer>data.buffer)
    vec2Parameter.readBinary(reader)

    expect(vec2Parameter.value.toJSON()).toEqual({ x: 1, y: 2 })
  })

  it('clones parameter object', () => {
    const parameter = new Vec2Parameter('TestParameter')
    const value = new Vec2(1, 2)
    parameter.value = value

    const parameter2 = parameter.clone()

    expect(parameter.toJSON()).toEqual(parameter2.toJSON())
  })
})
