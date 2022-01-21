/* eslint-disable require-jsdoc */
import { Vec2, Vec3, Quat, Xfo, Ray } from '../../Math/index'
import { BaseTool } from './BaseTool'
import { NumberParameter, BooleanParameter, Parameter } from '../Parameters/index'
import { SystemDesc } from '../../SystemDesc'
import { PassType } from '../../Renderer/Passes/GLPass'
import { Camera } from '../Camera'
import { GLViewport, ZeaUIEvent } from '../..'
import { ZeaPointerEvent, POINTER_TYPES } from '../../Utilities/Events/ZeaPointerEvent'
import { ZeaMouseEvent } from '../../Utilities/Events/ZeaMouseEvent'
import { ZeaWheelEvent } from '../../Utilities/Events/ZeaWheelEvent'
import { Touch, ZeaTouchEvent } from '../../Utilities/Events/ZeaTouchEvent'
import { KeyboardEvent } from '../../Utilities/Events/KeyboardEvent'
import { BaseEvent } from '../../Utilities/BaseEvent'

const MANIPULATION_MODES: { [key: string]: number } = {
  pan: 0,
  dolly: 1,
  focussing: 2,
  look: 3,
  turntable: 4,
  tumbler: 5,
  trackball: 6,
}

interface OngoingTouch {
  identifier: number
  pos: Vec2
}

/**
 * Class for defining and interaction model of the camera.
 *
 * The CameraManipulator supports a variety of manipulation modes, and hotkeys/modifier keys
 * that allow the user to rapidly switch between modes, such as 'turntable' and 'pan'.
 * A detailed explanation of various camera manipulation modes can be found
 * here: https://www.mattkeeter.com/projects/rotation/
 *
 * **MANIPULATION_MODES**
 * * **pan:** Translates the camera sideways according the the camera's current orientation. Activated by the right mouse button, or two fingered touches on mobile.
 * * **dolly:** Translates the camera forwards and backwards according the the camera's current orientation. Activated by holding the ctrl and alt keys while using the left mouse button, or the mouse wheel, or two fingered touches on mobile.
 * * **focussing:** Focusses the camera on a specific 3d point in the scene. Activated by double clicking, or double tapping on a geometry in the 3d view.
 * * **look:** Rotates the camera around its own position. Useful for simulating looking by turning ones head inside a scene. Activated by holding the ctrl key and right mouse button.
 * * **turntable:** Rotates the camera around the current camera target, using the turntable style manipulation described above. Activated by the left mouse button.
 * * **tumbler:** Rotates the camera around the current camera target, using the tumbler style manipulation described above. Activated by the left mouse button.
 * * **trackball:** Rotates the camera around the current camera target, using the trackball style manipulation described above. Activated by the left mouse button.
 *
 * The default manipulation mode, is the mode that is active with only the left mouse button. The default manipulation mode is currently 'turntable'.
 *
 * To Assign a different default manipulation mode, retrieve the manipulator from the viewport
 * and set the default mode.
 * ```
 * const cameraManipulator = renderer.getViewport().getManipulator()
 * cameraManipulator.setDefaultManipulationMode(CameraManipulator.MANIPULATION_MODES.trackball);
 * ```
 *
 * This class is the default manipulator, and can be replaced with custom manipulators.
 *
 * ```
 * const customManipulator = new CustomCameraManipulator()
 * renderer.getViewport().setManipulator(customManipulator);
 * ```
 *
 * The Camera manipulator can focus the view on a point in the view by various gestures.
 * A single click or touch tap can cause the view to be focussed or a double click or tap.
 * This behavior can be configured using the 2 values.
 * e.g. to disable all focus gestures, set both values to zero.
 * ```
 * // Make the aim focus occur after a single touch or click.
 * const cameraManipulator = renderer.getViewport().getManipulator()
 * cameraManipulator.aimFocusOnTouchTap = 1
 * cameraManipulator.aimFocusOnMouseClick = 1
 * ```
 *
 * **Parameters**
 * * **OrbitRate(`NumberParameter`):** The rate at which mouse or touch interactions are translated camera orientation changes.
 * * **DollySpeed(`NumberParameter`):** The rate at which the mouse button or touch interactions are translated camera dolly movement.
 * * **mouseWheelDollySpeed(`NumberParameter`):** The rate at which the mouse wheel interactions are translated camera dolly movement.
 *
 *   Note: this value defaults to different values for touch based interfaces to mouse based input.
 *   For mobile devices, the orbit rate defaults to 0.5, and for mouse based interaction, the value defaults to 1.
 *   A value of 1 means that the camera will rotate 180 degrees for a mouse interaction that spans from the left border of the viewport to the right border.
 *   Some applications might require lower, or higher default values
 *
 * To set different default values for mobile or desktop set a different value based on the SystemDesc.isMobileDevice flag.
 * ```
 * const cameraManipulator = renderer.getViewport().getManipulator()
 * cameraManipulator.getParameter('OrbitRate').setValue(SystemDesc.isMobileDevice ? 0.1 : 0.4)
 * ```
 *
 * **Events**
 * * **movementFinished:** Emitted when a camera movement is finished. E.g. when the user releases the mouse after a dolly, or after the focussing action has completed.
 * * **aimingFocus:** Emitted when a camera is being focussed on a target. E.g. when the user double clicks the mouse on a geometry in the view.
 *
 * @extends BaseTool
 */

