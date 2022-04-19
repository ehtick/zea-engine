/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vec2, Vec3, Box2, Box3, Color } from '../../Math/index'
import { ParameterOwner } from '../ParameterOwner'
import { Attribute } from './Attribute'
import { Vec3Attribute } from './Vec3Attribute'
import { Vec2Attribute } from './Vec2Attribute'
import { BinReader } from '../../SceneTree/BinReader'

const parse8BitPositionsArray = (
  range: Array<number>,
  offset: Vec3,
  sclVec: Vec3,
  positions_quantized: Uint8Array,
  positionsAttr: Vec3Attribute
) => {
  for (let i = range[0]; i < range[1]; i++) {
    const pos = new Vec3(
      positions_quantized[i * 3 + 0] / 255.0,
      positions_quantized[i * 3 + 1] / 255.0,
      positions_quantized[i * 3 + 2] / 255.0
    )
    pos.multiplyInPlace(sclVec)
    pos.addInPlace(offset)
    positionsAttr.setValue(i, pos)
  }
}
const parse16BitPositionsArray = (
  range: Array<number>,
  offset: Vec3,
  sclVec: Vec3,
  positions_quantized: Uint16Array,
  positionsAttr: Vec3Attribute
) => {
  for (let i = range[0]; i < range[1]; i++) {
    const pos = new Vec3(
      positions_quantized[i * 3 + 0] / 65535.0,
      positions_quantized[i * 3 + 1] / 65535.0,
      positions_quantized[i * 3 + 2] / 65535.0
    )
    pos.multiplyInPlace(sclVec)
    pos.addInPlace(offset)
    positionsAttr.setValue(i, pos)
  }
}
const parse8BitNormalsArray = (
  range: Array<number>,
  offset: Vec3,
  sclVec: Vec3,
  normals_quantized: Uint8Array,
  normalsAttr: Vec3Attribute
) => {
  if (sclVec.isNull()) sclVec.set(1, 1, 1)
  for (let i = range[0]; i < range[1]; i++) {
    const normal = new Vec3(
      normals_quantized[i * 3 + 0] / 255.0,
      normals_quantized[i * 3 + 1] / 255.0,
      normals_quantized[i * 3 + 2] / 255.0
    )
    normal.multiplyInPlace(sclVec)
    normal.addInPlace(offset)
    normal.normalizeInPlace()
    normalsAttr.setValue(i, normal)
  }
}
const parse8BitTextureCoordsArray = (
  range: Array<number>,
  offset: Vec2,
  sclVec: Vec2,
  texCoords_quantized: Uint8Array,
  texCoordsAttr: Vec2Attribute
) => {
  // if (sclVec.isNull())
  //     sclVec.set(1, 1, 1);
  for (let i = range[0]; i < range[1]; i++) {
    const textureCoord = new Vec2(texCoords_quantized[i * 2 + 0] / 255.0, texCoords_quantized[i * 2 + 1] / 255.0)
    textureCoord.multiplyInPlace(sclVec)
    textureCoord.addInPlace(offset)
    texCoordsAttr.setValue(i, textureCoord)
  }
}
const parse16BitTextureCoordsArray = (
  range: Array<number>,
  offset: Vec2,
  sclVec: Vec2,
  texCoords_quantized: Uint16Array,
  texCoordsAttr: Vec2Attribute
) => {
  // if (sclVec.isNull())
  //     sclVec.set(1, 1, 1);
  for (let i = range[0]; i < range[1]; i++) {
    const textureCoord = new Vec2(texCoords_quantized[i * 2 + 0] / 65535.0, texCoords_quantized[i * 2 + 1] / 65535.0)
    textureCoord.multiplyInPlace(sclVec)
    textureCoord.addInPlace(offset)
    texCoordsAttr.setValue(i, textureCoord)
  }
}

/**
 * Represents a base class for 3D geometry items.
 *
 * **Events**
 * * **boundingBoxChanged:** Triggered when the bounding box changes.
 * * **geomDataChanged:** Emitted when the geometry attributes have changed. The topology did not change. The Renderer will upload the new attributes to the GPU.
 * * **geomDataTopologyChanged:** Emitted when the geometry attributes and topology have changed.  The Renderer will upload the new attributes and topology to the GPU.
 *
 * @extends ParameterOwner
 */
class BaseGeom extends ParameterOwner {
  protected __boundingBox: Box3 = new Box3()
  protected __boundingBoxDirty: boolean = true
  protected __metaData: Map<string, any> = new Map()
  protected __name: string = ''
  protected __numVertices: number = 0
  protected __vertexAttributes: Map<string, Attribute> = new Map()
  debugColor: Color = new Color(1, 0, 0, 1)
  name: string = ''

