import { Vec3, Xfo, Mat4, Ray, Color } from '../Math/index'
import { EnvMap, BaseImage, Scene } from '../SceneTree/index'
import { GLRenderTarget } from './GLRenderTarget'
import { GLHDRImage } from './GLHDRImage'
import { GLEnvMap } from './GLEnvMap'
import { GLBaseRenderer, RendererOptions } from './GLBaseRenderer'
import { GLTexture2D } from './GLTexture2D'
import { PassType } from './Passes/GLPass'
import { EnvMapShader } from './Shaders/EnvMapShader'
import { HighlightsShader } from './Shaders/HighlightsShader'
import { SilhouetteShader } from './Shaders/SilhouetteShader'
import { generateShaderGeomBinding, IGeomShaderBinding } from './Drawing/GeomShaderBinding'
import { HDRImage } from '../SceneTree/Images/HDRImage'
import { EnvMapAssignedEvent } from '../Utilities/Events/EnvMapAssignedEvent'
import { GLViewport } from './GLViewport'
import { IntersectionData } from '../Utilities/IntersectionData'
import { GeomDataRenderState, ColorRenderState } from './RenderStates/index'
import { WebGL12RenderingContext } from './types/webgl'

const ALL_PASSES = PassType.OPAQUE | PassType.TRANSPARENT | PassType.OVERLAY
// TODO: move this fn somewhere

/** Class representing a GL renderer.
 * @extends GLBaseRenderer
 */
class GLRenderer extends GLBaseRenderer {
  // __gl: Record<string, any> // can't use WebGL12RenderingContext, ds may be augmented.
  protected __exposure: number = 1.0
  protected __gamma: number = 2.2
  protected __glEnvMap: GLEnvMap | null = null
  protected __glBackgroundMap: any
  protected __displayEnvironment: boolean
  protected __debugMode: number
  protected rayCastDist: number
  protected rayCastArea: number
  highlightsShader: HighlightsShader
  silhouetteShader: SilhouetteShader
  highlightOutlineThickness: number = 1
  renderMode:
    | 'wireframe'
    | 'hiddenline'
    | 'flat'
    | 'flat-noedges'
    | 'shaded'
    | 'shaded-noedges'
    | 'pbr'
    | 'pbr-noedges' = 'pbr'

  outlineMethod: 'geometry' | 'image' = 'geometry'
  outlineThickness: number = 0
  outlineColor: Color = new Color(0.15, 0.15, 0.15, 1)
  hiddenLineColor: Color = new Color(0.15, 0.15, 0.15, 0.0)
  outlineSensitivity: number = 2
  outlineDepthBias: number = 0.7
  protected __debugTextures: any[]

  protected __rayCastRenderTarget: GLRenderTarget | null = null
  protected __backgroundMapShader: EnvMapShader | null = null
  protected __backgroundMapShaderBinding: IGeomShaderBinding | null = null
  protected __rayCastRenderTargetProjMatrix: Mat4 = new Mat4()
  /**
   * Create a GL renderer.
   * @param $canvas - The $canvas value.
   * @param options - The dictionary of options.
   */
  constructor($canvas: HTMLCanvasElement, options: RendererOptions = {}) {
    // use HTMLCanvasElement?
    super($canvas, options)

    // ///////////////////////
    // Renderer Setup
    this.__exposure = 1.0
    this.__gamma = 2.2

    this.__displayEnvironment = true
    this.__debugMode = 0
    this.rayCastDist = 0
    this.rayCastArea = 0

    const gl = <WebGL12RenderingContext>this.__gl
    this.highlightsShader = new HighlightsShader(gl)
    this.silhouetteShader = new SilhouetteShader(gl)

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
   * @param env - The env value.
   * @private
   */
  __bindEnvMap(env: EnvMap | BaseImage): void {
    const gl = this.__gl
    if (env instanceof EnvMap) {
      // Note: Safari doesn't support rendering to floating
      // point textures, so our PBR lighting pipeline doesn't work.
      if (gl.name !== 'webgl2') {
        return
      }

      if (env.type === 'FLOAT') {
        this.addShaderPreprocessorDirective('ENABLE_PBR')
        this.__glEnvMap = new GLEnvMap(this, env)
      }
      // } else if (env.isStreamAtlas()) { // TODO: are these two lines still needed?
      //   this.__glEnvMap = new GLImageStream(gl, env)
      // else {
      //   this.__glEnvMap = new GLTexture2D(this.__gl, env)
      // }
    } else {
      // Note: The difference between an EnvMap and a BackgroundMap, is that
      // An EnvMap must be HDR, and can be convolved for reflections.
      // A Background map can be simply an image.
      const backgroundMap = env
      if (backgroundMap.type === 'HDR') {
        this.__glBackgroundMap = new GLHDRImage(this.__gl, <HDRImage>backgroundMap) // todo: is this cast ok?
      } else {
        this.__glBackgroundMap = new GLTexture2D(this.__gl, backgroundMap)
      }
      this.__glBackgroundMap.on('loaded', () => {
        this.requestRedraw()
      })
      this.__glBackgroundMap.on('updated', () => {
        this.requestRedraw()
      })
      if (!this.__backgroundMapShader) {
        if (!gl.__quadVertexIdsBuffer) gl.setupInstancedQuad()
        this.__backgroundMapShader = new EnvMapShader(this.__gl)
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
          this.__gl,
          shaderComp.attrs,
          gl.__quadattrbuffers,
          gl.__quadIndexBuffer
        )
      }
      // console.warn('Unsupported EnvMap:' + env)
      return
    }
    this.__glEnvMap.on('loaded', (event) => {
      this.requestRedraw()
    })
    this.__glEnvMap.on('updated', (event) => {
      this.requestRedraw()
    })

    const event = new EnvMapAssignedEvent(this.__glEnvMap)
    this.emit('envMapAssigned', event)
  }

