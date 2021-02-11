import { GLShader } from '../GLShader.js'
import './GLSL/utils/quadVertexFromID.js'

/** Shader for convolving Environment maps.
 * @extends GLShader
 * @private
 */
class ConvolveIrradianceShader extends GLShader {
  /**
   * Create a GL renderer.
   * @param {WebGLRenderingContext} gl - The options value.
   */
  constructor(gl) {
    super(gl)
    this.setShaderStage(
      'VERTEX_SHADER',
      `
precision highp float;

<%include file="utils/quadVertexFromID.glsl"/>

/* VS Outputs */
varying vec2 v_texCoord;
 
void main()
{
  vec2 position = getQuadVertexPositionFromID();
  v_texCoord = position+0.5;
  gl_Position = vec4(position*2.0, 0.0, 1.0);
}
`
    )
    this.setShaderStage(
      'FRAGMENT_SHADER',
      `
precision highp float;

<%include file="math/constants.glsl"/>
<%include file="GLSLUtils.glsl"/>


uniform float roughness;
uniform int faceId;
varying vec2 v_texCoord;

<%include file="Hammersley.glsl"/>
<%include file="GGX.glsl"/>


#ifdef ENVMAP_CUBE

uniform samplerCube envMap;
vec4 sampleEnvMap(vec3 dir) {
  return texture(envMap, dir);
}

#else 

uniform sampler2D   envMap;

<%include file="envmap-octahedral.glsl"/>

vec4 sampleEnvMap(vec3 dir) {
  vec2 uv = dirToSphOctUv(dir);
  vec4 texel = texture2D(envMap, uv);
  return vec4(texel.rgb/texel.a, 1.0); // TODO: Check this line. Do we need it?
}

#endif 


vec3 cubeFaceUvToDir(float u, float v, int faceId) {

  // normalize into [-1, 1] range
  float n_u = 2.0 * u - 1.0;
  float n_v = 2.0 * v - 1.0;

  vec3 dir;
  switch (faceId)
  {
  case 0: //TEXTURE_CUBE_MAP_POSITIVE_X:
    dir.x = 1.0f;
    dir.y = n_v;
    dir.z = -n_u;
    break;
  case 1: //TEXTURE_CUBE_MAP_NEGATIVE_X:
    dir.x = -1.0f;
    dir.y = n_v;
    dir.z = n_u;
    break;
  case 3: //TEXTURE_CUBE_MAP_POSITIVE_Y:
    dir.x = n_u;
    dir.y = 1.0f;
    dir.z = -n_v;
    break;
  case 2: //TEXTURE_CUBE_MAP_NEGATIVE_Y:
    dir.x = n_u;
    dir.y = -1.0f;
    dir.z = n_v;
    break;
  case 4: //TEXTURE_CUBE_MAP_POSITIVE_Z:
    dir.x = n_u;
    dir.y = n_v;
    dir.z = 1.0f;
    break;
  case 5: //TEXTURE_CUBE_MAP_NEGATIVE_Z:
    dir.x = -n_u;
    dir.y = n_v;
    dir.z = -1.0f;
    break;
  }
  return normalize(dir);
}

out vec4 fragColor;
void main(void) {

  vec3 N = cubeFaceUvToDir(v_texCoord.x, v_texCoord.y, faceId);   

  vec3 irradiance = vec3(0.0);

  vec3 up        = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
  vec3 tangent   = normalize(cross(up, N));
  vec3 bitangent = cross(N, tangent);

  float sampleDelta = 0.025;
  float nrSamples = 0.0; 
  for(float phi = 0.0; phi < 2.0 * PI; phi += sampleDelta)
  {
    for(float theta = 0.0; theta < 0.5 * PI; theta += sampleDelta)
    {
      // spherical to cartesian (in tangent space)
      // from spherical coordinates to cartesian coordinates
      vec3 H = vec3(cos(phi) * sin(theta), sin(phi) * sin(theta), cos(theta));
      // tangent space to world
      vec3 sampleVec = tangent * H.x + bitangent * H.y + N * H.z;

      irradiance += sampleEnvMap(normalize(sampleVec)).rgb * cos(theta) * sin(theta);
      nrSamples++;
    }
  }
  irradiance = PI * irradiance * (1.0 / float(nrSamples));

  fragColor = vec4(irradiance, 1.0);
}

`
    )
  }
}

export { ConvolveIrradianceShader }
