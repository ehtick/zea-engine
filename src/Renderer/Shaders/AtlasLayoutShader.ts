/* eslint-disable require-jsdoc */
import { GLShader } from '../GLShader'

import './GLSL/index'
// @ts-ignore
import vert from './AtlasLayout.vert'
// @ts-ignore
import frag from './AtlasLayout.frag'
import { WebGL12RenderingContext } from '../types/webgl'
// eslint-disable-next-line require-jsdoc
class AtlasLayoutShader extends GLShader {
  /**
   * Create an atlas layout shader.
   * @param gl - The webgl rendering context.
   */
  constructor(gl: WebGL12RenderingContext) {
    super(gl, 'AtlasLayoutShader')
    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
  }
}

// Registry.register('AtlasLayoutShader', AtlasLayoutShader)
export { AtlasLayoutShader }
