// import {
//     GLPass
// } from '../GLPass.js';
// import {
//     GLShader
// } from '../GLShader.js';
// import {
//     GeomDataShader
// } from '../Shaders/GeomDataShader.js';
// import {
//     GLShaderMaterials,
//     GLMaterialDrawItemSets
// } from '../GLCollector.js';

// class GLGeomDataPass extends GLPass {
//     constructor(gl, collector, flaotGeomBuffer) {
//         super(gl, collector);

//         this.__glshader = new GeomDataShader(gl);
//         this.__floatGeomBuffer = flaotGeomBuffer;
//     }

//     /////////////////////////////////////
//     // Bind to Render Tree
//     filterRenderTree() {
//         let glshaderMaterials = new GLShaderMaterials(this.__glshader);
//         let glmaterialDrawItemSets = new GLMaterialDrawItemSets();
//         glshaderMaterials.addMaterialDrawItemSets(glmaterialDrawItemSets);

//         let srcglshaderMaterials = this.__collector.getGLShaderMaterials();
//         for (let glshaderkey in srcglshaderMaterials) {
//             let srcglmaterialDrawItemSets = srcglshaderMaterials[glshaderkey].getMaterialDrawItemSets();
//             for (let srcglmaterialDrawItemSet of srcglmaterialDrawItemSets) {
//                 let srcdrawItemSets = srcglmaterialDrawItemSet.getDrawItemSets();
//                 for (let drawItemSet of srcdrawItemSets) {
//                     if(drawItemSet.getGLDrawItemCount() > 0 && drawItemSet.getGLDrawItem(0).getGeomItem().getSelectable()) {
//                         glmaterialDrawItemSets.addDrawItemSet(drawItemSet);
//                     }
//                 }
//             }
//         }

//         this.__glshadermaterials = [glshaderMaterials];
//     }

//     bindShader(renderstate, glshader) {
//         return true;
//     }
//     bindMaterial(renderstate, glshader) {
//         return true;
//     }
//     draw(renderstate) {
//         const gl = this.__gl;
//         gl.disable(gl.BLEND);
//         gl.disable(gl.CULL_FACE);
//         gl.enable(gl.DEPTH_TEST);
//         gl.depthFunc(gl.LESS);
//         gl.depthMask(true);

//         this.__glshader.bind(renderstate);
//         this.__collector.bind(renderstate);

//         let unif = renderstate.unifs.floatGeomBuffer;
//         if (unif){
//             gl.uniform1i(unif.location, this.__floatGeomBuffer ? 1 : 0);
//         }

//         super.draw(renderstate);
//     }

// };

// export {
//     GLGeomDataPass
// };
