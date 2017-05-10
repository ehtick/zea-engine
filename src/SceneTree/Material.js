import { Color } from '../Math/Color';
import { Signal } from '../Math/Signal';
import { Image2D } from './Image2D.js';
import { Shader } from './Shader.js';

class Material extends Shader {
    constructor(name) {
        super(name);
        this.__props = {};

        this.__metaData = new Map();

        this.textureConnected = new Signal();
        this.textureDisconnected = new Signal();
        this.parameterChanged = new Signal();
        this.destructing = new Signal();
    }
    
    destroy() {
        this.removeAllTextures();
        super.destroy();
    }

    removeAllTextures() {
        for (let propName in this.__props) {
            let prop = this.__props[propName];
            if (prop instanceof Image2D)
                prop.removeRef(this);
        }
    }


    get textures() {
        let textures = {};
        for (let propName in this.__props) {
            let prop = this.__props[propName];
            if (prop instanceof Image2D)
                textures[propName] = prop
        }
        return textures;
    }

    addParameter(name, defaultValue, texturable=true) {
        this.__props['_'+name] = defaultValue;
        this.__props['_'+name+'Tex'] = undefined;
        this.__props['_'+name+'TexConnected'] = false;
        let get, set;
        if(texturable){
            get = ()=>{ 
                    if(this.__props['_'+name+'TexConnected'])
                        return this.__props['_'+name+'Tex'];
                    else
                        return this.__props['_'+name];
                };
            set = (val)=>{
                if (val instanceof Image2D){
                    let texture = val;
                    if (this.__props['_'+name+'TexConnected'] && this.__props['_'+name+'Tex'] === texture){
                        this.__props['_'+name+'Tex'].removeRef(this);
                        this.textureDisconnected.emit(name);
                    }
                    texture.addRef(this);
                    this.__props['_'+name+'TexConnected'] = true;
                    this.__props['_'+name+'Tex'] = texture;
                    texture.updated.connect(()=>{
                        this.__props['_'+name+'TexConnected'] = true;
                        this.__props['_'+name+'Tex'] = texture;
                        this.updated.emit();
                    });
                    this.textureConnected.emit(name);
                }
                else{
                    if (this.__props['_'+name+'TexConnected']){
                        this.__props['_'+name+'Tex'].removeRef(this);
                        this.textureDisconnected.emit(name);
                        this.updated.emit();
                    }
                    this.__props['_'+name+'TexConnected'] = false;
                    this.__props['_'+name] = val;
                }
                this.updated.emit();
            };
        }
        else{
            get = ()=>{ 
                    return this.__props['_'+name];
                };
            set = (val)=>{
                this.__props['_'+name] = val;
                updated.emit();
                this.updated.emit();
            };
        }
        Object.defineProperty(this, name, {
            'configurable': false,
            'enumerable': true,
            'get': get,
            'set': set
        });
    }

    getParameter(name) {
        return this.__props[name];
    }

    //////////////////////////////////////////
    // Persistence

    toJSON() {
        let json = {
            "name": this.name

        };
        return json
    }

    fromJSON(json) {
        this.__name = json.name;
        let props = this.__props;
        for(let key in json){
            let propName = '_'+key;
            if(propName in props){
                if(props[propName] instanceof Color)
                    props[propName].fromJSON(json[key]);
                else{
                    props[propName] = json[key];
                }
            }
        }
    }

    readBinary(reader, flags){
        // super.readBinary(reader, flags);
        let type = reader.loadStr();
        this.name = reader.loadStr();

        let numParams = reader.loadUInt32();
        let props = this.__props;
        for(let i=0; i<numParams; i++){
            let propName = '_'+reader.loadStr();
            if(propName in props){
                if(props[propName] instanceof Color){
                    props[propName] = reader.loadRGBAFloat32Color();
                    // If the value is in linear space, then we should convert it to gamma space.
                    props[propName].applyGamma(2.2);
                }
                else{
                    props[propName] = reader.loadFloat32();
                }
            }
            else{
                // Make sure to load the data, ()
                let value = reader.loadFloat32();
                //console.log("Unhandled param:" + propName + ":" + value);
            }
        }
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

};
export {
    Material
};
// Material;