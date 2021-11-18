"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[7039],{3905:function(t,e,n){n.d(e,{Zo:function(){return m},kt:function(){return k}});var a=n(7294);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function p(t,e){if(null==t)return{};var n,a,r=function(t,e){if(null==t)return{};var n,a,r={},i=Object.keys(t);for(a=0;a<i.length;a++)n=i[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(a=0;a<i.length;a++)n=i[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var o=a.createContext({}),u=function(t){var e=a.useContext(o),n=e;return t&&(n="function"==typeof t?t(e):l(l({},e),t)),n},m=function(t){var e=u(t.components);return a.createElement(o.Provider,{value:e},t.children)},s={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},d=a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,i=t.originalType,o=t.parentName,m=p(t,["components","mdxType","originalType","parentName"]),d=u(n),k=r,h=d["".concat(o,".").concat(k)]||d[k]||s[k]||i;return n?a.createElement(h,l(l({ref:e},m),{},{components:n})):a.createElement(h,l({ref:e},m))}));function k(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var i=n.length,l=new Array(i);l[0]=d;var p={};for(var o in e)hasOwnProperty.call(e,o)&&(p[o]=e[o]);p.originalType=t,p.mdxType="string"==typeof t?t:r,l[1]=p;for(var u=2;u<i;u++)l[u]=n[u];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},3106:function(t,e,n){n.r(e),n.d(e,{frontMatter:function(){return p},contentTitle:function(){return o},metadata:function(){return u},toc:function(){return m},default:function(){return d}});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),l=["components"],p={id:"Math_Frustum.Frustum",title:"Class: Frustum",sidebar_label:"Frustum",custom_edit_url:null},o=void 0,u={unversionedId:"API/Math/Math_Frustum.Frustum",id:"API/Math/Math_Frustum.Frustum",isDocsHomePage:!1,title:"Class: Frustum",description:"Class representing a Frustum. Frustums are used to determine what",source:"@site/docs/API/Math/Frustum.md",sourceDirName:"API/Math",slug:"/API/Math/Math_Frustum.Frustum",permalink:"/zea-engine/API/Math/Math_Frustum.Frustum",editUrl:null,tags:[],version:"current",frontMatter:{id:"Math_Frustum.Frustum",title:"Class: Frustum",sidebar_label:"Frustum",custom_edit_url:null},sidebar:"apiSidebar",previous:{title:"EulerAngles",permalink:"/zea-engine/API/Math/Math_EulerAngles.EulerAngles"},next:{title:"Mat3",permalink:"/zea-engine/API/Math/Math_Mat3.Mat3"}},m=[{value:"Constructors",id:"constructors",children:[{value:"constructor",id:"constructor",children:[]}]},{value:"Properties",id:"properties",children:[{value:"planes",id:"planes",children:[]}]},{value:"Methods",id:"methods",children:[{value:"fromJSON",id:"fromjson",children:[]},{value:"intersectsBox",id:"intersectsbox",children:[]},{value:"setFromMatrix",id:"setfrommatrix",children:[]},{value:"toJSON",id:"tojson",children:[]},{value:"toString",id:"tostring",children:[]}]}],s={toc:m};function d(t){var e=t.components,n=(0,r.Z)(t,l);return(0,i.kt)("wrapper",(0,a.Z)({},s,n,{components:e,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Class representing a Frustum. Frustums are used to determine what\nis inside the camera's field of view."),(0,i.kt)("h2",{id:"constructors"},"Constructors"),(0,i.kt)("h3",{id:"constructor"},"constructor"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"new Frustum"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"p0"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"p1"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"p2"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"p3"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"p4"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"p5"),")"),(0,i.kt)("p",null,"Create a Frustum"),(0,i.kt)("h4",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"p0")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_PlaneType.PlaneType"},(0,i.kt)("inlineCode",{parentName:"a"},"PlaneType"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"the p0 value.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"p1")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_PlaneType.PlaneType"},(0,i.kt)("inlineCode",{parentName:"a"},"PlaneType"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"the p1 value.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"p2")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_PlaneType.PlaneType"},(0,i.kt)("inlineCode",{parentName:"a"},"PlaneType"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"the p2 value.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"p3")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_PlaneType.PlaneType"},(0,i.kt)("inlineCode",{parentName:"a"},"PlaneType"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"the p3 value.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"p4")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_PlaneType.PlaneType"},(0,i.kt)("inlineCode",{parentName:"a"},"PlaneType"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"the p4 value.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"p5")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_PlaneType.PlaneType"},(0,i.kt)("inlineCode",{parentName:"a"},"PlaneType"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"the p5 value.")))),(0,i.kt)("h4",{id:"defined-in"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Math/Frustum.ts#L25"},"Math/Frustum.ts:25")),(0,i.kt)("h2",{id:"properties"},"Properties"),(0,i.kt)("h3",{id:"planes"},"planes"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"planes"),": ",(0,i.kt)("a",{parentName:"p",href:"Math_PlaneType.PlaneType"},(0,i.kt)("inlineCode",{parentName:"a"},"PlaneType")),"[]"),(0,i.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Math/Frustum.ts#L15"},"Math/Frustum.ts:15")),(0,i.kt)("h2",{id:"methods"},"Methods"),(0,i.kt)("h3",{id:"fromjson"},"fromJSON"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"fromJSON"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"j"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"The fromJSON method decodes a json object for this type."),(0,i.kt)("h4",{id:"parameters-1"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"j")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Record"),"<",(0,i.kt)("inlineCode",{parentName:"td"},"string"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"any"),">"),(0,i.kt)("td",{parentName:"tr",align:"left"},"The json object.")))),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Math/Frustum.ts#L101"},"Math/Frustum.ts:101")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"intersectsbox"},"intersectsBox"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"intersectsBox"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"box3"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("p",null,"Tests a box to see if it is entirely within the frustum."),(0,i.kt)("h4",{id:"parameters-2"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"box3")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_Box3.Box3"},(0,i.kt)("inlineCode",{parentName:"a"},"Box3"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The box to test.")))),(0,i.kt)("h4",{id:"returns-1"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"True if the frustum intersects the box.")),(0,i.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Math/Frustum.ts#L59"},"Math/Frustum.ts:59")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"setfrommatrix"},"setFromMatrix"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"setFromMatrix"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"mat4"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"The setFromMatrix configures a Frustum object using a matrix.\nTypically the matrix is a model view projection matrix."),(0,i.kt)("h4",{id:"parameters-3"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"mat4")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_Mat4.Mat4"},(0,i.kt)("inlineCode",{parentName:"a"},"Mat4"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The matrix to use.")))),(0,i.kt)("h4",{id:"returns-2"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Math/Frustum.ts#L41"},"Math/Frustum.ts:41")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"tojson"},"toJSON"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"toJSON"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"Record"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"unknown"),">"),(0,i.kt)("p",null,"The toJSON method encodes this type as a json object for persistence."),(0,i.kt)("h4",{id:"returns-3"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Record"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"unknown"),">"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The json object.")),(0,i.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Math/Frustum.ts#L85"},"Math/Frustum.ts:85")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"tostring"},"toString"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"toString"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("p",null,"Calls ",(0,i.kt)("inlineCode",{parentName:"p"},"toJSON")," method and stringifies it."),(0,i.kt)("h4",{id:"returns-4"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The return value.")),(0,i.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Math/Frustum.ts#L115"},"Math/Frustum.ts:115")))}d.isMDXComponent=!0}}]);