(self["webpackChunkFE_note"]=self["webpackChunkFE_note"]||[]).push([[4698],{1422:e=>{"use strict";e.exports={}},3859:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>l});const l={}},1074:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>r});var l=t(7294),a=t(6584),c=t(2196);t(3859);const r=e=>(l.useEffect((()=>{null!==e&&void 0!==e&&e.location.hash&&a.AnchorLink.scrollToAnchor(decodeURIComponent(e.location.hash.slice(1)))}),[]),l.createElement(l.Fragment,null,l.createElement("div",{className:"markdown"},l.createElement("h1",{id:"\u5b9e\u73b0\u7b49\u5bbd\u7b49\u95f4\u8ddd\u4e09\u5217\u5e03\u5c40"},l.createElement(a.AnchorLink,{to:"#\u5b9e\u73b0\u7b49\u5bbd\u7b49\u95f4\u8ddd\u4e09\u5217\u5e03\u5c40","aria-hidden":"true",tabIndex:-1},l.createElement("span",{className:"icon icon-link"})),"\u5b9e\u73b0\u7b49\u5bbd\u7b49\u95f4\u8ddd\u4e09\u5217\u5e03\u5c40"),l.createElement("p",null,"\u9762\u8bd5\u5b98\u95ee: \u73b0\u5728\u8981\u5b9e\u73b0\u4e00\u4e2a\u4e09\u5217\u5e03\u5c40\u5e76\u4e14\u5b83\u4eec\u5bbd\u5ea6\u81ea\u9002\u5e94\u4e2d\u95f4\u95f4\u8ddd10px\u3002"),l.createElement("h2",{id:"\u91c7\u7528-flex"},l.createElement(a.AnchorLink,{to:"#\u91c7\u7528-flex","aria-hidden":"true",tabIndex:-1},l.createElement("span",{className:"icon icon-link"})),"\u91c7\u7528 flex"),l.createElement("p",null,"\u7236\u5143\u7d20\u8bbe\u7f6e flex,\u5b50\u5143\u7d20\u5e73\u5206\u7a7a\u95f4 \u7136\u540e\u4e2d\u95f4\u91c7\u7528margin \u5de6\u53f3\u540410px"),l.createElement(c.Z,{code:'<section class="layout-flex">\n        <style>\n            .layout-flex>.left-center-right {\n                display: flex;\n                min-height: 200px;\n            }\n\n            .layout-flex>.left-center-right .left {\n                flex: 1;\n                background-color: orange;\n            }\n\n            .layout-flex>.left-center-right .right {\n                flex: 1;\n                background-color: orange;\n            }\n\n            .layout-flex>.left-center-right .center {\n                flex: 1;\n                margin: 0 10px;\n                background-color: blue;\n            }\n\n        </style>\n        <article class="left-center-right">\n            <div class="left">left</div>\n            <div class="center">center</div>\n            <div class="right">right</div>\n        </article>\n    </section>',lang:"html"}),l.createElement("h2",{id:"\u91c7\u7528-float"},l.createElement(a.AnchorLink,{to:"#\u91c7\u7528-float","aria-hidden":"true",tabIndex:-1},l.createElement("span",{className:"icon icon-link"})),"\u91c7\u7528 float"),l.createElement("p",null,"\u4e3b\u8981\u501f\u52a9box-sizing \u7279\u6027\u3002\u8bbe\u7f6e\u8fb9\u6846\u76d2\u6a21\u578b\u7136\u540e\u6bcf\u4e2a\u76d2\u5b50\u8bbe\u7f6e padding\u3001\u5e76\u91c7\u7528 background-clip\u88c1\u526a\u5185\u5bb9\u533a\u57df\uff0c\u6700\u540e\u7ed9\u7236\u5143\u7d20\u8bbe\u7f6emargin -10px \u53d6\u51fa\u4e24\u8fb9\u7684\u95f4\u8ddd\u3002"),l.createElement(c.Z,{code:'<section class="layout-float">\n        <style>\n            .layout-float>.left-center-right {\n                margin: 0 -5px;\n                height: 100%;\n                 display: flow-root; /*\u6e05\u9664\u6d6e\u52a8 */\n            }\n\n            .layout-float>.left-center-right>div {\n                box-sizing: border-box;\n                width: 33.33%;\n                height: 200px;\n                padding: 0 5px;\n                background-clip: content-box;\n                float: left;\n            }\n            .layout-float>.left-center-right .left {\n                background-color: gray;\n            }\n\n            .layout-float>.left-center-right .center {\n                background-color: brown;\n            }\n\n            .layout-float>.left-center-right .right {\n                background-color: black;\n\n            }\n\n        </style>\n        <article class="left-center-right">\n            <div class="left">left</div>\n            <div class="center">center</div>\n            <div class="right">right</div>\n        </article>\n    </section>',lang:"html"}),l.createElement("h2",{id:"\u91c7\u7528-margin-calc-\u8ba1\u7b97\u5c5e\u6027"},l.createElement(a.AnchorLink,{to:"#\u91c7\u7528-margin-calc-\u8ba1\u7b97\u5c5e\u6027","aria-hidden":"true",tabIndex:-1},l.createElement("span",{className:"icon icon-link"})),"\u91c7\u7528 margin calc \u8ba1\u7b97\u5c5e\u6027"),l.createElement("p",null,"\u8be5\u65b9\u6cd5\u548c\u91c7\u7528 float \u5927\u81f4\u601d\u60f3\u4e00\u81f4,\u53ea\u662f\u73b0\u5728with\u7531 calc\u8ba1\u7b97\u3002"),l.createElement(c.Z,{code:'<section class="layout-margin-calc">\n        <style>\n            .layout-margin-calc .left-center-right {\n                margin-left: -10px;\n            }\n\n            .layout-margin-calc .left-center-right div {\n                float: left;\n                height: 200px;\n                width: calc(33.33% - 10px);\n                margin-left: 10px;\n            }\n\n            .layout-margin-calc .left-center-right .left,\n            .layout-margin-calc .left-center-right .right {\n                background-color: orange;\n            }\n\n            .layout-margin-calc .left-center-right .center {\n                background-color: gray;\n            }\n\n        </style>\n        <article class="left-center-right">\n            <div class="left">left</div>\n            <div class="center">center</div>\n            <div class="right">right</div>\n        </article>\n    </section>',lang:"html"}))))}}]);