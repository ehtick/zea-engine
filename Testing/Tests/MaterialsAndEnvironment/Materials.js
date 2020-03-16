﻿testingHarness.registerTest('MaterialsAndEnvironment/Materials', (domElement, resources)=> {
    const Z = ZeaEngine;
    
    const scene = new Z.Scene();
    const renderer = new Z.GLRenderer(domElement);
    renderer.exposure = 1.0;
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(-20,-20,10), new Z.Vec3(10,10,0));
    renderer.setScene(scene);
    renderer.resumeDrawing();

    //////////////////////////////

    const envMap = new Z.EnvMap();
    // envMap.getParameter('FilePath').setUrl("https://storage.googleapis.com/zea-playground-assets/zea-engine/HDR_029_Sky_Cloudy_Ref.vlh")
    envMap.getParameter('FilePath').setUrl("https://storage.googleapis.com/zea-playground-assets/zea-engine/HDR_041_Path_Ref.vlenv")
    scene.setEnvMap(envMap);

    const addMeshShape = (name, shape, pos, mat)=>{
        const geomItem = new Z.GeomItem(name, shape, mat);
        geomItem.setLocalXfo(new Z.Xfo(pos));
        scene.getRoot().addChild(geomItem);
    }
    for(let i=0; i<10; i++){
        for(let j=0; j<10; j++){
            const material = new Z.Material('surfaces', 'StandardSurfaceShader');
            material.getParameter('BaseColor').setValue(new Z.Color(0.6, 0.0, 0.0));
            material.getParameter('Roughness').setValue(i/9);
            material.getParameter('Metallic').setValue(j < 5 ? 0.05 : 0.95);
            material.getParameter('Reflectance').setValue(j < 5 ? 0.03 : 0.8);
            addMeshShape('Sphere'+i+"-"+j, new Z.Sphere(1.4, 40), new Z.Vec3(i*3.4, j*3.4, 0), material);
        }
    }
    
    renderer.frameAll();

    document.addEventListener('keypress', (event) => {
        const key = String.fromCharCode(event.keyCode).toLowerCase();
        if(key == 'v' && event.shiftKey) {
            console.log("Starting VR")
            const vrvp = renderer.getVRViewport();
            if(vrvp) 
                vrvp.togglePresenting();
        }
    });
});