class CameraManipulator extends BaseTool {
  protected appData: Record<string, any>
  orbitAroundCursor: boolean = false
  zoomTowardGeomUnderCursor: boolean = false
  aimFocusOnTouchTap: number = 2
  aimFocusOnMouseClick: number = 2
  enabledWASDWalkMode: boolean = false
  defaultManipulationState: number = MANIPULATION_MODES.turntable

  private prevCursor: any
  private manipulationState: number
  private pointerDown: boolean = false
  private dragging: number = 0
  private keyboardMovement: boolean = false
  private keysPressed: string[] = []
  private velocity: Vec3 = new Vec3()
  private prevVelocityIntegrationTime: number = -1
  private ongoingTouches: Record<string, OngoingTouch> = {}

  private orbitTarget: Vec3
  private prevPointerPos: Vec2
  private focusIntervalId: number

  private mouseWheelMovementDist: number = 0
  private mouseWheelZoomCount: number = 0
  private mouseWheelZoomId: number = -1

  /**
   * @member orbitRateParam - The rate at which mouse or touch interactions are translated camera orientation changes.
   */
  orbitRateParam: NumberParameter = new NumberParameter('OrbitRate', SystemDesc.isMobileDevice ? 0.5 : 1)

  /**
   * @member dollySpeedParam - The rate at which the mouse button or touch interactions are translated camera dolly movement.
   */
  dollySpeedParam: NumberParameter = new NumberParameter('DollySpeed', 0.02)

  /**
   * @member mouseWheelDollySpeedParam - The rate at which the mouse wheel interactions are translated camera dolly movement.
   */
  mouseWheelDollySpeedParam: NumberParameter = new NumberParameter('MouseWheelDollySpeed', 0.1)

  /**
   * @member walkSpeedParam - TODO
   */
  walkSpeedParam: NumberParameter = new NumberParameter('WalkSpeed', 5) // Value is in meters/second

  /**
   * @member walkModeCollisionDetection - TODO
   */
  walkModeCollisionDetection: BooleanParameter = new BooleanParameter('WalkModeCollisionDetection', false)

  /**
   * Create a camera, mouse and keyboard
   * @param appData - The object containing the scene and the renderer.
   */
  constructor(appData: Record<string, any>) {
    super()

    this.appData = appData

    this.defaultManipulationState = MANIPULATION_MODES.turntable
    this.manipulationState = this.defaultManipulationState

    this.addParameter(this.orbitRateParam)
    this.addParameter(this.dollySpeedParam)
    this.addParameter(this.mouseWheelDollySpeedParam)
    this.addParameter(this.walkSpeedParam)
    this.addParameter(this.walkModeCollisionDetection)
  }

  /**
   * Enables tools usage.
   */
  activateTool(): void {
    super.activateTool()
    if (this.appData && this.appData.renderer) {
      this.prevCursor = this.appData.renderer.getGLCanvas().style.cursor
      this.appData.renderer.getGLCanvas().style.cursor = 'cursor'
    }
  }

  /**
   * Disables tool usage.
   */
  deactivateTool(): void {
    super.deactivateTool()
    if (this.appData && this.appData.renderer) {
      this.appData.renderer.getGLCanvas().style.cursor = this.prevCursor
    }
  }

  /**
   * Sets default manipulation mode.
   * The value can be on of the keys in #CameraManipulator.MANIPULATION_MODES
   *
   * @param manipulationMode - The manipulation mode value.
   */
  setDefaultManipulationMode(manipulationMode: string | number): void {
    if (typeof manipulationMode == 'string') {
      this.defaultManipulationState = MANIPULATION_MODES[manipulationMode]
    } else this.defaultManipulationState = manipulationMode

    if (!Object.values(MANIPULATION_MODES).includes(this.defaultManipulationState)) {
      throw new Error('Invalid Camera Manipulation Mode. Must be one of ' + Object.keys(MANIPULATION_MODES))
    }
  }

  /**
   * The look method.
   * @param event - The event value.
   * @param dragVec - The drag vector value.
   */
  look(event: Record<string, any>, dragVec: Vec2): void {
    const { viewport } = event
    const camera = viewport.getCamera()

    const orbitRate = this.orbitRateParam.value

    const globalXfo = camera.globalXfoParam.value

    // Orbit
    const orbit = new Quat()
    orbit.rotateZ((dragVec.x / viewport.getWidth()) * Math.PI * orbitRate)
    globalXfo.ori = orbit.multiply(globalXfo.ori)

    // Pitch
    const pitch = new Quat()
    pitch.rotateX((dragVec.y / viewport.getHeight()) * Math.PI * orbitRate)
    globalXfo.ori.multiplyInPlace(pitch)

    camera.globalXfoParam.value = globalXfo
  }

  /**
   * Rotates viewport camera about the target.
   *
   * @param event - The event value.
   * @param dragVec - The drag vector value.
   */
  turntable(event: Record<string, any>, dragVec: Vec2): void {
    const { viewport } = event
    const camera = viewport.getCamera()

    const orbitRate = this.orbitRateParam.value

    const globalXfo = camera.globalXfoParam.value
    const cameraTargetOffset = globalXfo.ori.inverse().rotateVec3(globalXfo.tr.subtract(this.orbitTarget))

    // Orbit
    const orbit = new Quat()
    orbit.rotateZ((dragVec.x / viewport.getWidth()) * 2 * Math.PI * -orbitRate)
    globalXfo.ori = orbit.multiply(globalXfo.ori)

    // Pitch
    const pitch = new Quat()
    pitch.rotateX((dragVec.y / viewport.getHeight()) * Math.PI * -orbitRate)
    globalXfo.ori.multiplyInPlace(pitch)

    globalXfo.tr = this.orbitTarget.add(globalXfo.ori.rotateVec3(cameraTargetOffset))

    camera.globalXfoParam.value = globalXfo
  }

