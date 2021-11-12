"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[2442],{3905:function(e,t,n){n.d(t,{Zo:function(){return k},kt:function(){return m}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),o=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},k=function(e){var t=o(e.components);return r.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},h=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,k=d(e,["components","mdxType","originalType","parentName"]),h=o(n),m=a,s=h["".concat(p,".").concat(m)]||h[m]||u[m]||i;return n?r.createElement(s,l(l({ref:t},k),{},{components:n})):r.createElement(s,l({ref:t},k))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,l=new Array(i);l[0]=h;var d={};for(var p in t)hasOwnProperty.call(t,p)&&(d[p]=t[p]);d.originalType=e,d.mdxType="string"==typeof e?e:a,l[1]=d;for(var o=2;o<i;o++)l[o]=n[o];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}h.displayName="MDXCreateElement"},826:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return d},contentTitle:function(){return p},metadata:function(){return o},toc:function(){return k},default:function(){return h}});var r=n(7462),a=n(3366),i=(n(7294),n(3905)),l=["components"],d={id:"Renderer_GLFbo.GLFbo",title:"Class: GLFbo",sidebar_label:"GLFbo",custom_edit_url:null},p=void 0,o={unversionedId:"API/Renderer/Renderer_GLFbo.GLFbo",id:"API/Renderer/Renderer_GLFbo.GLFbo",isDocsHomePage:!1,title:"Class: GLFbo",description:"This class abstracts the rendering of a collection of geometries to screen.",source:"@site/docs/API/Renderer/GLFbo.md",sourceDirName:"API/Renderer",slug:"/API/Renderer/Renderer_GLFbo.GLFbo",permalink:"/zea-engine/API/Renderer/Renderer_GLFbo.GLFbo",editUrl:null,tags:[],version:"current",frontMatter:{id:"Renderer_GLFbo.GLFbo",title:"Class: GLFbo",sidebar_label:"GLFbo",custom_edit_url:null},sidebar:"apiSidebar",previous:{title:"GLEnvMap",permalink:"/zea-engine/API/Renderer/Renderer_GLEnvMap.GLEnvMap"},next:{title:"GLHDRImage",permalink:"/zea-engine/API/Renderer/Renderer_GLHDRImage.GLHDRImage"}},k=[{value:"Constructors",id:"constructors",children:[{value:"constructor",id:"constructor",children:[]}]},{value:"Properties",id:"properties",children:[{value:"__clearColor",id:"__clearcolor",children:[]},{value:"__colorTexture",id:"__colortexture",children:[]},{value:"__createDepthTexture",id:"__createdepthtexture",children:[]},{value:"__depthTexture",id:"__depthtexture",children:[]},{value:"__fbo",id:"__fbo",children:[]},{value:"__gl",id:"__gl",children:[]},{value:"__prevBoundFbo",id:"__prevboundfbo",children:[]},{value:"colorTextureResizeEventId",id:"colortextureresizeeventid",children:[]}]},{value:"Accessors",id:"accessors",children:[{value:"colorTexture",id:"colortexture",children:[]},{value:"depthTextureGL",id:"depthtexturegl",children:[]},{value:"height",id:"height",children:[]},{value:"size",id:"size",children:[]},{value:"width",id:"width",children:[]}]},{value:"Methods",id:"methods",children:[{value:"__checkFramebuffer",id:"__checkframebuffer",children:[]},{value:"bind",id:"bind",children:[]},{value:"bindAndClear",id:"bindandclear",children:[]},{value:"bindForReading",id:"bindforreading",children:[]},{value:"bindForWriting",id:"bindforwriting",children:[]},{value:"clear",id:"clear",children:[]},{value:"destroy",id:"destroy",children:[]},{value:"getColorTexture",id:"getcolortexture",children:[]},{value:"getDepthTextureGL",id:"getdepthtexturegl",children:[]},{value:"getHeight",id:"getheight",children:[]},{value:"getSize",id:"getsize",children:[]},{value:"getWidth",id:"getwidth",children:[]},{value:"resize",id:"resize",children:[]},{value:"setClearColor",id:"setclearcolor",children:[]},{value:"setColorTexture",id:"setcolortexture",children:[]},{value:"setup",id:"setup",children:[]},{value:"textureResized",id:"textureresized",children:[]},{value:"unbind",id:"unbind",children:[]},{value:"unbindForReading",id:"unbindforreading",children:[]},{value:"unbindForWriting",id:"unbindforwriting",children:[]}]}],u={toc:k};function h(e){var t=e.components,n=(0,a.Z)(e,l);return(0,i.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"This class abstracts the rendering of a collection of geometries to screen."),(0,i.kt)("h2",{id:"constructors"},"Constructors"),(0,i.kt)("h3",{id:"constructor"},"constructor"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"new GLFbo"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"gl"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"colorTexture"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"createDepthTexture?"),")"),(0,i.kt)("p",null,"Creates a GL Framebuffer Object"),(0,i.kt)("h4",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Default value"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"gl")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"WebGL12RenderingContext")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"undefined")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The Canvas 3D Context.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"colorTexture")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Renderer_GLTexture2D.GLTexture2D"},(0,i.kt)("inlineCode",{parentName:"a"},"GLTexture2D"))),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"undefined")),(0,i.kt)("td",{parentName:"tr",align:"left"},"Represents 2D Texture in GL.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"createDepthTexture")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"boolean")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"false")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The createDepthTexture value.")))),(0,i.kt)("h4",{id:"defined-in"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L27"},"Renderer/GLFbo.ts:27")),(0,i.kt)("h2",{id:"properties"},"Properties"),(0,i.kt)("h3",{id:"__clearcolor"},"_","_","clearColor"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,i.kt)("strong",{parentName:"p"},"_","_","clearColor"),": ",(0,i.kt)("a",{parentName:"p",href:"../Math/Math_Color.Color"},(0,i.kt)("inlineCode",{parentName:"a"},"Color"))),(0,i.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L15"},"Renderer/GLFbo.ts:15")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"__colortexture"},"_","_","colorTexture"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,i.kt)("strong",{parentName:"p"},"_","_","colorTexture"),": ",(0,i.kt)("a",{parentName:"p",href:"Renderer_GLTexture2D.GLTexture2D"},(0,i.kt)("inlineCode",{parentName:"a"},"GLTexture2D"))),(0,i.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L13"},"Renderer/GLFbo.ts:13")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"__createdepthtexture"},"_","_","createDepthTexture"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,i.kt)("strong",{parentName:"p"},"_","_","createDepthTexture"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L14"},"Renderer/GLFbo.ts:14")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"__depthtexture"},"_","_","depthTexture"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,i.kt)("strong",{parentName:"p"},"_","_","depthTexture"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"WebGLTexture")," = ",(0,i.kt)("inlineCode",{parentName:"p"},"null")),(0,i.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L16"},"Renderer/GLFbo.ts:16")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"__fbo"},"_","_","fbo"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,i.kt)("strong",{parentName:"p"},"_","_","fbo"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"WebGLFramebuffer")," = ",(0,i.kt)("inlineCode",{parentName:"p"},"null")),(0,i.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L17"},"Renderer/GLFbo.ts:17")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"__gl"},"_","_","gl"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,i.kt)("strong",{parentName:"p"},"_","_","gl"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"WebGL12RenderingContext")),(0,i.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L12"},"Renderer/GLFbo.ts:12")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"__prevboundfbo"},"_","_","prevBoundFbo"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,i.kt)("strong",{parentName:"p"},"_","_","prevBoundFbo"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"WebGLFramebuffer")," = ",(0,i.kt)("inlineCode",{parentName:"p"},"null")),(0,i.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L18"},"Renderer/GLFbo.ts:18")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"colortextureresizeeventid"},"colorTextureResizeEventId"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,i.kt)("strong",{parentName:"p"},"colorTextureResizeEventId"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")," = ",(0,i.kt)("inlineCode",{parentName:"p"},"-1")),(0,i.kt)("h4",{id:"defined-in-8"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L11"},"Renderer/GLFbo.ts:11")),(0,i.kt)("h2",{id:"accessors"},"Accessors"),(0,i.kt)("h3",{id:"colortexture"},"colorTexture"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"get")," ",(0,i.kt)("strong",{parentName:"p"},"colorTexture"),"(): ",(0,i.kt)("a",{parentName:"p",href:"Renderer_GLTexture2D.GLTexture2D"},(0,i.kt)("inlineCode",{parentName:"a"},"GLTexture2D"))),(0,i.kt)("p",null,"Returns the ColorTexture of the Fbo"),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"Renderer_GLTexture2D.GLTexture2D"},(0,i.kt)("inlineCode",{parentName:"a"},"GLTexture2D"))),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"returns this.__colorTexture")),(0,i.kt)("h4",{id:"defined-in-9"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L148"},"Renderer/GLFbo.ts:148")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"depthtexturegl"},"depthTextureGL"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"get")," ",(0,i.kt)("strong",{parentName:"p"},"depthTextureGL"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"WebGLTexture")),(0,i.kt)("p",null,"Returns the value of the depthTexture property."),(0,i.kt)("h4",{id:"returns-1"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"WebGLTexture")),(0,i.kt)("h4",{id:"defined-in-10"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L168"},"Renderer/GLFbo.ts:168")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"height"},"height"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"get")," ",(0,i.kt)("strong",{parentName:"p"},"height"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("p",null,"Returns the ",(0,i.kt)("inlineCode",{parentName:"p"},"height")," of the GL Texture"),(0,i.kt)("h4",{id:"returns-2"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"height of GLTexture")),(0,i.kt)("h4",{id:"defined-in-11"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L130"},"Renderer/GLFbo.ts:130")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"size"},"size"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"get")," ",(0,i.kt)("strong",{parentName:"p"},"size"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"number"),"[]"),(0,i.kt)("p",null,"Returns the ","[width, height]"," of the GL Texture."),(0,i.kt)("h4",{id:"returns-3"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"number"),"[]"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"returns ","[width, height]"," of the __colorTexture")),(0,i.kt)("h4",{id:"defined-in-12"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L139"},"Renderer/GLFbo.ts:139")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"width"},"width"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"get")," ",(0,i.kt)("strong",{parentName:"p"},"width"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("p",null,"Returns the ",(0,i.kt)("inlineCode",{parentName:"p"},"width")," of the GL Texture"),(0,i.kt)("h4",{id:"returns-4"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"width of GLTexture")),(0,i.kt)("h4",{id:"defined-in-13"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L121"},"Renderer/GLFbo.ts:121")),(0,i.kt)("h2",{id:"methods"},"Methods"),(0,i.kt)("h3",{id:"__checkframebuffer"},"_","_","checkFramebuffer"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("inlineCode",{parentName:"p"},"Private")," ",(0,i.kt)("strong",{parentName:"p"},"__checkFramebuffer"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"The __checkFramebuffer method."),(0,i.kt)("h4",{id:"returns-5"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-14"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L329"},"Renderer/GLFbo.ts:329")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"bind"},"bind"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"bind"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"renderstate?"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Binds the Fbo to the canvas context, meaning that all WRITE operations will affect the current Fbo."),(0,i.kt)("h4",{id:"parameters-1"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"renderstate?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"RenderState")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The renderstate value.")))),(0,i.kt)("h4",{id:"returns-6"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-15"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L401"},"Renderer/GLFbo.ts:401")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"bindandclear"},"bindAndClear"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"bindAndClear"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"renderstate?"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Runs ",(0,i.kt)("a",{parentName:"p",href:"#bind"},(0,i.kt)("inlineCode",{parentName:"a"},"bind"))," then ",(0,i.kt)("a",{parentName:"p",href:"#clear"},(0,i.kt)("inlineCode",{parentName:"a"},"clear"))," methods."),(0,i.kt)("h4",{id:"parameters-2"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"renderstate?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"RenderState")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The renderstate value.")))),(0,i.kt)("h4",{id:"returns-7"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-16"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L461"},"Renderer/GLFbo.ts:461")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"bindforreading"},"bindForReading"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"bindForReading"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"renderstate?"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Binds the Fbo to the canvas context, meaning that all READ operations will affect the current Fbo."),(0,i.kt)("h4",{id:"parameters-3"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"renderstate?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"RenderState")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The renderstate value.")))),(0,i.kt)("h4",{id:"returns-8"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-17"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L424"},"Renderer/GLFbo.ts:424")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"bindforwriting"},"bindForWriting"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"bindForWriting"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"renderstate?"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Binds the Fbo to the canvas context, meaning that all WRITE operations will affect the current Fbo."),(0,i.kt)("h4",{id:"parameters-4"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"renderstate?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"RenderState")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The renderstate value.")))),(0,i.kt)("h4",{id:"returns-9"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-18"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L373"},"Renderer/GLFbo.ts:373")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"clear"},"clear"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"clear"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Enables all color components of the rendering context of the Fbo,\nspecifying the default color values when clearing color buffers and clears the buffers to preset values."),(0,i.kt)("h4",{id:"returns-10"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-19"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L445"},"Renderer/GLFbo.ts:445")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"destroy"},"destroy"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"destroy"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"The destroy is called by the system to cause explicit resources cleanup.\nUsers should never need to call this method directly."),(0,i.kt)("h4",{id:"returns-11"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-20"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L470"},"Renderer/GLFbo.ts:470")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"getcolortexture"},"getColorTexture"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"getColorTexture"),"(): ",(0,i.kt)("a",{parentName:"p",href:"Renderer_GLTexture2D.GLTexture2D"},(0,i.kt)("inlineCode",{parentName:"a"},"GLTexture2D"))),(0,i.kt)("p",null,"Returns the ColorTexture of the Fbo"),(0,i.kt)("h4",{id:"returns-12"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"Renderer_GLTexture2D.GLTexture2D"},(0,i.kt)("inlineCode",{parentName:"a"},"GLTexture2D"))),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The return value.")),(0,i.kt)("h4",{id:"defined-in-21"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L103"},"Renderer/GLFbo.ts:103")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"getdepthtexturegl"},"getDepthTextureGL"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"getDepthTextureGL"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"WebGLTexture")),(0,i.kt)("p",null,"Returns the value of the deptTexture property."),(0,i.kt)("h4",{id:"returns-13"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"WebGLTexture")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The return value.")),(0,i.kt)("h4",{id:"defined-in-22"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L112"},"Renderer/GLFbo.ts:112")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"getheight"},"getHeight"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"getHeight"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("p",null,"Returns the ",(0,i.kt)("inlineCode",{parentName:"p"},"height")," of the GL Texture"),(0,i.kt)("h4",{id:"returns-14"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The return value.")),(0,i.kt)("h4",{id:"defined-in-23"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L85"},"Renderer/GLFbo.ts:85")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"getsize"},"getSize"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"getSize"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"number"),"[]"),(0,i.kt)("p",null,"Returns the ",(0,i.kt)("inlineCode",{parentName:"p"},"width"),"(Index 0) and the ",(0,i.kt)("inlineCode",{parentName:"p"},"height"),"(Index 1) of the GL Texture."),(0,i.kt)("h4",{id:"returns-15"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"number"),"[]"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The return value.")),(0,i.kt)("h4",{id:"defined-in-24"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L94"},"Renderer/GLFbo.ts:94")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"getwidth"},"getWidth"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"getWidth"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("p",null,"Returns the ",(0,i.kt)("inlineCode",{parentName:"p"},"width")," of the GL Texture"),(0,i.kt)("h4",{id:"returns-16"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The return value.")),(0,i.kt)("h4",{id:"defined-in-25"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L76"},"Renderer/GLFbo.ts:76")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"resize"},"resize"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"resize"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"width"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"height"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"resizeTexture"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Triggered Automatically when the texture resizes."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"todo:"))," Fbos should manage the textures assigned to them.\nE.g. resizing and preserving data."),(0,i.kt)("h4",{id:"parameters-5"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"width")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"number"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"height")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"number"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"resizeTexture")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"any"))))),(0,i.kt)("h4",{id:"returns-17"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-26"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L278"},"Renderer/GLFbo.ts:278")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"setclearcolor"},"setClearColor"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"setClearColor"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"clearColor"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Sets FBO clear color using RGBA array structure."),(0,i.kt)("h4",{id:"parameters-6"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"clearColor")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"../Math/Math_Color.Color"},(0,i.kt)("inlineCode",{parentName:"a"},"Color"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The clearColor value.")))),(0,i.kt)("h4",{id:"returns-18"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-27"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L67"},"Renderer/GLFbo.ts:67")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"setcolortexture"},"setColorTexture"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"setColorTexture"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"colorTexture"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Sets ColorTexture of the Fbo."),(0,i.kt)("h4",{id:"parameters-7"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"colorTexture")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Renderer_GLTexture2D.GLTexture2D"},(0,i.kt)("inlineCode",{parentName:"a"},"GLTexture2D"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The colorTexture value.")))),(0,i.kt)("h4",{id:"returns-19"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-28"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L157"},"Renderer/GLFbo.ts:157")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"setup"},"setup"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"setup"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"The setup method."),(0,i.kt)("h4",{id:"returns-20"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-29"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L175"},"Renderer/GLFbo.ts:175")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"textureresized"},"textureResized"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("inlineCode",{parentName:"p"},"Private")," ",(0,i.kt)("strong",{parentName:"p"},"textureResized"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"event"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"parameters-8"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"event")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"../Utilities/Utilities_BaseEvent.BaseEvent"},(0,i.kt)("inlineCode",{parentName:"a"},"BaseEvent"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The event object providing the event details")))),(0,i.kt)("h4",{id:"returns-21"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-30"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L58"},"Renderer/GLFbo.ts:58")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"unbind"},"unbind"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"unbind"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"renderstate?"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Unbinds the Fbo to the canvas context for WRITE operations."),(0,i.kt)("h4",{id:"parameters-9"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"renderstate?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"RenderState")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The renderstate value.")))),(0,i.kt)("h4",{id:"returns-22"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-31"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L410"},"Renderer/GLFbo.ts:410")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"unbindforreading"},"unbindForReading"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"unbindForReading"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Unbinds the Fbo to the canvas context for READ operations."),(0,i.kt)("h4",{id:"returns-23"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-32"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L435"},"Renderer/GLFbo.ts:435")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"unbindforwriting"},"unbindForWriting"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"unbindForWriting"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"renderstate"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Unbinds the Fbo to the canvas context for WRITE operations."),(0,i.kt)("h4",{id:"parameters-10"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"renderstate")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"RenderState")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The renderstate value.")))),(0,i.kt)("h4",{id:"returns-24"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-33"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Renderer/GLFbo.ts#L389"},"Renderer/GLFbo.ts:389")))}h.isMDXComponent=!0}}]);