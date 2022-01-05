import { Color, Vec4 } from '../../Math/index';
import { LinesCuboid, TreeItem } from '../../SceneTree/index';
import { BoundingBoxShader } from '../Shaders/BoundingBoxShader';
import { GLLines } from '../Drawing/GLLines';
import { GLPass, PassType } from './GLPass';
import { GLTexture2D } from '../GLTexture2D';
import { MathFunctions } from '../../Utilities/MathFunctions';
const pixelsPerItem = 6; // The number of pixels per draw item.
/** Class representing a GL treeitems pass.
 * @extends GLPass
 * @private
 */
class GLBoundingBoxPass extends GLPass {
    /**
     * Create a GL treeitems pass.
     */
    constructor() {
        super();
        this.boxes = [];
        this.dirtyBoxes = new Set();
        this.freeIndices = [];
        this.idToIndex = [];
        this.drawCount = 0;
        this.indexArrayUpdateNeeded = false;
        this.__updateRequested = false;
        this.__modelMatrixArray = [];
        this.__treeitemDataArray = [];
        this.__tintColorArray = [];
        this.__indexArray = new Float32Array(0);
        this.__width = 0;
    }
    /**
     * The getPassType method.
     * @return - The pass type value.
     */
    getPassType() {
        return PassType.OPAQUE;
    }
    /**
     * The init method.
     * @param renderer - The renderer value.
     * @param passIndex - The index of the pass in the GLBAseRenderer
     */
    init(renderer, passIndex) {
        super.init(renderer, passIndex);
        const gl = this.__renderer.gl;
        this.glgeom = new GLLines(gl, new LinesCuboid(1, 1, 1));
        this.glshader = new BoundingBoxShader(gl);
    }
    /**
     * The itemAddedToScene method is called on each pass when a new item
     * is added to the scene, and the renderer must decide how to render it.
     * It allows Passes to select geometries to handle the drawing of.
     * @param treeItem - The treeItem value.
     * @param rargs - Extra return values are passed back in this object.
     * The object contains a parameter 'continueInSubTree', which can be set to false,
     * so the subtree of this node will not be traversed after this node is handled.
     * @return - The return value.
     */
    itemAddedToScene(treeItem, rargs) {
        // if (treeItem instanceof TreeItem) {
        //   this.bindTreeItem(treeItem)
        //   return false
        // }
        return false;
    }
    /**
     * The itemRemovedFromScene method is called on each pass when aa item
     * is removed to the scene, and the pass must handle cleaning up any resources.
     * @param treeItem - The treeItem value.
     * @param rargs - Extra return values are passed back in this object.
     * @return - The return value.
     */
    itemRemovedFromScene(treeItem, rargs) {
        // if (treeItem instanceof TreeItem) {
        //   this.unbindTreeItem(treeItem)
        //   return true
        // }
        return false;
    }
    // ///////////////////////////////////
    // Bind to Render Tree
    /**
     * Adds tree items to the renderer, selecting the correct pass to delegate rendering too, and listens to future changes in the tree.
     *
     * @param treeItem - The tree item to add.
     */
    addTreeItem(treeItem, continueIntoSubTree = true) {
        // Note: we can have BaseItems in the tree now.
        if (!(treeItem instanceof TreeItem))
            return;
        this.bindTreeItem(treeItem);
        if (continueIntoSubTree) {
            // Traverse the tree adding items until we hit the leaves (which are usually GeomItems.)
            for (const childItem of treeItem.getChildren()) {
                if (childItem)
                    this.addTreeItem(childItem);
            }
            treeItem.on('childAdded', (event) => {
                this.addTreeItem(event.childItem);
            });
            treeItem.on('childRemoved', (event) => {
                this.unbindTreeItem(event.childItem);
            });
        }
    }
    /**
     * The bindTreeItem method.
     * @param treeitem - The treeitem value.
     */
    bindTreeItem(treeitem) {
        let index;
        let index_check = this.freeIndices.pop();
        if (index_check)
            index = index_check;
        else
            index = this.boxes.length;
        this.idToIndex[treeitem.getId()] = index;
        const visibilityChanged = () => {
            if (treeitem.isVisible()) {
                this.drawCount++;
                // The treeitem Xfo might have changed while it was
                // not visible. We need to update here.
                this.dirtyBoxes.add(index);
            }
            else
                this.drawCount--;
            this.indexArrayUpdateNeeded = true;
        };
        treeitem.on('visibilityChanged', visibilityChanged);
        const xfoChanged = () => {
            if (treeitem.isVisible()) {
                this.dirtyBoxes.add(index);
                this.emit('updated');
            }
        };
        treeitem.globalXfoParam.on('valueChanged', xfoChanged);
        treeitem.boundingBoxParam.on('valueChanged', xfoChanged);
        if (treeitem.isVisible())
            this.drawCount++;
        // TODO: make this a type
        this.boxes[index] = {
            treeitem,
            visibilityChanged,
            xfoChanged,
        };
        this.indexArrayUpdateNeeded = true;
        this.__updateRequested = true;
        this.emit('updated');
    }
    /**
     * The unbindTreeItem method.
     * @param treeitem - The treeitem value.
     */
    unbindTreeItem(treeitem) {
        if (!(treeitem.getId() in this.idToIndex)) {
            console.warn('Billboard already removed.');
            return;
        }
        const index = this.idToIndex[treeitem.getId()];
        const treeitemData = this.boxes[index];
        treeitem.off('visibilityChanged', treeitemData.visibilityChanged);
        treeitem.globalXfoParam.off('valueChanged', treeitemData.xfoChanged);
        treeitem.boundingBoxParam.off('valueChanged', treeitemData.xfoChanged);
        this.boxes[index] = null;
        this.freeIndices.push(index);
        if (treeitem.isVisible())
            this.drawCount--;
        this.indexArrayUpdateNeeded = true;
        this.__updateRequested = true;
        this.__updateBoxes();
        this.emit('updated');
    }
    /**
     * The __populateBoxesDataArray method.
     * @param treeitemData - The treeitemData value.
     * @param index - The index value.
     * @param dataArray - The dataArray value.
     * @private
     */
    __populateBoxesDataArray(treeitemData, index, dataArray) {
        const treeitem = treeitemData.treeitem;
        const globalXfoParam = treeitem.globalXfoParam;
        const geomMatParam = treeitem.geomMatParam;
        const color = geomMatParam ? new Color(1, 0, 0, 1) : new Color(0, 0, 1, 1);
        const mat4 = geomMatParam ? geomMatParam.value : globalXfoParam.value.toMat4();
        const bbox = treeitem.boundingBoxParam.value;
        const offset = index * pixelsPerItem * 4;
        const pixel0 = new Vec4(new Float32Array(dataArray.buffer, offset * 4, 4));
        const pixel1 = new Vec4(new Float32Array(dataArray.buffer, (offset + 4) * 4, 4));
        const pixel2 = new Vec4(new Float32Array(dataArray.buffer, (offset + 8) * 4, 4));
        const pixel3 = new Vec4(new Float32Array(dataArray.buffer, (offset + 12) * 4, 4));
        const pixel4 = new Vec4(new Float32Array(dataArray.buffer, (offset + 16) * 4, 4));
        const pixel5 = new Vec4(new Float32Array(dataArray.buffer, (offset + 20) * 4, 4));
        pixel0.set(mat4.xAxis.x, mat4.yAxis.x, mat4.zAxis.x, mat4.translation.x);
        pixel1.set(mat4.xAxis.y, mat4.yAxis.y, mat4.zAxis.y, mat4.translation.y);
        pixel2.set(mat4.xAxis.z, mat4.yAxis.z, mat4.zAxis.z, mat4.translation.z);
        pixel3.set(bbox.p0.x, bbox.p0.y, bbox.p0.z, 0.0);
        pixel4.set(bbox.p1.x, bbox.p1.y, bbox.p1.z, 0.0);
        pixel5.set(color.r, color.g, color.b, color.a);
    }
    // eslint-disable-next-line require-jsdoc
    __updateIndexArray() {
        const gl = this.__gl;
        // Note: When the camera moves, this array is sorted and re-upload.
        if (this.__indexArray && this.__indexArray.length != this.drawCount) {
            gl.deleteBuffer(this.__instanceIdsBuffer);
            this.__instanceIdsBuffer = undefined;
        }
        this.__indexArray = new Float32Array(this.drawCount);
        let offset = 0;
        for (let i = 0; i < this.boxes.length; i++) {
            if (this.boxes[i] && this.boxes[i].treeitem.isVisible()) {
                this.__indexArray[offset] = i;
                offset++;
            }
        }
        if (!this.__instanceIdsBuffer)
            this.__instanceIdsBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.__instanceIdsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.__indexArray, gl.STATIC_DRAW);
        this.indexArrayUpdateNeeded = false;
    }
    /**
     * The __updateBoxes method.
     * @private
     */
    __updateBoxes() {
        if (this.indexArrayUpdateNeeded)
            this.__updateIndexArray();
        const gl = this.__renderer.gl;
        let size = Math.round(Math.sqrt((this.boxes.length - this.freeIndices.length) * pixelsPerItem) + 0.5);
        // Note: the following few lines need a cleanup.
        // We should be using power of 2 textures. The problem is that pot texture sizes don't
        // align with the 6 pixels per draw item. So we need to upload a slightly bigger texture
        // but upload the 'usable' size.
        // Only support power 2 textures. Else we get strange corruption on some GPUs
        // in some scenes.
        // Size should be a multiple of pixelsPerItem, so each geom item is always contiguous
        // in memory. (makes updating a lot easier. See __updateItemInstanceData below)
        // size = Math.nextPow2(size);
        if (size % pixelsPerItem != 0)
            size += pixelsPerItem - (size % pixelsPerItem);
        this.__width = size;
        // if((this.__width % pixelsPerItem) != 0)
        //     this.__width -= (this.__width % pixelsPerItem);
        if (!this.__drawItemsTexture) {
            this.__drawItemsTexture = new GLTexture2D(gl, {
                format: 'RGBA',
                type: 'FLOAT',
                width: size,
                height: size,
                filter: 'NEAREST',
                wrap: 'CLAMP_TO_EDGE',
                mipMapped: false,
            });
            this.__drawItemsTexture.clear();
        }
        else {
            this.__drawItemsTexture.resize(size, size);
        }
        this.__indexArray.forEach((index) => {
            if (index != -1)
                this.__updateBox(index);
        });
        this.__updateRequested = false;
    }
    /**
     * The __updateBoxes method.
     * @param index - The index value.
     * @private
     */
    __updateBox(index) {
        if (this.drawCount == 0 || !this.__drawItemsTexture) {
            return;
        }
        const treeitemData = this.boxes[index];
        if (!treeitemData.treeitem.isVisible())
            return;
        const gl = this.__gl;
        const dataArray = new Float32Array(pixelsPerItem * 4);
        this.__populateBoxesDataArray(treeitemData, 0, dataArray);
        gl.bindTexture(gl.TEXTURE_2D, this.__drawItemsTexture.glTex);
        const xoffset = (index * pixelsPerItem) % this.__width;
        const yoffset = Math.floor((index * pixelsPerItem) / this.__width);
        const width = pixelsPerItem;
        const height = 1;
        const type = this.__drawItemsTexture.getType();
        const format = this.__drawItemsTexture.getFormat();
        if (type == gl.FLOAT) {
            gl.texSubImage2D(gl.TEXTURE_2D, 0, xoffset, yoffset, width, height, format, type, dataArray);
        }
        else {
            const unit16s = MathFunctions.convertFloat32ArrayToUInt16Array(dataArray);
            gl.texSubImage2D(gl.TEXTURE_2D, 0, xoffset, yoffset, width, height, format, type, unit16s);
        }
    }
    /**
     * The sort method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    draw(renderstate) {
        if (this.drawCount == 0) {
            return;
        }
        if (this.__updateRequested) {
            this.__updateBoxes();
        }
        if (this.dirtyBoxes.size > 0) {
            this.dirtyBoxes.forEach((index) => {
                this.__updateBox(index);
            });
            this.dirtyBoxes.clear();
        }
        if (this.indexArrayUpdateNeeded)
            this.__updateIndexArray();
        const gl = this.__gl;
        // gl.disable(gl.CULL_FACE)
        // gl.enable(gl.BLEND)
        // gl.blendEquation(gl.FUNC_ADD)
        // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
        this.glshader.bind(renderstate);
        this.glgeom.bind(renderstate);
        const unifs = renderstate.unifs;
        if (!gl.floatTexturesSupported || !gl.drawElementsInstanced) {
            const len = this.__indexArray.length;
            for (let i = 0; i < len; i++) {
                // gl.uniformMatrix4fv(unifs.modelMatrix.location, false, this.__modelMatrixArray[i])
                // gl.uniform4fv(unifs.treeitemData.location, this.__treeitemDataArray[i])
                // gl.uniform4fv(unifs.tintColor.location, this.__tintColorArray[i])
                renderstate.bindViewports(unifs, () => {
                    gl.drawQuad();
                });
            }
        }
        else {
            this.__drawItemsTexture.bindToUniform(renderstate, unifs.instancesTexture);
            gl.uniform1i(unifs.instancesTextureSize.location, this.__width);
            {
                // The instance transform ids are bound as an instanced attribute.
                const location = renderstate.attrs.instanceIds.location;
                gl.enableVertexAttribArray(location);
                gl.bindBuffer(gl.ARRAY_BUFFER, this.__instanceIdsBuffer);
                gl.vertexAttribPointer(location, 1, gl.FLOAT, false, 4, 0);
                gl.vertexAttribDivisor(location, 1); // This makes it instanced
            }
            renderstate.bindViewports(unifs, () => {
                this.glgeom.drawInstanced(renderstate, this.drawCount);
            });
        }
        // gl.disable(gl.BLEND)
    }
}
export { GLBoundingBoxPass };
//# sourceMappingURL=GLBoundingBoxPass.js.map