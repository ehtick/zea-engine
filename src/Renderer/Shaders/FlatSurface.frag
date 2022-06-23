
precision highp float;
precision highp int;

import 'GLSLUtils.glsl'
import 'drawItemTexture.glsl'
import 'cutaways.glsl'
import 'gamma.glsl'
import 'materialparams.glsl'

#ifdef DEBUG_GEOM_ID
import 'debugColors.glsl'
#endif

#ifndef ENABLE_MULTI_DRAW

uniform color BaseColor;

#ifdef ENABLE_TEXTURES
uniform sampler2D BaseColorTex;
uniform int BaseColorTexType;
#endif


#endif // ENABLE_MULTI_DRAW

/* VS Outputs */
varying vec4 v_drawItemIds;
varying vec4 v_geomItemData;
varying vec3 v_viewPos;
#ifdef ENABLE_TEXTURES
varying vec2 v_textureCoord;
#endif
varying vec3 v_worldPos;

#ifdef ENABLE_ES3
out vec4 fragColor;
#endif

#if defined(DRAW_GEOMDATA)
  uniform int isOrthographic;
  import 'surfaceGeomData.glsl'
#elif defined(DRAW_HIGHLIGHT)
  import 'surfaceHighlight.glsl'
#endif // DRAW_HIGHLIGHT

void main(void) {
#ifndef ENABLE_ES3
  vec4 fragColor;
#endif

  int geomItemId = int(v_drawItemIds.x + 0.5);
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
  if (v_drawItemIds.z > 0.5) {
    materialCoords.x = v_drawItemIds.z;
  }
  vec4 baseColor = getMaterialValue(materialCoords, 0);

#else // ENABLE_MULTI_DRAW

#ifndef ENABLE_TEXTURES
  vec4 baseColor = BaseColor;
#else
  vec4 baseColor = getColorParamValue(BaseColor, BaseColorTex, BaseColorTexType, v_textureCoord);
#endif // ENABLE_TEXTURES

#endif // ENABLE_MULTI_DRAW

  baseColor.a *= treeItemOpacity;

#if defined(DRAW_COLOR)
  // Cutaways
  if (testFlag(flags, GEOMITEM_FLAG_CUTAWAY)) {
    if (!gl_FrontFacing) {
#ifdef ENABLE_ES3
      fragColor = cutColor;
#else
      gl_FragColor = cutColor;
#endif
      return;
    }
  }

  //////////////////////////////////////////////
  fragColor = baseColor;

#ifdef DEBUG_GEOM_ID
  // ///////////////////////
  // Debug Draw ID (this correlates to GeomID within a GLGeomSet)
  float geomId = v_geomItemData.w;
  fragColor.rgb = getDebugColor(geomId);
  // ///////////////////////
#endif

#ifdef ENABLE_INLINE_GAMMACORRECTION
  fragColor.rgb = toGamma(fragColor.rgb);
#endif

#elif defined(DRAW_GEOMDATA)

  if (testFlag(flags, GEOMITEM_INVISIBLE_IN_GEOMDATA)) {
    discard;
    return;
  }
  if (occlusionCulling != 0) {
    // Transparent geoms do not render to the occlusion buffer
    if (testFlag(flags, GEOMITEM_TRANSPARENT)) {
      discard;
      return;
    }
  }
  fragColor = setFragColor_geomData(v_viewPos, floatGeomBuffer, passId, v_drawItemIds.x, v_drawItemIds.y, isOrthographic);
#elif defined(DRAW_HIGHLIGHT)
  fragColor = setFragColor_highlight(v_drawItemIds.x);
#endif // DRAW_HIGHLIGHT


#ifndef ENABLE_ES3
  gl_FragColor = fragColor;
#endif
}
