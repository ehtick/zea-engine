import { Vec2, Vec3 } from '../../../Math/index'
import { NumberParameter } from '../../Parameters/NumberParameter'
import { Registry } from '../../../Registry'
import { ProceduralMesh } from './ProceduralMesh'

/**
 * A class for generating a sphere geometry.
 *
 * ```
 * const sphere = new Sphere(1.4, 13)
 * ```
 *
 * **Parameters**
 * * **Radius(`NumberParameter`):** Radius of the sphere.
 * * **Sides(`NumberParameter`):** Specifies the number of subdivisions around the `Z` axis.
 * * **Loops(`NumberParameter`):** Specifies the number of subdivisions(stacks) along the `Z` axis.
 *
 * @extends {ProceduralMesh}
 */
class Sphere extends ProceduralMesh {
  /**
   * Creates an instance of Sphere.
   * @param {number} [radius=1.0] - The radius of the sphere.
   * @param {number} [sides=12] - The number of sides.
   * @param {number} [loops=12] - The number of loops.
   * @param {boolean} [addNormals=true] - Compute vertex normals for the geometry
   * @param {boolean} [addTextureCoords=true] - Compute texture coordinates for the geometry
   */
  constructor(radius = 1.0, sides = 12, loops = 12, addNormals = true, addTextureCoords = true) {
    super()

    if (isNaN(radius) || isNaN(sides) || isNaN(loops)) throw new Error('Invalid geom args')

    this.__radiusParam = this.addParameter(new NumberParameter('Radius', radius))
    this.__sidesParam = this.addParameter(new NumberParameter('Sides', sides >= 3 ? sides : 3, [3, 200], 1))
    this.__loopsParam = this.addParameter(new NumberParameter('Loops', loops >= 3 ? loops : 3, [3, 200], 1))

    if (addNormals) this.addVertexAttribute('normals', Vec3)
    if (addTextureCoords) this.addVertexAttribute('texCoords', Vec2)

    this.topologyParams.push('Sides')
    this.topologyParams.push('Loops')
  }

