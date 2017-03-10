import {
    Signal
} from '../Math/Math.js';

import {
    RefCounted,
    Image2D
} from '../SceneTree/SceneTree.js';


class GLTexture2D extends RefCounted {
    constructor(gl, params) {
        super();
        this.__gl = gl;

        this.updated = new Signal();
        this.resized = new Signal();
        
        this.__gltex = this.__gl.createTexture();
        this.width = 0;
        this.height = 0;
        this.__loaded = false;
        this.__bound = false;
        if (params != undefined){
            if (params instanceof Image2D){
                this.__texture = params;
                if (this.__texture.isLoaded()) {
                    this.configure(this.__texture.getParams());
                }
                else {
                    this.__texture.loaded.connect(() => {
                        this.configure(this.__texture.getParams());
                    }, this);
                }
                this.__texture.destructing.connect(() => {
                    console.log(this.__texture.name + " destructing");
                    this.destroy();
                }, this);
            }
            else
                this.configure(params);
        }
    }

    isLoaded(){
        return this.__loaded;
    }
    getTexture(){
        return this.__texture;
    }

    configure(params) {

        if (!('channels' in params) || !('width' in params) || !('height' in params))
            throw ("Invalid texture params");

        let width = params['width'];
        let height = params['height'];
        let data = params['data'];

        let gl = this.__gl;
        let maxSize = gl.getParameter(gl.MAX_TEXTURE_SIZE)
        if(width <= 0 || width > maxSize || height <= 0 || height > maxSize) {
            throw new Error('gl-texture2d: Invalid texture size')
        }

        this.channels = params['channels'];
        this.format = params['format'];
        this.filter = ('filter' in params) ? params['filter'] : 'LINEAR';
        let wrap = ('wrap' in params) ? params['wrap'] : 'CLAMP_TO_EDGE';
        let flipY = ('flipY' in params) ? params['flipY'] : false;
        this.mipMapped = ('mipMapped' in params) ? params['mipMapped'] : false;

        this.__format = gl[this.format];
        if (this.format == 'FLOAT') {
            if (gl.__ext_float){
                if (!gl.__ext_float_linear)
                    throw ("OES_texture_float_linear is not available");
            }
            else{
                if(gl.__ext_half_float){
                    this.__format = gl.__ext_half_float.HALF_FLOAT_OES;    
                    gl.__ext_texture_half_float_linear = gl.getExtension("OES_texture_half_float_linear");
/*
                    if(!data){
                        let buffer = new Float16Array(width * height * 4); // have enough bytes
                        let canvas = document.createElement('canvas'),
                            ctx = canvas.getContext('2d');
                        canvas.width = width;
                        canvas.height = height;

                        // create imageData object
                        let idata = ctx.createImageData(width, height);

                        // set our buffer as source
                        idata.data.set(buffer);

                        // update canvas with new data
                        ctx.putImageData(idata, 0, 0);

                        // create a new img object
                        let image=new Image();
                        //image.onload = imageLoaded;       // optional callback function
                        image.src = canvas.toDataURL(); // produces a PNG file
                        data = image;
                    }
                    */
                }
                else
                    throw ("OES_texture_float is not available");

            }
        } else if (this.format == 'sRGB') {
            if (!gl.__ext_sRGB)
                throw ("EXT_sRGB is not available");
        }

        // Load the image into the GPU for rendering.
        gl.bindTexture(gl.TEXTURE_2D, this.__gltex);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl[this.filter]);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl[this.filter]);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl[wrap]);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl[wrap]);

        this.resize(width, height, data, false);
        this.__loaded = true;
        
        this.updated.emit();
    }

    bufferData(data, bind=true){
        let gl = this.__gl;
        if(bind)
            gl.bindTexture(gl.TEXTURE_2D, this.__gltex);
        let channels = (typeof this.channels) == "string" ? gl[this.channels] : this.channels;
        if (data != undefined) {
            if (data instanceof Image) {
                gl.texImage2D(gl.TEXTURE_2D, 0, channels, channels, this.__format, data);
            }
            else {
                // Note: data images must have an even size width/height to load correctly. 
                // this doesn't mean they must be pot textures...
                //console.log(this.width + "x"+ this.height+ ":" + data.length + " channels:" + this.channels + " format:" + this.format);
                gl.texImage2D(gl.TEXTURE_2D, 0, channels, this.width, this.height, 0, channels, this.__format, data);
            }

            if (this.mipMapped)
                gl.generateMipmap(gl.TEXTURE_2D);
        } 
        else
            gl.texImage2D(gl.TEXTURE_2D, 0, channels, this.width, this.height, 0, channels, this.__format, null);
    }

    resize(width, height, data, bind=true) {
        let gl = this.__gl;
        let sizeChanged = this.width != width || this.height != height;
        if(sizeChanged){
            this.width = width;
            this.height = height;
            let maxSize = gl.getParameter(gl.MAX_TEXTURE_SIZE)
            if(this.width < 0 || this.width > maxSize || this.height < 0 || this.height > maxSize) {
                throw new Error('gl-texture2d: Invalid texture size');
            }
        }
        if(bind)
            gl.bindTexture(gl.TEXTURE_2D, this.__gltex);

        this.bufferData(data, false);
        if(sizeChanged)
            this.resized.emit();
    }

    getSize(){
        return [this.width, this.height]
    }

    get glTex() {
        return this.__gltex;
    }

    bind(renderstate, location) {
        if(!this.__loaded){
            return;
        }
        if(!this.__gltex){
            throw("Unable to bind non-initialized or deleted texture.");
        }
        let unit = renderstate['boundTextures']++;
        let texId = this.__gl.TEXTURE0 + unit;
        let gl = this.__gl;
        gl.activeTexture(texId);
        gl.bindTexture(gl.TEXTURE_2D, this.__gltex);
        gl.uniform1i(location, unit);
    }

    destroy(){
        super.destroy();
        this.__gl.deleteTexture(this.__gltex);
        this.__gltex = undefined;
    }
};

export {
    GLTexture2D
};
