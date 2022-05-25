import { Vec2 } from '../../../Math/Vec2'
import { Vec3 } from '../../../Math/Vec3'
import { BooleanParameter, NumberParameter } from '../../Parameters/index'
import { Registry } from '../../../Registry'
import { ProceduralMesh } from './ProceduralMesh'
import { Vec3Attribute } from '../Vec3Attribute'
import { Vec2Attribute } from '../Vec2Attribute'
import { Vec2f16Attribute } from '../Vec2f16Attribute'
import { Vec3f8Attribute } from '../Vec3f8Attribute'

/**
 * A class for generating a cylinder geometry. It is very much like a cuboid but with `N` number of sides.
 *
 * ```
 * const cylinder = new Cylinder(1.5, 2.0, 6)
 * ```
 *
 * **Parameters**
 * * **Radius(`NumberParameter`):** Specifies the radius of the cylinder.
 * * **Height(`NumberParameter`):** Specifies the height of the cone.
 * * **Sides(`NumberParameter`):** Specifies the number of subdivisions around the `Z` axis.
 * * **Loops(`NumberParameter`):** Specifies the number of subdivisions(stacks) on the `Z` axis.
 * * **Caps(`BooleanParameter`):** Specifies whether the ends of the cylinder are capped or open.
 * * **BaseZAtZero(`BooleanParameter`):** Property to start or not `Z` axis from position `0.
 *
 * @extends {ProceduralMesh}
 */
class Cylinder extends ProceduralMesh {
  /**
   * @member baseZAtZeroParam - Property to start or not `Z` axis from position `0.
   */
  baseZAtZeroParam: BooleanParameter

  /**
   * @member capsParam - Specifies whether the ends of the cylinder are capped or open.
   */
  capsParam: BooleanParameter

  /**
   * @member heightParam - Specifies the height of the cone.
   */
  heightParam: NumberParameter

  /**
   * @member loopsParam - Specifies the number of subdivisions(stacks) on the `Z` axis.
   */
  loopsParam: NumberParameter

  /**
   * @member radiusParam - Specifies the radius of the cylinder.
   */
  radiusParam: NumberParameter

  /**
   * @member sidesParam - Specifies the number of subdivisions around the `Z` axis.
   */
  sidesParam: NumberParameter
  // topologyParams: string[]

  /**
   * Create a cylinder.
   * @param radius - The radius of the cylinder.
   * @param height - The height of the cylinder.
   * @param sides - The number of sides.
   * @param loops - The number of loops.
   * @param caps - A boolean indicating whether the ends of the cylinder are capped or open.
   * @param baseZAtZero - The baseZAtZero value.
   */
  constructor(radius = 0.5, height = 1.0, sides = 32, loops = 2, caps = true, baseZAtZero = false) {
    super()
    this.topologyParams = []
    if (isNaN(radius) || isNaN(height) || isNaN(sides) || isNaN(loops)) throw new Error('Invalid geom args')

    this.radiusParam = this.addParameter(new NumberParameter('Radius', radius)) as NumberParameter
    this.heightParam = this.addParameter(new NumberParameter('Height', height)) as NumberParameter
    this.sidesParam = this.addParameter(
      new NumberParameter('Sides', sides >= 3 ? sides : 3, [3, 200], 1)
    ) as NumberParameter
    this.loopsParam = this.addParameter(
      new NumberParameter('Loops', loops >= 2 ? loops : 2, [1, 200], 1)
    ) as NumberParameter
    this.capsParam = this.addParameter(new BooleanParameter('Caps', caps)) as BooleanParameter
    this.baseZAtZeroParam = this.addParameter(new BooleanParameter('BaseZAtZero', baseZAtZero)) as BooleanParameter

    this.addVertexAttribute('texCoords', new Vec2f16Attribute())
    this.addVertexAttribute('normals', new Vec3f8Attribute()) // TODO: review args/params.

    this.topologyParams.push('Sides')
    this.topologyParams.push('Loops')
    this.topologyParams.push('Caps')
  }

