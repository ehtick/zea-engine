import {
  Scene,
  GLRenderer
} from "https://unpkg.com/@zeainc/zea-engine/dist/index.esm.js"

const domElement = document.getElementById("app");

const scene = new Scene();
scene.setupGrid(10.0, 10);

const renderer = new GLRenderer(domElement);
renderer.setScene(scene);
renderer.resumeDrawing();