import {
    Color
} from '../../Math';
import {
    sgFactory,
    Image2D
} from '../../SceneTree';
import {
    shaderLibrary
} from '../ShaderLibrary.js';
import {
    GLShader
} from '../GLShader.js';
import './GLSL/stack-gl/transpose.js';
import './GLSL/stack-gl/gamma.js';
import './GLSL/GGX_Specular.js';
import './GLSL/modelMatrix.js';
import './GLSL/debugColors.js';

class TransparentSurfaceShader extends GLShader {
    constructor(gl) {
        super(gl);
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('TransparentSurfaceShader.vertexShader', `
precision highp float;


attribute vec3 positions;
attribute vec3 normals;

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

<%include file="stack-gl/transpose.glsl"/>
<%include file="stack-gl/inverse.glsl"/>
<%include file="modelMatrix.glsl"/>

/* VS Outputs */
varying vec4 v_viewPos;
varying vec3 v_viewNormal;

varying vec3 v_worldPos;
/* VS Outputs */

void main(void) {

    vec4 geomItemData = getInstanceData();

    vec4 pos = vec4(positions, 1.);
    mat4 modelMatrix = getModelMatrix();
    mat4 modelViewMatrix = viewMatrix * modelMatrix;
    vec4 viewPos    = modelViewMatrix * pos;
    gl_Position     = projectionMatrix * viewPos;

    // mat4 mvp = projectionMatrix * viewMatrix * modelMatrix;
    // gl_Position = mvp * vec4((lightmapCoords + geomItemData.xy), 0., 1.);

    v_worldPos      = (modelMatrix * pos).xyz;

    mat3 normalMatrix = mat3(transpose(inverse(viewMatrix * modelMatrix)));
    v_viewPos       = -viewPos;
    v_viewNormal    = normalMatrix * normals;
}
`);

        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('TransparentSurfaceShader.fragmentShader', `
precision highp float;

#ifdef ENABLE_INLINE_GAMMACORRECTION
<%include file="stack-gl/gamma.glsl"/>
#endif
<%include file="glslutils.glsl"/>

/* VS Outputs */
varying vec4 v_viewPos;
varying vec3 v_viewNormal;

varying vec3 v_worldPos;
/* VS Outputs */


#ifdef ENABLE_INLINE_GAMMACORRECTION
uniform float exposure;
#endif

uniform mat4 cameraMatrix;
uniform float planeDist;
uniform float planeAngle;

uniform color _baseColor;
uniform float _opacity;

#ifdef ENABLE_SPECULAR
<%include file="math/constants.glsl"/>
<%include file="GGX_Specular.glsl"/>
<%include file="PBRSurfaceRadiance.glsl"/>
uniform float _roughness;
uniform float _metallic;
uniform float _reflectance;
#endif

#ifdef __ENABLE_TEXTURES
uniform sampler2D _baseColorTex;
uniform bool _baseColorTexConnected;

uniform sampler2D _opacityTex;
uniform bool _opacityTexConnected;

uniform sampler2D _roughnessTex;
uniform bool _roughnessTexConnected;

uniform sampler2D _reflectanceTex;
uniform bool _reflectanceTexConnected;

uniform sampler2D _normalTex;
uniform bool _normalTexConnected;
uniform float _normalScale;


#endif

void main(void) {

    MaterialParams material;

#ifndef __ENABLE_TEXTURES
    material.baseColor      = _baseColor.rgb;
    float opacity           = _opacity;

#ifdef ENABLE_SPECULAR
    material.roughness      = _roughness;
    material.metallic       = _metallic;
    material.reflectance    = _reflectance;
#endif

#else
    // Planar YZ projection for texturing, repeating every meter.
    // vec2 texCoord        = v_worldPos.xz * 0.2;
    vec2 texCoord           = vec2(v_textureCoord.x, 1.0 - v_textureCoord.y);
    material.baseColor      = getColorParamValue(_baseColor, _baseColorTex, _baseColorTexConnected, texCoord).rgb;
    material.roughness      = getLuminanceParamValue(_roughness, _roughnessTex, _roughnessTexConnected, texCoord);
    material.metallic       = getLuminanceParamValue(_metallic, _metallicTex, _metallicTexConnected, texCoord);
    material.reflectance    = _reflectance;//getLuminanceParamValue(_reflectance, _reflectanceTex, _reflectanceTexConnected, texCoord);

    float opacity           = getLuminanceParamValue(_opacity, _opacityTex, _opacityTexConnected, texCoords);
#endif

#ifndef ENABLE_SPECULAR
    gl_FragColor = vec4(material.baseColor.rgb, opacity);
#else

    vec3 viewNormal = normalize(v_viewNormal);
    //vec3 surfacePos = -v_viewPos.xyz;

#ifdef __ENABLE_TEXTURES
    if(_normalTexConnected){
        vec3 textureNormal_tangentspace = normalize(texture2D(_normalTex, texCoord).rgb * 2.0 - 1.0);
        viewNormal = normalize(mix(viewNormal, textureNormal_tangentspace, 0.3));
    }
#endif

    vec3 viewVector = normalize(mat3(cameraMatrix) * normalize(v_viewPos.xyz));
    vec3 normal = normalize(mat3(cameraMatrix) * viewNormal);
    if(dot(normal, viewVector) < 0.0){
        normal = -normal;
        // Note: this line can be used to debug inverted meshes.
        //material.baseColor = vec3(1.0, 0.0, 0.0);
    }

    vec4 specularReflectance = pbrSpecularReflectance(material, normal, viewVector);

    gl_FragColor = vec4(specularReflectance.rgb, mix(opacity, 1.0, specularReflectance.a));

#endif

#ifdef ENABLE_INLINE_GAMMACORRECTION
    gl_FragColor.rgb = toGamma(gl_FragColor.rgb * exposure);
#endif

}
`);

        this.addParameter('baseColor', new Color(1.0, 1.0, 0.5));
        this.addParameter('opacity', 1.0);
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

    isTransparent() {
        return true;
    }

    bind(renderstate, key) {
        if (renderstate.pass != 'ADD')
            return false;
        return super.bind(renderstate, key);
    }
};

sgFactory.registerClass('TransparentSurfaceShader', TransparentSurfaceShader);
export {
    TransparentSurfaceShader
};