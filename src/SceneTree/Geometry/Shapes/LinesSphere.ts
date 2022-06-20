import { NumberParameter } from '../../Parameters/index'
import { Registry } from '../../../Registry'
import { ProceduralLines } from './ProceduralLines'
import { Vec3Attribute } from '../Vec3Attribute'

/**
 * A class for generating a sphere made up of 3 circles, one on each plane: XY, YZ, XZ.
 *
 * ```
 * const linesSphere = new LinesSphere(2.2, 12)
 * ```
 *
 * **Parameters**
 * * **Radius(`NumberParameter`):** Radius of the circle.
 * * **Sides(`NumberParameter`):** Segments angle in radiants.
 *
 * @extends {ProceduralLines}
 */
class LinesSphere extends ProceduralLines {
  /**
   * @member sidesParam - The number of sides that compose the circle (e.g. 3 creates a triangle)
   */
  sidesParam: NumberParameter

  /**
   * @member radiusParam - The radius of the circle
   */
  radiusParam: NumberParameter

  /**
   * Creates an instance of LinesSphere.
   * @param radius - The radius of the circle.
   * @param sides - The number of segments.
   * @param angle - Arc segments angle(radians)
   */
  constructor(radius = 1.0, sides = 32) {
    super()
    this.topologyParams = []
    if (isNaN(radius) || isNaN(sides)) throw new Error('Invalid geom args')

    this.radiusParam = this.addParameter(new NumberParameter('Radius', radius)) as NumberParameter
    this.sidesParam = this.addParameter(
      new NumberParameter('Sides', sides >= 3 ? sides : 3, [3, 200], 1)
    ) as NumberParameter

    this.topologyParams.push('Sides')
  }

  /**
   * The rebuild method.
   * @private
   */
  rebuild(): void {
    const segs = this.sidesParam.value
    const numCirces = 3
    this.setNumVertices(segs * numCirces)
    this.setNumSegments(segs * numCirces)
    const addSegments = (off: number) => {
      for (let i = 0; i < segs; i++) this.setSegmentVertexIndices(i + off, i + off, ((i + 1) % segs) + off)
    }
    addSegments(0)
    addSegments(segs)
    addSegments(segs * 2)
    this.resize()
  }

  /**
   * The resize method.
   * @private
   */
  resize(): void {
    const radius = this.radiusParam.value
    const segs = this.sidesParam.value
    const angle = Math.PI * 2
    const step = angle / segs
    const positions = <Vec3Attribute>this.getVertexAttribute('positions')
    if (positions) {
      for (let i = 0; i < segs; i++) {
        positions.getValueRef(i).set(Math.cos(step * i) * radius, Math.sin(step * i) * radius, 0.0)
        positions.getValueRef(i + segs).set(Math.cos(step * i) * radius, 0.0, Math.sin(step * i) * radius)
        positions.getValueRef(i + segs * 2).set(0.0, Math.cos(step * i) * radius, Math.sin(step * i) * radius)
      }
    }
  }
}

Registry.register('LinesSphere', LinesSphere)
export { LinesSphere }
