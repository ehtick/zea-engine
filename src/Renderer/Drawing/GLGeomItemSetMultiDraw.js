import '../../SceneTree/GeomItem.js'

import { EventEmitter, MathFunctions } from '../../Utilities/index'
import { resizeIntArray } from './GLGeomLibrary.js'
import { GLTexture2D } from '../GLTexture2D.js'

const resizeFloat32Array = (intArray, newSize) => {
  const newArray = new Float32Array(newSize)
  newArray.set(intArray)
  return newArray
}

/** This class abstracts the rendering of a collection of geometries to screen.
 * @extends EventEmitter
 * @private
 */
class GLGeomItemSetMultiDraw extends EventEmitter {
  /**
   * Create a GL geom item set.
   * @param {GLBaseRenderer} renderer - The renderer object.
   */
  constructor(renderer) {
    super()
    this.renderer = renderer
    this.gl = renderer.gl
    this.glGeomItems = []
    this.glgeomItemEventHandlers = []
    this.dirtyDrawGeomIds = []

    this.drawElementCounts = new Int32Array(0)
    this.drawElementOffsets = new Int32Array(0)
    this.highlightElementCounts = new Int32Array(0)
    this.highlightElementOffsets = new Int32Array(0)

    this.reserved = 0
    this.visibleItems = []
    this.drawIdsArray = new Float32Array(0)
    this.drawIdsBufferDirty = true
    this.drawIdsTexture = null

    this.highlightedItems = []
    this.highlightedIdsArray = null
    this.highlightedIdsTexture = null
    this.highlightedIdsBufferDirty = true
  }

