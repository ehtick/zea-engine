"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[4209],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return h}});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var d=a.createContext({}),o=function(e){var t=a.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=o(e.components);return a.createElement(d.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},k=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,d=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),k=o(n),h=i,c=k["".concat(d,".").concat(h)]||k[h]||m[h]||r;return n?a.createElement(c,l(l({ref:t},p),{},{components:n})):a.createElement(c,l({ref:t},p))}));function h(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,l=new Array(r);l[0]=k;var s={};for(var d in t)hasOwnProperty.call(t,d)&&(s[d]=t[d]);s.originalType=e,s.mdxType="string"==typeof e?e:i,l[1]=s;for(var o=2;o<r;o++)l[o]=n[o];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}k.displayName="MDXCreateElement"},2401:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return d},metadata:function(){return o},toc:function(){return p},default:function(){return k}});var a=n(7462),i=n(3366),r=(n(7294),n(3905)),l=["components"],s={id:"SceneTree_AssetLoadContext.AssetLoadContext",title:"Class: AssetLoadContext",sidebar_label:"AssetLoadContext",custom_edit_url:null},d=void 0,o={unversionedId:"API/SceneTree/SceneTree_AssetLoadContext.AssetLoadContext",id:"API/SceneTree/SceneTree_AssetLoadContext.AssetLoadContext",isDocsHomePage:!1,title:"Class: AssetLoadContext",description:"Provides a context for loading assets. This context can provide the units of the loading scene.",source:"@site/docs/API/SceneTree/AssetLoadContext.md",sourceDirName:"API/SceneTree",slug:"/API/SceneTree/SceneTree_AssetLoadContext.AssetLoadContext",permalink:"/zea-engine/API/SceneTree/SceneTree_AssetLoadContext.AssetLoadContext",editUrl:null,tags:[],version:"current",frontMatter:{id:"SceneTree_AssetLoadContext.AssetLoadContext",title:"Class: AssetLoadContext",sidebar_label:"AssetLoadContext",custom_edit_url:null},sidebar:"apiSidebar",previous:{title:"AssetItem",permalink:"/zea-engine/API/SceneTree/SceneTree_AssetItem.AssetItem"},next:{title:"AudioItem",permalink:"/zea-engine/API/SceneTree/SceneTree_AudioItem.AudioItem"}},p=[{value:"Hierarchy",id:"hierarchy",children:[]},{value:"Constructors",id:"constructors",children:[{value:"constructor",id:"constructor",children:[]}]},{value:"Properties",id:"properties",children:[{value:"__id",id:"__id",children:[]},{value:"addGeomToLayer",id:"addgeomtolayer",children:[]},{value:"assetItem",id:"assetitem",children:[]},{value:"assets",id:"assets",children:[]},{value:"asyncCount",id:"asynccount",children:[]},{value:"folder",id:"folder",children:[]},{value:"listeners",id:"listeners",children:[]},{value:"numGeomItems",id:"numgeomitems",children:[]},{value:"numTreeItems",id:"numtreeitems",children:[]},{value:"postLoadCallbacks",id:"postloadcallbacks",children:[]},{value:"resources",id:"resources",children:[]},{value:"sdk",id:"sdk",children:[]},{value:"units",id:"units",children:[]},{value:"url",id:"url",children:[]},{value:"versions",id:"versions",children:[]}]},{value:"Methods",id:"methods",children:[{value:"addPLCB",id:"addplcb",children:[]},{value:"decrementAsync",id:"decrementasync",children:[]},{value:"emit",id:"emit",children:[]},{value:"getClassName",id:"getclassname",children:[]},{value:"getId",id:"getid",children:[]},{value:"incrementAsync",id:"incrementasync",children:[]},{value:"off",id:"off",children:[]},{value:"on",id:"on",children:[]},{value:"once",id:"once",children:[]},{value:"removeListenerById",id:"removelistenerbyid",children:[]},{value:"resolvePath",id:"resolvepath",children:[]}]}],m={toc:p};function k(e){var t=e.components,n=(0,i.Z)(e,l);return(0,r.kt)("wrapper",(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Provides a context for loading assets. This context can provide the units of the loading scene.\nE.g. you can specify the scene units as 'millimeters' in the context object.\nTo load external references, you can also provide a dictionary that maps filenames to URLs that are used\nto resolve the URL of an external reference that a given asset is expecting to find."),(0,r.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter"},(0,r.kt)("inlineCode",{parentName:"a"},"EventEmitter"))),(0,r.kt)("p",{parentName:"li"},"\u21b3 ",(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"AssetLoadContext"))))),(0,r.kt)("h2",{id:"constructors"},"Constructors"),(0,r.kt)("h3",{id:"constructor"},"constructor"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"new AssetLoadContext"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"context?"),")"),(0,r.kt)("p",null,"Create a AssetLoadContext"),(0,r.kt)("h4",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"context?")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"SceneTree_AssetLoadContext.AssetLoadContext"},(0,r.kt)("inlineCode",{parentName:"a"},"AssetLoadContext"))),(0,r.kt)("td",{parentName:"tr",align:"left"},"The source context to base this context on.")))),(0,r.kt)("h4",{id:"overrides"},"Overrides"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,r.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter#constructor"},"constructor")),(0,r.kt)("h4",{id:"defined-in"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/339201283/src/SceneTree/AssetLoadContext.ts#L34"},"SceneTree/AssetLoadContext.ts:34")),(0,r.kt)("h2",{id:"properties"},"Properties"),(0,r.kt)("h3",{id:"__id"},"_","_","id"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,r.kt)("strong",{parentName:"p"},"_","_","id"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"number")),(0,r.kt)("h4",{id:"inherited-from"},"Inherited from"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,r.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter#__id"},"__id")),(0,r.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/339201283/src/Utilities/BaseClass.ts#L11"},"Utilities/BaseClass.ts:11")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"addgeomtolayer"},"addGeomToLayer"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"addGeomToLayer"),": (",(0,r.kt)("inlineCode",{parentName:"p"},"geomItem"),": ",(0,r.kt)("a",{parentName:"p",href:"SceneTree_GeomItem.GeomItem"},(0,r.kt)("inlineCode",{parentName:"a"},"GeomItem")),", ",(0,r.kt)("inlineCode",{parentName:"p"},"layer"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string"),") => ",(0,r.kt)("inlineCode",{parentName:"p"},"void")),(0,r.kt)("h4",{id:"type-declaration"},"Type declaration"),(0,r.kt)("p",null,"\u25b8 (",(0,r.kt)("inlineCode",{parentName:"p"},"geomItem"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"layer"),"): ",(0,r.kt)("inlineCode",{parentName:"p"},"void")),(0,r.kt)("h5",{id:"parameters-1"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"geomItem")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"SceneTree_GeomItem.GeomItem"},(0,r.kt)("inlineCode",{parentName:"a"},"GeomItem")))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"layer")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"string"))))),(0,r.kt)("h5",{id:"returns"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"void")),(0,r.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/339201283/src/SceneTree/AssetLoadContext.ts#L28"},"SceneTree/AssetLoadContext.ts:28")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"assetitem"},"assetItem"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"assetItem"),": ",(0,r.kt)("a",{parentName:"p",href:"SceneTree_AssetItem.AssetItem"},(0,r.kt)("inlineCode",{parentName:"a"},"AssetItem"))),(0,r.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/339201283/src/SceneTree/AssetLoadContext.ts#L22"},"SceneTree/AssetLoadContext.ts:22")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"assets"},"assets"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,r.kt)("strong",{parentName:"p"},"assets"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"Record"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"any"),">"),(0,r.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/339201283/src/SceneTree/AssetLoadContext.ts#L16"},"SceneTree/AssetLoadContext.ts:16")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"asynccount"},"asyncCount"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,r.kt)("strong",{parentName:"p"},"asyncCount"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"number")),(0,r.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/339201283/src/SceneTree/AssetLoadContext.ts#L26"},"SceneTree/AssetLoadContext.ts:26")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"folder"},"folder"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"folder"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/339201283/src/SceneTree/AssetLoadContext.ts#L20"},"SceneTree/AssetLoadContext.ts:20")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"listeners"},"listeners"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"listeners"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"Record"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"string"),", (",(0,r.kt)("inlineCode",{parentName:"p"},"event"),": ",(0,r.kt)("a",{parentName:"p",href:"../Utilities/Utilities_BaseEvent.BaseEvent"},(0,r.kt)("inlineCode",{parentName:"a"},"BaseEvent")),") => ",(0,r.kt)("inlineCode",{parentName:"p"},"void"),"[]",">"," = ",(0,r.kt)("inlineCode",{parentName:"p"},"{}")),(0,r.kt)("h4",{id:"inherited-from-1"},"Inherited from"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,r.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter#listeners"},"listeners")),(0,r.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/339201283/src/Utilities/EventEmitter.ts#L26"},"Utilities/EventEmitter.ts:26")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"numgeomitems"},"numGeomItems"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"numGeomItems"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"number")),(0,r.kt)("h4",{id:"defined-in-8"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/339201283/src/SceneTree/AssetLoadContext.ts#L24"},"SceneTree/AssetLoadContext.ts:24")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"numtreeitems"},"numTreeItems"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"numTreeItems"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"number")),(0,r.kt)("h4",{id:"defined-in-9"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/339201283/src/SceneTree/AssetLoadContext.ts#L23"},"SceneTree/AssetLoadContext.ts:23")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"postloadcallbacks"},"postLoadCallbacks"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,r.kt)("strong",{parentName:"p"},"postLoadCallbacks"),": () => ",(0,r.kt)("inlineCode",{parentName:"p"},"void"),"[]"),(0,r.kt)("h4",{id:"defined-in-10"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/339201283/src/SceneTree/AssetLoadContext.ts#L25"},"SceneTree/AssetLoadContext.ts:25")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"resources"},"resources"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,r.kt)("strong",{parentName:"p"},"resources"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"Record"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"any"),">"),(0,r.kt)("h4",{id:"defined-in-11"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/339201283/src/SceneTree/AssetLoadContext.ts#L17"},"SceneTree/AssetLoadContext.ts:17")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"sdk"},"sdk"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,r.kt)("strong",{parentName:"p"},"sdk"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("h4",{id:"defined-in-12"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/339201283/src/SceneTree/AssetLoadContext.ts#L21"},"SceneTree/AssetLoadContext.ts:21")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"units"},"units"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"units"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("h4",{id:"defined-in-13"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/339201283/src/SceneTree/AssetLoadContext.ts#L15"},"SceneTree/AssetLoadContext.ts:15")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"url"},"url"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"url"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("h4",{id:"defined-in-14"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/339201283/src/SceneTree/AssetLoadContext.ts#L19"},"SceneTree/AssetLoadContext.ts:19")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"versions"},"versions"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"versions"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"Record"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,r.kt)("a",{parentName:"p",href:"SceneTree_Version.Version"},(0,r.kt)("inlineCode",{parentName:"a"},"Version")),">"),(0,r.kt)("h4",{id:"defined-in-15"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/339201283/src/SceneTree/AssetLoadContext.ts#L18"},"SceneTree/AssetLoadContext.ts:18")),(0,r.kt)("h2",{id:"methods"},"Methods"),(0,r.kt)("h3",{id:"addplcb"},"addPLCB"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"addPLCB"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"postLoadCallback"),"): ",(0,r.kt)("inlineCode",{parentName:"p"},"void")),(0,r.kt)("p",null,"Adds a function to be called back once the main load call stack exists.\nThis is used to connect parts of the tree together after loading.\ne.g. an instance will"),(0,r.kt)("h4",{id:"parameters-2"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"postLoadCallback")),(0,r.kt)("td",{parentName:"tr",align:"left"},"() => ",(0,r.kt)("inlineCode",{parentName:"td"},"void"))))),(0,r.kt)("h4",{id:"returns-1"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"void")),(0,r.kt)("h4",{id:"defined-in-16"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/339201283/src/SceneTree/AssetLoadContext.ts#L115"},"SceneTree/AssetLoadContext.ts:115")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"decrementasync"},"decrementAsync"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"decrementAsync"),"(): ",(0,r.kt)("inlineCode",{parentName:"p"},"void")),(0,r.kt)("p",null,"As each external reference completes loading, it decrements this counter allowing the owning\nasset to know that the subtrees are loaded."),(0,r.kt)("h4",{id:"returns-2"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"void")),(0,r.kt)("h4",{id:"defined-in-17"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/339201283/src/SceneTree/AssetLoadContext.ts#L65"},"SceneTree/AssetLoadContext.ts:65")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"emit"},"emit"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"emit"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"eventName"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"event?"),"): ",(0,r.kt)("inlineCode",{parentName:"p"},"void")),(0,r.kt)("p",null,"Triggers all listener functions in an event."),(0,r.kt)("h4",{id:"parameters-3"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"eventName")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:"left"},"The name of the event.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"event")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"../Utilities/Utilities_BaseEvent.BaseEvent"},(0,r.kt)("inlineCode",{parentName:"a"},"BaseEvent"))),(0,r.kt)("td",{parentName:"tr",align:"left"},"The data you want to pass down to all listener functions as parameter.")))),(0,r.kt)("h4",{id:"returns-3"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"void")),(0,r.kt)("h4",{id:"inherited-from-2"},"Inherited from"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,r.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter#emit"},"emit")),(0,r.kt)("h4",{id:"defined-in-18"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/339201283/src/Utilities/EventEmitter.ts#L154"},"Utilities/EventEmitter.ts:154")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"getclassname"},"getClassName"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"getClassName"),"(): ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("p",null,"Returns the unmangled name of the class."),(0,r.kt)("h4",{id:"returns-4"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The name of the class definition.")),(0,r.kt)("h4",{id:"inherited-from-3"},"Inherited from"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,r.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter#getclassname"},"getClassName")),(0,r.kt)("h4",{id:"defined-in-19"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/339201283/src/Utilities/BaseClass.ts#L33"},"Utilities/BaseClass.ts:33")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"getid"},"getId"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"getId"),"(): ",(0,r.kt)("inlineCode",{parentName:"p"},"number")),(0,r.kt)("p",null,"Every instance of each class based on BaseClass is assigned a unique number.\nThis number is not persistent in between different loads of a scene.\nReturns the unique id of the object."),(0,r.kt)("h4",{id:"returns-5"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"number")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The Id of the object.")),(0,r.kt)("h4",{id:"inherited-from-4"},"Inherited from"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,r.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter#getid"},"getId")),(0,r.kt)("h4",{id:"defined-in-20"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/339201283/src/Utilities/BaseClass.ts#L25"},"Utilities/BaseClass.ts:25")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"incrementasync"},"incrementAsync"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"incrementAsync"),"(): ",(0,r.kt)("inlineCode",{parentName:"p"},"void")),(0,r.kt)("p",null,"During loading, asynchronous processes may be launched, and subsequently completed.\nThese method helps the Asset track how many asynchronous loading operations may be\noccurring with the tree during load.\nAs each external reference starts to load, it increments this counter, letting the owning\nAsset know to wait till the children are loaded before emitting its own 'loaded' event."),(0,r.kt)("h4",{id:"returns-6"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"void")),(0,r.kt)("h4",{id:"defined-in-21"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/339201283/src/SceneTree/AssetLoadContext.ts#L57"},"SceneTree/AssetLoadContext.ts:57")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"off"},"off"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"off"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"eventName"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"listener?"),"): ",(0,r.kt)("inlineCode",{parentName:"p"},"void")),(0,r.kt)("p",null,"Removes a listener function from the specified event, using either the function or the index id. Depends on what is passed in."),(0,r.kt)("h4",{id:"parameters-4"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"eventName")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:"left"},"The name of the event.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"listener?")),(0,r.kt)("td",{parentName:"tr",align:"left"},"(",(0,r.kt)("inlineCode",{parentName:"td"},"event"),": ",(0,r.kt)("inlineCode",{parentName:"td"},"any"),") => ",(0,r.kt)("inlineCode",{parentName:"td"},"void")),(0,r.kt)("td",{parentName:"tr",align:"left"},"The listener function or the id number.")))),(0,r.kt)("h4",{id:"returns-7"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"void")),(0,r.kt)("h4",{id:"inherited-from-5"},"Inherited from"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,r.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter#off"},"off")),(0,r.kt)("h4",{id:"defined-in-22"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/339201283/src/Utilities/EventEmitter.ts#L97"},"Utilities/EventEmitter.ts:97")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"on"},"on"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"on"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"eventName"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"listener?"),"): ",(0,r.kt)("inlineCode",{parentName:"p"},"number")),(0,r.kt)("p",null,"Adds a listener function for a given event name."),(0,r.kt)("h4",{id:"parameters-5"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"eventName")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:"left"},"The name of the event.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"listener?")),(0,r.kt)("td",{parentName:"tr",align:"left"},"(",(0,r.kt)("inlineCode",{parentName:"td"},"event"),": ",(0,r.kt)("inlineCode",{parentName:"td"},"any"),") => ",(0,r.kt)("inlineCode",{parentName:"td"},"void")),(0,r.kt)("td",{parentName:"tr",align:"left"},"The listener function(callback).")))),(0,r.kt)("h4",{id:"returns-8"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"number")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"the id that can be used to remove the listener.")),(0,r.kt)("h4",{id:"inherited-from-6"},"Inherited from"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,r.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter#on"},"on")),(0,r.kt)("h4",{id:"defined-in-23"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/339201283/src/Utilities/EventEmitter.ts#L44"},"Utilities/EventEmitter.ts:44")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"once"},"once"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"once"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"eventName"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"listener"),"): ",(0,r.kt)("inlineCode",{parentName:"p"},"number")),(0,r.kt)("p",null,"Similar to the ",(0,r.kt)("inlineCode",{parentName:"p"},"on")," method with the difference that when the event is triggered,\nit is automatically unregistered meaning that the event listener will be triggered at most one time."),(0,r.kt)("p",null,"Useful for events that we expect to trigger one time, such as when assets load."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"const asset = new Asset();\nasset.once('loaded', () => {\n  console.log(\"Yay! the asset is loaded\")\n})\n")),(0,r.kt)("h4",{id:"parameters-6"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"eventName")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:"left"},"The eventName value")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"listener")),(0,r.kt)("td",{parentName:"tr",align:"left"},"(",(0,r.kt)("inlineCode",{parentName:"td"},"event"),": ",(0,r.kt)("a",{parentName:"td",href:"../Utilities/Utilities_BaseEvent.BaseEvent"},(0,r.kt)("inlineCode",{parentName:"a"},"BaseEvent")),") => ",(0,r.kt)("inlineCode",{parentName:"td"},"void")),(0,r.kt)("td",{parentName:"tr",align:"left"},"The listener value")))),(0,r.kt)("h4",{id:"returns-9"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"number")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"the id that can be used to remove the listener.")),(0,r.kt)("h4",{id:"inherited-from-7"},"Inherited from"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,r.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter#once"},"once")),(0,r.kt)("h4",{id:"defined-in-24"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/339201283/src/Utilities/EventEmitter.ts#L82"},"Utilities/EventEmitter.ts:82")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"removelistenerbyid"},"removeListenerById"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"removeListenerById"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"eventName"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"id"),"): ",(0,r.kt)("inlineCode",{parentName:"p"},"void")),(0,r.kt)("p",null,"remove listener by ID returned from #on"),(0,r.kt)("h4",{id:"parameters-7"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"eventName")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:"left"},"The name of the event.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"id")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"number")),(0,r.kt)("td",{parentName:"tr",align:"left"},"The id returned by addListener")))),(0,r.kt)("h4",{id:"returns-10"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"void")),(0,r.kt)("h4",{id:"inherited-from-8"},"Inherited from"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,r.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter#removelistenerbyid"},"removeListenerById")),(0,r.kt)("h4",{id:"defined-in-25"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/339201283/src/Utilities/EventEmitter.ts#L134"},"Utilities/EventEmitter.ts:134")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"resolvepath"},"resolvePath"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"resolvePath"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"path"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"onSucceed"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"onFail"),"): ",(0,r.kt)("inlineCode",{parentName:"p"},"void")),(0,r.kt)("p",null,"Resolves a path within the loading asset. This is used to connect\nitems within the tree to other items. e.g. a Group can find its members.\nor an instance can find its source tree."),(0,r.kt)("h4",{id:"parameters-8"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"path")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"string"),"[]"),(0,r.kt)("td",{parentName:"tr",align:"left"},"the path within the tree relative to the loading asset")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"onSucceed")),(0,r.kt)("td",{parentName:"tr",align:"left"},"(",(0,r.kt)("inlineCode",{parentName:"td"},"result"),": ",(0,r.kt)("a",{parentName:"td",href:"SceneTree_BaseItem.BaseItem"},(0,r.kt)("inlineCode",{parentName:"a"},"BaseItem"))," ","|"," ",(0,r.kt)("a",{parentName:"td",href:"Parameters/SceneTree_Parameters_Parameter.Parameter"},(0,r.kt)("inlineCode",{parentName:"a"},"Parameter")),"<",(0,r.kt)("inlineCode",{parentName:"td"},"any"),">",") => ",(0,r.kt)("inlineCode",{parentName:"td"},"void")),(0,r.kt)("td",{parentName:"tr",align:"left"},"called with the successful result of the path resolution.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"onFail")),(0,r.kt)("td",{parentName:"tr",align:"left"},"(",(0,r.kt)("inlineCode",{parentName:"td"},"e"),": ",(0,r.kt)("inlineCode",{parentName:"td"},"Error"),") => ",(0,r.kt)("inlineCode",{parentName:"td"},"void")),(0,r.kt)("td",{parentName:"tr",align:"left"},"called when the path resolution fails.")))),(0,r.kt)("h4",{id:"returns-11"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"void")),(0,r.kt)("h4",{id:"defined-in-26"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/339201283/src/SceneTree/AssetLoadContext.ts#L81"},"SceneTree/AssetLoadContext.ts:81")))}k.isMDXComponent=!0}}]);