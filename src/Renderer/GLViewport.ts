/* eslint-disable guard-for-in */
import { Vec2, Vec3, Ray, Mat4, Xfo, Color, Vec4 } from '../Math/index'
import { Camera, GeomItem, TreeItem } from '../SceneTree/index'
import { GLBaseViewport } from './GLBaseViewport'
import { GLFbo } from './GLFbo'
import { GLTexture2D } from './GLTexture2D'
import { CameraManipulator } from '../SceneTree/index'
import { GLRenderer } from './GLRenderer'
import { ResizedEvent } from '../Utilities/Events/ResizedEvent'
import { ViewChangedEvent } from '../Utilities/Events/ViewChangedEvent'
import { POINTER_TYPES, ZeaPointerEvent } from '../Utilities/Events/ZeaPointerEvent'
import { IntersectionData } from '../Utilities/IntersectionData'
import { KeyboardEvent } from '../Utilities/Events/KeyboardEvent'
import { ZeaWheelEvent } from '../Utilities/Events/ZeaWheelEvent'
import { ZeaTouchEvent } from '../Utilities/Events/ZeaTouchEvent'
import { ZeaMouseEvent } from '../Utilities/Events/ZeaMouseEvent'
import { ZeaUIEvent } from '../Utilities/Events/ZeaUIEvent'
import { GeomDataRenderState, RenderState, ColorRenderState } from './types/renderer'

let activeViewport: GLViewport = null
/**
 * Class representing a GL viewport.
 *
 * **Events**
 * * **resized:** Emitted when the GLViewport resizes
 * * **updated:** Emitted when the GLViewport needs updating. The Renderer will trigger a redraw when this occurs.
 * * **viewChanged:** Emitted when the view changes. Usually caused by the camera moving.
 * * **pointerDoublePressed:** Emitted when the user double clicks with the mouse, or double taps in the viewport.
 * * **pointerDown:** Emitted when the user presses a pointer
 * * **pointerUp:** Emitted when the user releases a pointer
 * * **pointerOverGeom:** Emitted when the pointer is moved over a geometry
 * * **pointerLeaveGeom:** Emitted when the pointer is moved off a geometry
 * * **pointerMove:** Emitted when the pointer is moved
 * * **pointerEnter:** Emitted when the pointer is moved into thg viewport
 * * **pointerLeave:** Emitted when the mouse leaves the viewport.
 * * **keyDown:** Emitted when the user presses a key on the keyboard
 * * **keyUp:** Emitted when the user releases a key on the keyboard
 * * **touchCancel:** Emitted when the user cancels a touch interaction
 *
 * @extends GLBaseViewport
 */
class GLViewport extends GLBaseViewport {
  protected __name: string
  protected __projectionMatrix: Mat4
  protected __frustumDim: Vec2
  protected __camera: Camera

  protected __bl: Vec2
  protected __tr: Vec2
  protected __prevDownTime: number
  protected __geomDataBuffer: GLTexture2D
  protected __geomDataBufferSizeFactor: number
  protected __geomDataBufferFbo: GLFbo
  protected debugGeomShader: boolean
  protected debugHighlightedGeomsBuffer: boolean = false

  protected __x: number = 0
  protected __y: number = 0
  protected region: Array<number> = [0, 0, 0, 0]

  protected __cameraXfo: Xfo = new Xfo()
  protected __cameraMat: Mat4 = new Mat4()
  protected __viewMat: Mat4 = new Mat4()

  protected __geomDataBufferInvalid: boolean = true
  protected __screenPos: Vec2 | null = null
  protected __intersectionData: IntersectionData

  protected pointerOverItem: TreeItem

