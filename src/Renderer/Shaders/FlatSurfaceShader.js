import {
    Color
} from '../../Math/Color';
import {
    sgFactory
} from '../../SceneTree';
import {
    shaderLibrary
} from '../ShaderLibrary.js';
import {
    GLShader
} from '../GLShader.js';
import './GLSL/stack-gl/transpose.js';
import './GLSL/stack-gl/gamma.js';
import './GLSL/modelMatrix.js';

class FlatSurfaceShader extends GLShader {
    constructor(gl) {
        super(gl);

        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('FlatSurfaceShader.vertexShader', `
precision highp float;

attribute vec3 positions;
#ifdef ENABLE_TEXTURES
attribute vec2 texCoords;
#endif

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

<%include file="stack-gl/transpose.glsl"/>
<%include file="modelMatrix.glsl"/>

/* VS Outputs */
varying vec3 v_viewPos;
#ifdef ENABLE_TEXTURES
varying vec2 v_textureCoord;
#endif


void main(void) {
    mat4 modelMatrix = getModelMatrix();
    mat4 modelViewMatrix = viewMatrix * modelMatrix;

    vec4 viewPos = (modelViewMatrix * vec4(positions, 1.0));
    gl_Position = projectionMatrix * viewPos;

    v_viewPos = viewPos.xyz;
    v_textureCoord = texCoords;
    v_textureCoord.y = 1.0 - v_textureCoord.y;// Flip y
}
`);

        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('FlatSurfaceShader.fragmentShader', `
precision highp float;

<%include file="stack-gl/gamma.glsl"/>
<%include file="materialparams.glsl"/>

uniform color _baseColor;

#ifdef ENABLE_TEXTURES
uniform sampler2D _baseColorTex;
uniform bool _baseColorTexConnected;
#endif

/* VS Outputs */
varying vec3 v_viewPos;
#ifdef ENABLE_TEXTURES
varying vec2 v_textureCoord;
#endif


#ifdef ENABLE_ES3
    out vec4 fragColor;
#endif
void main(void) {

#ifndef ENABLE_TEXTURES
    vec4 baseColor = _baseColor;
#else
    vec4 baseColor      = getColorParamValue(_baseColor, _baseColorTex, _baseColorTexConnected, v_textureCoord);
#endif

#ifndef ENABLE_ES3
    vec4 fragColor;
#endif
    fragColor = baseColor;

#ifdef ENABLE_INLINE_GAMMACORRECTION
    fragColor.rgb = toGamma(fragColor.rgb);
#endif

#ifndef ENABLE_ES3
    gl_FragColor = fragColor;
#endif
}
`);

        this.addParameter('baseColor', new Color(1.0, 1.0, 0.5));
        this.nonSelectable = true;
        this.finalize();
    }
};

sgFactory.registerClass('FlatSurfaceShader', FlatSurfaceShader);
export {
    FlatSurfaceShader
};