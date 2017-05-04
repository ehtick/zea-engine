import {
    JSON_stringify_fixedPrecision
} from './Common.js';
import Vec3 from './Vec3.js';
import Mat4 from './Mat4.js';
import Quat from './Quat.js';
import typeRegistry from './TypeRegistry.js';

class Xfo {
    constructor(tr = undefined, ori = undefined, sc = undefined) {

        if (tr instanceof Float32Array) {
            this.setFromFloat32Array(tr);
            return;
        }
        if (tr instanceof Vec3) {
            this.tr = tr;
        } else {
            this.tr = new Vec3();
        }
        if (ori instanceof Quat) {
            this.ori = ori;
        } else {
            this.ori = new Quat();
        }
        if (sc instanceof Vec3) {
            this.sc = sc;
        } else {
            this.sc = new Vec3(1, 1, 1);
        }
    }

    set(tr, ori, sc = undefined) {
        this.tr = tr;
        this.ori = ori;
        if (sc instanceof Vec3)
            this.sc = sc;
    }

    isIdentity() {
        return this.tr.isNull() && this.ori.isIdentity() && this.sc.is111();
    }

    setLookAt(pos, target, up) {
        // Note: we look along the -z axis. Negate the direction.
        let dir = pos.subtract(target);
        let dirLen = dir.length();
        if (dirLen < Number.EPSILON) {
            throw ("Invalid dir");
            return;
        }
        this.ori.setFromDirectionAndUpvector(dir, up);
        this.tr = pos;
    }

    /// Multiplies two transforms
    multiply(xfo) {

        if ((this.sc.x != this.sc.y || this.sc.x != this.sc.z) && !xfo.ori.isIdentity()) {
            if (Math.abs(this.sc.x - this.sc.y) > 0.000001 || Math.abs(this.sc.x - this.sc.z) > 0.000001) {
                console.warn('Xfo.multiply: Cannot multiply to xfos with non-uniform scaling without causing shearing. Use Mat44s instead.');
            }
        }

        let result = new Xfo(
            this.tr.add(this.ori.rotateVec3(this.sc.multiply(xfo.tr))),
            this.ori.multiply(xfo.ori),
            this.sc.multiply(xfo.sc)
        );
        return result;
    }


    inverse() {
        let result = new Xfo();
        result.sc = this.sc.inverse();
        result.ori = this.ori.inverse();
        result.tr = result.ori.rotateVec3(this.tr.negate().multiply(result.sc));
        return result;
    }

    transformVec3(vec3) {
        return this.ori.rotateVec3(this.sc.multiply(vec3)).add(this.tr);
    }

    toMat4() {
        let scl = new Mat4(
            this.sc.x, 0, 0, 0,
            0, this.sc.y, 0, 0,
            0, 0, this.sc.z, 0,
            0, 0, 0, 1.0);

        let rot = this.ori.toMat4();

        let trn = new Mat4();
        trn.translation = this.tr;

        return trn.multiply(rot).multiply(scl);
    }


    setFromFloat32Array(float32array) {
        if(float32array.length == 7){
            this.tr = new Vec3(float32array.buffer, float32array.byteOffset);
            this.ori = new Quat(float32array.buffer, float32array.byteOffset+12);
            this.sc = new Vec3(1, 1, 1);
            return;
        }
        if(float32array.length == 8){
            this.tr = new Vec3(float32array.buffer, float32array.byteOffset);
            this.ori = new Quat(float32array.buffer, float32array.byteOffset+12);
            let scl = float32array[7];
            this.sc = new Vec3(scl, scl, scl);
            return;
        }
        if(float32array.length == 10){
            this.tr = new Vec3(float32array.buffer, float32array.byteOffset);
            this.ori = new Quat(float32array.buffer, float32array.byteOffset+12);
            this.sc = new Vec3(float32array.buffer, float32array.byteOffset+21);
            return;
        }
    }

    clone() {
        return new Xfo(
            this.tr.clone(),
            this.ori.clone(),
            this.sc.clone()
        );
    }

    //////////////////////////////////////////
    // Static Methods

    static create(...args) {
        return new Xfo(...args);
    }

    /////////////////////////////
    // Persistence


    toJSON() {
        let j = {
            'tr': this.tr.toJSON(),
            'ori': this.ori.toJSON()
        };
        if(!this.sc.is111())
            j.sc = this.sc.toJSON();
        return j;
    }

    fromJSON(j) {
        this.tr.fromJSON(j.tr);
        this.ori.fromJSON(j.ori);
        if(j.sc){
            this.sc.fromJSON(j.sc);
        }
    }

    toString() {
        return JSON_stringify_fixedPrecision(this.toJSON())
    }
};

typeRegistry.registerType('Xfo', Xfo);

export default Xfo;