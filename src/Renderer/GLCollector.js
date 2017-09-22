
import {
    Vec4,
    Signal
} from '../Math';
import {
    GeomItem,
    Points,
    Lines,
    Mesh,
    MeshProxy,
    sgFactory
} from '../SceneTree';
import {
    GLPoints
} from './GLPoints.js';
import {
    GLLines
} from './GLLines.js';
import {
    GLMesh
} from './GLMesh.js';
import {
    GLShader
} from './GLShader.js';
import {
    GLMaterial
} from './GLMaterial.js';
import {
    GLDrawItem
} from './GLDrawItem.js';
import {
    GLDrawItemSet
} from './GLDrawItemSet.js';
import {
    GLTexture2D
} from './GLTexture2D.js';


class GLShaderMaterials {
    constructor(glshader=undefined){
        this.__glshader = glshader;
        this.__glmaterialDrawItemSets = [];

    }

    getGLShader(){
        return this.__glshader;
    }

    addMaterialDrawItemSets(glmaterialDrawItemSets) {
        if (this.__glmaterialDrawItemSets.indexOf(glmaterialDrawItemSets) == -1)
            this.__glmaterialDrawItemSets.push(glmaterialDrawItemSets);
    }

    removeMaterialDrawItemSets(glmaterialDrawItemSets) {
        let index = this.__glmaterialDrawItemSets.indexOf(glmaterialDrawItemSets);
        this.__glmaterialDrawItemSets.splice(index, 1);
    }

    getMaterialDrawItemSets() {
        return this.__glmaterialDrawItemSets;
    }
}

class GLMaterialDrawItemSets {
    constructor(glmaterial=undefined){
        this.__glmaterial = glmaterial;
        this.__drawItemSets = [];
    }

    getGLMaterial(){
        return this.__glmaterial;
    }

    addDrawItemSet(drawItemSet) {
        if (this.__drawItemSets.indexOf(drawItemSet) == -1)
            this.__drawItemSets.push(drawItemSet);
    }

    removeDrawItemSet(drawItemSet) {
        let index = this.__drawItemSets.indexOf(drawItemSet);
        this.__drawItemSets.splice(index, 1);
    }

    findDrawItemSet(glgeom) {
        for(let drawItemSet of this.__drawItemSets){
            if(drawItemSet.getGLGeom() == glgeom)
                return drawItemSet;
        }
        return null;
    }

    getDrawItemSets() {
        return this.__drawItemSets;
    }
};

class GLCollector {
    constructor(renderer) {
        this.__renderer = renderer;
        this.__drawItems = [undefined];
        this.__drawItemsIndexFreeList = [];
        this.__geoms = [];

        this.__newItemIndices = [];

        this.__sceneItemFilters = [];
        this.__sceneItemFilters.push((treeItem) => {
            if (treeItem instanceof GeomItem) {
                if (!treeItem.getMetadata('gldrawItem')) {
                    if (treeItem.getMaterial() == undefined) {
                        console.warn ("Scene item :" + treeItem.getPath() + " has no material");
                        // TODO: listen for when the material is assigned.(like geoms below)
                    }
                    else if (treeItem.getGeometry() == undefined) {
                        // we will add this geomitem once it recieves its geom.
                        treeItem.geomAssigned.connect(()=>{
                            this.addGeomItem(treeItem);
                        })
                    }
                    else{
                        this.addGeomItem(treeItem);
                    }
                }
                return true;
            }
            return false;
        });

        // Un-Optimized Render Tree
        // Structured like so for efficient render traversial.
        // {GLShaders}[GLMaterials][GLGeoms][GLDrawItems]
        this.__glshadermaterials = {};

        this.renderTreeUpdated = new Signal();
        this.billboardDiscovered = new Signal();
        this.itemTransformChanged = new Signal();
    }

    getRenderer(){
        return this.__renderer;
    };

    registerSceneItemFilter(fn) {
        // insert at the beginning so it is called first.
        this.__sceneItemFilters.splice(0, 0, fn);
    }

    newItemsReadyForLoading() {
        return this.__newItemIndices.length > 0;
    };

    getGLShaderMaterials() {
        return this.__glshadermaterials;
    };

