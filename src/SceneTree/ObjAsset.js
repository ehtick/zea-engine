import {
  Vec2,
  Vec3,
  Xfo,
  Color
} from '../Math';
import {
  Signal,
  Async
} from '../Utilities';
import {
  GeomItem
} from './GeomItem';
import {
  AssetItem
} from './AssetItem';
import {
  Mesh
} from './Geometry/Mesh.js';
import {
  loadTextfile
} from './Utils.js';
import {
  Material
} from './Material.js';
import {
  resourceLoader
} from './ResourceLoader.js';
import {
  GeomLibrary
} from './GeomLibrary.js';
import {
  MaterialLibrary
} from './MaterialLibrary.js';
import {
  Parameter,
  BooleanParameter,
  NumberParameter,
  StringParameter,
  Vec2Parameter,
  Vec3Parameter,
  ColorParameter
} from './Parameters';



// AssetItem.registerDataLoader('.obj', ObjDataLoader);

class ObjAsset extends AssetItem {
  constructor(name) {
    super(name);

    // A signal that is emitted once all the geoms are loaded.
    // Often the state machine will activate the first state
    // when this signal emits. 
    this.geomsLoaded = new Signal(true);
    this.geomsLoaded.setToggled(false);
    this.loaded.setToggled(false);
    
    this.addParameter(new BooleanParameter('splitObjects', false));
    this.addParameter(new BooleanParameter('splitGroupsIntoObjects', false));
    this.addParameter(new BooleanParameter('loadMtlFile', false));
    this.addParameter(new NumberParameter('unitsConversion', 1.0));
    this.addParameter(new StringParameter('defaultShader', ""));

    this.objfileParam = this.addParameter(new Visualive.FilePathParameter('ObjFilePath'));
    this.objfileParam.valueChanged.connect((mode) => {
      this.loaded.untoggle();
      const emitloaded = mode == Visualive.ValueSetMode.USER_SETVALUE;
      this.__loadObj(()=>{
      if(mode == Visualive.ValueSetMode.USER_SETVALUE)
        this.loaded.emit();
      }, ()=>{
      if(mode == Visualive.ValueSetMode.USER_SETVALUE)
        this.geomsLoaded.emit();
      });
    });
    this.geomLibrary = new GeomLibrary();
    this.materials = new MaterialLibrary();
  }

  getGeometryLibrary() {
    return this.geomLibrary;
  }
  getMaterialLibrary() {
    return this.materials;
  }

  __loadObj(onDone, onGeomsLoaded) {

    let objFileData;

    const parseMtlData = (mtlFileData) => {
      const lines = mtlFileData.split('\n');
      const WHITESPACE_RE = /\s+/;
      let material;

      const parseColor = function(elements) {
        if (elements.length == 3)
          return new Color(parseFloat(elements[0]), parseFloat(elements[1]), parseFloat(elements[2]));
        else
          throw ("Unable to parse a color from the following parts:" + elements.join('_'));
      }

      const parseMap = (elements)=>{
        const fileFolder = this.objfileParam.getFileFolder();
        return new FileImage(elements[0], fileFolder + elements[0]);
      }

      for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (line.startsWith('#'))
          continue;
        if (line.indexOf('#') != -1)
          line = line.substring(0, line.indexOf('#')).trim();
        const elements = line.split(WHITESPACE_RE);
        const key = elements.shift();
        switch (key) {
          case 'newmtl':
            material = new Material(elements[0]);
            this.materials.addMaterial(material);
            break;
          case 'Kd':
            material.addParameter('BaseColor', parseColor(elements));
            break;
          case 'map_Kd':
            material.addParameter('BaseColor', parseMap(elements));
            break;
          case 'Ks':
            let specular = (parseFloat(elements[0]) + parseFloat(elements[1]) + parseFloat(elements[2])) / 3.0;
            material.roughness = 1.0 - specular;
            material.addParameter('Roughness', 1.0 - specular);
            material.addParameter('Reflectance', specular);
            break;
          case 'map_Ks':
            material.addParameter('Roughness', parseMap(elements /*flags=TEXTURE_INVERT*/ ));
            material.addParameter('Reflectance', 0.2);
            break;
          case 'd':
            material.addParameter('alpha',  parseFloat(elements[0]));
            break;
          case 'map_d':
            material.addParameter('alpha',  parseFloat(elements));
            break;
          case 'map_bump':
            material.addParameter('normal',  parseMap(elements /*flags=BUMP_TO_NORMAL*/ ));
            break;
          default:
            // console.warn("Unhandled material parameter: '" + key +"' in:" + filePath);
        }
      }
    }

    const vertices = new Array();
    const normals = new Array();
    const texCoords = new Array();

