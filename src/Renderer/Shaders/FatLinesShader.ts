import { Color } from '../../Math/index'
import { Registry } from '../../Registry'
import { GLShader } from '../GLShader'

import './GLSL/index'
import frag from './FatLines.frag'
import vert from './FatLines.vert'
import { shaderLibrary } from '..'
import { Material, MaterialColorParam, NumberParameter } from '../..'

/** Shader for drawing Fat lines
 * @extends GLShader
 * @private
 */
class FatLinesShader extends GLShader {
  /**
   * Create a GL shader.
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
   */
  constructor(gl: WebGL12RenderingContext) {
    super(gl, 'FatLinesShader')
    this.setShaderStage('VERTEX_SHADER', vert)

    this.setShaderStage('FRAGMENT_SHADER', frag)
  }

  bind(renderstate: Record<any, any>) {
    if (super.bind(renderstate, 'FatLinesShader')) {
      renderstate.supportsInstancing = false
      return true
    }
    return false
  }

  static getGeomDataShaderName() {
    return 'FatLinesGeomDataShader'
  }

  // static getSelectedShaderName() {
  //   return 'FatLinesShaderHighlightShader'
  // }

  /**
   * The supportsInstancing method.
   * @return {boolean} - return false for shaders that cannot be rendered in instanced mode.
   */
  static supportsInstancing() {
    return false
  }
}

export { FatLinesShader }
const material = new Material('FatLinesShader_template')
material.addParameter(new MaterialColorParam('BaseColor', new Color(1.0, 1, 0.5)))
material.addParameter(new NumberParameter('Opacity', 1.0))
material.addParameter(new NumberParameter('LineThickness', 0.01))
material.addParameter(new NumberParameter('Overlay', 0.0))
shaderLibrary.registerMaterialTemplate('FatLinesShader', material)
