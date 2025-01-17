/* eslint-disable require-jsdoc */
import { Registry } from '../../Registry'
import { GLShader } from '../GLShader'
import { Material } from '../../SceneTree/Material'
import { LinesMaterial } from '../../SceneTree/Materials/LinesMaterial'

import './GLSL/index'
// @ts-ignore
import vert from './Lines.vert'
// @ts-ignore
import frag from './Lines.frag'
import { WebGL12RenderingContext } from '../types/webgl'
import { ColorSpace, MaterialColorParam } from '../../SceneTree/Parameters/MaterialColorParam'

class LinesShader extends GLShader {
  /**
   * Create a GL shader.
   * @param gl - The webgl rendering context.
   */
  constructor(gl?: WebGL12RenderingContext) {
    super(gl, 'LinesShader')
    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
  }

  /**
   * The getPackedMaterialData method.
   * @param material - The material param.
   * @return - The return value.
   */
  static getPackedMaterialData(material: Material): Float32Array {
    const matData = new Float32Array(8)
    const baseColorParam = material.getParameter('BaseColor')
    let baseColor
    if (baseColorParam instanceof MaterialColorParam && baseColorParam.colorSpace == ColorSpace.Gamma) {
      baseColor = baseColorParam.value.toLinear()
    } else {
      baseColor = baseColorParam.value
    }
    matData[0] = baseColor.r
    matData[1] = baseColor.g
    matData[2] = baseColor.b
    matData[3] = baseColor.a
    // Note: By avoiding calling this value 'Opacity', the lines will not be considered 'Transparent'
    // Lines do not need to be depth sorted....
    matData[4] = material.getParameter('Opacity')!.value
    matData[5] = material.getParameter('Overlay')!.value

    return matData
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

const material = new LinesMaterial('LinesShader_template')
Registry.register('LinesShader', LinesShader)

export { LinesShader }
