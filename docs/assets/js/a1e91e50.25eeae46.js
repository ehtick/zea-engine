"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[8767],{3905:function(e,t,a){a.d(t,{Zo:function(){return s},kt:function(){return h}});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function d(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var m=n.createContext({}),p=function(e){var t=n.useContext(m),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},s=function(e){var t=p(e.components);return n.createElement(m.Provider,{value:t},e.children)},o={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},k=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,m=e.parentName,s=d(e,["components","mdxType","originalType","parentName"]),k=p(a),h=r,N=k["".concat(m,".").concat(h)]||k[h]||o[h]||i;return a?n.createElement(N,l(l({ref:t},s),{},{components:a})):n.createElement(N,l({ref:t},s))}));function h(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,l=new Array(i);l[0]=k;var d={};for(var m in t)hasOwnProperty.call(t,m)&&(d[m]=t[m]);d.originalType=e,d.mdxType="string"==typeof e?e:r,l[1]=d;for(var p=2;p<i;p++)l[p]=a[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}k.displayName="MDXCreateElement"},6764:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return d},contentTitle:function(){return m},metadata:function(){return p},toc:function(){return s},default:function(){return k}});var n=a(7462),r=a(3366),i=(a(7294),a(3905)),l=["components"],d={id:"Renderer_Drawing_GLShaderMaterials.GLShaderMaterials",title:"Class: GLShaderMaterials",sidebar_label:"GLShaderMaterials",custom_edit_url:null},m=void 0,p={unversionedId:"API/Renderer/Drawing/Renderer_Drawing_GLShaderMaterials.GLShaderMaterials",id:"API/Renderer/Drawing/Renderer_Drawing_GLShaderMaterials.GLShaderMaterials",isDocsHomePage:!1,title:"Class: GLShaderMaterials",description:"Class representing GL shader materials.",source:"@site/docs/API/Renderer/Drawing/GLShaderMaterials.md",sourceDirName:"API/Renderer/Drawing",slug:"/API/Renderer/Drawing/Renderer_Drawing_GLShaderMaterials.GLShaderMaterials",permalink:"/zea-engine/API/Renderer/Drawing/Renderer_Drawing_GLShaderMaterials.GLShaderMaterials",editUrl:null,tags:[],version:"current",frontMatter:{id:"Renderer_Drawing_GLShaderMaterials.GLShaderMaterials",title:"Class: GLShaderMaterials",sidebar_label:"GLShaderMaterials",custom_edit_url:null},sidebar:"apiSidebar",previous:{title:"GLShaderGeomSets",permalink:"/zea-engine/API/Renderer/Drawing/Renderer_Drawing_GLShaderGeomSets.GLShaderGeomSets"},next:{title:"IGeomShaderBinding",permalink:"/zea-engine/API/Renderer/Drawing/Renderer_Drawing_GeomShaderBinding.IGeomShaderBinding"}},s=[{value:"Hierarchy",id:"hierarchy",children:[]},{value:"Constructors",id:"constructors",children:[{value:"constructor",id:"constructor",children:[]}]},{value:"Properties",id:"properties",children:[{value:"__id",id:"__id",children:[]},{value:"gl",id:"gl",children:[]},{value:"glMaterialGeomItemSets",id:"glmaterialgeomitemsets",children:[]},{value:"glShader",id:"glshader",children:[]},{value:"glgeomdatashader",id:"glgeomdatashader",children:[]},{value:"glselectedshader",id:"glselectedshader",children:[]},{value:"listeners",id:"listeners",children:[]},{value:"pass",id:"pass",children:[]}]},{value:"Methods",id:"methods",children:[{value:"addGLGeomItem",id:"addglgeomitem",children:[]},{value:"addMaterialGeomItemSets",id:"addmaterialgeomitemsets",children:[]},{value:"draw",id:"draw",children:[]},{value:"drawGeomData",id:"drawgeomdata",children:[]},{value:"drawHighlightedGeoms",id:"drawhighlightedgeoms",children:[]},{value:"emit",id:"emit",children:[]},{value:"findMaterialGeomItemSets",id:"findmaterialgeomitemsets",children:[]},{value:"getClassName",id:"getclassname",children:[]},{value:"getId",id:"getid",children:[]},{value:"getMaterialGeomItemSets",id:"getmaterialgeomitemsets",children:[]},{value:"off",id:"off",children:[]},{value:"on",id:"on",children:[]},{value:"once",id:"once",children:[]},{value:"removeListenerById",id:"removelistenerbyid",children:[]},{value:"removeMaterialGeomItemSets",id:"removematerialgeomitemsets",children:[]}]}],o={toc:s};function k(e){var t=e.components,a=(0,r.Z)(e,l);return(0,i.kt)("wrapper",(0,n.Z)({},o,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Class representing GL shader materials."),(0,i.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("a",{parentName:"p",href:"../../Utilities/Utilities_EventEmitter.EventEmitter"},(0,i.kt)("inlineCode",{parentName:"a"},"EventEmitter"))),(0,i.kt)("p",{parentName:"li"},"\u21b3 ",(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"GLShaderMaterials"))))),(0,i.kt)("h2",{id:"constructors"},"Constructors"),(0,i.kt)("h3",{id:"constructor"},"constructor"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"new GLShaderMaterials"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"gl"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"pass"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"shaders"),")"),(0,i.kt)("p",null,"Create a GL shader material."),(0,i.kt)("h4",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"gl")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"../types/Renderer_types_webgl.WebGL12RenderingContext"},(0,i.kt)("inlineCode",{parentName:"a"},"WebGL12RenderingContext"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The WebGL Context value.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"pass")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"../Passes/Renderer_Passes_GLPass.GLPass"},(0,i.kt)("inlineCode",{parentName:"a"},"GLPass"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The pass that owns this GLShaderMaterials object.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"shaders")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Record"),"<",(0,i.kt)("inlineCode",{parentName:"td"},"string"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"any"),">"),(0,i.kt)("td",{parentName:"tr",align:"left"},"The shaders value.")))),(0,i.kt)("h4",{id:"overrides"},"Overrides"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,i.kt)("a",{parentName:"p",href:"../../Utilities/Utilities_EventEmitter.EventEmitter#constructor"},"constructor")),(0,i.kt)("h4",{id:"defined-in"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Renderer/Drawing/GLShaderMaterials.ts#L27"},"src/Renderer/Drawing/GLShaderMaterials.ts:27")),(0,i.kt)("h2",{id:"properties"},"Properties"),(0,i.kt)("h3",{id:"__id"},"_","_","id"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,i.kt)("strong",{parentName:"p"},"_","_","id"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("h4",{id:"inherited-from"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,i.kt)("a",{parentName:"p",href:"../../Utilities/Utilities_EventEmitter.EventEmitter#__id"},"__id")),(0,i.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/BaseClass.ts#L11"},"src/Utilities/BaseClass.ts:11")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"gl"},"gl"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,i.kt)("strong",{parentName:"p"},"gl"),": ",(0,i.kt)("a",{parentName:"p",href:"../types/Renderer_types_webgl.WebGL12RenderingContext"},(0,i.kt)("inlineCode",{parentName:"a"},"WebGL12RenderingContext"))),(0,i.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Renderer/Drawing/GLShaderMaterials.ts#L15"},"src/Renderer/Drawing/GLShaderMaterials.ts:15")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"glmaterialgeomitemsets"},"glMaterialGeomItemSets"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,i.kt)("strong",{parentName:"p"},"glMaterialGeomItemSets"),": ",(0,i.kt)("a",{parentName:"p",href:"Renderer_Drawing_GLMaterialGeomItemSets.GLMaterialGeomItemSets"},(0,i.kt)("inlineCode",{parentName:"a"},"GLMaterialGeomItemSets")),"[]"),(0,i.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Renderer/Drawing/GLShaderMaterials.ts#L20"},"src/Renderer/Drawing/GLShaderMaterials.ts:20")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"glshader"},"glShader"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,i.kt)("strong",{parentName:"p"},"glShader"),": ",(0,i.kt)("a",{parentName:"p",href:"../Renderer_GLShader.GLShader"},(0,i.kt)("inlineCode",{parentName:"a"},"GLShader"))),(0,i.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Renderer/Drawing/GLShaderMaterials.ts#L17"},"src/Renderer/Drawing/GLShaderMaterials.ts:17")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"glgeomdatashader"},"glgeomdatashader"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,i.kt)("strong",{parentName:"p"},"glgeomdatashader"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"any")),(0,i.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Renderer/Drawing/GLShaderMaterials.ts#L18"},"src/Renderer/Drawing/GLShaderMaterials.ts:18")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"glselectedshader"},"glselectedshader"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,i.kt)("strong",{parentName:"p"},"glselectedshader"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"any")),(0,i.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Renderer/Drawing/GLShaderMaterials.ts#L19"},"src/Renderer/Drawing/GLShaderMaterials.ts:19")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"listeners"},"listeners"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"listeners"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"Record"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"string"),", (",(0,i.kt)("inlineCode",{parentName:"p"},"event"),": ",(0,i.kt)("a",{parentName:"p",href:"../../Utilities/Utilities_BaseEvent.BaseEvent"},(0,i.kt)("inlineCode",{parentName:"a"},"BaseEvent")),") => ",(0,i.kt)("inlineCode",{parentName:"p"},"void"),"[]",">"," = ",(0,i.kt)("inlineCode",{parentName:"p"},"{}")),(0,i.kt)("h4",{id:"inherited-from-1"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,i.kt)("a",{parentName:"p",href:"../../Utilities/Utilities_EventEmitter.EventEmitter#listeners"},"listeners")),(0,i.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/EventEmitter.ts#L26"},"src/Utilities/EventEmitter.ts:26")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"pass"},"pass"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,i.kt)("strong",{parentName:"p"},"pass"),": ",(0,i.kt)("a",{parentName:"p",href:"../Passes/Renderer_Passes_GLPass.GLPass"},(0,i.kt)("inlineCode",{parentName:"a"},"GLPass"))),(0,i.kt)("h4",{id:"defined-in-8"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Renderer/Drawing/GLShaderMaterials.ts#L16"},"src/Renderer/Drawing/GLShaderMaterials.ts:16")),(0,i.kt)("h2",{id:"methods"},"Methods"),(0,i.kt)("h3",{id:"addglgeomitem"},"addGLGeomItem"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"addGLGeomItem"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"glGeomItem"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"glGeom"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"glMaterial"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"The addGLGeomItem method."),(0,i.kt)("h4",{id:"parameters-1"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"glGeomItem")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Renderer_Drawing_GLGeomItem.GLGeomItem"},(0,i.kt)("inlineCode",{parentName:"a"},"GLGeomItem"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The glGeomItem value.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"glGeom")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Renderer_Drawing_GLGeom.GLGeom"},(0,i.kt)("inlineCode",{parentName:"a"},"GLGeom"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The glGeomItem value.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"glMaterial")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Renderer_Drawing_GLMaterial.GLMaterial"},(0,i.kt)("inlineCode",{parentName:"a"},"GLMaterial"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The glMaterial value.")))),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-9"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Renderer/Drawing/GLShaderMaterials.ts#L55"},"src/Renderer/Drawing/GLShaderMaterials.ts:55")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"addmaterialgeomitemsets"},"addMaterialGeomItemSets"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"addMaterialGeomItemSets"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"glMaterialGeomItemSets"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"The addMaterialGeomItemSets method."),(0,i.kt)("h4",{id:"parameters-2"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"glMaterialGeomItemSets")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"any")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The glMaterialGeomItemSets value.")))),(0,i.kt)("h4",{id:"returns-1"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-10"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Renderer/Drawing/GLShaderMaterials.ts#L69"},"src/Renderer/Drawing/GLShaderMaterials.ts:69")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"draw"},"draw"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"draw"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"renderstate"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Draws all elements, binding the shader and continuing into the GLMaterialGeomItemSets"),(0,i.kt)("h4",{id:"parameters-3"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description")))),(0,i.kt)("h4",{id:"returns-2"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-11"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Renderer/Drawing/GLShaderMaterials.ts#L109"},"src/Renderer/Drawing/GLShaderMaterials.ts:109")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"drawgeomdata"},"drawGeomData"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"drawGeomData"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"renderstate"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"The drawGeomData method."),(0,i.kt)("h4",{id:"parameters-4"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"renderstate")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"../types/Renderer_types_renderer.GeomDataRenderState"},(0,i.kt)("inlineCode",{parentName:"a"},"GeomDataRenderState"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The object tracking the current state of the renderer")))),(0,i.kt)("h4",{id:"returns-3"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-12"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Renderer/Drawing/GLShaderMaterials.ts#L140"},"src/Renderer/Drawing/GLShaderMaterials.ts:140")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"drawhighlightedgeoms"},"drawHighlightedGeoms"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"drawHighlightedGeoms"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"renderstate"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"The drawHighlightedGeoms method."),(0,i.kt)("h4",{id:"parameters-5"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description")))),(0,i.kt)("h4",{id:"returns-4"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-13"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Renderer/Drawing/GLShaderMaterials.ts#L125"},"src/Renderer/Drawing/GLShaderMaterials.ts:125")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"emit"},"emit"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"emit"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"eventName"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"event?"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Triggers all listener functions in an event."),(0,i.kt)("h4",{id:"parameters-6"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"eventName")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The name of the event.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"event")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"../../Utilities/Utilities_BaseEvent.BaseEvent"},(0,i.kt)("inlineCode",{parentName:"a"},"BaseEvent"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The data you want to pass down to all listener functions as parameter.")))),(0,i.kt)("h4",{id:"returns-5"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"inherited-from-2"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,i.kt)("a",{parentName:"p",href:"../../Utilities/Utilities_EventEmitter.EventEmitter#emit"},"emit")),(0,i.kt)("h4",{id:"defined-in-14"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/EventEmitter.ts#L154"},"src/Utilities/EventEmitter.ts:154")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"findmaterialgeomitemsets"},"findMaterialGeomItemSets"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"findMaterialGeomItemSets"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"glMaterial"),"): ",(0,i.kt)("a",{parentName:"p",href:"Renderer_Drawing_GLMaterialGeomItemSets.GLMaterialGeomItemSets"},(0,i.kt)("inlineCode",{parentName:"a"},"GLMaterialGeomItemSets"))),(0,i.kt)("p",null,"The findMaterialGeomItemSets method."),(0,i.kt)("h4",{id:"parameters-7"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"glMaterial")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Renderer_Drawing_GLMaterial.GLMaterial"},(0,i.kt)("inlineCode",{parentName:"a"},"GLMaterial"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The glMaterial value.")))),(0,i.kt)("h4",{id:"returns-6"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"Renderer_Drawing_GLMaterialGeomItemSets.GLMaterialGeomItemSets"},(0,i.kt)("inlineCode",{parentName:"a"},"GLMaterialGeomItemSets"))),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The return value.")),(0,i.kt)("h4",{id:"defined-in-15"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Renderer/Drawing/GLShaderMaterials.ts#L42"},"src/Renderer/Drawing/GLShaderMaterials.ts:42")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"getclassname"},"getClassName"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"getClassName"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("p",null,"Returns the unmangled name of the class."),(0,i.kt)("h4",{id:"returns-7"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The name of the class definition.")),(0,i.kt)("h4",{id:"inherited-from-3"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,i.kt)("a",{parentName:"p",href:"../../Utilities/Utilities_EventEmitter.EventEmitter#getclassname"},"getClassName")),(0,i.kt)("h4",{id:"defined-in-16"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/BaseClass.ts#L33"},"src/Utilities/BaseClass.ts:33")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"getid"},"getId"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"getId"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("p",null,"Every instance of each class based on BaseClass is assigned a unique number.\nThis number is not persistent in between different loads of a scene.\nReturns the unique id of the object."),(0,i.kt)("h4",{id:"returns-8"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The Id of the object.")),(0,i.kt)("h4",{id:"inherited-from-4"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,i.kt)("a",{parentName:"p",href:"../../Utilities/Utilities_EventEmitter.EventEmitter#getid"},"getId")),(0,i.kt)("h4",{id:"defined-in-17"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/BaseClass.ts#L25"},"src/Utilities/BaseClass.ts:25")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"getmaterialgeomitemsets"},"getMaterialGeomItemSets"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"getMaterialGeomItemSets"),"(): ",(0,i.kt)("a",{parentName:"p",href:"Renderer_Drawing_GLMaterialGeomItemSets.GLMaterialGeomItemSets"},(0,i.kt)("inlineCode",{parentName:"a"},"GLMaterialGeomItemSets")),"[]"),(0,i.kt)("p",null,"The getMaterialGeomItemSets method."),(0,i.kt)("h4",{id:"returns-9"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"Renderer_Drawing_GLMaterialGeomItemSets.GLMaterialGeomItemSets"},(0,i.kt)("inlineCode",{parentName:"a"},"GLMaterialGeomItemSets")),"[]"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The return value.")),(0,i.kt)("h4",{id:"defined-in-18"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Renderer/Drawing/GLShaderMaterials.ts#L101"},"src/Renderer/Drawing/GLShaderMaterials.ts:101")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"off"},"off"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"off"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"eventName"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"listener?"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Removes a listener function from the specified event, using either the function or the index id. Depends on what is passed in."),(0,i.kt)("h4",{id:"parameters-8"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"eventName")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The name of the event.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"listener?")),(0,i.kt)("td",{parentName:"tr",align:"left"},"(",(0,i.kt)("inlineCode",{parentName:"td"},"event"),": ",(0,i.kt)("inlineCode",{parentName:"td"},"any"),") => ",(0,i.kt)("inlineCode",{parentName:"td"},"void")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The listener function or the id number.")))),(0,i.kt)("h4",{id:"returns-10"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"inherited-from-5"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,i.kt)("a",{parentName:"p",href:"../../Utilities/Utilities_EventEmitter.EventEmitter#off"},"off")),(0,i.kt)("h4",{id:"defined-in-19"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/EventEmitter.ts#L97"},"src/Utilities/EventEmitter.ts:97")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"on"},"on"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"on"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"eventName"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"listener?"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("p",null,"Adds a listener function for a given event name."),(0,i.kt)("h4",{id:"parameters-9"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"eventName")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The name of the event.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"listener?")),(0,i.kt)("td",{parentName:"tr",align:"left"},"(",(0,i.kt)("inlineCode",{parentName:"td"},"event"),": ",(0,i.kt)("inlineCode",{parentName:"td"},"any"),") => ",(0,i.kt)("inlineCode",{parentName:"td"},"void")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The listener function(callback).")))),(0,i.kt)("h4",{id:"returns-11"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"the id that can be used to remove the listener.")),(0,i.kt)("h4",{id:"inherited-from-6"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,i.kt)("a",{parentName:"p",href:"../../Utilities/Utilities_EventEmitter.EventEmitter#on"},"on")),(0,i.kt)("h4",{id:"defined-in-20"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/EventEmitter.ts#L44"},"src/Utilities/EventEmitter.ts:44")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"once"},"once"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"once"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"eventName"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"listener"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("p",null,"Similar to the ",(0,i.kt)("inlineCode",{parentName:"p"},"on")," method with the difference that when the event is triggered,\nit is automatically unregistered meaning that the event listener will be triggered at most one time."),(0,i.kt)("p",null,"Useful for events that we expect to trigger one time, such as when assets load."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"const asset = new Asset();\nasset.once('loaded', () => {\n  console.log(\"Yay! the asset is loaded\")\n})\n")),(0,i.kt)("h4",{id:"parameters-10"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"eventName")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The eventName value")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"listener")),(0,i.kt)("td",{parentName:"tr",align:"left"},"(",(0,i.kt)("inlineCode",{parentName:"td"},"event"),": ",(0,i.kt)("a",{parentName:"td",href:"../../Utilities/Utilities_BaseEvent.BaseEvent"},(0,i.kt)("inlineCode",{parentName:"a"},"BaseEvent")),") => ",(0,i.kt)("inlineCode",{parentName:"td"},"void")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The listener value")))),(0,i.kt)("h4",{id:"returns-12"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"the id that can be used to remove the listener.")),(0,i.kt)("h4",{id:"inherited-from-7"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,i.kt)("a",{parentName:"p",href:"../../Utilities/Utilities_EventEmitter.EventEmitter#once"},"once")),(0,i.kt)("h4",{id:"defined-in-21"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/EventEmitter.ts#L82"},"src/Utilities/EventEmitter.ts:82")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"removelistenerbyid"},"removeListenerById"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"removeListenerById"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"eventName"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"id"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"remove listener by ID returned from #on"),(0,i.kt)("h4",{id:"parameters-11"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"eventName")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The name of the event.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"id")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"number")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The id returned by addListener")))),(0,i.kt)("h4",{id:"returns-13"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"inherited-from-8"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,i.kt)("a",{parentName:"p",href:"../../Utilities/Utilities_EventEmitter.EventEmitter#removelistenerbyid"},"removeListenerById")),(0,i.kt)("h4",{id:"defined-in-22"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/EventEmitter.ts#L134"},"src/Utilities/EventEmitter.ts:134")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"removematerialgeomitemsets"},"removeMaterialGeomItemSets"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"removeMaterialGeomItemSets"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"glMaterialGeomItemSets"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"The removeMaterialGeomItemSets method."),(0,i.kt)("h4",{id:"parameters-12"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"glMaterialGeomItemSets")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Renderer_Drawing_GLMaterialGeomItemSets.GLMaterialGeomItemSets"},(0,i.kt)("inlineCode",{parentName:"a"},"GLMaterialGeomItemSets"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The glMaterialGeomItemSets value.")))),(0,i.kt)("h4",{id:"returns-14"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-23"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Renderer/Drawing/GLShaderMaterials.ts#L92"},"src/Renderer/Drawing/GLShaderMaterials.ts:92")))}k.isMDXComponent=!0}}]);