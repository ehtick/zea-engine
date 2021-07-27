/* eslint-disable prefer-rest-params */
/* eslint-disable guard-for-in */
/* eslint-disable no-unused-vars */
import { Vec3 } from '../../Math/Vec3'
import { BaseGeom } from './BaseGeom'
import { Attribute } from './Attribute'

import { Registry } from '../../Registry'
import { Vec3Attribute } from './Vec3Attribute'
import { BinReader } from '../BinReader'

/**
 * The Mesh class provides a flexible and fast polygon mesh representation. It supports polygons of arbitrary complexity,
 * from basic triangles and quads to pentagons more.
 * It supports storing per face attributes, and per edge attributes.
 * The Mesh class handles converting its internal representation of polygons into a simpler triangles representation for rendering.
 *
 * ```
 * const mesh = new Mesh()
 * ```
 *
 * **Events**
 * * **geomDataTopologyChanged:** Triggered when the topology of the mesh has been changed.
 * * **geomDataChanged:** Triggered when the vertices of the mesh have changed, but not necessarily the topology.
 *
 * @extends BaseGeom
 */
class Mesh extends BaseGeom {
  protected __faceCounts: Array<number>
  protected __faceVertexIndices: Uint32Array
  protected __logTopologyWarnings: boolean

  protected __edgeAttributes: Map<string, Attribute>
  protected __faceAttributes: Map<string, Attribute>

  protected numEdges: number
  protected edgeVerts: Array<number>
  protected edgeAngles: Float32Array
  protected edgeVecs: Array<Vec3>
  protected edgeFaces: Array<number>
  protected faceEdges: Array<Array<number>>
  protected vertexEdges: Array<Set<number>>

  /**
   * Creates an instance of Mesh.
   */
  constructor() {
    super()

    this.edgeFaces = []
    this.faceEdges = [[]]

    this.__faceCounts = []
    this.__faceVertexIndices = new Uint32Array()
    this.__logTopologyWarnings = false

    this.__edgeAttributes = new Map()
    this.__faceAttributes = new Map()

    this.numEdges = 0
    this.edgeVerts = []
    this.vertexEdges = []
    this.edgeAngles = new Float32Array()
    this.edgeVecs = []
  }

  /**
   * The init method.
   * @private
   */
  init() {}

  /**
   * The clear method.
   */
  clear() {
    super.clear()
    //this.init()
    //this.setNumVertices(0)
    // clear edge and face normals.
    this.edgeVerts = []
    this.vertexEdges = []
    this.numEdges = 0
    this.edgeAngles = new Float32Array()
    this.emit('geomDataTopologyChanged')
  }

  /**
   * The getFaceCounts method.
   * @return {array} - The return value.
   */
  getFaceCounts(): Array<any> {
    return this.__faceCounts
  }

  /**
   * The getNumFaces method.
   * @return {number} - The return value.
   */
  getNumFaces(): number {
    return this.__faceCounts.length == 0 ? 0 : this.__faceCounts.reduce((numFaces: any, fc: any) => (numFaces += fc))
  }

  /**
   * Sets the number of faces on the mesh using an array specifying the counts per polygon size.
   * The first item in the array specifies the number of triangles, the second, the number of quads, the 3rd, the number of 5 sided polygons etc..
   * e.g. to specify 2 triangles, and 7 quads, we would pass [2, 7]
   * @param {array} faceCounts - The faceCounts value.
   */
  setFaceCounts(faceCounts: any): void {
    let numFaces = 0
    let numFacesVertices = 0
    let numVertsPerFace = 3
    for (const fc of faceCounts) {
      numFaces += fc
      numFacesVertices += fc * numVertsPerFace
      numVertsPerFace++
    }

    const prevNumFaces = this.getNumFaces()
    if (prevNumFaces == 0) {
      this.__faceVertexIndices = new Uint32Array(numFacesVertices)
    } else {
      const faceVertexIndices = new Uint32Array(numFacesVertices)

      // Now we preserve the existing indices if they fit within the new faceVertexIndices array.
      let startSrc = 0
      let startTgt = 0
      numFacesVertices = 0
      numVertsPerFace = 3
      faceCounts.forEach((fc: any, index: any) => {
        const endSrc = startSrc + Math.min(fc, this.__faceCounts[index]) * numVertsPerFace
        faceVertexIndices.set(this.__faceVertexIndices.slice(startSrc, endSrc), startTgt)
        startSrc += this.__faceCounts[index] * numVertsPerFace
        startTgt += fc * numVertsPerFace
        numVertsPerFace++
      })
      this.__faceVertexIndices = faceVertexIndices
    }
    this.__faceCounts = faceCounts
  }

