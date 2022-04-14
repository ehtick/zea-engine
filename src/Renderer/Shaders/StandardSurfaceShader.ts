/* eslint-disable require-jsdoc */
import { Color } from '../../Math/index'
import { Registry } from '../../Registry'
import { GLShader } from '../GLShader'

import './GLSL/index'
// @ts-ignore
import vert from './StandardSurface.vert'
// @ts-ignore
import frag from './StandardSurface.frag'
import { Material } from '../../SceneTree/Material'
import { MaterialColorParam, ColorSpace } from '../../SceneTree/Parameters/MaterialColorParam'
import { MaterialFloatParam } from '../../SceneTree/Parameters/MaterialFloatParam'
import { StandardSurfaceMaterial } from '../../SceneTree/Materials/StandardSurfaceMaterial'
import { WebGL12RenderingContext } from '../types/webgl'
import { ColorRenderState, RenderState } from '../RenderStates'

/** A standard shader handling Opaque and transparent items and PBR rendering.
 * @extends GLShader
 * @private
 */
class StandardSurfaceShader extends GLShader {
  /**
   * Create a GL shader.
   * @param gl - The webgl rendering context.
   */
  constructor(gl?: WebGL12RenderingContext) {
    super(gl, 'StandardSuraceShader')
    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
  }

  /**
   * The bind method.
   * @param renderstate - The object tracking the current state of the renderer
   * @param key - The key value.
   * @return - The return value.
   */
  bind(renderstate: RenderState, key: string): boolean {
    super.bind(renderstate, key)

    if (renderstate instanceof ColorRenderState) {
      const colorRenderState = <ColorRenderState>renderstate
      const gl = this.__gl!
      if (colorRenderState.envMap) {
        colorRenderState.envMap.bind(colorRenderState)
      }

      const { exposure, cutColor, renderMode } = colorRenderState.unifs
      if (exposure) {
        gl.uniform1f(exposure.location, colorRenderState.exposure)
      }

      if (colorRenderState.renderMode && renderMode) {
        if (colorRenderState.renderMode == 'flat') {
          gl.uniform1i(renderMode.location, 2)
        } else if (colorRenderState.renderMode == 'pbr') {
          gl.uniform1i(renderMode.location, 3)
        }
      }
      
      if (cutColor) {
        gl.uniform4f(cutColor.location, 0.3, 0, 0, 1)
      }
    }

    return true
  }

  /**
   * The getPackedMaterialData method.
   * @param material - The material param.
   * @return - The return value.
   */
  static getPackedMaterialData(material: Material): Float32Array {
    const matData = new Float32Array(20)

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

    matData[4] = material.getParameter('AmbientOcclusion')!.value
    matData[5] = material.getParameter('Metallic')!.value
    matData[6] = material.getParameter('Roughness')!.value
    matData[7] = material.getParameter('Reflectance')!.value

    matData[8] = material.getParameter('EmissiveStrength')!.value
    matData[9] = material.getParameter('Opacity')!.value

    const edgeColor = material.getParameter('EdgeColor')!.value
    matData[12] = edgeColor.r
    matData[13] = edgeColor.g
    matData[14] = edgeColor.b
    matData[15] = edgeColor.a

    const pointColor = material.getParameter('PointColor')!.value
    matData[16] = pointColor.r
    matData[17] = pointColor.g
    matData[18] = pointColor.b
    matData[19] = pointColor.a
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

const material = new StandardSurfaceMaterial('StandardSurfaceShader_template')

Registry.register('StandardSurfaceShader', StandardSurfaceShader)
Registry.register('TransparentSurfaceShader', StandardSurfaceShader)

export { StandardSurfaceShader }
