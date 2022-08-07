
precision highp float;
precision highp int;

instancedattribute int drawIndices;
uniform sampler2D pointsAttributes;
uniform int pointsAttributesStride;

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform int isOrthographic;

import 'GLSLUtils.glsl' 
import 'inverse.glsl'
import 'drawItemTexture.glsl'
import 'modelMatrix.glsl'
import 'quadVertexFromID.glsl'

uniform int geomItemId;
int getGeomItemId() {
  return geomItemId;
}

uniform float PointSize;
uniform float Overlay;

/* VS Outputs */
varying vec2 v_texCoord;
varying vec3 v_viewPos;
varying vec2 v_geomItemIds;
varying vec4 v_color;

void main(void) {
  int geomItemId = getGeomItemId();
  vec2 quadPointPos = getQuadVertexPositionFromID();
  v_texCoord = quadPointPos + 0.5;

  mat4 modelMatrix = getModelMatrix(geomItemId);
  mat4 modelViewMatrix = viewMatrix * modelMatrix;

  ivec2 texSize = textureSize(pointsAttributes, 0);
  int texelIndex = drawIndices * pointsAttributesStride;
  ivec2 texelCoord = ivec2(
    texelIndex % texSize.x, 
    texelIndex / texSize.x
  );
  vec4 texel0 = texelFetch(pointsAttributes, texelCoord, 0);

  vec3 pos = texel0.xyz;
  float size = texel0.w;

  if (pointsAttributesStride == 2) {
    vec4 texel1 = texelFetch(pointsAttributes, ivec2(texelCoord.x + 1, texelCoord.y), 0);
    v_color = texel1;
  } else {
    v_color = vec4(1., 1., 1., 1.);
  }
  
  vec4 viewPos = modelViewMatrix * vec4(pos, 1.0);
  float pointSize = PointSize * size;

  // During XR sessions, there is a scaling applied to the view matrix
  // which causes a distortion to the line width. We extract that scale here
  // and use to correct the distortion.
  // See also: FatLinesShader
  vec3 viewZ = modelViewMatrix[2].xyz;
  float viewScale = length(viewZ);
  viewPos += vec4(vec3(quadPointPos, 0.0) * pointSize * viewScale, 0.);

  // Generate a quad which is 0.5 * PointSize closer towards
  // us. This allows points to be visualized even if snug on 
  // a surface. (else they get fully clipped)
  viewPos.z += 0.5 * pointSize;

  v_geomItemIds.x = float(geomItemId);
  v_geomItemIds.y = float(drawIndices);
  v_viewPos = -viewPos.xyz;
  
  gl_Position = projectionMatrix * viewPos;

  if (isOrthographic > 0){
    gl_Position.z -= Overlay;
  } else {
    gl_Position.z = mix(gl_Position.z, -gl_Position.z, Overlay);
  }
}
