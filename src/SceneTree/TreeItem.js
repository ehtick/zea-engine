import {
    Xfo,
    Box3
} from '../Math';
import {
    Signal
} from '../Utilities';
import {
    sgFactory
} from './SGFactory.js';
import {
    ParamFlags,
    ValueSetMode
} from './Parameters';
import {
    ItemFlags,
    BaseItem
} from './BaseItem.js';


// Defines used to explicity specify types for WebGL.
const LOADFLAGS_SKIP_CHILDREN = 1 << 0;
const LOADFLAGS_SKIP_MATERIALS = 1 << 2;
const LOADFLAGS_SKIP_GEOMETRIES = 1 << 3;
const LOADFLAGS_BUILDTREEFROMJSON = 1 << 4;

class TreeItem extends BaseItem {
    constructor(name) {
        super(name)

        this.__inheritedVisiblity = true;
        this.__selectable = true;

        this.__childItems = [];
        

        this.__visibleParam = this.addParameter('Visible', true);
        this.__selectedParam = this.addParameter('Selected', false);
        this.__localXfoParam = this.addParameter('LocalXfo', new Xfo());
        this.__globalXfoParam = this.addParameter('GlobalXfo', new Xfo());
        this.__boundingBoxParam = this.addParameter('BoundingBox', new Box3());

        // Bind handlers (havk to )
        this._cleanGlobalXfo = this._cleanGlobalXfo.bind(this);
        this._setGlobalXfoDirty = this._setGlobalXfoDirty.bind(this);
        this._cleanBoundingBox = this._cleanBoundingBox.bind(this);
        this._setBoundingBoxDirty = this._setBoundingBoxDirty.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);

        this.__localXfoParam.valueChanged.connect(this._setGlobalXfoDirty);

        const _cleanLocalXfo = (prevValue)=>{
            const globalXfo = this.__globalXfoParam.getValue();
            if (this.__ownerItem !== undefined)
                return this.__ownerItem.getGlobalXfo().inverse().multiply(globalXfo);
            else
                return globalXfo;
        }
        this.__globalXfoParam.valueChanged.connect((mode)=>{
            if(mode == ValueSetMode.USER_SETVALUE){
                // Note: both global and local cannot be dirty at the same time
                // because we need one clean to compute the other. If the global
                // Xfo is explicitly set, then it is now clean, so we can make local
                // dirty. 
                this.__localXfoParam.setDirty(_cleanLocalXfo);
            }
            this._setBoundingBoxDirty();
        });


        this.__visibleParam.valueChanged.connect((mode)=>{
            const visibile = this.getVisible();
            for (let childItem of this.__childItems)
                childItem.setInheritedVisiblity(visibile);
        });

        this.visibilityChanged = this.__visibleParam.valueChanged;
        this.selectedChanged = this.__selectedParam.valueChanged;
        this.localXfoChanged = this.__localXfoParam.valueChanged;
        this.globalXfoChanged = this.__globalXfoParam.valueChanged;
        this.boundingChanged = this.__boundingBoxParam.valueChanged;

        this.parentChanged = this.ownerChanged;
        this.childAdded = new Signal();
        this.childRemoved = new Signal();

        this.mouseDown = new Signal();
        this.mouseUp = new Signal();
        this.mouseMove = new Signal();
        