  /**
   * Returns the number of vertices indexed by this face
   * @param {number} faceIndex - The faceIndex value.
   * @return {number} - The return value.
   */
  getFaceVertexCount(faceIndex: number): number {
    let idx = 0
    let count = 0
    this.__faceCounts.some((fc: number, index: number) => {
      idx += fc
      if (idx > faceIndex) {
        count = index + 3
        return true
      }
    })
    return count
  }

  /**
   * Returns the offset of the face indices within the entire index array.
   * @param {number} faceIndex - The faceIndex value.
   * @return {number} - The return value.
   */
  getFaceVertexOffset(faceIndex: number): number {
    let idx = 0
    let offset = 0
    this.__faceCounts.some((fc: number, index: number) => {
      if (idx + fc > faceIndex) {
        offset += (faceIndex - idx) * (index + 3)
        return true
      }
      idx += fc
      offset += fc * (index + 3)
    })
    return offset
  }

  /**
   * The setFaceVertexIndices method.
   * @param {number} faceIndex - The faceIndex value.
   * @param {array} vertexIndices - The array of vertex indices for this face value.
   */
  setFaceVertexIndices(faceIndex: number, vertexIndices: Array<any>): void {
    if (arguments.length != 2) {
      console.warn(`deprecated interface. Please pass vertexIndices as an array`)
      vertexIndices = Array.prototype.slice.call(arguments, 1)
    }
    const faceVertexCount = this.getFaceVertexCount(faceIndex)
    if (vertexIndices.length != faceVertexCount) {
      throw new Error(
        `Invalid indices for face:${faceIndex} vertexIndices:${vertexIndices}. Expected ${faceVertexCount} indices`
      )
    }
    const offset = this.getFaceVertexOffset(faceIndex)
    this.__faceVertexIndices.set(vertexIndices, offset)
  }

  /**
   * Adds a new face to the mesh
   * @param {array} vertexIndices - The vertex indices of the face.
   * @return {number} - The index of the face in the mesh.
   */
  addFace(vertexIndices: number[]): number {
    const faceCounts = [...this.__faceCounts]
    if (faceCounts.length <= vertexIndices.length - 3) {
      for (let i = faceCounts.length; i < vertexIndices.length - 3; i++) faceCounts[i] = 0
      faceCounts[vertexIndices.length - 3] = 1
    } else {
      faceCounts[vertexIndices.length - 3]++
    }
    this.setFaceCounts(faceCounts)

    // Calculate the offset in the faceVertexIndices of this new face.
    let faceIndex = 0
    let offset = 0
    this.__faceCounts.some((fc: any, index: any) => {
      if (index + 3 == vertexIndices.length) {
        faceIndex += fc - 1
        offset += (fc - 1) * (index + 3)
        return true
      }
      faceIndex += fc
      offset += fc * (index + 3)
    })
    this.__faceVertexIndices.set(vertexIndices, offset)
    return faceIndex
  }

  /**
   * Returns the vertex indices of the specified face.
   * @param {number} faceIndex - The index of the specified face
   * @return {array} - An array of indices into the vertex attributes
   */
  getFaceVertexIndices(faceIndex: number): number[] {
    const vertexIndices = []
    const offset = this.getFaceVertexOffset(faceIndex)
    const count = this.getFaceVertexCount(faceIndex)
    for (let i = 0; i < count; i++) {
      vertexIndices.push(this.__faceVertexIndices[offset + i])
    }
    return vertexIndices
  }

  /**
   * Returns a single vertex index for a given face and faceVertex.
   * @param {number} faceIndex - The faceIndex value.
   * @param {number} faceVertex - The face vertex is the index within the face. So the first vertex index is 0.
   * @return {number} - The vertex index
   */
  getFaceVertexIndex(faceIndex: number, faceVertex: number) {
    const offset = this.getFaceVertexOffset(faceIndex)
    return this.__faceVertexIndices[offset + faceVertex]
  }

  // ///////////////////////////
  // Face Attributes

  /**
   * The addFaceAttribute method.
   * @param {string} name - The name of the face attribute to add.
   * @param {Attribute} attr - The attr value
   */
  addFaceAttribute(name: string, attr: Attribute) {
    attr.setCount(this.getNumFaces())
    this.__faceAttributes.set(name, attr)
    return attr
  }

