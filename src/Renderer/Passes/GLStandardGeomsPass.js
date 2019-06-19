import {
  GLPass
} from './GLPass';

import {
  Vec4
} from '../../Math';

import {
  GeomItem,
  Points,
  Lines,
  Mesh,
  PointsProxy,
  LinesProxy,
  MeshProxy,
  sgFactory
} from '../../SceneTree';

import {
  GLPoints
} from '../GLPoints.js';
import {
  GLLines
} from '../GLLines.js';
import {
  GLMesh
} from '../GLMesh.js';
import {
  GLShader
} from '../GLShader.js';
import {
  GLMaterial
} from '../GLMaterial.js';
import {
  GLGeomItemChangeType,
  GLGeomItem
} from '../GLGeomItem.js';
import {
  GLTexture2D
} from '../GLTexture2D.js';

// This class abstracts the rendering of a collection of geometries to screen.
class GLStandardGeomsPass extends GLPass {
  constructor() {
    super();

    this.__drawItems = [undefined];
    this.__drawItemsIndexFreeList = [];
    this.__dirtyItemIndices = [];
  }

  init(renderer, passIndex) {
    super.init(renderer, passIndex);

    this.__renderer.registerPass(
      (treeItem) => {
        if (treeItem instanceof GeomItem) {
          if (!treeItem.getMetadata('glgeomItem')) {

            const checkGeom = (geomItem) => {
              if (this.filterGeomItem(geomItem)) {
                if (treeItem.getGeometry() == undefined) {
                  // we will add this geomitem once it recieves its geom.
                  // TODO: what happens if the item is removed from the tree
                  // and then geom assigned? (maybe inmpossible with our tools)
                  // e.g. a big asset loaded, added to the tree, then removed again
                  // The geoms will get assigned after the tree is removed.
                  treeItem.geomAssigned.connect(() => {
                    this.addGeomItem(geomItem);
                  })
                } else {
                  this.addGeomItem(geomItem);
                }
                return true;
              } else {
                return false;
              }
            }

            if (treeItem.getMaterial() == undefined) {
              console.warn("Scene item :" + treeItem.getPath() + " has no material");
              // TODO: listen for when the material is assigned.(like geoms below)
              return false;
            } else {
              return checkGeom(treeItem)
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
      },
      (treeItem) => {
        if (treeItem instanceof GeomItem && treeItem.getMetadata('glgeomItem')) {
          return this.removeGeomItem(treeItem);
        }
        return false;
      }
    );
  }

  filterGeomItem(geomItem) {
    return true;
  }

  addShader(material) {
    return this.__renderer.getOrCreateShader(material.getShaderName());
  }

  addMaterial(material) {

    let glmaterial = material.getMetadata('glmaterial');
    if (glmaterial) {
      return glmaterial;
    }
    const glshader = this.__renderer.getOrCreateShader(material.getShaderName());
    glmaterial = new GLMaterial(this.__gl, material, glshader);
    glmaterial.updated.connect(() => {
      this.__renderer.requestRedraw();
    });
    material.destructing.connect(() => {
      material.deleteMetadata('glmaterial');
    });
    material.setMetadata('glmaterial', glmaterial);

    return glmaterial;
  };

  addGeom(geom) {
    let glgeom = geom.getMetadata('glgeom');
    if (glgeom) {
      return glgeom;
    }
    const gl = this.__gl;
    if (geom instanceof Mesh || geom instanceof MeshProxy) {
      glgeom = new GLMesh(gl, geom);
    } else if (geom instanceof Lines || geom instanceof LinesProxy) {
      glgeom = new GLLines(gl, geom);
    } else if (geom instanceof Points || geom instanceof PointsProxy) {
      glgeom = new GLPoints(gl, geom);
    } else {
      throw ("Unsupported geom type:" + geom.constructor.name);
    }
    geom.setMetadata('glgeom', glgeom);
    return glgeom;
  };

  addGeomItem(geomItem) {
    if (geomItem.isDestroyed()) {
      throw ("geomItem is destroyed:" + geomItem.getPath());
    }
    // let glmaterialGeomItemSets = this.addMaterial(geomItem.getMaterial());
    // if (!glmaterialGeomItemSets)
    //     return;
    const glgeom = this.addGeom(geomItem.getGeometry());


    const flags = 1;
    let index;
    // Use recycled indices if there are any available...
    if (this.__drawItemsIndexFreeList.length > 0) {
      index = this.__drawItemsIndexFreeList.pop();
    } else {
      index = this.__drawItems.length;
      this.__drawItems.push(null);
    }
    this.__dirtyItemIndices.push(index);

    const gl = this.__gl;
    const glgeomItem = new GLGeomItem(gl, geomItem, glgeom, index, flags);
    geomItem.setMetadata('glgeomItem', glgeomItem);

    const updatedId = glgeomItem.updated.connect((type) => {
      switch (type) {
        case GLGeomItemChangeType.TRANSFORM_CHANGED:
          if (this.__dirtyItemIndices.indexOf(index) != -1)
            return;
          this.__dirtyItemIndices.push(index);
          break;
        case GLGeomItemChangeType.GEOM_CHANGED:
        case GLGeomItemChangeType.VISIBILITY_CHANGED:
          break;
        case GLGeomItemChangeType.SELECTION_CHANGED:
          this.__renderer.requestRedraw();
          return;
      }
      this.__renderer.drawItemChanged();
    });

    this.__drawItems[index] = glgeomItem;

    // Note: before the renderer is disabled, this is a  no-op.
    this.__renderer.requestRedraw();

    geomItem.setMetadata('glpass', this);
    return glgeomItem;
  };

  removeGeomItem(geomItem) {
    if(geomItem.getMetadata('glpass') != this)
      return;

    const glgeomItem = geomItem.getMetadata('glgeomItem');

    const index = glgeomItem.getId();
    this.__drawItems[index] = null;
    this.__drawItemsIndexFreeList.push(index);

    // TODO: review signal disconnections
    // glgeomItem.destructing.disconnectScope(this);
    // glgeomItem.transformChanged.disconnectScope(this);

    // this.renderTreeUpdated.emit();
    this.__renderer.requestRedraw();

    geomItem.getMetadata('glpass')
    geomItem.deleteMetadata('glgeomItem')

    return glgeomItem;
  }

  // removeMaterial(material) {
  //     const glshaderMaterials = this.__glshadermaterials[material.hash];
  //     if (!glshaderMaterials || glshaderMaterials != material.getMetadata('glshaderMaterials')) {
  //         console.warn("Material not found in pass");
  //         return;
  //     }

  //     const glmaterialGeomItemSets = material.getMetadata('glmaterialGeomItemSets');
  //     glshaderMaterials.removeMaterialGeomItemSets(glmaterialGeomItemSets);
  // };

  removeGLGeom(geomItemMapping, materialGeomMapping) {
    const index = materialGeomMapping.geomItemMappings.indexOf(geomItemMapping);
    materialGeomMapping.geomItemMappings.splice(index, 1);

    // Note: the GLMAterial cleans up iself now...
    // if(materialGeomMapping.geomItemMappings.length == 0 && !this.__explicitShader){
    //     this.removeMaterialGeomMapping(materialGeomMapping.glmaterial);
    // }
  };


  //////////////////////////////////////////////////////////
  /// GeomItem IDs

  getGeomItem(id) {
    if (id >= this.__drawItems.length) {
      console.warn("Invalid Draw Item id:" + id + " NumItems:" + (this.__drawItems.length - 1));
      return undefined;
    }
    return this.__drawItems[id];
  };

  //////////////////////////////////////////////////
  // Data Uploading
  __populateDrawItemDataArray(glgeomItem, index, dataArray) {

    const mat4 = glgeomItem.getGeomItem().getGeomXfo().toMat4();
    const lightmapCoordsOffset = glgeomItem.getGeomItem().getLightmapCoordsOffset();

    const stride = 16; // The number of floats per draw item.
    const offset = index * stride;
    const pix0 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset);
    const pix1 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset + 4);
    const pix2 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset + 8);
    const pix3 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset + 12);
    pix0.set(mat4.xAxis.x, mat4.yAxis.x, mat4.zAxis.x, mat4.translation.x);
    pix1.set(mat4.xAxis.y, mat4.yAxis.y, mat4.zAxis.y, mat4.translation.y);
    pix2.set(mat4.xAxis.z, mat4.yAxis.z, mat4.zAxis.z, mat4.translation.z);

