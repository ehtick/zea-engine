import { ParameterOwner } from '../ParameterOwner'
import { BaseItem } from '../BaseItem'
import { EventEmitter } from '../../Utilities/EventEmitter'
import { OperatorOutput } from '../Operators/OperatorOutput'
import { ICloneable } from '../../Utilities/ICloneable'
import { ISerializable } from '../../Utilities/ISerializable'
import { OperatorOutputMode } from './OperatorOutputMode'
import { BinReader } from '../BinReader'
import { AssetLoadContext, OperatorInput } from '..'
import { CloneContext } from '../CloneContext'
/**
 * Represents a reactive type of attribute that can be owned by a `ParameterOwner` class.
 *
 * **Events**
 * * **nameChanged:** Triggered when the name of the parameter changes.
 * * **valueChanged:** Triggered when the value of the parameter changes.
 */
abstract class Parameter<T> extends EventEmitter implements ICloneable, ISerializable {
  protected dirty: boolean = false
  protected boundInputs: OperatorInput<any>[] = []
  protected boundOutputs: OperatorOutput<any>[] = []
  protected cleaning: boolean = false
  protected dirtyOpIndex: number = 0
  protected firstOP_WRITE: number = 0
  private __name: string
  protected __value: T
  protected dataType: string
  protected ownerItem?: ParameterOwner

  /**
   * When initializing a new parameter, the passed in value could be anything.
   * If it is a new type of value, just ensure you register it in the `Registry`.
   *
   * How to use it:
   *
   * ```javascript
   *  // Creating a parameter object
   *  const param = new Parameter('Title', 'Awesome Parameter Value', 'String')
   *
   *   // Capturing events
   *  param.on('valueChanged', (...params) => console.log('Value changed!'))
   *
   *  // Changing parameter's value will cause `valueChanged` event to trigger.
   *  param.setValue('A New Awesome Parameter Value')
   *  // As result the console log code will execute: Value Changed!
   * ```
   *
   * @param name - The name of the parameter.
   * @param value - The value of the parameter.
   * @param dataType - The data type of the parameter.
   */
  constructor(name: string = '', value: T, dataType: string) {
    super()
    this.__name = name
    this.__value = value
    this.dataType = dataType
  }

  /**
   * Returns the name of the parameter.
   *
   * @return - Returns the parameter name.
   */
  public get name() {
    return this.__name
  }

  /**
   * Sets the name of the parameter(Updates path).
   *
   * @emits `nameChanged` with `newName` and `oldName` data.
   * @param name - The parameter name.
   */
  public set name(value: string) {
    this.setName(value)
  }

  /**
   * Returns the current path of the parameter in the tree as an array of names.
   *
   * @return - Returns an array.
   */
  public get path() {
    return this.getPath()
  }

  /**
   * Returns specified name of the parameter.
   *
   * @return - Returns the name.
   */
  getName(): string {
    return this.__name
  }

  /**
   * Sets the name of the current parameter.
   *
   * @param name - The base parameter name.
   * @return - The instance itself.
   */
  setName(name: string): void {
    if (name === this.__name) {
      return
    }

    const prevName = this.__name
    this.__name = name
    this.emit('nameChanged', { newName: this.__name, prevName })
  }

  /**
   * Returns the owner item of the current parameter.
   *
   * @return - The return value.
   */
  getOwner(): ParameterOwner {
    return this.ownerItem!
  }

  /**
   * Sets the owner item of the current parameter.
   *
   * @param ownerItem - The ownerItem value.
   */
  setOwner(ownerItem: ParameterOwner): void {
    this.ownerItem = ownerItem
  }

  /**
   * Returns the parameter's path as an array of strings.
   * Includes owner's path in case it is owned by a `ParameterOwner`.
   *
   * @return - The return value.
   */
  getPath(): string[] {
    if (this.ownerItem && this.ownerItem instanceof BaseItem) {
      return [...this.ownerItem.getPath(), this.__name]
    } else {
      return [this.__name]
    }
  }

