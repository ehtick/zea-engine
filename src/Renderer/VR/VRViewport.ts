import { SystemDesc } from '../../SystemDesc'
import { Vec3, Mat4, Xfo } from '../../Math/index'
import { BaseTool, TreeItem, VLAAsset } from '../../SceneTree/index'
import { XRViewport } from './XRViewport'
import { XRHead } from './XRHead'
import { XRController } from './XRController'
import { XRViewManipulator } from './XRViewManipulator'
import { resourceLoader } from '../../SceneTree/resourceLoader'

// import { XRWebGLLayer } from 'webxr'
import { XRViewChangedEvent } from '../../Utilities/Events/XRViewChangedEvent'
import { ControllerAddedEvent } from '../../Utilities/Events/ControllerAddedEvent'
import { StateChangedEvent } from '../../Utilities/Events/StateChangedEvent'
import { XRControllerEvent } from '../../Utilities/Events/XRControllerEvent'
import { XRPoseEvent } from '../../Utilities/Events/XRPoseEvent'
import { ColorRenderState } from '../RenderStates/index'

/** This Viewport class is used for rendering stereoscopic views to VR controllers using the WebXR api.
 *  When the GLRenderer class detects a valid WebXF capable device is plugged in, this class is automatically
 *  instantiated ready for XR sessions
 *
 * **Events**
 * * **presentingChanged:** Emitted when presenting is started or stopped
 * * **controllerAdded:** Emitted when a new XR controller is detected.
 * * **viewChanged:** Emitted during presentation each time the frame is rendered.
 * * **pointerDoublePressed:** Emitted when the user double clicks with an XR pointer.
 * * **pointerDown:** Emitted when the user presses an XR pointer
 * * **pointerUp:** Emitted when the user releases an XR pointer
 *
 * @extends XRViewport
 */
class VRViewport extends XRViewport {
  private vrAsset?: VLAAsset
  private hmd: string = ''
  private hmdAssetPromise?: Promise<VLAAsset | null>

  private xrhead: XRHead

  private controllersMap: Record<string, XRController>
  public controllers: XRController[]
  private controllerPointerDownTime: number[]

  /**
   * Create a VR viewport.
   * @param renderer - The renderer value.
   */
  constructor(renderer: any, sessionMode: string) {
    super(renderer, sessionMode)
    this.xrhead = new XRHead(this, this.stageTreeItem)

    this.controllersMap = {}
    this.controllers = []
    this.controllerPointerDownTime = []

    this.setManipulator(new XRViewManipulator(this))
  }

  /**
   * The getAsset method.
   * @return - The return value.
   */
  getAsset(): VLAAsset {
    return this.vrAsset
  }

  /**
   * The getVRHead method.
   * @return - The return value.
   */
  getVRHead(): XRHead {
    return this.xrhead
  }

  /**
   * The getControllers method.
   * @return - The return value.
   */
  getControllers(): XRController[] {
    return this.controllers
  }

  /**
   * Returns the name of the HMD being used.
   * @return - The return value.
   */
  getHMDName(): string {
    return this.hmd
  }

  /**
   * The loadHMDResources method.
   * @return - The return value.
   */
  loadHMDResources(): Promise<VLAAsset | null> {
    if (SystemDesc.isMobileDevice) {
      return Promise.resolve(null)
    }
    // If the HMD has changed, reset it.
    let hmd = localStorage.getItem('ZeaEngine_XRDevice')
    if (!hmd) {
      hmd = 'Oculus'
      localStorage.setItem('ZeaEngine_XRDevice', hmd)
    }
    if (this.hmd != hmd) {
      this.hmdAssetPromise = undefined
    } else if (this.hmdAssetPromise) return this.hmdAssetPromise

    this.hmd = hmd
    this.hmdAssetPromise = new Promise((resolve, reject) => {
      // ////////////////////////////////////////////
      // Resources
      {
        let hmdAssetId
        switch (hmd) {
          case 'Vive':
            hmdAssetId = 'ZeaEngine/Vive.vla'
            break
          case 'Oculus':
            hmdAssetId = 'ZeaEngine/Oculus.vla'
            break
          default:
            hmdAssetId = 'ZeaEngine/Vive.vla'
            break
        }
        if (!resourceLoader.commonResources[hmdAssetId]) {
          // Cache the asset so if an avatar needs to display,
          // it can use the same asset.
          const asset = new VLAAsset(hmdAssetId)
          asset.load(resourceLoader.systemUrls[hmdAssetId])
          resourceLoader.commonResources[hmdAssetId] = asset
        }
        this.vrAsset = <VLAAsset>resourceLoader.getCommonResource(hmdAssetId)
        const bind = () => {
          const materialLibrary = this.vrAsset!.getMaterialLibrary()
          const materialNames = materialLibrary.getMaterialNames()
          for (const name of materialNames) {
            const material = materialLibrary.getMaterial(name)
            if (material) {
              material.setShaderName('SimpleSurfaceShader')
            }
          }
          this.vrAsset!.traverse((item: any) => {
            item.setSelectable(false)
          })
          resolve(this.vrAsset!)
        }
        if (this.vrAsset.isLoaded()) bind()
        else this.vrAsset.once('loaded', bind)
      }
    })
    return this.hmdAssetPromise
  }