    const materialId = 0;
    const geomId = 0;
    pix3.set(lightmapCoordsOffset.x, lightmapCoordsOffset.y, materialId, geomId);
  };

  newItemsReadyForLoading() {
    return this.__dirtyItemIndices.length > 0;
  };

  uploadGeomItems() {

    const gl = this.__gl;
    if (!gl.floatTexturesSupported) {
      // Pull on the GeomXfo params. This will trigger the lazy evaluation of the operators in the scene.
      const len = this.__dirtyItemIndices.length;
      for (let i = 0; i < len; i++) {
        const drawItem = this.__drawItems[this.__dirtyItemIndices[i]];
        if (drawItem) {
          drawItem.updateGeomMatrix();
        }
      }
      this.__dirtyItemIndices = [];
      // this.renderTreeUpdated.emit();
      return;
    }

    const pixelsPerItem = 4; // The number of RGBA pixels per draw item.
    let size = Math.round(Math.sqrt(this.__drawItems.length * pixelsPerItem) + 0.5);
    // Only support power 2 textures. Else we get strange corruption on some GPUs
    // in some scenes.
    size = Math.nextPow2(size);
    // Size should be a multiple of pixelsPerItem, so each geom item is always contiguous
    // in memory. (makes updating a lot easier. See __updateItemInstanceData below)
    if ((size % pixelsPerItem) != 0)
      size += pixelsPerItem - (size % pixelsPerItem);

    if (!this.__drawItemsTexture) {
      this.__drawItemsTexture = new GLTexture2D(gl, {
        format: 'RGBA',
        type: 'FLOAT',
        width: size,
        height: size,
        filter: 'NEAREST',
        wrap: 'CLAMP_TO_EDGE',
        mipMapped: false
      });
      this.__drawItemsTexture.clear();
    } else if (this.__drawItemsTexture.width != size) {
      this.__drawItemsTexture.resize(size, size);
      this.__dirtyItemIndices = Array((size * size) / pixelsPerItem).fill().map((v, i) => i);
    }

    gl.bindTexture(gl.TEXTURE_2D, this.__drawItemsTexture.glTex);
    const typeId = this.__drawItemsTexture.getTypeID();
    const formatId = this.__drawItemsTexture.getFormatID();

    for (let i = 0; i < this.__dirtyItemIndices.length; i++) {
      const indexStart = this.__dirtyItemIndices[i];
      const yoffset = Math.floor((indexStart * pixelsPerItem) / size);
      let indexEnd = indexStart + 1;
      for (let j = i + 1; j < this.__dirtyItemIndices.length; j++) {
        const index = this.__dirtyItemIndices[j];
        if (Math.floor((index * pixelsPerItem) / size) != yoffset) {
          break;
        }
        if (index != indexEnd) {
          break;
        }
        indexEnd++;
      }

      // TODO: for contiguous blcoks, we create larger arrays and populate
      // and upload them in one step.
      const uploadCount = indexEnd - indexStart;
      const xoffset = (indexStart * pixelsPerItem) % size;
      const width = pixelsPerItem * uploadCount;
      const height = 1;
      const dataArray = new Float32Array(pixelsPerItem * 4 * uploadCount); // 4==RGBA pixels.

      for (let j = indexStart; j < indexEnd; j++) {
        const glgeomItem = this.__drawItems[j];
        // When an item is deleted, we allocate its index to the free list
        // and null this item in the array. skip over null items.
        if (!glgeomItem)
          continue;
        this.__populateDrawItemDataArray(glgeomItem, j - indexStart, dataArray);
      }

      if (typeId == gl.FLOAT) {
        gl.texSubImage2D(gl.TEXTURE_2D, 0, xoffset, yoffset, width, height, formatId, typeId, dataArray);
      } else {
        const unit16s = Math.convertFloat32ArrayToUInt16Array(dataArray);
        gl.texSubImage2D(gl.TEXTURE_2D, 0, xoffset, yoffset, width, height, formatId, typeId, unit16s);
      }

      i += uploadCount - 1;
    }


    this.__dirtyItemIndices = [];
  }

  finalize() {
    if (this.__dirtyItemIndices.length == 0)
      return;
    this.uploadGeomItems();
  }

  bind(renderstate) {
    const gl = this.__gl;
    const unifs = renderstate.unifs;
    if (this.__drawItemsTexture && unifs.instancesTexture) {
      this.__drawItemsTexture.bindToUniform(renderstate, unifs.instancesTexture);
      gl.uniform1i(unifs.instancesTextureSize.location, this.__drawItemsTexture.width);
    }
    return true;
  }

  bindShader(renderstate, glshader) {
    if (!glshader.bind(renderstate, this.constructor.name))
      return false;
    if (!this.bind(renderstate))
      return false;
    return true;
  }

  bindMaterial(renderstate, glmaterial) {
    return glmaterial.bind(renderstate);
  }
};

export {
  GLStandardGeomsPass
};
// export default GLPass;