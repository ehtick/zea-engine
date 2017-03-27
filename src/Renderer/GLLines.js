import {
    Vec3
} from '../Math';
import {
    GLGeom
} from './GLGeom.js';

import {
    generateShaderGeomBinding
} from './GeomShaderBinding.js';

import {
    GLTexture2D
} from './GLTexture2D.js';

class GLLines extends GLGeom {
    constructor(gl, lines) {
        super(gl, lines);


        this.fatLines = lines.lineThickness > 0;
        this.genBuffers();
    }

    genBuffers() {
        super.genBuffers();

        ///////////////////
        let gl = this.__gl;

        if (this.fatLines) {

            if (!gl.__quadVertexIdsBuffer) {
                gl.setupInstancedQuad();
            }
            this.__glattrbuffers.vertexIDs = gl.__quadattrbuffers.vertexIDs;

            let indices = this.__geom.getIndices();
            this.__drawCount = indices.length / 2;

            let vertexAttributes = this.__geom.getVertexAttributes();

            let positions = vertexAttributes.positions;
            let lineThickness = vertexAttributes.lineThickness;

            let stride = 4; // The number of floats per draw item.
            let size = positions.length * stride; // each 
            let dataArray = new Float32Array(size);
            for (let i = 0; i < positions.length; i++) {
                let pos = Vec3.createFromFloat32Buffer(dataArray.buffer, i * 4);
                pos.setFromOther(positions.getValueRef(i));

                // The thickness of the line.
                if(lineThickness)
                    dataArray[(i * 4) + 3] = lineThickness.getFloat32Value(i); 
                else
                    dataArray[(i * 4) + 3] = 1.0;
            }
            this.__positionsTexture = new GLTexture2D(gl, {
                channels: 'RGBA',
                format: 'FLOAT',
                width: size / 4,
                /*each pixel has 4 floats*/
                height: 1,
                filter: 'NEAREST',
                wrap: 'CLAMP_TO_EDGE',
                data: dataArray,
                mipMapped: false
            });

            let indexArray = new Float32Array(indices.length);
            for (let i = 0; i < indices.length; i++){
                let seqentialIndex;
                if(i % 2 == 0)
                    seqentialIndex = (i > 0) && (indices[i] == indices[i-1]);
                else
                    seqentialIndex = (i < indices.length-1) && (indices[i] == indices[i+1]);
                indexArray[i] = (seqentialIndex ? 1 : 0) + indices[i] * 2.0;
            }
            let indexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, indexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, indexArray, gl.STATIC_DRAW);

            this.__glattrbuffers.segmentIndices = {
                buffer: indexBuffer,
                instanced: true,
                dimension: 2,
                count: indices.length / 2
            }


        } else {

            let vertexAttributes = this.__geom.getVertexAttributes();

            let indices = this.__geom.getIndices();
            this.__numSegIndices = indices.length;

            let gl = this.__gl;
            this.__indexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.__indexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

            this.__indexBuffer.size = indices.length;

            let attribIndexOffset = 1;
            for (let attrName in vertexAttributes) {
                let attr = vertexAttributes[attrName];
                let data = attr.data;
                let dimension = attr.numFloat32Elements;

                let attrBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, attrBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

                this.__glattrbuffers[attrName] = {
                    buffer: attrBuffer,
                    dimension: dimension
                };

                this.__glattrbuffers[attrName].size = data.length;
            }
        }

    }

    updateBuffers(opts) {
        let gl = this.__gl;
        if (this.fatLines) {

            let indices = this.__geom.getIndices();
            this.__drawCount = indices.length / 2;

            let vertexAttributes = this.__geom.getVertexAttributes();

            let positions = vertexAttributes.positions;
            let lineThickness = vertexAttributes.lineThickness;

            let stride = 4; // The number of floats per draw item.
            let size = positions.length * stride; // each 
            let dataArray = new Float32Array(size);
            for (let i = 0; i < positions.length; i++) {
                let pos = Vec3.createFromFloat32Buffer(dataArray.buffer, i * 4);
                pos.setFromOther(positions.getValueRef(i));

                // The thickness of the line.
                if(lineThickness)
                    dataArray[(i * 4) + 3] = lineThickness.getFloat32Value(i); 
                else
                    dataArray[(i * 4) + 3] = 1.0;
            }
            this.__positionsTexture.resize(size / 4, 1, dataArray);

            let indexArray = new Float32Array(indices.length);
            for (let i = 0; i < indices.length; i++)
                indexArray[i] = indices[i];
            gl.bindBuffer(gl.ARRAY_BUFFER, this.__glattrbuffers.segmentIndices.buffer);
            gl.bufferData(gl.ARRAY_BUFFER, indexArray, gl.STATIC_DRAW);
            

        } else {

            let vertexAttributes = this.__geom.getVertexAttributes();

            if (opts.indicesChanged) {
                let indices = this.__geom.getIndices();
                if(this.__indexBuffer.size != indices.length){
                    gl.deleteBuffer(this.__indexBuffer);
                    this.__indexBuffer = gl.createBuffer();
                }
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.__indexBuffer);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
                this.__indexBuffer.size = indices.length;
                this.__numSegIndices = indices.length;
            }

            // Update the vertex attribute buffers
            for (let attrName in vertexAttributes) {
                let attr = vertexAttributes[attrName];
                let glattr = this.__glattrbuffers[attrName];
                if(glattr.size != attr.data.length){
                    gl.deleteBuffer(glattr.buffer);
                    glattr.buffer = gl.createBuffer();
                }

                gl.bindBuffer(gl.ARRAY_BUFFER, glattr.buffer);
                gl.bufferData(gl.ARRAY_BUFFER, attr.data, gl.STATIC_DRAW);
                glattr.size = attr.data.length;
            }
        }
    }

    bind(renderstate, extrAttrBuffers, transformIds) {

        if (this.fatLines && '_lineThickness' in renderstate.unifs) { // TODO: Provide a geomdata shader for thick lines.

            let gl = this.__gl;

            let shaderBinding = this.__shaderBindings[renderstate.shaderkey];
            if (!shaderBinding) {
                shaderBinding = generateShaderGeomBinding(gl, renderstate.attrs, this.__glattrbuffers, gl.__quadIndexBuffer, extrAttrBuffers, transformIds);
                this.__shaderBindings[renderstate.shaderkey] = shaderBinding;
            }
            shaderBinding.bind(renderstate);

            let usePositionsTexture = true;
            if (usePositionsTexture) {
                let unifs = renderstate.unifs;
                if(unifs.positionsTexture){
                    this.__positionsTexture.bind(renderstate, unifs.positionsTexture.location);
                    gl.uniform1i(unifs.positionsTextureSize.location, this.__positionsTexture.width);
                }
            }

            let unifs = renderstate.unifs;
            gl.uniform1f(unifs._lineThickness.location, this.__geom.lineThickness * renderstate.viewScale);
            return true;
        } else {
            return super.bind(renderstate, transformIds);
        }
    }


    //////////////////////////////////
    // Drawing Lines Points.

    drawPoints() {
        this.__gl.drawArrays(this.__gl.POINTS, 0, this.__geom.numVertices());
    }

    //////////////////////////////////
    // Regular Drawing.

    draw() {
        let gl = this.__gl;
        if (this.fatLines) {
            gl.__ext_Inst.drawElementsInstancedANGLE(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0, this.__drawCount);
        } else{
            this.__gl.drawElements(this.__gl.LINES, this.__numSegIndices, this.__gl.UNSIGNED_INT, 0);
        }
    }
};

export {
    GLLines
};