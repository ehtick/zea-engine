import { Vec3 } from '../../Math/Vec3'
import '../../SceneTree/GeomItem'

import { EventEmitter, MathFunctions, Allocator1D } from '../../Utilities/index'
import { GLBaseRenderer } from '../GLBaseRenderer'
import { GLTexture2D } from '../GLTexture2D'
import { GLGeomItem } from './GLGeomItem'

/** This class abstracts the rendering of a collection of geometries to screen.
 * @extends EventEmitter
 * @private
 */
class GLGeomItemSetMultiDrawCompoundGeom extends EventEmitter {
  protected renderer: GLBaseRenderer
  protected gl: WebGL12RenderingContext
  protected glGeomItems: Array<GLGeomItem | null> = []
  protected glGeomIdsMapping: Record<string, any> = {}
  protected glgeomItemEventHandlers: any[] = []
  protected freeIndices: number[] = []
  protected visibleItems: GLGeomItem[] = []
  protected dirtyGeomItems: Set<number> = new Set()
  protected drawIdsBufferDirty: boolean = true
  protected highlightedItems: GLGeomItem[] = []

  protected drawCounts: Record<string, number> = {}
  protected allocators: Record<string, Allocator1D> = {}
  // protected totalDrawItemsByElementType: Record<string, number> = {}
  protected glGeomItems_drawItemsCounts: Array<Record<string, number>> = []
  protected drawIdsArrays: Record<string, Float32Array> = {}
  protected drawIdsTextures: Record<string, GLTexture2D> = {}
  protected drawElementCounts: Record<string, Int32Array> = {}
  protected drawElementOffsets: Record<string, Int32Array> = {}
  protected drawElementCounts_Lines: Int32Array = new Int32Array(0)
  protected drawElementOffsets_Lines: Int32Array = new Int32Array(0)
  protected drawElementCounts_Meshes: Int32Array = new Int32Array(0)
  protected drawElementOffsets_Meshes: Int32Array = new Int32Array(0)

  protected highlightedDrawCounts: Record<string, number> = {}
  protected highlightElementCounts: Int32Array = new Int32Array(0)
  protected highlightElementOffsets: Int32Array = new Int32Array(0)
  protected highlightedIdsArray?: null | Float32Array = null
  protected highlightedIdsTexture: GLTexture2D | null = null
  protected highlightedIdsBufferDirty: boolean = true

  /**
   * Create a GL geom item set.
   * @param {GLBaseRenderer} renderer - The renderer object.
   */
  constructor(renderer: GLBaseRenderer) {
    super()
    this.renderer = renderer
    this.gl = <WebGL12RenderingContext>renderer.gl

    this.renderer.glGeomLibrary.on('geomDataChanged', (event: any) => {
      const geomItemIndices = this.glGeomIdsMapping[event.index]
      if (geomItemIndices != undefined) {
        /*
        throw new Error('We do not yet support compound geoms changing.')
        */
        geomItemIndices.forEach((index: number) => {
          this.dirtyGeomItems.add(index)
          if (!this.drawIdsBufferDirty) {
            this.drawIdsBufferDirty = true
            this.emit('updated')
          }
          /*
          const glGeomItem = this.glGeomItems[index]!
          if (glGeomItem.isVisible()) {
            const index = this.visibleItems.indexOf(glGeomItem)
            const offsetAndCount = this.renderer.glGeomLibrary.getGeomOffsetAndCount(glGeomItem.geomId)
            const geomBuffers = this.renderer.glGeomLibrary.getGeomBuffers(glGeomItem.geomId)
            const prevDrawCounts = this.glGeomItems_drawItemsCounts[index]

            let drawCounts: Record<string, number> = {}
            if (false) {
              geomBuffers.subGeoms.forEach((subGeom: { start: number; count: number; type: string }) => {
                // const start = subGeom.start
                const count = subGeom.count
                // this.drawElementOffsets[subGeom.type][index] = offsetAndCount[0] + start
                // this.drawElementCounts[subGeom.type][index] = count
                if (!drawCounts[subGeom.type]) drawCounts[subGeom.type] = 0
                drawCounts[subGeom.type] += count
              })
              for (let key in drawCounts) {
                this.allocators[key].allocate(index, drawCounts[key])
              }
            } else {
              for (let key in geomBuffers.offsets) {
                // const offset = geomBuffers.offsets[key]
                // const count = geomBuffers.counts[key]
                // this.drawElementOffsets[key][index] = offsetAndCount[0] + offset
                // this.drawElementCounts[key][index] = count
                // if (!drawCounts[key]) drawCounts[key] = 0
                // drawCounts[key]++
                if (!this.allocators[key]) {
                  this.allocators[key] = new Allocator1D()
                }
                this.allocators[key].allocate(index, 1)
              }
            }

            // this.glGeomItems_drawItemsCounts[index] = drawCounts
            // for (let key in drawCounts) {
            //   if (!this.drawCounts[key]) this.drawCounts[key] = 0
            //   this.drawCounts[key] += key in prevDrawCounts ? drawCounts[key] - prevDrawCounts[key] : drawCounts[key]
            // }
            // this.totalDrawItems += delta

            // const highlightIndex = this.highlightedItems.indexOf(glGeomItem)
            // if (highlightIndex != -1) {
            //   this.highlightElementOffsets[highlightIndex] = offsetAndCount[0]
            //   this.highlightElementCounts[highlightIndex] = offsetAndCount[1]
            // }
          }
          */
        })
        /* */
      }
    })
  }

