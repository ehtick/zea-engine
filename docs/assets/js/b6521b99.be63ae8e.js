"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[3937],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return u}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var d=r.createContext({}),p=function(e){var t=r.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=p(e.components);return r.createElement(d.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},k=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,d=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),k=p(n),u=a,c=k["".concat(d,".").concat(u)]||k[u]||m[u]||i;return n?r.createElement(c,l(l({ref:t},s),{},{components:n})):r.createElement(c,l({ref:t},s))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,l=new Array(i);l[0]=k;var o={};for(var d in t)hasOwnProperty.call(t,d)&&(o[d]=t[d]);o.originalType=e,o.mdxType="string"==typeof e?e:a,l[1]=o;for(var p=2;p<i;p++)l[p]=n[p];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}k.displayName="MDXCreateElement"},2684:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return o},contentTitle:function(){return d},metadata:function(){return p},toc:function(){return s},default:function(){return k}});var r=n(7462),a=n(3366),i=(n(7294),n(3905)),l=["components"],o={id:"SceneTree_resourceLoader.ResourceLoader",title:"Class: ResourceLoader",sidebar_label:"ResourceLoader",custom_edit_url:null},d=void 0,p={unversionedId:"API/SceneTree/SceneTree_resourceLoader.ResourceLoader",id:"API/SceneTree/SceneTree_resourceLoader.ResourceLoader",isDocsHomePage:!1,title:"Class: ResourceLoader",description:"Class for delegating resource loading, enabling an abstraction of a cloud file system to be implemented.",source:"@site/docs/API/SceneTree/ResourceLoader.md",sourceDirName:"API/SceneTree",slug:"/API/SceneTree/SceneTree_resourceLoader.ResourceLoader",permalink:"/zea-engine/API/SceneTree/SceneTree_resourceLoader.ResourceLoader",editUrl:null,tags:[],version:"current",frontMatter:{id:"SceneTree_resourceLoader.ResourceLoader",title:"Class: ResourceLoader",sidebar_label:"ResourceLoader",custom_edit_url:null},sidebar:"apiSidebar",previous:{title:"RefCounted",permalink:"/zea-engine/API/SceneTree/SceneTree_RefCounted.RefCounted"},next:{title:"Scene",permalink:"/zea-engine/API/SceneTree/SceneTree_Scene.Scene"}},s=[{value:"Hierarchy",id:"hierarchy",children:[]},{value:"Constructors",id:"constructors",children:[{value:"constructor",id:"constructor",children:[]}]},{value:"Properties",id:"properties",children:[{value:"__doneWork",id:"__donework",children:[]},{value:"__id",id:"__id",children:[]},{value:"__totalWork",id:"__totalwork",children:[]},{value:"baseUrl",id:"baseurl",children:[]},{value:"commonResources",id:"commonresources",children:[]},{value:"listeners",id:"listeners",children:[]},{value:"loadCount",id:"loadcount",children:[]},{value:"plugins",id:"plugins",children:[]},{value:"queue",id:"queue",children:[]},{value:"systemUrls",id:"systemurls",children:[]}]},{value:"Methods",id:"methods",children:[{value:"emit",id:"emit",children:[]},{value:"getClassName",id:"getclassname",children:[]},{value:"getCommonResource",id:"getcommonresource",children:[]},{value:"getId",id:"getid",children:[]},{value:"incrementWorkDone",id:"incrementworkdone",children:[]},{value:"incrementWorkload",id:"incrementworkload",children:[]},{value:"loadFile",id:"loadfile",children:[]},{value:"off",id:"off",children:[]},{value:"on",id:"on",children:[]},{value:"once",id:"once",children:[]},{value:"registerPlugin",id:"registerplugin",children:[]},{value:"removeListenerById",id:"removelistenerbyid",children:[]},{value:"setCommonResource",id:"setcommonresource",children:[]}]}],m={toc:s};function k(e){var t=e.components,n=(0,a.Z)(e,l);return(0,i.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Class for delegating resource loading, enabling an abstraction of a cloud file system to be implemented."),(0,i.kt)("p",null,"The resource loader can be used to load data, where it provides central tracking of loading progress and functionality to load various file types, including compressed archives.\nThe plugins script must be loaded along with the engine"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-html"},' <script crossorigin src="libs/zea-engine/dist/plugins.umd.js"><\/script>\n')),(0,i.kt)("p",null,"To load a 'text' file."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"  resourceLoader.loadFile('text', url).then((txt) =>{\n     console.log(txt)\n  })\n")),(0,i.kt)("p",null,"To load a 'JSON' file."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"  resourceLoader.loadFile('json', url).then((txt) =>{\n     console.log(json)\n  })\n")),(0,i.kt)("p",null,"To load a 'binary' file."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"  resourceLoader.loadFile('binary', url).then((arrayBuffer) =>{\n     console.log(arrayBuffer.length)\n  })\n")),(0,i.kt)("p",null,"To load an 'archive' file that is a compressed archive containing multiple sub-files."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"  resourceLoader.loadFile('archive', url).then((entries) =>{\n     console.log(entries)\n  })\n")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Events")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"loaded:")," emitted when a file has finished loading"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"progressIncremented:")," emitted when a loading of processing task has been incremented"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"allResourcesLoaded:")," emitted when all outstanding resources are loaded. This event can be used to signal the completion of load.")),(0,i.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter"},(0,i.kt)("inlineCode",{parentName:"a"},"EventEmitter"))),(0,i.kt)("p",{parentName:"li"},"\u21b3 ",(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"ResourceLoader"))))),(0,i.kt)("h2",{id:"constructors"},"Constructors"),(0,i.kt)("h3",{id:"constructor"},"constructor"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"new ResourceLoader"),"()"),(0,i.kt)("p",null,"Create a resource loader."),(0,i.kt)("h4",{id:"overrides"},"Overrides"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter#constructor"},"constructor")),(0,i.kt)("h4",{id:"defined-in"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/resourceLoader.ts#L70"},"src/SceneTree/resourceLoader.ts:70")),(0,i.kt)("h2",{id:"properties"},"Properties"),(0,i.kt)("h3",{id:"__donework"},"_","_","doneWork"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,i.kt)("strong",{parentName:"p"},"_","_","doneWork"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/resourceLoader.ts#L59"},"src/SceneTree/resourceLoader.ts:59")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"__id"},"_","_","id"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,i.kt)("strong",{parentName:"p"},"_","_","id"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("h4",{id:"inherited-from"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter#__id"},"__id")),(0,i.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/BaseClass.ts#L11"},"src/Utilities/BaseClass.ts:11")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"__totalwork"},"_","_","totalWork"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,i.kt)("strong",{parentName:"p"},"_","_","totalWork"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/resourceLoader.ts#L58"},"src/SceneTree/resourceLoader.ts:58")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"baseurl"},"baseUrl"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,i.kt)("strong",{parentName:"p"},"baseUrl"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," = ",(0,i.kt)("inlineCode",{parentName:"p"},"''")),(0,i.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/resourceLoader.ts#L60"},"src/SceneTree/resourceLoader.ts:60")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"commonresources"},"commonResources"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"commonResources"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"Record"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,i.kt)("a",{parentName:"p",href:"SceneTree_TreeItem.TreeItem"},(0,i.kt)("inlineCode",{parentName:"a"},"TreeItem")),">"),(0,i.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/resourceLoader.ts#L63"},"src/SceneTree/resourceLoader.ts:63")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"listeners"},"listeners"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"listeners"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"Record"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"string"),", (",(0,i.kt)("inlineCode",{parentName:"p"},"event"),": ",(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_BaseEvent.BaseEvent"},(0,i.kt)("inlineCode",{parentName:"a"},"BaseEvent")),") => ",(0,i.kt)("inlineCode",{parentName:"p"},"void"),"[]",">"," = ",(0,i.kt)("inlineCode",{parentName:"p"},"{}")),(0,i.kt)("h4",{id:"inherited-from-1"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter#listeners"},"listeners")),(0,i.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/EventEmitter.ts#L26"},"src/Utilities/EventEmitter.ts:26")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"loadcount"},"loadCount"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Private")," ",(0,i.kt)("strong",{parentName:"p"},"loadCount"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")," = ",(0,i.kt)("inlineCode",{parentName:"p"},"0")),(0,i.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/resourceLoader.ts#L65"},"src/SceneTree/resourceLoader.ts:65")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"plugins"},"plugins"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,i.kt)("strong",{parentName:"p"},"plugins"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"Record"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"any"),">"),(0,i.kt)("h4",{id:"defined-in-8"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/resourceLoader.ts#L61"},"src/SceneTree/resourceLoader.ts:61")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"queue"},"queue"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Private")," ",(0,i.kt)("strong",{parentName:"p"},"queue"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"any"),"[] = ",(0,i.kt)("inlineCode",{parentName:"p"},"[]")),(0,i.kt)("h4",{id:"defined-in-9"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/resourceLoader.ts#L66"},"src/SceneTree/resourceLoader.ts:66")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"systemurls"},"systemUrls"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"systemUrls"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"Record"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"string"),">"),(0,i.kt)("h4",{id:"defined-in-10"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/resourceLoader.ts#L62"},"src/SceneTree/resourceLoader.ts:62")),(0,i.kt)("h2",{id:"methods"},"Methods"),(0,i.kt)("h3",{id:"emit"},"emit"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"emit"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"eventName"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"event?"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Triggers all listener functions in an event."),(0,i.kt)("h4",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"eventName")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The name of the event.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"event")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"../Utilities/Utilities_BaseEvent.BaseEvent"},(0,i.kt)("inlineCode",{parentName:"a"},"BaseEvent"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The data you want to pass down to all listener functions as parameter.")))),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"inherited-from-2"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter#emit"},"emit")),(0,i.kt)("h4",{id:"defined-in-11"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/EventEmitter.ts#L154"},"src/Utilities/EventEmitter.ts:154")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"getclassname"},"getClassName"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"getClassName"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("p",null,"Returns the unmangled name of the class."),(0,i.kt)("h4",{id:"returns-1"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The name of the class definition.")),(0,i.kt)("h4",{id:"inherited-from-3"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter#getclassname"},"getClassName")),(0,i.kt)("h4",{id:"defined-in-12"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/BaseClass.ts#L33"},"src/Utilities/BaseClass.ts:33")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"getcommonresource"},"getCommonResource"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"getCommonResource"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"resourceId"),"): ",(0,i.kt)("a",{parentName:"p",href:"SceneTree_TreeItem.TreeItem"},(0,i.kt)("inlineCode",{parentName:"a"},"TreeItem"))),(0,i.kt)("p",null,"Returns a previously stored common resource. Typically this would be a VR asset."),(0,i.kt)("h4",{id:"parameters-1"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"resourceId")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The resourceId value.")))),(0,i.kt)("h4",{id:"returns-2"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"SceneTree_TreeItem.TreeItem"},(0,i.kt)("inlineCode",{parentName:"a"},"TreeItem"))),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The common resource if it exists")),(0,i.kt)("h4",{id:"defined-in-13"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/resourceLoader.ts#L169"},"src/SceneTree/resourceLoader.ts:169")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"getid"},"getId"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"getId"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("p",null,"Every instance of each class based on BaseClass is assigned a unique number.\nThis number is not persistent in between different loads of a scene.\nReturns the unique id of the object."),(0,i.kt)("h4",{id:"returns-3"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The Id of the object.")),(0,i.kt)("h4",{id:"inherited-from-4"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter#getid"},"getId")),(0,i.kt)("h4",{id:"defined-in-14"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/BaseClass.ts#L25"},"src/Utilities/BaseClass.ts:25")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"incrementworkdone"},"incrementWorkDone"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"incrementWorkDone"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"amount?"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Increments the amount of work done causing a 'progressIncremented' event to be emitted.\nIf 5 items of work have been added using #incrementWorkload, and subsequently 3 items have\nbeen completed and #incrementWorkDone called. The progress will be at 3/5, or 60%"),(0,i.kt)("h4",{id:"parameters-2"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Default value"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"amount")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"number")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"1")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The amount value.")))),(0,i.kt)("h4",{id:"returns-4"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-15"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/resourceLoader.ts#L207"},"src/SceneTree/resourceLoader.ts:207")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"incrementworkload"},"incrementWorkload"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"incrementWorkload"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"amount?"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Increments the amount of work to be done causing a 'progressIncremented' event to be emitted\nAs the workload is incremented, the progress might retract as a lower proportion of the work\nis then considered done. Only once this work is completed, and the 'incrementWorkDone', the\nprogress will increment."),(0,i.kt)("h4",{id:"parameters-3"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Default value"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"amount")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"number")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"1")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The amount value.")))),(0,i.kt)("h4",{id:"returns-5"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-16"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/resourceLoader.ts#L194"},"src/SceneTree/resourceLoader.ts:194")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"loadfile"},"loadFile"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"loadFile"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"type"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"url"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"any"),">"),(0,i.kt)("p",null,"Loads a  file, returning a promise that resolves to the JSON data value.\nNote: using the resource loader to centralize data loading enables progress to be tracked and displayed"),(0,i.kt)("h4",{id:"parameters-4"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"type")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")),(0,i.kt)("td",{parentName:"tr",align:"left"},"-")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"url")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The url of the data to load.")))),(0,i.kt)("h4",{id:"returns-6"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"any"),">"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The promise value.")),(0,i.kt)("h4",{id:"defined-in-17"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/resourceLoader.ts#L103"},"src/SceneTree/resourceLoader.ts:103")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"off"},"off"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"off"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"eventName"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"listener?"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Removes a listener function from the specified event, using either the function or the index id. Depends on what is passed in."),(0,i.kt)("h4",{id:"parameters-5"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"eventName")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The name of the event.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"listener?")),(0,i.kt)("td",{parentName:"tr",align:"left"},"(",(0,i.kt)("inlineCode",{parentName:"td"},"event"),": ",(0,i.kt)("inlineCode",{parentName:"td"},"any"),") => ",(0,i.kt)("inlineCode",{parentName:"td"},"void")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The listener function or the id number.")))),(0,i.kt)("h4",{id:"returns-7"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"inherited-from-5"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter#off"},"off")),(0,i.kt)("h4",{id:"defined-in-18"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/EventEmitter.ts#L97"},"src/Utilities/EventEmitter.ts:97")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"on"},"on"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"on"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"eventName"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"listener?"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("p",null,"Adds a listener function for a given event name."),(0,i.kt)("h4",{id:"parameters-6"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"eventName")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The name of the event.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"listener?")),(0,i.kt)("td",{parentName:"tr",align:"left"},"(",(0,i.kt)("inlineCode",{parentName:"td"},"event"),": ",(0,i.kt)("inlineCode",{parentName:"td"},"any"),") => ",(0,i.kt)("inlineCode",{parentName:"td"},"void")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The listener function(callback).")))),(0,i.kt)("h4",{id:"returns-8"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"the id that can be used to remove the listener.")),(0,i.kt)("h4",{id:"inherited-from-6"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter#on"},"on")),(0,i.kt)("h4",{id:"defined-in-19"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/EventEmitter.ts#L44"},"src/Utilities/EventEmitter.ts:44")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"once"},"once"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"once"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"eventName"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"listener"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("p",null,"Similar to the ",(0,i.kt)("inlineCode",{parentName:"p"},"on")," method with the difference that when the event is triggered,\nit is automatically unregistered meaning that the event listener will be triggered at most one time."),(0,i.kt)("p",null,"Useful for events that we expect to trigger one time, such as when assets load."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"const asset = new Asset();\nasset.once('loaded', () => {\n  console.log(\"Yay! the asset is loaded\")\n})\n")),(0,i.kt)("h4",{id:"parameters-7"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"eventName")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The eventName value")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"listener")),(0,i.kt)("td",{parentName:"tr",align:"left"},"(",(0,i.kt)("inlineCode",{parentName:"td"},"event"),": ",(0,i.kt)("a",{parentName:"td",href:"../Utilities/Utilities_BaseEvent.BaseEvent"},(0,i.kt)("inlineCode",{parentName:"a"},"BaseEvent")),") => ",(0,i.kt)("inlineCode",{parentName:"td"},"void")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The listener value")))),(0,i.kt)("h4",{id:"returns-9"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"the id that can be used to remove the listener.")),(0,i.kt)("h4",{id:"inherited-from-7"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter#once"},"once")),(0,i.kt)("h4",{id:"defined-in-20"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/EventEmitter.ts#L82"},"src/Utilities/EventEmitter.ts:82")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"registerplugin"},"registerPlugin"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"registerPlugin"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"plugin"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"parameters-8"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"plugin")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"any"))))),(0,i.kt)("h4",{id:"returns-10"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-21"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/resourceLoader.ts#L92"},"src/SceneTree/resourceLoader.ts:92")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"removelistenerbyid"},"removeListenerById"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"removeListenerById"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"eventName"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"id"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"remove listener by ID returned from #on"),(0,i.kt)("h4",{id:"parameters-9"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"eventName")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The name of the event.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"id")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"number")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The id returned by addListener")))),(0,i.kt)("h4",{id:"returns-11"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"inherited-from-8"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter"},"EventEmitter"),".",(0,i.kt)("a",{parentName:"p",href:"../Utilities/Utilities_EventEmitter.EventEmitter#removelistenerbyid"},"removeListenerById")),(0,i.kt)("h4",{id:"defined-in-22"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/EventEmitter.ts#L134"},"src/Utilities/EventEmitter.ts:134")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"setcommonresource"},"setCommonResource"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"setCommonResource"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"resourceId"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"resource"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Saves a common resource for reuse by other tools. Typically this would be a VR asset."),(0,i.kt)("h4",{id:"parameters-10"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"resourceId")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The resourceId value.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"resource")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"SceneTree_TreeItem.TreeItem"},(0,i.kt)("inlineCode",{parentName:"a"},"TreeItem"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The common resource to store")))),(0,i.kt)("h4",{id:"returns-12"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-23"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/resourceLoader.ts#L179"},"src/SceneTree/resourceLoader.ts:179")))}k.isMDXComponent=!0}}]);