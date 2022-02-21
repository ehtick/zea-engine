import { Vec3 } from '../../Math/Vec3'
import { CompoundGeom, Plane } from '../../SceneTree'
import '../../SceneTree/GeomItem'
import { StateChangedEvent } from '../../Utilities/Events/StateChangedEvent'
import { VisibilityChangedEvent } from '../../Utilities/Events/VisibilityChangedEvent'

import { EventEmitter, MathFunctions, Allocator1D } from '../../Utilities/index'
import { GLBaseRenderer } from '../GLBaseRenderer'
import { checkFramebuffer } from '../GLFbo'
import { GLTexture2D } from '../GLTexture2D'
import { FattenLinesShader } from '../Shaders/FattenLinesShader'
import { GeomDataRenderState, RenderState } from '../types/renderer'
import { WebGL12RenderingContext } from '../types/webgl'
import { GLGeomItem } from './GLGeomItem'
import { GLMesh } from './GLMesh'

const deepEquals = (arr0: Array<number>, arr1: Array<number>) => {
  return arr0.length == arr1.length && !arr0.some((v, index) => v != arr1[index])
}

enum GeomType {
  TRIANGLES = 0,
  LINES = 1,
  POINTS = 2,
}

interface SubGeom {
  materialId: number
  offset: number
  count: number
}

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
  // protected visibleItems: GLGeomItem[] = []
  protected dirtyGeomItems: Set<number> = new Set()
  protected drawIdsBufferDirty: boolean = true

  // protected drawCounts: Record<string, number> = {}
  protected drawIdsArraysAllocators: Record<string, Allocator1D> = {}
  protected drawIdsArrays: Record<string, Float32Array> = {}
  protected drawIdsTextures: Record<string, GLTexture2D> = {}
  protected drawElementCounts: Record<string, Int32Array> = {}
  protected drawElementOffsets: Record<string, Int32Array> = {}
  protected drawOrderToIndex: number[] = []
  protected indexToDrawIndex: number[] = []

  // As transparent geometries are re-sorted, the allocations are moved around
  // This array stores the new start position of each geometries allocation.
  // Note: sorting is disabled untill we fix all remaining issues.
  // protected indexToOffsets: Record<string, number[]> = {}

  protected highlightedItems: Record<number, Array<number>> = {}
  protected highlightedIdsArraysAllocators: Record<string, Allocator1D> = {}
  // protected highlightedDrawCounts: Record<string, number> = {}
  protected highlightElementCounts: Record<string, Int32Array> = {}
  protected highlightElementOffsets: Record<string, Int32Array> = {}
  protected highlightedIdsArray?: Record<string, Float32Array> = {}
  protected highlightedIdsTextures: Record<string, GLTexture2D> = {}
  protected dirtyHighlightedGeomItems: Set<number> = new Set()
  protected highlightedIdsBufferDirty: boolean = true

  protected linesGeomDataBuffer: GLTexture2D | null = null
  protected fattenLinesShader: FattenLinesShader | null = null
  protected quad: GLMesh | null = null
  protected fbo: WebGLFramebuffer | null = null

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
        geomItemIndices.forEach((index: number) => {
          this.dirtyGeomItems.add(index)
          if (!this.drawIdsBufferDirty) {
            this.drawIdsBufferDirty = true
            this.emit('updated')
          }
        })
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
      this.indexToDrawIndex[index] = this.drawOrderToIndex.length
      this.drawOrderToIndex.push(index)
      this.dirtyGeomItems.add(index)
    }
    eventHandlers.visibilityChanged = (event: VisibilityChangedEvent) => {
      if (event.visible) {
        this.indexToDrawIndex[index] = this.drawOrderToIndex.length
        this.drawOrderToIndex.push(index)
      } else {
        const drawOrderIndex = this.drawOrderToIndex.indexOf(index)
        if (drawOrderIndex >= 0) {
          this.drawOrderToIndex.splice(drawOrderIndex, 1)
        } else {
          // So far we are not seeing this warning.
          console.log('index not in drawOrderToIndex array')
        }
        this.indexToDrawIndex[index] = -1
      }
      // this.dirtyGeomItems.add(index)
      // console.log(this.constructor.name, ' drawOrderToIndex', this.drawOrderToIndex.length)
      if (!this.drawIdsBufferDirty) {
        this.drawIdsBufferDirty = true
        this.emit('updated')
      }
    }
    glGeomItem.on('visibilityChanged', eventHandlers.visibilityChanged)

    eventHandlers.cullStateChanged = () => {
      // const drawIndex = this.indexToDrawIndex[index]
      if (!glGeomItem.culled) {
        // const offsetAndCount = this.renderer.glGeomLibrary.getGeomOffsetAndCount(glGeomItem.geomId)
        // this.drawElementCounts[drawIndex] = offsetAndCount[1]
        const geomBuffers = this.renderer.glGeomLibrary.getGeomBuffers(glGeomItem.geomId)
        if (Object.keys(this.drawIdsArraysAllocators).length == 0) {
          // This item was never visible before and is now being un-culled.
          // No allications have yet been made for it so we can't simply re-set the count value
          this.dirtyGeomItems.add(index)
          this.drawIdsBufferDirty = true
          return
        }
        for (let key in geomBuffers.counts) {
          const allocator = this.drawIdsArraysAllocators[key]
          if (allocator) {
            const allocation = allocator.getAllocation(index)
            if (allocation) {
              // const start = this.indexToOffsets[key][index]
              const start = allocation.start
              if (glGeomItem.shattered) {
                for (let i = 0; i < allocation.size; i++) {
                  this.drawElementCounts[key][start + i] = geomBuffers.subGeomCounts[key][i]
                }
              } else {
                const subGeoms = <SubGeom[]>geomBuffers.materialSubGeoms[key]
                for (let i = 0; i < allocation.size; i++) {
                  const subGeom = subGeoms[i]
                  this.drawElementCounts[key][start + i] = subGeom.count
                }
              }
            } else {
              // This item was never visible before and is now being un-culled.
              // No allications have yet been made for it so we can't simply re-set the count value
              this.dirtyGeomItems.add(index)
              this.drawIdsBufferDirty = true
              return
            }
          } else {
            // This item was never visible before and is now being un-culled.
            // No allications have yet been made for it so we can't simply re-set the count value
            this.dirtyGeomItems.add(index)
            this.drawIdsBufferDirty = true
            return
          }
        }
      } else {
        // this.drawElementCounts[drawIndex] = 0
        for (let key in this.drawIdsArraysAllocators) {
          const allocator = this.drawIdsArraysAllocators[key]
          if (allocator) {
            const allocation = allocator.getAllocation(index)
            if (allocation) {
              // const start = this.indexToOffsets[key][index]
              const start = allocation.start
              for (let i = 0; i < allocation.size; i++) {
                this.drawElementCounts[key][start + i] = 0
              }
            }
          }
        }
      }
    }
    glGeomItem.on('cullStateChanged', eventHandlers.cullStateChanged)

    // //////////////////////////////
    // Highlighted
    const addItemToHighlight = (highlightName: string) => {
      // Check to see if the highlight key contains
      // a subGeomIndex at the end separated by a ':'
      const subGeomIndexIndex = highlightName.indexOf(':')
      let subGeomIndices: Array<number> = []
      if (subGeomIndexIndex != -1) {
        subGeomIndices = highlightName
          .substring(subGeomIndexIndex + 1)
          .split(',')
          .map((v) => Number.parseInt(v))
      }
      // Note: highlightChanged is fired when the color changes
      // or another highlight is added over the top. We avoid
      // adding the same index again here. (TODO: use Set?)

      if (this.highlightedItems[index] && deepEquals(this.highlightedItems[index], subGeomIndices)) return
      this.highlightedItems[index] = subGeomIndices

      this.highlightedIdsBufferDirty = true
      this.emit('updated')
    }
    if (glGeomItem.geomItem.isHighlighted()) {
      addItemToHighlight(glGeomItem.geomItem.getHighlightName())
    }

    eventHandlers.highlightChanged = (event: Record<string, any>) => {
      if (event && event.name) {
        addItemToHighlight(event.name)
      } else {
        delete this.highlightedItems[index]
        // console.log("highlightChanged:", glGeomItem.geomItem.getName(), glGeomItem.geomItem.isHighlighted(), this.highlightedItems)
        this.highlightedIdsBufferDirty = true
        this.emit('updated')
      }
    }
    glGeomItem.geomItem.on('highlightChanged', eventHandlers.highlightChanged)

    // //////////////////////////////
    // ShatterState
    eventHandlers.shatterStateChanged = (event: StateChangedEvent) => {
      // const geomBuffers = this.renderer.glGeomLibrary.getGeomBuffers(glGeomItem.geomId)
      // if (geomBuffers.materials.length == 0)
      {
        this.dirtyGeomItems.add(index)
        this.drawIdsBufferDirty = true

        // We need the new GeomData Fbos written so we can
        // detect these subgeoms.
        this.renderer.renderGeomDataFbos()
      }
    }
    glGeomItem.on('shatterStateChanged', eventHandlers.shatterStateChanged)

    {
      // Here we add any materials to the GLMaterial library so we can draw the geom.
      // @ts-ignore
      const geom = <CompoundGeom>glGeomItem.geomItem.geomParam.value
      geom.materials.forEach((material) => {
        this.renderer!.glMaterialLibrary.addMaterial(material)
      })
    }

    this.glGeomItems[index] = glGeomItem
    this.glgeomItemEventHandlers[index] = eventHandlers

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
    this.freeIndices.push(index)

    if (this.dirtyGeomItems.has(index)) {
      this.dirtyGeomItems.delete(index)
    }

    // Clear any drawing allocations.
    for (let key in this.drawIdsArraysAllocators) {
      const prevAllocation = this.drawIdsArraysAllocators[key].getAllocation(index)
      if (prevAllocation) {
        for (let i = 0; i < prevAllocation.size; i++) {
          this.drawElementOffsets[key][prevAllocation.start + i] = 0
          this.drawElementCounts[key][prevAllocation.start + i] = 0
        }
        this.drawIdsArraysAllocators[key].deallocate(index)
      }
    }

    if (glGeomItem.isVisible()) {
      const drawIndex = this.drawOrderToIndex.indexOf(index)
      this.drawOrderToIndex.splice(drawIndex, 1)
      this.indexToDrawIndex[index] = -1
      this.drawIdsBufferDirty = true
    }
    if (glGeomItem.geomItem.isHighlighted()) {
      delete this.highlightedItems[index]
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
    this.dirtyGeomItems.forEach((index) => {
      const glGeomItem = this.glGeomItems[index]
      if (!glGeomItem) return
      if (glGeomItem.isVisible()) {
        const geomBuffers = this.renderer.glGeomLibrary.getGeomBuffers(glGeomItem.geomId)

        // Here we calculate how many draws for each type of geometry, each
        // compound goem needs. We then allocate the space we have specified.
        let drawCounts: Record<string, number> = {}
        if (glGeomItem.shattered) {
          // for shattered geoms, we draw once for each subgeom for each element type
          for (let key in geomBuffers.subGeomCounts) {
            drawCounts[key] = geomBuffers.subGeomCounts[key].length
          }
        } else {
          // for non-shattered geoms, we just draw once for each element type per GeomItem.
          for (let key in geomBuffers.materialSubGeoms) {
            drawCounts[key] = geomBuffers.materialSubGeoms[key].length
          }
        }
        for (let key in drawCounts) {
          const drawCount = drawCounts[key]
          // if (drawCount == 0) continue

          if (!this.drawIdsArraysAllocators[key]) {
            this.drawIdsArraysAllocators[key] = new Allocator1D()
          }
          // This happens when an item drawing changes. e.g. it becomes shattered.
          const prevAllocation = this.drawIdsArraysAllocators[key].getAllocation(index)
          if (prevAllocation) {
            // Zero the previous allocation to remove any rendering.
            for (let i = 0; i < prevAllocation.size; i++) {
              this.drawElementCounts[key][prevAllocation.start + i] = 0
            }
          }
          this.drawIdsArraysAllocators[key].allocate(index, drawCount)
        }
      } else {
        for (let key in this.drawIdsArraysAllocators) {
          if (this.drawIdsArraysAllocators[key]) {
            const prevAllocation = this.drawIdsArraysAllocators[key].getAllocation(index)
            if (prevAllocation) {
              // Clear the previous allocation to remove any rendering.
              for (let i = 0; i < prevAllocation.size; i++) {
                this.drawElementCounts[key][prevAllocation.start + i] = 0
              }
            }
          }
        }
      }
    })

    let regen = false
    for (let key in this.drawIdsArraysAllocators) {
      const allocator = this.drawIdsArraysAllocators[key]
      if (!this.drawElementCounts[key] || allocator.reservedSpace > this.drawElementCounts[key].length) {
        if (this.drawElementCounts[key] && allocator.reservedSpace > this.drawElementCounts[key].length) {
          regen = true
        }
        this.drawIdsArrays[key] = new Float32Array(allocator.reservedSpace * 4) // one RGBA pixel per drawn geometry.
        this.drawElementOffsets[key] = new Int32Array(allocator.reservedSpace)
        this.drawElementCounts[key] = new Int32Array(allocator.reservedSpace)
      }
    }
    if (regen) {
      for (let i = 0; i < this.drawOrderToIndex.length; i++) this.dirtyGeomItems.add(i)
    }

    const elementSize = 4 //  Uint32Array for UNSIGNED_INT
    this.dirtyGeomItems.forEach((itemIndex) => {
      const glGeomItem = this.glGeomItems[itemIndex]!
      if (!glGeomItem || !glGeomItem.isVisible()) return
      const offsetAndCount = this.renderer.glGeomLibrary.getGeomOffsetAndCount(glGeomItem.geomId)
      const geomBuffers = this.renderer.glGeomLibrary.getGeomBuffers(glGeomItem.geomId)

      if (glGeomItem.shattered) {
        let subIndex = 0
        const addSubGeoms = (offsets: Uint32Array, counts: Uint8Array | Uint16Array | Uint32Array, type: string) => {
          const allocator = this.drawIdsArraysAllocators[type]
          const drawIdsArray = this.drawIdsArrays[type]
          const drawElementOffsets = this.drawElementOffsets[type]
          const drawElementCounts = this.drawElementCounts[type]
          const allocation = allocator.getAllocation(itemIndex)
          if (!allocation) return

          const materials = geomBuffers.materials

          // if (!this.indexToOffsets[type]) this.indexToOffsets[type] = []
          // this.indexToOffsets[type][itemIndex] = allocation.start

          for (let i = 0; i < offsets.length; i++) {
            // The draw id within this element type. (e.g. TRIANGLES, LINES, POINTS)
            const drawId = allocation.start + i

            drawElementOffsets[drawId] = offsetAndCount[0] + offsets[i] * elementSize
            drawElementCounts[drawId] = counts[i]
            drawIdsArray[drawId * 4 + 0] = glGeomItem.geomItemId
            // Note: a zero value means no sub-geom was being drawn.
            drawIdsArray[drawId * 4 + 1] = subIndex + 1

            // Note: subGeomMaterialIndices is Uint8Array, and 0 means no custom
            // material is assigned to the subGeom.
            // Subtract 1 to get the actual material id.
            if (materials.length > 0 && geomBuffers.subGeomMaterialIndices[i] > 0) {
              const materialId = geomBuffers.subGeomMaterialIndices[i] - 1
              const material = geomBuffers.materials[materialId]

              // @ts-ignore
              this.renderer!.glMaterialLibrary.addMaterial(material)
              const materialAddr = this.renderer!.glMaterialLibrary.getMaterialAllocation(material)
              drawIdsArray[drawId * 4 + 2] = materialAddr.start
            } else {
              drawIdsArray[drawId * 4 + 2] = 0.0
            }
            drawIdsArray[drawId * 4 + 3] = 0 // spare
            subIndex++
          }
        }
        addSubGeoms(geomBuffers.subGeomOffsets['TRIANGLES'], geomBuffers.subGeomCounts['TRIANGLES'], 'TRIANGLES')
        addSubGeoms(geomBuffers.subGeomOffsets['LINES'], geomBuffers.subGeomCounts['LINES'], 'LINES')
        addSubGeoms(geomBuffers.subGeomOffsets['POINTS'], geomBuffers.subGeomCounts['POINTS'], 'POINTS')
      } else {
        let subIndex = 0
        const addSubGeoms = (subGeoms: SubGeom[], type: string) => {
          const allocator = this.drawIdsArraysAllocators[type]
          const drawIdsArray = this.drawIdsArrays[type]
          const drawElementOffsets = this.drawElementOffsets[type]
          const drawElementCounts = this.drawElementCounts[type]
          const allocation = allocator.getAllocation(itemIndex)
          if (!allocation) return

          const materials = geomBuffers.materials

          // if (!this.indexToOffsets[type]) this.indexToOffsets[type] = []
          // this.indexToOffsets[type][itemIndex] = allocation.start

          for (let i = 0; i < subGeoms.length; i++) {
            const subGeom = subGeoms[i]
            // The draw id within this element type. (e.g. TRIANGLES, LINES, POINTS)
            const drawId = allocation.start + i

            drawElementOffsets[drawId] = offsetAndCount[0] + subGeom.offset * elementSize
            drawElementCounts[drawId] = subGeom.count
            drawIdsArray[drawId * 4 + 0] = glGeomItem.geomItemId
            // Note: a zero value means no sub-geom was being drawn.
            drawIdsArray[drawId * 4 + 1] = 0

            if (materials.length > 0 && subGeom.materialId >= 0 && geomBuffers.materials[subGeom.materialId]) {
              const material = geomBuffers.materials[subGeom.materialId]

              // @ts-ignore
              this.renderer!.glMaterialLibrary.addMaterial(material)
              const materialAddr = this.renderer!.glMaterialLibrary.getMaterialAllocation(material)
              drawIdsArray[drawId * 4 + 2] = materialAddr.start
            } else {
              drawIdsArray[drawId * 4 + 2] = 0.0
            }
            drawIdsArray[drawId * 4 + 3] = 0 // spare

            subIndex++
          }
        }
        for (let key in geomBuffers.materialSubGeoms) {
          const allocator = this.drawIdsArraysAllocators[key]
          const allocation = allocator.getAllocation(itemIndex)
          if (!allocation) continue
          const subGeoms = <SubGeom[]>geomBuffers.materialSubGeoms[key]
          addSubGeoms(subGeoms, key)
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
      const reservedSpaceDrawCount = this.drawIdsArraysAllocators[key].reservedSpace
      const unit = renderstate.boundTextures++
      gl.activeTexture(gl.TEXTURE0 + unit)

      const drawIdsTextureSize = MathFunctions.nextPow2(Math.ceil(Math.sqrt(reservedSpaceDrawCount)))
      if (!drawIdsTexture) {
        drawIdsTexture = new GLTexture2D(this.gl, {
          format: 'RGBA',
          type: 'FLOAT',
          width: drawIdsTextureSize,
          height: drawIdsTextureSize,
          filter: 'NEAREST',
          wrap: 'CLAMP_TO_EDGE',
          mipMapped: false,
        })
        this.drawIdsTextures[key] = drawIdsTexture
        regen = true
      } else if (drawIdsTexture.width < drawIdsTextureSize || drawIdsTexture.height < drawIdsTextureSize) {
        drawIdsTexture.resize(drawIdsTextureSize, drawIdsTextureSize)

        for (let i = 0; i < this.drawOrderToIndex.length; i++) this.dirtyGeomItems.add(i)
        regen = true
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
        if (regen) {
          const drawCount = this.drawIdsArraysAllocators[key].allocatedSpace
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
            const data = drawIdsArray.subarray(consumed * 4, (consumed + width) * 4)
            if (data.length != width * 4) {
              throw new Error('Invalid drawIds subarray :' + data.length + ' width:' + width)
            }
            gl.texSubImage2D(gl.TEXTURE_2D, level, x, y, width, height, format, type, data)

            consumed += width
            remaining -= width
          }
        } else {
          const allocator = this.drawIdsArraysAllocators[key]
          this.dirtyGeomItems.forEach((index) => {
            const allocation = allocator.getAllocation(index)
            if (!allocation) return
            const start = allocation.start
            const drawCount = allocation.size

            const xoffset = start % texWidth
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
              const x = (start + consumed) % texWidth
              const y = Math.floor((start + consumed) / texWidth)
              const data = drawIdsArray.subarray((start + consumed) * 4, (start + consumed + width) * 4)
              if (data.length != width * 4) {
                throw new Error('Invalid drawIds subarray :' + data.length + ' width:' + width)
              }
              gl.texSubImage2D(gl.TEXTURE_2D, level, x, y, width, height, format, type, data)
              consumed += width
              remaining -= width
            }
          })
        }
      }

      gl.bindTexture(gl.TEXTURE_2D, null)
      renderstate.boundTextures--
    }
    for (let key in this.drawIdsArrays) {
      // TODO: Only re-upload the dirty items.
      updateDrawIdsTexture(key)
    }
    this.dirtyGeomItems = new Set()
    this.drawIdsBufferDirty = false
  }

  // ////////////////////////////////////
  // Selected Items

  /**
   * The updateHighlightedIDsBuffer method.
   * @param {RenderState} renderstate - The object used to track state changes during rendering.
   */
  updateHighlightedIDsBuffer(renderstate: RenderState) {
    if (this.highlightedIdsBufferDirty) {
      // Clear all previous highlight buffers.
      // Note: we could considerably simplify the following code if we don't plan on
      // incrementally updating the highlight code.
      this.highlightedIdsArraysAllocators = {}
      this.highlightedIdsArray = {}
      this.highlightElementOffsets = {}
      this.highlightElementCounts = {}

      for (let key in this.highlightedItems) {
        const index = Number.parseInt(key)
        const subGeomIndices = this.highlightedItems[key]
        const glGeomItem = this.glGeomItems[index]!

        const geomBuffers = this.renderer.glGeomLibrary.getGeomBuffers(glGeomItem.geomId)
        let drawCounts: Record<string, number> = {
          TRIANGLES: 0,
          LINES: 0,
          POINTS: 0,
        }
        if (subGeomIndices.length > 0) {
          // for shattered geoms, we draw once for each subgeom for each element type
          subGeomIndices.forEach((subGeomIndex: number) => {
            if (subGeomIndex < geomBuffers.subGeomCounts['TRIANGLES'].length) drawCounts['TRIANGLES'] += 1
            else {
              const linesSubGeomIndex = subGeomIndex - geomBuffers.subGeomCounts['TRIANGLES'].length
              if (linesSubGeomIndex < geomBuffers.subGeomCounts['LINES'].length) drawCounts['LINES'] += 1
              else {
                const pointsSubGeomIndex = linesSubGeomIndex - geomBuffers.subGeomCounts['LINES'].length
                if (pointsSubGeomIndex < geomBuffers.subGeomCounts['POINTS'].length) drawCounts['POINTS'] += 1
              }
            }
          })
        } else {
          // for non-shattered geoms, we just draw once for each element type per GeomItem.
          for (let key in geomBuffers.counts) {
            if (geomBuffers.counts[key] > 0) drawCounts[key] = 1
          }
        }
        for (let key in drawCounts) {
          const drawCount = drawCounts[key]
          if (drawCount == 0) continue
          if (!this.highlightedIdsArraysAllocators[key]) {
            this.highlightedIdsArraysAllocators[key] = new Allocator1D()
          }
          this.highlightedIdsArraysAllocators[key].allocate(index, drawCount)
        }
      }

      // let regen = false
      for (let key in this.highlightedIdsArraysAllocators) {
        const allocator = this.highlightedIdsArraysAllocators[key]
        if (!this.highlightElementCounts[key] || allocator.reservedSpace > this.highlightElementCounts[key].length) {
          // if (this.highlightElementCounts[key] && allocator.reservedSpace > this.highlightElementCounts[key].length) regen = true
          this.highlightedIdsArray[key] = new Float32Array(allocator.reservedSpace * 4) // one RGBA pixel per drawn geometry.
          this.highlightElementOffsets[key] = new Int32Array(allocator.reservedSpace)
          this.highlightElementCounts[key] = new Int32Array(allocator.reservedSpace)
        }
      }

      const elementSize = 4 //  Uint32Array for UNSIGNED_INT
      for (let key in this.highlightedItems) {
        const itemIndex = Number.parseInt(key)
        const subGeomIndices = this.highlightedItems[key]
        const glGeomItem = this.glGeomItems[itemIndex]!
        const offsetAndCount = this.renderer.glGeomLibrary.getGeomOffsetAndCount(glGeomItem.geomId)
        const geomBuffers = this.renderer.glGeomLibrary.getGeomBuffers(glGeomItem.geomId)

        if (subGeomIndices.length != 0) {
          // let subIndex = 0
          subGeomIndices.forEach((subGeomIndex, index) => {
            const addSubGeom = (
              offsets: Uint32Array,
              counts: Uint8Array | Uint16Array | Uint32Array,
              type: string,
              subIndex: number
            ) => {
              const allocator = this.highlightedIdsArraysAllocators[type]
              const drawIdsArray = this.highlightedIdsArray[type]
              const drawElementOffsets = this.highlightElementOffsets[type]
              const drawElementCounts = this.highlightElementCounts[type]
              const allocation = allocator.getAllocation(itemIndex)

              // for (let i = 0; i < offsets.length; i++) {
              const drawId = allocation.start + index

              drawElementOffsets[drawId] = offsetAndCount[0] + offsets[subIndex] * elementSize
              drawElementCounts[drawId] = counts[subIndex]
              drawIdsArray[drawId * 4 + 0] = glGeomItem.geomItemId
              drawIdsArray[drawId * 4 + 1] = subGeomIndex + 1
              drawIdsArray[drawId * 4 + 2] = 0.0 // materialId
              drawIdsArray[drawId * 4 + 3] = 0.0 // spare
            }
            if (subGeomIndex < geomBuffers.subGeomCounts['TRIANGLES'].length) {
              addSubGeom(
                geomBuffers.subGeomOffsets['TRIANGLES'],
                geomBuffers.subGeomCounts['TRIANGLES'],
                'TRIANGLES',
                subGeomIndex
              )
            } else {
              const linesSubGeomIndex = subGeomIndex - geomBuffers.subGeomCounts['TRIANGLES'].length
              if (linesSubGeomIndex < geomBuffers.subGeomCounts['LINES'].length) {
                addSubGeom(
                  geomBuffers.subGeomOffsets['LINES'],
                  geomBuffers.subGeomCounts['LINES'],
                  'LINES',
                  linesSubGeomIndex
                )
              } else {
                const pointsSubGeomIndex = linesSubGeomIndex - geomBuffers.subGeomCounts['LINES'].length
                if (pointsSubGeomIndex < geomBuffers.subGeomCounts['POINTS'].length) {
                  // addSubGeoms(geomBuffers.subGeomOffsets['LINES'], geomBuffers.subGeomCounts['LINES'], 'LINES', pointsSubGeomIndex)
                }
              }
            }
          })
        } else {
          for (let key in geomBuffers.offsets) {
            const count = geomBuffers.counts[key]
            if (count == 0) continue
            const offset = geomBuffers.offsets[key]
            const allocator = this.highlightedIdsArraysAllocators[key]
            const allocation = allocator.getAllocation(itemIndex)
            const drawId = allocation.start
            this.highlightElementOffsets[key][drawId] = offsetAndCount[0] + offset * elementSize
            this.highlightElementCounts[key][drawId] = count
            this.highlightedIdsArray[key][drawId * 4 + 0] = glGeomItem.geomItemId
          }
        }
      }

      this.highlightedIdsBufferDirty = false
    }

    const gl = this.renderer.gl
    if (!gl.multiDrawElements) {
      return
    }

    const updateDrawIdsTexture = (key: string) => {
      const drawIdsArray = this.highlightedIdsArray[key]
      if (!drawIdsArray || drawIdsArray.length == 0) return
      let drawIdsTexture = this.highlightedIdsTextures[key]
      const reservedSpaceDrawCount = this.highlightedIdsArraysAllocators[key].reservedSpace
      const unit = renderstate.boundTextures++
      gl.activeTexture(gl.TEXTURE0 + unit)

      const drawIdsTextureSize = MathFunctions.nextPow2(Math.ceil(Math.sqrt(reservedSpaceDrawCount)))
      if (!drawIdsTexture) {
        drawIdsTexture = new GLTexture2D(this.gl, {
          format: 'RGBA',
          type: 'FLOAT',
          width: drawIdsTextureSize,
          height: drawIdsTextureSize,
          filter: 'NEAREST',
          wrap: 'CLAMP_TO_EDGE',
          mipMapped: false,
        })
        this.highlightedIdsTextures[key] = drawIdsTexture
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

        const drawCount = this.highlightedIdsArraysAllocators[key].allocatedSpace
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
          const data = drawIdsArray.subarray(consumed * 4, (consumed + width) * 4)
          if (data.length != width * 4) {
            throw new Error('Invalid drawIds subarray :' + data.length + ' width:' + width)
          }
          gl.texSubImage2D(gl.TEXTURE_2D, level, x, y, width, height, format, type, data)
          consumed += width
          remaining -= width
        }
      }

      gl.bindTexture(gl.TEXTURE_2D, null)
      renderstate.boundTextures--
    }
    for (let key in this.highlightedIdsArray) {
      // TODO: Only re-upload the dirty items.
      updateDrawIdsTexture(key)
    }
  }
  // ////////////////////////////////////
  // Drawing

  /**
   * The draw method.
   * @param {RenderState} renderstate - The object tracking the current state of the renderer
   */
  draw(renderstate: RenderState) {
    if (this.drawOrderToIndex.length == 0) {
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
      this.drawIdsArraysAllocators
    )
  }

  /**
   * The drawGeomData method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  drawGeomData(renderstate: GeomDataRenderState) {
    if (this.drawIdsBufferDirty) {
      this.updateDrawIDsBuffer(renderstate)
    }

    const gl = this.renderer.gl
    const unifs = renderstate.unifs
    const { drawIdsTexture, geomType } = unifs

    const counts: Record<string, Int32Array> = this.drawElementCounts
    const offsets: Record<string, Int32Array> = this.drawElementOffsets
    const drawIdsTextures: Record<string, GLTexture2D> = this.drawIdsTextures
    const allocators: Record<string, Allocator1D> = this.drawIdsArraysAllocators
    const drawIdsArray: Record<string, Float32Array> = this.drawIdsArrays

    renderstate.bindViewports(unifs, () => {
      if (drawIdsArray['TRIANGLES'] && allocators['TRIANGLES'].allocatedSpace > 0) {
        drawIdsTextures['TRIANGLES'].bindToUniform(renderstate, drawIdsTexture)

        if (geomType) gl.uniform1i(geomType.location, GeomType.TRIANGLES)

        this.multiDrawMeshes(
          renderstate,
          drawIdsArray['TRIANGLES'],
          counts['TRIANGLES'],
          offsets['TRIANGLES'],
          allocators['TRIANGLES'].allocatedSpace
        )
      }
    })

    //  Note: lines in VR are not fattened...
    const enableLineFattening = true
    if (renderstate.geomDataFbo && enableLineFattening) {
      if (!this.linesGeomDataBuffer) {
        this.linesGeomDataBuffer = new GLTexture2D(gl, {
          type: this.renderer.floatGeomBuffer ? 'FLOAT' : 'UNSIGNED_BYTE',
          format: 'RGBA',
          filter: 'NEAREST',
          width: 1,
          height: 2,
        })
        this.fattenLinesShader = new FattenLinesShader(gl)
        this.quad = new GLMesh(gl, new Plane(1, 1))
      }

      const geomDataFbo = renderstate.geomDataFbo
      const width = geomDataFbo.width
      const height = geomDataFbo.height

      if (this.linesGeomDataBuffer.width != width || this.linesGeomDataBuffer.height != height) {
        if (this.fbo) {
          gl.deleteFramebuffer(this.fbo)
          this.fbo = null
        }

        this.linesGeomDataBuffer.resize(width, height)

        this.fbo = gl.createFramebuffer()

        const colorTex = this.linesGeomDataBuffer.glTex
        const depthBuffer = geomDataFbo.__depthTexture // Share the existing depth buffer.
        if (gl.name == 'webgl2') {
          gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.fbo)
          gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, colorTex, 0)
          gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, depthBuffer, 0)
        } else {
          gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo)
          gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, colorTex, 0)
          gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, depthBuffer, 0)
        }
        checkFramebuffer(gl, width, height)
      } else {
        if (gl.name == 'webgl2') gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.fbo)
        else gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo)
      }

      gl.colorMask(true, true, true, true)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT) // do not clear depth
    }

    // this.bindAndRender(
    //   renderstate,
    //   this.drawIdsArrays,
    //   this.drawElementCounts,
    //   this.drawElementOffsets,
    //   this.drawIdsTextures,
    //   this.drawIdsArraysAllocators
    // )
    renderstate.bindViewports(unifs, () => {
      if (drawIdsArray['LINES'] && allocators['LINES'].allocatedSpace > 0) {
        drawIdsTextures['LINES'].bindToUniform(renderstate, drawIdsTexture)

        if (geomType) gl.uniform1i(geomType.location, GeomType.LINES)

        // When debugging the lines geomdata buffer, we can enable this line to make lines draw yellow.
        // const { passId } = renderstate.unifs
        // if (passId) {
        //   gl.uniform1i(passId.location, 99)
        // }

        this.multiDrawLines(
          renderstate,
          drawIdsArray['LINES'],
          counts['LINES'],
          offsets['LINES'],
          allocators['LINES'].allocatedSpace
        )
      }
      if (drawIdsArray['POINTS'] && allocators['POINTS'].allocatedSpace > 0) {
        drawIdsTextures['POINTS'].bindToUniform(renderstate, drawIdsTexture)

        if (geomType) gl.uniform1i(geomType.location, GeomType.POINTS)

        this.multiDrawPoints(
          renderstate,
          drawIdsArray['POINTS'],
          counts['POINTS'],
          offsets['POINTS'],
          allocators['POINTS'].allocatedSpace
        )
      }
    })

    if (this.linesGeomDataBuffer && renderstate.geomDataFbo && enableLineFattening) {
      renderstate.boundRendertarget = null
      renderstate.geomDataFbo.bindForWriting(renderstate)

      // cache the previously bound shader.
      const geomDataShader = renderstate.glShader
      const geomDataShaderKey = renderstate.shaderkey

      this.fattenLinesShader!.bind(renderstate)
      gl.disable(gl.DEPTH_TEST)
      const { colorTexture, screenSize } = renderstate.unifs
      this.linesGeomDataBuffer!.bindToUniform(renderstate, colorTexture)

      const geomDataFbo = renderstate.geomDataFbo
      gl.uniform2f(screenSize.location, geomDataFbo.width, geomDataFbo.height)

      this.quad!.bindAndDraw(renderstate)
      gl.enable(gl.DEPTH_TEST)

      // Re-bind the previously bound geomdata shader.
      geomDataShader.bind(renderstate, geomDataShaderKey)
      this.renderer.glGeomLibrary.bind(renderstate)
      this.renderer.glMaterialLibrary.bind(renderstate)
    }
  }

  /**
   * The drawHighlighted method.
   * @param {RenderState} renderstate - The object tracking the current state of the renderer
   */
  drawHighlighted(renderstate: RenderState) {
    if (Object.keys(this.highlightedItems).length == 0) {
      return
    }
    if (this.highlightedIdsBufferDirty) {
      this.updateHighlightedIDsBuffer(renderstate)
    }
    // console.log(this.highlightedIdsArray)
    // console.log(this.highlightElementCounts)
    // console.log(this.highlightElementOffsets)

    const gl = this.renderer.gl
    gl.disable(gl.CULL_FACE) // 2-sided rendering of highlight geoms.

    this.bindAndRender(
      renderstate,
      this.highlightedIdsArray,
      this.highlightElementCounts,
      this.highlightElementOffsets,
      this.highlightedIdsTextures,
      this.highlightedIdsArraysAllocators
    )
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
    // to retrieve the geomItemId.
    // if (unifs.instancedDraw) {
    //   gl.uniform1i(renderstate.unifs.instancedDraw.location, 1)
    // }

    gl.depthFunc(gl.LEQUAL)

    const { drawIdsTexture, geomType } = renderstate.unifs

    renderstate.bindViewports(unifs, () => {
      if (drawIdsArray['POINTS'] && allocators['POINTS'].allocatedSpace > 0) {
        drawIdsTextures['POINTS'].bindToUniform(renderstate, drawIdsTexture)

        if (geomType) gl.uniform1i(geomType.location, GeomType.POINTS)

        this.multiDrawPoints(
          renderstate,
          drawIdsArray['POINTS'],
          counts['POINTS'],
          offsets['POINTS'],
          allocators['POINTS'].allocatedSpace
        )
      }
      if (drawIdsArray['LINES'] && allocators['LINES'].allocatedSpace > 0) {
        drawIdsTextures['LINES'].bindToUniform(renderstate, drawIdsTexture)

        if (geomType) gl.uniform1i(geomType.location, GeomType.LINES)

        this.multiDrawLines(
          renderstate,
          drawIdsArray['LINES'],
          counts['LINES'],
          offsets['LINES'],
          allocators['LINES'].allocatedSpace
        )
      }
      if (drawIdsArray['TRIANGLES'] && allocators['TRIANGLES'].allocatedSpace > 0) {
        drawIdsTextures['TRIANGLES'].bindToUniform(renderstate, drawIdsTexture)

        if (geomType) gl.uniform1i(geomType.location, GeomType.TRIANGLES)

        this.multiDrawMeshes(
          renderstate,
          drawIdsArray['TRIANGLES'],
          counts['TRIANGLES'],
          offsets['TRIANGLES'],
          allocators['TRIANGLES'].allocatedSpace
        )
      }
    })

    // Reset to drawing triangles in case the shader is used
    // to draw a regular mesh next.
    if (geomType) gl.uniform1i(geomType.location, 0)
  }

  multiDrawMeshes(
    renderstate: RenderState,
    drawIds: Float32Array,
    counts: Int32Array,
    offsets: Int32Array,
    drawCount: number
  ) {
    const gl = this.gl
    if (gl.multiDrawElements) {
      gl.multiDrawElements(gl.TRIANGLES, counts, 0, gl.UNSIGNED_INT, offsets, 0, drawCount)
    } else {
      const { geomItemId } = renderstate.unifs
      for (let i = 0; i < drawCount; i++) {
        gl.uniform1i(geomItemId.location, drawIds[i * 4])
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
    const gl = this.gl

    // // don't rely on z-Buffer for line, disable depth check
    // gl.disable(gl.DEPTH_TEST)

    // // enable stencil buffer check instead
    // gl.enable(gl.STENCIL_TEST)

    // gl.stencilMask(0x00)

    // // render line only where stencil buffer was incremented exactly twice
    // gl.stencilFunc(gl.EQUAL, 2, 0xff)

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
      const { geomItemId, occluded } = renderstate.unifs
      if (occluded) {
        gl.uniform1i(occluded.location, 0)
      }

      for (let i = 0; i < drawCount; i++) {
        gl.uniform1i(geomItemId.location, drawIds[i * 4])
        gl.drawElements(gl.LINES, counts[i], gl.UNSIGNED_INT, offsets[i])
      }

      if (occluded) {
        gl.uniform1i(occluded.location, 1)
        gl.depthFunc(gl.GREATER)
        for (let i = 0; i < drawCount; i++) {
          gl.uniform1i(geomItemId.location, drawIds[i * 4])
          gl.drawElements(gl.LINES, counts[i], gl.UNSIGNED_INT, offsets[i])
        }
        gl.depthFunc(gl.LEQUAL)
      }
    }

    // restore flags to initial order
    // gl.disable(gl.STENCIL_TEST)
    // gl.enable(gl.DEPTH_TEST)
  }

  multiDrawPoints(
    renderstate: RenderState,
    drawIds: Float32Array,
    counts: Int32Array,
    offsets: Int32Array,
    drawCount: number
  ) {
    const gl = this.gl
    if (gl.multiDrawElements) {
      gl.multiDrawElements(gl.POINTS, counts, 0, gl.UNSIGNED_INT, offsets, 0, drawCount)
      // gl.multiDrawArrays(gl.POINTS, offsets, 0, counts, 0, drawCount)
    } else {
      const { geomItemId } = renderstate.unifs
      for (let i = 0; i < drawCount; i++) {
        gl.uniform1i(geomItemId.location, drawIds[i * 4])
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
    if (this.drawIdsBufferDirty) {
      return
    }
    // The sorting breaks the tellescope dataset is strange ways.
    // disabling for now.
    return
    /*
    const distances: Float32Array = new Float32Array(this.drawOrderToIndex.length)
    this.drawOrderToIndex.forEach((itemIndex) => {
      const glGeomItem = this.glGeomItems[itemIndex]
      if (glGeomItem) {
        const bbox = glGeomItem.geomItem.boundingBoxParam.value
        // Calculate the disance to the surface of the bounding sphere.
        // TODO: calculate the distance the nearest point on the bounding box.
        const center = bbox.center()
        const size = bbox.size()
        const dist = center.distanceTo(viewPos) - size

        distances[itemIndex] = dist
      }
    })
    this.drawOrderToIndex.sort((a, b) => distances[b] - distances[a])

    // Now we re-create the drawElementCounts arrays according to the order of the drawn GLGeomItems.
    // Note: We draw the TRIANGLES, then LINES, then POINTS. We can't draw lines behind transparent geoms.
    // We could simply not bother sorting the lines and points.
    const gl = this.gl
    const drawElementCounts: Record<string, Int32Array> = {}
    const drawElementOffsets: Record<string, Int32Array> = {}
    if (this.drawElementCounts.TRIANGLES) {
      drawElementCounts.TRIANGLES = new Int32Array(this.drawElementCounts.TRIANGLES.length)
      drawElementOffsets.TRIANGLES = new Int32Array(this.drawElementOffsets.TRIANGLES.length)
    }
    if (this.drawElementCounts.TRIANGLES) {
      drawElementCounts.LINES = new Int32Array(this.drawElementCounts.LINES.length)
      drawElementOffsets.LINES = new Int32Array(this.drawElementOffsets.LINES.length)
    }
    if (this.drawElementCounts.POINTS) {
      drawElementCounts.POINTS = new Int32Array(this.drawElementCounts.POINTS.length)
      drawElementOffsets.POINTS = new Int32Array(this.drawElementOffsets.POINTS.length)
    }

    const drawOffsets: Record<string, number> = {
      TRIANGLES: 0,
      LINES: 0,
      POINTS: 0,
    }
    const elementSize = 4 //  Uint32Array for UNSIGNED_INT
    this.drawOrderToIndex.forEach((itemIndex, drawIndex) => {
      const glGeomItem = this.glGeomItems[itemIndex]
      if (glGeomItem) {
        for (let key in this.drawIdsArraysAllocators) {
          const drawOffset = drawOffsets[key]
          const allocation = this.drawIdsArraysAllocators[key].getAllocation(itemIndex)
          if (!allocation) continue

          const geomBuffers = this.renderer.glGeomLibrary.getGeomBuffers(glGeomItem.geomId)
          const offsetAndCount = this.renderer.glGeomLibrary.getGeomOffsetAndCount(glGeomItem.geomId)
          if (allocation.size > 1) {
            for (let i = 0; i < allocation.size; i++) {
              const drawId = drawOffset + i
              drawElementCounts[key][drawId] = glGeomItem.culled ? 0 : geomBuffers.subGeomCounts[key][i]
              drawElementOffsets[key][drawId] = offsetAndCount[0] + geomBuffers.offsets[key] * elementSize
            }
          } else {
            drawElementCounts[key][drawOffset] = glGeomItem.culled ? 0 : geomBuffers.counts[key]
            drawElementOffsets[key][drawOffset] = offsetAndCount[0] + geomBuffers.offsets[key] * elementSize
          }
          if (!this.indexToOffsets[key]) this.indexToOffsets[key] = []
          this.indexToOffsets[key][itemIndex] = drawOffset

          ////////////////////////////////////////
          //
          const drawIdsArray = this.drawIdsArrays[key]
          let drawIdsTexture = this.drawIdsTextures[key]
          const tex = drawIdsTexture
          const texWidth = drawIdsTexture.width
          gl.bindTexture(gl.TEXTURE_2D, tex.glTex)
          const level = 0
          const height = 1
          const format = tex.getFormat()
          const type = tex.getType()

          const startSrc = allocation.start
          const startTgt = drawOffset
          const drawCount = allocation.size

          const xoffset = startTgt % texWidth
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
            const x = (startTgt + consumed) % texWidth
            const y = Math.floor((startTgt + consumed) / texWidth)
            const data = drawIdsArray.subarray((startSrc + consumed) * 4, (startSrc + consumed + width) * 4)
            if (data.length != width * 4) {
              throw new Error('Invalid drawIds subarray :' + data.length + ' width:' + width)
            }
            gl.texSubImage2D(gl.TEXTURE_2D, level, x, y, width, height, format, type, data)

            consumed += width
            remaining -= width
          }
          drawOffsets[key] += allocation.size
        }
        this.indexToDrawIndex[itemIndex] = drawIndex
      }
    })
    this.drawElementCounts = drawElementCounts
    this.drawElementOffsets = drawElementOffsets

    gl.bindTexture(gl.TEXTURE_2D, null)
    */
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy() {
    for (let key in this.drawIdsTextures) {
      this.drawIdsTextures[key].destroy()
    }
    for (let key in this.highlightedIdsTextures) {
      this.highlightedIdsTextures[key].destroy()
    }

    this.emit('destructing')
  }
}

export { GLGeomItemSetMultiDrawCompoundGeom }
