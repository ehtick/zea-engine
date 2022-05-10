import { SystemDesc } from '../../SystemDesc'
import { Vec3, Mat4, Xfo } from '../../Math/index'
import { BaseTool, TreeItem, VLAAsset } from '../../SceneTree/index'
import { GLBaseViewport } from '../GLBaseViewport'
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
import { ColorRenderState, GeomDataRenderState, RenderState } from '../RenderStates/index'
import { GLRenderer } from '../GLRenderer'

/** This base class supports various XR experiences via spcialized clases such as VRViewport and XRViewport.
 * @extends GLBaseViewport
 */
abstract class XRViewport extends GLBaseViewport {
  protected projectionMatricesUpdated: boolean
  protected stageTreeItem: TreeItem
  protected tick: number
  stageScale: number

  protected viewXfo: Xfo = new Xfo()
  protected stageXfo: Xfo = new Xfo()
  protected invStageXfo: Xfo = new Xfo()
  protected invStageMatrix: Mat4 = new Mat4()
  protected session: any = null

  protected region: Array<number> = []

  protected refSpace: any

  protected projectionMatrices: Array<Mat4> = []
  protected viewMatrices: Array<Mat4> = []
  protected cameraMatrices: Array<Mat4> = []

  protected sessionMode: string = 'immersive-vr'

  /**
   * Create a VR viewport.
   * @param renderer - The renderer value.
   */
  constructor(renderer: any, sessionMode: string) {
    super(renderer)
    this.doubleClickTimeParam.value = 300

    this.sessionMode = sessionMode

    // ////////////////////////////////////////////
    // Viewport params
    this.projectionMatricesUpdated = false

    // ////////////////////////////////////////////
    // Tree

    this.stageTreeItem = new TreeItem('VRStage')
    this.stageTreeItem.setVisible(false)
    this.__renderer.addTreeItem(this.stageTreeItem)

    this.tick = 0

    // ////////////////////////////////////////////
    // Xfos
    const xfo = new Xfo()
    // Convert Y-Up to Z-Up.
    xfo.ori.setFromAxisAndAngle(new Vec3(1, 0, 0), Math.PI * 0.5)
    this.setXfo(xfo) // Reset the stage Xfo.
  }

  getRenderer(): GLRenderer {
    return this.renderer
  }

  /**
   * The getTreeItem method.
   * @return - The return value.
   */
  getTreeItem(): TreeItem {
    return this.stageTreeItem
  }

  /**
   * The getXfo method.
   * @return - The return value.
   */
  getXfo(): Xfo {
    return this.stageXfo
  }

  /**
   * Sets the stage Xfo, which is the Xfo that transforms the user into the world.
   * The local displacement of the user within their volume is applied on top of this Xfo.
   * @param xfo - The xfo value.
   */
  setXfo(xfo: Xfo): void {
    this.stageXfo = xfo
    this.stageTreeItem.globalXfoParam.value = xfo
    this.invStageXfo = xfo.inverse()
    this.invStageMatrix = this.invStageXfo.toMat4()
    this.stageScale = xfo.sc.x
  }

  // //////////////////////////
  // Presenting

  /**
   * The isPresenting method.
   * @return - The return value.
   */
  isPresenting(): boolean {
    return this.session != null
  }

  /**
   * Lanuches the session loop
   */
  protected startSession(): void {
    const onAnimationFrame = (t: any, frame: any) => {
      if (this.session) {
        this.session.requestAnimationFrame(onAnimationFrame)
        this.drawXRFrame(frame)
      }
    }
    this.session.requestAnimationFrame(onAnimationFrame)
  }

  /**
   * The startPresenting method.
   */
  abstract startPresenting(): Promise<void>

  /**
   * The stopPresenting method.
   */
  stopPresenting(): void {
    if (!this.session) return

    this.session.end()
  }

  /**
   * The togglePresenting method.
   */
  togglePresenting(): void {
    if (this.session) this.stopPresenting()
    else this.startPresenting()
  }

  /**
   * The initRenderState method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  initCullingRenderState(renderstate: GeomDataRenderState) {
    renderstate.viewXfo = this.viewXfo
    renderstate.viewScale = 1.0
    renderstate.region = this.region
    renderstate.cameraMatrix = renderstate.viewXfo.toMat4()
    renderstate.viewport = this
    renderstate.viewports = [
      {
        region: this.region,
        viewMatrix: renderstate.cameraMatrix.inverse(),
        isOrthographic: 0,
      },
    ]
  }

  /**
   * The drawXRFrame method.
   * @param xrFrame - The xrFrame value.
   */
  abstract drawXRFrame(xrFrame: any): void
}

export { XRViewport }