  /**
   * Create a GL viewport.
   * @param renderer - The renderer value.
   * @param name - The name value.
   * @param width - The width of the viewport
   * @param height - The height of the viewport
   */
  constructor(renderer: GLRenderer, name: string, width: number, height: number) {
    super(renderer)
    this.__name = name
    this.__projectionMatrix = new Mat4()
    this.__frustumDim = new Vec2()

    // Layout coords, x:[0..1], y:[0..1]
    this.__bl = new Vec2(0, 0)
    this.__tr = new Vec2(1, 1)

    this.__prevDownTime = 0

    // //////////////////////////////////
    // Setup GeomData Fbo
    this.__geomDataBufferSizeFactor = 1

    this.debugGeomShader = false

    const gl = this.__renderer.gl
    this.__geomDataBuffer = new GLTexture2D(gl, {
      type: renderer.floatGeomBuffer ? 'FLOAT' : 'UNSIGNED_BYTE',
      format: 'RGBA',
      filter: 'NEAREST',
      width: width <= 1 ? 1 : Math.floor(width / this.__geomDataBufferSizeFactor),
      height: height <= 1 ? 1 : Math.floor(height / this.__geomDataBufferSizeFactor),
    })
    this.__geomDataBufferFbo = new GLFbo(gl, this.__geomDataBuffer, true)
    this.__geomDataBufferFbo.setClearColor(new Color(0, 0, 0, 0))

    // //////////////////////////////////
    // Setup Camera Manipulator

    // Each user has a separate camera, and so the default
    //  camera cannot be part of the scene.
    this.__camera = new Camera('DefaultCamera')
    this.setCamera(this.__camera)
    this.setManipulator(new CameraManipulator({ renderer }))

    this.resize(width, height)
  }

  /**
   * The getBl method.
   * @return - The return value.
   */
  getBl(): Vec2 {
    return this.__bl
  }

  /**
   * The setBl method.
   * @param bl - The bl value.
   */
  setBl(bl: number): void {
    this.__bl.x = bl
    this.__bl.y = bl // TODO: check. Before this method was 1 line, implying __bl is a number type not a vec2
    this.resize(this.__canvasWidth, this.__canvasHeight)
  }

  /**
   * The getTr method.
   * @return - The return value.
   */
  getTr(): Vec2 {
    return this.__tr
  }

  /**
   * The setTr method.
   * @param tr - The tr value.
   */
  setTr(tr: number): void {
    this.__tr.x = tr
    this.__tr.y = tr // TODO: check. Before this method was 1 line, implying __bl is a number type not a vec2
    this.resize(this.__canvasWidth, this.__canvasHeight)
  }

  /**
   * The getPosX method.
   * @return - The return value.
   */
  getPosX(): number {
    return this.__x
  }

  /**
   * The getPosY method.
   * @return - The return value.
   */
  getPosY(): number {
    return this.__y
  }

  /**
   * Dynamically resizes viewport.
   *
   * @param canvasWidth - The canvasWidth value.
   * @param canvasHeight - The canvasHeight value.
   */
  resize(canvasWidth: number, canvasHeight: number): void {
    if (this.__canvasWidth == canvasWidth && this.__canvasHeight == canvasHeight) return
    this.__canvasWidth = canvasWidth
    this.__canvasHeight = canvasHeight
    this.__x = canvasWidth * this.__bl.x
    this.__y = canvasWidth * this.__bl.y
    this.__width = canvasWidth * this.__tr.x - canvasWidth * this.__bl.x
    this.__height = canvasHeight * this.__tr.y - canvasHeight * this.__bl.y
    this.region = [this.__x, this.__y, this.__width, this.__height]

    this.resizeRenderTargets(this.__width, this.__height)
    if (this.__camera) this.__updateProjectionMatrix()
    const event = new ResizedEvent(this.__width, this.__height)
    this.emit('resized', event)
  }

  /**
   * Resize any offscreen render targets.
   * > Note: Values ,ay not be the entire canvas with if multiple viewports exists.
   * @param width - The width used by this viewport.
   * @param height - The height  used by this viewport.
   */
  resizeRenderTargets(width: number, height: number): void {
    super.resizeRenderTargets(width, height)

    if (this.__geomDataBufferFbo) {
      this.__geomDataBuffer.resize(
        Math.floor(this.__width / this.__geomDataBufferSizeFactor),
        Math.floor(this.__height / this.__geomDataBufferSizeFactor)
      )
      this.renderGeomDataFbo()
    }
  }

  /**
   * Returns current camera object
   *
   * @return - The return value.
   */
  getCamera(): Camera {
    return this.__camera
  }

