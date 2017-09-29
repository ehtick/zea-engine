import {
    Xfo,
    Box3,
    Signal
} from '../Math';
import {
    sgFactory
} from './SGFactory.js';
import {
    BaseItem
} from './BaseItem.js';


// Defines used to explicity specify types for WebGL.
const LOADFLAGS_SKIP_CHILDREN = 1 << 0;
const LOADFLAGS_SKIP_MATERIALS = 1 << 2;
const LOADFLAGS_SKIP_GEOMETRIES = 1 << 3;
const LOADFLAGS_ASSETTREE_UPDATE = 1 << 4;

class TreeItem extends BaseItem {
    constructor(name) {
        super(name)

        this.__boundingBoxDirty = true;
        this.__inheritedVisiblity = true;
        this.__selectable = true;

        this.__childItems = [];

        this.__visibleParam = this.addParameter('visible', true);
        this.__selectedParam = this.addParameter('selected', false);
        this.__localXfoParam = this.addParameter('localXfo', new Xfo());
        this.__globalXfoParam = this.addParameter('globalXfo', new Xfo());
        this.__boundingBoxParam = this.addParameter('boundingBox', new Box3());

        // let settingLocalXfo = false;
        // this.__localXfoParam.valueChanged.connect(()=>{
        //     if(!settingLocalXfo){
        //         this.updateGlobalXfo();
        //     }
        // });
        // this.__globalXfoParam.valueChanged.connect(()=>{
        //     if(!this.__updatingGlobal){
        //         settingLocalXfo = true;
        //         let globalXfo = this.__globalXfoParam.getValue();
        //         let parentItem = this.getParentItem();
        //         if (parentItem !== undefined)
        //             this.__localXfoParam.setValue(parentItem.getGlobalXfo().inverse().multiply(globalXfo));
        //         else
        //             this.__localXfoParam.setValue(globalXfo);
        //         settingLocalXfo = true;

        //         // TODO: should we be updating here, or waiting till the global mat is needed??
        //         for (let childItem of this.__childItems)
        //             childItem.updateGlobalXfo();
        //     }
        // });


        this.__localXfoParam.valueChanged.connect(this._setGlobalXfoDirty.bind(this));
        this.__globalXfoParam.valueChanged.connect((changeType)=>{
            if(changeType == 0){
                this._setLocalXfoDirty();
                this._setBoundingBoxDirty();
            }
        });
        this._cleanLocalXfo = this._cleanLocalXfo.bind(this);
        this._cleanGlobalXfo = this._cleanGlobalXfo.bind(this);
        this._cleanBoundingBox = this._cleanBoundingBox.bind(this);


        this.visibilityChanged = this.__visibleParam.valueChanged;
        this.selectedChanged = this.__selectedParam.valueChanged;
        this.localXfoChanged = this.__localXfoParam.valueChanged;
        this.globalXfoChanged = this.__globalXfoParam.valueChanged;

        this.parentChanged = this.ownerChanged;
        this.childAdded = new Signal();
        this.childRemoved = new Signal();
        this.boundingBoxDirtied = new Signal();

        this.treeItemGlobalXfoChanged = new Signal();
    }

    destroy() {
        this.removeAllChildren();
        super.destroy();
    }

    clone() {
        let cloned = new TreeItem();
        this.copyTo(cloned);
        return cloned;
    }

    copyTo(cloned) {
        super.copyTo(cloned);
        // cloned.__visible = this.__visible;
        cloned.__selectable = this.__selectable;
        for (let childItem of this.__childItems)
            cloned.addChild(childItem.clone());
    }


    //////////////////////////////////////////
    // Parent Item

    setOwnerItem(parentItem) {
        if(this.__ownerItem) {
            this.__ownerItem.globalXfoChanged.disconnect(this._setGlobalXfoDirty.bind(this));
        }

        // this.__private.set(parentItem, parentItem);
        super.setOwnerItem(parentItem);
        // this.updateGlobalXfo();

        this._setGlobalXfoDirty();
        if(this.__ownerItem) {
            this.__ownerItem.globalXfoChanged.connect(this._setGlobalXfoDirty.bind(this));
        }
        this.__localXfoParam.valueChanged.connect(this._setGlobalXfoDirty.bind(this));
    }

