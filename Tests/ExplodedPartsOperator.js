testingHarness.registerTest('ExplodedPartsOperator', (domElement, resources)=> {
    const scene = new Visualive.Scene(resources);

    let asset = new Visualive.TreeItem('parts');

    let middleSphere = new Visualive.Sphere(2.5);
    let middleSphereMaterial = new Visualive.Material('middleSphereMaterial', 'SimpleSurfaceShader');
    middleSphereMaterial.addParameter('baseColor', new Visualive.Color(0.0, 0.0, 1.0));
    {
        let middleSphereItem = new Visualive.GeomItem('middleSphere1', middleSphere, middleSphereMaterial);
        middleSphereItem.getLocalXfo().tr.set(0, 3.5, 3.5);
        asset.addChild(middleSphereItem, false);
    }
    {
        let middleSphereItem = new Visualive.GeomItem('middleSphere2', middleSphere, middleSphereMaterial);
        middleSphereItem.getLocalXfo().tr.set(0, 3.5, -3.5);
        asset.addChild(middleSphereItem, false);
    }
    {
        let middleSphereItem = new Visualive.GeomItem('middleSphere3', middleSphere, middleSphereMaterial);
        middleSphereItem.getLocalXfo().tr.set(0, -3.5, 3.5);
        asset.addChild(middleSphereItem, false);
    }
    {
        let middleSphereItem = new Visualive.GeomItem('middleSphere4', middleSphere, middleSphereMaterial);
        middleSphereItem.getLocalXfo().tr.set(0, -3.5, -3.5);
        asset.addChild(middleSphereItem, false);
    }

    let littleSphere = new Visualive.Sphere(2.0);
    let littleSphereMaterial = new Visualive.Material('littleSphereMaterial', 'SimpleSurfaceShader');
    littleSphereMaterial.addParameter('baseColor', new Visualive.Color(1.0, 0.0, 0.0));
    let littleSphereItem = new Visualive.GeomItem('littleSphere', littleSphere, littleSphereMaterial);
    asset.addChild(littleSphereItem, false);

    let bolt = new Visualive.Cuboid(1.2, 1.2, 1.2);
    let boltmaterial = new Visualive.Material('boltmaterial', 'SimpleSurfaceShader');
    boltmaterial.addParameter('baseColor', new Visualive.Color(1.0, 0.5, 0.0));

    let index = 0;
    let addBolt = (pos)=> {
        const geomItem = new Visualive.GeomItem('bolt'+(index++), bolt, boltmaterial);
        geomItem.setLocalXfo(new Visualive.Xfo(pos));
        asset.addChild(geomItem, false);
    }
    addBolt(new Visualive.Vec3(6.6, 5.2, 5.2));
    addBolt(new Visualive.Vec3(6.6, 5.2, -5.2));
    addBolt(new Visualive.Vec3(6.6, -5.2, 5.2));
    addBolt(new Visualive.Vec3(6.6, -5.2, -5.2));

    scene.getRoot().addChild(asset);
    /////////////////////////////////////
    // Obj Asset
    {

        let objAsset = new Visualive.ObjAsset('PartA');
        objAsset.getParameter('splitObjects').setValue(false);
        objAsset.getParameter('splitGroupsIntoObjects').setValue(false);
        objAsset.getParameter('loadMtlFile').setValue(false);
        objAsset.getParameter('defaultShader').setValue('SimpleSurfaceShader');
        objAsset.getParameter('FilePath').setValue("/Assets/ExplodePartA.obj");
        scene.getRoot().addChild(objAsset);

    }
    let op = new Visualive.ExplodePartsOperator(scene.getRoot());
    op.getParameter('Dist').setValue(30.0);
    {
        let objAsset = new Visualive.ObjAsset('PartB');
        objAsset.getParameter('splitObjects').setValue(false);
        objAsset.getParameter('splitGroupsIntoObjects').setValue(false);
        objAsset.getParameter('loadMtlFile').setValue(false);
        objAsset.getParameter('defaultShader').setValue('SimpleSurfaceShader');
        objAsset.getParameter('FilePath').setValue("/Assets/ExplodePartB.obj");
        scene.getRoot().addChild(objAsset);

        objAsset.loaded.connect(function() {

            op.connectParts([
                [
                    ['.', 'parts', 'bolt0'],
                    ['.', 'parts', 'bolt1'],
                    ['.', 'parts', 'bolt2'],
                    ['.', 'parts', 'bolt3'],
                    ['.', 'PartB', 'PartB'], 
                ],
                [
                    ['.', 'parts', 'middleSphere1'],
                    ['.', 'parts', 'middleSphere2'],
                    ['.', 'parts', 'middleSphere3'],
                    ['.', 'parts', 'middleSphere4']
                ]
                ]);

            let explodedAmount = 0;
            let animatingValue = false;
            let timeoutId;
            let param = op.getParameter('Explode');
            let timerCallback = () => {
                // Check to see if the video has progressed to the next frame. 
                // If so, then we emit and update, which will cause a redraw.
                animatingValue = true;
                explodedAmount += 0.005;
                op.getParameter('Explode').setValue(explodedAmount);
                renderer.requestRedraw();
                if (explodedAmount < 1.0) {
                    timeoutId = setTimeout(timerCallback, 20); // Sample at 50fps.
                }
                animatingValue = false;
            };
            timeoutId = setTimeout(timerCallback, 1000); // half second delay
            param.valueChanged.connect(()=>{
                if(!animatingValue) {
                    clearTimeout(timeoutId);
                }
            });
            
            renderer.resumeDrawing();
        });
    }




    const renderer = new Visualive.GLSimpleRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(35, 35, 20), new Visualive.Vec3(12, 0, 0));
    renderer.setScene(scene);
    renderer.resumeDrawing();

    //////////////////////////////////
    // Setup the UI

    let sliderController = new Visualive.SliderController(op.getParameter('Explode'));

    let widgetPanel = new Visualive.UIWidgetPanel();
    widgetPanel.addWidgetController(sliderController);

    let uicontroller = new Visualive.UIController();
    uicontroller.addWidgetPanel(widgetPanel);


    VisualiveUI.renderUI(renderer, uicontroller);

});