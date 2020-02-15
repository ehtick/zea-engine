import { sgFactory } from '../SGFactory'
import { Parameter } from './Parameter.js'

/** Class representing a proxy parameter. Proxies are used to connect 
 * a parameter on one object with another. An existing parameter is
 * replaced with a proxy that binds to a parameter on another object.
 * @extends Parameter
 */
class ProxyParameter extends Parameter {
  /**
   * Create a proxy parameter.
   * @param {string} name - The name of the proxy parameter.
   * @param {Parameter} sourceParameter - The source parameter to proxy.
   */
  constructor(name, sourceParameter) {
    super(name, undefined, sourceParameter.getDataType())
    this.setSourceParameter(sourceParameter)
  }

  /**
   * The setValue method.
   * @param {any} value - The value param.
   * @param {number} mode - The mode value.
   */
  setSourceParameter(sourceParameter) {
    this.sourceParameter = sourceParameter;
    this.sourceParameter.addEventListener('valueChanged', this.__proxyValueChanged.bind(this));
  }

  __proxyValueChanged(mode) {
    this.valueChanged.emit(mode)
  }


  /**
   * The getDataType method.
   * @return {any} - The return value.
   */
  getDataType() {
    return this.sourceParameter.getDataType()
  }


  /**
   * The setValue method.
   * @param {any} value - The value param.
   * @param {number} mode - The mode value.
   */
  setValue(value, mode) {
    // this.sourceParameter.setValue(value, mode)
  }

  /**
   * The getValue method.
   * @param {number} mode - The mode value.
   * @return {any} - The return value.
   */
  getValue(mode) {
    return this.sourceParameter.getValue(mode)
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistences.
   * @param {object} context - The context value.
   * @param {number} flags - The flags value.
   * @return {object} - Returns the json object.
   */
  toJSON(context, flags) {
    const j = super.toJSON(context, flags)
    if (this.sourceParameter) j.sourceParameter = this.sourceParameter.getPath();
    return j
  }

  /**
   * The fromJSON method decodes a json object for this type.
   * @param {object} j - The json object this item must decode.
   * @param {object} context - The context value.
   * @param {number} flags - The flags value.
   */
  fromJSON(j, context, flags) {
    super.fromJSON(j, context, flags)
    if (j.sourceParameter) {
      // Note: the tree should have fully loaded by the time we are loading operators
      // even new items and groups should have been created. Operators and state machines
      // are loaded last.
      context.resolvePath(
        j.sourceParameter,
        param => {
          this.setSourceParameter(param)
        },
        reason => {
          console.warn(
            "Error loading Proxy Param: '" +
              this.getName() +
              "'. Unable to connect to:" +
              j.sourceParameter
          )
        }
      )
    }
    if (j.range) this.sourceParameter = j.range
    if (j.step) this.__step = j.step
  }

  // ////////////////////////////////////////
  // Clone

  /**
   * The clone method constructs a new number parameter, copies its values
   * from this parameter and returns it.
   * @param {number} flags - The flags value.
   * @return {ProxyParameter} - Returns a new number parameter.
   */
  clone(flags, context) {
    const clonedParam = new ProxyParameter(this.__name, this.__value)
    if (this.sourceParameter) {
      this.connectToClonedSourceParam(context);
    }
    return clonedParam
  }

  /**
   * During cloning, we need to reconnect references to other items in the tree
   * These other items may/may not be being cloned also, and so we need to request
   * the context that it resolve the item.
   * @param {CloneContext} context - The context object htat can resolve references.
   */
  connectToClonedSourceParam(context) {
    context.resolveClonedItem(
      this.sourceParameter,
      param => {
        clonedParam.setSourceParameter(param)
      },
      reason => {
        console.warn(
          "Error cloning Proxy Param: '" +
            this.getName() +
            "'. Unable to connect to:" +
            j.sourceParameter
        )
      }
    )
  }
}

sgFactory.registerClass('ProxyParameter', ProxyParameter)

export { ProxyParameter }
