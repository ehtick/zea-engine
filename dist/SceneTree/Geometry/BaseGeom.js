/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vec2, Vec3, Box2, Box3, Color } from '../../Math/index';
import { ParameterOwner } from '../ParameterOwner';
import { Vec3Attribute } from './Vec3Attribute';
import { Vec2Attribute } from './Vec2Attribute';
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
    /**
     * Create a base geom.
     */
    constructor() {
        super();
        this.__boundingBox = new Box3();
        this.__boundingBoxDirty = true;
        this.__metaData = new Map();
        this.__name = '';
        this.__numVertices = 0;
        this.__vertexAttributes = new Map();
        this.debugColor = new Color(1, 0, 0, 1);
        this.name = '';
        this.addVertexAttribute('positions', new Vec3Attribute());
    }
    /**
     * The clear method.
     */
    clear() {
        this.setNumVertices(0);
    }
    /**
     * Establishes a name for the geometry.
     *
     * @param name - The debug name value.
     */
    setDebugName(name) {
        this.name = name;
    }
    /**
     * Adds a new vertex attribute to the geometry.
     *
     * @param name - The name of the vertex attribute.
     * @param dataType - The dataType value. // TODO: is any ok vs. AttrValue | number. Unsure about how dataType is used
     * @return - Returns an attribute.
     */
    addVertexAttribute(name, attr) {
        attr.setCount(this.__numVertices);
        this.__vertexAttributes.set(name, attr);
    }
    /**
     * Checks if the the geometry has an attribute with the specified name.
     *
     * @param name - The name of the vertex attribute.
     * @return - The return value.
     */
    hasVertexAttribute(name) {
        return this.__vertexAttributes.has(name);
    }
    /**
     * Returns vertex attribute with the specified name.
     *
     * @param name - The name of the vertex attribute.
     * @return - The return value.
     */
    getVertexAttribute(name) {
        return this.__vertexAttributes.get(name);
    }
    /**
     * Returns all vertex attributes in an object with their names.
     *
     * @return - The return value.
     */
    getVertexAttributes() {
        const vertexAttributes = {};
        for (const [key, attr] of this.__vertexAttributes.entries())
            vertexAttributes[key] = attr;
        return vertexAttributes;
    }
    /**
     * Returns 'positions' vertex attribute.
     */
    get positions() {
        return this.__vertexAttributes.get('positions');
    }
    /**
     * Returns the number of vertex attributes.
     *
     * @return - The return value.
     */
    numVertices() {
        return this.__numVertices;
    }
    /**
     * Returns the number of vertex attributes.
     *
     * @return - The return value.
     */
    getNumVertices() {
        return this.__numVertices;
    }
    /**
     * Sets the number of vertices the geometry has.
     *
     * @param count - The count value.
     */
    setNumVertices(count) {
        this.__numVertices = count;
        // Resizes each of the vertex attributes to match the new count.
        this.__vertexAttributes.forEach((attr) => attr.setCount(this.__numVertices));
        this.setBoundingBoxDirty();
    }
    // ////////////////////////////////////////
    // BoundingBox
    /**
     * Returns the bounding box for geometry.
     * @return - The return value.
     */
    getBoundingBox() {
        if (this.__boundingBoxDirty)
            this.updateBoundingBox();
        return this.__boundingBox;
    }
    /**
     * The setBoundingBoxDirty method.
     */
    setBoundingBoxDirty() {
        this.__boundingBoxDirty = true;
        this.emit('boundingBoxChanged');
    }
    /**
     * The updateBoundingBox method.
     */
    updateBoundingBox() {
        const positions = this.positions;
        const bbox = new Box3();
        if (positions) {
            const numVerts = positions.getCount();
            for (let i = 0; i < numVerts; i++)
                bbox.addPoint(positions.getValueRef(i));
        }
        this.__boundingBox = bbox;
        this.__boundingBoxDirty = false;
    }
    // ////////////////////////////////////////
    // Metadata
    /**
     * Returns metadata value of the specified name.
     *
     * @param key - The key value.
     * @return - The return value.
     */
    getMetadata(key) {
        return this.__metaData.get(key);
    }
    /**
     * Verifies if geometry's metadata contains a value with the specified key.
     *
     * @param key - The key value.
     * @return - The return value.
     */
    hasMetadata(key) {
        return this.__metaData.has(key);
    }
    /**
     * Sets metadata value to the geometry.
     *
     * @param key - The key value.
     * @param metaData - The metaData value.
     */
    setMetadata(key, metaData) {
        this.__metaData.set(key, metaData);
    }
    /**
     * Removes metadata value from the geometry with the specified key.
     *
     * @param key - The key value.
     */
    deleteMetadata(key) {
        this.__metaData.delete(key);
    }
    // ////////////////////////////////////////
    // Memory
    /**
     * Returns vertex attributes buffers and its count.
     * @return - The return value.
     */
    genBuffers(opts) {
        const attrBuffers = {};
        for (const [attrName, attr] of this.__vertexAttributes) {
            attrBuffers[attrName] = attr.genBuffer();
        }
        return {
            numVertices: this.numVertices(),
            attrBuffers,
        };
    }
    // ////////////////////////////////////////
    // Persistence
    /**
     * Sets state of current Geometry(Including Vertices and Bounding Box) using a binary reader object.
     *
     * @param reader - The reader value.
     */
    loadBaseGeomBinary(reader) {
        this.name = reader.loadStr();
        const flags = reader.loadUInt8();
        this.debugColor = reader.loadRGBFloat32Color();
        const numVerts = reader.loadUInt32();
        this.__boundingBox.set(reader.loadFloat32Vec3(), reader.loadFloat32Vec3());
        this.setNumVertices(numVerts);
        const positionsAttr = this.positions;
        let normalsAttr;
        let texCoordsAttr;
        if (flags & (1 << 1)) {
            normalsAttr = this.getVertexAttribute('normals');
            if (!normalsAttr) {
                normalsAttr = new Vec3Attribute();
                this.addVertexAttribute('normals', normalsAttr);
            }
        }
        if (flags & (1 << 2)) {
            texCoordsAttr = this.getVertexAttribute('texCoords');
            if (!texCoordsAttr) {
                texCoordsAttr = new Vec2Attribute();
                this.addVertexAttribute('texCoords', texCoordsAttr);
            }
        }
        const parse8BitPositionsArray = (range, offset, sclVec, positions_8bit) => {
            for (let i = range[0]; i < range[1]; i++) {
                const pos = new Vec3(positions_8bit[i * 3 + 0] / 255.0, positions_8bit[i * 3 + 1] / 255.0, positions_8bit[i * 3 + 2] / 255.0);
                pos.multiplyInPlace(sclVec);
                pos.addInPlace(offset);
                if (positionsAttr)
                    positionsAttr.setValue(i, pos);
            }
        };
        const parse8BitNormalsArray = (range, offset, sclVec, normals_8bit) => {
            if (sclVec.isNull())
                sclVec.set(1, 1, 1);
            for (let i = range[0]; i < range[1]; i++) {
                const normal = new Vec3(normals_8bit[i * 3 + 0] / 255.0, normals_8bit[i * 3 + 1] / 255.0, normals_8bit[i * 3 + 2] / 255.0);
                normal.multiplyInPlace(sclVec);
                normal.addInPlace(offset);
                normal.normalizeInPlace();
                normalsAttr.setValue(i, normal);
            }
        };
        const parse8BitTextureCoordsArray = (range, offset, sclVec, texCoords_8bit) => {
            // if (sclVec.isNull())
            //     sclVec.set(1, 1, 1);
            for (let i = range[0]; i < range[1]; i++) {
                const textureCoord = new Vec2(texCoords_8bit[i * 2 + 0] / 255.0, texCoords_8bit[i * 2 + 1] / 255.0);
                textureCoord.multiplyInPlace(sclVec);
                textureCoord.addInPlace(offset);
                texCoordsAttr.setValue(i, textureCoord);
            }
        };
        const numClusters = reader.loadUInt32();
        if (numClusters == 1) {
            {
                const box3 = this.__boundingBox;
                const positions_8bit = reader.loadUInt8Array(numVerts * 3);
                parse8BitPositionsArray([0, numVerts], box3.p0, box3.diagonal(), positions_8bit);
            }
            if (normalsAttr) {
                const box3 = new Box3(reader.loadFloat32Vec3(), reader.loadFloat32Vec3());
                const normals_8bit = reader.loadUInt8Array(numVerts * 3);
                parse8BitNormalsArray([0, numVerts], box3.p0, box3.diagonal(), normals_8bit);
                normalsAttr.loadSplitValues(reader);
            }
            if (texCoordsAttr) {
                const box2 = new Box2(reader.loadFloat32Vec2(), reader.loadFloat32Vec2());
                const texCoords_8bit = reader.loadUInt8Array(numVerts * 2);
                parse8BitTextureCoordsArray([0, numVerts], box2.p0, box2.diagonal(), texCoords_8bit);
                texCoordsAttr.loadSplitValues(reader);
            }
        }
        else {
            const clusters = [];
            let offset = 0;
            for (let i = 0; i < numClusters; i++) {
                const count = reader.loadUInt32();
                const clusterData = {
                    range: [offset, offset + count],
                    bbox: new Box3(reader.loadFloat32Vec3(), reader.loadFloat32Vec3()),
                    normalsRange: new Box3(),
                    texCoordsRange: new Box2(),
                };
                if (normalsAttr) {
                    clusterData.normalsRange.set(reader.loadFloat32Vec3(), reader.loadFloat32Vec3());
                }
                if (texCoordsAttr) {
                    clusterData.texCoordsRange.set(reader.loadFloat32Vec2(), reader.loadFloat32Vec2());
                }
                clusters.push(clusterData);
                offset += count;
            }
            const positions_8bit = reader.loadUInt8Array(numVerts * 3);
            let normals_8bit = null;
            let texCoords_8bit = null;
            if (normalsAttr) {
                normals_8bit = reader.loadUInt8Array(numVerts * 3);
            }
            if (texCoordsAttr) {
                texCoords_8bit = reader.loadUInt8Array(numVerts * 2);
            }
            for (let i = 0; i < numClusters; i++) {
                {
                    const box3 = clusters[i].bbox;
                    parse8BitPositionsArray(clusters[i].range, box3.p0, box3.diagonal(), positions_8bit);
                }
                if (normalsAttr) {
                    const box3 = clusters[i].normalsRange;
                    parse8BitNormalsArray(clusters[i].range, box3.p0, box3.diagonal(), normals_8bit);
                }
                if (texCoordsAttr) {
                    const box2 = clusters[i].texCoordsRange;
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
    /**
     * The toJSON method encodes this type as a json object for persistence.
     *
     * @param context - The context value.
     * @return - Returns the json object.
     */
    toJSON(context) {
        const json = super.toJSON(context);
        if (!context || !context.skipTopology) {
            json.numVertices = this.__numVertices || 0;
        }
        const vertexAttributes = {};
        for (const [key, attr] of this.__vertexAttributes.entries()) {
            if (!context || !('skipAttributes' in context) || !context.skipAttributes.includes(key))
                vertexAttributes[key] = attr.toJSON(context);
        }
        json.vertexAttributes = vertexAttributes;
        return json;
    }
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @param json - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(json, context) {
        this.clear();
        super.fromJSON(json, context);
        this.setNumVertices(json.numVertices);
        for (const name in json.vertexAttributes) {
            let attr = this.__vertexAttributes.get(name);
            const attrJSON = json.vertexAttributes[name];
            if (!attr) {
                // switch(attrJSON.dataType) {
                //   case 'Vec3' attr = new Vec3Attribute( attrJSON.defaultScalarValue)
                // }
                // const dataType = Registry.getClassDefinition(attrJSON.dataType)
                // attr = new VertexAttribute(this, dataType, 0, attrJSON.defaultScalarValue)
                // if (attr) this.__vertexAttributes.set(name, attr)
            }
            if (attr) {
                attr.fromJSON(attrJSON);
            }
            else {
                console.warn('attr undefined, cannot execute fromJSON()');
            }
        }
        this.emit('geomDataTopologyChanged');
    }
    /**
     * Returns geometry data value in json format.
     *
     * @return - The return value.
     */
    toString() {
        return JSON.stringify(this.toJSON(), null, 2);
    }
}
export { BaseGeom };
//# sourceMappingURL=BaseGeom.js.map