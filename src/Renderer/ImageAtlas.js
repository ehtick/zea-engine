import {
    Vec2,
    Rect2,
    BinTreeNode,
    BinTreeRect,
    BinTreeRectBorder
} from '../Math/Math.js';

import {
    Shader,
    shaderLibrary
} from '../SceneTree/SceneTree.js';

import {
    GLShader
} from './GLShader.js';
import {
    GLTexture2D
} from './GLTexture2D.js';
import {
    GLFbo
} from './GLFbo.js';

import {
    generateShaderGeomBinding,
} from './GeomShaderBinding.js';


class AtlasLayoutShader extends Shader {
    
    constructor(name) {
        super();
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('AtlasLayoutShader.vertexShader', `

precision highp float;

<%include file="utils/quadVertexFromID.glsl"/>

uniform vec2 pos;
uniform vec2 size;
uniform vec2 textureDim;
const int border = 2;

/* VS Outputs */
varying vec2 v_texCoord;
 
void main()
{
    vec2 position = getScreenSpaceVertexPosition();
    v_texCoord = position+0.5;
    gl_Position = vec4(vec2(-1.0, -1.0) + (pos * 2.0) + (v_texCoord * size * 2.0), 0.0, 1.0);

    vec2 borderVec2 = vec2(float(border), float(border));
    v_texCoord *= (textureDim + (borderVec2 * 2.0)) / textureDim;
    v_texCoord -= borderVec2 / textureDim;
}

`);
        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('AtlasLayoutShader.fragmentShader', `

precision highp float;

uniform sampler2D texture;
uniform vec2 textureDim;

/* VS Outputs */
varying vec2 v_texCoord;

void main(void) {
    vec2 pixelCoord = v_texCoord*textureDim;
    vec2 uv = v_texCoord;

    // Wrap X coords
    if(pixelCoord.x < 0.0){
        uv.x = uv.x + 1.0;
    }
    else if(pixelCoord.x > textureDim.x){
        uv.x = uv.x - 1.0;
    }

    // Clamp Y coords
    if(pixelCoord.y < 0.0){
        uv.y = 0.0;
    }
    else if(pixelCoord.y > textureDim.y){
        uv.y = 1.0;
    }

    vec4 texel = texture2D(texture, uv);
    gl_FragColor = vec4(texel.rgb/texel.a, 1);
}

`);
    }
};


import '../SceneTree/Shaders/GLSL/ImageAtlas.js';


class ImageAtlas extends GLTexture2D {
    constructor(gl, name, channels="RGB", format = "FLOAT") {
        super(gl);
        this.__name = name;
        this.__channels = channels;
        this.__format = format;
        this.__subImages = [];
    }

    addSubImage(subImage) {
        this.__subImages.push(subImage);
    }

    getSubImage(index) {
        return this.__subImages[index];
    }

    numSubImages() {
        return this.__subImages.length;
    }

    generateAtlas(gl, screenQuad, destroySubImages=true) {
        let maxRez = [this.__subImages[0].width, this.__subImages[0].height];
        let border = 2;
        let initialWidth = maxRez[0] + (border * 2);
        let initialHeight = (maxRez[1] * 1.5) + (border * 2);
        let levels = this.__subImages.length;
        let tree = new BinTreeNode(new BinTreeRect(
            new Vec2(0, 0), 
            new BinTreeRectBorder(initialWidth, true), 
            new BinTreeRectBorder(initialHeight, true)
            ), true);
        this.__layout = [];

        for (let j = 0; j < this.__subImages.length; j++) {
            let subImage = this.__subImages[j];
            let rectSize = new Vec2(subImage.width, subImage.height);
            rectSize.x += border * 2;
            rectSize.y += border * 2;
            let closestFit = {
                'node': undefined,
                'cost': Number.MAX_VALUE,
                'delta': undefined
            }
            let node = tree.insert(rectSize, closestFit);
            if (node == undefined) {
                if (!closestFit.node)
                    throw ("Error packing env map hierarchy:" + result);
                // we failed to find a space big enought tof our cluster, 
                // but we found a good candidate node bordering a movable border.
                // we move the border(thereby growing the size of the map), and
                // then continue packing
                node = closestFit.node.resizeAndInsert(rectSize, closestFit.delta);
            }
            this.__layout.push({
                pos: new Vec2(node.rect.pos.x + border, node.rect.pos.y + border),
                size: new Vec2(rectSize.x - (border * 2), rectSize.y - (border * 2)),
                rectPos: node.rect.pos,
                rectSize: rectSize
            });
        }

        let width = tree.rect.right.value;
        let height = tree.rect.top.value;
        let scl = new Vec2(1.0 / width, 1.0 / height);

        console.log(" Atlas Texture size:" + width.toFixed() + ", " + height.toFixed());

        this.configure({
            width,
            height,
            channels:this.__channels,
            format:this.__format,
            filter: 'LINEAR'
        });

        let fbo = new GLFbo(gl, this);
        fbo.bind();

        if (!gl.__quadVertexIdsBuffer) 
            gl.setupInstancedQuad();


        if(!gl.__atlasLayoutShader){
            gl.__atlasLayoutShader = new GLShader(gl, new AtlasLayoutShader());
            let shaderComp = gl.__atlasLayoutShader.compileForTarget('ImageAtlas');
            gl.__atlasLayoutShaderBinding = generateShaderGeomBinding(gl, shaderComp.attrs, gl.__quadattrbuffers, gl.__quadIndexBuffer);
        }

        let renderstate = {};
        // screenQuad.bindShader(renderstate);
        gl.__atlasLayoutShader.bind(renderstate, 'ImageAtlas');
        gl.__atlasLayoutShaderBinding.bind(renderstate);

        let unifs = renderstate.unifs;
        for (let j = 0; j < this.__subImages.length; j++) {
            let image = this.__subImages[j];
            let item = this.__layout[j];
            image.bind(renderstate, unifs.texture.location);
            gl.uniform2fv(unifs.pos.location, item.rectPos.multiply(scl).asArray());
            gl.uniform2fv(unifs.size.location, item.rectSize.multiply(scl).asArray());
            gl.uniform2f(unifs.textureDim.location, image.width, image.height);
            // screenQuad.draw(renderstate, image, item.pos.multiply(scl), item.size.multiply(scl));
            gl.drawQuad();

            if(destroySubImages)
                image.destroy();
        }

        fbo.destroy();
    }

    getLayoutFn(){
        let layout = [];
        for (let j = 0; j < this.__subImages.length; j++) {
            layout.push("     if(imageId=="+j+") return vec4("+this.__layout[j].pos.x + ", " + this.__layout[j].pos.y + ", " + this.__layout[j].size.x + ", " + this.__layout[j].size.y+");");
        }
        // Default to the entire atlas.
        layout.push("     return vec4(0,0,"+this.width+", "+this.height+")");
        return layout.join('\n');
    }


    bind(renderstate, location) {
        super.bind(renderstate, location);
        let gl = this.__gl;
        let unifs = renderstate.unifs;
        let atlasSizeUnifName = 'atlasSize_'+this.__name;
        if(atlasSizeUnifName in unifs)
            gl.uniform2f(unifs[atlasSizeUnifName].location, this.width, this.height);
    }

    destory(){
        for (let image of this.__subImages) {
            image.destroy();
        }
        super.destroy();
    }

};

export {
    ImageAtlas
};