"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[4528],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return h}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=c(n),h=o,g=d["".concat(l,".").concat(h)]||d[h]||p[h]||a;return n?r.createElement(g,i(i({ref:t},u),{},{components:n})):r.createElement(g,i({ref:t},u))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var c=2;c<a;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6163:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return u},default:function(){return d}});var r=n(7462),o=n(3366),a=(n(7294),n(3905)),i=["components"],s={sidebar_position:4,title:"Setting up the Highlights",hide_table_of_contents:!0},l=void 0,c={unversionedId:"Tutorials/highlights",id:"Tutorials/highlights",isDocsHomePage:!1,title:"Setting up the Highlights",description:"This tutorial covers how to create and use groups to highlight objects.",source:"@site/docs/Tutorials/highlights.md",sourceDirName:"Tutorials",slug:"/Tutorials/highlights",permalink:"/docs/Tutorials/highlights",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4,title:"Setting up the Highlights",hide_table_of_contents:!0},sidebar:"tutorialSidebar",previous:{title:"Loading Asset Files",permalink:"/docs/Tutorials/load-an-asset"},next:{title:"Working With Labels",permalink:"/docs/Tutorials/labels"}},u=[{value:"1) Minimal Setup",id:"1-minimal-setup",children:[]},{value:"2) Create Groups and Add Highlights",id:"2-create-groups-and-add-highlights",children:[]},{value:"Conclusion",id:"conclusion",children:[]}],p={toc:u};function d(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"This tutorial covers how to create and use groups to highlight objects."),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"Try: hover over the various groups in the scene and see the highlights in action.")),(0,a.kt)("iframe",{src:"https://glitch.com/embed/#!/embed/zea-highlight?path=src/main.js&previewSize=100",title:"zea-highlight on Glitch",allow:"geolocation; microphone; camera; midi; vr; encrypted-media",class:"glitch",markdown:"1"}),(0,a.kt)("h2",{id:"1-minimal-setup"},"1) Minimal Setup"),(0,a.kt)("p",null,"First, get set up. You can do this one of two ways, locally or by using glitch."),(0,a.kt)("p",null,"a) ",(0,a.kt)("a",{parentName:"p",href:"/docs/Tutorials/basic-template"},"Basic Setup"),"\nCreate a project locally in your favorite IDE"),(0,a.kt)("p",null,"b) ",(0,a.kt)("a",{parentName:"p",href:"https://glitch.com/edit/#!/zea-minimal-app"},"Basic Setup on Glitch"),"\nfollow the link and click 'remix to edit' at the top right of the screen to modify this project."),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"To learn more about how to set up your environment, view the ",(0,a.kt)("a",{parentName:"p",href:"../Manual/Getting-Started/getting-started-overview"},"Getting Started")," guide.")),(0,a.kt)("h2",{id:"2-create-groups-and-add-highlights"},"2) Create Groups and Add Highlights"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"// Zea Engine dependencies stored in new const variables. View the API to see what you can include and use.\nconst {\n  Scene,\n  GLRenderer,\n  Vec3,\n  Color,\n  Xfo,\n  Group,\n  TreeItem,\n  Material,\n  Sphere,\n  GeomItem,\n  Plane,\n  Cuboid,\n  Cone,\n  Cylinder,\n  Torus\n} = window.zeaEngine\n\nexport function main() {\n  const scene = new Scene()\n  const renderer = new GLRenderer(document.getElementById('canvas'))\n  const camera = renderer.getViewport().getCamera()\n  camera.setPositionAndTarget(new Vec3(25, 25, 13), new Vec3(10, 0, 0))\n\n  renderer.setScene(scene)\n  renderer.resumeDrawing()\n\n  scene.setupGrid(60.0, 6)\n\n  const tree1 = new TreeItem('tree1')\n  scene.getRoot().addChild(tree1)\n\n  const group1 = new Group('group1')\n  group1.getParameter('HighlightColor').setValue(new Color('lemonchiffon'))\n  scene.getRoot().addChild(group1)\n\n  const group2 = new Group('group2')\n  group2.getParameter('HighlightColor').setValue(new Color('mediumblue'))\n  scene.getRoot().addChild(group2)\n\n  const standardMaterial = new Material('surfaces', 'SimpleSurfaceShader')\n  standardMaterial.getParameter('BaseColor').setValue(new Color(89 / 255, 182 / 255, 92 / 255))\n\n  const addGeomItem = (shape, row, count, i) => {\n    const geomItem = new GeomItem('Item' + row + '-' + i, shape, standardMaterial)\n    geomItem.getParameter('LocalXfo').setValue(new Xfo(new Vec3(i * 3, row * 3, 0)))\n    tree1.addChild(geomItem)\n\n    group1.addItem(geomItem)\n    if (i % 2 == 0) group2.addItem(geomItem)\n  }\n  const addMeshShape = (shape, row, count) => {\n    for (let i = 0; i < count; i++) {\n      addGeomItem(shape, row, count, i)\n    }\n  }\n\n  addMeshShape(new Sphere(1.4, 13), 3, 1)\n  addMeshShape(new Sphere(1.4, 13), 2, 3)\n  addMeshShape(new Plane(2.0, 1.5), 1.4, 4)\n  addMeshShape(new Cuboid(1.5, 2.0, 1.0), 0.5, 6)\n  addMeshShape(new Cone(1.2, 4.0), -1, 5)\n  addMeshShape(new Cylinder(1.2, 4.0, 32, 2, true), -2, 8)\n  addMeshShape(new Torus(0.4, 1.3), -3, 4)\n\n  setInterval(function() {\n    tree1.setSelected(!tree1.getSelected())\n  }, 1200)\n  setInterval(function() {\n    const p = group1.getParameter('Highlighted')\n    p.setValue(!p.getValue())\n  }, 1000)\n  setInterval(function() {\n    const p = group2.getParameter('Highlighted')\n    p.setValue(!p.getValue())\n  }, 700)\n}\n")),(0,a.kt)("h2",{id:"conclusion"},"Conclusion"),(0,a.kt)("p",null,"This tutorial shows how to create groups and how to highlight your groups or objects in your scene."))}d.isMDXComponent=!0}}]);