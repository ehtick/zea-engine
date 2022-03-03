/* eslint-disable guard-for-in */
import { EventEmitter } from '../../Utilities/index'
import { Points, Lines, Mesh, CompoundGeom, PointsProxy, LinesProxy, MeshProxy, BaseGeom } from '../../SceneTree/index'
import { GLGeomItemSetMultiDrawCompoundGeom } from './GLGeomItemSetMultiDrawCompoundGeom'
import { GLGeomItemSetMultiDraw } from './GLGeomItemSetMultiDraw'
import { GLLinesItemSet } from './GLLinesItemSet'
import { GLPointsItemSet } from './GLPointsItemSet'
import { GLMeshItemSet } from './GLMeshItemSet'
import { GLStandardGeomsPass } from '../Passes'
import { GLGeomItem } from './GLGeomItem'
import { Vec3 } from '../../Math/Vec3'
import { RenderState, GeomDataRenderState, ColorRenderState } from '../types/renderer'
import { WebGL12RenderingContext } from '../types/webgl'

/** Class representing GL shader materials.
 * @private
 */
class GLShaderGeomSets extends EventEmitter {
  protected pass: GLStandardGeomsPass
  protected gl: WebGL12RenderingContext
  protected glShader: any
  protected glGeomDataShader: any
  protected glHighlightShader: any
  protected glGeomItemSets: Record<string, GLGeomItemSetMultiDraw | GLGeomItemSetMultiDrawCompoundGeom> = {}

  protected glShaderKey: string
  protected glGeomDataShaderKey: string = ''
  protected glHighlightShaderKey: string = ''
  /**
   * Create a GL shader material.
   * @param pass - The pass that owns this object.
   * @param gl - The glShader value.
   * @param shaders - The shader value.
   */
  constructor(pass: GLStandardGeomsPass, gl: WebGL12RenderingContext, shaders: Record<string, any>) {
    super()
    this.pass = pass
    this.gl = gl
    // this.shaderAttrSpec = {}
    this.glShader = shaders.glShader
    this.glGeomDataShader = shaders.glgeomdatashader ? shaders.glgeomdatashader : shaders.glShader
    this.glHighlightShader = shaders.glselectedshader ? shaders.glselectedshader : shaders.glShader

    this.glShaderKey = shaders.glShader.getId() + 'multidraw-draw'

    if (this.glGeomDataShader) this.glGeomDataShaderKey = this.glGeomDataShader.getId() + 'multidraw-geomdata'
    if (this.glHighlightShader) this.glHighlightShaderKey = this.glHighlightShader.getId() + 'multidraw-highlight'
  }

  /**
   * Given a GeomItem, constructs the GLGeomItemSet that handles drawing that type of geometry.
   * @param geom - The geomitem value.
   * @return - The return value.
   * */
  getOrCreateGLGeomItemSet(geom: BaseGeom) {
    let glGeomItemSet
    if (geom instanceof CompoundGeom) {
      if (this.glGeomItemSets['CompoundGeom']) return this.glGeomItemSets['CompoundGeom']
      glGeomItemSet = new GLGeomItemSetMultiDrawCompoundGeom(this.pass.renderer!)
      this.glGeomItemSets['CompoundGeom'] = glGeomItemSet
    } else if (geom instanceof Mesh || geom instanceof MeshProxy) {
      if (this.glGeomItemSets['GLMesh']) return this.glGeomItemSets['GLMesh']
      glGeomItemSet = new GLMeshItemSet(this.pass.renderer!)
      this.glGeomItemSets['GLMesh'] = glGeomItemSet
    } else if (geom instanceof Lines || geom instanceof LinesProxy) {
      if (this.glGeomItemSets['GLLines']) return this.glGeomItemSets['GLLines']
      glGeomItemSet = new GLLinesItemSet(this.pass.renderer!)
      this.glGeomItemSets['GLLines'] = glGeomItemSet
    } else if (geom instanceof Points || geom instanceof PointsProxy) {
      if (this.glGeomItemSets['GLPoints']) return this.glGeomItemSets['GLPoints']
      glGeomItemSet = new GLPointsItemSet(this.pass.renderer!)
      this.glGeomItemSets['GLPoints'] = glGeomItemSet
    } else {
      throw new Error('Unsupported geom type:' + geom.constructor.name)
    }

    glGeomItemSet.on('updated', () => {
      this.emit('updated')
    })
    return glGeomItemSet
  }

  /**
   * The addGLGeomItem method.
   * @param glGeomItem - The glGeomItem value.
   */
  addGLGeomItem(glGeomItem: GLGeomItem) {
    const geomItem = glGeomItem.geomItem
    const geom = geomItem.geomParam.value
    const material = glGeomItem.geomItem.materialParam.value

    const geomItemParamChanged = () => {
      this.pass.removeGeomItem(geomItem)
      this.pass.renderer!.assignTreeItemToGLPass(geomItem)
    }
    material.on('opacityChanged', geomItemParamChanged)
    geomItem.on('opacityChanged', geomItemParamChanged)
    geomItem.materialParam.on('valueChanged', geomItemParamChanged)
    geomItem.geomParam.on('valueChanged', geomItemParamChanged)

    const glGeomItemSet = this.getOrCreateGLGeomItemSet(geom)
    glGeomItem.material = material
    glGeomItem.GLGeomItemSet = glGeomItemSet
    glGeomItem.geomItemParamChanged = geomItemParamChanged
    glGeomItemSet.addGLGeomItem(glGeomItem)
  }

