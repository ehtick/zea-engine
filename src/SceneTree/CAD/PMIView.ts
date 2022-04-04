import { CADAsset } from './CADAsset'
import { TreeItem } from '../TreeItem'
import { Camera } from '../Camera'
import { BinReader } from '../BinReader'
import { AssetLoadContext } from '../AssetLoadContext'
import { Registry } from '../../Registry'
import { CloneContext } from '../CloneContext'
import { PMIItem } from './PMIItem'
import { GeomItem } from '../GeomItem'

/**
 * Represents a view of PMI data. within a CAD assembly.
 *
 * @extends PMIItem
 */
class PMIView extends PMIItem {
  camera: Camera
  /**
   * Creates an instance of PMIView setting up the initial configuration for Material and Color parameters.
   *
   * @param {string} name - The name value.
   */
  constructor(name?: string) {
    super(name)
    this.camera = null
  }

  /**
   * The clone method constructs a new PMIView, copies its values
   * from this item and returns it.
   *
   * @param context - The clone context.
   * @return - The return value.
   */
  clone(context?: CloneContext): PMIView {
    const cloned = new PMIView()
    cloned.copyFrom(this, context)
    return cloned
  }

  /**
   * Activates the PMIView, adjusting visibility of the PMI items and the camera Xfo
   */
  activate(): void {
    super.activate()

    let graphicalItems: string[] = []
    if (this.hasParameter('GraphicalElements')) {
      graphicalItems = this.getParameter('GraphicalElements').getValue()
    }
    const findAssetItem = (): CADAsset | null => {
      let item: TreeItem = this
      while (item && !(item instanceof CADAsset)) item = item.getParentItem()
      if (item instanceof CADAsset) return item
      return null
    }
    const assetItem = findAssetItem()
    const pmiContainer = this.getParentItem().getParentItem()
    const pmiOwner = pmiContainer.getParentItem()
    if (pmiOwner) {
      const pmiItems: TreeItem[] = []
      pmiContainer.traverse((item: TreeItem) => {
        if (item instanceof PMIView) return
        if (item instanceof PMIItem) pmiItems.push(item)
      })
      pmiItems.forEach((pmiItem) => {
        const visible = graphicalItems.includes(pmiItem.getName())
        pmiItem.setVisible(visible)
      })
    }

    if (this.camera) {
      const cameraXfo = this.localXfoParam.value.clone()
      const TargetPoint = this.getParameter('TargetPoint').getValue().clone()
      const CameraType = this.getParameter('CameraType').getValue()

      cameraXfo.tr.scaleInPlace(assetItem.unitsScale)
      TargetPoint.scaleInPlace(assetItem.unitsScale)

      const dist = cameraXfo.tr.distanceTo(TargetPoint)
      cameraXfo.sc.set(1.0, 1.0, 1.0)

      this.camera.globalXfoParam.value = cameraXfo
      this.camera.setFocalDistance(dist)

      if (CameraType == 'Camera_Orthographic') {
        this.camera.setIsOrthographic(1, 0)
        // When switching from perspective to ortho here is how the zoom is computed:
        // _zoom = 1.f;
        // float coef = _targetDistance * CATTan(CATDegreeToRadian * _viewAngle);
        // if (coef > 0.f) _zoom = 1./ coef;
        if (this.hasParameter('CameraZoom') && assetItem) {
          const CameraZoom = this.getParameter('CameraZoom').getValue()
          const FrustHeight = (1 / CameraZoom) * assetItem.unitsScale * 2
          this.camera.setFrustumHeight(FrustHeight)
        }
      }
    }

    if (this.hasParameter('ClippingPlaneOrigin')) {
      const clippingPlaneOrigin = this.getParameter('ClippingPlaneOrigin').getValue()
      const clippingPlaneNormal = this.getParameter('ClippingPlaneNormal').getValue()
      const cutEnabled = true
      const cutAwayDist = -clippingPlaneOrigin.dot(clippingPlaneNormal) * assetItem.unitsScale
      pmiOwner.traverse((item: TreeItem) => {
        if (item instanceof PMIItem) return false
        if (item instanceof GeomItem) {
          item.setCutawayEnabled(cutEnabled)
          item.setCutVector(clippingPlaneNormal)
          item.setCutDist(cutAwayDist)
        }
      })
    } else {
      pmiOwner.traverse((item: TreeItem) => {
        if (item instanceof PMIItem) return false
        if (item instanceof GeomItem) {
          item.setCutawayEnabled(false)
        }
      })
    }
  }

  /**
   * Deactivates the PMIItem
   */
  deactivate(): void {
    super.deactivate()

    // if (this.hasParameter('GraphicalElements')) {
    //   const pmiContainer = (this.getOwner() as TreeItem).getOwner() as TreeItem
    //   const pmiOwner = pmiContainer.getOwner()
    //   if (pmiOwner) {
    //     const pmiItems: TreeItem[] = []
    //     pmiContainer.traverse((item: TreeItem) => {
    //       if (item instanceof PMIView) return
    //       if (item instanceof PMIItem) pmiItems.push(item)
    //     })
    //     pmiItems.forEach((pmiItem) => {
    //       pmiItem.setVisible(true)
    //     })
    //   }
    // }

    // // Note: leave the camera as is
    // if (this.camera) {
    //   this.camera.setIsOrthographic(0)
    // }
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

    if (context.camera) {
      this.camera = context.camera
    }
  }
}

Registry.register('PMIView', PMIView)

export { PMIView }
