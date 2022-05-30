import { ProceduralPoints } from './ProceduralPoints'
import { NumberParameter } from '../../Parameters/NumberParameter'
import { Registry } from '../../../Registry'
import { Vec3Attribute } from '../Vec3Attribute'
import { Vec3 } from '../../../Math'

/**
 * Represents an ordered grid of points along `X` and `Y` axes.
 *
 * ```
 * const pointGrid = new PointGrid(2.2, 1.5, 12, 12)
 * ```
 *
 * **Parameters**
 * * **X(`NumberParameter`):** Length of the grid along the `X` axis.
 * * **Y(`NumberParameter`):** Length of the grid along the `Y` axis.
 * * **XDivisions(`NumberParameter`):** Number of divisions along `X` axis
 * * **YDivisions(`NumberParameter`):** Number of divisions along `Y` axis
 * @extends {ProceduralPoints}
 */
class PointGrid extends ProceduralPoints {
  /**
   * @member sizeXParam - Length of the grid along the `X` axis.
   */
  sizeXParam: NumberParameter

  /**
   * @member divisionsXParam - Number of divisions along `X` axis
   */
  divisionsXParam: NumberParameter

  /**
   * @member sizeYParam - Length of the grid along the `Y` axis.
   */
  sizeYParam: NumberParameter

  /**
   * @member divisionsYParam - Number of divisions along `Y` axis
   */
  divisionsYParam: NumberParameter
  // topologyParams: string[]

  /**
   * Creates an instance of PointGrid.
   *
   * @param x - The length of the point grid along the X axis.
   * @param y - The length of the point grid along the Y axis.
   * @param xDivisions - The number of divisions along the X axis.
   * @param yDivisions - The number of divisions along the Y axis.
   * @param addTextureCoords - The addTextureCoords value.
   */
  constructor(x = 1.0, y = 1.0, xDivisions = 1, yDivisions = 1, addTextureCoords = false) {
    super()
    this.topologyParams = []
    if (isNaN(x) || isNaN(y) || isNaN(xDivisions) || isNaN(yDivisions)) throw new Error('Invalid geom args')
    this.sizeXParam = this.addParameter(new NumberParameter('X', x)) as NumberParameter
    this.sizeYParam = this.addParameter(new NumberParameter('Y', y)) as NumberParameter
    this.divisionsXParam = this.addParameter(new NumberParameter('XDivisions', xDivisions)) as NumberParameter
    this.divisionsYParam = this.addParameter(new NumberParameter('YDivisions', yDivisions)) as NumberParameter

    this.topologyParams.push('XDivisions')
    this.topologyParams.push('YDivisions')
  }

  /**
   * The rebuild method.
   * @private
   */
  rebuild(): void {
    const xDivisions = this.divisionsXParam.value
    const yDivisions = this.divisionsYParam.value
    this.setNumVertices(xDivisions * yDivisions)
    this.resize()
  }

  /**
   * The resize method.
   * @private
   */
  resize(): void {
    const xDivisions = this.divisionsXParam.value
    const yDivisions = this.divisionsYParam.value
    const x = this.sizeXParam.value
    const y = this.sizeYParam.value

    const positions = <Vec3Attribute>this.getVertexAttribute('positions')
    if (!positions) return
    for (let i = 0; i < yDivisions; i++) {
      const newY = (i / (yDivisions - 1) - 0.5) * y
      for (let j = 0; j < xDivisions; j++) {
        const newX = (j / (xDivisions - 1) - 0.5) * x
        positions.setValue(i * xDivisions + j, new Vec3(newX, newY, 0.0))
      }
    }
  }
}

Registry.register('PointGrid', PointGrid)
export { PointGrid }
