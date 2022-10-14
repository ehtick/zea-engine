import 'GLSLUtils.glsl'

#ifdef ENABLE_FLOAT_TEXTURES

uniform sampler2D glGeomItemsTexture;
uniform highp int glGeomItemsTextureSize;

// See also: src\Renderer\GLSLConstants.js
// const pixelsPerGLGeomItem = 8
const int pixelsPerItem = 8;

vec4 getInstanceData(int id) {
  return fetchTexel(glGeomItemsTexture, glGeomItemsTextureSize, (id * pixelsPerItem) + 0);
}

#else

uniform vec4 drawItemData;

vec4 getInstanceData(int id) {
  return drawItemData;
}

#endif


