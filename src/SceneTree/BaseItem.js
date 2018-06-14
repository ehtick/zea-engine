import {
    Vec2,
    Vec3,
    Color
} from '../Math';
import {
    Signal
} from '../Utilities';
import {
    sgFactory
} from './SGFactory.js';

import {
    ValueSetMode
} from './Parameters/Parameter.js';
import {
    ParameterOwner
} from './ParameterOwner.js';


const ItemFlags = {
    USER_EDITED: 1<<1
};

class BaseItem extends ParameterOwner {
    constructor(name) {
        super();
        if (this.constructor.name == 'BaseItem') {
            throw ("BaseItem should not be instantiated directly.");
        }
        if (name == undefined)
            name = this.constructor.name;
        this.__name = name;
        this.__path = [name];
        this.__ownerItem = undefined; // TODO: will create a circular ref. Figure out and use weak refs
        this.__flags = 0;

        this.__metaData = new Map();

        this.nameChanged = new Signal();
        this.ownerChanged = new Signal();
        this.flagsChanged = new Signal();

        this.parameterValueChanged.connect((name, mode) => {
            if(mode==ValueSetMode.USER_SETVALUE){
                this.setFlag(ItemFlags.USER_EDITED);
            }
        });
    }

    destroy() {
        super.destroy();
    }

    clone() {
        throw (this.constructor.name + " does not implment its clone method");
    }

    copyTo(cloned) {
        super.copyTo(cloned)
        cloned.setName(this.__name);
    }

    //////////////////////////////////////////
    // Name and Path

    getName() {
        return this.__name;
    }

    setName(name) {
        this.__name = name;
        this.__updatePath();
        this.nameChanged.emit(name);
    }

    __updatePath() {
        if (this.__ownerItem == undefined)
            this.__path = [this.__name];
        else {
            this.__path = this.__ownerItem.getPath().slice();
            this.__path.push(this.__name);
        }
    }

    getPath() {
        return this.__path;
    }

    //////////////////////////////////////////
    // Flags

    setFlag(flag) {
        this.__flags |= flag;
        this.flagsChanged.emit(this.__flags);
    }

    testFlag(flag) {
        return (this.__flags & flag) != 0;
    }


    //////////////////////////////////////////
    // Path Traversial

    resolvePath(path) {
        if(path.startswith('parameter')){
            return this.getParameter(path.substring(10)); 
        }
        throw ("Invalid path:" + path + " member not found");
    }


    //////////////////////////////////////////
    // Owner Item

    getOwner() {
        // return this.__private.get('ownerItem');
        return this.__ownerItem;
    }

    setOwner(ownerItem) {
        // this.__private.set(ownerItem, ownerItem);
        this.__ownerItem = ownerItem;
        this.__updatePath();

        // Notify:
        this.ownerChanged.emit();
    }

    //////////////////////////////////////////
    // Metadata

    getMetadata(key) {
        return this.__metaData.get(key)
    }

    hasMetadata(key) {
        return this.__metaData.has(key)
    }

    setMetadata(key, metaData) {
        this.__metaData.set(key, metaData);
    }


    //////////////////////////////////////////
    // Persistence


    toJSON(context) {
        const j = super.toJSON(context);
        if(j) {
            j.name = this.__name;
        }
        return j;
    }

    fromJSON(j, flags, asset) {
        super.fromJSON(j, context);
        if(j.name)
            this.__name = j.name;
        // Note: JSON data is only used to store user edits, so 
        // parameters loaded from JSON are considered user edited.
        this.__flags |= ItemFlags.USER_EDITED;
    }

    readBinary(reader, flags, asset) {
        let type = reader.loadStr();
        this.setName(reader.loadStr());

        // Note: parameters follow name...
        super.readBinary(reader, flags);
    }

    toString() {
        return JSON.stringify(this.toJSON(), null, 2)
    }
};

export {
    ItemFlags,
    BaseItem
};