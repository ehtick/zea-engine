import { Registry } from '../../Registry'
import { MaterialColorParam } from '../Parameters/MaterialColorParam'
import { MaterialFloatParam } from '../Parameters/MaterialFloatParam'
import { Color } from '../../Math/Color'
import { Material } from '../Material'
import { CloneContext } from '../CloneContext'

export class FlatSurfaceMaterial extends Material {
  baseColorParam: MaterialColorParam = new MaterialColorParam('BaseColor', new Color(1.0, 1, 0.5))
  overlayParam: MaterialFloatParam = new MaterialFloatParam('Overlay', 0.0)
  constructor(name?: string) {
    super(name)
    this.__shaderName = 'FlatSurfaceShader'
    this.addParameter(this.baseColorParam)
    this.addParameter(this.overlayParam)
  }

  /**
   * The clone method constructs a new material, copies its values
   * from this item and returns it.
   *
   * @param context - The context value.
   * @return - Returns a new cloned material.
   */
  clone(context?: CloneContext): FlatSurfaceMaterial {
    const cloned = new FlatSurfaceMaterial()
    cloned.copyFrom(this, context)
    return cloned
  }
}

Registry.register('FlatSurfaceMaterial', FlatSurfaceMaterial)