  /**
   * The rebuild method.
   * @private
   */
  rebuild(): void {
    const nbSides = this.sidesParam.value
    const nbLoops = this.loopsParam.value
    const caps = this.capsParam.value

    let numVertices = nbSides * nbLoops
    if (caps) {
      numVertices += 2
    }
    this.setNumVertices(numVertices)
    if (caps) this.setFaceCounts([nbSides * 2, nbSides])
    else this.setFaceCounts([0, nbSides])

    // ////////////////////////////
    // Build the topology
    let faceIndex = 0

    if (caps) {
      // Bottom caps topology
      for (let j = 0; j < nbSides; j++) {
        const v0 = numVertices - 1
        const v1 = j
        const v2 = (j + 1) % nbSides
        this.setFaceVertexIndices(faceIndex++, [v0, v1, v2])
      }
      // Top caps topology
      for (let j = 0; j < nbSides; j++) {
        const v0 = nbSides * (nbLoops - 1) + j
        const v1 = numVertices - 2
        const v2 = nbSides * (nbLoops - 1) + ((j + 1) % nbSides)
        this.setFaceVertexIndices(faceIndex++, [v0, v1, v2])
      }
    }

    // build the topology for the body of the cylinder
    for (let i = 0; i < nbLoops - 1; i++) {
      for (let j = 0; j < nbSides; j++) {
        const v0 = nbSides * i + ((j + 1) % nbSides)
        const v1 = nbSides * i + j
        const v2 = nbSides * (i + 1) + j
        const v3 = nbSides * (i + 1) + ((j + 1) % nbSides)
        this.setFaceVertexIndices(faceIndex++, [v0, v1, v2, v3])
      }
    }

    // ////////////////////////////
    // setNormals
    const normals = <Vec3Attribute>this.getVertexAttribute('normals')
    if (normals) {
      // Now set the attribute values
      faceIndex = 0
      if (caps) {
        const normal = new Vec3(0.0, 0.0, -1.0)
        for (let i = 0; i < nbSides; i++) {
          normals.setFaceVertexValue(faceIndex, 0, normal)
          normals.setFaceVertexValue(faceIndex, 1, normal)
          normals.setFaceVertexValue(faceIndex, 2, normal)
          faceIndex++
        }
        normal.set(0.0, 0.0, 1.0)
        for (let i = 0; i < nbSides; i++) {
          normals.setFaceVertexValue(faceIndex, 0, normal)
          normals.setFaceVertexValue(faceIndex, 1, normal)
          normals.setFaceVertexValue(faceIndex, 2, normal)
          faceIndex++
        }
      }
      for (let i = 0; i < nbLoops - 1; i++) {
        for (let j = 0; j < nbSides; j++) {
          let phi = (j / nbSides) * 2.0 * Math.PI
          const normal1 = new Vec3(Math.sin(phi), Math.cos(phi), 0.0)
          normals.setFaceVertexValue(faceIndex, 0, normal1)
          normals.setFaceVertexValue(faceIndex, 1, normal1)

          phi = ((j + 1) / nbSides) * 2.0 * Math.PI
          const normal2 = new Vec3(Math.sin(phi), Math.cos(phi), 0.0)
          normals.setFaceVertexValue(faceIndex, 2, normal2)
          normals.setFaceVertexValue(faceIndex, 3, normal2)
          faceIndex++
        }
      }
    }

    // ////////////////////////////
    // setUVs
    const texCoords = <Vec2Attribute>this.getVertexAttribute('texCoords')
    if (texCoords) {
      // Now set the attrbute values
      faceIndex = 0
      if (caps) {
        for (let i = 0; i < nbSides; i++) {
          texCoords.setFaceVertexValue(faceIndex, 0, new Vec2(i / nbSides, 0.0))
          texCoords.setFaceVertexValue(faceIndex, 1, new Vec2((i + 1) / nbSides, 0.0))
          texCoords.setFaceVertexValue(faceIndex, 2, new Vec2((i + 0.5) / nbSides, 1.0))
          faceIndex++
        }
        for (let i = 0; i < nbSides; i++) {
          texCoords.setFaceVertexValue(faceIndex, 0, new Vec2(i / nbSides, 0.0))
          texCoords.setFaceVertexValue(faceIndex, 1, new Vec2((i + 1) / nbSides, 0.0))
          texCoords.setFaceVertexValue(faceIndex, 2, new Vec2((i + 0.5) / nbSides, 1.0))
          faceIndex++
        }
      }

      for (let i = 0; i < nbSides; i++) {
        texCoords.setFaceVertexValue(faceIndex, 0, new Vec2((i + 1) / nbSides, 0.0))
        texCoords.setFaceVertexValue(faceIndex, 2, new Vec2((i + 1) / nbSides, 1.0))
        texCoords.setFaceVertexValue(faceIndex, 1, new Vec2(i / nbSides, 0.0))
        texCoords.setFaceVertexValue(faceIndex, 3, new Vec2(i / nbSides, 1.0))
        faceIndex++
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
    const nbLoops = this.loopsParam.value
    const radius = this.radiusParam.value
    const height = this.heightParam.value
    const caps = this.capsParam.value
    const baseZAtZero = this.baseZAtZeroParam.value

    let numVertices = nbSides * nbLoops
    if (caps) {
      numVertices += 2
    }
    let vertex = 0
    let zoff = 0.5
    if (baseZAtZero) zoff = 0.0

    const positions = <Vec3Attribute>this.getVertexAttribute('positions')
    if (positions) {
      for (let i = 0; i < nbLoops; i++) {
        const z = (i / (nbLoops - 1)) * height - height * zoff
        for (let j = 0; j < nbSides; j++) {
          const phi = (j / nbSides) * 2.0 * Math.PI
          positions.setValue(vertex, new Vec3(Math.sin(phi) * radius, Math.cos(phi) * radius, z))
          vertex++
        }
      }
      if (caps) {
        positions.setValue(numVertices - 1, new Vec3(0.0, 0.0, height * (baseZAtZero ? 0.0 : -0.5)))
        positions.setValue(numVertices - 2, new Vec3(0.0, 0.0, height * (baseZAtZero ? 1.0 : 0.5)))
      }
    }
    this.dirtyTopology = false
    this.dirtyVertices = false
    this.computeVertexNormals()
  }
}

Registry.register('Cylinder', Cylinder)

export { Cylinder }
