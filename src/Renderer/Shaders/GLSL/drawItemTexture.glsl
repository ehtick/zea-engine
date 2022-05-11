import 'GLSLUtils.glsl'

#ifdef ENABLE_FLOAT_TEXTURES

uniform sampler2D instancesTexture;
uniform highp int instancesTextureSize;

// See also: src\Renderer\GLSLConstants.js
// const pixelsPerGLGeomItem = 8
const int pixelsPerItem = 8;

vec4 getInstanceData(int id) {
  return fetchTexel(instancesTexture, instancesTextureSize, (id * pixelsPerItem) + 0);
}
vec4 getHighlightColor(int id) {
  return fetchTexel(instancesTexture, instancesTextureSize, (id * pixelsPerItem) + 4);
}

#else

uniform vec4 drawItemData;

vec4 getInstanceData(int id) {
  return drawItemData;
}

uniform vec4 highlightColor;

vec4 getHighlightColor() {
  return highlightColor;
}

#endif


