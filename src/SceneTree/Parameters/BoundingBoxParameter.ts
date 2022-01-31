/* eslint-disable @typescript-eslint/no-unused-vars */
import { Parameter } from './Parameter'
import { Box3 } from '../../Math/Box3'
import { BinReader } from '../BinReader'
import { TreeItem } from '../TreeItem'
import { Box3Parameter } from './Box3Parameter'
import { AssetLoadContext } from '../AssetLoadContext'

/**
 * Represents a specific type of parameter, that only stores `Box3` values.
 *
 * i.e.:
 * ```javascript
 * const boundingBox = new BoundingBoxParameter('MyBBox', new TreeItem())
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(boundingBox)
 * ```
 * @extends Parameter
 */
class BoundingBoxParameter extends Box3Parameter {
  // protected dirty: boolean, value, name
  protected treeItem: TreeItem
  protected dirty: boolean = true
  /**
   * Creates an instance of BoundingBoxParameter.
   * @param name - Name of the parameter
   * @param treeItem - `TreeItem` that contains `Box3` representing the Bounding Box
   */
  constructor(name: string = '', treeItem: TreeItem) {
    super(name)
    this.treeItem = treeItem
  }

  /**
   * Makes parameter value be dirty, so when `getValue` is called,
   * an evaluation is then executed to re-calculate the BoundingBox
   *
   * @memberof BoundingBoxParameter
   */
  setDirty(index: number): boolean {
    if (!this.dirty) {
      this.dirty = true
      this.emit('valueChanged')
    }
    return true
  }

  /**
   * Returns bounding box value
   *
   * @return - The return value.
   */
  getValue(): Box3 {
    if (this.dirty) {
      this.__value = this.treeItem._cleanBoundingBox()
      this.dirty = false
    }
    return this.__value
  }

  clone(): BoundingBoxParameter {
    const bBox3Clone = new BoundingBoxParameter(this.name, this.treeItem)
    bBox3Clone.value = this.__value?.clone()

    return bBox3Clone
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The loadValue is used to change the value of a parameter, without triggering a
   * valueChanges, or setting the USER_EDITED state.
   *
   * @param value - The context value.
   */
  loadValue(value: Box3): void {
    this.__value = value.clone()
  }
}

export { BoundingBoxParameter }
