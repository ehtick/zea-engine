import { NumberParameter } from './NumberParameter'
import { BinReader } from '../BinReader'

describe('NumberParameter', () => {
  it('has an initial value.', () => {
    const numberParameter = new NumberParameter()

    expect(numberParameter.value).toEqual(0)
  })

  it('checks value type.', () => {
    const numberParameter = new NumberParameter()

    expect(numberParameter.getDataType()).toEqual('Number')
  })

  it('sets a value.', () => {
    const numberParameter = new NumberParameter()
    const value = 1356
    numberParameter.value = value
    expect(numberParameter.value).toEqual(value)
  })

  it('saves to JSON (serialization).', () => {
    const numberParameter = new NumberParameter()
    const value = 1356
    numberParameter.value = value

    const expOutput = '{"value":1356}'

    expect(JSON.stringify(numberParameter.toJSON())).toEqual(expOutput)
  })

  it('loads from JSON (serialization).', () => {
    const numberParameter = new NumberParameter()
    const input = { value: 1356 }
    numberParameter.fromJSON(input)

    expect(numberParameter.value).toEqual(input.value)
  })

  it('loads from binary (serialization).', () => {
    const numberParameter = new NumberParameter()

    const value = 1356
    const data = new Float32Array(1)
    data[0] = value
    const reader = new BinReader(<Buffer>data.buffer)
    numberParameter.readBinary(reader)

    expect(numberParameter.value).toEqual(value)
  })

  it('clones parameter object', () => {
    const parameter = new NumberParameter('Test', 1.0)
    const parameter2 = parameter.clone()

    expect(parameter.toJSON()).toEqual(parameter2.toJSON())
  })
})
