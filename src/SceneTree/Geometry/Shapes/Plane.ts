import { NumberParameter } from '../../Parameters/index'
import { Registry } from '../../../Registry'
import { ProceduralMesh } from './ProceduralMesh'
import { Vec3Attribute } from '../Vec3Attribute'
import { Vec2Attribute } from '../Vec2Attribute'

/**
 * A class for generating a plane geometry.
 *
 * ```
 * const plane = new Plane(2.0, 1.5, 10, 10)
 * ```
 *
 * **Parameters**
 * * **SizeX(`NumberParameter`):** Length of the plane along `X` axis.
 * * **SizeY(`NumberParameter`):** Length of the plane along `Y` axis.
 * * **DetailX(`NumberParameter`):** Number of divisions along `X`axis.
 * * **DetailY(`NumberParameter`):** Number of divisions along `Y`axis.
 *
 * @extends {ProceduralMesh}
 */
class Plane extends ProceduralMesh {
  protected __detailXParam: NumberParameter
  protected __detailYParam: NumberParameter
  protected __sizeXParam: NumberParameter
  protected __sizeYParam: NumberParameter
  // topologyParams: string[]

  /**
   * Create a plane.
   * @param {number} [SizeX=1.0] - The length of the plane along the X axis.
   * @param {number} [SizeY=1.0] - The length of the plane along the Y axis.
   * @param {number} [DetailX=1] - The number of divisions along the X axis.
   * @param {number} [DetailY=1] - The number of divisions along the Y axis.
   * @param {boolean} [addNormals=true] - The addNormals value.
   * @param {boolean} [addTextureCoords=true] - The addTextureCoords value.
   */
  constructor(SizeX = 1.0, SizeY = 1.0, DetailX = 1, DetailY = 1, addNormals = true, addTextureCoords = true) {
    super()
    this.topologyParams = []
    if (isNaN(SizeX) || isNaN(SizeY) || isNaN(DetailX) || isNaN(DetailY)) throw new Error('Invalid geom args')

    this.__sizeXParam = this.addParameter(new NumberParameter('SizeX', SizeX)) as NumberParameter
    this.__sizeYParam = this.addParameter(new NumberParameter('SizeY', SizeY)) as NumberParameter
    this.__detailXParam = this.addParameter(new NumberParameter('DetailX', DetailX)) as NumberParameter
    this.__detailYParam = this.addParameter(new NumberParameter('DetailY', DetailY)) as NumberParameter
    if (addNormals) this.addVertexAttribute('normals', new Vec3Attribute())
    if (addTextureCoords) this.addVertexAttribute('texCoords', new Vec2Attribute())

    this.topologyParams.push('DetailX')
    this.topologyParams.push('DetailY')
  }

  /**
   * The rebuild method.
   * @private
   */
  rebuild(): void {
    const detailX = this.__detailXParam.getValue() || 1
    const detailY = this.__detailYParam.getValue() || 1
    this.setNumVertices((detailX + 1) * (detailY + 1))
    this.setFaceCounts([0, detailX * detailY])

    let quadId = 0
    for (let i = 0; i < detailY; i++) {
      for (let j = 0; j < detailX; j++) {
        const v0 = (detailX + 1) * (i + 1) + j
        const v1 = (detailX + 1) * (i + 1) + (j + 1)
        const v2 = (detailX + 1) * i + (j + 1)
        const v3 = (detailX + 1) * i + j
        this.setFaceVertexIndices(quadId, [v0, v1, v2, v3])
        quadId = quadId + 1
      }
    }

    let voff = 0
    const normals = <Vec3Attribute>this.getVertexAttribute('normals')
    if (normals) {
      for (let i = 0; i <= detailY; i++) {
        for (let j = 0; j <= detailX; j++) {
          normals.getValueRef(voff).set(0, 0, 1)
          voff++
        }
      }
    }

    voff = 0
    const texCoords = <Vec2Attribute>this.getVertexAttribute('texCoords')
    if (texCoords) {
      for (let i = 0; i <= detailY; i++) {
        const y = i / detailY
        for (let j = 0; j <= detailX; j++) {
          const x = j / detailX
          texCoords.getValueRef(voff).set(x, y)
          voff++
        }
      }
    }

    this.resize()
  }

  /**
   * The resize method.
   *
   * @private
   */
  resize(): void {
    const sizeX = this.__sizeXParam.getValue() || 1.0
    const sizeY = this.__sizeYParam.getValue() || 1.0
    const detailX = this.__detailXParam.getValue() || 1
    const detailY = this.__detailYParam.getValue() || 1
    const positions = <Vec3Attribute>this.getVertexAttribute('positions')
    if (!positions) return

    let voff = 0
    for (let i = 0; i <= detailY; i++) {
      const y = (i / detailY - 0.5) * sizeY
      for (let j = 0; j <= detailX; j++) {
        const x = (j / detailX - 0.5) * sizeX
        positions.getValueRef(voff).set(x, y, 0.0)
        voff++
      }
    }
  }
}

Registry.register('Plane', Plane)
export { Plane }
