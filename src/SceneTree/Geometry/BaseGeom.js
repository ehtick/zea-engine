import {
    Vec2,
    Vec3,
    Box2,
    Box3,
    typeRegistry
} from '../../Math';
import {
    Signal
} from '../../Utilities';
import {
    ParameterOwner
} from '../ParameterOwner.js';
import {
    VertexAttribute
} from './VertexAttribute.js';

class BaseGeom extends ParameterOwner {
    constructor() {
        super();
        this.__boundingBox = new Box3();
        this.__boundingBoxDirty = true;
        this.__vertexAttributes = new Map();
        this.__metaData = new Map();
        this.addVertexAttribute('positions', Vec3, 0.0);

        this.boundingBoxDirtied = new Signal();
        this.geomDataChanged = new Signal();
        this.geomDataTopologyChanged = new Signal();
    }

    setDebugName(name) {
        this.__name = name;
    }

    destroy() {
        this.destructing.emit();
    }

    addVertexAttribute(name, dataType, defaultScalarValue = undefined) {
        let attr = new VertexAttribute(this, dataType, (this.vertices != undefined) ? this.vertices.length : 0, defaultScalarValue);
        this.__vertexAttributes.set(name, attr);
        return attr;
    }

    hasVertexAttribute(name) {
        return this.__vertexAttributes.has(name);
    }

    getVertexAttribute(name) {
        return this.__vertexAttributes.get(name)
    }

    getVertexAttributes(name) {
        let vertexAttributes = {};
        for (let [key, attr] of this.__vertexAttributes.entries())
            vertexAttributes[key] = attr;
        return vertexAttributes
    }

    get vertices() {
        return this.__vertexAttributes.get('positions')
    }

    numVertices() {
        return this.vertices.length;
    }
    getNumVertices() {
        return this.vertices.length;
    }

    setNumVertices(count) {
        // If this works, remove the old version.
        // for (let [key, attr] of this.__vertexAttributes.entries())
        //     attr.resize(count);
        this.__vertexAttributes.forEach(attr => attr.resize(count));
    }

    getVertex(index) {
        return Vec3.createFromFloat32Buffer(this.vertices.data.buffer, index * 3)
    }

    setVertex(index, vec3) {
        return Vec3.createFromFloat32Buffer(this.vertices.data.buffer, index * 3).setFromOther(vec3)
    }

    moveVertices(delta) {
        let vertices = this.vertices;
        for (let i = 0; i < vertices.length; i++)
            vertices.getValueRef(i).addInPlace(delta);
        this.setBoundingBoxDirty();
    }

    //////////////////////////////////////////
    // BoundingBox

    get boundingBox() {
        if (this.__boundingBoxDirty)
            this.updateBoundingBox();
        return this.__boundingBox;
    }

    setBoundingBoxDirty() {
        this.__boundingBoxDirty = true;
        this.boundingBoxDirtied.emit();
    }

    updateBoundingBox() {
        let vertices = this.vertices;
        let bbox = new Box3();
        let numVerts = vertices.length;
        for (let i = 0; i < numVerts; i++)
            bbox.addPoint(vertices.getValueRef(i));
        this.__boundingBox = bbox;
        this.__boundingBoxDirty = false;
    }

    //////////////////////////////////////////
    // Metadata

    getMetadata(key) {
        return this.__metaData.get(key)
    }

    hasMetadata(key) {
        return this.__metaData.has(key)
    }

    setMetadata(key, metaData) {
        this.__metaData.set(key, metaData);
    }

    //////////////////////////////////////////
    // Memory


    genBuffers(opts) {
        let attrBuffers = {};
        for (let [attrName, attr] of this.__vertexAttributes) {
            attrBuffers[attrName] = {
                values: attr.data,
                count: attr.size,
                dimension: attr.numFloat32Elements,
                normalized: false
            };
        }
        return {
            numVertices: this.numVertices(),
            attrBuffers
        };
    }

    freeBuffers() {
        // Before destroying all our data, 
        // make sure the bbox is up to date.
        // if (this.__boundingBoxDirty)
        //     this.updateBoundingBox();
        // // TODO: push the data to a worker thread and terminate like in MeshProxy. 
        // this.__vertexAttributes = new Map();
    }

    //////////////////////////////////////////
    // Persistence

