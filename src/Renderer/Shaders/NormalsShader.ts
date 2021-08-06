/* eslint-disable require-jsdoc */
import { GLShader } from '../GLShader'

import './GLSL/index'
import frag from './Normals.frag'
import vert from './Normals.vert'

class NormalsShader extends GLShader {
  /**
   * Create a GL shader.
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
   */
  constructor(gl: WebGL12RenderingContext) {
    super(gl, 'NormalsShader')
    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
    //  TODO: should a finalize() be here?
  }
}

export { NormalsShader }