  /**
   * The hasFaceAttribute method.
   * @param {string} name - The name of the face attribute.
   * @return {boolean} - The return value.
   */
  hasFaceAttribute(name: string) {
    return this.__faceAttributes.has(name)
  }

  /**
   * The getFaceAttribute method.
   * @param {string} name - The name of the face attribute.
   * @return {Attribute} - The return value.
   */
  getFaceAttribute(name: string): any {
    return this.__faceAttributes.get(name)
  }

  // /////////////////////////
  // Edge Attributes

  /**
   * The addEdgeAttribute method.
   * @param {string} name - The name of the edge attribute to add.
   * @param {Attribute} attr - The attr value
   */
  addEdgeAttribute(name: string, attr: Attribute) {
    attr.setCount(this.numEdges)
    this.__edgeAttributes.set(name, attr)
  }

  /**
   * The hasEdgeAttribute method.
   * @param {string} name - The name of the edge attribute.
   * @return {boolean} - The return value.
   */
  hasEdgeAttribute(name: string): boolean {
    return this.__edgeAttributes.has(name)
  }

  /**
   * The getEdgeAttribute method.
   * @param {string} name - The name of the edge attribute.
   * @return {Attribute} - The return value.
   */
  getEdgeAttribute(name: string): Attribute | undefined {
    return this.__edgeAttributes.get(name)
  }

  // ///////////////////////////

  /**
   * The genTopologyInfo method.
   */
  genTopologyInfo(): void {
    interface edgeData {
      edgeIndex: number
      edgeVec: Vec3
    }
    let connectedVertices: Record<string, edgeData> = {} // acceleration structure.
    this.vertexEdges = [] // 2d array of vertex to edges.
    // this.vertexFaces = []; // 2d array of vertex to faces.
    this.edgeFaces = [] // flat array of 2 face indices per edge
    this.edgeVerts = [] // flat array of 2 vert indices per edge
    this.faceEdges = [] // the edges bordering each face.
    this.numEdges = 0

    const positions = this.positions
    const getEdgeIndex = (v0: any, v1: any) => {
      let tmp0 = v0
      let tmp1 = v1
      if (tmp1 < tmp0) {
        const tmp = tmp0
        tmp0 = tmp1
        tmp1 = tmp
      }
      const key: any = tmp0 + '>' + tmp1
      if (key in connectedVertices) {
        // console.log(key + ':' + connectedVertices[key] + " face:" + ( v0 < v1 ? 0 : 1) );
        return connectedVertices[key]
      }

      const p0 = positions.getValueRef(tmp0)
      const p1 = positions.getValueRef(tmp1)
      const edgeVec = p1.subtract(p0)

      const edgeIndex = this.edgeFaces.length / 2
      const edgeData = {
        edgeIndex: edgeIndex,
        edgeVec: edgeVec,
      }
      connectedVertices[key] = edgeData

      this.edgeFaces.push(-1)
      this.edgeFaces.push(-1)
      this.edgeVerts.push(tmp0)
      this.edgeVerts.push(tmp1)
      // console.log(key + ':' + connectedVertices[key] + " face:" + ( v0 < v1 ? 0 : 1));

      this.numEdges++
      return edgeData
    }
    const addEdge = (v0: any, v1: any, faceIndex: any) => {
      // console.log('addEdge:' + v0 + " :" + v1 + " faceIndex:" + faceIndex );
      const edgeData = getEdgeIndex(v0, v1)
      const edgeIndex = edgeData.edgeIndex
      if (v1 < v0) {
        const edgeFaceIndex = edgeIndex * 2 + 0
        if (this.__logTopologyWarnings && this.edgeFaces[edgeFaceIndex] != -1)
          console.warn('Edge poly 0 already set. Mesh is non-manifold.')
        this.edgeFaces[edgeFaceIndex] = faceIndex
      } else {
        const edgeFaceIndex = edgeIndex * 2 + 1
        if (this.__logTopologyWarnings && this.edgeFaces[edgeFaceIndex] != -1)
          console.warn('Edge poly 1 already set. Mesh is non-manifold.')
        this.edgeFaces[edgeFaceIndex] = faceIndex
      }

      if (!(faceIndex in this.faceEdges)) this.faceEdges[faceIndex] = []
      this.faceEdges[faceIndex].push(edgeIndex)

      // Push the edge index onto both vertex edge lists.
      // We use Sets to avoid adding the same edge 2x to the same vertex.
      if (this.vertexEdges[v0] == undefined) {
        this.vertexEdges[v0] = new Set()
      }
      if (this.vertexEdges[v1] == undefined) {
        this.vertexEdges[v1] = new Set()
      }
      this.vertexEdges[v0].add(edgeIndex)
      this.vertexEdges[v1].add(edgeIndex)

      // if (this.vertexFaces[v0] == undefined) {
      //     this.vertexFaces[v0] = [];
      // }
      // this.vertexFaces[v0].push(faceIndex);
    }

    const numFaces = this.getNumFaces()
    for (let faceIndex = 0; faceIndex < numFaces; faceIndex++) {
      const faceVerts = this.getFaceVertexIndices(faceIndex)
      for (let j = 0; j < faceVerts.length; j++) {
        const v0 = faceVerts[j]
        const v1 = faceVerts[(j + 1) % faceVerts.length]
        addEdge(v0, v1, faceIndex)
      }
    }
  }

