import {
  Vec3
} from '../Math/Vec3';
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

    this.fatLines = (lines.lineThickness > 0 || this.__geom.getVertexAttributes().lineThickness != undefined) && gl.floatTexturesSupported;
    this.genBuffers();
  }


  renderableInstanced(){
    return !this.fatLines;
  }

  genBuffers() {
    super.genBuffers();


    const gl = this.__gl;
    const geomBuffers = this.__geom.genBuffers();
    const indices = geomBuffers.indices;

    if (this.fatLines) {

      if (!gl.__quadVertexIdsBuffer) {
        gl.setupInstancedQuad();
      }
      this.__glattrbuffers.vertexIDs = gl.__quadattrbuffers.vertexIDs;

      this.__drawCount = indices.length / 2;

      const vertexAttributes = this.__geom.getVertexAttributes();
      const positions = vertexAttributes.positions;
      const lineThicknessAttr = vertexAttributes.lineThickness;

      const stride = 4; // The number of floats per draw item.
      const dataArray = new Float32Array(positions.length * stride);
      for (let i = 0; i < positions.length; i++) {
        const pos = Vec3.createFromFloat32Buffer(dataArray.buffer, i * 4);
        pos.setFromOther(positions.getValueRef(i));

        // The thickness of the line.
        if (lineThicknessAttr)
          dataArray[(i * 4) + 3] = lineThicknessAttr.getFloat32Value(i);
        else
          dataArray[(i * 4) + 3] = this.__geom.lineThickness;
      }
      this.__positionsTexture = new GLTexture2D(gl, {
        format: 'RGBA',
        type: 'FLOAT',
        width: positions.length,
        /*each pixel has 4 floats*/
        height: 1,
        filter: 'NEAREST',
        wrap: 'CLAMP_TO_EDGE',
        data: dataArray,
        mipMapped: false
      });

      const indexArray = new Float32Array(indices.length);
      for (let i = 0; i < indices.length; i++) {
        let seqentialIndex;
        if (i % 2 == 0){
          seqentialIndex = (i > 0) ? (indices[i] == indices[i - 1]) : (indices[i] == indices[indices.length - 1]);
        }
        else{
          seqentialIndex = (i < indices.length - 1) ? (indices[i] == indices[i + 1]) : (indices[i] == indices[0]);;
        }
        // encode the flag into the indices values.
        // this flag is decoded in GLSL.
        indexArray[i] = (seqentialIndex ? 1 : 0) + (indices[i] * 2);
      }
      const indexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, indexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, indexArray, gl.STATIC_DRAW);

      this.__glattrbuffers.segmentIndices = {
        buffer: indexBuffer,
        instanced: true,
        dimension: 2
      }


    } else {

      this.__indexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.__indexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

      for (let attrName in geomBuffers.attrBuffers) {
        const attrData = geomBuffers.attrBuffers[attrName];

        const attrBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, attrBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, attrData.values, gl.STATIC_DRAW);

        this.__glattrbuffers[attrName] = {
          buffer: attrBuffer,
          dimension: attrData.dimension
        };
      }

      // Cache the size so we know later if it changed (see below)
      this.__numSegIndices = indices.length;
      this.__numVertices = geomBuffers.numVertices;
    }

    if(indices instanceof Uint8Array)
      this.__indexDataType = this.__gl.UNSIGNED_BYTE;
    if(indices instanceof Uint16Array)
      this.__indexDataType = this.__gl.UNSIGNED_SHORT;
    if(indices instanceof Uint32Array)
      this.__indexDataType = this.__gl.UNSIGNED_INT;
  }

  updateBuffers(opts) {
    const gl = this.__gl;
    const geomBuffers = this.__geom.genBuffers();
    const indices = geomBuffers.indices;

    if (this.fatLines) {

      this.__drawCount = indices.length / 2; // every pair of verts draws a quad.

      const vertexAttributes = this.__geom.getVertexAttributes();

      const positions = vertexAttributes.positions;
      const lineThicknessAttr = vertexAttributes.lineThickness;

      const stride = 4; // The number of floats per draw item.
      const dataArray = new Float32Array(positions.length * stride);
      for (let i = 0; i < positions.length; i++) {
        const pos = Vec3.createFromFloat32Buffer(dataArray.buffer, i * 4);
        pos.setFromOther(positions.getValueRef(i));

        // The thickness of the line.
        if (lineThicknessAttr)
          dataArray[(i * 4) + 3] = lineThicknessAttr.getFloat32Value(i);
        else
          dataArray[(i * 4) + 3] = this.__geom.lineThickness;
      }

      this.__positionsTexture.bufferData(dataArray, positions.length, 1);

      const indexArray = new Float32Array(indices.length);
      for (let i = 0; i < indices.length; i++) {
        let seqentialIndex;
        if (i % 2 == 0)
          seqentialIndex = (i > 0) && (indices[i] == indices[i - 1]);
        else
          seqentialIndex = (i < indices.length - 1) && (indices[i] == indices[i + 1]);
        indexArray[i] = (seqentialIndex ? 1 : 0) + (indices[i] * 2);
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, this.__glattrbuffers.segmentIndices.buffer);
      gl.bufferData(gl.ARRAY_BUFFER, indexArray, gl.STATIC_DRAW);

    } else {

      const vertexAttributes = this.__geom.getVertexAttributes();

      if (opts && opts.indicesChanged) {
        const indices = this.__geom.getIndices();
        if (this.__numSegIndices != indices.length) {
          gl.deleteBuffer(this.__indexBuffer);
          this.__indexBuffer = gl.createBuffer();
        }
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.__indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
        this.__numSegIndices = indices.length;
      }

      // Update the vertex attribute buffers
      const numVertsChanged = geomBuffers.numVertices != this.__numVertices;
      for (let attrName in geomBuffers.attrBuffers) {
        const attrData = geomBuffers.attrBuffers[attrName];
        const glattr = this.__glattrbuffers[attrName];
        if (numVertsChanged) {
          gl.deleteBuffer(glattr.buffer);
          glattr.buffer = gl.createBuffer();
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, glattr.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, attrData.values, gl.STATIC_DRAW);
      }

      // Cache the size so we know later if it changed (see below)
      this.__numVertices = geomBuffers.numVertices;
      this.__numSegIndices = indices.length;
    }

    if(indices instanceof Uint8Array)
      this.__indexDataType = this.__gl.UNSIGNED_BYTE;
    if(indices instanceof Uint16Array)
      this.__indexDataType = this.__gl.UNSIGNED_SHORT;
    if(indices instanceof Uint32Array)
      this.__indexDataType = this.__gl.UNSIGNED_INT;
  }

  bind(renderstate, extrAttrBuffers, transformIds) {

    if (this.fatLines && 'LineThickness' in renderstate.unifs) { // TODO: Provide a geomdata shader for thick lines.

      const gl = this.__gl;

      let shaderBinding = this.__shaderBindings[renderstate.shaderkey];
      if (!shaderBinding) {
        shaderBinding = generateShaderGeomBinding(gl, renderstate.attrs, this.__glattrbuffers, gl.__quadIndexBuffer, extrAttrBuffers, transformIds);
        this.__shaderBindings[renderstate.shaderkey] = shaderBinding;
      }
      shaderBinding.bind(renderstate);

      const usePositionsTexture = true;
      if (usePositionsTexture) {
        const unifs = renderstate.unifs;
        if (unifs.positionsTexture) {
          this.__positionsTexture.bindToUniform(renderstate, unifs.positionsTexture);
          gl.uniform1i(unifs.positionsTextureSize.location, this.__positionsTexture.width);
        }
      }

      const unifs = renderstate.unifs;
      gl.uniform1f(unifs.LineThickness.location, (this.__geom.lineThickness ? this.__geom.lineThickness : 1.0)  * renderstate.viewScale);
      return true;
    } else {
      return super.bind(renderstate, extrAttrBuffers, transformIds);
    }
  }


  //////////////////////////////////
  // Drawing Lines Points.

  drawPoints() {
    this.__gl.drawArrays(this.__gl.POINTS, 0, this.__geom.numVertices());
  }

  //////////////////////////////////
  // Regular Drawing.

  draw(renderstate) {
    const gl = this.__gl;
    if (this.fatLines) {
      if(renderstate.unifs.LineThickness)
        gl.drawElementsInstanced(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0, this.__drawCount);

      // Note: We don't have a solution for drawing fat lines to the geom data buffer.
    } else {
      gl.drawElements(this.__gl.LINES, this.__numSegIndices, this.__indexDataType, 0);
    }
  }

  drawInstanced(instanceCount) {
    this.__gl.drawElementsInstanced(this.__gl.LINES, this.__numSegIndices, this.__indexDataType, 0, instanceCount);
  }


};

export {
  GLLines
};
// export default GLLines;