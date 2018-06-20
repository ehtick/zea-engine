import {
    Vec3,
    hammersley
} from '../Math';
import {
    GLShader
} from './GLShader.js';
import {
    GLTexture2D
} from './GLTexture2D.js';
import {
    GLHDRImage
} from './GLHDRImage.js';
import {
    ImageAtlas
} from './ImageAtlas.js';
import {
    ConvolverShader
} from './Shaders/ConvolverShader.js';
import {
    GLFbo
} from './GLFbo.js';
import {
    ImagePyramid
} from './ImagePyramid.js';
import {
    generateShaderGeomBinding
} from './GeomShaderBinding.js';


class GLProbe extends ImageAtlas {
    constructor(gl, name) {
        super(gl, name);
        this.__gl = gl;

        if (!gl.__quadVertexIdsBuffer)
            gl.setupInstancedQuad();

        this.__convolved = false;
        this.__fbos = [];
    }

    generateHammersleySamples(numSamples) {
        const gl = this.__gl;
        if (!gl['Hammersley' + numSamples]) {

            let dataArray = new Float32Array(numSamples * 3);
            for (let i = 0; i < numSamples; i++) {
                let Xi = hammersley(i, numSamples);
                let offset = i * 3;
                dataArray[offset + 0] = Xi[0];
                dataArray[offset + 1] = Xi[1];
            }
            gl['Hammersley' + numSamples] = new GLTexture2D(gl, {
                format: 'RGB',
                type: 'FLOAT',
                filter: 'NEAREST',
                wrap: 'CLAMP_TO_EDGE',
                width: numSamples,
                height: 1,
                data: dataArray,
                mipMapped: false
            });
        }
        return gl['Hammersley' + numSamples];
    }

    convolveEnvMap(srcGLTex) {
        const gl = this.__gl;

        // Compile and bind the convolver shader.
        let numSamples = 1024;
        // let numSamples = 64;
        let hammersleyTexture = this.generateHammersleySamples(numSamples);

        if (!this.__convolved) {
            if (!this.__imagePyramid) {
                this.__imagePyramid = new ImagePyramid(gl, 'EnvMap', srcGLTex, false);
                this.__imagePyramid.updated.connect(() => {
                    this.convolveEnvMap(srcGLTex);
                });
            }

            this.addSubImage(srcGLTex);

            let currRez = [srcGLTex.width / 2, srcGLTex.height / 2];

            let levels = 6; //this.__imagePyramid.numSubImages();
            for (let i = 0; i < levels; i++) {
                let level = new GLTexture2D(gl, {
                    format: 'RGBA',
                    type: 'FLOAT',
                    filter: 'LINEAR',
                    wrap: 'CLAMP_TO_EDGE',
                    width: currRez[0],
                    height: currRez[1]
                });
                this.addSubImage(level);

                let fbo = new GLFbo(gl, level);
                this.__fbos.push(fbo);

                currRez = [currRez[0] / 2, currRez[1] / 2];
            }

            this.generateAtlasLayout();

            this.__convolverShader = new ConvolverShader(gl);
            let covolverShaderComp = this.__convolverShader.compileForTarget('GLProbe',  Object.assign({
                repl: {
                    "NUM_SAMPLES": numSamples
                }
            }, gl.shaderopts));
            this.__covolverShaderBinding = generateShaderGeomBinding(gl, covolverShaderComp.attrs, gl.__quadattrbuffers, gl.__quadIndexBuffer);

        }

        for (let i = 0; i < this.__fbos.length; i++) {
            this.__fbos[i].bind();

            const renderstate = {};
            this.__convolverShader.bind(renderstate, 'GLProbe');
            this.__covolverShaderBinding.bind(renderstate);
            let unifs = renderstate.unifs;

            // Note: we should not need to bind the texture every iteration. 
            this.__imagePyramid.bindToUniform(renderstate, unifs.envMap);
            if ('hammersleyMap' in unifs) {
                hammersleyTexture.bindToUniform(renderstate, unifs.hammersleyMap);
            }

            // Set the roughness.
            if ('Roughness' in unifs) {
                let roughness = i / (this.__fbos.length - 1);
                gl.uniform1f(unifs.roughness.location, roughness);
            }


            gl.drawQuad();
        }

        this.__convolved = true;

        this.renderAtlas(false);
    }

    bindToUniform(renderstate, unif) {
        //this.__imagePyramid.getSubImage(3).bind(renderstate, unif);
        if (this.__convolved)
            super.bindToUniform(renderstate, unif);
    }

    destroy() {
        super.destroy();
        this.__convolverShader.destroy();

        for (let fbo of this.__fbos) {
            fbo.destroy();
        }
    }
};


export {
    GLProbe
};
// export default GLProbe;