  /**
   * Computes a normal value per face by averaging the triangle normals of the face.
   */
  computeFaceNormals(): void {
    const positions = this.positions
    const faceNormals = new Vec3Attribute()
    this.addFaceAttribute('normals', faceNormals)
    const numFaces = this.getNumFaces()
    for (let faceIndex = 0; faceIndex < numFaces; faceIndex++) {
      const faceVerts = this.getFaceVertexIndices(faceIndex)
      const p0 = positions.getValueRef(faceVerts[0])
      const p1 = positions.getValueRef(faceVerts[1])
      let prev = p1
      const faceNormal = new Vec3()
      for (let j = 2; j < faceVerts.length; j++) {
        const pn = positions.getValueRef(faceVerts[j])
        const v0 = prev.subtract(p0)
        const v1 = pn.subtract(p0)
        faceNormal.addInPlace(v1.cross(v0).normalize())
        prev = pn
      }
      if (faceNormal.lengthSquared() < Number.EPSILON) {
        // Note: we are getting many faces with no surface area.
        // This is simply an authoring issue.
        // console.warn("Invalid Mesh topology");
      } else {
        faceNormals.setValue(faceIndex, faceNormal.normalize())
      }
    }
  }

  /**
   * Calculates the angles at each edge between the adjoining faces
   */
  calculateEdgeAngles(): void {
    if (this.vertexEdges.length == 0) this.genTopologyInfo()

    this.computeFaceNormals()

    const positions = this.positions
    const faceNormals = this.getFaceAttribute('normals') as Vec3Attribute
    this.edgeVecs = []
    this.edgeAngles = new Float32Array(this.numEdges)
    for (let i = 0; i < this.edgeFaces.length; i += 2) {
      const v0 = this.edgeVerts[i]
      const v1 = this.edgeVerts[i + 1]
      const edgeVec = positions.getValueRef(v1).subtract(positions.getValueRef(v0))
      edgeVec.normalizeInPlace()
      this.edgeVecs.push(edgeVec)

      const p0 = this.edgeFaces[i]
      const p1 = this.edgeFaces[i + 1]
      if (p0 == -1 || p1 == -1) {
        // Flag the edge as a border edge....
        this.edgeAngles[i / 2] = Math.PI * 2.0
        continue
      }

      const n0 = faceNormals.getValueRef(p0)
      const n1 = faceNormals.getValueRef(p1)
      this.edgeAngles[i / 2] = n0.angleTo(n1)
    }
  }

