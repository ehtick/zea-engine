testingHarness.registerTest('EnvProjection', (domElement, resources)=> {
    /////////////////////////////////////
    // Scene
    const scene = new Visualive.Scene(resources);

    let layer0Material = new Visualive.Material('layer0', 'OctahedralEnvProjectionShader');
    layer0Material.addParameter('env', new Visualive.FileImage2D("Assets/HDR_041_Path_Ref0.vlh"));

    let offset = 0;
    let addMeshShape = (name, shape)=>{
        const geomItem = new Visualive.GeomItem(name + (offset++), shape, layer0Material);
        scene.getRoot().addChild(geomItem);
        return geomItem;
    }

    let geomItem0 = addMeshShape('Plane', new Visualive.Plane(50.0, 50.0));

    let geomItem2 = addMeshShape('Plane', new Visualive.Plane(5.0, 3.0));
    geomItem2.setLocalXfo(new Visualive.Xfo(new Visualive.Vec3(0, -2, 1), new Visualive.Quat({setFromAxisAndAngle: [new Visualive.Vec3(1, 0, 0), Math.PI * 0.5] })));
    
    // geomItem2.localXfo.ori.setFromAxisAndAngle(new Visualive.Vec3(0, 1, 0), Math.PI * 0.5);


    /////////////////////////////////////
    // Renderer
    
    // const renderer = new Visualive.GLSimpleRenderer(domElement);
    const renderer = new Visualive.GLVisualiveRenderer(domElement);
    renderer.setupGrid(60.0, new Visualive.Color(.53, .53, .53), 60, 0.01);
    renderer.getViewport().setBackground(new Visualive.Color(0.94, 0.94, 0.94));
    let vrViewport = renderer.getVRViewport();
    if(vrViewport){
        vrViewport.setBackground(new Visualive.Color(0.94, 0.94, 0.94));
    }


    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(1, 1, 1.2), new Visualive.Vec3(0, 0, 0.1));
    // renderer.getViewport().getCamera().focalDistance = 30;
    renderer.setScene(scene);


    renderer.resumeDrawing();
});