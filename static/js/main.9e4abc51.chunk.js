(this["webpackJsonpscraper-react-trial"]=this["webpackJsonpscraper-react-trial"]||[]).push([[0],{21:function(e,t,n){},22:function(e,t,n){"use strict";n.r(t);var r=n(1),i=n(2),c=n(12),a=n.n(c),l=n(13),s=n(6),o=n(7),u=n(15),d=n(14),p=n(4),f=n(3),h=function(e){var t=e.urlValue,n=e.siteName,i=e.onSiteInputChange,c=e.urlProp,a=e.nameProp,l=e.siteNum,s=e.onSiteDelete;return Object(r.jsxs)("div",{className:"list wrapper",children:[Object(r.jsx)("div",{className:"list-name label",children:Object(r.jsx)("label",{children:"List: "})}),Object(r.jsx)("div",{className:"list-name input",children:Object(r.jsx)("input",{type:"text",placeholder:"Sitemap name",value:n,onChange:function(e){return i(e,a)}})}),Object(r.jsx)("div",{className:"list-URL label",children:Object(r.jsx)("label",{children:"URL: "})}),Object(r.jsx)("div",{className:"list-URL input",children:Object(r.jsx)("input",{type:"text",placeholder:"URL address",value:t,onChange:function(e){return i(e,c)}})}),Object(r.jsx)("div",{className:"list-delete",children:l>1?Object(r.jsx)(f.c,{className:"deleteList button",title:"Delete the current sitemap.",onClick:s}):null})]})},j=n(9),m=function(e){var t=e.AddChild,n=e.AddSelector,i=e.Delete,c=e.siblings,a=e.parentType;return Object(r.jsxs)("div",{className:"selector-list controls",children:[Object(r.jsx)(j.a,{className:"addChildButton button",onClick:t,title:"Add a child selector."}),Object(r.jsx)(j.b,{className:"addSelectorButton button",title:"Add a new selector for this list.",onClick:n}),c>1||"sitemap"!==a?Object(r.jsx)(j.c,{className:"deleteSelectorButton button",title:"Recursively delete the current selector.",onClick:i}):null]})},b=function(e){var t=e.selectorID,n=e.selectorValue,i=e.index,c=e.placeholder,a=e.subType,l=e.onSelectorChange;return Object(r.jsx)("div",{className:"selector-list ".concat(a),id:"".concat(t,"-").concat(a),children:Object(r.jsx)("input",{type:"text",value:n,placeholder:c,onChange:function(e){return l(e,a)},id:"".concat(a,"-").concat(i+1)})})},O=function(e){var t=e.selectorID,n=e.checkedStatus,i=e.onSelectorChange;return Object(r.jsxs)("div",{className:"selector-list multiple checkbox",children:[Object(r.jsx)("label",{htmlFor:"checkbox-".concat(t),children:"Multiple?"}),Object(r.jsx)("input",{type:"checkbox",onChange:function(e){return i(e)},id:"checkbox-".concat(t),checked:n})]})},v=function(e){var t=e.selectorID,n=e.onDeleteSelector,i=e.onSiteClear,c=e.onAddSelector,a=e.onAddChild,l=e.onSelectorChange,s=e.parentIndex,o=e.index,u=e.selectorValue,d=e.selectorName,p=e.siblings,h=e.children,j=e.parentType,v=e.position,x=e.checkedStatus;return Object(r.jsxs)("li",{className:"selector-list wrapper",id:"lineItem-".concat(t),children:[Object(r.jsx)("div",{className:"selector-list label",children:Object(r.jsxs)("label",{htmlFor:t,children:["Sel. ",s?"".concat(s,".").concat(o+1,": "):"".concat(o+1,": ")]})}),Object(r.jsx)(b,{placeholder:"Selector name",selectorID:t,subType:"name",index:o,onSelectorChange:function(e,t){return l(e,t)},selectorValue:d}),Object(r.jsx)(b,{selectorID:t,placeholder:"Selector definition",subType:"value",index:o,onSelectorChange:function(e){return l(e,"value")},selectorValue:u}),Object(r.jsx)(O,{selectorID:t,onSelectorChange:function(e){return l(e,"multiple")},checked:x}),Object(r.jsx)(m,{AddChild:a,AddSelector:c,Delete:n,siblings:p,parentType:j,position:v}),(p>1||h>=1)&&"sitemap"===j&&0===v?Object(r.jsx)(f.a,{className:"clearSiteMapButton button",title:"Clear all selectors.",onClick:i}):null]},"lineItem-".concat(t))},x=function(e,t,n){var r=[];return r=n.filter((function(t){return t.parentOf.includes(e.id)})).length>0?n:t,console.log("Target array: ",r),r.filter((function(t){return t.parentOf.includes(e.id)}))[0].parentOf.findIndex((function(t){return t===e.id}))+1},S=function(e,t,n){if("sitemap"!==e.componentClass){for(var r=[],i="selector",c=e,a=function(){r.push(x(c,t,n)),console.log("Intermediate array indices: ",r.reverse());var e=c.childOf[0];0===n.filter((function(t){return t.id===e})).length?c=t.filter((function(t){return t.id===e}))[0]:i="sitemap"};"sitemap"!==i;)a();return r.join(".")}},g=function(e){var t=e.onSiteInputChange,n=e.onSiteDelete,c=e.onSelectorChange,a=e.selectorProperty,l=e.onAddSelector,s=e.onAddChild,o=e.onDeleteSelector,u=e.onClearSiteMap,d=e.stateArray,p=d.filter((function(e){return"sitemap"===e.componentClass})),f=d.filter((function(e){return"selector"===e.componentClass}));function j(e,d,p){var f=d.parentOf.map((function(t){return e.filter((function(e){return e.id===t}))})).flat();if(f)return Object(r.jsxs)("ul",{id:d.id,className:"sitemap"===d.componentClass?"singleList":"",children:["sitemap"===d.componentClass?Object(r.jsx)(h,{urlValue:d.value,siteName:d.name,urlProp:"url",nameProp:"name",onSiteInputChange:function(e,n){return t(d.id,e.target.value,n)},onSiteDelete:function(){return n(d.id)},siteNum:p.length},"url--".concat(d.id)):null,f.map((function(t){return Object(r.jsxs)(i.Fragment,{children:[Object(r.jsx)(v,{selectorID:t.id,parentIndex:"sitemap"!==d.componentClass?S(d,e,p):null,index:d.parentOf.findIndex((function(e){return e===t.id})),siblings:d.parentOf.length,children:t.parentOf.length,parentType:d.componentClass,position:d.parentOf.findIndex((function(e){return e===t.id})),selectorName:a(t.id,"name"),selectorValue:a(t.id,"value"),onSelectorChange:function(e,n){return c(t.id,e.target.value,n)},checkedStatus:a(t.id,"multiple"),onAddSelector:function(){return l(d.id,d.parentOf.findIndex((function(e){return e===t.id})))},onAddChild:function(){return s(t.id)},onDeleteSelector:function(){return o(t.id)},onSiteClear:function(){return u(d)}},t.id),t.parentOf.length?Object(r.jsx)("ul",{children:j(e,t,p)},"".concat(t.id,"-children")):null]},"Fragment-".concat(t.id))}))]},d.id)}return Object(r.jsx)(i.Fragment,{children:p.map((function(e){return j(f,e,p)}))})},C=n(11),y=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Object(p.a)(),n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";Object(s.a)(this,e),this.id=t,this.url="",this.componentClass="sitemap",this.name=n,this.parentOf=[]}return Object(o.a)(e,[{key:"updateSitemap",value:function(e,t){this[t]=e}}]),e}(),N=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Object(p.a)();Object(s.a)(this,e),this.id=n,this.name="",this.value="",this.multiple="",this.componentClass="selector",this.type="",this.memberOfSiteMap="",this.childOf=[t],this.parentOf=[]}return Object(o.a)(e,[{key:"updateSelector",value:function(e,t){this[t]=e}}]),e}();function I(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:Object(p.a)();if(e.find((function(e){return e.id===r})))return console.error("Error: a child with this id already exists!");var i=e.filter((function(e){return e.id===t}));if(!i.length)return console.error("Error: Parent does not exist!");(i=i[0]).type="link";var c=new N(t,r);if(void 0===n&&(n=i.parentOf.length?i.parentOf.length-1:0),n===i.parentOf.length-1||0===i.parentOf.length)i.parentOf.push(r);else{var a=[].concat(Object(C.a)(i.parentOf.slice(0,n+1)),[r],Object(C.a)(i.parentOf.slice(n+1)));i.parentOf=a}var l=function t(n){"sitemap"===n.componentClass?c.memberOfSiteMap=n.id:t(e.filter((function(e){return e.id===n.childOf[0]}))[0])};l(i),e.push(c),e.forEach((function(e){if(e.id===t)return i}))}function M(e,t){var n=[],r=1;return function e(t,i){var c=t.filter((function(e){return e.id===i}));if(n=t.filter((function(e){return e.id!==i})),1===r){var a=t.filter((function(e){return e.parentOf.includes(i)}));if(a.length){a=a[0];var l=t.findIndex((function(e){return e.parentOf.includes(i)}));a=a.parentOf.filter((function(e){return e!==i})),n[l].parentOf=a}}r++;var s=c.map((function(e){return e.parentOf})).flat();return s.length&&s.forEach((function(t){return e(n,t)})),n}(e,t)}n(21);var k=function(){return Object(r.jsx)("header",{children:Object(r.jsxs)("div",{className:"title-bar",children:[Object(r.jsx)("h1",{id:"main-title",className:"title",children:"CDS -"}),Object(r.jsxs)("div",{className:"main-subtitle",children:[Object(r.jsx)("h2",{className:"title inline-subtitle",children:"Compact Desktop Scraper"}),Object(r.jsx)("p",{children:"A work in progress"})]})]})})},D=[];D.push(new y("InitialMap","First Map")),I(D,"InitialMap",0,"First Selector");var A=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(s.a)(this,n);for(var r=arguments.length,i=new Array(r),c=0;c<r;c++)i[c]=arguments[c];return(e=t.call.apply(t,[this].concat(i))).state={siteMaps:D},e.getProperty=function(t,n){var r=e.state.siteMaps,i=r.findIndex((function(e){return e.id===t}));return r[i][n]},e.onAddSelector=function(t,n){var r=e.state.siteMaps;I(r,t,n),e.setState({siteMaps:r})},e.addSiteMap=function(){var t=e.state.siteMaps,n=Object(p.a)();t.push(new y(n)),I(t,n),e.setState({siteMaps:t})},e.onDeleteItem=function(t){var n=e.state.siteMaps;n=M(n,t),e.setState({siteMaps:n})},e.clearSiteMap=function(t){var n,r=e.state.siteMaps,i=t.parentOf,c=Object(l.a)(i);try{for(c.s();!(n=c.n()).done;){r=M(r,n.value)}}catch(a){c.e(a)}finally{c.f()}I(r,t.id),e.setState({siteMaps:r})},e}return Object(o.a)(n,[{key:"handleSiteUpdate",value:function(e,t,n){var r=this.state.siteMaps,i=r.findIndex((function(t){return t.id===e}));r[i][n]=t,this.setState({siteMaps:r})}},{key:"render",value:function(){var e=this,t=this.state.siteMaps;return Object(r.jsxs)(i.Fragment,{children:[Object(r.jsx)(k,{}),Object(r.jsxs)("div",{className:"list-container",children:[Object(r.jsx)(g,{stateArray:t,onSiteInputChange:function(t,n,r){return e.handleSiteUpdate(t,n,r)},onSiteDelete:function(t){return e.onDeleteItem(t)},onSelectorChange:function(t,n,r){return e.handleSiteUpdate(t,n,r)},selectorProperty:function(t,n){return e.getProperty(t,n)},toggleMultipleCheck:function(t){return e.handleMultipleCheckToggle(t)},onAddSelector:function(t,n){return e.onAddSelector(t,n)},onAddChild:function(t){return e.onAddSelector(t)},onDeleteSelector:function(t){return e.onDeleteItem(t)},onClearSiteMap:function(t){return e.clearSiteMap(t)}}),Object(r.jsx)(f.b,{className:"addNewList button",title:"Add another scraping list",onClick:function(){return e.addSiteMap()}})]})]})}}]),n}(i.Component);a.a.render(Object(r.jsx)(A,{}),document.getElementById("root"))}},[[22,1,2]]]);
//# sourceMappingURL=main.9e4abc51.chunk.js.map