    loadBaseGeomBinary(reader) {

        this.name = reader.loadStr();
        let flags = reader.loadUInt8();
        this.debugColor = reader.loadRGBFloat32Color();
        let numVerts = reader.loadUInt32();
        this.__boundingBox.set(reader.loadFloat32Vec3(), reader.loadFloat32Vec3());

        this.setNumVertices(numVerts);
        let positionsAttr = this.vertices;
        let normalsAttr;
        let texCoordsAttr;
        if (flags & (1 << 1)) {
            normalsAttr = this.getVertexAttribute('normals');
            if (!normalsAttr)
                normalsAttr = this.addVertexAttribute('normals', Vec3, 0.0);
        }
        if (flags & (1 << 2)) {
            texCoordsAttr = this.getVertexAttribute('texCoords');
            if (!texCoordsAttr)
                texCoordsAttr = this.addVertexAttribute('texCoords', Vec2, 0.0);
        }

        let parse8BitPositionsArray = (range, offset, sclVec, positions_8bit) => {
            for (let i = range[0]; i < range[1]; i++) {
                let pos = new Vec3(
                    positions_8bit[(i * 3) + 0] / 255.0,
                    positions_8bit[(i * 3) + 1] / 255.0,
                    positions_8bit[(i * 3) + 2] / 255.0
                );
                pos.multiplyInPlace(sclVec);
                pos.addInPlace(offset);
                positionsAttr.setValue(i, pos);
            }

        }

        let parse8BitNormalsArray = (range, offset, sclVec, normals_8bit) => {
            if (sclVec.isNull())
                sclVec.set(1, 1, 1);
            for (let i = range[0]; i < range[1]; i++) {
                let normal = new Vec3(
                    normals_8bit[(i * 3) + 0] / 255.0,
                    normals_8bit[(i * 3) + 1] / 255.0,
                    normals_8bit[(i * 3) + 2] / 255.0
                );
                normal.multiplyInPlace(sclVec);
                normal.addInPlace(offset);
                normal.normalizeInPlace();
                normalsAttr.setValue(i, normal);
            }
        }
        let parse8BitTextureCoordsArray = (range, offset, sclVec, texCoords_8bit) => {
            // if (sclVec.isNull())
            //     sclVec.set(1, 1, 1);
            for (let i = range[0]; i < range[1]; i++) {
                let textureCoord = new Vec2(
                    texCoords_8bit[(i * 2) + 0] / 255.0,
                    texCoords_8bit[(i * 2) + 1] / 255.0
                );
                textureCoord.multiplyInPlace(sclVec);
                textureCoord.addInPlace(offset);
                texCoordsAttr.setValue(i, textureCoord);
            }
        }

        let numClusters = reader.loadUInt32();
        if (numClusters == 1) {
            {
                let box3 = this.__boundingBox;
                let positions_8bit = reader.loadUInt8Array(numVerts * 3);
                parse8BitPositionsArray([0, numVerts], box3.p0, box3.diagonal(), positions_8bit);
            }

            if (normalsAttr) {
                let box3 = new Box3(reader.loadFloat32Vec3(), reader.loadFloat32Vec3());
                let normals_8bit = reader.loadUInt8Array(numVerts * 3);
                parse8BitNormalsArray([0, numVerts], box3.p0, box3.diagonal(), normals_8bit);

                normalsAttr.loadSplitValues(reader);
            }
            if (texCoordsAttr) {
                let box2 = new Box2(reader.loadFloat32Vec2(), reader.loadFloat32Vec2());
                let texCoords_8bit = reader.loadUInt8Array(numVerts * 2);
                parse8BitTextureCoordsArray([0, numVerts], box2.p0, box2.diagonal(), texCoords_8bit);

                texCoordsAttr.loadSplitValues(reader);
            }
        } else {
            let clusters = [];
            let offset = 0;
            for (let i = 0; i < numClusters; i++) {
                let count = reader.loadUInt32();
                let box3 = new Box3(reader.loadFloat32Vec3(), reader.loadFloat32Vec3());
                let clusterData = {
                    'range': [offset, offset + count],
                    'bbox': box3
                };
                if (normalsAttr) {
                    clusterData.normalsRange = new Box3(reader.loadFloat32Vec3(), reader.loadFloat32Vec3());
                }
                if (texCoordsAttr) {
                    clusterData.texCoordsRange = new Box2(reader.loadFloat32Vec2(), reader.loadFloat32Vec2());
                }

                clusters.push(clusterData);
                offset += count;
            }
            let positions_8bit = reader.loadUInt8Array(numVerts * 3);
            let normals_8bit;
            let texCoords_8bit;
            if (normalsAttr) {
                normals_8bit = reader.loadUInt8Array(numVerts * 3);
            }
            if (texCoordsAttr) {
                texCoords_8bit = reader.loadUInt8Array(numVerts * 2);
            }

            for (let i = 0; i < numClusters; i++) {

                {
                    let box3 = clusters[i].bbox;
                    parse8BitPositionsArray(clusters[i].range, box3.p0, box3.diagonal(), positions_8bit);
                }

                if (normalsAttr) {
                    let box3 = clusters[i].normalsRange;
                    parse8BitNormalsArray(clusters[i].range, box3.p0, box3.diagonal(), normals_8bit);
                }
                if (texCoordsAttr) {
                    let box2 = clusters[i].texCoordsRange;
                    parse8BitTextureCoordsArray(clusters[i].range, box2.p0, box2.diagonal(), texCoords_8bit);
                }
            }
            if (normalsAttr) {
                normalsAttr.loadSplitValues(reader);
            }
            if (texCoordsAttr) {
                texCoordsAttr.loadSplitValues(reader);
            }
        }
    }

    toJSON(opts) {
        let vertexAttributes = {};
        for (let [key, attr] of this.__vertexAttributes.entries()) {
            if (!opts || !('attrList' in opts) || opts.attrList.indexOf(key) != -1)
                vertexAttributes[key] = attr.toJSON(opts);
        }
        return {
            'name': this.name,
            'vertexAttributes': vertexAttributes
        }
    }

    fromJSON(json) {
        for (let name in json.vertexAttributes) {
            let attr = this.__vertexAttributes.get(name);
            let attrJSON = json.vertexAttributes[name];
            if (!attr) {
                let dataType = typeRegistry.getType(attrJSON.dataType);
                attr = new VertexAttribute(this, dataType, 0, attrJSON.defaultScalarValue);
                this.__vertexAttributes.set(name, attr);
            }
            attr.fromJSON(attrJSON);
        }
    }

    toString() {
        return JSON.stringify(this.toJSON(), null, 2)
    }
};
export {
    BaseGeom
};
// BaseGeom;