  /**
   * The addGLGeomItem method.
   * @param {GLGeomItem} glGeomItem - The glGeomItem value.
   */
  addGLGeomItem(glGeomItem: GLGeomItem) {
    const index: number = this.freeIndices.length > 0 ? this.freeIndices.pop()! : this.glGeomItems.length

    // Keep track of which geomitems use which geoms, so we can update the offset and count array if they change.
    if (!this.glGeomIdsMapping[glGeomItem.geomId]) {
      this.glGeomIdsMapping[glGeomItem.geomId] = [index]
    } else {
      this.glGeomIdsMapping[glGeomItem.geomId].push(index)
    }

    const eventHandlers: Record<string, any> = {}

    // //////////////////////////////
    // Visibility
    if (glGeomItem.visible) {
      this.visibleItems.push(glGeomItem)
      this.dirtyGeomItems.add(index)
    }
    eventHandlers.visibilityChanged = (event: Record<string, any>) => {
      if (event.visible) {
        this.visibleItems.push(glGeomItem)
      } else {
        this.visibleItems.splice(this.visibleItems.indexOf(glGeomItem), 1)
      }
      this.dirtyGeomItems.add(index)
      // console.log(this.constructor.name, ' visibleItems', this.visibleItems.length)
      if (!this.drawIdsBufferDirty) {
        this.drawIdsBufferDirty = true
        this.emit('updated')
      }
    }
    glGeomItem.on('visibilityChanged', eventHandlers.visibilityChanged)

    // //////////////////////////////
    // Highlighted
    if (glGeomItem.geomItem.isHighlighted()) {
      this.highlightedItems.push(glGeomItem)
      this.highlightedIdsBufferDirty = true
    }

    eventHandlers.highlightChanged = (event: Record<string, any>) => {
      if (event && event.name) {
        // Note: highlightChanged is fired when the color changes
        // or another highlight is added over the top. We avoid
        // adding the same index again here. (TODO: use Set?)
        if (this.highlightedItems.includes(glGeomItem)) return
        this.highlightedItems.push(glGeomItem)
      } else {
        this.highlightedItems.splice(this.highlightedItems.indexOf(glGeomItem), 1)
      }
      // console.log("highlightChanged:", glGeomItem.geomItem.getName(), glGeomItem.geomItem.isHighlighted(), this.highlightedItems)
      this.highlightedIdsBufferDirty = true
      this.emit('updated')
    }
    glGeomItem.geomItem.on('highlightChanged', eventHandlers.highlightChanged)

    this.glGeomItems[index] = glGeomItem
    this.glgeomItemEventHandlers[index] = eventHandlers
    delete this.glGeomItems_drawItemsCounts[index]

    this.drawIdsBufferDirty = true

    this.emit('updated')
  }

