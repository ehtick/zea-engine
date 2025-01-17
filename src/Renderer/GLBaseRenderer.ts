/* eslint-disable guard-for-in */
// @ts-ignore

import throttle from 'lodash-es/throttle'
import { TreeItem, GeomItem, ParameterOwner, Scene } from '../SceneTree/index'
import { SystemDesc } from '../SystemDesc'
import { create3DContext } from './GLContext'
import { GLScreenQuad } from './GLScreenQuad'
import { GLViewport } from './GLViewport'
import { Registry } from '../Registry'
import { XRViewport } from './VR/XRViewport'
import { GLMaterialLibrary } from './Drawing/GLMaterialLibrary'
import { GLGeomLibrary } from './Drawing/GLGeomLibrary'
import { GLGeomItemLibrary } from './Drawing/GLGeomItemLibrary'
import { GLPass } from './Passes/GLPass'
import { GLRenderer } from './GLRenderer'
import { ResizedEvent } from '../Utilities/Events/ResizedEvent'
import { SceneSetEvent } from '../Utilities/Events/SceneSetEvent'
import { ViewChangedEvent } from '../Utilities/Events/ViewChangedEvent'
import { XrViewportEvent } from '../Utilities/Events/XrViewportEvent'
import { ZeaMouseEvent } from '../Utilities/Events/ZeaMouseEvent'
import { ZeaWheelEvent } from '../Utilities/Events/ZeaWheelEvent'
import { ZeaTouchEvent } from '../Utilities/Events/ZeaTouchEvent'
import { KeyboardEvent } from '../Utilities/Events/KeyboardEvent'

import { GLShader } from './GLShader'
import { WebGL12RenderingContext } from './types/webgl'
import { ShaderUniforms } from './types/renderer'
import { StateChangedEvent } from '../Utilities/Events/StateChangedEvent'
import { ChildAddedEvent } from '../Utilities/Events/ChildAddedEvent'
import { ColorRenderState, GeomDataRenderState, HighlightRenderState, RenderState } from './RenderStates/index'
import { ARViewport } from './VR/ARViewport'
import { VRViewport } from './VR/VRViewport'
import { BaseClass } from '../Utilities'

let activeGLRenderer: GLBaseRenderer | undefined
let pointerIsDown = false
let pointerLeft = false
const registeredPasses: Record<string, Array<typeof GLPass>> = {}

/*
 * WebGL context attributes:
 *
 * alpha: Boolean that indicates if the canvas contains an alpha buffer.
 * depth: Boolean that indicates that the drawing buffer is requested to have a depth buffer of at least 16 bits.
 * stencil: Boolean that indicates that the drawing buffer is requested to have a stencil buffer of at least 8 bits.
 * desynchronized: Boolean that hints the user agent to reduce the latency by desynchronizing the canvas paint cycle from the event loop
 * antialias: Boolean that indicates whether or not to perform anti-aliasing if possible.
 * failIfMajorPerformanceCaveat: Boolean that indicates if a context will be created if the system performance is low or if no hardware GPU is available.
 * powerPreference: A hint to the user agent indicating what configuration of GPU is suitable for the WebGL context. Possible values are:
 *  - "default": Let the user agent decide which GPU configuration is most suitable. This is the default value.
 *  - "high-performance": Prioritizes rendering performance over power consumption.
 *  - "low-power": Prioritizes power saving over rendering performance.
 * premultipliedAlpha: Boolean that indicates that the page compositor will assume the drawing buffer contains colors with pre-multiplied alpha.
 * preserveDrawingBuffer: If the value is true the buffers will not be cleared and will preserve their values until cleared or overwritten by the author.
 * xrCompatible: Boolean that hints to the user agent to use a compatible graphics adapter for an immersive XR device.
 * Setting this synchronous flag at context creation is discouraged; rather call the asynchronous WebGLRenderingContext.makeXRCompatible()
 *    method the moment you intend to start an XR session.
 */
export interface RendererOptions {
  // Enable WebXR Rendering.
  supportXR?: boolean

  // XR session mode: 'VR' | 'AR'
  // When lanuching an XRSession, specify the mode to launch the session.
  xrMode?: 'VR' | 'AR'

  // alpha: Boolean that indicates if the canvas contains an alpha buffer.
  alpha?: boolean

  // antialias: Boolean that indicates whether or not to perform anti-aliasing if possible.
  antialias?: boolean

  // powerPreference: A hint to the user agent indicating what configuration of GPU is suitable for the WebGL context. Possible values are:
  // - "default": Let the user agent decide which GPU configuration is most suitable. This is the default value.
  // - "high-performance": Prioritizes rendering performance over power consumption.
  // - "low-power": Prioritizes power saving over rendering performance.
  powerPreference?: string

  // Disables all textured rendering in the Renderer.
  disableTextures?: boolean
  // This debugging option modifies the color of each geometry to display its id as a pseudo-random color.
  // This option is useful to see visually each geometry in the scene.
  debugGeomIds?: boolean

  // Enabled frustum culling which is a performance optimization that speeds up rendering in heavy scenes.
  enableFrustumCulling?: boolean
  // Enabled Occlusion culling which is a performance optimization that speeds up rendering in heavy scenes.
  enableOcclusionCulling?: boolean

  // This debugging option disabled use of the multi-draw extension.
  disableMultiDraw?: boolean
  // This debugging option is used to disable the use of floating point geom data buffers.
  // Mainly for testing compatibility with older browsers.
  floatGeomBuffer?: boolean
  // This debugging option is used to display the GeomData picking buffer on screen.
  debugGeomDataBuffer?: boolean
  // This debugging option is used to display the occlusion buffer generated during occlusion culling.
  debugOcclusionBuffer?: boolean
}

/**
 * Class representing a GL base renderer.
 *
 * @extends ParameterOwner
 */
class GLBaseRenderer extends ParameterOwner {
  protected listenerIDs: Map<TreeItem, Record<string, number>> = new Map()
  directives: string[] = []
  solidAngleLimit: number = 0.004

