/* eslint-disable guard-for-in */
import { EventEmitter } from '../../Utilities/index'
import { GLOpaqueGeomsPass, GLStandardGeomsPass } from '../Passes'
import { ColorRenderState, GeomDataRenderState, HighlightRenderState } from '../RenderStates/index'
import { WebGL12RenderingContext } from '../types/webgl'
import { GLGeom } from './GLGeom'
import { GLGeomItem } from './GLGeomItem'
import { GLGeomItemSet } from './GLGeomItemSet'
import { GLMaterial } from './GLMaterial'

/** Class representing GL material geom item sets.
 * @private
 */
class GLMaterialGeomItemSets extends EventEmitter {
  protected pass: GLStandardGeomsPass
  protected __gl: WebGL12RenderingContext
  glMaterial: GLMaterial
  protected glGeomItemSets: Map<GLGeom, GLGeomItemSet> = new Map()
  protected drawCount = 0
  /**
   * Create a GL material geom item set.
   * @param pass - The pass that owns the GLMaterialGeomItemSets.
   * @param glMaterial - The glMaterial value.
   */
  constructor(pass: GLStandardGeomsPass, glMaterial: GLMaterial) {
    super()
    this.pass = pass
    this.__gl = pass.renderer!.gl
    this.glMaterial = glMaterial

    const material = glMaterial.getMaterial()
    const materialChanged = (event: Record<string, any>) => {
      material.off('opacityChanged', materialChanged)

      this.glGeomItemSets.forEach((glGeomItemSet) => {
        for (const glGeomItem of glGeomItemSet.glGeomItems) {
          const geomItem = glGeomItem.geomItem
          this.pass.removeGeomItem(geomItem)
          this.pass.renderer!.assignTreeItemToGLPass(geomItem)
        }
      })
    }
    material.on('opacityChanged', materialChanged)
  }

  /**
   * The getGLMaterial method.
   * @return - The return value.
   */
  getGLMaterial(): GLMaterial {
    return this.glMaterial
  }

  /**
   * The addGLGeomItem method.
   * @param glGeomItem - The glGeomItem value.
   * @param glGeom - The glGeomItem value.
   * @private
   */
  addGLGeomItem(glGeomItem: GLGeomItem, glGeom: GLGeom): void {
    let geomItemSet = this.glGeomItemSets.get(glGeom)
    if (!geomItemSet) {
      geomItemSet = new GLGeomItemSet(this.__gl, glGeom)
      this.addGeomItemSet(geomItemSet)
    }
    geomItemSet.addGLGeomItem(glGeomItem)
  }

  /**
   * The drawCountChanged method.
   * @param event - The change value.
   * @private
   */
  drawCountChanged(event: Record<string, any>): void {
    this.drawCount += event.change
    this.emit('updated')
  }

  /**
   * The __materialChanged method.
   * @private
   */
  __materialChanged(): void {
    const material = this.glMaterial.getMaterial()
    if (!this.pass.checkMaterial(material)) {
      this.glGeomItemSets.forEach((glGeomItemSet) => {
        for (const glGeomItem of glGeomItemSet.glGeomItems) {
          const geomItem = glGeomItem.geomItem
          this.pass.removeGeomItem(geomItem)
          this.pass.renderer!.assignTreeItemToGLPass(geomItem)
        }
      })
    }
  }

  /**
   * The addGeomItemSet method.
   * @param glGeomItemSet - The glGeomItemSet value.
   */
  addGeomItemSet(glGeomItemSet: GLGeomItemSet): void {
    this.glGeomItemSets.set(glGeomItemSet.getGLGeom(), glGeomItemSet)
    const listenerID = glGeomItemSet.on('drawCountChanged', (event: any) => {
      this.drawCountChanged(event)
    })
    glGeomItemSet.once('destructing', () => {
      glGeomItemSet.off('drawCountChanged', listenerID)
      this.glGeomItemSets.delete(glGeomItemSet.getGLGeom())
      if (this.glGeomItemSets.size == 0) {
        // Remove the listeners.
        // const material = this.glMaterial.getMaterial()
        // const baseColorParam = material.getParameter('BaseColor')
        // if (baseColorParam) {
        //   baseColorParam.off('valueChanged', this.__materialChanged)
        // }
        // const opacityParam = material.getParameter('Opacity')
        // if (opacityParam) {
        //   opacityParam.off('valueChanged', this.__materialChanged)
        // }

        this.emit('destructing')
      }
    })
  }

  /**
   * Draws all elements, binding the shader and continuing into the GLGeomItemSet
   * @param renderstate - The render state for the current draw traversal
   */
  draw(renderstate: ColorRenderState): void {
    if (this.drawCount == 0) return
    const warnMissingUnifs = true
    this.glMaterial.bind(renderstate, warnMissingUnifs)
    this.glGeomItemSets.forEach((glGeomItemSet) => {
      glGeomItemSet.draw(renderstate)
    })
    this.glMaterial.unbind(renderstate)
  }

  /**
   * The drawHighlighted method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  drawHighlighted(renderstate: HighlightRenderState): void {
    this.glMaterial.bind(renderstate, false)
    this.glGeomItemSets.forEach((glGeomItemSet) => {
      glGeomItemSet.drawHighlighted(renderstate)
    })
    this.glMaterial.unbind(renderstate)
  }

  /**
   * The drawHighlightedGeoms method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  drawGeomData(renderstate: GeomDataRenderState): void {
    this.glMaterial.bind(renderstate, false)
    this.glGeomItemSets.forEach((glGeomItemSet) => {
      glGeomItemSet.drawGeomData(renderstate)
    })
    this.glMaterial.unbind(renderstate)
  }
}

export { GLMaterialGeomItemSets }