  /**
   * The removeGLGeomItem method.
   * @param {GLGeomItem} glGeomItem - The glGeomItem value.
   */
  removeGLGeomItem(glGeomItem: GLGeomItem) {
    const index = this.glGeomItems.indexOf(glGeomItem)
    const geomItemIndices = this.glGeomIdsMapping[glGeomItem.geomId]
    geomItemIndices.splice(geomItemIndices.indexOf(index), 1)
    if (geomItemIndices.length == 0) {
      delete this.glGeomIdsMapping[glGeomItem.geomId]
    }

    const eventHandlers = this.glgeomItemEventHandlers[index]
    glGeomItem.geomItem.off('highlightChanged', eventHandlers.highlightChanged)
    glGeomItem.off('visibilityChanged', eventHandlers.visibilityChanged)

    this.glGeomItems[index] = null
    this.glgeomItemEventHandlers[index] = null
    delete this.drawIdsArrays[index]
    delete this.drawElementOffsets[index]
    delete this.drawElementCounts[index]
    this.freeIndices.push(index)

    if (glGeomItem.isVisible()) {
      const visibleItemIndex = this.visibleItems.indexOf(glGeomItem)
      this.visibleItems.splice(visibleItemIndex, 1)
      this.drawIdsBufferDirty = true
    }
    if (glGeomItem.geomItem.isHighlighted()) {
      const highlightIndex = this.highlightedItems.indexOf(glGeomItem)
      this.highlightedItems.splice(highlightIndex, 1)
      this.highlightedIdsBufferDirty = true
    }
    this.emit('updated')
  }

  // ////////////////////////////////////
  // Draw Ids

  // ////////////////////////////////////
  // Instance Ids

