import { GLGeom } from './GLGeom'
import '../../SceneTree/Geometry/Mesh'
import { ColorRenderState, RenderState } from '../RenderStates/index'
import { GeomType } from '../types/renderer'
import { WebGL12RenderingContext } from '../types/webgl'
import { genDataTypeDesc } from './GeomShaderBinding'
import { CompoundGeom } from '../../SceneTree'
import { GeomBuffers } from '../../SceneTree/types/scene'

interface DrawSubGeom {
  geomType: GeomType
  offsets: Int32Array
  counts: Int32Array
  materialIds: Uint8Array
}

/** Class representing a GL mesh.
 * @extends GLGeom
 * @private
 */
class GLCompoundGeom extends GLGeom {
  protected indexDataType: number = 0
  protected drawCounts: Record<number, DrawSubGeom> = {}

  /**
   * Create a GL mesh.
   * @param gl - The webgl rendering context.
   * @param compoundGeom - The CompoundGeom value.
   */
  constructor(gl: WebGL12RenderingContext, compoundGeom: CompoundGeom) {
    //@ts-ignore.
    super(gl, compoundGeom)
  }

  // /////////////////////////////////////
  // Buffers

  /**
   * The genBuffers method.
   */
  genBuffers(renderstate: RenderState): void {
    super.genBuffers(renderstate)

    const gl = this.__gl

    const geomBuffers = this.geom.genBuffers()

    const indices = geomBuffers.indices
    let elementSize = 0
    if (indices instanceof Uint8Array) {
      this.indexDataType = this.__gl.UNSIGNED_BYTE
      elementSize = 1
    }
    if (indices instanceof Uint16Array) {
      this.indexDataType = this.__gl.UNSIGNED_SHORT
      elementSize = 2
    }
    if (indices instanceof Uint32Array) {
      this.indexDataType = this.__gl.UNSIGNED_INT
      elementSize = 4
    }

    this.numVertices = this.geom.getNumVertices()

    if (this.__indexBuffer) {
      gl.deleteBuffer(this.__indexBuffer)
    }

    this.__indexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.__indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geomBuffers.indices, gl.STATIC_DRAW)

    // eslint-disable-next-line guard-for-in
    for (const attrName in geomBuffers.attrBuffers) {
      const attrData = geomBuffers.attrBuffers[attrName]
      const attrDesc = genDataTypeDesc(gl, attrData.dataType)

      if (this.__glattrbuffers[attrName] && this.__glattrbuffers[attrName].buffer) {
        gl.deleteBuffer(this.__glattrbuffers[attrName].buffer)
      }

      const attrBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, attrBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, attrData.values, gl.STATIC_DRAW)

      this.__glattrbuffers[attrName] = {
        dataType: attrDesc.dataType,
        name: attrName,
        dimension: attrData.dimension,
        elementSize: attrDesc.elementSize,
        normalized: false,
        shared: false,
        numValues: attrData.count,
        buffer: attrBuffer,
      }

