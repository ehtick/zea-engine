/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Xfo, Box3, Color } from '../Math/index'
import { Registry } from '../Registry'
import { BooleanParameter } from './Parameters/BooleanParameter'
import { NumberParameter } from './Parameters/NumberParameter'
import { XfoParameter } from './Parameters/XfoParameter'

import { BaseItem } from './BaseItem'
import { CalcGlobalXfoOperator } from './Operators/CalcGlobalXfoOperator'
import { BoundingBoxParameter } from './Parameters/BoundingBoxParameter'
import { BinReader } from './BinReader'
import { Operator } from './Operators'
import { Parameter } from './Parameters'
import { ZeaPointerEvent } from '../Utilities/Events/ZeaPointerEvent'
import { ZeaWheelEvent } from '../Utilities/Events/ZeaWheelEvent'
import { BaseEvent } from '../Utilities/BaseEvent'
import { ZeaTouchEvent } from '../Utilities/Events/ZeaTouchEvent'
import { CloneContext } from './CloneContext'
import { AssetLoadContext } from './AssetLoadContext'
import { ChildAddedEvent } from '../Utilities/Events/ChildAddedEvent'
import { VisibilityChangedEvent } from '../Utilities/Events/VisibilityChangedEvent'
import { OpacityStateChangedEvent } from '../Utilities/Events/OpacityStateChangedEvent'
import { NameChangedEvent } from '../Utilities/Events'

/**
 * Class representing an Item in the scene tree with hierarchy capabilities (has children).
 * It has the capability to add and remove children.
 * **Parameters**
 * * **Visible(`BooleanParameter`):** Shows/Hides the item.
 * * **LocalXfo(`XfoParameter`):** Specifies the offset of this tree item from its parent.
 * * **GlobalXfo(`XfoParameter`):** Provides the computed world Xfo of this tree item.
 * * **BoundingBox(`BoundingBox`):** Provides the bounding box for the tree item and all of its children in the 3d scene.
 *
 * **Events**
 * * **globalXfoChanged:** Emitted when the value of GlobalXfo parameter changes.
 * * **visibilityChanged:** Emitted when the visibility on the tree item changes.
 * * **highlightChanged:** Emitted when the highlight on the tree item changes.
 * * **childAdded:** Emitted when a item is added as a child.
 * * **childRemoved:** Emitted when an item is removed from the child nodes.
 * * **pointerDown:** Emitted when a pointerDown event happens in an item.
 * * **pointerUp:** Emitted when a pointerUp event happens in an item.
 * * **pointerMove:** Emitted when a pointerMove event happens in an item.
 * * **pointerEnter:** Emitted when a pointerEnter event happens in an item.
 *
 * @extends {BaseItem}
 */
class TreeItem extends BaseItem {
  // Controls if this TreeItem or its children contribute to the bounding boxes
  // in the scene. If set to false, Camera framing will ignore this item,
  disableBoundingBox: boolean = false

  protected __childItems: TreeItem[] = []
  protected __childItemsEventHandlers: Array<Record<string, number>> = []
  protected __childItemsMapping: Record<string, number> = {}
  protected __childItemsMappingCorrupt = false

  /**
   * @member globalXfoParam - Stores the global Xfo for this tree item.
   * global xfos are calculated from the localXfo and parentXfo.
   */
  globalXfoParam: XfoParameter = new XfoParameter('GlobalXfo', new Xfo())

  /**
   * @member localXfoParam - Stores the local Xfo for this tree item.
   * local Xfos are the offset from the parent's coordinate frame.
   */
  localXfoParam: XfoParameter = new XfoParameter('LocalXfo', new Xfo())

  /**
   * @member boundingBoxParam - Stores the bounding box for this tree item
   */
  boundingBoxParam: BoundingBoxParameter = new BoundingBoxParameter('BoundingBox', this)

  /**
   * @member visibleParam - Whether this tree item is visible or not.
   * Any given tree item is also is affected by parent's visibility.
   */
  visibleParam: BooleanParameter = new BooleanParameter('Visible', true)

  /**
   * @member opacityParam - Controls, in combination with Material transparency,
   * the opacity of this item and its children.
   */
  opacityParam: NumberParameter = new NumberParameter('Opacity', 1, [0, 1])

  protected __highlightMapping: Record<string, Color> = {}
  protected __highlights: Array<string> = []

  protected __visible: boolean = true
  protected __visibleCounter: number = 1 // Visible by Default.
  protected __opacity: number = 1 // Opaque by Default.

  protected globalXfoOp: Operator

