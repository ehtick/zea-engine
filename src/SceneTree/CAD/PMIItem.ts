import { CADBody } from './CADBody'
import { Color } from '../../Math/Color'
import { Registry } from '../../Registry'
import { CloneContext } from '../CloneContext'
import { TreeItem } from '../TreeItem'
import { GeomItem } from '../GeomItem'
import { Material } from '../Material'
import { BinReader } from '../BinReader'
import { AssetLoadContext } from '../AssetLoadContext'
import { MaterialColorParam, ColorSpace } from '../Parameters/MaterialColorParam'
import { CADAsset } from './CADAsset'
import { Cuboid } from '../Geometry/Shapes'
import { FlatSurfaceMaterial } from '../Materials/FlatSurfaceMaterial'

const plane = new Cuboid(1, 1, 1)
const planeMaterial = new FlatSurfaceMaterial('plane')
planeMaterial.baseColorParam.value = new Color(1, 1, 0, 0.001)
planeMaterial.overlayParam.value = -0.001
class PMIPickingPlane extends GeomItem {
  addHighlight(name?: string, color?: Color, propagateToChildren = false): void {}
  removeHighlight(name: string, propagateToChildren = false): void {}
}

/**
 * Represents a view of PMI data. within a CAD assembly.
 *
 * @extends TreeItem
 */
class PMIItem extends TreeItem {
  private materialMapping: Record<number, Material> = {}
  /**
   * Creates an instance of PMIItem setting up the initial configuration for Material and Color parameters.
   *
   * @param {string} name - The name value.
   */
  constructor(name?: string) {
    super(name)
  }

  /**
   * The clone method constructs a new PMIItem, copies its values
   * from this item and returns it.
   *
   * @param {number} flags - The flags param.
   * @return {PMIItem} - The return value.
   */
  clone(context?: CloneContext): PMIItem {
    const cloned = new PMIItem()
    cloned.copyFrom(this, context)
    return cloned
  }

  /**
   * Changes the current state of the selection of this item.
   * Note: the PMIItem also activates the PMI linking when selected.
   *
   * @emits `selectedChanged` with selected state
   * @param sel - Boolean indicating the new selection state.
   */
  setSelected(sel: boolean): void {
    super.setSelected(sel)
    if (sel) this.activate()
    else this.deactivate()
  }

  /**
   * Activates the PMIView, adjusting visibility of the PMI items and the camera Xfo
   */
  activate(): void {}

  /**
   * Deactivates the PMIItem
   */
  deactivate(): void {}

  /**
   * Adds a highlight to the tree item.
   *
   * @param {string} name - The name of the tree item.
   * @param {Color} color - The color of the highlight.
   * @param {boolean} propagateToChildren - A boolean indicating whether to propagate to children.
   */
  addHighlight(name?: string, color?: Color, propagateToChildren = false): void {
    super.addHighlight(name, color, false)

    // Instead of adding highlights around the PMI text, which makes it difficult to read
    // we clone the material and modify it so the text, symbols, and line colors
    // become the highlight color.
    if (propagateToChildren) {
      const baseColor = color.clone()
      baseColor.a = 1.0 // highlight colors often have zero alpha, as it controls the highlight fill.
      const materialCache: Record<number, Material> = {}
      this.traverse((treeItem: TreeItem) => {
        if (treeItem instanceof PMIPickingPlane) return false
        if (treeItem instanceof GeomItem) {
          const material = treeItem.materialParam.value
          this.materialMapping[treeItem.getId()] = material
          if (!(material.getId() in materialCache)) {
            const highlightMaterial = material.clone()
            if (highlightMaterial.hasParameter('BaseColor')) {
              const param = highlightMaterial.getParameter('BaseColor')
              if (param instanceof MaterialColorParam) param.colorSpace = ColorSpace.Gamma
              param.setValue(baseColor)
            }
            if (highlightMaterial.hasParameter('EdgeColor')) {
              const param = highlightMaterial.getParameter('EdgeColor')
              if (param instanceof MaterialColorParam) param.colorSpace = ColorSpace.Gamma
              param.setValue(baseColor)
            }
            if (highlightMaterial.hasParameter('Overlay')) {
              highlightMaterial.getParameter('Overlay').setValue(0.85)
            }

            // This *hack* forces PMI text to be rendered to the transparent layer
            // which means it will not have an outline drawn around it.
            // Maybe we should add PMI to the 'OverLay' pass.
            // This would assume that the overlay pass does not clear the depth buffer, which
            // it does right now.
            // @ts-ignore
            highlightMaterial.__isOpaque = false

            treeItem.materialParam.value = highlightMaterial
            // We can reuse this material on other PMI items with the same
            // original material
            materialCache[material.getId()] = highlightMaterial
          }
          treeItem.materialParam.value = materialCache[material.getId()]
        }
      })
    }

    const pmiContainer = (this.getOwner() as TreeItem).getOwner() // TODO: check
    const pmiOwner = (pmiContainer as TreeItem).getOwner()
    if (pmiOwner) {
      const linkedBodies: Record<number, CADBody> = {}
      const linkedBodyElements: Record<number, Array<string>> = {}
      const linkedEntitiesParam = this.getParameter('LinkedEntities')
      if (linkedEntitiesParam) {
        const linkedEntityPaths = linkedEntitiesParam.getValue()
        linkedEntityPaths.forEach((pathStr: string, index: number) => {
          if (pathStr == '') return
          const path = pathStr.split(', ')
          const elemId = path.pop()
          try {
            const cadBody = pmiOwner.resolvePath(path) as CADBody
            if (cadBody && cadBody instanceof CADBody) {
              if (cadBody.getNumChildren() == 0) {
                cadBody.setShatterState(true)
                if (!linkedBodies[cadBody.getId()]) {
                  linkedBodies[cadBody.getId()] = cadBody
                  linkedBodyElements[cadBody.getId()] = []
                }
                linkedBodyElements[cadBody.getId()].push(elemId)
              } else {
                const linkedEntity = cadBody.getChildByName(elemId)
                if (linkedEntity) linkedEntity.addHighlight(name, color, true)
              }
              // linkedEntity.addHighlight(name + ':' + elemId, color, true)
            } else {
              console.log('linkedEntity.addHighlight(name, color, true):', path)
            }
          } catch (e) {
            console.log(index + ':' + (e as Record<string, any>).message)
          }
        })
        for (let key in linkedBodies) {
          const cadBody = linkedBodies[key]
          const elemIds = linkedBodyElements[key]
          cadBody.addHighlight(name + ':' + elemIds.toString(), color, true)
        }
      }
    }
  }

