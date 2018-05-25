
import '../Math';

// This class abstracts the rendering of a collection of geometries to screen.
class GLFbo {
    constructor(gl, colorTexture, createDepthTexture = false) {
        this.__gl = gl;
        this.__colorTexture = colorTexture;
        this.__createDepthTexture = createDepthTexture;
        this.__clearColor = [0, 0, 0, 0];
        this.__depthTexture = undefined;

        this.setup = this.setup.bind(this);
        this.resize = this.resize.bind(this);

        this.__colorTexture.resized.connect(this.resize);

        this.setup();

    }

    setClearColor(clearColor) {
        this.__clearColor = clearColor;
    }

    getWidth() {
        return this.__colorTexture.width;
    }

    getHeight() {
        return this.__colorTexture.height;
    }

    getSize(){
        return [this.__colorTexture.width, this.__colorTexture.height];
    }

    getColorTexture() {
        return this.__colorTexture;
    }
    
    getDepthTextureGL() {
        return this.__depthTexture;
    }
    get width() {
        return this.__colorTexture.width;
    }

    get height() {
        return this.__colorTexture.height;
    }

    get size(){
        return [this.__colorTexture.width, this.__colorTexture.height];
    }

    get colorTexture() {
        return this.__colorTexture;
    }

    setColorTexture(colorTexture) {
        this.__colorTexture = colorTexture;
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.__colorTexture.glTex, 0);
    }

    get depthTextureGL() {
        return this.__depthTexture;
    }

    setup() {
        let gl = this.__gl;

        this.__fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.__fbo);

        if(gl.name == 'webgl2'){
            if (this.__colorTexture.getFormat() == 'FLOAT' && this.__colorTexture.getFilter() == 'LINEAR') {
                if (!gl.__ext_float_linear)
                    throw ("Unable to use filtering on floating point textures");
            }
        }
        else {
            if (this.__colorTexture.getFormat() == 'FLOAT') {
                if(gl.__ext_float){
                    if (this.__colorTexture.getFilter() == 'LINEAR') {
                        if (!gl.__ext_float_linear)
                            throw ("Unable to use filtering on floating point textures");
                    }
                }
                else if(gl.__ext_half_float){
                    if (this.__colorTexture.getFilter() == 'LINEAR') {
                        if (!gl.__ext_texture_half_float_linear)
                            throw ("Unable to use filtering on half-floating point textures");
                    }
                }
                else{
                    throw("floating point textures unsupported.");
                }
            }
        }

        gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.__colorTexture.glTex, 0);

        // Create the depth texture
        if (this.__createDepthTexture) {
            if (gl.name != 'webgl2' && !gl.__ext_WEBGL_depth_texture) {
                // Create the depth buffer
                var depthBuffer = gl.createRenderbuffer();
                gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
                gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height);
                gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);
            } else {
                this.__depthTexture = gl.createTexture();
                gl.bindTexture(gl.TEXTURE_2D, this.__depthTexture);
                // TODO: Copy params from the color image.
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                if (gl.name == 'webgl2')
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT24, this.width, this.height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_INT, null);
                else
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, this.width, this.height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_INT, null);

                gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.__depthTexture, 0);
            }
        }

        this.__checkFramebuffer();

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    }

    // Triggered Automatically when the texture reizes.
    // TODO: fbos should manage the textures assigned to them
    // e.g. resixzing and preserving data.
    resize(/*width, height, preserve*/) {
        let gl = this.__gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.__fbo);

        // The coolor texture is destoryed and re-created when it is resized,
        // so we must re-bind it here..
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.__colorTexture.glTex, 0);
        if (this.__depthTexture) {
            gl.bindTexture(gl.TEXTURE_2D, this.__depthTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, this.width, this.height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_INT, null);
        }
        this.__checkFramebuffer();
        //gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    __checkFramebuffer() {
        let gl = this.__gl;

        let check = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        if (check !== gl.FRAMEBUFFER_COMPLETE) {
            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            console.warn("Error creating Fbo width:" + this.width + ", height:" + this.height);
            switch(check){
            case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
                throw ("The attachment types are mismatched or not all framebuffer attachment points are framebuffer attachment complete.");
            case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
                throw ("There is no attachment.");
            case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
                throw ("Height and width of the attachment are not the same.");
            case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
                throw ("The format of the attachment is not supported or if depth and stencil attachments are not the same renderbuffer.");
            case 36061: //gl.GL_FRAMEBUFFER_UNSUPPORTED:
                throw ("The framebuffer is unsupported");
            default:
                throw ("Incomplete Frambuffer");
            }
        }

    }

    bind(renderstate) {
        let gl = this.__gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.__fbo);
        gl.viewport(0, 0, this.width, this.height); // Match the viewport to the texture size
    }

    clear() {
        let gl = this.__gl;
        gl.colorMask(true, true, true, true); // Don't write to the color channels at all
        gl.clearColor(...this.__clearColor);
        if (this.__createDepthTexture) {
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        } else {
            gl.clear(gl.COLOR_BUFFER_BIT);
        }
    }

    bindAndClear(renderstate) {
        this.bind(renderstate);
        this.clear(renderstate);
    }

    unbind() {
        let gl = this.__gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    destroy() {
        let gl = this.__gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.deleteFramebuffer(this.__fbo);
        this.__fbo = null;
        this.__colorTexture.resized.disconnect(this.resize);
    }
};

export {
    GLFbo
};
// export default GLFbo;
