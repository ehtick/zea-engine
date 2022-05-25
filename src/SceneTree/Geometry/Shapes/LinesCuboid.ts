import { NumberParameter } from '../../Parameters/NumberParameter'
import { Registry } from '../../../Registry'
import { ProceduralLines } from './ProceduralLines'
import { BooleanParameter } from '../../../SceneTree/Parameters'
import { Vec3Attribute } from '../Vec3Attribute'
import { Vec3 } from '../../../Math'

/**
 * A class for generating a lines cuboid shape(Without faces).
 *
 * **Parameters**
 * * **X(`NumberParameter`):** Length of the line cuboid along the `X` axis
 * * **Y(`NumberParameter`):** Length of the line cuboid along the `Y` axis
 * * **Z(`NumberParameter`):** Length of the line cuboid along the `Z` axis
 * * **BaseZAtZero(`NumberParameter`):** Property to start or not `Z` axis from position `0.
 *
 * @extends {ProceduralLines}
 */
class LinesCuboid extends ProceduralLines {
  /**
   * @member baseZAtZeroParam - Property to start or not `Z` axis from position `0.
   */
  baseZAtZeroParam: BooleanParameter

  /**
   * @member sizeXParam - Length of the line cuboid along the `X` axis
   */
  sizeXParam: NumberParameter

  /**
   * @member sizeYParam - Length of the line cuboid along the `Y` axis
   */
  sizeYParam: NumberParameter

  /**
   * @member sizeZParam - Length of the line cuboid along the `Z` axis
   */
  sizeZParam: NumberParameter

  /**
   * Create a lines cuboid.
   * @param x - The length of the line cuboid along the X axis.
   * @param y - The length of the line cuboid along the Y axis.
   * @param z - The length of the line cuboid along the Z axis.
   * @param baseZAtZero - The baseZAtZero value.
   */
  constructor(x = 1.0, y = 1.0, z = 1.0, baseZAtZero = false) {
    super()

    this.sizeXParam = this.addParameter(new NumberParameter('X', x)) as NumberParameter
    this.sizeYParam = this.addParameter(new NumberParameter('Y', y)) as NumberParameter
    this.sizeZParam = this.addParameter(new NumberParameter('Z', z)) as NumberParameter

    this.baseZAtZeroParam = this.addParameter(new BooleanParameter('BaseZAtZero', baseZAtZero)) as BooleanParameter
  }

  /**
   * The rebuild method.
   * @private
   */
  rebuild(): void {
    this.setNumVertices(8)
    this.setNumSegments(12)
    this.setSegmentVertexIndices(0, 0, 1)
    this.setSegmentVertexIndices(1, 1, 2)
    this.setSegmentVertexIndices(2, 2, 3)
    this.setSegmentVertexIndices(3, 3, 0)

    this.setSegmentVertexIndices(4, 4, 5)
    this.setSegmentVertexIndices(5, 5, 6)
    this.setSegmentVertexIndices(6, 6, 7)
    this.setSegmentVertexIndices(7, 7, 4)

    this.setSegmentVertexIndices(8, 0, 4)
    this.setSegmentVertexIndices(9, 1, 5)
    this.setSegmentVertexIndices(10, 2, 6)
    this.setSegmentVertexIndices(11, 3, 7)
    this.resize()
  }

  /**
   * The resize method.
   *
   * @private
   */
  resize(): void {
    const x = this.sizeXParam.value
    const y = this.sizeYParam.value
    const z = this.sizeZParam.value
    const baseZAtZero = this.baseZAtZeroParam.value

    const positions = <Vec3Attribute>this.getVertexAttribute('positions')
    if (positions) {
      let zoff = 0.5
      if (baseZAtZero) zoff = 1.0
      positions.setValue(0, new Vec3(0.5 * x, -0.5 * y, zoff * z))
      positions.setValue(1, new Vec3(0.5 * x, 0.5 * y, zoff * z))
      positions.setValue(2, new Vec3(-0.5 * x, 0.5 * y, zoff * z))
      positions.setValue(3, new Vec3(-0.5 * x, -0.5 * y, zoff * z))

      zoff = -0.5
      if (baseZAtZero) zoff = 0.0
      positions.setValue(4, new Vec3(0.5 * x, -0.5 * y, zoff * z))
      positions.setValue(5, new Vec3(0.5 * x, 0.5 * y, zoff * z))
      positions.setValue(6, new Vec3(-0.5 * x, 0.5 * y, zoff * z))
      positions.setValue(7, new Vec3(-0.5 * x, -0.5 * y, zoff * z))
    }
  }
}

Registry.register('LinesCuboid', LinesCuboid)
export { LinesCuboid }
