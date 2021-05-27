var app=function(){"use strict";function t(){}const e=t=>t;function n(t,e){for(const n in e)t[n]=e[n];return t}function o(t){return t()}function r(){return Object.create(null)}function s(t){t.forEach(o)}function c(t){return"function"==typeof t}function l(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function u(e,...n){if(null==e)return t;const o=e.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}function a(t){let e;return u(t,(t=>e=t))(),e}function f(t,e,n){t.$$.on_destroy.push(u(e,n))}function d(t,e,o,r){return t[1]&&r?n(o.ctx.slice(),t[1](r(e))):o.ctx}function p(t,e,n,o,r,s,c){const i=function(t,e,n,o){if(t[2]&&o){const r=t[2](o(n));if(void 0===e.dirty)return r;if("object"==typeof r){const t=[],n=Math.max(e.dirty.length,r.length);for(let o=0;o<n;o+=1)t[o]=e.dirty[o]|r[o];return t}return e.dirty|r}return e.dirty}(e,o,r,s);if(i){const r=d(e,n,o,c);t.p(r,i)}}function m(e){return e&&c(e.destroy)?e.destroy:t}const h="undefined"!=typeof window;let g=h?()=>window.performance.now():()=>Date.now(),$=h?t=>requestAnimationFrame(t):t;const v=new Set;function x(t){v.forEach((e=>{e.c(t)||(v.delete(e),e.f())})),0!==v.size&&$(x)}function b(t){let e;return 0===v.size&&$(x),{promise:new Promise((n=>{v.add(e={c:t,f:n})})),abort(){v.delete(e)}}}function k(t,e){t.appendChild(e)}function y(t,e,n){t.insertBefore(e,n||null)}function A(t){t.parentNode.removeChild(t)}function w(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function E(t){return document.createElement(t)}function C(t){return document.createTextNode(t)}function I(){return C(" ")}function _(){return C("")}function B(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function Q(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function S(t){return""===t?null:+t}function M(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function N(t,e){t.value=null==e?"":e}const R=new Set;let F,L=0;function O(t,e,n,o,r,s,c,i=0){const l=16.666/o;let u="{\n";for(let t=0;t<=1;t+=l){const o=e+(n-e)*s(t);u+=100*t+`%{${c(o,1-o)}}\n`}const a=u+`100% {${c(n,1-n)}}\n}`,f=`__svelte_${function(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}(a)}_${i}`,d=t.ownerDocument;R.add(d);const p=d.__svelte_stylesheet||(d.__svelte_stylesheet=d.head.appendChild(E("style")).sheet),m=d.__svelte_rules||(d.__svelte_rules={});m[f]||(m[f]=!0,p.insertRule(`@keyframes ${f} ${a}`,p.cssRules.length));const h=t.style.animation||"";return t.style.animation=`${h?`${h}, `:""}${f} ${o}ms linear ${r}ms 1 both`,L+=1,f}function T(t,e){const n=(t.style.animation||"").split(", "),o=n.filter(e?t=>t.indexOf(e)<0:t=>-1===t.indexOf("__svelte")),r=n.length-o.length;r&&(t.style.animation=o.join(", "),L-=r,L||$((()=>{L||(R.forEach((t=>{const e=t.__svelte_stylesheet;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.__svelte_rules={}})),R.clear())})))}function D(t){F=t}function U(t){(function(){if(!F)throw new Error("Function called outside component initialization");return F})().$$.on_destroy.push(t)}const W=[],P=[],K=[],G=[],Z=Promise.resolve();let j=!1;function q(t){K.push(t)}let V=!1;const J=new Set;function X(){if(!V){V=!0;do{for(let t=0;t<W.length;t+=1){const e=W[t];D(e),z(e.$$)}for(D(null),W.length=0;P.length;)P.pop()();for(let t=0;t<K.length;t+=1){const e=K[t];J.has(e)||(J.add(e),e())}K.length=0}while(W.length);for(;G.length;)G.pop()();j=!1,V=!1,J.clear()}}function z(t){if(null!==t.fragment){t.update(),s(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(q)}}let Y;function H(){return Y||(Y=Promise.resolve(),Y.then((()=>{Y=null}))),Y}function tt(t,e,n){t.dispatchEvent(function(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}(`${e?"intro":"outro"}${n}`))}const et=new Set;let nt;function ot(){nt={r:0,c:[],p:nt}}function rt(){nt.r||s(nt.c),nt=nt.p}function st(t,e){t&&t.i&&(et.delete(t),t.i(e))}function ct(t,e,n,o){if(t&&t.o){if(et.has(t))return;et.add(t),nt.c.push((()=>{et.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}const it={duration:0};function lt(n,o,r){let s,i,l=o(n,r),u=!1,a=0;function f(){s&&T(n,s)}function d(){const{delay:o=0,duration:r=300,easing:c=e,tick:d=t,css:p}=l||it;p&&(s=O(n,0,1,r,o,c,p,a++)),d(0,1);const m=g()+o,h=m+r;i&&i.abort(),u=!0,q((()=>tt(n,!0,"start"))),i=b((t=>{if(u){if(t>=h)return d(1,0),tt(n,!0,"end"),f(),u=!1;if(t>=m){const e=c((t-m)/r);d(e,1-e)}}return u}))}let p=!1;return{start(){p||(T(n),c(l)?(l=l(),H().then(d)):d())},invalidate(){p=!1},end(){u&&(f(),u=!1)}}}function ut(n,o,r,i){let l=o(n,r),u=i?0:1,a=null,f=null,d=null;function p(){d&&T(n,d)}function m(t,e){const n=t.b-u;return e*=Math.abs(n),{a:u,b:t.b,d:n,duration:e,start:t.start,end:t.start+e,group:t.group}}function h(o){const{delay:r=0,duration:c=300,easing:i=e,tick:h=t,css:$}=l||it,v={start:g()+r,b:o};o||(v.group=nt,nt.r+=1),a||f?f=v:($&&(p(),d=O(n,u,o,c,r,i,$)),o&&h(0,1),a=m(v,c),q((()=>tt(n,o,"start"))),b((t=>{if(f&&t>f.start&&(a=m(f,c),f=null,tt(n,a.b,"start"),$&&(p(),d=O(n,u,a.b,a.duration,0,i,l.css))),a)if(t>=a.end)h(u=a.b,1-u),tt(n,a.b,"end"),f||(a.b?p():--a.group.r||s(a.group.c)),a=null;else if(t>=a.start){const e=t-a.start;u=a.a+a.d*i(e/a.duration),h(u,1-u)}return!(!a&&!f)})))}return{run(t){c(l)?H().then((()=>{l=l(),h(t)})):h(t)},end(){p(),a=f=null}}}function at(t,e){ct(t,1,1,(()=>{e.delete(t.key)}))}function ft(t,e,n,o,r,s,c,i,l,u,a,f){let d=t.length,p=s.length,m=d;const h={};for(;m--;)h[t[m].key]=m;const g=[],$=new Map,v=new Map;for(m=p;m--;){const t=f(r,s,m),i=n(t);let l=c.get(i);l?o&&l.p(t,e):(l=u(i,t),l.c()),$.set(i,g[m]=l),i in h&&v.set(i,Math.abs(m-h[i]))}const x=new Set,b=new Set;function k(t){st(t,1),t.m(i,a),c.set(t.key,t),a=t.first,p--}for(;d&&p;){const e=g[p-1],n=t[d-1],o=e.key,r=n.key;e===n?(a=e.first,d--,p--):$.has(r)?!c.has(o)||x.has(o)?k(e):b.has(r)?d--:v.get(o)>v.get(r)?(b.add(o),k(e)):(x.add(r),d--):(l(n,c),d--)}for(;d--;){const e=t[d];$.has(e.key)||l(e,c)}for(;p;)k(g[p-1]);return g}function dt(t){t&&t.c()}function pt(t,e,n,r){const{fragment:i,on_mount:l,on_destroy:u,after_update:a}=t.$$;i&&i.m(e,n),r||q((()=>{const e=l.map(o).filter(c);u?u.push(...e):s(e),t.$$.on_mount=[]})),a.forEach(q)}function mt(t,e){const n=t.$$;null!==n.fragment&&(s(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function ht(t,e){-1===t.$$.dirty[0]&&(W.push(t),j||(j=!0,Z.then(X)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function gt(e,n,o,c,i,l,u=[-1]){const a=F;D(e);const f=e.$$={fragment:null,ctx:null,props:l,update:t,not_equal:i,bound:r(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(a?a.$$.context:n.context||[]),callbacks:r(),dirty:u,skip_bound:!1};let d=!1;if(f.ctx=o?o(e,n.props||{},((t,n,...o)=>{const r=o.length?o[0]:n;return f.ctx&&i(f.ctx[t],f.ctx[t]=r)&&(!f.skip_bound&&f.bound[t]&&f.bound[t](r),d&&ht(e,t)),n})):[],f.update(),d=!0,s(f.before_update),f.fragment=!!c&&c(f.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);f.fragment&&f.fragment.l(t),t.forEach(A)}else f.fragment&&f.fragment.c();n.intro&&st(e.$$.fragment),pt(e,n.target,n.anchor,n.customElement),X()}D(a)}class $t{$destroy(){mt(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const vt=[];function xt(e,n=t){let o;const r=[];function s(t){if(l(e,t)&&(e=t,o)){const t=!vt.length;for(let t=0;t<r.length;t+=1){const n=r[t];n[1](),vt.push(n,e)}if(t){for(let t=0;t<vt.length;t+=2)vt[t][0](vt[t+1]);vt.length=0}}}return{set:s,update:function(t){s(t(e))},subscribe:function(c,i=t){const l=[c,i];return r.push(l),1===r.length&&(o=n(s)||t),c(e),()=>{const t=r.indexOf(l);-1!==t&&r.splice(t,1),0===r.length&&(o(),o=null)}}}}function bt(t,e){let n=JSON.parse(localStorage.getItem(t)),o=xt(null===n?e:n);return o.save=function(){localStorage.setItem(t,JSON.stringify(a(o)))},window.addEventListener("beforeunload",o.save),o}const kt=bt("routines",[{id:0,name:"Example Routine",break:10,exercises:[{id:1,exerciseId:5,reps:10,time:60},{id:2,exerciseId:5,reps:20,time:120},{id:3,exerciseId:5,reps:25,time:120},{id:4,exerciseId:5,reps:30,time:120}]}]);kt.subscribe(kt.save);const yt=bt("exerciseTable",[{id:5,name:"Example Exercise",calories:2}]);yt.subscribe(yt.save);const At=function(e,n,o){const r=!Array.isArray(e),i=r?[e]:e,l=n.length<2;return{subscribe:xt(o,(e=>{let o=!1;const a=[];let f=0,d=t;const p=()=>{if(f)return;d();const o=n(r?a[0]:a,e);l?e(o):d=c(o)?o:t},m=i.map(((t,e)=>u(t,(t=>{a[e]=t,f&=~(1<<e),o&&p()}),(()=>{f|=1<<e}))));return o=!0,p(),function(){s(m),d()}})).subscribe}}([kt,yt],(function([t],e){e(t.map((function(t){return{...t,exercises:_t(t),time:Qt(t),calories:St(t)}})))})),wt=function(t){kt.update((function(e){return[...e.slice(0,t),...e.slice(i+t)]}))},Et=function(t,e,n){kt.update((function(o){let r=o[t].exercises.length;if(Math.min(e,n)>=0&&Math.max(e,n)<r){let r=o[t].exercises[e];o[t].exercises[e]=o[t].exercises[n],o[t].exercises[n]=r}return o}))},Ct=function(t){for(let e of a(yt))if(e.id===t)return e},It=function(t){for(let[e,n]of a(yt).entries())if(n.id===t)return e},_t=function(t){return t.exercises.map((function(t){return{...Ct(t.exerciseId),...t}}))},Bt=function(t,e){kt.update((function(n){return n[t].exercises.push({id:Nt(),exerciseId:e.id,reps:e.lastReps??0,time:e.lastTime??30}),n}))},Qt=function(t){if(!t.exercises?.length)return 0;let e=0;for(let{time:n}of t.exercises)e+=n||0;return e+=t.break*(t.exercises.length-1),Math.round(e)},St=function(t){try{let e=0;for(let{exerciseId:n,reps:o,time:r}of t.exercises){let t=Ct(n);void 0!==t&&(e+=t.calories*(o||r))}return 10*Math.round(e/10)}catch{return 0}};let Mt=Number(localStorage.getItem("id"))||99;const Nt=function(){return localStorage.setItem("id",`${Mt+1}`),Mt++};window.log=function(){console.log(a(kt),a(yt),a(At))},window.wipe=function(){setTimeout(window.location.reload),kt.set(null),yt.set(null),localStorage.removeItem("routines"),localStorage.removeItem("exerciseTable"),window.onbeforeunload=null};let Rt=xt({text:"",callback:function(){}});const Ft=async function(t){return a(Rt).text?new Promise((function(t){t(!1)})):new Promise((function(e){Rt.set({text:t,callback:function(t){Rt.set({text:"",callback:function(){}}),e(t)}})}))};function Lt(e){let n,o,r,s;return{c(){n=E("button"),o=C(e[1]),Q(n,"class","svelte-19o5qlr")},m(t,i){y(t,n,i),k(n,o),r||(s=B(n,"click",(function(){c(e[0])&&e[0].apply(this,arguments)})),r=!0)},p(t,[n]){e=t,2&n&&M(o,e[1])},i:t,o:t,d(t){t&&A(n),r=!1,s()}}}function Ot(t,e,n){let{callback:o=function(){}}=e,{text:r="+"}=e;return t.$$set=t=>{"callback"in t&&n(0,o=t.callback),"text"in t&&n(1,r=t.text)},[o,r]}class Tt extends $t{constructor(t){super(),gt(this,t,Ot,Lt,l,{callback:0,text:1})}}function Dt(t){let e,n,o,r,s;const i=t[3].default,l=function(t,e,n,o){if(t){const r=d(t,e,n,o);return t[0](r)}}(i,t,t[2],null);return{c(){e=E("button"),l&&l.c(),Q(e,"class","svelte-1jyxh9d")},m(n,i){y(n,e,i),l&&l.m(e,null),o=!0,r||(s=B(e,"click",(function(){c(t[0])&&t[0].apply(this,arguments)})),r=!0)},p(e,[n]){t=e,l&&l.p&&4&n&&p(l,i,t,t[2],n,null,null)},i(r){o||(st(l,r),r&&q((()=>{n||(n=ut(e,t[1],{},!0)),n.run(1)})),o=!0)},o(r){ct(l,r),r&&(n||(n=ut(e,t[1],{},!1)),n.run(0)),o=!1},d(t){t&&A(e),l&&l.d(t),t&&n&&n.end(),r=!1,s()}}}function Ut(t,e,n){let{$$slots:o={},$$scope:r}=e,{callback:s=function(){}}=e,{trans:c=function(t,{duration:e=200,delay:n=0}){let o=+getComputedStyle(t).opacity,r=+getComputedStyle(t).height.slice(0,-2);return{duration:e,delay:n,css:t=>`\n\t\t\t\t\topacity: ${o*t};\n\t\t\t\t\theight: ${r*t}px;\n\t\t\t\t`}}}=e;return t.$$set=t=>{"callback"in t&&n(0,s=t.callback),"trans"in t&&n(1,c=t.trans),"$$scope"in t&&n(2,r=t.$$scope)},[s,c,r,o]}class Wt extends $t{constructor(t){super(),gt(this,t,Ut,Dt,l,{callback:0,trans:1})}}function Pt(t,e=750){let n,o=!1,r=!0;function s(){o=!0,r=!0,n=setTimeout((function(){o=!1,r=!1,t.dispatchEvent(new CustomEvent("hold"))}),e)}function c(){clearTimeout(n),r=!0,o=!1}return t.addEventListener("mousedown",s),t.addEventListener("click",(function(){clearTimeout(n),r&&o&&t.dispatchEvent(new CustomEvent("press")),r=!0,o=!1})),t.addEventListener("touchstart",s),t.addEventListener("touchmove",c),t.addEventListener("touchcancel",c),{destroy(){t.onmousedown=null,t.onmouseup=null,t.ontouchstart=null,t.ontouchmove=null,t.ontouchcancel=null}}}function Kt(e){let n,o,r,c,i,l,u,a,f,d,p,m,h,g,$,v,x,b;return{c(){n=E("h1"),o=I(),r=E("info"),c=E("div"),i=E("input"),l=E("span"),l.textContent="kcal.",u=I(),a=E("div"),f=E("input"),d=E("span"),d.textContent="seconds",p=I(),m=E("div"),h=E("input"),g=E("span"),g.textContent="reps",$=I(),v=E("button"),v.textContent="OK",Q(n,"contenteditable","true"),Q(n,"class","svelte-kgr7km"),void 0===e[0]&&q((()=>e[7].call(n))),Q(i,"type","number"),Q(i,"class","svelte-kgr7km"),Q(c,"class","svelte-kgr7km"),Q(f,"type","number"),Q(f,"class","svelte-kgr7km"),Q(a,"class","svelte-kgr7km"),Q(h,"type","number"),Q(h,"class","svelte-kgr7km"),Q(m,"class","svelte-kgr7km"),Q(r,"class","svelte-kgr7km"),Q(v,"class","svelte-kgr7km")},m(t,s){y(t,n,s),void 0!==e[0]&&(n.textContent=e[0]),y(t,o,s),y(t,r,s),k(r,c),k(c,i),N(i,e[1]),k(c,l),k(r,u),k(r,a),k(a,f),N(f,e[2]),k(a,d),k(r,p),k(r,m),k(m,h),N(h,e[3]),k(m,g),y(t,$,s),y(t,v,s),x||(b=[B(n,"input",e[7]),B(i,"input",e[8]),B(f,"input",e[9]),B(h,"input",e[10]),B(v,"click",e[11])],x=!0)},p(t,[e]){1&e&&t[0]!==n.textContent&&(n.textContent=t[0]),2&e&&S(i.value)!==t[1]&&N(i,t[1]),4&e&&S(f.value)!==t[2]&&N(f,t[2]),8&e&&S(h.value)!==t[3]&&N(h,t[3])},i:t,o:t,d(t){t&&A(n),t&&A(o),t&&A(r),t&&A($),t&&A(v),x=!1,s(b)}}}function Gt(t,e,n){let o;f(t,At,(t=>n(12,o=t)));let{routineIndex:r=0}=e,{routineExerciseIndex:s=0}=e,c=o[r].exercises[s],{name:i,calories:l,time:u,reps:a}=c;return t.$$set=t=>{"routineIndex"in t&&n(5,r=t.routineIndex),"routineExerciseIndex"in t&&n(6,s=t.routineExerciseIndex)},t.$$.update=()=>{3&t.$$.dirty&&function(t,e,n){let o=It(t);yt.update((function(t){return t[o].name=e,t[o].calories=n,t}))}(c.exerciseId,i,l),108&t.$$.dirty&&function(t,e,n,o){kt.update((function(r){return r[t].exercises[e].time=n,r[t].exercises[e].reps=o,r}))}(r,s,u,a)},[i,l,u,a,c,r,s,function(){i=this.textContent,n(0,i)},function(){l=S(this.value),n(1,l)},function(){u=S(this.value),n(2,u)},function(){a=S(this.value),n(3,a)},function(){!function(t,e,n){let o=It(t);yt.update((function(t){return t[o].lastTime=e,t[o].lastReps=n,t}))}(c.exerciseId,u,a),Me.update((function(t){return t.shift(),"Add Exercise"===t[0].title&&t.shift(),t}))}]}class Zt extends $t{constructor(t){super(),gt(this,t,Gt,Kt,l,{routineIndex:5,routineExerciseIndex:6})}}function jt(t,{delay:n=0,duration:o=400,easing:r=e}={}){const s=+getComputedStyle(t).opacity;return{delay:n,duration:o,easing:r,css:t=>"opacity: "+t*s}}function qt(t,e,n){const o=t.slice();return o[6]=e[n],o[8]=n,o}function Vt(e){let n,o;return{c(){n=E("h1"),n.textContent="No exercises.",Q(n,"id","notfound"),Q(n,"class","svelte-10vtxhh")},m(t,e){y(t,n,e)},p:t,i(t){o||q((()=>{o=lt(n,jt,{}),o.start()}))},o:t,d(t){t&&A(n)}}}function Jt(t){let e,n,o=t[1],r=[];for(let e=0;e<o.length;e+=1)r[e]=zt(qt(t,o,e));const s=t=>ct(r[t],1,1,(()=>{r[t]=null}));return{c(){for(let t=0;t<r.length;t+=1)r[t].c();e=_()},m(t,o){for(let e=0;e<r.length;e+=1)r[e].m(t,o);y(t,e,o),n=!0},p(t,n){if(7&n){let c;for(o=t[1],c=0;c<o.length;c+=1){const s=qt(t,o,c);r[c]?(r[c].p(s,n),st(r[c],1)):(r[c]=zt(s),r[c].c(),st(r[c],1),r[c].m(e.parentNode,e))}for(ot(),c=o.length;c<r.length;c+=1)s(c);rt()}},i(t){if(!n){for(let t=0;t<o.length;t+=1)st(r[t]);n=!0}},o(t){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)ct(r[t]);n=!1},d(t){w(r,t),t&&A(e)}}}function Xt(t){let e,n,o,r,s,c,i=t[6].name+"",l=t[6].calories+"";return{c(){e=E("b"),n=C(i),o=I(),r=E("p"),s=C(l),c=C(" kcal.")},m(t,i){y(t,e,i),k(e,n),y(t,o,i),y(t,r,i),k(r,s),k(r,c)},p(t,e){2&e&&i!==(i=t[6].name+"")&&M(n,i),2&e&&l!==(l=t[6].calories+"")&&M(s,l)},d(t){t&&A(e),t&&A(o),t&&A(r)}}}function zt(t){let e,n,o,r,c,i;function l(){return t[3](t[6])}function u(){return t[4](t[6],t[8])}return n=new Wt({props:{$$slots:{default:[Xt]},$$scope:{ctx:t}}}),{c(){e=E("div"),dt(n.$$.fragment),o=I(),Q(e,"id","exercise"),Q(e,"class","svelte-10vtxhh")},m(t,s){y(t,e,s),pt(n,e,null),k(e,o),r=!0,c||(i=[m(Pt.call(null,e)),B(e,"press",l),B(e,"hold",u)],c=!0)},p(e,o){t=e;const r={};514&o&&(r.$$scope={dirty:o,ctx:t}),n.$set(r)},i(t){r||(st(n.$$.fragment,t),r=!0)},o(t){ct(n.$$.fragment,t),r=!1},d(t){t&&A(e),mt(n),c=!1,s(i)}}}function Yt(t){let e,n,o,r,s,c,i;const l=[Jt,Vt],u=[];function a(t,e){return t[1].length?0:1}return n=a(t),o=u[n]=l[n](t),c=new Tt({props:{callback:t[5]}}),{c(){e=E("list"),o.c(),r=I(),s=E("div"),dt(c.$$.fragment),Q(e,"class","svelte-10vtxhh"),Q(s,"id","button"),Q(s,"class","svelte-10vtxhh")},m(t,o){y(t,e,o),u[n].m(e,null),y(t,r,o),y(t,s,o),pt(c,s,null),i=!0},p(t,[r]){let s=n;n=a(t),n===s?u[n].p(t,r):(ot(),ct(u[s],1,1,(()=>{u[s]=null})),rt(),o=u[n],o?o.p(t,r):(o=u[n]=l[n](t),o.c()),st(o,1),o.m(e,null));const i={};7&r&&(i.callback=t[5]),c.$set(i)},i(t){i||(st(o),st(c.$$.fragment,t),i=!0)},o(t){ct(o),ct(c.$$.fragment,t),i=!1},d(t){t&&A(e),u[n].d(),t&&A(r),t&&A(s),mt(c)}}}function Ht(t,e,n){let o,r;f(t,yt,(t=>n(1,o=t))),f(t,At,(t=>n(2,r=t)));let{routineIndex:s=0}=e;return t.$$set=t=>{"routineIndex"in t&&n(0,s=t.routineIndex)},[s,o,r,function(t){Bt(s,t),Ne(Zt,{routineIndex:s,routineExerciseIndex:r[s].exercises.length-1},"")},async function(t,e){var n;await Ft(`Delete "${t.name}"?`)&&(n=e,yt.update((function(t){return[...t.slice(0,n),...t.slice(n+1)]})))},function(){yt.update((function(t){return t.push({id:Nt(),name:"New Exercise",calories:.1}),t})),Bt(s,o[o.length-1]),Ne(Zt,{routineIndex:s,routineExerciseIndex:r[s].exercises.length-1},"")}]}class te extends $t{constructor(t){super(),gt(this,t,Ht,Yt,l,{routineIndex:0})}}let ee=new AudioContext;function ne(t="triangle",e=2){let n=ee.createOscillator(),o=ee.createGain();n.connect(o),o.connect(ee.destination),n.type=t,n.start(0),o.gain.exponentialRampToValueAtTime(1e-4,ee.currentTime+e),n.stop(ee.currentTime+e)}function oe(e){let n,o;return{c(){n=E("video"),n.loop=!0,n.src!==(o="data:video/webm;base64,GkXfo0AgQoaBAUL3gQFC8oEEQvOBCEKCQAR3ZWJtQoeBAkKFgQIYU4BnQI0VSalmQCgq17FAAw9CQE2AQAZ3aGFtbXlXQUAGd2hhbW15RIlACECPQAAAAAAAFlSua0AxrkAu14EBY8WBAZyBACK1nEADdW5khkAFVl9WUDglhohAA1ZQOIOBAeBABrCBCLqBCB9DtnVAIueBAKNAHIEAAIAwAQCdASoIAAgAAUAmJaQAA3AA/vz0AAA=")&&Q(n,"src","data:video/webm;base64,GkXfo0AgQoaBAUL3gQFC8oEEQvOBCEKCQAR3ZWJtQoeBAkKFgQIYU4BnQI0VSalmQCgq17FAAw9CQE2AQAZ3aGFtbXlXQUAGd2hhbW15RIlACECPQAAAAAAAFlSua0AxrkAu14EBY8WBAZyBACK1nEADdW5khkAFVl9WUDglhohAA1ZQOIOBAeBABrCBCLqBCB9DtnVAIueBAKNAHIEAAIAwAQCdASoIAAgAAUAmJaQAA3AA/vz0AAA="),Q(n,"class","svelte-n6n2yg")},m(t,e){y(t,n,e)},p:t,i:t,o:t,d(t){t&&A(n)}}}class re extends $t{constructor(t){super(),gt(this,t,null,oe,l,{})}}function se(t){let e,n,o,r,s,c,i,l,u,a,f,d=(t[3]?"Break":t[5].name)+"",p=((t[3]?t[4][t[0]].break:t[5].time)-t[2]).toFixed(1)+"";function m(t,e){return!t[3]&&t[5].reps?le:t[3]?ie:void 0}let h=m(t),g=h&&h(t);return{c(){e=E("div"),o=I(),r=E("roundthing"),s=E("h1"),c=C(d),i=I(),g&&g.c(),l=I(),u=E("h2"),a=C(p),f=C(" sec."),Q(e,"id","circle"),Q(e,"style",n=`--rotate: ${t[3]?360-t[2]/t[4][t[0]].break*360:t[2]/t[5].time*360}deg`),Q(e,"class","svelte-1k01av7"),Q(s,"class","svelte-1k01av7"),Q(u,"class","svelte-1k01av7"),Q(r,"class","svelte-1k01av7")},m(t,n){y(t,e,n),y(t,o,n),y(t,r,n),k(r,s),k(s,c),k(r,i),g&&g.m(r,null),k(r,l),k(r,u),k(u,a),k(u,f)},p(t,o){61&o&&n!==(n=`--rotate: ${t[3]?360-t[2]/t[4][t[0]].break*360:t[2]/t[5].time*360}deg`)&&Q(e,"style",n),40&o&&d!==(d=(t[3]?"Break":t[5].name)+"")&&M(c,d),h===(h=m(t))&&g?g.p(t,o):(g&&g.d(1),g=h&&h(t),g&&(g.c(),g.m(r,l))),61&o&&p!==(p=((t[3]?t[4][t[0]].break:t[5].time)-t[2]).toFixed(1)+"")&&M(a,p)},d(t){t&&A(e),t&&A(o),t&&A(r),g&&g.d()}}}function ce(e){let n,o,r;return{c(){n=E("button"),n.textContent="Start",Q(n,"id","start"),Q(n,"class","svelte-1k01av7")},m(t,s){y(t,n,s),o||(r=B(n,"click",e[6]),o=!0)},p:t,d(t){t&&A(n),o=!1,r()}}}function ie(t){let e,n,o,r=t[5].name+"";return{c(){e=E("h2"),n=C("Next: "),o=C(r),Q(e,"class","svelte-1k01av7")},m(t,r){y(t,e,r),k(e,n),k(e,o)},p(t,e){32&e&&r!==(r=t[5].name+"")&&M(o,r)},d(t){t&&A(e)}}}function le(t){let e,n,o,r=t[5].reps+"";return{c(){e=E("h2"),n=C(r),o=C(" reps"),Q(e,"class","svelte-1k01av7")},m(t,r){y(t,e,r),k(e,n),k(e,o)},p(t,e){32&e&&r!==(r=t[5].reps+"")&&M(n,r)},d(t){t&&A(e)}}}function ue(e){let n,o,r,c,i,l,u,a;return{c(){n=E("div"),o=E("button"),o.textContent="<",r=I(),c=E("button"),c.textContent="○",i=I(),l=E("button"),l.textContent=">",Q(o,"class","svelte-1k01av7"),Q(c,"class","svelte-1k01av7"),Q(l,"class","svelte-1k01av7"),Q(n,"id","controlbuttons"),Q(n,"class","svelte-1k01av7")},m(t,s){y(t,n,s),k(n,o),k(n,r),k(n,c),k(n,i),k(n,l),u||(a=[B(o,"click",e[8]),B(c,"click",e[7]),B(l,"click",e[9])],u=!0)},p:t,d(t){t&&A(n),u=!1,s(a)}}}function ae(t){let e,n,o,r,s,c;function i(t,e){return-1==t[1]?ce:se}e=new re({});let l=i(t),u=l(t),a=-1!==t[1]&&ue(t);return{c(){dt(e.$$.fragment),n=I(),o=E("container"),u.c(),r=I(),a&&a.c(),s=_(),Q(o,"class","svelte-1k01av7")},m(t,i){pt(e,t,i),y(t,n,i),y(t,o,i),u.m(o,null),y(t,r,i),a&&a.m(t,i),y(t,s,i),c=!0},p(t,[e]){l===(l=i(t))&&u?u.p(t,e):(u.d(1),u=l(t),u&&(u.c(),u.m(o,null))),-1!==t[1]?a?a.p(t,e):(a=ue(t),a.c(),a.m(s.parentNode,s)):a&&(a.d(1),a=null)},i(t){c||(st(e.$$.fragment,t),c=!0)},o(t){ct(e.$$.fragment,t),c=!1},d(t){mt(e,t),t&&A(n),t&&A(o),u.d(),t&&A(r),a&&a.d(t),t&&A(s)}}}const fe=.1;function de(t,e,n){let o,r;f(t,At,(t=>n(4,r=t)));let{i:s=0}=e,c=-1,i=r[s],l=0,u=!1,a=!1,d=setInterval((function(){-1==c||a||(n(2,l+=fe),u&&l>=r[s].break?(ne("triangle",4),n(2,l=fe),n(3,u=!1)):!u&&l>=o.time&&(ne("sine",4),n(2,l=fe),n(3,u=!0),c<i.exercises.length-1?n(1,c++,c):n(1,c=-1)))}),100);function p(){n(1,c=0),n(2,l=0),a=!1}function m(){if(-1==c)return p();a=!a}function h(){if(!(l>3))return u?(n(1,c--,c),n(3,u=!1),void n(2,l=0)):void(0!=c?(n(3,u=!0),n(2,l=0)):n(1,c=-1));n(2,l=0)}function g(){n(2,l=u?r[s].break:o.time)}function $(t){switch(t.key){case" ":t.preventDefault(),m();break;case"ArrowLeft":h();break;case"ArrowRight":g()}}return document.addEventListener("keydown",$),U((function(){clearInterval(d),document.removeEventListener("keydown",$)})),t.$$set=t=>{"i"in t&&n(0,s=t.i)},t.$$.update=()=>{2&t.$$.dirty&&n(5,o=i.exercises[c])},[s,c,l,u,r,o,p,m,h,g]}class pe extends $t{constructor(t){super(),gt(this,t,de,ae,l,{i:0})}}function me(t,e,n){const o=t.slice();return o[12]=e[n],o[14]=n,o}function he(t){let e,n,o,r=t[3].exercises.length+"";return{c(){e=E("p"),n=C(r),o=C(" exercises"),Q(e,"class","svelte-19o1eed")},m(t,r){y(t,e,r),k(e,n),k(e,o)},p(t,e){8&e&&r!==(r=t[3].exercises.length+"")&&M(n,r)},d(t){t&&A(e)}}}function ge(e){let n,o;return{c(){n=E("p"),n.textContent="No exercises.",Q(n,"id","notfound"),Q(n,"class","svelte-19o1eed")},m(t,e){y(t,n,e)},p:t,i(t){o||q((()=>{o=lt(n,jt,{}),o.start()}))},o:t,d(t){t&&A(n)}}}function $e(t){let e,n,o=[],r=new Map,s=t[3].exercises;const c=t=>t[12].id;for(let e=0;e<s.length;e+=1){let n=me(t,s,e),i=c(n);r.set(i,o[e]=ke(i,n))}return{c(){for(let t=0;t<o.length;t+=1)o[t].c();e=_()},m(t,r){for(let e=0;e<o.length;e+=1)o[e].m(t,r);y(t,e,r),n=!0},p(t,n){11&n&&(s=t[3].exercises,ot(),o=ft(o,n,c,1,t,s,r,e.parentNode,at,ke,e,me),rt())},i(t){if(!n){for(let t=0;t<s.length;t+=1)st(o[t]);n=!0}},o(t){for(let t=0;t<o.length;t+=1)ct(o[t]);n=!1},d(t){for(let e=0;e<o.length;e+=1)o[e].d(t);t&&A(e)}}}function ve(t){let e,n,o,r,s,c,i,l=t[12].time+"",u=Math.round(t[12].time*t[12].calories)+"";return{c(){e=E("p"),n=C(l),o=C(" seconds"),r=I(),s=E("p"),c=C(u),i=C(" kcal.")},m(t,l){y(t,e,l),k(e,n),k(e,o),y(t,r,l),y(t,s,l),k(s,c),k(s,i)},p(t,e){8&e&&l!==(l=t[12].time+"")&&M(n,l),8&e&&u!==(u=Math.round(t[12].time*t[12].calories)+"")&&M(c,u)},d(t){t&&A(e),t&&A(r),t&&A(s)}}}function xe(t){let e,n,o,r,s,c,i,l=t[12].reps+"",u=Math.round(t[12].reps*t[12].calories)+"";return{c(){e=E("p"),n=C(l),o=C(" reps"),r=I(),s=E("p"),c=C(u),i=C(" kcal.")},m(t,l){y(t,e,l),k(e,n),k(e,o),y(t,r,l),y(t,s,l),k(s,c),k(s,i)},p(t,e){8&e&&l!==(l=t[12].reps+"")&&M(n,l),8&e&&u!==(u=Math.round(t[12].reps*t[12].calories)+"")&&M(c,u)},d(t){t&&A(e),t&&A(r),t&&A(s)}}}function be(t){let e,n,o,r,s=t[12].name+"";function c(t,e){return t[12].reps?xe:ve}let i=c(t),l=i(t);return{c(){e=E("b"),n=C(s),o=I(),l.c(),r=_()},m(t,s){y(t,e,s),k(e,n),y(t,o,s),l.m(t,s),y(t,r,s)},p(t,e){8&e&&s!==(s=t[12].name+"")&&M(n,s),i===(i=c(t))&&l?l.p(t,e):(l.d(1),l=i(t),l&&(l.c(),l.m(r.parentNode,r)))},d(t){t&&A(e),t&&A(o),l.d(t),t&&A(r)}}}function ke(t,e){let n,o,r,c,i,l;function u(){return e[6](e[12],e[14])}function a(){return e[7](e[14])}return o=new Wt({props:{$$slots:{default:[be]},$$scope:{ctx:e}}}),{key:t,first:null,c(){n=E("div"),dt(o.$$.fragment),r=I(),Q(n,"class","svelte-19o1eed"),this.first=n},m(t,e){y(t,n,e),pt(o,n,null),k(n,r),c=!0,i||(l=[m(Pt.call(null,n)),B(n,"hold",u),B(n,"press",a)],i=!0)},p(t,n){e=t;const r={};32776&n&&(r.$$scope={dirty:n,ctx:e}),o.$set(r)},i(t){c||(st(o.$$.fragment,t),c=!0)},o(t){ct(o.$$.fragment,t),c=!1},d(t){t&&A(n),mt(o),i=!1,s(l)}}}function ye(t){let e,n,o,r,c,i,l,u,a,f,d,p,m,h,g,$,v,x,b,w,_,R,F,L,O,T,D,U,W=Math.round(t[3].time/60)+"",P=t[3].calories+"",K=t[3].exercises&&he(t);const G=[$e,ge],Z=[];function j(t,e){return t[3]?.exercises?.length?0:1}return b=j(t),w=Z[b]=G[b](t),O=new Tt({props:{callback:t[9]}}),{c(){e=E("h1"),n=I(),o=E("info"),r=E("p"),c=C(W),i=C(" minute(s)"),l=I(),u=E("p"),a=C(P),f=C(" kcal."),d=I(),K&&K.c(),p=I(),m=E("div"),h=E("input"),g=I(),$=E("span"),$.textContent="second breaks",v=I(),x=E("list"),w.c(),_=I(),R=E("button"),R.textContent="Go!",F=I(),L=E("div"),dt(O.$$.fragment),Q(e,"contenteditable","true"),Q(e,"class","svelte-19o1eed"),void 0===t[1]&&q((()=>t[4].call(e))),Q(r,"class","svelte-19o1eed"),Q(u,"class","svelte-19o1eed"),Q(h,"type","number"),Q(h,"class","svelte-19o1eed"),Q(m,"class","svelte-19o1eed"),Q(o,"class","svelte-19o1eed"),Q(x,"class","svelte-19o1eed"),Q(R,"id","go"),Q(R,"class","svelte-19o1eed"),Q(L,"id","button"),Q(L,"class","svelte-19o1eed")},m(s,A){y(s,e,A),void 0!==t[1]&&(e.textContent=t[1]),y(s,n,A),y(s,o,A),k(o,r),k(r,c),k(r,i),k(o,l),k(o,u),k(u,a),k(u,f),k(o,d),K&&K.m(o,null),k(o,p),k(o,m),k(m,h),N(h,t[2]),k(m,g),k(m,$),y(s,v,A),y(s,x,A),Z[b].m(x,null),y(s,_,A),y(s,R,A),y(s,F,A),y(s,L,A),pt(O,L,null),T=!0,D||(U=[B(e,"input",t[4]),B(h,"input",t[5]),B(R,"click",t[8])],D=!0)},p(t,[n]){2&n&&t[1]!==e.textContent&&(e.textContent=t[1]),(!T||8&n)&&W!==(W=Math.round(t[3].time/60)+"")&&M(c,W),(!T||8&n)&&P!==(P=t[3].calories+"")&&M(a,P),t[3].exercises?K?K.p(t,n):(K=he(t),K.c(),K.m(o,p)):K&&(K.d(1),K=null),4&n&&S(h.value)!==t[2]&&N(h,t[2]);let r=b;b=j(t),b===r?Z[b].p(t,n):(ot(),ct(Z[r],1,1,(()=>{Z[r]=null})),rt(),w=Z[b],w?w.p(t,n):(w=Z[b]=G[b](t),w.c()),st(w,1),w.m(x,null));const s={};1&n&&(s.callback=t[9]),O.$set(s)},i(t){T||(st(w),st(O.$$.fragment,t),T=!0)},o(t){ct(w),ct(O.$$.fragment,t),T=!1},d(t){t&&A(e),t&&A(n),t&&A(o),K&&K.d(),t&&A(v),t&&A(x),Z[b].d(),t&&A(_),t&&A(R),t&&A(F),t&&A(L),mt(O),D=!1,s(U)}}}function Ae(t,e,n){let o;f(t,At,(t=>n(10,o=t)));let{i:r=0}=e,s=o[r],c=s.name,i=s.break;U(At.subscribe((function(t){n(3,s=t[r])})));return t.$$set=t=>{"i"in t&&n(0,r=t.i)},t.$$.update=()=>{7&t.$$.dirty&&function(t,e,n){kt.update((function(o){return o[t].name=e,o[t].break=n,o}))}(r,c,i)},[r,c,i,s,function(){c=this.textContent,n(1,c)},function(){i=S(this.value),n(2,i)},async function(t,e){switch(await async function(t,e){return a(Rt).text?new Promise((function(t){t(!1)})):new Promise((function(n){Rt.set({text:t,options:e,callback:function(t){Rt.set({text:"",callback:function(){}}),n(t)}})}))}(`What do you want to do with "${t.name}"?`,["Remove","Move Up","Move Down","Cancel"])){case 0:n=r,o=e,kt.update((function(t){return t[n].exercises=[...t[n].exercises.slice(0,o),...t[n].exercises.slice(o+1)],t}));break;case 1:Et(r,e,e-1);break;case 2:Et(r,e,e+1)}var n,o},function(t){void 0!==c&&Ne(Zt,{routineIndex:r,routineExerciseIndex:t})},function(){s.exercises.length&&Ne(pe,{i:r},"")},function(){Ne(te,{routineIndex:r},"Add Exercise")}]}class we extends $t{constructor(t){super(),gt(this,t,Ae,ye,l,{i:0})}}function Ee(t,e,n){const o=t.slice();return o[4]=e[n],o[6]=n,o}function Ce(t){let e,n,o,r,s,c,i,l,u,a,f=t[4].name+"",d=Math.round(t[4].time/60)+"",p=t[4].calories+"";return{c(){e=E("b"),n=C(f),o=I(),r=E("p"),s=C(d),c=C(" min."),i=I(),l=E("p"),u=C(p),a=C(" kcal.")},m(t,f){y(t,e,f),k(e,n),y(t,o,f),y(t,r,f),k(r,s),k(r,c),y(t,i,f),y(t,l,f),k(l,u),k(l,a)},p(t,e){1&e&&f!==(f=t[4].name+"")&&M(n,f),1&e&&d!==(d=Math.round(t[4].time/60)+"")&&M(s,d),1&e&&p!==(p=t[4].calories+"")&&M(u,p)},d(t){t&&A(e),t&&A(o),t&&A(r),t&&A(i),t&&A(l)}}}function Ie(t,e){let n,o,r,c,i;function l(){return e[1](e[6])}function u(){return e[2](e[4],e[6])}return o=new Wt({props:{$$slots:{default:[Ce]},$$scope:{ctx:e}}}),{key:t,first:null,c(){n=E("div"),dt(o.$$.fragment),Q(n,"class","svelte-1n6ushe"),this.first=n},m(t,e){y(t,n,e),pt(o,n,null),r=!0,c||(i=[m(Pt.call(null,n)),B(n,"press",l),B(n,"hold",u)],c=!0)},p(t,n){e=t;const r={};129&n&&(r.$$scope={dirty:n,ctx:e}),o.$set(r)},i(t){r||(st(o.$$.fragment,t),r=!0)},o(t){ct(o.$$.fragment,t),r=!1},d(t){t&&A(n),mt(o),c=!1,s(i)}}}function _e(t){let e;return{c(){e=E("p"),e.textContent="No routines",Q(e,"id","notfound"),Q(e,"class","svelte-1n6ushe")},m(t,n){y(t,e,n)},d(t){t&&A(e)}}}function Be(t){let e,n,o,r,s,c,i=[],l=new Map,u=t[0];const a=t=>t[4].id;for(let e=0;e<u.length;e+=1){let n=Ee(t,u,e),o=a(n);l.set(o,i[e]=Ie(o,n))}let f=0==t[0].length&&_e();return s=new Tt({props:{callback:t[3]}}),{c(){e=E("div");for(let t=0;t<i.length;t+=1)i[t].c();n=I(),f&&f.c(),o=I(),r=E("div"),dt(s.$$.fragment),Q(e,"id","list"),Q(e,"class","svelte-1n6ushe"),Q(r,"id","button"),Q(r,"class","svelte-1n6ushe")},m(t,l){y(t,e,l);for(let t=0;t<i.length;t+=1)i[t].m(e,null);k(e,n),f&&f.m(e,null),y(t,o,l),y(t,r,l),pt(s,r,null),c=!0},p(t,[o]){1&o&&(u=t[0],ot(),i=ft(i,o,a,1,t,u,l,e,at,Ie,n,Ee),rt()),0==t[0].length?f||(f=_e(),f.c(),f.m(e,null)):f&&(f.d(1),f=null);const r={};1&o&&(r.callback=t[3]),s.$set(r)},i(t){if(!c){for(let t=0;t<u.length;t+=1)st(i[t]);st(s.$$.fragment,t),c=!0}},o(t){for(let t=0;t<i.length;t+=1)ct(i[t]);ct(s.$$.fragment,t),c=!1},d(t){t&&A(e);for(let t=0;t<i.length;t+=1)i[t].d();f&&f.d(),t&&A(o),t&&A(r),mt(s)}}}function Qe(t,e,n){let o;f(t,At,(t=>n(0,o=t)));return[o,function(t){Ne(we,{i:t},"")},async function(t,e){await Ft(`Delete "${t.name}"?`)&&wt(e)},function(){kt.update((function(t){return[...t,{id:Nt(),name:"New Routine",break:10,exercises:[]}]})),Ne(we,{i:o.length-1},"")}]}class Se extends $t{constructor(t){super(),gt(this,t,Qe,Be,l,{})}}const Me=xt([{page:Se,props:{},title:"Routines"}]),Ne=function(t=Se,e={},n="Routines"){window.history.pushState({},n,location.href),Me.update((function(o){return[{page:t,props:e,title:n},...o]}))},Re=function(t=1){if(a(Me).length<=1)return!0;window.history.go(-t)};function Fe(e){let n,o,r,s,c,i,l,u,a,f,d,p,m=e[0][0].title+"";return{c(){n=E("div"),o=E("button"),r=C("<"),c=I(),i=E("p"),l=C(m),a=I(),f=E("div"),Q(o,"style",s=1==e[0].length?"display: none;":""),Q(o,"class","svelte-5w25g5"),Q(i,"class","svelte-5w25g5"),Q(n,"id","bar"),Q(n,"style",u=e[0][0].title?"":"border: none;"),Q(n,"class","svelte-5w25g5"),Q(f,"id","space"),Q(f,"class","svelte-5w25g5")},m(t,s){y(t,n,s),k(n,o),k(o,r),k(n,c),k(n,i),k(i,l),y(t,a,s),y(t,f,s),d||(p=B(o,"click",e[1]),d=!0)},p(t,[e]){1&e&&s!==(s=1==t[0].length?"display: none;":"")&&Q(o,"style",s),1&e&&m!==(m=t[0][0].title+"")&&M(l,m),1&e&&u!==(u=t[0][0].title?"":"border: none;")&&Q(n,"style",u)},i:t,o:t,d(t){t&&A(n),t&&A(a),t&&A(f),d=!1,p()}}}function Le(t,e,n){let o;f(t,Me,(t=>n(0,o=t)));return[o,function(){Re(1)}]}window.onpopstate=function(){a(Me).length<=1||Me.update((function(t){return t.slice(1)}))};class Oe extends $t{constructor(t){super(),gt(this,t,Le,Fe,l,{})}}function Te(t,e,n){const o=t.slice();return o[4]=e[n],o[6]=n,o}function De(t){let e,n,o,r,s,c,i,l,u=t[0].text+"";function a(t,e){return void 0===t[0].options?We:Ue}let f=a(t),d=f(t);return{c(){e=E("darken"),n=E("box"),o=E("h1"),r=C(u),s=I(),c=E("buttoncontainer"),d.c(),Q(o,"class","svelte-7vg1f8"),Q(c,"class","svelte-7vg1f8"),Q(n,"class","svelte-7vg1f8"),Q(e,"class","svelte-7vg1f8")},m(t,i){y(t,e,i),k(e,n),k(n,o),k(o,r),k(n,s),k(n,c),d.m(c,null),l=!0},p(t,e){(!l||1&e)&&u!==(u=t[0].text+"")&&M(r,u),f===(f=a(t))&&d?d.p(t,e):(d.d(1),d=f(t),d&&(d.c(),d.m(c,null)))},i(t){l||(q((()=>{i||(i=ut(e,jt,{duration:100},!0)),i.run(1)})),l=!0)},o(t){i||(i=ut(e,jt,{duration:100},!1)),i.run(0),l=!1},d(t){t&&A(e),d.d(),t&&i&&i.end()}}}function Ue(t){let e,n=t[0].options,o=[];for(let e=0;e<n.length;e+=1)o[e]=Pe(Te(t,n,e));return{c(){for(let t=0;t<o.length;t+=1)o[t].c();e=_()},m(t,n){for(let e=0;e<o.length;e+=1)o[e].m(t,n);y(t,e,n)},p(t,r){if(1&r){let s;for(n=t[0].options,s=0;s<n.length;s+=1){const c=Te(t,n,s);o[s]?o[s].p(c,r):(o[s]=Pe(c),o[s].c(),o[s].m(e.parentNode,e))}for(;s<o.length;s+=1)o[s].d(1);o.length=n.length}},d(t){w(o,t),t&&A(e)}}}function We(e){let n,o,r,c,i;return{c(){n=E("button"),n.textContent="Yes",o=I(),r=E("button"),r.textContent="No",Q(n,"id","yes"),Q(n,"class","svelte-7vg1f8"),Q(r,"id","no"),Q(r,"class","svelte-7vg1f8")},m(t,s){y(t,n,s),y(t,o,s),y(t,r,s),c||(i=[B(n,"click",e[1]),B(r,"click",e[2])],c=!0)},p:t,d(t){t&&A(n),t&&A(o),t&&A(r),c=!1,s(i)}}}function Pe(t){let e,n,o,r,s=t[4]+"";function c(){return t[3](t[6])}return{c(){var t,o,r;e=E("button"),n=C(s),t="width",o="100%",e.style.setProperty(t,o,r?"important":""),Q(e,"class","svelte-7vg1f8")},m(t,s){y(t,e,s),k(e,n),o||(r=B(e,"click",c),o=!0)},p(e,o){t=e,1&o&&s!==(s=t[4]+"")&&M(n,s)},d(t){t&&A(e),o=!1,r()}}}function Ke(t){let e,n,o=t[0].text&&De(t);return{c(){o&&o.c(),e=_()},m(t,r){o&&o.m(t,r),y(t,e,r),n=!0},p(t,[n]){t[0].text?o?(o.p(t,n),1&n&&st(o,1)):(o=De(t),o.c(),st(o,1),o.m(e.parentNode,e)):o&&(ot(),ct(o,1,1,(()=>{o=null})),rt())},i(t){n||(st(o),n=!0)},o(t){ct(o),n=!1},d(t){o&&o.d(t),t&&A(e)}}}function Ge(t,e,n){let o;f(t,Rt,(t=>n(0,o=t)));return[o,function(){o.callback(!0)},function(){o.callback(!1)},function(t){o.callback(t)}]}class Ze extends $t{constructor(t){super(),gt(this,t,Ge,Ke,l,{})}}function je(t){let e,o,r,s;const c=[t[0][0].props];var i=t[0][0].page;function l(t){let e={};for(let t=0;t<c.length;t+=1)e=n(e,c[t]);return{props:e}}return i&&(o=new i(l())),{c(){e=E("div"),o&&dt(o.$$.fragment),Q(e,"class","svelte-19uewan")},m(t,n){y(t,e,n),o&&pt(o,e,null),s=!0},p(t,n){const r=1&n?function(t,e){const n={},o={},r={$$scope:1};let s=t.length;for(;s--;){const c=t[s],i=e[s];if(i){for(const t in c)t in i||(o[t]=1);for(const t in i)r[t]||(n[t]=i[t],r[t]=1);t[s]=i}else for(const t in c)r[t]=1}for(const t in o)t in n||(n[t]=void 0);return n}(c,[(s=t[0][0].props,"object"==typeof s&&null!==s?s:{})]):{};var s;if(i!==(i=t[0][0].page)){if(o){ot();const t=o;ct(t.$$.fragment,1,0,(()=>{mt(t,1)})),rt()}i?(o=new i(l()),dt(o.$$.fragment),st(o.$$.fragment,1),pt(o,e,null)):o=null}else i&&o.$set(r)},i(t){s||(o&&st(o.$$.fragment,t),r||q((()=>{r=lt(e,jt,{duration:100,delay:50}),r.start()})),s=!0)},o(t){o&&ct(o.$$.fragment,t),s=!1},d(t){t&&A(e),o&&mt(o)}}}function qe(e){let n,o,r,s,c,i=e[0][0];n=new Oe({});let u=je(e);return s=new Ze({}),{c(){dt(n.$$.fragment),o=I(),u.c(),r=I(),dt(s.$$.fragment)},m(t,e){pt(n,t,e),y(t,o,e),u.m(t,e),y(t,r,e),pt(s,t,e),c=!0},p(e,[n]){1&n&&l(i,i=e[0][0])?(ot(),ct(u,1,1,t),rt(),u=je(e),u.c(),st(u),u.m(r.parentNode,r)):u.p(e,n)},i(t){c||(st(n.$$.fragment,t),st(u),st(s.$$.fragment,t),c=!0)},o(t){ct(n.$$.fragment,t),ct(u),ct(s.$$.fragment,t),c=!1},d(t){mt(n,t),t&&A(o),u.d(t),t&&A(r),mt(s,t)}}}function Ve(t,e,n){let o;return f(t,Me,(t=>n(0,o=t))),document.addEventListener("keydown",(function(t){switch(t.key){case"Escape":Re();break;case" ":let t=document.createEvent("MouseEvents");t.initEvent("mousedown",!0,!0),document.activeElement.dispatchEvent(t)}})),[o]}return new class extends $t{constructor(t){super(),gt(this,t,Ve,qe,l,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
