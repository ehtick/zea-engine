import { Vec3, Xfo, Mat4, Ray, Color } from '../Math/index'
import { Plane, EnvMap, BaseImage, Scene } from '../SceneTree/index'
import { GLFbo } from './GLFbo'
import { GLRenderTarget } from './GLRenderTarget'
import { GLHDRImage } from './GLHDRImage'
import { GLEnvMap } from './GLEnvMap'
import { GLBaseRenderer } from './GLBaseRenderer'
import { GLTexture2D } from './GLTexture2D'
import { PassType } from './Passes/GLPass'
import { EnvMapShader } from './Shaders/EnvMapShader'
import { HighlightsShader } from './Shaders/HighlightsShader'
import { SilhouetteShader } from './Shaders/SilhouetteShader'
import { generateShaderGeomBinding } from './Drawing/GeomShaderBinding'

const ALL_PASSES = PassType.OPAQUE | PassType.TRANSPARENT | PassType.OVERLAY

/** Class representing a GL renderer.
 * @extends GLBaseRenderer
 */
class GLRenderer extends GLBaseRenderer {
  protected __gl: Record<any, any> // can't use WebGLRenderingContext, ds may be augmented.
  protected __exposure: number
  protected __tonemap: boolean
  protected __gamma: number
  protected __glEnvMap: any
  protected __glBackgroundMap: any
  protected __displayEnvironment: boolean
  protected __debugMode: number
  protected _planeDist: number
  protected __cutPlaneNormal: Vec3
  protected rayCastDist: number
  protected rayCastArea: number
  protected highlightsShader: HighlightsShader
  protected silhouetteShader: SilhouetteShader
  protected highlightOutlineThickness: number
  protected outlineThickness: number
  protected outlineColor: Color
  protected outlineSensitivity: number
  protected outlineDepthBias: number
  protected __debugTextures: any[]

  protected __rayCastRenderTarget: any
  protected __backgroundMapShader: any
  protected __backgroundMapShaderBinding: any
  protected __rayCastRenderTargetProjMatrix: any
  /**
   * Create a GL renderer.
   * @param {HTMLCanvasElement} $canvas - The $canvas value.
   * @param {Record<any, any>} options - The dictionary of options.
   */
  constructor($canvas: any, options: Record<any, any> = {}) {
    // use HTMLCanvasElement?
    super($canvas, options)

    // ///////////////////////
    // Renderer Setup
    this.__exposure = 1.0
    this.__tonemap = true
    this.__gamma = 2.2

    this.__glEnvMap = undefined
    this.__glBackgroundMap = undefined

    this.__displayEnvironment = true
    this.__debugMode = 0
    this._planeDist = 0.0
    this.__cutPlaneNormal = new Vec3(1, 0, 0)
    this.rayCastDist = 0
    this.rayCastArea = 0

    const gl = <WebGLRenderingContext>this.__gl
    this.highlightsShader = new HighlightsShader(gl)
    this.silhouetteShader = new SilhouetteShader(gl)
    this.highlightOutlineThickness = 1.5
    this.outlineThickness = 0
    this.outlineColor = new Color(0.15, 0.15, 0.15, 1)
    this.outlineSensitivity = 2
    this.outlineDepthBias = 0.7

    this.__debugTextures = [undefined]

    this.addShaderPreprocessorDirective('ENABLE_INLINE_GAMMACORRECTION')
    if (!options.disableTextures) {
      this.addShaderPreprocessorDirective('ENABLE_TEXTURES')
    }

    if (options.debugGeomIds) {
      this.addShaderPreprocessorDirective('DEBUG_GEOM_ID')
    }
  }