  /**
   * Creates a tree item with the specified name.
   *
   * @param name - The name of the tree item. It's the identifier of the tree item.
   * It's an identifier intended to be human readable.
   * It's included in the path that we use to access a particular item.
   * It's used to display it in the tree.
   */
  constructor(name?: string) {
    super(name)

    // /////////////////////////////////////
    // Add parameters.

    this.addParameter(this.visibleParam)
    this.addParameter(this.opacityParam)
    this.addParameter(this.localXfoParam)
    this.addParameter(this.globalXfoParam)
    this.addParameter(this.boundingBoxParam)

    this.globalXfoOp = new CalcGlobalXfoOperator(this.globalXfoParam, this.localXfoParam)
    this.globalXfoParam.on('valueChanged', (event: BaseEvent) => {
      this.setBoundingBoxDirty()
      // Note: deprecate this event.
      this.emit('globalXfoChanged', event)
    })

    this.visibleParam.on('valueChanged', () => {
      this.__visibleCounter += this.visibleParam.value ? 1 : -1
      this.updateVisibility()
    })
    this.opacityParam.on('valueChanged', () => {
      this.updateOpacity()
    })
  }

  /**
   * Sets the owner (another TreeItem) of the current TreeItem.
   * @param parentItem - The parent item.
   */
  setOwner(parentItem: TreeItem): void {
    if (this.__ownerItem) {
      const owner_TreeItem = <TreeItem>this.__ownerItem
      if (owner_TreeItem && owner_TreeItem instanceof TreeItem) {
        // The effect of the invisible owner is removed.
        if (!owner_TreeItem.isVisible()) this.__visibleCounter++
        const index = owner_TreeItem.getChildIndex(this)
        if (index >= 0) owner_TreeItem.unbindChild(index, this)
      }
    }

    super.setOwner(parentItem)

    if (this.__ownerItem) {
      const owner_TreeItem = <TreeItem>this.__ownerItem
      if (owner_TreeItem) {
        // The effect of the invisible owner is added.
        if (!owner_TreeItem.isVisible()) this.__visibleCounter--

        this.globalXfoOp.getInput('ParentGlobal').setParam(owner_TreeItem.globalXfoParam)
      }
    } else {
      this.globalXfoOp.getInput('ParentGlobal').setParam(undefined)
    }
    this.updateVisibility()
  }

  /**
   * The updatePath method.
   * @private
   */
  protected updatePath(): void {
    super.updatePath()
    for (const childItem of this.__childItems) {
      if (childItem) childItem.updatePath()
    }
  }

  /**
   * Returns the parent of current TreeItem.
   *
   * @return - Returns the parent item.
   */
  getParentItem(): TreeItem | undefined {
    return <TreeItem>this.getOwner()
  }

  /**
   * Sets the parent of current TreeItem.
   *
   * @param parentItem - The parent item.
   */
  setParentItem(parentItem: TreeItem): void {
    this.setOwner(parentItem)
  }

  get parent(): TreeItem | undefined {
    return <TreeItem>this.getOwner()
  }

  set parent(treeItem: TreeItem) {
    this.setOwner(treeItem)
  }

  // ////////////////////////////////////////
  // Visibility

  /**
   * Returns visible parameter value for current TreeItem.
   *
   * @return - The visible param value.
   */
  isVisible(): boolean {
    // Should never be more than 1, but can be less than 0.
    return this.__visibleCounter > 0
  }

  /**
   * Sets visible parameter value.
   *
   * @param val - The val param.
   */
  setVisible(visible: boolean): void {
    this.visibleParam.value = visible
  }

  /**
   * Updates current TreeItem visible state and propagates its value to children elements.
   *
   * @param val - The val param.
   */
  propagateVisibility(val: number): void {
    this.__visibleCounter += val
    this.updateVisibility()
  }

  /**
   * The updateVisibility method.
   * @return - Returns a boolean.
   */
  protected updateVisibility(): boolean {
    const visible = this.__visibleCounter > 0
    if (visible != this.__visible) {
      this.__visible = visible
      for (const childItem of this.__childItems) {
        childItem.propagateVisibility(this.__visible ? 1 : -1)
      }
      this.emit('visibilityChanged', new VisibilityChangedEvent(visible))

      // Note: we used to handle this by listening to a 'valueChanged' event on the
      // parameter.
      const owner_TreeItem = <TreeItem>this.__ownerItem
      if (owner_TreeItem && owner_TreeItem instanceof TreeItem) {
        owner_TreeItem.setBoundingBoxDirty()
      }
      return true
    }
    return false
  }

  // ////////////////////////////////////////
  // Opacity

  get opacity() {
    return this.__opacity
  }

  /**
   * Returns the current status of the opacity value.
   *
   * @return - Returns true if the opacity value is less than 1.
   */
  isOpaque() {
    return this.__opacity > 0.999
  }

