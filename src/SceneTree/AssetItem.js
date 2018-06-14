
import {
    Signal
} from '../Utilities';
import {
    FilePathParameter
} from './Parameters';
import {
    TreeItem
} from './TreeItem.js';
import {
    loadTextfile
} from './Utils.js';


class AssetItem extends TreeItem {
    constructor(name) {
        super(name);
        this.__name = name;
        this.__components = [];
        this.__componentMapping = {};

        const fileParam = this.addParameter(new FilePathParameter('FilePath'));
        fileParam.valueChanged.connect(()=>{
            const filePath = fileParam.getValue()
            const url = fileParam.getURL();
            this.loaded.untoggle();
            loadTextfile(url,
                (data) => {
                    const j = JSON.parse(data);
                    this.fromJSON(j);
                }
            );
        });

        this.componentAdded = new Signal();
        this.componentRemoved = new Signal();

        this.loaded = new Signal(true);
    }

    //////////////////////////////////////////
    // Components

    addComponent(component) {
        this.__components.push(component);
        this.__componentMapping[component.getName()] = this.__components.length - 1;

        component.setOwner(this);

        this.componentAdded.emit(component);
    }

    removeComponent(name) {
        const index = this.__componentMapping[name]
        const component = this.__components[index];
        component.setOwner(undefined);
        this.__components.splice(index, 1);

        const componentMapping = {};
        for (let i =0; i< this.__components.length; i++)
            componentMapping[this.__components[i].getName()] = i;
        this.__componentMapping = componentMapping;

        this.componentAdded.emit(component);
        return component;
    }

    getComponent(name) {
        return this.__components[this.__componentMapping[name]];
    }
    //////////////////////////////////////////
    // Persistence

    toJSON(context) {
        if(!context) 
            context = {};
        context.assetItem = this;
        const j = super.toJSON(context);

        const jcs = [];
        for(let c of this.__components)
            jcs.push(c.toJSON(context));
        if(jcs.length > 0)
            j.components = jcs;

        return j;
    }

    fromJSON(j, flags = 0) {
        if(!context) 
            context = {};
        context.assetItem = this;
        super.fromJSON(j, context);

        if(j.components) {
            for(let cj of j.components) {
            }
        }
    }

};

export {
    AssetItem
};
