import {
    Color,
    Mat4,
    Xfo
} from '../../Math';
import {
    Cuboid,
    TreeItem,
    GeomItem,
    FlatMaterial
} from '../../SceneTree';
import {
    GLMesh
} from '../GLMesh.js';
import {
    GLDrawItem
} from '../GLDrawItem.js';
import {
    Gizmo
} from '../Gizmos/Gizmo.js';

class VRHead extends Gizmo {
    constructor(gl, stageTreeItem) {
        super(new Color(0, 0, 1));

        this.__treeItem = new TreeItem('VRHead');
        stageTreeItem.addChild(this.__treeItem);

        // // Head faces Z axis....
        // let geom = new Cuboid('VRHead', 0.16, 0.24, 0.2);

        // let mat0 = new FlatMaterial('mat0');
        // mat0.baseColor = new Color(0, 0, 1);
        // let mat1 = new FlatMaterial('mat1');
        // mat1.baseColor = new Color(1, 1, 0);

        // this.__geomItem0 = new GeomItem('VRHead', geom, mat0);
        // this.__geomItem0.selectable = false;
        // this.__geomItem1 = new GeomItem('VRHead', geom, mat1);
        // this.__geomItem1.selectable = false;

        // let xfo = new Xfo();
        // xfo.sc.set(1.2, 0.3, 0.6);
        // xfo.tr.set(0, 0.03, -0.05);
        // this.__geomItem1.setGeomOffsetXfo(xfo);

        // this.__geomItem0.addChild(this.__geomItem1);

        // let geomglGeom = new GLMesh(gl, geom);
        // this.__geomglDrawItem0 = new GLDrawItem(gl, this.__geomItem0, geomglGeom);
        // this.__addDrawItem(this.__geomglDrawItem0);

        // this.__geomglDrawItem1 = new GLDrawItem(gl, this.__geomItem1, geomglGeom);
        // this.__addDrawItem(this.__geomglDrawItem1);
        // this.__geomglDrawItem1.color = new Color(1, 1, 0);

        // this.__setProxyItem(this.__geomglDrawItem0);

        // this.__treeItem.addChild(this.__geomItem0);


        this.setVisible(true);
    }

    setVisible(val){
        // this.__geomItem0.setVisible(val);
        // this.__geomItem1.setVisible(val);
    }

    update(frameData){
        // For fun, draw a blue cube where the players head would have been if
        // we weren't taking the stageParameters into account. It'll start in
        // the center of the floor.
        let localXfo = this.__treeItem.localXfo;
        if(frameData.pose.position)
            localXfo.tr.setDataArray(frameData.pose.position);
        if(frameData.pose.orientation)
            localXfo.ori.setDataArray(frameData.pose.orientation);
        this.__treeItem.localXfo = localXfo;
    }

    getTreeItem(){
        return this.__treeItem;
    }
    getXfo(){
        return this.__treeItem.localXfo;
    }
};

export {
    VRHead
};