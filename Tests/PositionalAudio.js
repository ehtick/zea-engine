

testingHarness.registerTest('PositionalAudio', (domElement, resources)=> {
    
    const scene = new Visualive.Scene(resources);


    const standardMaterial = new Visualive.Material('surfaces', 'SimpleSurfaceShader');
    standardMaterial.getParameter('BaseColor').setValue(new Visualive.Color(89 / 255, 182 / 255, 92 / 255));
    // standardMaterial.getParameter('Roughness').setValue(1.0);
    // standardMaterial.getParameter('Metallic').setValue(0.0);


    const addMeshShape = (name, shape, pos, url)=>{
        const geomItem = new Visualive.GeomItem(name+'Item', shape, standardMaterial)

        const xfo = new Visualive.Xfo(pos)
        xfo.ori.rotateX(Math.PI * 0.5);
        geomItem.setLocalXfo(xfo);

        const audioItem = new Visualive.FileAudioItem(name+'Audio');
        audioItem.getParameter('FilePath').setValue(url);
        audioItem.getParameter('Gain').setValue(15.0);
        audioItem.getParameter('rolloffFactor').setValue(0.1);
        geomItem.addChild(audioItem, false);

        scene.getRoot().addChild(geomItem, false);

        return audioItem;
    }

    // const einstein = addMeshShape('Einstein', new Visualive.Plane(0.4, 0.6), new Visualive.Vec3(-4, -3, 3), "Assets/AudioFiles/Albert Einstein Interview 1940.mp3");
    // einstein.getParameter('Gain').setValue(0.6);

    const mandela = addMeshShape('Mandela', new Visualive.Plane(0.3, 0.4), new Visualive.Vec3(0, -3, 2), "Assets/AudioFiles/Nelson Mandela speech that changed the world.mp3");
    // const mandela = addMeshShape('viper', new Visualive.Plane(0.3, 0.4), new Visualive.Vec3(0, -3, 2), "Assets/AudioFiles/viper.ogg");
    mandela.getParameter('Gain').setValue(2.6);

    const renderer = new Visualive.GLSimpleRenderer(domElement);
    renderer.setupGrid(60.0, new Visualive.Color(.53, .53, .53), 60, 0.01);
    renderer.setScene(scene);

    const camera = renderer.getViewport().getCamera();
    camera.setPositionAndTarget(new Visualive.Vec3(1.0, 3.0, 4.0), new Visualive.Vec3(0.0, 0.0, 1.5));

    const visualivePlatform = VisualivePlatform();
    const sessionClient = new Visualive.SessionClient(renderer, visualivePlatform);

    renderer.resumeDrawing();
});
