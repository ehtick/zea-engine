import {
  Float32,
  Vec2,
  Vec3,
  Xfo
} from '../../Math';
import {
  BaseGeom,
  SAVE_FLAG_SKIP_GEOMDATA
} from './BaseGeom.js';
import {
  Attribute
} from './Attribute.js';

import {
  VertexAttribute
} from './VertexAttribute.js';

class Mesh extends BaseGeom {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.__faceCounts = [];
    this.__faceVertexCounts = new Uint8Array();
    this.__faceOffsets = new Uint32Array();
    this.__faceVertexIndices = new Uint32Array();
    this.__numPopulatedFaceVertexIndices = 0;

    this.__faceAttributes = new Map();
    this.__edgeAttributes = new Map();

    this.__logTopologyWarnings = false;

    this.edgeVerts = undefined;
    this.vertexEdges = undefined;
    this.numEdges = 0;
    this.edgeFlags = new Uint32Array();
    this.edgeAngles = new Float32Array();
  }

  getFaceVertexIndices() {
    return this.__faceVertexIndices;
  }

  getFaceCounts() {
    return this.__faceCounts;
  }

  clear() {
    this.__faceVertexIndices = undefined;
    this.__faceCounts = [];
    this.__numPopulatedFaceVertexIndices = 0;
  }

  setFaceCounts(faceCounts) {
    if (this.__numPopulatedFaceVertexIndices) {
      throw ("Cannot set face counts on a mesh that is already populated. Please call 'clear' before re-building the mesh.");
    }
    this.__faceCounts = faceCounts;

    let numFaces = 0;
    let numFacesVertices = 0;
    let numVertsPerFace = 3;
    for (let fc of this.__faceCounts) {
      numFaces += fc;
      numFacesVertices += fc * numVertsPerFace;
      numVertsPerFace++;
    }
    this.__faceVertexCounts = new Uint8Array(numFaces);
    this.__faceOffsets = new Uint32Array(numFaces);
    this.__faceVertexIndices = new Uint32Array(numFacesVertices);

    for (let attr of this.__faceAttributes)
      attr.resize(numFaces);
  }

  setFaceVertexIndices(faceIndex) {
    const vertexIndices = Array.prototype.slice.call(arguments, 1);

    const start = this.__numPopulatedFaceVertexIndices;
    for (let i = 0; i < vertexIndices.length; i++) {
      this.__faceVertexIndices[start + i] = vertexIndices[i];
    }
    this.__faceVertexCounts[faceIndex] = vertexIndices.length - 3;
    this.__faceOffsets[faceIndex] = start;
    this.__numPopulatedFaceVertexIndices += vertexIndices.length;
  }

  getFaceVertexIndices(faceIndex) {
    const vertexIndices = [];
    const start = this.__faceOffsets[faceIndex];
    const count = this.__faceVertexCounts[faceIndex] + 3;
    for (let i = 0; i < count; i++) {
      vertexIndices.push(this.__faceVertexIndices[start + i]);
    }
    return vertexIndices;
  }

  getFaceVertexIndex(faceIndex, facevertex) {
    const start = this.__faceOffsets[faceIndex];
    return this.__faceVertexIndices[start + facevertex];
  }

  getNumFaces() {
    return this.__faceVertexCounts.length;
  }



  /////////////////////////////
  // Vertex Attributes

  addVertexAttribute(name, dataType, defaultScalarValue = undefined) {
    let attr = new VertexAttribute(this, dataType, (this.vertices != undefined) ? this.vertices.length : 0, defaultScalarValue);
    this.__vertexAttributes.set(name, attr);
    return attr;
  }

  /////////////////////////////
  // Face Attributes

  addFaceAttribute(name, dataType, count = undefined) {
    const attr = new Attribute(dataType, (count != undefined) ? count : this.getNumFaces());
    this.__faceAttributes.set(name, attr);
    return attr;
  }

  hasFaceAttribute(name) {
    return this.__faceAttributes.has(name);
  }

  getFaceAttribute(name) {
    return this.__faceAttributes.get(name)
  }

  ///////////////////////////
  // Edge Attributes

  addEdgeAttribute(name, dataType, count = undefined) {
    const attr = new Attribute(dataType, (count != undefined) ? count : this.getNumEdges());
    this.__edgeAttributes.set(name, attr);
    return attr;
  }

  hasEdgeAttribute(name) {
    return this.__edgeAttributes.has(name);
  }

  getEdgeAttribute(name) {
    return this.__edgeAttributes.get(name)
  }

  /////////////////////////////

  genTopologyInfo() {
    const connectedVertices = {}; // acceleration structure.
    this.vertexEdges = []; // 2d array of vertex to edges. 
    // this.vertexFaces = []; // 2d array of vertex to faces. 
    this.edgeFaces = []; // flat array of 2 face indices per edge
    this.edgeVerts = []; // flat array of 2 vert indices per edge
    this.faceEdges = []; // the edges bordering each face.
    this.numEdges = 0;

    const getEdgeIndex = (v0, v1) => {
      let tmp0 = v0;
      let tmp1 = v1;
      if (tmp1 < tmp0) {
        const tmp = tmp0;
        tmp0 = tmp1;
        tmp1 = tmp;
      }
      const key = tmp0 + '>' + tmp1;
      if (key in connectedVertices) {
        // console.log(key + ':' + connectedVertices[key] + " face:" + ( v0 < v1 ? 0 : 1) );
        return connectedVertices[key];
      }

      const p0 = this.vertices.getValueRef(tmp0);
      const p1 = this.vertices.getValueRef(tmp1);
      const edgeVec = p1.subtract(p0);

      const edgeIndex = this.edgeFaces.length / 2;
      const edgeData = {
        'edgeIndex': edgeIndex,
        'edgeVec': edgeVec
      }
      connectedVertices[key] = edgeData;

      this.edgeFaces.push(-1);
      this.edgeFaces.push(-1);
      this.edgeVerts.push(tmp0);
      this.edgeVerts.push(tmp1);
      // console.log(key + ':' + connectedVertices[key] + " face:" + ( v0 < v1 ? 0 : 1));

      this.numEdges++;
      return edgeData;
    }

    const addEdge = (v0, v1, faceIndex) => {
      // console.log('addEdge:' + v0 + " :" + v1 + " faceIndex:" + faceIndex );
      const edgeData = getEdgeIndex(v0, v1);
      const edgeIndex = edgeData.edgeIndex;
      const edgeVec = edgeData.edgeVec;
      if (v1 < v0) {
        const edgeFaceIndex = (edgeIndex * 2) + 0;
        if (this.__logTopologyWarnings && this.edgeFaces[edgeFaceIndex] != -1)
          console.warn("Edge poly 0 already set. Mesh is non-manifold.");
        this.edgeFaces[edgeFaceIndex] = faceIndex;
      } else {
        const edgeFaceIndex = (edgeIndex * 2) + 1;
        if (this.__logTopologyWarnings && this.edgeFaces[edgeFaceIndex] != -1)
          console.warn("Edge poly 1 already set. Mesh is non-manifold.");
        this.edgeFaces[edgeFaceIndex] = faceIndex;
      }

      if (!(faceIndex in this.faceEdges))
        this.faceEdges[faceIndex] = [];
      this.faceEdges[faceIndex].push(edgeIndex);

      // Push the edge index onto both vertex edge lists.
      // We use Sets to avoid adding the same edge 2x to the same vertex.
      if (this.vertexEdges[v0] == undefined) {
        this.vertexEdges[v0] = new Set();
      }
      if (this.vertexEdges[v1] == undefined) {
        this.vertexEdges[v1] = new Set();
      }
      this.vertexEdges[v0].add(edgeIndex);
      this.vertexEdges[v1].add(edgeIndex);

      // if (this.vertexFaces[v0] == undefined) {
      //     this.vertexFaces[v0] = [];
      // }
      // this.vertexFaces[v0].push(faceIndex);
    }

    const numFaces = this.getNumFaces();
    for (let faceIndex = 0; faceIndex < numFaces; faceIndex++) {
      const faceVerts = this.getFaceVertexIndices(faceIndex);
      for (let j = 0; j < faceVerts.length; j++) {
        const v0 = faceVerts[j];
        const v1 = faceVerts[((j + 1) % faceVerts.length)];
        addEdge(v0, v1, faceIndex);
      }
    }
  }


  computeFaceNormals() {

    const vertices = this.vertices;
    const faceNormals = this.addFaceAttribute('normals', Vec3);
    const numFaces = this.getNumFaces();
    for (let faceIndex = 0; faceIndex < numFaces; faceIndex++) {
      const faceVerts = this.getFaceVertexIndices(faceIndex);
      const p0 = vertices.getValueRef(faceVerts[0]);
      const p1 = vertices.getValueRef(faceVerts[1]);
      let prev = p1;
      const faceNormal = new Vec3();
      for (let j = 2; j < faceVerts.length; j++) {
        const pn = vertices.getValueRef(faceVerts[j]);
        const v0 = prev.subtract(p0);
        const v1 = pn.subtract(p0);
        faceNormal.addInPlace(v0.cross(v1).normalize());
        prev = pn;
      }
      if (faceNormal.lengthSquared() < Number.EPSILON) {
        // Note: we are getting many faces with no surface area. 
        // This is simply an authoring issue. 
        //console.warn("Invalid Mesh topology");
        // if(debugMesh){
        //     printf("Face vertices are coincident face:%i", i);
        //     for (let j = 0; j < faceVerts.length; j++)
        //         printf("v:%i", this.__faceVertexIndices[ numFacesVertices + (i*faceVerts.length) + j ]);
        //     printf("\n");
        // }
      }

      faceNormals.setValue(faceIndex, faceNormal.normalize());
    }
  }


  generateEdgeFlags() {

    if (this.vertexEdges == undefined)
      this.genTopologyInfo();

    if (!this.hasFaceAttribute('normals'))
      this.computeFaceNormals();

    const vertices = this.vertices;
    const faceNormals = this.getFaceAttribute("normals");
    this.edgeVecs = [];
    this.edgeAngles = new Float32Array(this.numEdges);
    for (let i = 0; i < this.edgeFaces.length; i += 2) {

      const v0 = this.edgeVerts[i];
      const v1 = this.edgeVerts[i + 1];
      const e_vec = vertices.getValueRef(v1).subtract(vertices.getValueRef(v0));
      e_vec.normalizeInPlace();
      this.edgeVecs.push(e_vec);

      const p0 = this.edgeFaces[i];
      const p1 = this.edgeFaces[i + 1];
      if (p0 == -1 || p1 == -1) {
        // Flag the edge as a border edge....
        this.edgeAngles[i / 2] = Math.PI * 2.0;
        continue;
      }

      const n0 = faceNormals.getValueRef(p0);
      const n1 = faceNormals.getValueRef(p1);
      this.edgeAngles[i / 2] = n0.angleTo(n1);
    }
  }

  computeVertexNormals(hardAngle = 1.0 /*radians*/ ) {
    // console.log("computeVertexNormals");

    this.generateEdgeFlags();

    const vertices = this.vertices;
    const faceNormals = this.getFaceAttribute('normals');
    const normalsAttr = this.addVertexAttribute('normals', Vec3);

    // these methods are faster versions than using the methods
    // provided on the attributes. We cache values and use hard coded constants.
    const faceNormalsBuffer = faceNormals.data.buffer;
    const getFaceNormal = (index) => {
      return new Vec3(faceNormalsBuffer, index * 12); // 3 conmponents at 4 bytes each.
    }
    const vertexNormalsArray = normalsAttr.data;
    const setVertexNormal = (index, value) => {
      vertexNormalsArray[(index * 3) + 0] = value.x;
      vertexNormalsArray[(index * 3) + 1] = value.y;
      vertexNormalsArray[(index * 3) + 2] = value.z;
    }
    const getConnectedEdgeVecs = (faceIndex, vertexIndex) => {
      let e0, e1;
      const faceEdges = this.faceEdges[faceIndex];
      for (let e of faceEdges) {
        if (this.edgeVerts[(e * 2)] == vertexIndex) {
          if (!e0) e0 = this.edgeVecs[e];
          else e1 = this.edgeVecs[e];
        } else if (this.edgeVerts[(e * 2) + 1] == vertexIndex) {
          if (!e0) e0 = this.edgeVecs[e];
          else e1 = this.edgeVecs[e];
        }
      }
      return [e0, e1];
    }

    for (let i = 0; i < this.vertexEdges.length; i++) {

      // If this face indexing doesn't start at 0, then the vertexEdges don't either. 
      if (this.vertexEdges[i] == undefined)
        continue;

      let v = vertices.getValueRef(i);
      let edges = this.vertexEdges[i];

      // Groups of faces having a smooth normal at the current vertex.
      let faceGroups = [];
      let addFaceToGroup = (face) => {
        let inGroup = false;
        for (let faceGroup of faceGroups) {
          inGroup = faceGroup.indexOf(face) != -1;
          if (inGroup)
            break;
        }
        if (!inGroup)
          faceGroups.push([face]);
      }
      let smooth = true;
      for (let e of edges) {
        let f0 = this.edgeFaces[e * 2];
        let f1 = this.edgeFaces[(e * 2) + 1];
        if (f0 != -1 && f1 == -1 && this.edgeAngles[e] < hardAngle) {
          // This is a smooth edge... Add both faces to the same group.
          let addedtoGroup = false;
          let f0groupIndex = -1;
          let f1groupIndex = -1;
          for (let groupIndex = 0; groupIndex < faceGroups.length; groupIndex++) {
            if (f0groupIndex == -1 && faceGroups[groupIndex].indexOf(f0) != -1)
              f0groupIndex = groupIndex;
            if (f1groupIndex == -1 && faceGroups[groupIndex].indexOf(f1) != -1)
              f1groupIndex = groupIndex;
          }
          if (f0groupIndex == -1 && f1groupIndex == -1) {
            faceGroups.push([f0, f1]);
          } else if (f0groupIndex != -1 && f1groupIndex != -1) {
            if (f0groupIndex != f1groupIndex) {
              // Merge the 2 groups that the smooth edge joins.
              faceGroups[f0groupIndex] = faceGroups[f0groupIndex].concat(faceGroups[f1groupIndex]);
              faceGroups.splice(f1groupIndex, 1);
            }
          } else {
            if (f0groupIndex == -1) {
              faceGroups[f1groupIndex].push(f0);
            }
            if (f1groupIndex == -1) {
              faceGroups[f0groupIndex].push(f1);
            }
          }
          continue;
        }
        smooth = false;
        // This is a hard edge or a border edge... Add faces separately group.
        if (f0 != -1)
          addFaceToGroup(f0);
        if (f1 != -1)
          addFaceToGroup(f1);
      }

      // Sort the groups to have the biggest group first.
      faceGroups.sort((a, b) => (a.length < b.length) ? 1 : ((a.length > b.length) ? -1 : 0));

      let firstVirtex = true;
      for (let faceGroup of faceGroups) {
        let normal = new Vec3();
        for (let faceIndex of faceGroup) {
          let face_edges = getConnectedEdgeVecs(faceIndex, i);
          let weight = face_edges[0].angleTo(face_edges[1]);
          // if (i == 1) 
          //     console.log("FaceNormal:" + faceIndex + ":" + getFaceNormal(faceIndex).toString());
          normal.addInPlace(getFaceNormal(faceIndex).scale(weight));
        }
        normal.normalizeInPlace();
        if (firstVirtex) {
          setVertexNormal(i, normal);
          firstVirtex = false;
        } else {
          normalsAttr.setSplitVertexValues(i, faceGroup, normal);
        }
      }
    }

    return normalsAttr;
  }

  computeNumTriangles() {
    let numVertsPerFace = 3;
    let trisCount = 0;
    for (let fc of this.__faceCounts) {
      trisCount += fc * (numVertsPerFace - 2);
      numVertsPerFace++;
    }
    return trisCount;
  }

  generateTriangulatedIndices(totalNumVertices, numUnSplitVertices, splitIndices) {

    let faceCount = this.getNumFaces();
    // let faceVertexIndices = this.getFaceVertexIndices();

    let trisCount = this.computeNumTriangles();

    let trianglulatedIndices;
    if (totalNumVertices < Math.pow(2, 8))
      trianglulatedIndices = new Uint8Array(trisCount * 3);
    else if (totalNumVertices < Math.pow(2, 16))
      trianglulatedIndices = new Uint16Array(trisCount * 3);
    else
      trianglulatedIndices = new Uint32Array(trisCount * 3);

    let triangleVertex = 0;
    let addTriangleVertexIndex = function(vertex, faceIndex) {
      if (vertex in splitIndices && faceIndex in splitIndices[vertex])
        vertex = numUnSplitVertices + splitIndices[vertex][faceIndex];
      trianglulatedIndices[triangleVertex] = vertex;
      triangleVertex++;
    }
    let numFaces = this.getNumFaces();
    for (let faceIndex = 0; faceIndex < numFaces; faceIndex++) {
      let faceVerts = this.getFaceVertexIndices(faceIndex);
      for (let j = 0; j < faceVerts.length; j++) {
        if (j >= 3) {
          // For each aditional triangle, we have to add 2 indices.
          addTriangleVertexIndex(faceVerts[0], faceIndex);
          addTriangleVertexIndex(faceVerts[j - 1], faceIndex);
        }
        addTriangleVertexIndex(faceVerts[j], faceIndex);
      }
    }
    return trianglulatedIndices

  }


  computeHardEdgesIndices(hardAngle = 1.0) {
    let hardEdges = [];
    let addEdge = (index) => {
      hardEdges.push(this.edgeVerts[index]);
      hardEdges.push(this.edgeVerts[index + 1]);
    }
    for (let i = 0; i < this.edgeFlags.length; i += 2) {
      let p0 = this.edgeFaces[i];
      let p1 = this.edgeFaces[i + 1];
      if (this.edgeAngles[i / 2] > hardAngle) {
        addEdge(i);
      }
    }
    return hardEdges;
  }

  getWireframeIndices() {
    return indices;
  }



  //////////////////////////////////////////
  // Memory


  genBuffers(opts) {

    // Compute the normals on demand. 
    // if (!('normals' in this.__vertexAttributes)) {
    //     // this.__geom.computeVertexNormals();
    //     this.addVertexAttribute("normals", Vec3, 0.0);
    // }

    const splitIndices = {};
    let splitCount = 0;
    for (let [attrName, attr] of this.__vertexAttributes) {
      let attrSplits = attr.getSplits();
      for (let polygon in attrSplits) {
        if (!(polygon in splitIndices))
          splitIndices[polygon] = {};
        let vertices = attrSplits[polygon];
        for (let v in vertices) {
          let vertex = parseInt(v);
          if (!(vertex in splitIndices[polygon])) {
            splitIndices[polygon][vertex] = splitCount;
            splitCount++;
          }
        }
      }
    }

    const numUnSplitVertices = this.vertices.length;
    const totalNumVertices = numUnSplitVertices + splitCount;

    let indices;
    if (!opts || opts.includeIndices != false) {
      indices = this.generateTriangulatedIndices(totalNumVertices, numUnSplitVertices, splitIndices);
    }

    // Create some vertex attribute buffers
    const debugAttrValues = false;
    // let maxIndex;
    // if (debugAttrValues)
    //     maxIndex = Math.max(...indices);
    const attrBuffers = {};
    for (let [attrName, attr] of this.__vertexAttributes) {
      let values;
      if (splitCount == 0)
        values = attr.data;
      else
        values = attr.generateSplitValues(splitIndices, splitCount);

      const dimension = attr.numFloat32Elements;
      const count = values.length / dimension;

      // if (debugAttrValues) {
      //     if (count <= maxIndex)
      //         console.warn("Invalid indexing. Attr value is insufficient for indexing:" + attrName + ". Max Index:" + maxIndex + " Attr Size:" + count);
      // }

      attrBuffers[attrName] = {
        values: values,
        count: count,
        dimension: dimension,
        normalized: attrName == 'normals'
      };
    }

    const result = {
      numVertices: this.numVertices(),
      numRenderVerts: totalNumVertices,
      indices,
      attrBuffers
    };

    if (opts && opts.includeVertexNeighbors) {
      if (this.vertexEdges == undefined)
        this.genTopologyInfo();

      let count = 0;
      for (let i = 0; i < this.vertexEdges.length; i++) {
        // If this face indexing doesn't start at 0, then the vertexEdges don't either. 
        if (this.vertexEdges[i])
          count += this.vertexEdges[i].size;
      }
      // The array will be structured as a start+offset for each vertex, followed
      // by a 2d array of neighbor indices.
      const vertexNeighbors = new Uint32Array(this.vertexEdges.length * 2 + count);

      const sortFanEdges = (fanEdges)=>{

        for (let i = 0; i < fanEdges.length; i++) {
          let feA = fanEdges[i];
          for (let j = 0; j < i; j++) {
            let feB = fanEdges[j];
            if (feA[0] != -1 && feA[0] == feB[1]) {
              //  move feA after feB;
              if(i != j+1){
                fanEdges.splice(i, 1);
                fanEdges.splice(j+1, 0, feA);
              }
              break;
            }
            if (feA[1] != -1 && feA[1] == feB[0]) {
              //  move feA before feB;
              fanEdges.splice(i, 1);
              fanEdges.splice(j, 0, feA);
              break;
            }
          }
        }
      }

      const checkFanEdges = (fanEdges)=>{

        // now check that the faces all build a fan. Maybe starting and ending with -1
        if(fanEdges[0][0] == -1 || fanEdges[fanEdges.length-1][1] == -1){
          if(fanEdges[0][0] != -1 || fanEdges[fanEdges.length-1][1] != -1){
            throw ("If fan starts with -1, it must also end with -1");
          }
        }
        for (let i = 0; i < fanEdges.length; i++) {
          let fe = fanEdges[i];
          if(fe[0] == -1 || fe[1] == -1){
            if(i != 0 && i != fanEdges.length-1){
              throw ("-1 only allowed at the beginning and end of a fan.");
            }
          }
          if(fe[0] != -1 ){
            let prev = (i-1);
            if(prev < 0)
              prev += fanEdges.length;
            if (fe[0] != fanEdges[prev][1]) {
              throw ("Faces are not sequential");
            }
          }
          if(fe[1] != -1 ){
            let next = (i+1)%fanEdges.length;
            if (fe[1] != fanEdges[next][0]) {
              throw ("Faces are not sequential");
            }
          }
        }
      }

      // Populate the start and offset values.
      let offset = this.vertexEdges.length * 2;
      for (let i = 0; i < this.vertexEdges.length; i++) {
        if (this.vertexEdges[i] == undefined)
          continue;
        let edges = this.vertexEdges[i];

        // Build a sorted list of faces based on a fan around
        // the vertex. 
        let fanEdges = [];
        for (let e of edges) {
          let v0 = this.edgeVerts[e * 2];
          let v1 = this.edgeVerts[(e * 2) + 1];
          let f0 = this.edgeFaces[e * 2];
          let f1 = this.edgeFaces[(e * 2) + 1];
          let neigVert;
          if (v0 == i) {
            neigVert = v1;
          } else if (v1 == i) {
            neigVert = v0;
            // swap the faces
            let tmp = f0;
            f0 = f1;
            f1 = tmp;
          } else {
            throw ("Invalid topology");
          }
          fanEdges.push([f0, f1, neigVert]);
        }
        sortFanEdges(fanEdges);
        checkFanEdges(fanEdges);
        let closed = (fanEdges[0][0] != -1 || fanEdges[fanEdges.length-1][1] != -1);
        let flags = 0;
        if(closed)
          flags += 1;
        vertexNeighbors[i * 2] = offset;
        vertexNeighbors[i * 2 + 1] = edges.size + (flags << 8);
        for (let fe of fanEdges) {
          vertexNeighbors[offset] = fe[2];
          offset++;
        }
      }

      result.vertexNeighbors = vertexNeighbors;

    }


    return result;
  }

  freeBuffers() {
    super.freeBuffers();
    this.init();
  }

  //////////////////////////////////////////
  // Persistence

  readBinary(reader, context) {
    super.loadBaseGeomBinary(reader);
    this.setFaceCounts(reader.loadUInt32Array());
    this.__faceVertexCounts = reader.loadUInt8Array(this.__faceVertexCounts.length);
    let offsetRange = reader.loadSInt32Vec2();
    let bytes = reader.loadUInt8();
    let faceVertexIndexDeltas;
    if (bytes == 1)
      faceVertexIndexDeltas = reader.loadUInt8Array();
    else if (bytes == 2)
      faceVertexIndexDeltas = reader.loadUInt16Array();
    else if (bytes == 4)
      faceVertexIndexDeltas = reader.loadUInt32Array();

    let numVerts = this.numVertices();

    let numFaces = this.getNumFaces();
    let offset = 0;
    let prevCount = 0;
    for (let faceIndex = 0; faceIndex < numFaces; faceIndex++) {
      let count = this.__faceVertexCounts[faceIndex] + 3;
      this.__faceOffsets[faceIndex] = offset;
      for (let j = 0; j < count; j++) {
        let faceVertex = offset + j;
        let delta = faceVertexIndexDeltas[faceVertex] + offsetRange.x;
        if (faceIndex == 0)
          this.__faceVertexIndices[faceVertex] = delta;
        else {
          let prevFaceVertex = this.__faceOffsets[faceIndex - 1];
          prevFaceVertex += (j < prevCount) ? j : (prevCount - 1);
          this.__faceVertexIndices[faceVertex] = this.__faceVertexIndices[prevFaceVertex] + delta;
        }
      }
      offset += count;
      prevCount = count;
    }
    this.__numPopulatedFaceVertexIndices = offset;

    /////////////////////////////////////
    // Clusters
    const numClusters = reader.loadUInt32();
    if (numClusters > 0) {
      const positionsAttr = this.vertices;
      const lightmapCoordsAttr = this.addVertexAttribute('lightmapCoords', Vec2);
      // let clusterIDsAttr = this.addVertexAttribute('clusterIDs', Float32);
      for (let i = 0; i < numClusters; i++) {
        let xfo = new Xfo(reader.loadFloat32Vec3(), reader.loadFloat32Quat());
        const coordsScale = reader.loadFloat32();
        let offset = reader.loadFloat32Vec2();
        let offsetRange = reader.loadSInt32Vec2();
        let bytes = reader.loadUInt8();
        let clusterFaceIndiceDeltas;
        if (bytes == 1)
          clusterFaceIndiceDeltas = reader.loadUInt8Array();
        else if (bytes == 2)
          clusterFaceIndiceDeltas = reader.loadUInt16Array();
        else
          clusterFaceIndiceDeltas = reader.loadUInt32Array();
        let prevFace = 0;
        for (let delta of clusterFaceIndiceDeltas) {
          let face = delta + offsetRange.x;
          face += prevFace;
          prevFace = face;
          let vertexIndices = this.getFaceVertexIndices(face);
          for (let vertexIndex of vertexIndices) {
            let pos = positionsAttr.getValueRef(vertexIndex);
            let tmp = xfo.transformVec3(pos);
            let lightmapCoord = new Vec2(tmp.x, tmp.z); // Discard y, use x,z
            lightmapCoord.scaleInPlace(coordsScale);
            lightmapCoord.addInPlace(offset);
            lightmapCoordsAttr.setFaceVertexValue_ByVertexIndex(face, vertexIndex, lightmapCoord);

            // for debugging.
            // clusterIDsAttr.setFaceVertexValue_ByVertexIndex(face, vertexIndex, i);
          }
        }

        // Now compute the Uvs for the vertices.
      }
    }


    // this.computeVertexNormals();
    this.geomDataChanged.emit();
  }


  toJSON(context, flags) {
    const j = super.toJSON(context, flags);
    if(!(flags&SAVE_FLAG_SKIP_GEOMDATA)) {
      j.faceCounts = Array.from(this.__faceCounts);
      j.faceVertexIndices = Array.from(this.__faceVertexIndices);
    }
    return j
  }

  fromJSON(j, context, flags) {
    super.fromJSON(j, context, flags);
    if(j.faceCounts)
      this.__faceCounts = Uint32Array.from(j.faceCounts);
    if(j.faceVertexIndices)
      this.__faceVertexIndices = Uint32Array.from(j.faceVertexIndices);
  }


};

export {
  Mesh
};
//export default Mesh;