  /**
   * Rotates viewport camera about the target.
   *
   * @param event - The event value.
   * @param dragVec - The drag vector value.
   */
  tumbler(event: Record<string, any>, dragVec: Vec2): void {
    const { viewport } = event
    const camera = viewport.getCamera()
    const orbitRate = this.orbitRateParam.value

    const globalXfo = camera.globalXfoParam.value
    const xVec = globalXfo.ori.getXaxis()
    const yVec = globalXfo.ori.getYaxis()
    const zVec = globalXfo.ori.getZaxis()
    const vec = xVec.scale(-dragVec.x).add(yVec.scale(dragVec.y))
    const rotateAxis = vec.cross(zVec)
    rotateAxis.normalizeInPlace()

    const dragVecLength = dragVec.length()
    const cameraTargetOffset = globalXfo.ori.inverse().rotateVec3(globalXfo.tr.subtract(this.orbitTarget))

    // Orbit
    const orbit = new Quat()
    orbit.setFromAxisAndAngle(rotateAxis, (dragVecLength / viewport.getWidth()) * Math.PI * -orbitRate)
    globalXfo.ori = orbit.multiply(globalXfo.ori)

    globalXfo.tr = this.orbitTarget.add(globalXfo.ori.rotateVec3(cameraTargetOffset))

    camera.globalXfoParam.value = globalXfo
  }

  /**
   * Rotates viewport camera about the target.
   *
   * @param event - The event value.
   * @param dragVec - The drag vector value.
   */
  trackball(event: Record<string, any>, dragVec: Vec2): void {
    const { viewport } = event
    const camera = viewport.getCamera()
    const orbitRate = this.orbitRateParam.value

    const globalXfo = camera.globalXfoParam.value
    const xVec = globalXfo.ori.getXaxis()
    const yVec = globalXfo.ori.getYaxis()
    const zVec = globalXfo.ori.getZaxis()
    const vec = xVec.scale(-dragVec.x).add(yVec.scale(dragVec.y))
    const rotateAxis = vec.cross(zVec)
    rotateAxis.normalizeInPlace()

    const dragVecLength = dragVec.length()

    const cameraTargetOffset = globalXfo.ori.inverse().rotateVec3(globalXfo.tr.subtract(this.orbitTarget))

    // Orbit
    const orbit = new Quat()
    orbit.setFromAxisAndAngle(rotateAxis, (dragVecLength / viewport.getWidth()) * Math.PI * -orbitRate)
    globalXfo.ori = orbit.multiply(globalXfo.ori)

    globalXfo.tr = this.orbitTarget.add(globalXfo.ori.rotateVec3(cameraTargetOffset))

    camera.globalXfoParam.value = globalXfo
  }

  /**
   * Rotates the camera around its own `X`,`Y` axes.
   *
   * @param event - The event value.
   * @param dragVec - The drag vector value.
   */
  pan(event: Record<string, any>, dragVec: Vec2): void {
    const { viewport } = event
    const camera = viewport.getCamera()

    const delta = new Xfo()
    const xAxis = new Vec3(1, 0, 0)
    const yAxis = new Vec3(0, 1, 0)

    if (camera.isOrthographic()) {
      const frustumHeight = camera.getFrustumHeight()
      const frustumWidth = frustumHeight * (viewport.getWidth() / viewport.getHeight())

      delta.tr = xAxis.scale(-(dragVec.x / viewport.getWidth()) * frustumWidth)
      delta.tr.addInPlace(yAxis.scale((dragVec.y / viewport.getHeight()) * frustumHeight))
    } else {
      const focalDistance = camera.getFocalDistance()
      const fovY = camera.getFov()

      const cameraPlaneHeight = 2.0 * focalDistance * Math.tan(0.5 * fovY)
      const cameraPlaneWidth = cameraPlaneHeight * (viewport.getWidth() / viewport.getHeight())
      delta.tr = xAxis.scale(-(dragVec.x / viewport.getWidth()) * cameraPlaneWidth)
      delta.tr.addInPlace(yAxis.scale((dragVec.y / viewport.getHeight()) * cameraPlaneHeight))
    }

    const cameraXfo = camera.globalXfoParam.value
    camera.globalXfoParam.value = cameraXfo.multiply(delta)
  }

  /**
   * The dolly method.
   * @param event - The event value.
   * @param dragVec - The drag vector value.
   */
  dolly(event: Record<string, any>, dragVec: Vec2): void {
    const { viewport } = event
    const camera = viewport.getCamera()
    const focalDistance = camera.getFocalDistance()

    const applyMovement = () => {
      const dollyDist = dragVec.y * this.dollySpeedParam.value * focalDistance
      const delta = new Xfo()
      delta.tr.set(0, 0, dollyDist)
      const globalXfo = camera.globalXfoParam.value
      camera.globalXfoParam.value = globalXfo.multiply(delta)
    }
    const applyViewScale = () => {
      const dollyDist = dragVec.y * this.dollySpeedParam.value
      const viewHeight = camera.getFrustumHeight()
      const zoomDist = viewHeight * dollyDist
      camera.setFrustumHeight(viewHeight + zoomDist)
    }

    if (camera.isOrthographic()) {
      applyViewScale()
    } else {
      applyMovement()
    }
  }

