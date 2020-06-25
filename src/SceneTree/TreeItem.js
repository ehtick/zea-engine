import { Color, Xfo, Box3 } from '../Math/index'
import { sgFactory } from './SGFactory.js'
import { ParamFlags, ValueSetMode, Parameter, BooleanParameter, XfoParameter } from './Parameters/index'
import { ItemFlags, BaseItem } from './BaseItem.js'

// Defines used to explicity specify types for WebGL.
const SaveFlags = {
  SAVE_FLAG_SKIP_CHILDREN: 1 << 0,
}

const LoadFlags = {
  // When loading the values of a bin tree, as opposed
  // to loading a full json defined tree.
  LOAD_FLAG_LOADING_BIN_TREE_VALUES: 1 << 4,
}

const CloneFlags = {
  CLONE_FLAG_INSTANCED_TREE: 1 << 0,
}

let selectionOutlineColor = new Color('#03E3AC')
selectionOutlineColor.a = 0.1
let branchSelectionOutlineColor = selectionOutlineColor.lerp(new Color('white'), 0.5)
branchSelectionOutlineColor.a = 0.1

/**
 * Class representing an Item in the scene tree with hierarchy capabilities(has children).
 * <br>
 * <br>
 * **Parameters:**
 * * **Visible(`BooleanParameter`):** Shows/Hides the item.
 * * **LocalXfo(`XfoParameter`):**
 * * **GlobalXfo(`XfoParameter`):**
 * * **BoundingBox(`BoundingBox`):**
 *
 * **Events**
 * * **globalXfoChanged**
 * * **visibilityChanged**
 * * **highlightChanged**
 * * **childAdded**
 * * **childRemoved**
 * * **mouseDown**
 * * **mouseUp**
 * * **mouseMove**
 * * **mouseEnter**
 * @extends {BaseItem}
 */
class TreeItem extends BaseItem {
  /**
   * Creates a tree item with the specified name.
   *
   * @param {string} name - The name of the tree item.
   */
  constructor(name) {
    super(name)

    this.__visibleCounter = 1 // Visible by Default.
    this.__visible = true
    this.__highlightMapping = {}
    this.__highlights = []

    this.__childItems = []
    this.__childItemsSignalIds = []
    this.__childItemsMapping = {}

    // /////////////////////////////////////
    // Add parameters.

    this.__visibleParam = this.addParameter(new BooleanParameter('Visible', true))
    this.__localXfoParam = this.addParameter(new XfoParameter('LocalXfo', new Xfo()))
    this.__globalXfoParam = this.addParameter(new XfoParameter('GlobalXfo', new Xfo()))
    this.__boundingBoxParam = this.addParameter(new Parameter('BoundingBox', new Box3()))

    // Bind handlers
    this._cleanGlobalXfo = this._cleanGlobalXfo.bind(this)
    this._setGlobalXfoDirty = this._setGlobalXfoDirty.bind(this)
    this._setBoundingBoxDirty = this._setBoundingBoxDirty.bind(this)
    this._cleanBoundingBox = this._cleanBoundingBox.bind(this)

    this.__localXfoParam.on('valueChanged', this._setGlobalXfoDirty)

    // Note: if the user changes the global xfo, we compute the
    // local xfo when it is needed (generally when GlobalXfo is pulled)
    // In the future, we will move this into the operators and ops
    // will support 'inversion' where the param asks the op to
    // proccess an input value.
    const cleanLocalXfo = () => {
      const globalXfo = this.__globalXfoParam.getValue()
      if (this.__ownerItem !== undefined) return this.__ownerItem.getGlobalXfo().inverse().multiply(globalXfo)
      else return globalXfo
    }
    this.__globalXfoParam.on('valueChanged', (event) => {
      // Dirtiness propagates from Local to Global, but not vice versa.
      // We need to move to using operators to invert values.
      // This system of having ops connected in all directions
      // is super difficult to debug.
      if (event.mode != ValueSetMode.OPERATOR_DIRTIED) {
        this.__localXfoParam.setDirty(cleanLocalXfo)
      }
      this._setBoundingBoxDirty()
      this.emit('globalXfoChanged', event)
    })

    this.__visibleParam.on('valueChanged', () => {
      this.__visibleCounter += this.__visibleParam.getValue() ? 1 : -1
      this.__updateVisiblity()
    })

    // Note: one day we will remove the concept of 'selection' from the engine
    // and keep it only in UX. to Select an item, we will add it to the selectino
    // in the selection manager. Then the selection group will apply a highlight.
    this.on('selectedChanged', () => {
      if (this.__selected) {
        this.addHighlight('selected', selectionOutlineColor, true)
      } else {
        this.removeHighlight('selected', true)
      }
    })
  }

