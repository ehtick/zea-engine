import { EventEmitter } from '../../Utilities/index'
import { GeomItem, CADBody } from '../../SceneTree'
import { RenderState } from '../RenderStates'
import { WebGL12RenderingContext } from '../types/webgl'
import { VisibilityChangedEvent, OpacityStateChangedEvent, StateChangedEvent } from '../../Utilities/Events'

const GLGeomItemChangeType = {
  GEOMITEM_CHANGED: 0,
  GEOM_CHANGED: 1,
  VISIBILITY_CHANGED: 2,
  HIGHLIGHT_CHANGED: 3,
}

const GLGeomItemFlags = {
  GEOMITEM_FLAG_CUTAWAY: 1, // 1<<0;
  GEOMITEM_INVISIBLE_IN_GEOMDATA: 2, // 1<<1;
  GEOMITEM_TRANSPARENT: 4, // 1<<1;
}

/** This class is responsible for managing a GeomItem within the renderer.
 * @private
 * @extends EventEmitter
 */
class GLGeomItem extends EventEmitter {
  protected listenerIDs: Record<string, number> = {}
  //referenced by other classes
  GLGeomItemSet: any
  GLShaderGeomSets: any

  protected gl: WebGL12RenderingContext
  geomItem: GeomItem
  geomItemId: number
  geomId: number
  materialId: number
  protected supportInstancing: boolean
  protected geomVisible: boolean
  visible: boolean
  shattered: boolean = false
  culled: boolean = false
  protected cutDataChanged: boolean = false
  protected cutData: number[] = []
  protected geomData: any
  protected geomMatrixDirty: boolean = false
  protected modelMatrixArray: Float32Array

  protected geomMatrixChanged: any
  protected cutAwayChanged: any
  protected highlightChanged: any
  /**
   * Create a GL geom item.
   * @param gl - The gl value.
   * @param geomItem - The geomItem value.
   * @param geomItemId - The geomItemId value.
   * @param geomId - The geomId value.
   * @param materialId - The materialId value.
   * @param supportInstancing - a boolean to disable instancing support on some mobile platforms
   */
  constructor(
    gl: WebGL12RenderingContext,
    geomItem: GeomItem,
    geomItemId: number,
    geomId: number,
    materialId: number,
    supportInstancing = false
  ) {
    super()
    this.gl = gl
    this.geomItem = geomItem
    this.geomItemId = geomItemId
    this.geomId = geomId
    this.materialId = materialId
    this.supportInstancing = supportInstancing

    this.visible = this.geomItem.isVisible()

    this.listenerIDs['visibilityChanged'] = this.geomItem.on('visibilityChanged', (event: VisibilityChangedEvent) => {
      const wasVisible = !this.culled && this.visible
      this.visible = event.visible
      const isVisible = !this.culled && this.visible
      if (wasVisible != isVisible) {
        this.emit('visibilityChanged', new VisibilityChangedEvent(isVisible))
      }
    })

    if (geomItem instanceof CADBody) this.shattered = geomItem.shattered
    this.listenerIDs['shatterStateChanged'] = this.geomItem.on('shatterStateChanged', (event: StateChangedEvent) => {
      this.shattered = event.state
      this.emit('shatterStateChanged', event)
    })

    if (!this.supportInstancing) {
      this.cutDataChanged = false
      this.cutData = [0, 0, 0, 0]

      const materialId = 0
      let flags = 0
      if (this.geomItem.isCutawayEnabled()) {
        flags |= GLGeomItemFlags.GEOMITEM_FLAG_CUTAWAY
      }
      if (!geomItem.isSelectable()) {
        flags |= GLGeomItemFlags.GEOMITEM_INVISIBLE_IN_GEOMDATA
      }
      if (!geomItem.materialParam.value.isOpaque()) {
        flags |= GLGeomItemFlags.GEOMITEM_TRANSPARENT
      }

      this.geomData = [flags, materialId, 0, 0]

      this.geomMatrixDirty = true
      this.listenerIDs['GeomMat.valueChanged'] = this.geomItem.geomMatParam.on('valueChanged', () => {
        this.geomMatrixDirty = true
        this.emit('updated')
      })
      this.listenerIDs['cutAwayChanged'] = this.geomItem.on('cutAwayChanged', () => {
        this.cutDataChanged = true
        this.emit('updated')
      })

      const opacityChanged = (event: OpacityStateChangedEvent) => {
        if (event.isOpaqueStateChanged) {
          let flags = this.geomData[0]
          if (event.isOpaque) flags &= ~GLGeomItemFlags.GEOMITEM_TRANSPARENT
          else flags |= GLGeomItemFlags.GEOMITEM_TRANSPARENT
          this.geomData[0]
          this.emit('updated')
        }
      }
      this.listenerIDs['opacityChanged'] = this.geomItem.on('opacityChanged', opacityChanged)
      this.listenerIDs['material:opacityChanged'] = this.geomItem.materialParam.on('opacityChanged', opacityChanged)
    }
  }

  /**
   * The getGeomItem method.
   * @return - The return value.
   */
  getGeomItem(): GeomItem {
    return this.geomItem
  }

  /**
   * The isVisible method.
   * @return - The return value.
   */
  isVisible(): boolean {
    return !this.culled && this.visible
  }

  /**
   * The getId method.
   * @return - The return value.
   */
  getGeomItemId(): number {
    return this.geomItemId
  }

  /**
   * Sets the additional culled value which controls visiblity
   * @param culled - True if culled, else false.
   */
  setCulled(culled: boolean): void {
    const wasVisible = !this.culled && this.visible
    this.culled = culled
    const isVisible = !this.culled && this.visible
    if (wasVisible != isVisible) {
      this.emit('visibilityChanged', new VisibilityChangedEvent(isVisible))
    }
  }

  /**
   * The bind method.
   * @param renderstate - The object tracking the current state of the renderer
   * @return - The return value.
   */
  bind(renderstate: RenderState): boolean {
    const gl = this.gl
    const unifs = renderstate.unifs

    if (!this.supportInstancing) {
      const modelMatrixunif = unifs.modelMatrix
      if (modelMatrixunif) {
        if (this.geomMatrixDirty) {
          this.modelMatrixArray = this.geomItem.geomMatParam.value.asArray()
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

    const unif = unifs.geomItemId
    if (unif) {
      gl.uniform1i(unif.location, this.geomItemId)
    }
    return true
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy(): void {
    this.geomItem.removeListenerById('visibilityChanged', this.listenerIDs['visibilityChanged'])
    if (!this.supportInstancing) {
      this.geomItem.geomMatParam.removeListenerById('valueChanged', this.listenerIDs['GeomMat.valueChanged'])
      this.geomItem.removeListenerById('cutAwayChanged', this.listenerIDs['cutAwayChanged'])
    }
  }
}

export { GLGeomItemChangeType, GLGeomItemFlags, GLGeomItem }
