/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Registry } from '../../Registry'
import { Vec2 } from '../../Math/index'
import { Parameter } from './Parameter'
import { IBinaryReader } from '../../Utilities/IBinaryReader'
import { BinReader } from '../../SceneTree/BinReader'
import { AssetLoadContext } from '../AssetLoadContext'
/**
 * Represents a specific type of parameter, that only stores Vec2(two-dimensional coordinate) values.
 *
 * i.e.:
 * ```javascript
 * const vec2Param = new Vec2Parameter('MyVec2', new Vec2(1.2, 3.4))
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(vec2Param)
 * ```
 *
 * **Events**
 * * **rangeChanged:** Triggered when rage array changes.
 *
 * @extends Parameter
 */
class Vec2Parameter extends Parameter<Vec2> implements IBinaryReader {
  protected range?: Vec2[]

  /**
   * Create a Vec2 parameter.
   *
   * @param name - The name of the Vec2 parameter.
   * @param value - The value of the parameter.
   * @param range - The range value is an array of two `Vec2` objects.
   */
  constructor(name: string = '', value?: Vec2, range?: Vec2[]) {
    super(name, value ? value : new Vec2(), 'Vec2')
    this.range = range
  }

  /**
   * Returns the range of values in which current parameter can be.
   *
   * @return - The return value.
   */
  getRange(): Vec2[] | undefined {
    // Range should be an array of 2 vec2s. [min(x,y), max(x,y)]
    return this.range
  }

  /**
   * The __setRange method.
   * @param range - The range value.
   * @private
   */
  protected setRange(range: Vec2[]): void {
    // Should be an array [0, 20]
    this.range = range
    this.emit('rangeChanged', { range })
  }

  /**
   * Extracts a number value from a buffer, updating current parameter state.
   *
   * @param reader - The reader value.
   * @param context - The context value.
   */
  readBinary(reader: BinReader, context?: AssetLoadContext): void {
    this.__value?.readBinary(reader)
  }

  toJSON(context?: Record<string, unknown>): Record<string, unknown> {
    return {
      name: this.name,
      value: this.__value?.toJSON(),
    }
  }

  fromJSON(j: Record<string, unknown>, context?: Record<string, unknown>): void {
    const vec2 = new Vec2()
    vec2.fromJSON(j.value as any)
    this.__value = vec2

    if (j.name) this.name = j.name as string
  }

  /**
   * The clone method constructs a new Vec2 parameter, copies its values
   * from this parameter and returns it.
   *
   * @return - Returns a new Vec2 parameter.
   */
  clone(): Vec2Parameter {
    const clonedParam = new Vec2Parameter(this.name, this.__value?.clone())
    if (this.range) clonedParam.setRange(this.range)
    return clonedParam
  }
}

Registry.register('Vec2Parameter', Vec2Parameter)
Registry.register('Property_Vec2_32f', Vec2Parameter)

export { Vec2Parameter }
