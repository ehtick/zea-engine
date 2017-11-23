import {
    SystemDesc
} from '../BrowserDetection.js';
import {
    Async,
    Signal
} from '../Utilities';
import {
    Image2D
} from './Image2D.js';
import {
    HDRImage2D
} from './HDRImage2D.js';

class HDRImageMixer extends Image2D {
    constructor(name, resourceLoader, stream = true) {
        super({
            format: 'FLOAT',
            channels: 'RGB',
            filter: SystemDesc.isMobileDevice ? 'NEAREST' : 'LINEAR'
        });

        this.__name = name;
        this.__stream = stream;
        this.__loaded = false;
        this.__subImages = [];
        this.__weights = [];
        this.__resourceLoader = resourceLoader;

        this.loaded = new Signal();
        this.updated = new Signal();
        this.weightsChanged = new Signal();
    }

    isLoaded() {
        return this.__loaded;
    }

    isStream() {
        return this.__stream;
    }

    setURLs(urls) {

        let async = new Async();
        async.incAsyncCount(urls.length);
        async.ready.connect(() => {
            if (!this.__loaded) {
                this.__loaded = true;
                this.loaded.emit();
            } else {
                this.updated.emit();
            }
        }, this);
        for (let fileUrl of urls) {
            let subImage = new HDRImage2D(this.__name + this.__subImages.length, fileUrl, this.__resourceLoader);
            subImage.loaded.connect(async.decAsyncCount);
            subImage.updated.connect(this.updated.emit);
            this.__subImages.push(subImage);
            this.__weights.push(1.0);
        }
    }

    setURL(index, url) {
        this.__subImages[index].loadURL(url);
    }

    setWeights(weights) {
        this.__weights = weights;
        if (this.__loaded) {
            this.weightsChanged.emit(this.__weights);
        }
    }

    setWeight(index, weight) {
        this.__weights[index] = weight;
        if (this.__loaded) {
            this.weightsChanged.emit(this.__weights);
        }
    }

    getParams() {
        let params = super.getParams();
        if (this.__loaded) {
            params.subImages = this.__subImages;
            params.weights = this.__weights;
        }
        return params;
    }

    fromJSON(json) {

    }

    toJSON(json) {

    }
};

export {
    HDRImageMixer
};
//export default HDRImageMixer;