  /**
   * The startPresenting method.
   */
  startPresenting(): Promise<void> {
    return new Promise((resolve, reject) => {
      // https://github.com/immersive-web/webxr/blob/master/explainer.md

      const startPresenting = () => {
        // @ts-ignore
        navigator.xr
          .requestSession('immersive-vr', {
            // Our standing experience will require at least a local-floor
            // reference space (which will be available even on 3DoF device)
            // but can optionally make use of bounded-floor reference spaces
            // when available.
            requiredFeatures: ['local-floor'],
            optionalFeatures: ['bounded-floor'],
          })
          .then((session: any) => {
            session.isImmersive = true
            const viewport = this.__renderer.getViewport()
            if (viewport) {
              const camera = viewport.getCamera()
              const cameraXfo = camera.globalXfoParam.value

              // Convert Y-Up to Z-Up.
              const stageXfo = new Xfo()
              stageXfo.tr = cameraXfo.tr.clone()
              stageXfo.tr.z -= 1.3 // assume sitting, and move the floor down a bit

              const dir = cameraXfo.ori.getZaxis()
              dir.z = 0
              dir.normalizeInPlace()
              stageXfo.ori.setFromDirectionAndUpvector(dir, new Vec3(0, 0, 1))
              this.setXfo(stageXfo)
            }

            session.addEventListener('end', (event: any) => {
              this.stageTreeItem.setVisible(false)
              this.session = null
              this.emit('presentingChanged', new StateChangedEvent(false))
            })

            const onSelectStart = (ev: any) => {
              const controller = this.controllersMap[ev.inputSource.handedness]
              if (controller) {
                controller.buttonPressed = true
                this.onPointerDown(new XRControllerEvent(this, controller, 0, 1))
              }
            }
            const onSelectEnd = (ev: any) => {
              const controller = this.controllersMap[ev.inputSource.handedness]
              if (controller) {
                controller.buttonPressed = false
                this.onPointerUp(new XRControllerEvent(this, controller, 0, 0))
              }
            }

            const createVRController = (inputSource: any) => {
              console.log('creating controller:', inputSource.handedness, inputSource.profiles)
              const id = this.controllers.length
              const controller = new XRController(this, inputSource, id)
              this.controllersMap[inputSource.handedness] = controller
              this.controllers[id] = controller

              const event = new ControllerAddedEvent(controller)
              this.emit('controllerAdded', event)
              return controller
            }
            const onInputSourcesChange = (event: Record<string, any>) => {
              // As input sources are connected if they are tracked-pointer devices
              // look up which meshes should be associated with their profile and
              // load as the controller model for that hand.
              for (const inputSource of event.added) {
                if (inputSource.profiles.length == 0) continue
                if (inputSource.profiles[0] == 'generic-touchscreen') {
                } else {
                  createVRController(inputSource)
                }
              }
            }
            session.addEventListener('selectstart', onSelectStart)
            session.addEventListener('selectend', onSelectEnd)
            session.addEventListener('inputsourceschange', onInputSourcesChange)

            this.session = session

            // ////////////////////////////
            // @ts-ignore - Note: We could install the webxr type definitions and remove this ignore.
            const glLayer = new XRWebGLLayer(session, <WebGL2RenderingContext>this.__gl)
            session.updateRenderState({
              baseLayer: glLayer,
            })

            this.__width = glLayer.framebufferWidth
            this.__height = glLayer.framebufferHeight
            this.region = [0, 0, this.__width, this.__height]
            this.depthRange = [session.renderState.depthNear, session.renderState.depthFar]
            this.resizeRenderTargets(this.__width, this.__height)

            // ////////////////////////////

            // eslint-disable-next-line require-jsdoc
            const onRefSpaceCreated = (refSpace: any) => {
              this.refSpace = refSpace
              this.stageTreeItem.setVisible(true)
              this.emit('presentingChanged', new StateChangedEvent(true))

              // In VR, we need to load the HMD so we can see
              // our controllers.
              this.loadHMDResources().then(() => {
                this.startSession()
                resolve()
              })
            }

            // Attempt to get a 'bounded-floor' reference space, which will align
            // the user's physical floor with Y=0 and provide boundaries that
            // indicate where the user can safely walk.
            session
              .requestReferenceSpace('bounded-floor')
              .catch((e: any) => {
                // If a bounded reference space isn't supported, fall back to a
                // local-floor reference space. This still provides a floor-relative
                // space and will always be supported for immersive sessions. It
                // will not, however, provide boundaries and generally expects the
                // user to stand in one place. If the device doesn't have a way of
                // determining the floor level (for example, with a 3DoF device)
                // then it will return an emulated local-floor space, where the view
                // is translated up by a static height so that the scene still
                // renders in approximately the right place.
                console.log('Falling back to local-floor reference space')
                session.requestReferenceSpace('local-floor').then(onRefSpaceCreated)
              })
              .then(onRefSpaceCreated)
              .catch((e: any) => {
                console.warn(e.message)
                reject(new Error('Unable to start XR Session:' + e.message))
              })
          })
          .catch((e: any) => {
            console.warn(e.message)
          })
      }

      startPresenting()
    })
  }

