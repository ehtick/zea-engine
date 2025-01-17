import { Mat4 } from './Mat4'

describe('Mat4', () => {
  it('creates Mat4 from buffer', () => {
    const float32Array = Float32Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)
    const mat4 = new Mat4(float32Array)

    expect(mat4).toEqual(new Mat4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16))
  })
})
