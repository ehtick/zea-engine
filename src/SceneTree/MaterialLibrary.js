import { Signal } from '../Math/Signal';
import { sgFactory } from './SGFactory.js';

class MaterialLibrary {
    constructor(resourceLoader) {
        this.__resourceLoader = resourceLoader;
        this.__textures = {};
        this.__materials = {};


        let material = sgFactory.constructClass('StandardMaterial');
        material.baseColor.set(0.3, 0.3, 0.3);
        material.roughness = 0.2;
        material.reflectance = 0.2;
        this.__materials['Default'] = material;

        this.loaded = new Signal();
    }

    get numMaterials(){
        return this.__materials.length;
    }
    get materials(){
        return this.__materials;
    }

    setMaterialTypeMapping(materialTypeMapping) {
        this.__materialTypeMapping = materialTypeMapping;
    }
    
    hasMaterial(name){
        return name in this.__materials;
    }
    
    addMaterial(material){
        this.__materials[material.name] = material;
    }
    
    getMaterial(name){
        return this.__materials[name];
    }

    modifyMaterials(materialNames, paramValues){
        for(let materialName of materialNames){
            let material = this.__materials[materialName];
            if(!material){
                console.warn("Material not found:" + materialName);
                continue;
            }
            for(let paramName in paramValues){
                let param = material.getParameter(paramName);
                if(!param){
                    console.warn("Param not found:" + paramName + " on material:" + materialName + " of type:" + material.constructor.name);
                    continue;
                }
                param.setValue(paramValues[paramName]);
            }
        }
    }
    //////////////////////////////////////////
    // Persistence

    load(filePath){
        let xhr = new XMLHttpRequest();
        xhr.open("GET", filePath, true);
        xhr.ontimeout = function () {
            console.error("The request for " + filePath + " timed out.");
        };
        let _this = this;
        xhr.onload = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    _this.fromJSON.call(_this, JSON.parse(xhr.responseText));
                    onLoadDone.call(_this);
                } else {
                    console.warn(xhr.statusText);
                }
            }
        };
        xhr.send(null);
    }

    fromJSON(j, flags=0) {
        for(let name in j["textures"]){
            let texture = sgFactory.constructClass('FileImage2D');
            this.__textures[name] = texture;
        }
        for(let name in j.materials){
            let material = sgFactory.constructClass('StandardMaterial');
            material.fromJSON(j.materials[name]);
            this.__materials[name] = material;
        }
    }

    toJSON() {
        return {"numMaterials": this.geoms.length() }
    }


    readBinary(reader, flags){
        this.name = reader.loadStr();

        let numTextures = reader.loadUInt32();
        for (let i=0; i< numTextures; i++) {
            let type = reader.loadStr();
            let texture = sgFactory.constructClass(type, undefined, this.__resourceLoader);
            texture.readBinary(reader, flags);
            this.__textures[texture.name] = texture;
        }
        let numMaterials = reader.loadUInt32();
        if(numMaterials > 0){
            let toc = reader.loadUInt32Array(numMaterials);
            for (let i=0; i< numMaterials; i++) {
                let type = reader.loadStr();
                let name = reader.loadStr();
                // console.log("Material:" + name);
                let material = sgFactory.constructClass(type, name);
                reader.seek(toc[i]); // Reset the pointer to the start of the item data.
                material.readBinary(reader, flags, this.__textures);

                if (this.__materialTypeMapping && ('*' in this.__materialTypeMapping || name in this.__materialTypeMapping)) {
                    let remappedMaterial;
                    if (name in this.__materialTypeMapping) 
                        remappedMaterial = sgFactory.constructClass(this.__materialTypeMapping[name]);
                    else if ('*' in this.__materialTypeMapping) 
                        remappedMaterial = sgFactory.constructClass(this.__materialTypeMapping['*']);

                    if(!remappedMaterial)
                        continue;

                    remappedMaterial.copyFrom(material)
                    this.__materials[name] = remappedMaterial;
                }
                else{
                    this.__materials[name] = material;
                }

            }
        }

        this.loaded.emit();
    }

    toString() {
        return JSON.stringify(this.toJSON(), null, 2)
    }
};
export {
    MaterialLibrary
};
// MaterialLibrary;