  /**
   * The initDrag method.
   *
   * @private
   * @param event - The event value.
   */
  initDrag(event: ZeaPointerEvent): void {
    const { pointerPos } = event
    event.setCapture(this)

    this.pointerDown = true

    const viewport = <GLViewport>event.viewport
    const camera = viewport.getCamera()
    const xfo = camera.globalXfoParam.value
    if (this.orbitAroundCursor) {
      if (event.intersectionData != undefined && this.orbitAroundCursor) {
        this.orbitTarget = event.intersectionData.intersectionPos
        const vec = xfo.inverse().transformVec3(event.intersectionData.intersectionPos)
        camera.setFocalDistance(-vec.z)
      } else {
        if (event.pointerRay) {
          this.orbitTarget = event.pointerRay.pointAtDist(camera.getFocalDistance())
        } else {
          this.orbitTarget = xfo.tr.add(xfo.ori.getZaxis().scale(-camera.getFocalDistance()))
        }
      }
    } else {
      this.orbitTarget = xfo.tr.add(xfo.ori.getZaxis().scale(-camera.getFocalDistance()))
    }

    this.prevPointerPos = pointerPos
    this.dragging = 1
  }

  /**
   * The initDrag method.
   *
   * @private
   * @param event - The event value.
   */
  endDrag(event: Record<string, any>): void {
    if (event.getCapture() == this) event.releaseCapture()
    this.dragging = 0
    this.pointerDown = false
  }

  /**
   * The aimFocus method.
   *
   * @private
   * @param camera - The camera that we are aiming
   * @param target - The target to focus on.
   * @param distance - The distance from the target to get to.
   * @param duration - The duration in milliseconds to aim the focus.
   */
  aimFocus(camera: Camera, target: Vec3, distance: number = -1, duration: number = 400): void {
    if (this.focusIntervalId) clearInterval(this.focusIntervalId)

    const count = Math.round(duration / 20) // each step is 20ms
    const initalMode = this.manipulationState
    let i = 0
    const applyMovement = () => {
      const prevGlobalXfo = camera.globalXfoParam.value
      const initialDist = camera.getFocalDistance()
      const dir = target.subtract(prevGlobalXfo.tr)
      const currDist = <number>dir.normalizeInPlace()

      const targetGlobalXfo = prevGlobalXfo.clone()
      if (initalMode == MANIPULATION_MODES.turntable || initalMode == MANIPULATION_MODES.look) {
        // Orbit
        {
          const currDir = prevGlobalXfo.ori.getZaxis().clone()
          currDir.z = 0
          const newDir = dir.negate()
          newDir.z = 0

          const orbit = new Quat()
          orbit.setFrom2Vectors(currDir, newDir)
          targetGlobalXfo.ori = orbit.multiply(targetGlobalXfo.ori)
        }

        // Pitch
        {
          const xAxis = prevGlobalXfo.ori.getXaxis().clone()
          const currDir = prevGlobalXfo.ori.getZaxis().clone()
          const newDir = dir.negate()

          newDir.subtractInPlace(xAxis.scale(newDir.dot(xAxis)))
          newDir.normalizeInPlace()

          const pitch = new Quat()
          if (currDir.cross(newDir).dot(xAxis) > 0.0) pitch.rotateX(currDir.angleTo(newDir))
          else pitch.rotateX(-currDir.angleTo(newDir))
          targetGlobalXfo.ori = targetGlobalXfo.ori.multiply(pitch)
        }

        // Fix Roll
        {
          const currDir = targetGlobalXfo.ori.getXaxis().clone()
          const newDir = currDir.clone()
          newDir.z = 0
          newDir.normalizeInPlace()

          const roll = new Quat()
          roll.setFrom2Vectors(currDir, newDir)
          targetGlobalXfo.ori = roll.multiply(targetGlobalXfo.ori)
        }
      } else {
        const currDir = prevGlobalXfo.ori.getZaxis().clone()
        const newDir = dir.negate()

        const orbit = new Quat()
        orbit.setFrom2Vectors(currDir, newDir)
        targetGlobalXfo.ori = orbit.multiply(targetGlobalXfo.ori)
      }

      // With each iteration we get closer to our goal
      // and on the final iteration we should aim perfectly at
      // the target.
      const t = Math.pow(i / count, 2)
      const globalXfo = prevGlobalXfo.clone()
      globalXfo.ori = prevGlobalXfo.ori.lerp(targetGlobalXfo.ori, t)
      if (distance > 0) {
        const displacement = dir.scale(currDist - distance)
        globalXfo.tr.addInPlace(displacement.scale(t))
      }

      camera.setFocalDistance(initialDist + (currDist - initialDist) * t)
      camera.globalXfoParam.value = globalXfo

      i++
      if (i <= count) {
        // @ts-ignore
        this.focusIntervalId = setTimeout(applyMovement, 20)
      } else {
        this.focusIntervalId = undefined

        this.emit('movementFinished')
        camera.emit('movementFinished')
      }
    }
    applyMovement()
  }

