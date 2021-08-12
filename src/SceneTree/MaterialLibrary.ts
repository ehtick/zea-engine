import { SystemDesc } from '../SystemDesc'
import { EventEmitter } from '../Utilities/index'
import { Registry } from '../Registry'
import { Material } from './Material'
import { FileImage } from './Images/index'
import { BaseItem } from './BaseItem'
import { BinReader } from '..'
import { BaseImage } from './BaseImage'
import { Parameter } from './Parameters/Parameter'
import { Owner } from './Owner'

/** Class representing a material library in a scene tree.
 * @private
 */
class MaterialLibrary extends EventEmitter implements Owner {
  protected lod: number
  protected __name: string
  protected __images: Record<string, any>
  protected __materials: Record<any, any>
  protected name: string
  /**
   * Create a material library.
   * @param {string} name - The name of the material library.
   */
  constructor(name: string = 'MaterialLibrary') {
    super()
    this.__name = name

    this.lod = 0
    if (SystemDesc.isMobileDevice) this.lod = 1
    this.clear()
  }

  /**
   * The clear method.
   */
  clear() {
    this.__images = {}
    this.__materials = {
      Default: new Material('Default', 'SimpleSurfaceShader'),
    }
  }

  /**
   * The getPath method.
   * @return {any} - The return value.
   */
  getPath() {
    return [this.__name]
  }

  /**
   * The resolvePath method traverses the subtree from this item down
   * matching each name in the path with a child until it reaches the
   * end of the path.
   *
   * @param {array} path - The path value.
   * @param {number} index - The index value.
   * @return {BaseItem|Parameter} - The return value.
   */
  resolvePath(path: string | string[], index = 0): BaseItem | Parameter<any> | null {
    return null
  }

  /**
   * The getNumMaterials method.
   * @return {any} - The return value.
   */
  getNumMaterials() {
    return Object.keys(this.__materials).length
  }

  /**
   * The getMaterials method.
   * @return {any} - The return value.
   */
  getMaterials() {
    return Object.values(this.__materials)
  }

  /**
   * The getMaterialNames method.
   * @return {any} - The return value.
   */
  getMaterialNames() {
    const names = []
    // eslint-disable-next-line guard-for-in
    for (const name in this.__materials) {
      names.push(name)
    }
    return names
  }

  /**
   * The hasMaterial method.
   * @param {string} name - The name value.
   * @return {any} - The return value.
   */
  hasMaterial(name: string) {
    return name in this.__materials
  }

  /**
   * Add a material.
   * @param {Material} material - The material value.
   */
  addMaterial(material: Material) {
    material.setOwner(this)
    this.__materials[material.getName()] = material
  }

  /**
   * The getMaterial method.
   * @param {string} name - The material name.
   * @param {Boolean} assert - The assert value.
   * @return {any} - The return value.
   */
  getMaterial(name: string, assert = true) {
    const res = this.__materials[name]
    if (!res && assert) {
      throw new Error('Material:' + name + ' not found in library:' + this.getMaterialNames())
    }
    return res
  }

  /**
   * The hasImage method.
   * @param {string} name - The material name.
   * @return {any} - The return value.
   */
  hasImage(name: string) {
    return name in this.__images
  }

  /**
   * The addImage method.
   * @param {BaseImage} image - The image value.
   */
  addImage(image: BaseImage) {
    image.setOwner(this)
    this.__images[image.getName()] = image
  }

  /**
   * The getImage method.
   * @param {string} name - The material name.
   * @param {boolean} assert - The assert value.
   * @return {any} - The return value.
   */
  getImage(name: string, assert = true) {
    const res = this.__images[name]
    if (!res && assert) {
      throw new Error('Image:' + name + ' not found in library:' + this.getImageNames())
    }
    return res
  }

  /**
   * The getImageNames method.
   * @return {any} - The return value.
   */
  getImageNames() {
    const names = []
    // eslint-disable-next-line guard-for-in
    for (const name in this.__images) {
      names.push(name)
    }
    return names
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The load method.
   * @param {any} filePath - The file path.
   */
  load(filePath: any) {
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
   * @param {Record<any,any>} context - The context value.
   * @return {Record<any,any>} - Returns the json object.
   */
  toJSON(context: Record<any, any> = {}) {
    return {
      numMaterials: this.getNumMaterials(),
    }
  }

  /**
   * The fromJSON method decodes a json object for this type.
   * @param {Record<any,any>} j - The json object this item must decode.
   * @param {Record<any,any>} context - The context value.
   */
  fromJSON(j: Record<any, any>, context: Record<any, any> = {}) {
    context.lod = this.lod
    // eslint-disable-next-line guard-for-in
    for (const name in j.textures) {
      const image = new FileImage(name)
      image.fromJSON(j.textures[name])
      this.__images[name] = image // TODO: texture -> image
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
   * @param {BinReader} reader - The reader value.
   * @param {Record<any,any>} context - The context value.
   */
  readBinary(reader: BinReader, context: Record<any, any> = {}) {
    // if (context.version == undefined) context.version = 0

    this.name = reader.loadStr()

    // Specify the Lod to load the images in this library.
    context.lod = this.lod
    context.materialLibrary = this

    const numTextures = reader.loadUInt32()
    for (let i = 0; i < numTextures; i++) {
      const type = reader.loadStr()
      const texture = <BaseImage>Registry.constructClass(type)
      texture.readBinary(reader, context)
      this.__images[texture.getName()] = texture
    }
    const numMaterials = reader.loadUInt32()
    if (numMaterials > 0) {
      const toc = reader.loadUInt32Array(numMaterials)
      for (let i = 0; i < numMaterials; i++) {
        const material = new Material('')
        reader.seek(toc[i]) // Reset the pointer to the start of the item data.
        material.readBinary(reader, context) // (reader, context, this.__images)
        this.addMaterial(material)
      }
    }

    this.emit('loaded')
  }

  /**
   * The toString method.
   * @return {any} - The return value.
   */
  toString() {
    return JSON.stringify(this.toJSON(), null, 2)
  }
}
export { MaterialLibrary }
