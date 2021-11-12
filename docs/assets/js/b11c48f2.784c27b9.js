"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[7925],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),u=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=u(e.components);return r.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=u(n),m=a,f=d["".concat(s,".").concat(m)]||d[m]||p[m]||o;return n?r.createElement(f,i(i({ref:t},c),{},{components:n})):r.createElement(f,i({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var u=2;u<o;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4159:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return u},toc:function(){return c},default:function(){return d}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),i=["components"],l={sidebar_position:1,title:"Setting up your workspace"},s=void 0,u={unversionedId:"Manual/Getting-Started/development-setup",id:"Manual/Getting-Started/development-setup",isDocsHomePage:!1,title:"Setting up your workspace",description:"You'll need to have these recommended applications (or an equivalent) running on your local machine.",source:"@site/docs/Manual/Getting-Started/development-setup.md",sourceDirName:"Manual/Getting-Started",slug:"/Manual/Getting-Started/development-setup",permalink:"/docs/Manual/Getting-Started/development-setup",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"Setting up your workspace"},sidebar:"manualSideBar",previous:{title:"Getting Started Overview",permalink:"/docs/Manual/Getting-Started/getting-started-overview"},next:{title:"Build Your First Project",permalink:"/docs/Manual/Getting-Started/build-first-project"}},c=[{value:"Code Editor",id:"code-editor",children:[]},{value:"Command Shell",id:"command-shell",children:[]},{value:"JavaScript Runtime Environment",id:"javascript-runtime-environment",children:[]},{value:"JavaScript Package Manager",id:"javascript-package-manager",children:[]},{value:"Next steps",id:"next-steps",children:[]}],p={toc:c};function d(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"You'll need to have these recommended applications (or an equivalent) running on your local machine.")),(0,o.kt)("h3",{id:"code-editor"},"Code Editor"),(0,o.kt)("p",null,"You will need a code editor to create your solution. Zea recommends using ",(0,o.kt)("a",{parentName:"p",href:"https://code.visualstudio.com/"},"Visual Studio Code"),"."),(0,o.kt)("p",null,"Visual Studio Code is a source-code editor developed by Microsoft for Windows, Linux, and macOS. It includes embedded Git and support for debugging, syntax highlighting, intelligent code completion, snippets, and code refactoring."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://code.visualstudio.com/"},"https://code.visualstudio.com/"))),(0,o.kt)("h3",{id:"command-shell"},"Command Shell"),(0,o.kt)("p",null,"Many of the commands in the 'How-To' and Tutorials need to be run in a command shell. For windows users, installing the Git Bash shell provides a powerful tool for running commands.\n",(0,o.kt)("a",{parentName:"p",href:"https://git-scm.com/downloads"},"https://git-scm.com/downloads")),(0,o.kt)("h3",{id:"javascript-runtime-environment"},"JavaScript Runtime Environment"),(0,o.kt)("p",null,"Node.js is an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside of a web browser."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://nodejs.org/en/"},"https://nodejs.org/en/"))),(0,o.kt)("p",null,"The most recent versions of Node.js also include ",(0,o.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/npx"},"npx"),", a ",(0,o.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Command-line_interface"},"CLI")," tool whose purpose is to make it easy to run any sort of Node.js based executable that you would normally install via a package manager."),(0,o.kt)("h3",{id:"javascript-package-manager"},"JavaScript Package Manager"),(0,o.kt)("p",null,"Yarn is a new package manager that replaces the existing workflow for the npm client or other package managers while remaining compatible with the npm registry. It has the same feature set as existing workflows while operating faster, more securely, and more reliably."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://classic.yarnpkg.com/en/docs/install/#windows-stable"},"https://classic.yarnpkg.com/en/docs/install/#windows-stable"))),(0,o.kt)("h2",{id:"next-steps"},"Next steps"),(0,o.kt)("p",null,"Now that you have a basic workspace setup, you can move onto getting your first build working"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},(0,o.kt)("a",{parentName:"p",href:"/docs/Manual/Getting-Started/build-first-project"},"Build your first project"))))}d.isMDXComponent=!0}}]);