  /**
   * The orientPointOfView method.
   *
   * @private
   * @param camera - The camera that we are orienting
   * @param position - The target to focus on.
   * @param target - The target to focus on.
   * @param distance - The distance to the specified we want the user to be moved to
   * @param duration - The duration in milliseconds to aim the focus.
   */
  orientPointOfView(camera: Camera, position: Vec3, target: Vec3, distance: number = 0, duration: number = 400): void {
    if (this.focusIntervalId) clearInterval(this.focusIntervalId)

    const count = Math.round(duration / 20) // each step is 20ms
    let i = 0
    const applyMovement = () => {
      const initialGlobalXfo = camera.globalXfoParam.value
      const initialTarget = camera.getTargetPosition()

      // With each iteration we get closer to our goal
      // and on the final iteration we should aim perfectly at
      // the target.
      const t = Math.pow(i / count, 2)

      // Sometimes we want to pull users to within some threshold of the specified position.
      const dirToPosition = position.subtract(initialGlobalXfo.tr)
      const currDistToPosition = <number>dirToPosition.normalizeInPlace()
      const displacement = dirToPosition.scale(currDistToPosition - distance)
      const pos = initialGlobalXfo.tr.add(displacement.scale(t))

      const targetPos = initialTarget.lerp(target, t)

      camera.setPositionAndTarget(pos, targetPos)

      i++
      if (i <= count) {
        // @ts-ignore
        this.focusIntervalId = setTimeout(applyMovement, 20)
      } else {
        this.focusIntervalId = undefined

        this.emit('movementFinished')
        camera.emit('movementFinished')
      }
    }
    applyMovement()
  }

  /**
   * Invoked when a user double presses a pointer over an element.
   *
   * @param event - The pointer event that occurs
   * @memberof CameraManipulator
   */
  onPointerDoublePress(event: ZeaPointerEvent): void {
    const aimFocus = (pointerRay: Ray) => {
      const viewport = <GLViewport>event.viewport
      const camera = viewport.getCamera()
      const cameraGlobalXfo = camera.globalXfoParam.value
      const aimTarget = cameraGlobalXfo.tr.add(pointerRay.dir.scale(event.intersectionData.dist))
      this.aimFocus(camera, aimTarget)
      // Note: Collab can use these mouseEvents to guide users attention.
      // @ts-ignore
      event.aimTarget = aimTarget
      // @ts-ignore
      event.aimDistance = event.intersectionData.dist
      this.emit('aimingFocus', event)
      camera.emit('aimingFocus', event)
      event.stopPropagation()
    }
    if (event.intersectionData && this.aimFocusOnMouseClick) {
      if (event.pointerType === POINTER_TYPES.mouse && this.aimFocusOnMouseClick == 2) {
        const mouseEvent = <ZeaMouseEvent>event
        aimFocus(mouseEvent.pointerRay)
        mouseEvent.preventDefault()
      }
      if (event.pointerType === POINTER_TYPES.touch && this.aimFocusOnTouchTap == 2) {
        const pointerEvent = <ZeaTouchEvent>event
        aimFocus(pointerEvent.pointerRay)
      }
    }
  }

  /**
   * Event fired when either the mouse button is pressed, or a touch start event occurs.
   *
   * @param event - The mouse event that occurs.
   */
  onPointerDown(event: ZeaPointerEvent): void {
    if (event.pointerType === POINTER_TYPES.mouse) {
      if (this.dragging == 1) {
        this.endDrag(event)
      }

      this.initDrag(event)

      const mouseEvent = <ZeaMouseEvent>event
      if (mouseEvent.button == 2) {
        this.manipulationState = MANIPULATION_MODES.pan
      } else if (mouseEvent.ctrlKey && mouseEvent.altKey) {
        this.manipulationState = MANIPULATION_MODES.dolly
      } else if (mouseEvent.ctrlKey || mouseEvent.button == 2) {
        this.manipulationState = MANIPULATION_MODES.look
      } else {
        this.manipulationState = this.defaultManipulationState
      }
      mouseEvent.preventDefault()
    } else if (event.pointerType === POINTER_TYPES.touch) {
      this._onTouchStart(<ZeaTouchEvent>event)
    }

    event.stopPropagation()
  }

  /**
   * Event fired when either the mouse cursor is moved, or a touch point moves.
   *
   * @param event - The mouse event that occurs.
   */
  onPointerMove(event: ZeaPointerEvent): void {
    if (this.dragging != 0) {
      if (event.pointerType === POINTER_TYPES.mouse) this._onMouseMove(<ZeaMouseEvent>event)
      if (event.pointerType === POINTER_TYPES.touch) this._onTouchMove(<ZeaTouchEvent>event)

      this.dragging = 2
      event.stopPropagation()
    }
  }

  /**
   * The event that occurs when the user moves the pointer across a screen.
   *
   * @param event -The event value
   */
  _onMouseMove(event: ZeaMouseEvent): void {
    if (!this.pointerDown) return

    const pointerPos = event.pointerPos
    // this.__calculatingDragAction = true
    const dragVec = pointerPos.subtract(this.prevPointerPos)

    switch (this.manipulationState) {
      case MANIPULATION_MODES.turntable:
        this.turntable(event, dragVec)
        break
      case MANIPULATION_MODES.tumbler:
        this.tumbler(event, dragVec)
        break
      case MANIPULATION_MODES.trackball:
        this.trackball(event, dragVec)
        break
      case MANIPULATION_MODES.look:
        this.look(event, dragVec)
        break
      case MANIPULATION_MODES.pan:
        this.pan(event, pointerPos.subtract(this.prevPointerPos))
        break
      case MANIPULATION_MODES.dolly:
        this.dolly(event, dragVec)
        break
    }
    this.prevPointerPos = pointerPos
    // this.__calculatingDragAction = false
    event.preventDefault()
  }

