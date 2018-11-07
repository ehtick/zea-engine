import {
    Signal
} from '../Utilities';
import {
    BaseItem,
    BaseImage,
    makeParameterTexturable
} from '../SceneTree';
import {
    shaderLibrary
} from './ShaderLibrary.js';
import {
    GLTexture2D
} from './GLTexture2D.js';

class GLShader extends BaseItem {
    constructor(gl) {
        super();
        if (!gl) {
            throw ("gl context must be passed to shader constructor");
        }
        this.__gl = gl;
        this.__shaderStages = {
            'VERTEX_SHADER': {
                'glsl': "",
                'lines': 0,
                'uniforms': {},
                'attributes': {}
            },
            'FRAGMENT_SHADER': {
                'glsl': "",
                'lines': 0,
                'uniforms': {},
                'attributes': {}
            }
        };

        this.__shaderProgramHdls = {};
        this.__gltextures = {};
        this.updated = new Signal();

        this.invisibleToGeomBuffer = false;
    }


    isTransparent() {
        return false;
    }

    isGizmo() {
        return false;
    }

    isOverlay() {
        return false;
    }

    ///////////////////////////////
    // Parameters

    static getParamDeclarations() {
        return [];
    }

    ///////////////////////////////////
    // Compilation

    __compileShaderStage(glsl, stageID, name, shaderopts) {
        const gl = this.__gl;
        // console.log("__compileShaderStage:" + this.name+"."+name + " glsl:\n" + glsl);
        if(!shaderopts)
            shaderopts = gl.shaderopts;
        if (shaderopts) {
            if (shaderopts.repl) {
                for (let key in shaderopts.repl)
                    glsl = glsl.replaceAll(key, shaderopts.repl[key]);
            }
            if (shaderopts.defines)
                glsl = shaderopts.defines + glsl;
        }

        let prefix;
        if(gl.name == 'webgl2') {
            glsl = glsl.replaceAll('attribute', 'in');
            if(name == 'vertexShader')
                glsl = glsl.replaceAll('varying', 'out');
            else
                glsl = glsl.replaceAll('varying', 'in');
            glsl = glsl.replaceAll('texture2D', 'texture');

            prefix = "#version 300 es\n";
            glsl = prefix + glsl;
        }

        const shaderHdl = gl.createShader(stageID);
        gl.shaderSource(shaderHdl, glsl);

        // Compile the shader program.
        gl.compileShader(shaderHdl);

        // See if it compiled successfully
        if (!gl.getShaderParameter(shaderHdl, gl.COMPILE_STATUS)) {
            console.log("Errors in :" + this.constructor.name);
            const errors = gl.getShaderInfoLog(shaderHdl).split('\n');
            const errorLines = {};
            for (let i in errors) {
                if (errors[i].startsWith("'")) {
                    errors[i - 1] = errors[i - 1] + errors[i];
                    delete errors[i];
                    i--;
                    continue;
                }
                const parts = errors[i].split(':');
                if (parts.length >= 2) {
                    const lineNum = parseInt(parts[2]); // TODO check against ATI and intel cards
                    if (!isNaN(lineNum)) {
                        if(errorLines[lineNum])
                            errorLines[lineNum].push(errors[i]);
                        else
                            errorLines[lineNum] = [errors[i]];
                    }
                }
            }
            const numberedLinesWithErrors = [];
            const lines = glsl.split('\n');
            for (let i = 0; i < lines.length; i++) {
                numberedLinesWithErrors.push(((i + 1) + ":").lpad(' ', 3) + lines[i]);
                if ((i + 1) in errorLines) {
                    const errors = errorLines[(i + 1)];
                    for(let error of errors) {
                        numberedLinesWithErrors.push(error);
                        numberedLinesWithErrors.push('-'.lpad('-', error.length));
                    }
                }
            }
            // throw("An error occurred compiling the shader \n\n" + numberedLinesWithErrors.join('\n') + "\n\n=================\n" + this.constructor.name + "." + name + ": \n\n" + errors.join('\n'));
            throw("An error occurred compiling the shader \n=================\n" + this.constructor.name + "." + name + ": \n\n" + errors.join('\n') + "\n" + numberedLinesWithErrors.join('\n'));
            return null;
        }
        return shaderHdl;
    }