  /**
   * Returns an ENUM object with save flags options.
   *
   * @return {object} - The return value.
   */
  static get SaveFlags() {
    return SaveFlags
  }

  /**
   * Returns an ENUM object with load flags options.
   * @return {object} - The return value.
   */
  static get LoadFlags() {
    return LoadFlags
  }

  /**
   * Returns an ENUM object with clone flags options.
   *
   * @return {object} - The return value.
   */
  static get CloneFlags() {
    return CloneFlags
  }

  /**
   * Returns the selection outline color.
   *
   * @return {Color} - Returns a color.
   */
  static getSelectionOutlineColor() {
    return selectionOutlineColor
  }

  /**
   * Sets the selection outline color.
   *
   * @param {Color} color - The color value.
   */
  static setSelectionOutlineColor(color) {
    selectionOutlineColor = color
  }

  /**
   * Returns the branch selection outline color.
   *
   * @return {Color} - Returns a color.
   */
  static getBranchSelectionOutlineColor() {
    return branchSelectionOutlineColor
  }

  /**
   * Sets the branch selection outline color.
   *
   * @param {Color} color - The color value.
   */
  static setBranchSelectionOutlineColor(color) {
    branchSelectionOutlineColor = color
  }

  // ////////////////////////////////////////
  // Flags

  /**
   * The _childFlagsChanged method.
   * @param {number} flags - The flags value.
   * @private
   */
  _childFlagsChanged(flags) {
    if ((flags & ParamFlags.USER_EDITED) != 0) this.setFlag(ItemFlags.USER_EDITED)
  }

  /**
   * Sets item flag by using an 'OR-assignation' operation then if current item is a child of another item,
   * flags for the owner item is changed too.
   *
   * @param {number} flag - The flag value.
   */
  setFlag(flag) {
    super.setFlag(flag)
    if (this.__ownerItem) this.__ownerItem._childFlagsChanged(flag)
  }

  // ////////////////////////////////////////
  // Parent Item

  /**
   * Sets the owner(another TreeItem) of the current TreeItem.
   * @param {TreeItem} parentItem - The parent item.
   */
  setOwner(parentItem) {
    if (this.__ownerItem) {
      this.__ownerItem.removeListener('globalXfoChanged', this._setGlobalXfoDirty)

      // The effect of the invisible owner is removed.
      if (!this.__ownerItem.getVisible()) this.__visibleCounter++
      const index = this.__ownerItem.getChildIndex(this)
      if (index >= 0) this.__ownerItem.__unbindChild(index, this)
    }

    super.setOwner(parentItem)

    this._setGlobalXfoDirty()
    if (this.__ownerItem) {
      this.setSelectable(this.__ownerItem.getSelectable(), true)

      // The effect of the invisible owner is added.
      if (!this.__ownerItem.getVisible()) this.__visibleCounter--

      this.__ownerItem.addListener('globalXfoChanged', this._setGlobalXfoDirty)
    }

    this.__updateVisiblity()
  }

  /**
   * The __updatePath method.
   * @private
   */
  __updatePath() {
    super.__updatePath()
    for (const childItem of this.__childItems) {
      if (childItem) childItem.__updatePath()
    }
  }

  /**
   * Returns the parent of current TreeItem.
   *
   * @return {TreeItem|undefined} - Returns the parent item.
   */
  getParentItem() {
    return this.getOwner()
  }

  /**
   * Sets the parent of current TreeItem.
   *
   * @param {TreeItem} parentItem - The parent item.
   */
  setParentItem(parentItem) {
    this.setOwner(parentItem)
  }

  // ////////////////////////////////////////
  // Global Matrix

  /**
   * Returns the value of local Xfo transform parameter.
   *
   * @return {Xfo} - Returns the local Xfo.
   */
  getLocalXfo() {
    return this.__localXfoParam.getValue()
  }

  /**
   * Sets the local Xfo transform parameter.
   *
   * @param {Xfo} xfo - The local xfo transform.
   * @param {number} mode - The mode value. **See:** `ValueSetMode` enum in `Parameter` class.
   */
  setLocalXfo(xfo, mode) {
    this.__localXfoParam.setValue(xfo, mode)
  }

