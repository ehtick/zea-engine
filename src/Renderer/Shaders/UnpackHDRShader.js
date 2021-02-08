/* eslint-disable require-jsdoc */
import { shaderLibrary } from '../ShaderLibrary.js'
import { GLShader } from '../GLShader.js'

import './GLSL/utils/quadVertexFromID.js'
import './GLSL/utils/unpackHDR.js'

/** Shader for unpacking HDR images using Boost HDR algorithm.
 * @extends GLShader
 * @private
 */
class UnpackHDRShader extends GLShader {
  constructor(gl) {
    super(gl)
    this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader(
      'UnpackHDRShader.vertexShader',
      `
precision highp float;

<%include file="utils/quadVertexFromID.glsl"/>

/* VS Outputs */
varying vec2 v_texCoord;
 
void main()
{
    vec2 position = getQuadVertexPositionFromID();
    v_texCoord = position+0.5;
    gl_Position = vec4(position*2.0, 0.0, 1.0);
}
`
    )
    this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader(
      'UnpackHDRShader.fragmentShader',
      `
precision highp float;

varying vec2 v_texCoord;
uniform sampler2D ldrSampler;
uniform sampler2D cdmSampler;
uniform vec4 srcRegion; // pos, and size of the source region

<%include file="utils/unpackHDR.glsl"/>

#ifdef ENABLE_ES3
    out vec4 fragColor;
#endif
void main(void) {

#ifndef ENABLE_ES3
    vec4 fragColor;
#endif

    vec2 srcUv = srcRegion.xy + (v_texCoord * srcRegion.zw);

    fragColor = vec4(decodeHDR(ldrSampler, cdmSampler, srcUv), 1.0);

#ifndef ENABLE_ES3
    gl_FragColor = fragColor;
#endif
}

`
    )
  }
}

export { UnpackHDRShader }
