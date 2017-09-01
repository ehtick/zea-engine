import { Vec2 } from '../../../Math/Vec2';
import { Vec3 } from '../../../Math/Vec3';
import { Mesh } from '../Mesh.js';

class Plane extends Mesh {
    constructor(x = 1.0, y = 1.0, xDivisions = 1, yDivisions = 1) {
        super();

        this.__x = x;
        this.__y = y;
        this.__xDivisions = xDivisions;
        this.__yDivisions = yDivisions;
        this.addVertexAttribute('texCoords', Vec2);
        this.addVertexAttribute('normals', Vec3);
        this.__rebuild();
    }

    get x() {
        console.warn(("getter is deprectated. Please use 'getX'"));
        return this.getX();
    }

    set x(val) {
        console.warn(("getter is deprectated. Please use 'setX'"));
        this.setX(val);
    }

    get y() {
        console.warn(("getter is deprectated. Please use 'getY'"));
        return this.getY();
    }

    set y(val) {
        console.warn(("getter is deprectated. Please use 'setY'"));
        this.setY(val);
    }

    getX() {
        return this.__x
    }

    setX(val) {
        this.__x = val;
        this.__resize();
    }

    getY() {
        return this.__y
    }

    setY(val) {
        this.__y = val;
        this.__resize();
    }

    setSize(x, y) {
        this.__x = x;
        this.__y = y;
        this.__resize();
    }

    __rebuild() {
        this.setNumVertices((this.__xDivisions + 1) * (this.__yDivisions + 1));
        this.setFaceCounts([0, this.__xDivisions * this.__yDivisions]);

        let quadId = 0;
        for (let i = 0; i < this.__yDivisions; i++) {
            for (let j = 0; j < this.__xDivisions; j++) {
                let v0 = ((this.__xDivisions + 1) * (i + 1)) + j;
                let v1 = ((this.__xDivisions + 1) * (i + 1)) + (j + 1);
                let v2 = ((this.__xDivisions + 1) * i) + (j + 1);
                let v3 = ((this.__xDivisions + 1) * i) + j;
                this.setFaceVertexIndices(quadId, v0, v1, v2, v3);
                quadId = quadId + 1;
            }
        }

        let voff = 0;
        let normals = this.getVertexAttribute('normals');
        for (let i = 0; i <= this.__yDivisions; i++) {
            for (let j = 0; j <= this.__xDivisions; j++) {
                normals.getValueRef(voff).set(0, 0, 1);
                voff++;
            }
        }

        voff = 0;
        let texCoords = this.getVertexAttribute('texCoords');
        for (let i = 0; i <= this.__yDivisions; i++) {
            let y = i / this.__yDivisions;
            for (let j = 0; j <= this.__xDivisions; j++) {
                let x = j / this.__xDivisions;
                texCoords.getValueRef(voff).set(x, y);
                voff++;
            }
        }

        this.__resize();
    }

    __resize() {
        let voff = 0;
        for (let i = 0; i <= this.__yDivisions; i++) {
            let y = ((i / this.__yDivisions) - 0.5) * this.__y;
            for (let j = 0; j <= this.__xDivisions; j++) {
                let x = ((j / this.__xDivisions) - 0.5) * this.__x;
                this.getVertex(voff).set(x, y, 0.0);
                voff++;
            }
        }

        this.setBoundingBoxDirty();
    }

    toJSON() {
        let json = super.toJSON();
        json['x'] = this.__x;
        json['y'] = this.__y;
        json['xDivisions'] = this.__xDivisions;
        json['yDivisions'] = this.__yDivisions;
        return json
    }
};

export {
    Plane
};
//export default Plane;