  /**
   * The updateOpacity method.
   */
  protected updateOpacity() {
    const wasOpaque = this.__opacity > 0.999
    const parent = this.getParentItem()
    if (parent) this.__opacity = this.opacityParam.value * parent.__opacity
    else this.__opacity = this.opacityParam.value

    for (const childItem of this.__childItems) {
      childItem.updateOpacity()
    }
    const isOpaque = this.__opacity > 0.999
    this.emit('opacityChanged', new OpacityStateChangedEvent(isOpaque, wasOpaque != isOpaque))
  }

  // ////////////////////////////////////////
  // Highlights

  /**
   * Adds a highlight to the tree item.
   *
   * @param name - The name of the tree item.
   * @param color - The color of the highlight.
   * @param propagateToChildren - A boolean indicating whether to propagate to children.
   */
  addHighlight(name: string, color: Color, propagateToChildren = false): void {
    // If the highlight was already in the list,
    // remove it and put it at the top.
    if (name in this.__highlightMapping) {
      if (this.__highlights[this.__highlights.length - 1] != name) {
        // The highlight was already in the list, but not at the top. Move it to the top.
        const id = this.__highlights.indexOf(name)
        this.__highlights.splice(id, 1)
        this.__highlights.push(name)
        this.emit('highlightChanged', { name, color })
      } else {
        // This item is already highlighted with this highlight
        if (!this.__highlightMapping[name].isEqual(color)) {
          this.__highlightMapping[name] = color
          this.emit('highlightChanged', { name, color })
        }
      }
    } else {
      this.__highlights.push(name)
      this.__highlightMapping[name] = color
      this.emit('highlightChanged', { name, color })
    }

    if (propagateToChildren) {
      this.__childItems.forEach((childItem: TreeItem) => {
        childItem.addHighlight(name, color, propagateToChildren)
      })
    }
  }

  /**
   * Removes a highlight to the tree item.
   *
   * @param name - The name of the tree item.
   * @param propagateToChildren - A boolean indicating whether to propagate to children.
   */
  removeHighlight(name: string, propagateToChildren = false): void {
    if (name in this.__highlightMapping) {
      if (this.__highlights[this.__highlights.length - 1] == name) {
        this.__highlights.pop()
        delete this.__highlightMapping[name]

        if (this.__highlights.length > 0) {
          const nextName = this.__highlights[this.__highlights.length - 1]
          const nextColor = this.__highlightMapping[nextName]
          this.emit('highlightChanged', { name: nextName, color: nextColor })
        } else {
          // The last highlight was removed, so emit an event saying we are no longer highlighted.
          this.emit('highlightChanged')
        }
      } else {
        // The removed highlight was not the current highlight, so no change needs to be shown.
        const id = this.__highlights.indexOf(name)
        this.__highlights.splice(id, 1)
        delete this.__highlightMapping[name]
      }
      if (propagateToChildren) {
        this.__childItems.forEach((childItem: TreeItem) => {
          childItem.removeHighlight(name, propagateToChildren)
        })
      }
    }
  }

  /**
   * Returns the color of the current highlight.
   *
   * @return - The color value.
   */
  getHighlight(): Color {
    if (this.__highlights.length == 0) {
      return null
    }
    return this.__highlightMapping[this.__highlights[this.__highlights.length - 1]]
  }

  /**
   * Returns the name of the current highlight.
   *
   * @return - The color value.
   */
  getHighlightName(): string {
    if (this.__highlights.length == 0) {
      return null
    }
    return this.__highlights[this.__highlights.length - 1]
  }

  /**
   * Returns `true` if this items has a highlight color assigned.
   *
   * @return - `True` if this item is highlighted.
   */
  isHighlighted(): boolean {
    return this.__highlights.length > 0
  }

  // ////////////////////////////////////////
  // Bounding Box

  /**
   * The _cleanBoundingBox method.
   * @param bbox - The bounding box value.
   * @return - The return value.
   * @private
   */
  _cleanBoundingBox(): Box3 {
    const bbox = new Box3()
    this.__childItems.forEach((childItem: TreeItem) => {
      if (childItem.isVisible()) {
        // console.log(" - ", childItem.constructor.name, childItem.getName(), childItem.globalXfoParam.value.sc.x, childItem.getBoundingBox().toString())
        const box3 = childItem.boundingBoxParam.value
        if (box3) bbox.addBox3(box3)
      }
    })
    // console.log(this.getName(), bbox.toString())
    return bbox
  }

  /**
   * The setBoundingBoxDirty method.
   * @private
   */
  protected setBoundingBoxDirty(): void {
    if (this.boundingBoxParam) {
      // Will cause boundingChanged to emit
      this.boundingBoxParam.setDirty(-1)
    }

    // Note: we used to handle this by listening to a 'valueChanged' event on the
    // parameter.
    const owner_TreeItem = <TreeItem>this.__ownerItem
    if (owner_TreeItem && owner_TreeItem instanceof TreeItem) {
      owner_TreeItem.setBoundingBoxDirty()
    }
  }

