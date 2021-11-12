"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[9314],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return d}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},h=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),h=c(n),d=o,m=h["".concat(l,".").concat(d)]||h[d]||u[d]||i;return n?r.createElement(m,a(a({ref:t},p),{},{components:n})):r.createElement(m,a({ref:t},p))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=h;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,a[1]=s;for(var c=2;c<i;c++)a[c]=n[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}h.displayName="MDXCreateElement"},2550:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return p},default:function(){return h}});var r=n(7462),o=n(3366),i=(n(7294),n(3905)),a=["components"],s={sidebar_position:3,title:"Events and Listeners"},l=void 0,c={unversionedId:"Manual/Concepts/events",id:"Manual/Concepts/events",isDocsHomePage:!1,title:"Events and Listeners",description:"Within the DOM, events are emitted from DOM elements for various reasons, including notifying the consumer that an image has finished loading, or that a user has clicked on a certain element in the DOM tree. Developers can register listener functions to the DOM and determine appropriate responses to these events using JavaScript.",source:"@site/docs/Manual/Concepts/events.md",sourceDirName:"Manual/Concepts",slug:"/Manual/Concepts/events",permalink:"/docs/Manual/Concepts/events",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,title:"Events and Listeners"},sidebar:"manualSideBar",previous:{title:"Transformations",permalink:"/docs/Manual/Concepts/transformations"},next:{title:"Geometry and Rendering",permalink:"/docs/Manual/Concepts/geometry-rendering"}},p=[{value:"The Canvas Element",id:"the-canvas-element",children:[]},{value:"Hit Testing Events",id:"hit-testing-events",children:[]},{value:"Event Propagation",id:"event-propagation",children:[]},{value:"Groups",id:"groups",children:[]},{value:"Summary",id:"summary",children:[]}],u={toc:p};function h(e){var t=e.components,s=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,r.Z)({},u,s,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Within the ",(0,i.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Glossary/DOM"},"DOM"),", events are emitted from DOM elements for various reasons, including notifying the consumer that an image has finished loading, or that a user has clicked on a certain element in the DOM tree. Developers can register listener functions to the DOM and determine appropriate responses to these events using JavaScript."),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events"},"https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events")),(0,i.kt)("p",null,"The event system in the engine is modelled on and extends the event system found in the browser, giving developers a familiar model to understand how to interact with the Scene tree."),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"All classes within the Scene Tree can emit events. The list of events emitted by any class is listed in its API documentation.")),(0,i.kt)("h2",{id:"the-canvas-element"},"The Canvas Element"),(0,i.kt)("p",null,"The WebGL renderer is bound to a canvas element that lives in the DOM of a running web application. When a user interacts with the pages using the mouse or with a touch screen, events are emitted from the canvas element that the renderer is connected to. The Renderer uses these events to raycast into the scene and check for geometries directly under the mouse or touch location."),(0,i.kt)("h2",{id:"hit-testing-events"},"Hit Testing Events"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"events-hit-testing",src:n(7799).Z})),(0,i.kt)("p",null,"One of the services provided by the Viewport class, is translating 2d screen coordinates into 3d hits on geometries. For any coordinate on the 2d region of the viewport, a ray can be computed. The intersection of any geometries hit by that ray in the scene can be retrieved.\nMouse or touch interactions on the viewport are transformed into rays and resulting hit information is included in the events that are then propagated throughout the scene tree."),(0,i.kt)("p",null,"The goal of this design is to emulate the event system we find in the browser, where listeners can be registered with items in the tree to detect interactions relevant to those items."),(0,i.kt)("h2",{id:"event-propagation"},"Event Propagation"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"events-propagation",src:n(2080).Z})),(0,i.kt)("p",null,"There isn't automatic bubbling process in the zea engine tree to automatically propagate events up the tree. However, the scene tree does propagate a few events automatically up the tree."),(0,i.kt)("p",null,"?> pointerDown, pointerMove, pointerUp, pointerEnter and pointerLeave"),(0,i.kt)("p",null,"These events which are received by the viewport directly from the canvas element to which it is bound, is then propagated up the tree of any geometry found directly under the pointer(Mouse, Touch, VR controller) event."),(0,i.kt)("p",null,"To detect if any item in a tree has been clicked on, users can register listeners directly to the items in the hierarchy."),(0,i.kt)("p",null,"!> The order of propagation starts from the Item itself, all the way up its hierarchy and finally reaching the viewport. If you want to prevent the event to reach further, just add ",(0,i.kt)("inlineCode",{parentName:"p"},"event.stopPropagation()")," to your listener."),(0,i.kt)("h2",{id:"groups"},"Groups"),(0,i.kt)("p",null,"Groups receive events from their members, and propagate them. So a user can detect if any item in a given group is clicked on by adding listeners directly to the group."),(0,i.kt)("p",null,"Example:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"events-propagation-groups",src:n(3482).Z}),"\n",(0,i.kt)("em",{parentName:"p"},"The geom that was clicked on by the mouse emits the \u2018pointerDown\u2019 event, which is propagated by its parent. The Group receives the event from the parent, and propagates it. A \u2018pointerDown\u2019 listener registered on the group will then receive the event.")),(0,i.kt)("p",null,"Groups enable events to be aggregate from all members and propagated to any registered listeners."),(0,i.kt)("h2",{id:"summary"},"Summary"),(0,i.kt)("p",null,"The event model in the engine should be familiar to web developers as it follows closely the design of events in the browser. By providing a low level event framework, developer can build higher level functionality according to their own specific requirements."),(0,i.kt)("p",null,"Here, we have a live demo with three event propagation and listener scenarios."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The green square listens only to events triggered on itself."),(0,i.kt)("li",{parentName:"ul"},"The yellow-ish cylinder and torus geometries represent group events listening."),(0,i.kt)("li",{parentName:"ul"},"The blue cone listens to viewport events.")),(0,i.kt)("p",null,"The label on top of each geometry display the events triggered."),(0,i.kt)("p",null,'If you want to understand more of how everything works, check the code in the live demo by clicking in the "View Source" button on the bottom-right par of the frame.'),(0,i.kt)("iframe",{src:"https://glitch.com/embed/#!/embed/zea-demo-pointer-events?path=index.html&previewSize=100",class:"glitch",markdown:"1"}))}h.isMDXComponent=!0},7799:function(e,t,n){t.Z=n.p+"assets/images/events-hit-testing-5a46c62ba0bf8f83871b87ebe9bfa2fa.svg"},3482:function(e,t,n){t.Z=n.p+"assets/images/events-propagation-groups-880279b0b57c5125088c15f77c22715b.svg"},2080:function(e,t,n){t.Z=n.p+"assets/images/events-propagation-abc76645cd7c917cff2b35e11105a909.svg"}}]);