  /**
   * The __bindEnvMap method.
   * @param {EnvMap|BaseImage} env - The env value.
   * @private
   */
  __bindEnvMap(env: EnvMap | BaseImage) {
    const gl = <WebGLRenderingContext>this.__gl
    if (env instanceof EnvMap) {
      // Note: Safari doesn't support rendering to floating
      // point textures, so our PBR lighting pipeline doesn't work.
      if (this.__gl.name !== 'webgl2') {
        return
      }

      
      this.__glEnvMap = env.getMetadata('gltexture')
      if (!this.__glEnvMap) {
        if (env.type === 'FLOAT') {
          this.addShaderPreprocessorDirective('ENABLE_PBR')
          this.__glEnvMap = new GLEnvMap(this, env)
        }
        // } else if (env.isStreamAtlas()) { // TODO: are these two lines still needed?
        //   this.__glEnvMap = new GLImageStream(gl, env) 
        else {
          this.__glEnvMap = new GLTexture2D(gl, env)
        }
      }
    } else {
      // Note: The difference between an EnvMap and a BackgroundMap, is that
      // An EnvMap must be HDR, and can be convolved for reflections.
      // A Background map can be simply an image.
      const backgroundMap = env
      this.__glBackgroundMap = backgroundMap.getMetadata('gltexture')
      if (!this.__glBackgroundMap) {
        if (backgroundMap.type === 'FLOAT') {
          this.__glBackgroundMap = new GLHDRImage(gl, backgroundMap)
        } else {
          this.__glBackgroundMap = new GLTexture2D(gl, backgroundMap)
        }
      }
      this.__glBackgroundMap.on('loaded', this.requestRedraw)
      this.__glBackgroundMap.on('updated', this.requestRedraw)
      if (!this.__backgroundMapShader) {
        if (!this.__gl.__quadVertexIdsBuffer) this.__gl.setupInstancedQuad()
        this.__backgroundMapShader = new EnvMapShader(gl)
        // switch (backgroundMap.getMapping()) {
        //   case 'octahedral':
        //     break
        //   case 'latlong':
        //     break
        //   case 'steriolatlong':
        //     break
        //   case 'dualfisheye':
        //     break
        //   case 'uv':
        //   default:
        //     break
        // }
        const shaderComp = this.__backgroundMapShader.compileForTarget()
        this.__backgroundMapShaderBinding = generateShaderGeomBinding(
          gl,
          shaderComp.attrs,
          this.__gl.__quadattrbuffers,
          this.__gl.__quadIndexBuffer
        )
      }
      // console.warn('Unsupported EnvMap:' + env)
      return
    }
    this.__glEnvMap.on('loaded', this.requestRedraw)
    this.__glEnvMap.on('updated', this.requestRedraw)

    this.emit('envMapAssigned', { envMap: this.__glEnvMap })
  }

  /**
   * The setScene method.
   * @param {Scene} scene - The scene value.
   */
  setScene(scene: Scene) {
    const envMapParam = scene.settings.getParameter('EnvMap')
    if (envMapParam.getValue() != undefined) {
      this.__bindEnvMap(envMapParam.getValue())
    }
    envMapParam.on('valueChanged', () => {
      this.__bindEnvMap(envMapParam.getValue())
    })

    const displayEnvMapParam = scene.settings.getParameter('Display EnvMap')
    this.__displayEnvironment = displayEnvMapParam.getValue()
    displayEnvMapParam.on('valueChanged', () => {
      this.__displayEnvironment = displayEnvMapParam.getValue()
      this.requestRedraw()
    })

    super.setScene(scene)
  }

  /**
   * The addViewport method.
   * @param {string} name - The name value.
   * @return {GLViewport} - The return value.
   */
  addViewport(name: string) {
    const vp = super.addViewport(name)
    return vp
  }

  // //////////////////////////
  // GUI

  /**
   * Getter for exposure.
   */
  get exposure() {
    return this.__exposure
  }

  /**
   * Setter for exposure.
   * @param {number} val - The val value.
   */
  set exposure(val) {
    this.__exposure = val
    this.requestRedraw()
  }

  /**
   * Getter for gamma.
   */
  get gamma() {
    return this.__gamma
  }

  /**
   * Setter for gamma.
   * @param {number} val - The val value.
   */
  set gamma(val) {
    this.__gamma = val
    this.requestRedraw()
  }

  /**
   * Getter for displayEnvironment.
   */
  get displayEnvironment() {
    return this.__displayEnvironment
  }

  /**
   * Setter for displayEnvironment.
   * @param {number} val - The val value.
   */
  set displayEnvironment(val) {
    this.__displayEnvironment = val
    this.requestRedraw()
  }

  // //////////////////////////
  // Raycasting

  /**
   * Ray casting is implemented by rendering a small image from the position of the ray, and capturing geometries detected in the resulting image.
   * This method takes a Ray value, and uses that base the ray cast operation.
   *
   * @param {Ray} ray - The ray to use in the raycast.
   * @param {number} dist - The maximum distance to cast the ray
   * @param {number} area - The area to use for the ray
   * @param {number} mask - The mask to filter our certain pass types. Can be PassType.OPAQUE | PassType.TRANSPARENT | PassType.OVERLAY
   * @return {object} - The object containing the ray cast results.
   */
  raycastWithRay(ray: Ray, dist: number, area = 0.01, mask = ALL_PASSES) {
    const xfo = new Xfo()
    xfo.setLookAt(ray.start, ray.start.add(ray.dir), new Vec3(0, 0, 1))
    return this.raycast(xfo, ray, dist, area, mask)
  }

