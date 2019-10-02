import { sgFactory } from '../SceneTree/SGFactory.js';

import { ParameterOwner } from '../SceneTree/ParameterOwner.js';

/** Class representing a state action.
 * @extends ParameterOwner
 */
class StateAction extends ParameterOwner {
  /**
   * Create a state action.
   * @param {string} name - The name value.
   */
  constructor(name) {
    super();
    this.__name = name;
    this.__childActions = [];

    this.__outputs = {};
  }

  /**
   * The addOutput method.
   * @param {any} output - The output param.
   * @return {any} - The return value.
   */
  addOutput(output) {
    this.__outputs[output.getName()] = output;
    return output;
  }

  /**
   * The getOutput method.
   * @param {string} name - The name param.
   * @return {any} - The return value.
   */
  getOutput(name) {
    return this.__outputs[name];
  }

  /**
   * The setState method.
   * @param {any} state - The state param.
   */
  setState(state) {
    this.__state = state;
    this.__childActions.forEach(childAction => {
      childAction.setState(state);
    });
  }

  /**
   * The addChild method.
   * @param {any} childAction - The childAction param.
   */
  addChild(childAction) {
    this.__childActions.push(childAction);
    childAction.setState(this.__state);
  }

  /**
   * The getChild method.
   * @param {any} index - The index param.
   * @return {any} - The return value.
   */
  getChild(index) {
    return this.__childActions[index];
  }

  /**
   * The activate method.
   */
  activate() {
    console.warn(
      'activate must be implmented by each action. this:' +
        this.constructor.name
    );
  }

  /**
   * The addChild method.
   * @param {any} childAction - The childAction param.
   */
  addChild(childAction) {
    this.__childActions.push(childAction);
    childAction.setState(this.__state);
  }

  /**
   * The deactivate method.
   */
  deactivate() {}

  /**
   * The __onDone method.
   * @private
   */
  __onDone() {
    this.__childActions.forEach(action => {
      action.activate();
    });
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method.
   * @param {object} context - The context param.
   * @param {number} flags - The flags param.
   * @return {any} - The return value.
   */
  toJSON(context, flags) {
    let j = super.toJSON(context, flags);
    if (!j)
      // If a state action has had no defaults changed, then it may not return json.
      j = {};
    j.type = sgFactory.getClassName(this);

    const childActionsj = [];
    for (const childAction of this.__childActions) {
      childActionsj.push(childAction.toJSON(context, flags));
    }
    j.childActions = childActionsj;

    const outputsj = {};
    for (const key in this.__outputs) {
      outputsj[key] = this.__outputs[key].toJSON(context, flags);
    }
    j.outputs = outputsj;

    return j;
  }

  /**
   * The fromJSON method.
   * @param {any} j - The j param.
   * @param {object} context - The context param.
   * @param {number} flags - The flags param.
   */
  fromJSON(j, context, flags) {
    super.fromJSON(j, context, flags);

    for (const childActionjson of j.childActions) {
      const childAction = sgFactory.constructClass(childActionjson.type);
      if (childAction) {
        childAction.fromJSON(childActionjson, context);
        this.addChild(childAction);
      } else {
        throw new Error('Invalid type:' + childActionjson.type);
      }
    }

    for (const key in j.outputs) {
      this.__outputs[key].fromJSON(j.outputs[key], context);
      // const outputjson = j.outputs[key];
      // const output = sgFactory.constructClass(outputjson.type);
      // if (output) {
      //     output.fromJSON(outputjson, context);
      //     this.addOutput(key, output);
      // }
      // else {
      //     throw("Invalid type:" + outputjson.type)
      // }
    }
  }

  /**
   * The destroy method.
   */
  destroy() {
    super.destroy();
    this.__outputs = [];
  }
}

export { StateAction };