  /**
   * Removes a highlight to the tree item.
   *
   * @param {string} name - The name of the tree item.
   * @param {boolean} propagateToChildren - A boolean indicating whether to propagate to children.
   */
  removeHighlight(name: string, propagateToChildren = false): void {
    // super.removeHighlight(name, propagateToChildren)
    super.removeHighlight(name, false)

    if (propagateToChildren) {
      this.traverse((treeItem: TreeItem) => {
        if (treeItem instanceof GeomItem) {
          if (treeItem.getId() in this.materialMapping) {
            treeItem.materialParam.value = this.materialMapping[treeItem.getId()]
            delete this.materialMapping[treeItem.getId()]
          }
        }
      })
    }

    const pmiContainer = (this.getOwner() as TreeItem).getOwner()
    const pmiOwner = (pmiContainer as TreeItem).getOwner()
    if (pmiOwner) {
      const linkedBodies: Record<number, CADBody> = {}
      const linkedBodyElements: Record<number, Array<string>> = {}
      const linkedEntitiesParam = this.getParameter('LinkedEntities')
      if (linkedEntitiesParam) {
        const linkedEntityPaths = linkedEntitiesParam.getValue()
        linkedEntityPaths.forEach((pathStr: string) => {
          if (pathStr == '') return
          const path = pathStr.split(', ')
          const elemId = path.pop()
          try {
            const cadBody = pmiOwner.resolvePath(path) as CADBody
            if (cadBody && cadBody instanceof CADBody) {
              if (cadBody.getNumChildren() == 0) {
                cadBody.setShatterState(false)
                if (!linkedBodies[cadBody.getId()]) {
                  linkedBodies[cadBody.getId()] = cadBody
                  linkedBodyElements[cadBody.getId()] = []
                }
                linkedBodyElements[cadBody.getId()].push(elemId)
              } else {
                const linkedEntity = cadBody.getChildByName(elemId)
                if (linkedEntity) linkedEntity.removeHighlight(name, true)
              }
              // linkedEntity.addHighlight(name + ':' + elemId, color, true)
            } else {
              console.log('linkedEntity.addHighlight(name, color, true):failed')
            }
          } catch (e) {
            console.log((e as Record<string, any>).message)
          }
        })
        for (let key in linkedBodies) {
          const cadBody = linkedBodies[key]
          const elemIds = linkedBodyElements[key]
          cadBody.removeHighlight(name + ':' + elemIds.toString(), true)
        }
      }
    }
  }

  // ///////////////////////////
  // Persistence

  /**
   * Load the binary data for this class
   * @param reader - The reader param.
   * @param context - The context param.
   */
  readBinary(reader: BinReader, context: AssetLoadContext): void {
    super.readBinary(reader, context)

    this.traverse((item) => {
      if (item instanceof GeomItem) {
        const material = item.materialParam.value
        if (material.getShaderName() == 'StandardSurfaceShader') {
          material.setShaderName('FlatSurfaceShader')
        }
        // This *hack* forces PMI text to be rendered to the transparent layer
        // which means it will not have an outline drawn around it.
        // Maybe we should add PMI to the 'OverLay' pass.
        // This would assume that the overlay pass does not clear the depth buffer, which
        // it does right now.
        // @ts-ignore
        item.__opacity = 0.99
      }
    })

    // Here we place a transparent plane behind the PMI Text to enable
    // easier clicking on PMI items in the 3d Viewport.
    context.assetItem.getGeometryLibrary().once('loaded', () => {
      this.traverse((item) => {
        // Note: We could implement a PMIText class that is generated in the bridge
        // when processing PMI, so we don't need to do this hacky name check.
        // Then the Text would be able to generate the plane during load.
        if (item.getName().startsWith('Text')) {
          const planeItems: GeomItem[] = []
          item.traverse((item) => {
            if (item instanceof GeomItem) {
              const geom = item.geomParam.value
              const bbox = geom.getBoundingBox()

              const planeGeomItem = new PMIPickingPlane('plane', plane, planeMaterial)
              const xfo = item.localXfoParam.value.multiply(item.geomOffsetXfoParam.value)
              xfo.tr.addInPlace(bbox.center())
              xfo.sc.multiplyInPlace(bbox.diagonal())
              planeGeomItem.localXfoParam.value = xfo
              planeItems.push(planeGeomItem)
            }
          }, false)
          planeItems.forEach((planeItem) => item.addChild(planeItem, false))
          return false
        }
      }, false)
    })
  }
}

Registry.register('PMIItem', PMIItem)

export { PMIItem }
