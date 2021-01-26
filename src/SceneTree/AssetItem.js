import { Version } from './Version.js'
import { TreeItem } from './TreeItem.js'
import { SelectionSet } from './Groups/SelectionSet.js'
import { GeomLibrary } from './GeomLibrary.js'
import { MaterialLibrary } from './MaterialLibrary.js'
import { Registry } from '../Registry'

/**
 * Represents a TreeItem with rendering and material capabilities.
 *
 * @extends TreeItem
 */
class AssetItem extends TreeItem {
  /**
   * Create an asset item.
   * @param {string} name - The name of the asset item.
   */
  constructor(name) {
    super(name)

    this.__geomLibrary = new GeomLibrary()
    this.__materials = new MaterialLibrary()
    this.loaded = false
  }

  /**
   * Returns the loaded status of current item.
   *
   * @return {boolean} - Returns true if the asset has already loaded its data.
   */
  isLoaded() {
    return this.loaded
  }

  /**
   * Returns the zea engine version as an array with major, minor, patch order.
   *
   * @return {array} - The return value.
   */
  getEngineDataVersion() {
    return this.__engineDataVersion
  }

  /**
   * Returns asset `GeomLibrary` that is in charge of rendering geometry data using workers.
   *
   * @return {GeomLibrary} - The return value.
   */
  getGeometryLibrary() {
    return this.__geomLibrary
  }

  /**
   * Returns `MaterialLibrary` that is in charge of storing all materials of current Item.
   *
   * @return {MaterialLibrary} - The return value.
   */
  getMaterialLibrary() {
    return this.__materials
  }

