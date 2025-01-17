import { Registry } from '../../Registry'
import { MaterialColorParam } from '../Parameters/MaterialColorParam'
import { MaterialFloatParam } from '../Parameters/MaterialFloatParam'
import { Color } from '../../Math/Color'
import { Material } from '../Material'
import { CloneContext } from '../CloneContext'

export class StandardSurfaceMaterial extends Material {
  baseColorParam: MaterialColorParam = new MaterialColorParam('BaseColor', new Color(1.0, 1, 0.5))
  normalParam: MaterialColorParam = new MaterialColorParam('Normal', new Color(1.0, 1, 0.5))
  ambientOcclusion: MaterialFloatParam = new MaterialFloatParam('AmbientOcclusion', 1, [0, 1])
  metallicParam: MaterialFloatParam = new MaterialFloatParam('Metallic', 0.05, [0, 1])

  roughnessParam: MaterialFloatParam = new MaterialFloatParam('Roughness', 0.5, [0, 1])
  reflectanceParam: MaterialFloatParam = new MaterialFloatParam('Reflectance', 0.5, [0, 1])
  emissiveStrengthParam: MaterialFloatParam = new MaterialFloatParam('EmissiveStrength', 0, [0, 1])
  opacityParam: MaterialFloatParam = new MaterialFloatParam('Opacity', 1, [0, 1])

  edgeColorParam: MaterialColorParam = new MaterialColorParam('EdgeColor', new Color(0.2, 0.2, 0.2))
  pointColorParam: MaterialColorParam = new MaterialColorParam('PointColor', new Color(0.1, 0.1, 0.1))

  constructor(name?: string) {
    super(name)
    this.__shaderName = 'StandardSurfaceShader'
    this.addParameter(this.baseColorParam)
    this.addParameter(this.normalParam)
    this.addParameter(this.ambientOcclusion)
    this.addParameter(this.metallicParam)
    this.addParameter(this.roughnessParam)
    this.addParameter(this.reflectanceParam)
    this.addParameter(this.emissiveStrengthParam)
    this.addParameter(this.opacityParam)

    this.addParameter(this.edgeColorParam)
    this.addParameter(this.pointColorParam)
  }

  /**
   * The clone method constructs a new material, copies its values
   * from this item and returns it.
   *
   * @param context - The context value.
   * @return - Returns a new cloned material.
   */
  clone(context?: CloneContext): StandardSurfaceMaterial {
    const cloned = new StandardSurfaceMaterial()
    cloned.copyFrom(this, context)
    return cloned
  }
}

Registry.register('StandardSurfaceMaterial', StandardSurfaceMaterial)
