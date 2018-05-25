import {
    Color,
    Vec3
} from '../../Math';
import {
    sgFactory
} from '../../SceneTree';
import {
    GLShader
} from '../GLShader.js';
import {
    shaderLibrary
} from '../ShaderLibrary.js';

import './GLSL/stack-gl/inverse.js';
import './GLSL/stack-gl/transpose.js';
import './GLSL/envmap-equirect.js';
import './GLSL/envmap-octahedral.js';
import './GLSL/modelMatrix.js';

class EnvProjectionShader extends GLShader {
    constructor(gl) {
        super(gl);
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('EnvProjectionShader.vertexShader', `
precision highp float;

attribute vec3 positions;    //(location = 0)

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform vec3 _projectionCenter;

<%include file="stack-gl/inverse.glsl"/>
<%include file="stack-gl/transpose.glsl"/>
<%include file="modelMatrix.glsl"/>

/* VS Outputs */
varying vec3 v_worldDir;
 
void main()
{
    vec4 pos = vec4(positions, 1.);
    mat4 modelMatrix = getModelMatrix();
    mat4 modelViewProjectionMatrix = projectionMatrix * viewMatrix * modelMatrix;

    gl_Position = modelViewProjectionMatrix * pos;

    vec4 worldPos = modelMatrix * pos;
    v_worldDir = worldPos.xyz - _projectionCenter;
}

`);

        this.addParameter('env', new Color(1.0, 1.0, 0.5));
        this.addParameter('projectionCenter', new Vec3(0.0, 0.0, 1.7));
        this.finalize();
    }
};

class OctahedralEnvProjectionShader extends EnvProjectionShader {
    constructor(gl) {
        super(gl);
        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('OctahedralEnvProjectionShader.fragmentShader', `
precision highp float;

<%include file="math/constants.glsl"/>
<%include file="glslutils.glsl"/>
<%include file="pragmatic-pbr/envmap-octahedral.glsl"/>
<%include file="stack-gl/gamma.glsl"/>
<%include file="materialparams.glsl"/>

uniform color _env;
uniform sampler2D _envTex;
uniform bool _envTexConnected;

uniform float exposure;

/* VS Outputs */
varying vec3 v_worldDir;
varying vec2 v_texCoord;

#ifdef ENABLE_ES3
    out vec4 fragColor;
#endif
void main(void) {
#ifndef ENABLE_ES3
    vec4 fragColor;
#endif

    vec2 texCoord = normalToUvSphOct(normalize(v_worldDir));
    vec4 env = getColorParamValue(_env, _envTex, _envTexConnected, texCoord);
    fragColor = vec4(env.rgb/env.a, 1.0);

#ifdef ENABLE_INLINE_GAMMACORRECTION
    if(_linearSpaceImage) {
        fragColor.rgb = toGamma(fragColor.rgb * exposure);
    }
    else {
        fragColor.rgb = fragColor.rgb * exposure;
    }
#endif

#ifndef ENABLE_ES3
    gl_FragColor = fragColor;
#endif
}
`);
        this.finalize();
    }
};

sgFactory.registerClass('OctahedralEnvProjectionShader', OctahedralEnvProjectionShader);

class LatLongEnvProjectionShader extends EnvProjectionShader {
    constructor(gl) {
        super(gl);
        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('LatLongEnvProjectionShader.fragmentShader', `
precision highp float;

<%include file="math/constants.glsl"/>
<%include file="glslutils.glsl"/>
<%include file="pragmatic-pbr/envmap-equirect.glsl"/>
<%include file="stack-gl/gamma.glsl"/>
<%include file="materialparams.glsl"/>

uniform color _env;
uniform sampler2D _envTex;
uniform bool _envTexConnected;

uniform float exposure;

/* VS Outputs */
varying vec3 v_worldDir;
varying vec2 v_texCoord;

#ifdef ENABLE_ES3
    out vec4 fragColor;
#endif
void main(void) {
#ifndef ENABLE_ES3
    vec4 fragColor;
#endif

    vec2 texCoord = latLongUVsFromDir(normalize(v_worldDir));
    vec4 env = getColorParamValue(_env, _envTex, _envTexConnected, texCoord);
    fragColor = vec4(env.rgb/env.a, 1.0);

#ifdef ENABLE_INLINE_GAMMACORRECTION
    if(_linearSpaceImage) {
        fragColor.rgb = toGamma(fragColor.rgb * exposure);
    }
    else {
        fragColor.rgb = fragColor.rgb * exposure;
    }
#endif


#ifndef ENABLE_ES3
    gl_FragColor = fragColor;
#endif
}
`);
        this.finalize();
    }
};


sgFactory.registerClass('LatLongEnvProjectionShader', LatLongEnvProjectionShader);
export {
    EnvProjectionShader,
    OctahedralEnvProjectionShader,
    LatLongEnvProjectionShader
};