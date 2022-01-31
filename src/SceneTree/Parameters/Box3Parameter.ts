/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Registry } from '../../Registry'
import { Box3 } from '../../Math/index'
import { Parameter } from './Parameter'
import { IBinaryReader } from '../../Utilities/IBinaryReader'
import { BinReader } from '../../SceneTree/BinReader'
import { AssetLoadContext } from '../AssetLoadContext'
/**
 * @extends Parameter
 */
class Box3Parameter extends Parameter<Box3> implements IBinaryReader {
  /**
   * Create a Box3 parameter.
   * @param name - The name of the Box3 parameter.
   * @param value - The value of the parameter.
   */
  constructor(name: string = '', value?: Box3) {
    super(name, value ? value : new Box3(), 'Box3')
  }

  /**
   * Extracts a number value from a buffer, updating current parameter state.
   *
   * @param reader - The reader value.
   * @param context - The context value.
   */
  readBinary(reader: BinReader, context?: AssetLoadContext): void {
    this.__value.p0.readBinary(reader)
    this.__value.p1.readBinary(reader)
  }

  toJSON(context?: Record<string, unknown>): Record<string, unknown> {
    return {
      value: {
        p0: this.__value.p0.toJSON(),
        p1: this.__value.p1.toJSON(),
      },
    }
  }

  fromJSON(j: Record<string, unknown>, context?: Record<string, unknown>): void {
    this.__value.p0.fromJSON(j.p0 as Record<string, number>)
    this.__value.p1.fromJSON(j.p1 as Record<string, number>)
  }

  /**
   * The clone method constructs a new Box3 parameter,
   * copies its values from this parameter and returns it.
   *
   * @return - Returns a new cloned Box3 parameter.
   */
  clone(): Box3Parameter {
    const clonedParam = new Box3Parameter(this.name, this.__value?.clone())
    return clonedParam
  }
}

Registry.register('Box3Parameter', Box3Parameter)
Registry.register('Property_Box3_32f', Box3Parameter)

export { Box3Parameter }
