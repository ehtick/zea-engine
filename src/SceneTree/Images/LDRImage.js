
import {
    sgFactory
} from '../SGFactory.js';
import {
    resourceLoader
} from '../ResourceLoader.js';
import {
    SystemDesc
} from '../../BrowserDetection.js';
import {
    NumberParameter
} from '../Parameters';
import {
    FileImage
} from './FileImage.js';

const supportWebp = navigator.userAgent.indexOf("Chrome") !== -1; // || navigator.userAgent.indexOf("Samsung");

class LDRImage extends FileImage {
    constructor(name, filePath, params) {
        super(name, filePath, params);
        this.type = 'UNSIGNED_BYTE';
        this.addParameter(new NumberParameter('PreferredSize', -1));
    }

    __loadData(fileDesc) {
        const ext = this.getParameter('FilePath').getExt();
        if (ext == '.jpg') {
            this.format = 'RGB';
        } else if (ext == '.png') {
            this.format = 'RGBA';
        }
        let imageElem;
        const loaded = () => {
            this.getDOMElement = ()=>{
                return imageElem;
            }
            this.width = imageElem.width;
            this.height = imageElem.height;
            this.__data = imageElem;
            this.__loaded = true;
            this.loaded.emit();
        };
        const imageDataLibrary = FileImage.__imageDataLibrary()
        if (fileDesc.id in imageDataLibrary) {
            imageElem = imageDataLibrary[fileDesc.id];
            if (imageElem.complete) {
                loaded()
            } else {
                imageElem.addEventListener("load", loaded);
            }
        } else {
            resourceLoader.addWork(fileDesc.id, 1);


        let url = fileDesc.url;
        if (fileDesc.assets && Object.keys(fileDesc.assets).length > 0) {
                function chooseImage(params, filterAssets) {

                    // Note: this is a filter to remove any corrupt data
                    // generate by our broken server side processing system.
                    filterAssets = filterAssets.filter(
                        asset => asset !== null
                    );

                    if (supportWebp) {
                        const resultFilter = filterAssets.filter(
                            asset => asset.format === "webp"
                        );

                        if (resultFilter.length > 1) {
                            filterAssets = resultFilter;
                        }
                    } else {
                        filterAssets = filterAssets.filter(
                            asset => asset.format !== "webp"
                        );
                    }

                    if (params.maxSize) {
                        filterAssets = filterAssets.filter(
                            asset => asset.w <= params.maxSize
                        );
                    }
                    if (params.filter) {
                        const resultFilter = filterAssets.filter(
                            asset => asset.url.indexOf(params.filter) !== -1
                        );
                        if (resultFilter.length > 1) {
                            filterAssets = resultFilter;
                        }
                    }
                    if (params.prefSize) {
                        filterAssets = filterAssets.map(asset => Object.assign({
                            score: Math.abs(params.prefSize - asset.w)
                        }, asset));

                        // return low score, close to desire
                        // return _.sortBy(score, "score")[0].option.url;
                        filterAssets.sort((a, b) => (a.score > b.score) ? 1 : ((a.score < b.score) ? -1 : 0));
                    }
                    if (filterAssets.length > 0)
                        return filterAssets[0];
                }
                const params = {
                    maxSize: SystemDesc.gpuDesc.maxTextureSize
                };
                let prefSize = this.getParameter('PreferredSize').getValue();
                if (prefSize == -1) {
                    if (fileDesc.assets.reduce)
                        params.prefSize = fileDesc.assets.reduce.w;
                } else {
                    params.prefSize = prefSize;
                }
                const asset = chooseImage(params, Object.values(fileDesc.assets));
                if (asset) {
                    console.log("Selected image:" + fileDesc.name + " format:" + asset.format + " :" + asset.w + "x" + asset.h  + " url:" + asset.url);
                    url = asset.url;
                }
            }
            else {
                console.warn("Images not processed for this file:" + fileDesc.name);
            }

            imageElem = new Image();
            imageElem.crossOrigin = 'anonymous';
            imageElem.src = url;

            imageElem.addEventListener("load", loaded);
            imageElem.addEventListener("load", () => {
                resourceLoader.addWorkDone(fileDesc.id, 1);
            });
            imageDataLibrary[fileDesc.id] = imageElem;
        }
    }
};

FileImage.registerLoader('jpg|jpeg|png', LDRImage)
sgFactory.registerClass('LDRImage', LDRImage);

export {
    LDRImage
};