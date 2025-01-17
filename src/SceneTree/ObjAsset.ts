/* eslint-disable guard-for-in */
/* eslint-disable camelcase */
/* eslint-disable no-array-constructor */
import { Vec2, Vec3, Xfo, Color } from '../Math/index'
import { GeomItem } from './GeomItem'
import { AssetItem } from './AssetItem'
import { Mesh } from './Geometry/Mesh'
import { loadTextfile } from './Utils'
import { Material } from './Material'
import { FileImage } from './Images/FileImage'
import { resourceLoader } from './resourceLoader'
import { BooleanParameter, NumberParameter, StringParameter } from './Parameters/index'
import { Vec3Attribute } from './Geometry/Vec3Attribute'
import { Vec2Attribute } from './Geometry/Vec2Attribute'
import { ColorSpace, MaterialColorParam } from './Parameters/MaterialColorParam'
import { MaterialFloatParam } from './Parameters/MaterialFloatParam'

// AssetItem.registerDataLoader('.obj', ObjDataLoader);

/**
 * Class designed to load and handle `.obj` files.
 * Which define the geometry and other properties for objects.
 *
 * **Parameters**
 * * **splitObjects(`BooleanParameter`):** _todo_
 * * **splitGroupsIntoObjects(`BooleanParameter`):** _todo_
 * * **loadMtlFile(`BooleanParameter`):** _todo_
 * * **unitsConversion(`NumberParameter`):** _todo_
 * * **defaultShader(`StringParameter`):** _todo_
 *
 * **Events**
 * * **loaded:** Triggered once everything is loaded.
 * * **geomsLoaded:** Triggered once all geometries are loaded.
 *
 * @extends AssetItem
 */
class ObjAsset extends AssetItem {
  splitObjects: BooleanParameter = new BooleanParameter('splitObjects', false)
  splitGroupsIntoObjects: BooleanParameter = new BooleanParameter('splitGroupsIntoObjects', false)
  loadMtlFile: BooleanParameter = new BooleanParameter('loadMtlFile', true)
  unitsConversion: NumberParameter = new NumberParameter('unitsConversion', 1.0)
  defaultShader: StringParameter = new StringParameter('defaultShader', '')
  /**
   * Create an obj asset.
   * @param name - The name of the object asset.
   */

  /**
   * @member splitObjectsParam - TODO
   */
  splitObjectsParam: BooleanParameter = new BooleanParameter('splitObjects', false)

  /**
   * @member splitGroupsIntoObjectsParam - TODO
   */
  splitGroupsIntoObjectsParam: BooleanParameter = new BooleanParameter('splitGroupsIntoObjects', false)

  /**
   * @member loadMtlFileParam - TODO
   */
  loadMtlFileParam: BooleanParameter = new BooleanParameter('loadMtlFile', true)

  /**
   * @member unitsConversionParam - TODO
   */
  unitsConversionParam: NumberParameter = new NumberParameter('unitsConversion', 1.0)

  /**
   * @member defaultShaderParam - The default shader to use.
   */
  defaultShaderParam: StringParameter = new StringParameter('defaultShader', '')

  constructor(name: string) {
    super(name)
    this.addParameter(this.splitObjectsParam)
    this.addParameter(this.splitGroupsIntoObjectsParam)
    this.addParameter(this.loadMtlFileParam)
    this.addParameter(this.unitsConversionParam)
    this.addParameter(this.defaultShaderParam)
  }