  /**
   * Compute vertex normals.
   * @param {number} hardAngle - The hardAngle value in radians.
   * @return {Vec3Attribute} - The return value.
   */
  computeVertexNormals(hardAngle = 1.0 /* radians */) {
    this.calculateEdgeAngles()

    const faceNormals = this.getFaceAttribute('normals') as Vec3Attribute
    const normalsAttr = new Vec3Attribute()
    this.addVertexAttribute('normals', normalsAttr)

    // these methods are faster versions than using the methods
    // provided on the attributes. We cache values and use hard coded constants.
    // const faceNormalsBuffer = faceNormals.data.buffer
    const getFaceNormal = (index: number) => {
      return faceNormals.getValueRef(index)
    }
    const setVertexNormal = (index: number, value: Vec3) => {
      normalsAttr.setValue(index, value)
    }
    const getConnectedEdgeVecs = (faceIndex: any, vertexIndex: any) => {
      let e0
      let e1
      const faceEdges = this.faceEdges[faceIndex]
      for (const e of faceEdges) {
        if (this.edgeVerts[e * 2] == vertexIndex) {
          if (!e0) e0 = this.edgeVecs[e]
          else e1 = this.edgeVecs[e]
        } else if (this.edgeVerts[e * 2 + 1] == vertexIndex) {
          if (!e0) e0 = this.edgeVecs[e]
          else e1 = this.edgeVecs[e]
        }
      }
      return [e0, e1]
    }

    for (let i = 0; i < this.vertexEdges.length; i++) {
      // If this face indexing doesn't start at 0, then the vertexEdges don't either.
      if (this.vertexEdges[i] == undefined) continue

      const edges = this.vertexEdges[i]

      // Groups of faces having a smooth normal at the current vertex.
      const faceGroups: any = []
      const addFaceToGroup = (face: any) => {
        let inGroup = false
        for (const faceGroup of faceGroups) {
          inGroup = faceGroup.includes(face)
          if (inGroup) break
        }
        if (!inGroup) faceGroups.push([face])
      }
      for (const e of edges) {
        const f0 = this.edgeFaces[e * 2]
        const f1 = this.edgeFaces[e * 2 + 1]
        if (f0 != -1 && f1 != -1 && this.edgeAngles[e] < hardAngle) {
          // if (f0 != -1 && f1 == -1 && this.edgeAngles[e] < hardAngle) {
          let f0groupIndex = -1
          let f1groupIndex = -1
          for (let groupIndex = 0; groupIndex < faceGroups.length; groupIndex++) {
            if (f0groupIndex == -1 && faceGroups[groupIndex].includes(f0)) f0groupIndex = groupIndex
            if (f1groupIndex == -1 && faceGroups[groupIndex].includes(f1)) f1groupIndex = groupIndex
          }
          if (f0groupIndex == -1 && f1groupIndex == -1) {
            faceGroups.push([f0, f1])
          } else if (f0groupIndex != -1 && f1groupIndex != -1) {
            if (f0groupIndex != f1groupIndex) {
              // Merge the 2 groups that the smooth edge joins.
              faceGroups[f0groupIndex] = faceGroups[f0groupIndex].concat(faceGroups[f1groupIndex])
              faceGroups.splice(f1groupIndex, 1)
            }
          } else {
            if (f0groupIndex == -1) {
              faceGroups[f1groupIndex].push(f0)
            }
            if (f1groupIndex == -1) {
              faceGroups[f0groupIndex].push(f1)
            }
          }
          continue
        }
        // This is a hard edge or a border edge... Add faces separately group.
        if (f0 != -1) addFaceToGroup(f0)
        if (f1 != -1) addFaceToGroup(f1)
      }

      // Sort the groups to have the biggest group first.
      faceGroups.sort((a: any, b: any) => (a.length < b.length ? 1 : a.length > b.length ? -1 : 0))

      let firstVertex = true
      for (const faceGroup of faceGroups) {
        const normal = new Vec3()
        for (const faceIndex of faceGroup) {
          const faceEdges = getConnectedEdgeVecs(faceIndex, i)
          let weight
          if (faceEdges[0] && faceEdges[1]) {
            weight = faceEdges[0].angleTo(faceEdges[1])
            normal.addInPlace(getFaceNormal(faceIndex).scale(weight))
          } else {
            console.warn('variable weight is undefined because faceEdges[0] or faceEdges[1] is undefined')
          }
          // if (i == 1)
          //     console.log("FaceNormal:" + faceIndex + ":" + getFaceNormal(faceIndex).toString());
        }
        normal.normalizeInPlace()
        if (firstVertex) {
          setVertexNormal(i, normal)
          firstVertex = false
        } else {
          normalsAttr.setSplitVertexValues(i, faceGroup, normal)
        }
      }
    }

    return normalsAttr
  }

  /**
   * The computeHardEdgesIndices method.
   * @param {number} hardAngle - The hardAngle value in radians.
   * @return {array} - The return value.
   */
  computeHardEdgesIndices(hardAngle = 1.0): any {
    if (this.edgeVerts.length == 0) this.calculateEdgeAngles()

    const hardEdges: number[] = []
    const addEdge = (index: number) => {
      hardEdges.push(this.edgeVerts[index])
      hardEdges.push(this.edgeVerts[index + 1])
    }
    for (let i = 0; i < this.edgeAngles.length; i++) {
      if (this.edgeAngles[i] > hardAngle) {
        addEdge(i * 2)
      }
    }
    return Uint32Array.from(hardEdges)
  }

