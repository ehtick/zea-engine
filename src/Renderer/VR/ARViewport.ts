import { Mat4, Xfo, Vec3, Color } from '../../Math/index'
import { XRViewport } from './XRViewport'
import { XRViewChangedEvent } from '../../Utilities/Events/XRViewChangedEvent'
import { StateChangedEvent } from '../../Utilities/Events/StateChangedEvent'
import { XRPoseEvent } from '../../Utilities/Events/XRPoseEvent'
import { ColorRenderState } from '../RenderStates/index'
import { XRPointerEvent } from '../../Utilities/Events/XRPointerEvent'
import { GeomItem } from '../../SceneTree/GeomItem'
import { Disc } from '../../SceneTree/Geometry'
import { FlatSurfaceMaterial } from '../../SceneTree/Materials'

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
class ARViewport extends XRViewport {
  private stageXfoSet = false
  private xrViewerSpace: any
  private xrHitTestSource: any
  public reticle: GeomItem

  /**
   * Create a VR viewport.
   * @param renderer - The renderer value.
   */
  constructor(renderer: any, sessionMode: string) {
    super(renderer, sessionMode)

    const disc = new Disc(0.1, 24)
    const material = new FlatSurfaceMaterial('reticle')
    material.baseColorParam.value = new Color(0.75, 0.75, 0.75, 0.4)
    this.reticle = new GeomItem('reticle', disc, material)

    // Convert Y-Up to Z-Up.
    const xfo = new Xfo()
    // Convert Y-Up to Z-Up.
    xfo.ori.setFromAxisAndAngle(new Vec3(1, 0, 0), Math.PI * 0.5)
    this.reticle.geomOffsetXfoParam.value = xfo

    this.stageTreeItem.addChild(this.reticle)
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
          .requestSession('immersive-ar', { requiredFeatures: ['local', 'hit-test', 'anchors'] })
          .then((session: any) => {
            session.isImmersive = true

            session.addEventListener('end', (event: any) => {
              this.stageTreeItem.setVisible(false)
              this.session = null
              this.emit('presentingChanged', new StateChangedEvent(false))
            })

            this.reticle.setVisible(true)

            const onSelect = (event: any) => {
              const hitTestResults = event.frame.getHitTestResults(this.xrHitTestSource)
              if (hitTestResults.length > 0) {
                const pose = hitTestResults[0].getPose(this.refSpace)

                if (this.reticle.isVisible()) {
                  if (!this.stageXfoSet) {
                    this.stageXfo.tr = this.reticle.globalXfoParam.value.tr.negate()
                    this.setXfo(this.stageXfo)
                    this.stageXfoSet = true
                  } else {
                    const pointerEvent = new XRPointerEvent(
                      this,
                      this.reticle.globalXfoParam.value,
                      event,
                      hitTestResults
                    )
                    this.emit('pointerPressed', pointerEvent)
                  }
                } else {
                  const localXfo = new Xfo()
                  localXfo.setFromMat4(new Mat4(pose.transform.matrix))
                  const pointerEvent = new XRPointerEvent(this, this.stageXfo.multiply(localXfo), event, hitTestResults)
                  this.emit('pointerPressed', pointerEvent)
                }
              }
            }
            session.addEventListener('select', onSelect)

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

              this.startSession()
              resolve()
            }

            // In this sample we want to cast a ray straight out from the viewer's
            // position and render a reticle where it intersects with a real world
            // surface. To do this we first get the viewer space, then create a
            // hitTestSource that tracks it.
            session.requestReferenceSpace('viewer').then((refSpace: any) => {
              this.xrViewerSpace = refSpace
              session.requestHitTestSource({ space: this.xrViewerSpace }).then((hitTestSource: any) => {
                this.xrHitTestSource = hitTestSource
              })
            })
            session.requestReferenceSpace('local').then(onRefSpaceCreated)
          })
          .catch((e: any) => {
            console.warn(e.message)
          })
      }

      startPresenting()
    })
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

    if (this.xrHitTestSource && this.reticle.isVisible()) {
      const hitTestResults = xrFrame.getHitTestResults(this.xrHitTestSource)
      if (hitTestResults.length > 0) {
        const hitPose = hitTestResults[0].getPose(this.refSpace)

        const localXfo = new Xfo()
        localXfo.setFromMat4(new Mat4(hitPose.transform.matrix))
        this.reticle.localXfoParam.value = localXfo
      }
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

    this.viewXfo.setFromMat4(new Mat4(pose.transform.matrix))

    renderstate.viewXfo = this.stageXfo.multiply(this.viewXfo)
    renderstate.cameraMatrix = renderstate.viewXfo.toMat4()
    renderstate.viewScale = this.stageScale
    renderstate.region = this.region
    renderstate.vrPresenting = true // Some rendering is adjusted slightly in VR. e.g. Billboards

    this.draw(renderstate)

    {
      // ///////////////////////
      // Prepare the pointerMove event.
      const event = new XRPoseEvent(this, this.viewXfo)
      if (event.getCapture()) {
        event.getCapture().onPointerMove(event)
        // events are now always sent to the capture item first,
        // but can continue propagating to other items if no call
        // to event.stopPropagation() was made.
      }
      if (this.manipulator && event.propagating) {
        this.manipulator.onPointerMove(event)
      }
    }

    // ///////////////////////
    // Emit a signal for the shared session.

    const viewChangedEvent = new XRViewChangedEvent(renderstate.viewXfo)
    // TODO: better solution than setting members individually?
    viewChangedEvent.viewport = this
    viewChangedEvent.xrviewport = this

    this.emit('viewChanged', viewChangedEvent)

    this.tick++
  }
}

export { ARViewport }
