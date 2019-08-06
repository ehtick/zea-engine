import {
  Color
} from '../Math';
import {
  Signal
} from '../Utilities';

import '../SceneTree/GeomItem.js';


const GLGeomItemChangeType = {
  TRANSFORM_CHANGED: 0,
  GEOM_CHANGED: 1,
  VISIBILITY_CHANGED: 2,
  HIGHLIGHT_CHANGED: 3
};


// This class abstracts the rendering of a collection of geometries to screen.
class GLGeomItem {
  constructor(gl, geomItem, glGeom, id, flags = null) {
    this.gl = gl;
    this.geomItem = geomItem;
    this.glGeom = glGeom;
    this.id = id;
    this.flags = flags;
    this.visible = this.geomItem.getVisible();
    this.culled = false;

    this.lightmapName = geomItem.getLightmapName();
    this.updated = new Signal();
    this.destructing = new Signal();
    this.visibilityChanged = new Signal();
    this.highlightChanged = geomItem.highlightChanged;

    this.updateVisibility = this.updateVisibility.bind(this);
    this.destroy = this.destroy.bind(this);

    if (!gl.floatTexturesSupported) {
      this.updateXfo = (geomXfo) => {
        this.updateGeomMatrix();
      };
    } else {
      this.updateXfo = (geomXfo) => {
        this.updated.emit(GLGeomItemChangeType.TRANSFORM_CHANGED);
      };
    }

    this.geomItem.geomXfoChanged.connect(this.updateXfo);
    this.geomItem.visibilityChanged.connect(this.updateVisibility);
    this.geomItem.destructing.connect(this.destroy);
    this.highlightChangedId = this.geomItem.highlightChanged.connect(() => {
      this.updated.emit(GLGeomItemChangeType.HIGHLIGHT_CHANGED);
    });
    this.glGeom.updated.connect(() => {
      this.updated.emit(GLGeomItemChangeType.GEOM_CHANGED);
    });

    const lightmapCoordsOffset = this.geomItem.getLightmapCoordsOffset();
    const materialId = 0;
    const geomId = 0;
    this.geomData = [lightmapCoordsOffset.x, lightmapCoordsOffset.y, materialId, geomId];
  }

  getGeomItem() {
    return this.geomItem;
  }

  getGLGeom() {
    return this.glGeom;
  }

  getVisible() {
    return this.geomItem.getVisible();
  }

  getId() {
    return this.id;
  }

  getFlags() {
    return this.flags;
  }

  updateVisibility() {
    const geomVisible = this.geomItem.getVisible();
    const visible = geomVisible && !this.culled;
    if (this.visible != visible) {
      this.visible = visible;
      this.visibilityChanged.emit(visible);
      this.updated.emit();
    }
  }

  setCullState(culled) {
    this.culled = culled;
    this.updateVisibility();
  }

  updateGeomMatrix() {
    // Pull on the GeomXfo param. This will trigger the lazy evaluation of the operators in the scene.
    this.modelMatrixArray = this.geomItem.getGeomXfo().toMat4().asArray();
  }

  getGeomMatrixArray() {
    return this.modelMatrixArray;
  }

  bind(renderstate) {

    const gl = this.gl;
    const unifs = renderstate.unifs;

    if (!gl.floatTexturesSupported) {
      let modelMatrixunif = unifs.modelMatrix;
      if (modelMatrixunif) {
        gl.uniformMatrix4fv(modelMatrixunif.location, false, this.modelMatrixArray);
      }
      let drawItemDataunif = unifs.drawItemData;
      if (drawItemDataunif) {
        gl.uniform4f(drawItemDataunif.location, this.geomData);
      }
    }

    const unif = unifs.transformIndex;
    if (unif) {
      gl.uniform1i(unif.location, this.id);
    }

    if (renderstate.lightmaps && unifs.lightmap) {
      if (renderstate.boundLightmap != this.lightmapName) {
        const gllightmap = renderstate.lightmaps[this.lightmapName];
        if (gllightmap && gllightmap.glimage.isLoaded()) {
          gllightmap.glimage.bindToUniform(renderstate, unifs.lightmap);
          gl.uniform2fv(unifs.lightmapSize.location, gllightmap.atlasSize.asArray());
          if (unifs.lightmapConnected) {
            gl.uniform1i(unifs.lightmapConnected.location, true);
          }
          renderstate.boundLightmap = this.lightmapName;
        } else {
          // disable lightmaps. Revert to default lighting.
          if (unifs.lightmapConnected) {
            gl.uniform1i(unifs.lightmapConnected.location, false);
          }
        }
      }
    }
    
    return true;
  }


  destroy() {
    this.geomItem.visibilityChanged.disconnect(this.updateVisibility);
    this.geomItem.geomXfoChanged.disconnect(this.updateXfo);
    this.geomItem.highlightChanged.disconnectId(this.highlightChangedId);
    this.geomItem.destructing.disconnect(this.destroy);
    this.destructing.emit(this);
  }
};

export {
  GLGeomItemChangeType,
  GLGeomItem
};
// export default GLGeomItem;