(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{245:function(t,r,n){var content=n(330);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(28).default)("6cd9a3d1",content,!0,{sourceMap:!1})},267:function(t,r,n){var content=n(387);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(28).default)("23746ffe",content,!0,{sourceMap:!1})},273:function(t,r,n){"use strict";var e=n(399),o=n(400),l=n(407),c=n(406),d=n(402),f=n(408),v=n(405),_=n(403),h=n(404),m=n(401),w=n(271),x={name:"DefaultLayout",data:function(){return{clipped:!1,drawer:!1,fixed:!1,items:[{icon:"mdi-apps",title:"Welcome",to:"/"},{icon:"mdi-chart-bubble",title:"Inspire",to:"/inspire"}],miniVariant:!1,right:!1,rightDrawer:!1,title:"つくらんば"}}},y=(n(386),n(103)),component=Object(y.a)(x,(function(){var t=this,r=t._self._c;return r(e.a,{style:{background:"#EFEBE9"}},[r(o.a,{attrs:{app:"",flat:"",dark:"",dense:"","hide-on-scroll":"",color:"brown"}},[r(w.a,[r(m.a,{attrs:{"no-gutters":""}},[r(d.a,[r(_.a,[t._v("mdi-chef-hat")])],1),t._v(" "),r(d.a,{staticClass:"ml-2",staticStyle:{"margin-top":"2px"},attrs:{align:"center"}},[t._v("\n          "+t._s(t.title)+"\n        ")])],1)],1)],1),t._v(" "),r(h.a,[r(f.a,[r("Nuxt")],1)],1),t._v(" "),r(v.a,{attrs:{app:"",height:"56",color:"brown1",elevation:"0"}},[r(l.a,{attrs:{fixed:""}},[r(c.a,[r("span",[t._v("表示切替")]),t._v(" "),r(_.a,{staticClass:"mb-2"},[t._v("mdi-swap-horizontal")])],1),t._v(" "),r(c.a,[r("span",[t._v("買い物リスト")]),t._v(" "),r(_.a,{staticClass:"mb-2"},[t._v("mdi-shopping")])],1),t._v(" "),r(c.a,[r("span",[t._v("メニューリスト")]),t._v(" "),r(_.a,{staticClass:"mb-2"},[t._v("mdi-silverware-fork-knife")])],1),t._v(" "),r(c.a,[r("span",[t._v("メニュー追加")]),t._v(" "),r(_.a,{staticClass:"mb-2"},[t._v("mdi-plus")])],1)],1)],1)],1)}),[],!1,null,null,null);r.a=component.exports},277:function(t,r,n){n(278),t.exports=n(279)},329:function(t,r,n){"use strict";n(245)},330:function(t,r,n){var e=n(27)((function(i){return i[1]}));e.push([t.i,"h1[data-v-35e10596]{font-size:20px}",""]),e.locals={},t.exports=e},386:function(t,r,n){"use strict";n(267)},387:function(t,r,n){var e=n(27)((function(i){return i[1]}));e.push([t.i,"body{background-color:#a1887f}",""]),e.locals={},t.exports=e},389:function(t,r,n){var map={"./ja":189,"./ja.js":189};function e(t){var r=o(t);return n(r)}function o(t){if(!n.o(map,t)){var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}return map[t]}e.keys=function(){return Object.keys(map)},e.resolve=o,t.exports=e,e.id=389},80:function(t,r,n){"use strict";var e=n(399),o={name:"EmptyLayout",layout:"empty",props:{error:{type:Object,default:null}},data:function(){return{pageNotFound:"404 Not Found",otherError:"An error occurred"}},head:function(){return{title:404===this.error.statusCode?this.pageNotFound:this.otherError}}},l=(n(329),n(103)),component=Object(l.a)(o,(function(){var t=this,r=t._self._c;return r(e.a,{attrs:{dark:""}},[404===t.error.statusCode?r("h1",[t._v("\n    "+t._s(t.pageNotFound)+"\n  ")]):r("h1",[t._v("\n    "+t._s(t.otherError)+"\n  ")]),t._v(" "),r("NuxtLink",{attrs:{to:"/"}},[t._v("\n    Home page\n  ")])],1)}),[],!1,null,"35e10596",null);r.a=component.exports}},[[277,3,1,4]]]);