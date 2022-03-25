import { GLPass } from './GLPass'

import { GeomItem, TreeItem, Material } from '../../SceneTree/index'
import { MathFunctions } from '../../Utilities/MathFunctions'
import { GLBaseRenderer } from '../GLBaseRenderer'
import { GeomItemAndDist } from '../../Utilities/IntersectionData'
import { OpacityStateChangedEvent } from '../../Utilities'

/** This class abstracts the rendering of a collection of geometries to screen.
 * @extends GLPass
 */
class GLStandardGeomsPass extends GLPass {
  protected materials: Record<number, Material> = {}
  protected listenerIDs: Record<number, Record<string, number>> = {}
  /**
   * Create a GL pass.
   */
  constructor() {
    super()
  }

  /**
   * The init method.
   * @param renderer - The renderer value.
   * @param passIndex - The index of the pass in the GLBAseRenderer
   */
  init(renderer: GLBaseRenderer, passIndex: number): void {
    super.init(renderer, passIndex)
  }

  /**
   * The itemAddedToScene method is called on each pass when a new item
   * is added to the scene, and the renderer must decide how to render it.
   * It allows Passes to select geometries to handle the drawing of.
   * @param treeItem - The treeItem value.
   * @param rargs - Extra return values are passed back in this object.
   * The object contains a parameter 'continueInSubTree', which can be set to false,
   * so the subtree of this node will not be traversed after this node is handled.
   * @return - Returns true if the item is now added to the pass.
   */
  itemAddedToScene(treeItem: TreeItem, rargs: Record<string, any>): boolean {
    if (treeItem instanceof GeomItem) {
      const geomItem = treeItem
      {
        {
          if (this.filterGeomItem(geomItem)) {
            this.addGeomItem(geomItem)
            return true
          } else {
            return false
          }
        }
      }
    } else {
      return false
    }
  }

  /**
   * The itemRemovedFromScene method is called on each pass when aa item
   * is removed to the scene, and the pass must handle cleaning up any resources.
   * @param treeItem - The treeItem value.
   * @param rargs - Extra return values are passed back in this object.
   * @return - The return value.
   */
  itemRemovedFromScene(treeItem: TreeItem, rargs: Record<string, any>): boolean {
    if (treeItem instanceof GeomItem) {
      this.removeGeomItem(treeItem)
      return true
    }
    return false
  }

  /**
   * The filterGeomItem method.
   * @param geomItem - The geomItem value.
   * @return - The return value.
   */
  filterGeomItem(geomItem: GeomItem): boolean {
    return true
  }

  /**
   * The addGeomItem method.
   * @param geomItem - The geomItem value.
   */
  addGeomItem(geomItem: GeomItem): void {
    const listenerIDs: Record<string, number> = {}
    this.listenerIDs[geomItem.getId()] = listenerIDs

    // ////////////////////////////////////
    // Tracking Material Transparency changes...
    // In the case that a geometry material changes, we may need to
    // select a different pass. e.g. if the new material is transparent.

    const reassignPass = () => {
      this.removeGeomItem(geomItem)
      this.renderer!.assignTreeItemToGLPass(geomItem)
    }
    listenerIDs['materialParam.valueChanged'] = geomItem.materialParam.on('valueChanged', reassignPass)
    listenerIDs['geomParam.valueChanged'] = geomItem.geomParam.on('valueChanged', reassignPass)

    const opacityChanged = (event: OpacityStateChangedEvent) => {
      if (event.isOpaqueStateChanged) {
        reassignPass()
      }
    }
    const material = geomItem.materialParam.value
    this.materials[geomItem.getId()] = material
    listenerIDs['geomItem.opacityChanged'] = geomItem.on('opacityChanged', opacityChanged)
    listenerIDs['material.opacityChanged'] = material.on('opacityChanged', opacityChanged)
  }

  /**
   * The removeGeomItem method.
   * @param geomItem - The geomItem value.
   */
  removeGeomItem(geomItem: GeomItem): void {
    const id = geomItem.getId()
    const listenerIDs = this.listenerIDs[id]
    delete this.listenerIDs[id]

    geomItem.materialParam.removeListenerById('valueChanged', listenerIDs['materialParam.valueChanged'])
    geomItem.geomParam.removeListenerById('valueChanged', listenerIDs['geomParam.valueChanged'])

    const material = this.materials[geomItem.getId()]
    delete this.materials[id]
    geomItem.removeListenerById('opacityChanged', listenerIDs['geomItem.opacityChanged'])
    material.removeListenerById('opacityChanged', listenerIDs['material.opacityChanged'])
  }

  /**
   * The constructShaders method.
   * Given a material, generate the various shaders required to render objects
   * using this material. There should always be at least a single glShader
   * and optionally a glgeomdatashader for rendering the goem data buffer
   * and a glselectedshader for rendering selection hilghlights
   * @param shaderName - The name of the base shader.
   * @return - The object containing the shader instances.
   */
  constructShaders(shaderName: string): Record<string, any> {
    let glgeomdatashader
    let glselectedshader

    const glShader = this.__renderer!.getOrCreateShader(shaderName)
    if (glShader.getGeomDataShaderName()) {
      glgeomdatashader = this.__renderer!.getOrCreateShader(glShader.getGeomDataShaderName())
    } else {
      glgeomdatashader = glShader
    }
    if (glShader.getSelectedShaderName()) {
      glselectedshader = this.__renderer!.getOrCreateShader(glShader.getSelectedShaderName())
    } else {
      glselectedshader = glShader
    }
    return {
      glShader,
      glgeomdatashader,
      glselectedshader,
    }
  }

  /**
   * The getGeomItemAndDist method.
   * @param geomData - The geomData value.
   * @return - The return value.
   */
  getGeomItemAndDist(geomData: Float32Array | Uint8Array): GeomItemAndDist | undefined {
    let itemId
    let componentId = -1
    let dist
    if (geomData instanceof Float32Array) {
      itemId = Math.round(geomData[1])
      componentId = Math.round(geomData[2])
      dist = geomData[3]
    } else {
      itemId = geomData[0] + ((geomData[1] & 63) << 8)
      dist = MathFunctions.decode16BitFloatFrom2xUInt8(geomData.slice(2, 3))
    }

    const geomItem = this.renderer!.glGeomItemLibrary.getGeomItem(itemId)
    if (geomItem) {
      return {
        geomItem,
        componentId,
        dist,
      }
    }
    return undefined
  }
}

export { GLStandardGeomsPass }