    getShaderMaterials(material) {

        // let glshaderMaterials = material.getMetadata('glshaderMaterials');
        // if (glshaderMaterials) {
        //     return glshaderMaterials;
        // }

        let glshaderMaterials;
        if (material.getShaderName() in this.__glshadermaterials) {
           glshaderMaterials = this.__glshadermaterials[material.getShaderName()];
        } else {
            let shader = sgFactory.constructClass(material.getShaderName(), this.__renderer.gl);
            if(!shader)
                return;
            glshaderMaterials = new GLShaderMaterials(shader);
            this.__glshadermaterials[material.getShaderName()] = glshaderMaterials;
        }

        // material.setMetadata('glshaderMaterials', glshaderMaterials);

        return glshaderMaterials;
    };

    addMaterial(material) {
        let glmaterialDrawItemSets = material.getMetadata('glmaterialDrawItemSets');
        if (glmaterialDrawItemSets) {
            return glmaterialDrawItemSets;
        }

        let glshaderMaterials = this.getShaderMaterials(material);
        if(!glshaderMaterials)
            return;

        let glmaterial = new GLMaterial(this.__renderer.gl, material, glshaderMaterials.getGLShader());
        glmaterial.updated.connect(()=>{
           this.__renderer.requestRedraw(); 
        });

        glmaterialDrawItemSets = new GLMaterialDrawItemSets(glmaterial);
        glshaderMaterials.addMaterialDrawItemSets(glmaterialDrawItemSets);

        material.setMetadata('glmaterialDrawItemSets', glmaterialDrawItemSets);

        material.shaderNameChanged.connect(() => {
            glshaderMaterials.removeMaterial(material);
            glshaderMaterials = this.getShaderMaterials(material);
        });

        material.destructing.connect(() => {
            this.removeMaterial(material);
        });

        return glmaterialDrawItemSets;
    };


    addGeom(geom) {
        let glgeom = geom.getMetadata('glgeom');
        if (glgeom) {
            return glgeom;
        }
        if (geom instanceof Mesh || geom instanceof MeshProxy) {
            glgeom = new GLMesh(this.__renderer.gl, geom);
        } else if (geom instanceof Lines) {
            glgeom = new GLLines(this.__renderer.gl, geom);
        } else if (geom instanceof Points) {
            glgeom = new GLPoints(this.__renderer.gl, geom);
        } else {
            throw ("Unsupported geom type:" + geom.constructor.name);
        }
        geom.setMetadata('glgeom', glgeom);
        this.__geoms.push(glgeom);
        return glgeom;
    };

    addGeomItem(geomItem) {
        let glmaterialDrawItemSets = this.addMaterial(geomItem.getMaterial());
        if(!glmaterialDrawItemSets)
            return;
        let glgeom = this.addGeom(geomItem.getGeometry());


        let flags = 1;
        let index;
        // Use recycled indices if there are any available...
        if (this.__drawItemsIndexFreeList.length > 0){
            index = this.__drawItemsIndexFreeList.pop();
            // We will need to re-populate the array from here.
            this.__transformsDataArrayHighWaterMark = index;
        }
        else {
            index = this.__drawItems.length;
            this.__drawItems.push(null);
        }
        this.__newItemIndices.push(index);

        let gldrawItem = new GLDrawItem(this.__renderer.gl, geomItem, glgeom, index, flags);
        geomItem.setMetadata('gldrawItem', gldrawItem);

        gldrawItem.updated.connect(()=> {
            this.__renderer.requestRedraw();
        });

        this.__drawItems[index] = gldrawItem;

        // Null the entry in the array. 
        // Note: we never remove the item, because
        // the DrawItem stores its index in the array,
        // and so cannot be moved.
        gldrawItem.destructing.connect(() => {
            this.removeDrawItem(gldrawItem);
            this.__renderer.requestRedraw()
        });

        gldrawItem.transformChanged.connect(() => {
            this.__updateItemInstanceData(index, gldrawItem);
            this.__renderer.requestRedraw()
        });

        let addDrawItemToGLMaterialDrawItemSet = ()=>{
            let drawItemSet = glmaterialDrawItemSets.findDrawItemSet(glgeom);
            if (!drawItemSet) {
                drawItemSet = new GLDrawItemSet(this.__renderer.gl, glgeom);
                glmaterialDrawItemSets.addDrawItemSet(drawItemSet);
            }
            drawItemSet.addDrawItem(gldrawItem);

            // Note: before the renderer is disabled, this is a  no-op.
            this.__renderer.requestRedraw();
        }
        addDrawItemToGLMaterialDrawItemSet();

        geomItem.materialAssigned.connect(()=>{
            glmaterialDrawItemSets = this.addMaterial(geomItem.getMaterial());
            addDrawItemToGLMaterialDrawItemSet();
        })

        return gldrawItem;
    };