  __gl: WebGL12RenderingContext
  protected __glcanvas: HTMLCanvasElement | null = null
  protected __scene: Scene | null = null

  protected __shaderDirectives: Record<string, string> = {}
  protected __renderGeomDataFbosRequested: boolean = false
  protected __shaders: Record<string, GLShader> = {}
  protected __passes: Record<number, GLPass[]> = {}
  private passAssignments: Map<TreeItem, GLPass> = new Map()
  protected __passesRegistrationOrder: GLPass[] = []
  protected __passCallbacks: any[] = []

  protected __viewports: GLViewport[] = []
  protected __activeViewport: GLViewport | undefined = undefined
  protected __continuousDrawing: boolean = false
  protected __redrawRequested: boolean = false
  protected __isMobile: boolean = false
  protected __drawSuspensionLevel = 0
  __xrViewportPresenting: boolean = false
  floatGeomBuffer: boolean = true
  multiSampledScreenBuffer: boolean = false

  protected __supportXR: boolean = false
  protected __xrViewport: XRViewport | undefined = undefined
  protected __xrViewportPromise: Promise<XRViewport>

  glMaterialLibrary: GLMaterialLibrary
  glGeomItemLibrary: GLGeomItemLibrary
  glGeomLibrary: GLGeomLibrary

  public screenQuad: GLScreenQuad | null = null

  // @ts-ignore: semantic error TS2304:
  private resizeObserver?: ResizeObserver

  /**
   * Create a GL base renderer.
   * @param $canvas - The canvas element.
   * @param options - The options value.
   */
  constructor($canvas: HTMLCanvasElement, options: RendererOptions = {}) {
    super()

    if (!SystemDesc.gpuDesc) {
      throw new Error('Unable to create renderer. WebGL not Supported')
    }

    this.__isMobile = SystemDesc.isMobileDevice

    // Function Bindings.
    this.requestRedraw = this.requestRedraw.bind(this)

    this.__gl = this.setupWebGL($canvas, options)

    this.screenQuad = new GLScreenQuad(this.__gl, { directives: this.directives })
    this.bindEventHandlers()
    const mainViewport = this.addViewport('main')
    mainViewport.debugGeomDataBuffer = options.debugGeomDataBuffer
    mainViewport.debugOcclusionBuffer = options.debugOcclusionBuffer

    this.glMaterialLibrary = new GLMaterialLibrary(this)
    this.glMaterialLibrary.on('updated', () => {
      this.requestRedraw()
    })
    this.glGeomLibrary = new GLGeomLibrary(this)
    this.glGeomLibrary.on('updated', () => {
      this.requestRedraw()
    })
    this.glGeomItemLibrary = new GLGeomItemLibrary(this, options)
    this.glGeomItemLibrary.on('updated', () => {
      this.requestRedraw()
    })

    // eslint-disable-next-line guard-for-in
    for (const passType in registeredPasses) {
      for (const cls of registeredPasses[passType]) {
        // eslint-disable-next-line new-cap
        // @ts-ignore
        this.addPass(new cls(), parseInt(passType), false)
      }
    }

    // ////////////////////////////////////////////
    // WebXR
    this.__supportXR = options.supportXR ?? true
    const xrMode = options.xrMode ?? 'VR' // TBR:AR
    this.__xrViewportPromise = new Promise((resolve, reject) => {
      if (this.__supportXR) {
        // if(!navigator.xr && window.WebVRPolyfill != undefined) {
        //     this.__vrpolyfill = new WebVRPolyfill();
        // }
        if ((navigator as any)?.xr) {
          const sessionMode = xrMode == 'AR' ? 'immersive-ar' : 'immersive-vr'
          const setupXRViewport = () => {
            // Note: could cause a context loss on machines with
            // multi-gpus (integrated Intel).
            // This is because the may force the context to switch
            // to the discrete GPU.
            // TODO: Provide a system to re-load the GPU data.
            // this.__gl.setCompatibleXRDevice(device);
            this.__gl.makeXRCompatible().then(() => {
              this.__xrViewport = this.__setupXRViewport(sessionMode)
              let event = new XrViewportEvent(this.__xrViewport)
              this.emit('xrViewportSetup', event)
              resolve(this.__xrViewport)
            })
          }
          ;(navigator as any)?.xr
            .isSessionSupported(sessionMode)
            .then((isSupported: boolean) => {
              if (isSupported) {
                setupXRViewport()
              }
            })
            .catch((reason: any) => {
              console.warn('Unable to setup XR:' + reason)
            })
          // TODO:
          // navigator.xr.on('devicechange', checkForXRSupport);
        }
      }
    })
  }

  /**
   * The addShaderPreprocessorDirective method.
   * @param name - The name value.
   * @param value - The value param.
   */
  addShaderPreprocessorDirective(name: string, value?: string): void {
    // const gl = this.__gl
    if (value) this.__shaderDirectives[name] = '#define ' + name + ' = ' + value
    else this.__shaderDirectives[name] = '#define ' + name
    const directives = []
    // eslint-disable-next-line guard-for-in
    for (const key in this.__shaderDirectives) {
      directives.push(this.__shaderDirectives[key])
    }
    this.directives = directives
  }

  /**
   * Returns HTMLCanvasElement's width
   *
   * @return - The return value.
   */
  getWidth(): number {
    return this.__glcanvas!.width
  }

  /**
   * Returns HTMLCanvasElement's Height
   * @return - The return value.
   */
  getHeight(): number {
    return this.__glcanvas!.height
  }

  // //////////////////////////////////////
  // Viewports

