

#ifdef ENABLE_MULTI_DRAW

// On some mobile GPUs the sampler2D defaults to lowp, which implies a maximum
// resolution of 255. This caused rendering artifacts on larger scenes on mobile
// devices.
uniform highp sampler2D drawIdsTexture;

#ifdef EMULATE_MULTI_DRAW
uniform int drawId;
#endif // EMULATE_MULTI_DRAW

int getGeomItemId() {
#ifndef EMULATE_MULTI_DRAW
  int drawId = gl_DrawID;
#endif // EMULATE_MULTI_DRAW

  ivec2 texSize = textureSize(drawIdsTexture, 0);
  ivec2 texelCoords = ivec2(drawId % texSize.x, drawId / texSize.x);
  return int(texelFetch(drawIdsTexture, texelCoords, 0).r + 0.5);
}

vec4 getDrawItemIds() {
#ifndef EMULATE_MULTI_DRAW
  int drawId = gl_DrawID;
#endif // EMULATE_MULTI_DRAW

  ivec2 texSize = textureSize(drawIdsTexture, 0);
  ivec2 texelCoords = ivec2(drawId % texSize.x, drawId / texSize.x);
  vec4 color = texelFetch(drawIdsTexture, texelCoords, 0);
  // Note: A 0 value in the texture means no sub-geom index is being rendered.
  // subtract off 1 to get the true sub-geom index.
  return vec4(color.r, color.g - 1.0, color.b, color.a);
}

#else // ENABLE_MULTI_DRAW

uniform int geomItemId;

#ifdef ENABLE_FLOAT_TEXTURES

attribute float instancedIds;    // instanced attribute..
uniform int instancedDraw;

int getGeomItemId() {
  if (instancedDraw == 0) {
    return geomItemId;
  }
  else {
    return int(instancedIds);
  }
}

vec4 getDrawItemIds() {
  if (instancedDraw == 0) {
    return vec4(float(geomItemId), 0.0, -1.0, -1.0);
  }
  else {
    return vec4(float(instancedIds), 0.0, -1.0, -1.0);
  }
}

#else

int getGeomItemId() {
  return geomItemId;
}

vec4 getDrawItemIds() {
    return vec4(float(geomItemId), 0.0, -1.0, -1.0);
}

#endif // ENABLE_FLOAT_TEXTURES
#endif // ENABLE_MULTI_DRAW


// For backwards compatibility with older plugins (UX.HandleShader)
int getDrawItemId() {
  return getGeomItemId();
}
