precision highp float;
precision highp int;
import 'GLSLUtils.glsl'
import 'drawItemTexture.glsl' 
import 'cutaways.glsl'
import 'gamma.glsl'
import 'materialparams.glsl'
import 'GLSLBits.glsl'


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

#ifdef ENABLE_ES3
  out vec4 fragColor;
#endif


// Now that we render multiple types of geometry from a single shader
// we need to know what kind of geometry it is...
uniform int geomType;
import 'geomType.glsl'

#if defined(DRAW_COLOR)

#ifdef ENABLE_INLINE_GAMMACORRECTION
uniform float exposure;
#endif

uniform mat4 cameraMatrix;
uniform int isOrthographic;

#ifndef ENABLE_MULTI_DRAW

uniform color BaseColor;
uniform float AmbientOcclusion;
uniform float Roughness;
uniform float Metallic;
uniform float Reflectance;
uniform float EmissiveStrength;
uniform float Opacity;

uniform color EdgeColor;
uniform color PointColor;

#ifdef ENABLE_TEXTURES
uniform sampler2D BaseColorTex;
uniform int BaseColorTexType;

uniform sampler2D AmbientOcclusionTex;
uniform int AmbientOcclusionTexType;

#ifdef ENABLE_PBR
uniform sampler2D RoughnessTex;
uniform int RoughnessTexType;

uniform sampler2D MetallicTex;
uniform int MetallicTexType;

uniform sampler2D ReflectanceTex;
uniform int ReflectanceTexType;

uniform sampler2D NormalTex;
uniform int NormalTexType;
#endif // ENABLE_PBR

uniform sampler2D EmissiveStrengthTex;
uniform int EmissiveStrengthTexType;

#endif // ENABLE_TEXTURES
#endif // ENABLE_MULTI_DRAW

import 'PBRSurfaceRadiance.glsl'

#ifdef ENABLE_PBR
mat3 cotangentFrame( in vec3 normal, in vec3 pos, in vec2 texCoord ) {
  // https://stackoverflow.com/questions/5255806/how-to-calculate-tangent-and-binormal
  vec3 n = normal;
  // derivations of the fragment position
  vec3 pos_dx = dFdx( pos );
  vec3 pos_dy = dFdy( pos );
  // derivations of the texture coordinate
  vec2 texC_dx = dFdx( texCoord );
  vec2 texC_dy = dFdy( texCoord );
  // tangent vector and binormal vector
  vec3 t = -(texC_dy.y * pos_dx - texC_dx.y * pos_dy);
  vec3 b = -(texC_dx.x * pos_dy - texC_dy.x * pos_dx);

  t = t - n * dot( t, n ); // orthonormalization ot the tangent vectors
  b = b - n * dot( b, n ); // orthonormalization of the binormal vectors to the normal vector
  b = b - t * dot( b, t ); // orthonormalization of the binormal vectors to the tangent vector
  mat3 tbn = mat3( normalize(t), normalize(b), n );

  return tbn;
}
#endif

import 'computeViewNormal.glsl'


#elif defined(DRAW_GEOMDATA)

#ifdef ENABLE_MULTI_DRAW
// #define DEBUG_GEOM_ID
#endif
#ifdef DEBUG_GEOM_ID
import 'debugColors.glsl'
#endif

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
  int elemId = int(v_drawItemIds.y + 0.5);
  int perFaceMaterialId = int(v_drawItemIds.z);
  int flags = int(v_geomItemData.x + 0.5);
  float treeItemOpacity = v_geomItemData.y;

  if (testFlag(flags, GEOMITEM_FLAG_CUTAWAY)) {
    vec4 cutAwayData   = getCutaway(geomItemId);
    vec3 planeNormal = cutAwayData.xyz;
    float planeDist = cutAwayData.w;
    if (cutaway(v_worldPos, planeNormal, planeDist)) {
        discard;
        return;
    }
  }
  vec2 materialCoords = v_geomItemData.zw;
  if (v_drawItemIds.z > 0.5) {
    materialCoords.x = v_drawItemIds.z;
  }
  
