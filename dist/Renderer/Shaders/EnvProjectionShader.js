/* eslint-disable require-jsdoc */
import { Vec3 } from '../../Math/index';
import { GLShader } from '../GLShader';
import './GLSL/index';
// @ts-ignore
import vert from './EnvProjection.vert';
// @ts-ignore
import LatLongEnvProjectionFrag from './LatLongEnvProjection.frag';
// @ts-ignore
import OctahedralEnvProjectionFrag from './OctahedralEnvProjection.frag';
import { Material, Vec3Parameter } from '../../SceneTree';
class EnvProjectionShader extends GLShader {
    /**
     * Create a GL shader.
     * @param gl - The webgl rendering context.
     */
    constructor(gl) {
        super(gl, 'EnvProjectionShader');
        this.setShaderStage('VERTEX_SHADER', vert);
    }
}
class OctahedralEnvProjectionShader extends EnvProjectionShader {
    /**
     * Create a GL shader.
     * @param gl - The webgl rendering context.
     */
    constructor(gl) {
        super(gl);
        this.setShaderStage('FRAGMENT_SHADER', OctahedralEnvProjectionFrag);
    }
}
// Registry.register('OctahedralEnvProjectionShader', OctahedralEnvProjectionShader)
class LatLongEnvProjectionShader extends EnvProjectionShader {
    /**
     * Create a GL shader.
     * @param gl - The webgl rendering context.
     */
    constructor(gl) {
        super(gl);
        this.setShaderStage('FRAGMENT_SHADER', LatLongEnvProjectionFrag);
    }
}
const material = new Material('EnvProjectionShader_template');
material.addParameter(new Vec3Parameter('projectionCenter', new Vec3(0.0, 0.0, 1.7)));
export { EnvProjectionShader, OctahedralEnvProjectionShader, LatLongEnvProjectionShader };
//# sourceMappingURL=EnvProjectionShader.js.map