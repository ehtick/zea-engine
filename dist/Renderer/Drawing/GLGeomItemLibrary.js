/* eslint-disable guard-for-in */
import { EventEmitter } from '../../Utilities/index';
import { Vec4 } from '../../Math/index';
import { GLGeomItemFlags, GLGeomItem } from './GLGeomItem';
import { MathFunctions } from '../../Utilities/MathFunctions';
import { GLTexture2D } from '../GLTexture2D';
// import { handleMessage } from './GLGeomItemLibraryCullingWorker'
// @ts-ignore
import GLGeomItemLibraryCullingWorker from 'web-worker:./GLGeomItemLibraryCulling-worker.js';
const pixelsPerItem = 6; // The number of RGBA pixels per draw item.
/** Class for managing all the GeomItems discovered in the SceneTree.
 * @private
 */
class GLGeomItemLibrary extends EventEmitter {
    /**
     * Create a GLGeomItemLibrary.
     * @param renderer - The renderer instance
     * @param options - The options object passed to the GLRenderer constructor.
     */
    constructor(renderer, options) {
        super();
        this.dirtyWorkerItemIndices = new Set();
        this.glGeomItemsTexture = null;
        this.renderer = renderer;
        this.glGeomItems = [];
        this.glGeomItemEventHandlers = [];
        this.glGeomItemsMap = {};
        this.glGeomItemsIndexFreeList = [];
        this.dirtyItemIndices = [];
        // Items that have transform or bounding box changes and need to be updated in the worker.
        this.dirtyWorkerItemIndices = new Set();
        this.removedItemIndices = [];
        this.enableFrustumCulling = options.enableFrustumCulling;
        if (this.enableFrustumCulling) {
            this.setupCullingWorker(renderer);
        }
    }
    /**
     * Sets up the Culling Worker to start calculating frustum culling.
     * @param renderer - The renderer instance
     */
    setupCullingWorker(renderer) {
        // this.worker = {
        //   postMessage: (message) => {},
        // }
        this.worker = new GLGeomItemLibraryCullingWorker();
        // this.worker = {
        //   postMessage: (message) => {
        //     handleMessage(message, (message) => {
        //       this.worker.onmessage({data: message })
        //     })
        //   },
        // }
        let workerReady = true;
        this.worker.onmessage = (message) => {
            if (message.data.type == 'CullResults') {
                this.applyCullResults(message.data);
            }
            else if (message.data.type == 'Done') {
                // Used mostly to make our uni testing robust.
                this.renderer.emit('CullingUpdated');
            }
            workerReady = true;
        };
        const viewportChanged = () => {
            const viewport = renderer.getViewport();
            const camera = renderer.getViewport().getCamera();
            const aspectRatio = viewport.getWidth() / viewport.getHeight();
            if (camera.isOrthographic()) {
                const frustumHeight = camera.getFrustumHeight();
                const frustumWidth = frustumHeight * aspectRatio;
                this.worker.postMessage({
                    type: 'ViewportChanged',
                    frustumHeight,
                    frustumWidth,
                    isOrthographic: true,
                    solidAngleLimit: renderer.solidAngleLimit,
                });
            }
            else {
                const frustumHalfAngleY = camera.getFov() * 0.5;
                const frustumHalfAngleX = Math.atan(Math.tan(frustumHalfAngleY) * aspectRatio);
                this.worker.postMessage({
                    type: 'ViewportChanged',
                    frustumHalfAngleX,
                    frustumHalfAngleY,
                    isOrthographic: false,
                    solidAngleLimit: renderer.solidAngleLimit,
                });
            }
        };
        renderer.on('resized', viewportChanged);
        const camera = renderer.getViewport().getCamera();
        camera.on('projectionParamChanged', (event) => {
            if (camera.isOrthographic()) {
                viewportChanged();
            }
        });
        viewportChanged();
        renderer.once('xrViewportSetup', (event) => {
            const xrvp = event.xrViewport;
            xrvp.on('presentingChanged', (event) => {
                if (event.state) {
                    cullFreq = 10;
                    // Note: We approximate the culling viewport to be
                    // a wider version of the 2 eye frustums merged together.
                    // Wider, so that items are considered visible before the are in view.
                    // Note each VR headset comes with its own FOV, and I can't seem to be
                    // able to get it from the WebXR API, so I am putting in some guesses
                    // based on this diagram: https://blog.mozvr.com/content/images/2016/02/human-visual-field.jpg
                    const degToRad = Math.PI / 180;
                    const frustumHalfAngleY = 62 * degToRad;
                    const frustumHalfAngleX = 50 * degToRad;
                    this.worker.postMessage({
                        type: 'ViewportChanged',
                        frustumHalfAngleX,
                        frustumHalfAngleY,
                        isOrthographic: false,
                        solidAngleLimit: renderer.solidAngleLimit * 2,
                    });
                }
                else {
                    cullFreq = 5;
                    viewportChanged();
                    // push the camera xfo to the worker.
                    forceViewChanged();
                }
            });
        });
        let tick = 0;
        let cullFreq = 5;
        renderer.on('viewChanged', (event) => {
            // Calculate culling every Nth frame.
            if (workerReady) {
                if (tick % cullFreq == 0) {
                    workerReady = false;
                    const pos = event.viewXfo.tr;
                    const ori = event.viewXfo.ori;
                    this.worker.postMessage({
                        type: 'ViewChanged',
                        cameraPos: pos.asArray(),
                        cameraOri: ori.asArray(),
                        solidAngleLimit: renderer.solidAngleLimit,
                    });
                }
                tick++;
            }
        });
        const forceViewChanged = () => {
            const camera = renderer.getViewport().getCamera();
            const viewXfo = camera.globalXfoParam.value;
            const pos = viewXfo.tr;
            const ori = viewXfo.ori;
            this.worker.postMessage({
                type: 'ViewChanged',
                cameraPos: pos.asArray(),
                cameraOri: ori.asArray(),
                solidAngleLimit: renderer.solidAngleLimit,
            });
        };
        // If a movement finishes, we should update the culling results
        // based on the last position. (we might have skipped it in the viewChanged handler above)
        renderer.getViewport().getCamera().on('movementFinished', forceViewChanged);
        // Initialize the view values on the worker.
        forceViewChanged();
    }
    /**
     * The addGeomItem method.
     * @param geomItem - The geomItem value.
     * @return - The index of GLGeomItem
     */
    addGeomItem(geomItem) {
        let index = this.glGeomItemsMap[geomItem.getId()]; //  number | undefined
        if (index != undefined) {
            // Increment the ref count for the GLGeom
            return this.glGeomItems[index];
        }
        // ///////////////////////////////////////////
        // Material
        const materialParam = geomItem.materialParam;
        let material = materialParam.value;
        // Add the material here so that when we populate the GeomItem texture.
        // the material already has an Id.
        let matIndex = -1;
        {
            matIndex = this.renderer.glMaterialLibrary.addMaterial(material);
        }
        const materialChanged = () => {
            // Ref count the materials in the material library.
            this.renderer.glMaterialLibrary.removeMaterial(material);
            material = materialParam.value;
            glGeomItem.materialId = this.renderer.glMaterialLibrary.addMaterial(material);
            geomItemChanged();
        };
        materialParam.on('valueChanged', materialChanged);
        // ///////////////////////////////////////////
        // Geometry
        const geomParm = geomItem.geomParam;
        let geom = geomParm.value;
        const geomIndex = this.renderer.glGeomLibrary.addGeom(geom);
        const geomChanged = (event) => {
            this.renderer.glGeomLibrary.removeGeom(geom);
            geom = geomParm.value;
            glGeomItem.geomId = this.renderer.glGeomLibrary.addGeom(geom);
            if (this.enableFrustumCulling)
                this.dirtyWorkerItemIndices.add(index);
            geomItemChanged();
        };
        geomParm.on('valueChanged', geomChanged);
        // ///////////////////////////////////////////
        // GeomItem
        // Use recycled indices if there are any available...
        if (this.glGeomItemsIndexFreeList.length > 0) {
            index = this.glGeomItemsIndexFreeList.pop();
        }
        else {
            index = this.glGeomItems.length;
            this.glGeomItems.push(null);
        }
        // If an item is removed and re-added immediately, we avoid removing the item from the culling worker.
        if (this.removedItemIndices.includes(index)) {
            this.removedItemIndices.splice(this.removedItemIndices.indexOf(index), 1);
        }
        this.dirtyItemIndices.push(index);
        const gl = this.renderer.gl;
        const supportInstancing = gl.floatTexturesSupported;
        const glGeomItem = new GLGeomItem(gl, geomItem, index, geomIndex, matIndex, supportInstancing);
        const geomItemChanged = () => {
            if (this.dirtyItemIndices.includes(index))
                return;
            this.dirtyItemIndices.push(index);
            this.renderer.drawItemChanged();
        };
        geomItem.geomMatParam.on('valueChanged', geomItemChanged);
        geomItem.on('cutAwayChanged', geomItemChanged);
        geomItem.on('highlightChanged', geomItemChanged);
        geomItem.on('selectabilityChanged', geomItemChanged);
        const workerItemDataChanged = () => {
            if (this.enableFrustumCulling) {
                if (!this.dirtyWorkerItemIndices.has(index)) {
                    this.dirtyWorkerItemIndices.add(index);
                    this.renderer.drawItemChanged();
                }
            }
        };
        if (this.enableFrustumCulling) {
            this.dirtyWorkerItemIndices.add(index);
        }
        geomItem.on('visibilityChanged', workerItemDataChanged);
        geomItem.geomMatParam.on('valueChanged', workerItemDataChanged);
        geomParm.on('boundingBoxChanged', workerItemDataChanged);
        this.glGeomItems[index] = glGeomItem;
        this.glGeomItemEventHandlers[index] = {
            geomItemChanged,
            materialChanged,
            geomChanged,
            workerItemDataChanged,
        };
        this.glGeomItemsMap[geomItem.getId()] = index;
        // Note: before the renderer is disabled, this is a  no-op.
        this.renderer.requestRedraw();
        return glGeomItem;
    }
    /**
     * Handles applying the culling results received from the GLGeomItemLibraryCullingWorker
     * @param data - The object containing the newlyCulled and newlyUnCulled results.
     */
    applyCullResults(data) {
        const { newlyCulled, newlyUnCulled } = data;
        if (newlyCulled.length == 0 && newlyUnCulled.length == 0)
            return;
        // console.log('applyCullResults newlyCulled', newlyCulled.length, 'newlyUnCulled', newlyUnCulled.length)
        newlyCulled.forEach((index) => {
            if (!this.glGeomItems[index]) {
                if (this.removedItemIndices.indexOf(index) == -1) {
                    console.warn('Culling worker has items that are deleted.');
                }
                return;
            }
            this.glGeomItems[index].setCulled(true);
        });
        newlyUnCulled.forEach((index) => {
            if (!this.glGeomItems[index]) {
                if (this.removedItemIndices.indexOf(index) == -1) {
                    console.warn('Culling worker has items that are deleted.');
                }
                return;
            }
            this.glGeomItems[index].setCulled(false);
        });
        this.renderer.requestRedraw();
        // Used mostly to make our uni testing robust.
        this.renderer.emit('CullingUpdated');
    }
    /**
     * The removeGeomItem method.
     * @param geomItem - The geomItem value.
     * @return - The return value.
     */
    removeGeomItem(geomItem) {
        const index = this.glGeomItemsMap[geomItem.getId()];
        // This GeomItem may not yet have been added to the Renderer.
        // This may be because it is part of an asset that is still loading
        // and has not yet received its geometry.
        if (index == undefined)
            return null;
        const glGeomItem = this.glGeomItems[index];
        const geom = geomItem.geomParam.value;
        this.renderer.glGeomLibrary.removeGeom(geom);
        const material = geomItem.materialParam.value;
        this.renderer.glMaterialLibrary.removeMaterial(material);
        const handlers = this.glGeomItemEventHandlers[index];
        geomItem.materialParam.off('valueChanged', handlers.materialChanged);
        geomItem.geomMatParam.off('valueChanged', handlers.geomItemChanged);
        geomItem.off('cutAwayChanged', handlers.geomItemChanged);
        geomItem.off('highlightChanged', handlers.geomItemChanged);
        geomItem.off('visibilityChanged', handlers.workerItemDataChanged);
        geomItem.geomMatParam.off('valueChanged', handlers.workerItemDataChanged);
        const geomParm = geomItem.geomParam;
        geomParm.off('valueChanged', handlers.geomChanged);
        geomParm.off('boundingBoxChanged', handlers.workerItemDataChanged);
        this.glGeomItems[index] = null;
        this.glGeomItemEventHandlers[index] = null;
        this.glGeomItemsIndexFreeList.push(index);
        delete this.glGeomItemsMap[geomItem.getId()];
        this.removedItemIndices.push(index);
        this.renderer.requestRedraw();
        return glGeomItem;
    }
    /**
     * The getGeomItem method.
     * @param index - The index value.
     * @return - The GLGeomItem that wraps the provided GeomItem
     */
    getGeomItem(index) {
        var _a;
        if (index >= this.glGeomItems.length) {
            console.warn('Invalid Draw Item id:' + index + ' NumItems:' + (this.glGeomItems.length - 1));
            return undefined;
        }
        return (_a = this.glGeomItems[index]) === null || _a === void 0 ? void 0 : _a.geomItem;
    }
    /**
     * The getGeomItem method.
     * @param geomItem - The geomItem value.
     * @return - The GLGeomItem that wraps the provided GeomItem
     */
    getGLGeomItem(geomItem) {
        const index = this.glGeomItemsMap[geomItem.getId()];
        if (index != undefined) {
            // Increment the ref count for the GLGeom
            return this.glGeomItems[index];
        }
        return null;
    }
    // ////////////////////////////////////////////////
    // Data Uploading
    /**
     * The populateDrawItemDataArray method.
     * @param index - The index of the item in the library.
     * @param subIndex - The index of the item within the block being uploaded.
     * @param dataArray - The dataArray value.
     * @private
     */
    populateDrawItemDataArray(index, subIndex, dataArray) {
        const glGeomItem = this.glGeomItems[index];
        // When an item is deleted, we allocate its index to the free list
        // and null this item in the array. skip over null items.
        if (!glGeomItem)
            return;
        const { geomItem, geomId } = glGeomItem;
        const stride = pixelsPerItem * 4; // The number of floats per draw item.
        const offset = subIndex * stride;
        // /////////////////////////
        // Geom Item Params
        let flags = 0;
        if (geomItem.isCutawayEnabled()) {
            flags |= GLGeomItemFlags.GEOMITEM_FLAG_CUTAWAY;
        }
        if (geomItem.isSelectable() == false) {
            flags |= GLGeomItemFlags.GEOMITEM_INVISIBLE_IN_GEOMDATA;
        }
        const pix0 = new Vec4(new Float32Array(dataArray.buffer, (offset + 0) * 4, 4));
        pix0.set(flags, 0, 0, 0);
        const material = geomItem.materialParam.value;
        const allocation = this.renderer.glMaterialLibrary.getMaterialAllocation(material);
        if (allocation) {
            pix0.z = allocation.start;
        }
        // Store the geomId for debugging purposes.
        // see: DEBUG_GEOM_ID
        pix0.w = geomId;
        // /////////////////////////
        // Geom Matrix
        const mat4 = geomItem.geomMatParam.value;
        const pix1 = new Vec4(new Float32Array(dataArray.buffer, (offset + 4) * 4, 4));
        const pix2 = new Vec4(new Float32Array(dataArray.buffer, (offset + 8) * 4, 4));
        const pix3 = new Vec4(new Float32Array(dataArray.buffer, (offset + 12) * 4, 4));
        pix1.set(mat4.xAxis.x, mat4.yAxis.x, mat4.zAxis.x, mat4.translation.x);
        pix2.set(mat4.xAxis.y, mat4.yAxis.y, mat4.zAxis.y, mat4.translation.y);
        pix3.set(mat4.xAxis.z, mat4.yAxis.z, mat4.zAxis.z, mat4.translation.z);
        // /////////////////////////
        // Hilight
        const pix4 = new Vec4(new Float32Array(dataArray.buffer, (offset + 16) * 4, 4));
        if (geomItem.isHighlighted()) {
            const highlight = geomItem.getHighlight();
            pix4.set(highlight.r, highlight.g, highlight.b, highlight.a);
        }
        // /////////////////////////
        // Cutaway
        const pix5 = new Vec4(new Float32Array(dataArray.buffer, (offset + 20) * 4, 4));
        if (geomItem.isCutawayEnabled()) {
            const cutAwayVector = geomItem.getCutVector();
            const cutAwayDist = geomItem.getCutDist();
            // console.log(geomItem.getName(), geomItem.isCutawayEnabled(), flags, pix0.toString())
            pix5.set(cutAwayVector.x, cutAwayVector.y, cutAwayVector.z, cutAwayDist);
        }
    }
    /**
     * Gathers data to pass to the culling worker.
     * @param geomItem - The GeomItem to gether the data for.
     * @param material - The material of GeomItem.
     * @param index - The index of the item to gether the data for.
     * @return - the JSON data that will be passed to the worker.
     */
    getCullingWorkerData(geomItem, material, index) {
        const bbox = geomItem.boundingBoxParam.value;
        const boundingRadius = bbox.size() * 0.5;
        const pos = bbox.center();
        // Some items can't be culled, if they calculate the size in the GPU.
        // Handles with a fixed size on screen, or points with a fixed size on
        // screen simply cannot be culled, as they
        let cullable = geomItem.cullable != false;
        const fixedSizeParam = material.getParameter('MaintainScreenSize');
        if (fixedSizeParam && fixedSizeParam.value) {
            cullable = false;
        }
        if (material.getShaderName().startsWith('ScreenSpace')) {
            cullable = false;
        }
        if (material.hasParameter('PointSize')) {
            cullable = false;
        }
        return {
            id: index,
            boundingRadius,
            pos: pos.asArray(),
            cullable,
            visible: geomItem.isVisible(),
        };
    }
    /**
     * Any items that need to be updated on the worker are now pushed.
     */
    uploadGeomItemsToWorker() {
        if (this.enableFrustumCulling) {
            const geomItemsUpdateToCullingWorker = [];
            this.dirtyWorkerItemIndices.forEach((index) => {
                const glGeomItem = this.glGeomItems[index];
                // When an item is deleted, we allocate its index to the free list
                // and null this item in the array. skip over null items.
                if (!glGeomItem)
                    return;
                const { geomItem } = glGeomItem;
                const material = geomItem.materialParam.value;
                geomItemsUpdateToCullingWorker.push(this.getCullingWorkerData(geomItem, material, index));
            });
            // /////////////////////////
            // Update the culling worker
            this.worker.postMessage({
                type: 'UpdateGeomItems',
                geomItems: geomItemsUpdateToCullingWorker,
                removedItemIndices: this.removedItemIndices,
            });
            this.dirtyWorkerItemIndices.clear();
            this.removedItemIndices = [];
        }
    }
    /**
     * The uploadGeomItems method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    uploadGeomItems(renderstate) {
        const gl = this.renderer.gl;
        if (!gl.floatTexturesSupported) {
            return;
        }
        let size = Math.round(Math.sqrt(this.glGeomItems.length * pixelsPerItem) + 0.5);
        // Only support power 2 textures. Else we get strange corruption on some GPUs
        // in some scenes.
        size = MathFunctions.nextPow2(size);
        // Size should be a multiple of pixelsPerItem, so each geom item is always contiguous
        // in memory. (makes updating a lot easier. See __updateItemInstanceData below)
        if (size % pixelsPerItem != 0)
            size += pixelsPerItem - (size % pixelsPerItem);
        if (!this.glGeomItemsTexture) {
            this.glGeomItemsTexture = new GLTexture2D(gl, {
                format: 'RGBA',
                type: 'FLOAT',
                width: size,
                height: size,
                filter: 'NEAREST',
                wrap: 'CLAMP_TO_EDGE',
                mipMapped: false,
            });
            this.glGeomItemsTexture.clear();
        }
        else if (this.glGeomItemsTexture.width != size) {
            this.glGeomItemsTexture.resize(size, size);
            this.dirtyItemIndices = Array((size * size) / pixelsPerItem)
                .fill(0) // TODO: check, is 0 ok as an argument here?
                .map((v, i) => i);
        }
        gl.bindTexture(gl.TEXTURE_2D, this.glGeomItemsTexture.glTex);
        const typeId = this.glGeomItemsTexture.getType();
        for (let i = 0; i < this.dirtyItemIndices.length; i++) {
            const indexStart = this.dirtyItemIndices[i];
            const yoffset = Math.floor((indexStart * pixelsPerItem) / size);
            let indexEnd = indexStart + 1;
            for (let j = i + 1; j < this.dirtyItemIndices.length; j++) {
                const index = this.dirtyItemIndices[j];
                if (Math.floor((index * pixelsPerItem) / size) != yoffset) {
                    break;
                }
                if (index != indexEnd) {
                    break;
                }
                indexEnd++;
            }
            // TODO: for contiguous blocks, we create larger arrays and populate
            // and upload them in one step.
            const uploadCount = indexEnd - indexStart;
            const xoffset = (indexStart * pixelsPerItem) % size;
            const width = pixelsPerItem * uploadCount;
            const height = 1;
            const dataArray = new Float32Array(pixelsPerItem * 4 * uploadCount); // 4==RGBA pixels.
            for (let j = indexStart; j < indexEnd; j++) {
                this.populateDrawItemDataArray(j, j - indexStart, dataArray);
            }
            if (typeId == gl.FLOAT) {
                this.glGeomItemsTexture.populate(dataArray, width, height, xoffset, yoffset, false);
            }
            else {
                const unit16s = MathFunctions.convertFloat32ArrayToUInt16Array(dataArray);
                this.glGeomItemsTexture.populate(unit16s, width, height, xoffset, yoffset, false);
            }
            i += uploadCount - 1;
        }
        this.removedItemIndices = [];
        this.dirtyItemIndices = [];
    }
    /**
     * Updates the GPU state if any update is needed.
     * @param renderstate - The object tracking the current state of the renderer
     */
    bind(renderstate) {
        if (this.dirtyWorkerItemIndices.size > 0 || this.removedItemIndices.length > 0) {
            this.uploadGeomItemsToWorker();
        }
        if (this.dirtyItemIndices.length > 0) {
            this.uploadGeomItems(renderstate);
        }
        const gl = this.renderer.gl;
        const { instancesTexture, instancesTextureSize } = renderstate.unifs;
        if (instancesTexture) {
            this.glGeomItemsTexture.bindToUniform(renderstate, instancesTexture);
            gl.uniform1i(instancesTextureSize.location, this.glGeomItemsTexture.width);
        }
    }
    /**
     * The destroy is called by the system to cause explicit resources cleanup.
     * Users should never need to call this method directly.
     */
    destroy() { }
}
export { GLGeomItemLibrary };
//# sourceMappingURL=GLGeomItemLibrary.js.map