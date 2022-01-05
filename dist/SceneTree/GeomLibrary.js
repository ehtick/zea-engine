/* eslint-disable require-jsdoc */
import { SystemDesc } from '../SystemDesc';
import { BinReader } from './BinReader';
import { PointsProxy, LinesProxy, MeshProxy } from './Geometry/GeomProxies';
import { EventEmitter } from '../Utilities/index';
import { resourceLoader } from './resourceLoader';
// The GeomLibrary parses geometry data using workers.
// This can be difficult to debug, so you can disable this
// by setting the following boolean to false, and uncommenting
// the import of parseGeomsBinary
import { parseGeomsBinary } from './Geometry/parseGeomsBinary';
// @ts-ignore
import GeomParserWorker from 'web-worker:./Geometry/GeomParser-worker.js';
const workerParsing = true;
import { StreamFileParsedEvent } from '../Utilities/Events/StreamFileParsedEvent';
import { RangeLoadedEvent } from '../Utilities/Events/RangeLoadedEvent';
const numCores = SystemDesc.hardwareConcurrency - 1; // always leave one main thread code spare.
let workerId = 0;
const workers = [];
const listeners = [];
const getWorker = (geomLibraryId, fn) => {
    const __workerId = workerId;
    if (!workers[__workerId]) {
        listeners[__workerId] = new Map();
        const worker = new GeomParserWorker();
        worker.onmessage = (event) => {
            const data = event.data;
            listeners[__workerId][data.geomLibraryId](data);
        };
        workers[__workerId] = worker;
    }
    listeners[__workerId][geomLibraryId] = (data) => {
        // The callback should return true when the last data for this
        // geom library is loaded.
        const res = fn(data);
        if (res) {
            // If this geom library has finished loading, then we can check
            // if we still need the worker. EAch worker keeps an array of listeners.
            // One for each GeometryLibrary awaiting geoms to be processed.
            // As we remove a GeometryLibrary callback from the list, once the list
            // reaches zero, we can then terminate the worker and null the reference.
            for (let i = 0; i < listeners.length; i++) {
                if (listeners[i][geomLibraryId]) {
                    // remove the reference to the callback registered for this geom library.
                    delete listeners[i][geomLibraryId];
                    if (Object.keys(listeners[i]).length == 0) {
                        // no more files are loading, we can kill this worker.
                        // Note: this fixed a serious memory leak in our application caused
                        // by workers maintaining references to callbacks that then held refereces
                        // to the GeomLibrary.
                        workers[i].terminate();
                        workers[i] = null;
                    }
                }
            }
        }
    };
    const worker = workers[__workerId];
    workerId = (__workerId + 1) % numCores;
    return worker;
};
/** Class representing a geometry library.
 */