  // ////////////////////////////////////////
  // Children

  /**
   * Returns children list, but children are not required to have hierarchy structure(`TreeItem`).
   * Meaning that it could be another kind of item than `TreeItem`.
   *
   * i.e. **BaseImage**
   *
   * @return - List of `TreeItem` owned by current TreeItem.
   */
  getChildren(): TreeItem[] {
    return this.__childItems
  }

  /**
   * Returns the number of child elements current `TreeItem` has.
   *
   * @return - The return value.
   */
  getNumChildren(): number {
    return this.__childItems.length
  }

  /**
   * Verifies if there's a child with the specified name.
   * If there's one, modifiers are applied to the name and returned.
   *
   * @param name - The name value.
   * @return - Returns a unique name.
   */
  generateUniqueName(name: string): string {
    if (!(name in this.__childItemsMapping)) return name

    let index = 1
    if (name.length > 4 && !Number.isNaN(parseInt(name.substring(name.length - 4))))
      index = parseInt(name.substr(name.length - 4))
    else if (name.length > 3 && !Number.isNaN(parseInt(name.substring(name.length - 3))))
      index = parseInt(name.substr(name.length - 3))
    else if (name.length > 2 && !Number.isNaN(parseInt(name.substring(name.length - 2))))
      index = parseInt(name.substr(name.length - 2))

    const names = []
    for (const c of this.__childItems) {
      // Sometimes we have an empty child slot.
      // We resize the child vector, and then populate it.
      if (c) {
        names.push(c.getName())
      }
    }

    let uniqueName = name
    while (true) {
      let suffix = '' + index
      while (suffix.length < 2) {
        suffix = '0' + suffix
      }

      uniqueName = name + suffix
      if (!names.includes(uniqueName)) break
      index++
    }
    return uniqueName
  }

  /**
   * Updates the internal acceleration structure that speeds up looking up children by name.
   * @param start - The start value.
   * @private
   */
  protected updateChildNameMapping(start: number): void {
    // If a child has been added or removed from the
    // tree item, we need to update the acceleration structure.
    for (let i = start; i < this.__childItems.length; i++) {
      this.__childItemsMapping[this.__childItems[i].getName()] = i
    }
  }

  /**
   * When a child's name changed, we update our acceleration structure.
   * @param event - The start value.
   * @private
   */
  protected childNameChanged(event: NameChangedEvent): void {
    // Update the acceleration structure.
    if (this.__childItemsMappingCorrupt) {
      this.updateChildNameMapping(0)
      this.__childItemsMappingCorrupt = false
    } else {
      const index = this.__childItemsMapping[event.oldName]
      if (this.__childItemsMapping[event.newName] != undefined) this.__childItemsMappingCorrupt = true

      delete this.__childItemsMapping[event.oldName]
      this.__childItemsMapping[event.newName] = index
    }
  }

  /**
   * Inserts a child. It accepts all kind of `TreeItem`, not only `TreeItem`.
   *
   * @param childItem - The child TreeItem to insert.
   * @param index - The index to add the child item.
   * @param maintainXfo - Boolean that determines if the Xfo value is maintained.
   * @param fixCollisions - Modify the name of the item to avoid name collisions.
   * If false, an exception wll be thrown instead if a name collision occurs.
   * @return - The index of the child item in this items children array.
   */
  insertChild(childItem: TreeItem, index: number, maintainXfo = false, fixCollisions = true): TreeItem {
    if (childItem.getName() in this.__childItemsMapping) {
      if (fixCollisions) {
        childItem.setName(this.generateUniqueName(childItem.getName()))
      } else {
        throw new Error("Item '" + childItem.getName() + "' is already a child of :" + this.getPath())
      }
    }
    if (!(childItem instanceof TreeItem)) {
      throw new Error('Object is is not a tree item :' + childItem) // TODO: need better output here+ childItem.constructor.name)
    }

    const listenerIDs: Record<string, number> = {}
    listenerIDs['nameChanged'] = childItem.on('nameChanged', (event: NameChangedEvent) => {
      this.childNameChanged(event)
    })

    if (maintainXfo) {
      const globalXfo = this.globalXfoParam.value
      const childGlobalXfo = childItem.globalXfoParam.value
      const newLocalXfo = globalXfo.inverse().multiply(childGlobalXfo)
      childItem.localXfoParam.value = newLocalXfo
    }
    this.setBoundingBoxDirty()

    this.__highlights.forEach((name: string) => {
      const color = this.__highlightMapping[name]
      childItem.addHighlight(name, color, true)
    })

    this.__childItems.splice(index, 0, childItem)
    this.__childItemsEventHandlers.splice(index, 0, listenerIDs)
    const name = childItem.getName()
    // If we have non-unique names, we need to regenerate this mapping.
    if (this.__childItemsMapping[name]) this.__childItemsMappingCorrupt = true
    this.__childItemsMapping[name] = index
    this.updateChildNameMapping(index)
    childItem.setOwner(this)

    this.emit('childAdded', new ChildAddedEvent(index, childItem))

    return childItem
  }

