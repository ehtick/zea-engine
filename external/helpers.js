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


let generateResourcesDict = (list=[], assetDescs=[])=>{
    let resources = {
        commonResources: {
            'Resources.vlr': window.location.origin+'/Resources/Resources.vlr',
            'Dome.vlatree': window.location.origin+'/Resources/Dome.vlatree',
            'Dome0.vlageoms': window.location.origin+'/Resources/Dome0.vlageoms',
            'LogoSmall.png': window.location.origin+'/Resources/LogoSmall.png',
            'FlakesNormalMap.png': window.location.origin+'/Resources/FlakesNormalMap.png'
        }
    };
    let rootURL = window.location.href.split('#')[0];
    if(rootURL.endsWith('.html') || rootURL.endsWith('.html')){
        rootURL = rootURL.substring(0, rootURL.lastIndexOf('/'));
    }
    rootURL = rootURL + '/';
    let generatePath = (item)=>{
        let parts = item.split('/');
        let curr = resources;
        for(let i=0; i<parts.length-1; i++){
            let part = parts[i];
            if(!(part in curr)){
                curr[part] = {};
            }
            curr = curr[part];
        }
        curr[parts[parts.length-1]] = rootURL+item;
    }
    for(let item of list){
        generatePath(item);
    }
    for(let assetDesc of assetDescs){
        generatePath(assetDesc[0] + ".vlatree");
        for(let i=0; i<assetDesc[1]; i++)
            generatePath(assetDesc[0] + i + ".vlageoms");
        generatePath(assetDesc[0] + "_Lightmap.vlh");
        for(let i=1; i<3; i++)
            generatePath(assetDesc[0] + "_Lightmap"+i+".vlh");
    }
    return resources;
}