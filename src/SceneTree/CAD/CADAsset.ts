/* eslint-disable no-unused-vars */
import { TreeItem } from '..'
import { Registry } from '../../Registry'
import { SystemDesc } from '../../SystemDesc'
import { AssetItem } from '../AssetItem'
import { AssetLoadContext } from '../AssetLoadContext'
import { BinReader } from '../BinReader'
import { CloneContext } from '../CloneContext'
import { GeomLibrary } from '../GeomLibrary'
import { resourceLoader } from '../resourceLoader'
import { Version } from '../Version'

/**
 * Class for loading zcad files.
 * The CADAsset is a TreeItem and can be added to the scene tree.
 *
 * **Events**
 * * **loaded:** Emitted when the  asset is loaded
 * @extends AssetItem
 */
class CADAsset extends AssetItem {
  cadfileVersion: Version = new Version('0,0,0')
  sdk: string
  url: string
  private metadataLoadPromise: Promise<void>
  private metadataLoaded: boolean = false
  private loadPromise: Promise<any>

  /**
   * Create a CAD asset.
   * @param {string} name - The name value.
   */
  constructor(name?: string) {
    super(name)
  }

  /**
   * The clone method constructs a new CADAsset, copies its values
   * from this item and returns it.
   *
   * @param context - The CloneContext param.
   * @return - The cloned instance.
   */
  clone(context?: CloneContext): CADAsset {
    const cloned = new CADAsset()
    cloned.copyFrom(this, context)
    return cloned
  }

