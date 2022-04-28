
precision highp float;
precision highp int;

import 'GLSLUtils.glsl'
import 'drawItemTexture.glsl'
import 'cutaways.glsl'
import 'materialparams.glsl'

#if defined(DRAW_COLOR)

uniform int occluded;
uniform vec4 hiddenLineColor;

#ifndef ENABLE_MULTI_DRAW

uniform color BaseColor;
uniform float Opacity;

uniform color OccludedColor;

#endif // ENABLE_MULTI_DRAW

#elif defined(DRAW_GEOMDATA)

uniform int isOrthographic;

import 'surfaceGeomData.glsl'

#elif defined(DRAW_HIGHLIGHT)

#ifdef ENABLE_FLOAT_TEXTURES
vec4 getHighlightColor(int id) {
  return fetchTexel(instancesTexture, instancesTextureSize, (id * pixelsPerItem) + 4);
}
#else // ENABLE_FLOAT_TEXTURES

uniform vec4 highlightColor;

vec4 getHighlightColor() {
  return highlightColor;
}

#endif // ENABLE_FLOAT_TEXTURES

#endif // DRAW_HIGHLIGHT


/* VS Outputs */
varying float v_geomItemId;
varying vec4 v_geomItemData;
varying vec3 v_viewPos;
varying vec3 v_worldPos;
varying vec3 v_nextVertexDist;

#ifdef ENABLE_ES3
  out vec4 fragColor;
#endif

void main(void) {
#ifndef ENABLE_ES3
  vec4 fragColor;
#endif

  int geomItemId = int(v_geomItemId + 0.5);
  int flags = int(v_geomItemData.x + 0.5);
  float treeItemOpacity = v_geomItemData.y;

  // Cutaways
  if (testFlag(flags, GEOMITEM_FLAG_CUTAWAY)) 
  {
    vec4 cutAwayData   = getCutaway(geomItemId);
    vec3 planeNormal = cutAwayData.xyz;
    float planeDist = cutAwayData.w;
    if (cutaway(v_worldPos, planeNormal, planeDist)) {
      discard;
      return;
    }
  }

  //////////////////////////////////////////////
  // Material

#ifdef ENABLE_MULTI_DRAW

  vec2 materialCoords = v_geomItemData.zw;
  vec4 BaseColor = getMaterialValue(materialCoords, 0);
  vec4 matValue1 = getMaterialValue(materialCoords, 1);
  vec4 matValue2 = getMaterialValue(materialCoords, 2);
  float Opacity  = matValue1.r;
#endif // ENABLE_MULTI_DRAW


  //////////////////////////////////////////////
  // Color
#if defined(DRAW_COLOR)

  fragColor = BaseColor;
  
  if (occluded == 1) {
    fragColor = hiddenLineColor;
  }

  fragColor.a *= Opacity * treeItemOpacity;


  //////////////////////////////////////////////
  // GeomData
#elif defined(DRAW_GEOMDATA)
  // Cutaways
  if (testFlag(flags, GEOMITEM_INVISIBLE_IN_GEOMDATA)) {
    discard;
    return;
  }
  
  fragColor = setFragColor_geomData(v_viewPos, floatGeomBuffer, passId, v_geomItemId, 0.0, isOrthographic);
  
  //////////////////////////////////////////////
  // Highlight
#elif defined(DRAW_HIGHLIGHT)
  
  fragColor = getHighlightColor(geomItemId);

#endif // DRAW_HIGHLIGHT


#ifndef ENABLE_ES3
  gl_FragColor = fragColor;
#endif
}