  /**
   * The addGLGeomItem method.
   * @param {any} glGeomItem - The glGeomItem value.
   */
  addGLGeomItem(glGeomItem) {
    this.glGeomItems.push(glGeomItem)

    const eventHandlers = {}
    eventHandlers.geomDataChanged = (event) => {
      if (event.index == glGeomItem.geomId && glGeomItem.geomItem.isVisible()) {
        const index = this.visibleItems.indexOf(glGeomItem)
        const offsetAndCount = this.renderer.glGeomLibrary.getGeomOffsetAndCount(glGeomItem.geomId)

        this.drawElementOffsets[index] = offsetAndCount[0]
        this.drawElementCounts[index] = offsetAndCount[1]
        const highlightIndex = this.highlightedItems.indexOf(glGeomItem)
        if (highlightIndex != -1) {
          this.highlightElementOffsets[highlightIndex] = offsetAndCount[0]
          this.highlightElementCounts[highlightIndex] = offsetAndCount[1]
        }
      }
    }
    this.renderer.glGeomLibrary.on('geomDataChanged', eventHandlers.geomDataChanged)

    if (glGeomItem.geomItem.isVisible()) {
      this.visibleItems.push(glGeomItem)
    }
    if (glGeomItem.geomItem.isHighlighted()) {
      this.highlightedItems.push(glGeomItem)
      this.highlightedIdsBufferDirty = true
    }

    eventHandlers.highlightChanged = (event) => {
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

    eventHandlers.visibilityChanged = (event) => {
      if (event.visible) {
        this.visibleItems.push(glGeomItem)
      } else {
        this.visibleItems.splice(this.visibleItems.indexOf(glGeomItem), 1)
      }
      this.drawIdsBufferDirty = true
      this.emit('updated')
    }
    glGeomItem.geomItem.on('visibilityChanged', eventHandlers.visibilityChanged)

    this.glgeomItemEventHandlers.push(eventHandlers)

    glGeomItem.geomItem.setMetadata('geomItemSet', this)

    this.drawIdsBufferDirty = true

    this.emit('updated')
  }

  /**
   * The removeGLGeomItem method.
   * @param {any} glGeomItem - The glGeomItem value.
   */
  removeGLGeomItem(glGeomItem) {
    const index = this.glGeomItems.indexOf(glGeomItem)

    const eventHandlers = this.glgeomItemEventHandlers[index]
    glGeomItem.geomItem.off('highlightChanged', eventHandlers.highlightChanged)
    glGeomItem.geomItem.off('visibilityChanged', eventHandlers.visibilityChanged)
    this.renderer.glGeomLibrary.off('geomDataChanged', eventHandlers.geomDataChanged)

    this.glGeomItems.splice(index, 1)
    this.glgeomItemEventHandlers.splice(index, 1)

    if (glGeomItem.geomItem.isVisible()) {
      const visibleItemIndex = this.visibleItems.indexOf(glGeomItem)
      this.visibleItems.splice(visibleItemIndex, 1)
      this.drawIdsBufferDirty = true
    }
    if (glGeomItem.geomItem.isHighlighted()) {
      const highlightIndex = this.visibleItems.indexOf(glGeomItem)
      this.highlightedItems.splice(highlightIndex, 1)
      this.highlightedIdsBufferDirty = true
    }
    this.emit('updated')
  }

  // ////////////////////////////////////
  // Draw Ids

  /**
   * The getHighlightedIdsArray method.
   * @return {Float32Array} - The drawIds for each GeomItem packed into a Float32Array
   */
  getHighlightedIdsArray() {
    if (this.highlightedIdsBufferDirty) {
      if (!this.highlightedIdsArray || this.highlightedItems.length > this.highlightedIdsArray.length) {
        this.highlightedIdsArray = new Float32Array(this.highlightedItems.length)
        this.highlightElementOffsets = new Uint32Array(this.highlightedItems.length)
        this.highlightElementCounts = new Uint32Array(this.highlightedItems.length)
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
    return this.highlightedIdsArray
  }

  // ////////////////////////////////////
  // Instance Ids

  /**
   * The updateDrawIDsBuffer method.
   * @param {object} renderstate - The object used to track state changes during rendering.
   */
  updateDrawIDsBuffer(renderstate) {
    const gl = this.renderer.gl

    const unit = renderstate.boundTextures++
    gl.activeTexture(gl.TEXTURE0 + unit)

    const drawIdsTextureSize = MathFunctions.nextPow2(Math.ceil(Math.sqrt(this.visibleItems.length)))

    if (!this.drawIdsTexture) {
      this.drawIdsTexture = new GLTexture2D(gl, {
        format: 'RED',
        internalFormat: 'R32F',
        type: 'FLOAT',
        width: drawIdsTextureSize,
        height: drawIdsTextureSize,
        filter: 'NEAREST',
        wrap: 'CLAMP_TO_EDGE',
        mipMapped: false,
      })
    } else if (this.drawIdsTexture.width < drawIdsTextureSize || this.drawIdsTexture.height < drawIdsTextureSize) {
      this.drawIdsTexture.resize(drawIdsTextureSize, drawIdsTextureSize)
    }
    {
      if (!this.drawIdsArray || this.visibleItems.length > this.drawIdsArray.length) {
        this.drawIdsArray = new Float32Array(this.visibleItems.length)
        this.drawElementOffsets = new Int32Array(this.visibleItems.length)
        this.drawElementCounts = new Int32Array(this.visibleItems.length)
      }

      this.visibleItems.forEach((glGeomItem, index) => {
        const offsetAndCount = this.renderer.glGeomLibrary.getGeomOffsetAndCount(glGeomItem.geomId)
        this.drawElementOffsets[index] = offsetAndCount[0]
        this.drawElementCounts[index] = offsetAndCount[1]
        this.drawIdsArray[index] = glGeomItem.drawItemId
      })
      for (let i = this.visibleItems.length; i < this.drawElementCounts.length; i++) {
        this.drawElementOffsets[i] = 0
        this.drawElementCounts[i] = 0
      }
      this.dirtyDrawGeomIds = []
    }
    {
      const tex = this.drawIdsTexture
      const texWidth = this.drawIdsTexture.width
      gl.bindTexture(gl.TEXTURE_2D, tex.glTex)
      const level = 0
      const xoffset = 0
      const height = 1
      const format = tex.__format
      const type = tex.__type
      const rows = Math.ceil((xoffset + this.drawIdsArray.length) / texWidth)

      let consumed = 0
      let remaining = this.drawIdsArray.length
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
        const data = this.drawIdsArray.subarray(consumed, consumed + width)
        gl.texSubImage2D(gl.TEXTURE_2D, level, x, y, width, height, format, type, data)
        consumed += width
        remaining -= width
      }
    }

    gl.bindTexture(gl.TEXTURE_2D, null)
    renderstate.boundTextures--

    this.drawIdsBufferDirty = false
  }

  // ////////////////////////////////////
  // Selected Items

  /**
   * The updateHighlightedIDsBuffer method.
   * @param {object} renderstate - The object used to track state changes during rendering.
   */
  updateHighlightedIDsBuffer(renderstate) {
    const gl = this.renderer.gl

    const unit = renderstate.boundTextures++
    gl.activeTexture(gl.TEXTURE0 + unit)
    const highlightedIdsArray = this.getHighlightedIdsArray()

    const highlightIdsTextureSize = MathFunctions.nextPow2(Math.ceil(Math.sqrt(this.highlightedItems.length)))

    if (!this.highlightedIdsTexture) {
      this.highlightedIdsTexture = new GLTexture2D(gl, {
        format: 'RED',
        internalFormat: 'R32F',
        type: 'FLOAT',
        width: highlightIdsTextureSize,
        height: highlightIdsTextureSize,
        filter: 'NEAREST',
        wrap: 'CLAMP_TO_EDGE',
        mipMapped: false,
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
      const format = tex.__format
      const type = tex.__type
      const rows = Math.ceil((xoffset + highlightedIdsArray.length) / texWidth)

      let consumed = 0
      let remaining = highlightedIdsArray.length
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
        const data = highlightedIdsArray.subarray(consumed, consumed + width)
        gl.texSubImage2D(gl.TEXTURE_2D, level, x, y, width, height, format, type, data)
        consumed += width
        remaining -= width
      }
    }

    gl.bindTexture(gl.TEXTURE_2D, null)
    renderstate.boundTextures--
  }
  // ////////////////////////////////////
  // Drawing

  /**
   * The draw method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   */
  draw(renderstate) {
    if (this.visibleItems.length == 0) {
      return
    }
    if (this.drawIdsBufferDirty) {
      this.updateDrawIDsBuffer(renderstate)
    }
    this.drawIdsTexture.bindToUniform(renderstate, renderstate.unifs.drawIdsTexture)

    this.__bindAndRender(renderstate, this.drawElementCounts, this.drawElementOffsets)
  }

  /**
   * The drawHighlighted method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   */
  drawHighlighted(renderstate) {
    if (this.highlightedItems.length == 0) {
      return
    }
    if (this.highlightedIdsBufferDirty) {
      this.updateHighlightedIDsBuffer(renderstate)
    }
    this.highlightedIdsTexture.bindToUniform(renderstate, renderstate.unifs.drawIdsTexture)

    this.__bindAndRender(renderstate, this.highlightElementCounts, this.highlightElementOffsets)
  }

  /**
   * The __bindAndRender method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   * @param {Array} counts - the counts for each element drawn in by this draw call.
   * @param {Array} offsets - the offsets for each element drawn in by this draw call.
   * @private
   */
  __bindAndRender(renderstate, counts, offsets) {
    const gl = this.gl
    const unifs = renderstate.unifs

    if (!gl.floatTexturesSupported || !gl.drawElementsInstanced || !renderstate.supportsInstancing) {
      if (renderstate.unifs.instancedDraw) {
        gl.uniform1i(renderstate.unifs.instancedDraw.location, 0)
      }
      counts.forEach((index) => {
        this.glGeomItems[index].bind(renderstate)
        renderstate.bindViewports(unifs, () => {
          this.singleDraw(counts[index], offsets[index])
        })
      })
    } else {
      // console.log("draw:"+ this.drawIdsArray);

      // Specify an instanced draw to the shader so it knows how
      // to retrieve the modelmatrix.
      if (unifs.instancedDraw) {
        gl.uniform1i(renderstate.unifs.instancedDraw.location, 1)
      }

      renderstate.bindViewports(unifs, () => {
        this.multiDraw(counts, offsets)
      })
    }
  }

  /**
   * Sorts the drawn items in order furthest to nearest when rendering transparent objects.
   * @param {Vec3} viewPos - The position of the camera that we are sorting relative to.
   */
  sortItems(viewPos) {
    const distances = []
    const indices = []
    this.visibleItems.forEach((glGeomItem, index) => {
      if (glGeomItem) {
        const mat4 = glGeomItem.geomItem.getGeomMat4()
        const dist = mat4.translation.distanceTo(viewPos)
        distances.push(dist)
        indices.push(index)
      }
    })
    indices.sort((a, b) => distances[b] - distances[a])

    const visibleItems = []
    const drawElementCounts = new Int32Array(this.drawElementCounts.length)
    const drawElementOffsets = new Int32Array(this.drawElementOffsets.length)
    indices.forEach((tgtIndex, srcIndex) => {
      visibleItems[srcIndex] = this.visibleItems[tgtIndex]
      drawElementCounts[srcIndex] = this.drawElementCounts[tgtIndex]
      drawElementOffsets[srcIndex] = this.drawElementOffsets[tgtIndex]
      this.drawIdsArray[srcIndex] = this.visibleItems[tgtIndex].drawItemId
    })
    this.visibleItems = visibleItems
    this.drawElementCounts = drawElementCounts
    this.drawElementOffsets = drawElementOffsets
    this.drawIdsBufferDirty = true
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy() {
    if (this.drawIdsTexture) {
      this.drawIdsTexture.destroy()
    }

    if (this.highlightedIdsTexture) {
      this.highlightedIdsTexture.destroy()
    }

    this.emit('destructing')
  }
}

export { GLGeomItemSetMultiDraw }
