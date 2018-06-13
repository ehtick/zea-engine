import {
    Signal
} from '../../Utilities';
import {
    ValueSetMode,
    Parameter
} from './Parameter.js';

class GeometryParameter extends Parameter {
    constructor(name, value) {
        super(name, value, 'Color');
        this.boundingBoxDirtied = new Signal();
    }
    
    clone() {
        let clonedParam = new GeometryParameter(this.__name, this.__value);
        this.cloneMembers();
        return clonedParam;
    }


    setValue(geom, mode = ValueSetMode.USER_SETVALUE) { // 0 == normal set. 1 = changed via cleaner fn, 2=change by loading/cloning code.
        if(this.__value !== geom){
            if(this.__value){
                this.__value.boundingBoxDirtied.disconnect(this.boundingBoxDirtied.emit);
                this.__value.removeRef(this);
            }
            this.__value = geom;
            if(this.__value){
                this.__value.addRef(this);
                this.__value.boundingBoxDirtied.connect(this.boundingBoxDirtied.emit);
            }
            this.valueChanged.emit(mode);
        }
    }

    //////////////////////////////////////////
    // Persistence

    toJSON(flags = 0) {
        if((this.__flags&ParamFlags.USER_EDITED) == 0)
            return;
        return;
    }

    fromJSON(j) {
        // if(j.value == undefined){
        //     console.warn("Invalid Parameter JSON");
        //     return;
        // }
        // const materialPath = j.valuel
        // this.__value = materialLibraryManager.resolveMaterialFromPath(materialPath);
        // this.__flags |= ParamFlags.USER_EDITED;
    }
};


export {
    GeometryParameter
};