  /**
   * Adds a child.
   *
   * @param childItem - The child TreeItem to add.
   * @param maintainXfo - Boolean that determines if
   * the Global Xfo value is maintained. If true, when moving
   * items in the hierarchy from one parent to another, the local Xfo
   * of the item will be modified to maintain and the Global Xfo.
   * Note: this option defaults to false because we expect that is the
   * behavior users would expect when manipulating the tree in code.
   * To be safe and unambiguous, always try to specify this value.
   * @param fixCollisions - Modify the name of the item to avoid
   * name collisions with other children of the same parent.
   * If false, an exception wll be thrown instead if a name collision occurs.
   * @return childItem - The child TreeItem that was added.
   */
  addChild(childItem: TreeItem, maintainXfo = true, fixCollisions = true): TreeItem {
    const index = this.__childItems.length
    this.insertChild(childItem, index, maintainXfo, fixCollisions)
    return childItem
  }

  /**
   * Returns child element in the specified index.
   *
   * @param index - The index to remove the child TreeItem.
   * @return - Return the child TreeItem.
   */
  getChild(index: number): TreeItem {
    return this.__childItems[index]
  }

  /**
   * Returns child element with the specified name.
   *
   * @param name - The name value.
   * @return - Return the child TreeItem.
   */
  getChildByName(name: string): TreeItem | null {
    const index = this.__childItemsMapping[name]
    if (index != undefined) {
      return this.__childItems[index]
    }
    return null
  }

  /**
   * Returns children names as an array of strings.
   *
   * @return - An array of names for each child.
   */
  getChildNames(): string[] {
    const names = []
    for (let i = 0; i < this.__childItems.length; i++) {
      const childItem = this.__childItems[i]
      if (childItem != null) names[i] = childItem.getName()
    }
    return names
  }

  /**
   * UnBind an item from the group. This method is called
   * automatically when an item is removed from the group.
   * @param index - The index value.
   * @param childItem - item to unbind.
   * @private
   */
  protected unbindChild(index: number, childItem: TreeItem): void {
    const listenerIDs = this.__childItemsEventHandlers[index]
    // eslint-disable-next-line guard-for-in
    for (const key in listenerIDs) {
      childItem.off(key, listenerIDs[key])
    }

    this.__childItems.splice(index, 1)
    this.__childItemsEventHandlers.splice(index, 1)
    delete this.__childItemsMapping[childItem.getName()]
    this.updateChildNameMapping(index)
    this.setBoundingBoxDirty()

    this.emit('childRemoved', { childItem, index })
  }

  /**
   * Removes a child TreeItem by specifying its index.
   *
   * @param index - The index value.
   */
  removeChild(index: number): void {
    const childItem = this.__childItems[index]

    if (!childItem) {
      return
    }
    this.unbindChild(index, childItem)
    childItem.setOwner(undefined)
  }

  /**
   * Removes a child TreeItem by specifying its name.
   *
   * @param name - The name param.
   * @return - Return the child TreeItem.
   */
  removeChildByName(name: string): void {
    const index = this.__childItemsMapping[name]
    if (index != undefined) {
      return this.removeChild(index)
    }
  }

  /**
   * Removes the provided item from this TreeItem if it is one of its children.
   * An exception is thrown if the item is not a child of this tree item.
   *
   * @param childItem - The child TreeItem to remove.
   */
  removeChildByHandle(childItem: TreeItem): void {
    const index = this.__childItems.indexOf(childItem)
    if (index == -1) throw new Error('Error in removeChildByHandle. Child not found:' + childItem.getName())
    this.removeChild(index)
  }

  /**
   * Removes all children Items.
   */
  removeAllChildren(): void {
    let index = this.__childItems.length
    while (index--) {
      this.removeChild(index)
    }
    this.setBoundingBoxDirty()
  }

  /**
   * Returns index position of the specified item.
   *
   * @param childItem - The child TreeItem value.
   * @return - Child index in children array.
   */
  getChildIndex(childItem: TreeItem): number {
    return this.__childItems.indexOf(childItem)
  }

