import {
    JSON_stringify_fixedPrecision
} from './Common.js';
import Vec3 from './Vec3.js';
import typeRegistry from './TypeRegistry.js';

class Ray {

    constructor(start = undefined, dir = undefined) {
        if (start instanceof Vec3) {
            this.start = start;
        } else {
            this.start = new Vec3();
        }
        if (dir instanceof Vec3) {
            this.dir = dir;
        } else {
            this.dir = new Vec3();
        }
    }

    closestPoint(point) {
        let w = point.subtract(this.start);
        let c1 = w.dot(this.dir);
        let c2 = this.dir.dot(this.dir);
        if (c2 < Number.EPSILON)
            return 0.0;
        let fract = c1 / c2;
        return this.start.add(this.dir.scale(fract));
    }

    pointAtDist(dist){
        return this.start.add(this.dir.scale(dist));
    }

    // Returns the 2 ray params that represent the closest point between the 2 rays.
    intersectRayVector(ray) {

        let u = this.dir;
        let v = ray.dir;
        let w = this.start.subtract(ray.start);
        let a = u.dot(u); // always >= 0
        let b = u.dot(v);
        let c = v.dot(v); // always >= 0
        let d = u.dot(w);
        let e = v.dot(w);
        if (a == 0.0 && c == 0.0) {
            return this.start.distanceTo(ray.start);
        }
        if (a == 0.0) {
            return ray.closestPoint(this.start);
        }
        if (c == 0.0) {
            return this.closestPoint(ray.start);
        }
        let D = a * c - b * b; // always >= 0

        // compute the ray parameters of the two closest points
        let this_t, ray_t;
        if (D < 0.001) {
            // the lines are almost parallel
            this_t = 0.0;
            if (b > c) {
                // use the largest denominator
                ray_t = d / b;
            } else {
                ray_t = e / c;
            }
        } else {
            this_t = (b * e - c * d) / D;
            ray_t = (a * e - b * d) / D;
        }
        return [this_t, ray_t];
    }

    // Returns the 1 ray param represetning the intersectoin of this ray against the plane defined by the given ray.
    intersectRayPlane(ray) {
        let w = this.start.subtract(ray.start);
        let D = ray.dir.dot(this.dir);
        let N = -ray.dir.dot(w);

        if (Math.abs(D) < Number.PRECISION) {
            // segment is parallel to plane
            if (N == 0.0)
                return -1.0; // segment lies in plane
            else
                return -1.0; // no intersection
        }
        // they are not parallel
        // compute intersect param
        let sI = N / D;
        if (sI < -Number.PRECISION) {
            return -1; // no intersection
        }
        return sI;
    }

    clone() {
        return new Ray(
            this.start.clone(),
            this.dir.clone()
        );
    }
    
    //////////////////////////////////////////
    // Static Methods

    static create(...args) {
        return new Ray(...args);
    }

    /////////////////////////////
    // Persistence

    toJSON() {
        return {
            "start": this.start,
            "dir": this.dir
        }
    }

    fromJSON(j) {
        this.start.fromJSON(j.start);
        this.dir.fromJSON(j.dir);
    }

    toString() {
        return JSON_stringify_fixedPrecision(this.toJSON())
    }
};

typeRegistry.registerType('Ray', Ray);

export {
    Ray
};
// export default Ray