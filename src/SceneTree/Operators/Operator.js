import { sgFactory } from '../SGFactory'
import { ItemFlags, BaseItem } from '../BaseItem.js'

/**
 * Class representing an operator.
 *
 * @extends BaseItem
 */
class Operator extends BaseItem {
  /**
   * Create an operator.
   * @param {string} name - The name value.
   */
  constructor(name) {
    super(name)

    // Items which can be constructed by a user (not loaded in binary data).
    // Should always have this flag set.
    this.setFlag(ItemFlags.USER_EDITED)

    this.__inputs = []
    this.__outputs = []
    this.__evalOutput = this.__evalOutput.bind(this)
  }

  /**
   * This method sets the state of the operator to dirty which propagates
   * to the outputs of this operator, and which may then propagate to other
   * operators. When the scene is cleaned, which usually is caused by rendering
   * then the chain of operators are cleaned by triggering evaluation.
   * @private
   */
  setDirty() {
    for (const o of this.__outputs) o.setDirty(this)
  }

  /**
   * This method can be overridden in derived classes
   * to perform general updates (see GLPass or BaseItem).
   *
   * @param {object} event
   * @private
   */
  __parameterValueChanged(event) {
    super.__parameterValueChanged(event)
    this.setDirty()
  }

  /**
   * The addInput method.
   * @param {OperatorInput} output - The output value.
   * @return {array} - The return value.
   */
  addInput(input) {
    input.setOperator(this)
    this.__inputs.push(input)
    // input.on('paramSet', (event) => {
    //   const { param } = event
    //   // input.setDirty(this.__evalInput)
    //   param.bindOperator(this)
    // })
    return input
  }

  /**
   * The removeInput method.
   * @param {OperatorInput} input - The input value.
   */
  removeInput(input) {
    if (input.getParam()) input.getParam().unbindOperator(this)
    this.__inputs.splice(this.__inputs.indexOf(input), 1)
  }

  /**
   * Getter for the number of inputs in this operator.
   * @return {number} - Returns the number of inputs.
   */
  getNumInputs() {
    return this.__inputs.length
  }

  /**
   * The getInputByIndex method.
   * @param {number} index - The index value.
   * @return {object} - The return value.
   */
  getInputByIndex(index) {
    return this.__inputs[index]
  }

  /**
   * The getInput method.
   * @param {string} name - The name value.
   * @return {OperatorInput} - The return value.
   */
  getInput(name) {
    for (const o of this.__inputs) {
      if (o.getName() == name) return o
    }
  }
  
  /**
   * The addOutput method.
   * @param {OperatorOutput} output - The output value.
   * @return {array} - The return value.
   */
  addOutput(output) {
    output.setOperator(this)
    this.__outputs.push(output)
    return output
  }

  /**
   * The removeOutput method.
   * @param {OperatorOutput} output - The output value.
   */
  removeOutput(output) {
    if (output.getParam()) output.getParam().unbindOperator(this)
    this.__outputs.splice(this.__outputs.indexOf(output), 1)
  }

  /**
   * Getter for the number of outputs in this operator.
   * @return {number} - Returns the number of outputs.
   */
  getNumOutputs() {
    return this.__outputs.length
  }

  /**
   * The getOutputByIndex method.
   * @param {number} index - The index value.
   * @return {object} - The return value.
   */
  getOutputByIndex(index) {
    return this.__outputs[index]
  }

  /**
   * The getOutput method.
   * @param {string} name - The name value.
   * @return {OperatorOutput} - The return value.
   */
  getOutput(name) {
    for (const o of this.__outputs) {
      if (o.getName() == name) return o
    }
  }


  /**
   * The __evalOutput method.
   * @param {any} cleanedParam - The cleanedParam value.
   * @private
   */
  __evalOutput(cleanedParam /* value, getter */) {
    for (const o of this.__outputs) {
      o.removeCleanerFn(this.__evalOutput)
    }
    this.evaluate()

    // Why does the cleaner need to return a value?
    // Usually operators are connected to multiple outputs.
    // return getter(1);
  }

  /**
   * The evaluate method.
   */
  evaluate() {
    throw new Error('Not yet implemented')
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param {object} context - The context value.
   * @param {number} flags - The flags value.
   * @return {object} - Returns the json object.
   */
  toJSON(context, flags) {
    const j = super.toJSON(context, flags)
    j.type = sgFactory.getClassName(this)

    const oj = []
    for (const o of this.__outputs) {
      oj.push(o.toJSON(context, flags))
    }

    j.outputs = oj
    return j
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param {object} j - The json object this item must decode.
   * @param {object} context - The context value.
   * @param {number} flags - The flags value.
   */
  fromJSON(j, context, flags) {
    super.fromJSON(j, context, flags)

    if (j.outputs) {
      for (let i = 0; i < this.__outputs.length; i++) {
        const output = this.__outputs[i]
        output.fromJSON(j.outputs[i], context)
      }

      // Force an evaluation of the operator as soon as loading is done.
      context.addPLCB(() => {
        this.setDirty()
      })
    }
  }

  /**
   * The detach method.
   */
  detach() {
    this.__outputs.forEach((output) => output.detach())
  }

  /**
   * The reattach method.
   */
  reattach() {
    this.__outputs.forEach((output) => output.reattach())
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy() {
    super.destroy()
    this.__outputs = []
  }
}

export { Operator }