  /**
   * Sets current camera object
   *
   * @param camera - The camera value.
   */
  setCamera(camera: Camera): void {
    this.__camera = camera
    this.depthRange = [this.__camera.getNear(), this.__camera.getFar()]
    const globalXfoParam = camera.globalXfoParam
    const getCameraParams = () => {
      this.__cameraXfo = globalXfoParam.value
      this.__cameraMat = this.__cameraXfo.toMat4()
      this.__viewMat = this.__cameraMat.inverse()
    }
    getCameraParams()
    globalXfoParam!.on('valueChanged', () => {
      getCameraParams()
      this.invalidateGeomDataBuffer()
      this.emit('updated')

      const event = new ViewChangedEvent('CameraAndPointer', this.__cameraXfo)
      this.emit('viewChanged', event)
    })
    this.__camera.on('projectionParamChanged', () => {
      this.__updateProjectionMatrix()
      this.depthRange = [this.__camera.getNear(), this.__camera.getFar()]
      this.emit('updated')
    })

    this.__updateProjectionMatrix()
  }

  // eslint-disable-next-line require-jsdoc
  __updateProjectionMatrix() {
    const aspect = this.__width / this.__height
    this.__camera.updateProjectionMatrix(this.__projectionMatrix, aspect)

    const frustumH = Math.tan(this.__camera.getFov() / 2.0) * this.__camera.getNear() * 2.0
    const frustumW = frustumH * aspect
    this.__frustumDim.set(frustumW, frustumH)
  }

  /**
   * The getProjectionMatrix method.
   * @return - The return projection matrix for the viewport.
   */
  getProjectionMatrix(): Mat4 {
    return this.__projectionMatrix
  }

  /**
   * The getProjectionMatrix method.
   * @return - The return projection matrix for the viewport.
   */
  getViewMatrix(): Mat4 {
    return this.__viewMat
  }

  /**
   * Calculates a new camera position that frames all the items passed in `treeItems` array, moving
   * the camera to a point where we can see all of them.
   * > See Camera.frameView
   * @param treeItems - The array of TreeItem.
   */
  frameView(treeItems?: TreeItem[]): void {
    if (this.__width > 0 && this.__height > 0) {
      this.__camera.frameView(this, treeItems)
    } else {
      // Sometimes thew renderer is not yet setup, so here we
      // wait till the window is resized and try again.
      this.once('resized', () => this.frameView())
    }
  }

  /**
   * Compute the screen space position of an item from a world space coordinate.
   * @param screenPos - The screen position.
   * @return - The return value.
   */
  calcScreenPosFromWorldPos(worldPos: Vec3): Vec2 {
    const viewProjMatrix = this.__projectionMatrix.multiply(this.__viewMat)
    const projSpacePos = viewProjMatrix.transformVec4(new Vec4(worldPos.x, worldPos.y, worldPos.z, 1))
    // perspective divide
    projSpacePos.x /= projSpacePos.w
    projSpacePos.y /= projSpacePos.w
    return new Vec2((projSpacePos.x * 0.5 + 0.5) * this.__width, (projSpacePos.y * -0.5 + 0.5) * this.__height)
  }

  /**
   * Compute a ray into the scene based on a mouse coordinate.
   * @param screenPos - The screen position.
   * @return - The return value.
   */
  calcRayFromScreenPos(screenPos: Vec2): Ray {
    // Convert the raster coordinates to screen space ([0,{w|h}] -> [-1,1]
    // - Note: The raster vertical is inverted wrt OGL screenspace Y

    const topy = this.__canvasHeight * (1.0 - this.__tr.y)
    let sx = (screenPos.x - this.__x) / this.__width
    let sy = (screenPos.y - topy) / this.__height

    sx = sx * 2.0 - 1.0
    sy = sy * 2.0 - 1.0

    // Transform the origin from camera local to world space
    const cameraMat = this.__cameraMat

    const projInv = this.__projectionMatrix.inverse()
    if (projInv == null) {
      // Sometimes this happens, not sure why...
      console.warn(`Unable to generate Ray from screen pos:${screenPos.toString()} in region ${this.region}`)
      return new Ray()
    }

    let rayStart
    let rayDirection
    if (this.__camera.isOrthographic()) {
      // Orthographic projections.
      const cameraSpaceOffset = projInv.transformVec3(new Vec3(sx, -sy, -1.0))
      cameraSpaceOffset.z = 0
      rayStart = cameraMat.transformVec3(cameraSpaceOffset)
      rayDirection = new Vec3(0.0, 0.0, -1.0)
    } else {
      rayStart = cameraMat.translation
      // Get the projected window coordinate on the near plane
      // See http://www.songho.ca/opengl/gl_projectionmatrix.html
      // for details.
      rayDirection = projInv.transformVec3(new Vec3(sx, -sy, -1.0))
    }
    // And from projection space to camera local.
    // - We nuke the translation part since we're transforming a vector.
    rayDirection = cameraMat.rotateVec3(rayDirection).normalize()
    return new Ray(rayStart, rayDirection)
  }

