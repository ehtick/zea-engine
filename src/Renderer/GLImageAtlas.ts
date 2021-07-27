import { Vec2, Vec4, Color } from '../Math/index'

import { GrowingPacker } from '../Utilities/index'

import { BaseImage } from '../SceneTree/index'

import { GLTexture2D } from './GLTexture2D'
import { GLRenderTarget } from './GLRenderTarget'
import { generateShaderGeomBinding } from './Drawing/GeomShaderBinding'
import { MathFunctions } from '../Utilities/MathFunctions'
import { AtlasLayoutShader } from './Shaders/AtlasLayoutShader'

/**
 * An Image Atlas lays out multiple smaller images within a larger image atlas, and tracks their positions.
 * @private
 */
class GLImageAtlas extends GLRenderTarget {
  protected __gl: WebGLRenderingContext
  protected __name: string
  protected __formatParam: string
  protected __typeParam: string
  protected clearColor: Color
  protected __subImages: any[]
  protected __layoutNeedsRegeneration: boolean
  protected __asyncCount: number
  protected loaded: boolean
  protected ready: boolean
  protected __layout: any
  protected __atlasLayoutTexture: any
  protected __layoutVec4s: any
  /**
   * Create an image atlas..
   * @param {WebGLRenderingContext} gl - The webgl rendering context.
   * @param {string} name - The name value.
   * @param {string} format - The format value.
   * @param {string} type - The type value.
   */
  constructor(gl: WebGLRenderingContext, name: string, format = 'RGBA', type = 'FLOAT') {
    super(gl)
    this.__name = name
    this.__formatParam = format
    this.__typeParam = type
    this.clearColor = new Color(0, 0, 0, 0)
    this.__subImages = []
    this.__layoutNeedsRegeneration = false
    this.__asyncCount = 0
    this.loaded = false
  }

  // eslint-disable-next-line require-jsdoc
  incAsyncCount(count = 1) {
    this.__asyncCount += count
    this.ready = false
  }

  // eslint-disable-next-line require-jsdoc
  decAsyncCount() {
    if (this.__asyncCount > 0) {
      this.__asyncCount--
      if (this.__asyncCount == 0) {
        this.loaded = true
        this.emit('loaded', {})
      }
    }
  }

  /**
   * The isLoaded method.
   * @return {boolean} - The return value.
   */
  isLoaded() {
    return this.__asyncCount == 0
  }

  /**
   * The getMainImage method.
   * @return {BaseImage} - The return value.
   */
  getMainImage() {
    return this.frameBuffer // TODO: is this correct?
  }

  /**
   * The addSubImage method.
   * @param {BaseImage} subImage - The subImage value.
   * @return {number} - The return value.
   */
  addSubImage(subImage: BaseImage) {
    if (subImage instanceof BaseImage) {
      const gltexture: GLTexture2D = new GLTexture2D(this.__gl, subImage)
      if (!subImage.isLoaded()) {
        this.incAsyncCount()
        subImage.on('loaded', () => {
          this.decAsyncCount()
        })
      }
      subImage.setMetadata('ImageAtlas_gltex', gltexture)
      gltexture.addRef(this)

      const updated = () => {
        // TODO: Check to see if the new dimensions
        // do not match the previous. If not, then we
        // need to relayout. wE could also avlid a complete
        // relaout by reremoving and re-adding this image.
        this.__layoutNeedsRegeneration = true
        this.renderAtlas()
      }
      subImage.on('updated', updated)
      this.__subImages.push(gltexture)
    } else {
      ;(<GLTexture2D>subImage).addRef(this) // subImage is a GLTexture2D
      this.__subImages.push(subImage)
    }

    this.__layoutNeedsRegeneration = true
    return this.__subImages.length - 1
  }

  /**
   * The removeSubImage method.
   * @param {BaseImage} subImage - The subImage value.
   */
  removeSubImage(subImage: BaseImage) {
    let index
    if (subImage instanceof BaseImage) {
      const gltext = subImage.getMetadata('ImageAtlas_gltex')
      index = this.__subImages.indexOf(gltext)
      subImage.deleteMetadata('ImageAtlas_gltex')
    } else {
      index = this.__subImages.indexOf(subImage)
    }
    const gltexture = this.__subImages[index]
    gltexture.removeRef(this)

    this.__subImages.splice(index, 1)

    this.__layoutNeedsRegeneration = true
  }

