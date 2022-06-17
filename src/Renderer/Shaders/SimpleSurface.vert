precision highp float;


attribute vec3 positions;
attribute vec3 normals;
#ifdef ENABLE_TEXTURES
attribute vec2 texCoords;
#endif

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

import 'GLSLUtils.glsl'
import 'transpose.glsl'
import 'inverse.glsl'
import 'geomItemId.glsl'
import 'drawItemTexture.glsl'
import 'modelMatrix.glsl'

/* VS Outputs */
varying vec4 v_drawItemIds;
varying vec4 v_geomItemData;
varying vec3 v_viewPos;
varying vec3 v_viewNormal;
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
  vec4 viewPos    = modelViewMatrix * pos;
  gl_Position     = projectionMatrix * viewPos;

  mat3 normalMatrix = mat3(transpose(inverse(modelViewMatrix)));
  v_viewPos       = -viewPos.xyz;
  v_viewNormal    = normalize(normalMatrix * normals);

#ifdef ENABLE_TEXTURES
  v_textureCoord  = texCoords;
  // v_textureCoord.y = 1.0 - v_textureCoord.y;// Flip y
#endif

  v_worldPos      = (modelMatrix * pos).xyz;
}
