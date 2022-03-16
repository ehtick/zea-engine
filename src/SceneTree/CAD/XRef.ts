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

  /**
   * Copies data from the source XRef onto this XRef.
   *
   * @param {XRef} src - The XRef to copy from.
   * @param {object} context - The context value.
   */
  copyFrom(src?: XRef, context?: CloneContext): void {
    // Note: the XRef has a localXfo that positions it relative
    // to the parent assembly. We need to avoid losing that values
    // when cloning all the others.
    const localXfo = this.localXfoParam.value
    super.copyFrom(src, context)
    this.localXfoParam.loadValue(localXfo)
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
      this.localXfoParam.loadValue(xfo)
    } else {
      // Note: the SpatialBridge now encodes the 'ReferenceName' into the
      // XRef, while CADEx didn't provide one. Use the name if it is provided.
      if (name == '') this.setName(relativePath)
    }

    // @ts-ignore will be fixed in #579
    if (!context.resources[relativePath]) {
      // CAD systems seem to have flexible path resolution strategies that we can't support.
      // e.g. looking in multiple folders for a file.
      // The relative paths often break.
      // If the user provides a mapping table, we will use it, else
      // we assume files will all be in the same folder.
      if (relativePath.includes('/')) {
        relativePath = relativePath.slice(relativePath.lastIndexOf('/') + 1)
      } else if (relativePath.includes('\\')) {
        relativePath = relativePath.slice(relativePath.lastIndexOf('\\') + 1)
      }
      // @ts-ignore will be fixed in #579
      if (!context.resources[relativePath]) {
        // @ts-ignore will be fixed in #579
        context.resources[relativePath] = context.folder + relativePath + '.zcad'
      }
    }

    if (context.resources[relativePath]) {
      // console.log('resolving XRef:', relativePath, ' > ', context.resources[relativePath])
      const url = context.resources[relativePath]
      context.incrementAsync()

      // If an XRef already exists to the same zcad file, we can just clone the existing XRef.
      // This means the geometry will only be loaded once, and it will become re-used
      // by the cloned XRefs.
      if (context.xrefs[relativePath]) {
        const xref = context.xrefs[relativePath]
        const copyFromXRef = () => {
          this.copyFrom(xref)
          // Make sure we keep our old name and Xfo.
          this.setName(name)
          this.localXfoParam.loadValue(xfo)
          context.decrementAsync()
        }
        if (!xref.isLoaded()) {
          xref.on('loaded', copyFromXRef)
        } else {
          copyFromXRef()
        }
      } else {
        context.xrefs[relativePath] = this
        this.load(url, new AssetLoadContext(context as AssetLoadContext)).then(
          () => {
            context.decrementAsync()
          },
          () => {
            console.log(`While Loading ${this.getPath()} unable to resolve ${relativePath}`)
            context.decrementAsync()
          }
        )
      }
      // }
    }
  }
}

Registry.register('XRef', XRef)

export { XRef }
