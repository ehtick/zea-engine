import { Registry } from '../../Registry'
import { CloneContext } from '../CloneContext'
import { TreeItem } from '../TreeItem'

/**
 * Represents a Tree Item of an Assembly modeling. Brings together components to define a larger product.
 *
 * @extends TreeItem
 */
class CADAssembly extends TreeItem {
  /**
   * Create a CAD assembly.
   *
   * @param name - The name of the tree item.
   */
  constructor(name?: string) {
    super(name)
  }

  /**
   * The clone method constructs a new CADAssembly item, copies its values
   * from this item and returns it.
   *
   * @param context - The CloneContext param.
   * @return - The cloned instance.
   */
  clone(context: CloneContext): CADAssembly {
    const cloned = new CADAssembly()
    cloned.copyFrom(this, context)
    return cloned
  }
}

Registry.register('CADAssembly', CADAssembly)

export { CADAssembly }
