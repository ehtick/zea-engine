/* eslint-disable no-unused-vars */
import { Vec2 } from '../../../Math/Vec2-renamed'
import { Vec3 } from '../../../Math/Vec3'
import { BooleanParameter, NumberParameter } from '../../Parameters/index'
import { Registry } from '../../../Registry'
import { ProceduralMesh } from './ProceduralMesh'

/**
 * Represents a cone geometry.
 *
 * ```
 * const cone = new Cone(1.2, 4.0)
 * ```
 *
 * **Parameters**
 * * **Radius(`NumberParameter`):** Specifies the radius of the base of the cone.
 * * **Height(`NumberParameter`):** Specifies the height of the cone.
 * * **Detail(`NumberParameter`):** Specifies the number of subdivisions around the `Z` axis.
 * * **Cap(`BooleanParameter`):** Specifies whether the base of the cone is capped or open.
 *
 * @extends {ProceduralMesh}
 */
class Cone extends ProceduralMesh {
  /**
   * Create a cone.
   * @param {number} radius - The radius of the base of the cone.
   * @param {number} height - The height of the cone.
   * @param {number} detail - The detail of the cone.
   * @param {boolean} [cap=true] -  A boolean indicating whether the base of the cone is capped or open.
   * @param {boolean} [addNormals=true] - Compute vertex normals for the geometry
   * @param {boolean} [addTextureCoords=true] - Compute texture coordinates for the geometry
   */
  constructor(radius = 0.5, height = 1.0, detail = 32, cap = true, addNormals = true, addTextureCoords = true) {
    super()

    if (isNaN(radius) || isNaN(height) || isNaN(detail)) throw new Error('Invalid geom args')

    this.__radiusParam = this.addParameter(new NumberParameter('Radius', radius))
    this.__heightParam = this.addParameter(new NumberParameter('Height', height))
    this.__detailParam = this.addParameter(new NumberParameter('Detail', detail >= 3 ? detail : 3, [3, 200], 1))
    this.__capParam = this.addParameter(new BooleanParameter('Cap', cap))

    if (addNormals) this.addVertexAttribute('normals', Vec3)
    if (addTextureCoords) this.addVertexAttribute('texCoords', Vec2)

    this.topologyParams.push('Detail')
    this.topologyParams.push('Cap')
  }

  /**
   * The rebuild method.
   * @private
   */
  rebuild() {
    const nbSides = this.__detailParam.getValue()
    const radius = this.__radiusParam.getValue()
    const height = this.__heightParam.getValue()
    const cap = this.__capParam.getValue()
    let numVertices = nbSides + 1
    if (cap) {
      numVertices += 1
    }
    this.setNumVertices(numVertices)
    const tipPoint = nbSides
    const basePoint = nbSides + 1

    // ////////////////////////////
    // Set Vertex Positions
    const positions = this.getVertexAttribute('positions')

    positions.getValueRef(tipPoint).set(0.0, 0.0, height)
    for (let i = 0; i < nbSides; i++) {
      const theta = -((i / nbSides) * 2.0 * Math.PI)
      positions.getValueRef(i).set(radius * Math.cos(theta), radius * Math.sin(theta), 0.0)
    }
    if (cap) {
      positions.getValueRef(basePoint).set(0.0, 0.0, 0.0)
    }

    // ////////////////////////////
    // Build the topology
    this.setFaceCounts([nbSides + (cap ? nbSides : 0)])
    for (let i = 0; i < nbSides; i++) {
      const j = (i + 1) % nbSides
      this.setFaceVertexIndices(i, [j, i, tipPoint])
    }
    if (cap) {
      for (let i = 0; i < nbSides; i++) {
        const j = (i + 1) % nbSides
        this.setFaceVertexIndices(nbSides + i, [i, j, basePoint])
      }
    }

    // ////////////////////////////
    // setUVs
    const texCoords = this.getVertexAttribute('texCoords')
    if (texCoords) {
      // Now set the attribute values
      let tri = 0
      for (let i = 0; i < nbSides; i++) {
        texCoords.setFaceVertexValue(tri, 0, new Vec2((i + 1) / nbSides, 0.0))
        texCoords.setFaceVertexValue(tri, 1, new Vec2(i / nbSides, 0.0))
        texCoords.setFaceVertexValue(tri, 2, new Vec2((i + 0.5) / nbSides, 1.0))
      }
      if (cap) {
        for (let i = 0; i < nbSides; i++) {
          texCoords.setFaceVertexValue(tri, 0, new Vec2(i / nbSides, 0.0))
          texCoords.setFaceVertexValue(tri, 1, new Vec2((i + 1) / nbSides, 0.0))
          texCoords.setFaceVertexValue(tri, 2, new Vec2((i + 0.5) / nbSides, 1.0))
          tri++
        }
      }
    }

    this.resize()
  }

  /**
   * The resize method.
   * @private
   */
  resize() {
    const nbSides = this.__detailParam.getValue()
    const radius = this.__radiusParam.getValue()
    const height = this.__heightParam.getValue()
    const cap = this.__capParam.getValue()

    const tipPoint = nbSides
    const basePoint = nbSides + 1

    const positions = this.getVertexAttribute('positions')
    positions.getValueRef(tipPoint).set(0.0, 0.0, height)
    for (let i = 0; i < nbSides; i++) {
      const theta = -((i / nbSides) * 2.0 * Math.PI)
      positions.getValueRef(i).set(radius * Math.cos(theta), radius * Math.sin(theta), 0.0)
    }
    if (this.__cap) {
      positions.getValueRef(basePoint).set(0.0, 0.0, 0.0)
    }
    const normals = this.getVertexAttribute('normals')
    if (normals) {
      this.computeVertexNormals()
    }
  }
}

Registry.register('Cone', Cone)
export { Cone }
