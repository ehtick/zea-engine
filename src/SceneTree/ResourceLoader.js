import { hashStr } from '../Math'
import { EventEmitter } from '../Utilities'
// import { VLAAsset } from './VLAAsset.js'

// const asyncLoading = true;
const ResourceLoaderWorker = require('worker-loader?inline!./ResourceLoader/ResourceLoaderWorker.js')
// For synchronous loading, uncomment these lines.
// import {
//     ResourceLoaderWorker_onmessage
// } from './ResourceLoaderWorker.js';

/**
 * Simple object check.
 * @param {any} item - The item value.
 * @return {boolean} - The return value.
 */
export function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item)
}

/**
 * Deep merge two objects.
 * @param {any} target - The target value.
 * @param {...object} ...sources - The ...sources value.
 * @return {any} - The return value.
 */
export function mergeDeep(target, ...sources) {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key])
          Object.assign(target, {
            [key]: {},
          })
        mergeDeep(target[key], source[key])
      } else {
        Object.assign(target, {
          [key]: source[key],
        })
      }
    }
  }

  return mergeDeep(target, ...sources)
}

/** Class representing a resource loader. */
class ResourceLoader extends EventEmitter {
  /**
   * Create a resource loader.
   */
  constructor() {
    super()
    this.__totalWork = 0
    this.__totalWorkByCategory = {}
    this.__doneWork = 0
    this.__doneWorkByCategory = {}
    this.__resourceRegisterCallbacks = {}
    this.__callbacks = {}
    this.__resources = {}
    this.__resourcesTreeEntities = {}
    this.__resourcesTree = {
      children: {},
    }

    this.__workers = []
    this.__nextWorker = 0

    if (
      window.location.origin.startsWith('https://api.visualive.io') ||
      window.location.origin.startsWith('https://apistage.visualive.io')
    ) {
      // For embeds using the old generated page system.
      this.wasmUrl = 'https://assets-visualive.storage.googleapis.com/oR3y6kdDu'
    } else {
      let visualiveEngineUrl
      const scripts = document.getElementsByTagName('script')
      for (let i = 0; i < scripts.length; i++) {
        const script = scripts[i]
        if (script.src.includes('zea-engine')) {
          visualiveEngineUrl = script.src
          break
        }
      }
      if (!visualiveEngineUrl)
        throw new Error('Unable to determine Zea Engine URL')
      const parts = visualiveEngineUrl.split('/')
      parts.pop()
      parts.pop()
      this.wasmUrl = parts.join('/') + '/public-resources/unpack.wasm'

      this.addResourceURL(
        'ZeaEngine/Vive.vla',
        parts.join('/') + '/public-resources/Vive.vla'
      )
      this.addResourceURL(
        'ZeaEngine/Oculus.vla',
        parts.join('/') + '/public-resources/Oculus.vla'
      )
    }
  }

  /**
   * The getRootFolder method.
   * @return {any} - The return value.
   */
  getRootFolder() {
    return this.__resourcesTree
  }

  /**
   * The registerResourceCallback method.
   * @param {any} filter - The filter value.
   * @param {any} fn - The fn value.
   */
  registerResourceCallback(filter, fn) {
    this.__resourceRegisterCallbacks[filter] = fn

    for (const key in this.__resources) {
      const file = this.__resources[key]
      if (file.name.includes(filter)) fn(file)
    }
  }

  /**
   * The __applyCallbacks method.
   * @param {any} resourcesDict - The resourcesDict value.
   * @private
   */
  __applyCallbacks(resourcesDict) {
    const applyCallbacks = resource => {
      for (const filter in this.__resourceRegisterCallbacks) {
        if (resource.name.includes(filter))
          this.__resourceRegisterCallbacks[filter](resource)
      }
    }
    for (const key in resourcesDict) {
      const resource = resourcesDict[key]
      if (resource.url) applyCallbacks(resource)
    }
  }

