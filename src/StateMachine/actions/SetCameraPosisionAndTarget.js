import { sgFactory } from '../../SceneTree/SGFactory.js';

import { Camera } from '../../SceneTree/Camera.js';
import {
  NumberParameter,
  Vec3Parameter,
  TreeItemParameter,
} from '../../SceneTree/Parameters';
import { StateAction } from '../StateAction.js';

/** Class representing setting camera position and target.
 * @extends StateAction
 */
class SetCameraPosisionAndTarget extends StateAction {
  /**
   * Create a set camera position and target.
   */
  constructor() {
    super();

    this.addParameter(
      new TreeItemParameter('Camera', treeItem => treeItem instanceof Camera)
    );
    this.addParameter(new Vec3Parameter('cameraPos'));
    this.addParameter(new Vec3Parameter('cameraTarget'));
    this.addParameter(new NumberParameter('interpTime', 1.0));
    this.addParameter(new NumberParameter('updateFrequency', 30));
  }

  /**
   * The setCameraPosisionAndTarget method.
   * @param {any} pos - The pos param.
   * @param {any} target - The target param.
   */
  setCameraPosisionAndTarget(pos, target) {
    this.getParameter('cameraPos').setValue(pos);
    this.getParameter('cameraTarget').setValue(target);
  }

  /**
   * The activate method.
   */
  activate() {
    const camera = this.getParameter('Camera').getValue();
    if (!camera) {
      console.warn(
        'Camera not assigned to SetCameraPosisionAndTarget state action'
      );
      return;
    }

    const posEnd = this.getParameter('cameraPos').getValue();
    const targetEnd = this.getParameter('cameraTarget').getValue();
    const interpTime = this.getParameter('interpTime').getValue();
    if (interpTime > 0.0) {
      const posStart = camera.getGlobalXfo().tr;
      const targetStart = camera.getTargetPostion();
      const distStart = posStart.subtract(targetStart).length();

      const updateFrequency = this.getParameter('updateFrequency').getValue();

      const distEnd = posEnd.subtract(targetEnd).length();
      let settingCameraDirection = true;
      let smooth_t_prev = 0;
      let step = 0;
      const steps = Math.round(interpTime * updateFrequency);
      let modifyingCameraXfo = false;
      const onCameraChanged = () => {
        if (!modifyingCameraXfo) {
          settingCameraDirection = false;
        }
      };
      camera.globalXfoChanged.connect(onCameraChanged);
      const timerCallback = () => {
        step++;
        if (step < steps) {
          const t = step / steps;
          const smooth_t = Math.smoothStep(0.0, 1.0, t);
          const delta = (smooth_t - smooth_t_prev) / (1.0 - t);
          smooth_t_prev = smooth_t;

          const posNow = camera.getGlobalXfo().tr;
          const targetNow = camera.getTargetPostion();
          const distNow = posNow.subtract(targetNow).length();
          let newPos = posNow;
          const newTarget = targetNow.lerp(targetEnd, delta);
          if (settingCameraDirection) {
            newPos = posNow.lerp(posEnd, delta);
          }

          const newVec = newPos.subtract(newTarget);
          const newDist = newVec.length();
          const idealDist = Math.lerp(distNow, distEnd, delta);
          // console.log("t:" + t + " delta: " + delta + " distNow:" + distNow + " idealDist:" + idealDist);
          newVec.scaleInPlace(idealDist / newVec.length());

          modifyingCameraXfo = true;
          camera.setPositionAndTarget(newTarget.add(newVec), newTarget);
          modifyingCameraXfo = false;

          this.__timeoutId = window.setTimeout(
            timerCallback,
            1000 / updateFrequency
          );
        } else {
          // camera.setPositionAndTarget(posEnd, targetEnd);
          camera.globalXfoChanged.disconnect(onCameraChanged);
          camera.movementFinished.emit();
          this.__timeoutId = undefined;
          this.__onDone();
        }
      };
      timerCallback();
    } else {
      camera.setPositionAndTarget(posEnd, targetEnd);
    }
  }

  /**
   * The cancel method.
   */
  cancel() {
    if (this.__timeoutId) {
      clearTimeout(this.__timeoutId);
      this.__timeoutId = undefined;
    }
  }
}

sgFactory.registerClass(
  'SetCameraPosisionAndTarget',
  SetCameraPosisionAndTarget
);
export { SetCameraPosisionAndTarget };