  /**
   * Ray casting is implemented by rendering a small image from the position of the ray, and capturing geometries detected in the resulting image.
   * This method takes an Xfo value, and uses that base the ray cast operation.
   *
   * @param {Xfo} xfo - The xfo to use in the raycast.
   * @param {number} dist - The maximum distance to cast the ray
   * @param {number} area - The area to use for the ray
   * @param {number} mask - The mask to filter our certain pass types. Can be PassType.OPAQUE | PassType.TRANSPARENT | PassType.OVERLAY
   * @return {object} - The object containing the ray cast results.
   */
  raycastWithXfo(xfo: Xfo, dist: number, area = 0.01, mask = ALL_PASSES) {
    const ray = new Ray(xfo.tr, xfo.ori.getZaxis().negate())
    return this.raycast(xfo, ray, dist, area, mask)
  }

  /**
   * Ray casting is implemented by rendering a small image from the position of the ray, and capturing geometries detected in the resulting image.
   *
   * @private
   *
   * @param {Xfo} xfo - The ray to use in the raycast.
   * @param {Ray} ray - The ray to use in the raycast.
   * @param {number} dist - The maximum distance to cast the ray
   * @param {number} area - The area to use for the ray
   * @param {number} mask - The mask to filter our certain pass types. Can be PassType.OPAQUE | PassType.TRANSPARENT | PassType.OVERLAY
   * @return {object} - The object containing the ray cast results.
   */
  raycast(xfo: Xfo, ray: Ray, dist: number, area = 0.01, mask = ALL_PASSES) {
    const gl = <WebGLRenderingContext>this.__gl

    if (!this.__rayCastRenderTarget) {
      this.__rayCastRenderTarget = new GLRenderTarget(gl, {
        type: 'FLOAT',
        format: 'RGBA',
        filter: 'NEAREST',
        width: 3,
        height: 3,
        numColorChannels: 1,
      })
      this.__rayCastRenderTargetProjMatrix = new Mat4()
    }

    if (this.rayCastDist != dist || this.rayCastArea != area) {
      this.__rayCastRenderTargetProjMatrix.setOrthographicMatrix(
        area * -0.5,
        area * 0.5,
        area * -0.5,
        area * 0.5,
        0.0,
        dist
      )
      this.rayCastDist = dist
      this.rayCastArea = area
    }

    const region = [0, 0, 3, 3]
    const renderstate = {
      cameraMatrix: xfo.toMat4(),
      viewports: [
        {
          region,
          viewMatrix: xfo.inverse().toMat4(),
          projectionMatrix: this.__rayCastRenderTargetProjMatrix,
          isOrthographic: true,
        },
      ],
    }

    this.__rayCastRenderTarget.bindForWriting(renderstate, true)
    gl.enable(gl.CULL_FACE)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.depthMask(true)

    this.drawSceneGeomData(renderstate, mask)
    gl.finish()
    this.__rayCastRenderTarget.unbindForWriting()
    this.__rayCastRenderTarget.bindForReading()

    const geomDatas = new Float32Array(4 * 9)
    gl.readPixels(0, 0, 3, 3, gl.RGBA, gl.FLOAT, geomDatas)
    this.__rayCastRenderTarget.unbindForReading()

    // ////////////////////////////////////
    // We have a 3x3 grid of pixels, and we
    // scan them to find if any geom was in the
    // frustum.
    // Starting with the center pixel (4),
    // then left and right (3, 5)
    // Then top bottom (1, 7)
    const checkPixel = (id: number) => geomDatas[id * 4 + 3] != 0
    const dataPixels = [4, 3, 5, 1, 7]
    let geomData
    for (const pixelID of dataPixels) {
      if (checkPixel(pixelID)) {
        geomData = geomDatas.subarray(pixelID * 4, pixelID * 4 + 4)
        break
      }
    }
    if (!geomData) return

    // Mask the pass id to be only the first 6 bits of the integer.
    const passId = Math.round(geomData[0]) & (64 - 1)
    const geomItemAndDist = this.getPass(passId).getGeomItemAndDist(geomData)

    if (geomItemAndDist) {
      const intersectionPos = ray.start.add(ray.dir.scale(geomItemAndDist.dist))

      return {
        ray,
        intersectionPos,
        geomItem: geomItemAndDist.geomItem,
        dist: geomItemAndDist.dist,
        geomData,
      }
    }
  }