  /**
   * Loads all the geometries and metadata from the Obj file.
   * @param url - The URL of the asset to load
   * @return - Returns a promise that resolves once the initial load is complete
   */
  load(url: string): Promise<void> {
    this.loaded = false
    return new Promise((resolve, reject) => {
      const fileFolder = url.substring(0, url.lastIndexOf('/')) + '/'

      const parseMtlData = (mtlFileData: string) => {
        const lines = mtlFileData.split('\n')
        const WHITESPACE_RE = /\s+/
        let material

        const parseColor = function (elements: string[]) {
          if (elements.length == 3)
            return new Color(parseFloat(elements[0]), parseFloat(elements[1]), parseFloat(elements[2]))
          else throw new Error('Unable to parse a color from the following parts:' + elements.join('_'))
        }

        const parseMap = (name: string, filename: string) => {
          const fileImage = new FileImage(name)
          fileImage.load(fileFolder + filename)
          return fileImage
        }

        for (let i = 0; i < lines.length; i++) {
          let line = lines[i].trim()
          if (line.startsWith('#')) continue
          if (line.includes('#')) line = line.substring(0, line.indexOf('#')).trim()
          const elements: string[] = line.split(WHITESPACE_RE)
          const key = elements.shift()
          const value = elements.join(' ')

          switch (key) {
            case 'newmtl':
              material = new Material(value)
              material.setShaderName('StandardSurfaceShader')
              this.materialLibrary.addMaterial(material)
              break
            case 'Kd': {
              const baseColorParam = material.getParameter('BaseColor')!
              baseColorParam.value = parseColor(elements)
              if (baseColorParam instanceof MaterialColorParam) {
                baseColorParam.colorSpace == ColorSpace.Linear
              }
              break
            }
            case 'map_Kd': {
              const baseColorParam = material.getParameter('BaseColor')!
              if (baseColorParam instanceof MaterialColorParam) {
                baseColorParam.setImage(parseMap('map_Kd', elements[0]))
              }
              break
            }
            case 'Ks':
              const specular = (parseFloat(elements[0]) + parseFloat(elements[1]) + parseFloat(elements[2])) / 3.0
              material.getParameter('Roughness')!.value = 1.0 - specular
              material.getParameter('Reflectance')!.value = specular
              break
            case 'map_Ks':
              const roughnessParam = material.getParameter('Roughness')!
              if (roughnessParam instanceof MaterialFloatParam) {
                roughnessParam.setImage(parseMap('map_Ks', elements[0])) /* flags=TEXTURE_INVERT */
              }
              material.getParameter('Reflectance')!.value = 0.2
              break
            case 'd':
              const d = parseFloat(value)
              if (d < 1.0) {
                material.setShaderName('TransparentSurfaceShader')
                material.getParameter('Opacity')!.value = d
              }
              break
            case 'map_d':
              material.getParameter('alpha')!.value = parseFloat(elements[0])
              break
            case 'map_bump':
              const normalParam = material.getParameter('Normal')!
              if (normalParam instanceof MaterialColorParam) {
                normalParam.setImage(parseMap('normal', elements[0])) /* flags=BUMP_TO_NORMAL */
              }
              break
            default:
            // console.warn("Unhandled material parameter: '" + key +"' in:" + filePath);
          }
        }
      }

      const loadMtlFile = (mtlFile: string): Promise<void> => {
        return new Promise((resolve) => {
          loadTextfile(mtlFile, (fileData) => {
            resourceLoader.incrementWorkDone(1)
            parseMtlData(fileData)
            resourceLoader.incrementWorkDone(1)
            resolve()
          })
        })
      }

      const vertices: Array<Array<number>> = []
      const normals: Array<Array<number>> = []
      const texCoords: Array<Array<number>> = []

      const geomDatas: { [key: string]: any } = {}

      const parseObjData = async (fileData: string) => {
        // performance.mark("parseObjData");

        // array of lines separated by the newline
        const lines = fileData.split('\n')
        const WHITESPACE_RE = /\s+/

        let currGeom: any = undefined
        let currMtl: any = undefined
        let numGeoms: number = 0
        const newGeom = (name: string) => {
          if (name in geomDatas) {
            let suffix = 1
            while (name + String(suffix) in geomDatas) {
              suffix++
            }
            name = name + String(suffix)
          }
          currGeom = {
            verticesRemapping: {},
            texCoordsRemapping: {},
            normalsRemapping: {},
            vertexIndices: [],
            texCoordIndices: [],
            normalIndices: [],
            numVertices: 0,
            numTexCoords: 0,
            numNormals: 0,
            faceCounts: [],
            material: currMtl,
          }
          geomDatas[name] = currGeom
          numGeoms++
        }
        newGeom('geom')

        const splitGroupsIntoObjects = this.splitGroupsIntoObjectsParam.value

        const stop = false
        // let numPolys = 0;
        for (let i = 0; i < lines.length && !stop; i++) {
          let line = lines[i].trim()
          if (line.startsWith('#')) continue
          if (line.includes('#')) line = line.substring(0, line.indexOf('#')).trim()
          const elements = line.split(WHITESPACE_RE)
          const key = elements.shift()
          const value = elements.join(' ')
          switch (key) {
            case '':
            case 's':
              // ignore shading groups
              continue
            case 'mtllib':
              if (!this.loadMtlFileParam.value) continue
              // Load and parse the mat lib.
              resourceLoader.incrementWorkload(2)
              const mtlFile = fileFolder + value
              if (mtlFile) {
                await loadMtlFile(mtlFile)
              }
              break
            case 'o':
              newGeom(value)
              break
            case 'usemtl':
              currMtl = value
              newGeom(value + Object.keys(geomDatas).length)
              break
            case 'g':
              if (splitGroupsIntoObjects) {
                newGeom(value ? elements.join('_') : 'Group' + numGeoms)
              }
              break
            case 'v':
              vertices.push(elements.map((i) => parseFloat(i)))
              break
            case 'vt':
              texCoords.push(elements.map((i) => parseFloat(i)))
              break
            case 'vn':
              normals.push(elements.map((i) => parseFloat(i)))
              break
            case 'f': {
              const v_poly = []
              const vt_poly = []
              const vn_poly = []
              for (let j = 0, eleLen = elements.length; j < eleLen; j++) {
                // v/vt/vn
                const indices = elements[j].split('/').map((i: any) => parseInt(i) - 1)
                const v = indices[0]

                // v_poly.push(v);
                let v_index = currGeom.verticesRemapping[v]
                if (v_index == undefined) {
                  v_index = currGeom.numVertices
                  currGeom.verticesRemapping[v] = v_index
                  currGeom.numVertices++
                }
                v_poly.push(v_index)

                if (indices.length > 1 && !isNaN(indices[1])) {
                  const vt = indices[1]
                  vt_poly.push(vt)
                }
                if (indices.length > 2 && !isNaN(indices[2])) {
                  const vn = indices[2]
                  vn_poly.push(vn)
                }
              }
              currGeom.vertexIndices.push(v_poly)
              if (vn_poly.length > 0) currGeom.normalIndices.push(vn_poly)
              if (vt_poly.length > 0) currGeom.texCoordIndices.push(vt_poly)

              if (currGeom.faceCounts[v_poly.length - 3] == undefined) {
                currGeom.faceCounts[v_poly.length - 3] = []
              }
              currGeom.faceCounts[v_poly.length - 3]++
              // numPolys++;
              // if(numPolys == 16000)
              //     stop = true;
              break
            }
            default: {
              console.warn('Unhandled line:' + line)
            }
          }
        }
      }

      const buildChildItems = () => {
        // performance.mark("parseObjDataDone");
        // performance.mark("buildObjTree");
        for (const geomName in geomDatas) {
          if (geomDatas[geomName].numVertices == 0) continue
          buildChildItem(geomName, geomDatas[geomName])
        }

        // Done.
        this.emit('loaded')
        this.getGeometryLibrary().emit('loaded')
        this.emit('geomsLoaded')
        resolve()
      }

      const buildChildItem = (geomName: string, geomData: any) => {
        for (let i = 0; i < geomData.faceCounts.length; i++) {
          if (geomData.faceCounts[i] == undefined) {
            geomData.faceCounts[i] = 0
          }
        }

        const numVertices = geomData.numVertices
        const mesh = new Mesh() // geomName
        mesh.setDebugName(geomName)
        mesh.setFaceCounts(geomData.faceCounts)
        mesh.setNumVertices(numVertices)
        const positionsAttr = <Vec3Attribute>mesh.getVertexAttribute('positions')
        const unitsConversion = this.unitsConversionParam.value

        for (const vsrcKey in geomData.verticesRemapping) {
          const vsrc = Number.parseInt(vsrcKey)
          const vtgt = geomData.verticesRemapping[vsrc]
          positionsAttr
            .getValueRef(vtgt)
            .set(
              vertices[vsrc][0] * unitsConversion,
              vertices[vsrc][1] * unitsConversion,
              vertices[vsrc][2] * unitsConversion
            )
        }

        let normalsAttr
        let texCoordsAttr
        if (geomData.normalIndices.length > 0) {
          normalsAttr = new Vec3Attribute()
          mesh.addVertexAttribute('normals', normalsAttr) // TODO: this method returns void
        }
        if (geomData.texCoordIndices.length > 0) {
          texCoordsAttr = new Vec2Attribute()
          mesh.addVertexAttribute('texCoords', texCoordsAttr)
        }

        const loadedFaces = Array(geomData.faceCounts.length).fill(0)
        for (let i = 0; i < geomData.vertexIndices.length; i++) {
          const v_poly = geomData.vertexIndices[i]
          let faceId = 0
          for (let j = 0; j < v_poly.length - 3; ++j) {
            if (geomData.faceCounts[j]) faceId += geomData.faceCounts[j]
          }
          faceId += loadedFaces[v_poly.length - 3]
          loadedFaces[v_poly.length - 3]++
          mesh.setFaceVertexIndices(faceId, v_poly)

          // Set the texCoords and normals...
          if (normalsAttr) {
            const vn_poly = geomData.normalIndices[i]
            for (let j = 0; j < vn_poly.length; j++) {
              const value = new Vec3(normals[vn_poly[j]][0], normals[vn_poly[j]][1], normals[vn_poly[j]][2])
              normalsAttr.setFaceVertexValue(faceId, j, value)
            }
          }
          if (texCoordsAttr && geomData.texCoordIndices.length == geomData.vertexIndices.length) {
            const vt_poly = geomData.texCoordIndices[i]
            for (let j = 0; j < vt_poly.length; j++) {
              const value = new Vec2(texCoords[vt_poly[j]][0], texCoords[vt_poly[j]][1])
              texCoordsAttr.setFaceVertexValue(faceId, j, value)
            }
          }
        }

        const geomItem = new GeomItem(geomName, mesh)

        // Move the transform of the geom item to the center of the geom.
        // This is so that transparent objects can render correctly, and the
        // transform gizmo becomes centered on each geom(for testing)
        const delta = mesh.getBoundingBox().center()
        {
          const offset = delta.negate()
          const positions = <Vec3Attribute>mesh.getVertexAttribute('positions')
          for (let i = 0; i < positions.getCount(); i++) positions.getValueRef(i).addInPlace(offset) // TODO: is getCount() == positions.length?
          mesh.setBoundingBoxDirty()
        }
        geomItem.localXfoParam.value = new Xfo(delta)

        if (geomData.material != undefined && this.materialLibrary.hasMaterial(geomData.material)) {
          geomItem.materialParam.value = this.materialLibrary.getMaterial(geomData.material)
        } else {
          const defaultShader = this.defaultShaderParam.value
          const material = new Material(geomName + ' mat')
          material.setShaderName(defaultShader != '' ? defaultShader : 'StandardSurfaceShader')
          this.materialLibrary.addMaterial(material)
          geomItem.materialParam.value = material
        }

        this.addChild(geomItem, false)
      }

      const loadObjData = () => {
        resourceLoader.incrementWorkload(2)
        loadTextfile(
          url,
          (fileData) => {
            resourceLoader.incrementWorkDone(1)
            parseObjData(fileData).then(() => {
              buildChildItems()
              resourceLoader.incrementWorkDone(1)
            })
          },
          (error) => {
            this.emit('error', error)
            reject(error)
          }
        )
      }

      loadObjData()
    })
  }
}

export { ObjAsset }
