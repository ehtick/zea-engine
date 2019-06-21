import {
  Color
} from '../../Math';
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
import './GLSL/modelMatrix.js';

class FatLinesShader extends GLShader {
  constructor(gl) {
    super(gl);
    this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('FatLinesShader.vertexShader', `
precision highp float;

instancedattribute vec2 segmentIndices;
attribute float vertexIDs;

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

<%include file="stack-gl/transpose.glsl"/>
<%include file="modelMatrix.glsl"/>

uniform sampler2D positionsTexture;
uniform int positionsTextureSize;

uniform float LineThickness;

/* VS Outputs */
varying vec3 v_viewPos;
varying vec3 v_viewNormal;
varying vec2 v_texCoord;

void main(void) {
  int vertexID = int(vertexIDs);

  mat4 modelMatrix = getModelMatrix();
  mat4 modelViewMatrix = viewMatrix * modelMatrix;

  int seqentialIndex_0 = int(mod(segmentIndices.x, 2.));
  int seqentialIndex_1 = int(mod(segmentIndices.y, 2.));
  int index_0 = int(segmentIndices.x) / 2;
  int index_1 = int(segmentIndices.y) / 2;

  vec3 viewPos;
  vec4 data_0 = fetchTexel(positionsTexture, positionsTextureSize, index_0);
  vec4 data_1 = fetchTexel(positionsTexture, positionsTextureSize, index_1);

  vec4 pos_0 = modelViewMatrix * vec4(data_0.xyz, 1.0);
  vec4 pos_1 = modelViewMatrix * vec4(data_1.xyz, 1.0);
  // Note: multiply the per-vertex line thickness with the line thickness uniform value;
  float lineThickness_0 = LineThickness * data_0.w;
  float lineThickness_1 = LineThickness * data_1.w;

  if(vertexID < 2){
    viewPos = pos_0.xyz;
  }
  else{
    viewPos = pos_1.xyz;
  }
  if(pos_1 != pos_0){
    vec3 segmentDir = normalize(pos_1.xyz - pos_0.xyz);
    vec3 viewVector = normalize(viewPos);

    if(vertexID < 2){
      vec3 segmentStartDir = segmentDir;
      if(seqentialIndex_0 != 0){
        //if index_0 == 0, get the last index in the line as previous
        int index_prev = (index_0 > 0) ? (index_0-1) : (positionsTextureSize-1);
        vec4 data_prev = fetchTexel(positionsTexture, positionsTextureSize, index_prev);
        vec4 pos_prev = modelViewMatrix * vec4(data_prev.xyz, 1.0);
        segmentStartDir = normalize(segmentDir + normalize(pos_0.xyz - pos_prev.xyz));
      }
      vec3 startBiTangent = normalize(cross(segmentStartDir, viewVector));
      v_viewNormal = normalize(cross(segmentStartDir, startBiTangent));
      // Move the endpoints to overlap a bit more.
      //viewPos -= vec3(segmentStartDir * lineThickness_0 * 0.25);
      if(mod(vertexIDs, 2.0) == 0.0){
        viewPos += vec3(startBiTangent * lineThickness_0);
        v_texCoord.x = 1.0;
      }
      else{
        viewPos -= vec3(startBiTangent * lineThickness_0);
        v_texCoord.x = 0.0;
      }
      v_texCoord.y = 0.0;
    }
    else{
      vec3 segmentEndDir = segmentDir;
      if(seqentialIndex_1 != 0){
        //if index_1 == numPoints-1, get the first index in the line as next
        int index_next = (index_1 < (positionsTextureSize-1)) ? (index_1+1) : 0;
        vec4 data_next = fetchTexel(positionsTexture, positionsTextureSize, index_next);
        vec4 pos_next = modelViewMatrix * vec4(data_next.xyz, 1.0);
        segmentEndDir = normalize(segmentDir + normalize(pos_next.xyz - pos_1.xyz));
      }
      vec3 endBiTangent = normalize(cross(segmentEndDir, viewVector));
      v_viewNormal = normalize(cross(segmentEndDir, endBiTangent));
      // Move the endpoints to overlap a bit more.
      //viewPos += vec3(segmentEndDir * lineThickness_1 * 0.25);
      if(mod(vertexIDs, 2.0) == 0.0){
        viewPos += vec3(endBiTangent * lineThickness_1);
        v_texCoord.x = 1.0;
      }
      else{
        viewPos -= vec3(endBiTangent * lineThickness_1);
        v_texCoord.x = 0.0;
      }
      v_texCoord.y = 1.0;
    }

    // Move the line towards the viewer by the line thickness.
    // this is to avoid depth issues when lines are rendered over meshes. 
    viewPos.z -= (lineThickness_0 + lineThickness_1) * 0.25;
  }

  v_viewPos       = viewPos;
  gl_Position     = projectionMatrix * vec4(viewPos, 1.0);
}
`);

    this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('FatLinesShader.fragmentShader', `
precision highp float;

/* VS Outputs */
varying vec3 v_viewPos;
varying vec3 v_viewNormal;
varying vec2 v_texCoord;

uniform color BaseColor;
uniform mat4 cameraMatrix;

#ifdef ENABLE_ES3
  out vec4 fragColor;
#endif
void main(void) {
#ifndef ENABLE_ES3
  vec4 fragColor;
#endif

  int debugLevel = 0;
  if(debugLevel == 0){

    vec3 viewVector = mat3(cameraMatrix) * normalize(-v_viewPos);
    vec3 normal = mat3(cameraMatrix) * v_viewNormal;
    float NdotV = dot(normalize(normal), normalize(viewVector));

    // Modulate the lighting using the texture coord so the line looks round.
    NdotV *= cos((v_texCoord.x - 0.5) * 2.0);

    vec4 color = BaseColor * NdotV;
    fragColor = vec4(color.rgb, Color.a);
  }
  else{
    fragColor = vec4(v_texCoord.x, 0.0, 0.0, 1.0);
  }

#ifndef ENABLE_ES3
  gl_FragColor = fragColor;
#endif
}
`);
    this.finalize();
  }

  bind(renderstate) {
    if(super.bind(renderstate)) {
      renderstate.supportsInstancing = false;
      return true;
    }
    return false;
  } 


  static getParamDeclarations() {
    const paramDescs = super.getParamDeclarations();
    paramDescs.push({ name: 'BaseColor', defaultValue: new Color(1.0, 1.0, 0.5) })
    paramDescs.push({ name: 'Opacity', defaultValue: 1.0 })
    return paramDescs;
  }
};

sgFactory.registerClass('FatLinesShader', FatLinesShader);
export {
  FatLinesShader
};