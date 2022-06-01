/* eslint-disable guard-for-in */
import { EventEmitter, Allocator1D } from '../../Utilities/index'
import { generateShaderGeomBinding, genDataTypeDesc, convertBuffer, IGeomShaderBinding } from './GeomShaderBinding'
import { Points, Lines, Mesh, PointsProxy, LinesProxy, MeshProxy, BaseGeom } from '../../SceneTree/index'
import { GLPoints } from './GLPoints'
import { GLLines } from './GLLines'
import { GLMesh } from './GLMesh'
import { GLGeom } from './GLGeom'
import { GLBaseRenderer } from '../GLBaseRenderer'
import { IndexEvent } from '../../Utilities/Events/IndexEvent'
import { RenderState } from '../RenderStates/index'
import { WebGL12RenderingContext } from '../types/webgl'
import { GeomBuffers } from '../../SceneTree/types/scene'
import { GLAttrBuffer, GLAttrDesc } from '../types/renderer'

// @ts-ignore
// import GLGeomLibraryWorker from 'web-worker:./GLGeomLibrary-worker.js'
// import { WorkerPool } from '../../Utilities/WorkerPool'

// class GLGeomLibraryWorkerPool extends WorkerPool<GLGeomLibraryWorker> {
//   constructor() {
//     super(false)
//   }
//   constructWorker(): Promise<GLGeomLibraryWorker> {
//     const worker = new GLGeomLibraryWorker()
//     return Promise.resolve(worker)
//   }
// }

// const workerPool = new GLGeomLibraryWorkerPool()

const resizeIntArray = (intArray: Int32Array, newSize: number) => {
  const newArray = new Int32Array(newSize)
  newArray.set(intArray)
  return newArray
}

/** Class representing a GL geom.
 * @private
 */
class GLGeomLibrary extends EventEmitter {
  protected renderer: GLBaseRenderer
  protected __gl: WebGL12RenderingContext
  protected freeGeomIndices: number[] = []
  protected geoms: Array<BaseGeom | null> = []
  protected geomRefCounts: number[] = []
  protected geomsDict: Map<EventEmitter, number> = new Map()
  protected glGeomsDict: Map<EventEmitter, GLGeom> = new Map()
  protected geomBuffersTmp: GeomBuffers[] = [] // for each geom, these are the buffer

  protected shaderAttrSpec: Record<string, GLAttrDesc> = {}
  protected glattrbuffers: Record<string, GLAttrBuffer> = {}
  protected shaderBindings: Record<string, IGeomShaderBinding> = {}
  protected attributesBufferNeedsRealloc: boolean = false
  protected attributesBufferNeedsAlloc: string[] = []
  protected attributesAllocator: Allocator1D = new Allocator1D()
  protected dirtyGeomIndices: Set<number> = new Set()
  protected geomVertexOffsets: Int32Array = new Int32Array(1)
  protected geomVertexCounts: Int32Array = new Int32Array(1)
  protected numIndices: number = 0
  protected indicesBufferNeedsRealloc = false
  protected indicesAllocator: Allocator1D = new Allocator1D()
  protected indicesCounts: Int32Array = new Int32Array(1)
  protected indicesOffsets: Int32Array = new Int32Array(1)
  protected indexBuffer: WebGLBuffer | null = null
  freeDataAfterUpload: boolean = true
  protected __destroyed: boolean = false

