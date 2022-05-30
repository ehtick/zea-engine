import { ProceduralLines } from './ProceduralLines'
import { Registry } from '../../../Registry'
import { NumberParameter } from '../../../SceneTree/Parameters/NumberParameter'
import { Vec3Attribute } from '../Vec3Attribute'
import { Vec3 } from '../../../Math'

/**
 * A class for generating a cross shape, drawing a line on the `X,Y,Z` axes.
 * The axis line length is the `size` you specify, but the middle of the line is positioned in the coordinate `(0, 0, 0)` .
 * Meaning that half of the line goes negative and half goes positive.
 *
 * ```
 * const cross = new Cross(1.5)
 * ```
 *
 * **Parameters**
 * * **Size(`NumberParameter`):** Specifies the size of the cross.
 *
 * @extends {ProceduralLines}
 */
class Cross extends ProceduralLines {
  /**
   * @member sizeParam - Specifies the size of the cross.
   */
  sizeParam: NumberParameter

  /**
   * Create a cross.
   * @param size - The size of the cross.
   */
  constructor(size = 1.0) {
    super()

    if (isNaN(size)) throw new Error('Invalid geom args')

    this.sizeParam = this.addParameter(new NumberParameter('Size', size)) as NumberParameter
  }

  /**
   * The rebuild method.
   * @private
   */
  rebuild(): void {
    this.setNumVertices(6)
    this.setNumSegments(3)
    this.setSegmentVertexIndices(0, 0, 1)
    this.setSegmentVertexIndices(1, 2, 3)
    this.setSegmentVertexIndices(2, 4, 5)
    this.resize()
  }

  /**
   * The resize method.
   * @private
   */
  resize(): void {
    const size = this.sizeParam.value
    const positions = <Vec3Attribute>this.getVertexAttribute('positions')
    if (!positions) return
    positions.setValue(0, new Vec3(-0.5 * size, 0, 0))
    positions.setValue(1, new Vec3(0.5 * size, 0, 0))
    positions.setValue(2, new Vec3(0, 0.5 * size, 0))
    positions.setValue(3, new Vec3(0, -0.5 * size, 0))
    positions.setValue(4, new Vec3(0, 0, 0.5 * size))
    positions.setValue(5, new Vec3(0, 0, -0.5 * size))
  }
}

Registry.register('Cross', Cross)

export { Cross }
