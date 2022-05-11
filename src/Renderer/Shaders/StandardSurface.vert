
precision highp float;
precision highp int;

attribute vec3 positions;
attribute vec3 normals;
#ifdef ENABLE_TEXTURES
attribute vec2 texCoords;
#endif

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform int isOrthographic;

// Now that we render multiple types of geometry from a single shader
// we need to know what kind of geometry it is...
uniform int geomType;

uniform float outlineThickness;
uniform vec2 viewportSize;

// should be imported by bottom 3
import 'GLSLUtils.glsl'
import 'transpose.glsl'
import 'inverse.glsl'

import 'geomItemId.glsl'
import 'geomType.glsl'
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
/* VS Outputs */


void main(void) {

  v_drawItemIds = getDrawItemIds();
  int geomItemId = int(v_drawItemIds.x + 0.5);
  int drawItemFlags = int(v_drawItemIds.w + 0.5);
  v_geomItemData = getInstanceData(geomItemId);
  mat4 modelMatrix = getModelMatrix(geomItemId);

  vec4 pos = vec4(positions, 1.);
  mat4 modelViewMatrix = viewMatrix * modelMatrix;
  vec4 viewPos    = modelViewMatrix * pos;


  gl_Position     = projectionMatrix * viewPos;
  v_viewPos = -viewPos.xyz;
  v_worldPos      = (modelMatrix * pos).xyz;

  mat3 normalMatrix = mat3(transpose(inverse(modelViewMatrix)));
  v_viewPos       = -viewPos.xyz;
  v_viewNormal    = normalMatrix * normals;

  // offset slightly the lines and points to make them clearly defined.
  // This ensures that lines drawn over surfaces are solid and not clipped
  // at all by the surface.
  float overlay = 0.0;
  if (geomType == TRIANGLES) {
    if (outlineThickness > 0.00001) {
      vec2 screenNormal = v_viewNormal.xy;
      gl_Position.xy += normalize(screenNormal) * ((2.0 / viewportSize) * outlineThickness) * gl_Position.w;
    }
  }
  else if (geomType == LINES) { // start 'LINES'
    overlay = 0.00003;
    if (drawItemFlags != 0) overlay += 0.2;
  } // end 'LINES'
  else if (geomType == POINTS) { // start 'POINTS'
    overlay = 0.00005;
    if (drawItemFlags != 0) overlay += 0.2;
  }  // end 'POINTS'

  if (isOrthographic > 0){
    gl_Position.z -= overlay;
  } else {
    gl_Position.z = mix(gl_Position.z, -gl_Position.z, overlay);
  }

#ifdef ENABLE_TEXTURES
  v_textureCoord  = texCoords;
#endif

}