    addTreeItem(treeItem) {

        for (let fn of this.__sceneItemFilters) {
            let rargs = { continueInSubTree: true };
            let handled = fn(treeItem, rargs);
            if (handled) {
                if (!rargs.continueInSubTree)
                    return;
                break;
            }
        }

        // Traverse the tree adding items till we hit the leaves(which are usually GeomItems.)
        for (let childItem of treeItem.getChildren()) {
            this.addTreeItem(childItem);
        }

        treeItem.childAdded.connect(this.__childAdded.bind(this));
        treeItem.destructing.connect(() => {
            treeItem.childAdded.disconnect(this.__childAdded.bind(this));
            treeItem.destructing.disconnectScope(this);
        });

        treeItem.globalXfoChanged.connect((newXfo, prevXfo) => {
            this.itemTransformChanged.emit(treeItem, prevXfo);
        });
    }

    __childAdded(child){
        this.addTreeItem(child);
    }

    removeDrawItem(gldrawItem) {
        let index = gldrawItem.getId();
        this.__drawItems[index] = null;
        this.__drawItemsIndexFreeList.push(index);
        gldrawItem.destructing.disconnectScope(this);
        gldrawItem.transformChanged.disconnectScope(this);

        this.renderTreeUpdated.emit();
        this.__renderer.requestRedraw();
    };

    removeMaterial(material) {
        let glshaderMaterials = this.__glshadermaterials[material.hash];
        if (!glshaderMaterials || glshaderMaterials != material.getMetadata('glshaderMaterials')) {
            console.warn("Material not found in GLCollector");
            return;
        }

        let glmaterialDrawItemSets = material.getMetadata('glmaterialDrawItemSets');
        glshaderMaterials.removeMaterialDrawItemSets(glmaterialDrawItemSets);
    };

    removeGLGeom(geomItemMapping, materialGeomMapping) {
        let index = materialGeomMapping.geomItemMappings.indexOf(geomItemMapping);
        materialGeomMapping.geomItemMappings.splice(index, 1);

        // Note: the GLMAterial cleans up iself now...
        // if(materialGeomMapping.geomItemMappings.length == 0 && !this.__explicitShader){
        //     this.removeMaterialGeomMapping(materialGeomMapping.glmaterial);
        // }
    };

    addGizmo(gizmo) {
        // let flags = 2;
        // let id = this.__gizmos.length;
        // gizmo.setGeomID(flags, id);

        for (let drawItem of gizmo.getDrawItems())
            this.addGeomItem(drawItem);

        this.__gizmoDataPass.addDrawItem(gizmo.getProxyItem());

        this.__gizmos.push(gizmo);
    };


    //////////////////////////////////////////////////////////
    /// DrawItem IDs

    getDrawItem(id) {
        if (id >= this.__drawItems.length)
            throw ("Invalid Draw Item id:" + id + " NumItems:" + (this.__drawItems.length-1));
        return this.__drawItems[id];
    };