  // ////////////////////////////////////////
  // Path Traversal
  // Note: Path resolution starts at the root of the
  // tree the path was generated from (so index=1, because we don't resolve root).
  // Note: When a path is made relative to an item in its tree, the path
  // starts with the child elements.

  /**
   * The resolvePath method traverses the subtree from this item down
   * matching each name in the path with a child until it reaches the
   * end of the path.
   *
   * @param path - The path value.
   * @param index - The index value.
   * @return - The return value.
   */
  resolvePath(path: string | string[], index = 0, displayError = false): BaseItem | Parameter<any> | null {
    if (typeof path == 'string') path = path.split('/')

    if (index == 0) {
      if (path[0] == '.' || path[0] == this.__name) index++
      else if (path[0] == '..') {
        if (this.__ownerItem) {
          return this.__ownerItem.resolvePath(path, index + 1)
        } else if (displayError) {
          throw Error('this.__ownerItem is undefined')
        } else {
          console.warn('this.__ownerItem is undefined')
        }
      } else {
        // Note: new paths should be generated starting with the name of the root object.
        // Re-enable this to debug path issues.
        // console.warn("Paths should start with the name of the root item or '.'")
      }
    }

    if (index == path.length) {
      return this
    }

    const childName = path[index]
    const childItem = this.getChildByName(childName)
    if (childItem == undefined) {
      // Maybe the name is a parameter name.
      const param = this.getParameter(path[index])
      if (param) {
        return param
      }

      // Note: consuming code should catch and display errors if necessary.
      // Silent failures are extremely difficult to debug.
      throw new Error(
        `Unable to resolve path : [${path.toString()}] after: ${this.getName()} \nNo child or parameter called : "${
          path[index]
        }"`
      )
    }
    return childItem.resolvePath(path, index + 1)
  }

  /**
   * Traverse the tree structure from this point down
   * and fire the callback for each visited item.
   * Note: Depth only used by selection sets for now.
   *
   * @param callback - The callback value.
   * @param includeThis - Fire the callback for this item.
   */
  traverse(callback: (treeItem: TreeItem, depth: number) => unknown, includeThis = true): void {
    const __c = (treeItem: TreeItem, depth: number) => {
      const children = treeItem.getChildren()
      for (const childItem of children) {
        if (childItem) __t(childItem, depth + 1)
      }
    }
    const __t = (treeItem: TreeItem, depth: number) => {
      if (callback(treeItem, depth) == false) return
      __c(treeItem, depth)
    }

    if (includeThis) {
      __t(this, 1)
    } else {
      __c(this, 0)
    }
  }

  // ///////////////////////
  // Events

  /**
   * Called by the Viewport when events are received by the canvas element.
   * The event is propagated to a TreeItem if it is under the pointer at the time.
   * The ZeaPointerEvent abstracts the Mouse, touch and our custom XR events.
   * This method emits the ZeaPointerEvent with the key 'pointerDown', and
   * propagates it up to the TreeItem's owner.
   *
   * @param event - The event value
   */
  onPointerDown(event: ZeaPointerEvent): void {
    this.emit('pointerDown', event)
    const owner_TreeItem = <TreeItem>this.__ownerItem
    if (event.propagating && owner_TreeItem) {
      owner_TreeItem.onPointerDown(event)
    }
  }

  /**
   * Called by the Viewport when events are received by the canvas element.
   * The event is propagated to a TreeItem if it is under the pointer at the time.
   * The ZeaPointerEvent abstracts the Mouse, touch and our custom XR events.
   * This method emits the ZeaPointerEvent with the key 'pointerDown', and
   * propagates it up to the TreeItem's owner.
   *
   * @param event - The pointer event that was generated from the user interaction
   */
  onPointerUp(event: ZeaPointerEvent): void {
    this.emit('pointerUp', event)
    const owner_TreeItem = <TreeItem>this.__ownerItem
    if (event.propagating && owner_TreeItem) {
      owner_TreeItem.onPointerUp(event)
    }
  }

  /**
   * Called by the Viewport when events are received by the canvas element.
   * The event is propagated to a TreeItem if it is under the pointer at the time.
   * The ZeaPointerEvent abstracts the Mouse, touch and our custom XR events.
   * This method emits the ZeaPointerEvent with the key 'pointerMove', and
   * propagates it up to the TreeItem's owner.
   *
   * @param event - The pointer event that was generated from the user interaction
   */
  onPointerMove(event: ZeaPointerEvent): void {
    this.emit('pointerMove', event)
    const owner_TreeItem = <TreeItem>this.__ownerItem
    if (event.propagating && owner_TreeItem) {
      owner_TreeItem.onPointerMove(event)
    }
  }