        this.treeItemGlobalXfoChanged = new Signal();
    }

    destroy() {
        this.removeAllChildren();
        super.destroy();
    }

    clone() {
        const cloned = new TreeItem();
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

    setOwner(parentItem) {
        if(this.__ownerItem) {
            this.__ownerItem.globalXfoChanged.disconnect(this._setGlobalXfoDirty);
        }

        super.setOwner(parentItem);

        this._setGlobalXfoDirty();
        if(this.__ownerItem) {
            this.__ownerItem.globalXfoChanged.connect(this._setGlobalXfoDirty);
        }
        this.__localXfoParam.valueChanged.connect(this._setGlobalXfoDirty);
    }

    __updatePath() {
        super.__updatePath();
        for (let childItem of this.__childItems)
            childItem.__updatePath();
    }

    getParentItem() {
        return this.getOwner();
    }

    setParentItem(parentItem) {
        this.setOwner(parentItem);
    }

    get parentItem() {
        throw(("getter is deprectated. Please use 'getParentItem'"));
    }

    set parentItem(parentItem) {
        throw(("setter is deprectated. Please use 'setParentItem'"));
    }


    //////////////////////////////////////////
    // Global Matrix

    get localXfo() {
        throw(("getter is deprectated. Please use 'getLocalXfo'"));
    }
    set localXfo(xfo) {
        throw(("setter is deprectated. Please use 'setLocalXfo'"));
    }
    get globalXfo() {
        throw(("getter is deprectated. Please use 'getGlobalXfo'"));
    }
    set globalXfo(xfo) {
        throw(("setter is deprectated. Please use 'setGlobalXfo'"));
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
    }

    //////////////////////////////////////////
    // Visibility

    getVisible() {
        return this.__inheritedVisiblity && this.__visibleParam.getValue();
    }

    setVisible(val) {
        this.__visibleParam.setValue(val);
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
        return this.__boundingBoxParam.getValue();
    }

    _cleanBoundingBox(bbox) {
        bbox.reset();
        for (let childItem of this.__childItems) {
            if (childItem.getVisible() && !childItem.testFlag(ItemFlags.IGNORE_BBOX))
                bbox.addBox3(childItem.getBoundingBox());
        }
        return bbox;
    }

    _setBoundingBoxDirty() {
        this.__boundingBoxParam.setDirty(this._cleanBoundingBox);
    }

    _childFlagsChanged(flags) {
        if((flags&ParamFlags.USER_EDITED) != 0)
            this.setFlag(ItemFlags.USER_EDITED);
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


        this.__childItems.push(childItem);
        childItem.setOwner(this);

        if(childItem.testFlag(ItemFlags.USER_EDITED))
            this.setFlag(ItemFlags.USER_EDITED)

        childItem.setInheritedVisiblity(this.getVisible());
        childItem.setSelectable(this.getSelectable(), true);

        childItem.boundingChanged.connect(this._setBoundingBoxDirty);
        childItem.visibilityChanged.connect(this._setBoundingBoxDirty);
        childItem.flagsChanged.connect(this._childFlagsChanged.bind(this));

        // Propagate mouse event up ths tree.
        childItem.mouseDown.connect(this.onMouseDown);
        childItem.mouseUp.connect(this.onMouseUp);
        childItem.mouseMove.connect(this.onMouseMove);

        this._setBoundingBoxDirty();
        this.childAdded.emit(childItem);
    }


    getChild(index) {
        return this.__childItems[index];
    }

    getChildByName(name) {
        for (let childItem of this.__childItems){
            if (childItem != null && childItem.getName() == name)
                return childItem;
        }
        return null;
    }

    removeChild(index, destroy = true) {
        let childItem = this.__childItems[index];
        this.__childItems.splice(index, 1);

        childItem.setParentItem(undefined);

        childItem.boundingChanged.disconnect(this._setBoundingBoxDirty);
        childItem.visibilityChanged.disconnect(this._setBoundingBoxDirty);

        // Propagate mouse event up ths tree.
        childItem.mouseDown.disconnect(this.onMouseDown);
        childItem.mouseUp.disconnect(this.onMouseUp);
        childItem.mouseMove.disconnect(this.onMouseMove);

        if (destroy)
            childItem.destroy();
        this._setBoundingBoxDirty();
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
        this._setBoundingBoxDirty();
    }

    indexOfChild(childItem) {
        return this.__childItems.indexOf(childItem);
    }

    //////////////////////////////////////////
    // Path Traversial

    // resolveMember(path) {
    //     if(path.startsWith('item')){
    //         let itemName = path.substring(5);
    //         const pos = itemName.indexOf(':');
    //         let suffix;
    //         if(pos){
    //             itemName = itemName.substring(0, pos);
    //             suffix = itemName.substring(pos+1);
    //         }
    //         const item = this.getItem(itemName); 
    //     }
    //     super.resolveMember(path)
    // }

    resolvePath(path, index=0) {
        if(typeof path == 'string')
            path = path.split('/');

        if(path[index] == '.')
            index++;
        else if(path[index] == '..'){
            return this.__ownerItem.resolvePath(path, index + 1);
        }

        if (index == path.length){
            return this;
        }

        const childName = path[index];
        let childItem = this.getChildByName(childName);
        if (childItem == undefined) {
            // Maybe the name is a parameter name.
            // ask the BaseItem to check.
            const param = super.getParameter(path[index]);
            if(param) {
                return param;
            }

            //report("Unable to resolve path '"+"/".join(path)+"' after:"+this.getName());
            console.warn("Unable to resolve path :" + (path)+" after:"+this.getName() + "\nNo child called :" + path[index+1]);
            return null;
        }
        return childItem.resolvePath(path, index + 1);
    }

    // Traverse the tree structure from this point down
    // and fire the callback for each visited item
    traverse(callback) {
        const __c = (treeItem)=>{
            const children = treeItem.getChildren();
            for (let childItem of children){
                __t(childItem);
            }
        }
        const __t = (treeItem)=>{
            if(callback(treeItem) == false)
                return false;
            __c(treeItem);
        }
        __c(this);
    }
    /////////////////////////
    // Events

    onMouseDown(mousePos, event) {
        this.mouseDown.emit(mousePos, event);
        return false;
    }

    onMouseUp(mousePos, event) {
        this.mouseUp.emit(mousePos, event);
        return false;
    }

    onMouseMove(mousePos, event) {
        this.mouseMove.emit(mousePos, event);
        return false;
    }

    //////////////////////////////////////////
    // Persistence


    toJSON(context) {
        if(!this.testFlag(ItemFlags.USER_EDITED))
            return;

        let j = super.toJSON(context);
        const childItemsJSON = [];
        for (let childItem of this.__childItems){
            const childJSON = childItem.toJSON();
            if(childJSON)
                childItemsJSON.push(childJSON);
        }
        if(childItemsJSON.length > 0) {
            if(j) {
                j.children = childItemsJSON;
            }
            else {
                j = { name: this.__name, children: childItemsJSON }
            }
        }
        return j;
    }

    fromJSON(j, context) {
        super.fromJSON(j, context);

        // if ('bbox' in j){
        //     let box = new Box3();
        //     box.fromJSON(j.bbox);
        //     this.__boundingBoxParam.setValue(box);
        // }

        if (/*(flags & LOADFLAGS_SKIP_CHILDREN) == 0 && */j.children != null) {
            let childrenJson = j.children;
            let printProgress = childrenJson.length > 10000;
            let progress = 0;
            let i = 0;
            for (let childJson of childrenJson) {
                if(!childJson.name){
                    console.warn("Invalid JSON. Name not provided:");
                    continue;
                }
                // Note: During loading of asset trees, we have an
                // existing tree generated by loading a bin data file.
                let childItem = this.getChildByName(childJson.name);
                if (childItem) {
                    childItem.fromJSON(childJson, context);
                } else if (childJson.type) {
                    childItem = sgFactory.constructClass(childType);
                    if (childItem) {
                        childItem.fromJSON(childJson, context);
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

    readBinary(reader, context) {
        super.readBinary(reader, context);

        let itemflags = reader.loadUInt8();

        const visibilityFlag = 1 << 1;
        // this.setVisible(itemflags&visibilityFlag);

        //this.setVisible(j.visibility);
        // Note: to save space, some values are skipped if they are identity values 
        const localXfoFlag = 1 << 2;
        if (itemflags & localXfoFlag) {
            let xfo = new Xfo();
            xfo.tr = reader.loadFloat32Vec3();
            xfo.ori = reader.loadFloat32Quat();
            xfo.sc.set(reader.loadFloat32());
            // console.log(this.getPath() + " TreeItem:" + xfo.toString());
            this.__localXfoParam.setValue(xfo, Visualive.ValueSetMode.DATA_LOAD);
        }

        const bboxFlag = 1 << 3;
        if (itemflags & bboxFlag)
            this.__boundingBoxParam.setValue(new Box3(reader.loadFloat32Vec3(), reader.loadFloat32Vec3()), Visualive.ValueSetMode.DATA_LOAD);

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
                childItem.readBinary(reader, context);
                this.addChild(childItem, false);

                if (printProgress) {
                    // Avoid printing too much as it slows things down.
                    let curr = Math.round((i / numChildren) * 100);
                    if (curr != progress) {
                        progress = curr;
                        // console.log("Loading " + this.__name + ": " + String(progress + "%"));
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