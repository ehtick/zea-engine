import { Signal } from '../Math/Signal';
import { Image2D } from './Image2D.js';

import {
    loadBinfile
} from './Utils.js';

class HDRImage2D extends Image2D {
    constructor(name, resourceName, resourceLoader, isStream) {
        super({
            format: 'FLOAT',
            channels: 'RGB'
        });

        this.__name = name;
        this.__resourceLoader = resourceLoader;
        this.__stream = isStream;
        this.__loaded = false;
        this.__data = {};

        this.loaded = new Signal();
        this.updated = new Signal();

        if(resourceName){
            this.loadURL(resourceName);
        }
    }

    isLoaded() {
        return this.__loaded;
    }

    isStream() {
        return this.__stream;
    }
    
    loadURL(filePath) {
        if(filePath in this.__data){
            this.__currKey = filePath;
            this.updated.emit();
            return;
        }

        this.__resourceLoader.loadResources(filePath, 
            (path, entries) => {
                let ldr, cdm;
                for(let name in entries){
                    if(name.endsWith('.jpg'))
                        ldr = entries[name];
                    else if(name.endsWith('.bin'))
                        cdm = entries[name];
                }

                /////////////////////////////////
                // Parse the data.
                let blob = new Blob([ldr.buffer]);
                let _this = this;
                let ldrPic = new Image();
                ldrPic.onload = function () {
                    _this.__setLoadedData(filePath, ldrPic, cdm);
                }
                ldrPic.src = URL.createObjectURL(blob);

            });
    }

    __setLoadedData(filePath, ldr, cdm) {
        this.width =  ldr.width;
        this.height =  ldr.height;
        this.__data[filePath] = {
            'ldr': ldr,
            'cdm': cdm
        }
        this.__currKey = filePath;
        if(!this.__loaded){
            this.__loaded = true;
            this.loaded.emit();
        }
        else{
            this.updated.emit();
        }

        return this.__loaded;
    }


    getData(){
        return this.__hdrInfo.data;
    }

    getParams(){
        let params = super.getParams();
        if(this.__loaded){
            params.key = this.__currKey;
            params.data = {
                ldr: this.__data[this.__currKey].ldr,
                cdm: this.__data[this.__currKey].cdm
            };
        }
        return params;
    }

    fromJSON(json) {

    }

    toJSON(json) {

    }
};

// export default HDRImage2D;
export {
    HDRImage2D
};