    __updatePath() {
        super.__updatePath();
        for (let childItem of this.__childItems)
            childItem.__updatePath();
    }

    getParentItem() {
        return this.getOwnerItem();
    }

    setParentItem(parentItem) {
        this.setOwnerItem(parentItem);
    }

    get parentItem() {
        console.warn(("getter is deprectated. Please use 'getParentItem'"));
        // return this.__private.get('parentItem');
        return this.getParentItem();
    }

    set parentItem(parentItem) {
        console.warn(("setter is deprectated. Please use 'setParentItem'"));
        this.setParentItem(parentItem);
    }

    //////////////////////////////////////////
    // Path Traversial

    resolvePath(path, index=0) {
        if(typeof path == 'string')
            path = path.split('/');
        if (path.length == 0) {
            throw("Invalid path:" + path);
        }
        if (path.length-1 == index){
            let parts = path[index].split(':');
            if (parts[0] == this.__name) {
                return this;
            }
            return super.resolvePath(path, index);
        }

        let childItem = this.getChildByName(path[index+1]);
        if (childItem == undefined) {
            //report("Unable to resolve path '"+"/".join(path)+"' after:"+this.getName());
            console.warn("No child called :" + path[index+1]);
            return null;
        }
        if (path.length == index + 1)
            return childItem;
        else
            return childItem.resolvePath(path, index + 1);
    }

    //////////////////////////////////////////
    // Global Matrix

    get localXfo() {
        console.warn(("getter is deprectated. Please use 'getLocalXfo'"));
        return this.getLocalXfo();
    }
    set localXfo(xfo) {
        console.warn(("setter is deprectated. Please use 'setLocalXfo'"));
        this.setLocalXfo(xfo);
    }
    get globalXfo() {
        console.warn(("getter is deprectated. Please use 'getGlobalXfo'"));
        return this.getGlobalXfo();
    }
    set globalXfo(xfo) {
        console.warn(("setter is deprectated. Please use 'setGlobalXfo'"));
        this.setGlobalXfo(xfo);
    }
    getLocalXfo() {
        return this.__localXfoParam.getValue();
    }
    setLocalXfo(xfo) {
        this.__localXfoParam.setValue(xfo);
    }
    getGlobalXfo() {
        return this.__globalXfoParam.getValue();;
    }
    setGlobalXfo(xfo) {
        this.__globalXfoParam.setValue(xfo);
        this._setLocalXfoDirty();
    }

    // updateGlobalXfo() {
    //     this.__updatingGlobal = true;
    //     let parentItem = this.getParentItem();
    //     if (parentItem !== undefined)
    //         this.__globalXfoParam.setValue(parentItem.getGlobalXfo().multiply(this.__localXfoParam.getValue()));
    //     else
    //         this.__globalXfoParam.setValue(this.__localXfoParam.getValue());

    //     this.setBoundingBoxDirty();

    //     for (let childItem of this.__childItems)
    //         childItem.updateGlobalXfo();
    //     this.__updatingGlobal = false;
    // }


    _cleanLocalXfo(prevValue) {
        let globalXfo = this.__globalXfoParam.getValue();
        let parentItem = this.getParentItem();
        if (parentItem !== undefined)
            return parentItem.getGlobalXfo().inverse().multiply(globalXfo);
        else
            return globalXfo;
    }

    _setLocalXfoDirty() {
        this.__localXfoParam.setDirty(this._cleanLocalXfo);
    }

    _cleanGlobalXfo(prevValue) {
        let parentItem = this.getParentItem();
        if (parentItem !== undefined)
            return parentItem.getGlobalXfo().multiply(this.__localXfoParam.getValue());
        else
            return this.__localXfoParam.getValue();
    }

    _setGlobalXfoDirty() {
        this.__globalXfoParam.setDirty(this._cleanGlobalXfo);
        this._setBoundingBoxDirty();
    }

    //////////////////////////////////////////
    // Visibility

    getVisible() {
        return this.__inheritedVisiblity && this.__visibleParam.getValue();
    }