  // //////////////////////////
  // Controllers

  /**
   * The updateControllers method.
   * @param xrFrame - The xrFrame value.
   * @param event - The pose changed event object that will be emitted for observers such as collab.
   */
  updateControllers(xrFrame: any): void {
    const inputSources = this.session.inputSources
    for (let i = 0; i < inputSources.length; i++) {
      const inputSource = inputSources[i]

      // Note: This is to avoid a bug/feature in WebXR where initially the
      // controllers have no handedness specified, then suddenly
      // get handedness. We need the handedness before we can setup the controller.
      if (inputSource.profiles.length == 0) return
      if (!this.controllers[i]) {
        console.warn('Missing controller')
        continue
        // this.__createController(i, inputSource)
      }
      this.controllers[i].updatePose(this.refSpace, xrFrame, inputSource)
    }
  }

  /**
   * The drawXRFrame method.
   * @param xrFrame - The xrFrame value.
   */
  drawXRFrame(xrFrame: any): void {
    const session = xrFrame.session

    const layer = session.renderState.baseLayer

    const pose = xrFrame.getViewerPose(this.refSpace)
    if (!pose) {
      // No pose available during XR present
      // Note: before the Headset is put on the pose is missing, or after it is taken off
      return
    }

    const views = pose.views

    if (!this.projectionMatricesUpdated) {
      this.projectionMatrices = []
      this.viewMatrices = []
      this.cameraMatrices = []
      for (let i = 0; i < views.length; i++) {
        const view = views[i]
        const projMat = new Mat4()
        projMat.setDataArray(view.projectionMatrix)
        this.projectionMatrices[i] = projMat
        this.viewMatrices[i] = new Mat4()
        this.cameraMatrices[i] = new Mat4()
      }
      this.projectionMatricesUpdated = true
    }

    const gl = this.__renderer.gl

    this.depthRange = [session.renderState.depthNear, session.renderState.depthFar] // TODO: check if this changes during session

    const renderstate = new ColorRenderState(this.__renderer.gl)

    renderstate.boundRendertarget = layer.framebuffer
    renderstate.region = this.region
    renderstate.viewport = this
    renderstate.xrviewport = this
    renderstate.viewports = []

    // renderstate.boundRendertarget.vrfbo = true;

    for (let i = 0; i < views.length; i++) {
      const view = views[i]
      this.viewMatrices[i].setDataArray(view.transform.inverse.matrix)

      // Note: the stage matrix
      this.viewMatrices[i].multiplyInPlace(this.invStageMatrix)
      // this.cameraMatrices[i].setDataArray(view.transform.matrix);

      const vp = layer.getViewport(view)
      renderstate.viewports.push({
        viewMatrix: this.viewMatrices[i],
        projectionMatrix: this.projectionMatrices[i],
        region: [vp.x, vp.y, vp.width, vp.height],
        isOrthographic: 0,
      })
    }

    this.xrhead.update(pose)
    const viewXfo = this.xrhead.getTreeItem().globalXfoParam.value
    this.viewXfo = viewXfo
    renderstate.viewXfo = viewXfo
    renderstate.cameraMatrix = viewXfo.toMat4() // renderstate.viewXfo.toMat4()
    renderstate.viewScale = this.stageScale
    renderstate.region = this.region
    renderstate.vrPresenting = true // Some rendering is adjusted slightly in VR. e.g. Billboards

    this.updateControllers(xrFrame)

    let col = this.backgroundColorParam.value.asArray()
    gl.clearColor(col[0], col[1], col[2], col[3])
    gl.colorMask(true, true, true, true)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    this.draw(renderstate)

    // ///////////////////////
    // Prepare the pointerMove event.
    const event = new XRPoseEvent(this, this.viewXfo, this.controllers)
    if (event.getCapture()) {
      event.getCapture().onPointerMove(event)
      // events are now always sent to the capture item first,
      // but can continue propagating to other items if no call
      // to event.stopPropagation() was made.
    }
    if (this.manipulator && event.propagating) {
      this.manipulator.onPointerMove(event)
    }

    // ///////////////////////
    // Emit a signal for the shared session.

    const viewChangedEvent = new XRViewChangedEvent(renderstate.viewXfo)
    // TODO: better solution than setting members individually?
    viewChangedEvent.hmd = this.hmd
    viewChangedEvent.controllers = this.controllers
    viewChangedEvent.viewport = this
    viewChangedEvent.xrviewport = this

    this.emit('viewChanged', viewChangedEvent)
    this.tick++
  }

