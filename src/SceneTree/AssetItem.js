import { Vec2 } from '../Math/Vec2';
import { TreeItem, LOADFLAGS_SKIP_MATERIALS } from './TreeItem.js';
import { GeomLibrary } from './GeomLibrary.js';
import { GeomItem } from './GeomItem.js';
import { MaterialLibrary } from './MaterialLibrary.js';


class AssetItem extends TreeItem {
    constructor(name = undefined) {
        super(name);
        this.__geoms = new GeomLibrary();
        this.__materials = new MaterialLibrary();

        this.lightmapName = 'Default';
    }

    getGeometryLibary(){
        return this.__geoms;
    }

    getMaterialLibary(){
        return this.__materials;
    }


    //////////////////////////////////////////
    // Persistence

    toJSON(flags=0) {
        let j = super.toJSON(flags);
        j['materialLibrary'] = this.__materials.toJSON(flags);
        return j;
    }

    fromJSON(j, flags=0) {
        if((flags&LOADFLAGS_SKIP_MATERIALS) == 0)
            this.__materials.fromJSON(j['materialLibrary'], flags);
        super.fromJSON(j, flags, this.__materials, this.__geoms);

        // Note: the Scene owns the lightmaps. 
        // An AssetInstance might have a Lightmap name and an offset value. 
        //this.__lightmap.fromJSON(j);
        //this.__propagateLightmap();
    }


    readBinary(reader, flags){
        let numGeomsFiles = reader.loadUInt32();

        this.__materials.readBinary(reader, flags);

        super.readBinary(reader, flags, this.__materials, this.__geoms);

        this.lightmapCoordsOffset = reader.loadFloat32Vec2();
        this.lightmapName = reader.loadStr();

        //this.__propagateLightmapOffset();
        return numGeomsFiles;
    }

    __propagateLightmapOffset(){
        let lightmapCoordsOffset = this.lightmapCoordsOffset;
        let lightmapName = this.lightmapName;
        let traverse = (treeItem)=>{
            if (treeItem instanceof GeomItem) {
                treeItem.applyAssetLightmapSettings(lightmapName, lightmapCoordsOffset);
            }
            // Traverse the tree adding items till we hit the leaves(which are usually GeomItems.)
            for (let childItem of treeItem.getChildren()) {
                traverse(childItem);
            }
        };
        traverse(this);
    }

};

export {
    AssetItem
};
//export default AssetItem;

