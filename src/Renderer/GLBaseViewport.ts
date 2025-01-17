import { Color } from '../Math/index'
import { Plane, ParameterOwner, BaseImage, NumberParameter, ColorParameter, BaseTool, Scene } from '../SceneTree/index'
import { GLRenderer } from './GLRenderer'
import { GLHDRImage } from './GLHDRImage'
import { GLTexture2D } from './GLTexture2D'
import { GLFbo } from './GLFbo'
import { GLMesh } from './Drawing/GLMesh'
import { HDRImage } from '../SceneTree/Images/HDRImage'
import { ResizedEvent } from '../Utilities/Events/ResizedEvent'
import { SceneSetEvent } from '../Utilities/Events/SceneSetEvent'
import { ZeaPointerEvent } from '../Utilities/Events/ZeaPointerEvent'
import { KeyboardEvent } from '../Utilities/Events/KeyboardEvent'
import { ColorRenderState, RenderState, HighlightRenderState } from './RenderStates/index'
import { WebGL12RenderingContext } from './types/webgl'
import { GLBaseRenderer } from './GLBaseRenderer'
import { SystemDesc } from '../SystemDesc'

const FRAMEBUFFER = {
  MSAA_RENDERBUFFER: 0,
  COLORBUFFER: 1,
  DEPTHBUFFER: 2,
}

/**
 * Class representing a GL base viewport.
 * @extends ParameterOwner
 * @private
 */
class GLBaseViewport extends ParameterOwner {
  protected __gl: WebGL12RenderingContext
  protected renderer: GLRenderer
  protected __renderer: GLRenderer
  protected __fbo: WebGLFramebuffer | null = null
  protected quad: GLMesh
  protected offscreenBuffer: GLTexture2D | null = null
  protected depthTexture: GLTexture2D | null = null
  protected highlightedGeomsBuffer: GLTexture2D
  protected highlightedGeomsBufferFbo: GLFbo
  protected __backgroundTexture: BaseImage | null = null
  protected __backgroundGLTexture: GLHDRImage | GLTexture2D | null = null
  protected offscreenBufferFbo: GLFbo | null = null
  protected __width: number = 0
  protected __height: number = 0
  protected __canvasWidth: number = 0
  protected __canvasHeight: number = 0
  protected fb: Array<WebGLFramebuffer | null> | null = null
  protected colorRenderbuffer: WebGLRenderbuffer
  protected depthBuffer: WebGLRenderbuffer | null = null
  protected EXT_frag_depth: EXT_frag_depth | null = null
  protected manipulator: BaseTool
  protected depthRange: number[] = [0, 0]

  /**
   * @member backgroundColorParam - Changes background color of the scene
   */
  backgroundColorParam: ColorParameter = new ColorParameter('BackgroundColor', new Color('#eeeeee')) // owned by viewport

  /**
   * @member doubleClickTimeParam - The maximum time between clicks for a double click to be registered.
   */
  doubleClickTimeParam: NumberParameter = new NumberParameter('DoubleClickTimeMS', 200)

