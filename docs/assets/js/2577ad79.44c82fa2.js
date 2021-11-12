"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[3396],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return p}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=a.createContext({}),s=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=s(e.components);return a.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},b=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,c=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),b=s(n),p=r,m=b["".concat(c,".").concat(p)]||b[p]||u[p]||l;return n?a.createElement(m,o(o({ref:t},d),{},{components:n})):a.createElement(m,o({ref:t},d))}));function p(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,o=new Array(l);o[0]=b;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:r,o[1]=i;for(var s=2;s<l;s++)o[s]=n[s];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}b.displayName="MDXCreateElement"},2274:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return c},metadata:function(){return s},toc:function(){return d},default:function(){return b}});var a=n(7462),r=n(3366),l=(n(7294),n(3905)),o=["components"],i={sidebar_position:6,title:"Working With Labels",hide_table_of_contents:!0},c=void 0,s={unversionedId:"Tutorials/labels",id:"Tutorials/labels",isDocsHomePage:!1,title:"Working With Labels",description:"To add a label to your scene, you first create the label, then add it to a billboard item, which is then rendered in the billboard pass.",source:"@site/docs/Tutorials/labels.md",sourceDirName:"Tutorials",slug:"/Tutorials/labels",permalink:"/docs/Tutorials/labels",tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6,title:"Working With Labels",hide_table_of_contents:!0},sidebar:"tutorialSidebar",previous:{title:"Setting up the Highlights",permalink:"/docs/Tutorials/highlights"},next:{title:"How to customize the Camera Manipulation",permalink:"/docs/Tutorials/custom-camera-manipulator"}},d=[{value:"Adding Labels to Your Scene",id:"adding-labels-to-your-scene",children:[]},{value:"Working With Multilingual Labels",id:"working-with-multilingual-labels",children:[{value:"Loading a label pack.",id:"loading-a-label-pack",children:[]}]}],u={toc:d};function b(e){var t=e.components,n=(0,r.Z)(e,o);return(0,l.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"To add a label to your scene, you first create the ",(0,l.kt)("a",{parentName:"p",href:"../API/SceneTree/Images/SceneTree_Images_Label.Label"},"label"),", then add it to a ",(0,l.kt)("a",{parentName:"p",href:"../API/SceneTree/SceneTree_BillboardItem.BillboardItem"},"billboard item"),", which is then rendered in the billboard pass.\nAll of the billboard items you create, must be a part of the scene tree or hierarchy to be rendererd. You can add your billboard items to an\nempty ",(0,l.kt)("a",{parentName:"p",href:"../API/SceneTree/SceneTree_TreeItem.TreeItem"},"tree item")," so that it can rendered."),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("a",{parentName:"li",href:"#adding-labels-to-your-scene"},"Adding Labels to Your Scene")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("a",{parentName:"li",href:"#working-with-multilingual-labels"},"Working With Multilingual Labels"))),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"Below is an example of what you can do with labels")),(0,l.kt)("iframe",{src:"https://glitch.com/embed/#!/embed/zea-labels?path=src/main.js&previewSize=100",title:"zea-labels on Glitch",allow:"geolocation; microphone; camera; midi; vr; encrypted-media",class:"glitch",markdown:"1"}),(0,l.kt)("h2",{id:"adding-labels-to-your-scene"},"Adding Labels to Your Scene"),(0,l.kt)("p",null,"Add labels to your scene using the billboard renderer."),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"Add this code to your project. Use the ",(0,l.kt)("a",{parentName:"p",href:"/docs/Tutorials/basic-template"},"Basic Setup Template")," to get started quickly.")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-javascript"},"// Zea Engine dependencies stored in new const variables. View the API to see what you can include and use.\nconst { Scene, GLRenderer, Vec3, Color, Xfo, Label, BillboardItem, TreeItem } = window.zeaEngine\n\nfunction createLabel(color, labelText) {\n  const label = new Label(labelText)\n  label.getParameter('FontSize').setValue(48)\n  label.getParameter('FontColor').setValue(color)\n  label.getParameter('BackgroundColor').setValue(new Color(0.3, 0.3, 0.3)\n  return label\n}\n\nfunction createBillboard(label, pos) {\n  const billboard = new BillboardItem('billboard', label)\n  const xfo = new Xfo(pos)\n  billboard.getParameter('LocalXfo').setValue(xfo)\n  billboard.getParameter('PixelsPerMeter').setValue(300)\n  billboard.getParameter('AlignedToCamera').setValue(true)\n  billboard.getParameter('Alpha').setValue(1)\n  return billboard\n}\n\nexport function main() {\n  const renderer = new GLRenderer(document.getElementById('canvas'))\n  const camera = renderer.getViewport().getCamera()\n  camera.setPositionAndTarget(new Vec3(5, 6, 3), new Vec3(0, 0, 0))\n\n  const scene = new Scene()\n  scene.setupGrid(20, 10)\n  renderer.setScene(scene)\n\n  // create an empty TreeItem can be added to the scene tree to then add billboards to.\n  const asset = new TreeItem('labels')\n  scene.getRoot().addChild(asset)\n\n  const label0 = createLabel(new Color(0, 1, 0), 'Hello')\n  const billboard0 = createBillboard(label0, new Vec3(1, 1, 1))\n  asset.addChild(billboard0)\n\n  const label1 = createLabel(new Color(1, 1, 0), 'Long')\n  const billboard1 = createBillboard(label1, new Vec3(-1, -1, 1))\n  asset.addChild(billboard1)\n\n  const label2 = createLabel(new Color(1, 1, 0), 'MyCustomLabel')\n  const billboard2 = createBillboard(label2, new Vec3(0, 0.05, 0.08))\n  asset.addChild(billboard2)\n\n  renderer.resumeDrawing()\n}\n")),(0,l.kt)("h2",{id:"working-with-multilingual-labels"},"Working With Multilingual Labels"),(0,l.kt)("h3",{id:"loading-a-label-pack"},"Loading a label pack."),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"See the live example")),(0,l.kt)("iframe",{src:"https://glitch.com/embed/#!/embed/zea-multilingual-labels?path=src/main.js&previewSize=100",title:"zea-multilingual-labels on Glitch",allow:"geolocation; microphone; camera; midi; vr; encrypted-media",class:"glitch",markdown:"1"}),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-javascript"},"fetch('https://cdn.glitch.com/be58caa6-3757-4c0c-a11c-b4eaa9f5d339%2FLabelPack.labels?v=1599494954724')\n  .then(response => response.json())\n  .then(data => {\n    labelManager.loadLibrary('LabelPack', data)\n    addLabel(new Vec3(0, 0, 0), new Vec3(0, 0.05, 0.08), new Color(1, 1, 0), 'MyCustomLabel')\n  })\n")))}b.isMDXComponent=!0}}]);