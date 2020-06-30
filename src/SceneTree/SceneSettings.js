import { Color } from '../Math/index'
import { BaseItem } from './BaseItem.js'
import { BooleanParameter, NumberParameter, ColorParameter, ImageParameter } from './Parameters/index'

/**
 * `BaseItem` type of class
 *
 * **Events**
 * * **BackgroundColor(`ColorParameter`):** Changes background color of the scene
 * * **EnvMap(`ImageParameter`):**
 * * **Display(`BooleanParameter`):**
 * * **EnvMapLOD(`NumberParameter`):**
 * @extends BaseItem
 */
class SceneSettings extends BaseItem {
  /**
   * Create scene settings.
   * @param {string} name - The name of the scene settings item.
   */
  constructor(name) {
    super(name)
    this.addParameter(new ColorParameter('BackgroundColor', new Color('#808080')))
    this.addParameter(new ImageParameter('EnvMap'))
    this.addParameter(new BooleanParameter('Display EnvMap', false))
    this.addParameter(new NumberParameter('EnvMapLOD', 0))
  }
}

export { SceneSettings }
