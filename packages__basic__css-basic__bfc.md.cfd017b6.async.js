(self["webpackChunkFE_note"]=self["webpackChunkFE_note"]||[]).push([[992],{1422:e=>{"use strict";e.exports={}},3859:(e,n,l)=>{"use strict";l.r(n),l.d(n,{default:()=>t});const t={}},3224:(e,n,l)=>{"use strict";l.r(n),l.d(n,{default:()=>r});var t=l(7294),a=l(6584),c=l(2196);l(3859);const r=e=>(t.useEffect((()=>{null!==e&&void 0!==e&&e.location.hash&&a.AnchorLink.scrollToAnchor(decodeURIComponent(e.location.hash.slice(1)))}),[]),t.createElement(t.Fragment,null,t.createElement("div",{className:"markdown"},t.createElement("h1",{id:"\u4ec0\u4e48\u662fbfc\uff1f"},t.createElement(a.AnchorLink,{to:"#\u4ec0\u4e48\u662fbfc\uff1f","aria-hidden":"true",tabIndex:-1},t.createElement("span",{className:"icon icon-link"})),"\u4ec0\u4e48\u662fBFC\uff1f"),t.createElement("p",null,"\u4e86\u89e3",t.createElement("code",null,"BFC"),"\u4e4b\u524d\u9700\u8981\u5148\u4e86\u89e3",t.createElement("strong",null,"\u683c\u5f0f\u5316\u4e0a\u4e0b\u6587"),"\u3002"),t.createElement("h2",{id:"\u683c\u5f0f\u5316\u4e0a\u4e0b\u6587"},t.createElement(a.AnchorLink,{to:"#\u683c\u5f0f\u5316\u4e0a\u4e0b\u6587","aria-hidden":"true",tabIndex:-1},t.createElement("span",{className:"icon icon-link"})),"\u683c\u5f0f\u5316\u4e0a\u4e0b\u6587"),t.createElement("p",null,"\u5b83\u662f css2.1\u89c4\u8303\u63d0\u51fa\u7684\u6982\u5ff5,\u5b9a\u4e49\u7684\u662f\u9875\u9762\u4e2d\u7684\u4e00\u5757\u6e32\u67d3\u533a\u57df\uff0c\u7c7b\u4f3cjs\u8bed\u8a00\u4e2d\u7684\u201c\u4f5c\u7528\u57df\u201d\u3002\u683c\u5f0f\u5316\u4e0a\u4e0b\u6587\u5206\u4e3a\u4e24\u79cd:\u5757\u7ea7\u683c\u5f0f\u4e0a\u4e0b\u6587\uff08BFC\uff09\u4e0e\u5185\u8054\u683c\u5f0f\u5316\u4e0a\u4e0b\u6587(IFC)."),t.createElement("h2",{id:"bfc\u7b80\u4ecb"},t.createElement(a.AnchorLink,{to:"#bfc\u7b80\u4ecb","aria-hidden":"true",tabIndex:-1},t.createElement("span",{className:"icon icon-link"})),"BFC\u7b80\u4ecb"),t.createElement("p",null,"BFC(Block Formatting Context)\u662fWeb\u9875\u9762\u4e2d\u76d2\u6a21\u578b\u5e03\u5c40\u7684CSS\u6e32\u67d3\u6a21\u5f0f\u3002\u5b83\u7684\u5b9a\u4f4d\u4f53\u7cfb\u5c5e\u4e8e\u5e38\u89c4\u6587\u6863\u6d41\u3002\u6458\u81eaW3C\uff1a"),t.createElement("blockquote",null,t.createElement("p",null,"\u6d6e\u52a8\uff0c\u7edd\u5bf9\u5b9a\u4f4d\u5143\u7d20\uff0cinline-blocks, table-cells, table-captions,\u548coverflow\u7684\u503c\u4e0d\u4e3avisible\u7684\u5143\u7d20\uff0c\uff08\u9664\u4e86\u8fd9\u4e2a\u503c\u5df2\u7ecf\u88ab\u4f20\u5230\u4e86\u89c6\u53e3\u7684\u65f6\u5019\uff09\u5c06\u521b\u5efa\u4e00\u4e2a\u65b0\u7684\u5757\u7ea7\u683c\u5f0f\u5316\u4e0a\u4e0b\u6587\u3002")),t.createElement("p",null,"1\uff09\u5f62\u6210\u6761\u4ef6"),t.createElement("p",null,"\u4e00\u4e2aBFC\u662f\u4e00\u4e2aHTML\u76d2\u5b50\u5e76\u4e14\u81f3\u5c11\u6ee1\u8db3\u4e0b\u5217\u6761\u4ef6\u4e2d\u7684\u4efb\u4f55\u4e00\u4e2a\uff1a"),t.createElement("ul",null,t.createElement("li",null,"\u6839\u5143\u7d20\u6216\u5305\u542b\u6839\u5143\u7d20\u7684\u5143\u7d20"),t.createElement("li",null,"\u8131\u79bb\u666e\u901a\u6587\u6863\u6d41\u7684\u5143\u7d20",t.createElement("ul",null,t.createElement("li",null,"float\u7684\u503c\u4e0d\u4e3anone"),t.createElement("li",null,"position\u7684\u503c\u4e0d\u4e3astatic\u6216\u8005relative"))),t.createElement("li",null,"\u975e\u5757\u7ea7\u5143\u7d20",t.createElement("ul",null,t.createElement("li",null,"display\u7684\u503c\u4e3a table-cell, table-caption, inline-block, flex, \u6216\u8005 inline-flex\u4e2d\u7684\u5176\u4e2d\u4e00\u4e2a"))),t.createElement("li",null,"overflow\u7684\u503c\u4e0d\u4e3avisible")),t.createElement("p",null,"2\uff09\u4ea7\u751f\u7684\u5f71\u54cd"),t.createElement("ul",null,t.createElement("li",null,"\u540c\u4e00\u4e2aBFC\u5185\u7684\u76f8\u90bb\u5757\u7ea7\u5143\u7d20\u7684\u5782\u76f4\u5916\u8fb9\u8ddd\u53d1\u751f\u91cd\u53e0,\u5373\u4e24\u8005\u5916\u8fb9\u8ddd\u53d6\u51b3\u4e8e\u4e24\u8005\u53cc\u65b9\u8fb9\u8ddd\u7684\u6700\u5927\u503c\u3002"),t.createElement("li",null,"BFC \u662f\u9875\u9762\u4e0a\u9694\u79bb\u7684\u72ec\u7acb\u5bb9\u5668\uff0c\u5185\u90e8\u5143\u7d20\u4e0d\u4f1a\u4e0e\u5916\u90e8\u5143\u7d20\u4e92\u76f8\u5f71\u54cd"),t.createElement("li",null,"\u8ba1\u7b97BFC\u9ad8\u5ea6\u65f6,\u5185\u90e8\u7684\u6d6e\u52a8\u4e5f\u4f1a\u88ab\u8ba1\u7b97\u5728\u5185")),t.createElement("p",null,t.createElement("strong",null,"\u5177\u6709 BFC \u7279\u6027\u7684\u5143\u7d20\u53ef\u4ee5\u770b\u4f5c\u662f\u9694\u79bb\u4e86\u7684\u72ec\u7acb\u5bb9\u5668\uff0c\u5bb9\u5668\u91cc\u9762\u7684\u5143\u7d20\u4e0d\u4f1a\u5728\u5e03\u5c40\u4e0a\u5f71\u54cd\u5230\u5916\u9762\u7684\u5143\u7d20\uff0c\u5e76\u4e14 BFC \u5177\u6709\u666e\u901a\u5bb9\u5668\u6240\u6ca1\u6709\u7684\u4e00\u4e9b\u7279\u6027\u3002")),t.createElement("h2",{id:"bfc\u53ef\u4ee5\u7684\u89e3\u51b3\u95ee\u9898"},t.createElement(a.AnchorLink,{to:"#bfc\u53ef\u4ee5\u7684\u89e3\u51b3\u95ee\u9898","aria-hidden":"true",tabIndex:-1},t.createElement("span",{className:"icon icon-link"})),"BFC\u53ef\u4ee5\u7684\u89e3\u51b3\u95ee\u9898"),t.createElement("h3",{id:"\u6d88\u9664\u6d6e\u52a8"},t.createElement(a.AnchorLink,{to:"#\u6d88\u9664\u6d6e\u52a8","aria-hidden":"true",tabIndex:-1},t.createElement("span",{className:"icon icon-link"})),"\u6d88\u9664\u6d6e\u52a8"),t.createElement("p",null,t.createElement("strong",null,"\u6e05\u9664\u6d6e\u52a8")),t.createElement(c.Z,{code:'<style>\n.box {\n  background-color: rgb(224, 206, 247);\n  border: 5px solid rebeccapurple;\n  display: flow-root; //\u5b83\u53ef\u4ee5\u521b\u5efa\u65e0\u526f\u4f5c\u7528\u7684BFC\n}\n\n.float {\n  float: left;\n  width: 200px;\n  height: 150px;\n  background-color: white;\n  border:1px solid black;\n  padding: 10px;\n}  \n</style>\n<div className="box">\n  <div className="float">I am a floated box!</div>\n  <p>I am content inside the container.</p>\n</div>',lang:"html"}),t.createElement("h3",{id:"\u9632\u6b62\u6587\u5b57\u73af\u7ed5"},t.createElement(a.AnchorLink,{to:"#\u9632\u6b62\u6587\u5b57\u73af\u7ed5","aria-hidden":"true",tabIndex:-1},t.createElement("span",{className:"icon icon-link"})),"\u9632\u6b62\u6587\u5b57\u73af\u7ed5"),t.createElement(c.Z,{code:'<div class="container">\n  <div class="floated">Floated div</div>\n  <p>Quae hic ut ab perferendis sit quod architecto,dolor debitis quam rem provident aspernatur tempora expedita.</p>\n</div>\n<style>\n.container{\n  width: 150px;\n  background-color: green;\n}\n.container::after{\n  content: \' \';\n  border:1px solid red;\n  visibility: hidden;\n  display: block;\n  clear: both;\n}\n.floated{\n  float: left;\n  background-color: red;\n}\n.container p{\n  overflow: hidden;\n  background-color: aqua;\n}\n</syle>',lang:"html"}),t.createElement("h3",{id:"\u5916\u8fb9\u8ddd\u584c\u9677"},t.createElement(a.AnchorLink,{to:"#\u5916\u8fb9\u8ddd\u584c\u9677","aria-hidden":"true",tabIndex:-1},t.createElement("span",{className:"icon icon-link"})),"\u5916\u8fb9\u8ddd\u584c\u9677"),t.createElement("p",null,"\u521b\u5efa\u65b0\u7684BFC\u907f\u514d\u4e24\u4e2a\u76f8\u90bb "),t.createElement("div",null," \u4e4b\u95f4\u7684 \u5916\u8fb9\u8ddd\u5408\u5e76 \u95ee\u9898",t.createElement("p",null),t.createElement(c.Z,{code:'<style>\n  .blue, .red-inner {\n  height: 50px;\n  margin: 10px 0;\n}\n\n.blue {\n  background: blue;\n}\n\n.red-outer {\n  overflow: hidden; //\u8ba9\u5176\u5904\u4e8eBFC\n  background: red;\n}\n.red-inner{\n  background: gray;\n}\n</style>\n<div class="blue"></div>\n<div class="red-outer">\n  <div class="red-inner">red inner</div>\n</div>',lang:"html"})))))}}]);