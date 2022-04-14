import { GLGeomItemSetMultiDraw } from './GLGeomItemSetMultiDraw'
import '../../SceneTree/Geometry/Mesh'
import { RenderState } from '../RenderStates'

/** Class representing a GL mesh.
 * @extends GLGeom
 * @private
 */
class GLLinesItemSet extends GLGeomItemSetMultiDraw {
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
  ): void {
    const { occluded } = renderstate.unifs
    // @ts-ignore
    const drawingHiddenLines =
      // @ts-ignore
      renderstate.hiddenLineColor &&
      // @ts-ignore
      renderstate.hiddenLineColor.a > 0 &&
      occluded

    const gl = this.gl
    if (gl.multiDrawArrays) {
      gl.multiDrawElements(gl.LINES, counts, 0, gl.UNSIGNED_INT, offsets, 0, drawCount)

      if (drawingHiddenLines) {
        const { hiddenLineColor } = renderstate.unifs
        gl.uniform1i(occluded.location, 1)
        // @ts-ignore
        gl.uniform4fv(hiddenLineColor.location, renderstate.hiddenLineColor.asArray())
        gl.depthFunc(gl.GREATER)
        gl.depthMask(false)
        gl.multiDrawElements(gl.LINES, counts, 0, gl.UNSIGNED_INT, offsets, 0, drawCount)
        gl.depthFunc(gl.LEQUAL)
        gl.depthMask(true)
        gl.uniform1i(occluded.location, 0)
      }
    } else {
      const { geomItemId } = renderstate.unifs

      for (let i = 0; i < drawCount; i++) {
        gl.uniform1i(geomItemId.location, drawIds[i])
        gl.drawElements(gl.LINES, counts[i], gl.UNSIGNED_INT, offsets[i])
      }

      if (occluded) {
        const { hiddenLineColor } = renderstate.unifs
        gl.uniform1i(occluded.location, 1)
        // @ts-ignore
        gl.uniform4fv(hiddenLineColor.location, renderstate.hiddenLineColor.asArray())
        gl.depthFunc(gl.GREATER)
        gl.depthMask(false)
        for (let i = 0; i < drawCount; i++) {
          gl.uniform1i(geomItemId.location, drawIds[i])
          gl.drawElements(gl.LINES, counts[i], gl.UNSIGNED_INT, offsets[i])
        }
        gl.depthFunc(gl.LEQUAL)
        gl.depthMask(true)
        gl.uniform1i(occluded.location, 0)
      }
    }
  }
}

export { GLLinesItemSet }
