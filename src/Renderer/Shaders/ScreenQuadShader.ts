/* eslint-disable require-jsdoc */
import { GLShader } from '../GLShader'

import './GLSL/index'
import frag from './ScreenQuad.frag'
import vert from './ScreenQuad.vert'

class ScreenQuadShader extends GLShader {
  /**
   * Create a GL shader.
   * @param {WebGLRenderingContext} gl - The webgl rendering context.
   */
  constructor(gl: WebGLRenderingContext) {
    super(gl, 'ScreenQuadShader')
    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
  }
}

export { ScreenQuadShader }