  /**
   * Create a base geom.
   */
  constructor() {
    super()
    this.addVertexAttribute('positions', new Vec3Attribute())
  }

  /**
   * The clear method.
   */
  clear(): void {
    this.setNumVertices(0)
  }

  /**
   * Establishes a name for the geometry.
   *
   * @param name - The debug name value.
   */
  setDebugName(name: string): void {
    this.name = name
  }

  /**
   * Adds a new vertex attribute to the geometry.
   *
   * @param name - The name of the vertex attribute.
   * @param dataType - The dataType value. // TODO: is any ok vs. AttrValue | number. Unsure about how dataType is used
   * @return - Returns an attribute.
   */
  addVertexAttribute(name: string, attr: Attribute): void {
    attr.setCount(this.__numVertices)
    this.__vertexAttributes.set(name, attr)
  }

  /**
   * Checks if the the geometry has an attribute with the specified name.
   *
   * @param name - The name of the vertex attribute.
   * @return - The return value.
   */
  hasVertexAttribute(name: string): boolean {
    return this.__vertexAttributes.has(name)
  }

  /**
   * Returns vertex attribute with the specified name.
   *
   * @param name - The name of the vertex attribute.
   * @return - The return value.
   */
  getVertexAttribute(name: string): Attribute | undefined {
    return this.__vertexAttributes.get(name)
  }

  /**
   * Returns all vertex attributes in an object with their names.
   *
   * @return - The return value.
   */
  getVertexAttributes(): Record<string, Attribute> {
    const vertexAttributes: Record<string, Attribute> = {}

    for (const [key, attr] of this.__vertexAttributes.entries()) vertexAttributes[key] = attr
    return vertexAttributes
  }

  /**
   * Returns 'positions' vertex attribute.
   */
  get positions(): Vec3Attribute {
    return this.__vertexAttributes.get('positions') as Vec3Attribute
  }

  /**
   * Returns the number of vertex attributes.
   *
   * @return - The return value.
   */
  numVertices(): number {
    return this.__numVertices
  }

  /**
   * Returns the number of vertex attributes.
   *
   * @return - The return value.
   */
  getNumVertices(): number {
    return this.__numVertices
  }

  /**
   * Sets the number of vertices the geometry has.
   *
   * @param count - The count value.
   */
  setNumVertices(count: number): void {
    this.__numVertices = count
    // Resizes each of the vertex attributes to match the new count.
    this.__vertexAttributes.forEach((attr: Attribute) => attr.setCount(this.__numVertices))
    this.setBoundingBoxDirty()
  }

  // ////////////////////////////////////////
  // BoundingBox

  /**
   * Returns the bounding box for geometry.
   * @return - The return value.
   */
  getBoundingBox(): Box3 {
    if (this.__boundingBoxDirty) this.updateBoundingBox()
    return this.__boundingBox
  }

  /**
   * The setBoundingBoxDirty method.
   */
  setBoundingBoxDirty(): void {
    this.__boundingBoxDirty = true
    this.emit('boundingBoxChanged')
  }

  /**
   * The updateBoundingBox method.
   */
  updateBoundingBox(): void {
    const positions = this.positions
    const bbox = new Box3()

    if (positions) {
      const numVerts = positions.getCount()
      for (let i = 0; i < numVerts; i++) bbox.addPoint(positions.getValueRef(i))
    }

    this.__boundingBox = bbox
    this.__boundingBoxDirty = false
  }

  // ////////////////////////////////////////
  // Metadata

  /**
   * Returns metadata value of the specified name.
   *
   * @param key - The key value.
   * @return - The return value.
   */
  getMetadata(key: string): any {
    return this.__metaData.get(key)
  }

  /**
   * Verifies if geometry's metadata contains a value with the specified key.
   *
   * @param key - The key value.
   * @return - The return value.
   */
  hasMetadata(key: string): boolean {
    return this.__metaData.has(key)
  }

  /**
   * Sets metadata value to the geometry.
   *
   * @param key - The key value.
   * @param metaData - The metaData value.
   */
  setMetadata(key: string, metaData: Record<string, any>): void {
    this.__metaData.set(key, metaData)
  }

  /**
   * Removes metadata value from the geometry with the specified key.
   *
   * @param key - The key value.
   */
  deleteMetadata(key: string): void {
    this.__metaData.delete(key)
  }

