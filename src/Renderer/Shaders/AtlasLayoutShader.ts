/* eslint-disable require-jsdoc */
import { GLShader } from '../GLShader'

import './GLSL/index'
import vert from './AtlasLayout.vert'
import frag from './AtlasLayout.frag'
// eslint-disable-next-line require-jsdoc
class AtlasLayoutShader extends GLShader {
  /**
   * Create an atlas layout shader.
   * @param {WebGLRenderingContext} gl - The webgl rendering context.
   */
  constructor(gl: WebGLRenderingContext) {
    super(gl, 'AtlasLayoutShader')
    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
  }
}

// Registry.register('AtlasLayoutShader', AtlasLayoutShader)
export { AtlasLayoutShader }
