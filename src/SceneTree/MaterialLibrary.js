import {
    SystemDesc
} from '../BrowserDetection.js';
import {
    Color
} from '../Math';
import {
    Signal
} from '../Utilities';
import {
    sgFactory
} from './SGFactory.js';
import {
    Material
} from './Material.js';

const materialPresets = {
    Steel:{
        // baseColor:  new Color(0.15,0.15,0.15),
        metallic: 0.55,
        roughness: 0.25,
        reflectance: 0.7
    },
    StainlessSteel:{
        metallic: 0.55,
        roughness: 0.25,
        reflectance: 0.7
    },
    Aluminum:{
        metallic: 0.55,
        roughness: 0.15,
        reflectance: 0.85
    },
    PaintedMetal: {
        metallic: 0.05,
        roughness: 0.25,
        reflectance: 0.05
    },
    Plastic: {
        metallic: 0.0,
        roughness: 0.25,
        reflectance: 0.03
    },
    Rubber: {
        metallic: 0.0,
        roughness: 0.75,
        reflectance: 0.01
    }
};

class MaterialLibrary {
    constructor(resourceLoader) {
        this.__resourceLoader = resourceLoader;
        this.__textures = {};
        this.__materials = {};


        let material = new Material('Default');
        material.addParameter('baseColor', new Color(0.3, 0.3, 0.3));
        material.addParameter('roughness', 0.2);
        material.addParameter('reflectance', 0.2);
        this.__materials['Default'] = material;

        this.lod = 0;
        if(SystemDesc.isMobileDevice)
            this.lod = 1;
        this.loaded = new Signal();
    }

    getNumMaterials() {
        return this.__materials.length;
    }

    getMaterials() {
        return Object.values(this.__materials);
    }

    getMaterialNames() {
        let names = [];
        for(let name in this.__materials) {
            names.push(name);
        }
        return names;
    }

    setMaterialTypeMapping(materialTypeMapping) {
        if(!this.__materialTypeMapping)
            this.__materialTypeMapping = {};
        for(let key in materialTypeMapping)
            this.__materialTypeMapping[key] = materialTypeMapping[key];
    }

    hasMaterial(name) {
        return name in this.__materials;
    }

    addMaterial(material) {
        this.__materials[material.getName()] = material;
    }

    getMaterial(name) {
        const res = this.__materials[name];
        if(!res){
            throw("Material:" + name+ " not found in library:" + this.getMaterialNames())
        }
        return res;
    }

    __modifyMaterial (material, paramValues, shaderName) {
        for (let paramName in paramValues) {
            let param = material.getParameter(paramName);
            if (param) {
                param.setValue(paramValues[paramName]);
            } else {
                material.addParameter(paramName, paramValues[paramName]);
            }
        }
        if (shaderName)
            material.setShaderName(shaderName);
    }

    assignMaterialPresetValues(materialNames, presetName, shaderName = undefined) {
        for (let materialName of materialNames) {
            if(materialName == "*") {
                for(let name in this.__materials) {
                    this.__modifyMaterial(this.__materials[name], materialPresets[presetName], shaderName);
                }
                continue;
            }
            let material = this.__materials[materialName];
            if (!material) {
                console.warn("Material not found:" + materialName);
                continue;
            }
            this.__modifyMaterial(material, materialPresets[presetName], shaderName);
        }
    }

    modifyMaterials(materialNames, paramValues, shaderName = undefined) {

        for (let materialName of materialNames) {
            if(materialName == "*") {
                for(let name in this.__materials) {
                    this.__modifyMaterial(this.__materials[name], paramValues, shaderName);
                }
                continue;
            }
            let material = this.__materials[materialName];
            if (!material) {
                console.warn("Material not found:" + materialName);
                continue;
            }
            this.__modifyMaterial(material, paramValues, shaderName);
        }
    }
    //////////////////////////////////////////
    // Persistence

    load(filePath) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", filePath, true);
        xhr.ontimeout = ()=>{
            throw("The request for " + filePath + " timed out.");
        };
        xhr.onload = ()=>{
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    this.fromJSON(JSON.parse(xhr.responseText));
                } else {
                    console.warn(xhr.statusText);
                }
            }
        };
        xhr.send(null);
    }

    fromJSON(j, flags = 0) {
        for (let name in j["textures"]) {
            let texture = sgFactory.constructClass('FileImage2D');
            this.__textures[name] = texture;
        }
        for (let name in j.materials) {
            let material = sgFactory.constructClass('StandardMaterial');
            material.fromJSON(j.materials[name]);
            this.__materials[name] = material;
        }
    }

    toJSON() {
        return {
            "numMaterials": this.geoms.length()
        }
    }


    readBinary(reader, flags=0) {
        this.name = reader.loadStr();

        let numTextures = reader.loadUInt32();
        for (let i = 0; i < numTextures; i++) {
            let type = reader.loadStr();
            let texture = sgFactory.constructClass(type, undefined, this.__resourceLoader);
            texture.readBinary(reader, flags, this.lod);
            this.__textures[texture.getName()] = texture;
        }
        let numMaterials = reader.loadUInt32();
        if (numMaterials > 0) {
            let toc = reader.loadUInt32Array(numMaterials);
            for (let i = 0; i < numMaterials; i++) {
                let shaderName = reader.loadStr();
                let name = reader.loadStr();
                if (this.__materialTypeMapping && ('*' in this.__materialTypeMapping || name in this.__materialTypeMapping)) {
                    if (name in this.__materialTypeMapping)
                        shaderName = this.__materialTypeMapping[name];
                    else if ('*' in this.__materialTypeMapping)
                        shaderName = this.__materialTypeMapping['*'];
                }

                if(shaderName == 'StandardMaterial'){
                    shaderName = 'StandardSurfaceShader';
                }
                if(shaderName == 'TransparentMaterial'){
                    shaderName = 'TransparentSurfaceShader';
                }

                // console.log("Material:" + name);
                let material = new Material(name, shaderName);
                reader.seek(toc[i]); // Reset the pointer to the start of the item data.
                material.readBinary(reader, flags, this.__textures);

                this.__materials[name] = material;
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