  // ////////////////////////////////////////
  // Rendering

  /**
   * The genBuffers method.
   * @param {Record<string, any>} opts - The opts value.
   * @return {Record<string, any>} - The return value.
   */
  genBuffers(opts?: Record<string, any>): Record<string, any> {
    // Compute the normals on demand.
    // if (!('normals' in this.__vertexAttributes)) {
    //     // this.__geom.computeVertexNormals();
    //     this.addVertexAttribute("normals", Vec3, 0.0);
    // }

    const splitIndices: Record<any, Record<any, any>> = {}
    let splitCount = 0
    for (const [, attr] of this.__vertexAttributes) {
      const attrSplits = attr.getSplits()
      for (const polygon in attrSplits) {
        if (!(polygon in splitIndices)) splitIndices[polygon] = {}
        const vertices = attrSplits[polygon]
        for (const v in vertices) {
          const vertex = parseInt(v)
          if (!(vertex in splitIndices[polygon])) {
            splitIndices[polygon][vertex] = splitCount
            splitCount++
          }
        }
      }
    }

    const positions = this.positions
    const numUnSplitVertices = positions.getCount()
    const totalNumVertices = numUnSplitVertices + splitCount

    let indices
    if (!opts || opts.includeIndices != false) {
      indices = this.generateTriangulatedIndices(totalNumVertices, numUnSplitVertices, splitIndices)
    }

    // let maxIndex;
    // if (debugAttrValues)
    //     maxIndex = Math.max(...indices);

    interface attrBuffer {
      values: any
      count: number
      dimension: any
      normalized: boolean
      dataType: string
    }
    const attrBuffers: Record<string, attrBuffer> = {}
    for (const [attrName, attr] of this.__vertexAttributes) {
      let values
      if (splitCount == 0) values = attr.asArray()
      else values = attr.generateSplitValues(splitIndices, splitCount)

      const dimension = attr.numElements
      const count = values.length / dimension

      // if (debugAttrValues) {
      //     if (count <= maxIndex)
      //         console.warn("Invalid indexing. Attr value is insufficient for indexing:" + attrName + ". Max Index:" + maxIndex + " Attr Size:" + count);
      // }

      attrBuffers[attrName] = {
        values: values,
        count: count,
        dimension: dimension,
        normalized: attrName == 'normals',
        dataType: attr.getDataTypeName(),
      }
    }

    const result = {
      numVertices: this.numVertices(),
      numRenderVerts: totalNumVertices,
      indices,
      attrBuffers,
    }

    /* Disabled during TS migration.
    if (opts && opts.includeVertexNeighbors) {
      if (this.vertexEdges == undefined) this.genTopologyInfo()

      let count = 0
      for (let i = 0; i < this.vertexEdges.length; i++) {
        // If this face indexing doesn't start at 0, then the vertexEdges don't either.
        if (this.vertexEdges[i]) count += this.vertexEdges[i].size
      }
      // The array will be structured as a start+offset for each vertex, followed
      // by a 2d array of neighbor indices.
      const vertexNeighbors = new Uint32Array(this.vertexEdges.length * 2 + count)
      const sortFanEdges = (fanEdges: any) => {
        for (let i = 0; i < fanEdges.length; i++) {
          const feA = fanEdges[i]
          for (let j = 0; j < i; j++) {
            const feB = fanEdges[j]
            if (feA[0] != -1 && feA[0] == feB[1]) {
              //  move feA after feB;
              if (i != j + 1) {
                fanEdges.splice(i, 1)
                fanEdges.splice(j + 1, 0, feA)
              }
              break
            }
            if (feA[1] != -1 && feA[1] == feB[0]) {
              //  move feA before feB;
              fanEdges.splice(i, 1)
              fanEdges.splice(j, 0, feA)
              break
            }
          }
        }
      }
      const checkFanEdges = (fanEdges: any) => {
        // now check that the faces all build a fan. Maybe starting and ending with -1
        if (fanEdges[0][0] == -1 || fanEdges[fanEdges.length - 1][1] == -1) {
          if (fanEdges[0][0] != -1 || fanEdges[fanEdges.length - 1][1] != -1) {
            throw new Error('If fan starts with -1, it must also end with -1')
          }
        }
        for (let i = 0; i < fanEdges.length; i++) {
          const fe = fanEdges[i]
          if (fe[0] == -1 || fe[1] == -1) {
            if (i != 0 && i != fanEdges.length - 1) {
              throw new Error('-1 only allowed at the beginning and end of a fan.')
            }
          }
          if (fe[0] != -1) {
            let prev = i - 1
            if (prev < 0) prev += fanEdges.length
            if (fe[0] != fanEdges[prev][1]) {
              throw new Error('Faces are not sequential')
            }
          }
          if (fe[1] != -1) {
            const next = (i + 1) % fanEdges.length
            if (fe[1] != fanEdges[next][0]) {
              throw new Error('Faces are not sequential')
            }
          }
        }
      }

      // Populate the start and offset values.
      let offset = this.vertexEdges.length * 2
      for (let i = 0; i < this.vertexEdges.length; i++) {
        if (this.vertexEdges[i] == undefined) continue
        const edges = this.vertexEdges[i]

        // Build a sorted list of faces based on a fan around
        // the vertex.
        const fanEdges = []
        for (const e of edges) {
          const v0 = this.edgeVerts[e * 2]
          const v1 = this.edgeVerts[e * 2 + 1]
          let f0 = this.edgeFaces[e * 2]
          let f1 = this.edgeFaces[e * 2 + 1]
          let neigVert
          if (v0 == i) {
            neigVert = v1
          } else if (v1 == i) {
            neigVert = v0
            // swap the faces
            const tmp = f0
            f0 = f1
            f1 = tmp
          } else {
            throw new Error('Invalid topology')
          }
          fanEdges.push([f0, f1, neigVert])
        }
        sortFanEdges(fanEdges)
        checkFanEdges(fanEdges)
        const closed = fanEdges[0][0] != -1 || fanEdges[fanEdges.length - 1][1] != -1
        let flags = 0
        if (closed) flags += 1
        vertexNeighbors[i * 2] = offset
        vertexNeighbors[i * 2 + 1] = edges.size + (flags << 8)
        for (const fe of fanEdges) {
          vertexNeighbors[offset] = fe[2]
          offset++
        }
      }
      ;(result as any).vertexNeighbors = vertexNeighbors
    }
    */

    return result
  }

