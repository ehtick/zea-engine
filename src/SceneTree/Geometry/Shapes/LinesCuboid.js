import { Lines } from '../Lines.js';
import { NumberParameter } from '../../Parameters/NumberParameter.js';
import { sgFactory } from '../../SGFactory.js';

/** Class representing a lines cuboid.
 * @extends Lines
 */
class LinesCuboid extends Lines {
  /**
   * Create a lines cuboid.
   * @param {number} x - The x value.
   * @param {number} y - The y value.
   * @param {number} z - The z value.
   * @param {boolean} baseZAtZero - The baseZAtZero value.
   */
  constructor(x = 1.0, y = 1.0, z = 1.0, baseZAtZero = false) {
    super();

    this.__x = this.addParameter(new NumberParameter('x', x));
    this.__x.valueChanged.connect(this.__resize.bind(this));
    this.__y = this.addParameter(new NumberParameter('y', y));
    this.__y.valueChanged.connect(this.__resize.bind(this));
    this.__z = this.addParameter(new NumberParameter('z', z));
    this.__z.valueChanged.connect(this.__resize.bind(this));
    this.__baseZAtZero = this.addParameter(
      new NumberParameter('BaseZAtZero', baseZAtZero)
    );
    this.__baseZAtZero.valueChanged.connect(this.__rebuild.bind(this));
    this.__rebuild();
  }

  /**
   * The __rebuild method.
   * @private
   */
  __rebuild() {
    this.setNumVertices(8);
    this.setNumSegments(12);
    this.setSegment(0, 0, 1);
    this.setSegment(1, 1, 2);
    this.setSegment(2, 2, 3);
    this.setSegment(3, 3, 0);

    this.setSegment(4, 4, 5);
    this.setSegment(5, 5, 6);
    this.setSegment(6, 6, 7);
    this.setSegment(7, 7, 4);

    this.setSegment(8, 0, 4);
    this.setSegment(9, 1, 5);
    this.setSegment(10, 2, 6);
    this.setSegment(11, 3, 7);
    this.__resize(-1);
    this.geomDataTopologyChanged.emit();
  }

  /**
   * The __resize method.
   * @param {any} mode - The mode param.
   * @private
   */
  __resize(mode) {
    const x = this.__x.getValue();
    const y = this.__y.getValue();
    const z = this.__z.getValue();
    const baseZAtZero = this.__baseZAtZero.getValue();

    let zoff = 0.5;
    if (baseZAtZero) zoff = 1.0;
    this.getVertex(0).set(0.5 * x, -0.5 * y, zoff * z);
    this.getVertex(1).set(0.5 * x, 0.5 * y, zoff * z);
    this.getVertex(2).set(-0.5 * x, 0.5 * y, zoff * z);
    this.getVertex(3).set(-0.5 * x, -0.5 * y, zoff * z);

    zoff = -0.5;
    if (baseZAtZero) zoff = 0.0;
    this.getVertex(4).set(0.5 * x, -0.5 * y, zoff * z);
    this.getVertex(5).set(0.5 * x, 0.5 * y, zoff * z);
    this.getVertex(6).set(-0.5 * x, 0.5 * y, zoff * z);
    this.getVertex(7).set(-0.5 * x, -0.5 * y, zoff * z);

    this.setBoundingBoxDirty();
    if (mode != -1) this.geomDataChanged.emit();
  }

  /**
   * The toJSON method.
   * @return {any} - The return value.
   */
  toJSON() {
    const json = super.toJSON();
    json['size'] = this.__size;
    return json;
  }
}

sgFactory.registerClass('LinesCuboid', LinesCuboid);
export { LinesCuboid };