  /**
   * Returns parameter's data type.
   *
   * @return - The return value.
   */
  getDataType(): string {
    return this.dataType
  }

  // ////////////////////////////////////////////////
  // Operator bindings

  /**
   * When an Operator is reading from a parameter, it must be dirtied when the parameter value
   * changes. The Parameter maintains a list of bound inputs and will propagate dirty to
   * them explicitly.
   *
   * @param operatorInput - The output that we are unbinding from the Parameter
   * @param index - The index(optional) that the output is being bound at.
   * @return - The index of the bound output.
   */
  bindOperatorInput(operatorInput: OperatorInput<any>) {
    this.boundInputs.push(operatorInput)
  }

  /**
   * When an operator is being removed from reading from a Parameter, the Input is removed
   * This means the operator will no longer receive updates when the operator changes.
   *
   * @param operatorInput - The output that we are unbinding from the Parameter
   * @return - The return value.
   */
  unbindOperatorInput(operatorInput: OperatorInput<any>) {
    const index = this.boundInputs.indexOf(operatorInput)
    this.boundInputs.splice(index, 1)
  }

  /**
   * When an Operator writes to a parameter, it binds its outputs to the parameter at a given
   * index. Then when the operator is dirtied by one of its inputs, it explicitly dirties
   * the output parameters.
   *
   * @param operatorOutput - The output that we are unbinding from the Parameter
   * @param index - The index(optional) that the output is being bound at.
   * @return - The index of the bound output.
   */
  bindOperatorOutput(operatorOutput: OperatorOutput<any>, index = -1): number {
    if (index == -1) index = this.boundOutputs.length
    this.boundOutputs.splice(index, 0, operatorOutput)
    // Update the remaining binding indices
    for (let i = index; i < this.boundOutputs.length; i++) {
      this.boundOutputs[i].setParamBindIndex(i)
    }
    // If we weren't already dirty, make sure to emit a 'valueChanged' anyway.
    this.__findFirstOP_WRITE()
    // This ensures that the operator stack is considered 'clean'
    // and then we call set dirty to force it to become dirty from the insertion point down.
    // Without this line, the operator is considered already 'dirty', and so won't propagate.
    this.dirtyOpIndex = this.boundOutputs.length
    this.setDirty(index)
    return index
  }

  /**
   * When an operator is unbinding from a parameter, it removes its self from the list maintained
   * by the parameter.
   *
   * @param operatorOutput - The output that we are unbinding from the Parameter
   * @return - The return value.
   */
  unbindOperatorOutput(operatorOutput: OperatorOutput<any>): number {
    const index = operatorOutput.getParamBindIndex()
    this.boundOutputs.splice(index, 1)
    // Update the remaining binding indices
    for (let i = index; i < this.boundOutputs.length; i++) {
      this.boundOutputs[i].setParamBindIndex(i)
    }
    this.__findFirstOP_WRITE()
    this.dirtyOpIndex = this.boundOutputs.length
    this.setDirty(Math.max(0, index - 1))
    return index
  }

  /**
   * Find the first operator in our stack which writes using an OP_WRITE connection.
   * All operators before this op can be ignored during dirty propagation.
   * @private
   */
  private __findFirstOP_WRITE(): void {
    this.firstOP_WRITE = this.boundOutputs.length
    if (this.boundOutputs.length > 0) {
      for (this.firstOP_WRITE--; this.firstOP_WRITE > 0; this.firstOP_WRITE--) {
        // Find the first OP_WRITE binding. (Note: we could cache this)
        if (this.boundOutputs[this.firstOP_WRITE].getMode() == OperatorOutputMode.OP_WRITE) break
      }
    }
  }