  /**
   * Handler of the `pointerdown` event fired when the pointer device is initially pressed.
   *
   * @param event - The DOM event produced by a pointer
   */
  onPointerDown(event: XRControllerEvent): void {
    event.intersectionData = event.controller.getGeomItemAtTip()
    event.pointerRay = event.controller.pointerRay

    // //////////////////////////////////////
    // Double Tap
    // First check for double tap handlers.
    // If the manipulator or the viewport handle that
    // then skip the 'pointerDown' event.
    const downTime = Date.now()
    if (downTime - this.controllerPointerDownTime[event.controller.id] < this.doubleClickTimeParam.value) {
      this.emit('pointerDoublePressed', event)
      if (!event.propagating) return

      if (this.manipulator) {
        this.manipulator.onPointerDoublePress(event)
        if (!event.propagating) return
      }
    }
    this.controllerPointerDownTime[event.controller.id] = downTime

    // //////////////////////////////////////

    if (event.getCapture()) {
      event.getCapture().onPointerDown(event)
      // events are now always sent to the capture item first,
      // but can continue propagating to other items if no call
      // to event.stopPropagation() was made.
      if (!event.propagating) return
    }

    if (event.intersectionData != undefined) {
      event.intersectionData.geomItem.onPointerDown(event)
      if (!event.propagating) return
    }

    this.emit('pointerDown', event)
    if (!event.propagating) return

    if (this.manipulator) {
      this.manipulator.onPointerDown(event)
    }
  }

  /**
   * Causes an event to occur when a user releases a mouse button over a element.
   *
   * @param event - The event that occurs.
   */
  onPointerUp(event: XRControllerEvent): void {
    this.controllerPointerDownTime[event.controller.id] = 0
    event.pointerRay = event.controller.pointerRay

    if (event.getCapture()) {
      event.getCapture().onPointerUp(event)
      // events are now always sent to the capture item first,
      // but can continue propagating to other items if no call
      // to event.stopPropagation() was made.
      if (!event.propagating) return
    }

    event.intersectionData = event.controller.getGeomItemAtTip()
    if (event.intersectionData != undefined) {
      event.intersectionData.geomItem.onPointerUp(event)
      if (!event.propagating) return
    }

    this.emit('pointerUp', event)
    if (!event.propagating) return

    if (this.manipulator) {
      this.manipulator.onPointerUp(event)

      if (!event.propagating) return
    }
  }
}

export { VRViewport }
