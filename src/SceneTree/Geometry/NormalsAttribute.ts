import { Vec3Attribute } from './Vec3Attribute'

/**
 * Class representing an attribute.
 */
class NormalsAttribute extends Vec3Attribute {
  init() {
    this.data = new Uint8Array(0)
    this.initRange(0)
  }
}

export { NormalsAttribute }