  /**
   * Called by the Viewport when the mouse or other pointer enters the canvas element.
   * The event is propagated to a TreeItem if it is under the pointer at the time.
   * The ZeaPointerEvent abstracts the Mouse, touch and our custom XR events.
   * This method emits the ZeaPointerEvent with the key 'pointerEnter', and
   * propagates it up to the TreeItem's owner.
   *
   * @param event - The pointer event that was generated from the user interaction
   */
  onPointerEnter(event: ZeaPointerEvent): void {
    this.emit('pointerEnter', event)
    const owner_TreeItem = <TreeItem>this.__ownerItem
    if (event.propagating && owner_TreeItem) {
      owner_TreeItem.onPointerEnter(event)
    }
  }

  /**
   * Called by the Viewport when the mouse or other pointer leaves the canvas element.
   * The event is propagated to a TreeItem if it is under the pointer at the time.
   * The ZeaPointerEvent abstracts the Mouse, touch and our custom XR events.
   * This method emits the ZeaPointerEvent with the key 'pointerLeave', and
   * propagates it up to the TreeItem's owner.
   *
   * @param event - The pointer event that was generated from the user interaction
   */
  onPointerLeave(event: ZeaPointerEvent): void {
    this.emit('pointerLeave', event)
    const owner_TreeItem = <TreeItem>this.__ownerItem
    if (event.propagating && owner_TreeItem) {
      owner_TreeItem.onPointerLeave(event)
    }
  }

  /**
   * Called by the Viewport when the mouse wheel event is received by the canvas element.
   * Emits the ZeaWheelEvent with the key 'mouseWheel', and Propagates is up to the TreeItem's owner.
   *
   * @param event - The wheel event that occurs.
   */
  onWheel(event: ZeaWheelEvent): void {
    this.emit('mouseWheel', event)
    const owner_TreeItem = <TreeItem>this.__ownerItem
    if (event.propagating && owner_TreeItem) {
      owner_TreeItem.onWheel(event)
    }
  }