  /**
   * The setScene method.
   * @param scene - The scene value.
   */
  setScene(scene: Scene): void {
    const envMapParam = scene.envMapParam
    if (envMapParam.value != undefined) {
      this.__bindEnvMap(<EnvMap>envMapParam.value)
    }
    envMapParam!.on('valueChanged', () => {
      this.__bindEnvMap(<EnvMap>envMapParam.value)
    })

    const displayEnvMapParam = scene.displayEnvMapParam
    this.__displayEnvironment = displayEnvMapParam.value
    displayEnvMapParam!.on('valueChanged', () => {
      this.__displayEnvironment = displayEnvMapParam.value
      this.requestRedraw()
    })

    super.setScene(scene)
  }

  /**
   * The addViewport method.
   * @param name - The name value.
   * @return - The return value.
   */
  addViewport(name: string): GLViewport {
    const vp = super.addViewport(name)
    return vp
  }

  // //////////////////////////
  // GUI

  /**
   * Getter for exposure.
   * @return exposure
   */
  get exposure(): number {
    return this.__exposure
  }

  /**
   * Setter for exposure.
   * @param val - The val value.
   */
  set exposure(val) {
    this.__exposure = val
    this.requestRedraw()
  }

  /**
   * Getter for gamma.
   */
  get gamma(): number {
    return this.__gamma
  }

  /**
   * Setter for gamma.
   * @param val - The val value.
   */
  set gamma(val) {
    this.__gamma = val
    this.requestRedraw()
  }

  /**
   * Getter for displayEnvironment.
   */
  get displayEnvironment(): boolean {
    return this.__displayEnvironment
  }

  /**
   * Setter for displayEnvironment.
   * @param val - The val value.
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
   * @param ray - The ray to use in the raycast.
   * @param dist - The maximum distance to cast the ray
   * @param area - The area to use for the ray
   * @param mask - The mask to filter our certain pass types. Can be PassType.OPAQUE | PassType.TRANSPARENT | PassType.OVERLAY
   * @return - The object containing the ray cast results.
   */
  raycastWithRay(ray: Ray, dist: number, area = 0.01, mask = ALL_PASSES): IntersectionData | null {
    const xfo = new Xfo()
    xfo.setLookAt(ray.start, ray.start.add(ray.dir), new Vec3(0, 0, 1))
    return this.raycast(xfo, ray, dist, area, mask)
  }

  /**
   * Ray casting is implemented by rendering a small image from the position of the ray, and capturing geometries detected in the resulting image.
   * This method takes an Xfo value, and uses that base the ray cast operation.
   *
   * @param xfo - The xfo to use in the raycast.
   * @param dist - The maximum distance to cast the ray
   * @param area - The area to use for the ray
   * @param mask - The mask to filter our certain pass types. Can be PassType.OPAQUE | PassType.TRANSPARENT | PassType.OVERLAY
   * @return - The object containing the ray cast results.
   */
  raycastWithXfo(xfo: Xfo, dist: number, area = 0.01, mask = ALL_PASSES): IntersectionData | null {
    const ray = new Ray(xfo.tr, xfo.ori.getZaxis().negate())
    return this.raycast(xfo, ray, dist, area, mask)
  }

