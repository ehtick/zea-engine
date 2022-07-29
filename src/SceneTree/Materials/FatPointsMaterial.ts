import { Registry } from '../../Registry'
import { MaterialColorParam } from '../Parameters/MaterialColorParam'
import { NumberParameter } from '../Parameters/NumberParameter'
import { Color } from '../../Math/Color'
import { Material } from '../Material'
import { CloneContext } from '../CloneContext'

export class FatPointsMaterial extends Material {
  baseColorParam: MaterialColorParam = new MaterialColorParam('BaseColor', new Color(1, 1, 1))
  pointSizeParam: NumberParameter = new NumberParameter('PointSize', 1)
  borderWidthParam: NumberParameter = new NumberParameter('BorderWidth', 0.2)
  overlayParam: NumberParameter = new NumberParameter('Overlay', 0.0)

  constructor(name?: string) {
    super(name)
    this.__shaderName = 'FatPointsShader'
    this.addParameter(this.baseColorParam)
    this.addParameter(this.pointSizeParam)
    this.addParameter(this.borderWidthParam)
    this.addParameter(this.overlayParam)
  }

  /**
   * The clone method constructs a new material, copies its values
   * from this item and returns it.
   *
   * @param context - The context value.
   * @return - Returns a new cloned material.
   */
  clone(context?: CloneContext): FatPointsMaterial {
    const cloned = new FatPointsMaterial()
    cloned.copyFrom(this, context)
    return cloned
  }
}

Registry.register('FatPointsMaterial', FatPointsMaterial)
