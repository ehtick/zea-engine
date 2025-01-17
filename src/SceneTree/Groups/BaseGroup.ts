/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ItemSetParameter, ItemEvent } from '../Parameters/index'
import { TreeItem } from '../TreeItem'
import { ZeaPointerEvent } from '../../Utilities/Events/ZeaPointerEvent'
import { CloneContext } from '../CloneContext'

/**
 * BaseGroup are a special type of `TreeItem` that allows you to gather/classify/organize/modify
 * multiple items contained within the group. Items can be added to the group directly, or using
 * its path.
 * All parameters set to the group are also set to the children; in other words, it's a faster way
 * to apply common things to multiple items.
 *
 * **Parameters**
 * * **Items(`ItemSetParameter`):** _todo_
 *
 * @extends TreeItem
 */
class BaseGroup extends TreeItem {
  /**
   * @member itemsParam - TODO
   */
  itemsParam: ItemSetParameter = new ItemSetParameter('Items', (item: TreeItem) => item instanceof TreeItem)

  // backwards compatiblity naming for older libraries.
  __itemsParam: ItemSetParameter

  protected __itemsEventHandlers: Array<Record<string, number>> = []
  searchRoot?: TreeItem

  /**
   * Creates an instance of a group.
   *
   * @param name - The name of the group.
   */
  constructor(name?: string) {
    super(name)

    this.addParameter(this.itemsParam)

    this.__itemsParam = this.itemsParam

    this.itemsParam.on('itemAdded', (event: ItemEvent) => {
      this.bindItem(event.item, event.index)
      this.emit('itemAdded', event)
    })
    this.itemsParam.on('itemRemoved', (event: ItemEvent) => {
      this.unbindItem(event.item, event.index)
      this.emit('itemRemoved', event)
    })
  }

  // ////////////////////////////////////////
  // Items

  /**
   *  sets the root item to be used as the search root.
   * @param treeItem
   */
  setSearchRoot(treeItem: TreeItem): void {
    this.searchRoot = treeItem
  }

  /**
   * The setOwner method assigns a new owner to the item. The owner of a group becomes its search root unless another search root is already set.
   *
   * @param ownerItem - The new owner item.
   */
  setOwner(ownerItem: TreeItem): void {
    if (!this.searchRoot || this.searchRoot == this.getOwner()) this.searchRoot = ownerItem
    super.setOwner(ownerItem)
  }

  /**
   * The __bindItem method.
   * @param item - The item value.
   * @param index - The index value.
   * @private
   */
  protected bindItem(item: TreeItem, index: number): void {
    if (!(item instanceof TreeItem)) return

    const listenerIDs: Record<string, number> = {}
    listenerIDs['pointerDown'] = item.on('pointerDown', (event: ZeaPointerEvent) => {
      this.onPointerDown(event)
    })
    listenerIDs['pointerUp'] = item.on('pointerUp', (event: ZeaPointerEvent) => {
      this.onPointerUp(event)
    })
    listenerIDs['pointerMove'] = item.on('pointerMove', (event: ZeaPointerEvent) => {
      this.onPointerMove(event)
    })
    listenerIDs['pointerEnter'] = item.on('pointerEnter', (event: ZeaPointerEvent) => {
      this.onPointerEnter(event)
    })
    listenerIDs['pointerLeave'] = item.on('pointerLeave', (event: ZeaPointerEvent) => {
      this.onPointerLeave(event)
    })

    this.__itemsEventHandlers.splice(index, 0, listenerIDs)
  }

  /**
   * The unbindItem method.
   * @param item - The item value.
   * @param index - The index value.
   * @private
   */
  protected unbindItem(item: TreeItem, index: number): void {
    if (!(item instanceof TreeItem)) return

    const listenerIDs = this.__itemsEventHandlers[index]
    // eslint-disable-next-line guard-for-in
    for (let key in listenerIDs) {
      const parts = key.split('.')
      if (parts.length > 1) {
        const param = item.getParameter(parts[0])
        if (param) param.off(parts[1], listenerIDs[key])
      } else {
        item.off(key, listenerIDs[key])
      }
    }
    this.__itemsEventHandlers.splice(index, 1)
  }

  /**
   * Adds an item to the group(See `Items` parameter).
   *
   * @param item - The item value.
   * @param emit - The emit value.
   */
  addItem(item: TreeItem, emit = true): void {
    if (!item) {
      console.warn('Error adding item to group. Item is null')
      return
    }
    this.itemsParam.addItem(item, emit)
  }

  /**
   * Removes an item from the group(See `Items` parameter).
   *
   * @param item - The item value.
   * @param emit - The emit value.
   */
  removeItem(item: TreeItem, emit = true): void {
    const paramItems = this.itemsParam.value
    if (!paramItems) return

    const itemIndex = Array.from(paramItems).indexOf(item)
    if (itemIndex != -1) this.itemsParam.removeItem(itemIndex, emit)
  }

  /**
   * Removes all items from the group.
   *
   * @param emit - `true` triggers `valueChanged` event.
   */
  clearItems(emit = true): void {
    // Note: Unbind reversed so that indices
    // do not get changed during the unbind.
    const paramItems = this.itemsParam.value
    if (!paramItems) return
    const items = Array.from(paramItems)
    for (let i = items.length - 1; i >= 0; i--) {
      this.unbindItem(<TreeItem>items[i], i)
    }
    this.itemsParam.clearItems(emit)
  }

  /**
   * Returns the list of `TreeItem` objects owned by the group.
   *
   * @return - The return value.
   */
  getItems(): Set<TreeItem> | undefined {
    return this.itemsParam.value
  }

  /**
   * Sets an entire new array of items to the BaseGroup replacing any previous items.
   *
   * @param items - List of `TreeItem` you want to add to the group
   */
  setItems(items: Set<TreeItem>): void {
    this.clearItems(false)
    this.itemsParam.setItems(items)
  }
}

export { BaseGroup }
