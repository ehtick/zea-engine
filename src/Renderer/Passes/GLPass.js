import { Signal } from '../../Utilities';

import { ParameterOwner } from '../../SceneTree/ParameterOwner.js';
import { BooleanParameter } from '../../SceneTree/Parameters';

const PassType = {
  OPAQUE: 0,
  TRANSPARENT: 1,
  OVERLAY: 2,
};

/** This class abstracts the rendering of a collection of geometries to screen.
 * @extends ParameterOwner
 */
class GLPass extends ParameterOwner {
  /**
   * Create a GL pass.
   */
  constructor() {
    super();
    this.updated = new Signal();
    this.enabled = true;
    this.__passIndex = 0;

    const enabledParam = this.addParameter(
      new BooleanParameter('Enabled', true)
    );
    enabledParam.valueChanged.connect(
      mode => (this.enabled = enabledParam.getValue())
    );
  }

  /**
   * The __parameterValueChanged method.
   * @param {any} param - The param param.
   * @param {any} mode - The mode param.
   * @private
   */
  __parameterValueChanged(param, mode) {
    super.__parameterValueChanged(param, mode);
    if (this.__renderer) this.__renderer.requestRedraw();
  }

  /**
   * The init method.
   * @param {any} renderer - The renderer param.
   * @param {any} passIndex - The passIndex param.
   */
  init(renderer, passIndex) {
    if (passIndex == undefined)
      throw new Error('Missing constructor argument.'); // Type checking. Seomthing that TypeScript will do for us.

    this.__gl = renderer.gl;
    this.__renderer = renderer;
    this.__passIndex = passIndex;
  }

  /**
   * The setPassIndex method.
   * @param {any} passIndex - The passIndex param.
   */
  setPassIndex(passIndex) {
    this.__passIndex = passIndex;
  }

  /**
   * The startPresenting method.
   */
  startPresenting() {}

  /**
   * The stopPresenting method.
   */
  stopPresenting() {}

  // ///////////////////////////////////
  // Rendering

  /**
   * The draw method.
   * @param {any} renderstate - The renderstate param.
   */
  draw(renderstate) {}

  /**
   * The drawHighlightedGeoms method.
   * @param {any} renderstate - The renderstate param.
   */
  drawHighlightedGeoms(renderstate) {}

  /**
   * The drawGeomData method.
   * @param {any} renderstate - The renderstate param.
   */
  drawGeomData(renderstate) {}

  /**
   * The getGeomItemAndDist method.
   * @param {any} geomData - The geomData param.
   */
  getGeomItemAndDist(geomData) {}
}

export { GLPass, PassType };
// export default GLPass;