  /**
   * Copies current TreeItem with all its children.
   *
   * @param src - The tree item to copy from.
   * @param context - The context value.
   */
  copyFrom(src: AssetItem, context?: CloneContext): void {
    super.copyFrom(src, context)
    if (!src.loaded) {
      src.once('geomsLoaded', (event) => {
        this.emit('geomsLoaded', event)
      })
    }
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * Returns the version of the data loaded by the CADAsset.
   *
   * @return - The version value.
   */
  getVersion(): Version {
    return this.cadfileVersion
  }

  /**
   * Initializes CADAsset's asset, material, version and layers; adding current `CADAsset` Geometry Item toall the layers in reader
   *
   * @param {BinReader} reader - The reader param.
   * @param {AssetLoadContext} context - The load context object that provides additional data such as the units of the scene we are loading into.
   */
  readRootLevelBinary(reader: BinReader, context: AssetLoadContext): void {
    // Reset the versions dictionary. We don't want a shared context to provide from other asset loads.
    context.versions = {}
    context.versions['zea-cad'] = new Version(reader.loadStr())
    context.sdk = reader.loadStr()
    this.sdk = context.sdk
    this.cadfileVersion = context.versions['zea-cad']
    // console.log('Loading CAD File version:', this.cadfileVersion, ' exported using SDK:', context.cadSDK)

    super.readBinary(reader, context)
  }

  /**
   * Loads all the geometries and metadata from the asset file.
   * @param url - The URL of the asset to load
   * @param context - The load context object that provides additional data such as paths to external references.
   * @return - Returns a promise that resolves once the load of the tree is complete. Geometries, textures and other resources might still be loading.
   */
  load(url: string, context = new AssetLoadContext()): Promise<void> {
    if (this.loadPromise) return this.loadPromise
    this.loadPromise = new Promise((resolve, reject) => {
      const folder = url.lastIndexOf('/') > -1 ? url.substring(0, url.lastIndexOf('/')) + '/' : ''
      const filename = url.lastIndexOf('/') > -1 ? url.substring(url.lastIndexOf('/') + 1) : ''
      const stem = filename.substring(0, filename.lastIndexOf('.'))

      this.url = url

      // Clone the context to avoid modifying the input context
      // which could be shared between assets and supplying desired units values.
      context = context.clone()

      // These values are used by XRef to generate URLS.
      context.assetItem = <AssetItem>this
      context.url = url
      context.folder = folder

      context.on('done', () => {
        this.loaded = true
        // @ts-ignore
        resolve()
        this.emit('loaded')

        // Now check if we have GeomLibraries loading that we need to wait for.
        // We want to emit an event when the entire sub-tree has loaded.
        const promises: Promise<void>[] = []
        if (!this.geomLibrary.isLoaded()) {
          promises.push(new Promise((resolve) => this.geomLibrary.once('loaded', resolve)))
        }
        this.traverse((item: TreeItem) => {
          if (item instanceof CADAsset && !item.geomLibrary.isLoaded()) {
            new Promise((resolve) => item.once('geomsLoaded', resolve))
          }
        })
        Promise.all(promises).then(() => {
          this.emit('geomsLoaded')
        })
      })

      context.incrementAsync()

      // Increment the resource loader counter to provided an update to the progress bar.
      // preload in case we don't have embedded geoms.
      // completed by geomLibrary.on('loaded' ..
      resourceLoader.incrementWorkload(1)
      this.geomLibrary.once('loaded', () => {
        // A chunk of geoms are now parsed, so update the resource loader.
        resourceLoader.incrementWorkDone(1)
      })

      resourceLoader.loadFile('archive', url).then(
        (entries) => {
          if (!(entries.tree2 || entries.tree)) {
            console.error("Corrupt zcad file. Missing 'tree':", url)
            resourceLoader.incrementWorkDone(1)
            context.decrementAsync()
            return
          }

          const treeReader = new BinReader((entries.tree2 || entries.tree).buffer, 0, SystemDesc.isMobileDevice)

          const name = this.getName()
          this.readRootLevelBinary(treeReader, context)

          // Maintain the name provided by the user before loading.
          if (name != '') this.setName(name)

          context.versions['zea-cad'] = this.getVersion()
          context.versions['zea-engine'] = this.getEngineDataVersion()

          if (entries.geoms) {
            this.geomLibrary.readBinaryBuffer(filename, entries.geoms.buffer, context)

            // If metadata is available, load it straight away.
            if (entries.geomsdata) {
              this.geomLibrary.loadMetadata(entries.geomsdata, context)
              this.metadataLoaded = true
            }
          } else if (entries['geomLibrary.json']) {
            const geomLibraryJSON = JSON.parse(new TextDecoder('utf-8').decode(entries['geomLibrary.json']))
            const basePath = folder + stem
            if (geomLibraryJSON.numGeomFiles == 0) {
              console.error("Corrupt zcad file. Missing 'geoms':", url)
              resourceLoader.incrementWorkDone(1)
            } else {
              if (!context.lazyLoading) {
                this.geomLibrary.loadGeomFilesStream(geomLibraryJSON, basePath, context)
              } else {
                this.geomLibrary.prepareLazyLoad(basePath, context)

                resourceLoader.incrementWorkDone(1)
              }
            }
          } else {
            // No geoms in this file, so we won't wait for the 'done' event in the GeomLibrary.
            resourceLoader.incrementWorkDone(1)
          }

          context.decrementAsync()
        },
        (error) => {
          context.decrementAsync()
          resourceLoader.incrementWorkDone(1)
          this.emit('error', error)
          reject(error)
        }
      )
    })

    return this.loadPromise
  }

  /**
   *
   */
  loadMetadata(metaDataUrl: string = ''): Promise<void> {
    if (this.metadataLoaded) return Promise.resolve()
    if (this.metadataLoadPromise) return this.metadataLoadPromise
    this.metadataLoadPromise = new Promise((resolve, reject) => {
      if (this.metadataLoaded) resolve()

      if (metaDataUrl == '') {
        const url = this.url
        const base = url.substring(0, url.lastIndexOf('.'))
        metaDataUrl = base + '.zmetadata'
      }
      console.log(metaDataUrl)
      resourceLoader.incrementWorkload()
      resourceLoader.loadFile('archive', metaDataUrl).then(
        (entries) => {
          const context = new AssetLoadContext()
          context.versions['zea-cad'] = this.getVersion()
          context.versions['zea-engine'] = this.getEngineDataVersion()
          this.geomLibrary.loadMetadata(entries.geomsdata, context)
          resourceLoader.incrementWorkDone(1)
          this.metadataLoaded = true
          resolve()
        },
        (error) => {
          resourceLoader.incrementWorkDone(1)
          this.emit('error', error)
          reject(error)
        }
      )
    })
    return this.metadataLoadPromise
  }
}

Registry.register('CADAsset', CADAsset)

export { CADAsset }