  /**
   * Adds a new viewport(viewing region) to the scene.
   *
   * @param name - The name of the viewport.
   * @return - The return value.
   */
  addViewport(name: string): GLViewport {
    // TODO: We may need to merge GLBaseRenderer into GLRenderer to avoid this nasty cast.
    const renderer: GLRenderer = <GLRenderer>(<unknown>this)
    const vp = new GLViewport(renderer, name, this.getWidth(), this.getHeight())

    const updated = () => {
      this.requestRedraw()
    }
    const viewChanged = (data: ViewChangedEvent) => {
      if (!this.__xrViewportPresenting) {
        this.emit('viewChanged', data)
      }
    }
    vp.on('updated', updated)
    vp.on('viewChanged', viewChanged)

    this.__viewports.push(vp)
    this.__activeViewport = vp
    return vp
  }

  /**
   * Returns a viewport element by specifying its index in the list of viewports.
   *
   * @param index - The index value.
   * @return - The return value.
   */
  getViewport(index = 0): GLViewport {
    return this.__viewports[index]
  }

  /**
   * Returns a viewport element under the specified XY coordinates.
   *
   * @param offsetX - The viewport offset in the X axis.
   * @param offsetY - The viewport offset in the Y axis.
   * @return - The return value.
   */
  getViewportAtPos(offsetX: number, offsetY: number): GLViewport | undefined {
    for (const vp of this.__viewports) {
      const x = vp.getPosX()
      const y = vp.getPosY()
      const width = vp.getWidth()
      const height = vp.getHeight()
      if (offsetX >= x && offsetY >= y && offsetX <= width + x && offsetY <= height + y) return vp
    }
    return undefined
  }

  /**
   * Sets as `active` the specified viewport.
   *
   * @param vp - The viewport.
   */
  activateViewport(vp: GLViewport): void {
    if (this.__activeViewport == vp) return

    this.__activeViewport = vp
  }

  /**
   * Sets as àctive` the viewport under the specified XY coordinates.
   *
   * @param offsetX - The viewport offset in the X axis.
   * @param offsetY - The viewport offset in the Y axis.
   */
  activateViewportAtPos(offsetX: number, offsetY: number) {
    if (this.__xrViewportPresenting) return
    const vp = this.getViewportAtPos(offsetX, offsetY)
    if (vp && vp != this.__activeViewport) this.activateViewport(vp)
  }

  /**
   * Returns current active viewport.
   *
   * @return - The return value.
   */
  getActiveViewport(): GLViewport | undefined {
    return this.__activeViewport
  }

  /**
   * The suspendDrawing method.
   */
  suspendDrawing(): void {
    this.__drawSuspensionLevel++
  }

  /**
   * The resumeDrawing method.
   */
  resumeDrawing(): void {
    this.__drawSuspensionLevel--
    if (this.__drawSuspensionLevel == 0) {
      this.renderGeomDataFbos()
      this.requestRedraw()
    }
  }

  /**
   * The renderGeomDataFbos method. Frame buffer (FBO).
   */
  renderGeomDataFbos(): void {
    if (this.__renderGeomDataFbosRequested == true) return

    this.__renderGeomDataFbosRequested = true
    const onAnimationFrame = () => {
      for (const vp of this.__viewports) vp.invalidateGeomDataBuffer()
      this.__renderGeomDataFbosRequested = false
    }
    window.requestAnimationFrame(onAnimationFrame)
  }

  // //////////////////////////////////////
  // Scene

  /**
   * Returns current scene(Environment where all assets live) object.
   *
   * @return - The return value.
   */
  getScene(): Scene {
    return this.__scene
  }

  /**
   * Sets scene to the renderer.
   *
   * @param scene - The scene value.
   */
  setScene(scene: Scene): void {
    this.__scene = scene
    this.addTreeItem(this.__scene!.getRoot())

    let event = new SceneSetEvent(this.__scene)
    this.emit('sceneSet', event)
  }

  /**
   * Adds tree items to the renderer, selecting the correct pass to delegate rendering too, and listens to future changes in the tree.
   *
   * @param treeItem - The tree item to add.
   */
  addTreeItem(treeItem: TreeItem): void {
    // Note: we can have BaseItems in the tree now.
    if (!(treeItem instanceof TreeItem)) return

    const listenerIDs = {}

    if (treeItem instanceof GeomItem) {
      const geomParam = treeItem.geomParam
      if (geomParam.value == undefined) {
        // we will add this geomItem once it receives its geom.
        const geomAssigned = () => {
          delete listenerIDs['Geometry.valueChanged']
          this.assignTreeItemToGLPass(treeItem)
        }
        listenerIDs['Geometry.valueChanged'] = geomParam.once('valueChanged', geomAssigned)
      } else {
        this.assignTreeItemToGLPass(treeItem)
      }
    } else {
      this.assignTreeItemToGLPass(treeItem)
    }

    // Traverse the tree adding items until we hit the leaves (which are usually GeomItems.)
    for (const childItem of treeItem.getChildren()) {
      if (childItem) this.addTreeItem(<TreeItem>childItem)
    }

    listenerIDs['childAdded'] = treeItem.on('childAdded', (event: ChildAddedEvent) => {
      this.addTreeItem(event.childItem)
    })
    listenerIDs['childRemoved'] = treeItem.on('childRemoved', (event) => {
      this.removeTreeItem(event.childItem)
    })

    this.listenerIDs.set(treeItem, listenerIDs)
    this.renderGeomDataFbos()
  }

  /**
   * Searches through the passes and finds the appropriate pass to draw the given tree items.
   *
   * @param treeItem - The tree item to assign.
   */
  assignTreeItemToGLPass(treeItem: TreeItem): void {
    if (treeItem instanceof GeomItem) {
      const geomItem = treeItem
      this.glGeomItemLibrary.addGeomItem(geomItem)
    }

    let handled = false
    for (let i = this.__passesRegistrationOrder.length - 1; i >= 0; i--) {
      const pass = this.__passesRegistrationOrder[i]

      const rargs = {
        continueInSubTree: true,
      }
      handled = pass.itemAddedToScene(treeItem, rargs)
      if (handled) {
        this.passAssignments.set(treeItem, pass)
        if (!rargs.continueInSubTree) return
        break
      }
    }

    if (!handled) {
      for (const passCbs of this.__passCallbacks) {
        const rargs = {
          continueInSubTree: true,
        }
        const handled = passCbs.itemAddedFn(treeItem, rargs)
        if (handled) {
          if (!rargs.continueInSubTree) return
          break
        }
      }
    }
  }