#if defined(DRAW_COLOR)

  if (geomType == TRIANGLES) { // start 'TRIANGLES'

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
    
  if (dot(normal, viewVector) < 0.0) {
    normal = -normal;
    // Note: this line can be used to debug inverted meshes.
    //material.baseColor = vec3(1.0, 0.0, 0.0);
  }

  //////////////////////////////////////////////
  // Material

  MaterialParams material;

#ifdef ENABLE_MULTI_DRAW
  vec4 matValue0      = getMaterialValue(materialCoords, 0);
  vec4 matValue1      = getMaterialValue(materialCoords, 1);
  vec4 matValue2      = getMaterialValue(materialCoords, 2);

  material.baseColor     = matValue0.rgb;
  material.ambientOcclusion      = matValue1.r;
  material.metallic      = matValue1.g;
  material.roughness     = matValue1.b;
  material.reflectance   = matValue1.a;

  material.emission         = matValue2.r;
  material.opacity          = matValue2.g * matValue0.a * treeItemOpacity;
  if (material.opacity < 0.001) discard;

#else // ENABLE_MULTI_DRAW

#ifndef ENABLE_TEXTURES
  material.baseColor     = BaseColor.rgb;
  material.emission      = EmissiveStrength;

#ifdef ENABLE_PBR
  material.roughness     = Roughness;
  material.metallic      = Metallic;
  material.reflectance   = Reflectance;
#endif

#else // ENABLE_TEXTURES
  // Planar YZ projection for texturing, repeating every meter.
  // vec2 texCoord       = v_worldPos.xz * 0.2;
  vec2 texCoord          = v_textureCoord;

  vec4 baseColor         = getColorParamValue(BaseColor, BaseColorTex, BaseColorTexType, texCoord);

  material.ambientOcclusion = getLuminanceParamValue(AmbientOcclusion, AmbientOcclusionTex, AmbientOcclusionTexType, texCoord);
  material.baseColor     = baseColor.rgb;
  
  material.opacity       = Opacity * baseColor.a;
  if (material.opacity < 0.001) discard;

#ifdef ENABLE_PBR

  material.metallic      = getLuminanceParamValue(Metallic, MetallicTex, MetallicTexType, texCoord);
  material.roughness     = getLuminanceParamValue(Roughness, RoughnessTex, RoughnessTexType, texCoord);

  // TODO: Communicate that this tex contains the roughness as well.
  if (MetallicTexType != 0) {
    vec4 metallicRoughness = vec4(Metallic, Roughness, 0.0, 1.0);
    metallicRoughness     = texture2D(MetallicTex, texCoord);
    material.roughness     = metallicRoughness.g;
    material.metallic     = metallicRoughness.b;
  }

  material.reflectance   = getLuminanceParamValue(Reflectance, ReflectanceTex, ReflectanceTexType, texCoord);
#endif // ENABLE_PBR
  material.emission         = getLuminanceParamValue(EmissiveStrength, EmissiveStrengthTex, EmissiveStrengthTexType, texCoord);
#endif // ENABLE_TEXTURES

#ifdef ENABLE_TEXTURES
#ifdef ENABLE_PBR
  if (NormalTexType != 0) {
      mat3 tbn = cotangentFrame(normal, viewVector, texCoord);
      normal = normalize(tbn * (texture2D(NormalTex, texCoord).rgb * 2.0 - 1.0));
  }
#endif // ENABLE_PBR
#endif // ENABLE_TEXTURES
#endif // ENABLE_MULTI_DRAW

  fragColor = pbrSurfaceRadiance(material, normal, viewVector);
  // fragColor = vec4(texture2D(NormalTex, texCoord).rgb, 1.0);
  // fragColor = metallicRoughness;
  // fragColor = vec4(material.baseColor, 1.0);;
  // fragColor = vec4(vec3(material.metallic), 1.0);;
  // fragColor = vec4(vec3(material.roughness), 1.0);;
  // fragColor = vec4(vec3(material.ambientOcclusion), 1.0);

  } // end 'TRIANGLES'
  else if (geomType == LINES) { // start 'LINES'
#ifdef ENABLE_MULTI_DRAW
    vec4 edgeColor      = getMaterialValue(materialCoords, 3);
    vec4 matValue2      = getMaterialValue(materialCoords, 2);
    float opacity       = matValue2.g;
#else 
    vec4 edgeColor      = EdgeColor;
    vec4 opacity        = Opacity;
#endif // ENABLE_MULTI_DRAW
    edgeColor.a = opacity * treeItemOpacity;
    if (edgeColor.a < 0.001) discard;
    fragColor = edgeColor;
  } // end 'LINES'
  else if (geomType == POINTS) { // start 'POINTS'
#ifdef ENABLE_MULTI_DRAW
    vec4 pointColor      = getMaterialValue(materialCoords, 4);
    vec4 matValue2      = getMaterialValue(materialCoords, 2);
    float opacity       = matValue2.g;
#else 
    vec4 pointColor      = PointColor;
    vec4 opacity        = Opacity;
#endif // ENABLE_MULTI_DRAW
    pointColor.a = opacity * treeItemOpacity;
    if (pointColor.a < 0.001) discard;
    fragColor = pointColor;
  }  // end 'POINTS'
  
