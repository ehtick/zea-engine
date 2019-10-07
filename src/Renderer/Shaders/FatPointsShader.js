import { Color } from '../../Math'
import { sgFactory } from '../../SceneTree'
import { shaderLibrary } from '../ShaderLibrary'
import { GLShader } from '../GLShader.js'

import './GLSL/stack-gl/inverse.js'
import './GLSL/stack-gl/transpose.js'

class FatPointsShader extends GLShader {
  constructor(gl) {
    super(gl)
    this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader(
      'FatPointsShader.vertexShader',
      `
precision highp float;

instancedattribute vec3 positions;

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

<%include file="stack-gl/transpose.glsl"/>
<%include file="stack-gl/inverse.glsl"/>
<%include file="modelMatrix.glsl"/>
<%include file="utils/quadVertexFromID.glsl"/>

uniform float PointSize;

/* VS Outputs */
varying vec2 v_texCoord;
varying vec3 v_viewPos;
varying float v_drawItemID;
varying vec4 v_highlightColor;

void main(void) {
  vec2 quadPointPos = getQuadVertexPositionFromID();
  v_texCoord = quadPointPos + 0.5;

  mat4 modelMatrix = getModelMatrix();
  mat4 modelViewMatrix = viewMatrix * modelMatrix;
  
  vec4 viewPos = modelViewMatrix * vec4(positions, 1.);

  viewPos += vec4(vec3(quadPointPos, 0.0) * PointSize, 0.);

  // Generate a quad which is 0.5 * PointSize closer towards
  // us. This allows points to be visualized even if snug on 
  // a surface. (else they get fully clipped)
  viewPos.z += 0.5 * PointSize;

  v_drawItemID = float(getId());
  v_viewPos = -viewPos.xyz;
  v_highlightColor = getHighlightColor();
  
  gl_Position = projectionMatrix * viewPos;
}
`
    )

    this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader(
      'FatPointsShader.fragmentShader',
      `
precision highp float;

<%include file="math/constants.glsl"/>

uniform color BaseColor;
uniform float Rounded;
uniform float BorderWidth;

/* VS Outputs */
varying vec2 v_texCoord;
varying vec3 v_viewPos;
varying float v_drawItemID;

#ifdef ENABLE_ES3
out vec4 fragColor;
#endif

void main(void) {

#ifndef ENABLE_ES3
  vec4 fragColor;
#endif

  float dist = length(v_texCoord - 0.5);
  if(dist > 0.5)
    discard;
  if(dist > 0.5 - (BorderWidth * 0.5))
    fragColor = vec4(0.,0.,0.,1.);
  else {
    // Modulate the lighting using the texture coord so the point looks round.
    float NdotV = cos(dist * PI);

    fragColor = BaseColor * mix(1.0, NdotV, Rounded);
  }
  

#ifndef ENABLE_ES3
  gl_FragColor = fragColor;
#endif
}
`
    )
  }

  bind(renderstate) {
    if (super.bind(renderstate)) {
      renderstate.supportsInstancing = false
      return true
    }
    return false
  }

  static getParamDeclarations() {
    const paramDescs = super.getParamDeclarations()
    paramDescs.push({
      name: 'BaseColor',
      defaultValue: new Color(1.0, 1.0, 0.5),
    })
    paramDescs.push({ name: 'PointSize', defaultValue: 0.05 })
    paramDescs.push({ name: 'Rounded', defaultValue: 1.0 })
    paramDescs.push({ name: 'BorderWidth', defaultValue: 0.2 })
    return paramDescs
  }

  static getGeomDataShaderName() {
    return 'FatPointsGeomDataShader'
  }

  static getSelectedShaderName() {
    return 'FatPointsSelectedShader'
  }
}



class FatPointsGeomDataShader extends FatPointsShader {
  constructor(gl) {
    super(gl)

    this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader(
      'FatPointsGeomDataShader.fragmentShader',
      `
precision highp float;

<%include file="math/constants.glsl"/>
<%include file="GLSLBits.glsl"/>

uniform int floatGeomBuffer;
uniform int passId;

/* VS Outputs */
varying vec2 v_texCoord;
varying vec3 v_viewPos;
varying float v_drawItemID;

#ifdef ENABLE_ES3
out vec4 fragColor;
#endif

void main(void) {

#ifndef ENABLE_ES3
  vec4 fragColor;
#endif

  float dist = length(v_texCoord - 0.5);
  if(dist > 0.5)
    discard;
    

  float viewDist = length(v_viewPos);

  if(floatGeomBuffer != 0) {
    fragColor.r = float(passId); 
    fragColor.g = float(v_drawItemID);
    fragColor.b = 0.0;// TODO: store poly-id or something.
    fragColor.a = viewDist;
  }
  else {
    ///////////////////////////////////
    // UInt8 buffer
    fragColor.r = (mod(v_drawItemID, 256.) + 0.5) / 255.;
    fragColor.g = (floor(v_drawItemID / 256.) + 0.5) / 255.;

    // encode the dist as a 16 bit float
    vec2 float16bits = encode16BitFloatInto2xUInt8(viewDist);
    fragColor.b = float16bits.x;
    fragColor.a = float16bits.y;
  }


#ifndef ENABLE_ES3
  gl_FragColor = fragColor;
#endif
}
`
    )
  }

  bind(renderstate) {
    if (super.bind(renderstate)) {
      renderstate.supportsInstancing = false
      return true
    }
    return false
  }
}


class FatPointsSelectedShader extends FatPointsShader {
  constructor(gl) {
    super(gl)

    this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader(
      'FatPointsSelectedShader.fragmentShader',
      `
precision highp float;

<%include file="math/constants.glsl"/>
<%include file="GLSLBits.glsl"/>

uniform int floatGeomBuffer;
uniform int passId;

/* VS Outputs */
varying vec2 v_texCoord;
varying vec3 v_viewPos;
varying float v_drawItemID;
varying vec4 v_highlightColor;

#ifdef ENABLE_ES3
out vec4 fragColor;
#endif

void main(void) {

#ifndef ENABLE_ES3
  vec4 fragColor;
#endif

  float dist = length(v_texCoord - 0.5);
  if(dist > 0.5)
    discard;
  
  fragColor = v_highlightColor;

#ifndef ENABLE_ES3
  gl_FragColor = fragColor;
#endif
}
`
    )
  }

  bind(renderstate) {
    if (super.bind(renderstate)) {
      renderstate.supportsInstancing = false
      return true
    }
    return false
  }
}

sgFactory.registerClass('FatPointsShader', FatPointsShader)
sgFactory.registerClass('FatPointsGeomDataShader', FatPointsGeomDataShader)
sgFactory.registerClass('FatPointsSelectedShader', FatPointsSelectedShader)

export { FatPointsShader }
