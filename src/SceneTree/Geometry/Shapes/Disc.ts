import { Vec3 } from '../../../Math/Vec3'
import { NumberParameter } from '../../Parameters/index'
import { Registry } from '../../../Registry'
import { ProceduralMesh } from './ProceduralMesh'
import { Vec2Attribute } from '../Vec2Attribute'
import { Vec3Attribute } from '../Vec3Attribute'
import { Vec3f8Attribute } from '../Vec3f8Attribute'
import { Vec2f16Attribute } from '../Vec2f16Attribute'
import { Vec2 } from '../../../Math'

/**
 * A class for generating a disc geometry.
 *
 * ```
 * const disc = new Disc(2.0, 22)
 * ```
 *
 * **Parameters**
 * * **Radius(`NumberParameter`):** Specifies the radius of the disc.
 * * **Sides(`NumberParameter`):** Specifies the resolution, or the disc subdivisions around `Z` axis.
 *
 * @extends {ProceduralMesh}
 */
class Disc extends ProceduralMesh {
  /**
   * @member radiusParam - Specifies the radius of the disc.
   */
  radiusParam: NumberParameter

  /**
   * @member sidesParam - Specifies the resolution, or the disc subdivisions around `Z` axis.
   */
  sidesParam: NumberParameter
  // topologyParams: string[]

  /**
   * Creates an instance of Disc.
   *
   * @param radius - The radius of the disc.
   * @param sides - The number of sides.
   */
  constructor(radius = 0.5, sides = 32) {
    super()
    this.topologyParams = []
    if (isNaN(radius) || isNaN(sides)) throw new Error('Invalid geom args')

    this.radiusParam = this.addParameter(new NumberParameter('Radius', radius)) as NumberParameter
    this.sidesParam = this.addParameter(
      new NumberParameter('Sides', sides >= 3 ? sides : 3, [3, 200], 1)
    ) as NumberParameter

    this.addVertexAttribute('texCoords', new Vec2f16Attribute())
    this.addVertexAttribute('normals', new Vec3f8Attribute())

    this.topologyParams.push('Sides')
  }

  /**
   * The rebuild method.
   * @private
   */
  rebuild(): void {
    const nbSides = this.sidesParam.value

    this.setNumVertices(nbSides + 1)
    this.setFaceCounts([nbSides])

    // ////////////////////////////
    // Set Vertex Positions
    const positions = <Vec3Attribute>this.getVertexAttribute('positions')
    if (positions) positions.setValue(0, new Vec3(0.0, 0.0, 0.0))

    // ////////////////////////////
    // Build the topology
    for (let j = 0; j < nbSides; j++) {
      const v1 = (j % nbSides) + 1
      const v2 = ((j + 1) % nbSides) + 1
      this.setFaceVertexIndices(j, [0, v1, v2])
    }

    // ////////////////////////////
    // setNormals
    const normals = <Vec3Attribute>this.getVertexAttribute('normals')
    if (normals) {
      // Now set the attrbute values
      const normal = new Vec3(0, 0, 1)
      normals.setValue(0, normal)
      for (let i = 0; i < nbSides; i++) {
        normals.setValue(i + 1, normal)
      }
    }

    // ////////////////////////////
    // setUVs
    const texCoords = <Vec2Attribute>this.getVertexAttribute('texCoords')
    if (texCoords) {
      texCoords.setValue(0, new Vec2(0.5, 0.5))
      for (let i = 0; i < nbSides; i++) {
        const phi = (i / nbSides) * 2.0 * Math.PI
        texCoords.setValue(i + 1, new Vec2(Math.sin(phi) * 0.5 + 0.5, Math.cos(phi) * 0.5 + 0.5))
      }
    }

    this.resize()
  }

  /**
   * The resize method.
   * @private
   */
  resize(): void {
    const nbSides = this.sidesParam.value
    const radius = this.radiusParam.value
    const positions = <Vec3Attribute>this.getVertexAttribute('positions')
    if (positions) {
      for (let i = 0; i < nbSides; i++) {
        const phi = (i / nbSides) * 2.0 * Math.PI
        positions.setValue(i + 1, new Vec3(Math.sin(phi) * radius, Math.cos(phi) * radius, 0.0))
      }
    }
  }
}

Registry.register('Disc', Disc)

export { Disc }
