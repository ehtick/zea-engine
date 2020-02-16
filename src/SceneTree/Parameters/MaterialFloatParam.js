import { Signal } from '../../Utilities'
import { sgFactory } from '../SGFactory'
import { NumberParameter } from './NumberParameter.js'

import { BaseImage } from '../BaseImage.js'

/** Class representing a material float parameter.
 * @extends NumberParameter
 */
class MaterialFloatParam extends NumberParameter {
  /**
   * Create a material float parameter.
   * @param {string} name - The name of the material color parameter.
   * @param {any} value - The value of the parameter.
   * @param {any} range - The range value.
   */
  constructor(name, value, range) {
    super(name, value, range)
    this.textureConnected = new Signal()
    this.textureDisconnected = new Signal()
  }

  /**
   * The getImage method.
   * @return {any} - The return value.
   */
  getImage() {
    return this.__image
  }

  // let imageUpdated = () => {
  //     this.emitEvent('valueChanged', , { mode: Parameter.ValueSetMode.USER_SETVALUE });
  // }

  /**
   * The setImage method.
   * @param {any} value - The value value.
   * @param {number} mode - The mode value.
   */
  setImage(value, mode = 0) {
    const disconnectImage = () => {
      this.__image.removeRef(this)
      // image.removeEventListener('loaded', imageUpdated);
      // image.removeEventListener('updated', imageUpdated);
      this.emitEvent('textureDisconnected', {})
    }
    if (value) {
      if (this.__image != undefined && this.__image !== value) {
        disconnectImage()
      }
      this.__image = value
      this.__image.addRef(this)
      // image.addEventListener('loaded', imageUpdated);
      // image.addEventListener('updated', imageUpdated);
      this.emitEvent('textureConnected', {})
      this.emitEvent('valueChanged', { mode })
    } else {
      if (this.__image != undefined) {
        disconnectImage()
        this.__image = undefined
        this.emitEvent('textureDisconnected', {})
      }
    }
  }

  /**
   * The setValue method.
   * @param {any} value - The value param.
   */
  setValue(value) {
    if (value instanceof BaseImage) {
      this.setImage(value)
    } else {
      if (this.__image != undefined) {
        this.setImage(undefined)
      }
      super.setValue(value)
    }
  }

  /**
   * The readBinary method.
   * @param {object} reader - The reader value.
   * @param {object} context - The context value.
   */
  readBinary(reader, context) {
    super.readBinary(reader, context)

    const textureName = reader.loadStr()
    if (textureName != '') {
      console.log('Load Texture')
      this.setImage(context.materialLibrary.getImage(textureName))
    }
  }

  /**
   * The clone method constructs a new material float parameter,
   * copies its values from this parameter and returns it.
   * @param {number} flags - The flags value.
   * @return {MaterialFloatParam} - Returns a new cloned material float parameter.
   */
  clone(flags) {
    const clonedParam = new MaterialFloatParam(
      this.__name,
      this.__value.clone()
    )
    return clonedParam
  }
}

sgFactory.registerClass('MaterialFloatParam', MaterialFloatParam)

export { MaterialFloatParam }
