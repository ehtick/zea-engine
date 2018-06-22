import { Vec2 } from '../../../Math/Vec2';
import { Vec3 } from '../../../Math/Vec3';
import { Mesh } from '../Mesh.js';

class Torus extends Mesh {
    constructor(innerRadius = 0.5, outerRadius = 1.0, detail = 32) {
        super();

        if(isNaN(innerRadius) || isNaN(outerRadius) || isNaN(detail))
            throw("Invalid geom args");

        this.__innerRadius = innerRadius;
        this.__outerRadius = outerRadius;
        this.__detail = (detail >= 3) ? detail : 3;

        this.addVertexAttribute('texCoords', Vec2);
        this.addVertexAttribute('normals', Vec3);
        this.__rebuild();
    }

    get innerRadius() {
        return this.__innerRadius
    }

    set innerRadius(val) {
        this.__innerRadius = val;
        this.__resize();
    }

    get outerRadius() {
        return this.__outerRadius
    }

    set outerRadius(val) {
        this.__outerRadius = val;
        this.__resize();
    }

    get detail() {
        return this.__detail
    }

    set detail(val) {
        this.__detail = (val >= 3) ? val : 3;
        this.__rebuild();
    }

    __rebuild() {

        let nbSlices = this.__detail;
        let nbLoops = this.__detail * 2;
        let numVertices = nbSlices * nbLoops;

        this.setNumVertices(numVertices);
        this.setFaceCounts([0, nbSlices * nbLoops]);

        //////////////////////////////
        // Set Vertex Positions

        let normals = this.getVertexAttribute('normals');
        let vertex = 0;
        for (let i = 0; i < nbLoops; i++) {
            let theta = (i / nbLoops) * 2.0 * Math.PI;
            let ctheta = Math.cos(theta);
            let stheta = Math.sin(theta);

            for (let j = 0; j < nbSlices; j++) {
                let phi = (j / nbSlices) * 2.0 * Math.PI;

                let sphi = Math.sin(phi);
                let cphi = Math.cos(phi);
                let d = this.__outerRadius + cphi * this.__innerRadius;

                // Set positions and normals at the same time.
                this.getVertex(vertex).set(ctheta * d, stheta * d, this.__innerRadius * sphi);
                normals.getValueRef(vertex).set(ctheta * cphi, stheta * cphi, sphi);
                vertex++;
            }
        }

        //////////////////////////////
        // build the topology and texCoords
        let texCoords = this.getVertexAttribute('texCoords');
        let faceIndex = 0;
        for (let i = 0; i < nbLoops; i++) {
            for (let j = 0; j < nbSlices; j++) {
                let ip = (i + 1) % nbLoops;
                let jp = (j + 1) % nbSlices;
                let v0 = nbSlices * i + j;
                let v1 = nbSlices * i + jp;
                let v2 = nbSlices * ip + jp;
                let v3 = nbSlices * ip + j;
                this.setFaceVertexIndices(faceIndex, v0, v1, v2, v3);

                texCoords.setFaceVertexValue(faceIndex, 0, new Vec2(i / nbLoops, j / nbLoops));
                texCoords.setFaceVertexValue(faceIndex, 1, new Vec2(i / nbLoops, (j + 1) / nbLoops));
                texCoords.setFaceVertexValue(faceIndex, 2, new Vec2((i + 1) / nbLoops, (j + 1) / nbLoops));
                texCoords.setFaceVertexValue(faceIndex, 3, new Vec2((i + 1) / nbLoops, j / nbLoops));
                faceIndex++;
            }
        }

        this.setBoundingBoxDirty();
    }

    __resize() {
        let nbSlices = this.__detail;
        let nbLoops = this.__detail * 2;
        let numVertices = nbSlices * nbLoops;

        //////////////////////////////
        // Set Vertex Positions

        let normals = this.getVertexAttribute('normals');
        let vertex = 0;
        for (let i = 0; i < nbLoops; i++) {
            let theta = (i / nbLoops) * 2.0 * Math.PI;
            let ctheta = Math.cos(theta);
            let stheta = Math.sin(theta);

            for (let j = 0; j < nbSlices; j++) {
                let phi = (j / nbSlices) * 2.0 * Math.PI;

                let sphi = Math.sin(phi);
                let cphi = Math.cos(phi);
                let d = this.__outerRadius + cphi * this.__innerRadius;

                // Set positions and normals at the same time.
                this.getVertex(vertex).set(ctheta * d, stheta * d, this.__innerRadius * sphi);
                index++;
            }
        }

        this.setBoundingBoxDirty();
    }

    toJSON() {
        let json = super.toJSON();
        json['x'] = this.__x;
        json['y'] = this.__y;
        json['z'] = this.__z;
        return json
    }
};

export {
    Torus
};
//export default Torus;