    __createProgram(shaderopts) {
        const gl = this.__gl;
        this.__shaderCompilationAttempted = true;
        const shaderProgramHdl = gl.createProgram();
        const vertexShaderGLSL = this.__shaderStages['VERTEX_SHADER'].glsl;
        const shaderHdls = {};
        if (vertexShaderGLSL != undefined) {
            const vertexShader = this.__compileShaderStage(vertexShaderGLSL, gl.VERTEX_SHADER, 'vertexShader', shaderopts);
            if (!vertexShader) {
                return false;
            }
            gl.attachShader(shaderProgramHdl, vertexShader);
            shaderHdls[gl.VERTEX_SHADER] = vertexShader;
        }
        const fragmentShaderGLSL = this.__shaderStages['FRAGMENT_SHADER'].glsl;
        if (fragmentShaderGLSL != undefined) {
            const fragmentShader = this.__compileShaderStage(fragmentShaderGLSL, gl.FRAGMENT_SHADER, 'fragmentShader', shaderopts);
            if (!fragmentShader) {
                return false;
            }
            gl.attachShader(shaderProgramHdl, fragmentShader);
            shaderHdls[gl.FRAGMENT_SHADER] = fragmentShader;
        }
        gl.linkProgram(shaderProgramHdl);

        if (!gl.getProgramParameter(shaderProgramHdl, gl.LINK_STATUS)) {
            const info = gl.getProgramInfoLog(shaderProgramHdl);

            if (info.includes("D3D shader compilation failed")) {
                // Usefull for debugging very nasty compiler errors generated only in the ANGL layer.
                const debug_ext = gl.getExtension("WEBGL_debug_shaders");
                if (debug_ext) {
                    const hlsl = debug_ext.getTranslatedShaderSource(shaderHdls[gl.VERTEX_SHADER]);
                    console.log(hlsl);
                }
            }

            console.log("vertexShaderGLSL:" + vertexShaderGLSL);
            console.log("fragmentShaderGLSL:" + fragmentShaderGLSL);
            throw ("Unable to link the shader program:" + this.constructor.name + '\n==================\n' + info);



            gl.deleteProgram(shaderProgramHdl);
            return false;
        }

        const result = this.__extractAttributeAndUniformLocations(shaderProgramHdl, shaderopts);
        result.shaderProgramHdl = shaderProgramHdl;
        return result;
    }

    __extractAttributeAndUniformLocations(shaderProgramHdl, shaderopts) {
        const gl = this.__gl;
        const attrs = this.getAttributes();
        const result = {
            'attrs': {},
            'unifs': {}
        }
        for (let attrName in attrs) {
            const location = gl.getAttribLocation(shaderProgramHdl, attrName);
            if (location == undefined) {
                console.warn("Shader attribute not found:" + attrName);
                continue;
            }
            const attrDesc = attrs[attrName];
            result.attrs[attrName] = {
                name: attrName,
                location: location,
                type: attrDesc.type,
                instanced: attrDesc.instanced
            };
        }
        const unifs = this.getUniforms();
        for (let uniformName in unifs) {
            const unifType = unifs[uniformName];
            if (unifType instanceof Array) {
                for (let member of unifType) {
                    const structMemberName = uniformName + '.' + member.name;
                    const location = gl.getUniformLocation(shaderProgramHdl, structMemberName);
                    if (location == undefined) {
                        // console.warn(this.constructor.name + " uniform found in shader code but not in compiled program:" + uniformName);
                        continue;
                    }
                    result.unifs[structMemberName] = {
                        name: structMemberName,
                        location: location,
                        type: member.type
                    };
                }
            }
            if (shaderopts) {
                if (shaderopts.repl) {
                    for (let key in shaderopts.repl)
                        uniformName = uniformName.replace(key, shaderopts.repl[key]);
                }
            }

            const location = gl.getUniformLocation(shaderProgramHdl, uniformName);
            if (location == undefined) {
                // console.warn(this.constructor.name + " uniform found in shader code but not in compiled program:" + uniformName);
                continue;
            }
            result.unifs[uniformName] = {
                name: uniformName,
                location: location,
                type: unifType
            };
        }
        return result;
    }

