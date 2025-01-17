import { GLTexture2D } from './GLTexture2D'
import { GLFbo } from './GLFbo'
import { GLImageAtlas } from './GLImageAtlas'
import { GLScreenQuad } from './GLScreenQuad'
import { RenderState } from './RenderStates/index'
import { WebGL12RenderingContext } from './types/webgl'

const Math_log2 = function (value: number) {
  // IE11 doesn't support Math.log2.
  return Math.log2(value)
  // return Math.log( value ) / Math.log( 2 ) - 2;
}

/** Class representing an image pyramid.
 * @extends GLImageAtlas
 * @private
 */
class ImagePyramid extends GLImageAtlas {
  protected size: number
  protected __srcGLTex: GLTexture2D
  protected __fbos: GLFbo[]
  protected screenQuad: GLScreenQuad

  /**
   * Create an image pyramid.
   * @param gl - The webgl rendering context.
   * @param name - The name value.
   * @param srcGLTex - The srcGLTex value.
   * @param destroySrcImage - The destroySrcImage value.
   * @param minTileSize - The minTileSize value.
   */
  constructor(
    gl: WebGL12RenderingContext,
    name: string,
    srcGLTex: GLTexture2D,
    screenQuad: GLScreenQuad,
    destroySrcImage = true,
    minTileSize = 16
  ) {
    super(gl, name)

    this.__srcGLTex = srcGLTex
    this.__fbos = []

    srcGLTex.on('updated', () => {
      this.renderAtlas(destroySrcImage)
    })
    if (this.__srcGLTex.isLoaded()) {
      this.generateAtlasLayout(minTileSize)
      this.renderAtlas(destroySrcImage)
    } else {
      this.__srcGLTex.on('updated', () => {
        this.generateAtlasLayout(minTileSize)
        this.renderAtlas(destroySrcImage)
      })
    }
    srcGLTex.on('destructing', () => {
      console.log(this.__srcGLTex.getId() + ' ImagePyramid destructing') // TODO: getName() doesn't exist on GLTexture2D
      this.destroy()
    })
  }

  /**
   * The generateAtlasLayout method.
   * @param minTileSize - The minTileSize value.
   */
  generateAtlasLayout(minTileSize: any): void {
    const gl = this.__gl

    this.size = this.__srcGLTex.height
    const aspectRatio = this.__srcGLTex.width / this.__srcGLTex.height

    this.addSubImage(this.__srcGLTex)
    const numLevels = Math.round(Math_log2(this.size)) - 1 // compute numLevels-1 levels(because we use the source image as the base level);
    for (let i = numLevels; i >= 0; --i) {
      const size = Math.pow(2, i)
      if (size < minTileSize) break
      // Create a target texture for this level of the pyramid.
      // and then render to it using the base level as a source image.
      const level = new GLTexture2D(<WebGL12RenderingContext>gl, {
        format: this.__srcGLTex.getFormat(),
        type: this.__srcGLTex.getType(),
        width: size * aspectRatio,
        height: size,
        filter: 'LINEAR',
        wrap: 'CLAMP_TO_EDGE',
      })
      this.addSubImage(level.glTex)
      this.__fbos.push(new GLFbo(gl, level))
    }

    super.generateAtlasLayout()
  }

  /**
   * The renderAtlas method.
   * @param cleanup - The cleanup value.
   */
  renderAtlas(cleanup = true): void {
    const gl = this.__gl
    const renderstate = new RenderState(gl)
    this.screenQuad.bindShader(renderstate)

    for (let i = 0; i < this.__fbos.length; i++) {
      this.__fbos[i].bindAndClear()
      this.screenQuad.draw(renderstate, this.getSubImage(i)) // Note: we are binding the previous image. (we have 1 more images than fbos.)
    }

    super.renderAtlas(cleanup)
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy(): void {
    super.destroy()
    for (const fbo of this.__fbos) {
      fbo.destroy()
    }
  }
}

export { ImagePyramid }
