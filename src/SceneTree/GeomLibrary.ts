/* eslint-disable require-jsdoc */
import { SystemDesc } from '../SystemDesc'
import { BinReader } from './BinReader'
import { BaseProxy, PointsProxy, LinesProxy, MeshProxy } from './Geometry/GeomProxies'
import { CompoundGeom } from './Geometry/CompoundGeom'

import { EventEmitter } from '../Utilities/index'
import { resourceLoader } from './resourceLoader'
import { StreamFileParsedEvent } from '../Utilities/Events/StreamFileParsedEvent'
import { RangeLoadedEvent } from '../Utilities/Events/RangeLoadedEvent'
import { BaseGeom } from './Geometry/BaseGeom'
import { AssetLoadContext } from './AssetLoadContext'
import { AssetItem } from './AssetItem'

// The GeomLibrary parses geometry data using workers.
// This can be difficult to debug, so you can disable this
// by setting the following boolean to false, and uncommenting
// the import of parseGeomsBinary

/* NODE_START
// For synchronous loading, uncomment these lines.
// @ts-ignore
import { handleMessage } from './Geometry/GeomParser-worker.js'
class GeomParserWorkerPool extends EventEmitter {
  constructor() {
    super()
  }
  // @ts-ignore
  addTask(taskData, transferables) {
    return new Promise((resolve) => {
      // @ts-ignore
      handleMessage(taskData, (results) => {
        if (results.eventName) {
          this.emit(results.eventName, results)
          return
        }
        resolve(results)
      })
    })
  }
}

// NODE_ELSE */

// @ts-ignore
import GeomParserWorker from 'web-worker:./Geometry/GeomParser-worker.js'
import { WorkerPool } from '../Utilities/WorkerPool'
class GeomParserWorkerPool extends WorkerPool<GeomParserWorker> {
  constructor() {
    super(true)
  }
  constructWorker(): Promise<GeomParserWorker> {
    const worker = new GeomParserWorker()
    return Promise.resolve(worker)
  }
}

// NODE_END

const geomParserWorkerPool = new GeomParserWorkerPool()
let numGeomLibraries = 0

interface StreamInfo {
  total: number
  done: number
}
/** Class representing a geometry library.
 */
class GeomLibrary extends EventEmitter {
  protected assetItem: AssetItem
  protected listenerIDs: Record<string, number> = {}
  protected streamInfos: Record<string, StreamInfo> = {}
  protected genBuffersOpts: Record<string, any> = {}
  protected loadContext?: AssetLoadContext
  protected numGeoms: number = -1
  protected numGeomFiles: number = 1
  protected loadedGeomFiles: number = 0
  private geomFilePromises: Array<Promise<void>> = []
  public geoms: Array<BaseProxy | BaseGeom> = []
  public basePath: string = ''
  public loadedCount: number = 0
  /**
   * Create a geom library.
   */
  constructor(assetItem: AssetItem) {
    super()
    this.assetItem = assetItem
    numGeomLibraries++
  }

  /**
   * The returns true if all the geometries have been loaded and the loaded event has already been emitted.
   * @return - True if all geometries are already loaded, else false.
   */
  isLoaded(): boolean {
    return this.numGeoms == -1 || this.loadedCount == this.numGeoms
  }

  /**
   * Loads a single geometry file for this GeomLibrary.
   *
   * @private
   *
   * @param geomFileID - The index of the file to load
   * @param incrementProgress - If true, the progress bar is incremented and decremented.
   * @return the promise resolves once the file is loaded, but not parsed.
   */
  loadGeomFile(geomFileID: number, incrementProgress = false): Promise<void> {
    if (incrementProgress) resourceLoader.incrementWorkload(1)
    if (!this.geomFilePromises[geomFileID]) {
      this.geomFilePromises[geomFileID] = new Promise((resolve) => {
        const geomFileUrl = this.basePath + geomFileID + '.zgeoms'

        resourceLoader.loadFile('archive', geomFileUrl, false).then((entries: any) => {
          const geomsData = entries[Object.keys(entries)[0]]

          const streamFileParsedListenerID = this.on('streamFileParsed', (event: StreamFileParsedEvent) => {
            if (event.geomFileID == geomFileUrl) {
              if (incrementProgress) resourceLoader.incrementWorkDone(1)

              this.loadedGeomFiles++
              console.log(`GeomFileLoaded :${geomFileID} > ${this.loadedGeomFiles}/${this.numGeomFiles}`)
              this.removeListenerById('streamFileParsed', streamFileParsedListenerID)
              resolve()
            }
          })

          this.readBinaryBuffer(geomFileUrl, geomsData.buffer, this.loadContext)
        })
      })
    }
    return this.geomFilePromises[geomFileID]
  }

