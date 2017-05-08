import Vec2 from '../../../Math/Vec2';
import Vec3 from '../../../Math/Vec3';
import Mesh from '../Mesh.js';

class Cone extends Mesh {
    constructor(name, radius = 0.5, height = 1.0, detail = 32, cap = true) {
        super(name);

        this.__radius = radius;
        this.__height = height;
        this.__detail = (detail >= 3) ? detail : 3;
        this.__cap = cap;

        this.addVertexAttribute('texCoords', Vec2);
        this.addVertexAttribute('normals', Vec3);
        this.__rebuild();
    }

    get radius() {
        return this.__radius;
    }

    set radius(val) {
        this.__radius = val;
        this.__resize();
    }

    get height() {
        return this.__height;
    }

    set height(val) {
        this.__height = val;
        this.__resize();
    }

    get detail() {
        return this.__detail
    }

    set detail(val) {
        this.__detail = (val >= 3) ? val : 3;
        this.__rebuild();
    }


    get cap() {
        return this.__cap;
    }

    set cap(val) {
        this.__cap = val;
        this.__rebuild();
    }

    __rebuild() {
        let nbSides = this.__detail;
        let numVertices = nbSides + 1;
        if (this.__cap) {
            numVertices += 1;
        }
        this.setNumVertices(numVertices);
        let tipPoint = nbSides;
        let basePoint = nbSides + 1;

        //////////////////////////////
        // Set Vertex Positions

        this.getVertex(tipPoint).set(0.0, this.__height, 0.0);
        for (let i = 0; i < nbSides; i++) {
            let theta = (i / nbSides) * 2.0 * Math.PI;
            this.getVertex(i).set(this.__radius * Math.cos(theta), 0.0, this.__radius * Math.sin(theta));
        }
        if (this.__cap) {
            this.getVertex(basePoint).set(0.0, 0.0, 0.0);
        }

        //////////////////////////////
        // build the topology
        this.setFaceCounts([nbSides + (this.__cap ? nbSides : 0)]);
        for (let i = 0; i < nbSides; i++) {
            let j = (i + 1) % nbSides;
            this.setFaceVertexIndices(i, j, i, tipPoint);
        }
        if (this.__cap) {
            for (let i = 0; i < nbSides; i++) {
                let j = (i + 1) % nbSides;
                this.setFaceVertexIndices(nbSides + i, i, j, basePoint);
            }
        }

        //////////////////////////////
        // setNormals
        let normals = this.getVertexAttribute('normals');

        let normalElevation;
        let divider = this.__height;
        if (Math.abs(this.__height) < 1.0e-12)
            normalElevation = this.__height < 0 ? -1.0e-12 : 1.0e-12;
        normalElevation = this.__radius / divider;

        let tri = 0;
        for (let i = 0; i < nbSides; i++) {
            let theta1 = ((i + 1) / nbSides) * 2.0 * Math.PI;
            let theta2 = (i / nbSides) * 2.0 * Math.PI;
            let theta = (theta1 + theta2) * 0.5;

            normals.setFaceVertexValue(tri, 0, new Vec3(Math.cos(theta1), normalElevation, Math.sin(theta1)).normalize());
            normals.setFaceVertexValue(tri, 1, new Vec3(Math.cos(theta2), normalElevation, Math.sin(theta2)).normalize());
            normals.setFaceVertexValue(tri, 2, new Vec3(Math.cos(theta), normalElevation, Math.sin(theta)).normalize());
            tri++;
        }
        if (this.__cap) {
            let normal = new Vec3(0.0, -1.0, 0.0);
            for (let i = 0; i < nbSides; i++) {
                normals.setFaceVertexValue(tri, 0, normal);
                normals.setFaceVertexValue(tri, 1, normal);
                normals.setFaceVertexValue(tri, 2, normal);
                tri++;
            }
        }

        //////////////////////////////
        // setUVs
        let texCoords = this.getVertexAttribute('texCoords');

        // Now set the attrbute values
        tri = 0;
        for (let i = 0; i < nbSides; i++) {
            texCoords.setFaceVertexValue(tri, 0, new Vec2((i + 1) / nbSides, 0.0));
            texCoords.setFaceVertexValue(tri, 1, new Vec2(i / nbSides, 0.0));
            texCoords.setFaceVertexValue(tri, 2, new Vec2((i + 0.5) / nbSides, 1.0));
        }
        if (this.__cap) {
            for (let i = 0; i < nbSides; i++) {
                texCoords.setFaceVertexValue(tri, 0, new Vec2(i / nbSides, 0.0));
                texCoords.setFaceVertexValue(tri, 1, new Vec2((i + 1) / nbSides, 0.0));
                texCoords.setFaceVertexValue(tri, 2, new Vec2((i + 0.5) / nbSides, 1.0));
                tri++;
            }
        }

        this.setBoundingBoxDirty();
    }

    __resize() {
        let nbSides = this.__detail;
        let tipPoint = nbSides;
        let basePoint = nbSides + 1;

        this.getVertex(tipPoint).set(0.0, this.__height, 0.0);
        for (let i = 0; i < nbSides; i++) {
            let theta = (i / nbSides) * 2.0 * Math.PI;
            this.getVertex(i).set(this.__radius * Math.cos(theta), 0.0, this.__radius * Math.sin(theta));
        }
        if (this.__cap) {
            this.getVertex(basePoint).set(0.0, 0.0, 0.0);
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
    Cone
};
//export default Cone;