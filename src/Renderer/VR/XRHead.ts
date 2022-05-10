import { Vec3, Quat, Xfo, Mat4 } from '../../Math/index'
import { TreeItem } from '../../SceneTree/index'

/** Class representing a VR head.
 * @private
 */
class XRHead {
  private xrvp: any
  protected treeItem: TreeItem
  private mat4: Mat4
  private localXfo: Xfo
  private hmdGeomItem: any
  /**
   * Create a VR head.
   * @param xrvp - The VR viewport.
   * @param stageTreeItem - The stageTreeItem value.
   */
  constructor(xrvp: any, stageTreeItem: any) {
    this.xrvp = xrvp
    this.treeItem = new TreeItem('XRHead')
    stageTreeItem.addChild(this.treeItem)

    this.mat4 = new Mat4()
    this.localXfo = new Xfo()
  }

  /**
   * The Set wether the HMB is visible in rendering or not. Used in spectator rendering.
   * @param state - The visibility value.
   */
  setVisible(state: boolean): void {
    if (state && !this.hmdGeomItem) {
      const assetItem = this.xrvp.getAsset()
      if (!assetItem) return
      const hmdGeomItem = assetItem.getChildByName('HMD')
      if (!hmdGeomItem) return
      this.hmdGeomItem = hmdGeomItem.clone({ assetItem })
      if (this.hmdGeomItem) {
        this.hmdGeomItem.localXfoParam.value = new Xfo(
          new Vec3(0, -0.035, -0.03),
          new Quat(0, 1, 0, Math.PI), // used to be: new Quat({ setFromAxisAndAngle: [new Vec3(0, 1, 0), Math.PI] }),
          new Vec3(0.001, 0.001, 0.001) // VRAsset units are in mm.
        )

        this.treeItem.addChild(this.hmdGeomItem, false)
      }
    }
    if (this.hmdGeomItem) {
      this.hmdGeomItem.visibleParam.value = state
    }
  }

  /**
   * The update method.
   * @param pose - The pose value.
   */
  update(pose: any): void {
    // Old
    // this.mat4.setDataArray(pose.poseModelMatrix);

    // New
    this.mat4.setDataArray(pose.transform.matrix)

    this.localXfo.setFromMat4(this.mat4)

    // const pos = pose.transform.position;
    // this.localXfo.tr.set(pos.x, pos.y,pos.z);
    // const ori = pose.transform.orientation;
    // this.localXfo.ori.set(ori.x, ori.y, ori.z, ori.x);

    this.treeItem.localXfoParam.value = this.localXfo
  }

  /**
   * The getTreeItem method.
   * @return - The return value.
   */
  getTreeItem(): TreeItem {
    return this.treeItem
  }

  /**
   * The getXfo method.
   * @return - The return value.
   */
  getXfo(): Xfo {
    return this.localXfo
  }
}

export { XRHead }