  /**
   * Create a GL base viewport.
   * @param renderer - The renderer value.
   */
  constructor(renderer: GLRenderer) {
    super()
    this.renderer = renderer
    this.__renderer = renderer

    this.addParameter(this.doubleClickTimeParam)

    const gl = this.__renderer.gl
    this.__gl = gl

    this.quad = new GLMesh(gl, new Plane(1, 1))

    // //////////////////////////////////
    // Setup Offscreen Render Targets
    // Note: On low end devices, such as Oculus, blitting the multi-sampled depth buffer is throwing errors,
    // and so we are simply disabling silhouettes on all low end devices now.
    if (gl.name == 'webgl2') {
      this.offscreenBuffer = new GLTexture2D(gl, {
        type: 'UNSIGNED_BYTE',
        format: 'RGBA',
        filter: 'LINEAR',
        width: 4,
        height: 4,
      })
      this.depthTexture = new GLTexture2D(gl, {
        type: gl.UNSIGNED_INT_24_8,
        format: gl.DEPTH_STENCIL,
        internalFormat: gl.name == 'webgl2' ? gl.DEPTH24_STENCIL8 : gl.DEPTH_COMPONENT,
        filter: gl.NEAREST,
        wrap: gl.CLAMP_TO_EDGE,
        width: 4,
        height: 4,
      })
      // this.offscreenBufferFbo = new GLFbo(gl, this.offscreenBuffer, true)
      // this.offscreenBufferFbo.setClearColor(this.backgroundColorParam.value.asArray())
    }

    this.highlightedGeomsBuffer = new GLTexture2D(gl, {
      type: 'UNSIGNED_BYTE',
      format: 'RGBA',
      filter: 'NEAREST',
      width: 4,
      height: 4,
    })
    this.highlightedGeomsBufferFbo = new GLFbo(gl, this.highlightedGeomsBuffer, true)
    this.highlightedGeomsBufferFbo.setClearColor(new Color(0, 0, 0, 0))

    // //////////////////////////////////
    // Setup Camera Manipulator
    const processBGValue = () => {
      const value = this.backgroundColorParam.value
      if (value instanceof BaseImage) {
        if (value instanceof HDRImage) {
          this.__backgroundTexture = value
          this.__backgroundGLTexture = new GLHDRImage(gl, value)
        } else {
          this.__backgroundTexture = value
          this.__backgroundGLTexture = new GLTexture2D(gl, value)
        }
      } else if (value instanceof Color) {
        if (this.__backgroundGLTexture) {
          this.__backgroundGLTexture.destroy()
          this.__backgroundGLTexture = null
          this.__backgroundTexture = null
        }
        if (this.offscreenBufferFbo) {
          this.offscreenBufferFbo.setClearColor(new Color(value.asArray()))
        }
      } else {
        console.warn('Invalid background:' + value)
      }
      this.emit('updated')
    }
    processBGValue()
    this.backgroundColorParam!.on('valueChanged', processBGValue)
  }

  /**
   * Returns the renderer this viewport is bound to.
   */
  getRenderer(): GLBaseRenderer {
    return this.renderer
  }

  /**
   * The getWidth method.
   * @return - The return value.
   */
  getWidth(): number {
    return this.__width
  }

  /**
   * The getHeight method.
   * @return - The return value.
   */
  getHeight(): number {
    return this.__height
  }

  /**
   * The resize method.
   * @param canvasWidth - The canvasWidth value.
   * @param canvasHeight - The canvasHeight value.
   */
  resize(canvasWidth: number, canvasHeight: number): void {
    if (this.__canvasWidth == canvasWidth && this.__canvasHeight == canvasHeight) return
    this.__canvasWidth = canvasWidth
    this.__canvasHeight = canvasHeight
    this.__width = canvasWidth
    this.__height = canvasHeight
    this.resizeRenderTargets(canvasWidth, canvasHeight)
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
    if (this.highlightedGeomsBuffer) {
      this.highlightedGeomsBufferFbo.resize(width, height)
    }

    const gl = this.__renderer.gl
    if (this.renderer.outlineThickness > 0 && this.renderer.outlineMethod == 'image') {
      const disableOnSafari = SystemDesc.browserName == 'Safari'

      // Note: On low end devices, such as Oculus, blitting the multi-sampled depth buffer is throwing errors,
      // and so we are simply disabling silhouettes on all low end devices now.
      if (disableOnSafari || gl.name == 'webgl') {
        console.warn('Disabling outlines on Safari due to a regression in WebKit', SystemDesc)
        return
      }

      if (this.fb) {
        gl.deleteFramebuffer(this.fb[FRAMEBUFFER.MSAA_RENDERBUFFER])
        gl.deleteFramebuffer(this.fb[FRAMEBUFFER.COLORBUFFER])
        gl.deleteFramebuffer(this.fb[FRAMEBUFFER.DEPTHBUFFER])
        if (this.colorRenderbuffer) gl.deleteRenderbuffer(this.colorRenderbuffer)
        if (this.depthBuffer) gl.deleteRenderbuffer(this.depthBuffer)
      }
      // Create and bind the framebuffer
      this.offscreenBuffer!.resize(width, height)
      this.depthTexture!.resize(width, height)

      this.fb = []
      this.fb[FRAMEBUFFER.MSAA_RENDERBUFFER] = gl.createFramebuffer()
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb[FRAMEBUFFER.MSAA_RENDERBUFFER])
      this.colorRenderbuffer = gl.createRenderbuffer()

      // Create the color buffer
      gl.bindRenderbuffer(gl.RENDERBUFFER, this.colorRenderbuffer)
      // iOS devices have trouble with Multisample render buffers
      if (this.renderer.multiSampledScreenBuffer) gl.renderbufferStorage(gl.RENDERBUFFER, gl.RGBA8, width, height)
      else gl.renderbufferStorageMultisample(gl.RENDERBUFFER, 4, gl.RGBA8, width, height)
      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, this.colorRenderbuffer)