  /**
   * Create a GLGeomLibrary.
   * @param renderer - The renderer object
   */
  constructor(renderer: GLBaseRenderer) {
    super()

    this.renderer = renderer
    this.__gl = renderer.gl

    // If the allocator ever resizes, then we need to re-upload everything.
    this.attributesAllocator.on('resized', () => {
      this.attributesBufferNeedsRealloc = true
    })
    this.attributesAllocator.on('dataReallocated', (event: any) => {
      // during allocation, a defragment might occur, which means
      // we need to re-upload some of our data.
      const id = event.id
      const allocation = event.allocation
      this.dirtyGeomIndices.add(id)

      this.geomVertexOffsets[id] = allocation.start
      this.geomVertexCounts[id] = allocation.size
    })

    this.freeGeomIndices.push(0)

    // //////////////////////////////////////
    // Indices
    this.indicesAllocator.on('resized', () => {
      // 540M indices == 2Gb of indices, which is the maximum allows by WebGL.
      // This is because WebGL may accept JS arrays which can contain floating point indices.
      // After we have allocated More than 256 Mb of indices, we then force allocations to be limited
      // to the exact allocated space.
      if (Math.log2(this.indicesAllocator.reservedSpace) >= 29) {
        if (Math.log2(this.indicesAllocator.allocatedSpace) >= 29) {
          throw 'Indices buffer too big. WebGL cannot allocate index buffers more than 2Gb'
        }
        // console.log("this.indicesAllocator. capped to':", this.indicesAllocator.allocatedSpace + 1)
        this.indicesAllocator.reservedSpace = (1 << 29) - 1
      }
      this.indicesBufferNeedsRealloc = true
    })
    this.indicesAllocator.on('dataReallocated', (event: any) => {
      // during allocation, a defragment might occur, which means
      // we need to re-upload some of our data.
      const id = event.id
      this.dirtyGeomIndices.add(id)
    })

    // Allocate enough space for 1M verts to begin with. This avoids lots of small
    // copies when loading small files.
    const size = 2 << 19
    this.attributesAllocator.reservedSpace = size
    this.indicesAllocator.reservedSpace = size
    this.attributesBufferNeedsRealloc = true
    this.indicesBufferNeedsRealloc = true
  }

  /**
   * Given a BaseGeom, constructs the GLGeom that manages the state of the geometry in the GPU.
   * @param geom - The geom value.
   * @return - The return value.
   */
  constructGLGeom(geom: BaseGeom): GLGeom {
    let glgeom = this.glGeomsDict.get(geom)
    if (glgeom != undefined) {
      // Increment the ref count for the GLGeom
      // glgeom.addRef(this)
      return glgeom
    }
    const gl = this.__gl
    if (geom instanceof Mesh || geom instanceof MeshProxy) {
      glgeom = new GLMesh(gl, <Mesh>geom)
    } else if (geom instanceof Lines || geom instanceof LinesProxy) {
      glgeom = new GLLines(gl, geom)
    } else if (geom instanceof Points || geom instanceof PointsProxy) {
      glgeom = new GLPoints(gl, geom)
    } else {
      throw new Error('Unsupported geom type:' + geom.constructor.name)
    }
    this.glGeomsDict.set(geom, glgeom)
    glgeom.on('updated', () => {
      this.renderer.requestRedraw()
    })
    glgeom.addRef(this)
    return glgeom
  }

  /**
   * Adds a geom to the GLGeomLibrary.
   *
   * @param geom - The geom to be managed by this GLGeomLibrary.
   * @return - The index of the geom in the GLGeomLibrary
   */
  addGeom(geom: BaseGeom): number {
    let index = this.geomsDict.get(geom)
    if (index != undefined) {
      // Increment the ref count for the GLGeom
      this.geomRefCounts[index]++
      return index
    }
    if (this.freeGeomIndices.length == 0) {
      const prevSize = this.geomVertexCounts.length
      const newSize = prevSize * 2
      this.geomVertexCounts = resizeIntArray(this.geomVertexCounts, newSize)
      this.geomVertexOffsets = resizeIntArray(this.geomVertexOffsets, newSize)
      this.indicesCounts = resizeIntArray(this.indicesCounts, newSize)
      this.indicesOffsets = resizeIntArray(this.indicesOffsets, newSize)
      for (let i = newSize - 1; i >= prevSize; i--) {
        this.freeGeomIndices.push(i)
      }
    }
    index = this.freeGeomIndices.pop()!

    this.geoms[index] = geom
    this.geomRefCounts[index] = 1
    this.geomsDict.set(geom, index)
    this.dirtyGeomIndices.add(index)

    this.geomVertexCounts[index] = 0
    this.geomVertexOffsets[index] = 0
    this.indicesCounts[index] = 0
    this.indicesOffsets[index] = 0

    const geomDataChanged = () => {
      this.dirtyGeomIndices.add(index)
      this.emit('updated')
    }
    const geomDataTopologyChanged = () => {
      this.dirtyGeomIndices.add(index)
      this.emit('updated')
    }
    geom.on('geomDataChanged', geomDataChanged)
    geom.on('geomDataTopologyChanged', geomDataTopologyChanged)

    return index
  }

