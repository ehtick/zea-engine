/* eslint-disable require-jsdoc */
import { GLShader } from '../GLShader'

import './GLSL/index'
// @ts-ignore
import frag from './BoundingBox.frag'
// @ts-ignore
import vert from './BoundingBox.vert'
import { WebGL12RenderingContext } from '../types/webgl'

class BoundingBoxShader extends GLShader {
  /**
   * Create a GL shader.
   * @param gl - The webgl rendering context.
   */
  constructor(gl: WebGL12RenderingContext) {
    super(gl, 'BoundingBoxShader')
    this.setShaderStage('VERTEX_SHADER', vert)

    this.setShaderStage('FRAGMENT_SHADER', frag)
  }
}

export { BoundingBoxShader }
