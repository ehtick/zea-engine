
precision highp float;
precision highp int;

attribute vec3 positions;
#ifdef ENABLE_TEXTURES
attribute vec2 texCoords;
#endif

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform int isOrthographic;

import 'GLSLUtils.glsl'

import 'geomItemId.glsl'
import 'drawItemTexture.glsl'
import 'modelMatrix.glsl'

#ifdef ENABLE_MULTI_DRAW
import 'materialparams.glsl'
#else
uniform float Overlay;
#endif

/* VS Outputs */
varying vec4 v_drawItemIds;
varying vec4 v_geomItemData;
varying vec3 v_viewPos;
#ifdef ENABLE_TEXTURES
varying vec2 v_textureCoord;
#endif
varying vec3 v_worldPos;


void main(void) {
  v_drawItemIds = getDrawItemIds();
  int geomItemId = int(v_drawItemIds.x + 0.5);
  v_geomItemData  = getInstanceData(geomItemId);

  mat4 modelMatrix = getModelMatrix(geomItemId);
  mat4 modelViewMatrix = viewMatrix * modelMatrix;

  vec4 pos = vec4(positions, 1.);
  vec4 viewPos = (modelViewMatrix * pos);
  gl_Position = projectionMatrix * viewPos;

  v_viewPos = viewPos.xyz;
#ifdef ENABLE_TEXTURES
  v_textureCoord = texCoords;
  v_textureCoord.y = 1.0 - v_textureCoord.y;// Flip y
#endif

  //////////////////////////////////////////////
  // Overlay

#ifdef ENABLE_MULTI_DRAW
  vec2 materialCoords = v_geomItemData.zw;
  vec4 materialValue1 = getMaterialValue(materialCoords, 1);
  float overlay = materialValue1.x;
#else
  float overlay = Overlay;
#endif

  if (isOrthographic > 0){
    gl_Position.z -= overlay;
  } else {
    gl_Position.z = mix(gl_Position.z, -gl_Position.z, overlay);
  }

  //////////////////////////////////////////////
  
  v_worldPos      = (modelMatrix * pos).xyz;
}
