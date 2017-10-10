import { Color, Signal } from '../Math';

import '../SceneTree/GeomItem.js';

// This class abstracts the rendering of a collection of geometries to screen.
class GLDrawItem {
    constructor(gl, geomItem, glGeom, id, flags=null) {
        this.__gl = gl;
        this.__geomItem = geomItem;
        this.__glGeom = glGeom;
        this.__id = id;
        this.__flags = flags;
        this.visible = this.__geomItem.getVisible(); 
        this.__culled = false;

        this.__color = geomItem.color ? geomItem.color : new Color(1,0,0,1);
        this.__wireColor = [0.2, 0.2, 0.2, 1.0];
        this.__lightmapName = geomItem.getLightmapName();

        this.transformChanged = new Signal();
        this.updated = new Signal();
        this.destructing = new Signal();
        this.visibilityChanged = new Signal();

        this.__geomItem.geomXfoChanged.connect((geomXfo) => {
            this.transformChanged.emit();
        });
        this.__geomItem.visibilityChanged.connect(this.__updateVisibility.bind(this));

        this.__geomItem.selectedChanged.connect((val) => {
            if(val)
                this.highlight();
            else
                this.unhighlight();
        });

        this.__glGeom.updated.connect(() => {
            this.updated.emit();
        });

        this.__geomItem.destructing.connect(() => {
            // Note: it is possible for several draw items to reference the same
            // GLGeom, so we should be maintaining a ref count, and only destroying 
            // when the last ref is removed.
            this.destroy();
        });
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

    getId(){
        return  this.__id;
    }

    getFlags(){
        return  this.__flags;
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

    __updateVisibility(){
        let geomVisible = this.__geomItem.getVisible();
        let visible = geomVisible && !this.__culled;
        if(this.visible != visible){
            this.visible = visible;
            this.visibilityChanged.emit(visible);
            this.updated.emit();
        }
    }

    setCullState(culled){
        this.__culled = culled;
        this.__updateVisibility();
    }

    bind(renderstate) {
        if (!this.__geomItem.getVisible())
            return false;

        let gl = this.__gl;
        let unifs = renderstate.unifs;
        
        if ('transformIndex' in unifs) {
            gl.uniform1i(unifs.transformIndex.location, this.__id);
        }


        return true;
    }


    destroy() {
        this.__geomItem.visibilityChanged.disconnectScope(this);
        this.__geomItem.globalXfoChanged.disconnectScope(this);
        this.__geomItem.selectedChanged.disconnectScope(this);
        this.__geomItem.destructing.disconnectScope(this);
        this.destructing.emit(this);
    }
};

export {
    GLDrawItem
};
// export default GLDrawItem;