  /**
   * Remove tree items from the scene.
   *
   * @param treeItem - The tree item to remove.
   */
  removeTreeItem(treeItem: TreeItem): void {
    // Note: we can have BaseItems in the tree now.
    if (!(treeItem instanceof TreeItem)) return

    const listenerIDs = this.listenerIDs.get(treeItem)
    this.listenerIDs.delete(treeItem)

    treeItem.off('childAdded', listenerIDs['childAdded'])
    treeItem.off('childRemoved', listenerIDs['childRemoved'])

    const pass = this.passAssignments.get(treeItem)
    if (pass != undefined) {
      const rargs = {
        continueInSubTree: true,
      }
      pass.itemRemovedFromScene(treeItem, rargs)
      this.passAssignments.delete(treeItem)
    }

    // Traverse the tree adding items till we hit the leaves (which are usually GeomItems).
    for (const childItem of treeItem.getChildren()) {
      if (childItem) this.removeTreeItem(<TreeItem>childItem)
    }

    if (treeItem instanceof GeomItem) {
      const geomItem = treeItem
      if (listenerIDs['Geometry.valueChanged']) {
        const geomParam = treeItem.geomParam
        geomParam.off('valueChanged', listenerIDs['Geometry.valueChanged'])
      }

      this.glGeomItemLibrary.removeGeomItem(geomItem)
    }

    this.renderGeomDataFbos()
  }

  // ///////////////////////
  // Renderer Setup

  /**
   * Getter for gl.
   */
  get gl(): WebGL12RenderingContext {
    return this.__gl
  }

  /**
   * The getGL method.
   * @return - The return value.
   */
  getGL(): WebGL12RenderingContext {
    return this.__gl
  }

  /**
   * Handle the canvas's parent resizing.
   *
   * @param newWidth - The new width of the canvas.
   * @param newHeight - The new height of the canvas.
   *
   * @private
   */
  handleResize(newWidth: number, newHeight: number): void {
    if (this.__xrViewportPresenting) {
      return
    }

    const width = Math.max(4, newWidth) * window.devicePixelRatio
    const height = Math.max(4, newHeight) * window.devicePixelRatio

    this.__glcanvas.width = width
    this.__glcanvas.height = height

    this.__viewports.forEach((viewport) => {
      viewport.resize(width, height)
    })

    const event = new ResizedEvent(width, height)
    this.emit('resized', event)
    this.requestRedraw()
  }

  /**
   * Returns host div of the canvas element.
   *
   * @return - The return value.
   */
  getDiv(): HTMLElement | null {
    return this.__glcanvas!.parentElement
  }

