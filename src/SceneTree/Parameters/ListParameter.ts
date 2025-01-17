/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Registry } from '../../Registry'
import { Parameter } from './Parameter'

/**
 * A Parameter for storing list(array) values.
 *
 * i.e.:
 * ```javascript
 * const listParam = new ListParameter('MyList', GearParameter)
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(listParam)
 * ```
 *
 * **Events**
 * * **valueChanged:** Triggered when setting a value changes in the array(insert, add, remove).
 * * **elementAdded:** Triggered when an element is added to the array(add, insert).
 * * **elementRemoved:** Triggered when an element is removed from the array
 *
 * @extends Parameter
 */
class ListParameter extends Parameter<any[]> {
  /**
   * Create a list parameter.
   * @param name - The name of the list parameter.
   * @param dataType - The dataType value.
   */
  constructor(name: string = '', dataType?: string) {
    super(name, [], dataType)
  }

  /**
   * The filter method.
   * @param item - The item value.
   * @return - The return value.
   *
   * @private
   */
  protected filter(item: unknown): boolean {
    return true
  }

  /**
   * Returns the count of items in the array.
   *
   * @return - The return value.
   */
  getCount(): number {
    return this.__value?.length || 0
  }

  /**
   * Returns value from the array in the specified index.
   *
   * @param index - The index value.
   * @return - The return value.
   */
  getElement(index: number): unknown {
    if (!this.__value) return
    return this.__value[index]
  }

  /**
   * Sets a value in the specified array's index.
   *
   * @param index - The index value.
   * @param value - The value value.
   */
  setElement(index: number, value: unknown): void {
    if (!this.__value) this.__value = []

    this.__value[index] = value
    this.emit('valueChanged')
  }

  /**
   * Adds a new element at the end of the array pile.
   *
   * @param elem - The elem value.
   * @return - The return value.
   */
  addElement(elem: unknown): unknown {
    if ((!elem && elem != 0) || !this.filter(elem)) return
    if (!this.__value) this.__value = []

    this.__value.push(elem)
    this.emit('elementAdded', { elem, index: this.__value.length - 1 })
    this.emit('valueChanged')
    return elem
  }

  /**
   * Removes an array element from the specified index
   *
   * @param index - The index value.
   */
  removeElement(index: number): void {
    if (!this.__value) this.__value = []
    const elem = this.__value[index]
    this.__value.splice(index, 1)
    this.emit('elementRemoved', { elem, index })
    this.emit('valueChanged')
  }

  /**
   * Inserts a new element in the specified index.
   *
   * @param index - The index value.
   * @param elem - The elem value.
   */
  insertElement(index: number, elem: unknown): void {
    if (!this.__value || !this.filter(elem)) return
    this.__value.splice(index, 0, elem)
    this.emit('elementAdded', { elem, index })
    this.emit('valueChanged')
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param context - The context value.
   * @return - Returns the json object.
   */

  toJSON(context: Record<string, any>): Record<string, any> {
    const items = []
    if (this.__value) {
      for (const p of this.__value) {
        if (typeof this.dataType === 'string') items.push(p)
        else items.push(p.toJSON(context))
      }
    }
    return {
      value: items,
    }
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param j - The json object this item must decode.
   * @param context - The context value.
   */
  fromJSON(j: Record<string, any>, context?: Record<string, any>): void {
    if (j.items == undefined) {
      console.warn('Invalid Parameter JSON')
      return
    }

    this.__value = []
    for (let i = 0; i < j.items.length; i++) {
      let elem
      if (typeof this.dataType === 'string') {
        elem = j.items[i]
      } else {
        if (!this.dataType) throw 'No DataType'
        elem = Registry.constructClass(this.dataType) as any
        elem.fromJSON(j.items[i], context)
      }

      this.__value.push(elem)
      this.emit('elementAdded', { elem, index: this.__value.length - 1 })
    }
    this.emit('valueChanged', { mode: 0 })
  }

  // ////////////////////////////////////////
  // Clone and Destroy

  /**
   * The clone method constructs a new list parameter, copies its values
   * from this parameter and returns it.
   *
   * @return - Returns a new list parameter.
   */

  clone(): ListParameter {
    const clonedValue = this.__value ? this.__value.slice(0) : []
    if (!this.dataType) throw 'This parameter does not have a DataType'
    const clonedParam = new ListParameter(this.name, this.dataType)

    clonedParam.setValue(clonedValue)
    return clonedParam
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy(): void {
    if (!this.__value) return
    for (let i = 0; i < this.__value.length; i++) {
      if (this.__value[i] instanceof Parameter) this.__value[i].destroy()
      this.removeElement(i)
    }
  }
}

// Registry.register('ListParameter', ListParameter)

export { ListParameter }