  /**
   * Ray casting is implemented by rendering a small image from the position of the ray, and capturing geometries detected in the resulting image.
   *
   * @private
   *
   * @param xfo - The xfo to use in the raycast.
   * @param ray - The ray to use in the raycast.
   * @param dist - The maximum distance to cast the ray
   * @param area - The area to use for the ray
   * @param mask - The mask to filter our certain pass types. Can be PassType.OPAQUE | PassType.TRANSPARENT | PassType.OVERLAY
   * @return - The object containing the ray cast results.
   */
  raycast(xfo: Xfo, ray: Ray, dist: number, area = 0.01, mask = ALL_PASSES): IntersectionData | null {
    if (this.rayCastDist != dist || this.rayCastArea != area) {
      this.__rayCastRenderTargetProjMatrix!.setOrthographicMatrix(
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

    return this.raycastWithProjection(xfo, this.__rayCastRenderTargetProjMatrix, ray, mask)
  }

  /**
   * Ray casting is implemented by rendering a small image from the position of the ray, and capturing geometries detected in the resulting image.
   *
   * @private
   *
   * @param xfo - The xfo to use in the raycast.
   * @param projectionMatrix - The projectionMatrix to use in the raycast.
   * @param ray - The ray to use in the raycast.
   * @param mask - The mask to filter our certain pass types. Can be PassType.OPAQUE | PassType.TRANSPARENT | PassType.OVERLAY
   * @return - The object containing the ray cast results.
   */
  raycastWithProjection(xfo: Xfo, projectionMatrix: Mat4, ray: Ray, mask = ALL_PASSES): IntersectionData | null {
    const region = [0, 0, 3, 3]
    const renderstate = new GeomDataRenderState(this.__gl)
    renderstate.cameraMatrix = xfo.toMat4()
    renderstate.viewports = [
      {
        region,
        viewMatrix: xfo.inverse().toMat4(),
        projectionMatrix,
        isOrthographic: 1,
        fovY: 0,
      },
    ]

    const gl = this.__gl
    if (!this.__rayCastRenderTarget) {
      this.__rayCastRenderTarget = new GLRenderTarget(gl, {
        type: 'FLOAT',
        format: 'RGBA',
        filter: 'NEAREST',
        createDepthTexture: true,
        width: 3,
        height: 3,
        numColorChannels: 1,
      })
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
    if (!geomData) return null

    // Mask the pass id to be only the first 6 bits of the integer.
    const passId = Math.round(geomData[0]) & (64 - 1)
    const geomItemAndDist = this.getPass(passId)?.getGeomItemAndDist(geomData)

    if (geomItemAndDist) {
      const intersectionPos = ray.start.add(ray.dir.scale(geomItemAndDist.dist))

      return {
        pointerRay: ray,
        intersectionPos,
        geomItem: geomItemAndDist.geomItem,
        componentId: -1,
        dist: geomItemAndDist.dist,
        geomData,
      }
    } else {
      return null
    }
  }

  /**
   *
   * @private
   *
   * @param xfo - The ray to use in the raycast.
   * @param ray - The ray to use in the raycast.
   * @param dist - The maximum distance to cast the ray
   * @param area - The area to use for the ray
   * @param mask - The mask to filter our certain pass types. Can be PassType.OPAQUE | PassType.TRANSPARENT | PassType.OVERLAY
   * @return - The object containing the ray cast results.
   */
  raycastCluster(xfo: Xfo, ray: Ray, dist: number, area = 0.01, mask = ALL_PASSES): IntersectionData[] {
    const gl = this.__gl

    if (!this.__rayCastRenderTarget) {
      this.__rayCastRenderTarget = new GLRenderTarget(gl, {
        type: 'FLOAT',
        format: 'RGBA',
        filter: 'NEAREST',
        createDepthTexture: true,
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

    const renderstate = new GeomDataRenderState(this.__gl)
    renderstate.viewports = [
      {
        region,
        viewMatrix: xfo.inverse().toMat4(),
        projectionMatrix: this.__rayCastRenderTargetProjMatrix,
        isOrthographic: 1,
      },
    ]
    renderstate.cameraMatrix = xfo.toMat4()

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
        const pass = this.getPass(passId)
        if (pass) {
          const geomItemAndDist = pass.getGeomItemAndDist(geomData)

          if (geomItemAndDist) {
            const intersectionPos = ray.start.add(ray.dir.scale(geomItemAndDist.dist))
            result.push({
              pointerRay: ray,
              intersectionPos,
              geomItem: geomItemAndDist.geomItem,
              componentId: -1,
              dist: geomItemAndDist.dist,
              geomData,
            })
          }
        }
      }
    }
    return result
  }

  // //////////////////////////
  // Rendering

  /**
   * The drawBackground method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  drawBackground(renderstate: ColorRenderState): void {
    if (this.__glBackgroundMap && this.__backgroundMapShader && this.__backgroundMapShaderBinding) {
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
   * @param renderstate - The object tracking the current state of the renderer
   */
  bindGLRenderer(renderstate: ColorRenderState): void {
    super.bindGLBaseRenderer(renderstate)

    renderstate.envMap = this.__glEnvMap
    renderstate.exposure = this.__exposure
    renderstate.renderMode = this.renderMode
    renderstate.outlineThickness = this.outlineThickness
    renderstate.outlineColor = this.outlineColor
    renderstate.hiddenLineColor = this.hiddenLineColor
    renderstate.outlineMethod = this.outlineMethod
    renderstate.screenQuad = this.screenQuad
  }

  /**
   * The drawScene method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  drawScene(renderstate: ColorRenderState): void {
    this.bindGLRenderer(renderstate)

    if (this.__displayEnvironment) this.drawBackground(renderstate)

    super.drawScene(renderstate)
    // console.log("Draw Calls:" + renderstate['drawCalls']);
  }
}

export { GLRenderer }
