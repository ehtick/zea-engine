import { SystemDesc } from '../SystemDesc'
import { EventEmitter } from '../Utilities/index'
import { Registry } from '../Registry'
import { Material } from './Material'
import { FileImage } from './Images/index'
import { BaseItem } from './BaseItem'
import { AssetLoadContext, BinReader } from '../SceneTree'
import { BaseImage } from './BaseImage'
import { Parameter } from './Parameters/Parameter'
import { Owner } from './Owner'
import { BaseGeom } from '.'

/** Class representing a material library in a scene tree.
 * @private
 */
class MaterialLibrary extends EventEmitter implements Owner {
  public name: string
  public images: Record<string, BaseImage> = {}
  public materials: Array<Material> = []
  protected __materialsMap: Record<string, number> = {}

  /**
   * Create a material library.
   * @param name - The name of the material library.
   */
  constructor(name: string = 'MaterialLibrary') {
    super()
    this.name = name

    // this.defaultMaterial = new Material('Default', 'SimpleSurfaceShader')
  }

  /**
   * The clear method.
   */
  clear(): void {
    this.images = {}
    this.materials = []
    this.__materialsMap = {}
  }

  /**
   * The getPath method.
   * @return - The return value.
   */
  getPath(): string[] {
    return [this.name]
  }

  /**
   * The resolvePath method traverses the subtree from this item down
   * matching each name in the path with a child until it reaches the
   * end of the path.
   *
   * @param path - The path value.
   * @param index - The index value.
   * @return - The return value.
   */
  resolvePath(path: string | string[], index = 0): BaseItem | Parameter<any> | null {
    return null
  }

  /**
   * The getNumMaterials method.
   * @return - The return value.
   */
  getNumMaterials(): number {
    return this.materials.length
  }

  /**
   * The getMaterials method.
   * @return - The return value.
   */
  getMaterials(): Material[] {
    return this.materials
  }

  /**
   * The getMaterialNames method.
   * @return - The return value.
   */
  getMaterialNames(): string[] {
    const names: Array<string> = []
    this.materials.forEach((material) => {
      names.push(material.getName())
    })
    return names
  }

  /**
   * The hasMaterial method.
   * @param name - The name value.
   * @return - The return value.
   */
  hasMaterial(name: string): boolean {
    return name in this.__materialsMap
  }

  /**
   * Add a material.
   * @param material - The material value.
   */
  addMaterial(material: Material): void {
    material.setOwner(this)
    this.__materialsMap[material.getName()] = this.materials.length
    this.materials.push(material)
  }

  /**
   * The getMaterial method.
   * @param name - The material name.
   * @param assert - The assert value.
   * @return - The return value.
   */
  getMaterial(name: string): Material {
    const index = this.__materialsMap[name]
    if (index == undefined) {
      return null
    }
    return this.materials[index]
  }

  /**
   * The hasImage method.
   * @param name - The material name.
   * @return - The return value.
   */
  hasImage(name: string): boolean {
    return name in this.images
  }

  /**
   * The addImage method.
   * @param image - The image value.
   */
  addImage(image: BaseImage): void {
    image.setOwner(this)
    this.images[image.getName()] = image
  }

  /**
   * The getImage method.
   * @param name - The material name.
   * @param assert - The assert value.
   * @return - The return value.
   */
  getImage(name: string, assert = true): BaseImage {
    const res = this.images[name]
    if (!res && assert) {
      throw new Error('Image:' + name + ' not found in library:' + this.getImageNames())
    }
    return res
  }

  /**
   * The getImageNames method.
   * @return - The return value.
   */
  getImageNames(): string[] {
    const names = []
    // eslint-disable-next-line guard-for-in
    for (const name in this.images) {
      names.push(name)
    }
    return names
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The load method.
   * @param filePath - The file path.
   */
  load(filePath: string): void {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', filePath, true)
    xhr.ontimeout = () => {
      throw new Error('The request for ' + filePath + ' timed out.')
    }
    xhr.onload = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.fromJSON(JSON.parse(xhr.responseText))
        } else {
          console.warn(xhr.statusText)
        }
      }
    }
    xhr.send(null)
  }

  /**
   * The toJSON method encodes the current object as a json object.
   * @param context - The context value.
   * @return - Returns the json object.
   */
  toJSON(context: Record<string, any> = {}): Record<string, any> {
    return {
      numMaterials: this.getNumMaterials(),
    }
  }

  /**
   * The fromJSON method decodes a json object for this type.
   * @param j - The json object this item must decode.
   * @param context - The context value.
   */
  fromJSON(j: Record<string, any>, context: Record<string, any> = {}): void {
    // eslint-disable-next-line guard-for-in
    for (const name in j.textures) {
      const image = new FileImage(name)
      image.fromJSON(j.textures[name])
      this.images[name] = image // TODO: texture -> image
    }
    // eslint-disable-next-line guard-for-in
    for (const name in j.materials) {
      const material = new Material(name)
      material.fromJSON(j.materials[name])
      this.addMaterial(material)
    }
  }

  /**
   * The readBinary method.
   * @param reader - The reader value.
   * @param context - The context value.
   */
  readBinary(reader: BinReader, context: AssetLoadContext): void {
    // if (context.version == undefined) context.version = 0

    this.name = reader.loadStr()

    const numTextures = reader.loadUInt32()
    for (let i = 0; i < numTextures; i++) {
      const type = reader.loadStr()
      const texture = <BaseImage>Registry.constructClass(type)
      texture.readBinary(reader, context)
      this.images[texture.getName()] = texture
    }
    const numMaterials = reader.loadUInt32()
    if (numMaterials > 0) {
      const toc = reader.loadUInt32Array(numMaterials)
      for (let i = 0; i < numMaterials; i++) {
        const shaderName = reader.loadStr()
        let material
        switch (shaderName) {
          case 'StandardMaterial':
          case 'TransparentMaterial':
          case 'StandardSurfaceShader':
            material = <Material>Registry.constructClass('StandardSurfaceMaterial')
            break

          case 'SimpleSurfaceShader':
          case 'SimpleSurfaceMaterial':
            material = <Material>Registry.constructClass('SimpleSurfaceMaterial')
            break
          case 'PointsShader':
          case 'PointsMaterial':
            material = <Material>Registry.constructClass('PointsMaterial')
            break
          case 'FatPointsShader':
          case 'FatPointsMaterial':
            material = <Material>Registry.constructClass('FatPointsMaterial')
            break
          case 'LinesShader':
          case 'LinesMaterial':
            material = <Material>Registry.constructClass('LinesMaterial')
            break
          default:
            material = new Material('')
            break
        }
        reader.seek(toc[i]) // Reset the pointer to the start of the item data.
        material.readBinary(reader, context) // (reader, context, this.images)

        // Note: the compound geom now looks up materials by indexes
        // and so the index of the material in the zcad file must mow match
        // the index in the MaterialLibrary. (GeomItem looks up materials by name.)
        this.materials[i] = material
        this.__materialsMap[material.getName()] = i
      }
    }

    this.emit('loaded')
  }

  /**
   * The toString method.
   * @return - The return value.
   */
  toString(): string {
    return JSON.stringify(this.toJSON(), null, 2)
  }
}
export { MaterialLibrary }