  /**
   * The updateDrawIDsBuffer method.
   * @param {RenderState} renderstate - The object used to track state changes during rendering.
   */
  updateDrawIDsBuffer(renderstate: RenderState) {
    this.dirtyGeomItems.forEach(index => {
      const glGeomItem = this.glGeomItems[index]!
      if (glGeomItem.isVisible()) {
        const index = this.visibleItems.indexOf(glGeomItem)
        const geomBuffers = this.renderer.glGeomLibrary.getGeomBuffers(glGeomItem.geomId)
        let drawCounts: Record<string, number> = {}
        if (geomBuffers.subGeoms.length > 0 && false) {
          geomBuffers.subGeoms.forEach((subGeom: { start: number; count: number; type: string }) => {
            const count = subGeom.count
            if (!drawCounts[subGeom.type]) drawCounts[subGeom.type] = 0
            drawCounts[subGeom.type] += count
          })
        } else {
          for (let key in geomBuffers.offsets) {
            drawCounts[key] = 1
          }
        }
        for (let key in drawCounts) {
          if (!this.allocators[key]) {
            this.allocators[key] = new Allocator1D()
          }
          const prevAllocation = this.allocators[key].getAllocation(index)
          const newAllocation = this.allocators[key].allocate(index, drawCounts[key])
          if (prevAllocation && prevAllocation.start != newAllocation.start && this.drawIdsArrays[key]) {
            // Clear the previous allocation to remove any rendering.
            for (let i = 0; i < prevAllocation.size; i++) {
              this.drawIdsArrays[key][prevAllocation.start + i] = 0
              this.drawElementOffsets[key][prevAllocation.start + i] = 0
              this.drawElementCounts[key][prevAllocation.start + i] = 0
            }
          }
        }
      } else {
        for (let key in this.allocators) {
          if (this.allocators[key]) {
            this.allocators[key].deallocate(index)
          }
        }
      }
    })

    let regen = false
    for (let key in this.allocators) {
      const allocator = this.allocators[key]
      if (!this.drawIdsArrays[key] || allocator.reservedSpace > this.drawIdsArrays[key].length) {
        this.drawIdsArrays[key] = new Float32Array(allocator.reservedSpace)
        this.drawElementOffsets[key] = new Int32Array(allocator.reservedSpace)
        this.drawElementCounts[key] = new Int32Array(allocator.reservedSpace)
        regen = true
      }
    }
    if (regen) {
      for (let i = 0; i < this.visibleItems.length; i++) this.dirtyGeomItems.add(i)
    }

    this.dirtyGeomItems.forEach(index => {
      const glGeomItem = this.glGeomItems[index]!
      const offsetAndCount = this.renderer.glGeomLibrary.getGeomOffsetAndCount(glGeomItem.geomId)
      const geomBuffers = this.renderer.glGeomLibrary.getGeomBuffers(glGeomItem.geomId)

      if (geomBuffers.subGeoms.length > 0 && false) {
        geomBuffers.subGeoms.forEach((subGeom: { start: number; count: number; type: string }, subIndex: number) => {
          const allocator = this.allocators[subGeom.type]
          const allocation = allocator.getAllocation(index)
          this.drawElementOffsets[subGeom.type][allocation.start + subIndex] = offsetAndCount[0] + subGeom.start
          this.drawElementCounts[subGeom.type][allocation.start + subIndex] = subGeom.count
          this.drawIdsArrays[subGeom.type][allocation.start + subIndex] = glGeomItem.drawItemId
        })
      } else {
        for (let key in geomBuffers.offsets) {
          const offset = geomBuffers.offsets[key]
          const count = geomBuffers.counts[key]
          const allocator = this.allocators[key]
          const allocation = allocator.getAllocation(index)
          this.drawElementOffsets[key][allocation.start] = offsetAndCount[0] + offset
          this.drawElementCounts[key][allocation.start] = count
          this.drawIdsArrays[key][allocation.start] = glGeomItem.drawItemId
        }
      }
    })

    const gl = this.renderer.gl
    if (!gl.multiDrawElements) {
      return
    }

    const updateDrawIdsTexture = (key: string) => {
      const drawIdsArray = this.drawIdsArrays[key]
      let drawIdsTexture = this.drawIdsTextures[key]
      const drawCount = this.allocators[key].allocatedSpace
      const unit = renderstate.boundTextures++
      gl.activeTexture(gl.TEXTURE0 + unit)

      const drawIdsTextureSize = MathFunctions.nextPow2(Math.ceil(Math.sqrt(drawCount))) * 2
      if (!drawIdsTexture) {
        drawIdsTexture = new GLTexture2D(this.gl, {
          format: gl.name == 'webgl2' ? 'RED' : 'ALPHA',
          type: 'FLOAT',
          width: drawIdsTextureSize,
          height: drawIdsTextureSize,
          filter: 'NEAREST',
          wrap: 'CLAMP_TO_EDGE',
          mipMapped: false
        })
        this.drawIdsTextures[key] = drawIdsTexture
      } else if (drawIdsTexture.width < drawIdsTextureSize || drawIdsTexture.height < drawIdsTextureSize) {
        drawIdsTexture.resize(drawIdsTextureSize, drawIdsTextureSize)
      }
      {
        const tex = drawIdsTexture
        const texWidth = drawIdsTexture.width
        gl.bindTexture(gl.TEXTURE_2D, tex.glTex)
        const level = 0
        const xoffset = 0
        const height = 1
        const format = tex.getFormat()
        const type = tex.getType()
        const rows = Math.ceil((xoffset + drawCount) / texWidth)

        let consumed = 0
        let remaining = drawCount
        let rowStart = xoffset
        for (let i = 0; i < rows; i++) {
          let width
          if (rowStart + remaining > texWidth) {
            width = texWidth - rowStart
            rowStart = 0
          } else {
            width = remaining
          }
          const x = consumed % texWidth
          const y = Math.floor(consumed / texWidth)
          const data = drawIdsArray.subarray(consumed, consumed + width)
          gl.texSubImage2D(gl.TEXTURE_2D, level, x, y, width, height, format, type, data)
          consumed += width
          remaining -= width
        }
      }

      gl.bindTexture(gl.TEXTURE_2D, null)
      renderstate.boundTextures--
    }
    for (let key in this.drawIdsArrays) {
      updateDrawIdsTexture(key)
    }

    this.drawIdsBufferDirty = false
  }

  // ////////////////////////////////////
  // Selected Items

