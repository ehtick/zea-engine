import { Async } from '../Math/Async';
import { Signal } from '../Math/Signal';
import { FileImage2D } from './FileImage2D.js';

import {
    loadTextfile,
    loadBinfile
} from './Utils.js';

///////////////////////////////////
// ImageLibrary
class ImageLibrary {
    constructor(url) {
        this.__images = {};
        this.__async = new Async();
        this.loaded = new Signal();
        if (url)
            this.loadURL(url);
    }

    hasImage(name) {
        return name in this.__images;
    }

    getImage(name) {
        return this.__images[name];
    }

    getImageNames() {
        let names = [];
        for (let name in this.__images)
            names.push(name);
        return names;
    }

    loadURL(fileUrl) {
        this.__resourceLoader.loadResources(filePath,
            (path, entries) => {
                for (let name of entries) {
                    if (name.endsWith('.png') || name.endsWith('.jpg')) {
                        let data = entries[name];
                        let url = URL.createObjectURL(new Blob([data.buffer]));
                        let image = new FileImage2D(name, url);
                        this.__async.incAsyncCount();
                        image.loaded.connect(this.__async.decAsyncCount, this.__async);
                        this.__images[name] = image;
                    }
                }
                let images = this.__images;
                this.__async.ready.connect(() => {
                    this.loaded.emit(images);
                });

            });
    }

}
export {
    ImageLibrary
};
// ImageLibrary;