  /**
   * Dirties this Parameter so subsequent calls to `getValue` will cause an evaluation of its bound operators.
   *
   * @param index - Index of the operator
   * @return - `true` if the Parameter was made dirty, else `false` if it was already dirty.
   */
  setDirty(index: number): boolean {
    // Determine the first operator in the stack that must evaluate to clean the parameter.
    // Note: if a READ_WRITE op is becoming dirty, then we dirty back up to that op.
    if (index < this.dirtyOpIndex) {
      // If we must dirty all operators in the stack from the last OP_WRITE to the end.
      // Note: If a setDirty call comes from an op that precedes an OP_WRITE operator, we
      // can safely discard it, as its output will have no effect on the value of this parameter.
      let newDirtyIndex = this.firstOP_WRITE
      if (newDirtyIndex <= index) {
        this.dirtyOpIndex = newDirtyIndex
        for (newDirtyIndex++; newDirtyIndex < this.boundOutputs.length; newDirtyIndex++) {
          // Dirty all the other bound ops from the OP_WRITE to the top of the stack.
          if (newDirtyIndex != index) {
            // This will cause the other outputs of the operator to become dirty.
            this.boundOutputs[newDirtyIndex].getOperator().setDirty()
          }
        }
        for (let i = 0; i < this.boundInputs.length; i++) {
          this.boundInputs[i].setDirty()
        }
        this.emit('valueChanged')
        return true
      }
    }

    return false
  }

  /**
   * Returns true if this parameter is currently dirty and will evaluate its bound
   * operators if its value is requested by a call to getValue.
   *
   * @return - Returns a boolean.
   */
  isDirty(): boolean {
    return this.dirtyOpIndex < this.boundOutputs.length
  }

  /**
   * Returns the index of the first 'dirty' binding in the stack. This will be the index of the
   * first operator that will evaluate when the parameter needs to be cleaned.
   *
   * @return - The index of the dirty binding in the binding stack.
   */
  getDirtyBindingIndex(): number {
    return this.dirtyOpIndex
  }

  /**
   * The setCleanFromOp method.
   * @param value - The computed value to be stored in the Parameter.
   * @param index - The index of the bound OperatorOutput.
   */
  setCleanFromOp(value: T, index: number): void {
    if (index != this.dirtyOpIndex) {
      if (index < this.dirtyOpIndex) {
        // This can happen when an operator in the following case.

        // ParamA [OpC, OpB, OpA]
        // ParamB [OpC, OpA]
        // When OpB dirties ParamA, and is evaluated, ParamB is considered clean because OpA was never dirtied

        // We see this message when parameters are evaluated as soon as a change is detected instead of
        // in batches. Now that all rendering code is pulling data only during the render cycle, we ara
        // not seeing it anymore. However, maybe with a UI open, it will start emitting this warning.
        // Note: this would be caused, if a Parameter is already cleaned by an Operator, and yet the Operator
        // is re-evaluating. I am not sure how this can occur.
        // const op = operatorOutput.getOperator()
        // console.log(
        //   `Operator:: ${
        //     op.constructor.name
        //   } with name: ${op.getName()} is being cleaned immediately, instead of lazily.`
        // )
        console.log(`Parameter is cleaned when it was already clean to that point in the stack:`, this.getPath())
      } else if (this.boundOutputs[index].getMode() != OperatorOutputMode.OP_WRITE) {
        // A parameter can become dirty (so __dirtyOpIndex == 0), and then another operator bound on top.
        // if the next op is a WRITE op, then we can fast forward the dirty index.
        const thisClassName = this.getClassName()
        const op = this.boundOutputs[index].getOperator()
        const opClassName = op.getClassName()
        throw new Error(
          `Parameter: ${thisClassName} with name: ${this.getName()} is not cleaning all outputs during evaluation of op: ${opClassName} with name: ${op.getName()}`
        )
      }
    } else {
      // console.log(`cleaned:`, this.getPath())
    }

    this.__value = value

    // As each operator writes its value, the dirty value is incremented
    this.dirtyOpIndex = index + 1
  }