      this.depthBuffer = gl.createRenderbuffer()
      gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthBuffer)
      if (this.renderer.multiSampledScreenBuffer)
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH24_STENCIL8, width, height)
      else gl.renderbufferStorageMultisample(gl.RENDERBUFFER, 4, gl.DEPTH24_STENCIL8, width, height)
      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depthBuffer)

      // //////////////////////////////////
      // COLORBUFFER
      this.fb[FRAMEBUFFER.COLORBUFFER] = gl.createFramebuffer()
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb[FRAMEBUFFER.COLORBUFFER])
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.offscreenBuffer.glTex, 0)
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)

      // //////////////////////////////////
      // DEPTHBUFFER
      // Create the depth texture that will be bitted to.
      this.fb[FRAMEBUFFER.DEPTHBUFFER] = gl.createFramebuffer()
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb[FRAMEBUFFER.DEPTHBUFFER])
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthTexture.glTex, 0)
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)

      const check = gl.checkFramebufferStatus(
        gl.name == 'webgl2' ? (<WebGL2RenderingContext>gl).DRAW_FRAMEBUFFER : gl.FRAMEBUFFER
      )
      if (check !== gl.FRAMEBUFFER_COMPLETE) {
        switch (check) {
          case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
            throw new Error(
              'The attachment types are mismatched or not all framebuffer attachment points are framebuffer attachment complete.'
            )
          case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
            throw new Error('There is no attachment.')
          case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
            throw new Error('Height and width of the attachment are not the same.')
          case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
            throw new Error(
              'The format of the attachment is not supported or if depth and stencil attachments are not the same renderbuffer.'
            )
          case 36061: // gl.GL_FRAMEBUFFER_UNSUPPORTED:
            throw new Error('The framebuffer is unsupported')
          default:
            throw new Error('Incomplete Frambuffer')
        }
      }
    }
  }

  /**
   * The draw method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  draw(renderstate: ColorRenderState): void {
    const gl = this.__renderer.gl

    renderstate.pushGLStack()

    const prevRendertarget = renderstate.boundRendertarget

    if (this.renderer.outlineThickness > 0 && this.renderer.outlineMethod == 'image') {
      const disableOnSafari = SystemDesc.browserName == 'Safari'
      if (disableOnSafari || gl.name == 'webgl') {
        console.warn('Disabling outlines on Safari due to a regression in WebKit', SystemDesc)
      } else {
        if (!this.fb) this.resizeRenderTargets(this.__width, this.__height)
        const frameBuffer = this.fb![FRAMEBUFFER.MSAA_RENDERBUFFER]!
        gl.bindFramebuffer(
          gl.name == 'webgl2' ? (<WebGL2RenderingContext>gl).DRAW_FRAMEBUFFER : gl.FRAMEBUFFER,
          frameBuffer
        )
        renderstate.boundRendertarget = frameBuffer
      }
    } else {
      // Make sure the default fbo is bound
      // Note: Sometimes an Fbo is left bound
      // from another op(like resizing, populating etc..)
      // We need to unbind here to ensure rendering is to the
      // right target.
      if (!renderstate.boundRendertarget) gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    }

    renderstate.glEnable(gl.DEPTH_TEST)

    this.__renderer.drawScene(renderstate)

    const highlightRenderState = renderstate.toHighlightRenderState()
    this.drawHighlights(highlightRenderState)
    if (highlightRenderState.stack.length != 1) {
      console.warn(' corrupt highlightRenderState.stack.length:', highlightRenderState.stack.length)
    }

    // //////////////////////////////////
    // Post processing.
    if (this.fb) {
      // "blit" the scene into the color buffer
      const gl2 = <WebGL2RenderingContext>gl
      gl2.bindFramebuffer(gl2.READ_FRAMEBUFFER, this.fb[FRAMEBUFFER.MSAA_RENDERBUFFER])
      gl2.bindFramebuffer(gl2.DRAW_FRAMEBUFFER, this.fb[FRAMEBUFFER.COLORBUFFER])
      gl2.clearBufferfv(gl2.COLOR, 0, [0.0, 0.0, 0.0, 0.0])

      gl2.blitFramebuffer(
        0,
        0,
        this.__width,
        this.__height,
        0,
        0,
        this.__width,
        this.__height,
        gl2.COLOR_BUFFER_BIT,
        gl2.LINEAR
      )

      gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, prevRendertarget)
      renderstate.boundRendertarget = prevRendertarget
      gl.viewport(0, 0, this.__width, this.__height)

      gl.disable(gl.DEPTH_TEST)
      const screenQuad = this.__renderer.screenQuad!
      screenQuad.bindShader(renderstate)
      screenQuad.draw(renderstate, this.offscreenBuffer!)
      gl.enable(gl.DEPTH_TEST)
    }

    renderstate.popGLStack()
    this.renderer.emit('redrawOccurred')
  }

  /**
   * Draws the Silhouettes around geometries.
   * @param renderstate - The object tracking the current state of the renderer
   * @private
   */
  drawSilhouettes(renderstate: RenderState): void {
    renderstate.pushGLStack()
    // We cannot render silhouettes in iOS because EXT_frag_depth is not supported
    // and without it, we cannot draw lines over the top of geometries.
    // Note: On low end devices, such as Oculus, blitting the multi-sampled depth buffer is throwing errors,
    // and so we are simply disabling silhouettes on all low end devices now.
    const gl = this.__renderer.gl
    const gl2 = <WebGL2RenderingContext>gl
    gl2.bindFramebuffer(gl2.READ_FRAMEBUFFER, this.fb[FRAMEBUFFER.MSAA_RENDERBUFFER])
    gl2.bindFramebuffer(gl2.DRAW_FRAMEBUFFER, this.fb[FRAMEBUFFER.DEPTHBUFFER])
    gl2.clearBufferfv(gl2.COLOR, 0, [1, 1, 1, 1])

    gl2.blitFramebuffer(
      0,
      0,
      this.__width,
      this.__height,
      0,
      0,
      this.__width,
      this.__height,
      gl2.DEPTH_BUFFER_BIT,
      gl2.NEAREST
    )
    // Rebind the MSAA RenderBuffer.
    gl2.bindFramebuffer(gl2.DRAW_FRAMEBUFFER, this.fb[FRAMEBUFFER.MSAA_RENDERBUFFER])
    renderstate.boundRendertarget = this.fb[FRAMEBUFFER.MSAA_RENDERBUFFER]
    gl2.viewport(0, 0, this.__width, this.__height)

    // ////////////////////////////////////
    //
    renderstate.glEnable(gl.BLEND)
    renderstate.glDisable(gl.DEPTH_TEST)

    gl2.blendEquation(gl2.FUNC_ADD)
    gl2.blendFunc(gl2.SRC_ALPHA, gl2.ONE_MINUS_SRC_ALPHA) // For add
    gl2.depthMask(false)

    this.renderer.silhouetteShader.bind(renderstate)

    const unifs = renderstate.unifs

    this.depthTexture.bindToUniform(renderstate, unifs.depthTexture)

    gl2.uniform2f(unifs.screenSize.location, this.__width, this.__height)
    gl2.uniform1f(unifs.outlineThickness.location, this.renderer.outlineThickness * window.devicePixelRatio)

    const oc = this.renderer.outlineColor.asArray()
    gl2.uniform4f(unifs.outlineColor.location, oc[0], oc[1], oc[2], oc[3])
    gl2.uniform1f(unifs.outlineSensitivity.location, this.renderer.outlineSensitivity)
    gl2.uniform1f(unifs.outlineDepthBias.location, this.renderer.outlineDepthBias)

    gl2.uniform2f(unifs.depthRange.location, this.depthRange[0], this.depthRange[1])

    this.quad.bindAndDraw(renderstate)

    gl2.depthMask(true)

    renderstate.popGLStack()
  }

  /**
   * Draws the highlights around geometries.
   * @param renderstate - The object tracking the current state of the renderer
   * @private
   */
  drawHighlights(renderstate: HighlightRenderState): void {
    if (this.highlightedGeomsBufferFbo) {
      const gl = this.__renderer.gl

      this.highlightedGeomsBufferFbo.bindForWriting(renderstate)
      this.highlightedGeomsBufferFbo.clear()

      renderstate.pushGLStack()
      // Highlighted geoms should always be rendered 2-sided
      renderstate.glEnable(gl.CULL_FACE)
      renderstate.glEnable(gl.DEPTH_TEST)
      renderstate.glDisable(gl.BLEND)

      gl.depthFunc(gl.LESS)
      gl.depthMask(true)
      renderstate.glShader = null // clear any bound shaders.

      this.__renderer.drawHighlightedGeoms(renderstate)

      // Unbind and restore the bound fbo
      this.highlightedGeomsBufferFbo.unbindForWriting(renderstate)

      // Now render the outlines to the entire screen.
      gl.viewport(0, 0, this.__width, this.__height)

      // Turn this on to debug the highlight data buffer.
      const debugHighlightBuffer = false
      if (debugHighlightBuffer) {
        this.__renderer.screenQuad!.bindShader(renderstate)
        this.highlightedGeomsBuffer.bindToUniform(renderstate, renderstate.unifs.image)
        this.__renderer.screenQuad!.draw(renderstate)
      } else {
        this.renderer.highlightsShader.bind(renderstate)
        renderstate.pushGLStack()
        renderstate.glEnable(gl.BLEND)

        gl.blendEquation(gl.FUNC_ADD)
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA) // For add

        const unifs = renderstate.unifs
        gl.uniform1f(unifs.outlineThickness.location, this.renderer.highlightOutlineThickness)
        this.highlightedGeomsBuffer.bindToUniform(renderstate, unifs.highlightDataTexture)
        this.quad.bindAndDraw(renderstate)

        renderstate.popGLStack()
      }

      renderstate.popGLStack()
    }
  }

  // ///////////////////////////
  // Events

  /**
   * The getManipulator method.
   * @return - The return value.
   */
  getManipulator(): BaseTool {
    return this.manipulator
  }

  /**
   * Sets the tool that will receive mouse, touch and keyboard events from the viewport.
   * @param tool - The manipulator value.
   */
  setManipulator(tool: BaseTool): void {
    if (this.manipulator != tool) {
      if (this.manipulator && this.manipulator.deactivateTool) {
        this.manipulator.deactivateTool()
      }

      this.manipulator = tool

      if (this.manipulator.activateTool) {
        this.manipulator.activateTool()
      }
    }
  }

  /**
   * Handler of the `pointerdown` event fired when the pointer device is initially pressed.
   *
   * @param event - The DOM event produced by a pointer
   */
  onPointerDown(event: ZeaPointerEvent): void {
    console.warn('@GLBaseViewport#onPointerDown - Implement me!')
  }

  /**
   * Handler of the `pointerup` event fired when the pointer device is finally released.
   *
   * @param event - The DOM event produced by a pointer
   */
  onPointerUp(event: ZeaPointerEvent): void {
    console.warn('@GLBaseViewport#onPointerUp - Implement me!')
  }

  /**
   * Handler of the `pointermove` event fired when the pointer device changes coordinates, and the pointer has not been cancelled
   *
   * @param event - The DOM event produced by a pointer
   */
  onPointerMove(event: ZeaPointerEvent): void {
    console.warn('@GLBaseViewport#onPointerMove - Implement me!')
  }

  /**
   * Invoked when the mouse pointer is moved into this viewport.
   *
   * @param event - The DOM event produced by a pointer
   */
  onPointerEnter(event: ZeaPointerEvent): void {
    console.warn('@GLBaseViewport#onPointerEnter - Implement me!')
  }

  /**
   * Invoked when the mouse pointer is moved out of this viewport.
   *
   * @param event - The DOM event produced by a pointer
   */
  onPointerLeave(event: ZeaPointerEvent): void {
    console.warn('@GLBaseViewport#onPointerLeave - Implement me!')
  }

  /**
   * Invoked when the mouse pointer is moved out of an element.
   * @param event - The event that occurs.
   */
  onMouseLeave(event: ZeaPointerEvent): void {}

  /**
   * Invoked when the user is pressing a key on the keyboard.
   * @param event - The event that occurs.
   */
  onKeyDown(event: KeyboardEvent): void {}

  /**
   * Causes an event to occur  when the user releases a key on the keyboard.
   * @param event - The event that occurs.
   */
  onKeyUp(event: KeyboardEvent): void {}
}

export { GLBaseViewport, FRAMEBUFFER }
