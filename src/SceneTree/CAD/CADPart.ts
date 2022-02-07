import { Registry } from '../../Registry'
import { CloneContext } from '../CloneContext'
import { TreeItem } from '../TreeItem'

/**
 * Represents a Part within a CAD assembly.
 *
 * @extends TreeItem
 */
class CADPart extends TreeItem {
  /**
   * Creates an instance of CADPart setting up the initial configuration for Material and Color parameters.
   *
   * @param name - The name value.
   */
  constructor(name?: string) {
    super(name)
  }

  /**
   * The clone method constructs a new CADPart, copies its values
   * from this item and returns it.
   *
   * @param context - The CloneContext param.
   * @return - The cloned instance.
   */
  clone(context?: CloneContext): CADPart {
    const cloned = new CADPart()
    cloned.copyFrom(this, context)
    return cloned
  }
}

Registry.register('CADPart', CADPart)

export { CADPart }
