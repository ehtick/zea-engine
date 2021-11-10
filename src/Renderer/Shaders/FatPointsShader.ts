/* eslint-disable require-jsdoc */
import { Color } from '../../Math/index'
import { Registry } from '../../Registry'
import { Material, NumberParameter, MaterialColorParam } from '../../SceneTree'
import { GLShader } from '../GLShader'
import { shaderLibrary } from '../ShaderLibrary'

import './GLSL/index'
// @ts-ignore
import vert from './FatPoints.vert'
// @ts-ignore
import frag from './FatPoints.frag'
class FatPointsShader extends GLShader {
  /**
   * Create a GL shader.
   * @param gl - The webgl rendering context.
   */
  constructor(gl?: WebGL12RenderingContext) {
    super(gl, 'FatPointsShader')
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

  /**
   * Each shader provides a template material that each material instance is
   * based on. The shader specifies the parameters needed by the shader, and
   * the material provides values to the shader during rendering.
   * @return - The template material value.
   */
  static getMaterialTemplate(): Material {
    return material
  }
}

const material = new Material('LinesShader_template')
material.addParameter(new MaterialColorParam('BaseColor', new Color(1.0, 1, 0.5)))
material.addParameter(new NumberParameter('PointSize', 1.0, [0, 1]))
material.addParameter(new NumberParameter('Rounded', 1.0))
material.addParameter(new NumberParameter('BorderWidth', 0.2))
material.addParameter(new NumberParameter('Overlay', 0.0))

Registry.register('FatPointsShader', FatPointsShader)

// Note: due to a bug in webpack, if these classes are not exported,
// then we get a mangling of the code _only_in_release_mode_.
// The factory returns FatPointsSelectedShader
// instead of FatPointsShader when the GLPAss tries to construct it.
export { FatPointsShader }
