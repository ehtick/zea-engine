import {
    Vec4
} from '../Math';
import {
    Signal
} from '../Utilities';
import {
    AudioItem,
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
    constructor(glshader = undefined) {
        this.glshader = glshader;
        this.glmaterialDrawItemSets = [];

    }

    getGLShader() {
        return this.glshader;
    }

    addMaterialDrawItemSets(glmaterialDrawItemSets) {
        if (this.glmaterialDrawItemSets.indexOf(glmaterialDrawItemSets) == -1)
            this.glmaterialDrawItemSets.push(glmaterialDrawItemSets);
    }

    removeMaterialDrawItemSets(glmaterialDrawItemSets) {
        let index = this.glmaterialDrawItemSets.indexOf(glmaterialDrawItemSets);
        this.glmaterialDrawItemSets.splice(index, 1);
    }

    getMaterialDrawItemSets() {
        return this.glmaterialDrawItemSets;
    }
}

class GLMaterialDrawItemSets {
    constructor(glmaterial = undefined) {
        this.glmaterial = glmaterial;
        this.drawItemSets = [];
    }

    getGLMaterial() {
        return this.glmaterial;
    }

    addDrawItemSet(drawItemSet) {
        if (this.drawItemSets.indexOf(drawItemSet) == -1)
            this.drawItemSets.push(drawItemSet);
    }

    removeDrawItemSet(drawItemSet) {
        let index = this.drawItemSets.indexOf(drawItemSet);
        this.drawItemSets.splice(index, 1);
    }

    findDrawItemSet(glgeom) {
        for (let drawItemSet of this.drawItemSets) {
            if (drawItemSet.getGLGeom() == glgeom)
                return drawItemSet;
        }
        return null;
    }

    getDrawItemSets() {
        return this.drawItemSets;
    }
};

