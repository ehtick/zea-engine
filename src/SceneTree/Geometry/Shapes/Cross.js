import { Lines } from '../Lines.js'
import { NumberParameter } from '../../Parameters/NumberParameter.js'
import { sgFactory } from '../../SGFactory.js'

/** Class representing a cross.
 * @extends Lines
 */
class Cross extends Lines {
  /**
   * Create a cross.
   * @param {number} size - The size value.
   */
  constructor(size = 1.0) {
    super()

    if (isNaN(size)) throw new Error('Invalid geom args')

    this.__sizeParam = this.addParameter(new NumberParameter('size', size))
    this.__rebuild()

    const resize = () => {
      this.__resize()
    }
    this.__sizeParam.valueChanged.connect(resize)
  }

  /**
   * Getter for size.
   */
  get size() {
    return this.__size
  }

  /**
   * Setter for size.
   * @param {number} val - The val param.
   */
  set size(val) {
    this.__size = val
    this.__resize()
  }

  /**
   * The __rebuild method.
   * @private
   */
  __rebuild() {
    this.setNumVertices(6)
    this.setNumSegments(3)
    this.setSegment(0, 0, 1)
    this.setSegment(1, 2, 3)
    this.setSegment(2, 4, 5)
    this.__resize()
  }

  /**
   * The __resize method.
   * @private
   */
  __resize() {
    const size = this.__sizeParam.getValue()
    this.getVertex(0).set(-0.5 * size, 0, 0)
    this.getVertex(1).set(0.5 * size, 0, 0)
    this.getVertex(2).set(0, 0.5 * size, 0)
    this.getVertex(3).set(0, -0.5 * size, 0)
    this.getVertex(4).set(0, 0, 0.5 * size)
    this.getVertex(5).set(0, 0, -0.5 * size)
    this.setBoundingBoxDirty()
  }
}
sgFactory.registerClass('Cross', Cross)

export { Cross }