  /**
   * The event that occurs when the user moves pointer across a touch screen.
   *
   * @param event - The touch event that occurs.
   * @private
   */
  _onTouchMove(event: ZeaTouchEvent): void {
    // this.__calculatingDragAction = true

    const touches = event.touches
    if (touches.length == 1) {
      const touch = touches[0]
      const touchPos = new Vec2(touch.clientX, touch.clientY)
      const touchData = this.ongoingTouches[touch.identifier]
      if (!touchData) return
      const dragVec = touchPos.subtract(touchData.pos)
      switch (this.defaultManipulationState) {
        case MANIPULATION_MODES.look:
          // TODO: scale panning here.
          dragVec.scaleInPlace(6.0)
          this.look(event, dragVec)
          break
        case MANIPULATION_MODES.turntable:
          this.turntable(event, dragVec)
          break
        case MANIPULATION_MODES.tumbler:
          this.tumbler(event, dragVec)
          break
        case MANIPULATION_MODES.trackball:
          this.trackball(event, dragVec)
          break
      }
      touchData.pos = touchPos
    } else if (touches.length == 2) {
      const touch0 = touches[0]
      const touchData0 = this.ongoingTouches[touch0.identifier]
      const touch1 = touches[1]
      const touchData1 = this.ongoingTouches[touch1.identifier]

      if (!touchData0 || !touchData1) return

      const touch0Pos = new Vec2(touch0.clientX, touch0.clientY)
      const touch1Pos = new Vec2(touch1.clientX, touch1.clientY)

      const startSeparation = touchData1.pos.subtract(touchData0.pos).length()
      const dragSeparation = touch1Pos.subtract(touch0Pos).length()
      const separationDist = startSeparation - dragSeparation

      const touch0Drag = touch0Pos.subtract(touchData0.pos)
      const touch1Drag = touch1Pos.subtract(touchData1.pos)
      const dragVec = touch0Drag.add(touch1Drag)
      // TODO: scale panning here.
      dragVec.scaleInPlace(0.5)

      // apply the vectors to calculate a pan and zoom
      const dragDist = separationDist * 0.002
      const { viewport } = event
      const camera = (<GLViewport>viewport).getCamera()

      const focalDistance = camera.getFocalDistance()
      const fovY = camera.getFov()

      const xAxis = new Vec3(1, 0, 0)
      const yAxis = new Vec3(0, 1, 0)

      const cameraPlaneHeight = 2.0 * focalDistance * Math.tan(0.5 * fovY)
      const cameraPlaneWidth = cameraPlaneHeight * (viewport.getWidth() / viewport.getHeight())
      const delta = new Xfo()
      delta.tr = xAxis.scale(-(dragVec.x / viewport.getWidth()) * cameraPlaneWidth)
      delta.tr.addInPlace(yAxis.scale((dragVec.y / viewport.getHeight()) * cameraPlaneHeight))

      const zoomDist = dragDist * focalDistance
      camera.setFocalDistance(focalDistance + zoomDist)
      delta.tr.z += zoomDist

      // Apply the roll
      switch (this.defaultManipulationState) {
        case MANIPULATION_MODES.tumbler:
        case MANIPULATION_MODES.trackball:
          const vecPrev = touchData1.pos.subtract(touchData0.pos)
          const vecNow = touch1Pos.subtract(touch0Pos)
          let deltaAngle = vecPrev.normalize().angleTo(vecNow.normalize())
          if (vecPrev.cross(vecNow) < 0.0) {
            deltaAngle = -deltaAngle
          }

          const roll = new Quat()
          roll.rotateZ(deltaAngle)
          delta.ori.multiplyInPlace(roll)
          break
      }

      const globalXfo = camera.globalXfoParam.value
      camera.globalXfoParam.value = globalXfo.multiply(delta)

      touchData0.pos = touch0Pos
      touchData1.pos = touch1Pos
    }

    // this.__calculatingDragAction = false
  }

  /**
   * Event fired when either the mouse button is released, or a touch end event occurs.
   *
   * @param event - The mouse event that occurs.
   */
  onPointerUp(event: ZeaPointerEvent): void {
    if (this.dragging == 1) {
      // No dragging ocurred. Release the capture and let the event propagate like normal.
      this.endDrag(event)

      if (event.intersectionData) {
        if (
          (event.pointerType === POINTER_TYPES.mouse && this.aimFocusOnMouseClick == 1) ||
          (event.pointerType === POINTER_TYPES.touch && this.aimFocusOnTouchTap == 1)
        ) {
          const viewport = <GLViewport>event.viewport
          const camera = viewport.getCamera()
          const cameraGlobalXfo = camera.globalXfoParam.value
          const pointerRay =
            event.pointerType === POINTER_TYPES.mouse
              ? (<ZeaMouseEvent>event).pointerRay
              : (<ZeaTouchEvent>event).pointerRay
          const aimTarget = cameraGlobalXfo.tr.add(pointerRay.dir.scale(event.intersectionData.dist))
          this.aimFocus(camera, aimTarget)

          // Note: Collab can use these events to guide users attention.
          // @ts-ignore
          event.aimTarget = aimTarget
          // @ts-ignore
          event.aimDistance = event.intersectionData.dist
          this.emit('aimingFocus', event)
          camera.emit('aimingFocus', event)

          // Note: for a single click (no-drag) we don't want to stop the propagation of the event.
          event.stopPropagation()
          if (event.pointerType === POINTER_TYPES.mouse) (<ZeaMouseEvent>event).preventDefault()
        }
      }
    } else if (this.dragging == 2) {
      if (event.pointerType === POINTER_TYPES.mouse) {
        this.endDrag(event)

        this.emit('movementFinished')
        const viewport = <GLViewport>event.viewport
        viewport.getCamera().emit('movementFinished')
      } else if (event.pointerType === POINTER_TYPES.touch) {
        const touchEvent = <ZeaTouchEvent>event
        const { changedTouches, touches } = touchEvent

        for (let i = 0; i < changedTouches.length; i++) {
          this.__endTouch(changedTouches[i])
        }

        if (Object.keys(this.ongoingTouches).length == 0) {
          this.endDrag(event)
        } else if (!touches.length) {
          this.endDrag(event)
          this.ongoingTouches = {}
        }
        touchEvent.preventDefault()
      }

      event.stopPropagation()
    }
  }

