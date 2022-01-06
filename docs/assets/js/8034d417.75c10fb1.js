"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[8409],{3905:function(e,t,r){r.d(t,{Zo:function(){return m},kt:function(){return h}});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function d(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},l=Object.keys(e);for(a=0;a<l.length;a++)r=l[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)r=l[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var p=a.createContext({}),s=function(e){var t=a.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},m=function(e){var t=s(e.components);return a.createElement(p.Provider,{value:t},e.children)},o={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},k=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,l=e.originalType,p=e.parentName,m=d(e,["components","mdxType","originalType","parentName"]),k=s(r),h=n,u=k["".concat(p,".").concat(h)]||k[h]||o[h]||l;return r?a.createElement(u,i(i({ref:t},m),{},{components:r})):a.createElement(u,i({ref:t},m))}));function h(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=r.length,i=new Array(l);i[0]=k;var d={};for(var p in t)hasOwnProperty.call(t,p)&&(d[p]=t[p]);d.originalType=e,d.mdxType="string"==typeof e?e:n,i[1]=d;for(var s=2;s<l;s++)i[s]=r[s];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}k.displayName="MDXCreateElement"},2635:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return d},contentTitle:function(){return p},metadata:function(){return s},toc:function(){return m},default:function(){return k}});var a=r(7462),n=r(3366),l=(r(7294),r(3905)),i=["components"],d={id:"Renderer_ShaderLibrary.ShaderLibrary",title:"Class: ShaderLibrary",sidebar_label:"ShaderLibrary",custom_edit_url:null},p=void 0,s={unversionedId:"API/Renderer/Renderer_ShaderLibrary.ShaderLibrary",id:"API/Renderer/Renderer_ShaderLibrary.ShaderLibrary",isDocsHomePage:!1,title:"Class: ShaderLibrary",description:"Class representing a shader library.",source:"@site/docs/API/Renderer/ShaderLibrary.md",sourceDirName:"API/Renderer",slug:"/API/Renderer/Renderer_ShaderLibrary.ShaderLibrary",permalink:"/zea-engine/API/Renderer/Renderer_ShaderLibrary.ShaderLibrary",editUrl:null,tags:[],version:"current",frontMatter:{id:"Renderer_ShaderLibrary.ShaderLibrary",title:"Class: ShaderLibrary",sidebar_label:"ShaderLibrary",custom_edit_url:null},sidebar:"apiSidebar",previous:{title:"ImagePyramid",permalink:"/zea-engine/API/Renderer/Renderer_ImagePyramid.ImagePyramid"},next:{title:"CADAssembly",permalink:"/zea-engine/API/SceneTree/CAD/SceneTree_CAD_CADAssembly.CADAssembly"}},m=[{value:"Constructors",id:"constructors",children:[{value:"constructor",id:"constructor",children:[]}]},{value:"Properties",id:"properties",children:[{value:"__shaderModules",id:"__shadermodules",children:[]},{value:"materialTemplates",id:"materialtemplates",children:[]}]},{value:"Methods",id:"methods",children:[{value:"getShaderModule",id:"getshadermodule",children:[]},{value:"getShaderModuleNames",id:"getshadermodulenames",children:[]},{value:"handleImport",id:"handleimport",children:[]},{value:"parseAttr",id:"parseattr",children:[]},{value:"parseShader",id:"parseshader",children:[]},{value:"parseShaderHelper",id:"parseshaderhelper",children:[]},{value:"setShaderModule",id:"setshadermodule",children:[]}]}],o={toc:m};function k(e){var t=e.components,r=(0,n.Z)(e,i);return(0,l.kt)("wrapper",(0,a.Z)({},o,r,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"Class representing a shader library."),(0,l.kt)("h2",{id:"constructors"},"Constructors"),(0,l.kt)("h3",{id:"constructor"},"constructor"),(0,l.kt)("p",null,"\u2022 ",(0,l.kt)("strong",{parentName:"p"},"new ShaderLibrary"),"()"),(0,l.kt)("p",null,"Create a shader library."),(0,l.kt)("h4",{id:"defined-in"},"Defined in"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/ShaderLibrary.ts#L26"},"src/Renderer/ShaderLibrary.ts:26")),(0,l.kt)("h2",{id:"properties"},"Properties"),(0,l.kt)("h3",{id:"__shadermodules"},"_","_","shaderModules"),(0,l.kt)("p",null,"\u2022 ",(0,l.kt)("strong",{parentName:"p"},"_","_","shaderModules"),": ",(0,l.kt)("inlineCode",{parentName:"p"},"Record"),"<",(0,l.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"string"),">"),(0,l.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/ShaderLibrary.ts#L20"},"src/Renderer/ShaderLibrary.ts:20")),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"materialtemplates"},"materialTemplates"),(0,l.kt)("p",null,"\u2022 ",(0,l.kt)("strong",{parentName:"p"},"materialTemplates"),": ",(0,l.kt)("inlineCode",{parentName:"p"},"Record"),"<",(0,l.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,l.kt)("a",{parentName:"p",href:"../SceneTree/SceneTree_Material.Material"},(0,l.kt)("inlineCode",{parentName:"a"},"Material")),">"),(0,l.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/ShaderLibrary.ts#L21"},"src/Renderer/ShaderLibrary.ts:21")),(0,l.kt)("h2",{id:"methods"},"Methods"),(0,l.kt)("h3",{id:"getshadermodule"},"getShaderModule"),(0,l.kt)("p",null,"\u25b8 ",(0,l.kt)("strong",{parentName:"p"},"getShaderModule"),"(",(0,l.kt)("inlineCode",{parentName:"p"},"shaderName"),"): ",(0,l.kt)("inlineCode",{parentName:"p"},"string")),(0,l.kt)("p",null,"The getShaderModule method. Access specific uniforms, attributes of a particular module."),(0,l.kt)("h4",{id:"parameters"},"Parameters"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"shaderName")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"string")),(0,l.kt)("td",{parentName:"tr",align:"left"},"The shader name.")))),(0,l.kt)("h4",{id:"returns"},"Returns"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"string")),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"The return value.")),(0,l.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/ShaderLibrary.ts#L50"},"src/Renderer/ShaderLibrary.ts:50")),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"getshadermodulenames"},"getShaderModuleNames"),(0,l.kt)("p",null,"\u25b8 ",(0,l.kt)("strong",{parentName:"p"},"getShaderModuleNames"),"(): ",(0,l.kt)("inlineCode",{parentName:"p"},"any"),"[]"),(0,l.kt)("p",null,"The getShaderModuleNames method."),(0,l.kt)("h4",{id:"returns-1"},"Returns"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"any"),"[]"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"The return value.")),(0,l.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/ShaderLibrary.ts#L58"},"src/Renderer/ShaderLibrary.ts:58")),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"handleimport"},"handleImport"),(0,l.kt)("p",null,"\u25b8 ",(0,l.kt)("strong",{parentName:"p"},"handleImport"),"(",(0,l.kt)("inlineCode",{parentName:"p"},"result"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"shaderName"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"includeFile"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"includes"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"lineNumber"),"): ",(0,l.kt)("inlineCode",{parentName:"p"},"void")),(0,l.kt)("p",null,"The handleImport method -- takes the includeFile and if it exists, adds the parsed glsl, uniforms, and attributes to the result, recursively."),(0,l.kt)("h4",{id:"parameters-1"},"Parameters"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"result")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("a",{parentName:"td",href:"types/Renderer_types_renderer.ShaderParseResult"},(0,l.kt)("inlineCode",{parentName:"a"},"ShaderParseResult"))),(0,l.kt)("td",{parentName:"tr",align:"left"},"result object that stores the glsl, attribute, uniform")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"shaderName")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"string")),(0,l.kt)("td",{parentName:"tr",align:"left"},"shaderName")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"includeFile")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"string")),(0,l.kt)("td",{parentName:"tr",align:"left"},"file name of the shader snippet/module")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"includes")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"string"),"[]"),(0,l.kt)("td",{parentName:"tr",align:"left"},"keep track of what was included")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"lineNumber")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"number")),(0,l.kt)("td",{parentName:"tr",align:"left"},"keep track of what line we're on")))),(0,l.kt)("h4",{id:"returns-2"},"Returns"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"void")),(0,l.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/ShaderLibrary.ts#L98"},"src/Renderer/ShaderLibrary.ts:98")),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"parseattr"},"parseAttr"),(0,l.kt)("p",null,"\u25b8 ",(0,l.kt)("strong",{parentName:"p"},"parseAttr"),"(",(0,l.kt)("inlineCode",{parentName:"p"},"parts"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"instanced"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"result"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"line"),"): ",(0,l.kt)("inlineCode",{parentName:"p"},"void")),(0,l.kt)("p",null,"The parseAttr"),(0,l.kt)("h4",{id:"parameters-2"},"Parameters"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"parts")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"string"),"[]"),(0,l.kt)("td",{parentName:"tr",align:"left"},"parts")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"instanced")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"boolean")),(0,l.kt)("td",{parentName:"tr",align:"left"},"instanced")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"result")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("a",{parentName:"td",href:"types/Renderer_types_renderer.ShaderParseResult"},(0,l.kt)("inlineCode",{parentName:"a"},"ShaderParseResult"))),(0,l.kt)("td",{parentName:"tr",align:"left"},"result object to store parsed data")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"line")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"string")),(0,l.kt)("td",{parentName:"tr",align:"left"},"-")))),(0,l.kt)("h4",{id:"returns-3"},"Returns"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"void")),(0,l.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/ShaderLibrary.ts#L71"},"src/Renderer/ShaderLibrary.ts:71")),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"parseshader"},"parseShader"),(0,l.kt)("p",null,"\u25b8 ",(0,l.kt)("strong",{parentName:"p"},"parseShader"),"(",(0,l.kt)("inlineCode",{parentName:"p"},"shaderName"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"glsl"),"): ",(0,l.kt)("a",{parentName:"p",href:"types/Renderer_types_renderer.ShaderParseResult"},(0,l.kt)("inlineCode",{parentName:"a"},"ShaderParseResult"))),(0,l.kt)("p",null,"The parseShader method."),(0,l.kt)("h4",{id:"parameters-3"},"Parameters"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"shaderName")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"string")),(0,l.kt)("td",{parentName:"tr",align:"left"},"The shader name.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"glsl")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"string")),(0,l.kt)("td",{parentName:"tr",align:"left"},"The glsl param.")))),(0,l.kt)("h4",{id:"returns-4"},"Returns"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"types/Renderer_types_renderer.ShaderParseResult"},(0,l.kt)("inlineCode",{parentName:"a"},"ShaderParseResult"))),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"returns the 'result' object")),(0,l.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/ShaderLibrary.ts#L139"},"src/Renderer/ShaderLibrary.ts:139")),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"parseshaderhelper"},"parseShaderHelper"),(0,l.kt)("p",null,"\u25b8 ",(0,l.kt)("strong",{parentName:"p"},"parseShaderHelper"),"(",(0,l.kt)("inlineCode",{parentName:"p"},"shaderName"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"glsl"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"includes"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"lineNumber"),"): ",(0,l.kt)("a",{parentName:"p",href:"types/Renderer_types_renderer.ShaderParseResult"},(0,l.kt)("inlineCode",{parentName:"a"},"ShaderParseResult"))),(0,l.kt)("p",null,"The parseShader recursive helper method"),(0,l.kt)("h4",{id:"parameters-4"},"Parameters"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"shaderName")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"string")),(0,l.kt)("td",{parentName:"tr",align:"left"},"The shader name.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"glsl")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"string")),(0,l.kt)("td",{parentName:"tr",align:"left"},"The glsl param.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"includes")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"string"),"[]"),(0,l.kt)("td",{parentName:"tr",align:"left"},"keep track of what was included")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"lineNumber")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"number")),(0,l.kt)("td",{parentName:"tr",align:"left"},"keep track of what line we're on")))),(0,l.kt)("h4",{id:"returns-5"},"Returns"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"types/Renderer_types_renderer.ShaderParseResult"},(0,l.kt)("inlineCode",{parentName:"a"},"ShaderParseResult"))),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"The return value.")),(0,l.kt)("h4",{id:"defined-in-8"},"Defined in"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/ShaderLibrary.ts#L151"},"src/Renderer/ShaderLibrary.ts:151")),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"setshadermodule"},"setShaderModule"),(0,l.kt)("p",null,"\u25b8 ",(0,l.kt)("strong",{parentName:"p"},"setShaderModule"),"(",(0,l.kt)("inlineCode",{parentName:"p"},"shaderName"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"shader"),"): ",(0,l.kt)("inlineCode",{parentName:"p"},"void")),(0,l.kt)("p",null,"The setShaderModule method. Shader must be set before parsing."),(0,l.kt)("h4",{id:"parameters-5"},"Parameters"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"shaderName")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"string")),(0,l.kt)("td",{parentName:"tr",align:"left"},"The shader name.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"shader")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"string")),(0,l.kt)("td",{parentName:"tr",align:"left"},"The unparsed shader GLSL.")))),(0,l.kt)("h4",{id:"returns-6"},"Returns"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"void")),(0,l.kt)("h4",{id:"defined-in-9"},"Defined in"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/ShaderLibrary.ts#L36"},"src/Renderer/ShaderLibrary.ts:36")))}k.isMDXComponent=!0}}]);