#ifdef DEBUG_GEOM_ID
  // ///////////////////////
  // Debug Draw ID (this correlates to GeomID within a GLGeomSet)
  float geomId = v_geomItemData.w;
  fragColor.rgb = getDebugColor(geomId);
  // ///////////////////////
#endif

#ifdef ENABLE_INLINE_GAMMACORRECTION
  fragColor.rgb = toGamma(fragColor.rgb * exposure);
#endif

#elif defined(DRAW_GEOMDATA)
  // Cutaways
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


  // We can make geoms invisible to hide them. 
  // Avoid drawing GeomData for geoms that are completely transparent.
  if (geomType == TRIANGLES) { // start 'TRIANGLES'
    vec4 matValue0      = getMaterialValue(materialCoords, 0);
    vec4 matValue2      = getMaterialValue(materialCoords, 2);
    float opacity          = matValue2.g * matValue0.a * treeItemOpacity;
    if (opacity < 0.001) {
      discard;
      return;
    }
  } // end 'TRIANGLES'
  else if (geomType == LINES) { // start 'LINES'
#ifdef ENABLE_MULTI_DRAW
    vec4 edgeColor      = getMaterialValue(materialCoords, 3);
#else 
    vec4 edgeColor      = EdgeColor;
#endif // ENABLE_MULTI_DRAW
    float opacity          = edgeColor.a * treeItemOpacity;
    if (opacity < 0.001) {
      discard;
      return;
    }
  } // end 'LINES'
  else if (geomType == POINTS) { // start 'POINTS'
#ifdef ENABLE_MULTI_DRAW
    vec4 pointColor      = getMaterialValue(materialCoords, 4);
#else 
    vec4 pointColor      = PointColor;
#endif // ENABLE_MULTI_DRAW
    float opacity          = pointColor.a * treeItemOpacity;
    if (opacity < 0.001) {
      discard;
      return;
    }
  }  // end 'POINTS'

  
  fragColor = setFragColor_geomData(v_viewPos, floatGeomBuffer, passId, v_drawItemIds.x, v_drawItemIds.y, isOrthographic);
   
#elif defined(DRAW_HIGHLIGHT)
  fragColor = getHighlightColor(geomItemId);
#endif // DRAW_HIGHLIGHT

#ifndef ENABLE_ES3
  gl_FragColor = fragColor;
#endif


}