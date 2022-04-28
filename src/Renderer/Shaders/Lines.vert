
precision highp float;
precision highp int;

attribute vec3 positions;
attribute vec3 positionsNext;

import 'GLSLUtils.glsl'
import 'geomItemId.glsl'
import 'drawItemTexture.glsl'
import 'modelMatrix.glsl'

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform int isOrthographic;

#ifdef ENABLE_MULTI_DRAW
import 'materialparams.glsl'
#else
uniform float Overlay;
#endif

/* VS Outputs */
varying float v_geomItemId;
varying vec4 v_geomItemData;
varying vec3 v_viewPos;
varying vec3 v_worldPos;
varying vec3 v_nextVertexDist;

void main(void) {
  int geomItemId = getGeomItemId();
  v_geomItemId = float(geomItemId);
  v_geomItemData  = getInstanceData(geomItemId);

  mat4 modelMatrix = getModelMatrix(geomItemId);
  mat4 modelViewMatrix = viewMatrix * modelMatrix;
  vec4 viewPos = modelViewMatrix * vec4(positions, 1.0);
  vec4 viewPosNext = modelViewMatrix * vec4(positionsNext, 1.0);

#ifdef ENABLE_ES3
  float nextVertexDist = length(viewPosNext.xyz - viewPos.xyz);
  if (imod(gl_VertexID, 2) == 0) {
    v_nextVertexDist.x = nextVertexDist;
    v_nextVertexDist.y = 0.0;
  } else {
    v_nextVertexDist.x = 0.0;
    v_nextVertexDist.y = nextVertexDist;
  }
  v_nextVertexDist.z = float(gl_VertexID);
#endif

  v_viewPos = viewPos.xyz;
  gl_Position = projectionMatrix * viewPos;
    

  //////////////////////////////////////////////
  // Overlay

#ifdef ENABLE_MULTI_DRAW
  vec2 materialCoords = v_geomItemData.zw;
  vec4 materialValue1 = getMaterialValue(materialCoords, 1);
  float overlay = materialValue1.y;
#else
  float overlay = Overlay;
#endif

   
#if defined(DRAW_GEOMDATA)
  float _overlay = mix(overlay, 1.0, 0.0001);
#else
  float _overlay = overlay;
#endif

  if (isOrthographic > 0){
    gl_Position.z -= _overlay;
  } else {
    gl_Position.z = mix(gl_Position.z, -gl_Position.z, _overlay);
  }

  //////////////////////////////////////////////
  
  
  vec4 pos = vec4(positions, 1.);
  v_worldPos      = (modelMatrix * pos).xyz;
}