    getAttributes() {
        const attributes = {};
        for (let stageName in this.__shaderStages) {
            const shaderStageBlock = this.__shaderStages[stageName];
            for (let attrName in shaderStageBlock['attributes'])
                attributes[attrName] = shaderStageBlock['attributes'][attrName];
        }
        return attributes;
    }

    getUniforms() {
        const uniforms = {};
        for (let stageName in this.__shaderStages) {
            const shaderStageBlock = this.__shaderStages[stageName];
            for (let unifName in shaderStageBlock['uniforms'])
                uniforms[unifName] = shaderStageBlock['uniforms'][unifName];
        }
        return uniforms;
    }

    finalize() {
    }


    compileForTarget(key, shaderopts) {
        if (!key) {
            key = this.constructor.name;
        }
        let shaderCompilationResult = this.__shaderProgramHdls[key];
        if (!shaderCompilationResult) {
            if (shaderCompilationResult !== false) {
                shaderCompilationResult = this.__createProgram(shaderopts);
                this.__shaderProgramHdls[key] = shaderCompilationResult;
            }
        }
        return shaderCompilationResult;
    }
    compile() {
        this.compileForTarget();
    }


    bind(renderstate, key) {
        const gl = this.__gl;

        if(renderstate.glshader != this) {
            const shaderCompilationResult = this.compileForTarget(key, renderstate.shaderopts);
            if (shaderCompilationResult === false) {
                console.warn(this.constructor.name + " is not compiled for " + key);
                return false;
            }

            const shaderProgramHdl = shaderCompilationResult.shaderProgramHdl;

            gl.useProgram(shaderProgramHdl);
            renderstate.shaderkey = this.constructor.name;
            renderstate.glshader = this;
            renderstate.boundTextures = 0;
            renderstate.boundLightmap = undefined;
            // Make sure we clear the binding cached.
            renderstate.glgeom = undefined;

            renderstate.unifs = shaderCompilationResult.unifs;
            renderstate.attrs = shaderCompilationResult.attrs;

            const unifs = shaderCompilationResult.unifs;

            if(renderstate.viewports && renderstate.viewports.length == 1) {
                const vp = renderstate.viewports[0];
                gl.viewport(...vp.region);
                {
                    const unif = unifs.viewMatrix;
                    if (unif) {
                        gl.uniformMatrix4fv(unif.location, false, vp.viewMatrix.asArray());
                    }
                }
                {
                    const unif = unifs.cameraMatrix;
                    if (unif) {
                        gl.uniformMatrix4fv(unif.location, false, vp.cameraMatrix.asArray());
                    }
                }
                {
                    const unif = unifs.projectionMatrix;
                    if (unif) {
                        gl.uniformMatrix4fv(unif.location, false, vp.projectionMatrix.asArray());
                    }
                }
                {
                    const unif = unifs.eye;
                    if (unif) {
                        // Left or right eye, when rendering sterio VR.
                        gl.uniform1i(unif.location, 0);
                    }
                }
            }

            if(renderstate.envMap)
            {
                const envMapPyramid = unifs.envMapPyramid;
                if (envMapPyramid && renderstate.envMap.bindProbeToUniform) {
                    renderstate.envMap.bindProbeToUniform(renderstate, envMapPyramid);
                }
                const envMapTex = unifs.envMapTex;
                if (envMapTex) {
                    renderstate.envMap.bindToUniform(renderstate, envMapTex);
                }
            }
            {
                const unif = unifs.exposure;
                if (unif) {
                    gl.uniform1f(unif.location, renderstate.exposure ? renderstate.exposure : 1.0);
                }
            }
        }

        return true;
    }

    unbind(renderstate) {
        return true;
    }


    ///////////////////////////////////
    // Destroy

    destroy() {
        const gl = this.__gl;
        for (let key in this.__shaderProgramHdls) {
            const shaderCompilationResult = this.__shaderProgramHdls[key];
            gl.deleteProgram(shaderCompilationResult.shaderProgramHdl);
        }
        this.__shaderProgramHdls = {};
    }
};

export {
    GLShader
};
// export default GLShader;