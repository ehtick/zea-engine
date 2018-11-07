
testingHarness.registerTest('Grids', (domElement, resources)=> {

    const scene = new Visualive.Scene(resources);


    let size = 2;
    let quads = [];
    let maxQuadSize = 10;
    for(let i=2; i<maxQuadSize; i++) {
        for(let j=i; j<maxQuadSize; j++) {
            let x = Math.pow(2, i);
            let y = Math.pow(2, j);
            quads.push(new Visualive.Plane(x*0.1, y*0.1, x, y));
        }
    }


    const material = new Visualive.Material('material', 'SimpleSurfaceShader');
    material.addParameter('BaseColor', new Visualive.Color(1, 0, 1));
    let addGeomItem = (shape, xfo, index, material)=>{
        const geomItem = new Visualive.GeomItem(shape.name+'Item'+index, shape, material);
        geomItem.setLocalXfo(xfo);
        scene.getRoot().addChild(geomItem, false);
    }
    let offset = 0;
    for(let quad of quads) {

        offset += quad.getX()*1.4;
        let tr = new Visualive.Vec3(offset, 1.0, 0.0);
        let xfo = new Visualive.Xfo(tr);
        addGeomItem(quad, xfo, offset, material);

    }

    const renderer = new Visualive.GLRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(15, 15, 2), new Visualive.Vec3(0, 0, 0));
    renderer.setScene(scene);
    renderer.frameAll();
    renderer.resumeDrawing();

});