  /**
   * Causes an event to occur when the mouse pointer is moved out of this viewport
   * @param event - The event that occurs.
   */
  onPointerLeave(event: ZeaPointerEvent): void {
    // If the pointer leaves the viewport, then we will no longer receive key up events,
    // so we must immediately disable movement here.
    if (this.keysPressed.length > 0) {
      this.keysPressed = []
      this.velocity.set(0, 0, 0)
      this.keyboardMovement = false
    }
  }

  /**
   * Invoked when the mouse wheel is rolled up or down over an element.
   *
   * @param event - The wheel event that occurs.
   */
  onWheel(event: ZeaWheelEvent): void {
    const viewport = <GLViewport>event.viewport
    const camera = viewport.getCamera()
    const mouseWheelDollySpeed = this.mouseWheelDollySpeedParam.value
    const modulator = event.shiftKey ? 0.1 : 0.5
    const xfo = camera.globalXfoParam.value

    let dir: Vec3
    if (!camera.isOrthographic()) {
      if (this.zoomTowardGeomUnderCursor) {
        if (event.intersectionData != undefined) {
          dir = xfo.tr.subtract(event.intersectionData.intersectionPos)
          dir.normalizeInPlace()
          const viewVec = xfo.inverse().transformVec3(event.intersectionData.intersectionPos)
          camera.setFocalDistance(-viewVec.z)
        } else {
          const point = event.pointerRay.pointAtDist(camera.getFocalDistance())
          dir = xfo.tr.subtract(point)
          dir.normalizeInPlace()
        }
      } else {
        dir = camera.globalXfoParam.value.ori.getZaxis()
      }
    }

    // To normalize mouse wheel speed across vendors and OSs, it is recommended to simply convert scroll value to -1 or 1
    // See here: https://stackoverflow.com/questions/5527601/normalizing-mousewheel-speed-across-browsers
    const steps = 6
    const direction = event.deltaY < 0 ? -1 : 1
    const applyMovement = () => {
      const focalDistance = camera.getFocalDistance()
      const zoomDist = focalDistance * this.mouseWheelMovementDist
      xfo.tr.addInPlace(dir.scale(zoomDist))

      camera.setFocalDistance(focalDistance + zoomDist)
      camera.globalXfoParam.value = xfo

      this.mouseWheelZoomCount++
      if (this.mouseWheelZoomCount < steps) {
        this.mouseWheelZoomId = window.setTimeout(applyMovement, 10)
      } else {
        this.mouseWheelZoomId = -1
        this.emit('movementFinished')
        camera.emit('movementFinished')
      }
    }
    const applyDolly = () => {
      const dollyDist = 50.0 * this.mouseWheelMovementDist
      const delta = new Xfo()
      delta.tr.set(0, 0, dollyDist)
      xfo.tr.addInPlace(dir.scale(dollyDist))
      camera.globalXfoParam.value = xfo
    }
    const applyViewScale = () => {
      const frustumHeight = camera.getFrustumHeight()
      const zoomDist = frustumHeight * this.mouseWheelMovementDist
      camera.setFrustumHeight(frustumHeight + zoomDist)

      if (event.intersectionData && this.zoomTowardGeomUnderCursor) {
        const dir = xfo.tr.subtract(event.intersectionData.intersectionPos)
        const zAxis = xfo.ori.getZaxis()
        dir.subtractInPlace(zAxis.scale(dir.dot(zAxis)))

        xfo.tr.addInPlace(dir.scale(zoomDist / (frustumHeight + zoomDist)))
        camera.globalXfoParam.value = xfo
      }

      this.mouseWheelZoomCount++
      if (this.mouseWheelZoomCount < steps) {
        this.mouseWheelZoomId = window.setTimeout(applyViewScale, 10)
      } else {
        this.mouseWheelZoomId = -1
        this.emit('movementFinished')
        camera.emit('movementFinished')
      }
    }

    if (this.mouseWheelZoomId > 0) {
      // If a new wheel event arrives while the previous is still running, modify the distance
      // and reset.
      this.mouseWheelMovementDist += (direction * mouseWheelDollySpeed * modulator * 0.5) / steps
      this.mouseWheelZoomCount = 0
    } else {
      this.mouseWheelMovementDist = (direction * mouseWheelDollySpeed * modulator) / steps
      this.mouseWheelZoomCount = 0
      if (camera.isOrthographic()) {
        applyViewScale()
      } else {
        if (event.ctrlKey) applyDolly()
        else applyMovement()
      }
    }

    event.preventDefault()
    event.stopPropagation()
  }

