import { GLGeomItemSetMultiDraw } from './GLGeomItemSetMultiDraw'
import '../../SceneTree/Geometry/Mesh'
import { ColorRenderState, RenderState } from '../RenderStates/index'

enum GeomType {
  TRIANGLES = 0,
  LINES = 1,
  POINTS = 2,
}

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
  ): void {
    const gl = this.gl

    const multiDrawMeshes = () => {
      if (gl.multiDrawElements) {
        gl.multiDrawElements(gl.TRIANGLES, counts, 0, gl.UNSIGNED_INT, offsets, 0, drawCount)
      } else {
        const { geomItemId } = renderstate.unifs
        for (let i = 0; i < drawCount; i++) {
          gl.uniform1i(geomItemId.location, drawIds[i])
          gl.drawElements(gl.TRIANGLES, counts[i], gl.UNSIGNED_INT, offsets[i])
        }
      }
    }

    gl.depthFunc(gl.LEQUAL)

    const { geomType, outlineThickness, viewportWidth, renderMode } = renderstate.unifs

    const renderModeValue: string | null =
      renderstate instanceof ColorRenderState && renderMode ? renderstate.renderMode : null

    const drawingOutlines =
      renderstate instanceof ColorRenderState &&
      outlineThickness &&
      renderstate.outlineMethod == 'geometry' &&
      renderstate.outlineThickness > 0 &&
      renderModeValue != 'flat-noedges' &&
      renderModeValue != 'pbr-noedges'

    const drawingWireframeOutlines = drawingOutlines && renderModeValue == 'wireframe'
    if (drawingWireframeOutlines) {
      gl.enable(gl.STENCIL_TEST)
      gl.clearStencil(0)
      gl.clear(gl.STENCIL_BUFFER_BIT)
      gl.stencilOpSeparate(gl.FRONT, gl.DECR_WRAP, gl.DECR_WRAP, gl.DECR_WRAP)
      gl.stencilOpSeparate(gl.BACK, gl.INCR_WRAP, gl.INCR_WRAP, gl.INCR_WRAP)
      gl.stencilFunc(gl.ALWAYS, 0, 0xff)

      gl.enable(gl.CULL_FACE)
      gl.cullFace(gl.BACK)
      gl.disable(gl.DEPTH_TEST)
      gl.depthMask(false)
      gl.colorMask(false, false, false, false)
      // @ts-ignore
    } else if (renderModeValue == 'hiddenline') {
      // Note: only the standard surface shader exposes the 'renderMode' uniform,
      // so this prevents other shaders from being skippped.
      // e.g. PMI data shoudl show up normally in wireframe mode and it is rendered using the FlatSurfaceShader.
      // don't render surfaces
      gl.colorMask(false, false, false, false)
    }

    if (geomType) gl.uniform1i(geomType.location, GeomType.TRIANGLES)

    // Always zero this value before drawing the faces, else the shader could think its drawing the outline.
    if (outlineThickness) {
      gl.uniform1f(outlineThickness.location, 0)
    }

    multiDrawMeshes()

    if (drawingOutlines) {
      const colorRenderState = <ColorRenderState>renderstate
      // Only draw font faces. BEcause all faces are drawn, it can make a mess to see the back faces through the front faces.
      // e.g. we might see the triangles on the other side of a sphere rendered over the top of triangles on the near side.
      gl.enable(gl.CULL_FACE)
      gl.cullFace(gl.FRONT)
      // @ts-ignore
      gl.uniform1f(outlineThickness.location, colorRenderState.outlineThickness)
      gl.uniform1f(viewportWidth.location, colorRenderState.region[2] - colorRenderState.region[0])
      // @ts-ignore
      if (renderModeValue == 'hiddenline') {
        // start rendering surfaces again
        gl.colorMask(true, true, true, false)
      }
      if (!drawingWireframeOutlines) {
        gl.enable(gl.BLEND)
        gl.blendEquation(gl.FUNC_ADD)
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
      }

      multiDrawMeshes()

      gl.disable(gl.CULL_FACE)
      gl.cullFace(gl.BACK)

      if (drawingWireframeOutlines) {
        gl.enable(gl.DEPTH_TEST)
        gl.depthMask(true)
        gl.colorMask(true, true, true, true)

        gl.stencilFunc(gl.NOTEQUAL, 0x0, 0xff)
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP)

        // Blend the outline over the existing geometry.
        {
          gl.enable(gl.BLEND)
          gl.blendEquation(gl.FUNC_ADD)
          gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
        }

        // cache the previously bound shader.
        const shader = colorRenderState.glShader
        const shaderKey = colorRenderState.shaderkey
        const screenQuad = colorRenderState.screenQuad
        screenQuad.bindShader(colorRenderState)
        screenQuad.draw(colorRenderState, colorRenderState.outlineColor)

        // Re-bind the previously bound geomdata shader.
        shader.bind(colorRenderState, shaderKey)
        this.renderer.glGeomItemLibrary.bind(colorRenderState)
        this.renderer.glGeomLibrary.bind(colorRenderState)
        this.renderer.glMaterialLibrary.bind(colorRenderState)

        gl.disable(gl.STENCIL_TEST)
      }
    }
  }
}

export { GLMeshItemSet }
