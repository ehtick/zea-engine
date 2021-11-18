"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[6709],{3905:function(t,e,a){a.d(e,{Zo:function(){return d},kt:function(){return s}});var n=a(7294);function r(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function i(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function l(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?i(Object(a),!0).forEach((function(e){r(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function o(t,e){if(null==t)return{};var a,n,r=function(t,e){if(null==t)return{};var a,n,r={},i=Object.keys(t);for(n=0;n<i.length;n++)a=i[n],e.indexOf(a)>=0||(r[a]=t[a]);return r}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(n=0;n<i.length;n++)a=i[n],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(r[a]=t[a])}return r}var p=n.createContext({}),k=function(t){var e=n.useContext(p),a=e;return t&&(a="function"==typeof t?t(e):l(l({},e),t)),a},d=function(t){var e=k(t.components);return n.createElement(p.Provider,{value:e},t.children)},m={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},h=n.forwardRef((function(t,e){var a=t.components,r=t.mdxType,i=t.originalType,p=t.parentName,d=o(t,["components","mdxType","originalType","parentName"]),h=k(a),s=r,f=h["".concat(p,".").concat(s)]||h[s]||m[s]||i;return a?n.createElement(f,l(l({ref:e},d),{},{components:a})):n.createElement(f,l({ref:e},d))}));function s(t,e){var a=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var i=a.length,l=new Array(i);l[0]=h;var o={};for(var p in e)hasOwnProperty.call(e,p)&&(o[p]=e[p]);o.originalType=t,o.mdxType="string"==typeof t?t:r,l[1]=o;for(var k=2;k<i;k++)l[k]=a[k];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}h.displayName="MDXCreateElement"},9382:function(t,e,a){a.r(e),a.d(e,{frontMatter:function(){return o},contentTitle:function(){return p},metadata:function(){return k},toc:function(){return d},default:function(){return h}});var n=a(7462),r=a(3366),i=(a(7294),a(3905)),l=["components"],o={id:"Math_Xfo.Xfo",title:"Class: Xfo",sidebar_label:"Xfo",custom_edit_url:null},p=void 0,k={unversionedId:"API/Math/Math_Xfo.Xfo",id:"API/Math/Math_Xfo.Xfo",isDocsHomePage:!1,title:"Class: Xfo",description:"Class representing an Xfo transform, which is a transformation decomposed into 3 component values. Translation, Orientation, and Scaling.",source:"@site/docs/API/Math/Xfo.md",sourceDirName:"API/Math",slug:"/API/Math/Math_Xfo.Xfo",permalink:"/zea-engine/API/Math/Math_Xfo.Xfo",editUrl:null,tags:[],version:"current",frontMatter:{id:"Math_Xfo.Xfo",title:"Class: Xfo",sidebar_label:"Xfo",custom_edit_url:null},sidebar:"apiSidebar",previous:{title:"Vec4",permalink:"/zea-engine/API/Math/Math_Vec4.Vec4"},next:{title:"GLGeom",permalink:"/zea-engine/API/Renderer/Drawing/Renderer_Drawing_GLGeom.GLGeom"}},d=[{value:"Constructors",id:"constructors",children:[{value:"constructor",id:"constructor",children:[]}]},{value:"Properties",id:"properties",children:[{value:"ori",id:"ori",children:[]},{value:"sc",id:"sc",children:[]},{value:"tr",id:"tr",children:[]}]},{value:"Methods",id:"methods",children:[{value:"approxEqual",id:"approxequal",children:[]},{value:"clone",id:"clone",children:[]},{value:"fromJSON",id:"fromjson",children:[]},{value:"inverse",id:"inverse",children:[]},{value:"isEqual",id:"isequal",children:[]},{value:"isIdentity",id:"isidentity",children:[]},{value:"multiply",id:"multiply",children:[]},{value:"readBinary",id:"readbinary",children:[]},{value:"set",id:"set",children:[]},{value:"setFromFloat32Array",id:"setfromfloat32array",children:[]},{value:"setFromMat4",id:"setfrommat4",children:[]},{value:"setFromOther",id:"setfromother",children:[]},{value:"setLookAt",id:"setlookat",children:[]},{value:"toJSON",id:"tojson",children:[]},{value:"toMat4",id:"tomat4",children:[]},{value:"toString",id:"tostring",children:[]},{value:"transformVec3",id:"transformvec3",children:[]}]}],m={toc:d};function h(t){var e=t.components,a=(0,r.Z)(t,l);return(0,i.kt)("wrapper",(0,n.Z)({},m,a,{components:e,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Class representing an Xfo transform, which is a transformation decomposed into 3 component values. Translation, Orientation, and Scaling."),(0,i.kt)("h2",{id:"constructors"},"Constructors"),(0,i.kt)("h3",{id:"constructor"},"constructor"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"new Xfo"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"tr?"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"ori?"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"sc?"),")"),(0,i.kt)("p",null,"Initializes the Xfo object."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Note:")," You can leave it empty and use other methods ti set the state of the class."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"see"))," ",(0,i.kt)("a",{parentName:"p",href:"#setFromOther"},(0,i.kt)("inlineCode",{parentName:"a"},"setFromOther"))," ",(0,i.kt)("a",{parentName:"p",href:"#setFromMat4"},(0,i.kt)("inlineCode",{parentName:"a"},"setFromMat4"))," ",(0,i.kt)("a",{parentName:"p",href:"#setFromFloat32Array"},(0,i.kt)("inlineCode",{parentName:"a"},"setFromFloat32Array"))," ",(0,i.kt)("a",{parentName:"p",href:"#fromJSON"},(0,i.kt)("inlineCode",{parentName:"a"},"fromJSON"))),(0,i.kt)("h4",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"tr?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Float32Array")," ","|"," ",(0,i.kt)("a",{parentName:"td",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))," ","|"," ",(0,i.kt)("a",{parentName:"td",href:"Math_Quat.Quat"},(0,i.kt)("inlineCode",{parentName:"a"},"Quat"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The translation value.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"ori?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_Quat.Quat"},(0,i.kt)("inlineCode",{parentName:"a"},"Quat"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The orientation value.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"sc?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The scaling value.")))),(0,i.kt)("h4",{id:"defined-in"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Math/Xfo.ts#L27"},"Math/Xfo.ts:27")),(0,i.kt)("h2",{id:"properties"},"Properties"),(0,i.kt)("h3",{id:"ori"},"ori"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"ori"),": ",(0,i.kt)("a",{parentName:"p",href:"Math_Quat.Quat"},(0,i.kt)("inlineCode",{parentName:"a"},"Quat"))),(0,i.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Math/Xfo.ts#L12"},"Math/Xfo.ts:12")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"sc"},"sc"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"sc"),": ",(0,i.kt)("a",{parentName:"p",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Math/Xfo.ts#L13"},"Math/Xfo.ts:13")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"tr"},"tr"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"tr"),": ",(0,i.kt)("a",{parentName:"p",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Math/Xfo.ts#L14"},"Math/Xfo.ts:14")),(0,i.kt)("h2",{id:"methods"},"Methods"),(0,i.kt)("h3",{id:"approxequal"},"approxEqual"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"approxEqual"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"other"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"precision?"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("p",null,"Returns true if this Vec2 is approximately the same as other."),(0,i.kt)("h4",{id:"parameters-1"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Default value"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"other")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_Xfo.Xfo"},(0,i.kt)("inlineCode",{parentName:"a"},"Xfo"))),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"undefined")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The other Vec3 to compare with.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"precision")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"number")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Number.EPSILON")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The precision to which the values must match.")))),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Returns true or false.")),(0,i.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Math/Xfo.ts#L105"},"Math/Xfo.ts:105")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"clone"},"clone"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"clone"),"(): ",(0,i.kt)("a",{parentName:"p",href:"Math_Xfo.Xfo"},(0,i.kt)("inlineCode",{parentName:"a"},"Xfo"))),(0,i.kt)("p",null,"Clones this Xfo and returns a new Xfo."),(0,i.kt)("h4",{id:"returns-1"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"Math_Xfo.Xfo"},(0,i.kt)("inlineCode",{parentName:"a"},"Xfo"))),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Returns a new Xfo.")),(0,i.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Math/Xfo.ts#L249"},"Math/Xfo.ts:249")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"fromjson"},"fromJSON"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"fromJSON"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"j"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"The fromJSON method decodes a json object for this type."),(0,i.kt)("h4",{id:"parameters-2"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"j")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Record"),"<",(0,i.kt)("inlineCode",{parentName:"td"},"string"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"any"),">"),(0,i.kt)("td",{parentName:"tr",align:"left"},"The json object.")))),(0,i.kt)("h4",{id:"returns-2"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Math/Xfo.ts#L276"},"Math/Xfo.ts:276")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"inverse"},"inverse"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"inverse"),"(): ",(0,i.kt)("a",{parentName:"p",href:"Math_Xfo.Xfo"},(0,i.kt)("inlineCode",{parentName:"a"},"Xfo"))),(0,i.kt)("p",null,"Returns the inverse of the Xfo object, but returns. the result as a new Xfo."),(0,i.kt)("h4",{id:"returns-3"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"Math_Xfo.Xfo"},(0,i.kt)("inlineCode",{parentName:"a"},"Xfo"))),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Returns a new Xfo.")),(0,i.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Math/Xfo.ts#L158"},"Math/Xfo.ts:158")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"isequal"},"isEqual"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"isEqual"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"other"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("p",null,"Checks if this Vec3 contains the same values as the other Vec3."),(0,i.kt)("h4",{id:"parameters-3"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"other")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_Xfo.Xfo"},(0,i.kt)("inlineCode",{parentName:"a"},"Xfo"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The other Vec3 to compare with.")))),(0,i.kt)("h4",{id:"returns-4"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Returns ",(0,i.kt)("inlineCode",{parentName:"li"},"true")," if are the same Vector, otherwise, ",(0,i.kt)("inlineCode",{parentName:"li"},"false"),".")),(0,i.kt)("h4",{id:"defined-in-8"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Math/Xfo.ts#L94"},"Math/Xfo.ts:94")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"isidentity"},"isIdentity"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"isIdentity"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("p",null,"Verifies that the Xfo object is an ",(0,i.kt)("inlineCode",{parentName:"p"},"identity"),", checking that the translation, orientation and scaling attributes are in their initial state."),(0,i.kt)("h4",{id:"returns-5"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The return value.")),(0,i.kt)("h4",{id:"defined-in-9"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Math/Xfo.ts#L84"},"Math/Xfo.ts:84")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"multiply"},"multiply"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"multiply"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"xfo"),"): ",(0,i.kt)("a",{parentName:"p",href:"Math_Xfo.Xfo"},(0,i.kt)("inlineCode",{parentName:"a"},"Xfo"))),(0,i.kt)("p",null,"Multiplies two Xfo transforms."),(0,i.kt)("h4",{id:"parameters-4"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"xfo")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_Xfo.Xfo"},(0,i.kt)("inlineCode",{parentName:"a"},"Xfo"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The xfo to multiply with.")))),(0,i.kt)("h4",{id:"returns-6"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"Math_Xfo.Xfo"},(0,i.kt)("inlineCode",{parentName:"a"},"Xfo"))),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Returns an Xfo.")),(0,i.kt)("h4",{id:"defined-in-10"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Math/Xfo.ts#L137"},"Math/Xfo.ts:137")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"readbinary"},"readBinary"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"readBinary"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"reader"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Loads the state of the value from a binary reader."),(0,i.kt)("h4",{id:"parameters-5"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"reader")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"../SceneTree/SceneTree_BinReader.BinReader"},(0,i.kt)("inlineCode",{parentName:"a"},"BinReader"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The reader value.")))),(0,i.kt)("h4",{id:"returns-7"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-11"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Math/Xfo.ts#L289"},"Math/Xfo.ts:289")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"set"},"set"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"set"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"tr"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"ori"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"sc?"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Sets the state of the Xfo object."),(0,i.kt)("h4",{id:"parameters-6"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"tr")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The translation value.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"ori")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_Quat.Quat"},(0,i.kt)("inlineCode",{parentName:"a"},"Quat"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The orientation value.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"sc?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The scaling value.")))),(0,i.kt)("h4",{id:"returns-8"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-12"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Math/Xfo.ts#L62"},"Math/Xfo.ts:62")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"setfromfloat32array"},"setFromFloat32Array"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"setFromFloat32Array"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"float32array"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Sets the state of the Xfo object using an ",(0,i.kt)("inlineCode",{parentName:"p"},"Float32array"),"."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Note:")," You can set the byteOffset in your ",(0,i.kt)("inlineCode",{parentName:"p"},"Float32array")," object"),(0,i.kt)("h4",{id:"parameters-7"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"float32array")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Float32Array")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The float32array value.")))),(0,i.kt)("h4",{id:"returns-9"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-13"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Math/Xfo.ts#L222"},"Math/Xfo.ts:222")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"setfrommat4"},"setFromMat4"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"setFromMat4"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"mat4"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Sets the state of the Xfo object using Mat4."),(0,i.kt)("h4",{id:"parameters-8"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"mat4")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_Mat4.Mat4"},(0,i.kt)("inlineCode",{parentName:"a"},"Mat4"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The mat4 value.")))),(0,i.kt)("h4",{id:"returns-10"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-14"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Math/Xfo.ts#L210"},"Math/Xfo.ts:210")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"setfromother"},"setFromOther"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"setFromOther"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"other"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Sets the state of the Xfo object using another Xfo object."),(0,i.kt)("h4",{id:"parameters-9"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"other")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_Xfo.Xfo"},(0,i.kt)("inlineCode",{parentName:"a"},"Xfo"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The other Xfo to set from.")))),(0,i.kt)("h4",{id:"returns-11"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-15"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Math/Xfo.ts#L73"},"Math/Xfo.ts:73")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"setlookat"},"setLookAt"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"setLookAt"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"pos"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"target"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"up"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"The setLookAt method."),(0,i.kt)("h4",{id:"parameters-10"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"pos")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The position value.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"target")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The target value.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"up")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The up value.")))),(0,i.kt)("h4",{id:"returns-12"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-16"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Math/Xfo.ts#L119"},"Math/Xfo.ts:119")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"tojson"},"toJSON"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"toJSON"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"Record"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"any"),">"),(0,i.kt)("p",null,"The toJSON method encodes this type as a json object for persistence."),(0,i.kt)("h4",{id:"returns-13"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Record"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"any"),">"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The json object.")),(0,i.kt)("h4",{id:"defined-in-17"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Math/Xfo.ts#L261"},"Math/Xfo.ts:261")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"tomat4"},"toMat4"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"toMat4"),"(): ",(0,i.kt)("a",{parentName:"p",href:"Math_Mat4.Mat4"},(0,i.kt)("inlineCode",{parentName:"a"},"Mat4"))),(0,i.kt)("p",null,"Converts this Xfo to a Mat4 (a 4x4 matrix)."),(0,i.kt)("h4",{id:"returns-14"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"Math_Mat4.Mat4"},(0,i.kt)("inlineCode",{parentName:"a"},"Mat4"))),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Returns a new Mat4.")),(0,i.kt)("h4",{id:"defined-in-18"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Math/Xfo.ts#L195"},"Math/Xfo.ts:195")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"tostring"},"toString"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"toString"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("p",null,"The fromJSON method decodes a json object for this type."),(0,i.kt)("h4",{id:"returns-15"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The return value.")),(0,i.kt)("h4",{id:"defined-in-19"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Math/Xfo.ts#L300"},"Math/Xfo.ts:300")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"transformvec3"},"transformVec3"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"transformVec3"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"vec3"),"): ",(0,i.kt)("a",{parentName:"p",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("p",null,"Transforms Xfo object using a ",(0,i.kt)("inlineCode",{parentName:"p"},"Vec3")," object. First scaling it, then rotating and finally adding the result to current translation object."),(0,i.kt)("h4",{id:"parameters-11"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"vec3")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The vec3 value.")))),(0,i.kt)("h4",{id:"returns-16"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The return value.")),(0,i.kt)("h4",{id:"defined-in-20"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Math/Xfo.ts#L186"},"Math/Xfo.ts:186")))}h.isMDXComponent=!0}}]);