  // //////////////////////////
  // GeomData

  /**
   * Renders the scene geometry to the viewport's geom data buffer
   * in preparation for mouse picking.
   */
  renderGeomDataFbo(): void {
    if (this.__geomDataBufferFbo) {
      const geomDataRenderstate: GeomDataRenderState = <GeomDataRenderState>{}
      this.__initRenderState(geomDataRenderstate)

      // Note: GLLinesPass binds a new Fbo, but shares this ones depth buffer.
      geomDataRenderstate.geomDataFbo = this.__geomDataBufferFbo

      this.__geomDataBufferFbo.bindAndClear(geomDataRenderstate)

      this.__renderer.drawSceneGeomData(geomDataRenderstate)
      this.__geomDataBufferInvalid = false
      this.__geomDataBufferFbo.unbind()
    }
  }

  /**
   * The invalidateGeomDataBuffer method.
   */
  invalidateGeomDataBuffer(): void {
    this.__geomDataBufferInvalid = true
  }

  /**
   * The getGeomDataAtPos method.
   * @param screenPos - The screen position.
   * @param pointerRay - The pointerRay value.
   * @return - The return value.
   */
  getGeomDataAtPos(screenPos: Vec2, pointerRay: Ray | undefined): IntersectionData | null {
    if (this.__geomDataBufferFbo) {
      if (this.__geomDataBufferInvalid) {
        this.renderGeomDataFbo()
        this.__screenPos = null
      }

      // Cache the intersection tests result so subsequent queries will return the same value.
      // Note: every new mouse event will generate a new pointerPos value, so the cache
      // is only valid for a given event propagation, and for that exact pointerPos value.
      if (screenPos === this.__screenPos) {
        return this.__intersectionData
      }
      this.__screenPos = screenPos
      this.__intersectionData = null

      const gl = this.__renderer.gl
      gl.finish()

      this.__geomDataBufferFbo.bindForReading()

      // const logGeomData = ()=>{
      //     console.log("logGeomData :[" + this.__geomDataBuffer.width +","+ this.__geomDataBuffer.height + "]")
      //     const pixels = new Float32Array(this.__geomDataBuffer.width * 4);
      //     for(let i=0; i<this.__geomDataBuffer.height; i++){
      //       gl.readPixels(0, i, this.__geomDataBuffer.width, 1, gl.RGBA, gl.FLOAT, pixels);
      //         for(let j=0; j<this.__geomDataBuffer.width; j++){
      //             const geomData = pixels.subarray(j*4, (j+1)*4);
      //             if (geomData[0] != 0 || geomData[1] != 0){
      //                 console.log(j, i)
      //                 break; // Only log the left border pixels.
      //             }
      //         }
      //       // console.log(pixels);
      //     }
      // }
      // logGeomData();
      // console.log("getGeomDataAtPos:", screenPos.toString(), screenPos.x,this.__width)

      // Allocate a 1 pixel block and read from the GeomData buffer.
      const bufferWidth = this.__geomDataBufferFbo.width
      const bufferHeight = this.__geomDataBufferFbo.height
      const x = Math.floor(screenPos.x * (bufferWidth / this.__width))
      const y = Math.floor(screenPos.y * (bufferHeight / this.__height))
      // const x = Math.floor(screenPos.x / this.__geomDataBufferSizeFactor)
      // const y = Math.floor(screenPos.y / this.__geomDataBufferSizeFactor)
      let passId
      let geomData: Float32Array | Uint8Array
      if (this.__renderer.floatGeomBuffer) {
        geomData = new Float32Array(4)
        gl.readPixels(x, bufferHeight - y - 1, 1, 1, gl.RGBA, gl.FLOAT, geomData)
        if (geomData[3] == 0) return null

        // Mask the pass id to be only the first 6 bits of the integer.
        passId = Math.round(geomData[0]) & (64 - 1)
      } else {
        geomData = new Uint8Array(4)
        gl.readPixels(x, bufferHeight - y - 1, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, geomData)
        gl.bindFramebuffer(gl.FRAMEBUFFER, null)
        if (geomData[0] == 0 && geomData[1] == 0) return undefined
        passId = Math.floor(geomData[1] / 32)
      }
      this.__geomDataBufferFbo.unbind()
      const pass = this.__renderer.getPass(passId)
      if (!pass) {
        console.warn('Geom data buffer returns invalid pass id:', passId)
        return null
      }

      const geomItemAndDist = pass.getGeomItemAndDist(geomData)

      if (geomItemAndDist) {
        if (!geomItemAndDist.geomItem.isSelectable()) return null

        if (!pointerRay) pointerRay = this.calcRayFromScreenPos(screenPos)
        const intersectionPos = pointerRay.start.add(pointerRay.dir.scale(geomItemAndDist.dist))
        this.__intersectionData = new IntersectionData(
          screenPos,
          pointerRay,
          intersectionPos,
          geomData,
          geomItemAndDist
        )
      }

      return this.__intersectionData
    }

    return null
  }