  /**
   *
   * @private
   *
   * @param {Xfo} xfo - The ray to use in the raycast.
   * @param {Ray} ray - The ray to use in the raycast.
   * @param {number} dist - The maximum distance to cast the ray
   * @param {number} area - The area to use for the ray
   * @param {number} mask - The mask to filter our certain pass types. Can be PassType.OPAQUE | PassType.TRANSPARENT | PassType.OVERLAY
   * @return {object} - The object containing the ray cast results.
   */
  raycastCluster(xfo: Xfo, ray: Ray, dist: number, area = 0.01, mask = ALL_PASSES) {
    const gl = <WebGLRenderingContext>this.__gl

    if (!this.__rayCastRenderTarget) {
      this.__rayCastRenderTarget = new GLRenderTarget(gl, {
        type: 'FLOAT',
        format: 'RGBA',
        filter: 'NEAREST',
        width: 3,
        height: 3,
        numColorChannels: 1,
      })
      this.__rayCastRenderTargetProjMatrix = new Mat4()
    }

    if (this.rayCastDist != dist || this.rayCastArea != area) {
      this.__rayCastRenderTargetProjMatrix.setOrthographicMatrix(
        area * -0.5,
        area * 0.5,
        area * -0.5,
        area * 0.5,
        0.0,
        dist
      )
      this.rayCastDist = dist
      this.rayCastArea = area
    }

    const region = [0, 0, 3, 3]
    const renderstate = {
      cameraMatrix: xfo.toMat4(),
      viewports: [
        {
          region,
          viewMatrix: xfo.inverse().toMat4(),
          projectionMatrix: this.__rayCastRenderTargetProjMatrix,
          isOrthographic: true,
        },
      ],
    }

    this.__rayCastRenderTarget.bindForWriting(renderstate, true)
    gl.enable(gl.CULL_FACE)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.depthMask(true)

    this.drawSceneGeomData(renderstate, mask)
    gl.finish()
    this.__rayCastRenderTarget.unbindForWriting()
    this.__rayCastRenderTarget.bindForReading()

    const geomDatas = new Float32Array(4 * 9)
    gl.readPixels(0, 0, 3, 3, gl.RGBA, gl.FLOAT, geomDatas)
    this.__rayCastRenderTarget.unbindForReading()

    // ////////////////////////////////////
    // We have a 3x3 grid of pixels, and we
    // scan them to find if any geom was in the
    // frustum.
    // Note: we return every intersection, because even multiple intersections
    // on the same geometry will be at different distances.
    // This method is often used to get an average distance.
    const checkPixel = (id: number) => geomDatas[id * 4 + 3] != 0
    const result = []
    for (let i = 0; i < 9; i++) {
      if (checkPixel(i)) {
        const geomData = geomDatas.subarray(i * 4, i * 4 + 4)
        // Mask the pass id to be only the first 6 bits of the integer.
        const passId = Math.round(geomData[0]) & (64 - 1)
        const geomItemAndDist = this.getPass(passId).getGeomItemAndDist(geomData)

        if (geomItemAndDist) {
          const intersectionPos = ray.start.add(ray.dir.scale(geomItemAndDist.dist))
          result.push({
            ray,
            intersectionPos,
            geomItem: geomItemAndDist.geomItem,
            dist: geomItemAndDist.dist,
            geomData,
          })
        }
      }
    }
    return result
  }

  // //////////////////////////
  // Rendering

  /**
   * The drawBackground method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   */
  drawBackground(renderstate: Record<any, any>) {
    if (this.__glBackgroundMap) {
      if (!this.__glBackgroundMap.isLoaded()) return
      const gl = this.__gl
      gl.depthMask(false)
      this.__backgroundMapShader.bind(renderstate)
      const unifs = renderstate.unifs
      this.__glBackgroundMap.bindToUniform(renderstate, unifs.backgroundImage)
      this.__backgroundMapShaderBinding.bind(renderstate)
      gl.drawQuad()
    } else if (this.__glEnvMap && this.__glEnvMap.draw /* Note: video env maps cannot be drawn directly.*/) {
      this.__glEnvMap.draw(renderstate)
    }
  }

  /**
   * The bindGLRenderer method.
   * @param {Record<any, any>} renderstate - The object tracking the current state of the renderer
   */
  bindGLRenderer(renderstate: Record<any, any>) {
    super.bindGLBaseRenderer(renderstate)

    renderstate.envMap = this.__glEnvMap
    renderstate.exposure = this.__exposure
    renderstate.gamma = this.__gamma
  }

  /**
   * The drawScene method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   */
  drawScene(renderstate: Record<any, any>) {
    this.bindGLRenderer(renderstate)

    if (this.__displayEnvironment) this.drawBackground(renderstate)

    super.drawScene(renderstate)
    // console.log("Draw Calls:" + renderstate['drawCalls']);

    this.emit('redrawOccurred', {})
  }
}

export { GLRenderer }