class GLCollector {
    constructor(renderer) {
        this.__renderer = renderer;
        this.__drawItems = [undefined];
        this.__drawItemsIndexFreeList = [];
        this.__geoms = [];

        this.__newItemsAdded = false;
        this.__dirtyItemIndices = [];

        this.__sceneItemFilters = [];
        this.__sceneItemFilters.push((treeItem) => {
            if (treeItem instanceof GeomItem) {
                if (!treeItem.getMetadata('gldrawItem')) {
                    if (treeItem.getMaterial() == undefined) {
                        console.warn("Scene item :" + treeItem.getPath() + " has no material");
                        // TODO: listen for when the material is assigned.(like geoms below)
                    } else if (treeItem.getGeometry() == undefined) {
                        // we will add this geomitem once it recieves its geom.
                        treeItem.geomAssigned.connect(() => {
                            this.addGeomItem(treeItem);
                        })
                    } else {
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

        this.__childAdded = this.__childAdded.bind(this)
        this.__treeItemDestructing = this.__treeItemDestructing.bind(this)


        this.__audioItems = [];
        this.registerSceneItemFilter((treeItem, rargs) => {
            if (treeItem instanceof AudioItem) {
                const audioSource = treeItem.getDOMElement();
                if (audioSource instanceof HTMLMediaElement)
                    this.addAudioItem(treeItem, audioSource, treeItem);
                return true;
            }
            if (treeItem instanceof GeomItem) {
                const material = treeItem.getMaterial();
                const baseColorParam = material.getParameter('baseColor');
                if(baseColorParam && baseColorParam.getImage && baseColorParam.getImage()) {
                    const image = baseColorParam.getImage();
                    const audioSource = image.getDOMElement();
                    if (audioSource instanceof HTMLMediaElement)
                        this.addAudioItem(treeItem, audioSource, image);
                }
                // Let other filters handle this item.
                return false;
            }
        });

    }

    getRenderer() {
        return this.__renderer;
    };

    registerSceneItemFilter(fn) {
        // insert at the beginning so it is called first.
        this.__sceneItemFilters.splice(0, 0, fn);
    }

    getGLShaderMaterials() {
        return this.__glshadermaterials;
    };

    addAudioItem(treeItem, audioSource, parameterOwner) {

        if(audioSource.addedToCollector)
            return;

        const audioCtx = this.__renderer.getAudioContext();
        let source;
        if (audioSource instanceof HTMLMediaElement)
            source = audioCtx.createMediaElementSource(audioSource);
        else {
            source = audioCtx.createMediaStreamSource(audioSource);
        }

        const connectVLParamToAudioNodeParam = (vlParam, param) => {
            // param.setTargetAtTime(vlParam.getValue(), audioCtx.currentTime, 0.2);
            param.value = vlParam.getValue();
            vlParam.valueChanged.connect(() => {
                // param.setTargetAtTime(vlParam.getValue(), audioCtx.currentTime);
                param.value = vlParam.getValue();
            });
        }

        const gainNode = audioCtx.createGain();
        connectVLParamToAudioNodeParam(parameterOwner.getParameter('Gain'), gainNode.gain);

        source.connect(gainNode);
        const panner = audioCtx.createPanner();
        panner.panningModel = 'HRTF';
        panner.distanceModel = 'inverse';

        const connectVLParamToAudioNode = (paramName) => {
            const vlParam = parameterOwner.getParameter(paramName)
            panner[paramName] = vlParam.getValue();
            vlParam.valueChanged.connect(() => {
                panner[paramName] = vlParam.getValue();
            });
        }

        connectVLParamToAudioNode('refDistance');
        connectVLParamToAudioNode('maxDistance');
        connectVLParamToAudioNode('rolloffFactor');
        connectVLParamToAudioNode('coneInnerAngle');
        connectVLParamToAudioNode('coneOuterAngle');
        connectVLParamToAudioNode('coneOuterGain');


        const updatePannerNodePosition = () => {
            let xfo;
            if(treeItem instanceof GeomItem)
                xfo = treeItem.getGeomXfo();
            else
                xfo = treeItem.getGlobalXfo();
            if (panner.positionX) {
                // panner.positionX.setTargetAtTime(xfo.tr.x, audioCtx.currentTime);
                // panner.positionY.setTargetAtTime(xfo.tr.y, audioCtx.currentTime);
                // panner.positionZ.setTargetAtTime(xfo.tr.z, audioCtx.currentTime);
                panner.positionX.value = xfo.tr.x;
                panner.positionY.value = xfo.tr.y;
                panner.positionZ.value = xfo.tr.z;
            } else {
                panner.setPosition(xfo.tr.x, xfo.tr.y, xfo.tr.z);
            }

            const dir = xfo.ori.getZaxis();
            if (panner.orientationX) {
                // panner.orientationX.setTargetAtTime(dir.x, audioCtx.currentTime);
                // panner.orientationY.setTargetAtTime(dir.y, audioCtx.currentTime);
                // panner.orientationZ.setTargetAtTime(dir.z, audioCtx.currentTime);
                panner.orientationX.value = dir.x;
                panner.orientationY.value = dir.y;
                panner.orientationZ.value = dir.z;
            } else {
                panner.setOrientation(dir.x, dir.y, dir.z);
            }

            // TODO: 
            // setVelocity()
        }
        updatePannerNodePosition();
        treeItem.globalXfoChanged.connect((changeType) => {
            updatePannerNodePosition();
        });


        gainNode.connect(panner);
        panner.connect(audioCtx.destination);

        audioSource.addedToCollector = true;
        this.__audioItems.push({ treeItem, audioSource, parameterOwner });
    }

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
            if (!shader)
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
        if (!glshaderMaterials)
            return;

        let glmaterial = new GLMaterial(this.__renderer.gl, material, glshaderMaterials.getGLShader());
        glmaterial.updated.connect(() => {
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
        if (!glmaterialDrawItemSets)
            return;
        let glgeom = this.addGeom(geomItem.getGeometry());


        let flags = 1;
        let index;
        // Use recycled indices if there are any available...
        if (this.__drawItemsIndexFreeList.length > 0) {
            index = this.__drawItemsIndexFreeList.pop();
        } else {
            index = this.__drawItems.length;
            this.__drawItems.push(null);
        }
        this.__dirtyItemIndices.push(index);

        let gldrawItem = new GLDrawItem(this.__renderer.gl, geomItem, glgeom, index, flags);
        geomItem.setMetadata('gldrawItem', gldrawItem);

        gldrawItem.updated.connect(() => {
            this.__renderer.requestRedraw();
        });

        this.__drawItems[index] = gldrawItem;

        // Null the entry in the array. 
        // Note: we never remove the item, because
        // the DrawItem stores its index in the array,
        // and so cannot be moved.
        gldrawItem.destructing.connect(() => {
            this.removeDrawItem(gldrawItem);
            this.__renderer.requestRedraw();
        });

        gldrawItem.transformChanged.connect(() => {
            this.__dirtyItemIndices.push(index);
            // this.__updateItemInstanceData(index, gldrawItem);
            this.__renderer.requestRedraw();
        });

        let addDrawItemToGLMaterialDrawItemSet = () => {
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

        geomItem.materialAssigned.connect(() => {
            glmaterialDrawItemSets = this.addMaterial(geomItem.getMaterial());
            addDrawItemToGLMaterialDrawItemSet();
        })

        this.__newItemsAdded = true;
        return gldrawItem;
    };

    addTreeItem(treeItem) {

        for (let fn of this.__sceneItemFilters) {
            let rargs = {
                continueInSubTree: true
            };
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

        treeItem.childAdded.connect(this.__childAdded);
        treeItem.destructing.connect(this.__treeItemDestructing);

        treeItem.globalXfoChanged.connect((newXfo, prevXfo) => {
            this.itemTransformChanged.emit(treeItem, prevXfo);
        });
    }

    __childAdded(child) {
        this.addTreeItem(child);
    }

    __treeItemDestructing(treeItem) {
        treeItem.childAdded.disconnect(this.__childAdded);
        treeItem.destructing.disconnect(this.__treeItemDestructing);
    }

    removeDrawItem(gldrawItem) {
        let index = gldrawItem.getId();
        this.__drawItems[index] = null;
        this.__drawItemsIndexFreeList.push(index);

        // TODO: review signal disconnections
        // gldrawItem.destructing.disconnectScope(this);
        // gldrawItem.transformChanged.disconnectScope(this);

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
        if (id >= this.__drawItems.length) {
            console.warn("Invalid Draw Item id:" + id + " NumItems:" + (this.__drawItems.length - 1));
            return undefined;
        }
        return this.__drawItems[id];
    };

    //////////////////////////////////////////////////
    // Data Uploading
    __populateTransformDataArray(gldrawItem, index, dataArray) {

        let mat4 = gldrawItem.getGeomItem().getGeomXfo().toMat4();
        let lightmapCoordsOffset = gldrawItem.getGeomItem().getLightmapCoordsOffset();

        let stride = 16; // The number of floats per draw item.
        let offset = index * stride;
        let col0 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset);
        let col1 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset + 4);
        let col2 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset + 8);
        let col3 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset + 12);
        col0.set(mat4.xAxis.x, mat4.yAxis.x, mat4.zAxis.x, mat4.translation.x);
        col1.set(mat4.xAxis.y, mat4.yAxis.y, mat4.zAxis.y, mat4.translation.y);
        col2.set(mat4.xAxis.z, mat4.yAxis.z, mat4.zAxis.z, mat4.translation.z);

        let materialId = 0;
        let geomId = 0;
        col3.set(lightmapCoordsOffset.x, lightmapCoordsOffset.y, materialId, geomId);
    };

    newItemsReadyForLoading() {
        return this.__dirtyItemIndices.length > 0;
    };

    uploadDrawItems() {

        const gl = this.__renderer.gl;
        if (!gl.floatTexturesSupported) {
            // Pull on the GeomXfo params. This will trigger the lazy evaluation of the operators in the scene.
            const len = this.__dirtyItemIndices.length;
            for (let i = 0; i < len; i++){
                const drawItem = this.__drawItems[this.__dirtyItemIndices[i]];
                if(drawItem){
                    drawItem.updateGeomMatrix();
                }
            }
            this.__dirtyItemIndices = [];
            this.renderTreeUpdated.emit();
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
                channels: 'RGBA',
                format: 'FLOAT',
                width: size,
                height: size,
                filter: 'NEAREST',
                wrap: 'CLAMP_TO_EDGE',
                mipMapped: false
            });
        } else if (this.__drawItemsTexture.width != size) {
            this.__drawItemsTexture.resize(size, size);
            this.__dirtyItemIndices = Array((size * size) / pixelsPerItem).fill().map((v, i) => i);
        }

        gl.bindTexture(gl.TEXTURE_2D, this.__drawItemsTexture.glTex);
        const formatId = this.__drawItemsTexture.getFormatID();
        const channelsId = this.__drawItemsTexture.getChannelsID();

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
                const gldrawItem = this.__drawItems[j];
                // When an item is deleted, we allocate its index to the free list
                // and null this item in the array. skip over null items.
                if (!gldrawItem)
                    continue;
                this.__populateTransformDataArray(gldrawItem, j - indexStart, dataArray);
            }

            if (formatId == gl.FLOAT) {
                gl.texSubImage2D(gl.TEXTURE_2D, 0, xoffset, yoffset, width, height, channelsId, formatId, dataArray);
            } else {
                const unit16s = Math.convertFloat32ArrayToUInt16Array(dataArray);
                gl.texSubImage2D(gl.TEXTURE_2D, 0, xoffset, yoffset, width, height, channelsId, formatId, unit16s);
            }

            i += uploadCount - 1;
        }


        this.__dirtyItemIndices = [];
    };


    finalize() {
        if (this.__dirtyItemIndices.length == 0)
            return;
        this.uploadDrawItems();
        
        if(this.__newItemsAdded) {
            this.renderTreeUpdated.emit();
            this.__newItemsAdded = false;
        }
    }


    bind(renderstate) {
        let gl = this.__renderer.gl;
        let unifs = renderstate.unifs;
        if (this.__drawItemsTexture && unifs.instancesTexture) {
            this.__drawItemsTexture.bindToUniform(renderstate, unifs.instancesTexture);
            gl.uniform1i(unifs.instancesTextureSize.location, this.__drawItemsTexture.width);
        }
        return true;
    };

};

export {
    GLShaderMaterials,
    GLMaterialDrawItemSets,
    GLCollector
};