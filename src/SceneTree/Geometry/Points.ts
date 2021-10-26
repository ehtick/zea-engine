import { BaseGeom } from './BaseGeom'
import { Registry } from '../../Registry'
import { BinReader } from '../BinReader'
import { Vec3 } from '../../Math/Vec3'
import { Box3 } from '../../Math/Box3'
import { Vec3Attribute } from './Vec3Attribute'

/**
 * Class representing a point primitive drawing type, every vertex specified is a point.
 *
 * ```
 * const points = new Points()
 * ```
 *
 * * **Events**
 * * **boundingBoxChanged:** Triggered when the bounding box changes.
 *
 * @extends BaseGeom
 */
class Points extends BaseGeom {
  /**
   * Create points.
   */
  constructor() {
    super()
  }

  /**
   * The clear method.
   */
  clear() {
    this.setNumVertices(0)
    this.emit('geomDataTopologyChanged')
  }

  /**
   * Loads and populates `Points` object from a binary reader.
   *
   * @param reader - The reader value.
   */
  loadBin(reader: BinReader) {
    this.name = reader.loadStr()
    const numVerts = reader.loadUInt32()
    this.__boundingBox.set(reader.loadFloat32Vec3(), reader.loadFloat32Vec3())
    this.setNumVertices(numVerts)
    const positions = <Vec3Attribute>this.getVertexAttribute('positions')
    if (!positions) {
      throw Error('positions is undefined')
    }
    if (numVerts < 256) {
      const bboxMat = this.__boundingBox.toMat4()
      const posAttr8bit = reader.loadUInt8Array(numVerts * 3)
      for (let i = 0; i < numVerts; i++) {
        const pos = new Vec3(
          posAttr8bit[i * 3 + 0] / 255.0,
          posAttr8bit[i * 3 + 1] / 255.0,
          posAttr8bit[i * 3 + 2] / 255.0
        )

        positions.setValue(i, bboxMat.transformVec3(pos))
      }
    } else {
      const numClusters = reader.loadUInt32()
      const clusters = []
      for (let i = 0; i < numClusters; i++) {
        const range = reader.loadUInt32Vec2()
        const p0 = reader.loadFloat32Vec3()
        const p1 = reader.loadFloat32Vec3()
        clusters.push({
          range: range,
          bbox: new Box3(p0, p1),
        })
      }
      const posAttr8bit = reader.loadUInt8Array(numVerts * 3)

      for (let i = 0; i < numClusters; i++) {
        const bboxMat = clusters[i]['bbox'].toMat4()
        for (let j = clusters[i]['range'].x; j < clusters[i]['range'].y; j++) {
          const pos = new Vec3(
            posAttr8bit[j * 3 + 0] / 255.0,
            posAttr8bit[j * 3 + 1] / 255.0,
            posAttr8bit[j * 3 + 2] / 255.0
          )
          positions.setValue(j, bboxMat.transformVec3(pos))
        }
      }
    }
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * Sets state of current geometry(Including line segments) using a binary reader object.
   *
   * @param reader - The reader value.
   * @param context - The context value.
   */
  readBinary(reader: BinReader, context: Record<string, unknown>) {
    super.loadBaseGeomBinary(reader)

    // this.computeVertexNormals();
    this.emit('geomDataChanged', {})
  }
}

Registry.register('Points', Points)

export { Points }
