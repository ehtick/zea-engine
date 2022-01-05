import { GLShader } from '../GLShader';
import { Material } from '../../SceneTree';
import './GLSL/index';
import { RenderState } from '../types/renderer';
import { WebGL12RenderingContext } from '../types/webgl';
declare class FlatSurfaceShader extends GLShader {
    /**
     * Create a GL shader.
     * @param gl - The webgl rendering context.
     */
    constructor(gl?: WebGL12RenderingContext);
    /**
     * The bind method.
     * @param renderstate - The object tracking the current state of the renderer
     * @param key - The key value.
     * @return - The return value.
     */
    bind(renderstate: RenderState, key?: string): boolean;
    /**
     * The unbind method.
     * @param renderstate - The object tracking the current state of the renderer
     * @return - The return value.
     */
    unbind(renderstate: RenderState): boolean;
    /**
     * The getPackedMaterialData method.
     * @param material - The material param.
     * @return - The return value.
     */
    static getPackedMaterialData(material: Material): Float32Array;
    /**
     * Each shader provides a template material that each material instance is
     * based on. The shader specifies the parameters needed by the shader, and
     * the material provides values to the shader during rendering.
     * @return - The template material value.
     */
    static getMaterialTemplate(): Material;
}
export { FlatSurfaceShader };