  /**
   * getGeomItemsInRect
   * Gathers all the geoms renders in a given rectangle of the viewport.
   * @param tl - The top left value of the rectangle.
   * @param br - The bottom right corner of the rectangle.
   * @return - The return value.
   */
  getGeomItemsInRect(tl: Vec2, br: Vec2): Set<TreeItem> {
    // TODO: Use a Math.Rect instead
    if (this.__geomDataBufferFbo) {
      const gl = this.__renderer.gl
      gl.finish()
      // Allocate a pixel block.
      const bufferWidth = this.__geomDataBufferFbo.width
      const bufferHeight = this.__geomDataBufferFbo.height
      const widthFactor = bufferWidth / this.__width
      const heightFactor = bufferHeight / this.__height
      const tlX = Math.round(tl.x * widthFactor)
      const tlY = Math.round(tl.y * heightFactor)
      const brX = Math.round(br.x * widthFactor)
      const brY = Math.round(br.y * heightFactor)

      const rectBottom = Math.round(bufferHeight - brY)
      const rectLeft = Math.round(tlX)
      const rectWidth = Math.round(brX - tlX)
      const rectHeight = Math.round(brY - tlY)
      const numPixels = rectWidth * rectHeight

      this.__geomDataBufferFbo.bindForReading()

      let geomDatas
      if (this.__renderer.floatGeomBuffer) {
        geomDatas = new Float32Array(4 * numPixels)
        gl.readPixels(rectLeft, rectBottom, rectWidth, rectHeight, gl.RGBA, gl.FLOAT, geomDatas)
      } else {
        geomDatas = new Uint8Array(4 * numPixels)
        gl.readPixels(rectLeft, rectBottom, rectWidth, rectHeight, gl.RGBA, gl.UNSIGNED_BYTE, geomDatas)
      }

      gl.bindFramebuffer(gl.FRAMEBUFFER, null)

      const geomItems: Set<TreeItem> = new Set()
      for (let i = 0; i < numPixels; i++) {
        let passId
        const geomData = geomDatas.subarray(i * 4, (i + 1) * 4)
        if (this.__renderer.floatGeomBuffer) {
          if (geomData[3] == 0) continue
          passId = Math.round(geomData[0])
        } else {
          if (geomData[0] == 0 && geomData[1] == 0) continue
          passId = Math.floor(geomData[1] / 64)
        }

        const geomItemAndDist = this.__renderer.getPass(passId)?.getGeomItemAndDist(geomData)
        if (geomItemAndDist) {
          if (!geomItemAndDist.geomItem.isSelectable()) continue

          geomItems.add(geomItemAndDist.geomItem)
        }
      }
      return geomItems
    }
    return new Set()
  }

