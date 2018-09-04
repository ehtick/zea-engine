import {
    GLShader
} from './GLShader.js';
import {
    GLTexture2D
} from './GLTexture2D.js';
import {
    UnpackHDRShader
} from './Shaders/UnpackHDRShader.js';
import {
    GLFbo
} from './GLFbo.js';
import {
    generateShaderGeomBinding
} from './GeomShaderBinding.js';

class GLHDRImage extends GLTexture2D {
    constructor(gl, hdrImage) {
        super(gl);

        this.__hdrImage = hdrImage;
        this.__hdrImage.setMetadata('gltexture', this);
        this.__hdrImage.updated.connect(() => {
            this.__unpackHDRImage(this.__hdrImage.getParams());
        });
        if (this.__hdrImage.isLoaded()) {
            this.__unpackHDRImage(this.__hdrImage.getParams());
        } else {
            this.__hdrImage.loaded.connect(() => {
                this.__unpackHDRImage(this.__hdrImage.getParams());
            });
        }
        this.__hdrImage.destructing.connect(() => {
            console.log(this.__hdrImage.getName() + " destructing");
            this.destroy();
        });

    }

    __unpackHDRImage(hdrImageParams) {

        const gl = this.__gl;

        let ldr = hdrImageParams.data.ldr;
        let cdm = hdrImageParams.data.cdm;

        if (!this.__fbo) {

            // Note: iOS devices create FLOAT Fbox.
            // If we want better quality, we could unpack the texture in JavaScript. 
            this.configure({
                format: 'RGBA',
                type: 'FLOAT',
                width: ldr.width,
                height: ldr.height,
                filter: 'LINEAR',
                wrap: 'CLAMP_TO_EDGE'
            });
            this.__fbo = new GLFbo(gl, this);
            this.__fbo.setClearColor([0, 0, 0, 0]);

            this.__srcLDRTex = new GLTexture2D(gl, {
                format: 'RGB',
                type: 'UNSIGNED_BYTE',
                width: ldr.width,
                height: ldr.height,
                filter: 'NEAREST',
                mipMapped: false,
                wrap: 'CLAMP_TO_EDGE',
                data: ldr
            });
            this.__srcCDMTex = new GLTexture2D(gl, {
                format: gl.name == 'webgl2' ? 'RED' : 'ALPHA',
                type: 'UNSIGNED_BYTE',
                width: ldr.width /*8*/ ,
                height: ldr.height /*8*/ ,
                filter: 'NEAREST',
                mipMapped: false,
                wrap: 'CLAMP_TO_EDGE',
                data: cdm
            });
            
            this.__unpackHDRShader = new UnpackHDRShader(gl);
            let shaderComp = this.__unpackHDRShader.compileForTarget('GLHDRImage');
            this.__shaderBinding = generateShaderGeomBinding(gl, shaderComp.attrs, gl.__quadattrbuffers, gl.__quadIndexBuffer);
        } else {
            this.__srcLDRTex.bufferData(ldr);
            this.__srcCDMTex.bufferData(cdm);
        }

        this.__fbo.bindAndClear();

        const renderstate = {};
        this.__unpackHDRShader.bind(renderstate, 'GLHDRImage');
        this.__shaderBinding.bind(renderstate);


        const unifs = renderstate.unifs;
        this.__srcLDRTex.bindToUniform(renderstate, unifs.ldrSampler);
        this.__srcCDMTex.bindToUniform(renderstate, unifs.cdmSampler);

        gl.uniform1f(unifs.exposure.location, 1.0);
        gl.uniform4fv(unifs.tint.location, this.__hdrImage.getHDRTint().asArray());
        gl.drawQuad();

        // // Debug a block of pixels.
        // console.log(this.__hdrImage.getName());
        // gl.finish();
        // let numPixels = 4;
        // let pixels = new Float32Array(4 * numPixels);
        // gl.readPixels(ldr.width / 4, ldr.height/4, numPixels, 1, gl.RGBA, gl.FLOAT, pixels);
        // console.log(pixels);
        // gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        this.__fbo.unbind();

        // if (!this.__hdrImage.isStream()) {
        //     this.__fbo.destroy();
        //     this.__srcLDRTex.destroy();
        //     this.__srcCDMTex.destroy();
        //     this.__fbo = null;
        //     this.__srcLDRTex = null;
        //     this.__srcCDMTex = null;
        // }

        this.updated.emit();
    }
    
    bindToUniform(renderstate, unif, type = 1) {
        return super.bindToUniform(renderstate, unif, type);
    }

    destroy() {
        super.destroy();
        if (this.__fbo) {
            this.__fbo.destroy();
            this.__srcLDRTex.destroy();
            this.__srcCDMTex.destroy();
        }
        if (this.__unpackHDRShader)
            this.__unpackHDRShader.destroy();
        if (this.__shaderBinding)
            this.__shaderBinding.destroy();

        this.__hdrImage.loaded.disconnectScope(this);
        this.__hdrImage.updated.disconnectScope(this);
    }
};

export {
    GLHDRImage
};
// export default GLHDRImage;