    const geomDatas = {};

    const parseObjData = () => {
      if(!objFileData)
        return;

      // this.unloadDataFromTree();
      const filePath = this.objfileParam.getValue();
      const stem = this.objfileParam.getStem();

      //performance.mark("parseObjData");

      // array of lines separated by the newline
      let lines = objFileData.split('\n');
      let WHITESPACE_RE = /\s+/;
      let async = new Async();
      async.incAsyncCount();
      async.ready.connect(()=>{
        buildChildItems(); 
      });

      let currGeom = undefined;
      let newGeom = (name)=>{
        let suffix = 0;
        while (name in geomDatas) {
          suffix++;
          name = name + String(suffix);
        }
        currGeom = {
          "verticesRemapping": {},
          "texCoordsRemapping": {},
          "normalsRemapping": {},
          "vertexIndices": [],
          "texCoordIndices": [],
          "normalIndices": [],
          "numVertices": 0,
          "numTexCoords": 0,
          "numNormals": 0,
          "numTris": 0,
          "numQuads": 0,
          "material": undefined
        };
        geomDatas[name] = currGeom;
      };
      newGeom(stem);

      const loadMtlFile = this.getParameter('loadMtlFile').getValue();
      const splitObjects = this.getParameter('splitObjects').getValue();
      const splitGroupsIntoObjects = this.getParameter('splitGroupsIntoObjects').getValue();

      let stop = false;
      // let numPolys = 0;
      for (let i = 0; i < lines.length && !stop; i++) {
        let line = lines[i].trim();
        if (line.startsWith('#'))
          continue;
        if (line.indexOf('#') != -1)
          line = line.substring(0, line.indexOf('#')).trim();
        const elements = line.split(WHITESPACE_RE);
        const key = elements.shift();
        switch (key) {
          case '':
          case 's':
            // ignore shading groups
            continue;
          case 'mtllib':
            if (!loadMtlFile)
              continue;
            // Load and parse the mat lib.
            async.incAsyncCount();
            resourceLoader.addWork(stem, 2);
            const fileFolder = fileParam.getFileFolder();
            loadTextfile(
              fileFolder + elements[0],
              (data)=>{
                resourceLoader.addWorkDone(stem, 1);
                parseMtlData(data);
                async.decAsyncCount();
                resourceLoader.addWorkDone(stem, 1);
              }
            );
            break;
          case 'o':
            if (splitObjects)
              newGeom(elements[0]);
            break;
          case 'usemtl':
            currGeom.material = elements[0];
            break;
          case 'g':
            if (splitGroupsIntoObjects)
              newGeom(elements.join('_'));
            break;
          case 'v':
            vertices.push(elements.map(i => parseFloat(i)));
            break;
          case 'vt':
            texCoords.push(elements.map(i => parseFloat(i)));
            break;
          case 'vn':
            normals.push(elements.map(i => parseFloat(i)));
            break;
          case 'f':
            {
              const v_poly = [];
              const vt_poly = [];
              const vn_poly = [];
              for (let j = 0, eleLen = elements.length; j < eleLen; j++) {
                // v/vt/vn
                const indices = elements[j].split('/').map(i => parseInt(i) - 1);
                const v = indices[0];

                // v_poly.push(v);
                let v_index = currGeom.verticesRemapping[v];
                if (v_index == undefined) {
                  v_index = currGeom.numVertices;
                  currGeom.verticesRemapping[v] = v_index;
                  currGeom.numVertices++;
                }
                v_poly.push(v_index);

                if (indices.length > 1 && !isNaN(indices[1])) {
                  const vt = indices[1];
                  vt_poly.push(vt);
                }
                if (indices.length > 2 && !isNaN(indices[2])) {
                  const vn = indices[2];
                  vn_poly.push(vn);
                }
              }
              currGeom.vertexIndices.push(v_poly);
              if (vn_poly.length > 0)
                currGeom.normalIndices.push(vn_poly);
              if (vt_poly.length > 0)
                currGeom.texCoordIndices.push(vt_poly);

              if (v_poly.length == 3) {
                currGeom.numTris++;
              } else {
                currGeom.numQuads++;
              }
              // numPolys++;
              // if(numPolys == 16000)
              //     stop = true;
              break;
            }
          default:
            {
              console.warn("Unhandled line:" + line);
            }
        }
      }

      async.decAsyncCount();
    }

    const buildChildItems = () => {
      //performance.mark("parseObjDataDone");
      //performance.mark("buildObjTree");
      for (let geomName in geomDatas) {
        if (geomDatas[geomName].numVertices == 0)
          continue;
        buildChildItem(geomName, geomDatas[geomName]);
      }

      // Done. 
      onDone();
      onGeomsLoaded();
    }