  /**
   * Removes a Geom managed by this GLGeomLibrary.
   * @param geom - The geom to remove
   */
  removeGeom(geom: BaseGeom): void {
    const index = this.geomsDict.get(geom)

    this.geomRefCounts[index]--

    // If there are still refs to this geom. (GeomItems that use it)
    // then we keep it in the renderer.
    if (this.geomRefCounts[index] > 0) {
      return
    }

    // If the geom was never drawn, and we are already removing it, there may be no allocation.
    if (this.attributesAllocator.getAllocation(index)) {
      this.attributesAllocator.deallocate(index)
    }
    if (this.indicesAllocator.getAllocation(index)) {
      this.indicesAllocator.deallocate(index)
    }
    if (this.dirtyGeomIndices.has(index)) {
      this.dirtyGeomIndices.delete(index)
    }

    this.geomVertexCounts[index] = 0
    this.geomVertexOffsets[index] = 0

    this.geoms[index] = null
    this.freeGeomIndices.push(index)
    this.geomsDict.delete(geom)
    delete this.geomBuffersTmp[index]

    this.indicesCounts[index] = 0
    this.indicesOffsets[index] = 0
  }

  /**
   * Returns a Geom managed by this GLGeomLibrary.
   * @param index - The index of the geom to retrieve
   * @return - The return value.
   */
  getGeom(index: number): BaseGeom {
    return this.geoms[index]
  }

  /**
   * Returns a Geom managed by this GLGeomLibrary.
   * @param index - The index of the geom to retrieve
   * @return - The return value.
   */
  getGeomOffsetAndCount(index: number): number[] {
    return [this.indicesOffsets[index], this.indicesCounts[index]]
  }

  /**
   * Returns a Geom managed by this GLGeomLibrary.
   * @param {number} index - The index of the geom to retrieve
   * @return {array} - The return value.
   */
  getGeomBuffers(index: number) {
    return this.geomBuffersTmp[index]
  }

  // /////////////////////////////////////
  // Buffers

  /**
   * Allocates space for the geomBuffers for the specified geometry
   * @param index - The index of the geom to upload
   */
  private allocateBuffers(index: number): void {
    const geom = this.geoms[index]
    if (!geom) return
    const geomBuffers = geom.genBuffers()

    const numVerts = geomBuffers.numRenderVerts ? geomBuffers.numRenderVerts : geomBuffers.numVertices
    if (this.geomVertexCounts[index] != numVerts) {
      if (numVerts == 0) {
        this.attributesAllocator.deallocate(index)
        this.geomVertexOffsets[index] = 0
        this.geomVertexCounts[index] = 0
      } else {
        const allocation = this.attributesAllocator.allocate(index, numVerts)

        this.geomVertexOffsets[index] = allocation.start
        this.geomVertexCounts[index] = allocation.size
      }
    }

    // eslint-disable-next-line guard-for-in
    for (const attrName in geomBuffers.attrBuffers) {
      if (!this.shaderAttrSpec[attrName]) {
        const attrData = geomBuffers.attrBuffers[attrName]

        this.shaderAttrSpec[attrName] = genDataTypeDesc(this.__gl, attrData.dataType)

        this.attributesBufferNeedsAlloc.push(attrName)
      }
    }

    // //////////////////////////////////////
    // Indices
    if (geomBuffers.indices) {
      const numIndices = geomBuffers.indices.length
      if (this.indicesCounts[index] != numIndices) {
        if (numIndices == 0) {
          this.indicesAllocator.deallocate(index)
          this.indicesOffsets[index] = 0
          this.indicesCounts[index] = 0
        } else {
          const allocation = this.indicesAllocator.allocate(index, numIndices)
          const elementSize = 4 //  Uint32Array for UNSIGNED_INT
          this.indicesOffsets[index] = allocation.start * elementSize // offset is in bytes
          this.indicesCounts[index] = allocation.size
        }
      }
    } else {
      // Note: for non-indexed data, like Points, we provide
      // the vertex data as offset and count in the method
      // getGeomOffsetAndCount.
      this.indicesOffsets[index] = this.geomVertexOffsets[index]
      this.indicesCounts[index] = this.geomVertexCounts[index]
    }

    this.geomBuffersTmp[index] = geomBuffers
  }

