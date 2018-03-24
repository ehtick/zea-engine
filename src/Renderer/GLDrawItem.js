import {
    Color
} from '../Math';
import {
    Signal
} from '../Utilities';

import '../SceneTree/GeomItem.js';

// This class abstracts the rendering of a collection of geometries to screen.
class GLDrawItem {
    constructor(gl, geomItem, glGeom, id, flags = null) {
        this.__gl = gl;
        this.__geomItem = geomItem;
        this.__glGeom = glGeom;
        this.__id = id;
        this.__flags = flags;
        this.visible = this.__geomItem.getVisible();
        this.__culled = false;

        this.__color = geomItem.color ? geomItem.color : new Color(1, 0, 0, 1);
        this.__wireColor = [0.2, 0.2, 0.2, 1.0];
        this.__lightmapName = geomItem.getLightmapName();

        this.transformChanged = new Signal();
        this.updated = new Signal();
        this.destructing = new Signal();
        this.visibilityChanged = new Signal();

        this.__updateVisibility = this.__updateVisibility.bind(this);
        this.destroy = this.destroy.bind(this);

        if (!gl.floatTexturesSupported) {
            this.__updateXfo = (geomXfo) => {
                this.updateGeomMatrix();
            };
        } else {
            this.__updateXfo = (geomXfo) => {
                this.transformChanged.emit();
            };
        }

        this.__updateSelection = (val) => {
            if (val)
                this.highlight();
            else
                this.unhighlight();
        }

        this.__geomItem.geomXfoChanged.connect(this.__updateXfo);
        this.__geomItem.visibilityChanged.connect(this.__updateVisibility);
        this.__geomItem.selectedChanged.connect(this.__updateSelection);
        this.__geomItem.destructing.connect(this.destroy);

        this.__glGeom.updated.connect(() => {
            this.updated.emit();
        });



        let lightmapCoordsOffset = this.__geomItem.getLightmapCoordsOffset();
        let materialId = 0;
        let geomId = 0;
        this.__geomData = [lightmapCoordsOffset.x, lightmapCoordsOffset.y, materialId, geomId];
    }

    getGeomItem() {
        return this.__geomItem;
    }

    getGLGeom() {
        return this.__glGeom;
    }

    getVisible() {
        return this.__geomItem.getVisible();
    }

    // isInverted(){
    //     return this.__inverted;
    // }

    // TODO: this system isn't super nice.
    // Maybe all GeomItems should be assigned a color. (Currently only GizmoITem has a color)
    getColor() {
        return this.__color;
    }

    setColor(val) {
        this.__color = val;
    }

    getId() {
        return this.__id;
    }

    getFlags() {
        return this.__flags;
    }

    highlight() {
        this.__wireColor = [1.0, 1.0, 1.0, 1.0];
        // Note: not connnected
        //this.updated.emit();
    }

    unhighlight() {
        this.__wireColor = [0.2, 0.2, 0.2, 1.0];
        // Note: not connnected
        //this.updated.emit();
    }

    __updateVisibility() {
        let geomVisible = this.__geomItem.getVisible();
        let visible = geomVisible && !this.__culled;
        if (this.visible != visible) {
            this.visible = visible;
            this.visibilityChanged.emit(visible);
            this.updated.emit();
        }
    }

    setCullState(culled) {
        this.__culled = culled;
        this.__updateVisibility();
    }

    updateGeomMatrix() {
        // Pull on the GeomXfo param. This will trigger the lazy evaluation of the operators in the scene.
        this.__modelMatrixArray = this.__geomItem.getGeomXfo().toMat4().asArray();
    }

    getGeomMatrixArray() {
        return this.__modelMatrixArray;
    }

    bind(renderstate) {

        let gl = this.__gl;
        let unifs = renderstate.unifs;

        if (!gl.floatTexturesSupported) {
            let modelMatrixunif = unifs.modelMatrix;
            if (modelMatrixunif) {
                gl.uniformMatrix4fv(modelMatrixunif.location, false, this.__modelMatrixArray);
            }
            let drawItemDataunif = unifs.drawItemData;
            if (drawItemDataunif) {
                gl.uniform4f(drawItemDataunif.location, this.__geomData);
            }
        }

        let unif = unifs.transformIndex;
        if (unif) {
            gl.uniform1i(unif.location, this.__id);
        }

        return true;
    }


    destroy() {
        this.__geomItem.visibilityChanged.disconnect(this.__updateVisibility);
        this.__geomItem.globalXfoChanged.disconnect(this.__updateXfo);
        this.__geomItem.selectedChanged.disconnect(this.__updateSelection);
        this.__geomItem.destructing.disconnect(this.destroy);
        this.destructing.emit(this);
    }
};

export {
    GLDrawItem
};
// export default GLDrawItem;