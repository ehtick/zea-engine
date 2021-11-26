import { Color } from '../Math/Color'
import { EventEmitter } from '../Utilities/index'
import { processTextureParams } from './processTextureParams'

/** The GLRenderTarget is used to generate a WebGL Framebuffer and its associated textures.
 * It can be used to create a FrameBuffer, several color textures and an optional depth texture, all bound to the Framebuffer.
 *
 *
 * ```javascript
 *  const renderTarget = new GLRenderTarget(gl, {
 *    type: gl.FLOAT,
 *    format: gl.RGBA,
 *    minFilter: gl.NEAREST,
 *    magFilter: gl.NEAREST,
 *    width: 128,
 *    height: 64,
 *    depthType: gl.FLOAT,
 *    depthFormat: gl.DEPTH_COMPONENT,
 *    depthInternalFormat: gl.DEPTH_COMPONENT32F,
 *  })
 * ```
 */
class GLRenderTarget extends EventEmitter {
  protected __gl: WebGL12RenderingContext
  protected textureTargets: WebGLTexture[]
  protected depthTexture: WebGLTexture
  protected textureDesc: number[]
  protected frameBuffer: WebGLFramebuffer

  protected params: Record<string, any> = {}
  protected type: number
  protected format: number
  protected internalFormat: number
  protected minFilter: number
  protected maxFilter: number
  protected wrap: any
  protected flipY: boolean = false
  width: number = 0
  height: number = 0
  clearColor: Color
  protected colorMask: Array<boolean>
  protected textureType: any

  protected __prevBoundFbo: any
  /**
   * Create a GL render target.
   * @param gl - The webgl rendering context.
   * @param params - The params value.
   */
  constructor(gl: WebGL12RenderingContext, params?: Record<string, any>) {
    super()
    this.__gl = gl
    this.textureTargets = []
    this.depthTexture = null
    this.textureDesc = [0, 0, 0, 0]
    this.clearColor = new Color(0, 0, 0, 0)
    this.colorMask = [true, true, true, true]

    if (params) {
      this.configure(params)
    }
  }

