testingHarness.registerTest('DynamicScenes/Gears', (domElement, resources)=> {
    
    const Z = ZeaEngine;

    const scene = new Z.Scene(resources);
    scene.setupGrid(10.0, 10);

    const asset = new Z.AssetItem('gears');
    scene.getRoot().addChild(asset);

    let index = 0;
    const gearBindings = [];
    let prevTeeth = 0;
    let prevRatio = 1.0;
    const addGear = (pos, radius, teeth, axis, color)=> {
        const gearGeom = new Z.Cylinder(radius, 0.2, teeth);
        const gearmaterial = new Z.Material('gearmaterial', 'SimpleSurfaceShader');
        gearmaterial.getParameter('BaseColor').setValue(color);
        const geomItem = new Z.GeomItem('gear'+(index++), gearGeom, gearmaterial);
        const xfo = new Z.Xfo();
        xfo.tr = pos;
        // xfo.ori.setFromDirectionAndUpvector(axis, new Z.Vec3(1, 0, 0));
        geomItem.setLocalXfo(xfo);
        asset.addChild(geomItem);

        const ratio = ((prevTeeth > 0) ? (-prevTeeth / teeth) : 1.0);
        gearBindings.push({ geomItem, ratio: ratio * -prevRatio, axis});
        prevTeeth = teeth;
        prevRatio = ratio;
    }
    addGear(new Z.Vec3(0, 0, 0), 2.5, 12, new Z.Vec3(0, 0, 1), new Z.Color(1.0, 0.0, 0.0));
    addGear(new Z.Vec3(3.5, 0, 0), 1.2, 8, new Z.Vec3(0, 0, 1), new Z.Color(0.0, 0.0, 1.0));
    addGear(new Z.Vec3(3.5, 1.6, 0), 0.6, 5, new Z.Vec3(0, 0, 1), new Z.Color(1.0, 1.0, 0.0));


    const gearsOp = new Z.GearsOperator('Gears');
    asset.addComponent(gearsOp);
    const rpmParam = gearsOp.getParameter('RPM');
    rpmParam.setValue(12.0);
    rpmParam.setRange([0, 60]);

    for(let binding of gearBindings) {
        const gear = gearsOp.getParameter('Gears').addElement();
        gear.getMember('Ratio').setValue(binding.ratio)
        gear.getMember('Axis').setValue(binding.axis)
        // const gearGeoms = gear.getMember('Items')
        // gearGeoms.addElement(binding.geomItem);
        gear.getOutput().setParam(binding.geomItem.getParameter('GlobalXfo'))
    }

    const renderer = new Z.GLRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(15, 15, 10), new Z.Vec3(0, 0, 0));
    renderer.setScene(scene);
    renderer.resumeDrawing();
});