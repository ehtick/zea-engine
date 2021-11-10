/* eslint-disable require-jsdoc */
import { Color } from '../../Math/index'
import { Registry } from '../../Registry'
import { GLShader } from '../GLShader'

import './GLSL/index'
// @ts-ignore
import frag from './FatLines.frag'
// @ts-ignore
import vert from './FatLines.vert'
import { shaderLibrary } from '../ShaderLibrary'
import { Material } from '../../SceneTree/Material'
import { MaterialColorParam } from '../../SceneTree/Parameters/MaterialColorParam'
import { NumberParameter } from '../../SceneTree/Parameters/NumberParameter'
import { FatLinesMaterial } from '../../SceneTree/Materials/FatLinesMaterial'

/** Shader for drawing Fat lines
 * @extends GLShader
 * @private
 */
class FatLinesShader extends GLShader {
  /**
   * Create a GL shader.
   * @param gl - The webgl rendering context.
   */
  constructor(gl?: WebGL12RenderingContext) {
    super(gl, 'FatLinesShader')
    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
  }

  bind(renderstate: RenderState, key: any) {
    if (super.bind(renderstate, key)) {
      renderstate.supportsInstancing = false
      return true
    }
    return false
  }

  /**
   * The supportsInstancing method.
   * @return - return false for shaders that cannot be rendered in instanced mode.
   */
  static supportsInstancing() {
    return false
  }
}


const material = new FatLinesMaterial('FatLinesShader_template')
shaderLibrary.registerMaterialTemplate('FatLinesShader', material)
Registry.register('FatLinesShader', FatLinesShader)

export { FatLinesShader }
