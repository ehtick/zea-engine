"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[5976],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return m}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),p=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(o.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),u=p(n),m=r,k=u["".concat(o,".").concat(m)]||u[m]||c[m]||i;return n?a.createElement(k,s(s({ref:t},d),{},{components:n})):a.createElement(k,s({ref:t},d))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,s=new Array(i);s[0]=u;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l.mdxType="string"==typeof e?e:r,s[1]=l;for(var p=2;p<i;p++)s[p]=n[p];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},115:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return o},metadata:function(){return p},toc:function(){return d},default:function(){return u}});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),s=["components"],l={id:"Registry.Registry-1",title:"Class: Registry",sidebar_label:"Registry",custom_edit_url:null},o=void 0,p={unversionedId:"API/Registry.Registry-1",id:"API/Registry.Registry-1",isDocsHomePage:!1,title:"Class: Registry",description:"Registry is a static factory that handles registration/reconstruction of",source:"@site/docs/API/Registry-1.md",sourceDirName:"API",slug:"/API/Registry.Registry-1",permalink:"/zea-engine/API/Registry.Registry-1",editUrl:null,tags:[],version:"current",frontMatter:{id:"Registry.Registry-1",title:"Class: Registry",sidebar_label:"Registry",custom_edit_url:null},sidebar:"apiSidebar",previous:{title:"LibsRegistry",permalink:"/zea-engine/API/LibsRegistry.LibsRegistry-1"}},d=[{value:"Constructors",id:"constructors",children:[{value:"constructor",id:"constructor",children:[]}]},{value:"Methods",id:"methods",children:[{value:"constructClass",id:"constructclass",children:[]},{value:"flush",id:"flush",children:[]},{value:"getClassDefinition",id:"getclassdefinition",children:[]},{value:"getClassName",id:"getclassname",children:[]},{value:"register",id:"register",children:[]}]}],c={toc:d};function u(e){var t=e.components,n=(0,r.Z)(e,s);return(0,i.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Registry is a static factory that handles registration/reconstruction of\nclasses bases on BaseClass. Registered classes can then be constructed by the Registry by name."),(0,i.kt)("p",null,"Note: className is required because on minification process\nthe name of classes change and we can't simply use '....constructor.name'.\nSo, we need a way of relating minified class names to the one stored for persistency."),(0,i.kt)("p",null,"i.e."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"// Import registry class\nclass Foo() extends BaseClass {}\n\nRegistry.register('Foo', Foo)\n// In case 'Foo' class gets its name changed to 'c' on minification,\n// and the persisted data type is 'Foo', we would know how to relate them.\n")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"static"))),(0,i.kt)("h2",{id:"constructors"},"Constructors"),(0,i.kt)("h3",{id:"constructor"},"constructor"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"new Registry"),"()"),(0,i.kt)("h2",{id:"methods"},"Methods"),(0,i.kt)("h3",{id:"constructclass"},"constructClass"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("inlineCode",{parentName:"p"},"Static")," ",(0,i.kt)("strong",{parentName:"p"},"constructClass"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"className"),"): ",(0,i.kt)("a",{parentName:"p",href:"Utilities/Utilities_BaseClass.BaseClass"},(0,i.kt)("inlineCode",{parentName:"a"},"BaseClass"))),(0,i.kt)("p",null,"The factory function that construct the class registered under the given name."),(0,i.kt)("h4",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"className")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")),(0,i.kt)("td",{parentName:"tr",align:"left"},"Name of the registered class")))),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"Utilities/Utilities_BaseClass.BaseClass"},(0,i.kt)("inlineCode",{parentName:"a"},"BaseClass"))),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Instantiated object of the specified class")),(0,i.kt)("h4",{id:"defined-in"},"Defined in"),(0,i.kt)("p",null,"Registry.ts:78"),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"flush"},"flush"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("inlineCode",{parentName:"p"},"Static")," ",(0,i.kt)("inlineCode",{parentName:"p"},"Private")," ",(0,i.kt)("strong",{parentName:"p"},"flush"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"For testing purpose only, never call this outside of the test scope."),(0,i.kt)("h4",{id:"returns-1"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,i.kt)("p",null,"Registry.ts:90"),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"getclassdefinition"},"getClassDefinition"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("inlineCode",{parentName:"p"},"Static")," ",(0,i.kt)("strong",{parentName:"p"},"getClassDefinition"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"className"),"): typeof ",(0,i.kt)("a",{parentName:"p",href:"Utilities/Utilities_BaseClass.BaseClass"},(0,i.kt)("inlineCode",{parentName:"a"},"BaseClass"))),(0,i.kt)("p",null,"Returns class definition using the name it was registered with."),(0,i.kt)("h4",{id:"parameters-1"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"className")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")),(0,i.kt)("td",{parentName:"tr",align:"left"},"Name of the registered class")))),(0,i.kt)("h4",{id:"returns-2"},"Returns"),(0,i.kt)("p",null,"typeof ",(0,i.kt)("a",{parentName:"p",href:"Utilities/Utilities_BaseClass.BaseClass"},(0,i.kt)("inlineCode",{parentName:"a"},"BaseClass"))),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Class representation(Class function, type)")),(0,i.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,i.kt)("p",null,"Registry.ts:55"),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"getclassname"},"getClassName"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("inlineCode",{parentName:"p"},"Static")," ",(0,i.kt)("strong",{parentName:"p"},"getClassName"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"classDefinition"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("p",null,"Returns class name registered for the instantiated object."),(0,i.kt)("h4",{id:"parameters-2"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"classDefinition")),(0,i.kt)("td",{parentName:"tr",align:"left"},"typeof ",(0,i.kt)("a",{parentName:"td",href:"Utilities/Utilities_BaseClass.BaseClass"},(0,i.kt)("inlineCode",{parentName:"a"},"BaseClass"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"Class type definition.")))),(0,i.kt)("h4",{id:"returns-3"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Name of the registered class")),(0,i.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,i.kt)("p",null,"Registry.ts:65"),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"register"},"register"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("inlineCode",{parentName:"p"},"Static")," ",(0,i.kt)("strong",{parentName:"p"},"register"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"className"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"classDef"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Registers a new class to the factory."),(0,i.kt)("h4",{id:"parameters-3"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"className")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")),(0,i.kt)("td",{parentName:"tr",align:"left"},"Name of the registered class")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"classDef")),(0,i.kt)("td",{parentName:"tr",align:"left"},"typeof ",(0,i.kt)("a",{parentName:"td",href:"Utilities/Utilities_BaseClass.BaseClass"},(0,i.kt)("inlineCode",{parentName:"a"},"BaseClass"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"Class representation(Class function, type)")))),(0,i.kt)("h4",{id:"returns-4"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,i.kt)("p",null,"Registry.ts:36"))}u.isMDXComponent=!0}}]);