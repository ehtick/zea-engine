import { Lines } from './Lines'
import { Vec2, Vec3, Box3 } from '../../Math'

describe('Lines', () => {
  test('Check for default positions attribute.', () => {
    const lines = new Lines()
    expect(lines.hasVertexAttribute('positions')).toBe(true)
  })

  test('Check for positions attribute has the same length as the number of vertices.', () => {
    const lines = new Lines()
    const numVertices = 3
    lines.setNumVertices(numVertices)

    const positions = lines.getVertexAttribute('positions')
    positions.getValueRef(0).set(1, 2, 3)
    positions.getValueRef(1).set(-1, -2, -3)
    positions.getValueRef(2).set(2, 1, -3)

    lines.setNumSegments(2)
    lines.setSegment(0, 0, 1)
    lines.setSegment(1, 1, 2)

    expect(lines.getSegmentVertexIndex(1, 0)).toBe(1)
    expect(lines.getSegmentVertexIndex(1, 1)).toBe(2)

    expect(lines.getVertexAttribute('positions').length).toBe(numVertices)
  })

  test('Check generated buffers', () => {
    const lines = new Lines()
    const numVertices = 3
    lines.setNumVertices(numVertices)

    const positions = lines.getVertexAttribute('positions')
    positions.getValueRef(0).set(1, 2, 3)
    positions.getValueRef(1).set(-1, -2, -3)
    positions.getValueRef(2).set(2, 1, -3)

    lines.setNumSegments(2)
    lines.setSegment(0, 0, 1)
    lines.setSegment(1, 1, 2)

    expect(lines.getSegmentVertexIndex(1, 0)).toBe(1)
    expect(lines.getSegmentVertexIndex(1, 1)).toBe(2)

    expect(lines.genBuffers()).toEqual({
      attrBuffers: {
        positions: {
          count: 3,
          dataType: Vec3,
          normalized: false,
          values: new Float32Array([1, 2, 3, -1, -2, -3, 2, 1, -3]),
        },
      },
      indices: new Uint8Array([0, 1, 1, 2]),
      numVertices: 3,
    })
  })

  it('saves to JSON (serialization).', () => {
    const lines = new Lines()
    const numVertices = 3
    lines.setNumVertices(numVertices)
    const positions = lines.getVertexAttribute('positions')
    positions.getValueRef(0).set(1, 2, 3)
    positions.getValueRef(1).set(-1, -2, -3)
    positions.getValueRef(2).set(2, 1, -3)

    lines.setNumSegments(2)
    lines.setSegment(0, 0, 1)
    lines.setSegment(1, 1, 2)

    expect(JSON.stringify(lines.toJSON())).toMatchSnapshot()
  })

  it('loads from JSON (serialization).', () => {
    const lines = new Lines()
    const input = {
      type: 'Lines',
      numVertices: 3,
      vertexAttributes: {
        positions: { data: [1, 2, 3, -1, -2, -3, 2, 1, -3], dataType: 'Vec3', defaultValue: 0, length: 3 },
      },
      indices: [0, 1, 1, 2],
    }
    lines.fromJSON(input)

    expect(lines.getVertexAttribute('positions').length).toBe(3)
    expect(lines.getNumSegments()).toBe(2)
  })
})
