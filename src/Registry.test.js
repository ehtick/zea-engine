import { Registry, TypeDefinition } from './Registry'
import { BaseItem } from './SceneTree/BaseItem'

// eslint-disable-next-line require-jsdoc
class Foo extends BaseItem {}

// eslint-disable-next-line require-jsdoc
class Bar extends Foo {}

describe('Registry', () => {
  beforeEach(() => Registry.flush())

  it('registers a new class/type', () => {
    Registry.register('Foo', Foo)
    const classResult = Registry.getClassDefinition('Foo')
    expect(classResult).toBe(Foo)
  })

  it('instantiates a new class/type', () => {
    Registry.register('Foo', Foo)
    Registry.register('Bar', Bar)
    const foo = Registry.constructClass('Foo')
    expect(foo instanceof Foo).toBe(true)

    const bar = Registry.constructClass('Bar')
    expect(bar instanceof Foo).toBe(true)
    expect(bar instanceof Bar).toBe(true)
  })

  test('throws on duplicated class/type name registration', () => {
    Registry.register('Foo', Foo)
    expect(() => Registry.register('Foo', Bar)).toThrow()
  })

  it('returns blueprint name for class/type', () => {
    Registry.register('Foo', Foo)

    const foo = new Foo()
    expect(foo.getClassName()).toEqual('Foo')
  })

  it('instantiates the class if registered', () => {
    const typeDef = new TypeDefinition(12, 4)
    Registry.registerMathType('MyMathType', typeDef)

    const result = Registry.getMathTypeDefinition('MyMathType')
    expect(result).toEqual(typeDef)
  })

  it('throws on unregistered class construction', () => {
    expect(() => Registry.constructClass('Unregistered')).toThrow()
  })
})
