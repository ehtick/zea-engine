import { KinematicGroup } from './KinematicGroup'
import { TreeItem } from '../TreeItem'
import { Vec3, Xfo } from '../../Math'

// TODO: enable test and migrate to typescript
xdescribe('KinematicGroup', () => {
  test('Calculating the KinematicGroup Xfo using different INITIAL_XFO_MODES.', () => {
    const group = new KinematicGroup('Foo')
    const treeItem1 = new TreeItem('treeItem1')
    const treeItem2 = new TreeItem('treeItem2')
    const treeItem3 = new TreeItem('treeItem3')
    const treeItem4 = new TreeItem('treeItem4')
    treeItem1.getParameter('LocalXfo').setValue(new Xfo(new Vec3(2, 4, 0)))
    treeItem2.getParameter('LocalXfo').setValue(new Xfo(new Vec3(4, 4, 0)))
    treeItem3.getParameter('LocalXfo').setValue(new Xfo(new Vec3(2, 2, 0)))
    treeItem4.getParameter('LocalXfo').setValue(new Xfo(new Vec3(4, 2, 0)))

    group.addItem(treeItem1)
    group.addItem(treeItem2)
    group.addItem(treeItem3)
    group.addItem(treeItem4)
    group.getParameter('InitialXfoMode').setValue(KinematicGroup.INITIAL_XFO_MODES.average)

    expect(group.getParameter('GlobalXfo').getValue().toJSON()).toStrictEqual({
      tr: { x: 3, y: 3, z: 0 },
      ori: { w: 1, x: 0, y: 0, z: 0 },
    })

    group.getParameter('InitialXfoMode').setValue(KinematicGroup.INITIAL_XFO_MODES.first)

    expect(group.getParameter('GlobalXfo').getValue().toJSON()).toStrictEqual({
      tr: { x: 2, y: 4, z: 0 },
      ori: { w: 1, x: 0, y: 0, z: 0 },
    })
  })

  test('Changing KinematicGroup Xfo to move its items.', () => {
    const group = new KinematicGroup('Foo')
    const treeItem1 = new TreeItem('treeItem1')
    const treeItem2 = new TreeItem('treeItem2')
    const treeItem3 = new TreeItem('treeItem3')
    const treeItem4 = new TreeItem('treeItem4')
    treeItem1.getParameter('LocalXfo').setValue(new Xfo(new Vec3(2, 4, 0)))
    treeItem2.getParameter('LocalXfo').setValue(new Xfo(new Vec3(4, 4, 0)))
    treeItem3.getParameter('LocalXfo').setValue(new Xfo(new Vec3(2, 2, 0)))
    treeItem4.getParameter('LocalXfo').setValue(new Xfo(new Vec3(4, 2, 0)))

    group.addItem(treeItem1)
    group.addItem(treeItem2)
    group.addItem(treeItem3)
    group.addItem(treeItem4)

    // Move and rotate the group by _modifying_ its global Xfo.
    const xfo = group.getParameter('GlobalXfo').getValue()
    xfo.tr.x += 10
    xfo.tr.y += 10
    xfo.ori.setFromAxisAndAngle(new Vec3(0, 0, 1), Math.PI * 0.5)
    group.getParameter('GlobalXfo').setValue(xfo)

    // Now the group is rotated around its new center.
    expect(treeItem1.getParameter('GlobalXfo').getValue().tr.toJSON()).toStrictEqual({ x: 12, y: 12, z: 0 })
    expect(treeItem2.getParameter('GlobalXfo').getValue().tr.toJSON()).toStrictEqual({ x: 12, y: 14, z: 0 })
    expect(treeItem3.getParameter('GlobalXfo').getValue().tr.toJSON()).toStrictEqual({ x: 14, y: 12, z: 0 })
    expect(treeItem4.getParameter('GlobalXfo').getValue().tr.toJSON()).toStrictEqual({ x: 14, y: 14, z: 0 })

    group.getParameter('InitialXfoMode').setValue(KinematicGroup.INITIAL_XFO_MODES.first)
    const xfo2 = group.getParameter('GlobalXfo').getValue()
    xfo2.tr.x += 10
    xfo2.tr.y += 10
    xfo2.ori.setFromAxisAndAngle(new Vec3(0, 0, 1), Math.PI * 0.5)
    group.getParameter('GlobalXfo').setValue(xfo2)
    // Now the group is rotated around its new center.
    expect(treeItem1.getParameter('GlobalXfo').getValue().tr.approxEqual({ x: 2, y: 24, z: 0 }, 0.001)).toBe(true)
    expect(treeItem2.getParameter('GlobalXfo').getValue().tr.approxEqual({ x: 12, y: 16, z: 0 }, 0.001)).toBe(true)
    expect(treeItem3.getParameter('GlobalXfo').getValue().tr.approxEqual({ x: 14, y: 14, z: 0 }, 0.001)).toBe(true)
    expect(treeItem4.getParameter('GlobalXfo').getValue().tr.approxEqual({ x: 14, y: 16, z: 0 }, 0.001)).toBe(true)
  })

  test('Saving to JSON (serialization).', () => {
    const group = new KinematicGroup('Foo')

    const treeItem1 = new TreeItem('treeItem1')
    const treeItem2 = new TreeItem('treeItem2')
    treeItem1.addChild(treeItem2)
    treeItem1.addChild(group)

    group.addItem(treeItem2)

    const expOutput = `{"params":{"Visible":{"value":true},"LocalXfo":{"value":{"tr":{"x":0,"y":0,"z":0},"ori":{"x":0,"y":0,"z":0,"w":1}}},"GlobalXfo":{"value":{"tr":{"x":0,"y":0,"z":0},"ori":{"x":0,"y":0,"z":0,"w":1}}},"BoundingBox":{"value":{"p0":{"x":null,"y":null,"z":null},"p1":{"x":null,"y":null,"z":null}}},"Items":{},"InitialXfoMode":{"value":3,"range\":[0,4],"step":1},"GroupTransform":{"value":{"tr":{"x":0,"y":0,"z":0},"ori":{"x":0,"y":0,"z":0,"w":1}}}},"name":"Foo","type":"KinematicGroup","treeItems":[["treeItem1","treeItem2"]]}`

    const outputJSON = group.toJSON()
    expect(JSON.stringify(outputJSON)).toEqual(expOutput)
  })

  it('loads from JSON (serialization).', () => {
    const group = new KinematicGroup('Foo')

    const treeItem1 = new TreeItem('treeItem1')
    const treeItem2 = new TreeItem('treeItem2')
    treeItem1.addChild(treeItem2)
    treeItem1.addChild(group)

    const inputStr = `{"params":{"Visible":{"value":true},"LocalXfo":{"value":{"tr":{"x":0,"y":0,"z":0},"ori":{"x":0,"y":0,"z":0,"w":1}}},"GlobalXfo":{"value":{"tr":{"x":0,"y":0,"z":0},"ori":{"x":0,"y":0,"z":0,"w":1}}},"BoundingBox":{"value":{"p0":{"x":null,"y":null,"z":null},"p1":{"x":null,"y":null,"z":null}}},"Items":{},"InitialXfoMode":{"value":3,"range\":[0,4],"step":1},"GroupTransform":{"value":{"tr":{"x":0,"y":0,"z":0},"ori":{"x":0,"y":0,"z":0,"w":1}}}},"name":"Foo","type":"KinematicGroup","treeItems":[["treeItem1","treeItem2"]]}`
    const input = JSON.parse(inputStr)

    group.fromJSON(input, {
      numTreeItems: 0,
      resolvePath: (path, cb) => {
        cb(treeItem1.resolvePath(path))
      },
    })
    expect(JSON.stringify(group.toJSON())).toEqual(inputStr)
  })

  it('fails when loading from JSON (serialization) with no context.', () => {
    const group = new KinematicGroup('Foo')

    const treeItem1 = new TreeItem('treeItem1')
    const treeItem2 = new TreeItem('treeItem2')
    treeItem1.addChild(treeItem2)
    treeItem1.addChild(group)

    const input = {
      params: { LocalXfo: { value: { tr: { x: 0, y: 0, z: 0 }, ori: { x: 0, y: 0, z: 0, w: 1 } } } },
      name: 'Foo',
      type: 'KinematicGroup',
      treeItems: [['treeItem1', 'treeItem2']],
    }

    expect(() => {
      group.fromJSON(input)
    }).toThrow()
  })
})
