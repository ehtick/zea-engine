/* eslint-disable require-jsdoc */
import { GLShader } from '../GLShader'

import './GLSL/index'
import frag from './EnvMap.frag'
import vert from './EnvMap.vert'
class EnvMapShader extends GLShader {
  /**
   * Create a GL shader.
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
   */
  constructor(gl: WebGL12RenderingContext) {
    super(gl, 'EnvMapShader')
    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
  }
}

export { EnvMapShader }
