/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Parameter } from '../Parameters'
import { Operator } from './Operator'
import { EventEmitter } from '../../Utilities/EventEmitter'

/** Class representing an operator input.
 * @extends EventEmitter
 */
abstract class OperatorInput<T> extends EventEmitter {
  name: string
  _op?: Operator
  param?: Parameter<T>
  detached: boolean = false

  /**
   * Create an operator input.
   * @param name - The name value.
   */
  constructor(name: string) {
    super()
    this.name = name
  }

  /**
   * The getName method.
   * @return - The return value.
   */
  getName(): string {
    return this.name
  }

  /**
   * Sets operator that owns this input. Called by the operator when adding inputs
   * @param op - The operator object.
   */
  setOperator(op: Operator): void {
    this._op = op
  }

  /**
   * Returns operator that owns this input.
   * @return - The operator object.
   */
  getOperator(): Operator {
    return this._op!
  }

  /**
   * Returns true if this input is connected to a parameter.
   * @return - The return value.
   */
  isConnected(): boolean {
    return this.param != null
  }

  /**
   * The getParam method.
   * @return - The return value.
   */
  getParam(): Parameter<T> | undefined {
    return this.param
  }

  /**
   * @private
   * The handler function for when the input paramter changes.
   * @param event - The event object.
   */
  paramValueChanged(): void {
    if (this._op) this._op.setDirty()
  }

  /**
   * Assigns the Paramter to be used to provide the input value.
   * @param param - The param value.
   */
  setParam(param?: Parameter<T>): void {
    if (this.param) {
      this.param.unbindOperatorInput(this)
    }
    this.param = param
    if (this.param) {
      this.param.bindOperatorInput(this)
    }
    // When an input param is assigned, the op should
    // propagate dirty to its outputs.
    if (this._op) this._op.setDirty()
    this.emit('paramSet', { param: this.param })
  }

  /**
   * The getValue method.
   * @return - The return value.
   */
  getValue(): T {
    if (this.param) return this.param.value
    throw new Error('Unable to getValue')
  }

  /**
   * The setValue method.
   * @param value - The value param.
   */
  setValue(value: T): void {
    if (this.param) {
      this.param.setValue(value)
    }
  }

  /**
   * Propagates from the upstream parameter to the connected operator.
   */
  setDirty(): void {
    if (this._op) {
      this._op.setDirty()
    }
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param context - The context value.
   * @return - Returns the json object.
   */
  toJSON(context?: Record<string, any>): { name: string; paramPath: string[] } {
    const absPath = this.param ? this.param.getPath() : []
    const paramPath = <string[]>(context && context.makeRelative ? context.makeRelative(absPath) : absPath)
    return {
      name: this.name,
      paramPath: paramPath,
    }
  }

  /**
   * The fromJSON method decodes a json object for this type.
   * @param j - The json object this item must decode.
   * @param context - The context value.
   */
  fromJSON(j: Record<string, any>, context?: Record<string, any>): void {
    if (j.paramPath) {
      // Note: the tree should have fully loaded by the time we are loading operators
      // even new items and groups should have been created. Operators and state machines
      // are loaded last.
      context?.resolvePath(
        j.paramPath,
        (param: Parameter<any>) => {
          this.setParam(param)
        },
        () => {
          console.warn("OperatorInput: '" + this.getName() + "'. Unable to connect to:" + j.paramPath)
        }
      )
    }
  }

  /**
   * The detach method is called when an operator is being removed from the scene tree.
   * It removes all connections to parameters in the scene.
   */
  detach(): void {
    // This function is called when we want to suspend an operator
    // from functioning because it is deleted and on the undo stack.
    // Once operators have persistent connections,
    // we will simply uninstall the output from the parameter.
    if (this.param) {
      this.param.unbindOperatorInput(this)
    }
  }

  /**
   * The reattach method can be called when re-instating an operator in the scene.
   */
  reattach(): void {
    this.detached = false
    if (this.param) {
      this.param.bindOperatorInput(this)
    }
  }
}

import { Vec2, Vec3, Vec4, Color, Quat, Xfo, Mat3, Mat4 } from '../../Math'
class BooleanOperatorInput extends OperatorInput<boolean> {}
class NumberOperatorInput extends OperatorInput<number> {}
class Vec2OperatorInput extends OperatorInput<Vec2> {}
class Vec3OperatorInput extends OperatorInput<Vec3> {}
class Vec4OperatorInput extends OperatorInput<Vec4> {}
class ColorOperatorInput extends OperatorInput<Color> {}
class QuatOperatorInput extends OperatorInput<Quat> {}
class XfoOperatorInput extends OperatorInput<Xfo> {}
class Mat3OperatorInput extends OperatorInput<Mat3> {}
class Mat4OperatorInput extends OperatorInput<Mat4> {}

export {
  OperatorInput,
  BooleanOperatorInput,
  NumberOperatorInput,
  Vec2OperatorInput,
  Vec3OperatorInput,
  Vec4OperatorInput,
  ColorOperatorInput,
  QuatOperatorInput,
  XfoOperatorInput,
  Mat3OperatorInput,
  Mat4OperatorInput,
}