    setVisible(val) {
        if (this.__visibleParam.getValue() != val) {
            let prev = this.getVisible();
            this.__visibleParam.setValue(val);
            let visibile = this.getVisible();
            if (prev != visibile) {
                for (let childItem of this.__childItems)
                    childItem.setInheritedVisiblity(visibile);
                this.visibilityChanged.emit(visibile);
            }
        }
    }

    setInheritedVisiblity(val) {
        if (this.__inheritedVisiblity != val) {
            let prev = this.getVisible();
            this.__inheritedVisiblity = val;
            let visibile = this.getVisible();
            if (prev != visibile) {
                for (let childItem of this.__childItems)
                    childItem.setInheritedVisiblity(visibile);
                this.visibilityChanged.emit(visibile);
            }
        }
    }

    //////////////////////////////////////////
    // Selectability and Selection

    getSelectable() {
        return this.__selectable;
    }

    setSelectable(val, propagateToChildren = true) {
        if (this.__selectable != val || propagateToChildren) {
            this.__selectable = val;
            for (let childItem of this.__childItems)
                childItem.setSelectable(this.__selectable, propagateToChildren);
        }
    }

    getSelected() {
        return this.__selectedParam.getValue();
    }

    setSelected(sel) {
        if (this.__selectedParam.getValue() != sel) {
            this.__selectedParam.setValue(sel);
        }
    }

    //////////////////////////////////////////
    // BoundingBox

    get boundingBox() {
        console.warn(("getter is deprectated. Please use 'getBoundingBox'"));
        return this.getBoundingBox();
    }

    getBoundingBox() {
        // if (this.__boundingBoxDirty)
        //     this.updateBoundingBox();
        return this.__boundingBoxParam.getValue();
    }

    _setBoundingBoxDirty() {
        this.__boundingBoxParam.setDirty(this._cleanBoundingBox);
        this.boundingBoxDirtied.emit();
    }

    _cleanBoundingBox(bbox) {
        bbox.reset();
        for (let childItem of this.__childItems) {
            if (childItem.getVisible())
                bbox.addBox3(childItem.getBoundingBox());
        }
        return bbox;
    }

    //////////////////////////////////////////
    // Children

    getChildren() {
        return this.__childItems;
    }

    numChildren() {
        return this.__childItems.length;
    }

    addChild(childItem, checkCollisions = true) {
        if (checkCollisions && this.getChildByName(childItem.getName()) !== null)
            throw ("Item '" + childItem.getName() + "' is already a child of :" + this.path);
        if (!(childItem instanceof TreeItem))
            throw ("Object is is not a tree item :" + childItem.constructor.name);
        childItem.setInheritedVisiblity(this.getVisible());
        childItem.setSelectable(this.getSelectable(), true);
        this.__childItems.push(childItem);
        childItem.setParentItem(this);

        childItem.boundingBoxDirtied.connect(() => {
            this._setBoundingBoxDirty();
        });
        childItem.visibilityChanged.connect(() => {
            this._setBoundingBoxDirty();
        });

        this.__boundingBoxDirty = true;
        this.childAdded.emit(childItem);
    }


    getChild(index) {
        return this.__childItems[index];
    }

    getChildByName(name) {
        for (let childItem of this.__childItems)
            if (childItem != null && childItem.getName() == name)
                return childItem;
        return null;
    }

    removeChild(index, destroy = true) {
        let childItem = this.__childItems[index];
        this.__childItems.splice(index, 1);
        if (destroy)
            childItem.destroy();
        this.__boundingBoxDirty = true;
    }

    removeChildByHandle(childItem, destroy = true) {
        let index = this.__childItems.indexOf(childItem);
        if (index == -1)
            throw ("Error in removeChildByHandle. Child not found:" + childItem.getName());
        return this.removeChild(index, destroy);
    }

    removeAllChildren(destroy = true) {
        if (destroy)
            for (let childItem of this.__childItems)
                childItem.destroy();
        this.__childItems = [];
        this.__boundingBoxDirty = true;
    }

    indexOfChild(childItem) {
        return this.__childItems.indexOf(childItem);
    }

