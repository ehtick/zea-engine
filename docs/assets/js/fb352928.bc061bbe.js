"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[6101],{3905:function(e,t,n){n.d(t,{Zo:function(){return o},kt:function(){return u}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},o=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},k=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,o=d(e,["components","mdxType","originalType","parentName"]),k=s(n),u=a,h=k["".concat(p,".").concat(u)]||k[u]||m[u]||i;return n?r.createElement(h,l(l({ref:t},o),{},{components:n})):r.createElement(h,l({ref:t},o))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,l=new Array(i);l[0]=k;var d={};for(var p in t)hasOwnProperty.call(t,p)&&(d[p]=t[p]);d.originalType=e,d.mdxType="string"==typeof e?e:a,l[1]=d;for(var s=2;s<i;s++)l[s]=n[s];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}k.displayName="MDXCreateElement"},7927:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return d},contentTitle:function(){return p},metadata:function(){return s},toc:function(){return o},default:function(){return k}});var r=n(7462),a=n(3366),i=(n(7294),n(3905)),l=["components"],d={id:"SceneTree_RefCounted.RefCounted",title:"Class: RefCounted",sidebar_label:"RefCounted",custom_edit_url:null},p=void 0,s={unversionedId:"API/SceneTree/SceneTree_RefCounted.RefCounted",id:"API/SceneTree/SceneTree_RefCounted.RefCounted",isDocsHomePage:!1,title:"Class: RefCounted",description:"Class representing a ref counted object. RefCounted",source:"@site/docs/API/SceneTree/RefCounted.md",sourceDirName:"API/SceneTree",slug:"/API/SceneTree/SceneTree_RefCounted.RefCounted",permalink:"/zea-engine/API/SceneTree/SceneTree_RefCounted.RefCounted",editUrl:null,tags:[],version:"current",frontMatter:{id:"SceneTree_RefCounted.RefCounted",title:"Class: RefCounted",sidebar_label:"RefCounted",custom_edit_url:null},sidebar:"apiSidebar",previous:{title:"ParameterOwner",permalink:"/zea-engine/API/SceneTree/SceneTree_ParameterOwner.ParameterOwner"},next:{title:"ResourceLoader",permalink:"/zea-engine/API/SceneTree/SceneTree_resourceLoader.ResourceLoader"}},o=[{value:"Hierarchy",id:"hierarchy",children:[]},{value:"Constructors",id:"constructors",children:[{value:"constructor",id:"constructor",children:[]}]},{value:"Properties",id:"properties",children:[{value:"__destroyed",id:"__destroyed",children:[]},{value:"__id",id:"__id",children:[]},{value:"__refs",id:"__refs",children:[]},{value:"listeners",id:"listeners",children:[]}]},{value:"Methods",id:"methods",children:[{value:"addRef",id:"addref",children:[]},{value:"destroy",id:"destroy",children:[]},{value:"emit",id:"emit",children:[]},{value:"getClassName",id:"getclassname",children:[]},{value:"getId",id:"getid",children:[]},{value:"getRefIndex",id:"getrefindex",children:[]},{value:"getRefer",id:"getrefer",children:[]},{value:"isDestroyed",id:"isdestroyed",children:[]},{value:"numRefs",id:"numrefs",children:[]},{value:"off",id:"off",children:[]},{value:"on",id:"on",children:[]},{value:"once",id:"once",children:[]},{value:"removeListenerById",id:"removelistenerbyid",children:[]},{value:"removeRef",id:"removeref",children:[]}]}],m={toc:o};function k(e){var t=e.components,n=(0,a.Z)(e,l);return(0,i.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Class representing a ref counted object. RefCounted\nobjects track ownership and allow explicit cleanup\nof resources. This is necessary when JavaScript\nobjects own references to GPU resources that need to\nbe cleaned up when the JavaScript object is destroyed."),(0,i.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter"},(0,i.kt)("inlineCode",{parentName:"a"},"EventEmitter"))),(0,i.kt)("p",{parentName:"li"},"\u21b3 ",(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"RefCounted"))),(0,i.kt)("p",{parentName:"li"},"\u21b3\u21b3 ",(0,i.kt)("a",{parentName:"p",href:"../Renderer/Drawing/Renderer_Drawing_GLGeom.GLGeom"},(0,i.kt)("inlineCode",{parentName:"a"},"GLGeom"))),(0,i.kt)("p",{parentName:"li"},"\u21b3\u21b3 ",(0,i.kt)("a",{parentName:"p",href:"../Renderer/Renderer_GLTexture2D.GLTexture2D"},(0,i.kt)("inlineCode",{parentName:"a"},"GLTexture2D"))))),(0,i.kt)("h2",{id:"constructors"},"Constructors"),(0,i.kt)("h3",{id:"constructor"},"constructor"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"new RefCounted"),"()"),(0,i.kt)("p",null,"Create a ref counted object."),(0,i.kt)("h4",{id:"overrides"},"Overrides"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter#constructor"},"constructor")),(0,i.kt)("h4",{id:"defined-in"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/RefCounted.ts#L19"},"SceneTree/RefCounted.ts:19")),(0,i.kt)("h2",{id:"properties"},"Properties"),(0,i.kt)("h3",{id:"__destroyed"},"_","_","destroyed"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,i.kt)("strong",{parentName:"p"},"_","_","destroyed"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/RefCounted.ts#L15"},"SceneTree/RefCounted.ts:15")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"__id"},"_","_","id"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,i.kt)("strong",{parentName:"p"},"_","_","id"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("h4",{id:"inherited-from"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter#__id"},"__id")),(0,i.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/BaseClass.ts#L11"},"Utilities/BaseClass.ts:11")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"__refs"},"_","_","refs"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,i.kt)("strong",{parentName:"p"},"_","_","refs"),": ",(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_BaseClass.BaseClass"},(0,i.kt)("inlineCode",{parentName:"a"},"BaseClass")),"[]"),(0,i.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/RefCounted.ts#L14"},"SceneTree/RefCounted.ts:14")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"listeners"},"listeners"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"listeners"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"Record"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"string"),", (",(0,i.kt)("inlineCode",{parentName:"p"},"event"),": ",(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_BaseEvent.BaseEvent"},(0,i.kt)("inlineCode",{parentName:"a"},"BaseEvent")),") => ",(0,i.kt)("inlineCode",{parentName:"p"},"void"),"[]",">"," = ",(0,i.kt)("inlineCode",{parentName:"p"},"{}")),(0,i.kt)("h4",{id:"inherited-from-1"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter#listeners"},"listeners")),(0,i.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/EventEmitter.ts#L26"},"Utilities/EventEmitter.ts:26")),(0,i.kt)("h2",{id:"methods"},"Methods"),(0,i.kt)("h3",{id:"addref"},"addRef"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"addRef"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"referer"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("p",null,"The addRef method."),(0,i.kt)("h4",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"referer")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"../Utilities/Utilities_BaseClass.BaseClass"},(0,i.kt)("inlineCode",{parentName:"a"},"BaseClass"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The referer value.")))),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The return value.")),(0,i.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/RefCounted.ts#L51"},"SceneTree/RefCounted.ts:51")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"destroy"},"destroy"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"destroy"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"The destroy method is invoked when the last owner\nis removed from a RefCounted object. Derived objects can\noverride this method to perform explicit cleanup.\nThe destructing signal is triggered so observers can\nrespond to this objects destruction."),(0,i.kt)("h4",{id:"returns-1"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/RefCounted.ts#L108"},"SceneTree/RefCounted.ts:108")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"emit"},"emit"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"emit"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"eventName"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"event?"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Triggers all listener functions in an event."),(0,i.kt)("h4",{id:"parameters-1"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"eventName")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The name of the event.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"event")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"../Utilities/Utilities_BaseEvent.BaseEvent"},(0,i.kt)("inlineCode",{parentName:"a"},"BaseEvent"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The data you want to pass down to all listener functions as parameter.")))),(0,i.kt)("h4",{id:"returns-2"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"inherited-from-2"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter#emit"},"emit")),(0,i.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/EventEmitter.ts#L154"},"Utilities/EventEmitter.ts:154")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"getclassname"},"getClassName"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"getClassName"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("p",null,"Returns the unmangled name of the class."),(0,i.kt)("h4",{id:"returns-3"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The name of the class definition.")),(0,i.kt)("h4",{id:"inherited-from-3"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter#getclassname"},"getClassName")),(0,i.kt)("h4",{id:"defined-in-8"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/BaseClass.ts#L33"},"Utilities/BaseClass.ts:33")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"getid"},"getId"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"getId"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("p",null,"Returns the unique id of the object. Every Object has a unique\nidentifier which is based on a counter that is incremented."),(0,i.kt)("h4",{id:"returns-4"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The return value.")),(0,i.kt)("h4",{id:"overrides-1"},"Overrides"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter#getid"},"getId")),(0,i.kt)("h4",{id:"defined-in-9"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/RefCounted.ts#L34"},"SceneTree/RefCounted.ts:34")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"getrefindex"},"getRefIndex"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"getRefIndex"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"referer"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("p",null,"The getRefIndex method."),(0,i.kt)("h4",{id:"parameters-2"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"referer")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"../Utilities/Utilities_BaseClass.BaseClass"},(0,i.kt)("inlineCode",{parentName:"a"},"BaseClass"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The referer value.")))),(0,i.kt)("h4",{id:"returns-5"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The return value.")),(0,i.kt)("h4",{id:"defined-in-10"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/RefCounted.ts#L89"},"SceneTree/RefCounted.ts:89")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"getrefer"},"getRefer"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"getRefer"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"index"),"): ",(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_BaseClass.BaseClass"},(0,i.kt)("inlineCode",{parentName:"a"},"BaseClass"))),(0,i.kt)("p",null,"The getRefer method."),(0,i.kt)("h4",{id:"parameters-3"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"index")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"number")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The index value.")))),(0,i.kt)("h4",{id:"returns-6"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_BaseClass.BaseClass"},(0,i.kt)("inlineCode",{parentName:"a"},"BaseClass"))),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The return value.")),(0,i.kt)("h4",{id:"defined-in-11"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/RefCounted.ts#L80"},"SceneTree/RefCounted.ts:80")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"isdestroyed"},"isDestroyed"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"isDestroyed"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("p",null,"Returns true if this object has already been destroyed."),(0,i.kt)("h4",{id:"returns-7"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Returns true or false.")),(0,i.kt)("h4",{id:"defined-in-12"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/RefCounted.ts#L97"},"SceneTree/RefCounted.ts:97")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"numrefs"},"numRefs"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"numRefs"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("p",null,"The numRefs method."),(0,i.kt)("h4",{id:"returns-8"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The return value.")),(0,i.kt)("h4",{id:"defined-in-13"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/RefCounted.ts#L42"},"SceneTree/RefCounted.ts:42")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"off"},"off"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"off"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"eventName"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"listener?"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Removes a listener function from the specified event, using either the function or the index id. Depends on what is passed in."),(0,i.kt)("h4",{id:"parameters-4"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"eventName")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The name of the event.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"listener?")),(0,i.kt)("td",{parentName:"tr",align:"left"},"(",(0,i.kt)("inlineCode",{parentName:"td"},"event"),": ",(0,i.kt)("inlineCode",{parentName:"td"},"any"),") => ",(0,i.kt)("inlineCode",{parentName:"td"},"void")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The listener function or the id number.")))),(0,i.kt)("h4",{id:"returns-9"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"inherited-from-4"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter#off"},"off")),(0,i.kt)("h4",{id:"defined-in-14"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/EventEmitter.ts#L97"},"Utilities/EventEmitter.ts:97")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"on"},"on"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"on"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"eventName"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"listener?"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("p",null,"Adds a listener function for a given event name."),(0,i.kt)("h4",{id:"parameters-5"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"eventName")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The name of the event.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"listener?")),(0,i.kt)("td",{parentName:"tr",align:"left"},"(",(0,i.kt)("inlineCode",{parentName:"td"},"event"),": ",(0,i.kt)("inlineCode",{parentName:"td"},"any"),") => ",(0,i.kt)("inlineCode",{parentName:"td"},"void")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The listener function(callback).")))),(0,i.kt)("h4",{id:"returns-10"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"the id that can be used to remove the listener.")),(0,i.kt)("h4",{id:"inherited-from-5"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter#on"},"on")),(0,i.kt)("h4",{id:"defined-in-15"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/EventEmitter.ts#L44"},"Utilities/EventEmitter.ts:44")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"once"},"once"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"once"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"eventName"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"listener"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("p",null,"Similar to the ",(0,i.kt)("inlineCode",{parentName:"p"},"on")," method with the difference that when the event is triggered,\nit is automatically unregistered meaning that the event listener will be triggered at most one time."),(0,i.kt)("p",null,"Useful for events that we expect to trigger one time, such as when assets load."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"const asset = new Asset();\nasset.once('loaded', () => {\n  console.log(\"Yay! the asset is loaded\")\n})\n")),(0,i.kt)("h4",{id:"parameters-6"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"eventName")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The eventName value")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"listener")),(0,i.kt)("td",{parentName:"tr",align:"left"},"(",(0,i.kt)("inlineCode",{parentName:"td"},"event"),": ",(0,i.kt)("a",{parentName:"td",href:"../Utilities/Utilities_BaseEvent.BaseEvent"},(0,i.kt)("inlineCode",{parentName:"a"},"BaseEvent")),") => ",(0,i.kt)("inlineCode",{parentName:"td"},"void")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The listener value")))),(0,i.kt)("h4",{id:"returns-11"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"the id that can be used to remove the listener.")),(0,i.kt)("h4",{id:"inherited-from-6"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter#once"},"once")),(0,i.kt)("h4",{id:"defined-in-16"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/EventEmitter.ts#L82"},"Utilities/EventEmitter.ts:82")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"removelistenerbyid"},"removeListenerById"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"removeListenerById"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"eventName"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"id"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"remove listener by ID returned from #on"),(0,i.kt)("h4",{id:"parameters-7"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"eventName")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The name of the event.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"id")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"number")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The id returned by addListener")))),(0,i.kt)("h4",{id:"returns-12"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"inherited-from-7"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter#removelistenerbyid"},"removeListenerById")),(0,i.kt)("h4",{id:"defined-in-17"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/EventEmitter.ts#L134"},"Utilities/EventEmitter.ts:134")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"removeref"},"removeRef"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"removeRef"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"referer"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"The removeRef method."),(0,i.kt)("h4",{id:"parameters-8"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"referer")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"../Utilities/Utilities_BaseClass.BaseClass"},(0,i.kt)("inlineCode",{parentName:"a"},"BaseClass"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The referer value.")))),(0,i.kt)("h4",{id:"returns-13"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-18"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/RefCounted.ts#L64"},"SceneTree/RefCounted.ts:64")))}k.isMDXComponent=!0}}]);