  /**
   * The updateHighlightedIDsBuffer method.
   * @param {RenderState} renderstate - The object used to track state changes during rendering.
   */
  updateHighlightedIDsBuffer(renderstate: RenderState) {
    /*
    if (this.highlightedIdsBufferDirty) {
      if (!this.highlightedIdsArray || this.highlightedItems.length > this.highlightedIdsArray.length) {
        this.highlightedIdsArray = new Float32Array(this.highlightedItems.length)
        this.highlightElementOffsets = new Int32Array(this.highlightedItems.length)
        this.highlightElementCounts = new Int32Array(this.highlightedItems.length)
      }

      // Collect all visible geom ids into the instanceIds array.
      // Note: the draw count can be less than the number of instances
      // we re-use the same buffer and simply invoke fewer draw calls.
      this.highlightedItems.forEach((glGeomItem, index) => {
        this.highlightedIdsArray[index] = glGeomItem.drawItemId
        const offsetAndCount = this.renderer.glGeomLibrary.getGeomOffsetAndCount(glGeomItem.geomId)
        this.highlightElementOffsets[index] = offsetAndCount[0]
        this.highlightElementCounts[index] = offsetAndCount[1]
      })
      for (let i = this.highlightedItems.length; i < this.highlightElementCounts.length; i++) {
        this.highlightElementOffsets[i] = 0
        this.highlightElementCounts[i] = 0
      }

      this.highlightedIdsBufferDirty = false
    }

    const gl = this.renderer.gl
    if (!gl.multiDrawElements) {
      return
    }

    const unit = renderstate.boundTextures++
    gl.activeTexture(gl.TEXTURE0 + unit)
    const highlightIdsTextureSize = MathFunctions.nextPow2(Math.ceil(Math.sqrt(this.highlightedItems.length)))

    if (!this.highlightedIdsTexture) {
      this.highlightedIdsTexture = new GLTexture2D(this.gl, {
        format: gl.name == 'webgl2' ? 'RED' : 'ALPHA',
        type: 'FLOAT',
        width: highlightIdsTextureSize,
        height: highlightIdsTextureSize,
        filter: 'NEAREST',
        wrap: 'CLAMP_TO_EDGE',
        mipMapped: false
      })
    } else if (
      this.highlightedIdsTexture.width < highlightIdsTextureSize ||
      this.highlightedIdsTexture.height < highlightIdsTextureSize
    ) {
      this.highlightedIdsTexture.resize(highlightIdsTextureSize, highlightIdsTextureSize)
    }
    {
      const tex = this.highlightedIdsTexture
      const texWidth = this.highlightedIdsTexture.width
      gl.bindTexture(gl.TEXTURE_2D, tex.glTex)

      const level = 0
      const xoffset = 0
      const height = 1
      const format = tex.getFormat()
      const type = tex.getType()
      const rows = Math.ceil((xoffset + this.highlightedIdsArray.length) / texWidth)

      let consumed = 0
      let remaining = this.highlightedIdsArray.length
      let rowStart = xoffset
      for (let i = 0; i < rows; i++) {
        let width
        if (rowStart + remaining > texWidth) {
          width = texWidth - rowStart
          rowStart = 0
        } else {
          width = remaining
        }
        const x = consumed % texWidth
        const y = Math.floor(consumed / texWidth)
        const data = this.highlightedIdsArray.subarray(consumed, consumed + width)
        gl.texSubImage2D(gl.TEXTURE_2D, level, x, y, width, height, format, type, data)
        consumed += width
        remaining -= width
      }
    }

    gl.bindTexture(gl.TEXTURE_2D, null)
    renderstate.boundTextures--
    */
  }
  // ////////////////////////////////////
  // Drawing

  /**
   * The draw method.
   * @param {RenderState} renderstate - The object tracking the current state of the renderer
   */
  draw(renderstate: RenderState) {
    if (this.visibleItems.length == 0) {
      return
    }
    if (this.drawIdsBufferDirty) {
      this.updateDrawIDsBuffer(renderstate)
    }

    this.bindAndRender(
      renderstate,
      this.drawIdsArrays,
      this.drawElementCounts,
      this.drawElementOffsets,
      this.drawIdsTextures,
      this.allocators
    )
  }

