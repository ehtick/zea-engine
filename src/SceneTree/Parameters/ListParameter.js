import {
    Signal
} from '../../Utilities';
import {
    ValueSetMode,
    ParamFlags,
    Parameter
} from './Parameter.js';


class ListParameter extends Parameter {
    constructor(name, dataType) {
        super(name, []);
        this.__dataType = dataType;
        this.elementAdded = new Signal();
        this.elementRemoved = new Signal();
    }

    getCount(){
        return this.__value.length;
    }

    addElement(elem) {
        if(!elem)
            elem = new this.__dataType()
        this.__value.push(elem)
        // this.setValue(this.__value);
        this.__flags |= ParamFlags.USER_EDITED;
        this.elementAdded.emit(elem, this.__value.length-1);
        // this.valueChanged.emit(ValueSetMode.USER_SETVALUE);
        return elem;
    }

    removeElement(index) {
        const elem = this.__value[index];
        this.__value.splice(index, 1)
        // this.setValue(this.__value)
        this.__flags |= ParamFlags.USER_EDITED;
        this.elementRemoved.emit(elem, index);
        // this.valueChanged.emit(ValueSetMode.USER_SETVALUE);
    }

    insertElement(index, elem) {
        this.__value.splice(index, 0, elem);
        // this.setValue(this.__value);
        this.__flags |= ParamFlags.USER_EDITED;
        this.elementAdded.emit(elem, index);
        // this.valueChanged.emit(ValueSetMode.USER_SETVALUE);
    }

    clone() {
        let clonedValue = this.__value.slice(0);
        const clonedParam = new ListParameter(this.__name, clonedValue, this.__dataType);
        this.cloneMembers(clonedParam);
        return clonedParam;
    }



    //////////////////////////////////////////
    // Persistence

    toJSON(context) {
        if((this.__flags&ParamFlags.USER_EDITED) == 0)
            return;
        const items = [];
        for(let p of this.__value) 
            items.push(p.toJSON(context));
        return {
            items
        };
    }

    fromJSON(j, context) {
        if(j.items == undefined){
            console.warn("Invalid Parameter JSON");
            return;
        }
        // Note: JSON data is only used to store user edits, so 
        // parameters loaed from JSON are considered user edited.
        this.__flags |= ParamFlags.USER_EDITED;

        for(let i=0; i<j.items.length; i++) {
            const elem = new this.__dataType()
            elem.fromJSON(j.items[i], context);
            this.__value.push(elem)
            this.elementAdded.emit(elem, this.__value.length-1);
        }
        this.valueChanged.emit(ValueSetMode.DATA_LOAD);
    }


    destroy(){
        for(let i=0; i<this.__value.length; i++) {
            if(this.__value[i] instanceof Parameter)
                this.__value[i].destroy();
            this.removeElement(i);
        }
    }
};


export {
    ListParameter
};