    //////////////////////////////////////////////////
    // Optimization
    __populateTransformDataArray(gldrawItem, index, dataArray){

        let mat4 = gldrawItem.getGeomItem().getGeomXfo().toMat4();
        let lightmapCoordsOffset = gldrawItem.getGeomItem().getLightmapCoordsOffset();

        let stride = 16; // The number of floats per draw item.
        let offset = index * stride;
        let col0 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset);
        let col1 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset+4);
        let col2 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset+8);
        let col3 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset+12);
        col0.set(mat4.xAxis.x, mat4.yAxis.x, mat4.zAxis.x, mat4.translation.x);
        col1.set(mat4.xAxis.y, mat4.yAxis.y, mat4.zAxis.y, mat4.translation.y);
        col2.set(mat4.xAxis.z, mat4.yAxis.z, mat4.zAxis.z, mat4.translation.z);
        let flags = 0;
        // if(gldrawItem.isInverted())
        //     flags = 1;
        let materialId = 0;
        col3.set(lightmapCoordsOffset.x, lightmapCoordsOffset.y, materialId, flags);
    };
    
    finalize() {
        if(this.__newItemIndices.length == 0)
            return;

        let gl = this.__renderer.gl;
        let pixelsPerItem = 4; // The number of RGBA pixels per draw item.
        let stride = pixelsPerItem * 4; // The number of floats per draw item.
        let size = Math.round(Math.sqrt(this.__drawItems.length * stride) + 0.5);
        // Only support power 2 textures. Else we get strange corruption on some GPUs
        // in some scenes.
        size = Math.nextPow2(size);
        // Size should be a multiple of pixelsPerItem, so each geom item is always contiguous
        // in memory. (makes updating a lot easier. See __updateItemInstanceData below)
        if((size % pixelsPerItem) != 0)
            size += pixelsPerItem - (size % pixelsPerItem);

        // Re-allocate a new array once we hit the limit of the old one.
        let arraySize = (size * size) * pixelsPerItem;
        if(!this.__transformsDataArray || arraySize != this.__transformsDataArray.length){
            this.__transformsDataArray = new Float32Array(arraySize);
            this.__transformsDataArrayHighWaterMark = 0;
        }
        for (let i=this.__transformsDataArrayHighWaterMark; i<this.__drawItems.length; i++) {
            let gldrawItem = this.__drawItems[i];
            // When an item is deleted, we allocate its index to the free list
            // and null this item in the array. skip over null items.
            if(!gldrawItem)
                continue;
            this.__populateTransformDataArray(gldrawItem, i, this.__transformsDataArray);
        }
        this.__transformsDataArrayHighWaterMark = this.__drawItems.length;
        if(!this.__transformsTexture){
            this.__transformsTexture = new GLTexture2D(gl, {
                channels: 'RGBA',
                format: 'FLOAT',
                width: size,
                height: size,
                filter: 'NEAREST',
                wrap: 'CLAMP_TO_EDGE',
                data: this.__transformsDataArray,
                mipMapped: false
            });
        }
        else{
            this.__transformsTexture.resize(size, size, this.__transformsDataArray);
        }

        this.__newItemIndices = [];
        this.renderTreeUpdated.emit();
    };

    __updateItemInstanceData(index, gldrawItem){
        if(!this.__transformsTexture)
            return;
        // There are items ready to be finalized
        if(this.__newItemIndices.indexOf(index) != -1)
            return;

        let gl = this.__renderer.gl;
        let pixelsPerItem = 4; // The number of RGBA pixels per draw item.
        let stride = pixelsPerItem * 4; // The number of floats per draw item.
        let dataArray = new Float32Array(stride);
        this.__populateTransformDataArray(gldrawItem, 0, dataArray);

        gl.bindTexture(gl.TEXTURE_2D, this.__transformsTexture.glTex);
        let size = this.__transformsTexture.width;

        let xoffset = (index * pixelsPerItem) % size;
        let yoffset = Math.floor((index * pixelsPerItem) / size);
        let width = pixelsPerItem;
        let height = 1;
        
        gl.texSubImage2D(gl.TEXTURE_2D, 0, xoffset, yoffset, width, height, gl.RGBA, gl.FLOAT, dataArray);

        let floatOffset = index * stride;
        for(let i=0; i<stride; i++)
            this.__transformsDataArray[floatOffset + i] = dataArray[i];
    };

    bind(renderstate) {
        let gl = this.__renderer.gl;
        let unifs = renderstate.unifs;
        if(this.__transformsTexture && unifs.instancesTexture){
            this.__transformsTexture.bindTexture(renderstate, 'instancesTexture');
            gl.uniform1i(unifs.instancesTextureSize.location, this.__transformsTexture.width);
        }
        return true;
    };

};

export {
    GLShaderMaterials,
    GLMaterialDrawItemSets,
    GLCollector
};

