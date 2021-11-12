"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[8616],{3905:function(e,t,n){n.d(t,{Zo:function(){return k},kt:function(){return m}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),d=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},k=function(e){var t=d(e.components);return a.createElement(o.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,k=p(e,["components","mdxType","originalType","parentName"]),h=d(n),m=r,u=h["".concat(o,".").concat(m)]||h[m]||s[m]||i;return n?a.createElement(u,l(l({ref:t},k),{},{components:n})):a.createElement(u,l({ref:t},k))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=h;var p={};for(var o in t)hasOwnProperty.call(t,o)&&(p[o]=t[o]);p.originalType=e,p.mdxType="string"==typeof e?e:r,l[1]=p;for(var d=2;d<i;d++)l[d]=n[d];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},2382:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return p},contentTitle:function(){return o},metadata:function(){return d},toc:function(){return k},default:function(){return h}});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),l=["components"],p={id:"Math_Box3.Box3",title:"Class: Box3",sidebar_label:"Box3",custom_edit_url:null},o=void 0,d={unversionedId:"API/Math/Math_Box3.Box3",id:"API/Math/Math_Box3.Box3",isDocsHomePage:!1,title:"Class: Box3",description:"Class representing a box in 3D space.",source:"@site/docs/API/Math/Box3.md",sourceDirName:"API/Math",slug:"/API/Math/Math_Box3.Box3",permalink:"/zea-engine/API/Math/Math_Box3.Box3",editUrl:null,tags:[],version:"current",frontMatter:{id:"Math_Box3.Box3",title:"Class: Box3",sidebar_label:"Box3",custom_edit_url:null},sidebar:"apiSidebar",previous:{title:"Box2",permalink:"/zea-engine/API/Math/Math_Box2.Box2"},next:{title:"Color",permalink:"/zea-engine/API/Math/Math_Color.Color"}},k=[{value:"Constructors",id:"constructors",children:[{value:"constructor",id:"constructor",children:[]}]},{value:"Properties",id:"properties",children:[{value:"p0",id:"p0",children:[]},{value:"p1",id:"p1",children:[]}]},{value:"Accessors",id:"accessors",children:[{value:"max",id:"max",children:[]},{value:"min",id:"min",children:[]}]},{value:"Methods",id:"methods",children:[{value:"addBox3",id:"addbox3",children:[]},{value:"addPoint",id:"addpoint",children:[]},{value:"center",id:"center",children:[]},{value:"clone",id:"clone",children:[]},{value:"diagonal",id:"diagonal",children:[]},{value:"fromJSON",id:"fromjson",children:[]},{value:"getBoundingSphere",id:"getboundingsphere",children:[]},{value:"intersectsBox",id:"intersectsbox",children:[]},{value:"intersectsPlane",id:"intersectsplane",children:[]},{value:"intersectsSphere",id:"intersectssphere",children:[]},{value:"isValid",id:"isvalid",children:[]},{value:"reset",id:"reset",children:[]},{value:"set",id:"set",children:[]},{value:"setFromFloat32Array",id:"setfromfloat32array",children:[]},{value:"size",id:"size",children:[]},{value:"toJSON",id:"tojson",children:[]},{value:"toMat4",id:"tomat4",children:[]},{value:"toString",id:"tostring",children:[]}]}],s={toc:k};function h(e){var t=e.components,n=(0,r.Z)(e,l);return(0,i.kt)("wrapper",(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Class representing a box in 3D space.\nRepresents a box in 3D space defined by two Vec3 values which define opposing corners of the box."),(0,i.kt)("h2",{id:"constructors"},"Constructors"),(0,i.kt)("h3",{id:"constructor"},"constructor"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"new Box3"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"p0?"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"p1?"),")"),(0,i.kt)("p",null,"Creates a Box3 object using Vec3s.\nIn case the parameters are not passed by, their values are pre-defined:"),(0,i.kt)("p",null,"p0 is a Vec2 with ",(0,i.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY"},(0,i.kt)("inlineCode",{parentName:"a"},"Number.POSITIVE_INFINITY"))),(0,i.kt)("p",null,"p1 is a Vec2 with ",(0,i.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NEGATIVE_INFINITY"},(0,i.kt)("inlineCode",{parentName:"a"},"Number.NEGATIVE_INFINITY"))),(0,i.kt)("h4",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"p0?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Float32Array")," ","|"," ",(0,i.kt)("a",{parentName:"td",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"A point representing the corners of a 3D box.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"p1?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"A point representing the corners of a 3D box.")))),(0,i.kt)("h4",{id:"defined-in"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Math/Box3.ts#L28"},"Math/Box3.ts:28")),(0,i.kt)("h2",{id:"properties"},"Properties"),(0,i.kt)("h3",{id:"p0"},"p0"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"p0"),": ",(0,i.kt)("a",{parentName:"p",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Math/Box3.ts#L14"},"Math/Box3.ts:14")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"p1"},"p1"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"p1"),": ",(0,i.kt)("a",{parentName:"p",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Math/Box3.ts#L15"},"Math/Box3.ts:15")),(0,i.kt)("h2",{id:"accessors"},"Accessors"),(0,i.kt)("h3",{id:"max"},"max"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"get")," ",(0,i.kt)("strong",{parentName:"p"},"max"),"(): ",(0,i.kt)("a",{parentName:"p",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("p",null,"Getter for the upper (x, y, z) boundary of the box."),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Returns the maximum Vec3.")),(0,i.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Math/Box3.ts#L60"},"Math/Box3.ts:60")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"min"},"min"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"get")," ",(0,i.kt)("strong",{parentName:"p"},"min"),"(): ",(0,i.kt)("a",{parentName:"p",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("p",null,"Getter for the lower (x, y, z) boundary of the box."),(0,i.kt)("h4",{id:"returns-1"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Returns the minimum Vec3.")),(0,i.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Math/Box3.ts#L51"},"Math/Box3.ts:51")),(0,i.kt)("h2",{id:"methods"},"Methods"),(0,i.kt)("h3",{id:"addbox3"},"addBox3"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"addBox3"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"box3"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"transform?"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Adds ",(0,i.kt)("inlineCode",{parentName:"p"},"Box3")," to this ",(0,i.kt)("inlineCode",{parentName:"p"},"Box3"),", of the Xfo instance is passed in the parameters\nit proceeds to apply the transform for the Vec3."),(0,i.kt)("h4",{id:"parameters-1"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"box3")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_Box3.Box3"},(0,i.kt)("inlineCode",{parentName:"a"},"Box3"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"A 3D box.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"transform?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_Xfo.Xfo"},(0,i.kt)("inlineCode",{parentName:"a"},"Xfo"))," ","|"," ",(0,i.kt)("a",{parentName:"td",href:"Math_Mat4.Mat4"},(0,i.kt)("inlineCode",{parentName:"a"},"Mat4"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"-")))),(0,i.kt)("h4",{id:"returns-2"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Math/Box3.ts#L130"},"Math/Box3.ts:130")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"addpoint"},"addPoint"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"addPoint"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"point"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Expands the Box3 to contain the new point."),(0,i.kt)("h4",{id:"parameters-2"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"point")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"A point represents the corners of a 3D box.")))),(0,i.kt)("h4",{id:"returns-3"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Math/Box3.ts#L108"},"Math/Box3.ts:108")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"center"},"center"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"center"),"(): ",(0,i.kt)("a",{parentName:"p",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("p",null,"Returns the center point of a Box3."),(0,i.kt)("h4",{id:"returns-4"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Returns a Vec3.")),(0,i.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Math/Box3.ts#L170"},"Math/Box3.ts:170")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"clone"},"clone"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"clone"),"(): ",(0,i.kt)("a",{parentName:"p",href:"Math_Box3.Box3"},(0,i.kt)("inlineCode",{parentName:"a"},"Box3"))),(0,i.kt)("p",null,"Clones this Box3 and returns a new Box3."),(0,i.kt)("h4",{id:"returns-5"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"Math_Box3.Box3"},(0,i.kt)("inlineCode",{parentName:"a"},"Box3"))),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Returns a new Box3.")),(0,i.kt)("h4",{id:"defined-in-8"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Math/Box3.ts#L276"},"Math/Box3.ts:276")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"diagonal"},"diagonal"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"diagonal"),"(): ",(0,i.kt)("a",{parentName:"p",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("p",null,"Returns the diagonal vector of the B=box from p0 to p1."),(0,i.kt)("h4",{id:"returns-6"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Returns a Box3.")),(0,i.kt)("h4",{id:"defined-in-9"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Math/Box3.ts#L161"},"Math/Box3.ts:161")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"fromjson"},"fromJSON"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"fromJSON"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"j"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Decodes a JSON object to set the state of this class."),(0,i.kt)("h4",{id:"parameters-3"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"j")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Record"),"<",(0,i.kt)("inlineCode",{parentName:"td"},"string"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"Record"),"<",(0,i.kt)("inlineCode",{parentName:"td"},"string"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"number"),">",">"),(0,i.kt)("td",{parentName:"tr",align:"left"},"The json object.")))),(0,i.kt)("h4",{id:"returns-7"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-10"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Math/Box3.ts#L300"},"Math/Box3.ts:300")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"getboundingsphere"},"getBoundingSphere"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"getBoundingSphere"),"(): ",(0,i.kt)("a",{parentName:"p",href:"Math_SphereType.SphereType"},(0,i.kt)("inlineCode",{parentName:"a"},"SphereType"))),(0,i.kt)("p",null,"Calculates and returns the bounding Sphere of the Box3"),(0,i.kt)("h4",{id:"returns-8"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"Math_SphereType.SphereType"},(0,i.kt)("inlineCode",{parentName:"a"},"SphereType"))),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The return value.")),(0,i.kt)("h4",{id:"defined-in-11"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Math/Box3.ts#L194"},"Math/Box3.ts:194")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"intersectsbox"},"intersectsBox"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"intersectsBox"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"box"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("p",null,"Determines if this Box3 intersects a given box value."),(0,i.kt)("h4",{id:"parameters-4"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"box")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_Box3.Box3"},(0,i.kt)("inlineCode",{parentName:"a"},"Box3"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The box to check for intersection against.")))),(0,i.kt)("h4",{id:"returns-9"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Returns true if the shapes intersect.")),(0,i.kt)("h4",{id:"defined-in-12"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Math/Box3.ts#L204"},"Math/Box3.ts:204")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"intersectsplane"},"intersectsPlane"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"intersectsPlane"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"plane"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("p",null,"Determines if this Box3 intersects a plane."),(0,i.kt)("h4",{id:"parameters-5"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"plane")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_PlaneType.PlaneType"},(0,i.kt)("inlineCode",{parentName:"a"},"PlaneType"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The plane to check for intersection against.")))),(0,i.kt)("h4",{id:"returns-10"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The return value.")),(0,i.kt)("h4",{id:"defined-in-13"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Math/Box3.ts#L238"},"Math/Box3.ts:238")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"intersectssphere"},"intersectsSphere"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"intersectsSphere"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"sphere"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("p",null,"Determines if this Box3 intersects a sphere."),(0,i.kt)("h4",{id:"parameters-6"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"sphere")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_SphereType.SphereType"},(0,i.kt)("inlineCode",{parentName:"a"},"SphereType"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The sphere to check for intersection against.")))),(0,i.kt)("h4",{id:"returns-11"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Returns true if the shapes intersect.")),(0,i.kt)("h4",{id:"defined-in-14"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Math/Box3.ts#L222"},"Math/Box3.ts:222")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"isvalid"},"isValid"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"isValid"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("p",null,"Returns ",(0,i.kt)("inlineCode",{parentName:"p"},"true")," if the box has been expanded to contain a point."),(0,i.kt)("h4",{id:"returns-12"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The return value.")),(0,i.kt)("h4",{id:"defined-in-15"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Math/Box3.ts#L92"},"Math/Box3.ts:92")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"reset"},"reset"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"reset"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Resets the box3 back to an uninitialized state."),(0,i.kt)("h4",{id:"returns-13"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-16"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Math/Box3.ts#L78"},"Math/Box3.ts:78")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"set"},"set"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"set"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"p0"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"p1"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Sets both Vec3 points"),(0,i.kt)("h4",{id:"parameters-7"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"p0")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"A point representing the corners of a 3D box.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"p1")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"A point representing the corners of a 3D box.")))),(0,i.kt)("h4",{id:"returns-14"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-17"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Math/Box3.ts#L70"},"Math/Box3.ts:70")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"setfromfloat32array"},"setFromFloat32Array"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("inlineCode",{parentName:"p"},"Private")," ",(0,i.kt)("strong",{parentName:"p"},"setFromFloat32Array"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"float32array"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"The setFromFloat32Array method."),(0,i.kt)("h4",{id:"parameters-8"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"float32array")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Float32Array")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The float32array value.")))),(0,i.kt)("h4",{id:"returns-15"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-18"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Math/Box3.ts#L322"},"Math/Box3.ts:322")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"size"},"size"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"size"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("p",null,"Returns the length of the diagonal of the box."),(0,i.kt)("h4",{id:"returns-16"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Returns the distance.")),(0,i.kt)("h4",{id:"defined-in-19"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Math/Box3.ts#L152"},"Math/Box3.ts:152")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"tojson"},"toJSON"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"toJSON"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"Record"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"Record"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"number"),">",">"),(0,i.kt)("p",null,"Encodes ",(0,i.kt)("inlineCode",{parentName:"p"},"Box3")," Class as a JSON object for persistence."),(0,i.kt)("h4",{id:"returns-17"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Record"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"Record"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"number"),">",">"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The json object.")),(0,i.kt)("h4",{id:"defined-in-20"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Math/Box3.ts#L288"},"Math/Box3.ts:288")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"tomat4"},"toMat4"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"toMat4"),"(): ",(0,i.kt)("a",{parentName:"p",href:"Math_Mat4.Mat4"},(0,i.kt)("inlineCode",{parentName:"a"},"Mat4"))),(0,i.kt)("p",null,"Converts this Box3 to a Mat4 (a 4x4 matrix). The returned mat4 would transform a unit cube into the shape of the Bounding box."),(0,i.kt)("h4",{id:"returns-18"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"Math_Mat4.Mat4"},(0,i.kt)("inlineCode",{parentName:"a"},"Mat4"))),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Returns a new Mat4.")),(0,i.kt)("h4",{id:"defined-in-21"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Math/Box3.ts#L182"},"Math/Box3.ts:182")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"tostring"},"toString"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"toString"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("p",null,"Calls ",(0,i.kt)("inlineCode",{parentName:"p"},"toJSON")," method and stringifies it."),(0,i.kt)("h4",{id:"returns-19"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The return value.")),(0,i.kt)("h4",{id:"defined-in-22"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Math/Box3.ts#L332"},"Math/Box3.ts:332")))}h.isMDXComponent=!0}}]);