    const buildChildItem = (geomName, geomData) => {

      const numVertices = geomData.numVertices;
      const numTris = geomData.numTris;
      const mesh = new Mesh(geomName);
      mesh.setFaceCounts([geomData.numTris, geomData.numQuads]);
      mesh.setNumVertices(numVertices);
      const positionsAttr = mesh.getVertexAttribute('positions');
      const unitsConversion = this.getParameter('unitsConversion').getValue();

      for (let vsrc in geomData.verticesRemapping) {
        const vtgt = geomData.verticesRemapping[vsrc];
        positionsAttr.getValueRef(vtgt).set(
          vertices[vsrc][0] * unitsConversion,
          vertices[vsrc][1] * unitsConversion,
          vertices[vsrc][2] * unitsConversion
        );
      }

      let normalsAttr, texCoordsAttr;
      if (geomData.normalIndices.length > 0)
        normalsAttr = mesh.addVertexAttribute('normals', Vec3);
      if (geomData.texCoordIndices.length > 0)
        texCoordsAttr = mesh.addVertexAttribute('texCoords', Vec2);

      for (let i = 0; i < geomData.vertexIndices.length; i++) {
        const v_poly = geomData.vertexIndices[i];
        mesh.setFaceVertexIndices(i, ...v_poly);

        // Set the texCoords and normals...
        if (normalsAttr) {
          const vn_poly = geomData.normalIndices[i];
          for (let j = 0; j < vn_poly.length; j++) {
            const value = new Vec3(
              normals[vn_poly[j]][0],
              normals[vn_poly[j]][1],
              normals[vn_poly[j]][2]
            );
            normalsAttr.setFaceVertexValue(i, j, value);
          }
        }
        if (texCoordsAttr && geomData.texCoordIndices.length == geomData.vertexIndices.length) {
          const vt_poly = geomData.texCoordIndices[i];
          for (let j = 0; j < vt_poly.length; j++) {
            const value = new Vec2(
              texCoords[vt_poly[j]][0],
              texCoords[vt_poly[j]][1]
            );
            texCoordsAttr.setFaceVertexValue(i, j, value);
          }
        }
      }

      const geomItem = new GeomItem(geomName, mesh);
      geomItem.selectable = true;

      // Move the transform of the geom item to the center of the geom.
      // This is so that transparent objects can render correctly, and the 
      // transform gizmo becomes centered on each geom(for testing)
      const delta = mesh.boundingBox.center();
      mesh.moveVertices(delta.negate());
      geomItem.setLocalXfo(new Xfo(delta));

      if (geomData.material != undefined && this.materials.hasMaterial(geomData.material)) {
        geomItem.setMaterial(this.materials.getMaterial(geomData.material));
      } else{

        const defaultShader = this.getParameter('defaultShader').getValue();
        const material = new Material(geomName + 'mat', defaultShader != "" ? defaultShader : 'StandardSurfaceShader');
        const baseColorParam = material.getParameter('BaseColor');
        if(baseColorParam)
          baseColorParam.setValue(Color.random(0.5));
        else {
          const colorParam = material.getParameter('Color');
          if(colorParam)
            colorParam.setValue(Color.random(0.5));
        }
        const roughnessParam = material.getParameter('Roughness');
        if(roughnessParam)
          roughnessParam.setValue(0.6);
        const reflectanceParam = material.getParameter('Reflectance');
        if(reflectanceParam)
          reflectanceParam.setValue(0.2);
        this.materials.addMaterial(material)
        geomItem.setMaterial(material);
      }

      this.addChild(geomItem, false);
    }

    const loadObjData = ()=>{
      const file = this.objfileParam.getFileDesc();
      const stem = this.objfileParam.getStem();
      resourceLoader.addWork(stem, 2);    
      loadTextfile(file.url, (fileData)=>{
        resourceLoader.addWorkDone(stem, 1);
        objFileData = fileData;
        parseObjData();
        resourceLoader.addWorkDone(stem, 1);
      });
    }

    loadObjData();


    // // If the fileParam changes again, we only trigger the load function.
    // fileParam.valueChanged.connect(loadObjData);
    // this.getParameter('splitObjects').valueChanged.connect(parseObjData);
    // this.getParameter('splitGroupsIntoObjects').valueChanged.connect(parseObjData);
    // this.getParameter('loadMtlFile').valueChanged.connect(parseObjData);
    // this.getParameter('unitsConversion').valueChanged.connect(parseObjData);
    // this.getParameter('defaultShader').valueChanged.connect(parseObjData);
  }

};
export {
  ObjAsset
};
// ObjAsset;