// import { TreeItem, Registry, Vec3Parameter, Color } from '@zeainc/zea-engine'

import { Vec3Parameter, TreeItem } from ".."
import { Registry, Color } from "../.."
import { CloneContext } from "../CloneContext"

Registry.register('Property_Vec3_32f', Vec3Parameter)

/**
 * Represents a view of PMI data. within a CAD assembly.
 *
 * @extends TreeItem
 */
class PMIItem extends TreeItem {
  /**
   * Creates an instance of PMIItem setting up the initial configuration for Material and Color parameters.
   *
   * @param {string} name - The name value.
   */
  constructor(name?: string) {
    super(name)
  }

  /**
   * The clone method constructs a new PMIItem, copies its values
   * from this item and returns it.
   *
   * @param {number} flags - The flags param.
   * @return {PMIItem} - The return value.
   */
  clone(context?: CloneContext) {
    const cloned = new PMIItem()
    cloned.copyFrom(this, context)
    return cloned
  }

  /**
   * Changes the current state of the selection of this item.
   * Note: the PMIItem also activates the PMI linking when selected.
   *
   * @emits `selectedChanged` with selected state
   * @param sel - Boolean indicating the new selection state.
   */
  setSelected(sel: boolean) {
    super.setSelected(sel)
    if (sel) this.activate()
    else this.deactivate()
  }

  /**
   * Activates the PMIView, adjusting visibility of the PMI items and the camera Xfo
   */
  activate() {}

  /**
   * Deactivates the PMIItem
   */
  deactivate() {}

  /**
   * Adds a highlight to the tree item.
   *
   * @param {string} name - The name of the tree item.
   * @param {Color} color - The color of the highlight.
   * @param {boolean} propagateToChildren - A boolean indicating whether to propagate to children.
   */
  addHighlight(name?: string, color?: Color, propagateToChildren = false) {
    super.addHighlight(name, color, propagateToChildren)

    const pmiContainer = (this.getOwner() as TreeItem).getOwner() // TODO: check
    const pmiOwner = (pmiContainer as TreeItem).getOwner()
    if (pmiOwner) {
      const linkedEntitiesParam = this.getParameter('LinkedEntities')
      if (linkedEntitiesParam) {
        const linkedEntityPaths = linkedEntitiesParam.getValue()
        linkedEntityPaths.forEach((pathStr: string) => {
          const path = pathStr.split(', ')
          try {
            const linkedEntity = pmiOwner.resolvePath(path) as TreeItem
            if (linkedEntity) {
              linkedEntity.addHighlight(name, color, true)
            } else {
              console.log('linkedEntity.addHighlight(name, color, true):failed')
            }
          } catch (e) {
            console.log((e as Record<string, any>).message)
          }
        })
      }
    }
  }

  /**
   * Removes a highlight to the tree item.
   *
   * @param {string} name - The name of the tree item.
   * @param {boolean} propagateToChildren - A boolean indicating whether to propagate to children.
   */
  removeHighlight(name: string, propagateToChildren = false) {
    super.removeHighlight(name, propagateToChildren)
    const pmiContainer = (this.getOwner() as TreeItem).getOwner()
    const pmiOwner = (pmiContainer as TreeItem).getOwner()
    if (pmiOwner) {
      const linkedEntitiesParam = this.getParameter('LinkedEntities')
      if (linkedEntitiesParam) {
        const linkedEntityPaths = linkedEntitiesParam.getValue()
        linkedEntityPaths.forEach((pathStr: string) => {
          const path = pathStr.split(', ')
          try {
            const linkedEntity = pmiOwner.resolvePath(path) as TreeItem
            if (linkedEntity) {
              linkedEntity.removeHighlight(name, true)
            }
          } catch (e) {}
        })
      }
    }
  }
}

Registry.register('PMIItem', PMIItem)

export { PMIItem }
