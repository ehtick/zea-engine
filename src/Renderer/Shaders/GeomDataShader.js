import { shaderLibrary }  from '../ShaderLibrary';
import { GLShader }  from '../GLShader.js';

import './GLSL/stack-gl/inverse.js';
import './GLSL/stack-gl/transpose.js';
import './GLSL/modelMatrix.js';

class GeomDataShader extends GLShader {
    constructor(gl) {
        super(gl);
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('GeomDataShader.vertexShader', `
precision highp float;

attribute vec3 positions;

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

<%include file="stack-gl/transpose.glsl"/>
<%include file="modelMatrix.glsl"/>


varying vec3 v_geomData;

void main(void) {
    mat4 modelMatrix = getModelMatrix();
    mat4 modelViewProjectionMatrix = projectionMatrix * viewMatrix * modelMatrix;
    gl_Position = modelViewProjectionMatrix * vec4(positions, 1.0);

    int id = getID();
    vec4 geomItemData = getInstanceData(id);
    v_geomData.x = float(id);
    v_geomData.y = geomItemData.z;
    v_geomData.z = geomItemData.t;
}
`);

        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('GeomDataShader.fragmentShader', `
precision highp float;

varying vec3 v_geomData;

void main(void) {
    gl_FragColor = vec4(v_geomData, 1.0);
}
`);
    }
};

export {
    GeomDataShader
};