    //////////////////////////////////////////
    // Persistence


    toJSON(flags = 0) {
        let j = super.toJSON(flags);
        let childItemsJSON = [];
        for (let childItem of this.__childItems)
            childItemsJSON.push(childItem.toJSON());
        j.childItems = childItemsJSON;
        return j;
    }

    fromJSON(j, flags, asset) {
        super.fromJSON(j, flags);

        // if ('bbox' in j){
        //     let box = new Box3();
        //     box.fromJSON(j.bbox);
        //     this.__boundingBoxParam.setValue(box);
        // }

        if ((flags & LOADFLAGS_SKIP_CHILDREN) == 0 && 'children' in j && j.children != null) {
            let childrenJson = j.children;
            let printProgress = childrenJson.length > 10000;
            let progress = 0;
            let i = 0;
            for (let childJson of childrenJson) {
                let childType = childJson.type;
                let childName = childJson.name;

                // Note: During loading of asset trees, we have an
                // existing tree generated by loading the asset before
                // the tree. Now we find existing items and load deltas.
                // Note2: This becomes a bit slow on huge trees.
                let childItem;
                if (flags & LOADFLAGS_ASSETTREE_UPDATE) {
                    childItem = this.getChildByName(childName);
                    if (childItem) {
                        childItem.fromJSON(childJson, flags, asset);
                    }
                } else {
                    childItem = sgFactory.constructClass(childType);
                    if (childItem) {
                        childItem.fromJSON(childJson, flags, asset);
                        this.addChild(childItem, false);
                    }
                }

                if (printProgress) {
                    // Avoid printing too much as it slows things down.
                    i++;
                    let curr = Math.round((i / childrenJson.length) * 100);
                    if (curr != progress) {
                        progress = curr;
                        console.log("Loading " + this.__name + ": " + String(progress + "%"));
                    }
                }
            }
        }
    }

    readBinary(reader, flags, asset) {
        super.readBinary(reader, flags);

        let itemflags = reader.loadUInt8();

        const visibilityFlag = 1 << 1;
        // this.setVisibility(itemflags&visibilityFlag);

        //this.setVisibility(j.visibility);
        // Note: to save space, some values are skipped if they are identity values 
        const localXfoFlag = 1 << 2;
        if (itemflags & localXfoFlag) {
            let xfo = new Xfo();
            xfo.tr = reader.loadFloat32Vec3();
            xfo.ori = reader.loadFloat32Quat();
            xfo.sc.set(reader.loadFloat32());
            this.setLocalXfo(xfo);
        }

        const bboxFlag = 1 << 3;
        if (itemflags & bboxFlag)
            this.__boundingBoxParam.setValue(new Box3(reader.loadFloat32Vec3(), reader.loadFloat32Vec3()));

        let numChildren = reader.loadUInt32();
        if ( /*(flags&LOADFLAGS_SKIP_CHILDREN) == 0 &&*/ numChildren > 0) {

            let toc = reader.loadUInt32Array(numChildren);

            let printProgress = numChildren > 10000;
            let progress = 0;
            for (let i = 0; i < numChildren; i++) {
                reader.seek(toc[i]); // Reset the pointer to the start of the item data.
                let childType = reader.loadStr();
                // let childName = reader.loadStr();
                let childItem = sgFactory.constructClass(childType);
                if (!childItem)
                    continue;
                reader.seek(toc[i]); // Reset the pointer to the start of the item data.
                childItem.readBinary(reader, flags, asset);
                this.addChild(childItem, false);

                if (printProgress) {
                    // Avoid printing too much as it slows things down.
                    let curr = Math.round((i / numChildren) * 100);
                    if (curr != progress) {
                        progress = curr;
                        console.log("Loading " + this.__name + ": " + String(progress + "%"));
                    }
                }
            }
        }
    }
};

sgFactory.registerClass('TreeItem', TreeItem);

export {
    LOADFLAGS_SKIP_CHILDREN,
    LOADFLAGS_SKIP_MATERIALS,
    LOADFLAGS_SKIP_GEOMETRIES
};
export {
    TreeItem
};