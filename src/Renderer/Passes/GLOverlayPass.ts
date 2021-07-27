import { PassType } from './GLPass'
import { GLOpaqueGeomsPass } from './GLOpaqueGeomsPass'
import { GLRenderer } from '../GLRenderer'
import { GeomItem } from '../../SceneTree/GeomItem'

/** Class representing a GL overlay pass.
 * @extends GLOpaqueGeomsPass
 */
class GLOverlayPass extends GLOpaqueGeomsPass {
  /**
   * Create a GL overlay pass.
   * @param {string} name - The name value.
   */
  constructor() {
    super()
  }

  /**
   * Returns the pass type. OPAQUE passes are always rendered first, followed by TRANSPARENT passes, and finally OVERLAY.
   * @return {number} - The pass type value.
   */
  getPassType() {
    return PassType.OVERLAY
  }

  // ///////////////////////////////////
  // Bind to Render Tree

  /**
   * The filterGeomItem method.
   * @param {GeomItem} geomItem - The geomItem value.
   * @return {any} - The return value.
   */
  filterGeomItem(geomItem: GeomItem) {
    if (geomItem.isOverlay()) return true
    const shaderClass = geomItem.getParameter('Material').getValue().getShaderClass()
    if (shaderClass) {
      if (shaderClass.isOverlay()) return true
    }
    return false
  }

  /**
   * The draw method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   */
  draw(renderstate: Record<any, any>) {
    const gl = this.__gl

    // Clear the depth buffer so handls are always drawn over the top.
    gl.clear(gl.DEPTH_BUFFER_BIT)

    if (false)
      // 2-sided rendering.
      gl.disable(gl.CULL_FACE)
    // 2-sided rendering.
    else {
      gl.enable(gl.CULL_FACE)
      gl.cullFace(gl.BACK)
    }
    gl.enable(gl.BLEND)
    gl.blendEquation(gl.FUNC_ADD)

    renderstate.pass = 'ADD'
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA) // For add

    this.__traverseTreeAndDraw(renderstate)

    gl.disable(gl.BLEND)
    // gl.enable(gl.DEPTH_TEST);
  }

  /**
   * The drawGeomData method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   */
  drawGeomData(renderstate: Record<any, any>) {
    const gl = this.__gl

    // Clear the depth buffer so handls are always drawn over the top.
    gl.clear(gl.DEPTH_BUFFER_BIT)

    gl.enable(gl.CULL_FACE)
    gl.cullFace(gl.BACK)

    gl.enable(gl.BLEND)
    gl.blendEquation(gl.FUNC_ADD)

    renderstate.pass = 'ADD'
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA) // For add

    super.drawGeomData(renderstate)

    gl.disable(gl.BLEND)
    gl.enable(gl.DEPTH_TEST)
  }
}

GLRenderer.registerPass(GLOverlayPass, PassType.OVERLAY)

export { GLOverlayPass }
