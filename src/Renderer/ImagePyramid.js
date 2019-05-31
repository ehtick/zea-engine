import {
  Vec2,
  Rect2
} from '../Math';
import {
  GLTexture2D
} from './GLTexture2D.js';
import {
  GLFbo
} from './GLFbo.js';
import {
  GLShader
} from './GLShader.js';
import {
  ImageAtlas
} from './ImageAtlas.js';
import {
  generateShaderGeomBinding
} from './GeomShaderBinding.js';
import {
  shaderLibrary
} from './ShaderLibrary'

import './Shaders/GLSL/ImagePyramid.js';

let Math_log2 = function(value) {
  // IE11 doesn't support Math.log2.
  return Math.log2(value)
    //return Math.log( value ) / Math.log( 2 ) - 2;
};


// class PyramidShader extends GLShader {

//     constructor(gl) {
//         super(gl);
//         this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('PyramidShader.vertexShader', `

// <%include file="utils/quadVertexFromID.glsl"/>

// uniform vec2 pos;
// uniform vec2 size;

// /* VS Outputs */
// varying vec2 v_texCoord;

// void main()
// {
//     vec2 position = getQuadVertexPositionFromID();
//     v_texCoord = position+0.5;
//     gl_Position = vec4(vec2(-1.0,-1.0)+(pos*2.0)+(v_texCoord*size*2.0), 0.0, 1.0);
// }

// `);
//         this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('PyramidShader.fragmentShader', `

// precision highp float;

// uniform sampler2D texture;
// uniform vec2 textureDim;

// varying vec2 v_texCoord;

// void main(void) {
//     vec2 pixelCoord = v_texCoord*textureDim;

//     vec2 acoord = abs(pixelCoord-textureDim*0.5);
//     float limit = textureDim.x*0.5-1.0;
//     vec2 sourceCoord = clamp(pixelCoord-1.0, 0.5, textureDim.x-2.5);
//     vec2 uv = sourceCoord/(textureDim-2.0);

//     if(acoord.x > limit && acoord.y > limit){
//         uv = 1.0 - uv;
//     }
//     else if(acoord.x > limit){
//         uv.y = 1.0 - uv.y;
//     }
//     else if(acoord.y > limit){
//         uv.x = 1.0 - uv.x;
//     }
//     vec4 texel = texture2D(texture, uv);
//     gl_FragColor = vec4(texel.rgb/texel.a, 1);
// }

// `);
//     }
// };

class ImagePyramid extends ImageAtlas {
  constructor(gl, name, srcGLTex, destroySrcImage = true, minTileSize = 16) {
    super(gl, name);

    this.__srcGLTex = srcGLTex;
    this.__fbos = [];

    srcGLTex.updated.connect(() => {
      this.renderAtlas(destroySrcImage);
    });
    if (this.__srcGLTex.isLoaded()) {
      this.generateAtlasLayout(minTileSize);
      this.renderAtlas(destroySrcImage);
    } else {
      this.__srcGLTex.updated.connect(() => {
        this.generateAtlasLayout(minTileSize);
        this.renderAtlas(destroySrcImage);
      });
    }
    srcGLTex.destructing.connect(() => {
      console.log(this.__srcGLTex.getName() + " ImagePyramid destructing");
      this.destroy();
    });
  }

  generateAtlasLayout(minTileSize) {
    const gl = this.__gl;

    this.size = this.__srcGLTex.height;
    let aspectRatio = this.__srcGLTex.width / this.__srcGLTex.height;

    this.addSubImage(this.__srcGLTex);
    let numLevels = Math.round(Math_log2(this.size)) - 1; // compute numLevels-1 levels(because we use the source image as the base level);
    for (let i = numLevels; i >= 0; --i) {
      let size = Math.pow(2, i);
      if (size < minTileSize)
        break;
      // Create a target texture for this level of the pyramid.
      // and then render to it using the base level as a source image.
      let level = new GLTexture2D(gl, {
        format: this.__srcGLTex.getFormat(),
        type: this.__srcGLTex.getType(),
        width: size * aspectRatio,
        height: size,
        filter: 'LINEAR',
        wrap: 'CLAMP_TO_EDGE'
      });
      this.addSubImage(level);
      this.__fbos.push(new GLFbo(gl, level));
    }

    super.generateAtlasLayout();
  }

  renderAtlas(cleanup = true) {
    const gl = this.__gl;
    const renderstate = {};
    gl.screenQuad.bindShader(renderstate);

    for (let i = 0; i < this.__fbos.length; i++) {
      this.__fbos[i].bindAndClear();
      gl.screenQuad.draw(renderstate, this.getSubImage(i)); // Note: we are binding the previous image. (we have 1 more images than fbos.)
    }

    super.renderAtlas(cleanup);
  }

  destroy() {
    super.destroy();
    for (let fbo of this.__fbos) {
      fbo.destroy();
    }
  }
};

export {
  ImagePyramid
};
// export default ImagePyramid;