  /**
   * The getSubImage method.
   * @param {number} index - The index value.
   * @return {BaseImage} - The image value.
   */
  getSubImage(index: number) {
    return this.__subImages[index]
  }

  /**
   * The numSubImages method.
   * @return {number} - The return value.
   */
  numSubImages() {
    if (this.__layout) return this.__layout.length
    return this.__subImages.length
  }

  /**
   * The generateAtlasLayout method.
   */
  generateAtlasLayout(minTileSize?: any) {
    if (this.__subImages.length == 0) {
      this.__layoutNeedsRegeneration = false
      return
    }
    const border = 2

    // We must lay out the sub images in order of size.
    // else the paker might have trouble.
    const blocks: any[] = []
    this.__subImages.forEach((subImage, index) => {
      blocks.push({
        w: subImage.width + border * 2,
        h: subImage.height + border * 2,
        area: subImage.width * subImage.height,
        index,
      })
    })

    blocks.sort((a, b) => (a.area > b.area ? -1 : a.area < b.area ? 1 : 0))

    const packer = new GrowingPacker()
    packer.fit(blocks)

    this.__layout = []
    blocks.forEach((block, index) => {
      // const subImage = this.__subImages[block.index]
      if (block.fit) {
        this.__layout[block.index] = {
          pos: new Vec2(block.fit.x + border, block.fit.y + border),
          size: new Vec2(block.w, block.h),
        }
      } else {
        console.warn('Unable to fit image')
      }
    })

    const width = packer.root.w
    const height = packer.root.h

    // console.log(this.__name + " Atlas Texture size:" + width.toFixed() + ", " + height.toFixed());

    // Note: only RGBA Float textures can be rendered to on Firefox.(Not RGB)
    this.configure({
      width,
      height,
      format: this.__typeParam == 'FLOAT' && this.__formatParam == 'RGB' ? 'RGBA' : this.__formatParam,
      type: this.__typeParam,
      filter: 'LINEAR',
    })

    const gl = <Record<any, any>>this.__gl
    // this.__fbo = new GLFbo(gl, this)
    // this.__fbo.setClearColor(this.__clearColor)

    if (!gl.__quadVertexIdsBuffer) gl.setupInstancedQuad()

    if (!gl.__atlasLayoutShader) {
      gl.__atlasLayoutShader = new AtlasLayoutShader(this.__gl)
      const shaderComp = gl.__atlasLayoutShader.compileForTarget('GLImageAtlas')
      gl.__atlasLayoutShaderBinding = generateShaderGeomBinding(
        gl,
        shaderComp.attrs,
        gl.__quadattrbuffers,
        gl.__quadIndexBuffer
      )
    }

    const pixelsPerItem = 1
    let size = Math.round(Math.sqrt(this.__layout.length * pixelsPerItem) + 0.5)
    // Only support power 2 textures. Else we get strange corruption on some GPUs
    // in some scenes.
    size = MathFunctions.nextPow2(size)
    // Size should be a multiple of pixelsPerItem, so each geom item is always contiguous
    // in memory. (makes updating a lot easier. See __updateItemInstanceData below)
    if (size % pixelsPerItem != 0) size += pixelsPerItem - (size % pixelsPerItem)

    if (!gl.floatTexturesSupported) {
      this.__layoutVec4s = []
      this.__layout.forEach((layoutItem: any, index: number) => {
        this.__layoutVec4s[index] = [
          layoutItem.pos.x / width,
          layoutItem.pos.y / height,
          layoutItem.size.x / width,
          layoutItem.size.y / height,
        ]
      })
    } else {
      const dataArray = new Float32Array(size * size * 4) /* each pixel has 4 floats*/
      for (let i = 0; i < this.__layout.length; i++) {
        const layoutItem = this.__layout[i]
        const vec4 = Vec4.createFromBuffer(dataArray.buffer, i * 4 * 4)
        vec4.set(
          layoutItem.pos.x / width,
          layoutItem.pos.y / height,
          layoutItem.size.x / width,
          layoutItem.size.y / height
        )
      }
      if (
        !this.__atlasLayoutTexture ||
        this.__atlasLayoutTexture.width != size ||
        this.__atlasLayoutTexture.height != size
      ) {
        if (this.__atlasLayoutTexture) this.__atlasLayoutTexture.destroy()
        this.__atlasLayoutTexture = new GLTexture2D(<WebGLRenderingContext>gl, {
          format: 'RGBA',
          type: 'FLOAT',
          filter: 'NEAREST',
          wrap: 'CLAMP_TO_EDGE',
          mipMapped: false,
          width: size,
          height: size,
          data: dataArray,
        })
      } else {
        this.__atlasLayoutTexture.bufferData(dataArray, size, size)
      }
    }

    this.textureDesc[0] = this.width
    this.textureDesc[1] = this.height
    this.textureDesc[2] = this.__atlasLayoutTexture.width
    // this.textureDesc[3] // flags

    this.__layoutNeedsRegeneration = false
  }

