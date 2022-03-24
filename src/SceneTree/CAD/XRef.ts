import { Xfo } from '../../Math/Xfo'
import { Registry } from '../../Registry'
import { AssetLoadContext } from '../AssetLoadContext'
import { BinReader } from '../BinReader'
import { CloneContext } from '../CloneContext'
import { XfoParameter } from '../Parameters/XfoParameter'
import { CADAsset } from './CADAsset'

/**
 * Represents a view of PMI data. within a CAD assembly.
 *
 * @extends TreeItem
 */
class XRef extends CADAsset {
  /**
   * Creates an instance of XRef setting up the initial configuration for Material and Color parameters.
   *
   * @param {string} name - The name value.
   */
  localXfoParam: XfoParameter
  constructor(name?: string) {
    super(name)
  }

  /**
   * The clone method constructs a new XRef, copies its values
   * from this item and returns it.
   *
   * @param {number} flags - The flags param.
   * @return {XRef} - The return value.
   */
  clone(context?: CloneContext): XRef {
    const cloned = new XRef()
    cloned.copyFrom(this, context)
    return cloned
  }

  // ///////////////////////////
  // Persistence

  /**
   * Initializes XRef's asset, material, version and layers; adding current `XRef` Geometry Item toall the layers in reader
   *
   * @paramreader - The reader param.
   * @param context - The load context param.
   */
  readBinary(reader: BinReader, context: AssetLoadContext): void {
    reader.loadStr() // read type
    const name = reader.loadStr() // read name
    this.setName(name)
    let relativePath = reader.loadStr()

    const xfo = new Xfo()
    if (context.versions['zea-cad'].compare([3, 6, 2]) > 0) {
      xfo.tr = reader.loadFloat32Vec3()
      xfo.ori = reader.loadFloat32Quat()
      this.localXfoParam.value = xfo
    } else {
      // Note: the SpatialBridge now encodes the 'ReferenceName' into the
      // XRef, while CADEx didn't provide one. Use the name if it is provided.
      if (name == '') this.setName(relativePath)
    }

    // /////////////////////////////////////
    // URL
    // If a resources dict has been provided, look it up, else
    // generate a url.
    let url
    if (context.resources) {
      if (context.resources[relativePath]) {
        url = context.resources[relativePath]
      } else {
        // CAD systems seem to have flexible path resolution strategies that we dont yet support.
        // e.g. looking in multiple folders for a file.
        // The relative paths often break.
        // If the user provides a mapping table, we will use it, else
        // we assume files will all be in the same folder.
        if (relativePath.includes('/')) {
          relativePath = relativePath.slice(relativePath.lastIndexOf('/') + 1)
        } else if (relativePath.includes('\\')) {
          relativePath = relativePath.slice(relativePath.lastIndexOf('\\') + 1)
        }
        if (context.resources[relativePath]) {
          url = context.resources[relativePath]
        }
      }
    } else {
      if (relativePath.includes('/')) {
        relativePath = relativePath.slice(relativePath.lastIndexOf('/') + 1)
      } else if (relativePath.includes('\\')) {
        relativePath = relativePath.slice(relativePath.lastIndexOf('\\') + 1)
      }
      // Generate a url relative to the folder of the asset we are currently loading.
      url = context.folder + relativePath + '.zcad'
    }

    if (url) {
      // console.log('resolving XRef:', relativePath, ' > ', url)
      context.incrementAsync()

      // If an XRef already exists to the same zcad file, we can just clone the existing XRef.
      // This means the geometry will only be loaded once, and it will become re-used
      // by the cloned XRefs.
      if (context.xrefs[relativePath]) {
        const xref = context.xrefs[relativePath]
        const copyFromXRef = () => {
          this.copyFrom(xref)
          // // Make sure we keep our name and Xfo.
          this.setName(name)
          this.localXfoParam.value = xfo

          this.loaded = true
          this.emit('loaded')
          context.decrementAsync()
        }
        if (!xref.loaded) {
          xref.on('loaded', copyFromXRef)
        } else {
          copyFromXRef()
        }
      } else {
        context.xrefs[relativePath] = this
        this.load(url, new AssetLoadContext(context)).then(
          () => {
            context.decrementAsync()
          },
          () => {
            context.decrementAsync()
          }
        )
      }
    } else {
      console.warn(`While Loading ${this.getPath()} unable to resolve ${relativePath}`)
    }
  }
}

Registry.register('XRef', XRef)

export { XRef }