  /**
   * Returns the global Xfo transform.
   *
   * @param {number} mode - The mode value.
   * @return {Xfo} - Returns the global Xfo.
   */
  getGlobalXfo(mode) {
    return this.__globalXfoParam.getValue(mode)
  }

  /**
   * Sets the global Xfo transform.
   * @param {Xfo} xfo - The global xfo transform.
   * @param {number} mode - The mode value. **See:** `ValueSetMode` enum in `Parameter` class.
   */
  setGlobalXfo(xfo, mode) {
    const owner = this.getOwner()
    if (owner) {
      const parentXfo = owner.getGlobalXfo()
      const localXfo = parentXfo.inverse().multiply(xfo)
      this.__localXfoParam.setValue(localXfo, mode)
    } else {
      this.__globalXfoParam.setValue(xfo, mode)
    }
  }

  /**
   * The _cleanGlobalXfo method.
   * @param {any} prevValue - The prevValue value.
   * @return {any} - The return value.
   * @private
   */
  _cleanGlobalXfo(prevValue) {
    const parentItem = this.getParentItem()
    const localXfo = this.__localXfoParam.getValue()
    if (parentItem !== undefined) {
      const parentGlobal = parentItem.getGlobalXfo()
      return parentGlobal.multiply(localXfo)
    } else return localXfo
  }

  /**
   * The _setGlobalXfoDirty method.
   * @private
   */
  _setGlobalXfoDirty() {
    this.__globalXfoParam.setDirty(this._cleanGlobalXfo)
  }

  // ////////////////////////////////////////
  // Visibility

  /**
   * Returns visible parameter value for current TreeItem.
   *
   * @return {boolean} - The visible param value.
   */
  getVisible() {
    // Should never be more than 1, but can be less than 0.
    return this.__visibleCounter > 0
  }

  /**
   * Sets visible parameter value.
   *
   * @param {number} val - The val param.
   */
  setVisible(val) {
    this.__visibleParam.setValue(val)
  }

  /**
   * Updates current TreeItem visible state and propagates its value to children elements.
   *
   * @param {number} val - The val param.
   */
  propagateVisiblity(val) {
    this.__visibleCounter += val
    this.__updateVisiblity()
  }

  /**
   * The __updateVisiblity method.
   * @return {boolean} - Returns a boolean.
   * @private
   */
  __updateVisiblity() {
    const visible = this.__visibleCounter > 0
    if (visible != this.__visible) {
      this.__visible = visible
      for (const childItem of this.__childItems) {
        if (childItem instanceof TreeItem) childItem.propagateVisiblity(this.__visible ? 1 : -1)
      }
      this.emit('visibilityChanged', { visible })
      return true
    }
    return false
  }

  // ////////////////////////////////////////
  // Highlights

  /**
   * Adds a hightlight to the tree item.
   *
   * @param {string} name - The name of the tree item.
   * @param {Color} color - The color of the highlight.
   * @param {boolean} propagateToChildren - A boolean indicating whether to propagate to children.
   */
  addHighlight(name, color, propagateToChildren = false) {
    // If the hilight was already in the list,
    // remove it and put it at the top.
    if (name in this.__highlightMapping) {
      const id = this.__highlights.indexOf(name)
      this.__highlights.splice(id, 1)
    }
    this.__highlights.push(name)
    this.__highlightMapping[name] = color
    this.emit('highlightChanged', { name, color })

    if (propagateToChildren) {
      this.__childItems.forEach((childItem) => {
        if (childItem instanceof TreeItem) childItem.addHighlight(name, color, propagateToChildren)
      })
    }
  }

  /**
   * Removes a hightlight to the tree item.
   *
   * @param {string} name - The name of the tree item.
   * @param {boolean} propagateToChildren - A boolean indicating whether to propagate to children.
   */
  removeHighlight(name, propagateToChildren = false) {
    if (name in this.__highlightMapping) {
      const id = this.__highlights.indexOf(name)
      this.__highlights.splice(id, 1)
      delete this.__highlightMapping[name]
      this.emit('highlightChanged', {})
    }
    if (propagateToChildren) {
      this.__childItems.forEach((childItem) => {
        if (childItem instanceof TreeItem) childItem.removeHighlight(name, propagateToChildren)
      })
    }
  }

  /**
   * Returns the color of the current hilghlight.
   *
   * @return {Color} - The color value.
   */
  getHighlight() {
    if (this.__highlights.length > 0) return this.__highlightMapping[this.__highlights[this.__highlights.length - 1]]
  }

