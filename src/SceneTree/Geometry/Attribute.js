
class Attribute {
    constructor(dataType, expectedSize, defaultScalarValue = undefined) {
        this.__dataType = dataType;
        if(dataType.numFloat32Elements !=  undefined){
            this.__numFloat32Elements = this.__dataType.numFloat32Elements();
        }
        else{
            switch(dataType){
            case Visualive.Float32:
            case Visualive.UInt32:
            case Visualive.SInt32:
                this.__numFloat32Elements = 1;
                break;
            default:
                throw("Invalid data type for attribute:" + dataType);
            }
        }
        this.__data = new Float32Array(expectedSize * this.__numFloat32Elements);
        this.__defaultScalarValue = (defaultScalarValue != undefined) ? defaultScalarValue : Number.MAX_VALUE;
        this.initRange(0);
    }

    resize(size) {
        let prevLength = this.__data.length;
        let newLength = size * this.__numFloat32Elements;
        let data = new Float32Array(newLength);
        for (let i = 0; i < Math.min(this.__data.length, newLength); i++) {
            data[i] = this.__data[i];
        }
        if (this.__data.length < newLength)
            this.__data = data;
        this.initRange(prevLength);
    }

    initRange(start) {
        // Initialize the values to invalid values. 
        for (let i = start; i < this.__data.length; i++) {
            this.__data[i] = this.__defaultScalarValue;
        }
    }

    getCount() {
        return this.__data.length / this.__numFloat32Elements;
    }

    get length() {
        return this.__data.length / this.__numFloat32Elements;
    }

    get data() {
        return this.__data
    }

    get numFloat32Elements() {
        return this.__numFloat32Elements;
    }

    getFloat32Value(index) {
        return this.__data[index];
    }

    setFloat32Value(index, value) {
        this.__data[index] = value;
    }

    getValueRef(index) {
        let numElems = this.__numFloat32Elements;
        if (index >= (this.__data.length / numElems))
            throw("Invalid vertex index:" + index + ". Num Vertices:" + (this.__data.length / 3));
        return this.__dataType.createFromFloat32Buffer(this.__data.buffer, index * numElems);
    }

    setValue(index, value) {
        let numElems = this.__numFloat32Elements;
        if (index >= (this.__data.length / numElems))
            throw("Invalid vertex index:" + index + ". Num Vertices:" + (this.__data.length / 3));
        this.__dataType.createFromFloat32Buffer(this.__data.buffer, index * numElems).setFromOther(value);
    }


    toJSON(opts) {
        return {
            "data": Array.from(this.__data),
            "dataType": this.__dataType.name,
            "defaultScalarValue": this.__defaultScalarValue,
            "length": this.__data.length / this.__numFloat32Elements
        }
    }

    fromJSON(j) {
        this.__data = Float32Array.from(j.data);
    }

    toString() {
        return JSON.stringify(this.toJSON(), null, 2)
    }
};

export {
    Attribute
};
//export default Attribute;
