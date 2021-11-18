"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[1391],{3905:function(e,t,n){n.d(t,{Zo:function(){return k},kt:function(){return s}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},d=Object.keys(e);for(r=0;r<d.length;r++)n=d[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(e);for(r=0;r<d.length;r++)n=d[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),o=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},k=function(e){var t=o(e.components);return r.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,d=e.originalType,p=e.parentName,k=l(e,["components","mdxType","originalType","parentName"]),m=o(n),s=a,c=m["".concat(p,".").concat(s)]||m[s]||u[s]||d;return n?r.createElement(c,i(i({ref:t},k),{},{components:n})):r.createElement(c,i({ref:t},k))}));function s(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var d=n.length,i=new Array(d);i[0]=m;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var o=2;o<d;o++)i[o]=n[o];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4076:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return p},metadata:function(){return o},toc:function(){return k},default:function(){return m}});var r=n(7462),a=n(3366),d=(n(7294),n(3905)),i=["components"],l={id:"Renderer_GLScreenQuad.GLScreenQuad",title:"Class: GLScreenQuad",sidebar_label:"GLScreenQuad",custom_edit_url:null},p=void 0,o={unversionedId:"API/Renderer/Renderer_GLScreenQuad.GLScreenQuad",id:"API/Renderer/Renderer_GLScreenQuad.GLScreenQuad",isDocsHomePage:!1,title:"Class: GLScreenQuad",description:"Class representing a GL screen quad.",source:"@site/docs/API/Renderer/GLScreenQuad.md",sourceDirName:"API/Renderer",slug:"/API/Renderer/Renderer_GLScreenQuad.GLScreenQuad",permalink:"/zea-engine/API/Renderer/Renderer_GLScreenQuad.GLScreenQuad",editUrl:null,tags:[],version:"current",frontMatter:{id:"Renderer_GLScreenQuad.GLScreenQuad",title:"Class: GLScreenQuad",sidebar_label:"GLScreenQuad",custom_edit_url:null},sidebar:"apiSidebar",previous:{title:"GLRenderer",permalink:"/zea-engine/API/Renderer/Renderer_GLRenderer.GLRenderer"},next:{title:"GLShader",permalink:"/zea-engine/API/Renderer/Renderer_GLShader.GLShader"}},k=[{value:"Constructors",id:"constructors",children:[{value:"constructor",id:"constructor",children:[]}]},{value:"Properties",id:"properties",children:[{value:"__gl",id:"__gl",children:[]},{value:"__glshader",id:"__glshader",children:[]},{value:"__pos",id:"__pos",children:[]},{value:"__quadBinding",id:"__quadbinding",children:[]},{value:"__size",id:"__size",children:[]},{value:"flipY",id:"flipy",children:[]},{value:"ready",id:"ready",children:[]}]},{value:"Methods",id:"methods",children:[{value:"bind",id:"bind",children:[]},{value:"bindShader",id:"bindshader",children:[]},{value:"destroy",id:"destroy",children:[]},{value:"draw",id:"draw",children:[]}]}],u={toc:k};function m(e){var t=e.components,n=(0,a.Z)(e,i);return(0,d.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,d.kt)("p",null,"Class representing a GL screen quad."),(0,d.kt)("h2",{id:"constructors"},"Constructors"),(0,d.kt)("h3",{id:"constructor"},"constructor"),(0,d.kt)("p",null,"\u2022 ",(0,d.kt)("strong",{parentName:"p"},"new GLScreenQuad"),"(",(0,d.kt)("inlineCode",{parentName:"p"},"gl"),", ",(0,d.kt)("inlineCode",{parentName:"p"},"shaderopts"),")"),(0,d.kt)("p",null,"Create a GL screen quad."),(0,d.kt)("h4",{id:"parameters"},"Parameters"),(0,d.kt)("table",null,(0,d.kt)("thead",{parentName:"table"},(0,d.kt)("tr",{parentName:"thead"},(0,d.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,d.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,d.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,d.kt)("tbody",{parentName:"table"},(0,d.kt)("tr",{parentName:"tbody"},(0,d.kt)("td",{parentName:"tr",align:"left"},(0,d.kt)("inlineCode",{parentName:"td"},"gl")),(0,d.kt)("td",{parentName:"tr",align:"left"},(0,d.kt)("inlineCode",{parentName:"td"},"WebGL12RenderingContext")),(0,d.kt)("td",{parentName:"tr",align:"left"},"The webgl rendering context.")),(0,d.kt)("tr",{parentName:"tbody"},(0,d.kt)("td",{parentName:"tr",align:"left"},(0,d.kt)("inlineCode",{parentName:"td"},"shaderopts")),(0,d.kt)("td",{parentName:"tr",align:"left"},(0,d.kt)("inlineCode",{parentName:"td"},"Record"),"<",(0,d.kt)("inlineCode",{parentName:"td"},"string"),", ",(0,d.kt)("inlineCode",{parentName:"td"},"any"),">"),(0,d.kt)("td",{parentName:"tr",align:"left"},"shader options")))),(0,d.kt)("h4",{id:"defined-in"},"Defined in"),(0,d.kt)("p",null,"Renderer/GLScreenQuad.ts:22"),(0,d.kt)("h2",{id:"properties"},"Properties"),(0,d.kt)("h3",{id:"__gl"},"_","_","gl"),(0,d.kt)("p",null,"\u2022 ",(0,d.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,d.kt)("strong",{parentName:"p"},"_","_","gl"),": ",(0,d.kt)("inlineCode",{parentName:"p"},"WebGL12RenderingContext")),(0,d.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,d.kt)("p",null,"Renderer/GLScreenQuad.ts:10"),(0,d.kt)("hr",null),(0,d.kt)("h3",{id:"__glshader"},"_","_","glshader"),(0,d.kt)("p",null,"\u2022 ",(0,d.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,d.kt)("strong",{parentName:"p"},"_","_","glshader"),": ",(0,d.kt)("a",{parentName:"p",href:"Shaders/Renderer_Shaders_ScreenQuadShader.ScreenQuadShader"},(0,d.kt)("inlineCode",{parentName:"a"},"ScreenQuadShader"))),(0,d.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,d.kt)("p",null,"Renderer/GLScreenQuad.ts:14"),(0,d.kt)("hr",null),(0,d.kt)("h3",{id:"__pos"},"_","_","pos"),(0,d.kt)("p",null,"\u2022 ",(0,d.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,d.kt)("strong",{parentName:"p"},"_","_","pos"),": ",(0,d.kt)("inlineCode",{parentName:"p"},"number"),"[]"),(0,d.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,d.kt)("p",null,"Renderer/GLScreenQuad.ts:11"),(0,d.kt)("hr",null),(0,d.kt)("h3",{id:"__quadbinding"},"_","_","quadBinding"),(0,d.kt)("p",null,"\u2022 ",(0,d.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,d.kt)("strong",{parentName:"p"},"_","_","quadBinding"),": ",(0,d.kt)("inlineCode",{parentName:"p"},"any")),(0,d.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,d.kt)("p",null,"Renderer/GLScreenQuad.ts:15"),(0,d.kt)("hr",null),(0,d.kt)("h3",{id:"__size"},"_","_","size"),(0,d.kt)("p",null,"\u2022 ",(0,d.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,d.kt)("strong",{parentName:"p"},"_","_","size"),": ",(0,d.kt)("inlineCode",{parentName:"p"},"number"),"[]"),(0,d.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,d.kt)("p",null,"Renderer/GLScreenQuad.ts:12"),(0,d.kt)("hr",null),(0,d.kt)("h3",{id:"flipy"},"flipY"),(0,d.kt)("p",null,"\u2022 ",(0,d.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,d.kt)("strong",{parentName:"p"},"flipY"),": ",(0,d.kt)("inlineCode",{parentName:"p"},"boolean")),(0,d.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,d.kt)("p",null,"Renderer/GLScreenQuad.ts:13"),(0,d.kt)("hr",null),(0,d.kt)("h3",{id:"ready"},"ready"),(0,d.kt)("p",null,"\u2022 ",(0,d.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,d.kt)("strong",{parentName:"p"},"ready"),": ",(0,d.kt)("inlineCode",{parentName:"p"},"boolean")),(0,d.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,d.kt)("p",null,"Renderer/GLScreenQuad.ts:16"),(0,d.kt)("h2",{id:"methods"},"Methods"),(0,d.kt)("h3",{id:"bind"},"bind"),(0,d.kt)("p",null,"\u25b8 ",(0,d.kt)("strong",{parentName:"p"},"bind"),"(",(0,d.kt)("inlineCode",{parentName:"p"},"renderstate"),", ",(0,d.kt)("inlineCode",{parentName:"p"},"texture?"),", ",(0,d.kt)("inlineCode",{parentName:"p"},"pos?"),", ",(0,d.kt)("inlineCode",{parentName:"p"},"size?"),"): ",(0,d.kt)("inlineCode",{parentName:"p"},"void")),(0,d.kt)("p",null,"The bind method."),(0,d.kt)("h4",{id:"parameters-1"},"Parameters"),(0,d.kt)("table",null,(0,d.kt)("thead",{parentName:"table"},(0,d.kt)("tr",{parentName:"thead"},(0,d.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,d.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,d.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,d.kt)("tbody",{parentName:"table"},(0,d.kt)("tr",{parentName:"tbody"},(0,d.kt)("td",{parentName:"tr",align:"left"},(0,d.kt)("inlineCode",{parentName:"td"},"renderstate")),(0,d.kt)("td",{parentName:"tr",align:"left"},(0,d.kt)("inlineCode",{parentName:"td"},"RenderState")),(0,d.kt)("td",{parentName:"tr",align:"left"},"The object tracking the current state of the renderer")),(0,d.kt)("tr",{parentName:"tbody"},(0,d.kt)("td",{parentName:"tr",align:"left"},(0,d.kt)("inlineCode",{parentName:"td"},"texture?")),(0,d.kt)("td",{parentName:"tr",align:"left"},(0,d.kt)("a",{parentName:"td",href:"Renderer_GLTexture2D.GLTexture2D"},(0,d.kt)("inlineCode",{parentName:"a"},"GLTexture2D"))),(0,d.kt)("td",{parentName:"tr",align:"left"},"The texture param.")),(0,d.kt)("tr",{parentName:"tbody"},(0,d.kt)("td",{parentName:"tr",align:"left"},(0,d.kt)("inlineCode",{parentName:"td"},"pos?")),(0,d.kt)("td",{parentName:"tr",align:"left"},(0,d.kt)("a",{parentName:"td",href:"../Math/Math_Vec2.Vec2"},(0,d.kt)("inlineCode",{parentName:"a"},"Vec2"))),(0,d.kt)("td",{parentName:"tr",align:"left"},"The pos value.")),(0,d.kt)("tr",{parentName:"tbody"},(0,d.kt)("td",{parentName:"tr",align:"left"},(0,d.kt)("inlineCode",{parentName:"td"},"size?")),(0,d.kt)("td",{parentName:"tr",align:"left"},(0,d.kt)("a",{parentName:"td",href:"../Math/Math_Vec2.Vec2"},(0,d.kt)("inlineCode",{parentName:"a"},"Vec2"))),(0,d.kt)("td",{parentName:"tr",align:"left"},"The size value.")))),(0,d.kt)("h4",{id:"returns"},"Returns"),(0,d.kt)("p",null,(0,d.kt)("inlineCode",{parentName:"p"},"void")),(0,d.kt)("h4",{id:"defined-in-8"},"Defined in"),(0,d.kt)("p",null,"Renderer/GLScreenQuad.ts:49"),(0,d.kt)("hr",null),(0,d.kt)("h3",{id:"bindshader"},"bindShader"),(0,d.kt)("p",null,"\u25b8 ",(0,d.kt)("strong",{parentName:"p"},"bindShader"),"(",(0,d.kt)("inlineCode",{parentName:"p"},"renderstate"),"): ",(0,d.kt)("inlineCode",{parentName:"p"},"boolean")),(0,d.kt)("p",null,"The bindShader method."),(0,d.kt)("h4",{id:"parameters-2"},"Parameters"),(0,d.kt)("table",null,(0,d.kt)("thead",{parentName:"table"},(0,d.kt)("tr",{parentName:"thead"},(0,d.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,d.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,d.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,d.kt)("tbody",{parentName:"table"},(0,d.kt)("tr",{parentName:"tbody"},(0,d.kt)("td",{parentName:"tr",align:"left"},(0,d.kt)("inlineCode",{parentName:"td"},"renderstate")),(0,d.kt)("td",{parentName:"tr",align:"left"},(0,d.kt)("inlineCode",{parentName:"td"},"RenderState")),(0,d.kt)("td",{parentName:"tr",align:"left"},"The object tracking the current state of the renderer")))),(0,d.kt)("h4",{id:"returns-1"},"Returns"),(0,d.kt)("p",null,(0,d.kt)("inlineCode",{parentName:"p"},"boolean")),(0,d.kt)("ul",null,(0,d.kt)("li",{parentName:"ul"},"The return value.")),(0,d.kt)("h4",{id:"defined-in-9"},"Defined in"),(0,d.kt)("p",null,"Renderer/GLScreenQuad.ts:84"),(0,d.kt)("hr",null),(0,d.kt)("h3",{id:"destroy"},"destroy"),(0,d.kt)("p",null,"\u25b8 ",(0,d.kt)("strong",{parentName:"p"},"destroy"),"(): ",(0,d.kt)("inlineCode",{parentName:"p"},"void")),(0,d.kt)("p",null,"The destroy is called by the system to cause explicit resources cleanup.\nUsers should never need to call this method directly."),(0,d.kt)("h4",{id:"returns-2"},"Returns"),(0,d.kt)("p",null,(0,d.kt)("inlineCode",{parentName:"p"},"void")),(0,d.kt)("h4",{id:"defined-in-10"},"Defined in"),(0,d.kt)("p",null,"Renderer/GLScreenQuad.ts:105"),(0,d.kt)("hr",null),(0,d.kt)("h3",{id:"draw"},"draw"),(0,d.kt)("p",null,"\u25b8 ",(0,d.kt)("strong",{parentName:"p"},"draw"),"(",(0,d.kt)("inlineCode",{parentName:"p"},"renderstate"),", ",(0,d.kt)("inlineCode",{parentName:"p"},"texture?"),", ",(0,d.kt)("inlineCode",{parentName:"p"},"pos?"),", ",(0,d.kt)("inlineCode",{parentName:"p"},"size?"),"): ",(0,d.kt)("inlineCode",{parentName:"p"},"void")),(0,d.kt)("p",null,"The draw method."),(0,d.kt)("h4",{id:"parameters-3"},"Parameters"),(0,d.kt)("table",null,(0,d.kt)("thead",{parentName:"table"},(0,d.kt)("tr",{parentName:"thead"},(0,d.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,d.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,d.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,d.kt)("tbody",{parentName:"table"},(0,d.kt)("tr",{parentName:"tbody"},(0,d.kt)("td",{parentName:"tr",align:"left"},(0,d.kt)("inlineCode",{parentName:"td"},"renderstate")),(0,d.kt)("td",{parentName:"tr",align:"left"},(0,d.kt)("inlineCode",{parentName:"td"},"RenderState")),(0,d.kt)("td",{parentName:"tr",align:"left"},"The object tracking the current state of the renderer")),(0,d.kt)("tr",{parentName:"tbody"},(0,d.kt)("td",{parentName:"tr",align:"left"},(0,d.kt)("inlineCode",{parentName:"td"},"texture?")),(0,d.kt)("td",{parentName:"tr",align:"left"},(0,d.kt)("a",{parentName:"td",href:"Renderer_GLTexture2D.GLTexture2D"},(0,d.kt)("inlineCode",{parentName:"a"},"GLTexture2D"))),(0,d.kt)("td",{parentName:"tr",align:"left"},"The texture value.")),(0,d.kt)("tr",{parentName:"tbody"},(0,d.kt)("td",{parentName:"tr",align:"left"},(0,d.kt)("inlineCode",{parentName:"td"},"pos?")),(0,d.kt)("td",{parentName:"tr",align:"left"},(0,d.kt)("a",{parentName:"td",href:"../Math/Math_Vec2.Vec2"},(0,d.kt)("inlineCode",{parentName:"a"},"Vec2"))),(0,d.kt)("td",{parentName:"tr",align:"left"},"The pos value.")),(0,d.kt)("tr",{parentName:"tbody"},(0,d.kt)("td",{parentName:"tr",align:"left"},(0,d.kt)("inlineCode",{parentName:"td"},"size?")),(0,d.kt)("td",{parentName:"tr",align:"left"},(0,d.kt)("a",{parentName:"td",href:"../Math/Math_Vec2.Vec2"},(0,d.kt)("inlineCode",{parentName:"a"},"Vec2"))),(0,d.kt)("td",{parentName:"tr",align:"left"},"The size value.")))),(0,d.kt)("h4",{id:"returns-3"},"Returns"),(0,d.kt)("p",null,(0,d.kt)("inlineCode",{parentName:"p"},"void")),(0,d.kt)("h4",{id:"defined-in-11"},"Defined in"),(0,d.kt)("p",null,"Renderer/GLScreenQuad.ts:95"))}m.isMDXComponent=!0}}]);