      if (attrName == 'textureCoords') this.__glattrbuffers['texCoords'] = this.__glattrbuffers['textureCoords']
    }

    this.updateDrawIds(renderstate, geomBuffers, elementSize)

    this.buffersDirty = false
  }

  updateDrawIds(renderstate: RenderState, geomBuffers: GeomBuffers, elementSize: number): void {
    const materials = geomBuffers.materials

    const getMaterialAddr = (materialId: number) => {
      if (materials.length > 0 && materialId >= 0) {
        const material = geomBuffers.materials[materialId]
        renderstate.renderer.glMaterialLibrary.addMaterial(material)
        const materialAddr = renderstate.renderer.glMaterialLibrary.getMaterialAllocation(material)
        return materialAddr.start
      } else {
        return 0
      }
    }
    const shattered = false
    if (shattered) {
      for (let key in geomBuffers.subGeomCounts) {
        if (geomBuffers.subGeomCounts[key].length > 0) {
          const drawSubGeom: DrawSubGeom = {
            geomType: GeomType[key],
            offsets: Int32Array.from(geomBuffers.subGeomOffsets[key].map((value) => value * elementSize)),
            counts: Int32Array.from(geomBuffers.subGeomCounts[key]),
            materialIds: Uint8Array.from(
              geomBuffers.subGeomMaterialIndices.map((subGeomMaterialIndex: number) => {
                const materialId = subGeomMaterialIndex - 1
                return getMaterialAddr(materialId)
              })
            ),
          }
          this.drawCounts[key] = drawSubGeom
        }
      }
    } else {
      if (geomBuffers.materialSubGeoms && false) {
        for (let key in geomBuffers.materialSubGeoms) {
          if (geomBuffers.materialSubGeoms[key].length > 0) {
            const subGeoms = geomBuffers.materialSubGeoms[key]
            const drawSubGeom: DrawSubGeom = {
              geomType: GeomType[key],
              offsets: new Int32Array(subGeoms.length),
              counts: new Int32Array(subGeoms.length),
              materialIds: new Uint8Array(subGeoms.length),
            }
            for (let i = 0; i < subGeoms.length; i++) {
              drawSubGeom.offsets[i] = subGeoms[i].offset * elementSize
              drawSubGeom.counts[i] = subGeoms[i].count
              drawSubGeom.materialIds[i] = getMaterialAddr(subGeoms[i].materialId)
            }
            this.drawCounts[key] = drawSubGeom
          }
        }
      } else {
        for (let key in geomBuffers.counts) {
          if (geomBuffers.counts[key] > 0) {
            const drawSubGeom: DrawSubGeom = {
              geomType: GeomType[key],
              offsets: new Int32Array([geomBuffers.offsets[key] * elementSize]),
              counts: new Int32Array([geomBuffers.counts[key]]),
              materialIds: new Uint8Array(geomBuffers.counts.length),
            }
            this.drawCounts[key] = drawSubGeom
          }
        }
      }
    }
  }

  /**
   * The updateBuffers method.
   * @param opts - The options object.
   */
  updateBuffers(renderstate: RenderState): void {
    const gl = this.__gl

    if (this.numVertices != this.geom.getNumVertices()) {
      this.genBuffers(renderstate)
      return
    }

    const geomBuffers = this.geom.genBuffers({ includeIndices: false })
    // eslint-disable-next-line guard-for-in
    for (const attrName in geomBuffers.attrBuffers) {
      const attrData = geomBuffers.attrBuffers[attrName]
      const glattr = this.__glattrbuffers[attrName]
      gl.bindBuffer(gl.ARRAY_BUFFER, glattr.buffer)
      gl.bufferData(gl.ARRAY_BUFFER, attrData.values, gl.STATIC_DRAW)
    }

    let elementSize = 0
    if (this.indexDataType == this.__gl.UNSIGNED_BYTE) elementSize = 1
    if (this.indexDataType == this.__gl.UNSIGNED_SHORT) elementSize = 2
    if (this.indexDataType == this.__gl.UNSIGNED_INT) elementSize = 4

    this.updateDrawIds(renderstate, geomBuffers, elementSize)

    this.buffersDirty = false
  }

  /**
   * The clearBuffers method.
   */
  clearBuffers(): void {
    const gl = this.__gl
    gl.deleteBuffer(this.__indexBuffer)
    this.__indexBuffer = null

    super.clearBuffers()
  }

  // ////////////////////////////////
  // Regular Drawing.

  /**
   * Draw an item to screen.
   * @param renderstate - The object tracking the current state of the renderer
   */
  draw(renderstate: RenderState): void {
    this.drawInstanced(renderstate, 1)
  }

  /**
   * The drawInstanced method.
   * @param renderstate - The object tracking the current state of the renderer
   * @param instanceCount - The instanceCount value.
   */
  drawInstanced(renderstate: RenderState, instanceCount: number): void {
    renderstate.pushGLStack()

    const blendPointsAndLines = true

    const gl = this.__gl

    const { drawIds, geomType, outlineThickness, viewportSize, occluded } = renderstate.unifs

    let renderModeValue: string | null = null
    let drawingOutlines: boolean = false
    let drawingHiddenLines: boolean = false
    if (renderstate instanceof ColorRenderState) {
      renderModeValue = renderstate.renderMode

      const drawEdges =
        renderModeValue != 'flat-noedges' && renderModeValue != 'shaded-noedges' && renderModeValue != 'pbr-noedges'

      drawingOutlines =
        outlineThickness &&
        viewportSize &&
        renderstate.outlineMethod == 'geometry' &&
        renderstate.outlineThickness > 0 &&
        drawEdges

      // Note: multiple different rendermodes could potentially draw hidden line.
      drawingHiddenLines = renderModeValue == 'hiddenline' && occluded != null
    }

    if (this.drawCounts['TRIANGLES']) {
      if (geomType) gl.uniform1i(geomType.location, GeomType.TRIANGLES)

      if (renderModeValue == 'hiddenline') {
        // don't render surfaces
        gl.colorMask(false, false, false, false)
      }
      // Always zero this value before drawing the faces, else the shader could think its drawing the outline.
      if (outlineThickness) {
        gl.uniform1f(outlineThickness.location, 0)
      }

      const draw: DrawSubGeom = this.drawCounts['TRIANGLES']
      const instCounts = draw.counts.map(() => instanceCount)

      if (!gl.multiDrawElementsInstanced) {
        for (let i = 0; i < draw.counts.length; i++) {
          if (drawIds) {
            gl.uniform2i(drawIds.location, i, draw.materialIds[i])
          }
          this.__gl.drawElementsInstanced(
            gl.TRIANGLES,
            draw.counts[i],
            this.indexDataType,
            draw.offsets[i],
            instanceCount
          )
        }
      } else {
        gl.multiDrawElementsInstanced(
          gl.TRIANGLES,
          draw.counts,
          0,
          this.indexDataType,
          draw.offsets,
          0,
          instCounts,
          0,
          draw.counts.length
        )
      }

      if (drawingOutlines) {
        // Only draw font faces. BEcause all faces are drawn, it can make a mess to see the back faces through the front faces.
        // e.g. we might see the triangles on the other side of a sphere rendered over the top of triangles on the near side.
        renderstate.pushGLStack()
        renderstate.glEnable(gl.CULL_FACE)
        gl.cullFace(gl.FRONT)
        // @ts-ignore
        gl.uniform1f(outlineThickness.location, renderstate.outlineThickness * window.devicePixelRatio)
        gl.uniform2f(
          viewportSize.location,
          renderstate.region[2] - renderstate.region[0],
          renderstate.region[3] - renderstate.region[1]
        )
        if (renderModeValue == 'hiddenline') {
          // start rendering surfaces again
          gl.colorMask(true, true, true, true)
        }

        if (!gl.multiDrawElementsInstanced) {
          for (let i = 0; i < draw.counts.length; i++) {
            if (drawIds) {
              gl.uniform2i(drawIds.location, i, draw.materialIds[i])
            }
            this.__gl.drawElementsInstanced(
              gl.TRIANGLES,
              draw.counts[i],
              this.indexDataType,
              draw.offsets[i],
              instanceCount
            )
          }
        } else {
          gl.multiDrawElementsInstanced(
            gl.TRIANGLES,
            draw.counts,
            0,
            this.indexDataType,
            draw.offsets,
            0,
            instCounts,
            0,
            draw.counts.length
          )
        }

        renderstate.popGLStack()
        gl.cullFace(gl.BACK)
      }
    }

    if (renderstate instanceof ColorRenderState && blendPointsAndLines) {
      renderstate.glEnable(gl.BLEND)
      gl.blendEquation(gl.FUNC_ADD)
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    }

    if (this.drawCounts['LINES']) {
      if (geomType) gl.uniform1i(geomType.location, GeomType.LINES)

      const draw: DrawSubGeom = this.drawCounts['LINES']
      const instCounts = draw.counts.map(() => instanceCount)

      if (!gl.multiDrawElementsInstanced) {
        for (let i = 0; i < draw.counts.length; i++) {
          if (drawIds) {
            gl.uniform2i(drawIds.location, i, draw.materialIds[i])
          }
          gl.drawElementsInstanced(gl.LINES, draw.counts[i], this.indexDataType, draw.offsets[i], instanceCount)
        }
      } else {
        gl.multiDrawElementsInstanced(
          gl.LINES,
          draw.counts,
          0,
          this.indexDataType,
          draw.offsets,
          0,
          instCounts,
          0,
          draw.counts.length
        )
      }

      if (drawingHiddenLines) {
        const { hiddenLineColor } = renderstate.unifs
        gl.uniform1i(occluded.location, 1)
        // @ts-ignore
        gl.uniform4fv(hiddenLineColor.location, renderstate.hiddenLineColor.asArray())
        gl.depthFunc(gl.GREATER)
        gl.depthMask(false)

        if (!gl.multiDrawElementsInstanced) {
          for (let i = 0; i < draw.counts.length; i++) {
            if (drawIds) {
              gl.uniform2i(drawIds.location, i, draw.materialIds[i])
            }
            gl.drawElementsInstanced(gl.LINES, draw.counts[i], this.indexDataType, draw.offsets[i], instanceCount)
          }
        } else {
          gl.multiDrawElementsInstanced(
            gl.LINES,
            draw.counts,
            0,
            this.indexDataType,
            draw.offsets,
            0,
            instCounts,
            0,
            draw.counts.length
          )
        }

        // Restore defaults.
        gl.depthFunc(gl.LEQUAL)
        gl.depthMask(true)
        gl.uniform1i(occluded.location, 0)
      }
    }

    if (this.drawCounts['POINTS']) {
      if (geomType) gl.uniform1i(geomType.location, GeomType.POINTS)

      const draw: DrawSubGeom = this.drawCounts['POINTS']
      const instCounts = draw.counts.map(() => instanceCount)

      if (false) {
        for (let i = 0; i < draw.counts.length; i++) {
          if (drawIds) {
            gl.uniform2i(drawIds.location, i, draw.materialIds[i])
          }
          this.__gl.drawElementsInstanced(gl.POINTS, draw.counts[i], this.indexDataType, draw.offsets[i], instanceCount)
        }
      } else {
        gl.multiDrawElementsInstanced(
          gl.POINTS,
          draw.counts,
          0,
          this.indexDataType,
          draw.offsets,
          0,
          instCounts,
          0,
          draw.counts.length
        )
      }

      if (drawingHiddenLines) {
        const { hiddenLineColor } = renderstate.unifs
        gl.uniform1i(occluded.location, 1)
        // @ts-ignore
        gl.uniform4fv(hiddenLineColor.location, renderstate.hiddenLineColor.asArray())
        gl.depthFunc(gl.GREATER)
        gl.depthMask(false)

        gl.multiDrawElementsInstanced(
          gl.POINTS,
          draw.counts,
          0,
          this.indexDataType,
          draw.offsets,
          0,
          instCounts,
          0,
          draw.counts.length
        )

        gl.depthFunc(gl.LEQUAL)
        gl.depthMask(true)
        gl.uniform1i(occluded.location, 0)
      }
    }

    renderstate.popGLStack()
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy(): void {
    super.destroy()
    const gl = this.__gl
    gl.deleteBuffer(this.__indexBuffer)
    this.__indexBuffer = null
    // if (this.__wireframesVao)
    //     gl.deleteVertexArray(this.__wireframesVao);
    // if (this.__hardEdgesVao)
    //     gl.deleteVertexArray(this.__hardEdgesVao);
  }
}

export { GLCompoundGeom }
