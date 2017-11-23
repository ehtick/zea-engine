
import {
    Async
} from '../Utilities';
import {
    Image2D,
    HDRImage2D
} from '../SceneTree';
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
    ImageMixerShader
} from './Shaders/ImageMixerShader.js';
import {
    GLFbo
} from './GLFbo.js';
import {
    generateShaderGeomBinding
} from './GeomShaderBinding.js';

class GLLightmapMixer extends GLTexture2D {
    constructor(gl, lightmapMixer) {
        super(gl);

        this.__lightmapMixer = lightmapMixer;

        this.configure({
            channels: 'RGBA',
            format: 'FLOAT',
            filter: 'LINEAR',
            wrap: 'CLAMP_TO_EDGE',
            width: this.__lightmapMixer.width,
            height: this.__lightmapMixer.height
        });
        this.__fbo = new GLFbo(gl, this);


        this.__decompAndMixShader = new ImageMixerShader(gl);
        let shaderComp = this.__decompAndMixShader.compileForTarget('ImageMixerShader');
        this.__shaderBinding = generateShaderGeomBinding(gl, shaderComp.attrs, gl.__quadattrbuffers, gl.__quadIndexBuffer);


        this.__srcTextures = [];

        let async = new Async();
        // increment the count, so its not zero. 
        //(so an already loaded image doesn't trigger the ready signal)
        async.incAsyncCount(); 
        const genGLTex = (index) => {
            let image = this.__lightmapMixer.getSubImage(index);
            let gltexture = image.getMetadata('gltexture');
            if(!gltexture) {
                if (image instanceof HDRImage2D || image.format === "FLOAT") {
                    gltexture = new GLHDRImage(gl, image);
                } else {
                    gltexture = new GLTexture2D(gl, image);
                }
            }
            this.__srcTextures[index] = gltexture;
            async.incAsyncCount();
            gltexture.ready.connect(async.decAsyncCount);
        }

        for (let i = 0; i < this.__lightmapMixer.numSubImages(); i++) {
            genGLTex(i);
        }

        this.__lightmapMixer.lightmapAdded.connect((index) => {
            genGLTex(index);
        });
        
        async.ready.connect(this.__renderTgtImage.bind(this));
        async.decAsyncCount();

        this.__lightmapMixer.lightmapResourceChanged.connect(() => {
            this.__renderTgtImage();
        });
        this.__lightmapMixer.lightmapWeightChanged.connect(() => {
            this.__renderTgtImage();
        });

        this.__lightmapMixer.destructing.connect(() => {
            console.log(this.__lightmapMixer.name + " destructing");
            this.destroy();
        });

    }


    __renderTgtImage() {

        let gl = this.__gl;
        this.__fbo.bindAndClear();

        let renderstate = {};
        this.__decompAndMixShader.bind(renderstate, 'ImageMixerShader');
        this.__shaderBinding.bind(renderstate);

        let unifs = renderstate.unifs;
        for (let i = 0; i < this.__srcTextures.length; i++) {
            this.__srcTextures[i].bind(renderstate, unifs['sampler' + i].location);
            gl.uniform1f(unifs['weight' + i].location, this.__lightmapMixer.getSubImageWeight(i));
        }

        gl.drawQuad();

        // // Debug a block of pixels.
        // gl.finish();
        // let numPixels = 4;
        // let pixels = new Float32Array(4 * numPixels);
        // gl.readPixels(this.width / 4, this.height/4, numPixels, 1, gl.RGBA, gl.FLOAT, pixels);
        // console.log(pixels);

        this.__fbo.unbind();

        if (!this.__lightmapMixer.isStream()) {
            this.__fbo.destroy();
            for (let i = 0; i < this.__srcTextures.length; i++) {
                this.__srcTextures[i].destroy();
            }
            this.__fbo = null;
            this.__srcTextures = [];
        }

        this.updated.emit();
    }

    destroy() {
        super.destroy();
        if (this.__fbo) {
            this.__fbo.destroy();
            for (let i = 0; i < this.__srcTextures.length; i++) {
                this.__srcTextures[i].destroy();
            }
        }
        this.__decompAndMixShader.destroy();
        this.__shaderBinding.destroy();

        this.__lightmapMixer.loaded.disconnectScope(this);
        this.__lightmapMixer.updated.disconnectScope(this);
    }
};

export {
    GLLightmapMixer
};
// export default GLLightmapMixer;