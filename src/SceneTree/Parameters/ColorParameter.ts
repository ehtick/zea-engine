/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Registry } from '../../Registry'
import { Color } from '../../Math/index'
import { Parameter } from './Parameter'
import { BinReader } from '../BinReader'
import { IBinaryReader } from '../../Utilities/IBinaryReader'
import { AssetLoadContext } from '../AssetLoadContext'
/**
 * Represents a specific type of parameter, that only stores `Color` values.
 *
 * i.e.:
 * ```javascript
 * const colorParam = new ColorParameter('MyColor', new Color(0, 254, 2))
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(colorParam)
 * ```
 *
 * @extends Parameter
 */
class ColorParameter extends Parameter<Color> implements IBinaryReader {
  /**
   * Create a color parameter.
   * @param name - The name of the color parameter.
   * @param value - The value of the parameter.
   */
  constructor(name: string = '', value?: Color) {
    super(name, value ? value : new Color(), 'Color')
  }

  /**
   * Extracts `Color` values from a buffer, updating current parameter state.
   *
   * @param reader - The reader value.
   * @param context - The context value.
   */
  readBinary(reader: BinReader, context?: AssetLoadContext): void {
    const value = reader.loadRGBAFloat32Color()
    // If the value is in linear space, then we should convert it to gamma space.
    // Note: !! this should always be done in preprocessing...
    value.applyGamma(2.2)

    this.__value = value
  }

  toJSON(context?: Record<string, unknown>): Record<string, any> {
    return {
      value: this.__value?.toJSON(),
    }
  }

  fromJSON(j: Record<string, any>, context?: Record<string, unknown>): void {
    // if (j.value.type) this.__value = Registry.constructClass('Color') as Color // TODO: commented out Registry.constructClass
    this.__value?.fromJSON(j.value)
  }

  /**
   * The clone method constructs a new color parameter,
   * copies its values from this parameter and returns it.
   *
   * @return - Returns a new cloned color parameter.
   */
  clone(): ColorParameter {
    const clonedParam = new ColorParameter(this.name, this.__value?.clone())
    return clonedParam
  }
}

Registry.register('ColorParameter', ColorParameter)
Registry.register('Property_Color_32f', ColorParameter)

export { ColorParameter }
