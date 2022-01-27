import { Color } from '../../Math/Color'
import { Registry } from '../../Registry'
import { AssetLoadContext } from '../AssetLoadContext'
import { BaseGeomItem } from '../BaseGeomItem'
import { BinReader } from '../BinReader'
import { CloneContext } from '../CloneContext'
import { Material } from '../Material'
import { CADAsset } from './CADAsset'

/**
 * Represents a Body within a CAD Part. A Body is made up of either a single mesh or a collection of meshes, one for each surface.
 * When a zcad file is produced, the tool can  optimize bodies to contain only one mesh to speed up loading of large models, and support bigger models being loaded.
 *
 * **Parameters**
 * * **Material(`MaterialParameter`):** Specifies the material of the geometry item.
 * * **Color(`ColorParameter`):** Specifies the color of the geometry item.
 *
 * @extends BaseGeomItem
 */
class CADBody extends BaseGeomItem {
  /**
   * Creates an instance of CADBody setting up the initial configuration for Material and Color parameters.
   *
   * @param {string} name - The name value.
   */
  constructor(name?: string) {
    super(name)
  }

  /**
   * The clone method constructs a new CADBody, copies its values
   * from this item and returns it.
   *
   * @param context - The CloneContext param.
   * @return - The cloned instance.
   */
  clone(context: CloneContext): CADBody {
    const cloned = new CADBody()
    cloned.copyFrom(this, context)
    return cloned
  }

  // ///////////////////////////
  // Persistence

  /**
   * Initializes CADBody's asset, material, version and layers; adding current `CADBody` Geometry Item toall the layers in reader
   *
   * @param reader - The reader param.
   * @param context - The context param.
   */
  readBinary(reader: BinReader, context: AssetLoadContext): void {
    super.readBinary(reader, context)

    // Note: the bodyDescId is now deprecated as it is part of the parametric surface evaluation code.
    // The BinReader must read the value to continue loading others.
    /* const bodyDescId = */ reader.loadSInt32()

    if (context.versions['zea-cad'].compare([0, 0, 4]) < 0) {
      const materialName = reader.loadStr()
      // const materialName = 'Mat' + this.__bodyDescId;

      const materialLibrary = context.assetItem.getMaterialLibrary()
      let material = materialLibrary.getMaterial(materialName, false)
      if (!material) {
        // console.warn("Body :'" + this.name + "' Material not found:" + materialName);
        // material = materialLibrary.getMaterial('DefaultMaterial');

        material = new Material(materialName, 'SimpleSurfaceShader')
        material.getParameter('BaseColor').setValue(Color.random(0.25))
        context.assetItem.getMaterialLibrary().addMaterial(material)
      }
      this.materialParam.setValue(material)
    }

    if (context.versions['zea-cad'].compare([0, 0, 2]) >= 0 && context.versions['zea-cad'].compare([0, 0, 4]) < 0) {
      this.__layers = reader.loadStrArray()
      // console.log("Layers:", this.__layers)
      // Note: addGeomToLayer should take a 'BaseGeomItem'
      // @ts-ignore
      for (const layer of this.__layers) context.addGeomToLayer(this, layer)
    }
  }
}

Registry.register('CADBody', CADBody)

export { CADBody }
