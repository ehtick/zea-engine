import { Quat } from './Quat'
import { Vec3 } from './Vec3'

describe('Quat', () => {
  it('creates Quat from buffer', () => {
    const float32Array = Float32Array.of(1, 0, 0, 0)
    const quat = new Quat(float32Array)

    expect(quat).toEqual(new Quat(1, 0, 0, 0))
  })
  it('slerp QuatA to QuatA', () => {
    const quatA = new Quat()

    // Rotate by 90 degress around Z axis.
    quatA.setFromAxisAndAngle(new Vec3(0, 0, 1), Math.PI * 0.25)

    const quatB = new Quat()

    // Rotate by 90 degress around Z axis.
    quatB.setFromAxisAndAngle(new Vec3(0, 0, 1), Math.PI * 0.25)

    expect(quatA.slerp(quatB, 0.5)).toEqual(quatA)
  })
  it('slerp QuatA to QuatB', () => {
    const quatA = new Quat()

    // Rotate by 90 degress around Z axis.
    quatA.setFromAxisAndAngle(new Vec3(0, 0, 1), Math.PI * 0.25)

    const quatB = new Quat()

    // Rotate by 90 degress around Z axis.
    quatB.setFromAxisAndAngle(new Vec3(0, 0, 1), Math.PI * -0.25)
    quatB.alignWith(quatA)

    const invQuatA = quatA.inverse()

    const angle = invQuatA.multiply(quatB).getAngle()
    expect(angle).toEqual(1.5707965296108224)
    console.log('angle:', angle)

    expect(quatA.slerp(quatB, 0.5)).toEqual(new Quat())
  })
})
