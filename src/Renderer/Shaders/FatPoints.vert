
precision highp float;
precision highp int;

instancedattribute vec3 positions;

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform int isOrthographic;

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
varying float v_geomItemId;

void main(void) {
  int geomItemId = getGeomItemId();
  vec2 quadPointPos = getQuadVertexPositionFromID();
  v_texCoord = quadPointPos + 0.5;

  mat4 modelMatrix = getModelMatrix(geomItemId);
  mat4 modelViewMatrix = viewMatrix * modelMatrix;
  
  vec4 viewPos = modelViewMatrix * vec4(positions, 1.);

  // During XR sessions, there is a scaling applied to the view matrix
  // which causes a distortion to the line width. We extract that scale here
  // and use to correct the distortion.
  // See also: FatLinesShader
  vec3 viewZ = modelViewMatrix[2].xyz;
  float viewScale = length(viewZ);
  viewPos += vec4(vec3(quadPointPos, 0.0) * PointSize * viewScale, 0.);

  // Generate a quad which is 0.5 * PointSize closer towards
  // us. This allows points to be visualized even if snug on 
  // a surface. (else they get fully clipped)
  viewPos.z += 0.5 * PointSize;

  v_geomItemId = float(geomItemId);
  v_viewPos = -viewPos.xyz;
  
  gl_Position = projectionMatrix * viewPos;

  if (isOrthographic > 0){
    gl_Position.z -= Overlay;
  } else {
    gl_Position.z = mix(gl_Position.z, -gl_Position.z, Overlay);
  }
}
