/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in */
import { EventEmitter } from '../Utilities/index'
import { zeaDebug } from '../helpers/zeaDebug'
import { TreeItem } from './TreeItem'

/**
 * Class for delegating resource loading, enabling an abstraction of a cloud file system to be implemented.
 *
 * The resource loader can be used to load data, where it provides central tracking of loading progress and functionality to load various file types, including compressed archives.
 * The plugins script must be loaded along with the engine
 *
 * ```html
 *  <script crossorigin src="libs/zea-engine/dist/plugins.umd.js"></script>
 * ```
 *
 * To load a 'text' file.
 * ```javascript
 *   resourceLoader.loadFile('text', url).then((txt) =>{
 *      console.log(txt)
 *   })
 * ```
 *
 * To load a 'JSON' file.
 * ```javascript
 *   resourceLoader.loadFile('json', url).then((txt) =>{
 *      console.log(json)
 *   })
 * ```
 *
 * To load a 'binary' file.
 * ```javascript
 *   resourceLoader.loadFile('binary', url).then((arrayBuffer) =>{
 *      console.log(arrayBuffer.length)
 *   })
 * ```
 *
 * To load an 'archive' file that is a compressed archive containing multiple sub-files.
 * ```javascript
 *   resourceLoader.loadFile('archive', url).then((entries) =>{
 *      console.log(entries)
 *   })
 * ```
 *
 * **Events**
 * * **loaded:** emitted when a file has finished loading
 * * **progressIncremented:** emitted when a loading of processing task has been incremented
 * * **allResourcesLoaded:** emitted when all outstanding resources are loaded. This event can be used to signal the completion of load.
 */
class ResourceLoader extends EventEmitter {
  protected __totalWork: number
  protected __doneWork: number
  protected baseUrl: string = ''
  protected plugins: Record<string, any>
  protected systemUrls: Record<string, string>
  protected __commonResources: Record<string, TreeItem>
  /**
   * Create a resource loader.
   */
  constructor() {
    super()

    this.__totalWork = 0
    this.__doneWork = 0

    this.plugins = {}

    this.systemUrls = {}

    const baseUrl = 'https://storage.googleapis.com/visualive-tmp/zea-engine-resources'
    this.systemUrls['ZeaEngine/Vive.vla'] = baseUrl + '/Vive.vla'
    this.systemUrls['ZeaEngine/Oculus.vla'] = baseUrl + '/Oculus.vla'

    // Common resources are used by systems such at the renderer and VR controllers.
    // Any asset that will probably be used my multiple different independent objects
    // should be loaded here. (For now, it is being used to load VR Controller assets.)
    this.__commonResources = {}
  }

  // /////////////////////////////////////////////////
  // Register plugins.
  registerPlugin(plugin: any): void {
    plugin.init(this)
    this.plugins[plugin.getType()] = plugin
  }

  // /////////////////////////////////////////////////
  // URLS

  /**
   * Given some value, which could be an IR or a path, return the unique identifier.
   * @param {string} value - The file value.
   * @return {string} - The resolved fileId if an adapter is installed, else the original value.
   */
  resolveFileId(value: string): string {
    return value
  }

  /**
   * The resolveFilename method.
   * @deprecated
   * @param {string} value - The file value.
   * @return {string} - The resolved URL if an adapter is installed, else the original value.
   */
  resolveFilename(value: string): string {
    if (!value.includes('/')) return value
    return value.split('/')[1]
  }

  /**
   * Given a file ID, returns a URL. The adaptor that is assigned is responsible for resolving the URL within the file system.
   * @param {string} value - The file value.
   * @return {string} - The resolved URL if an adapter is installed, else the original value.
   */
  resolveURL(value: string): string {
    if (this.systemUrls[value]) return this.systemUrls[value]
    return value
  }

  resourceAvailable(resource: string): boolean {
    console.warn('ResourceAvailable not implemented on resourceLoader')
    return false
  }

  /**
   * The loadURL method.
   * @param {string} resourceId - The resourceId value.
   * @param {string} url - The url value.
   * @param {function} callback - The callback value.
   * @param {boolean} addLoadWork - The addLoadWork value.
   * @return {any} - The return value.
   * @deprecated
   * @private
   */
  loadURL(resourceId: string, url: string, callback: any, addLoadWork = true): any {
    console.warn('Deprecated. Use "#loadUrl".')
    return this.loadUrl(resourceId, url, callback, addLoadWork) // this returns void
  }

  /**
   * The loadUrl method.
   * @param {string} resourceId - The resourceId value.
   * @param {string} url - The url value.
   * @param {function} callback - The callback value.
   * @param {boolean} addLoadWork - The addLoadWork value.
   */
  loadUrl(resourceId: string, url: string, callback: any, addLoadWork = true) {
    console.warn(`deprecated use #loadArchive`)
    this.loadArchive(url).then((entries: any) => {
      callback(entries)
    })
  }

  /**
   * Load an archive file, returning a promise that resolves to the JSON data value.
   * Note: using the resource loader to centralize data loading enables progress to be tracked and displayed
   * @param {string} url - The url of the data to load.
   * @return {Promise} - The promise value.
   */
  loadArchive(url: string): Promise<any> {
    console.warn(`Deprecated. Use "#loadFile('archive', url)".`)
    return this.loadFile('archive', url)
  }

