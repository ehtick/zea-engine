import { Registry } from '../../Registry';
import { BaseImage } from '../BaseImage';
// Cache of any images already loaded.
const imageDataLibrary = {};
/** Class representing a file image.
 * @extends BaseImage
 */
class FileImage extends BaseImage {
    /**
     * Create a file image.
     * @param name - The name value.
     * @param filePath - The filePath value.
     * @param params - The params value.
     */
    constructor(name, filePath = '', params = {}) {
        super(name);
        this.__data = null;
        this.type = 'UNSIGNED_BYTE';
        this.crossOrigin = 'anonymous';
        if (filePath && filePath != '')
            this.load(filePath);
    }
    /**
     * Defines how to handle cross origin request.
     *
     * **Possible values:**
     * * **anonymous** - CORS requests for this element will have the credentials flag set to 'same-origin'.
     * * **use-credentials** - CORS requests for this element will have the credentials flag set to 'include'.
     * * **""** - Setting the attribute name to an empty value, like crossorigin or crossorigin="", is the same as anonymous.
     *
     * @default anonymous
     * @param crossOrigin - The crossOrigin value.
     */
    setCrossOrigin(crossOrigin) {
        this.crossOrigin = crossOrigin;
    }
    /**
     * Returns the HTML DOM element used to load the image file.
     * Be
     * @returns { HTMLImageElement | null }
     */
    getDOMElement() {
        return this.__data;
    }
    /**
     * Uses the specify url to load an Image element and adds it to the data library.
     * Sets the state of the current object.
     *
     * @param url - The url value.
     * @param format - The format value.
     * @return Returns a promise that resolves once the image is loaded.
     */
    load(url, format = 'RGB') {
        return new Promise((resolve, reject) => {
            if (!format) {
                // Try to guess the format from the
                const suffixSt = url.lastIndexOf('.');
                if (suffixSt != -1) {
                    const ext = url.substring(suffixSt).toLowerCase();
                    if (ext == '.png') {
                        // TODO: Check webp for alpha channel..
                        format = 'RGBA';
                    }
                }
            }
            this.format = format;
            this.loaded = false;
            const loaded = () => {
                this.url = url;
                this.width = this.__data.width;
                this.height = this.__data.height;
                this.loaded = true;
                this.emit('loaded');
                resolve();
            };
            if (url in imageDataLibrary) {
                this.__data = imageDataLibrary[url];
                if (this.__data.complete) {
                    loaded();
                }
                else {
                    this.__data.addEventListener('load', loaded);
                    this.__data.addEventListener('error', reject);
                }
            }
            else {
                this.__data = new Image();
                this.__data.crossOrigin = this.crossOrigin;
                this.__data.src = url;
                this.__data.addEventListener('load', loaded);
                this.__data.addEventListener('error', reject);
                imageDataLibrary[url] = this.__data;
            }
        });
    }
    /**
     * Loads in Image file using the given URL
     *
     * @param url - The url value.
     * @param format - The format value. Can be 'RGB' or 'RGBA' for files that contain an alpha channel. This will cause objects to be drawn using the Transparent pass.
     */
    setImageURL(url, format = 'RGB') {
        this.load(url, format);
    }
    /**
     * The getParams method.
     * @return - The return value.
     */
    getParams() {
        const params = super.getParams();
        if (this.loaded) {
            params['data'] = this.__data;
        }
        return params;
    }
    // ////////////////////////////////////////
    // Persistence
    /**
     * The toJSON method encodes this type as a json object for persistence.
     * @param context - The context value.
     */
    toJSON(context) {
        return {};
    }
    /**
     * The fromJSON method decodes a json object for this type.
     * @param json - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(json, context) { }
    /**
     * The readBinary method.
     * @param reader - The reader param.
     * @param context - The context param.
     */
    readBinary(reader, context) {
        // super.readBinary(reader, context);
        this.setName(reader.loadStr());
        const filePath = reader.loadStr();
        if (typeof filePath === 'string' && filePath != '') {
            const basePath = context.url.substring(0, context.url.lastIndexOf('/'));
            this.load(basePath + '/' + filePath);
        }
    }
}
/** Class representing a 2D file image.
 * @extends FileImage
 */
class FileImage2D extends FileImage {
    /**
     * Create a file image 2D.
     * @param filePath - The filePath value.
     * @param params - The params value.
     */
    constructor(filePath, params = {}) {
        console.warn('FileImage2D is becoming deprecated in favor of simple FileImage');
        super(filePath, params);
    }
}
Registry.register('FileImage2D', FileImage);
Registry.register('FileImage', FileImage);
export { FileImage, FileImage2D };
//# sourceMappingURL=FileImage.js.map