  /**
   * Returns the scale factor of current item.
   * @return {number} - The return value.
   */
  getUnitsConversion() {
    return this.__unitsScale
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The readBinary method.
   * @param {object} reader - The reader value.
   * @param {object} context - The context value.
   */
  readBinary(reader, context = {}) {
    context.assetItem = this
    context.numTreeItems = 0
    context.numGeomItems = 0

    if (!context.versions['zea-engine']) {
      context.versions['zea-engine'] = new Version(reader.loadStr())
    }
    this.__engineDataVersion = context.versions['zea-engine']

    const loadUnits = () => {
      this.__units = reader.loadStr()
      // Calculate a scale factor to convert
      // the asset units to meters(the scene units)
      let scaleFactor = 1.0
      switch (this.__units) {
        case 'Millimeters':
          scaleFactor = 0.001
          break
        case 'Centimeters':
          scaleFactor = 0.01
          break
        case 'Meters':
          scaleFactor = 1.0
          break
        case 'Kilometers':
          scaleFactor = 1000.0
          break
        case 'Inches':
          scaleFactor = 0.0254
          break
        case 'Feet':
          scaleFactor = 0.3048
          break
        case 'Miles':
          scaleFactor = 1609.34
          break
      }
      this.__unitsScale = scaleFactor

      // Apply units change to existing Xfo (avoid changing tr).
      const localXfoParam = this.getParameter('LocalXfo')
      const xfo = localXfoParam.getValue()
      xfo.sc.scaleInPlace(scaleFactor)
      localXfoParam.setValue(xfo)
    }

    if (context.versions['zea-engine'].compare([0, 0, 6]) > 0) {
      // Loading units modifies our Xfo, which then propagates up
      // the tree forcing a re-computation. Better just do it at
      // the start.
      loadUnits()
    }

    let layerRoot
    const layers = {}
    context.addGeomToLayer = (geomItem, layer) => {
      if (!layers[layer]) {
        if (!layerRoot) {
          layerRoot = new TreeItem('Layers')
          this.addChild(layerRoot, false)
        }
        const group = new SelectionSet(layer)
        layerRoot.addChild(group, false)
        layers[layer] = group
      }
      layers[layer].addItem(geomItem)
    }

    const plcbs = [] // Post load callbacks.
    context.resolvePath = (path, onSucceed, onFail) => {
      if (!path) throw new Error('Path not specified')

      // Note: Why not return a Promise here?
      // Promise evaluation is always async, so
      // all promises will be resolved after the current call stack
      // has terminated. In our case, we want all paths
      // to be resolved before the end of the function, which
      // we can handle easily with callback functions.
      try {
        const item = this.resolvePath(path)
        onSucceed(item)
      } catch (e) {
        // Some paths resolve to items generated during load,
        // so push a callback to re-try after the load is complete.
        plcbs.push(() => {
          try {
            const param = this.resolvePath(path)
            onSucceed(param)
          } catch (e) {
            if (onFail) {
              onFail()
            } else {
              throw new Error(e.message)
            }
          }
        })
      }
    }
    context.addPLCB = (plcb) => plcbs.push(plcb)

    this.__materials.readBinary(reader, context)

    super.readBinary(reader, context)

    if (
      context.versions['zea-engine'].compare([0, 0, 5]) >= 0 &&
      context.versions['zea-engine'].compare([0, 0, 7]) < 0
    ) {
      loadUnits()
    }

    this.loaded = true
    // console.log("numTreeItems:", context.numTreeItems, " numGeomItems:", context.numGeomItems)
  }

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param {object} context - The context value.
   * @return {object} - Returns the json object.
   */
  toJSON(context = {}) {
    context.makeRelative = (path) => {
      const assetPath = this.getPath()
      const start = path.slice(0, assetPath.length)
      for (let i = 0; i < start.length - 1; i++) {
        if (start[i] != assetPath[i]) {
          console.warn('Param Path is not relative to the asset. May not be able to be resolved at load time:' + path)
          return path
        }
      }
      // Relative paths start with a symbol for the root element.
      const relativePath = path.slice(assetPath.length - 1)
      relativePath[0] = '.'
      return relativePath
    }
    context.assetItem = this
    const j = super.toJSON(context)
    return j
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param {object} j - The json object this item must decode.
   * @param {object} context - The context value.
   * @param {function} onDone - Callback function executed when everything is done.
   */
  fromJSON(j, context = {}, onDone) {
    if (!context) context = {}

    context.assetItem = this
    context.numTreeItems = 0
    context.numGeomItems = 0
    if (context.version == undefined) context.version = 0

    context.assetItem = this

    const plcbs = [] // Post load callbacks.
    context.resolvePath = (path, cb) => {
      // Note: Why not return a Promise here?
      // Promise evaluation is always async, so
      // all promisses will be resolved after the current call stack
      // has terminated. In our case, we want all paths
      // to be resolved before the end of the function, which
      // we can handle easily with callback functions.
      if (!path) throw new Error('Path not spcecified')
      const item = this.resolvePath(path)
      if (item) {
        cb(item)
      } else {
        // Some paths resolve to items generated during load,
        // so push a callback to re-try after the load is complete.
        plcbs.push(() => {
          const param = this.resolvePath(path)
          if (param) cb(param)
          else {
            console.warn('Path unable to be resolved:' + path)
          }
        })
      }
    }
    context.addPLCB = (plcb) => plcbs.push(plcb)

    // Avoid loading the FilePath as we are already loading json data.
    // if (j.params && j.params.FilePath) {
    //   delete j.params.FilePath
    // }

    super.fromJSON(j, context)

    // Invoke all the post-load callbacks to resolve any
    // remaning references.
    for (const cb of plcbs) cb()

    if (onDone) onDone()
  }

  // ////////////////////////////////////////
  // Clone and Destroy

  /**
   * The clone method constructs a new tree item, copies its values
   * from this item and returns it.
   *
   * @param {object} context - The context value.
   * @return {TreeItem} - Returns a new cloned tree item.
   */
  clone(context) {
    const cloned = new AssetItem()
    cloned.copyFrom(this, context)
    return cloned
  }

  /**
   * Copies current TreeItem with all its children.
   *
   * @param {TreeItem} src - The tree item to copy from.
   * @param {object} context - The context value.
   */
  copyFrom(src, context) {
    this.__geomLibrary = src.__geomLibrary
    this.__materials = src.__materials
    this.loaded = src.loaded

    if (!src.loaded) {
      src.once('loaded', (event) => {
        const srcLocalXfo = src.getParameter('LocalXfo').getValue()
        const localXfo = this.getParameter('LocalXfo').getValue()
        localXfo.sc = srcLocalXfo.sc.clone()
        this.getParameter('LocalXfo').setValue(localXfo)

        src.getChildren().forEach((srcChildItem) => {
          if (srcChildItem && srcChildItem != AssetItem) {
            this.addChild(srcChildItem.clone(context), false, false)
          }
        })
        this.loaded = true
        this.emit('loaded', event)
      })
    }

    super.copyFrom(src, context)
  }
}

Registry.register('AssetItem', AssetItem)

export { AssetItem }