  /**
   * Generates the GPU buffers required to store all the geometries
   */
  private genAttributesBuffers(): void {
    // eslint-disable-next-line guard-for-in
    for (const attrName in this.shaderAttrSpec) {
      this.genAttributesBuffer(attrName)
    }

    // Clear this list if it had anything in it.
    this.attributesBufferNeedsAlloc = []
  }

  /**
   * Generates a single GPU buffer
   */
  private genAttributesBuffer(attrName: string): void {
    const reservedSpace = this.attributesAllocator.reservedSpace
    const gl = this.__gl
    {
      const attrSpec = this.shaderAttrSpec[attrName]
      const numValues = reservedSpace * attrSpec.dimension

      const attrBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, attrBuffer)

      const sizeInBytes = numValues * attrSpec.elementSize
      gl.bufferData(gl.ARRAY_BUFFER, sizeInBytes, gl.STATIC_DRAW)

      if (this.glattrbuffers[attrName] && this.glattrbuffers[attrName].buffer) {
        gl.bindBuffer(gl.COPY_WRITE_BUFFER, attrBuffer)
        gl.bindBuffer(gl.COPY_READ_BUFFER, this.glattrbuffers[attrName].buffer)
        gl.copyBufferSubData(
          gl.COPY_READ_BUFFER,
          gl.COPY_WRITE_BUFFER,
          0,
          0,
          this.glattrbuffers[attrName].numValues * attrSpec.elementSize
        )
        gl.deleteBuffer(this.glattrbuffers[attrName].buffer)
      }

      // attrSpec.numValues = numValues // cache for debugging only

      const targetName = attrName == 'textureCoords' ? 'texCoords' : attrName
      this.glattrbuffers[targetName] = {
        name: attrName,
        elementSize: attrSpec.elementSize,
        buffer: attrBuffer,
        dataType: attrSpec.dataType,
        normalized: attrSpec.normalized,
        numValues: numValues,
        dimension: attrSpec.dimension,
        shared: false,
      }
    }
  }

  private genIndicesBuffers(): void {
    // //////////////////////////////////////
    // Indices
    const reservedSpace = this.indicesAllocator.reservedSpace
    if (this.numIndices != reservedSpace) {
      const gl = this.__gl

      const indexBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)

      const elementSize = 4 //  Uint32Array for UNSIGNED_INT
      const sizeInBytes = reservedSpace * elementSize
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, sizeInBytes, gl.STATIC_DRAW)
      if (this.indexBuffer) {
        gl.bindBuffer(gl.COPY_WRITE_BUFFER, indexBuffer)
        gl.bindBuffer(gl.COPY_READ_BUFFER, this.indexBuffer)
        gl.copyBufferSubData(gl.COPY_READ_BUFFER, gl.COPY_WRITE_BUFFER, 0, 0, this.numIndices * elementSize)
        gl.deleteBuffer(this.indexBuffer)
      }

      this.indexBuffer = indexBuffer
      this.numIndices = reservedSpace
    }
  }

  /**
   * The uploadBuffers method.
   * @param index - The index of the geom to upload
   */
  uploadBuffers(index: number): void {
    const gl = this.__gl

    // Note: when we allocate the buffers, we may resize the buffer, which
    // means we need to re-upload geoms that were not changed.
    let geomBuffers = this.geomBuffersTmp[index]
    if (!geomBuffers) {
      const geom = this.geoms[index]
      if (!geom) return
      geomBuffers = geom.genBuffers()
      this.geomBuffersTmp[index] = geomBuffers
    }

    const count = this.geomVertexCounts[index]
    const numVerts = geomBuffers.numRenderVerts ? geomBuffers.numRenderVerts : geomBuffers.numVertices
    if (count != numVerts) {
      throw new Error('Invalid allocation for this geom')
    }
    if (numVerts == 0) {
      const event = new IndexEvent(index)
      this.emit('geomDataChanged', event)
      return
    }

    // eslint-disable-next-line guard-for-in
    for (const attrName in geomBuffers.attrBuffers) {
      const attrSpec = this.shaderAttrSpec[attrName]
      const attrData = geomBuffers.attrBuffers[attrName]
      const glattrbuffer = this.glattrbuffers[attrName]

      // Some geoms might not have all the attributes.
      // and some geoms have more attributes than others.
      if (!attrData || !glattrbuffer) continue

      gl.bindBuffer(gl.ARRAY_BUFFER, glattrbuffer.buffer)
      const elementSize = attrSpec.elementSize
      const offsetInBytes = this.geomVertexOffsets[index] * elementSize * attrSpec.dimension

      const values = convertBuffer(gl, attrData.values, attrSpec)
      gl.bufferSubData(gl.ARRAY_BUFFER, offsetInBytes, values)
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, null)

    // //////////////////////////////////////
    // Indices
    // Note: we sometimes see geometries with zero vertices/indices which means
    // no allocation has yet been made. We can safely skip these.
    if (geomBuffers.indices && geomBuffers.indices.length > 0) {
      const indices = geomBuffers.indices

      const allocation = this.indicesAllocator.getAllocation(index)

      if (allocation.size != indices.length) {
        throw new Error('Invalid allocation for this geom')
      }

      console.log('uploadBuffers:', index, indices.length)
      const attributesAllocation = this.attributesAllocator.getAllocation(index)
      // The indices need to be offset so they they index the new attributes array.
      const offsettedIndices = new Uint32Array(indices.length)

      let i = indices.length - 1
      offsettedIndices[i] = geomBuffers.indices[i] + attributesAllocation.start
      for (let i = 0; i < indices.length; i++) {
        offsettedIndices[i] = geomBuffers.indices[i] + attributesAllocation.start
      }
      // workerPool
      //   .addTask(
      //     {
      //       index,
      //       indices,
      //       offset: attributesAllocation.start,
      //     },
      //     [indices.buffer]
      //   )
      //   .then((results) => {
      //     // @ts-ignore
      //     const offsettedIndices: Uint32Array = results.offsettedIndices
      //     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)
      //     const elementSize = 4 //  Uint32Array
      //     const offsetInBytes = allocation.start * elementSize
      //     gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, offsetInBytes, offsettedIndices)
      //     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
      //   })

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)
      const elementSize = 4 //  Uint32Array
      const offsetInBytes = allocation.start * elementSize
      gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, offsetInBytes, offsettedIndices)
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
    }

    if (this.freeDataAfterUpload) {
      const geom = this.geoms[index]
      geom.freeBuffers()
    }

    this.emit('geomDataChanged', new IndexEvent(index))
  }

  /**
   * Cleans the state of this GeomSet during rendering.
   */
  cleanGeomBuffers(): void {
    // First we allocate all memory needed to clean the GeomSet,
    // and then we start uploading all the data.
    this.dirtyGeomIndices.forEach((index: number) => {
      this.allocateBuffers(index)
    })

    if (this.attributesBufferNeedsRealloc || this.indicesBufferNeedsRealloc) {
      // If the geom buffers are re-allocated, we need to regenerate
      // all the shader bindings.
      for (const shaderkey in this.shaderBindings) {
        const shaderBinding = this.shaderBindings[shaderkey]
        shaderBinding.destroy()
      }
      this.shaderBindings = {}
      if (this.attributesBufferNeedsRealloc) {
        this.genAttributesBuffers()
        this.attributesBufferNeedsRealloc = false
      }
      if (this.indicesBufferNeedsRealloc) {
        this.genIndicesBuffers()
        this.indicesBufferNeedsRealloc = false
      }

      console.log('GLGeomLibrary MemoryAllocation:', this.calcMemoryAllocation())
    } else if (this.attributesBufferNeedsAlloc.length > 0) {
      // Sometimes new attributes are added after the main attributes.
      // e.g. Normals could be computed.
      // We now need to generate those missing buffers.
      this.attributesBufferNeedsAlloc.forEach((attrName) => {
        this.genAttributesBuffer(attrName)
      })
      this.attributesBufferNeedsAlloc = []
    }
    this.dirtyGeomIndices.forEach((index: number) => {
      this.uploadBuffers(index)
    })

    this.dirtyGeomIndices = new Set()
  }

  calcMemoryAllocation() {
    const summary = { attrs: {}, indices: {} }

    const MB = 1 << 20

    for (const attrName in this.shaderAttrSpec) {
      const attrSpec = this.shaderAttrSpec[attrName]
      const reservedSpace = this.attributesAllocator.reservedSpace
      const allocatedSpace = this.attributesAllocator.allocatedSpace
      const numValues = reservedSpace * attrSpec.dimension
      const sizeInBytes = numValues * attrSpec.elementSize
      summary.attrs[attrName] = {
        count: allocatedSpace,
        MB: sizeInBytes / MB,
      }
    }

    const reservedSpace = this.indicesAllocator.reservedSpace
    const allocatedSpace = this.indicesAllocator.allocatedSpace
    const elementSize = 4 //  Uint32Array for UNSIGNED_INT
    const sizeInBytes = reservedSpace * elementSize

    summary.indices = {
      count: allocatedSpace,
      MB: sizeInBytes / MB,
    }

    return summary
  }

  // /////////////////////////////////////
  // Binding

  /**
   * The bind method.
   * @param renderstate - The renderstate value.
   * @return - Returns true if binding was successful
   */
  bind(renderstate: RenderState): boolean {
    if (this.dirtyGeomIndices.size > 0) {
      this.cleanGeomBuffers()
    }

    let shaderBinding = this.shaderBindings[renderstate.shaderkey!]
    if (!shaderBinding) {
      const gl = this.__gl
      shaderBinding = generateShaderGeomBinding(gl, renderstate.attrs, this.glattrbuffers, this.indexBuffer)
      this.shaderBindings[renderstate.shaderkey!] = shaderBinding

      shaderBinding.bind(renderstate)
      {
        // Hack to force the primitive restart index cache to be dirty...
        // https://bugs.webkit.org/show_bug.cgi?id=239015
        // - First draw updates the indexType to be correct (invalid enum -> draw buffer element type)
        const gl = this.__gl
        gl.drawElements(gl.POINTS, 1, gl.UNSIGNED_INT, 0)
        gl.drawElements(gl.LINES, 2, gl.UNSIGNED_INT, 0)
        gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_INT, 0)

        // - dummy subbuffer update marks the cache dirty
        // bufferSubData an array of size 1 at the end of the current allocation.
        const dummyIndices = new Uint32Array(1)
        const elementSize = 4 //  Uint32Array
        const offsetInBytes = this.indicesAllocator.allocatedSpace * elementSize
        gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, offsetInBytes, dummyIndices)
      }
    } else {
      shaderBinding.bind(renderstate)
    }
    return true
  }

  /**
   * The unbind method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  unbind(renderstate: RenderState): void {
    // Unbinding a geom is important as it puts back some important
    // GL state. (vertexAttribDivisor)
    const shaderBinding = this.shaderBindings[renderstate.shaderkey!]
    if (shaderBinding) {
      shaderBinding.unbind(renderstate)
    }
  }

  // /////////////////////////////////////
  // Drawing

  /**
   * The clearBuffers method.
   */
  clearBuffers(): void {
    const gl = this.__gl
    // eslint-disable-next-line guard-for-in
    for (const attrName in this.glattrbuffers) {
      const glbuffer = this.glattrbuffers[attrName]
      if (glbuffer.shared) continue /* This buffer is shared between geoms. do not destroy */
      gl.deleteBuffer(glbuffer.buffer)
    }
    this.glattrbuffers = {}

    if (this.indexBuffer) {
      gl.deleteBuffer(this.indexBuffer)
      this.indexBuffer = null
    }

    // eslint-disable-next-line guard-for-in
    for (const shaderkey in this.shaderBindings) {
      const shaderBinding = this.shaderBindings[shaderkey]
      shaderBinding.destroy()
    }
    this.shaderBindings = {}
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy(): void {
    // this.geoms.forEach((geom) => this.removeGeom(geom))

    this.clearBuffers()

    this.__destroyed = true

    //  Note: PoTree listens to this event. If moved up into RefCounted, make sure it is still emitted.
    this.emit('destructing')
  }
}

export { GLGeomLibrary, resizeIntArray }
