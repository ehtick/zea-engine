import { Color } from '../../Math/Color'
import { sgFactory } from '../../SceneTree/index'
import { shaderLibrary } from '../ShaderLibrary.js'
import { GLShader } from '../GLShader.js'
import './GLSL/stack-gl/transpose.js'
import './GLSL/stack-gl/gamma.js'
import './GLSL/drawItemTexture.js'
import './GLSL/modelMatrix.js'

class HandleShader extends GLShader {
  constructor(gl) {
    super(gl)

    this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader(
      'HandleShader.vertexShader',
      `
precision highp float;

attribute vec3 positions;
#ifdef ENABLE_TEXTURES
attribute vec2 texCoords;
#endif

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform int maintainScreenSize;

<%include file="stack-gl/transpose.glsl"/>
<%include file="drawItemId.glsl"/>
<%include file="drawItemTexture.glsl"/>
<%include file="modelMatrix.glsl"/>

/* VS Outputs */
varying vec3 v_viewPos;
#ifdef ENABLE_TEXTURES
varying vec2 v_textureCoord;
#endif


void main(void) {
  int drawItemId = getDrawItemId();
  mat4 modelMatrix = getModelMatrix(drawItemId);
  mat4 modelViewMatrix = viewMatrix * modelMatrix;

  if(maintainScreenSize != 0) {
    float dist = modelViewMatrix[3][2];
    float sc = dist;
    mat4 scmat = mat4(
      sc, 0.0, 0.0, 0.0,
      0.0, sc, 0.0, 0.0,
      0.0, 0.0, sc, 0.0,
      0.0, 0.0, 0.0, 1.0
    );
    modelViewMatrix = modelViewMatrix * scmat;
  }

  vec4 viewPos = modelViewMatrix * vec4(positions, 1.0);
  gl_Position = projectionMatrix * viewPos;

  v_viewPos = viewPos.xyz;
  v_textureCoord = texCoords;
  v_textureCoord.y = 1.0 - v_textureCoord.y;// Flip y
}
`
    )

    this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader(
      'HandleShader.fragmentShader',
      `
precision highp float;

<%include file="stack-gl/gamma.glsl"/>
<%include file="materialparams.glsl"/>

uniform color BaseColor;

#ifdef ENABLE_TEXTURES
uniform sampler2D BaseColorTex;
uniform int BaseColorTexType;
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
    vec4 baseColor = BaseColor;
#else
    vec4 baseColor      = getColorParamValue(BaseColor, BaseColorTex, BaseColorTexType, v_textureCoord);
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
`
    )

    this.finalize()
  }

  static getParamDeclarations() {
    const paramDescs = super.getParamDeclarations()
    paramDescs.push({
      name: 'BaseColor',
      defaultValue: new Color(1.0, 1.0, 0.5),
    })
    paramDescs.push({
      name: 'maintainScreenSize',
      defaultValue: 0,
    })
    return paramDescs
  }

  static isOverlay() {
    return true
  }

  static getGeomDataShaderName() {
    return 'HandleGeomDataShader'
  }

  // static getSelectedShaderName(){
  //     return 'StandardSurfaceSelectedGeomsShader';
  // }
}

sgFactory.registerClass('HandleShader', HandleShader)
export { HandleShader }