  /**
   * The __buildTree method.
   * @param {any} resources - The resources param.
   * @private
   */
  __buildTree(resources) {
    const buildEntity = resourceId => {
      if (this.__resourcesTreeEntities[resourceId]) return

      const resource = resources[resourceId]
      resource.id = resourceId
      if (resource.type === 'folder' || resource.type === 'dependency') {
        resource.children = {}
      }
      if (resource.parent) {
        if (!this.__resourcesTreeEntities[resource.parent]) {
          buildEntity(resource.parent)
        }
      }
      const parent = resource.parent
        ? this.__resourcesTreeEntities[resource.parent]
        : this.__resourcesTree
      // console.log((parent.name ? parent.name + '/' : '') + resource.name)
      parent.children[resource.name] = resource
      this.__resourcesTreeEntities[resourceId] = resource
    }

    for (const key in resources) {
      buildEntity(key)
    }
  }

  /**
   * The setResources method.
   * @param {any} resources - The resources value.
   */
  setResources(resources) {
    this.__resources = Object.assign(this.__resources, resources)
    this.__buildTree(resources)
    this.__applyCallbacks(resources)
  }

  /**
   * The addResourceURL method.
   * @param {any} resourcePath - The resourcePath value.
   * @param {any} url - The url value.
   */
  addResourceURL(resourcePath, url) {
    const parts = resourcePath.split('/')
    const filename = parts.pop()
    if (!url) {
      let rootURL = window.location.href.split('#')[0]
      rootURL = rootURL.split('?')[0]
      if (rootURL.endsWith('.html') || rootURL.endsWith('.html')) {
        rootURL = rootURL.substring(0, rootURL.lastIndexOf('/')) + '/'
      }
      const base = rootURL
      if (parts[0] == '.') parts.shift()
      else if (parts[0] == '..') {
        item = item.substring(3)
        const baseparts = base.split('/')
        baseparts.pop()
        baseparts.pop()
        base = baseparts.join('/') + '/'
      }
      url = base + resourcePath
    }
    let parentId
    const tmp = {}
    for (const part of parts) {
      const key = hashStr(part)
      if (!(key in this.__resources)) {
        this.__resources[key] = {
          name: part,
          type: 'folder',
          parent: parentId,
        }
        tmp[key] = this.__resources[key]
      }
      parentId = key
    }

    const key = hashStr(filename)
    const resource = {
      name: filename,
      url,
      parent: parentId,
      id: key,
    }
    this.__resources[key] = resource

    tmp[key] = resource

    this.__buildTree(tmp)
    this.__applyCallbacks(tmp)
  }

  /**
   * The updateFile method.
   * @param {any} file - The file value.
   */
  updateFile(file) {
    const newFile = !(file.id in this.__resources)
    this.__resources[file.id] = file
    if (newFile) {
      console.log('New file added')
      const resources = {}
      resources[file.id] = file
      this.__buildTree(resources)
    }
    this.emitEvent('fileUpdated', { fileId: file.id })
  }

  /**
   * The freeData method.
   * @param {ArrayBuffer} buffer - The buffer value.
   */
  freeData(buffer) {
    // Note: Explicitly transfer data to a web worker and then
    // terminate the worker. (hacky way to free TypedArray memory explicitly)
    // let worker = new FreeMemWorker();
    // worker.postMessage(buffer, [buffer]);
    // worker.terminate();
  }

  /**
   * The __getWorker method.
   * @return {any} - The return value.
   * @private
   */
  __getWorker() {
    const __constructWorker = () => {
      return new Promise(resolve => {
        const worker = new ResourceLoaderWorker()
        // const worker = new Worker(this.__resourceLoaderFile.url);

        worker.postMessage({
          type: 'init',
          wasmUrl: this.wasmUrl,
        })
        worker.onmessage = event => {
          if (event.data.type === 'WASM_LOADED') {
            resolve(worker)
          } else if (event.data.type === 'FINISHED') {
            const data = event.data

            // const file = this.__resources[event.data.resourceId]
            // const text = [
            //   '==================== unrarWebworker.js ====================',
            //   `Filename: ${file.name}`,
            //   '------------------------------------------------------',
            // ];
            // for(const file in data.entries) {
            //   text.push(`${file}:${data.entries[file].byteLength}`);
            // }
            // console.log(text.join('\n'))

            this.addWorkDone(event.data.resourceId, 1) // loading done...
            this.__onFinishedReceiveFileData(event.data)
          } else if (event.data.type === 'ERROR') {
            const data = event.data
            const file = this.__resources[data.resourceId]
            console.error(
              'Unable to load Resource:',
              file ? file.name : data.resourceId,
              ' With url:',
              data.url
            )
          }
        }
      })
    }

    this.__nextWorker = (this.__nextWorker + 1) % 3
    if (this.__workers[this.__nextWorker] == undefined)
      this.__workers[this.__nextWorker] = __constructWorker()
    return this.__workers[this.__nextWorker]
  }

