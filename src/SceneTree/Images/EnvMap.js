import {
    Vec2, 
    Vec3,
    Color
} from '../../Math';
import {
    Signal,
    decodeText
} from '../../Utilities';
import {
    sgFactory
} from '../SGFactory.js';
import {
    VLHImage
} from './VLHImage.js';
import {
    resourceLoader
} from '../ResourceLoader.js';

import {
    Parameter,
    NumberParameter,
    Vec4Parameter,
    FilePathParameter,
    ParameterSet
} from '../Parameters';

const EnvMapMapping = {
    LATLONG: 1,
    OCTAHEDRAL: 2
};



const sq = (x) => (x * x)
const step = (edge, x) => (x < edge ? 0.0 : 1.0)

function sum_vec2(value) {
    return value.dot(new Vec2(1.0, 1.0));
}
function sum_vec3(value) {
    return value.dot(new Vec3(1.0, 1.0, 1.0));
}
function abs_vec2(value) {
    return new Vec2(
               Math.abs(value.x),
               Math.abs(value.y)
           );
}
function max_vec2(vec, value) {
    return new Vec2(
               Math.max(vec.x, value),
               Math.max(vec.y, value)
           );
}
function abs_vec3(value) {
    return new Vec3(
               Math.abs(value.x),
               Math.abs(value.y),
               Math.abs(value.z)
           );
}
function sectorize_vec2(value) {
    return new Vec2(
               step(0.0, value.x) * 2.0 - 1.0,
               step(0.0, value.y) * 2.0 - 1.0
           );
}
function sectorize_vec3(value) {
    return new Vec3(
               step(0.0, value.x) * 2.0 - 1.0,
               step(0.0, value.y) * 2.0 - 1.0,
               step(0.0, value.z) * 2.0 - 1.0
           );
}


function latLongUVsFromDir(dir) {
    // Math function taken from...
    // http://gl.ict.usc.edu/Data/HighResProbes/
    // Note: Scaling from u=[0,2], v=[0,1] to u=[0,1], v=[0,1]
    const phi = Math.acos(dir.z);
    const theta = Math.atan2(dir.x, -dir.y);
    return new Vec2((1 + theta / Math.PI) / 2, phi / Math.PI);
}

// Note: when u == 0.5 z = 1
function dirFromLatLongUVs(u, v) {
    // http://gl.ict.usc.edu/Data/HighResProbes/
    const theta = Math.PI*((u * 2) - 1);
    const phi = Math.PI*v;
    return new Vec3(sin(phi)*sin(theta), -sin(phi)*cos(theta), cos(phi));
}

function dirToSphOctUv(normal) {
    const aNorm = abs_vec3(normal);
    const sNorm = sectorize_vec3(normal);
    const aNorm_xy = new Vec2(aNorm.x, aNorm.y);

    let dir = max_vec2(aNorm_xy, 1e-20);
    const orient = Math.atan2(dir.x, dir.y) / Math.HALF_PI;

    dir = max_vec2(new Vec2(aNorm.z, aNorm_xy.length()), 1e-20);
    const pitch = Math.atan2(dir.y, dir.x) / Math.HALF_PI;

    let uv = new Vec2(sNorm.x * orient, sNorm.y * (1.0 - orient));
    uv.scaleInPlace(pitch)

    if (normal.z < 0.0) {
        const ts = new Vec2(uv.y, uv.x);
        const sNorm_xy = new Vec2(sNorm.x, sNorm.y);
        uv = sNorm_xy.subtract(abs_vec2(ts).multiply(sNorm_xy));
    }
    return uv.scale(0.5).add(new Vec2(0.5,  0.5));
}

function sphOctUvToDir(uv) {
    uv = uv.scale(2).subtract(new Vec2(1, 1));
    const suv = sectorize_vec2(uv);
    const sabsuv = sum_vec2(abs_vec2(uv));
    const pitch = sabsuv * Math.PI * 0.5;

    if (pitch <= 0.0) {
        return new Vec3(0.0, 0.0, 1.0);
    }
    if (Math.abs(pitch - Math.PI) < 0.000001) {
        return new Vec3(0.0, 0.0, -1.0);
    }
    if (sabsuv > 1.0) {
        const ts = Vec2(uv.y, uv.x);
        uv = abs_vec2(ts).negate().add(new Vec2(1, 1)).multiply(suv);

        sabsuv = sum_vec2(abs_vec2(uv));
    }

    const orient = (Math.abs(uv.x) / sabsuv) * Math.HALF_PI;
    const sOrient = Math.sin(orient);
    const cOrient = Math.cos(orient);
    const sPitch = Math.sin(pitch);
    const cPitch = Math.cos(pitch);

    return new Vec3(
               sOrient * suv.x * sPitch,
               cOrient * suv.y * sPitch,
               cPitch
           );
}

class EnvMap extends VLHImage {
    constructor(name, params = {}) {
        super(name, params);

        this.mapping = EnvMapMapping.OCTAHEDRAL;
    }

    __decodeData(entries) {
        super.__decodeData(entries);

        const samples = entries.samples;

        if(samples) {
            if(window.TextDecoder)
                this.__sampleSets = JSON.parse((new TextDecoder("utf-8")).decode(samples));
            else
                this.__sampleSets = JSON.parse(decodeText(samples));
        }
    }
    
    getSampleSets() {
        return this.__sampleSets;
    }

    uvToDir(uv) {
        switch(this.mapping) {
        case EnvMapMapping.LATLONG:
            return dirFromLatLongUVs(uv);
            break;
        case EnvMapMapping.OCTAHEDRAL:
            return sphOctUvToDir(uv);
            break;
        }
    }

    dirToUv(dir) {
        switch(this.mapping) {
        case EnvMapMapping.LATLONG:
            return latLongUVsFromDir(dir);
            break;
        case EnvMapMapping.OCTAHEDRAL:
            return dirToSphOctUv(dir);
            break;
        }
    }

    dirToLuminance(dir) {
        const uv = this.dirToUv(dir);
        const thmbPixel = (Math.floor(uv.y * 32) * 32) + (Math.floor(uv.x * 32));
        // console.log("dir:", dir.toString(), uv.toString(), thmbPixel)
        return this.__sampleSets.luminanceThumbnail[thmbPixel];
    }

};

sgFactory.registerClass('EnvMap', EnvMap);


export {
    EnvMap
};