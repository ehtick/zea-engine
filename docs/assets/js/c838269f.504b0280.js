"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[3647],{3905:function(e,t,a){a.d(t,{Zo:function(){return p},kt:function(){return g}});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),c=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},p=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),d=c(a),g=r,m=d["".concat(s,".").concat(g)]||d[g]||u[g]||i;return a?n.createElement(m,l(l({ref:t},p),{},{components:a})):n.createElement(m,l({ref:t},p))}));function g(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,l=new Array(i);l[0]=d;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var c=2;c<i;c++)l[c]=a[c];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},7020:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return o},contentTitle:function(){return s},metadata:function(){return c},toc:function(){return p},default:function(){return d}});var n=a(7462),r=a(3366),i=(a(7294),a(3905)),l=["components"],o={sidebar_position:1,title:"Overview"},s=void 0,c={unversionedId:"Plugins/plugins-templates-overview",id:"Plugins/plugins-templates-overview",isDocsHomePage:!1,title:"Overview",description:"Templates",source:"@site/docs/Plugins/plugins-templates-overview.md",sourceDirName:"Plugins",slug:"/Plugins/plugins-templates-overview",permalink:"/docs/Plugins/plugins-templates-overview",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"Overview"},sidebar:"pluginSidebar"},p=[{value:"Templates",id:"templates",children:[]},{value:"Plugins",id:"plugins",children:[]},{value:"Getting Started",id:"getting-started",children:[]}],u={toc:p};function d(e){var t=e.components,o=(0,r.Z)(e,l);return(0,i.kt)("wrapper",(0,n.Z)({},u,o,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"templates"},"Templates"),(0,i.kt)("p",null,"Templates can help you get started either building an application using the Zea Engine, or writing a new plugin for the engine."),(0,i.kt)("section",{class:"cards-large"},(0,i.kt)("div",{class:"card-large",markdown:"1"},(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-svelte-template"},(0,i.kt)("img",{alt:"Zea Svelte Template",src:a(3302).Z,title:":class=cardImg-large"})),"\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-svelte-template",title:":class=cardTitle-large"},"Zea Svelte Template")),(0,i.kt)("p",null,"Need to get up and running quickly? Zea provides a template application built using the popular new ",(0,i.kt)("a",{parentName:"p",href:"https://svelte.dev/"},"Svelte")," framework. This Template comes with a library of Svelte components that you can use to customize the application to your own requirements.\nthe Svelte template combines all of the stock libraries into a single well structured app. It shows how to setup UX, Collab, authentication, CAD rendering, selection etc...")),(0,i.kt)("div",{class:"card-large",markdown:"1"},(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-plugin-template"},(0,i.kt)("img",{alt:"zea-plugin-template",src:a(7089).Z,title:":class=cardImg-large"})),"\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-plugin-template",title:":class=cardTitle-large"},"Zea Plugin Template")),(0,i.kt)("p",null,"If you are interested in building your own plugin, or just want to see some sample code on how to extend the engine, check out the plugin template. The goal of the plugin template is to provide a quick start on building your own plugins, using the best practices, such as unit testing, end-to-end testing, and semantic versioning. We use the plugin template when we start working on a new plugin to get up and running quickly."))),(0,i.kt)("h2",{id:"plugins"},"Plugins"),(0,i.kt)("p",null,"The Zea Engine provides a core and basic functionality, and a collection of plugins that extend the functionally of the engine for more specific use cases."),(0,i.kt)("section",{class:"cards-large"},(0,i.kt)("div",{class:"card-large",markdown:"1"},(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://docs.zea.live/zea-ux/"},(0,i.kt)("img",{alt:"Zea UX",src:a(7165).Z,title:":class=cardImg-large"})),"\n",(0,i.kt)("a",{parentName:"p",href:"https://docs.zea.live/zea-ux/",title:":class=cardTitle-large"},"Zea UX Manual")),(0,i.kt)("p",null,"The UX library provides a collection of plugins and tools for User Experience, such as Undo Redo, Onscreen widgets for moving objects around, and 3d controls to edit scene parameters.")),(0,i.kt)("div",{class:"card-large",markdown:"1"},(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://docs.zea.live/zea-cad/"},(0,i.kt)("img",{alt:"Zea CAD",src:a(7861).Z,title:":class=cardImg-large"})),"\n",(0,i.kt)("a",{parentName:"p",href:"https://docs.zea.live/zea-cad/",title:":class=cardTitle-large"},"Zea CAD Manual")),(0,i.kt)("p",null,"To handle loading massive CAD and BIM data sets quickly, Zea provides the CAD plugin that loads and renders large CAD data sets with ease. CAD data is quite different from other kinds of data, and Zea CAD leverages the unique properties of parametric surfaces to reduce load times and increase size limits when loading CAD and BIM data in the browser.")),(0,i.kt)("div",{class:"card-large",markdown:"1"},(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://docs.zea.live/zea-collab/"},(0,i.kt)("img",{alt:"Zea Collab",src:a(307).Z,title:":class=cardImg-large"})),"\n",(0,i.kt)("a",{parentName:"p",href:"https://docs.zea.live/zea-collab/",title:":class=cardTitle-large"},"Zea Collab Manual")),(0,i.kt)("p",null,"One huge benefit of web applications is being able to connect users together for collaboration or presentations. The Zea Collab library provides Client and Server side tools for connecting and synchronizing users.")),(0,i.kt)("div",{class:"card-large",markdown:"1"},(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://docs.zea.live/zea-potree/"},(0,i.kt)("img",{alt:"Zea Potree",src:a(7550).Z,title:":class=cardImg-large"})),"\n",(0,i.kt)("a",{parentName:"p",href:"https://docs.zea.live/zea-potree/",title:":class=cardTitle-large"},"Zea Potree Manual")),(0,i.kt)("p",null,"Zea Potree is a plugin for Zea Engine that integrates the powerful ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/potree/potree/"},"Potree"),". Zea Potree enables loading and rendering of massive LiDAR and point cloud data directly in the browser. The integration of Potree into Zea Engine provides a few important improvements, including better performance and reduced battery consumption on mobile devices. When combined with the other powerful features of Zea Engine, like CAD and BIM data loading, Zea Potree can be used for advanced uses cads such as metrology and build inspections."))),(0,i.kt)("h2",{id:"getting-started"},"Getting Started"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("a",{parentName:"p",href:"/docs/Manual/Getting-Started/getting-started-overview"},"Getting Started With Zea Engine"),"\nTo get started using Zea Engine, you can start by learning the basics of how to setup the engine yourself in the Getting Started guide")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-svelte-template"},"Zea Svelte Template"),"\nOr you can jump straight into a full web application using the Svelte template."))))}d.isMDXComponent=!0},7861:function(e,t,a){t.Z=a.p+"assets/images/4x4-6f169d08de9ff414b3fc046ac4b26ae3.jpg"},7165:function(e,t,a){t.Z=a.p+"assets/images/ux-handles-f93c4ab98fea94d89b40bc6f9e68146e.jpg"},307:function(e,t,a){t.Z=a.p+"assets/images/vr-collaboration-9ff7a2227caa8f37e0101259d9c35c4c.jpg"},7089:function(e,t,a){t.Z=a.p+"assets/images/zea-plugin-template-99b454dbbb671f4a0248ae5adeef0aba.png"},7550:function(e,t,a){t.Z=a.p+"assets/images/zea-pointclouds-4c4ef531cb46ac55eb62f3eb5d71feec.jpg"},3302:function(e,t,a){t.Z=a.p+"assets/images/zea-svelte-template-07ef2e87f5fcb713047eb249ed8ddbf8.jpg"}}]);