  prepareLazyLoad(geomLibraryJSON: Record<string, any>, basePath: string, context: AssetLoadContext) {
    this.numGeomFiles = geomLibraryJSON.numGeomFiles
    this.numGeoms = geomLibraryJSON.numGeoms
    this.basePath = basePath
    this.loadContext = context
  }

  /**
   * Loads the geometry files for this GeomLibrary.
   * @param geomLibraryJSON - The json data describing the data needed to be loaded by the geom library
   * @param basePath - The base path of the file. (this is theURL of the zcad file without its extension.)
   * @param context - The value param.
   */
  loadGeomFilesStream(geomLibraryJSON: Record<string, any>, basePath: string, context: AssetLoadContext): void {
    this.numGeomFiles = geomLibraryJSON.numGeomFiles
    this.numGeoms = geomLibraryJSON.numGeoms
    this.basePath = basePath
    this.loadContext = context

    resourceLoader.incrementWorkload(this.numGeomFiles)
    for (let geomFileID = 0; geomFileID < this.numGeomFiles; geomFileID++) {
      this.loadGeomFile(geomFileID, false)
    }
  }

  /**
   * The setGenBufferOption method.
   * @param key - The key value.
   * @param value - The value param.
   */
  setGenBufferOption(key: string, value: any): void {
    this.genBuffersOpts[key] = value
  }

  /**
   * The setNumGeoms method.
   * @param expectedNumGeoms - The expectedNumGeoms value.
   */
  setNumGeoms(expectedNumGeoms: number): void {
    this.numGeoms = expectedNumGeoms
  }

  /**
   * Returns the number of geometries the GeomLibrary has, or will have at the end of loading.
   * @return - The number of geometries.
   */
  getNumGeoms(): number {
    return this.numGeoms
  }

  /**
   * The getGeom method.
   * @param index - The index value.
   * @return - The stored geometry
   */
  getGeom(index: number): BaseProxy | BaseGeom {
    if (index >= this.geoms.length) {
      // console.warn("Geom index invalid:" + index);
      return null
    }
    return this.geoms[index]
  }

  /**
   * The readBinaryBuffer method.
   * @param geomFileID - The key value.
   * @param buffer - The buffer value.
   * @param context - The context value.
   */
  readBinaryBuffer(geomFileID: string, buffer: ArrayBuffer, context: AssetLoadContext): void {
    const reader = new BinReader(buffer, 0, SystemDesc.isMobileDevice)
    const numGeoms = reader.loadUInt32()

    // Geoms within a given file are offset into the array of geometries of the library.
    // Note: One day, the geom library should already know all the offsets for each file before loading.
    const geomIndexOffset = reader.loadUInt32()
    this.streamInfos[geomFileID] = {
      total: numGeoms,
      done: 0,
    }

    if (numGeoms == 0) {
      const event = new StreamFileParsedEvent(geomFileID, 0)
      this.emit('streamFileParsed', event)
      return
    }
    if (this.numGeoms == -1) {
      // Note: for loading geom streams, we need to know the total number
      // ahead of time to be able to generate accurate progress reports.
      this.numGeoms = numGeoms
    }

    const toc = reader.loadUInt32Array(numGeoms)

    // TODO: Use SharedArrayBuffer once available.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer

    if (numGeomLibraries > 1 || this.numGeomFiles > 1 || context.lazyLoading) {
      // In scenes loading many files, we just load each file on a different worker.
      // This has one big advantage that we don't clone the buffer using the 'slice' method
      // potentially reducing temporary memory consumption by a lot.
      const geomsRange = [0, numGeoms]
      const byteOffset = 0
      geomParserWorkerPool
        .addTask(
          {
            geomFileID,
            toc,
            byteOffset,
            geomIndexOffset,
            geomsRange,
            isMobileDevice: reader.isMobileDevice,
            bufferSlice: buffer,
            genBuffersOpts: this.genBuffersOpts,
            context: {
              versions: context.versions,
            },
          },
          [buffer]
        )
        .then((results) => {
          // @ts-ignore
          this.__receiveGeomDatas(results)
        })
    } else {
      // Often we are loading many small files, and we want as few workloads as possible.
      // e.g. one file per worker.
      // but sometimes we are loading one big file and we need to break the file into chunks
      // to get it processed on all available cores.
      const bytesPerWorkload = 2000000

      let offset = 0
      while (offset < numGeoms) {
        const bufferSliceStart = toc[offset]
        let byteCount = 0
        let offsetEnd = offset
        while (offsetEnd < numGeoms && byteCount < bytesPerWorkload) {
          offsetEnd++
          byteCount = toc[offsetEnd] - bufferSliceStart
        }
        let geomsRange: number[]
        let bufferSliceEnd: number
        if (offsetEnd >= numGeoms) {
          geomsRange = [offset, numGeoms]
          bufferSliceEnd = buffer.byteLength
        } else {
          geomsRange = [offset, offsetEnd]
          bufferSliceEnd = toc[geomsRange[1]]
        }
        const passWholeBuffer = offset == 0 && offsetEnd == numGeoms
        const byteOffset = passWholeBuffer ? 0 : toc[geomsRange[0]]
        const bufferSlice = passWholeBuffer ? buffer : buffer.slice(bufferSliceStart, bufferSliceEnd)
        offset = offsetEnd

        // ////////////////////////////////////////////
        // Multi Threaded Parsing
        geomParserWorkerPool
          .addTask(
            {
              geomFileID,
              toc,
              byteOffset,
              geomIndexOffset,
              geomsRange,
              isMobileDevice: reader.isMobileDevice,
              bufferSlice,
              genBuffersOpts: this.genBuffersOpts,
              context: {
                versions: context.versions,
              },
            },
            [bufferSlice]
          )
          .then((results) => {
            // @ts-ignore
            this.__receiveGeomDatas(results)
          })
      }
    }
  }