  /**
   * The integrateVelocityChange method.
   * @param event - The event value.
   * @private
   */
  integrateVelocityChange(event: Record<string, any>): void {
    const { viewport } = event
    const camera = viewport.getCamera()

    const time = performance.now()
    if (this.prevVelocityIntegrationTime > 0) {
      const timeDelta = (time - this.prevVelocityIntegrationTime) / 1000
      const speed = this.walkSpeedParam.value
      // movement.tr = this.velocity.normalize().scale(speed * timeDelta)

      if (speed > 0.0) {
        // As we move over a terrain, it can be helpful to allow users to walk
        // over surfaces without falling through them. This allows users to look
        // down while walking forwards for example.
        // Calculate where we might be soon
        const movement = new Xfo()
        movement.tr = this.velocity.normalize().scale(speed * timeDelta)
        const cameraXfo = camera.globalXfoParam.value

        const newXfo = cameraXfo.multiply(movement)

        const collisionDetection = this.walkModeCollisionDetection.value
        if (collisionDetection) {
          // Raycast from 1.5 meter up
          const headHeight = 1.5
          const dist = 1.5
          const area = 0.5
          const raycastXfo = new Xfo(newXfo.tr)
          const ray = new Ray(newXfo.tr, new Vec3(0, 0, -1))
          const results = viewport.getRenderer().raycastCluster(raycastXfo, ray, dist, area, PassType.OPAQUE)

          if (results.length > 0) {
            let avgDist = 0
            // eslint-disable-next-line guard-for-in
            results.forEach((result: any) => {
              avgDist += result.dist
            })
            avgDist /= results.length

            // Snap the movement vector to make the user rest on the ground.
            newXfo.tr = ray.start.add(ray.dir.scale(avgDist - headHeight))
          }
        }
        camera.globalXfoParam.value = newXfo
      }
    }

    this.prevVelocityIntegrationTime = time
  }

  /**
   * Invoked when the user is pressing a key on the keyboard.
   *
   * @param event - The keyboard event that occurs.
   */
  onKeyDown(event: KeyboardEvent): void {
    if (!this.enabledWASDWalkMode) return
    const key = event.key.toLowerCase()
    // Note: onKeyPressed is called initially only once, and then we
    // get a series of calls. Here we ignore subsequent events.
    if (this.keysPressed.includes(key)) return
    switch (key) {
      case 'w':
        this.velocity.z -= 1.0
        break
      case 's':
        this.velocity.z += 1.0
        break
      case 'a':
        this.velocity.x -= 1.0
        break
      case 'd':
        this.velocity.x += 1.0
        break
      default:
        return
    }
    event.stopPropagation()
    this.keysPressed.push(key)
    if (!this.keyboardMovement) {
      this.keyboardMovement = true
      this.prevVelocityIntegrationTime = performance.now()
      const animationFrame = () => {
        this.integrateVelocityChange(event)
        if (this.keyboardMovement) {
          window.requestAnimationFrame(animationFrame)
        }
      }
      window.requestAnimationFrame(animationFrame)
    }
  }

  /**
   * Invoked when the user releases a key on the keyboard.
   *
   * @param event - The event that occurs.
   */
  onKeyUp(event: KeyboardEvent): void {
    const key = event.key.toLowerCase()
    if (!this.keysPressed.includes(key)) return
    switch (key) {
      case 'w':
        this.velocity.z += 1.0
        break
      case 's':
        this.velocity.z -= 1.0
        break
      case 'a':
        this.velocity.x += 1.0
        break
      case 'd':
        this.velocity.x -= 1.0
        break
      default:
        return
    }
    event.stopPropagation()
    const keyIndex = this.keysPressed.indexOf(key)
    this.keysPressed.splice(keyIndex, 1)
    if (this.keysPressed.length == 0) this.keyboardMovement = false
  }

  // ///////////////////////////////////
  // Touch controls

  /**
   * The __startTouch method.
   * @param touch - The touch value.
   * @private
   */
  __startTouch(touch: Touch): void {
    this.ongoingTouches[touch.identifier] = {
      identifier: touch.identifier,
      pos: new Vec2(touch.clientX, touch.clientY),
    }
  }

  /**
   * The __endTouch method.
   * @param touch - The touch value.
   * @private
   */
  __endTouch(touch: Touch): void {
    // let idx = this.__ongoingTouchIndexById(touch.identifier);
    // this.ongoingTouches.splice(idx, 1); // remove it; we're done
    delete this.ongoingTouches[touch.identifier]
  }

  // Touch events

  /**
   * Invoked when the user touches an element on a touch screen.
   * @private
   * @param event - The touch event that occurs.
   */
  _onTouchStart(event: ZeaTouchEvent): void {
    const touches = event.changedTouches
    for (let i = 0; i < touches.length; i++) {
      this.__startTouch(touches[i])
    }

    this.initDrag(event)
  }

  /**
   * Invoked when the user removes his/her finger from the touch pad.
   *
   * @param event - The touch event that occurs.
   */
  onTouchEnd(event: ZeaTouchEvent): void {
    event.preventDefault()
    event.stopPropagation()
    const touches = event.changedTouches
    for (let i = 0; i < touches.length; i++) {
      this.__endTouch(touches[i])
    }

    if (Object.keys(this.ongoingTouches).length == 0) this.endDrag(event)
  }

  /**
   * Invoked when the touch event gets interrupted.
   *
   * @param event - The touch event that occurs.
   */
  onTouchCancel(event: ZeaTouchEvent): void {
    event.preventDefault()
    const touches = event.touches
    for (let i = 0; i < touches.length; i++) {
      this.__endTouch(touches[i])
    }
    if (Object.keys(this.ongoingTouches).length == 0) this.endDrag(event)
  }

  /**
   * Returns a dictionary of support manipulation modes.
   *
   * @param event - The touch event that occurs.
   */
  static get MANIPULATION_MODES(): Record<string, number> {
    return MANIPULATION_MODES
  }
}

export { CameraManipulator }