  /**
   * Returns `true` if this items has a hilghlight color assigned.
   *
   * @return {boolean} - `True` if this item is hilghlighted.
   */
  isHighlighted() {
    return this.__highlights.length > 0
  }

  // ////////////////////////////////////////
  // Bounding Box

  /**
   * Getter for a bounding box.
   * @private
   */
  get boundingBox() {
    console.warn("getter is deprectated. Please use 'getBoundingBox'")
    return this.getBoundingBox()
  }

  /**
   * Returns bounding box parameter value.
   * @deprecated
   * @private
   * @return {Box3} - The return value.
   */
  getBoundingBox() {
    console.warn("getter is deprectated. Please use 'getParameter('BoundingBox').getValue()'")
    return this.__boundingBoxParam.getValue()
  }

  /**
   * The _cleanBoundingBox method.
   * @param {Box3} bbox - The bounding box value.
   * @return {Box3} - The return value.
   * @private
   */
  _cleanBoundingBox(bbox) {
    bbox.reset()
    this.__childItems.forEach((childItem) => {
      if (childItem instanceof TreeItem)
        if (childItem.getVisible() && !childItem.testFlag(ItemFlags.IGNORE_BBOX)) {
          // console.log(" - ", childItem.constructor.name, childItem.getName(), childItem.getGlobalXfo().sc.x, childItem.getBoundingBox().toString())
          bbox.addBox3(childItem.getBoundingBox())
        }
    })
    // console.log(this.getName(), bbox.toString())
    return bbox
  }

  /**
   * The _childBBoxChanged method.
   * @private
   */
  _childBBoxChanged() {
    this._setBoundingBoxDirty()
  }

  /**
   * The _setBoundingBoxDirty method.
   * @private
   */
  _setBoundingBoxDirty() {
    if (this.__boundingBoxParam) {
      // Will cause boundingChanged to emit
      this.__boundingBoxParam.setDirty(this._cleanBoundingBox)
    }
  }

  // ////////////////////////////////////////
  // Children

  /**
   * Returns children list, but children are not required to have hierarchy structure(`TreeItem`).
   * Meaning that it could be another kind of item than `TreeItem`.
   * <br>
   * i.e. **BaseImage**
   *
   * @return {array} - List of `BaseItem` owned by current TreeItem.
   */
  getChildren() {
    return this.__childItems
  }

  /**
   * Returns the number of child elements current `TreeItem` has.
   *
   * @deprecated since version 0.0.80
   * @return {number} - The return value.
   */
  numChildren() {
    console.warn('Deprecated method. Please use getNumChildren')
    return this.__childItems.length
  }

  /**
   * Returns the number of child elements current `TreeItem` has.
   *
   * @return {number} - The return value.
   */
  getNumChildren() {
    return this.__childItems.length
  }