  /**
   * The __receiveGeomDatas method.
   * @private
   * @param data - The data received back from the web worker
   * @return - returns true once all data for this geom library has been loaded.
   */
  __receiveGeomDatas(results: object): boolean {
    const { geomFileID, geomDatas, geomIndexOffset, geomsRange } = <any>results
    // We are storing a subset of the geoms from a binary file
    // which is a subset of the geoms in an asset.
    // geomIndexOffset: the offset of the file geoms in the asset.
    // geomsRange: the range of geoms in the bin file.
    const offset = geomIndexOffset + geomsRange[0]
    const storedRange = [offset, geomIndexOffset + geomsRange[1]]

    for (let i = 0; i < geomDatas.length; i++) {
      const geomData = geomDatas[i]
      if (!geomData.type) continue
      let proxy
      switch (geomData.type) {
        case 'Points':
          proxy = new PointsProxy(geomData)
          break
        case 'Lines':
          proxy = new LinesProxy(geomData)
          break
        case 'Mesh':
        case 'Plane': // TODO: Support procedural shape params
        case 'Sphere':
        case 'Cone':
          proxy = new MeshProxy(geomData)
          break
        case 'CompoundGeom':
          proxy = new CompoundGeom(geomData, this.assetItem.getMaterialLibrary())
          break
        default:
          throw new Error('Unsupported Geom type:')
      }
      this.geoms[offset + i] = proxy
    }
    const event = new RangeLoadedEvent(storedRange)
    this.emit('rangeLoaded', event)

    const loaded = storedRange[1] - storedRange[0]
    // console.log("GeomLibrary Loaded:" + loaded);

    // Each file in the stream has its own counter for the number of
    // geoms, and once each stream file finishes parsing, we fire a signal.
    const streamInfo = this.streamInfos[geomFileID]
    streamInfo.done += loaded
    // console.log('__receiveGeomDatas:', geomFileID + ' Loaded:' + streamInfo.done + ' of :' + streamInfo.total)
    if (streamInfo.done == streamInfo.total) {
      const event = new StreamFileParsedEvent(geomFileID, streamInfo.done) // TODO: done returns an 'any' type
      this.emit('streamFileParsed', event)
    }

    // Once all the geoms from all the files are loaded and parsed
    // fire the loaded signal.
    this.loadedCount += loaded
    // console.log("this.loadedCount:" + this.loadedCount +" this.numGeoms:" + this.numGeoms);
    if (this.loadedCount == this.numGeoms) {
      // console.log('GeomLibrary Loaded:' + this.assetItem.getName() + ' loaded:' + this.loadedCount)
      this.emit('loaded')
    }

    // Return true if we are done loading geoms
    // This allows the worker to be shut down and free up memory.
    return this.loadedCount == this.numGeoms
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   * @return - Returns the json object.
   */
  toJSON(): Record<string, any> {
    return {
      numGeoms: this.geoms.length,
    }
  }

  /**
   * The toString method.
   * @return - The return value.
   */
  toString(): string {
    return JSON.stringify(this.toJSON(), null, 2)
  }

  /**
   *
   */
  loadMetadata(data: Uint8Array, context: AssetLoadContext): void {
    const reader = new BinReader(data.buffer, 0, SystemDesc.isMobileDevice)
    const toc = reader.loadUInt32Array()
    for (let i = 0; i < toc.length; i++) {
      try {
        const geom = this.geoms[i]
        if (!geom) {
          console.warn('Error loading metadata for geom that was not yet loaded: ', i)
        }
        if (geom instanceof CompoundGeom) {
          reader.seek(toc[i]) // Reset the pointer to the start of the item data.
          geom.loadMetadata(reader, context)
        }
      } catch (e) {
        console.warn('Error loading geom metadata: ', i)
      }
    }
  }
}

export { GeomLibrary }
