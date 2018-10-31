import { Lines } from '../Lines.js';
import {
    NumberParameter
} from '../../Parameters/NumberParameter.js';
import {
    sgFactory
} from '../../SGFactory.js';

class Cross extends Lines {
    constructor(size = 1.0) {
        super();

        if(isNaN(size))
            throw("Invalid geom args");

        this.__size = size;
        this.__rebuild();
    }


    get size() {
        return this.__size
    }

    set size(val) {
        this.__size = val;
        this.__resize();
    }

    __rebuild() {
        this.setNumVertices(6);
        this.setNumSegments(3);
        this.setSegment(0, 0, 1);
        this.setSegment(1, 2, 3);
        this.setSegment(2, 4, 5);
        this.__resize();
    }

    __resize() {
        this.getVertex(0).set(-0.5 * this.__size, 0, 0);
        this.getVertex(1).set(0.5 * this.__size, 0, 0);
        this.getVertex(2).set(0, 0.5 * this.__size,  0);
        this.getVertex(3).set(0, -0.5 * this.__size,  0);
        this.getVertex(4).set(0, 0, 0.5 * this.__size);
        this.getVertex(5).set(0, 0, -0.5 * this.__size);
        this.setBoundingBoxDirty();
    }

    toJSON() {
        let json = super.toJSON();
        json['size'] = this.__size;
        return json
    }
};
sgFactory.registerClass('Cross', Cross);

export {
    Cross
};