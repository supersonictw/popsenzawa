(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{329:function(t,e,o){var content=o(338);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(40).default)("2131f0ea",content,!0,{sourceMap:!1})},336:function(t,e,o){"use strict";o.r(e),o.d(e,"MusicPlayer",(function(){return c})),o.d(e,"Music",(function(){return r}));var n=o(354),r={CountryRoad:{key:"CountryRoad",opus:"audio/country_road.opus"},KoKeKo:{key:"KoKeKo",opus:"audio/ko_ke_ko.opus"},OkiDokiBoomer:{key:"OkiDokiBoomer",opus:"audio/oki_doki_boomer.opus"},PadowoPadowo:{key:"PadowoPadowo",opus:"audio/padowo_padowo.opus"},PapaTutuWawa:{key:"PapaTutuWawa",opus:"audio/papa_tutu_wawa.opus"},uwuesketit:{key:"uwuesketit",opus:"audio/uwuesketit.opus"}};function c(){this.current=null,this.playing=!1}c.prototype={choose:function(t){this.current&&this.playing&&this.stop();var e=r[t].opus;this.current=new n.a(e).toDestination()},play:function(){this.playing?console.warn("Already playing"):this.current?this._playOpus():console.warn("No music is chosen")},_playOpus:function(){this.playing=this.current,this.playing.loaded?this.playing.start():this.playing.autostart=!0},stop:function(){this.playing?this._stopOpus():console.warn("No music is playing")},_stopOpus:function(){this.playing.stop(),this.playing=!1}}},337:function(t,e,o){"use strict";o(329)},338:function(t,e,o){var n=o(39)(!1);n.push([t.i,".crazy[data-v-641bc0c0]{-webkit-text-stroke:1px navy;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.flat[data-v-641bc0c0]{position:absolute;left:0;right:0;z-index:5}.flat.top-10[data-v-641bc0c0]{top:10px}.flat.top-50[data-v-641bc0c0]{top:50px}.flat.bottom-25[data-v-641bc0c0]{bottom:25px}.meow-btn[data-v-641bc0c0]{cursor:pointer!important}",""]),t.exports=n},346:function(t,e,o){"use strict";o.r(e);var n=o(18),r=(o(86),o(10),o(41),o(42),o(224),o(14),o(61),o(59),o(349),o(350)),c=o.n(r),l=o(328),d=o.n(l),h=o(336);d.a.prototype.add=function(t){Object.assign(this,this.plus(t))},d.a.prototype.sub=function(t){Object.assign(this,this.minus(t))};var w=parseInt("800"),m=parseInt("1000"),y={20191215:h.Music.OkiDokiBoomer.key,12e5:h.Music.KoKeKo.key,201607:h.Music.PapaTutuWawa.key,2020:h.Music.PadowoPadowo.key,913:h.Music.uwuesketit.key},f={name:"Pop",data:function(){return{ready:!1,recovery:!1,bot:!1,nextToken:"",count:new d.a(0),accumulator:new d.a(0),pressing:!1,lastPressed:0,testing:false,music:null}},computed:{buttonImage:function(){return this.count.gt(913)?this.pressing?"./image/button/pressed-uwu.png":"./image/button/release-uwu.png":this.pressing?"./image/button/pressed.png":"./image/button/release.png"},height:function(){return"undefined"!=typeof window?window.innerHeight-150:750},statusMessage:function(){return this.count.gt(913)?"ù w ú":"Awww (๑ºωº)"}},mounted:function(){var t=this;this.push(),localStorage.getItem("bot")&&(this.bot=Boolean(localStorage.getItem("bot"))),localStorage.getItem("count")&&(this.count=new d.a(localStorage.getItem("count"))),window.addEventListener("keydown",this.meow),window.addEventListener("keyup",this.release),Promise.resolve().then(o.bind(null,336)).then((function(e){var o=e.MusicPlayer;t.music=new o;var n=Object.keys(y).find((function(e){return t.count.gt(e)}));void 0!==n?t.music.choose(y[n]):t.music.choose(h.Music.CountryRoad.key)}))},beforeDestroy:function(){window.addEventListener("keydown",this.meow),window.addEventListener("keyup",this.release)},methods:{meow:function(){var t=this;if(this.pressing=!0,this.count.add(1),this.accumulator.add(1),localStorage.setItem("count",this.count.toString()),this.music){var e=Object.keys(y).find((function(e){return t.count.eq(e)}));void 0!==e&&this.music.choose(y[e]),this.music.playing||(this.music.play(),this.music.playing.loop=!0)}},release:function(){var t=this;this.pressing=!1,this.lastPressed=(new Date).getTime(),setTimeout((function(){var e=(new Date).getTime();!t.pressing&&t.music&&t.music.playing&&t.music.playing.loaded&&e-t.lastPressed>=3e3&&t.music.stop()}),5e3)},getAppend:function(){var t;return this.accumulator.gt(w)?(t=w,this.accumulator.sub(w)):(t=this.accumulator,this.accumulator=new d.a(0)),t},unpackResult:function(t,e){var o=t.data;"new_token"in o&&(this.nextToken=o.new_token),200!==t.status&&"new_token"in o||this.accumulator.add(e)},post:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function o(){var n,r,l;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:n="",o.next=5;break;case 4:n=o.sent;case 5:return r=c.a.stringify({token:e.nextToken,count:t.toString(),captcha_token:n}),o.prev=6,o.next=9,e.$axios.post("/pop?".concat(r));case 9:200===(l=o.sent).status?(e.ready||(e.ready=!0),e.recovery&&t.eq(0)&&(e.recovery=!1),e.unpackResult(l,t)):201===l.status&&(e.recovery&&(e.recovery=!1),e.unpackResult(l,t)),o.next=18;break;case 13:o.prev=13,o.t0=o.catch(6),e.recovery=!0,e.nextToken="",e.accumulator.add(t);case 18:case"end":return o.stop()}}),o,null,[[6,13]])})))()},push:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.bot||!t.accumulator.gt(0)&&t.ready&&!t.recovery){e.next=3;break}return e.next=3,t.post(t.getAppend());case 3:setTimeout(t.push,m);case 4:case"end":return e.stop()}}),e)})))()}}},k=(o(337),o(73)),v=o(101),_=o.n(v),x=o(151),P=o(391),component=Object(k.a)(f,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-card",{staticClass:"mx-auto text-center",attrs:{width:"90%",height:"90%","max-width":t.height,"max-height":t.height}},[o("h1",{staticClass:"crazy flat top-10"},[t._v("PopSenzawa")]),t._v(" "),o("h2",{staticClass:"crazy flat top-50"},[t._v(t._s(t.statusMessage))]),t._v(" "),o("h2",{staticClass:"crazy flat bottom-25"},[t._v(t._s(t.count))]),t._v(" "),t.testing?t._e():o("v-img",{staticClass:"meow-btn",attrs:{alt:"Meow",width:"100%",height:"100%",src:t.buttonImage},on:{pointerdown:t.meow,pointerup:t.release}})],1)}),[],!1,null,"641bc0c0",null);e.default=component.exports;_()(component,{VCard:x.a,VImg:P.a})}}]);