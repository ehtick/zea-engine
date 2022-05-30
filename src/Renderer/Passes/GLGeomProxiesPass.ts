import { PassType } from './GLPass'
import { GLOpaqueGeomsPass } from './GLOpaqueGeomsPass'
import { GLRenderer } from '../GLRenderer'
import { GeomItem } from '../../SceneTree/GeomItem'
import { GeomDataRenderState, ColorRenderState } from '../RenderStates/index'

/** Class representing a GL overlay pass.
 * @extends GLOpaqueGeomsPass
 */
class GLGeomProxiesPass extends GLOpaqueGeomsPass {
  /**
   * Create the pass.
   */
  constructor() {
    super()
  }

  /**
   * Returns the pass type. OVERLAY passes are always rendered last.
   * @return - The pass type value.
   */
  getPassType(): number {
    return PassType.OPAQUE
  }

  // ///////////////////////////////////
  // Bind to Render Tree

  /**
   * The filterGeomItem method.
   * @param geomItem - The geomItem value.
   * @return - The return value.
   */
  filterGeomItem(geomItem: GeomItem): boolean {
    if (!geomItem.loaded) return true
    return false
  }

  /**
   * The draw method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  draw(renderstate: ColorRenderState): void {
    // return
    const gl = this.__gl!
    this.__traverseTreeAndDraw(renderstate)
  }

  /**
   * The drawGeomData method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  drawGeomData(renderstate: GeomDataRenderState): void {
    const gl = this.__gl!
    gl.colorMask(true, true, true, true)
    super.drawGeomData(renderstate)
  }
}

// GLRenderer.registerPass(GLGeomProxiesPass, PassType.OPAQUE)

export { GLGeomProxiesPass }
