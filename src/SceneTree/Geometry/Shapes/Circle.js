import { Lines } from '../Lines.js';

import {
    NumberParameter
} from '../../Parameters/NumberParameter.js';

class Circle extends Lines {
    constructor(radius = 1.0, numSegments=32) {
        super();

        if(isNaN(radius) || isNaN(numSegments))
            throw("Invalid geom args");

        this.__radius = this.addParameter(new NumberParameter('Radius', radius));
        this.__radius.valueChanged.connect(this.__resize.bind(this));
        this.__numSegments = this.addParameter(new NumberParameter('NumSegments', numSegments));
        this.__numSegments.valueChanged.connect(this.__rebuild.bind(this));
        this.__rebuild();
    }

    __rebuild() {
        const segs = this.__numSegments.getValue();
        this.setNumVertices(segs+1);
        this.setNumSegments(segs);
        for(let i=0; i<segs; i++)
            this.setSegment(i, i, (i+1)%segs);
        this.__resize(-1);
        this.geomDataTopologyChanged.emit();
    }

    __resize(mode) {
        const radius = this.__radius.getValue();
        const segs = this.__numSegments.getValue();
        let angle = (Math.PI * 2.0) / segs;
        for(let i=0; i<segs; i++)
            this.getVertex(i).set(Math.sin(angle * i) * radius, Math.cos(angle * i) * radius, 0.0);
        this.setBoundingBoxDirty();
        if(mode != -1)
            this.geomDataChanged.emit();
    }

};

export {
    Circle
};
//export default Circle;