  // ///////////////////////////
  // Events
  /**
   * Calculates the event coordinates relative to the viewport.
   * There could be multiple viewports connected to the current renderer.
   *
   * @param rendererX - The rendererX value
   * @param rendererY - The rendererY value
   * @return - Returns a new Vec2.
   * @private
   */
  __getPointerPos(rendererX: number, rendererY: number): Vec2 {
    return new Vec2(rendererX - this.getPosX(), rendererY - this.getPosY())
  }

  /**
   * Prepares pointer event by adding properties of the engine to it.
   *
   * @param event - The event that occurs in the canvas
   * @private
   */
  prepareUIEvent(event: ZeaUIEvent): void {
    event.viewport = this
  }

  /**
   * Handler of the `pointerdown` event fired when the pointer device is initially pressed.
   *
   * @param event - The DOM event produced by a pointer
   */
  onPointerDown(event: ZeaPointerEvent): void {
    this.prepareUIEvent(event)

    if (event.pointerType === POINTER_TYPES.mouse) {
      const mouseEvent = <ZeaMouseEvent>event
      mouseEvent.pointerPos = this.__getPointerPos(mouseEvent.rendererX, mouseEvent.rendererY)
      mouseEvent.pointerRay = this.calcRayFromScreenPos(mouseEvent.pointerPos)
      mouseEvent.intersectionData = this.getGeomDataAtPos(mouseEvent.pointerPos, mouseEvent.pointerRay)
    } else if (event.pointerType === POINTER_TYPES.touch) {
      const touchEvent = <ZeaTouchEvent>event
      if (touchEvent.touches.length == 1) {
        const touch = touchEvent.touches[0]
        touchEvent.pointerPos = this.__getPointerPos(touch.rendererX, touch.rendererY)
        touchEvent.pointerRay = this.calcRayFromScreenPos(touchEvent.pointerPos)
        touchEvent.intersectionData = this.getGeomDataAtPos(touchEvent.pointerPos, touchEvent.pointerRay)
      }
    }

    // //////////////////////////////////////
    // Double Tap
    // First check for double tap handlers.
    // If the manipulator or the viewport handle that
    // then skip the 'pointerDown' event.
    const downTime = Date.now()
    if (downTime - this.__prevDownTime < this.doubleClickTimeParam.value) {
      if (this.manipulator) {
        this.manipulator.onPointerDoublePress(event)
        if (!event.propagating) return
      }
      this.emit('pointerDoublePressed', event)
      if (!event.propagating) return
    } else {
      this.__prevDownTime = downTime
    }

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

      if (!event.propagating) return
    }
  }

  /**
   * Causes an event to occur when a user releases a mouse button over a element.
   *
   * @param event - The event that occurs.
   */
  onPointerUp(event: ZeaPointerEvent): void {
    this.prepareUIEvent(event)

    if (event.pointerType === POINTER_TYPES.mouse) {
      const mouseEvent = <ZeaMouseEvent>event
      mouseEvent.pointerPos = this.__getPointerPos(mouseEvent.rendererX, mouseEvent.rendererY)
      mouseEvent.pointerRay = this.calcRayFromScreenPos(mouseEvent.pointerPos)
      mouseEvent.intersectionData = this.getGeomDataAtPos(mouseEvent.pointerPos, mouseEvent.pointerRay)
    } else if (event.pointerType === POINTER_TYPES.touch) {
      const touchEvent = <ZeaTouchEvent>event
      if (touchEvent.touches.length == 0 && touchEvent.changedTouches.length == 1) {
        const touch = touchEvent.changedTouches[0]
        touchEvent.pointerPos = this.__getPointerPos(touch.rendererX, touch.rendererY)
        touchEvent.pointerRay = this.calcRayFromScreenPos(touchEvent.pointerPos)
        touchEvent.intersectionData = this.getGeomDataAtPos(touchEvent.pointerPos, touchEvent.pointerRay)
      }
    }

    if (event.getCapture()) {
      event.getCapture().onPointerUp(event)
      // events are now always sent to the capture item first,
      // but can continue propagating to other items if no call
      // to event.stopPropagation() was made.
      if (!event.propagating) return
    }

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

  /**
   * Causes an event to occur when the pointer device is moving.
   *
   * @param event - The event that occurs.
   */
  onPointerMove(event: ZeaPointerEvent): void {
    this.prepareUIEvent(event)

    if (event.pointerType === POINTER_TYPES.mouse) {
      const mouseEvent = <ZeaMouseEvent>event
      const pointerPos = this.__getPointerPos(mouseEvent.rendererX, mouseEvent.rendererY)
      mouseEvent.pointerPos = pointerPos
      mouseEvent.pointerRay = this.calcRayFromScreenPos(pointerPos)
    } else if (event.pointerType === POINTER_TYPES.touch) {
      const touchEvent = <ZeaTouchEvent>event
      for (let index = 0; index < touchEvent.touches.length; index++) {
        const touch = touchEvent.touches[index]
        touch.touchPos = this.__getPointerPos(touch.rendererX, touch.rendererY)
        touch.touchRay = this.calcRayFromScreenPos(touch.touchPos)
      }

      touchEvent.pointerPos = touchEvent.touches[0].touchPos
      touchEvent.pointerRay = touchEvent.touches[0].touchRay
    }

    // Note: the Captured item might be a tool, which might not need to have
    // the geom under the pointer. e.g. the CameraManipulator during a drag.
    if (event.getCapture()) {
      event.getCapture().onPointerMove(event)
      // events are now always sent to the capture item first,
      // but can continue propagating to other items if no call
      // to event.stopPropagation() was made.
      if (!event.propagating) return
    }

    event.intersectionData = this.getGeomDataAtPos(event.pointerPos, event.pointerRay)
    if (event.intersectionData) {
      if (event.intersectionData.geomItem != this.pointerOverItem) {
        if (this.pointerOverItem) {
          event.leftGeometry = this.pointerOverItem
          this.pointerOverItem.onPointerLeave(event)

          if (event.propagating) this.emit('pointerLeaveGeom', event)
        }

        event.propagating = true
        this.pointerOverItem = event.intersectionData.geomItem
        this.pointerOverItem.onPointerEnter(event)

        if (!event.propagating) return

        this.emit('pointerOverGeom', event)
      }

      event.propagating = true
      event.intersectionData.geomItem.onPointerMove(event)
      if (!event.propagating) return
    } else if (this.pointerOverItem) {
      event.leftGeometry = this.pointerOverItem
      this.pointerOverItem.onPointerLeave(event)
      this.pointerOverItem = null

      if (!event.propagating) return

      this.emit('pointerLeaveGeom', event)
    }

    this.emit('pointerMove', event)
    if (!event.propagating) return

    if (this.manipulator) {
      this.manipulator.onPointerMove(event)
      if (!event.propagating) return
    }
  }

  /**
   * Causes an event to occur when the mouse pointer is moved into this viewport
   * @param event - The event that occurs.
   */
  onPointerEnter(event: ZeaPointerEvent): void {
    this.prepareUIEvent(event)
    this.emit('pointerEnter', event)
    if (!event.propagating) return

    if (this.manipulator && this.manipulator.onPointerEnter) {
      this.manipulator.onPointerEnter(event)
      if (!event.propagating) return
    }
  }

  /**
   * Causes an event to occur when the mouse pointer is moved out of this viewport
   * @param event - The event that occurs.
   */
  onPointerLeave(event: ZeaPointerEvent): void {
    this.prepareUIEvent(event)
    this.emit('pointerLeave', event)
    if (!event.propagating) return

    if (this.manipulator && this.manipulator.onPointerLeave) {
      this.manipulator.onPointerLeave(event)
      if (!event.propagating) return
    }
  }

  /**
   * Causes an event to occur when the user is pressing a key on the keyboard.
   * @param event - The event that occurs.
   */
  onKeyDown(event: KeyboardEvent): void {
    this.prepareUIEvent(event)
    if (this.manipulator) {
      this.manipulator.onKeyDown(event)
      if (!event.propagating) return
    }
    this.emit('keyDown', event)
  }

  /**
   * Causes an event to occur  when the user releases a key on the keyboard.
   * @param event - The event that occurs.
   */
  onKeyUp(event: KeyboardEvent): void {
    this.prepareUIEvent(event)
    if (this.manipulator) {
      this.manipulator.onKeyUp(event)
      if (!event.propagating) return
    }
    this.emit('keyUp', event)
  }

  /**
   * Causes an event to occur when the mouse wheel is rolled up or down over an element.
   * @param event - The event that occurs.
   */
  onWheel(event: ZeaWheelEvent): void {
    this.prepareUIEvent(event)

    event.pointerPos = this.__getPointerPos(event.rendererX, event.rendererY)
    event.pointerRay = this.calcRayFromScreenPos(event.pointerPos)
    event.intersectionData = this.getGeomDataAtPos(event.pointerPos, event.pointerRay)

    if (event.intersectionData != undefined) {
      event.intersectionData.geomItem.onWheel(event)
      if (!event.propagating) return
    }

    if (this.manipulator) {
      this.manipulator.onWheel(event)
      return
    }
    this.emit('mouseWheel', event)
  }

  // Touch events

  /**
   * Causes an event to occur when the touch event gets interrupted.
   * @param event - The event that occurs.
   */
  onTouchCancel(event: ZeaTouchEvent): void {
    this.prepareUIEvent(event)

    if (event.getCapture()) {
      // events are now always sent to the capture item first,
      // but can continue propagating to other items if no call
      // to event.stopPropagation() was made.
      event.getCapture().onTouchCancel(event)
      if (!event.propagating) return
    }

    if (this.manipulator) {
      this.manipulator.onTouchCancel(event)
      if (!event.propagating) return
    }
    this.emit('touchCancel', event)
  }

  // //////////////////////////
  // Rendering

  /**
   * The __initRenderState method.
   * @param renderstate - The object tracking the current state of the renderer
   * @private
   */
  __initRenderState(renderstate: RenderState): void {
    // console.log(this.__viewMat.toString())
    renderstate.viewXfo = this.__cameraXfo
    renderstate.viewScale = 1.0
    renderstate.region = this.region
    renderstate.cameraMatrix = this.__cameraMat

    renderstate.viewport = this
    renderstate.viewports = [
      {
        region: this.region,
        viewMatrix: this.__viewMat,
        projectionMatrix: this.__projectionMatrix,
        viewportFrustumSize: this.__frustumDim,
        isOrthographic: this.__camera.isOrthographic(),
        fovY: this.__camera.getFov(),
      },
    ]
  }

  /**
   * The draw method.
   */
  draw(): void {
    const renderstate: ColorRenderState = <ColorRenderState>{}
    this.__initRenderState(renderstate)

    super.draw(renderstate)

    // Turn this on to debug the geom data buffer.
    if (this.debugGeomShader) {
      this.renderGeomDataFbo()
      // Note: renderGeomDataFbo would have bound other shaders.
      // and the renderstate used above is no blonger valid. Reset.
      const renderstate: ColorRenderState = <ColorRenderState>{}
      const screenQuad = this.__renderer.screenQuad!
      screenQuad.bindShader(renderstate)
      screenQuad.draw(renderstate, this.__geomDataBuffer, new Vec2(0, 0), new Vec2(1, 1))
    }
    if (this.debugHighlightedGeomsBuffer) {
      // Note: renderGeomDataFbo would have bound other shaders.
      // and the renderstate used above is no blonger valid. Reset.
      const renderstate: ColorRenderState = <ColorRenderState>{}
      const screenQuad = this.__renderer.screenQuad!
      screenQuad.bindShader(renderstate)
      screenQuad.draw(renderstate, this.highlightedGeomsBuffer, new Vec2(0, 0), new Vec2(1, 1))
    }
  }
}

export { GLViewport }
