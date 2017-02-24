import {
    Color
} from '../../Math/Math.js';
import {
    sgFactory
} from '../SGFactory.js';
import {
    shaderLibrary
} from '../ShaderLibrary.js';
import {
    Material
} from '../Material.js';

import './GLSL/stack-gl/transpose.js';
import './GLSL/stack-gl/gamma.js';
import './GLSL/Florian/Lookup.js';
import './GLSL/GGX_Specular.js';
import './GLSL/modelMatrix.js';
import './GLSL/debugColors.js';

import './GLSL/ImagePyramid.js';

class StandardMaterial extends Material {
    
    constructor(name) {
        super(name);
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('StandardMaterial.vertexShader', `
precision highp float;


attribute vec3 positions;
attribute vec3 normals;
attribute vec2 lightmapCoords;

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

<%include file="stack-gl/inverse.glsl"/>
<%include file="stack-gl/transpose.glsl"/>
<%include file="modelMatrix.glsl"/>

#ifdef ENABLE_LIGHTMAPS
attribute float clusterIDs;
uniform vec2 lightmapSize;
varying float v_clusterID;
#endif

/* VS Outputs */
varying vec3 v_worldPos;
varying vec4 v_viewPos;
varying vec3 v_viewNormal;
varying vec2 v_lightmapCoord;
varying vec2 v_lightmapCoordsOffset;


void main(void) {

    mat4 modelMatrix = getModelMatrix();
    v_worldPos =  (modelMatrix * vec4(positions, 1.0)).xyz;
    mat4 modelViewMatrix = viewMatrix * modelMatrix;
    mat3 normalMatrix = mat3(transpose(inverse(viewMatrix * modelMatrix)));
    vec4 viewPos = modelViewMatrix * vec4(positions, 1.0);

    v_viewPos       = -viewPos;
    v_viewNormal    = normalMatrix * normals;
    
#ifdef ENABLE_LIGHTMAPS
    v_lightmapCoordsOffset = getLightmapCoordsOffset();
    v_lightmapCoord = ((v_lightmapCoordsOffset+lightmapCoords) / lightmapSize);
    v_clusterID = clusterIDs;
#endif

    gl_Position = projectionMatrix * viewPos;
}
`);

        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('StandardMaterial.fragmentShader', `

#extension GL_OES_standard_derivatives : enable
precision highp float;

<%include file="stack-gl/gamma.glsl"/>

/* VS Outputs */
varying vec3 v_worldPos;
varying vec4 v_viewPos;
varying vec3 v_viewNormal;
varying vec2 v_lightmapCoord;
varying vec2 v_lightmapCoordsOffset;

#ifdef ENABLE_LIGHTMAPS
varying float v_clusterID;

uniform sampler2D lightmap; // 0
uniform vec2 lightmapSize;
uniform bool debugLightmapTexelSize;

<%include file="debugColors.glsl"/>
<%include file="GGX_Specular.glsl"/>

#endif

#ifdef ENABLE_INLINE_GAMMACORRECTION
uniform float exposure;
#endif

uniform mat4 cameraMatrix;

uniform color _baseColor;
uniform sampler2D _baseColorTex;
uniform bool _baseColorTexConnected;

uniform float _opacity;
//uniform sampler2D _opacityTex;
//uniform bool _opacityTexConnected;

uniform float _roughness;
uniform sampler2D _roughnessTex;
uniform bool _roughnessTexConnected;

uniform float _metallic;
uniform sampler2D _metallicTex;
uniform bool _metallicTexConnected;

uniform float _reflectance;
//uniform sampler2D _reflectanceTex;
//uniform bool _reflectanceTexConnected;

uniform color _emission;
//uniform sampler2D _emissionTex;
//uniform bool _emissionTexConnected;

uniform sampler2D _normalTex;
uniform bool _normalTexConnected;
//uniform float _normalScale;


float luminanceFromRGB(vec3 rgb) {
    return 0.2126*rgb.r + 0.7152*rgb.g + 0.0722*rgb.b;
}

vec4 getColorParamValue(vec4 value, sampler2D tex, bool _texConnected, vec2 texCoords) {
    if(_texConnected)
        return toLinear(texture2D(tex, texCoords));
    else
        return toLinear(value);
}

float getLuminanceParamValue(float value, sampler2D tex, bool _texConnected, vec2 texCoords) {
    if(_texConnected)
        return luminanceFromRGB(texture2D(tex, texCoords).rgb);
    else
        return value;
}


void main(void) {

    // Planare YZ projection for texturing, repeating every meter.
    vec2 texCoords = v_worldPos.xz * 0.2;

    vec4 baseColor      = getColorParamValue(_baseColor, _baseColorTex, _baseColorTexConnected, texCoords);
    float opacity       = _opacity;//getLuminanceParamValue(_opacity, _opacityTex, _opacityTexConnected, texCoords);
    float roughness     = getLuminanceParamValue(_roughness, _roughnessTex, _roughnessTexConnected, texCoords);
    float metallic      = getLuminanceParamValue(_metallic, _metallicTex, _metallicTexConnected, texCoords);
    float reflectance   = _reflectance;//getLuminanceParamValue(_reflectance, _reflectanceTex, _reflectanceTexConnected, texCoords);
    vec3 emission       = toLinear(_emission.xyz);//getColorParamValue(_emission, _emissionTex, _emissionTexConnected, texCoords).xyz;


    vec2 lightmapCoords = v_lightmapCoord;
#ifdef ENABLE_LIGHTMAPS
    if(debugLightmapTexelSize)
    {
        vec2 coord_texelSpace = (v_lightmapCoord * lightmapSize) - v_lightmapCoordsOffset;
        float total = floor(coord_texelSpace.x) +
                      floor(coord_texelSpace.y);
                      
        vec3 clustercolor = getDebugColor(v_clusterID);

        if(mod(total,2.0)==0.0)
            baseColor = vec4(clustercolor, 1.0);
    }
#endif

    vec3 surfacePos = -v_viewPos.xyz;
    vec3 viewNormal = v_viewNormal;
    if(viewNormal.x == 0.0 && viewNormal.y == 0.0 && viewNormal.z == 0.0){
        gl_FragColor = vec4(baseColor.rgb, 1);
    }
    else{

        if(!gl_FrontFacing){
            viewNormal *= -1.0;
        }
        viewNormal = normalize(viewNormal);
        vec3 surfacePos = -v_viewPos.xyz;

        if(_normalTexConnected){
            vec3 textureNormal_tangentspace = normalize(texture2D(_normalTex, texCoords).rgb * 2.0 - 1.0);
            viewNormal = normalize(mix(viewNormal, textureNormal_tangentspace, 0.3));
        }

#ifdef ENABLE_LIGHTMAPS
 
        vec3 albedoLinear = baseColor.rgb;  

        vec3 viewVector = mat3(cameraMatrix) * normalize(v_viewPos.xyz);
        vec3 normal = normalize(mat3(cameraMatrix) * viewNormal);
        float NdotV = dot(normal, normalize(viewVector));

        //vec3 irradiance = texture2D(lightmap, v_lightmapCoord).rgb;
        vec3 irradiance = sampleEnvMap(normal, 1.0);

        // // -------------------------- Diffuse Reflectance --------------------------

        vec3 diffuseReflectance = albedoLinear * irradiance;

        // From the Disney dielectric BRDF    
        // Need to check if this is useful for us but the implementation works based on their paper
        diffuseReflectance = (diffuseReflectance / PI);
        // diffuseReflectance = vec3(mix(diffuseReflectance, diffuseReflectance * mix(0.5, 2.5, roughness), pow(1.0 - NdotV, 5.0)));
        diffuseReflectance = vec3(mix(diffuseReflectance, diffuseReflectance * mix(0.5, 1.0, roughness), pow(1.0 - NdotV, 5.0)));


        // -------------------------- Color at normal incidence --------------------------
        
        // Need to use 'reflectance' here instead of 'ior'
        //vec3 F0 = vec3(abs((1.0 - ior) / (1.0 + ior)));    
        //F0 = F0 * F0;
        //F0 = mix(F0, albedoLinear, metallic);      


        // -------------------------- Specular Reflactance --------------------------
        // vec3 ks = vec3(0.0);
        // vec3 specular = GGX_Specular_PrefilteredEnv(normal, viewVector, roughness, F0, ks );
        // vec3 kd = (vec3(1.0) - ks) * vec3(1.0 - metallic);    

        float schlickFresnel = reflectance + pow((1.0-reflectance)*(1.0-NdotV), 5.0);

        vec3 specularReflectance = GGX_Specular_PrefilteredEnv(normal, viewVector, roughness, schlickFresnel);


        // -------------------------- Specular Occlusion --------------------------
        // Fast and quick way of reducing specular reflection in areas that are less exposed to the environment
        // A better approch is to try screen space specular occlusion but need to check performance and feasibility in webGL
        float specularOcclusion = clamp(length(irradiance), 0.01, 1.0);    
        specularReflectance = (specularReflectance * specularOcclusion);  
          

        // -------------------------- Metallic --------------------------
        // We need to do few things given a higher > 0 metallic value
        //      1. tint specular reflectance by the albedo color (not at grazing angles)
        //      2. almost elliminate all diffuse reflactance (in reality metals have some diffuse due to layering (i.e. dust, prints, etc.))
        //      3. set "specular" artistic value to metallic range (0.6 - 0.85)

        specularReflectance = mix(specularReflectance, specularReflectance * albedoLinear, metallic);
        diffuseReflectance = mix(diffuseReflectance, vec3(0.0,0.0,0.0), metallic); // Leaveing at pure black for now but always need some %3 diffuse left for imperfection of pulished pure metal
        // Would be best to compute reflectace internally and set here to 0.6-0.85 for metals
       

        // -------------------------- Final color --------------------------
        // Energy conservation already taken into account in both the diffuse and specular reflectance
        vec3 radiance = diffuseReflectance + specularReflectance;    

        // gl_FragColor = vec4( kd * diffuse + /*ks */ specular, 1);
        gl_FragColor = vec4(radiance, opacity);

        //gl_FragColor = vec4(irradiance, 1);
        //gl_FragColor = vec4(color, 1);
        //gl_FragColor = vec4(specular, 1);
        //gl_FragColor = vec4(albedoLinear, 1);

        //gl_FragColor = vec4(specularReflectance, 1);
        //gl_FragColor = vec4(diffuseReflectance.rgb, 1);
        //gl_FragColor = vec4(sampleEnvMap(normal, 0.3), 1);
    }

#else
        int debugLevel = 0;
        if(debugLevel == 0){
            vec3 viewVector = mat3(cameraMatrix) * normalize(v_viewPos.xyz);
            vec3 normal = mat3(cameraMatrix) * viewNormal;
            float NdotV = dot(normalize(normal),normalize(viewVector));
            // vec3 cameraPos = vec3(cameraMatrix[3][0], cameraMatrix[3][1], cameraMatrix[3][2]);

            vec4 color = baseColor * NdotV;
            gl_FragColor = vec4(color.rgb, opacity);
        }
        else{
            vec3 wsnormal = mat3(cameraMatrix) * viewNormal;
            vec4 color = vec4(abs(wsnormal.x), abs(wsnormal.y), abs(wsnormal.z), 1.0) * abs(viewNormal.z);
            gl_FragColor = vec4(color.rgb, opacity);
        }
    }
#endif

#ifdef ENABLE_INLINE_GAMMACORRECTION
    gl_FragColor.rgb = toGamma(gl_FragColor.rgb * exposure);
#endif

}
`);

        this.addParameter('baseColor', new Color(1.0, 1.0, 0.5));
        this.addParameter('opacity', 1.0);
        this.addParameter('metallic', 0.0);
        this.addParameter('roughness', 0.85);
        this.addParameter('normal', new Color(0.0, 0.0, 0.0));
        this.addParameter('texCoordScale', 1.0, false);
        
        // F0 = reflectance and is a physical property of materials
        // It also has direct relation to IOR so we need to dial one or the other
        // For simplicity sake, we don't need to touch this value as metalic can dictate it
        // such that non metallic is mostly around (0.01-0.025) and metallic around (0.7-0.85)
        this.addParameter('reflectance', 0.0001);
        this.finalize();
    }
};

sgFactory.registerClass('StandardMaterial', StandardMaterial);

export {
    StandardMaterial
};