  /**
   * Setups the WebGL configuration for the renderer, specifying the canvas element where our
   * @private
   * @param $canvas - The $canvas element.
   * @param webglOptions - The webglOptions value.
   */
  private setupWebGL($canvas: HTMLCanvasElement, options: RendererOptions = {}): WebGL12RenderingContext {
    const { tagName } = $canvas

    if (!['DIV', 'CANVAS'].includes(tagName)) {
      throw new Error('Only CANVAS and DIV are valid root elements.')
    }

    const rootIsDiv = tagName === 'DIV'
    this.__glcanvas = $canvas

    if (rootIsDiv) {
      console.warn(
        '@GLBaseRenderer#setupWebGL.',
        'Using a DIV as root element is deprecated.',
        'Use a CANVAS instead.',
        'See: https://docs.zea.live/zea-engine/#/getting-started/get-started-with-engine?id=basic-setup'
      )

      this.__glcanvas = document.createElement('canvas')

      $canvas.appendChild(this.__glcanvas)
    } else {
      this.__glcanvas = $canvas
    }

    this.__glcanvas.style['touch-action'] = 'none'
    this.__glcanvas.parentElement.style.position = 'relative'
    // Now scrollbars can appear causing the content size to change,
    // causing an infinite loop of resizing.
    this.__glcanvas.parentElement.style.overflow = 'hidden'
    this.__glcanvas.style.width = '100%'
    this.__glcanvas.style.height = '100%'
    this.__glcanvas.style.position = 'absolute'

    // Rapid resizing of the canvas would cause issues with WebGL.
    // FrameBuffer objects would end up all black. So here we throttle
    // the resizing of the canvas to ensure 2 resize commands are not
    // closer than 100ms appart.
    const throttledResize = throttle((entries: any) => {
      if (!Array.isArray(entries) || !entries.length) return
      for (const entry of entries) {
        if (!entry.contentRect) return
        const displayWidth = Math.round(entry.contentRect.width)
        const displayHeight = Math.round(entry.contentRect.height)
        this.handleResize(displayWidth, displayHeight)
      }
    }, 500)

    window.addEventListener('resize', () => {
      // The ResizeObserver below will miss zoom changes, while this
      // resize event catches them. Both may be triggered by window
      // resizes, but the throttle function ensures we don't resize
      // needlessly.
      const entries = [
        {
          contentRect: {
            width: this.__glcanvas.parentElement.clientWidth,
            height: this.__glcanvas.parentElement.clientHeight,
          },
        },
      ]
      throttledResize(entries)
    })

    // https://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html
    const resizeObserver = new ResizeObserver(throttledResize)
    try {
      // only call us of the number of device pixels changed
      // @ts-ignore
      resizeObserver.observe(this.__glcanvas.parentNode, { box: 'device-pixel-content-box' })
    } catch (ex) {
      // device-pixel-content-box is not supported so fallback to this
      // @ts-ignore
      resizeObserver.observe(this.__glcanvas.parentNode, { box: 'content-box' })
    }

    this.handleResize(this.__glcanvas.parentElement.clientWidth, this.__glcanvas.parentElement.clientHeight)

    const disablingOnMacOsChrome = SystemDesc.OS === 'macOS' && SystemDesc.browserName === 'Chrome'
    const disablingOnMobileSafari = SystemDesc.isIOSDevice
    const webglOptions: Record<string, any> = {}
    webglOptions.preserveDrawingBuffer = true // Note: The unit tests all render black if this is false
    webglOptions.antialias = disablingOnMacOsChrome || disablingOnMobileSafari ? false : options.antialias ?? true
    webglOptions.depth = true
    webglOptions.stencil = true
    webglOptions.alpha = options.alpha ?? false
    // Note: Due to a change in Chrome (version 88-89), providing true here caused a pause when creating
    // an WebGL context, if the XR device was unplugged. We also call 'makeXRCompatible' when setting
    // up the XRViewport, so we to get an XR Compatible context anyway.
    webglOptions.xrCompatible = false

    this.multiSampledScreenBuffer = webglOptions.antialias

    // Most applications of our engine will prefer the high-performance context by default.
    webglOptions.powerPreference = options.powerPreference || 'high-performance'
    const gl = create3DContext(this.__glcanvas, webglOptions)
    if (!gl) alert('Unable to create WebGL context. WebGL not supported.')

    if (gl.name == 'webgl2') {
      this.addShaderPreprocessorDirective('ENABLE_ES3')
    }
    if (gl.floatTexturesSupported) {
      this.addShaderPreprocessorDirective('ENABLE_FLOAT_TEXTURES')
    }

    {
      // Note: disabling multi-draw on Safari 15.4 until we can figure out how to address this regression.
      // const disableOnSafari = SystemDesc.browserName == 'Safari' && SystemDesc.fullVersion == '15.4'
      // if (disableOnSafari) {
      //   console.warn('Disabling multi-draw on Safari 15.4 due to a regression in WebKit', SystemDesc)
      // }
      // const disableMultiDraw = options.disableMultiDraw //|| disableOnSafari
      const ext = gl.name == 'webgl2' ? gl.getExtension('WEBGL_multi_draw') : null
      if (ext && !options.disableMultiDraw) {
        gl.multiDrawArrays = ext.multiDrawArraysWEBGL.bind(ext)
        gl.multiDrawElements = ext.multiDrawElementsWEBGL.bind(ext)
        gl.multiDrawElementsInstanced = ext.multiDrawElementsInstancedWEBGL.bind(ext)
        gl.multiDrawArraysInstanced = ext.multiDrawArraysInstancedWEBGL.bind(ext)
      } else {
        this.addShaderPreprocessorDirective('EMULATE_MULTI_DRAW')
      }
    }

    // Note: Mobile devices don't provide much support for reading data back from float textures,
    // and checking compatibility is patchy at best.
    // Note: We are now pushing on high-end mobile devices.
    // Galaxy and above. We need this. We need to accurately determine
    // if the float buffer is not supported.
    if (SystemDesc.browserName == 'Safari' && gl.name == 'webgl') {
      this.floatGeomBuffer = false
    } else {
      this.floatGeomBuffer = options.floatGeomBuffer != undefined ? options.floatGeomBuffer : gl.floatTexturesSupported
    }
    gl.floatGeomBuffer = this.floatGeomBuffer
    return gl
  }

