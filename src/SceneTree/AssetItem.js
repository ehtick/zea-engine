import {
    Signal
} from '../Utilities';
import {
    FilePathParameter
} from './Parameters';
import {
    TreeItem
} from './TreeItem.js';
import {
    loadTextfile
} from './Utils.js';
import {
    sgFactory
} from './SGFactory.js';

const assetLoaders = {};

class AssetItem extends TreeItem {
    constructor(name) {
        super(name);

        this.loaded = new Signal(true);
        // Assets that are generated inline can be considered loaded
        // (e.g. the ground plane). So we set loaded to true, unless a file is specified.
        this.loaded.setToggled(true);


        const fileParam = this.addParameter(new FilePathParameter('FilePath'));
        fileParam.valueChanged.connect(() => {
            const filePath = fileParam.getValue()
            const url = fileParam.getURL();
            this.loaded.setToggled(false);
            loadTextfile(url,
                (data) => {
                    const j = JSON.parse(data);
                    let asynccount = 0;
                    this.fromJSON(j, {
                        assetItem: this,
                        incAsyncCount: ()=>{
                            asynccount++;
                        },
                        decAsyncCount: ()=>{
                            asynccount--;
                            if(asynccount == 0) {
                                this.loaded.emit();
                            }
                        }
                    });
                    if(asynccount == 0)
                        this.loaded.emit();
                }
            );
        });
    }

    getLoader() {
        return this.__loader;
    }

    //////////////////////////////////////////
    // Persistence

    readBinary(reader, context = {}) {
        context.assetItem = this;
        context.numTreeItems = 0;
        context.numGeomItems = 0;
        super.readBinary(reader, context);

        // console.log("numTreeItems:", context.numTreeItems, " numGeomItems:", context.numGeomItems)
    }

    toJSON(context={}, flags=0) {
        context.makeRelative = (path) => {
            const assetPath = this.getPath();
            const start = path.slice(0, assetPath.length);
            for (let i = 0; i < start.length; i++) {
                if (start[i] != assetPath[i]) {
                    console.warn("Param Path is not relative to the asset. May not be able to be resolved at load time:" + path);
                    return path;
                }
            }
            return path.slice(assetPath.length);
        }
        context.assetItem = this;
        const j = super.toJSON(context, flags);
        return j;
    }

    fromJSON(j, context={}, flags=0, onDone) {
        if (!context)
            context = {};
        
        context.assetItem = this;
        context.numTreeItems = 0;
        context.numGeomItems = 0;

        context.assetItem = this;

        const plcbs = []; // Post load callbacks.
        context.resolvePath = (path)=>{
            if(!path)
                throw("Path not spcecified")
            return new Promise((resolve, reject) => {
                const item = this.resolvePath(path, 0);
                if(item) {
                    resolve(item);
                }
                else {
                    // Some paths resolve to items generated during load,
                    // so push a callback to re-try after the load is complete.
                    plcbs.push(()=>{
                        const param = this.resolvePath(path, 0);
                        if(param)
                            resolve(param);
                        else {
                            reject("Path unable to be resolved:" + path);
                        }
                    });
                }
            });
        };
        context.addPLCB = plcb => plcbs.push(plcb)

        // Avoid loading the FilePAth as we are already loading json data.
        if (j.params && j.params.FilePath) {
            delete j.params.FilePath;
        }

        super.fromJSON(j, context, flags);

        // Invoke all the post-load callbacks to resolve any 
        // remaning references.
        for(let cb of plcbs)
            cb();

        if (onDone)
            onDone();
    }

    //////////////////////////////////////////
    // Static Methods


    // static registerDataLoader(ext, cls) {
    //     const regExt = (ext) => {
    //         ext = ext.toLowerCase();
    //         if (!assetLoaders[ext])
    //             assetLoaders[ext] = [];
    //         else {
    //             console.warn("overriding loader for ext:" + ext + ". Prev loader:" + assetLoaders[ext] + ". New loader:" + cls);
    //         }
    //         assetLoaders[ext].push(cls);
    //     }

    //     if (Array.isArray(ext)) {
    //         for (let e of ext)
    //             regExt(e);
    //     } else {
    //         regExt(ext);
    //     }
    // }

    // static constructLoader(file) {
    //     for(let exts of assetLoaders) {
    //         if((new RegExp('\\.('+exts+')$', "i")).test(file.name)){
    //             const loader = new assetLoaders[exts]();
    //             if(loader) {
    //                 loader.getParameter('FilePath').setValue(file.id);
    //                 return loader;
    //             }
    //         }
    //     }
    // }
};

sgFactory.registerClass('AssetItem', AssetItem);

export {
    AssetItem
};