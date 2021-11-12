"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[7354],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return g}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=c(n),g=a,f=d["".concat(l,".").concat(g)]||d[g]||p[g]||i;return n?r.createElement(f,o(o({ref:t},u),{},{components:n})):r.createElement(f,o({ref:t},u))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var c=2;c<i;c++)o[c]=n[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6928:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return u},default:function(){return d}});var r=n(7462),a=n(3366),i=(n(7294),n(3905)),o=["components"],s={sidebar_position:3,title:"Debugging"},l=void 0,c={unversionedId:"Manual/Getting-Started/debugging",id:"Manual/Getting-Started/debugging",isDocsHomePage:!1,title:"Debugging",description:"this follows the previous part Build your first project",source:"@site/docs/Manual/Getting-Started/debugging.md",sourceDirName:"Manual/Getting-Started",slug:"/Manual/Getting-Started/debugging",permalink:"/docs/Manual/Getting-Started/debugging",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,title:"Debugging"},sidebar:"manualSideBar",previous:{title:"Build Your First Project",permalink:"/docs/Manual/Getting-Started/build-first-project"},next:{title:"Concepts Overview",permalink:"/docs/Manual/Concepts/zea-engine-architecture"}},u=[{value:"Step 1",id:"step-1",children:[]},{value:"Step 2",id:"step-2",children:[]},{value:"Step 3",id:"step-3",children:[]},{value:"Step 4",id:"step-4",children:[]},{value:"Next steps",id:"next-steps",children:[]}],p={toc:u};function d(e){var t=e.components,s=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},p,s,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"this follows the previous part ",(0,i.kt)("a",{parentName:"p",href:"../getting-started/build-first-project"},"Build your first project"))),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Please make sure you're already familiar with ",(0,i.kt)("a",{parentName:"p",href:"https://developers.google.com/web/tools/chrome-devtools/javascript"},"debugging JavaScript using Chrome DevTools"),".")),(0,i.kt)("p",null,"Now, let's debug a hypothetical situation. For some reason, your grid is not rendering, and all you get is a strange looking white plane, like this:"),(0,i.kt)("p",null,"\ud83d\udcf7 A strange looking white plane, Aka, the \ud83d\udc1e:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"getting-started-strange-plane",src:n(6149).Z,title:":class=screenshot"})),(0,i.kt)("h3",{id:"step-1"},"Step 1"),(0,i.kt)("p",null,"Open the DevTools Sources panel and locate the index.js file:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"getting-started-sources-panel",src:n(1569).Z,title:":class=screenshot"})),(0,i.kt)("h3",{id:"step-2"},"Step 2"),(0,i.kt)("p",null,"Pause the code with a breakpoint:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"getting-started-breakpoint-start",src:n(8351).Z,title:":class=screenshot"})),(0,i.kt)("h3",{id:"step-3"},"Step 3"),(0,i.kt)("p",null,"Step through the code until the end of the file:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"getting-started-breakpoint-end",src:n(7079).Z,title:":class=screenshot"})),(0,i.kt)("p",null,"Aha! Looks like we're so thrilled about learning the Zea Engine ways, that we accidentally left an extra line at the end. It turns out the strange looking white plane is actually a very crammed grid, with 10000 subdivisions in each direction."),(0,i.kt)("h3",{id:"step-4"},"Step 4"),(0,i.kt)("p",null,"Remove or comment the problematic line. Your grid should render again:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"getting-started-commented-line",src:n(3262).Z,title:":class=screenshot"})),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"getting-started-working-grid",src:n(597).Z,title:":class=screenshot"})),(0,i.kt)("h2",{id:"next-steps"},"Next steps"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Use the ",(0,i.kt)("a",{parentName:"p",href:"/docs/Tutorials/basic-template"},"Basic Setup Template")," and follow a few ",(0,i.kt)("a",{parentName:"p",href:"/docs/Tutorials/tutorials"},"Tutorials"),".")),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Learn how to ",(0,i.kt)("a",{parentName:"p",href:"/docs/Tutorials/load-an-asset"},"load assets")," into your Zea Engine App; when you're done with that, view the ",(0,i.kt)("a",{parentName:"p",href:"https://docs.zea.live/zea-cad/#/getting-started/get-started-with-zea-cad"},"Zea CAD")," docs for more advanced use cases.")))}d.isMDXComponent=!0},7079:function(e,t,n){t.Z=n.p+"assets/images/getting-started-breakpoint-end-95e02507bd2882df6e0471f1ae254040.png"},8351:function(e,t,n){t.Z=n.p+"assets/images/getting-started-breakpoint-start-0e3a2dac4ba86b0ec76c462ae5b6c150.png"},3262:function(e,t,n){t.Z=n.p+"assets/images/getting-started-commented-line-6f8cc599fbcdea11674ecaf656ae43b9.png"},1569:function(e,t,n){t.Z=n.p+"assets/images/getting-started-sources-panel-5fd8ce627713301b69b73720630ea847.png"},6149:function(e,t,n){t.Z=n.p+"assets/images/getting-started-strange-plane-13a1b22b03bd7c535b2c0d95c3aca2d0.png"},597:function(e,t,n){t.Z=n.p+"assets/images/getting-started-working-grid-2b0aa17f01c2789ef11f52b1150d791f.png"}}]);