  /**
   * The configure method.
   * @param params - The params param.
   */
  configure(params: Record<string, any>) {
    const gl = this.__gl

    const p: Record<string, any> = processTextureParams(gl, params) // TODO: review

    this.textureTargets.forEach((colorTexture) => {
      gl.deleteTexture(colorTexture)
    })
    this.textureTargets = []
    if (this.depthTexture) {
      gl.deleteTexture(this.depthTexture)
      this.depthTexture = null
    }
    if (this.frameBuffer) {
      gl.deleteFramebuffer(this.frameBuffer)
    }

    this.params = p
    this.type = p.type
    this.format = p.format
    this.internalFormat = p.internalFormat
    this.minFilter = p.minFilter ? p.minFilter : p.filter
    this.minFilter = p.magFilter ? p.magFilter : p.filter
    this.wrap = p.wrap
    this.flipY = p.flipY
    this.width = p.width
    this.height = p.height

    this.textureType = 1 // Default 2d 8 bit texture image texture.
    this.textureDesc[0] = this.width
    this.textureDesc[1] = this.height

    // -- Initialize texture targets
    const numColorChannels =
      params.numColorChannels != undefined ? params.numColorChannels : p.format != undefined ? 1 : 0
    for (let i = 0; i < numColorChannels; i++) {
      gl.activeTexture(gl.TEXTURE0 + 1)
      const colorTexture = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, colorTexture)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, p.wrapS)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, p.wrapT)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, p.minFilter)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, p.magFilter)
      gl.texImage2D(gl.TEXTURE_2D, 0, this.internalFormat, p.width, p.height, 0, this.format, this.type, null)
      this.textureTargets.push(colorTexture)
    }

    if (p.depthFormat) {
      if (gl.name == 'webgl' && !gl.__ext_WEBGL_depth_texture)
        throw new Error('Depth textures not support on this device')
      // -- Initialize depth texture
      gl.activeTexture(gl.TEXTURE0)
      this.depthTexture = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, this.depthTexture)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, p.wrapS)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, p.wrapT)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, p.minFilter)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, p.magFilter)

      // the proper texture format combination can be found here
      // https://www.khronos.org/registry/OpenGL-Refpages/es3.0/html/glTexImage2D.xhtml
      gl.texImage2D(gl.TEXTURE_2D, 0, p.depthInternalFormat, p.width, p.height, 0, p.depthFormat, p.depthType, null)
    }

    // -- Initialize frame buffer
    this.frameBuffer = gl.createFramebuffer()

    this.bindForWriting() // TODO

    if (this.textureTargets.length > 0) {
      if (this.textureTargets.length > 1) {
        if (gl.name == 'webgl' && !gl.drawBuffers) {
          // Trying to support drawBuffers on webgl1 is just pointless
          // gl.__ext_draw_buffers = gl.getExtension('WEBGL_draw_buffers')
          // gl.drawBuffers = gl.__ext_draw_buffers.drawBuffersWEBGL.bind(gl.__ext_draw_buffers)
          // for (let i = 1; i < 14; i++) {
          //   gl['COLOR_ATTACHMENT' + i] = gl.__ext_draw_buffers['COLOR_ATTACHMENT' + i + '_WEBGL']
          // }
          // gl.MAX_COLOR_ATTACHMENTS = gl.__ext_draw_buffers.MAX_COLOR_ATTACHMENTS_WEBGL
          // gl.MAX_DRAW_BUFFERS = gl.__ext_draw_buffers.MAX_DRAW_BUFFERS_WEBGL
        }
      }

      const bufferIds = []
      for (let i = 0; i < this.textureTargets.length; i++) {
        gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, gl.TEXTURE_2D, this.textureTargets[i], 0)
        bufferIds.push(gl.COLOR_ATTACHMENT0 + i)
      }
      if (this.textureTargets.length > 1) {
        gl.drawBuffers(bufferIds)
      }
    }

    if (this.depthTexture) {
      gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthTexture, 0)
    }

    this.checkFramebuffer()
  }

  /**
   * The checkFramebuffer method.
   */
  checkFramebuffer() {
    this.bindForWriting() // TODO

    const gl = this.__gl
    const status = gl.checkFramebufferStatus(gl.DRAW_FRAMEBUFFER)
    if (status != gl.FRAMEBUFFER_COMPLETE) {
      switch (status) {
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
      return
    }
    this.unbindForWriting()
  }

  /**
   * The bindForWriting method.
   * @param renderstate - The object tracking the current state of the renderer
   * @param clear - The clear value.
   */
  bindForWriting(renderstate?: RenderState, clear = false) {
    if (renderstate) {
      this.__prevBoundFbo = renderstate.boundRendertarget
      renderstate.boundRendertarget = this.frameBuffer
    }
    const gl = this.__gl
    if (gl.name == 'webgl2') gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.frameBuffer)
    else gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer)
    gl.viewport(0, 0, this.width, this.height) // Match the viewport to the texture size
    if (clear) this.clear()
  }

  /**
   * The unbindForWriting method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  unbindForWriting(renderstate?: RenderState) {
    if (renderstate) renderstate.boundRendertarget = this.__prevBoundFbo
    const gl = this.__gl
    if (gl.name == 'webgl2') gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.__prevBoundFbo)
    else gl.bindFramebuffer(gl.FRAMEBUFFER, this.__prevBoundFbo)
  }

  /**
   * The clear method.
   * @param clearDepth - The clearDepth value.
   */
  clear(clearDepth = true) {
    const gl = this.__gl
    const colMask = this.colorMask
    gl.colorMask(colMask[0], colMask[1], colMask[2], colMask[3])
    const clearCol = this.clearColor.asArray()
    gl.clearColor(clearCol[0], clearCol[1], clearCol[2], clearCol[3])
    let flags = 0
    if (this.textureTargets.length > 0) flags |= gl.COLOR_BUFFER_BIT
    if (this.depthTexture) flags |= gl.DEPTH_BUFFER_BIT
    gl.clear(flags)
  }

  /**
   * Binds the render target in preparation for 'readPixels' calls to pull data back to main memory.
   */
  bindForReading() {
    const gl = this.__gl
    if (gl.name == 'webgl2') gl.bindFramebuffer(gl.READ_FRAMEBUFFER, this.frameBuffer)
    else gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer)
  }

  /**
   * The unbindForReading method.
   */
  unbindForReading() {
    const gl = this.__gl
    if (gl.name == 'webgl2') gl.bindFramebuffer(gl.READ_FRAMEBUFFER, null)
    else gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  }

  /**
   * The bindColorTexture method.
   * @param renderstate - The object tracking the current state of the renderer
   * @param channelId - The channelId value.
   * @return - The return value.
   */
  bindColorTexture(renderstate: RenderState, unif: Uniform, channelId = 0): boolean {
    const gl = this.__gl
    const unit = renderstate.boundTextures++
    gl.uniform1i(unif.location, unit)
    gl.activeTexture(gl.TEXTURE0 + unit)
    gl.bindTexture(gl.TEXTURE_2D, this.textureTargets[channelId])
    return true
  }

  /**
   * The bindDepthTexture method.
   * @param renderstate - The object tracking the current state of the renderer
   * @param unif - The WebGL uniform
   * @return - The return value.
   */
  bindDepthTexture(renderstate: RenderState, unif: Uniform): boolean {
    const gl = this.__gl
    const unit = renderstate.boundTextures++
    gl.uniform1i(unif.location, unit)
    gl.activeTexture(gl.TEXTURE0 + unit)
    gl.bindTexture(gl.TEXTURE_2D, this.depthTexture)
    return true
  }

  /**
   * The unbind method.
   */
  unbind(renderstate?: RenderState) {
    this.unbindForWriting(renderstate)
  }

  /**
   * The resize method.
   * @param width - The width value.
   * @param height - The height value.
   * @param preserveData - The preserveData value.
   */
  resize(width: number, height: number, preserveData = false) {
    const gl = this.__gl
    const sizeChanged = this.width != width || this.height != height
    if (sizeChanged) {
      const maxSize = gl.getParameter(gl.MAX_TEXTURE_SIZE)
      if (width < 0 || width > maxSize || height < 0 || height > maxSize) {
        throw new Error(`GLRenderTarget: Invalid texture size. width: ${width} height: ${height} maxSize: ${maxSize}`)
      }
      if (preserveData) {
        this.bindForReading()
      }

      const p = this.params

      for (let i = 0; i < this.textureTargets.length; i++) {
        const colorTexture = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, colorTexture)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, p.wrapS)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, p.wrapT)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, p.minFilter)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, p.magFilter)

        gl.texImage2D(gl.TEXTURE_2D, 0, this.internalFormat, width, height, 0, this.format, this.type, null)

        if (preserveData) {
          // see: http://jsfiddle.net/greggman/rs21sr46
          gl.copyTexImage2D(
            gl.TEXTURE_2D,
            0,
            this.internalFormat,
            0,
            0,
            Math.min(width, this.width),
            Math.min(height, this.height),
            0
          )
        }

        gl.deleteTexture(this.textureTargets[i])
        this.textureTargets[i] = colorTexture
      }

      if (p.depthFormat) {
        if (gl.name == 'webgl' && !gl.__ext_WEBGL_depth_texture)
          throw new Error('Depth textures not support on this device')

        // -- Initialize depth texture
        gl.activeTexture(gl.TEXTURE0)
        const depthTexture = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, depthTexture)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, p.wrapS)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, p.wrapT)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, p.minFilter)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, p.magFilter)

        // the proper texture format combination can be found here
        // https://www.khronos.org/registry/OpenGL-Refpages/es3.0/html/glTexImage2D.xhtml
        gl.texImage2D(gl.TEXTURE_2D, 0, p.depthInternalFormat, width, height, 0, p.depthFormat, p.depthType, null)

        if (preserveData) {
          // see: http://jsfiddle.net/greggman/rs21sr46
          gl.copyTexImage2D(
            gl.TEXTURE_2D,
            0,
            this.internalFormat,
            0,
            0,
            Math.min(width, this.width),
            Math.min(height, this.height),
            0
          )
        }

        gl.deleteTexture(this.depthTexture)
        this.depthTexture = depthTexture
      }

      if (preserveData) {
        this.unbindForReading()
      }

      this.width = width
      this.height = height

      // -- Initialize frame buffer
      if (this.frameBuffer) {
        // Note: avoid re-using the framebuffer.
        // see here: https://gamedev.stackexchange.com/questions/91991/resizing-a-framebuffer-object-ie-its-attachments-on-screen-resize
        gl.deleteFramebuffer(this.frameBuffer)
      }
      this.frameBuffer = gl.createFramebuffer()

      this.bindForWriting()

      if (this.textureTargets.length > 0) {
        if (this.textureTargets.length > 1) {
          if (gl.name == 'webgl' && !gl.drawBuffers) {
            // Trying to support drawBuffers on webgl1 is just pointless
            // gl.__ext_draw_buffers = gl.getExtension('WEBGL_draw_buffers')
            // gl.drawBuffers = gl.__ext_draw_buffers.drawBuffersWEBGL.bind(gl.__ext_draw_buffers)
            // for (let i = 1; i < 14; i++) {
            //   gl['COLOR_ATTACHMENT' + i] = gl.__ext_draw_buffers['COLOR_ATTACHMENT' + i + '_WEBGL']
            // }
            // gl.MAX_COLOR_ATTACHMENTS = gl.__ext_draw_buffers.MAX_COLOR_ATTACHMENTS_WEBGL
            // gl.MAX_DRAW_BUFFERS = gl.__ext_draw_buffers.MAX_DRAW_BUFFERS_WEBGL
          }
        }

        const bufferIds = []
        for (let i = 0; i < this.textureTargets.length; i++) {
          gl.framebufferTexture2D(
            gl.DRAW_FRAMEBUFFER,
            gl.COLOR_ATTACHMENT0 + i,
            gl.TEXTURE_2D,
            this.textureTargets[i],
            0
          )
          bufferIds.push(gl.COLOR_ATTACHMENT0 + i)
        }
        if (this.textureTargets.length > 1) {
          gl.drawBuffers(bufferIds)
        }
      }

      if (this.depthTexture) {
        gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthTexture, 0)
      }

      this.checkFramebuffer()
    }
  }

  /**
   * The bindToUniform method.
   * @param renderstate - The renderstate param.
   * @param unif - The WebGL uniform
   * @param bindings - The bindings param.
   * @return - The return value.
   */
  bindToUniform(renderstate: RenderState, unif: Uniform, bindings?: any) {
    // if (!this.__loaded) {
    //   return false
    // }
    // if (!this.__gltex) {
    //   throw new Error('Unable to bind non-initialized or deleted texture.')
    // }

    const unit = renderstate.boundTextures++
    const texId = this.__gl.TEXTURE0 + unit
    const gl = this.__gl
    gl.activeTexture(texId)
    gl.bindTexture(gl.TEXTURE_2D, this.textureTargets[0])
    gl.uniform1i(unif.location, unit)

    if (bindings) {
      if (bindings.textureTypeUnif) {
        gl.uniform1i(bindings.textureTypeUnif.location, this.textureType)
      }

      if (bindings.textureDescUnif) {
        this.__gl.uniform4fv(bindings.textureDescUnif.location, this.textureDesc)
      }
    }

    return true
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy() {
    const gl = this.__gl
    this.textureTargets.forEach((colorTexture) => {
      gl.deleteTexture(colorTexture)
    })
    this.textureTargets = []
    if (this.depthTexture) {
      gl.deleteTexture(this.depthTexture)
      this.depthTexture = null
    }
    if (this.frameBuffer) {
      gl.deleteFramebuffer(this.frameBuffer)
    }
  }
}
export { GLRenderTarget }