  /**
   * Compute the number of triangles. For higher degree polygons, they are divided into multiple triangles for rendering.
   * @return {number} - Returns the number of triangles.
   */
  computeNumTriangles(): number {
    let numVertsPerFace = 3
    let trisCount = 0
    for (const fc of this.__faceCounts) {
      trisCount += fc * (numVertsPerFace - 2)
      numVertsPerFace++
    }
    return trisCount
  }

  /**
   * To prepare data for rendering, the indices for the polygons is used to compute a new index buffer based on
   * only triangles. This is used during rendering and the resulting indices uploaded ot the GPU  by GLMesh class.
   *
   * @param {number} totalNumVertices - The total number of vertices.
   * @param {number} numUnSplitVertices - The total number of un-split vertices.
   * @param {array} splitIndices - The splitIndices value.
   * @return {TypedArray} - Returns a typed array containing the triangulated indices.
   */
  generateTriangulatedIndices(totalNumVertices: number, numUnSplitVertices: number, splitIndices: any): any {
    const trisCount = this.computeNumTriangles()

    let triangulatedIndices
    if (totalNumVertices < Math.pow(2, 8)) triangulatedIndices = new Uint8Array(trisCount * 3)
    else if (totalNumVertices < Math.pow(2, 16)) triangulatedIndices = new Uint16Array(trisCount * 3)
    else triangulatedIndices = new Uint32Array(trisCount * 3)

    let triangleVertex = 0
    const addTriangleVertexIndex = function (vertex: any, faceIndex: any) {
      if (vertex in splitIndices && faceIndex in splitIndices[vertex])
        vertex = numUnSplitVertices + splitIndices[vertex][faceIndex]
      triangulatedIndices[triangleVertex] = vertex
      triangleVertex++
    }
    const numFaces = this.getNumFaces()
    for (let faceIndex = 0; faceIndex < numFaces; faceIndex++) {
      const faceVerts = this.getFaceVertexIndices(faceIndex)
      for (let j = 0; j < faceVerts.length; j++) {
        if (j >= 3) {
          // For each additional triangle, we have to add 2 indices.
          addTriangleVertexIndex(faceVerts[0], faceIndex)
          addTriangleVertexIndex(faceVerts[j - 1], faceIndex)
        }
        addTriangleVertexIndex(faceVerts[j], faceIndex)
      }
    }
    return triangulatedIndices
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * Restores mesh properties from a binary reader.
   *
   * @param {BinReader} reader - The reader value.
   * @param {object} context - The context value.
   */
  readBinary(reader: BinReader, context?: Record<string, any>): void {
    super.loadBaseGeomBinary(reader)
    this.setFaceCounts(reader.loadUInt32Array())
    const numFaces = this.getNumFaces()

    // Note: we can remove this. We can infer this from the above faceCounts array.
    const faceVertexCounts = reader.loadUInt8Array(numFaces)
    const offsetRange = reader.loadSInt32Vec2()
    const bytes = reader.loadUInt8()
    let faceVertexIndexDeltas
    if (bytes == 1) faceVertexIndexDeltas = reader.loadUInt8Array()
    else if (bytes == 2) faceVertexIndexDeltas = reader.loadUInt16Array()
    else if (bytes == 4) faceVertexIndexDeltas = reader.loadUInt32Array()
    else {
      throw Error('faceVertexIndexDeltas undefined')
    }
    // ///////////////////////////////////////////////////
    // Note: The Mesh compression system needs a thorough review.
    // The C++ classes are not storing face indices in a sorted manner.
    // So quads precede triangles in the indexing, which isn't supposed to happen.
    // We should force the C++ code to store quads and triangles in order.
    // e.g. implement the 'addFace' method in C++ so it automatically does this.

    let numFaceVerts = 3
    let offset = 0
    const faceOffsetsByCount = this.__faceCounts.map((fc: any, index: any) => {
      const result = offset
      offset += fc * numFaceVerts
      numFaceVerts++
      return result
    })

    let srcOffset = 0
    let prevCount = 0
    const faceOffsets = []
    for (let faceIndex = 0; faceIndex < numFaces; faceIndex++) {
      const fc = faceVertexCounts[faceIndex]
      const offset = faceOffsetsByCount[fc]
      const count = fc + 3
      faceOffsets[faceIndex] = offset
      for (let j = 0; j < count; j++) {
        const srcFaceVertex = srcOffset + j
        const faceVertex = offset + j
        const delta = faceVertexIndexDeltas[srcFaceVertex] + offsetRange.x
        if (faceIndex == 0) this.__faceVertexIndices[faceVertex] = delta
        else {
          let prevFaceVertex = faceOffsets[faceIndex - 1]
          prevFaceVertex += j < prevCount ? j : prevCount - 1
          this.__faceVertexIndices[faceVertex] = this.__faceVertexIndices[prevFaceVertex] + delta
        }
      }
      srcOffset += count
      faceOffsetsByCount[fc] += count
      prevCount = count
    }

    if (!this.hasVertexAttribute('normals')) {
      this.computeVertexNormals()
    }

    // this.computeVertexNormals();
    this.emit('geomDataChanged', {})
  }

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param {Record<string, any>} context - The context value.
   * @return {Record<string, any>} - Returns the json object.
   */
  toJSON(context?: Record<string, any>): Record<string, unknown> {
    const j = super.toJSON(context)
    if (!context || !context.skipTopology) {
      ;(j as any).faceCounts = Array.from(this.__faceCounts)
      ;(j as any).faceVertexIndices = Array.from(this.__faceVertexIndices)
    }

    return j
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * e.g. to load data into the mesh class, provide a json structure similar to the following.
   * Note: faceCounts is an array of count values, starting with the number of triangles, then the number of quads. See #setFaceCounts
   * The faceVertexIndices array should also be sorted to contain all the triangles first, followed by the quads, and then the pentagons etc..
   * ```json
   * // This code will define a mesh made up of 2 triangles and then a quad.
   * const mesh = new Mesh()
   * mesh.fromJSON({
   *   faceCounts:[2, 1],
   *   faceVertexIndices: [0, 1, 2, 0, 2, 3, 3, 2, 4, 5],
   *   numVertices: 6,
   *   vertexAttributes: {
   *     positions: {
   *       dataType: 'Vec3'
   *       defaultScalarValue: 0.0,
   *       data: [0,0,0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 2, 1, 0, 2, 0, 0]
   *     }
   *   }
   * }
   * ```
   *
   * @param {object} j - The json object this item must decode.
   * @param {object} context - The context value.
   */
  fromJSON(j: Record<string, any>, context?: Record<string, any>): void {
    super.fromJSON(j, context)
    if (j.faceCounts) this.__faceCounts = j.faceCounts
    if (j.faceVertexIndices) this.__faceVertexIndices = Uint32Array.from(j.faceVertexIndices)
  }
}

Registry.register('Mesh', Mesh)

export { Mesh }