class GeomLibrary extends EventEmitter {
    /**
     * Create a geom library.
     */
    constructor() {
        super();
        this.listenerIDs = {};
        this.__numGeoms = -1;
        this.geoms = [];
        this.basePath = '';
        this.__loadedCount = 0;
        this.__streamInfos = {};
        this.__genBuffersOpts = {};
        this.loadCount = 0;
        this.queue = [];
        this.on('streamFileParsed', (event) => {
            this.loadCount--;
            if (this.loadCount < numCores && this.queue.length) {
                const { geomFileID, geomsData } = this.queue.pop();
                this.readBinaryBuffer(geomFileID, geomsData.buffer, this.loadContext);
            }
        });
        this.clear();
    }
    /**
     * The clear method.
     */
    clear() {
        this.__loadedCount = 0;
        this.__numGeoms = -1;
        this.geoms = [];
    }
    /**
     * The returns true if all the geometries have been loaded and the loaded event has already been emitted.
     * @return - True if all geometries are already loaded, else false.
     */
    isLoaded() {
        return this.__loadedCount == this.__numGeoms;
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
    loadGeomFile(geomFileID, incrementProgress = false) {
        if (incrementProgress)
            resourceLoader.incrementWorkload(1);
        return new Promise((resolve) => {
            const geomFileUrl = this.basePath + geomFileID + '.zgeoms';
            resourceLoader.loadFile('archive', geomFileUrl).then((entries) => {
                const geomsData = entries[Object.keys(entries)[0]];
                const streamFileParsedListenerID = this.on('streamFileParsed', (event) => {
                    if (event.geomFileID == geomFileID) {
                        resourceLoader.incrementWorkDone(1);
                        this.removeListenerById('streamFileParsed', streamFileParsedListenerID);
                        resolve();
                    }
                });
                if (this.loadCount < numCores) {
                    this.loadCount++;
                    this.readBinaryBuffer(geomFileUrl, geomsData.buffer, this.loadContext);
                }
                else {
                    this.queue.splice(0, 0, {
                        geomFileID,
                        geomsData,
                    });
                }
            });
        });
    }
    /**
     * Loads the geometry files for this GeomLibrary.
     * @param geomLibraryJSON - The json data describing the data needed to be loaded by the geom library
     * @param basePath - The base path of the file. (this is theURL of the zcad file without its extension.)
     * @param context - The value param.
     */
    loadGeomFilesStream(geomLibraryJSON, basePath, context) {
        const numGeomFiles = geomLibraryJSON.numGeomsPerFile.length;
        resourceLoader.incrementWorkload(numGeomFiles);
        this.__numGeoms = geomLibraryJSON.numGeoms;
        this.basePath = basePath;
        this.loadContext = context;
        for (let geomFileID = 0; geomFileID < numGeomFiles; geomFileID++) {
            this.loadGeomFile(geomFileID, false);
        }
    }
    /**
     * The setGenBufferOption method.
     * @param key - The key value.
     * @param value - The value param.
     */
    setGenBufferOption(key, value) {
        this.__genBuffersOpts[key] = value;
    }
    /**
     * The setNumGeoms method.
     * @param expectedNumGeoms - The expectedNumGeoms value.
     */
    setNumGeoms(expectedNumGeoms) {
        this.__numGeoms = expectedNumGeoms;
    }
    /**
     * Returns the number of geometries the GeomLibrary has, or will have at the end of loading.
     * @return - The number of geometries.
     */
    getNumGeoms() {
        return this.__numGeoms;
    }
    /**
     * The getGeom method.
     * @param index - The index value.
     * @return - The stored geometry
     */
    getGeom(index) {
        if (index >= this.geoms.length) {
            // console.warn("Geom index invalid:" + index);
            return null;
        }
        return this.geoms[index];
    }
    /**
     * The readBinaryBuffer method.
     * @param geomFileID - The key value.
     * @param buffer - The buffer value.
     * @param context - The context value.
     */
    readBinaryBuffer(geomFileID, buffer, context) {
        const reader = new BinReader(buffer, 0, SystemDesc.isMobileDevice);
        const numGeoms = reader.loadUInt32();
        // Geoms within a given file are offset into the array of geometries of the library.
        // Note: One day, the geom library should already know all the offsets for each file before loading.
        const geomIndexOffset = reader.loadUInt32();
        this.__streamInfos[geomFileID] = {
            total: numGeoms,
            done: 0,
        };
        if (numGeoms == 0) {
            const event = new StreamFileParsedEvent(geomFileID, 0);
            this.emit('streamFileParsed', event);
            return;
        }
        if (this.__numGeoms == -1) {
            // Note: for loading geom streams, we need to know the total number
            // ahead of time to be able to generate accurate progress reports.
            this.__numGeoms = numGeoms;
            // throw("Loading cannot start will we know how many geoms.");
        }
        const toc = reader.loadUInt32Array(numGeoms);
        const numGeomsPerWorkload = Math.max(1, Math.floor(numGeoms / numCores + 1));
        // TODO: Use SharedArrayBuffer once available.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer
        let offset = 0;
        while (offset < numGeoms) {
            const bufferSliceStart = toc[offset];
            let bufferSliceEnd;
            let geomsRange;
            if (offset + numGeomsPerWorkload >= numGeoms) {
                geomsRange = [offset, numGeoms];
                bufferSliceEnd = buffer.byteLength;
            }
            else {
                geomsRange = [offset, offset + numGeomsPerWorkload];
                bufferSliceEnd = toc[geomsRange[1]];
            }
            const bufferSlice = buffer.slice(bufferSliceStart, bufferSliceEnd);
            offset += numGeomsPerWorkload;
            if (workerParsing) {
                // ////////////////////////////////////////////
                // Multi Threaded Parsing
                getWorker(this.getId(), (data) => {
                    return this.__receiveGeomDatas(data);
                }).postMessage({
                    geomLibraryId: this.getId(),
                    geomFileID,
                    toc,
                    geomIndexOffset,
                    geomsRange,
                    isMobileDevice: reader.isMobileDevice,
                    bufferSlice,
                    genBuffersOpts: this.__genBuffersOpts,
                    context: {
                        versions: context.versions,
                    },
                }, [bufferSlice]);
            }
            else {
                // ////////////////////////////////////////////
                // Main Threaded Parsing. Use this to debug the parsing of geoms.
                // const bufferSlice = buffer.slice(toc[0], buffer.byteLength)
                // const geomsRange = [0, numGeoms]
                parseGeomsBinary({
                    geomLibraryId: this.getId(),
                    geomFileID,
                    toc,
                    geomIndexOffset,
                    geomsRange,
                    isMobileDevice: reader.isMobileDevice,
                    bufferSlice,
                    genBuffersOpts: this.__genBuffersOpts,
                    context,
                }, (data) => {
                    this.__receiveGeomDatas(data);
                });
            }
        }
    }
    /**
     * The __receiveGeomDatas method.
     * @private
     * @param data - The data received back from the web worker
     * @return - returns true once all data for this geom library has been loaded.
     */
    __receiveGeomDatas(data) {
        const { geomLibraryId, geomFileID, geomDatas, geomIndexOffset, geomsRange } = data;
        if (geomLibraryId != this.getId())
            throw new Error('Receiving workload for a different GeomLibrary');
        // We are storing a subset of the geoms from a binary file
        // which is a subset of the geoms in an asset.
        // geomIndexOffset: the offset of the file geoms in the asset.
        // geomsRange: the range of geoms in the bin file.
        const offset = geomIndexOffset + geomsRange[0];
        const storedRange = [offset, geomIndexOffset + geomsRange[1]];
        for (let i = 0; i < geomDatas.length; i++) {
            const geomData = geomDatas[i];
            if (!geomData.type)
                continue;
            let proxy;
            switch (geomData.type) {
                case 'Points':
                    proxy = new PointsProxy(geomData);
                    break;
                case 'Lines':
                    proxy = new LinesProxy(geomData);
                    break;
                case 'Mesh':
                case 'Plane': // TODO: Support procedural shape params
                case 'Sphere':
                case 'Cone':
                    proxy = new MeshProxy(geomData);
                    break;
                default:
                    throw new Error('Unsupported Geom type:');
            }
            this.geoms[offset + i] = proxy;
        }
        const event = new RangeLoadedEvent(storedRange);
        this.emit('rangeLoaded', event);
        const loaded = storedRange[1] - storedRange[0];
        // console.log("GeomLibrary Loaded:" + loaded);
        // Each file in the stream has its own counter for the number of
        // geoms, and once each stream file finishes parsing, we fire a signal.
        const streamInfo = this.__streamInfos[geomFileID];
        streamInfo.done += loaded;
        // console.log('__receiveGeomDatas:', geomFileID + ' Loaded:' + streamInfo.done + ' of :' + streamInfo.total)
        if (streamInfo.done == streamInfo.total) {
            const event = new StreamFileParsedEvent(geomFileID, streamInfo.done); // TODO: done returns an 'any' type
            this.emit('streamFileParsed', event);
        }
        // Once all the geoms from all the files are loaded and parsed
        // fire the loaded signal.
        this.__loadedCount += loaded;
        // console.log("this.__loadedCount:" + this.__loadedCount +" this.__numGeoms:" + this.__numGeoms);
        if (this.__loadedCount == this.__numGeoms) {
            // console.log("GeomLibrary Loaded:" + this.__name + " count:" + geomDatas.length + " loaded:" + this.__loadedCount);
            this.emit('loaded');
        }
        // Return true if we are done loading geoms
        // This allows the worker to be shut down and free up memory.
        return this.__loadedCount == this.__numGeoms;
    }
    // ////////////////////////////////////////
    // Persistence
    /**
     * The toJSON method encodes this type as a json object for persistence.
     * @return - Returns the json object.
     */
    toJSON() {
        return {
            numGeoms: this.geoms.length,
        };
    }
    /**
     * The toString method.
     * @return - The return value.
     */
    toString() {
        return JSON.stringify(this.toJSON(), null, 2);
    }
    static shutDownWorkers() {
        workers.forEach((worker, index) => {
            worker.terminate();
        });
    }
}
export { GeomLibrary };
//# sourceMappingURL=GeomLibrary.js.map