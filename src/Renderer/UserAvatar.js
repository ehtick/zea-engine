import {
    EulerAngles,
    Quat,
    Xfo,
    Color,
    Signal
} from '../Math';
import {
    Cuboid,
    Sphere,
    TreeItem,
    GeomItem,
    FlatMaterial,
    MarkerpenTool
} from '../SceneTree';

class UserAvatar {

    constructor(id, data, parentTreeItem) {
        this.__id = id;
        this.__parentTreeItem = parentTreeItem;
        this.__avatarScale = 500.0;

        this.__treeItem = new TreeItem(id);
        this.__material = new FlatMaterial('user'+id+'Material');
        this.__material.baseColor = new Color(data.color.r, data.color.g, data.color.b);

        this.setMouseAndCameraRepresentation();
        this.__parentTreeItem.addChild(this.__treeItem);

        this.__controllers = [];

        this.userMarker = new MarkerpenTool('client' + id);
        this.__parentTreeItem.addChild(this.userMarker.getTreeItem());
    }

    setVisibility(visible){
        this.__treeItem.setVisible(visible);
    }

    pointerMoved(data){
        // TODO: show a pointer beam.
    }

    setMouseAndCameraRepresentation() {
        this.__treeItem.removeAllChildren();
        this.__treeItem.localXfo = new Xfo();
        let shape = new Cuboid('Camera', 0.1*this.__avatarScale, 0.1*this.__avatarScale, 0.2*this.__avatarScale);
        let geomItem = new GeomItem(this.__id, shape, this.__material);
        this.__treeItem.addChild(geomItem);
        this.__currentViewMode = 'MouseAndKeyboard';
        this.__controllers = [];
    }

    setTabletAndFingerRepresentation() {
        this.__treeItem.removeAllChildren();
        this.__treeItem.localXfo = new Xfo();
        let shape = new Cuboid('Camera', 0.1, 0.1, 0.2);
        let geomItem = new GeomItem(this.__id, shape, this.__material);
        this.__treeItem.addChild(geomItem);
        this.__currentViewMode = 'TabletAndFinger';
        this.__controllers = [];
    }

    setViveRepresentation(data) {
        this.__treeItem.removeAllChildren();
        this.__treeItem.localXfo = new Xfo();
        let shape = new Cuboid('Camera', 0.16, 0.24, 0.2);
        let geomItem = new GeomItem(this.__id, shape, this.__material);
        this.__treeItem.addChild(geomItem);

        this.__handle = new Cuboid('VRControllerHandle', 0.04, 0.025, 0.16);
        this.__sphere = new Sphere('VRControllerTip', 0.015);

        this.__currentViewMode = 'Vive';
    }

    updateViveControllers(data) {
        for (let i = 0; i < data.controllers.length; i++) {
            if (i >= this.__controllers.length) {
                let handleItem = new GeomItem('Handle' + i, this.__handle, this.__material);
                handleItem.localXfo.tr.set(0.0, -0.01, 0.053);
                handleItem.selectable = false;
                let tipItem = new GeomItem('Tip', this.__sphere, this.__material);
                tipItem.localXfo.tr.set(0.0, 0.0, -0.02);
                tipItem.selectable = false;
                handleItem.addChild(tipItem);
                this.__treeItem.addChild(handleItem);
                this.__controllers.push(handleItem);
            }
            const controllerXfo = new Xfo();
            controllerXfo.fromJSON(data.controllers[i].xfo);
            this.__controllers[i].localXfo = controllerXfo;
        }
        // Remove any controllers that have turned off
        for (let i = data.controllers.length; i < this.__controllers.length; i++) {
            this.__treeItem.removeChildByHandle(this.__controllers[i]);
        }
        this.__controllers.length = data.controllers.length;
    }

    onViewChange(data) {
        switch (data.interfaceType) {
            case 'MouseAndKeyboard':
                {
                    if (this.__currentViewMode !== 'MouseAndKeyboard') {
                        this.setMouseAndCameraRepresentation(data);
                    }
                    const viewXfo = new Xfo();
                    viewXfo.fromJSON(data.viewXfo);
                    this.__treeItem.getChild(0).localXfo = viewXfo;
                }
                break;
            case 'TabletAndFinger':
                if (this.__currentViewMode !== 'MouseAndKeyboard') {

                }

                break;
            case 'Vive':
                {
                    if (this.__currentViewMode !== 'Vive') {
                        this.setViveRepresentation(data);
                    }

                    const viewXfo = new Xfo();
                    viewXfo.fromJSON(data.viewXfo);
                    this.__treeItem.getChild(0).localXfo = viewXfo;

                    this.updateViveControllers(data);
                }

                break;
            case 'Daydream':

                break;
            case 'Occulus':

                break;
        }

        //this.__treeItem.requestRedraw();
    };

    destroy() {
        this.__parentTreeItem.removeChildByHandle(this.__treeItem);
        // Notr: the marker pen tool stays, as we don't want lines
        // dissappearing after a user quits.
    }
};

export {
    UserAvatar
};