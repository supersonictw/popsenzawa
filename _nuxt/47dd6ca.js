(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{329:function(t,e,n){var content=n(338);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(40).default)("9862f79c",content,!0,{sourceMap:!1})},336:function(t,e,n){"use strict";n.r(e),n.d(e,"MusicPlayer",(function(){return c})),n.d(e,"Music",(function(){return r}));var o=n(354),r={CountryRoad:{key:"CountryRoad",opus:"audio/country_road.opus"},KoKeKo:{key:"KoKeKo",opus:"audio/ko_ke_ko.opus"},OkiDokiBoomer:{key:"OkiDokiBoomer",opus:"audio/oki_doki_boomer.opus"},PadowoPadowo:{key:"PadowoPadowo",opus:"audio/padowo_padowo.opus"},PapaTutuWawa:{key:"PapaTutuWawa",opus:"audio/papa_tutu_wawa.opus"},uwuesketit:{key:"uwuesketit",opus:"audio/uwuesketit.opus"}};function c(){this.current=null,this.playing=!1}c.prototype={choose:function(t){this.current&&this.playing&&this.stop();var e=r[t].opus;this.current=new o.a(e).toDestination()},play:function(){this.playing?console.warn("Already playing"):this.current?this._playOpus():console.warn("No music is chosen")},_playOpus:function(){this.playing=this.current,this.playing.loaded?this.playing.start():this.playing.autostart=!0},stop:function(){this.playing?this._stopOpus():console.warn("No music is playing")},_stopOpus:function(){this.playing.stop(),this.playing=!1}}},337:function(t,e,n){"use strict";n(329)},338:function(t,e,n){var o=n(39)(!1);o.push([t.i,".crazy[data-v-a221b4d2]{-webkit-text-stroke:1px navy;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.flat[data-v-a221b4d2]{position:absolute;left:0;right:0;z-index:5}.flat.top-10[data-v-a221b4d2]{top:10px}.flat.top-50[data-v-a221b4d2]{top:50px}.flat.bottom-25[data-v-a221b4d2]{bottom:25px}.meow-btn[data-v-a221b4d2]{cursor:pointer!important}",""]),t.exports=o},346:function(t,e,n){"use strict";n.r(e);var o=n(18),r=(n(86),n(10),n(41),n(42),n(61),n(59),n(349),n(350)),c=n.n(r),l=n(328),d=n.n(l),h=n(336);d.a.prototype.add=function(t){Object.assign(this,this.plus(t))},d.a.prototype.sub=function(t){Object.assign(this,this.minus(t))};var w=parseInt("800"),m=parseInt("1000"),y={name:"Pop",data:function(){return{ready:!1,recovery:!1,bot:!1,nextToken:"",count:new d.a(0),accumulator:new d.a(0),pressing:!1,lastPressed:0,testing:false,music:null}},computed:{buttonImage:function(){return this.count.gt(913)?this.pressing?"./image/button/pressed-uwu.png":"./image/button/release-uwu.png":this.pressing?"./image/button/pressed.png":"./image/button/release.png"},height:function(){return"undefined"!=typeof window?window.innerHeight-150:750},statusMessage:function(){return this.count.gt(913)?"ù w ú":"Awww (๑ºωº)"}},mounted:function(){var t=this;this.push(),localStorage.getItem("bot")&&(this.bot=Boolean(localStorage.getItem("bot"))),localStorage.getItem("count")&&(this.count=new d.a(localStorage.getItem("count"))),window.addEventListener("keydown",this.meow),window.addEventListener("keyup",this.release),Promise.resolve().then(n.bind(null,336)).then((function(e){var n=e.MusicPlayer;t.music=new n,t.count.gt(913)?t.music.choose(h.Music.uwuesketit.key):t.music.choose(h.Music.CountryRoad.key)}))},beforeDestroy:function(){window.addEventListener("keydown",this.meow),window.addEventListener("keyup",this.release)},methods:{meow:function(){this.pressing=!0,this.count.add(1),this.accumulator.add(1),localStorage.setItem("count",this.count.toString()),this.music&&(this.count.eq(913)&&this.music.choose(h.Music.uwuesketit.key),this.music.playing||(this.music.play(),this.music.playing.loop=!0))},release:function(){var t=this;this.pressing=!1,this.lastPressed=(new Date).getTime(),setTimeout((function(){var e=(new Date).getTime();!t.pressing&&t.music&&t.music.playing&&t.music.playing.loaded&&e-t.lastPressed>=3e3&&t.music.stop()}),5e3)},getAppend:function(){var t;return this.accumulator.gt(w)?(t=w,this.accumulator.sub(w)):(t=this.accumulator,this.accumulator=new d.a(0)),t},unpackResult:function(t,e){var n=t.data;"new_token"in n&&(this.nextToken=n.new_token),200!==t.status&&"new_token"in n||this.accumulator.add(e)},post:function(t){var e=this;return Object(o.a)(regeneratorRuntime.mark((function n(){var o,r,l;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:o="",n.next=5;break;case 4:o=n.sent;case 5:return r=c.a.stringify({token:e.nextToken,count:t.toString(),captcha_token:o}),n.prev=6,n.next=9,e.$axios.post("/pop?".concat(r));case 9:200===(l=n.sent).status?(e.ready||(e.ready=!0),e.recovery&&t.eq(0)&&(e.recovery=!1),e.unpackResult(l,t)):201===l.status&&(e.recovery&&(e.recovery=!1),e.unpackResult(l,t)),n.next=18;break;case 13:n.prev=13,n.t0=n.catch(6),e.recovery=!0,e.nextToken="",e.accumulator.add(t);case 18:case"end":return n.stop()}}),n,null,[[6,13]])})))()},push:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.bot||!t.accumulator.gt(0)&&t.ready&&!t.recovery){e.next=3;break}return e.next=3,t.post(t.getAppend());case 3:setTimeout(t.push,m);case 4:case"end":return e.stop()}}),e)})))()}}},f=(n(337),n(73)),k=n(101),v=n.n(k),_=n(151),x=n(391),component=Object(f.a)(y,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",{staticClass:"mx-auto text-center",attrs:{width:"90%",height:"90%","max-width":t.height,"max-height":t.height}},[n("h1",{staticClass:"crazy flat top-10"},[t._v("PopSenzawa")]),t._v(" "),n("h2",{staticClass:"crazy flat top-50"},[t._v(t._s(t.statusMessage))]),t._v(" "),n("h2",{staticClass:"crazy flat bottom-25"},[t._v(t._s(t.count))]),t._v(" "),t.testing?t._e():n("v-img",{staticClass:"meow-btn",attrs:{alt:"Meow",width:"100%",height:"100%",src:t.buttonImage},on:{pointerdown:t.meow,pointerup:t.release}})],1)}),[],!1,null,"a221b4d2",null);e.default=component.exports;v()(component,{VCard:_.a,VImg:x.a})}}]);