  /**
   * Binds IO event handlers to the canvas
   */
  bindEventHandlers(): void {
    // ////////////////////////////////
    // Setup event handlers
    const isValidCanvas = () => this.getWidth() > 0 && this.getHeight()

    /** Mouse Events Start */
    // Mobile devices emulate mouse events after emitting touch events
    // which causes double taps and other weirdness.
    const isMobileDeviceMouseEvent = (event: Record<string, any>) => {
      if (SystemDesc.isMobileDevice) {
        // console.warn('Mobile device is triggering mouse event:', event.type)
        return true
      }
      return false
    }

    this.__glcanvas!.addEventListener('mousedown', (event: globalThis.MouseEvent) => {
      if (isMobileDeviceMouseEvent(event)) {
        return
      }
      const pointerEvent = new ZeaMouseEvent(event, this.__glcanvas!.getBoundingClientRect())
      pointerIsDown = true
      activeGLRenderer = this
      this.activateViewportAtPos(pointerEvent.rendererX, pointerEvent.rendererY)
      const viewport = this.getActiveViewport()
      if (viewport) {
        viewport.onPointerDown(pointerEvent)
      }

      pointerLeft = false
    })

    document.addEventListener('mouseup', (event: globalThis.MouseEvent) => {
      if (isMobileDeviceMouseEvent(event)) {
        return
      }

      if (activeGLRenderer != this || !isValidCanvas()) return

      const pointerEvent = new ZeaMouseEvent(event, this.__glcanvas!.getBoundingClientRect())
      pointerIsDown = false
      const viewport = this.getActiveViewport()
      if (viewport) {
        viewport.onPointerUp(pointerEvent)
      }

      if (pointerLeft) {
        if (viewport) {
          viewport.onPointerLeave(pointerEvent)
        }
        activeGLRenderer = undefined
      }
    })

    document.addEventListener('mousemove', (event: globalThis.MouseEvent) => {
      if (isMobileDeviceMouseEvent(event)) {
        return
      }

      if (activeGLRenderer != this || !isValidCanvas()) return

      const pointerEvent = new ZeaMouseEvent(event, this.__glcanvas!.getBoundingClientRect())
      if (!pointerIsDown) this.activateViewportAtPos(pointerEvent.rendererX, pointerEvent.rendererY)

      const viewport = this.getActiveViewport()
      if (viewport) {
        viewport.onPointerMove(pointerEvent)
      }
    })

    this.__glcanvas!.addEventListener('mouseenter', (event: globalThis.MouseEvent) => {
      if (isMobileDeviceMouseEvent(event)) {
        return
      }

      if (!pointerIsDown) {
        activeGLRenderer = this

        const pointerEvent = new ZeaMouseEvent(event, this.__glcanvas!.getBoundingClientRect())

        this.activateViewportAtPos(pointerEvent.rendererX, pointerEvent.rendererY)
        if (!pointerIsDown) {
          const viewport = this.getActiveViewport()
          if (viewport) {
            viewport.onPointerEnter(pointerEvent)
          }
        }

        pointerLeft = false
      }
    })

    this.__glcanvas!.addEventListener('mouseleave', (event: globalThis.MouseEvent) => {
      if (isMobileDeviceMouseEvent(event)) {
        return
      }

      if (activeGLRenderer != this || !isValidCanvas()) return

      const pointerEvent = new ZeaMouseEvent(event, this.__glcanvas!.getBoundingClientRect())
      if (!pointerIsDown) {
        const viewport = this.getActiveViewport()
        if (viewport) {
          viewport.onPointerLeave(pointerEvent)
        }
        activeGLRenderer = undefined
      } else {
        pointerLeft = true
      }
    })
    document.addEventListener('contextmenu', (event: globalThis.MouseEvent) => {
      if (activeGLRenderer != this || !isValidCanvas()) return

      // prevent context menu from being displayed when right clicking on the viewport.
      // Note: we allow context menus for other items.
      event.preventDefault()
      event.stopPropagation()
    })

    /** Mouse Events End */

    /** Touch Events Start */
    this.__glcanvas!.addEventListener(
      'touchstart',
      (event: globalThis.TouchEvent) => {
        activeGLRenderer = this
        const viewport = this.getActiveViewport()
        const pointerEvent = new ZeaTouchEvent(event, this.__glcanvas!.getBoundingClientRect())
        viewport.onPointerDown(pointerEvent)
      },
      { passive: true }
    )

    this.__glcanvas!.addEventListener(
      'touchend',
      (event: globalThis.TouchEvent) => {
        const viewport = this.getActiveViewport()
        const pointerEvent = new ZeaTouchEvent(event, this.__glcanvas!.getBoundingClientRect())
        viewport.onPointerUp(pointerEvent)
      },
      { passive: true }
    )

    this.__glcanvas!.addEventListener(
      'touchmove',
      (event: globalThis.TouchEvent) => {
        const viewport = this.getActiveViewport()
        const pointerEvent = new ZeaTouchEvent(event, this.__glcanvas!.getBoundingClientRect())
        viewport.onPointerMove(pointerEvent)
      },
      { passive: true }
    )
    this.__glcanvas!.addEventListener(
      'touchcancel',
      (event: globalThis.TouchEvent) => {
        const viewport = this.getActiveViewport()
        const pointerEvent = new ZeaTouchEvent(event, this.__glcanvas!.getBoundingClientRect())
        viewport.onTouchCancel(pointerEvent)
      },
      { passive: true }
    )
    /** Touch Events End */

    const onWheel = (event: globalThis.WheelEvent) => {
      if (activeGLRenderer != this || !isValidCanvas()) return
      if (activeGLRenderer) {
        const pointerEvent = new ZeaWheelEvent(event, this.__glcanvas!.getBoundingClientRect())
        const vp = activeGLRenderer.getActiveViewport()
        if (vp) {
          vp.onWheel(pointerEvent)
        }
      }
    }
    /** DOMMouseScroll is for mozilla. */
    window.addEventListener('wheel', onWheel, { passive: false })

    document.addEventListener('keydown', (event: globalThis.KeyboardEvent) => {
      if (activeGLRenderer != this || !isValidCanvas()) return
      const keyboardEvent = new KeyboardEvent(event)
      const vp = activeGLRenderer.getActiveViewport()
      if (vp) {
        vp.onKeyDown(keyboardEvent)
      }
    })

    document.addEventListener('keyup', (event) => {
      if (activeGLRenderer != this || !isValidCanvas()) return
      const keyboardEvent = new KeyboardEvent(event)
      const vp = activeGLRenderer.getActiveViewport()
      if (vp) {
        vp.onKeyUp(keyboardEvent)
      }
    })
  }

  /**
   * Returns canvas that was used to generate the gl context.
   *
   * @return - The return value.
   */
  getGLCanvas(): HTMLCanvasElement | null {
    return this.__glcanvas
  }

  /**
   * Frames the specified viewport to the entire scene.
   * > See also: ${Viewport#frameView}
   * @param viewportIndex - The viewportIndex value. If multiple viewports are configured, a viewport index will need to be provided.
   */
  frameAll(viewportIndex = 0): void {
    this.__viewports[viewportIndex].frameView([this.__scene!.getRoot()])
  }

  // ///////////////////////
  // Render Items Setup

  /**
   * A factory function used to construct new shader objects. If that specified shader has already been constructed, it returns the existing shader.
   * @param shaderName - The shader name.
   * @return - The return value.
   */
  getOrCreateShader(shaderName: string): GLShader {
    let glShader = this.__shaders[shaderName]
    if (!glShader) {
      glShader = <GLShader>Registry.constructClass(shaderName)
      if (!glShader)
        console.error('@GLBaseRenderer#getOrCreateShader - Shader not registered with the Registry:', shaderName)
      glShader.setGLContext(this.__gl)
      this.__shaders[shaderName] = glShader
    }
    return glShader
  }

  /**
   * The addPass method.
   * @param pass - The pass value.
   * @param passType - The passType value.
   * @param updateIndices - The updateIndices value.
   * @return - The return value.
   */
  addPass(pass: GLPass, passType = -1, updateIndices = true): number {
    if (passType == -1) passType = pass.getPassType()
    if (!this.__passes[passType]) this.__passes[passType] = []

    let index = 0
    for (const key in this.__passes) {
      if (key == passType.toString()) break
      index += this.__passes[key].length
    }
    index += this.__passes[passType].length

    pass.on('updated', (event) => {
      this.requestRedraw()

      // If a pass is requesting an update, it is because geometry or
      // visibility is changing and the geom data Fbo will also be out
      // of date.
      this.renderGeomDataFbos()
    })
    // @ts-ignore TODO: Merge GLRenderer and GLBaseRenderer.
    pass.init(this, index)
    this.__passes[passType].push(pass)

    if (updateIndices) {
      // Now update all the  subsequent pass indices because the
      // indices after will have changed.
      let offset = 0
      for (const key in this.__passes) {
        const passSet = this.__passes[key]
        passSet.forEach((pass: GLPass, index: number) => {
          pass.setPassIndex(offset + index)
        })
        offset += passSet.length
      }
    }
    this.__passesRegistrationOrder.push(pass)
    this.requestRedraw()
    return index
  }

