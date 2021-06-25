import { GLShader } from '../GLShader.js'

import './GLSL/utils/quadVertexFromID.js'

class FattenLinesShader extends GLShader {
  /**
   * Create a GL shader.
   * @param {WebGLRenderingContext} gl - The webgl rendering context.
   */
  constructor(gl) {
    super(gl)
    this.setShaderStage(
      'VERTEX_SHADER',
      `
precision highp float;
attribute vec3 positions;    //(location = 0)

/* VS Outputs */
varying vec2 v_texCoord;
 
void main()
{
    v_texCoord = positions.xy+0.5;
    gl_Position = vec4(positions.xy*2.0, 0.0, 1.0);
}
`
    )
    this.setShaderStage(
      'FRAGMENT_SHADER',
      `
precision highp float;

uniform sampler2D colorTexture;
uniform sampler2D depthTexture;
uniform vec2 screenSize;

uniform float growth;

varying vec2 v_texCoord;

bool sampleNeiPixel(vec2 fragCoord, inout vec4 res) {
    res = texture2D(colorTexture, fragCoord/screenSize);
    if(res.a > 0.0) {
        return true;
    }
    return false;
}

vec4 samplePixels(vec2 fragCoord) {
    vec4 res = vec4(0.0);
    
    if (sampleNeiPixel(fragCoord, res)) return res; // M
    
    // Search surrounding pixels for geoms
    if (sampleNeiPixel(fragCoord+vec2( 1, 0), res)) return res; // E
    if (sampleNeiPixel(fragCoord+vec2(-1, 0), res)) return res; // W
    if (sampleNeiPixel(fragCoord+vec2( 0, 1), res)) return res; // N
    if (sampleNeiPixel(fragCoord+vec2( 0,-1), res)) return res; // S
    if (sampleNeiPixel(fragCoord+vec2( 1, 1), res)) return res; // NW
    if (sampleNeiPixel(fragCoord+vec2(-1, 1), res)) return res; // NE
    if (sampleNeiPixel(fragCoord+vec2( 1,-1), res)) return res; // SW
    if (sampleNeiPixel(fragCoord+vec2(-1,-1), res)) return res; // SE
    
    return res;
}


#ifdef ENABLE_ES3
    out vec4 fragColor;
#endif
void main(void) {
#ifndef ENABLE_ES3
    vec4 fragColor;
#endif

    fragColor = samplePixels(gl_FragCoord.xy);
    if(fragColor.a < 0.0001){
        discard; 
    }

#ifndef ENABLE_ES3
    gl_FragColor = fragColor;
#endif
}
`
    )
    this.finalize()
  }
}

export { FattenLinesShader }