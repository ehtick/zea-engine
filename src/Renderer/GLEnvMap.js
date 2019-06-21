
import {
  GLProbe
} from './GLProbe.js';
import {
  GLShader
} from './GLShader.js';
import {
  GLHDRImage
} from './GLHDRImage.js';
import {
  OctahedralEnvMapShader
} from './Shaders/EnvMapShader.js';
import {
  generateShaderGeomBinding
} from './GeomShaderBinding.js';

class GLEnvMap extends GLProbe {
  constructor(renderer, envMap, preproc) {
    super(renderer.gl, 'EnvMap');
    this.__renderer = renderer;
    this.__envMap = envMap;
    this.__backgroundFocus = 0.0;

    let gl = renderer.gl;
    if (!gl.__quadVertexIdsBuffer)
      gl.setupInstancedQuad();

    let srcGLTex = this.__envMap.getMetadata('gltexture');
    if(!srcGLTex) {
      srcGLTex = new GLHDRImage(gl, this.__envMap);
    }
    this.__srcGLTex = srcGLTex; // for debugging

    this.__envMapShader = new OctahedralEnvMapShader(gl);
    let envMapShaderComp = this.__envMapShader.compileForTarget('GLEnvMap', preproc);
    this.__envMapShaderBinding = generateShaderGeomBinding(gl, envMapShaderComp.attrs, gl.__quadattrbuffers, gl.__quadIndexBuffer);


    // srcGLTex.updated.connect(() => {
    //     this.convolveProbe(srcGLTex);
    // });
    if (this.__envMap.isLoaded()) {
      this.convolveProbe(srcGLTex);
    } else {
      this.__envMap.loaded.connect(() => {
        // console.log(this.__envMap.getName() + " loaded");
        this.convolveProbe(srcGLTex);
        this.loaded.emit();
      });
    }
    srcGLTex.destructing.connect(() => {
      console.log(this.__envMap.getName() + " destructing");
      this.destroy();
    });

  }

  getEnvMap(){
    return this.__envMap;
  }

  getBackgroundFocus() {
    return this.__backgroundFocus;
  }

  setBackgroundFocus(val) {
    this.__backgroundFocus = val;
    this.__renderer.requestRedraw();
  }

  draw(renderstate) {
    if (this.__envMap.isLoaded()) {

      const gl = this.__gl;
      let debug = false;
      if (debug) {
        let screenQuad = gl.screenQuad;
        screenQuad.bindShader(renderstate);
        const debugId = 2;
        switch(debugId) {
          case 0: screenQuad.draw(renderstate, this.__srcGLTex.__srcLDRTex); break;
          case 1: screenQuad.draw(renderstate, this.__srcGLTex.__srcCDMTex); break;
          case 2: screenQuad.draw(renderstate, this.__srcGLTex); break;
          case 3: screenQuad.draw(renderstate, this.__lodPyramid); break;
          case 4: screenQuad.draw(renderstate, this.__fbos[0].getColorTexture()); break;
          case 5: screenQuad.draw(renderstate, this); break;
        }
      } else {
        ///////////////////
        this.__envMapShader.bind(renderstate, 'GLEnvMap');
        const unifs = renderstate.unifs;
        // this.__srcGLTex.bind(renderstate, renderstate.unifs.envMap.location);
        //this.__lodPyramid.bind(renderstate, renderstate.unifs.envMap.location);
        this.bindProbeToUniform(renderstate, unifs.envMapPyramid);
        // this.bindToUniform(renderstate, unifs.envMapPyramid);
        

        {
          let unif = unifs.focus;
          if (unif)
            gl.uniform1f(unif.location, this.__backgroundFocus);
        }
        {
          let unif = unifs.exposure;
          if (unif)
            gl.uniform1f(unif.location, renderstate.exposure);
        }

        this.__envMapShaderBinding.bind(renderstate);
        gl.depthMask(false);

        renderstate.bindViewports(unifs, ()=>{
          gl.drawQuad();
        })

      }
    }
  }

  
  // An EnvMap can be bound as a regular texture, but we want the
  // orriginal source data, not the atlas of convolved images.
  bindToUniform(renderstate, unif, bindings) {
    return this.__srcGLTex.bindToUniform(renderstate, unif, bindings);
  }

  destroy() {
    super.destroy();
    this.__srcGLTex.loaded.disconnectScope(this);
    this.__srcGLTex.updated.disconnectScope(this);
    this.__srcGLTex.destroy();
  }
};

export {
  GLEnvMap
};
// export default GLEnvMap;