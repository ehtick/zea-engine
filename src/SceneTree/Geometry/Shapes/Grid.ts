import { BooleanParameter, NumberParameter } from '../../Parameters/index'
import { Registry } from '../../../Registry'
import { ProceduralLines } from './ProceduralLines'
import { Vec3Attribute } from '../Vec3Attribute'

/**
 * Represents a network of lines that cross each other to form a series of squares or rectangles.
 *
 * ```
 * const grid = new Grid(5, 5, 50, 50, true)
 * ```
 *
 * **Parameters**
 * * **X(`NumberParameter`):** Length of the grid along the `X` axis.
 * * **Y(`NumberParameter`):** Length of the grid along the `Y` axis.
 * * **XDivisions(`NumberParameter`):** Number of divisions along `X` axis
 * * **YDivisions(`NumberParameter`):** Number of divisions along `Y` axis
 * * **SkipCenterLines(`BooleanParameter`):** Property that indicates whether to display the center grid lines or not
 *
 * @extends {ProceduralLines}
 */
class Grid extends ProceduralLines {
  protected __skipCenterLinesParam: BooleanParameter
  protected __xDivisionsParam: NumberParameter
  protected __xParam: NumberParameter
  protected __yDivisionsParam: NumberParameter
  protected __yParam: NumberParameter
  // topologyParams: string[]

  /**
   * Create a grid.
   * @param {number} x - The length of the grid along the `X` axis.
   * @param {number} y - The length of the grid along the `Y` axis.
   * @param {number} xDivisions - The number of divisions along `X` axis.
   * @param {number} yDivisions - The number of divisions along `Y` axis.
   * @param {boolean} skipCenterLines - A boolean indicating whether to display the center grid lines or not.
   */
  constructor(x = 1.0, y = 1.0, xDivisions = 10, yDivisions = 10, skipCenterLines = false) {
    super()
    this.topologyParams = []
    if (isNaN(x) || isNaN(y) || isNaN(xDivisions) || isNaN(yDivisions)) throw new Error('Invalid geom args')

    this.__xParam = this.addParameter(new NumberParameter('X', x)) as NumberParameter
    this.__yParam = this.addParameter(new NumberParameter('Y', y)) as NumberParameter
    this.__xDivisionsParam = this.addParameter(new NumberParameter('XDivisions', xDivisions)) as NumberParameter
    this.__yDivisionsParam = this.addParameter(new NumberParameter('YDivisions', yDivisions)) as NumberParameter
    this.__skipCenterLinesParam = this.addParameter(
      new BooleanParameter('SkipCenterLines', skipCenterLines)
    ) as BooleanParameter

    this.topologyParams.push('XDivisions')
    this.topologyParams.push('YDivisions')
    this.topologyParams.push('SkipCenterLines')
  }

  /**
   * The rebuild method.
   * @private
   */
  rebuild(): void {
    const xDivisions = this.__xDivisionsParam.getValue() || 10
    const yDivisions = this.__yDivisionsParam.getValue() || 10

    const skipCenterLines = this.__skipCenterLinesParam.getValue() && xDivisions % 2 == 0 && yDivisions % 2 == 0
    this.setNumVertices((xDivisions + yDivisions + 2 - (skipCenterLines ? 1 : 0)) * 2)
    this.setNumSegments(xDivisions + yDivisions + 2 - (skipCenterLines ? 1 : 0))
    let idx = 0
    for (let i = 0; i <= xDivisions; i++) {
      if (skipCenterLines && i == xDivisions / 2) continue
      const v0 = idx * 2
      const v1 = idx * 2 + 1
      this.setSegmentVertexIndices(idx, v0, v1)
      idx++
    }
    for (let i = 0; i <= yDivisions; i++) {
      if (skipCenterLines && i == xDivisions / 2) continue
      const v0 = idx * 2
      const v1 = idx * 2 + 1
      this.setSegmentVertexIndices(idx, v0, v1)
      idx++
    }
    this.resize()
  }

  /**
   * The resize method.
   * @private
   */
  resize(): void {
    const positions = <Vec3Attribute>this.getVertexAttribute('positions')
    const xDivisions = this.__xDivisionsParam.getValue() || 10
    const yDivisions = this.__yDivisionsParam.getValue() || 10
    const xSize = this.__xParam.getValue() || 1.0
    const ySize = this.__yParam.getValue() || 1.0

    const skipCenterLines = this.__skipCenterLinesParam.getValue() && xDivisions % 2 == 0 && yDivisions % 2 == 0
    let idx = 0
    for (let i = 0; i <= xDivisions; i++) {
      if (skipCenterLines && i == xDivisions / 2) continue
      const v0 = idx * 2
      const v1 = idx * 2 + 1
      const x = (i / xDivisions - 0.5) * xSize
      if (positions) {
        positions.getValueRef(v0).set(x, -0.5 * ySize, 0.0)
        positions.getValueRef(v1).set(x, 0.5 * ySize, 0.0)
      }

      idx++
    }
    for (let i = 0; i <= yDivisions; i++) {
      if (skipCenterLines && i == xDivisions / 2) continue
      const v0 = idx * 2
      const v1 = idx * 2 + 1
      const y = (i / yDivisions - 0.5) * ySize
      if (positions) {
        positions.getValueRef(v0).set(-0.5 * xSize, y, 0.0)
        positions.getValueRef(v1).set(0.5 * xSize, y, 0.0)
      }
      idx++
    }
  }
}

Registry.register('Grid', Grid)

export { Grid }