  /**
   * The drawHighlighted method.
   * @param {RenderState} renderstate - The object tracking the current state of the renderer
   */
  drawHighlighted(renderstate: RenderState) {
    if (this.highlightedItems.length == 0) {
      return
    }
    if (this.highlightedIdsBufferDirty) {
      this.updateHighlightedIDsBuffer(renderstate)
    }
    if (this.highlightedIdsTexture) {
      const { drawIdsTexture } = renderstate.unifs
      this.highlightedIdsTexture.bindToUniform(renderstate, drawIdsTexture)
    }

    // this.bindAndRender(
    //   renderstate,
    //   this.highlightedIdsArray,
    //   this.highlightElementCounts,
    //   this.highlightElementOffsets,
    //   this.drawCounts
    // )
  }

  /**
   * The bindAndRender method.
   * @param {RenderState} renderstate - The object tracking the current state of the renderer
   * @param {Array} counts - the counts for each element drawn in by this draw call.
   * @param {Array} offsets - the offsets for each element drawn in by this draw call.
   * @private
   */
  bindAndRender(
    renderstate: RenderState,
    drawIdsArray: Record<string, Float32Array>,
    counts: Record<string, Int32Array>,
    offsets: Record<string, Int32Array>,
    drawIdsTextures: Record<string, GLTexture2D>,
    allocators: Record<string, Allocator1D>
  ) {
    const gl = this.gl
    const unifs = renderstate.unifs

    // Specify an instanced draw to the shader so it knows how
    // to retrieve the modelmatrix.
    if (unifs.instancedDraw) {
      gl.uniform1i(renderstate.unifs.instancedDraw.location, 1)
    }

    gl.depthFunc(gl.LEQUAL)

    const { drawIdsTexture } = renderstate.unifs
    const bindTex = (key: string) => {
      if (drawIdsTextures[key]) {
        drawIdsTextures[key].bindToUniform(renderstate, drawIdsTexture)
      }
    }

    renderstate.bindViewports(unifs, () => {
      // if (drawIdsArray['MESH']) {
      //   bindTex('MESH')
      //   this.multiDrawMeshes(
      //     renderstate,
      //     drawIdsArray['MESH'],
      //     counts['MESH'],
      //     offsets['MESH'],
      //     allocators['MESH'].allocatedSpace
      //   )
      // }
      if (drawIdsArray['LINE']) {
        bindTex('LINE')
        this.multiDrawLines(
          renderstate,
          drawIdsArray['LINE'],
          counts['LINE'],
          offsets['LINE'],
          allocators['LINE'].allocatedSpace
        )
      }
      if (drawIdsArray['POINT']) {
        bindTex('POINT')
        this.multiDrawPoints(
          renderstate,
          drawIdsArray['POINT'],
          counts['POINT'],
          offsets['POINT'],
          allocators['POINT'].allocatedSpace
        )
      }
    })
  }

  multiDrawMeshes(
    renderstate: RenderState,
    drawIds: Float32Array,
    counts: Int32Array,
    offsets: Int32Array,
    drawCount: number
  ) {
    this.renderer.glGeomLibrary.bind(renderstate)
    const gl = this.gl
    if (gl.multiDrawElements) {
      gl.multiDrawElements(gl.TRIANGLES, counts, 0, gl.UNSIGNED_INT, offsets, 0, drawCount)
    } else {
      const { drawId } = renderstate.unifs
      for (let i = 0; i < drawCount; i++) {
        gl.uniform1i(drawId.location, drawIds[i])
        gl.drawElements(gl.TRIANGLES, counts[i], gl.UNSIGNED_INT, offsets[i])
      }
    }
  }

  multiDrawLines(
    renderstate: RenderState,
    drawIds: Float32Array,
    counts: Int32Array,
    offsets: Int32Array,
    drawCount: number
  ) {
    this.renderer.glGeomLibrary.bind(renderstate)
    const gl = this.gl
    if (gl.multiDrawElements) {
      const { occluded } = renderstate.unifs
      if (occluded) {
        gl.uniform1i(occluded.location, 0)
      }

      gl.multiDrawElements(gl.LINES, counts, 0, gl.UNSIGNED_INT, offsets, 0, drawCount)

      if (occluded) {
        gl.uniform1i(occluded.location, 1)
        gl.depthFunc(gl.GREATER)
        gl.multiDrawElements(gl.LINES, counts, 0, gl.UNSIGNED_INT, offsets, 0, drawCount)
        gl.depthFunc(gl.LEQUAL)
      }
    } else {
      const { drawId, occluded } = renderstate.unifs
      if (occluded) {
        gl.uniform1i(occluded.location, 0)
      }

      for (let i = 0; i < drawCount; i++) {
        gl.uniform1i(drawId.location, drawIds[i])
        gl.drawElements(gl.LINES, counts[i], gl.UNSIGNED_INT, offsets[i])
      }

      if (occluded) {
        gl.uniform1i(occluded.location, 1)
        gl.depthFunc(gl.GREATER)
        for (let i = 0; i < drawCount; i++) {
          gl.uniform1i(drawId.location, drawIds[i])
          gl.drawElements(gl.LINES, counts[i], gl.UNSIGNED_INT, offsets[i])
        }
        gl.depthFunc(gl.LEQUAL)
      }
    }
  }

