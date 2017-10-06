let addGUI = function(div, options) {
    let moveGUIDiv = document.createElement("div");
    moveGUIDiv.id = 'moveGUI';
    div.appendChild(moveGUIDiv);
    options = options ? options : {};
    options.autoPlace = false;
    let gui = new dat.GUI(options);
    
    moveGUIDiv.style.position = 'absolute';
    moveGUIDiv.style.top = '0px';
    moveGUIDiv.style.right = '30px';
    moveGUIDiv.style.zIndex = 100;
    moveGUIDiv.appendChild(gui.domElement);
    return gui;
}

let addCanvas = function(width, height) {
    let resizeDiv = document.createElement("div");
    resizeDiv.id = 'visualive';
    if (width == undefined) {
        resizeDiv.style.width = '100%';
        resizeDiv.style.height = '100%';
        resizeDiv.style.position = 'fixed';
        resizeDiv.style.top = 0;
        resizeDiv.style.left = 0;
        resizeDiv.style.overflow = 'hidden';
    } else {
        resizeDiv.style.position = 'relative';
        resizeDiv.style.width = width + 'px';
        resizeDiv.style.height = height + 'px';
    }
    document.body.appendChild(resizeDiv);
    if (width !== undefined) {
        document.body.appendChild(document.createElement("br"));
    }
    return resizeDiv;
}


let generateResourcesDict = (list=[], assetDescs=[], imageDescs=[])=>{
    let resources = {
        VisualiveEngine: {
            'Resources.vlr': window.location.origin+'/Resources/Resources.vlr',
            'Dome.vlatree': window.location.origin+'/Resources/Dome.vlatree',
            'Dome0.vlageoms': window.location.origin+'/Resources/Dome0.vlageoms',
            'LogoSmall.png': window.location.origin+'/Resources/LogoSmall.png',
            'FlakesNormalMap.png': window.location.origin+'/Resources/FlakesNormalMap.png'
        }
    };
    let rootURL = window.location.href.split('#')[0];
    rootURL = rootURL.split('?')[0];
    if(rootURL.endsWith('.html') || rootURL.endsWith('.html')){
        rootURL = rootURL.substring(0, rootURL.lastIndexOf('/')) + '/';
    }
    let generatePath = (item)=>{
        let parts = item.split('/');
        let base = rootURL;
        if(parts[0] == '.')
            parts.shift();
        if(parts[0] == '..'){
            item = item.substring(3);
            let baseparts = base.split('/');
            baseparts.pop();
            baseparts.pop();
            base = baseparts.join('/') + '/';
        }
        let curr = resources;
        for(let i=0; i<parts.length-1; i++){
            let part = parts[i];
            if(!(part in curr)){
                curr[part] = {};
            }
            curr = curr[part];
        }
        curr[parts[parts.length-1]] = base+item;
    }
    for(let item of list){
        generatePath(item);
    }
    for(let assetDesc of assetDescs){
        generatePath(assetDesc[0] + ".vlatree");
        for(let i=0; i<assetDesc[1]; i++)
            generatePath(assetDesc[0] + i + ".vlageoms");
        if(assetDesc.length == 3) {
            for(let i=0; i<3; i++){
                // PAth for the env and the lightmaps for the env
                generatePath(assetDesc[2] + i + ".vlh");
                generatePath(assetDesc[0] + "_" + assetDesc[2] + "_Lightmap" + i + ".vlh");
            }
        }
    }
    for(let imageDesc of imageDescs){
        for(let i=0; i<3; i++){
            let suffixSt = imageDesc.lastIndexOf('.')
            generatePath(imageDesc.substring(0, suffixSt) + i + imageDesc.substring(suffixSt));
        }
    }
    return resources;
}