  /**
   * The __terminateWorkers value.
   * @private
   */
  __terminateWorkers() {
    for (const worker of this.__workers) worker.terminate()
    this.__workers = []
  }

  /**
   * The getFilepath method.
   * @param {any} resourceId - The resourceId value.
   * @return {any} - The return value.
   */
  getFilepath(resourceId) {
    let curr = this.__resources[resourceId]
    const path = [curr.name]
    while (curr.parent) {
      curr = this.__resources[curr.parent]
      path.splice(0, 0, curr.name)
    }
    return path.join('/')
  }

  /**
   * The resourceAvailable method.
   * @param {any} resourceId - The resourceId value.
   * @return {any} - The return value.
   */
  resourceAvailable(resourceId) {
    if (resourceId.indexOf('.') > 0) {
      console.warn(
        'Deprecation warning for resourceAvailable. Value should be a file id, not a path.'
      )
      return this.resolveFilepath(resourceId) != undefined
    }
    return resourceId in this.__resources
  }

  /**
   * The getFile method.
   * @param {any} resourceId - The resourceId value.
   * @return {any} - The return value.
   */
  getFile(resourceId) {
    return this.__resources[resourceId]
  }

  /**
   * The resolveFilePathToId method.
   * @param {any} filePath - The filePath value.
   * @return {any} - The return value.
   */
  resolveFilePathToId(filePath) {
    if (!filePath) {
      console.warn('Invalid file path:', filePath)
      return
    }
    const file = this.resolveFilepath(filePath)
    if (file) return file.id
  }

  /**
   * The resolveFilepath method.
   * @param {any} filePath - The filePath value.
   * @return {any} - The return value.
   */
  resolveFilepath(filePath) {
    const parts = filePath.split('/')
    if (parts[0] == '.' || parts[0] == '') parts.shift()
    let curr = this.__resourcesTree
    for (const part of parts) {
      if (part in curr.children) curr = curr.children[part]
      else {
        console.warn('Unable to resolve key:' + part + ' of path:' + filePath)
        return null
      }
    }
    return curr
  }

  /**
   * The resolveFile method.
   * @param {any} filePath - The filePath value.
   * @return {any} - The return value.
   */
  resolveFile(filePath) {
    console.warn('Deprecation warning for resolveFile. Use resolveFilepath.')
    return this.resolveFilepath(filePath)
  }

  /**
   * The resolveURL method.
   * @param {any} filePath - The filePath value.
   * @return {any} - The return value.
   */
  resolveURL(filePath) {
    console.warn('Deprecation warning for resolveURL. Use resolveFilepath.')
    const file = this.resolveFilepath(filePath)
    if (file) return file.url
  }

  /**
   * Add work to the total work pile.. We never know how big the pile will get.
   * @param {any} resourceId - The resourceId value.
   * @param {any} amount - The amount value.
   */
  addWork(resourceId, amount) {
    this.__totalWork += amount
    const percent = (this.__doneWork / this.__totalWork) * 100
    this.emitEvent('progressIncremented', { percent })
  }

  /**
   * Add work to the 'done' pile. The done pile should eventually match the total pile.
   * @param {any} resourceId - The resourceId value.
   * @param {any} amount - The amount value.
   */
  addWorkDone(resourceId, amount) {
    this.__doneWork += amount

    const percent = (this.__doneWork / this.__totalWork) * 100
    this.emitEvent('progressIncremented', { percent })
    if (this.__doneWork > this.__totalWork) {
      throw new Error('Mismatch between work loaded and work done.')
    }
    if (this.__doneWork == this.__totalWork) {
      this.emitEvent('allResourcesLoaded', {})
    }
  }