  multiDrawPoints(
    renderstate: RenderState,
    drawIds: Float32Array,
    counts: Int32Array,
    offsets: Int32Array,
    drawCount: number
  ) {
    this.renderer.glGeomLibrary.bind(renderstate)
    const gl = this.gl
    if (gl.multiDrawElements) {
      gl.multiDrawElements(gl.POINTS, counts, 0, gl.UNSIGNED_INT, offsets, 0, drawCount)
      // gl.multiDrawArrays(gl.POINTS, offsets, 0, counts, 0, drawCount)
    } else {
      const { drawId } = renderstate.unifs
      for (let i = 0; i < drawCount; i++) {
        gl.uniform1i(drawId.location, drawIds[i])
        gl.drawElements(gl.POINTS, counts[i], gl.UNSIGNED_INT, offsets[i])
      }
    }
  }

  // /**
  //  * Draw an item to screen.
  //  * @param {RenderState} renderstate - The object tracking the current state of the renderer
  //  * @param {Float32Array} drawIds - the draw id for each element drawn in by this draw call.
  //  * @param {Int32Array} counts - the geom element count for each element drawn in by this draw call.
  //  * @param {Int32Array} offsets - the geom element offset for each element drawn in by this draw call.
  //  * @param {number} drawCount - the number of active draw calls for this invocation
  //  */
  // abstract multiDraw(
  //   renderstate: RenderState,
  //   drawIds: Float32Array,
  //   counts: Int32Array,
  //   offsets: Int32Array,
  //   drawCount: number
  // ): void

  /**
   * Sorts the drawn items in order furthest to nearest when rendering transparent objects.
   * @param {Vec3} viewPos - The position of the camera that we are sorting relative to.
   */
  sortItems(viewPos: Vec3) {
    const distances: any[] = []
    const indices: any[] = []
    this.visibleItems.forEach((glGeomItem, index) => {
      if (glGeomItem) {
        const mat4 = glGeomItem.geomItem.getGeomMat4()
        const dist = mat4.translation.distanceTo(viewPos)
        distances.push(dist)
        indices.push(index)
      }
    })
    indices.sort((a, b) => distances[b] - distances[a])

    // TODO:

    // const visibleItems: any[] = []
    // const drawElementCounts = new Int32Array(this.drawElementCounts['MESH'].length)
    // const drawElementOffsets = new Int32Array(this.drawElementOffsets['MESH'].length)
    // indices.forEach((tgtIndex, srcIndex) => {
    //   visibleItems[srcIndex] = this.visibleItems[tgtIndex]
    //   drawElementCounts[srcIndex] = this.drawElementCounts['MESH'][tgtIndex]
    //   drawElementOffsets[srcIndex] = this.drawElementOffsets['MESH'][tgtIndex]
    //   this.drawIdsArrays['MESH'][srcIndex] = this.visibleItems[tgtIndex].drawItemId
    // })
    // this.visibleItems = visibleItems
    // this.drawElementCounts['MESH'] = drawElementCounts
    // this.drawElementOffsets['MESH'] = drawElementOffsets
    // this.drawIdsBufferDirty = true
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy() {
    if (this.drawIdsTextures) {
      this.drawIdsTextures.destroy()
    }

    if (this.highlightedIdsTexture) {
      this.highlightedIdsTexture.destroy()
    }

    this.emit('destructing')
  }
}

export { GLGeomItemSetMultiDrawCompoundGeom }