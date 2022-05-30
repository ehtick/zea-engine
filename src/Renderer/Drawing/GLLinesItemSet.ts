import { GLGeomItemSetMultiDraw } from './GLGeomItemSetMultiDraw'
import '../../SceneTree/Geometry/Mesh'
import { RenderState, ColorRenderState } from '../RenderStates/index'

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
  multiDraw(renderstate: RenderState, counts: Int32Array, offsets: Int32Array, drawCount: number): void {
    const { occluded, hiddenLineColor } = renderstate.unifs

    // @ts-ignore
    const drawingHiddenLines =
      // @ts-ignore
      renderstate.hiddenLineColor &&
      // @ts-ignore
      renderstate.hiddenLineColor.a > 0 &&
      occluded &&
      hiddenLineColor

    const gl = this.gl
    if (gl.multiDrawArrays) {
      gl.multiDrawElements(gl.LINES, counts, 0, gl.UNSIGNED_INT, offsets, 0, drawCount)

      if (drawingHiddenLines) {
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
      const { drawId } = renderstate.unifs

      for (let i = 0; i < drawCount; i++) {
        gl.uniform1i(drawId.location, i)
        gl.drawElements(gl.LINES, counts[i], gl.UNSIGNED_INT, offsets[i])
      }

      if (drawingHiddenLines) {
        gl.uniform1i(occluded.location, 1)
        // @ts-ignore
        gl.uniform4fv(hiddenLineColor.location, renderstate.hiddenLineColor.asArray())
        gl.depthFunc(gl.GREATER)
        gl.depthMask(false)
        for (let i = 0; i < drawCount; i++) {
          gl.uniform1i(drawId.location, i)
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
