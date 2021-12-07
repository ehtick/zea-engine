import { GLGeomItemSetMultiDraw } from './GLGeomItemSetMultiDraw'
import '../../SceneTree/Geometry/Mesh'
import { RenderState } from '../types/renderer'

/** Class representing a GL mesh.
 * @extends GLGeom
 * @private
 */
class GLMeshItemSet extends GLGeomItemSetMultiDraw {
  /**
   * Draw an item to screen.
   * @param renderstate - The object tracking the current state of the renderer
   * @param drawIds - the draw id for each element drawn in by this draw call.
   * @param counts - the geom element count for each element drawn in by this draw call.
   * @param offsets - the geom element offset for each element drawn in by this draw call.
   * @param drawCount - the number of active draw calls for this invocation
   */
  multiDraw(
    renderstate: RenderState,
    drawIds: Float32Array,
    counts: Int32Array,
    offsets: Int32Array,
    drawCount: number
  ) {
    const gl = this.gl
    if (gl.multiDrawElements) {
      gl.multiDrawElements(gl.TRIANGLES, counts, 0, gl.UNSIGNED_INT, offsets, 0, drawCount)
    } else {
      const { drawId } = renderstate.unifs
      for (let i = 0; i < drawCount; i++) {
        gl.uniform1i(drawId.location, drawIds[i])
        gl.drawElements(gl.TRIANGLES, counts[i], gl.UNSIGNED_INT, offsets[i])
      }
    }
  }
}

export { GLMeshItemSet }