  /**
   * During operator evaluation, operators can use this method to retrieve the existing
   * value of one of their outputs.
   * @param index - The index of the bound OperatorOutput to evaluate up to.
   * @return - The return value.
   */
  getValueFromOp(index: number): T | undefined {
    // Note: during evaluation of an Operator that writes to multiple outputs,
    // it can write to an output with an IO setting, which means it retrieves
    // the previous value while calculating the next.
    if (this.dirtyOpIndex < index) {
      this._clean(index)
    }
    return this.__value
  }

  /**
   * Cleans the parameter up tp the index of the specified index of the bound OperatorOutput
   *
   * @param index - The index of the bound OperatorOutput to evaluate up to.
   */
  _clean(index: number): void {
    if (this.cleaning) {
      throw new Error(`Cycle detected when cleaning: ${this.getPath()}. Operators need to be rebound to fix errors`)
    }
    this.cleaning = true

    while (this.dirtyOpIndex < index) {
      const tmp = this.dirtyOpIndex
      const operatorOutput = this.boundOutputs[this.dirtyOpIndex]
      // The op can get the current value and modify it in place
      // and set the output to clean.
      operatorOutput.getOperator().evaluate()

      if (tmp == this.dirtyOpIndex) {
        // During initial configuration of an operator, cleaning outputs might be disabled.
        const op = this.boundOutputs[this.dirtyOpIndex].getOperator()
        const opClassName = op.getClassName()
        console.warn(
          `Operator: ${opClassName} with name: ${op.getName()} is not cleaning its outputs during evaluation`
        )
        this.dirtyOpIndex++
      }
    }

    this.cleaning = false
  }

  /**
   * Returns parameter's value.
   * @return - The return value.
   */
  getValue(): T {
    if (this.dirtyOpIndex < this.boundOutputs.length) {
      this._clean(this.boundOutputs.length)
    }
    return this.__value
  }

  /**
   * Sets value of the parameter.
   *
   * @param value - The value param.
   */
  setValue(value: T): void {
    if (value == undefined) {
      // eslint-disable-next-line no-throw-literal
      throw 'undefined was passed into the set value for param:' + this.getName()
    }

    if (this.boundOutputs.length > 0) {
      for (let i = this.boundOutputs.length - 1; i >= 0; i--) {
        const operatorOutput = this.boundOutputs[i]
        value = operatorOutput.backPropagateValue(value)
        if (operatorOutput.getMode() == 0 /* OP_WRITE */) return
      }
    }

    if (typeof value !== 'object') {
      // Note: equality tests on anything but simple values is going to be super expensive.
      if (this.__value == value) return
    }
    this.__value = value

    // Note: only users call 'setValue'. Operators call 'setCleanFromOp'
    for (let i = 0; i < this.boundInputs.length; i++) {
      this.boundInputs[i].paramValueChanged()
    }

    this.emit('valueChanged')
  }

  get value(): T {
    return this.getValue()
  }

  set value(value: T) {
    this.setValue(value)
  }
  // ////////////////////////////////////////
  // Persistence

  /**
   * The loadValue is used to change the value of a parameter, without triggering a
   * valueChanges, or setting the USER_EDITED state.
   *
   * @param value - The context value.
   */
  loadValue(value: T): void {
    this.__value = value
  }

  abstract toJSON(context?: Record<string, any>): Record<string, any>

  abstract fromJSON(j: Record<string, any>, context?: Record<string, any>): void

  abstract clone(): Parameter<T>

  copyFrom(src: Parameter<T>, context?: CloneContext): void {
    this.loadValue(src.__value)
  }

  /**
   * The readBinary method.
   *
   * @param reader - The reader value.
   * @param context - The context value.
   */
  readBinary(reader: BinReader, context?: AssetLoadContext) {
    console.warn(`TODO: Parameter: ${this.constructor.name} with name: ${this.__name} does not implement readBinary`)
  }

  /**
   * The readBinary method.
   *
   * @param reader - The reader value.
   * @param context - The context value.
   */
  destroy(): void {
    console.warn('nothing destroyed. This method was not overwritten in subclass')
  }
}

export { Parameter }