  /**
   * Verifies if there's a child with the specified name.
   * If there's one, modifiers are applied to the name and returned.
   *
   * @param {string} name - The name value.
   * @return {string} - Returns a unique name.
   */
  generateUniqueName(name) {
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
      if (names.indexOf(uniqueName) == -1) break
      index++
    }
    return uniqueName
  }

  /**
   * The __updateMapping method.
   * @param {any} start - The start value.
   * @private
   */
  __updateMapping(start) {
    // If a child has been added or removed from the
    // tree item, we need to update the acceleration structure.
    for (let i = start; i < this.__childItems.length; i++) {
      this.__childItemsMapping[this.__childItems[i].getName()] = i
    }
  }

  /**
   * Inserts a child. It accepts all kind of `BaseItem`, not only `TreeItem`.
   *
   * @param {BaseItem} childItem - The child BaseItem to insert.
   * @param {number} index - The index to add the child item.
   * @param {boolean} maintainXfo - Boolean that determines if the Xfo value is maintained.
   * @param {boolean} fixCollisions - Modify the name of the item to avoid name collisions.
   * If false, an exception wll be thrown instead if a name collision occurs.
   * @return {number} - The index of the child item in this items children array.
   */
  insertChild(childItem, index, maintainXfo = false, fixCollisions = true) {
    if (childItem.getName() in this.__childItemsMapping) {
      if (fixCollisions) {
        childItem.setName(this.generateUniqueName(childItem.getName()))
      } else {
        throw new Error("Item '" + childItem.getName() + "' is already a child of :" + this.getPath())
      }
    }
    if (!(childItem instanceof BaseItem)) {
      throw new Error('Object is is not a tree item :' + childItem.constructor.name)
    }

    const signalIds = {}
    signalIds.nameChangedId = childItem.addListener('nameChanged', (event) => {
      // Update the acceleration structure.
      const index = this.__childItemsMapping[event.oldName]
      delete this.__childItemsMapping[event.oldName]
      this.__childItemsMapping[event.newName] = index
    })

    let newLocalXfo
    if (childItem instanceof TreeItem) {
      if (maintainXfo) {
        newLocalXfo = this.getGlobalXfo().inverse().multiply(childItem.getGlobalXfo())
      }
      signalIds.bboxChangedId = childItem.addListener('boundingChanged', () => {
        this._setBoundingBoxDirty()
      })
      signalIds.visChangedId = childItem.addListener('visibilityChanged', this._setBoundingBoxDirty)
    }

    this.__childItems.splice(index, 0, childItem)
    this.__childItemsSignalIds.splice(index, 0, signalIds)
    this.__childItemsMapping[childItem.getName()] = index
    this.__updateMapping(index)

    childItem.setOwner(this)

    if (childItem instanceof TreeItem) {
      if (maintainXfo) childItem.setLocalXfo(newLocalXfo)
      this._setBoundingBoxDirty()
    }

    if (childItem.testFlag(ItemFlags.USER_EDITED)) this.setFlag(ItemFlags.USER_EDITED)

    this.emit('childAdded', { childItem, index })

    return childItem
  }

  /**
   * Adds a child. It accepts all kind of `BaseItem`, not only `TreeItem`.
   *
   * @param {BaseItem} childItem - The child BaseItem to add.
   * @param {boolean} maintainXfo - Boolean that determines if
   * the Global Xfo value is maintained. If true, when moving
   * items in the hierarchy from one parent to another, the local Xfo
   * of the item will be modified to maintaine and the Global Xfo.
   * Note: this option defaults to false because we expect that is the
   * behavior users would expect when manipulating the tree in code.
   * To be safe and unambiguous, always try to specify this value.
   * @param {boolean} fixCollisions - Modify the name of the item to avoid
   * name collisions with other chidrent of the same parent.
   * If false, an exception wll be thrown instead if a name collision occurs.
   * @return {number} - The index of the child item in this items children array.
   */
  addChild(childItem, maintainXfo = true, fixCollisions = true) {
    const index = this.__childItems.length
    this.insertChild(childItem, index, maintainXfo, fixCollisions)
    return index
  }

  /**
   * Returns child element in the specified index.
   *
   * @param {number} index - The index to remove the child TreeItem.
   * @return {BaseItem|undefined} - Return the child TreeItem.
   */
  getChild(index) {
    return this.__childItems[index]
  }

  /**
   * Returns child element with the specified name.
   *
   * @param {string} name - The name value.
   * @return {BaseItem|null} - Return the child BaseItem.
   */
  getChildByName(name) {
    const index = this.__childItemsMapping[name]
    if (index != undefined) {
      return this.__childItems[index]
    }
    return null
  }

  /**
   * Returns children names as an array of strings.
   *
   * @return {array} - An array of names for each child.
   */
  getChildNames() {
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
   * @param {number} index - The index value.
   * @param {TreeItem} childItem - item to unbind.
   * @private
   */
  __unbindChild(index, childItem) {
    const signalIds = this.__childItemsSignalIds[index]
    childItem.removeListenerById('nameChanged', signalIds.nameChangedId)

    if (childItem instanceof TreeItem) {
      childItem.removeListenerById('boundingChanged', signalIds.bboxChangedId)
      childItem.removeListenerById('visibilityChanged', signalIds.visChangedId)
    }

    this.__childItems.splice(index, 1)
    this.__childItemsSignalIds.splice(index, 1)
    delete this.__childItemsMapping[childItem.getName()]
    this.__updateMapping(index)

    if (childItem instanceof TreeItem) {
      this._setBoundingBoxDirty()
    }

    this.emit('childRemoved', { childItem, index })
  }

  /**
   * Removes a child BaseItem by specifying its index.
   *
   * @param {number} index - The index value.
   */
  removeChild(index) {
    const childItem = this.__childItems[index]
    if (childItem) {
      this.__unbindChild(index, childItem)
      childItem.setOwner(undefined)
    }
  }

  /**
   * Removes a child BaseItem by specifying its name.
   *
   * @param {string} name - The name param.
   * @return {BaseItem} - Return the child TreeItem.
   */
  removeChildByName(name) {
    const index = this.__childItemsMapping[name]
    if (index != undefined) {
      return this.removeChild(index)
    }
    return null
  }

  /**
   * Remove a child BasItem by passing in actual item object.
   *
   * @param {BaseItem} childItem - The child TreeItem to remove.
   * @deprecated
   */
  removeChildByHandle(childItem) {
    console.warn('Deprecated method. Please use removeChild')
    const index = this.__childItems.indexOf(childItem)
    if (index == -1) throw new Error('Error in removeChildByHandle. Child not found:' + childItem.getName())
    this.removeChild(index)
  }

  /**
   * Removes all children Items.
   */
  removeAllChildren() {
    let index = this.__childItems.length
    while (index--) {
      this.removeChild(index)
    }
    this._setBoundingBoxDirty()
  }

  /**
   * Returns index position of the specified item.
   *
   * @param {BaseItem} childItem - The child TreeItem value.
   * @return {number} - Child index in children array.
   */
  getChildIndex(childItem) {
    return this.__childItems.indexOf(childItem)
  }

  /**
   * Returns index position of the specified item.
   *
   * @deprecated
   * @param {object} childItem - The child TreeItem value.
   * @return {number} - The return value.
   */
  indexOfChild(childItem) {
    console.warn('Deprecated method. Please use getChildIndex')
    return this.getChildIndex(childItem)
  }

  // ////////////////////////////////////////
  // Path Traversial
  // Note: Path resolution starts at the root of the
  // tree the path was generated from (so index=1, because we don't resolve root).
  // Note: When a path is made relative to an item in its tree, the path
  // starts with the child elements.

  /**
   * The resolvePath method traverses the subtree from this item down
   * matching each name in the path with a child until it reaches the
   * end of the path.
   *
   * @param {array} path - The path value.
   * @param {number} index - The index value.
   * @return {BaseItem|Parameter} - The return value.
   */
  resolvePath(path, index = 0) {
    if (typeof path == 'string') path = path.split('/')

    if (index == 0) {
      if (path[0] == '.' || path[0] == this.__name) index++
      else if (path[0] == '..') {
        return this.__ownerItem.resolvePath(path, index + 1)
      } else {
        // Note: new paths should be generated starting with the name of the root object.
        // Re-enable this to debug path issues.
        // console.warn("Paths should start with the name of the root item or '.'")
      }
    }

    if (index == path.length) {
      return this
    }

    // if (path[index] == '>' && index == path.length - 2) {
    //   if (this.hasComponent(path[index + 1])) {
    //     const component = this.getComponent(path[index + 1])
    //     return component.resolvePath(path, index + 2)
    //   }
    // }

    const childName = path[index]
    const childItem = this.getChildByName(childName)
    if (childItem == undefined) {
      // Maybe the name is a component name.
      // if (this.hasComponent(path[index])) {
      //   const component = this.getComponent(path[index])
      //   if (index == path.length) {
      //     return component
      //   } else {
      //     return component.resolvePath(path, index + 1)
      //   }
      // }

      // Maybe the name is a parameter name.
      const param = this.getParameter(path[index])
      if (param) {
        return param
      }

      // Note: consuming code should generate errors if necssary.
      // In some cases, this _should_ return null and errors messages ares imply distracting.
      // report("Unable to resolve path '"+"/".join(path)+"' after:"+this.getName());
      // console.warn("Unable to resolve path :" + (path) + " after:" + this.getName() + "\nNo child, component or property called :" + path[index]);
      return null
    }
    return childItem.resolvePath(path, index + 1)
  }

  /**
   * Traverse the tree structure from this point down
   * and fire the callback for each visited item.
   * Note: Depth only used by selection sets for now.
   *
   * @param {function} callback - The callback value.
   * @param {boolean} includeThis - Fire the callback for this item.
   */
  traverse(callback, includeThis = true) {
    const __c = (treeItem, depth) => {
      const children = treeItem.getChildren()
      for (const childItem of children) {
        if (childItem) __t(childItem, depth + 1)
      }
    }
    const __t = (treeItem, depth) => {
      if (callback(treeItem, depth) == false) return false
      if (treeItem instanceof TreeItem) __c(treeItem, depth)
    }
    if (includeThis) __t(this, 1)
    else __c(this, 0)
  }

  // ///////////////////////
  // Events

  /**
   * Causes an event to occur when a user presses a mouse button over an element.
   *
   * @param {MouseEvent} event - The mouse event that occurs.
   */
  onMouseDown(event) {
    this.emit('mouseDown', event)
    if (event.propagating && this.__ownerItem) {
      this.__ownerItem.onMouseDown(event)
    }
  }

  /**
   * Causes an event to occur when a user releases a mouse button over a element.
   *
   * @param {MouseEvent} event - The mouse event that occurs.
   */
  onMouseUp(event) {
    this.emit('mouseUp', event)
    if (event.propagating && this.__ownerItem) {
      this.__ownerItem.onMouseUp(event)
    }
  }

  /**
   * Causes an event to occur when the mouse pointer is moving while over an element.
   *
   * @param {MouseEvent} event - The mouse event that occurs.
   */
  onMouseMove(event) {
    this.emit('mouseMove', event)
    if (event.propagating && this.__ownerItem) {
      this.__ownerItem.onMouseMove(event)
    }
  }

  /**
   * Causes an event to occur when the mouse pointer is moved onto an element.
   *
   * @param {MouseEvent} event - The mouse event that occurs.
   */
  onMouseEnter(event) {
    this.emit('mouseEnter', event)
    if (event.propagating && this.__ownerItem) {
      this.__ownerItem.onMouseEnter(event)
    }
  }

  /**
   * Causes an event to occur when the mouse pointer is moved out of an element.
   *
   * @param {MouseEvent} event - The mouse event that occurs.
   */
  onMouseLeave(event) {
    this.emit('mouseLeave', event)
    if (event.propagating && this.__ownerItem) {
      this.__ownerItem.onMouseLeave(event)
    }
  }

  /**
   * Causes an event to occur when the mouse wheel is rolled up or down over an element.
   *
   * @param {WheelEvent } event - The wheel event that occurs.
   */
  onWheel(event) {
    if (event.propagating && this.__ownerItem) {
      this.__ownerItem.onWheel(event)
    }
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistences.
   *
   * @param {object} context - The context value.
   * @param {number} flags - The flags value.
   * @return {object} - Returns the json object.
   */
  toJSON(context, flags) {
    if (!this.testFlag(ItemFlags.USER_EDITED)) return

    const j = super.toJSON(context, flags)

    // Some Items, such as the SliderSceneWidget do not need thier children
    // to be saved.
    if (!(flags & SaveFlags.SAVE_FLAG_SKIP_CHILDREN)) {
      const childItemsJSON = {}
      for (const childItem of this.__childItems) {
        if (childItem) {
          const childJSON = childItem.toJSON(context, flags)
          if (childJSON) childItemsJSON[childItem.getName()] = childJSON
        }
      }
      if (Object.keys(childItemsJSON).length > 0) {
        if (j) {
          j.children = childItemsJSON
        } else {
          j = {
            name: this.__name,
            children: childItemsJSON,
          }
        }
      }
    }
    return j
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param {object} j - The json object this item must decode.
   * @param {object} context - The context value.
   * @param {number} flags - The flags value.
   */
  fromJSON(j, context, flags) {
    super.fromJSON(j, context, flags)

    context.numTreeItems++

    // Note: JSON data is only used to store user edits, so
    // parameters loaded from JSON are considered user edited.
    this.setFlag(ItemFlags.USER_EDITED)

    // if ('bbox' in j){
    //     let box = new Box3();
    //     box.fromJSON(j.bbox);
    //     this.__boundingBoxParam.setValue(box);
    // }

    if (j.children != null) {
      const childrenJson = j.children
      if (Array.isArray(childrenJson)) {
        for (const childJson of childrenJson) {
          // Note: During loading of asset trees, we have an
          // existing tree generated by loading a bin data file.
          let childItem = this.getChildByName(childJson.name)
          if (childItem) {
            childItem.fromJSON(childJson, context, flags)
          } else {
            if (childJson.type) {
              childItem = sgFactory.constructClass(childJson.type)
              if (childItem) {
                // Note: we should load the json first, as it
                // may contain the unique name of the item.
                childItem.fromJSON(childJson, context, flags)
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
          let childItem = this.getChildByName(childName)
          if (childItem) {
            childItem.fromJSON(childJson, context, flags)
          } else if (childJson.type) {
            childItem = sgFactory.constructClass(childJson.type)
            if (childItem) {
              // Note: we add the child now before loading.
              // This is because certain items. (e.g. Groups)
              // Calculate thier global Xfo, and use it to modify
              // the transform of thier members.
              // Note: Groups bind to items in the scene which are
              // already added as children, and so have global Xfos.
              // We prefer to add a child afer its loaded, because sometimes
              // In the tree is asset items, who will only toggled as
              // unloaded once they are loaded(else they are considered inline assets.)
              childItem.fromJSON(childJson, context, flags)
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
    //     const component = sgFactory.constructClass(cj.type ? cj.type : cj.name)
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
   * @param {BinReader} reader - The reader value.
   * @param {object} context - The context value.
   */
  readBinary(reader, context) {
    super.readBinary(reader, context)

    context.numTreeItems++

    const itemflags = reader.loadUInt8()

    // const visibilityFlag = 1 << 1
    // this.setVisible(itemflags&visibilityFlag);

    // this.setVisible(j.visibility);
    // Note: to save space, some values are skipped if they are identity values
    const localXfoFlag = 1 << 2
    if (itemflags & localXfoFlag) {
      const xfo = new Xfo()
      xfo.tr = reader.loadFloat32Vec3()
      xfo.ori = reader.loadFloat32Quat()
      xfo.sc.set(reader.loadFloat32())
      // console.log(this.getPath() + " TreeItem:" + xfo.toString());
      this.__localXfoParam.setValue(xfo, ValueSetMode.DATA_LOAD)
    }

    const bboxFlag = 1 << 3
    if (itemflags & bboxFlag)
      this.__boundingBoxParam.setValue(
        new Box3(reader.loadFloat32Vec3(), reader.loadFloat32Vec3()),
        ValueSetMode.DATA_LOAD
      )

    const numChildren = reader.loadUInt32()
    if (numChildren > 0) {
      const toc = reader.loadUInt32Array(numChildren)
      for (let i = 0; i < numChildren; i++) {
        try {
          reader.seek(toc[i]) // Reset the pointer to the start of the item data.
          let childType = reader.loadStr()

          if (childType.startsWith('N') && childType.endsWith('E')) {
            // ///////////////////////////////////////
            // hack to work around a linux issue
            // untill we have a fix.
            const ppos = childType.indexOf('podium')
            if (ppos != -1) {
              if (parseInt(childType[ppos + 7])) childType = childType.substring(ppos + 8, childType.length - 1)
              else childType = childType.substring(ppos + 7, childType.length - 1)
            }
            const lnpos = childType.indexOf('livenurbs')
            if (lnpos != -1) {
              childType = childType.substring(childType.indexOf('CAD'), childType.length - 1)
            }
          }
          // const childName = reader.loadStr();
          const childItem = sgFactory.constructClass(childType)
          if (!childItem) {
            const childName = reader.loadStr()
            console.warn('Unable to construct child:' + childName + ' of type:' + childType)
            continue
          }
          reader.seek(toc[i]) // Reset the pointer to the start of the item data.
          childItem.readBinary(reader, context)

          // Flagging this node as a bin tree node. (A node generated from loading a binary file)
          childItem.setFlag(ItemFlags.BIN_NODE)

          this.addChild(childItem, false, false)
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
   * @param {number} flags - The flags value.
   * @return {TreeItem} - Returns a new cloned tree item.
   */
  clone(flags) {
    const cloned = new TreeItem()
    cloned.copyFrom(this, flags)
    return cloned
  }

  /**
   * Copies current TreeItem with all its children.
   *
   * @param {TreeItem} src - The tree item to copy from.
   * @param {number} flags - The flags value.
   */
  copyFrom(src, flags) {
    super.copyFrom(src, flags)

    // Share a local Xfo
    // Note: disabled for now.
    // When cloning instanced trees, the root item should
    // have a unique LocalXfoParam, as it must be re-set.
    // (The root of the tree is a cloned and attached to an Instance node that provides the transform)

    // if(flags& CloneFlags.CLONE_FLAG_INSTANCED_TREE)
    //     this.__localXfoParam = this.replaceParameter(src.getParameter('LocalXfo'));

    src.getChildren().forEach((srcChildItem) => {
      if (srcChildItem) this.addChild(srcChildItem.clone(flags), false, false)
      // if(flags& CloneFlags.CLONE_FLAG_INSTANCED_TREE) {
      //     src.addListener('childAdded', (childItem, index)=>{
      //         this.addChild(childItem.clone(flags), false);
      //     })
      // }
    })
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy() {
    this.removeAllChildren()
    super.destroy()
  }
}

sgFactory.registerClass('TreeItem', TreeItem)

export { SaveFlags, LoadFlags, CloneFlags, TreeItem }
