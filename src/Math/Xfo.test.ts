import { Xfo } from './Xfo'
import { Vec3, Quat, Mat4 } from './index'
import { BinReader } from '../SceneTree/BinReader'

describe('Xfo', () => {
  it('has initial values', () => {
    const xfo = new Xfo()

    expect(xfo.toJSON()).toEqual({
      ori: { w: 1, x: 0, y: 0, z: 0 },
      tr: { x: 0, y: 0, z: 0 },
      sc: { x: 1, y: 1, z: 1 },
    })
  })

  it('sets value on instantiation', () => {
    const xfoFromVec3 = new Xfo(new Vec3(1, 2, 3))

    expect(xfoFromVec3.toJSON()).toEqual({
      ori: { w: 1, x: 0, y: 0, z: 0 },
      tr: { x: 1, y: 2, z: 3 },
      sc: { x: 1, y: 1, z: 1 },
    })

    const xfoFromQuat = new Xfo(new Quat(0, 1, 0, 0))
    expect(xfoFromQuat.toJSON()).toEqual({
      ori: { w: 0, x: 0, y: 1, z: 0 },
      tr: { x: 0, y: 0, z: 0 },
      sc: { x: 1, y: 1, z: 1 },
    })

    // Float32Array can't be tested in jest like everything else due to some ArrayBuffer regression in node.
    // There's a workaround but adds complexity to the testing. Although this works in the browser.
    // const xfoFromFloat32Array = new Xfo(Float32Array.of(1, 2, 3, 4, 5, 6, 7))
    // expect(xfoFromFloat32Array.toJSON()).toEqual({ ori: { w: 4, x: 1, y: 2, z: 3 }, tr: { x: 0, y: 0, z: 0 } })

    const xfo = new Xfo(new Vec3(1, 2, 3), new Quat(0, 0, 1, 0), new Vec3(8, 9, 10))

    expect(xfo.toJSON()).toEqual({
      ori: { w: 0, x: 0, y: 0, z: 1 },
      tr: { x: 1, y: 2, z: 3 },
      sc: { x: 8, y: 9, z: 10 },
    })
  })

  it('sets value from method', () => {
    const xfo = new Xfo()
    xfo.set(new Vec3(1, 2, 3), new Quat(0, 1, 0, 0), new Vec3(8, 9, 10))

    expect(xfo.toJSON()).toEqual({
      ori: { w: 0, x: 0, y: 1, z: 0 },
      tr: { x: 1, y: 2, z: 3 },
      sc: { x: 8, y: 9, z: 10 },
    })
  })

  it('sets value from another xfo', () => {
    const xfo = new Xfo(new Vec3(1, 2, 3), new Quat(0, 1, 0, 0), new Vec3(8, 9, 10))
    const xfo2 = new Xfo()
    xfo2.setFromOther(xfo)

    expect(xfo2.toJSON()).toEqual({
      ori: { w: 0, x: 0, y: 1, z: 0 },
      tr: { x: 1, y: 2, z: 3 },
      sc: { x: 8, y: 9, z: 10 },
    })
  })

  it('checks that the xfo is an identity', () => {
    const xfo = new Xfo()
    expect(xfo.isIdentity()).toBe(true)
  })

  it('multiplies two xfo values', () => {
    const xfo = new Xfo(new Vec3(1, 2, 3), new Quat(0, 1, 0, 0), new Vec3(8, 9, 10))
    const xfo2 = new Xfo(new Vec3(3, 2, 3), new Quat(0, 1, 0, 0), new Vec3(8, 9, 10))
    const resultXfo = xfo.multiply(xfo2)

    expect(resultXfo.toJSON()).toEqual({
      ori: { w: -1, x: 0, y: 0, z: 0 },
      tr: { x: -23, y: 20, z: -27 },
      sc: { x: 64, y: 81, z: 100 },
    })
  })

  it('calculates the inverse of the xfo', () => {
    const xfo = new Xfo(new Vec3(1, 2, 3), new Quat(0, 1, 0, 0), new Vec3(2, 2, 2))
    const resultXfo = xfo.inverse()

    expect(resultXfo.toJSON()).toEqual({
      ori: { w: 0, x: -0, y: -1, z: -0 },
      tr: { x: 0.5, y: -1, z: 1.5 },
      sc: { x: 0.5, y: 0.5, z: 0.5 },
    })
  })

  it('transforms a Vec3 by an Xfo and its inverse', () => {
    const xfo = new Xfo()
    xfo.tr.set(1, 1, 1)

    // Rotate by 90 degress around Z axis.
    xfo.ori.setFromAxisAndAngle(new Vec3(0, 0, 1), Math.PI * 0.5)
    xfo.sc.set(2, 1, 1)
    const invXfo = xfo.inverse()

    const vec3 = new Vec3(1, 1, 0)
    const transformedTr = xfo.transformVec3(vec3)
    // logic
    // sc: (1, 1, 0) >> scaled X * 2 == (2, 1, 0 )
    // ori: (2, 1, 0) >> rotated 90 degress == (-1, 2, 0)
    // tr: (-1, 2, 0) >> add (1, 1, 1) == (0, 3, 1)
    expect(transformedTr.approxEqual(new Vec3(0, 3, 1), 0.001)).toBeTruthy()

    const vec3_1 = invXfo.transformVec3(transformedTr)

    expect(vec3_1.approxEqual(vec3, 0.001)).toBeTruthy()
  })

  it('transforms an Xfo with uniform scale by its inverse', () => {
    const xfo = new Xfo()
    xfo.tr.set(1, 1, 1)
    // Rotate by 90 degress around Z axis.
    xfo.ori.setFromAxisAndAngle(new Vec3(0, 0, 1), Math.PI * 0.5)
    xfo.sc.set(0.001, 0.001, 0.001)

    const invXfo = xfo.inverse()
    const xfo2 = invXfo.multiply(xfo)
    const identity = new Xfo()

    expect(xfo2.tr.approxEqual(identity.tr, 0.001)).toBeTruthy()
    expect(xfo2.ori.approxEqual(identity.ori, 0.001)).toBeTruthy()
    expect(xfo2.sc.approxEqual(identity.sc, 0.001)).toBeTruthy()
  })

  it('transforms an Xfo with uniform scale by an Xfo and its inverse', () => {
    const parentGlobal = new Xfo()
    parentGlobal.tr.set(1, 1, 1)
    // Rotate by 90 degress around Z axis.
    parentGlobal.ori.setFromAxisAndAngle(new Vec3(0, 0, 1), Math.PI * 0.5)
    parentGlobal.sc.set(0.001, 0.001, 0.001)

    const childGlobal = new Xfo(new Vec3(-1, -1, 1))

    const invParentGlobal = parentGlobal.inverse()
    const childLocal = invParentGlobal.multiply(childGlobal)
    const childGlobal2 = parentGlobal.multiply(childLocal)

    console.log(childGlobal.tr.toString(), childGlobal2.tr.toString())
    console.log(childGlobal.ori.toString(), childGlobal2.ori.toString())
    console.log(childGlobal.sc.toString(), childGlobal2.sc.toString())

    expect(childGlobal.tr.approxEqual(childGlobal2.tr, 0.001)).toBeTruthy()
    expect(childGlobal.ori.approxEqual(childGlobal2.ori, 0.001)).toBeTruthy()
    expect(childGlobal.sc.approxEqual(childGlobal2.sc, 0.001)).toBeTruthy()
  })

  it('transforms an Xfo with non-uniform scale  by an Xfo and its inverse', () => {
    const xfo = new Xfo()
    xfo.tr.set(1, 1, 1)
    // Rotate by 90 degress around Z axis.
    xfo.ori.setFromAxisAndAngle(new Vec3(0, 0, 1), Math.PI * 0.5)
    xfo.sc.set(2, 1, 1)

    //           x
    //           |
    //   y       |
    //   |    y--*
    //   |
    //   |
    //    -------- x
    //

    const invXfo = xfo.inverse()

    const xfo2 = new Xfo(new Vec3(1, 1, 0))
    const transformedXfo = xfo.multiply(xfo2)
    console.log(transformedXfo.toString())

    expect(transformedXfo.tr.approxEqual(new Vec3(0, 3, 1), 0.001)).toBeTruthy()
    expect(transformedXfo.sc.approxEqual(new Vec3(1, 2, 1), 0.001)).toBeTruthy()

    // Note: I don't think this is possible.
    // (Inverting an Xfo with a non-uniform scales)
    const xfo2_1 = transformedXfo.multiply(invXfo)
    // expect(xfo2_1.tr.approxEqual(xfo2.tr, 0.001)).toBeTruthy()
    expect(xfo2_1.ori.approxEqual(xfo2.ori, 0.001)).toBeTruthy()
    // expect(xfo2_1.sc.approxEqual(xfo2.sc, 0.001)).toBeTruthy()
  })

  it('transforms Vec3 by Xfo', () => {
    const xfo = new Xfo(new Vec3(1, 2, 3), new Quat(1, 0, 0, 0), new Vec3(8, 9, 10))
    const transformedTr = xfo.transformVec3(new Vec3(3, 4, 3))

    expect(transformedTr.toJSON()).toEqual({ x: 25, y: -34, z: -27 })
  })

  it('returns Mat4 representation of the xfo', () => {
    const xfo = new Xfo(new Vec3(1, 2, 3), new Quat(1, 0, 0, 0), new Vec3(8, 9, 10))
    const mat4 = xfo.toMat4()

    expect(mat4).toEqual(new Mat4(8, 0, 0, 0, 0, -9, 0, 0, 0, 0, -10, 0, 1, 2, 3, 1))
  })

  it('restores xfo from a Mat4', () => {
    const xfo = new Xfo(new Vec3(1, 2, 3), new Quat(0, 1, 0, 0))
    const mat4 = xfo.toMat4()

    const restoredXfo = new Xfo()
    restoredXfo.setFromMat4(mat4)

    expect(restoredXfo).toEqual(xfo)
  })

  it('clones xfo', () => {
    const xfo = new Xfo(new Vec3(1, 2, 3), new Quat(0, 0, 1, 0), new Vec3(8, 9, 10))
    const xfo2 = xfo.clone()

    expect(xfo2).toEqual(xfo)
  })

  it('serializes xfo as a JSON', () => {
    const xfo = new Xfo(new Vec3(1, 2, 3), new Quat(0, 0, 1, 0), new Vec3(8, 9, 10))

    expect(xfo.toJSON()).toEqual({
      ori: { w: 0, x: 0, y: 0, z: 1 },
      sc: { x: 8, y: 9, z: 10 },
      tr: { x: 1, y: 2, z: 3 },
    })
  })

  it('restores xfo from JSON', () => {
    const xfo = new Xfo()
    xfo.fromJSON({
      ori: { w: 0.6236095428466797, x: 0.35634833574295044, y: 0.44543540477752686, z: 0.5345224738121033 },
      sc: { x: 8, y: 9, z: 10 },
      tr: { x: 1, y: 2, z: 3 },
    })

    expect(xfo.toJSON()).toEqual({
      ori: { w: 0.6236095428466797, x: 0.35634833574295044, y: 0.44543540477752686, z: 0.5345224738121033 },
      sc: { x: 8, y: 9, z: 10 },
      tr: { x: 1, y: 2, z: 3 },
    })
  })

  it('restores xfo from binary', () => {
    const data = Float32Array.of(1, 2, 3, 1, 0, 0, 0, 8, 9, 10)
    const binReader = new BinReader(<Buffer>data.buffer)
    const xfo = new Xfo()
    xfo.readBinary(binReader)

    expect(xfo.toJSON()).toEqual({
      ori: { w: 0, x: 1, y: 0, z: 0 },
      sc: { x: 8, y: 9, z: 10 },
      tr: { x: 1, y: 2, z: 3 },
    })
  })
})
