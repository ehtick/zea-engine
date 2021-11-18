"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[510],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return h}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=c(n),h=r,m=d["".concat(s,".").concat(h)]||d[h]||p[h]||i;return n?a.createElement(m,o(o({ref:t},u),{},{components:n})):a.createElement(m,o({ref:t},u))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var c=2;c<i;c++)o[c]=n[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9384:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return c},toc:function(){return u},default:function(){return d}});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),o=["components"],l={sidebar_position:2,title:"Build Your First Project"},s=void 0,c={unversionedId:"Manual/Getting-Started/build-first-project",id:"Manual/Getting-Started/build-first-project",isDocsHomePage:!1,title:"Build Your First Project",description:"Before we begin, please make sure you're already familiar with Setting up your workspace.",source:"@site/docs/Manual/Getting-Started/build-first-project.md",sourceDirName:"Manual/Getting-Started",slug:"/Manual/Getting-Started/build-first-project",permalink:"/zea-engine/Manual/Getting-Started/build-first-project",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Build Your First Project"},sidebar:"manualSideBar",previous:{title:"Setting up your workspace",permalink:"/zea-engine/Manual/Getting-Started/development-setup"},next:{title:"Debugging",permalink:"/zea-engine/Manual/Getting-Started/debugging"}},u=[{value:"Introduction to npm and unpkg",id:"introduction-to-npm-and-unpkg",children:[]},{value:"Accessing the latest UMD build",id:"accessing-the-latest-umd-build",children:[]},{value:"Basic Setup",id:"basic-setup",children:[]},{value:"Running a local server",id:"running-a-local-server",children:[]},{value:"Remix your own Zea Engine app",id:"remix-your-own-zea-engine-app",children:[]},{value:"Next steps",id:"next-steps",children:[]}],p={toc:u};function d(e){var t=e.components,l=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},p,l,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Before we begin, please make sure you're already familiar with ",(0,i.kt)("a",{parentName:"p",href:"/zea-engine/Manual/Getting-Started/development-setup"},"Setting up your workspace"),".")),(0,i.kt)("p",null,"The Zea Engine enables you to build interactive 3D web apps."),(0,i.kt)("p",null,"In this tutorial, we will learn how to load the Zea Engine in the browser and set up your first scene:"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Try: orbit the camera around the scene.")),(0,i.kt)("iframe",{src:"https://glitch.com/embed/#!/embed/zea-demo-grid?path=index.html&previewSize=100&attributionHidden=true",title:"zea-demo-grid on Glitch",allow:"geolocation; microphone; camera; midi; vr; encrypted-media",class:"glitch",markdown:"1"}),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Hold and drag left-click to orbit, Hold and drag right-click for pan, and mouse scroll for zoom.")),(0,i.kt)("h2",{id:"introduction-to-npm-and-unpkg"},"Introduction to npm and unpkg"),(0,i.kt)("p",null,"Zea Inc. distributes its libraries via ",(0,i.kt)("a",{parentName:"p",href:"https://www.npmjs.com/"},"npm"),", which is the world's largest JavaScript package manager."),(0,i.kt)("p",null,"To list the pages available from Zea Inc. follow this link: ",(0,i.kt)("a",{parentName:"p",href:"https://www.jsdelivr.com/?query=%40zeainc%2F"},"https://www.jsdelivr.com/?query=%40zeainc%2F")),(0,i.kt)("p",null,"Libraries hosted on npm can be accessed using various techniques. Among the easiest ones is to use tools like ",(0,i.kt)("a",{parentName:"p",href:"https://unpkg.com/"},"unpkg"),", which generates URLs for each file in each package on npm, making it possible to load into the browser directly without needing to download the entire package."),(0,i.kt)("p",null,"\u2139\ufe0f For example, this is the unpkg URL for the Zea Engine: ",(0,i.kt)("a",{parentName:"p",href:"https://unpkg.com/@zeainc/zea-engine"},"https://unpkg.com/@zeainc/zea-engine")),(0,i.kt)("p",null,"If you open that URL in your browser, you will see that it displays the compiled engine's file contents. You may also notice that the URL redirects to the full path and the latest version, and in that version, the UMD build of the engine."),(0,i.kt)("h2",{id:"accessing-the-latest-umd-build"},"Accessing the latest UMD build"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/umdjs/umd"},"UMD")," is a technique for distributing JavaScript packages which are capable of working everywhere, be it in the client, on the server, or elsewhere."),(0,i.kt)("p",null,"Within ",(0,i.kt)("a",{parentName:"p",href:"https://unpkg.com/@zeainc/zea-engine/dist/"},"the Zea Engine's dist folder"),", there are several build files: CommonJS, ESM, and UMD. If you're not sure about which one to use, go for the UMD build, due to it's flexibility."),(0,i.kt)("p",null,"In this tutorial, we will start by loading the Zea Engine directly off unpkg as a UMD module."),(0,i.kt)("p",null,"To load this file, you can specify the path within the package: ",(0,i.kt)("a",{parentName:"p",href:"https://unpkg.com/@zeainc/zea-engine/dist/index.umd.js"},"https://unpkg.com/@zeainc/zea-engine/dist/index.umd.js")),(0,i.kt)("p",null,"\u2139\ufe0f Note: we omitted the version number, which means we default to the latest version. Initially, that is fine, but eventually you will need to lock the packages to a specific version, in that way you will have full control over which version you wish to load."),(0,i.kt)("h2",{id:"basic-setup"},"Basic Setup"),(0,i.kt)("p",null,"First, let's create a basic file structure for our demo project by running these commands in your terminal:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"mkdir zea-engine-demo\ncd zea-engine-demo\ntouch index.html index.js\n")),(0,i.kt)("p",null,"You should end up with something like this:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"zea-engine-demo\n\u251c\u2500\u2500 index.html\n\u2514\u2500\u2500 index.js\n")),(0,i.kt)("p",null,"Now, let's add some content to them (feel free to copy/paste):"),(0,i.kt)("p",null,"\ud83d\udcc4 ",(0,i.kt)("strong",{parentName:"p"},"index.html")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-html"},'<!DOCTYPE html>\n<html>\n  \x3c!-- download Zea Engine -- this downloads the latest build from version 3 of the engine --\x3e\n  <script src="https://cdn.jsdelivr.net/npm/@zeainc/zea-engine@3/dist/index.umd.js"><\/script>\n  \x3c!-- download our stylesheet --\x3e\n  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.9/tailwind.min.css" />\n\n  <head>\n    <title>Zea Engine App</title>\n  </head>\n\n  <body class="overflow-hidden">\n    <div class="layout grid h-screen">\n      <main>\n        \x3c!-- HTML Canvas -- what we render to --\x3e\n        <canvas id="canvas"></canvas>\n      </main>\n    </div>\n\n    \x3c!-- Run your code here --\x3e\n    <script type="module">\n      import { main } from \'./index.js\'\n      main() // modify this function in main.js\n    <\/script>\n  </body>\n</html>\n')),(0,i.kt)("p",null,"\ud83d\udcc4 ",(0,i.kt)("strong",{parentName:"p"},"index.js")),(0,i.kt)("p",null,"Since the Zea Engine is being loaded using ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/umdjs/umd"},"UMD"),", it will add the ",(0,i.kt)("inlineCode",{parentName:"p"},"zeaEngine")," object to the global scope, which is accessible through ",(0,i.kt)("inlineCode",{parentName:"p"},"window.zeaEngine")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"globalThis.zeaEngine")," (",(0,i.kt)("a",{parentName:"p",href:"https://caniuse.com/mdn-javascript_builtins_globalthis"},"check globalThis support here"),")."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"// Zea Engine dependencies stored in new const variables. View the API to see what you can include and use.\nconst { Scene, GLRenderer, Vec3, Color, Xfo, Quat, GeomItem, Sphere, Material, Ray, MathFunctions } = window.zeaEngine\n\nexport function main() {\n  // create a new scene\n  const scene = new Scene()\n\n  // create a new renderer and attach it to our HTML Canvas\n  const renderer = new GLRenderer(document.getElementById('canvas'))\n\n  // attach the scene to the renderer. Anything attached to this scene will now be rendererd.\n  renderer.setScene(scene)\n\n  // get the camera from renderer\n  const camera = renderer.getViewport().getCamera()\n  // set camera's target and position.\n  camera.setPositionAndTarget(new Vec3(6, 6, 5), new Vec3(0, 0, 1.5))\n\n  // create a grid\n  scene.setupGrid(10, 10)\n}\n")),(0,i.kt)("h2",{id:"running-a-local-server"},"Running a local server"),(0,i.kt)("p",null,"The index.html file can not be loaded without a local server, since the index.js file would be blocked by ",(0,i.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"},"the CORS policy"),". To be able to load our page in the browser, we will use ",(0,i.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/es-dev-server"},"es-dev-server"),", a web server for development without bundling."),(0,i.kt)("p",null,"Run this command in your terminal:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"npx es-dev-server\n")),(0,i.kt)("p",null,"You should get an output like this:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"es-dev-server started on http://localhost:8000\n  Serving files from '/Users/me/zea-engine-demo'.\n  Using auto compatibility mode, transforming code on older browsers based on user agent.\n")),(0,i.kt)("p",null,"\ud83d\udcf7 Loading the given URL in your browser should generate the following result:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"getting-started-grid",src:n(1497).Z,title:":class=screenshot"})),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Alternatively, if you are using ",(0,i.kt)("a",{parentName:"p",href:"https://code.visualstudio.com/"},"Visual Studio Code"),", it's recommended you download the extension ",(0,i.kt)("a",{parentName:"p",href:"https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer"},"Live Server"),". Live Server makes it easy to launch a local development server that reloads automatically as changes are made to your source code.")),(0,i.kt)("h2",{id:"remix-your-own-zea-engine-app"},"Remix your own Zea Engine app"),(0,i.kt)("p",null,"Using what we just learned, you can now remix your own Zea Engine apps. Try, for example, changing the number of divisions within the grid:"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://glitch.com/edit/#!/zea-demo-grid"},"https://glitch.com/edit/#!/zea-demo-grid")),(0,i.kt)("h2",{id:"next-steps"},"Next steps"),(0,i.kt)("p",null,"Learn how to debug your app with Chrome DevTools"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},(0,i.kt)("a",{parentName:"p",href:"/zea-engine/Manual/Getting-Started/debugging"},"Debbugging Zea Engine"))))}d.isMDXComponent=!0},1497:function(e,t,n){t.Z=n.p+"assets/images/getting-started-grid-7345b271f5358cd162b822618fb99106.png"}}]);