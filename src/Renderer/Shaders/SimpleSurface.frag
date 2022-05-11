precision highp float;

import 'GLSLUtils.glsl'
import 'drawItemTexture.glsl'
import 'cutaways.glsl'
import 'gamma.glsl'
import 'materialparams.glsl'

#ifdef DEBUG_GEOM_ID
import 'debugColors.glsl'
#endif

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

uniform mat4 cameraMatrix;
uniform int isOrthographic;

#ifdef ENABLE_ES3
    out vec4 fragColor;
#endif


#if defined(DRAW_COLOR)

#ifndef ENABLE_MULTI_DRAW

uniform color BaseColor;
uniform float Opacity;
uniform float EmissiveStrength;

#ifdef ENABLE_TEXTURES
uniform sampler2D BaseColorTex;
uniform int BaseColorTexType;
uniform sampler2D OpacityTex;
uniform int OpacityTexType;
uniform sampler2D EmissiveStrengthTex;
uniform int EmissiveStrengthTexType;
#endif // ENABLE_TEXTURES

#endif // ENABLE_MULTI_DRAW

import 'computeViewNormal.glsl'
  
// end DRAW_COLOR
#elif defined(DRAW_GEOMDATA)
  import 'surfaceGeomData.glsl'
#endif // DRAW_GEOMDATA


void main(void) {
#ifndef ENABLE_ES3
  vec4 fragColor;
#endif
  int geomItemId = int(v_drawItemIds.x + 0.5);
  int elemId = int(v_drawItemIds.y + 0.5);
  int perFaceMaterialId = int(v_drawItemIds.z);
  int drawItemFlags = int(v_drawItemIds.w + 0.5);
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

#if defined(DRAW_COLOR)
  // Cutaways
  if (testFlag(flags, GEOMITEM_FLAG_CUTAWAY)) 
  {
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
  // Normals
  
  vec3 viewNormal;
  if (length(v_viewNormal) < 0.1) {
    viewNormal = computeViewNormal(v_viewPos);
  } else {
    viewNormal = normalize(v_viewNormal);
  }
  vec3 normal = normalize(mat3(cameraMatrix) * viewNormal);
  
  vec3 viewVector;
  if (isOrthographic == 0)
    viewVector = normalize(mat3(cameraMatrix) * normalize(v_viewPos));
  else 
    viewVector = vec3(-cameraMatrix[2][0], -cameraMatrix[2][1], -cameraMatrix[2][2]);
  
  //////////////////////////////////////////////
  // Material

#ifdef ENABLE_MULTI_DRAW

  vec2 materialCoords = v_geomItemData.zw;
  if (v_drawItemIds.z > 0.5) {
    materialCoords.x = v_drawItemIds.z;
  }
  vec4 baseColor      = getMaterialValue(materialCoords, 0);
  vec4 matValue1      = getMaterialValue(materialCoords, 1);
  float opacity       = baseColor.a * matValue1.r;
  float emission      = matValue1.g;

#else // ENABLE_MULTI_DRAW

#ifndef ENABLE_TEXTURES
  vec4 baseColor      = BaseColor;
  float emission      = EmissiveStrength;
  float opacity       = baseColor.a * Opacity;
#else
  vec4 baseColor      = getColorParamValue(BaseColor, BaseColorTex, BaseColorTexType, v_textureCoord);
  float opacity       = baseColor.a * getLuminanceParamValue(Opacity, OpacityTex, OpacityTexType, v_textureCoord) * treeItemOpacity;
  float emission      = getLuminanceParamValue(EmissiveStrength, EmissiveStrengthTex, EmissiveStrengthTexType, v_textureCoord);
#endif

#endif // ENABLE_MULTI_DRAW

  // Hacky simple irradiance. 
  float ndotv = dot(normal, viewVector);
  if (ndotv < 0.0) {
    normal = -normal;
    ndotv = dot(normal, viewVector);

    // Note: these 2 lines can be used to debug inverted meshes.
    //baseColor = vec4(1.0, 0.0, 0.0, 1.0);
    //ndotv = 1.0;
  }

  fragColor = vec4((ndotv * baseColor.rgb) + (emission * baseColor.rgb), opacity);

  // Note: the 'treeItemOpacity' is not an input to the lighting, 
  // as we want to also blend off the specular reflections to make an object
  // fade away to nothing. (not become a transparent glass object).
  fragColor.a *= treeItemOpacity;

#ifdef DEBUG_GEOM_ID
  // ///////////////////////
  // Debug Draw ID (this correlates to GeomID within a GLGeomSet)
  float geomId = v_geomItemData.w;
  fragColor.rgb = getDebugColor(geomId);
  // ///////////////////////
#endif

  if (drawItemFlags != 0) {
    vec4 highlightColor = getHighlightColor(geomItemId);
    fragColor.rgb = mix(fragColor.rgb, highlightColor.rgb, highlightColor.a);
  }

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
#endif // DRAW_GEOMDATA

#ifndef ENABLE_ES3
  gl_FragColor = fragColor;
#endif
}