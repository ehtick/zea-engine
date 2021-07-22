/* eslint-disable require-jsdoc */
import { Color } from '../../Math/Color'
import { Registry } from '../../Registry'
import { GLShader } from '../GLShader'

import './GLSL/index'
import frag from './ScreenSpace.frag'
import vert from './ScreenSpace.vert'

class ScreenSpaceShader extends GLShader {
  /**
   * Create a GL shader.
   * @param {WebGLRenderingContext} gl - The webgl rendering context.
   */
  constructor(gl: WebGLRenderingContext) {
    super(gl, 'ScreenSpaceShader')

    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
  }

  static isOverlay() {
    return true
  }

  static getParamDeclarations() {
    const paramDescs = super.getParamDeclarations()
    paramDescs.push({
      name: 'BaseColor',
      defaultValue: new Color(1.0, 1.0, 0.5),
    })
    return paramDescs
  }

  /**
   * The getPackedMaterialData method.
   * @param {any} material - The material param.
   * @return {any} - The return value.
   */
  static getPackedMaterialData(material: any) {
    const matData = new Float32Array(8)
    const baseColor = material.getParameter('BaseColor').getValue()
    matData[0] = baseColor.r
    matData[1] = baseColor.g
    matData[2] = baseColor.b
    matData[3] = baseColor.a
    return matData
  }
}

// Registry.register('ScreenSpaceShader', ScreenSpaceShader)
export { ScreenSpaceShader }