  /**
   * The loadResource method.
   * @param {any} resourceId - The resourceId value.
   * @param {any} callback - The callback value.
   * @param {boolean} addLoadWork - The addLoadWork value.
   */
  loadResource(resourceId, callback, addLoadWork = true) {
    const file = this.getFile(resourceId)
    if (!file) {
      throw new Error(
        "Invalid resource Id:'" +
          resourceId +
          "' not found in Resources:" +
          JSON.stringify(this.__resources, null, 2)
      )
    }

    this.loadUrl(resourceId, file.url, callback, addLoadWork)
  }

  /**
   * The loadURL method.
   * @param {any} resourceId - The resourceId value.
   * @param {any} url - The url value.
   * @param {any} callback - The callback value.
   * @param {boolean} addLoadWork - The addLoadWork value.
   * @return {any} - The return value.
   */
  loadURL(resourceId, url, callback, addLoadWork = true) {
    console.warn('Please call loadUrl instead,')
    return this.loadUrl(resourceId, url, callback, addLoadWork)
  }

  /**
   * The loadUrl method.
   * @param {any} resourceId - The resourceId value.
   * @param {any} url - The url value.
   * @param {any} callback - The callback value.
   * @param {boolean} addLoadWork - The addLoadWork value.
   */
  loadUrl(resourceId, url, callback, addLoadWork = true) {
    if (addLoadWork) {
      this.addWork(resourceId, 3) // Add work in 2 chunks. Loading, unpacking, parsing.
    } else {
      // the work for loading and parsing the work is already registered..
      // See BinAsset. It knows that it will load a sequwnce of files
      // and has already registered this work once is determined the
      // toal number of files in the stream.
    }

    if (!(resourceId in this.__callbacks)) this.__callbacks[resourceId] = []
    this.__callbacks[resourceId].push(callback)

    function checkStatus(response) {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} - ${response.statusText}`);
      }
      return response;
    }
    fetch(url)
    .then(response => checkStatus(response) && response.arrayBuffer())
    .then(buffer => {
      this.__getWorker().then(worker => {
        worker.postMessage({
          type: 'unpack',
          resourceId,
          buffer,
        })
      })
    });
  }

  /**
   * The unpackBuffer method.
   * @param {any} resourceId - The resourceId value.
   * @param {Buffer} buffer - The binary buffer to unpack.
   * @param {any} callback - The callback value.
   * @param {boolean} addLoadWork - The addLoadWork value.
   */
  unpackBuffer(resourceId, buffer, callback, addLoadWork = true) {
    return new Promise((resolve, reject) => {
      if (addLoadWork) {
        this.addWork(resourceId, 3) // Add work in 2 chunks. Loading, unpacking, parsing.
      } else {
        // the work for loading and parsing the work is already registered..
        // See BinAsset. It knows that it will load a sequwnce of files
        // and has already registered this work once is determined the
        // toal number of files in the stream.
      }

      if (!(resourceId in this.__callbacks)) this.__callbacks[resourceId] = []
      if (callback)
        this.__callbacks[resourceId].push(callback)
      this.__callbacks[resourceId].push(entries => {
        resolve(entries)
      })

      this.__getWorker().then(worker => {
        worker.postMessage({
          type: 'unpack',
          resourceId,
          buffer,
        }, [buffer])
      })
    });
  }

  /**
   * The __onFinishedReceiveFileData method.
   * @param {any} fileData - The fileData value.
   * @private
   */
  __onFinishedReceiveFileData(fileData) {
    const resourceId = fileData.resourceId
    this.addWorkDone(resourceId, 1) // unpacking done...
    const callbacks = this.__callbacks[resourceId]
    if (callbacks) {
      for (const callback of callbacks) {
        callback(fileData.entries)
      }
      delete this.__callbacks[resourceId]
    }
    this.emitEvent('loaded', { resourceId })
    this.addWorkDone(resourceId, 1) // parsing done...
  }

  /**
   * The suspend method.
   */
  suspend() {
    this.__terminateWorkers()
  }

  /**
   * The traverse method.
   * @param {any} callback - The callback value.
   */
  traverse(callback) {
    const __c = fsItem => {
      for (const childItemName in fsItem.children) {
        __t(fsItem.children[childItemName])
      }
    }
    const __t = fsItem => {
      if (callback(fsItem) == false) return false
      if (fsItem.children) __c(fsItem)
    }
    __c(this.__resourcesTree, 0)
  }
}

const resourceLoader = new ResourceLoader()
export { resourceLoader }