  /**
   * Load a JSON file, returning a promise that resolves to the JSON data value.
   * Note: using the resource loader to centralize data loading enables progress to be tracked and displayed
   * @param {string} url - The url of the data to load.
   * @return {Promise} - The promise value.
   */
  loadJSON(url: string): Promise<any> {
    console.warn(`Deprecated. Use "#loadFile('json', url)".`)
    return this.loadFile('json', url)
  }

  /**
   * Load a text file, returning a promise that resolves to the JSON data value.
   * Note: using the resource loader to centralize data loading enables progress to be tracked and displayed
   * @param {string} url - The url of the data to load.
   * @return {Promise} - The promise value.
   */
  loadText(url: string): Promise<any> {
    console.warn(`Deprecated. Use "#loadFile('text', url)".`)
    return this.loadFile('text', url)
  }

  loadFile(type: any, url: string): Promise<any> {
    const plugin = this.plugins[type]

    if (!plugin) {
      throw new Error(
        `There's no plugin registered for the type of file "${type}". Did you add the plugins script? See: https://docs.zea.live/zea-engine/#/adding-default-plugins`
      )
    }

    this.incrementWorkload()

    const promise = plugin.loadFile(url)

    promise.then(
      () => {
        this.incrementWorkDone()
        this.emit('loaded', { url })
      },
      () => {
        // Error
        this.incrementWorkDone()
      }
    )

    return promise
  }

  /**
   * Returns a previously stored common resource. Typically this would be a VR asset.
   *
   * @param {string} resourceId - The resourceId value.
   * @return {TreeItem|null} - The common resource if it exists
   */
  getCommonResource(resourceId: string): TreeItem | null {
    return this.__commonResources[resourceId]
  }

  /**
   * Saves a common resource for reuse by other tools. Typically this would be a VR asset.
   *
   * @param {string} resourceId - The resourceId value.
   * @param {TreeItem} resource - The common resource to store
   */
  setCommonResource(resourceId: string, resource: TreeItem) {
    this.__commonResources[resourceId] = resource
  }

  /**
   * Load and return a file resource using the specified path.
   * @deprecated
   * @param {string} resourceId - The resourceId value.
   * @return {VLAAsset} - The return value.
   */
  loadCommonAssetResource(resourceId: string) {
    return this.getCommonResource(resourceId)
  }

  // /////////////////////////////////////////////////
  // Work

  /**
   * Add work to the total work pile.. We never know how big the pile will get.
   *
   * @deprecated
   * @param {string} resourceId - The resourceId value.
   * @param {number} amount - The amount value.
   */
  addWork(resourceId: string, amount: number) {
    this.incrementWorkload(amount)
  }

  /**
   * Add work to the 'done' pile. The done pile should eventually match the total pile.
   * @deprecated
   * @param {string} resourceId - The resourceId value.
   * @param {number} amount - The amount value.
   */
  addWorkDone(resourceId: string, amount: number) {
    this.incrementWorkDone(amount)
  }

  /**
   * Increments the amount of work to be done causing a 'progressIncremented' event to be emitted
   * As the workload is incremented, the progress might retract as a lower proportion of the work
   * is then considered done. Only once this work is completed, and the 'incrementWorkDone', the
   * progress will increment.
   *
   * @param {number} amount - The amount value.
   */
  incrementWorkload(amount = 1) {
    this.__totalWork += amount
    const percent = (this.__doneWork / this.__totalWork) * 100
    this.emit('progressIncremented', { percent })
  }

  /**
   * Increments the amount of work done causing a 'progressIncremented' event to be emitted.
   * If 5 items of work have been added using #incrementWorkload, and subsequently 3 items have
   * been completed and #incrementWorkDone called. The progress will be at 3/5, or 60%
   *
   * @param {number} amount - The amount value.
   */
  incrementWorkDone(amount = 1) {
    this.__doneWork += amount

    const percent = (this.__doneWork / this.__totalWork) * 100
    this.emit('progressIncremented', { percent })
    if (this.__doneWork > this.__totalWork) {
      throw new Error('Mismatch between work loaded and work done.')
    }
  }
}

const resourceLoader = new ResourceLoader()

import { ArchiveUnpackerPlugin } from './ResourceLoader/ArchiveUnpackerPlugin'
import { JsonLoaderPlugin } from './ResourceLoader/JsonLoaderPlugin'
import { TextLoaderPlugin } from './ResourceLoader/TextLoaderPlugin'
import { BinaryLoaderPlugin } from './ResourceLoader/BinaryLoaderPlugin'

const archiveUnpackerPlugin = new ArchiveUnpackerPlugin()
resourceLoader.registerPlugin(archiveUnpackerPlugin)

const jsonLoaderPlugin = new JsonLoaderPlugin()
resourceLoader.registerPlugin(jsonLoaderPlugin)

const textLoaderPlugin = new TextLoaderPlugin()
resourceLoader.registerPlugin(textLoaderPlugin)

const binaryLoaderPlugin = new BinaryLoaderPlugin()
resourceLoader.registerPlugin(binaryLoaderPlugin)

export { ResourceLoader, resourceLoader }