import { SystemDesc } from '../BrowserDetection.js';
import { Vec2, Vec3, Quat, Mat4, Box3, Xfo } from '../Math';
import { Signal } from '../Utilities';
import { TreeItem } from './TreeItem.js';
import {
  ValueSetMode,
  Parameter,
  BooleanParameter,
  NumberParameter,
} from './Parameters';
import { sgFactory } from './SGFactory';

/** Class representing a camera.
 * @extends TreeItem
 */
class Camera extends TreeItem {
  /**
   * Create a camera.
   * @param {string} name - The name value.
   */
  constructor(name = undefined) {
    if (name == undefined) name = 'Camera';
    super(name);

    this.__isOrthographicParam = this.addParameter(
      new BooleanParameter('isOrthographic', false)
    );
    this.__fovParam = this.addParameter(new NumberParameter('fov', 1.0));
    this.__nearParam = this.addParameter(new NumberParameter('near', 0.1));
    this.__farParam = this.addParameter(new NumberParameter('far', 1000.0));
    this.__focalDistanceParam = this.addParameter(
      new NumberParameter('focalDistance', 5.0)
    );

    // this.__viewMatParam = this.addParameter(new Parameter('viewMat', new Mat4()));
    // const _cleanViewMat = (xfo)=>{
    //     return this.__globalXfoParam.getValue().inverse().toMat4();
    // }
    // this.__globalXfoParam.valueChanged.connect((changeType)=>{
    //     this.__viewMatParam.setDirty(_cleanViewMat);
    // });

    // this.viewMatChanged = this.__viewMatParam.valueChanged;
    this.projectionParamChanged = new Signal();
    this.movementFinished = new Signal();

    this.__isOrthographicParam.valueChanged.connect(
      this.projectionParamChanged.emit
    );
    this.__fovParam.valueChanged.connect(this.projectionParamChanged.emit);
    this.__nearParam.valueChanged.connect(this.projectionParamChanged.emit);
    this.__farParam.valueChanged.connect(this.projectionParamChanged.emit);

    // Initial viewing coords of a person standing 3 meters away from the
    // center of the stage looking at something 1 meter off the ground.
    this.setPositionAndTarget(new Vec3(3, 3, 1.75), new Vec3(0, 0, 1));
    this.setLensFocalLength('28mm');
  }

  // ////////////////////////////////////////////
  // Getters/setters.

  /**
   * The getNear method.
   * @return {any} - The return value.
   */
  getNear() {
    return this.__nearParam.getValue();
  }

  /**
   * The setNear method.
   * @param {any} value - The value param.
   */
  setNear(value) {
    this.__nearParam.setValue(value);
  }

  /**
   * The getFar method.
   * @return {any} - The return value.
   */
  getFar() {
    return this.__farParam.getValue();
  }

  /**
   * The setFar method.
   * @param {any} value - The value param.
   */
  setFar(value) {
    this.__farParam.setValue(value);
  }

  /**
   * The getFov method.
   * @return {any} - The return value.
   */
  getFov() {
    return this.__fovParam.getValue();
  }

  /**
   * The setFov method.
   * @param {any} value - The value param.
   */
  setFov(value) {
    this.__fovParam.setValue(value);
  }

  /**
   * The setLensFocalLength method.
   * @param {any} value - The value param.
   */
  setLensFocalLength(value) {
    // https://www.nikonians.org/reviews/fov-tables
    const mapping = {
      '10mm': 100.4,
      '11mm': 95.0,
      '12mm': 90.0,
      '14mm': 81.2,
      '15mm': 77.3,
      '17mm': 70.4,
      '18mm': 67.4,
      '19mm': 64.6,
      '20mm': 61.9,
      '24mm': 53.1,
      '28mm': 46.4,
      '30mm': 43.6,
      '35mm': 37.8,
      '45mm': 29.9,
      '50mm': 27.0,
      '55mm': 24.6,
      '60mm': 22.6,
      '70mm': 19.5,
      '75mm': 18.2,
      '80mm': 17.1,
      '85mm': 16.1,
      '90mm': 15.2,
      '100mm': 13.7,
      '105mm': 13.0,
      '120mm': 11.4,
      '125mm': 11.0,
      '135mm': 10.2,
      '150mm': 9.1,
      '170mm': 8.1,
      '180mm': 7.6,
      '210mm': 6.5,
      '300mm': 4.6,
      '400mm': 3.4,
      '500mm': 2.7,
      '600mm': 2.3,
      '800mm': 1.7,
    };
    if (!value in mapping) {
      console.warn('Camera lense focal length not suported:' + value);
      return;
    }
    this.__fovParam.setValue(Math.degToRad(mapping[value]));
  }

  /**
   * The getFocalDistance method.
   * @return {any} - The return value.
   */
  getFocalDistance() {
    return this.__focalDistanceParam.getValue();
  }

