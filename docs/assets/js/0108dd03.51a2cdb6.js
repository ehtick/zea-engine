"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[699],{3905:function(t,e,n){n.d(e,{Zo:function(){return k},kt:function(){return h}});var a=n(7294);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function p(t,e){if(null==t)return{};var n,a,r=function(t,e){if(null==t)return{};var n,a,r={},i=Object.keys(t);for(a=0;a<i.length;a++)n=i[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(a=0;a<i.length;a++)n=i[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var o=a.createContext({}),d=function(t){var e=a.useContext(o),n=e;return t&&(n="function"==typeof t?t(e):l(l({},e),t)),n},k=function(t){var e=d(t.components);return a.createElement(o.Provider,{value:e},t.children)},m={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},s=a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,i=t.originalType,o=t.parentName,k=p(t,["components","mdxType","originalType","parentName"]),s=d(n),h=r,c=s["".concat(o,".").concat(h)]||s[h]||m[h]||i;return n?a.createElement(c,l(l({ref:e},k),{},{components:n})):a.createElement(c,l({ref:e},k))}));function h(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var i=n.length,l=new Array(i);l[0]=s;var p={};for(var o in e)hasOwnProperty.call(e,o)&&(p[o]=e[o]);p.originalType=t,p.mdxType="string"==typeof t?t:r,l[1]=p;for(var d=2;d<i;d++)l[d]=n[d];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}s.displayName="MDXCreateElement"},7854:function(t,e,n){n.r(e),n.d(e,{frontMatter:function(){return p},contentTitle:function(){return o},metadata:function(){return d},toc:function(){return k},default:function(){return s}});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),l=["components"],p={id:"Math_Ray.Ray",title:"Class: Ray",sidebar_label:"Ray",custom_edit_url:null},o=void 0,d={unversionedId:"API/Math/Math_Ray.Ray",id:"API/Math/Math_Ray.Ray",isDocsHomePage:!1,title:"Class: Ray",description:"Class representing a ray that starts from an origin in a specified direction.",source:"@site/docs/API/Math/Ray.md",sourceDirName:"API/Math",slug:"/API/Math/Math_Ray.Ray",permalink:"/docs/API/Math/Math_Ray.Ray",editUrl:null,tags:[],version:"current",frontMatter:{id:"Math_Ray.Ray",title:"Class: Ray",sidebar_label:"Ray",custom_edit_url:null},sidebar:"apiSidebar",previous:{title:"RGBA",permalink:"/docs/API/Math/Math_RGBA.RGBA"},next:{title:"SphereType",permalink:"/docs/API/Math/Math_SphereType.SphereType"}},k=[{value:"Constructors",id:"constructors",children:[{value:"constructor",id:"constructor",children:[]}]},{value:"Properties",id:"properties",children:[{value:"dir",id:"dir",children:[]},{value:"start",id:"start",children:[]}]},{value:"Methods",id:"methods",children:[{value:"clone",id:"clone",children:[]},{value:"closestPoint",id:"closestpoint",children:[]},{value:"closestPointOnLineSegment",id:"closestpointonlinesegment",children:[]},{value:"fromJSON",id:"fromjson",children:[]},{value:"intersectRayBox3",id:"intersectraybox3",children:[]},{value:"intersectRayPlane",id:"intersectrayplane",children:[]},{value:"intersectRayVector",id:"intersectrayvector",children:[]},{value:"pointAtDist",id:"pointatdist",children:[]},{value:"toJSON",id:"tojson",children:[]},{value:"toString",id:"tostring",children:[]}]}],m={toc:k};function s(t){var e=t.components,n=(0,r.Z)(t,l);return(0,i.kt)("wrapper",(0,a.Z)({},m,n,{components:e,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Class representing a ray that starts from an origin in a specified direction."),(0,i.kt)("h2",{id:"constructors"},"Constructors"),(0,i.kt)("h3",{id:"constructor"},"constructor"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"new Ray"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"start?"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"dir?"),")"),(0,i.kt)("p",null,"Create a ray."),(0,i.kt)("h4",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"start?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The origin of the ray.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"dir?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The direction of the ray.")))),(0,i.kt)("h4",{id:"defined-in"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0f9b0de7/src/Math/Ray.ts#L20"},"Math/Ray.ts:20")),(0,i.kt)("h2",{id:"properties"},"Properties"),(0,i.kt)("h3",{id:"dir"},"dir"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"dir"),": ",(0,i.kt)("a",{parentName:"p",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0f9b0de7/src/Math/Ray.ts#L11"},"Math/Ray.ts:11")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"start"},"start"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"start"),": ",(0,i.kt)("a",{parentName:"p",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0f9b0de7/src/Math/Ray.ts#L12"},"Math/Ray.ts:12")),(0,i.kt)("h2",{id:"methods"},"Methods"),(0,i.kt)("h3",{id:"clone"},"clone"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"clone"),"(): ",(0,i.kt)("a",{parentName:"p",href:"Math_Ray.Ray"},(0,i.kt)("inlineCode",{parentName:"a"},"Ray"))),(0,i.kt)("p",null,"Clones this Ray and returns a new Ray."),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"Math_Ray.Ray"},(0,i.kt)("inlineCode",{parentName:"a"},"Ray"))),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Returns a new Ray.")),(0,i.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0f9b0de7/src/Math/Ray.ts#L231"},"Math/Ray.ts:231")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"closestpoint"},"closestPoint"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"closestPoint"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"point"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("p",null,"Get the closest point on the ray to the given point."),(0,i.kt)("h4",{id:"parameters-1"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"point")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The point in 3D space.")))),(0,i.kt)("h4",{id:"returns-1"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"returns a number")),(0,i.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0f9b0de7/src/Math/Ray.ts#L40"},"Math/Ray.ts:40")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"closestpointonlinesegment"},"closestPointOnLineSegment"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"closestPointOnLineSegment"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"p0"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"p1"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"number"),"[]"),(0,i.kt)("p",null,"Get the closest point between the ray and the given line segment made of the 2 points."),(0,i.kt)("h4",{id:"parameters-2"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"p0")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The point in 3D space.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"p1")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The point in 3D space.")))),(0,i.kt)("h4",{id:"returns-2"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"number"),"[]"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Returns an array containing 2 scalar values indicating 0: the fraction of the line segment, 1: distance along the Ray")),(0,i.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0f9b0de7/src/Math/Ray.ts#L56"},"Math/Ray.ts:56")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"fromjson"},"fromJSON"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"fromJSON"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"j"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"The fromJSON method decodes a json object for this type."),(0,i.kt)("h4",{id:"parameters-3"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"j")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Record"),"<",(0,i.kt)("inlineCode",{parentName:"td"},"string"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"Record"),"<",(0,i.kt)("inlineCode",{parentName:"td"},"string"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"number"),">",">"),(0,i.kt)("td",{parentName:"tr",align:"left"},"The json object.")))),(0,i.kt)("h4",{id:"returns-3"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0f9b0de7/src/Math/Ray.ts#L255"},"Math/Ray.ts:255")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"intersectraybox3"},"intersectRayBox3"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"intersectRayBox3"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"box3"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"tolerance?"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("p",null,"Determines if this Box3 intersects a ray."),(0,i.kt)("h4",{id:"parameters-4"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Default value"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"box3")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_Box3.Box3"},(0,i.kt)("inlineCode",{parentName:"a"},"Box3"))),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"undefined")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The box to check for intersection against.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"tolerance")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"number")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"0")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The tolerance of the test.")))),(0,i.kt)("h4",{id:"returns-4"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The return value.")),(0,i.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0f9b0de7/src/Math/Ray.ts#L186"},"Math/Ray.ts:186")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"intersectrayplane"},"intersectRayPlane"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"intersectRayPlane"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"plane"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("p",null,"Returns one ray param representing the intersection\nof this ray against the plane defined by the given ray."),(0,i.kt)("h4",{id:"parameters-5"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"plane")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_Ray.Ray"},(0,i.kt)("inlineCode",{parentName:"a"},"Ray"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The plane to intersect with.")))),(0,i.kt)("h4",{id:"returns-5"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The return value.")),(0,i.kt)("h4",{id:"defined-in-8"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0f9b0de7/src/Math/Ray.ts#L160"},"Math/Ray.ts:160")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"intersectrayvector"},"intersectRayVector"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"intersectRayVector"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"ray"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"number")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},"number"),"[] ","|"," ",(0,i.kt)("a",{parentName:"p",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("p",null,"Returns the two ray params that represent the closest point between the two rays."),(0,i.kt)("h4",{id:"parameters-6"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"ray")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"Math_Ray.Ray"},(0,i.kt)("inlineCode",{parentName:"a"},"Ray"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The ray value.")))),(0,i.kt)("h4",{id:"returns-6"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"number")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},"number"),"[] ","|"," ",(0,i.kt)("a",{parentName:"p",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Returns a Ray.")),(0,i.kt)("h4",{id:"defined-in-9"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0f9b0de7/src/Math/Ray.ts#L114"},"Math/Ray.ts:114")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"pointatdist"},"pointAtDist"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"pointAtDist"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"dist"),"): ",(0,i.kt)("a",{parentName:"p",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("p",null,"Get the closest point at a distance."),(0,i.kt)("h4",{id:"parameters-7"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"dist")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"number")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The distance value.")))),(0,i.kt)("h4",{id:"returns-7"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"Math_Vec3.Vec3"},(0,i.kt)("inlineCode",{parentName:"a"},"Vec3"))),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Returns a Vec3.")),(0,i.kt)("h4",{id:"defined-in-10"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0f9b0de7/src/Math/Ray.ts#L104"},"Math/Ray.ts:104")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"tojson"},"toJSON"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"toJSON"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"Record"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"Record"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"number"),">",">"),(0,i.kt)("p",null,"The toJSON method encodes this type as a json object for persistence."),(0,i.kt)("h4",{id:"returns-8"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Record"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"Record"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"number"),">",">"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The json object.")),(0,i.kt)("h4",{id:"defined-in-11"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0f9b0de7/src/Math/Ray.ts#L243"},"Math/Ray.ts:243")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"tostring"},"toString"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"toString"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("p",null,"Calls ",(0,i.kt)("inlineCode",{parentName:"p"},"toJSON")," method and stringifies it."),(0,i.kt)("h4",{id:"returns-9"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The return value.")),(0,i.kt)("h4",{id:"defined-in-12"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0f9b0de7/src/Math/Ray.ts#L265"},"Math/Ray.ts:265")))}s.isMDXComponent=!0}}]);