  /**
   * Called by the Viewport when the touch cancel event is received by the canvas element.
   * Emits the ZeaTouchEvent with the key 'touchCancel', and Propagates is up to the TreeItem's owner.
   *
   * @param event - The wheel event that occurs.
   */
  onTouchCancel(event: ZeaTouchEvent): void {
    this.emit('touchCancel', event)
    const owner_TreeItem = <TreeItem>this.__ownerItem
    if (event.propagating && owner_TreeItem) {
      owner_TreeItem.onTouchCancel(event)
    }
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method serializes this instance as a JSON.
   * It can be used for persistence, data transfer, etc.
   *
   * @param context - The context value.
   * @return - Returns the json object.
   */
  toJSON(context?: Record<string, any>): Record<string, any> {
    let j = super.toJSON(context)

    // Some Items, such as the SliderSceneWidget do not need their children
    // to be saved.
    const childItemsJSON: Record<string, any> = {}
    for (const childItem of this.__childItems) {
      if (childItem) {
        const childJSON = childItem.toJSON(context)
        if (childJSON) childItemsJSON[childItem.getName()] = childJSON
      }
    }
    if (Object.keys(childItemsJSON).length > 0) {
      if (j) {
        ;(j as any).children = childItemsJSON
      } else {
        j = {
          name: this.__name,
          children: childItemsJSON,
        }
      }
    }

    return j
  }

  /**
   * The fromJSON method takes a JSON and deserializes into an instance of this type.
   *
   * @param j - The json object this item must decode.
   * @param context - The context value.
   */
  fromJSON(j: Record<string, any>, context?: Record<string, any>, onDone?: any): void {
    super.fromJSON(j, context)

    // if ('bbox' in j){
    //     let box = new Box3();
    //     box.fromJSON(j.bbox);
    //     this.boundingBoxParam.value = box)
    // }

    if (j.children != null) {
      const childrenJson = j.children
      if (Array.isArray(childrenJson)) {
        for (const childJson of childrenJson) {
          // Note: During loading of asset trees, we have an
          // existing tree generated by loading a bin data file.
          let childItem: TreeItem | null = this.getChildByName(childJson.name)
          if (childItem) {
            childItem.fromJSON(childJson, context)
          } else {
            if (childJson.type) {
              childItem = <TreeItem>Registry.constructClass(childJson.type)
              if (childItem) {
                // Note: we should load the json first, as it
                // may contain the unique name of the item.
                childItem.fromJSON(childJson, context)
                this.addChild(childItem, false, false)
              }
            } else {
              // Note: no need to log a warning. A child might not exist
              // if the binary tree has changed, and so the JSON data
              // can no longer be mapped.
              // console.warn("Child not found:", childName, " within ", this.getNumChildren() + " of:" + this.getPath())
            }
          }
        }
      } else {
        // eslint-disable-next-line guard-for-in
        for (const childName in childrenJson) {
          const childJson = childrenJson[childName]
          // Note: During loading of asset trees, we have an
          // existing tree generated by loading a bin data file.
          let childItem: TreeItem | null = this.getChildByName(childName)
          if (childItem) {
            childItem.fromJSON(childJson, context)
          } else if (childJson.type) {
            childItem = <TreeItem>Registry.constructClass(childJson.type)
            if (childItem) {
              // Note: we add the child now before loading.
              // This is because certain items. (e.g. Groups)
              // Calculate their global Xfo, and use it to modify
              // the transform of their members.
              // Note: Groups bind to items in the scene which are
              // already added as children, and so have global Xfos.
              // We prefer to add a child after its loaded, because sometimes
              // In the tree is asset items, who will only toggled as
              // unloaded once they are loaded(else they are considered inline assets.)
              childItem.fromJSON(childJson, context)
              this.addChild(childItem, false, false)
            }
          } else {
            // Note: When saving a bin tree, we no longer save the 'type' value
            // so that those nodes can no longer be re-created by loading the JSON
            // file. We don't want the json tree
            // to re-instate ghost tree items that have been removed from the bin tree.
            //  (as has happened in testing.)
            // console.warn("Warning loading JSON. Child not found:" + childName);
          }
        }
      }
    }

    // if (j.components) {
    //   for (const cj of j.components) {
    //     const component = Registry.constructClass(cj.type ? cj.type : cj.name)
    //     if (component) {
    //       component.fromJSON(cj, context)
    //       this.addComponent(component)
    //     }
    //   }
    // }
  }

  /**
   * Sets state of current Item(Including parameters & children) using a binary reader object.
   *
   * @param reader - The reader value.
   * @param context - The context value.
   */
  readBinary(reader: BinReader, context: AssetLoadContext): void {
    super.readBinary(reader, context)

    const itemFlags = reader.loadUInt8()

    const visibilityFlag = 1 << 1
    this.setVisible((itemFlags & visibilityFlag) != 0)

    // Note: to save space, some values are skipped if they are identity values
    const localXfoFlag = 1 << 2
    const localXfoIndependentScFlag = 1 << 5
    if (itemFlags & localXfoFlag) {
      const xfo = new Xfo()
      xfo.tr = reader.loadFloat32Vec3()
      xfo.ori = reader.loadFloat32Quat()
      if (itemFlags & localXfoIndependentScFlag) {
        xfo.sc = reader.loadFloat32Vec3()
      } else {
        const sc = reader.loadFloat32()
        xfo.sc.set(sc, sc, sc)
      }
      this.localXfoParam.value = xfo
    }

    const bboxFlag = 1 << 3
    if (itemFlags & bboxFlag) {
      this.boundingBoxParam.loadValue(new Box3(reader.loadFloat32Vec3(), reader.loadFloat32Vec3()))
    }

    const numChildren = reader.loadUInt32()
    if (numChildren > 0) {
      const toc = reader.loadUInt32Array(numChildren)
      for (let i = 0; i < numChildren; i++) {
        try {
          reader.seek(toc[i]) // Reset the pointer to the start of the item data.
          let childType = reader.loadStr()

          const childItem = <TreeItem>Registry.constructClass(childType)
          if (!childItem) {
            const childName = reader.loadStr()
            console.warn('Unable to construct child:' + childName + ' of type:' + childType)
            continue
          }
          reader.seek(toc[i]) // Reset the pointer to the start of the item data.
          childItem.readBinary(reader, context)

          this.addChild(childItem, false, true)
        } catch (e) {
          console.warn('Error loading tree item: ', e)
        }
      }
    }
  }

  // ////////////////////////////////////////
  // Clone and Destroy

  /**
   * The clone method constructs a new tree item, copies its values
   * from this item and returns it.
   *
   * @param context - The context value.
   * @return - Returns a new cloned tree item.
   */
  clone(context?: CloneContext): TreeItem {
    const cloned = new TreeItem('')
    cloned.copyFrom(this, context)
    return cloned
  }

  /**
   * Copies current TreeItem with all its children.
   *
   * @param src - The tree item to copy from.
   * @param context - The context value.
   */
  copyFrom(src: TreeItem, context?: CloneContext): void {
    super.copyFrom(src, context)

    // Share a local Xfo
    // Note: disabled for now.
    // When cloning instanced trees, the root item should
    // have a unique LocalXfoParam, as it must be re-set.
    // (The root of the tree is a cloned and attached to an Instance node that provides the transform)
    src.getChildren().forEach((srcChildItem: TreeItem) => {
      if (srcChildItem) this.addChild(srcChildItem.clone(context), false, false)
    })
  }
}

Registry.register('TreeItem', TreeItem)

export { TreeItem }
