import { EventEmitter } from '../../Utilities/index'

import '../../SceneTree/GeomItem'
import { GeomItem } from '../../SceneTree/GeomItem'
import { VisibilityChangedEvent } from '../../Utilities/Events/VisibilityChangedEvent'

const GLGeomItemChangeType = {
  GEOMITEM_CHANGED: 0,
  GEOM_CHANGED: 1,
  VISIBILITY_CHANGED: 2,
  HIGHLIGHT_CHANGED: 3
}

const GLGeomItemFlags = {
  GEOMITEM_FLAG_CUTAWAY: 1, // 1<<0;
  GEOMITEM_INVISIBLE_IN_GEOMDATA: 2 // 1<<0;
}

/** This class is responsible for managing a GeomItem within the renderer.
 * @private
 * @extends EventEmitter
 */
class GLGeomItem extends EventEmitter {
  protected listenerIDs: Record<string, number> = {}
  //referenced by other classes
  material: any
  GLGeomItemSet: any
  geomItemParamChanged: any

  protected gl: WebGL12RenderingContext
  geomItem: GeomItem
  drawItemId: number
  geomId: number
  materialId: number
  protected supportInstancing: boolean
  protected geomVisible: boolean
  visible: boolean
  protected culled: boolean
  protected cutDataChanged: boolean = false
  protected cutData: number[] = []
  protected geomData: any
  protected geomMatrixDirty: boolean = false
  protected modelMatrixArray: any

  protected geomMatrixChanged: any
  protected cutAwayChanged: any
  protected highlightChanged: any
  /**
   * Create a GL geom item.
   * @param {WebGL12RenderingContext} gl - The gl value.
   * @param {GeomItem} geomItem - The geomItem value.
   * @param {number} drawItemId - The drawItemId value.
   * @param {number} geomId - The geomId value.
   * @param {number} materialId - The materialId value.
   * @param {boolean} supportInstancing - a boolean to disable instancing support on some mobile platforms
   */
  constructor(
    gl: WebGL12RenderingContext,
    geomItem: GeomItem,
    drawItemId: number,
    geomId: number,
    materialId: number,
    supportInstancing = false
  ) {
    super()
    this.gl = gl
    this.geomItem = geomItem
    this.drawItemId = drawItemId
    this.geomId = geomId
    this.materialId = materialId
    this.supportInstancing = supportInstancing

    this.geomVisible = this.geomItem.isVisible()
    this.visible = this.geomVisible
    this.culled = false

    this.listenerIDs['visibilityChanged'] = this.geomItem.on('visibilityChanged', (event) => {
      this.updateVisibility()
    })

    if (!this.supportInstancing) {
      this.cutDataChanged = false
      this.cutData = [0, 0, 0, 0]

      const materialId = 0
      let flags = 0
      if (this.geomItem.isCutawayEnabled()) {
        flags |= GLGeomItemFlags.GEOMITEM_FLAG_CUTAWAY
      }
      if (geomItem.getSelectable() == false) {
        flags |= GLGeomItemFlags.GEOMITEM_INVISIBLE_IN_GEOMDATA
      }

      this.geomData = [flags, materialId, 0, 0]

      this.geomMatrixDirty = true
      this.listenerIDs['GeomMat.valueChanged'] = this.geomItem.getParameter('GeomMat')!.on('valueChanged', () => {
        this.geomMatrixDirty = true
        this.emit('updated')
      })
      this.listenerIDs['cutAwayChanged'] = this.geomItem.on('cutAwayChanged', () => {
        this.cutDataChanged = true
        this.emit('updated')
      })
    }
  }

  /**
   * The getGeomItem method.
   * @return {any} - The return value.
   */
  getGeomItem() {
    return this.geomItem
  }

  /**
   * The isVisible method.
   * @return {any} - The return value.
   */
  isVisible() {
    return this.visible
  }

  /**
   * The getId method.
   * @return {any} - The return value.
   */
  getDrawItemId() {
    return this.drawItemId
  }

  /**
   * The updateVisibility method.
   */
  updateVisibility() {
    this.geomVisible = this.geomItem.isVisible()
    const visible = this.geomVisible && !this.culled
    if (this.visible != visible) {
      this.visible = visible
      const event = new VisibilityChangedEvent(visible)
      this.emit('visibilityChanged', event)
      this.emit('updated')
    }
  }

  /**
   * Sets the additional culled value which controls visiblity
   * @param {boolean} culled - True if culled, else false.
   */
  setCulled(culled: boolean) {
    this.culled = culled
    const visible = this.geomVisible && !this.culled
    if (this.visible != visible) {
      this.visible = visible
      const event = new VisibilityChangedEvent(visible)
      this.emit('visibilityChanged', event)
    }
  }

  /**
   * The bind method.
   * @param {RenderState} renderstate - The object tracking the current state of the renderer
   * @return {any} - The return value.
   */
  bind(renderstate: RenderState) {
    const gl = this.gl
    const unifs = renderstate.unifs

    if (!this.supportInstancing) {
      const modelMatrixunif = unifs.modelMatrix
      if (modelMatrixunif) {
        if (this.geomMatrixDirty) {
          this.modelMatrixArray = this.geomItem.getGeomMat4().asArray()
        }
        gl.uniformMatrix4fv(modelMatrixunif.location, false, this.modelMatrixArray)
      }
      const drawItemDataunif = unifs.drawItemData
      if (drawItemDataunif) {
        gl.uniform4fv(drawItemDataunif.location, this.geomData)
      }
      const cutawayDataUnif = unifs.cutawayData
      if (cutawayDataUnif) {
        if (this.cutDataChanged) {
          if (this.geomItem.isCutawayEnabled()) {
            const cutAwayVector = this.geomItem.getCutVector()
            const cutAwayDist = this.geomItem.getCutDist()
            this.cutData = [cutAwayVector.x, cutAwayVector.y, cutAwayVector.z, cutAwayDist]
          }
        }
        gl.uniform4fv(cutawayDataUnif.location, this.cutData)
      }
    }

    const unif = unifs.drawItemId
    if (unif) {
      gl.uniform1i(unif.location, this.drawItemId)
    }
    return true
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy() {
    this.geomItem.removeListenerById('visibilityChanged', this.listenerIDs['visibilityChanged'])
    if (!this.supportInstancing) {
      this.geomItem.getParameter('GeomMat')!.removeListenerById('valueChanged', this.listenerIDs['GeomMat.valueChanged'])
      this.geomItem.removeListenerById('cutAwayChanged', this.listenerIDs['cutAwayChanged'])
    }
  }
}

export { GLGeomItemChangeType, GLGeomItemFlags, GLGeomItem }