  /**
   *  Called by the GLPass to remove an item from this GLShaderGeomSets object.
   * @param glGeomItem - The glGeomItem value.
   */
  removeGLGeomItem(glGeomItem: GLGeomItem) {
    const geomItem = glGeomItem.geomItem
    const material = glGeomItem.material
    const geomItemParamChanged = glGeomItem.geomItemParamChanged
    material.off('opacityChanged', geomItemParamChanged)
    geomItem.off('opacityChanged', geomItemParamChanged)
    geomItem.materialParam.off('valueChanged', geomItemParamChanged)
    geomItem.geomParam.off('valueChanged', geomItemParamChanged)
    glGeomItem.material = null
    glGeomItem.geomItemParamChanged = null

    const glGeomItemSet = glGeomItem.GLGeomItemSet
    glGeomItemSet.removeGLGeomItem(glGeomItem)
    glGeomItem.GLGeomItemSet = null
  }

  /**
   * Binds one of its shaders for rendering, and also the other textures and values needed.
   * @param glShader - The shader to bind
   * @param renderstate - The render state for the current draw traversal
   * @param key - The key to use to cache the shader binding.
   * @private
   */
  bindShader(glShader: Record<string, any>, renderstate: RenderState, key: string) {
    const gl = this.gl
    if (!glShader.isCompiledForTarget(key)) {
      if (gl.multiDrawElements) {
        renderstate.shaderopts.directives.push('#define ENABLE_MULTI_DRAW\n#extension GL_ANGLE_multi_draw : enable')
      } else {
        renderstate.shaderopts.directives.push('#define ENABLE_MULTI_DRAW')
      }
      glShader.compileForTarget(key, renderstate.shaderopts)
      renderstate.shaderopts.directives.pop()
    }

    if (!glShader.bind(renderstate, key)) {
      throw new Error('Unable to bind shader:' + glShader)
    }

    this.pass.renderer!.glGeomItemLibrary.bind(renderstate)
    this.pass.renderer!.glGeomLibrary.bind(renderstate)
    this.pass.renderer!.glMaterialLibrary.bind(renderstate)
  }

  /**
   * Draws all elements, binding the shader and continuing into the GLGLGeomSetGeomItemSets
   * @param renderstate - The render state for the current draw traversal
   */
  draw(renderstate: ColorRenderState) {
    this.bindShader(this.glShader, renderstate, this.glShaderKey)

    for (const elementType in this.glGeomItemSets) {
      this.glGeomItemSets[elementType].draw(renderstate)
    }

    this.glShader.unbind(renderstate)
  }

  /**
   * The drawHighlightedGeoms method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  drawHighlightedGeoms(renderstate: RenderState) {
    if (!this.glHighlightShader) return
    this.bindShader(this.glHighlightShader, renderstate, this.glHighlightShaderKey)

    for (const elementType in this.glGeomItemSets) {
      this.glGeomItemSets[elementType].drawHighlighted(renderstate)
    }
    this.glHighlightShader.unbind(renderstate)
  }

  /**
   * The drawGeomData method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  drawGeomData(renderstate: GeomDataRenderState) {
    this.bindShader(this.glGeomDataShader, renderstate, this.glGeomDataShaderKey)

    const gl = renderstate.gl
    const { floatGeomBuffer, passId, occlusionCulling, viewportSize } = renderstate.unifs
    if (floatGeomBuffer) {
      gl.uniform1i(floatGeomBuffer.location, renderstate.floatGeomBuffer ? 1 : 0)
    }
    if (passId) {
      gl.uniform1i(passId.location, renderstate.passIndex)
    }

    if (occlusionCulling) {
      gl.uniform1i(occlusionCulling.location, renderstate.occlusionCulling ?? 0)
    }

    for (const elementType in this.glGeomItemSets) {
      this.glGeomItemSets[elementType].drawGeomData(renderstate)
    }

    this.glGeomDataShader.unbind(renderstate)
  }

  /**
   * Sorts the drawn items in order furthest to nearest when rendering transparent objects.
   * @param viewPos - The position of the camera that we are sorting relative to.
   */
  sortItems(viewPos: Vec3) {
    // Note: sorting here will not sort geometries of different types.
    // this is a flawed solution that only sorts geomemtries of the same
    // time and same shader against each other. Given that this is the data 99% o
    // of the time, this is an acceptable tradeoff
    for (const elementType in this.glGeomItemSets) {
      this.glGeomItemSets[elementType].sortItems(viewPos)
    }
  }
}

export { GLShaderGeomSets }