  /**
   * The setFocalDistance method.
   * @param {any} dist - The dist param.
   * @param {any} mode - The mode param.
   */
  setFocalDistance(dist, mode = ValueSetMode.USER_SETVALUE) {
    this.__focalDistanceParam.setValue(dist, mode);
    this.__nearParam.setValue(dist * 0.01, mode);
    this.__farParam.setValue(dist * 200.0, mode);
  }

  /**
   * The getIsOrthographic method.
   * @return {any} - The return value.
   */
  getIsOrthographic() {
    return this.__isOrthographicParam.getValue();
  }

  /**
   * The setIsOrthographic method.
   * @param {any} value - The value param.
   * @param {any} mode - The mode param.
   */
  setIsOrthographic(value, mode = ValueSetMode.USER_SETVALUE) {
    this.__isOrthographicParam.setValue(value, mode);
  }

  /**
   * The getViewMatrix method.
   * @return {any} - The return value.
   */
  getViewMatrix() {
    return this.__viewMatParam.getValue();
  }

  /**
   * The getDefaultManipMode method.
   * @return {any} - The return value.
   */
  getDefaultManipMode() {
    return this.__defaultManipulationState;
  }

  /**
   * The setDefaultManipMode method.
   * @param {any} mode - The mode param.
   */
  setDefaultManipMode(mode) {
    this.__defaultManipulationState = mode;
  }

  /**
   * The setPositionAndTarget method.
   * @param {any} position - The position param.
   * @param {any} target - The target param.
   * @param {any} mode - The mode param.
   */
  setPositionAndTarget(position, target, mode = ValueSetMode.USER_SETVALUE) {
    this.setFocalDistance(position.distanceTo(target), mode);
    const xfo = new Xfo();
    xfo.setLookAt(position, target, new Vec3(0.0, 0.0, 1.0));
    this.setGlobalXfo(xfo, mode);
  }

  /**
   * The getTargetPostion method.
   * @return {any} - The return value.
   */
  getTargetPostion() {
    const focalDistance = this.__focalDistanceParam.getValue();
    const xfo = this.getGlobalXfo();
    const target = xfo.ori.getZaxis();
    target.scaleInPlace(-focalDistance);
    target.addInPlace(xfo.tr);
    return target;
  }

  // ///////////////////////////

  /**
   * The frameView method.
   * @param {any} viewport - The viewport param.
   * @param {any} treeItems - The treeItems param.
   */
  frameView(viewport, treeItems) {
    const boundingBox = new Box3();
    for (const treeItem of treeItems)
      boundingBox.addBox3(treeItem.getBoundingBox());

    if (!boundingBox.isValid()) {
      console.warn('Bounding box not valid.');
      return;
    }
    const focalDistance = this.__focalDistanceParam.getValue();
    const fovY = this.__fovParam.getValue();

    const globalXfo = this.getGlobalXfo().clone();
    const cameraViewVec = globalXfo.ori.getZaxis();
    const targetOffset = cameraViewVec.scale(-focalDistance);
    const currTarget = globalXfo.tr.add(targetOffset);
    const newTarget = boundingBox.center();

    const pan = newTarget.subtract(currTarget);
    globalXfo.tr.addInPlace(pan);

    // Transform the bounding box into camera space.
    const transformedBBox = new Box3();
    transformedBBox.addBox3(boundingBox, globalXfo.inverse());
    const camSpaceTarget = transformedBBox.center();

    const fovX = fovY * (viewport.getWidth() / viewport.getHeight());

    // p1 is the closest corner of the transformed bbox.
    const p = transformedBBox.p1;
    const newFocalDistanceX = (Math.abs(p.x) / Math.tan(0.5 * fovX)) * 1.2;
    const newFocalDistanceY = (Math.abs(p.y) / Math.tan(0.5 * fovY)) * 1.2;

    const camSpaceBBoxDepth =
      (transformedBBox.p0.z - transformedBBox.p1.z) * -0.5;
    const newFocalDistance =
      Math.max(newFocalDistanceX, newFocalDistanceY) + camSpaceBBoxDepth;

    const dollyDist = newFocalDistance - focalDistance;
    globalXfo.tr.addInPlace(cameraViewVec.scale(dollyDist));

    this.setFocalDistance(newFocalDistance);
    this.setGlobalXfo(globalXfo);
    this.movementFinished.emit();
  }

  /**
   * The updateProjectionMatrix method.
   * @param {any} mat - The mat param.
   * @param {any} aspect - The aspect param.
   */
  updateProjectionMatrix(mat, aspect) {
    const isOrthographic = this.__isOrthographicParam.getValue();
    const fov = this.__fovParam.getValue();
    const near = this.__nearParam.getValue();
    const far = this.__farParam.getValue();
    const focalDistance = this.__focalDistanceParam.getValue();
    mat.setPerspectiveMatrix(fov, aspect, near, far);
  }
}

sgFactory.registerClass('Camera', Camera);

export { Camera };