  /**
   * The getPass method.
   * @param index - The index value.
   * @return - The return value.
   */
  getPass(index: number): GLPass | undefined {
    let offset = 0
    for (const key in this.__passes) {
      const passSet = this.__passes[key]
      if (index - offset < passSet.length) return passSet[index - offset]
      offset += passSet.length
    }
    return undefined
  }

  /**
   * Find a pass given a class type. Used by the GPViewport to find the GLOverlayPass.
   * @param index - The index value.
   * @return - The return value.
   */
  findPassIndex(cls: typeof BaseClass): number {
    let offset = 0
    for (const key in this.__passes) {
      const passSet = this.__passes[key]
      for (let i = 0; i < passSet.length; i++) {
        if (passSet[i] instanceof cls) return offset
        offset++
      }
    }
    return -1
  }

  // ///////////////////////
  // VR Setup

  /**
   * The supportsVR method.
   * @return - The return value.
   */
  supportsVR(): boolean {
    console.warn('@GLBaseRenderer#supportVR - Deprecated Method. Please instead connect to the vrViewportSetup signal.')
    return this.__supportXR && (navigator as any)?.xr != null
  }

  /**
   * The __setupXRViewport method.
   * @return - The return value.
   * @private
   */
  __setupXRViewport(sessionMode: string): XRViewport {
    // Always get the last display. Additional displays are added at the end.(e.g. [Polyfill, HMD])
    const xrvp = sessionMode == 'immersive-ar' ? new ARViewport(this, sessionMode) : new VRViewport(this, sessionMode)

    const emitViewChanged = (event: ViewChangedEvent) => {
      this.emit('viewChanged', event)
    }

    xrvp.on('presentingChanged', (event: StateChangedEvent) => {
      const state = event.state

      // Note: the WebXREmulator does a double emit and this causes issues.
      if (this.__xrViewportPresenting == state) return

      this.__xrViewportPresenting = state
      if (state) {
        // Let the passes know that VR is starting.
        // They can do things like optimize shaders.
        for (const key in this.__passes) {
          const passSet = this.__passes[key]
          for (const pass of passSet) {
            pass.startPresenting()
          }
        }

        xrvp.on('viewChanged', emitViewChanged)
      } else {
        xrvp.off('viewChanged', emitViewChanged)
        this.emit('updated')

        for (const key in this.__passes) {
          const passSet = this.__passes[key]
          for (const pass of passSet) {
            pass.stopPresenting()
          }
        }

        const viewXfo = this.getViewport().getCamera().globalXfoParam.value
        const event = new ViewChangedEvent('CameraAndPointer', viewXfo)
        this.emit('viewChanged', event)

        this.requestRedraw()
      }
    })
    return xrvp
  }

  /**
   * The getVRViewport method.
   * @return - The return value.
   */
  getVRViewport(): XRViewport | undefined {
    return this.__xrViewport
  }

  /**
   * The getXRViewport method.
   * @return - The return value.
   */
  getXRViewport(): Promise<XRViewport> {
    return this.__xrViewportPromise
  }

  /**
   * The isXRViewportPresenting method.
   * @return - The return value.
   */
  isXRViewportPresenting(): boolean {
    return this.__xrViewportPresenting
  }

  // //////////////////////////
  // Rendering

  /**
   * The isContinuouslyDrawing method.
   * @return - The return value.
   */
  isContinuouslyDrawing(): boolean {
    return this.__continuousDrawing
  }

  /**
   * The startContinuousDrawing method.
   */
  startContinuousDrawing(): void {
    if (this.isContinuouslyDrawing() || this.__xrViewportPresenting) return

    const onAnimationFrame = () => {
      const renderstate = new ColorRenderState(this.gl)
      if (this.__continuousDrawing && !this.__xrViewportPresenting) window.requestAnimationFrame(onAnimationFrame)
      for (const vp of this.__viewports) vp.draw(renderstate)
    }

    this.__continuousDrawing = true
    window.requestAnimationFrame(onAnimationFrame)
  }

  /**
   * The stopContinuousDrawing method.
   */
  stopContinuousDrawing(): void {
    this.__continuousDrawing = false
  }

  /**
   * The toggleContinuousDrawing method.
   */
  toggleContinuousDrawing(): void {
    if (!this.__continuousDrawing) {
      this.startContinuousDrawing()
    } else {
      this.stopContinuousDrawing()
    }
  }

  /**
   * The drawItemChanged method.
   */
  drawItemChanged(): void {
    for (const vp of this.__viewports) vp.invalidateGeomDataBuffer()
    this.requestRedraw()
  }

  /**
   * Request a single redraw, usually in response to a signal/event.
   * @return - The return value.
   */
  requestRedraw(): boolean {
    // If a redraw has already been requested, then simply return and wait.
    if (
      this.__redrawRequested ||
      this.__continuousDrawing ||
      this.__xrViewportPresenting ||
      this.__drawSuspensionLevel > 0
    ) {
      return false
    }

    const onAnimationFrame = () => {
      this.__redrawRequested = false
      const renderstate = new ColorRenderState(this.gl)
      for (const vp of this.__viewports) {
        vp.draw(renderstate)
      }
      if (renderstate.stack.length != 1) {
        console.warn(' corrupt renderstate.stack.length:', renderstate.stack.length)
      }
    }
    window.requestAnimationFrame(onAnimationFrame)
    this.__redrawRequested = true
    return true
  }

