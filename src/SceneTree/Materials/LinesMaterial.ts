import { Registry } from '../../Registry'
import { MaterialColorParam } from '../Parameters/MaterialColorParam'
import { MaterialFloatParam } from '../Parameters/MaterialFloatParam'
import { NumberParameter } from '../Parameters/NumberParameter'
import { Color } from '../../Math/Color'
import { Material } from '../Material'
import { CloneContext } from '../CloneContext'

export class LinesMaterial extends Material {
  baseColorParam: MaterialColorParam = new MaterialColorParam('BaseColor', new Color(1.0, 1, 0.5))

  opacityParam: MaterialFloatParam = new MaterialFloatParam('Opacity', 0.7, [0, 1])
  overlayParam: MaterialFloatParam = new MaterialFloatParam('Overlay', 0.000001) // Provide a slight overlay so lines draw over meshes

  constructor(name?: string) {
    super(name)
    this.__shaderName = 'LinesShader'
    this.addParameter(this.baseColorParam)
    this.addParameter(this.opacityParam)
    this.addParameter(this.overlayParam)
  }

  /**
   * The clone method constructs a new material, copies its values
   * from this item and returns it.
   *
   * @param context - The context value.
   * @return - Returns a new cloned material.
   */
  clone(context?: CloneContext): LinesMaterial {
    const cloned = new LinesMaterial()
    cloned.copyFrom(this, context)
    return cloned
  }
}

Registry.register('LinesMaterial', LinesMaterial)
