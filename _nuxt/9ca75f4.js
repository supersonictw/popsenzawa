(window.webpackJsonp=window.webpackJsonp||[]).push([[6,4],{329:function(t,e,n){var content=n(339);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(40).default)("1fb1b6bc",content,!0,{sourceMap:!1})},330:function(t,e,n){var content=n(345);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(40).default)("6a90a271",content,!0,{sourceMap:!1})},338:function(t,e,n){"use strict";n(329)},339:function(t,e,n){var r=n(39)(!1);r.push([t.i,".crazy[data-v-01515057]{-webkit-text-stroke:1px navy}.flat[data-v-01515057]{position:absolute;left:0;right:0;z-index:5}.flat.top-10[data-v-01515057]{top:10px}.flat.top-50[data-v-01515057]{top:50px}.flat.bottom-25[data-v-01515057]{bottom:25px}.meow-btn[data-v-01515057]{cursor:pointer!important}",""]),t.exports=r},344:function(t,e,n){"use strict";n(330)},345:function(t,e,n){var r=n(39)(!1);r.push([t.i,".action-bar[data-v-91e95cf6]{width:100%}",""]),t.exports=r},346:function(t,e,n){"use strict";n.r(e);var r=n(18),o=(n(86),n(10),n(60),n(332),n(59),n(333)),c=n.n(o),l=n(328),d=n.n(l);d.a.prototype.add=function(t){Object.assign(this,this.plus(t))},d.a.prototype.sub=function(t){Object.assign(this,this.minus(t))};var f=parseInt("800"),v=parseInt("1000"),h={name:"Pop",data:function(){return{ready:!1,recovery:!1,bot:!1,nextToken:"",captchaToken:"",count:new d.a(0),accumulator:new d.a(0),pressing:!1}},computed:{buttonImage:function(){return this.pressing?"./image/button/pressed.png":"./image/button/release.png"}},mounted:function(){this.push(),localStorage.getItem("bot")&&(this.bot=Boolean(localStorage.getItem("bot"))),localStorage.getItem("count")&&(this.count=new d.a(localStorage.getItem("count"))),window.addEventListener("keydown",this.meow),window.addEventListener("keyup",this.release)},beforeDestroy:function(){window.addEventListener("keydown",this.meow),window.addEventListener("keyup",this.release)},methods:{meow:function(){this.pressing=!0,this.count.add(1),this.accumulator.add(1),localStorage.setItem("count",this.count.toString())},release:function(){this.pressing=!1},getAppend:function(){var t;return this.accumulator.gt(f)?(t=f,this.accumulator.sub(f)):(t=this.accumulator,this.accumulator=new d.a(0)),t},unpackResult:function(t,e){var n=t.data;"new_token"in n&&(this.nextToken=n.new_token),200!==t.status&&"new_token"in n||this.accumulator.add(e)},post:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=c.a.stringify({token:e.nextToken,count:t.toString(),captcha_token:e.captchaToken}),n.prev=1,n.next=4,e.$axios.post("/pop?".concat(r));case 4:200===(o=n.sent).status?(e.ready||(e.ready=!0),e.recovery&&t.eq(0)&&(e.recovery=!1),e.unpackResult(o,t)):201===o.status&&(e.recovery&&(e.recovery=!1),e.unpackResult(o,t)),n.next=13;break;case 8:n.prev=8,n.t0=n.catch(1),e.recovery=!0,e.nextToken="",e.accumulator.add(t);case 13:case"end":return n.stop()}}),n,null,[[1,8]])})))()},push:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.bot||!t.accumulator.gt(0)&&t.ready&&!t.recovery){e.next=3;break}return e.next=3,t.post(t.getAppend());case 3:setTimeout(t.push,v);case 4:case"end":return e.stop()}}),e)})))()}}},m=(n(338),n(74)),w=n(101),y=n.n(w),_=n(151),x=n(370),component=Object(m.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",{staticClass:"mx-auto text-center",attrs:{width:"90%",height:"90%"}},[n("h1",{staticClass:"crazy flat top-10"},[t._v("PopSenzawa")]),t._v(" "),n("h2",{staticClass:"crazy flat top-50"},[t._v("Awww (๑ºωº)")]),t._v(" "),n("h2",{staticClass:"crazy flat bottom-25"},[t._v(t._s(t.count))]),t._v(" "),n("v-img",{staticClass:"meow-btn",attrs:{alt:"Meow",width:"100%",height:"100%",src:t.buttonImage},on:{pointerdown:t.meow,pointerup:t.release,mousedown:t.meow,mouseup:t.release}})],1)}),[],!1,null,"01515057",null);e.default=component.exports;y()(component,{VCard:_.a,VImg:x.a})},347:function(t,e,n){"use strict";n.r(e);var r=n(1),o=n(8),c=(n(226),n(224),n(14),n(9),n(19),n(22),n(11),n(23),n(350)),l=n.n(c),d=n(328),f=n.n(d);function v(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function h(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var m={name:"Leaderboard",data:function(){return{leaderboard:{global:new f.a(0),regions:{}}}},computed:{height:function(){return window.innerHeight-150}},mounted:function(){this.listener=this.$sse.create(),this.listener.on("message",this.update),this.listener.connect()},methods:{update:function(t){for(var i in t=l.a.parse(t),this.leaderboard.global=t.global,t.regions)t.regions[i]=new f.a(t.regions[i]);this.leaderboard.regions=Object.entries(t.regions).sort((function(t,e){var a=Object(o.a)(t,2)[1],b=Object(o.a)(e,2)[1];return a.lt(b)})).reduce((function(t,e){var n=Object(o.a)(e,2),c=n[0],l=n[1];return h(h({},t),{},Object(r.a)({},c,l))}),{})}}},w=(n(344),n(74)),y=n(101),_=n.n(y),x=n(326),k=n(151),O=n(84),j=n(372),C=n(373),I=n(374),V=n(375),component=Object(w.a)(m,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",{attrs:{flat:""}},[n("v-card-title",[t._v(" Worldwide: "+t._s(t.leaderboard.global))]),t._v(" "),n("v-card",{staticClass:"overflow-y-auto",attrs:{width:"350","max-height":t.height}},[n("v-list",t._l(t.leaderboard.regions,(function(e,r){return n("v-list-item",{key:r},[t._v("\n        "+t._s(r)+": "+t._s(e)+"\n      ")])})),1)],1),t._v(" "),n("v-card-actions",{staticClass:"red action-bar"},[n("v-spacer"),t._v(" "),n("v-btn",{staticClass:"amber darken-4",on:{click:function(e){return t.$emit("close")}}},[n("v-icon",[t._v("mdi-close")])],1)],1)],1)}),[],!1,null,"91e95cf6",null);e.default=component.exports;_()(component,{VBtn:x.a,VCard:k.a,VCardActions:O.a,VCardTitle:O.b,VIcon:j.a,VList:C.a,VListItem:I.a,VSpacer:V.a})},352:function(t,e,n){var content=n(365);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(40).default)("017c6172",content,!0,{sourceMap:!1})},364:function(t,e,n){"use strict";n(352)},365:function(t,e,n){var r=n(39)(!1);r.push([t.i,".board-btn-row[data-v-589f51fa]{width:100%;position:fixed;bottom:30px}",""]),t.exports=r},377:function(t,e,n){"use strict";n.r(e);var r=n(346),o={name:"Index",components:{Leaderboard:n(347).default,Pop:r.default},data:function(){return{board:!1}}},c=(n(364),n(74)),l=n(101),d=n.n(l),f=n(326),v=n(378),h=n(372),m=n(376),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",[n("pop"),t._v(" "),n("div",{staticClass:"board-btn-row"},[n("v-btn",{attrs:{"x-large":"",rounded:""},on:{click:function(e){t.board=!0}}},[n("v-icon",{attrs:{"x-large":""}},[t._v("mdi-earth")])],1)],1),t._v(" "),n("v-overlay",{model:{value:t.board,callback:function(e){t.board=e},expression:"board"}},[n("keep-alive",[n("leaderboard",{on:{close:function(e){t.board=!1}}})],1)],1)],1)}),[],!1,null,"589f51fa",null);e.default=component.exports;d()(component,{Pop:n(346).default,Leaderboard:n(347).default}),d()(component,{VBtn:f.a,VContainer:v.a,VIcon:h.a,VOverlay:m.a})}}]);