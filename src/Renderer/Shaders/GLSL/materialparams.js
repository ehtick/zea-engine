import { shaderLibrary } from '../../ShaderLibrary.js'

shaderLibrary.setShaderModule(
  'materialparams.glsl',
  `

#ifdef ENABLE_MULTI_DRAW
  
uniform sampler2D materialsTexture;

vec4 getMaterialValue(vec2 materialCoords, int valueIndex) {
    int index = ftoi(materialCoords.x) + valueIndex;
    ivec2 materialsTextureSize = textureSize(materialsTexture, 0);
    ivec2 texelCoords = ivec2(index % materialsTextureSize.x, index / materialsTextureSize.x);
    
    return texelFetch(materialsTexture, texelCoords, 0);
}

#else // ENABLE_MULTI_DRAW

////////////////////////
// Material Param Helpers.

vec4 getColorParamValue(vec4 value, sampler2D tex, int texType, vec2 texCoord) {
    if(texType == 0){
        return value;
    }
    else if(texType == 1 || texType == 2){
        // TODO: Use SRGB textures.
        return toLinear(texture2D(tex, texCoord));
    }
    else if(texType == 3){
        // Float HDR Texture
        return texture2D(tex, texCoord);
    }
    else
        return value;
}



float luminanceFromRGB(vec3 rgb) {
    return 0.2126*rgb.r + 0.7152*rgb.g + 0.0722*rgb.b;
}

float getLuminanceParamValue(float value, sampler2D tex, int texType, vec2 texCoord) {
    if(texType == 0)
        return value;
    else
        return luminanceFromRGB(texture2D(tex, texCoord).rgb);
}


#endif // ENABLE_MULTI_DRAW
`
)