  /**
   * Forces a redraw of the viewports
   */
  forceRender(): void {
    if (!this.__redrawRequested) {
      console.warn('@GlBaseRenderer#forceRender - Scene is not dirty')
      return
    }

    this.__redrawRequested = false
    const renderstate = new ColorRenderState(this.gl)
    for (const vp of this.__viewports) {
      vp.draw(renderstate)
    }
  }

  /**
   * The bindGLBaseRenderer method.
   * @param renderstate - The renderstate value.
   */
  bindGLBaseRenderer(renderstate: RenderState): void {
    renderstate.gl = this.__gl
    renderstate.renderer = this
    renderstate.shaderopts = { directives: this.directives } // we will start deprecating this in favor os a simpler directives

    const gl = this.__gl
    if (!renderstate.viewports || renderstate.viewports.length == 1) {
      renderstate.bindRendererUnifs = (unifs: ShaderUniforms) => {
        const { cameraMatrix, viewMatrix, projectionMatrix, eye, isOrthographic } = unifs
        if (cameraMatrix) {
          gl.uniformMatrix4fv(cameraMatrix.location, false, renderstate.cameraMatrix.asArray())
        }

        const vp = renderstate.viewports[0]
        if (viewMatrix) {
          gl.uniformMatrix4fv(viewMatrix.location, false, vp.viewMatrix.asArray())
        }

        if (projectionMatrix) {
          gl.uniformMatrix4fv(projectionMatrix.location, false, vp.projectionMatrix.asArray())
        }

        if (eye) {
          // for monocular rendering, we just render viewport 0
          gl.uniform1i(eye.location, 0)
        }
        if (isOrthographic) {
          // Left or right eye, when rendering stereo VR.
          gl.uniform1i(isOrthographic.location, vp.isOrthographic)
        }
      }
      renderstate.bindViewports = (unifs: ShaderUniforms, cb: any) => cb()
    } else {
      renderstate.bindRendererUnifs = (unifs: ShaderUniforms) => {
        // Note: the camera matrix should be the head position instead
        // of the eye position. The inverse(viewMatrix) can be used
        // when we want the eye pos.
        const { cameraMatrix } = unifs
        if (cameraMatrix) {
          gl.uniformMatrix4fv(cameraMatrix.location, false, renderstate.cameraMatrix.asArray())
        }
      }

      renderstate.bindViewports = (unifs: ShaderUniforms, cb: any) => {
        renderstate.viewports.forEach((vp: any, index: number) => {
          let vp_region = vp.region
          gl.viewport(vp_region[0], vp_region[1], vp_region[2], vp_region[3])

          const { viewMatrix, projectionMatrix, eye, isOrthographic } = unifs
          if (viewMatrix) {
            gl.uniformMatrix4fv(viewMatrix.location, false, vp.viewMatrix.asArray())
          }

          if (projectionMatrix) {
            gl.uniformMatrix4fv(projectionMatrix.location, false, vp.projectionMatrix.asArray())
          }

          if (eye) {
            // Left or right eye, when rendering stereo VR.
            gl.uniform1i(eye.location, index)
          }
          if (isOrthographic) {
            // Left or right eye, when rendering stereo VR.
            gl.uniform1i(isOrthographic.location, vp.isOrthographic)
          }
          cb()
        })
      }
    }
  }

  /**
   * The drawScene method.
   * @param renderstate - The renderstate value.
   */
  drawScene(renderstate: RenderState): void {
    // Bind already called by GLRenderer.

    renderstate.directives = [...this.directives, '#define DRAW_COLOR']
    renderstate.shaderopts.directives = renderstate.directives

    for (const key in this.__passes) {
      const passSet = this.__passes[key]
      for (const pass of passSet) {
        if (pass.enabled) pass.draw(renderstate)
      }
    }
  }

  /**
   * The drawHighlightedGeoms method.
   * @param renderstate - The renderstate value.
   */
  drawHighlightedGeoms(renderstate: HighlightRenderState): void {
    this.bindGLBaseRenderer(renderstate)

    renderstate.directives = [...this.directives, '#define DRAW_HIGHLIGHT']
    renderstate.shaderopts.directives = renderstate.directives

    for (const key in this.__passes) {
      const passSet = this.__passes[key]
      for (const pass of passSet) {
        if (pass.enabled) pass.drawHighlightedGeoms(renderstate)
      }
    }
  }

  /**
   * The drawSceneGeomData method.
   * @param renderstate - The renderstate value.
   * @param mask - The mask value
   */
  drawSceneGeomData(renderstate: GeomDataRenderState, mask = 255): void {
    renderstate.pushGLStack()
    renderstate.glEnable(this.__gl.DEPTH_TEST)
    renderstate.glEnable(this.__gl.CULL_FACE)

    this.bindGLBaseRenderer(renderstate)

    renderstate.directives = [...this.directives, '#define DRAW_GEOMDATA']
    renderstate.shaderopts.directives = renderstate.directives
    renderstate.floatGeomBuffer = this.floatGeomBuffer

    for (const key in this.__passes) {
      // Skip pass categories that do not match
      // the mask. E.g. we may not want to hit
      // "Overlay" geoms such as labels,
      // or we might be trying to move labels and don't
      // want to grab normal geoms.
      if ((Number.parseInt(key) & mask) == 0) continue
      const passSet = this.__passes[key]
      for (const pass of passSet) {
        if (pass.enabled) pass.drawGeomData(renderstate)
      }
    }
    renderstate.popGLStack()
  }

  // ////////////////////////////////////////
  // Static Methods

  /**
   * The registerPass method.
   * @param cls - The cls value.
   * @param passType - The passType value.
   */
  static registerPass(cls: typeof GLPass, passType: number): void {
    if (!registeredPasses[passType]) registeredPasses[passType] = []
    registeredPasses[passType].push(cls)
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy(): void {
    this.resizeObserver!.disconnect()
  }
}

export { GLBaseRenderer }