  /**
   * The getLayoutData method.
   * @param {number} index - The index value.
   * @return {object} - The return value.
   */
  getLayoutData(index: number) {
    return this.__layoutVec4s[index]
  }

  /**
   * The renderAtlas method.
   * @param {boolean} cleanup - The cleanup value.
   * @param {number} off - The off value.
   */
  renderAtlas(cleanup = false, off = 0) {
    if (this.__subImages.length == 0) {
      return
    }
    if (this.__layoutNeedsRegeneration) {
      this.generateAtlasLayout()
    }
    const gl = <Record<any, any>>this.__gl
    const renderstate: Record<any, any> = {}
    this.bindForWriting(renderstate, true)

    gl.__atlasLayoutShader.bind(renderstate, 'GLImageAtlas')
    gl.__atlasLayoutShaderBinding.bind(renderstate)
    const scl = new Vec2(1.0 / this.width, 1.0 / this.height)

    const unifs = renderstate.unifs
    for (let j = off; j < this.__subImages.length; j++) {
      const glimage = this.__subImages[j]

      const layoutItem = this.__layout[j]
      glimage.bindToUniform(renderstate, unifs.srctexture)
      gl.uniform2fv(unifs.pos.location, layoutItem.pos.multiply(scl).asArray())
      gl.uniform2fv(unifs.size.location, layoutItem.size.multiply(scl).asArray())
      gl.uniform2f(unifs.srctextureDim.location, glimage.width, glimage.height)
      gl.uniform1i(unifs.alphaFromLuminance.location, glimage.alphaFromLuminance)
      gl.uniform1i(unifs.invert.location, glimage.invert)
      gl.drawQuad()

      // After rendering the texture, we can reuse the texture unit.
      renderstate.boundTextures--
    }

    if (cleanup) {
      this.cleanup()
    }

    this.unbind(renderstate)
    // this.__fbo.unbind()
    this.emit('updated', {})
  }

  /**
   * The isReady method.
   * @return {boolean} - The return value.
   */
  isReady() {
    return this.__atlasLayoutTexture != undefined
  }

  /**
   * The bindToUniform method.
   * @param {Record<any,any>} renderstate - The object tracking the current state of the renderer
   * @param {WebGLUniformLocation} unif - The WebGL uniform
   * @return {boolean} - The return value.
   */
  bindToUniform(renderstate: Record<any, any>, unif: Record<any, any>) {
    super.bindToUniform(renderstate, unif)

    const unifs: Record<any, any> = renderstate.unifs

    if (this.__atlasLayoutTexture) {
      const atlasLayoutUnif = unifs[unif.name + '_layout']
      if (atlasLayoutUnif) this.__atlasLayoutTexture.bindToUniform(renderstate, atlasLayoutUnif)

      const atlasDescUnif = unifs[unif.name + '_desc']
      if (atlasDescUnif) {
        this.__gl.uniform4fv(atlasDescUnif.location, this.textureDesc)
      }
    } else {
      const atlasDescUnif = unifs[unif.name + '_desc']
      if (atlasDescUnif) this.__gl.uniform4f(atlasDescUnif.location, this.width, this.height, 0.0, 0.0)
    }
    return true
  }

  /**
   * The cleanup method.
   */
  cleanup() {
    for (const glimage of this.__subImages) {
      glimage.removeRef(this)
    }
    this.__subImages = []
    this.destroy()
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy() {
    this.cleanup()
    super.destroy()
  }
}

export { GLImageAtlas }