  // ////////////////////////////////////////
  // Memory

  /**
   * Returns vertex attributes buffers and its count.
   * @return - The return value.
   */
  genBuffers(opts?: Record<string, any>): Record<string, any> {
    const attrBuffers: Record<string, any> = {}
    for (const [attrName, attr] of this.__vertexAttributes) {
      attrBuffers[attrName] = attr.genBuffer()
    }
    return {
      numVertices: this.numVertices(),
      attrBuffers,
    }
  }

  /**
   * Once the buffers have been uploaded to the GPU, we are free to release them.
   * The GLGeomLibrary may call this function to let the geometry know it can release any handles.
   */
  freeBuffers(): void {}

  // ////////////////////////////////////////
  // Persistence
  /**
   * Sets state of current Geometry(Including Vertices and Bounding Box) using a binary reader object.
   *
   * @param reader - The reader value.
   */
  loadBaseGeomBinary(reader: BinReader, context?: Record<string, any>): void {
    this.name = reader.loadStr()
    const flags = reader.loadUInt8()
    this.debugColor = reader.loadRGBFloat32Color()
    const numVerts = reader.loadUInt32()
    this.__boundingBox.set(reader.loadFloat32Vec3(), reader.loadFloat32Vec3())

    this.setNumVertices(numVerts)
    const positionsAttr = this.positions
    let normalsAttr: Vec3Attribute
    let texCoordsAttr: Vec2Attribute
    if (flags & (1 << 1)) {
      normalsAttr = <Vec3Attribute>this.getVertexAttribute('normals')
      if (!normalsAttr) {
        normalsAttr = new Vec3Attribute()
        this.addVertexAttribute('normals', normalsAttr)
      }
    }
    if (flags & (1 << 2)) {
      texCoordsAttr = <Vec2Attribute>this.getVertexAttribute('texCoords')
      if (!texCoordsAttr) {
        texCoordsAttr = new Vec2Attribute()
        this.addVertexAttribute('texCoords', texCoordsAttr)
      }
    }
    const numClusters = reader.loadUInt32()
    if (numClusters == 1) {
      {
        const box3 = this.__boundingBox
        // From 3.9.1, vertex data is a mix of 16bit and 8 bit quanitization
        if (context.versions['zea-engine'].compare([3, 9, 1]) >= 0) {
          const positions_quantized = reader.loadUInt16Array(numVerts * 3)
          parse16BitPositionsArray([0, numVerts], box3.p0, box3.diagonal(), positions_quantized, positionsAttr)
        } else {
          const positions_quantized = reader.loadUInt8Array(numVerts * 3)
          parse8BitPositionsArray([0, numVerts], box3.p0, box3.diagonal(), positions_quantized, positionsAttr)
        }
      }

      if (normalsAttr) {
        const box3 = new Box3(reader.loadFloat32Vec3(), reader.loadFloat32Vec3())
        const normals_quantized = reader.loadUInt8Array(numVerts * 3)
        parse8BitNormalsArray([0, numVerts], box3.p0, box3.diagonal(), normals_quantized, normalsAttr)
        normalsAttr.loadSplitValues(reader)
      }
      if (texCoordsAttr) {
        const box2 = new Box2(reader.loadFloat32Vec2(), reader.loadFloat32Vec2())
        // From 3.9.1, vertex data is a mix of 16bit and 8 bit quanitization
        if (context.versions['zea-engine'].compare([3, 9, 1]) >= 0) {
          const texCoords_quantized = reader.loadUInt16Array(numVerts * 2)
          parse16BitTextureCoordsArray([0, numVerts], box2.p0, box2.diagonal(), texCoords_quantized, texCoordsAttr)
        } else {
          const texCoords_quantized = reader.loadUInt8Array(numVerts * 2)
          parse8BitTextureCoordsArray([0, numVerts], box2.p0, box2.diagonal(), texCoords_quantized, texCoordsAttr)
        }
        texCoordsAttr.loadSplitValues(reader)
      }
    } else {
      const clusters = []
      let offset = 0
      for (let i = 0; i < numClusters; i++) {
        const count = reader.loadUInt32()
        const clusterData = {
          range: [offset, offset + count],
          bbox: new Box3(reader.loadFloat32Vec3(), reader.loadFloat32Vec3()),
          normalsRange: new Box3(),
          texCoordsRange: new Box2(),
        }
        if (normalsAttr) {
          clusterData.normalsRange.set(reader.loadFloat32Vec3(), reader.loadFloat32Vec3())
        }
        if (texCoordsAttr) {
          clusterData.texCoordsRange.set(reader.loadFloat32Vec2(), reader.loadFloat32Vec2())
        }

        clusters.push(clusterData)
        offset += count
      }
      // From 3.9.1, vertex data is a mix of 16bit and 8 bit quanitization
      let positions_quantized: Uint8Array | Uint16Array
      if (context.versions['zea-engine'].compare([3, 9, 1]) >= 0) {
        positions_quantized = reader.loadUInt16Array(numVerts * 3)
      } else {
        positions_quantized = reader.loadUInt8Array(numVerts * 3)
      }
      let normals_quantized: Uint8Array | null = null
      let texCoords_quantized: Uint8Array | Uint16Array | null = null
      if (normalsAttr) {
        normals_quantized = reader.loadUInt8Array(numVerts * 3)
      }
      if (texCoordsAttr) {
        texCoords_quantized = reader.loadUInt8Array(numVerts * 2)
      }

      for (let i = 0; i < numClusters; i++) {
        {
          const box3 = clusters[i].bbox
          // From 3.9.1, vertex data is a mix of 16bit and 8 bit quanitization
          if (context.versions['zea-engine'].compare([3, 9, 1]) >= 0) {
            parse16BitPositionsArray(
              clusters[i].range,
              box3.p0,
              box3.diagonal(),
              <Uint16Array>positions_quantized,
              positionsAttr
            )
          } else {
            parse8BitPositionsArray(
              clusters[i].range,
              box3.p0,
              box3.diagonal(),
              <Uint8Array>positions_quantized,
              positionsAttr
            )
          }
        }

        if (normals_quantized) {
          const box3 = clusters[i].normalsRange
          parse8BitNormalsArray(clusters[i].range, box3.p0, box3.diagonal(), normals_quantized, normalsAttr)
        }
        if (texCoords_quantized) {
          const box2 = clusters[i].texCoordsRange
          if (context.versions['zea-engine'].compare([3, 9, 1]) >= 0) {
            parse16BitTextureCoordsArray(
              [0, numVerts],
              box2.p0,
              box2.diagonal(),
              <Uint16Array>texCoords_quantized,
              texCoordsAttr
            )
          } else {
            parse8BitTextureCoordsArray(
              clusters[i].range,
              box2.p0,
              box2.diagonal(),
              <Uint8Array>texCoords_quantized,
              texCoordsAttr
            )
          }
        }
      }
      if (normalsAttr) {
        normalsAttr.loadSplitValues(reader)
      }
      if (texCoordsAttr) {
        texCoordsAttr.loadSplitValues(reader)
      }
    }
  }

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param context - The context value.
   * @return - Returns the json object.
   */
  toJSON(context?: Record<string, any>): Record<string, unknown> {
    const json = super.toJSON(context)

    if (!context || !context.skipTopology) {
      json.numVertices = this.__numVertices || 0
    }
    const vertexAttributes: Record<string, any> = {}
    for (const [key, attr] of this.__vertexAttributes.entries()) {
      if (!context || !('skipAttributes' in context) || !context.skipAttributes.includes(key))
        vertexAttributes[key] = attr.toJSON(context)
    }
    json.vertexAttributes = vertexAttributes
    return json
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param json - The json object this item must decode.
   * @param context - The context value.
   */
  fromJSON(json: Record<string, any>, context?: Record<string, any>): void {
    this.clear()
    super.fromJSON(json, context)
    this.setNumVertices(json.numVertices)
    for (const name in json.vertexAttributes) {
      let attr = this.__vertexAttributes.get(name)
      const attrJSON = json.vertexAttributes[name]
      if (!attr) {
        // switch(attrJSON.dataType) {
        //   case 'Vec3' attr = new Vec3Attribute( attrJSON.defaultScalarValue)
        // }
        // const dataType = Registry.getClassDefinition(attrJSON.dataType)
        // attr = new VertexAttribute(this, dataType, 0, attrJSON.defaultScalarValue)
        // if (attr) this.__vertexAttributes.set(name, attr)
      }
      if (attr) {
        attr.fromJSON(attrJSON)
      } else {
        console.warn('attr undefined, cannot execute fromJSON()')
      }
    }
    this.emit('geomDataTopologyChanged')
  }

  /**
   * Returns geometry data value in json format.
   *
   * @return - The return value.
   */
  toString(): string {
    return JSON.stringify(this.toJSON(), null, 2)
  }
}
export { BaseGeom }
