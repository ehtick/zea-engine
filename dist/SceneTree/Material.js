/* eslint-disable require-jsdoc */
/* eslint-disable guard-for-in */
import { BaseItem } from './BaseItem';
import { Registry } from '../Registry';
// Explicit export of parameters that are not included in the
// module defined by the index file in the folder. (see Parameters/index.js)
// These parameters depend on classes that ar ParameterOwners.
// TODO: Move to this folder.
import { MaterialFloatParam } from './Parameters/MaterialFloatParam';
import { MaterialColorParam } from './Parameters/MaterialColorParam';
import { ShaderNameChangedEvent } from '../Utilities/Events/ShaderNameChangedEvent';
import { TransparencyChangedEvent } from '../Utilities/Events/TransparencyChangedEvent';
import { TexturedChangedEvent } from '../Utilities/Events/TexturedChangedEvent';
/**
 * Represents a type of `BaseItem` class that holds material configuration.
 * Use this to apply materials to your assets or item parts.
 *
 * **Events**
 * * **shaderNameChanged:** Triggered when the shader's name is set through `setShaderName` method.
 *
 * @extends BaseItem
 */
// TODO: make abstract after subclasses checked
class Material extends BaseItem {
    /**
     * Create a material
     * @param name - The name of the material.
     * @param shaderName - Shader's class name.
     */
    constructor(name, shaderName) {
        super(name);
        this.__isTransparent = false;
        this.__isTextured = false;
        this.__shaderName = '';
        if (shaderName)
            this.setShaderName(shaderName);
    }
    /**
     * Getter for the shader name.
     * @return - Returns the shader name.
     */
    getShaderName() {
        return this.__shaderName;
    }
    /**
     * Sets shader by using the name of the class with the script.
     * It is important that the shader is registered in `Registry`, otherwise it will error.
     * See all classes that extend from `GLShader`.
     *
     * @param shaderName - The shader name.
     */
    setShaderName(shaderName) {
        if (this.__shaderName == shaderName)
            return;
        this.__shaderName = shaderName;
        const shaderClass = Registry.getClassDefinition(shaderName);
        const materialTemplate = shaderClass.getMaterialTemplate();
        if (!materialTemplate)
            throw new Error('Error setting Shader. Material template not registered found:' + shaderName);
        const paramMap = {};
        let i = materialTemplate.getNumParameters();
        while (i--) {
            const srcParam = materialTemplate.getParameterByIndex(i);
            const param = this.getParameter(srcParam.getName());
            if (param) {
            }
            else {
                this.addParameter(srcParam.clone());
            }
            paramMap[srcParam.getName()] = true;
        }
        // Remove redundant Params.
        for (const param of this.params) {
            if (!paramMap[param.getName()]) {
                this.removeParameter(param.getName());
            }
        }
        this.__shaderName = shaderName;
        this.__checkTransparency({});
        const event = new ShaderNameChangedEvent(shaderName);
        this.emit('shaderNameChanged', event);
    }
    /**
     * Remove all textures from Material's parameters.
     */
    removeAllTextures() {
        for (const param of this.params) {
            if (param instanceof MaterialColorParam) {
                if (param.getImage())
                    param.setImage(null);
            }
            else if (param instanceof MaterialFloatParam) {
                if (param.getImage())
                    param.setImage(null);
            }
        }
    }
    // /////////////////////////////
    // Parameters
    /**
     * Returns all texture parameters in current Material.
     *
     * @return - The return value.
     */
    getParamTextures() {
        const textures = {};
        for (const param of this.params) {
            if (param instanceof MaterialColorParam) {
                if (param.getImage())
                    textures[param.getName()] = param.getImage();
            }
            else if (param instanceof MaterialFloatParam) {
                if (param.getImage())
                    textures[param.getName()] = param.getImage();
            }
        }
        return textures;
    }
    /**
     * Checks if the material is transparent by checking the `Opacity` parameter.
     *
     * @return - Returns true if the material is transparent.
     */
    isTransparent() {
        return this.__isTransparent;
    }
    __checkTransparency(event) {
        let isTransparent = false;
        try {
            const shaderClass = this.getShaderClass();
            if (shaderClass.isTransparent()) {
                isTransparent = true;
            }
        }
        catch (e) { }
        if (!isTransparent) {
            const opacity = this.getParameter('Opacity');
            if (opacity && (opacity.value < 0.99 || (opacity instanceof MaterialFloatParam && opacity.getImage()))) {
                isTransparent = true;
            }
            else {
                const baseColorParam = this.getParameter('BaseColor');
                if (baseColorParam) {
                    if (baseColorParam instanceof MaterialColorParam) {
                        const image = baseColorParam.getImage();
                        if (image && image.format == 'RGBA') {
                            isTransparent = true;
                        }
                    }
                    if (!isTransparent && baseColorParam.value) {
                        const color_val = baseColorParam.value;
                        if (color_val.a < 1)
                            isTransparent = true;
                    }
                }
            }
        }
        if (isTransparent != this.__isTransparent) {
            this.__isTransparent = isTransparent;
            const event = new TransparencyChangedEvent(isTransparent);
            this.emit('transparencyChanged', event);
        }
    }
    /**
     * Checks if the material has a texture applied. The renderer can use this to optimize rendering of non-textured objects
     *
     * @return - Returns true if the material is textured.
     */
    isTextured() {
        return this.__isTextured;
    }
    __checkTextures(event) {
        // console.log('__checkTextures')
        const param = event ? event : {};
        let isTextured = false;
        for (const param of this.params) {
            if (param instanceof MaterialColorParam) {
                if (param.getImage()) {
                    isTextured = true;
                    break;
                }
            }
            else if (param instanceof MaterialFloatParam) {
                if (param.getImage()) {
                    isTextured = true;
                    break;
                }
            }
        }
        if (isTextured != this.__isTextured) {
            this.__isTextured = isTextured;
            let event = new TexturedChangedEvent(isTextured, param);
            this.emit('texturedChanged', event);
        }
    }
    /**
     * This method can be overridden in derived classes
     * to perform general updates (see GLPass or BaseItem).
     * @param event - The event object emitted by the parameter.
     * @private
     */
    parameterValueChanged(event) {
        this.__checkTransparency(event);
        this.__checkTextures(event);
        super.parameterValueChanged(event);
    }
    /**
     * Returns shaders class of current material, if set. Otherwise it returns `undefined`
     *
     * @return - The return value.
     */
    getShaderClass() {
        return Registry.getClassDefinition(this.getShaderName());
    }
    // ////////////////////////////////////////
    // Persistence
    /**
     * The toJSON method encodes the current object as a json object.
     *
     * @param context - The context value.
     * @return - Returns the json object.
     */
    toJSON(context) {
        const j = super.toJSON(context);
        j.shader = this.__shaderName;
        return j;
    }
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @param j - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(j, context = {}) {
        if (!j.shader) {
            console.warn('Invalid Material JSON');
            return;
        }
        this.setShaderName(j.shader);
        super.fromJSON(j, context);
        // let props = this.params;
        // for (let key in j) {
        //     let value;
        //     if (j[key] instanceof Object) {
        //         value = new Color();
        //         value.fromJSON(j[key]);
        //     } else {
        //         value = j[key];
        //     }
        //     this.addParameter(paramName, value);
        // }
    }
    /**
     * Sets state of current Item(Including Shaders and Materials) using a binary reader object.
     *
     * @param reader - The reader value.
     * @param context - The context value.
     */
    readBinary(reader, context) {
        let shaderName = reader.loadStr();
        if (shaderName == 'StandardMaterial') {
            shaderName = 'StandardSurfaceShader';
        }
        if (shaderName == 'TransparentMaterial') {
            shaderName = 'StandardSurfaceShader';
        }
        this.setShaderName(shaderName);
        if (context.versions['zea-engine'].compare([0, 0, 3]) < 0) {
            throw `Loading zcad files of version ${context.versions['zea-engine']} is not longer support`;
            this.setName(reader.loadStr());
            const capitalizeFirstLetter = function (string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            };
            const numParams = reader.loadUInt32();
            for (let i = 0; i < numParams; i++) {
                const paramName = capitalizeFirstLetter(reader.loadStr());
                const paramType = reader.loadStr();
                let value;
                if (paramType == 'MaterialColorParam') {
                    value = reader.loadRGBAFloat32Color();
                    // If the value is in linear space, then we should convert it to gamma space.
                    // Note: !! this should always be done in preprocessing...
                    value.applyGamma(2.2);
                }
                else {
                    value = reader.loadFloat32();
                }
                const textureName = reader.loadStr();
                // console.log(paramName +":" + value);
                let param = this.getParameter(paramName);
                if (param instanceof MaterialColorParam) {
                    ;
                    param.setValue(value);
                }
                else {
                    // param = <MaterialColorParam | MaterialFloatParam>(
                    //   // this.addParameter(generateParameterInstance(paramName, value))
                    // )
                }
                if (textureName != '' && param.setImage) {
                    if (context.assetItem.materialLibrary.hasImage(textureName)) {
                        // console.log(paramName +":" + textureName + ":" + context.materialLibrary[textureName].resourcePath);
                        param.setImage(context.assetItem.materialLibrary.getImage(textureName));
                    }
                    else {
                        console.warn('Missing Texture:' + textureName);
                    }
                }
            }
        }
        else {
            super.readBinary(reader, context);
        }
        this.__checkTransparency();
        this.__checkTextures();
    }
    // ////////////////////////////////////////
    // Clone and Destroy
    /**
     * The clone method constructs a new material, copies its values
     * from this material and returns it.
     *
     * @param context - The context value.
     * @return - Returns a new cloned material.
     */
    clone(context) {
        const cloned = new Material('clone', ''); // TODO: what should the arguemnts be here?
        cloned.copyFrom(this, context);
        return cloned;
    }
    /**
     * When a Material is copied, first runs `BaseItem` copyFrom method, then sets shader.
     *
     * @param src - The material to copy from.
     * @param context - The context value.
     */
    copyFrom(src, context) {
        this.setShaderName(src.getShaderName());
        super.copyFrom(src, context);
    }
}
Registry.register('Material', Material);
export { Material };
//# sourceMappingURL=Material.js.map