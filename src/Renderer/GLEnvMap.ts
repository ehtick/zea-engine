import { GLProbe } from './GLProbe'
import { GLHDRImage } from './GLHDRImage'
import { EnvMapShader } from './Shaders/EnvMapShader'
import { generateShaderGeomBinding, IGeomShaderBinding } from './Drawing/GeomShaderBinding'
import { EnvMap } from '../SceneTree/Images/EnvMap'
import { GLRenderer } from './GLRenderer'
import { ColorRenderState } from './RenderStates/index'

/** Class representing a GL environment map.
 * @extends GLProbe
 * @private
 */
class GLEnvMap extends GLProbe {
  protected __renderer: GLRenderer
  protected __envMap: EnvMap
  protected __backgroundFocus: number
  protected __srcGLTex: GLHDRImage | null = null
  protected __envMapShader: EnvMapShader | null = null
  protected __envMapShaderBinding: IGeomShaderBinding | null = null
  protected __lodPyramid: any
  /**
   * Create a GL env map.
   * @param renderer - The renderer value.
   * @param envMap - The environment map.
   */
  constructor(renderer: GLRenderer, envMap: EnvMap) {
    super(renderer.gl, 'EnvMap')
    this.__renderer = renderer
    this.__envMap = envMap
    this.__backgroundFocus = 0.0

    if (this.__envMap.isLoaded()) {
      this.init()
    } else {
      this.__envMap.once('loaded', (event) => {
        this.init()
      })
    }
  }

  /**
   * @private
   */
  init(): void {
    const gl = this.__renderer.gl
    if (!gl.__quadVertexIdsBuffer) gl.setupInstancedQuad()

    this.__srcGLTex = new GLHDRImage(gl, this.__envMap)
    this.__envMapShader = new EnvMapShader(gl)

    const envMapShaderComp = this.__envMapShader.compileForTarget('GLEnvMap', { directives: ['#define ENABLE_ES3'] })
    this.__envMapShaderBinding = generateShaderGeomBinding(
      gl,
      envMapShaderComp.attrs,
      gl.__quadattrbuffers,
      gl.__quadIndexBuffer
    )

    const headlightParam = this.__envMap.headlightModeParam

    const updateHeadlightModeFlag = () => {
      const ENVMAP_FLAG_HEADLIGHT = 1 // 1<<0;
      if (headlightParam.value) {
        this.textureDesc[3] |= ENVMAP_FLAG_HEADLIGHT
      } else {
        this.textureDesc[3] &= ~ENVMAP_FLAG_HEADLIGHT
      }
    }
    updateHeadlightModeFlag()
    headlightParam.on('valueChanged', () => {
      updateHeadlightModeFlag()
      this.emit('updated')
    })

    this.convolveProbe(this.__srcGLTex)

    this.emit('updated')
  }

  /**
   * The getEnvMap method.
   * @return - The return value.
   */
  getEnvMap(): EnvMap {
    return this.__envMap
  }

  /**
   * The getBackgroundFocus method.
   * @return - The return value.
   */
  getBackgroundFocus(): number {
    return this.__backgroundFocus
  }

  /**
   * The setBackgroundFocus method.
   * @param val - The val param.
   */
  setBackgroundFocus(val: number): void {
    this.__backgroundFocus = val
    this.__renderer.requestRedraw()
  }

  /**
   * The draw method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  draw(renderstate: ColorRenderState): void {
    if (this.__envMap.isLoaded()) {
      const gl = this.__gl
      const debug = false
      if (debug) {
        const screenQuad = this.__renderer.screenQuad!
        screenQuad.bindShader(renderstate)
        const debugId = 2 * 1
        switch (debugId) {
          // case 0:
          //   screenQuad.draw(renderstate, this.__srcGLTex!.__srcLDRTex!)
          //   break
          // case 1:
          //   screenQuad.draw(renderstate, this.__srcGLTex!.__srcCDMTex!)
          //   break
          case 2:
            screenQuad.draw(renderstate, this.__srcGLTex!)
            break
          case 3:
            screenQuad.draw(renderstate, this.__lodPyramid)
            break
          case 4:
            screenQuad.draw(renderstate, this.__fbos[0].getColorTexture())
            break
        }
      } else {
        // /////////////////
        this.__envMapShader!.bind(renderstate, 'GLEnvMap')
        const unifs = renderstate.unifs

        const { envMap, focus, exposure } = renderstate.unifs
        if (envMap) {
          this.__srcGLTex!.bindToUniform(renderstate, envMap)
        }
        if (focus) gl.uniform1f(focus.location, this.__backgroundFocus)
        if (exposure) gl.uniform1f(exposure.location, renderstate.exposure)

        this.__envMapShaderBinding!.bind(renderstate)
        gl.depthMask(false)

        renderstate.bindViewports(unifs, () => {
          gl.drawQuad()
        })
        gl.depthMask(true)
      }
    }
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy(): void {
    super.destroy()
    if (this.__srcGLTex) this.__srcGLTex.destroy()
  }
}

export { GLEnvMap }