  /**
   * The rebuild method.
   * @private
   */
  rebuild() {
    const radius = this.__radiusParam.getValue()
    const nbSides = this.__sidesParam.getValue()
    const nbLoops = this.__loopsParam.getValue()

    const numVertices = 2 + nbSides * nbLoops
    const numTris = nbSides * 2
    const numQuads = nbSides * nbLoops
    this.setNumVertices(numVertices)
    this.setFaceCounts([numTris, numQuads])

    // ////////////////////////////
    // Set Vertex Positions

    const positions = this.getVertexAttribute('positions')
    const normals = this.getVertexAttribute('normals')
    const normal = new Vec3(0.0, 0.0, 1.0)
    let vertex = 0
    positions.getValueRef(vertex).set(0.0, 0.0, radius)
    if (normals) normals.getValueRef(vertex).set(0.0, 0.0, 1.0)
    vertex++

    for (let i = 0; i < nbLoops; i++) {
      const theta = ((i + 1) / (nbLoops + 1)) * Math.PI
      for (let j = 0; j < nbSides; j++) {
        const phi = -((j / nbSides) * 2.0 * Math.PI)
        normal.set(Math.sin(theta) * Math.cos(phi), Math.sin(theta) * Math.sin(phi), Math.cos(theta))

        // Set positions and normals at the same time.
        positions.getValueRef(vertex).setFromOther(normal.scale(radius))
        if (normals) normals.getValueRef(vertex).setFromOther(normal)
        vertex++
      }
    }

    positions.getValueRef(vertex).set(0.0, 0.0, -radius)
    if (normals) normals.getValueRef(vertex).set(0.0, 0.0, -1.0)
    vertex++

    // ////////////////////////////
    // Build the topology
    const texCoords = this.getVertexAttribute('texCoords')
    // build the fan at the first pole.
    let faceIndex = 0
    for (let j = 0; j < nbSides; j++) {
      const v0 = 0
      const v1 = ((j + 1) % nbSides) + 1
      const v2 = j + 1
      this.setFaceVertexIndices(faceIndex, [v0, v1, v2])

      if (texCoords) {
        const uv0 = new Vec2(0.5, 0.0)
        const uv1 = new Vec2((j + 1) / (nbSides - 1), 1 / (nbLoops + 1))
        const uv2 = new Vec2(j / (nbSides - 1), 1 / (nbLoops + 1))
        texCoords.setFaceVertexValue(faceIndex, 0, uv0)
        texCoords.setFaceVertexValue(faceIndex, 1, uv1)
        texCoords.setFaceVertexValue(faceIndex, 2, uv2)
      }

      faceIndex++
    }
    // Build the fan at the second pole.
    for (let j = 0; j < nbSides; j++) {
      const v0 = numVertices - 1
      const v2 = nbSides * (nbLoops - 1) + ((j + 1) % nbSides) + 1
      const v1 = nbSides * (nbLoops - 1) + j + 1
      this.setFaceVertexIndices(faceIndex, [v0, v1, v2])

      if (texCoords) {
        const uv0 = new Vec2(0.5, 1.0)
        const uv1 = new Vec2((j + 1) / (nbSides - 1), 1 - 1 / (nbLoops + 1))
        const uv2 = new Vec2(j / (nbSides - 1), 1 - 1 / (nbLoops + 1))
        texCoords.setFaceVertexValue(faceIndex, 0, uv0)
        texCoords.setFaceVertexValue(faceIndex, 1, uv1)
        texCoords.setFaceVertexValue(faceIndex, 2, uv2)
      }

      faceIndex++
    }

    for (let i = 0; i < nbLoops - 1; i++) {
      for (let j = 0; j < nbSides; j++) {
        const v0 = nbSides * i + j + 1
        const v1 = nbSides * i + ((j + 1) % nbSides) + 1
        const v2 = nbSides * (i + 1) + ((j + 1) % nbSides) + 1
        const v3 = nbSides * (i + 1) + j + 1
        this.setFaceVertexIndices(faceIndex, [v0, v1, v2, v3])

        if (texCoords) {
          texCoords.setFaceVertexValue(faceIndex, 0, new Vec2(j / nbSides, (i + 1) / nbLoops))
          texCoords.setFaceVertexValue(faceIndex, 1, new Vec2((j + 1) / nbSides, (i + 1) / nbLoops))
          texCoords.setFaceVertexValue(faceIndex, 2, new Vec2((j + 1) / nbSides, (i + 2) / nbLoops))
          texCoords.setFaceVertexValue(faceIndex, 3, new Vec2(j / nbSides, (i + 2) / nbLoops))
        }
        faceIndex++
      }
    }
  }

  /**
   * The resize method.
   * @private
   */
  resize() {
    const radius = this.__radiusParam.getValue()
    const nbSides = this.__sidesParam.getValue()
    const nbLoops = this.__loopsParam.getValue()

    // ////////////////////////////
    // Set Vertex Positions
    const positions = this.getVertexAttribute('positions')
    const normals = this.getVertexAttribute('normals')
    let vertex = 0
    const normal = new Vec3(0.0, 0.0, 1.0)
    positions.getValueRef(vertex).set(0.0, 0.0, radius)
    if (normals) normals.getValueRef(vertex).set(0.0, 0.0, 1.0)
    vertex++

    for (let i = 0; i < nbLoops; i++) {
      const theta = ((i + 1) / (nbLoops + 1)) * Math.PI
      for (let j = 0; j < nbSides; j++) {
        const phi = (j / nbSides) * 2.0 * Math.PI
        normal.set(Math.sin(theta) * Math.cos(phi), Math.sin(theta) * Math.sin(phi), Math.cos(theta))

        // Set positions and normals at the same time.
        positions.getValueRef(vertex).setFromOther(normal.scale(radius))
        if (normals) normals.getValueRef(vertex).setFromOther(normal)
        vertex++
      }
    }
    positions.getValueRef(vertex).set(0.0, 0.0, -radius)
    if (normals) normals.getValueRef(vertex).set(0.0, 0.0, -1.0)
    vertex++
  }
}

Registry.register('Sphere', Sphere)

export { Sphere }
