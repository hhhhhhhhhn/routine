var app=function(){"use strict";function t(){}const e=t=>t;function n(t,e){for(const n in e)t[n]=e[n];return t}function s(t){return t()}function r(){return Object.create(null)}function o(t){t.forEach(s)}function c(t){return"function"==typeof t}function i(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function l(e,...n){if(null==e)return t;const s=e.subscribe(...n);return s.unsubscribe?()=>s.unsubscribe():s}function u(t){let e;return l(t,(t=>e=t))(),e}function a(t,e,n){t.$$.on_destroy.push(l(e,n))}function f(t,e,s,r){return t[1]&&r?n(s.ctx.slice(),t[1](r(e))):s.ctx}function d(t,e,n,s,r,o,c){const i=function(t,e,n,s){if(t[2]&&s){const r=t[2](s(n));if(void 0===e.dirty)return r;if("object"==typeof r){const t=[],n=Math.max(e.dirty.length,r.length);for(let s=0;s<n;s+=1)t[s]=e.dirty[s]|r[s];return t}return e.dirty|r}return e.dirty}(e,s,r,o);if(i){const r=f(e,n,s,c);t.p(r,i)}}function p(e){return e&&c(e.destroy)?e.destroy:t}const m="undefined"!=typeof window;let h=m?()=>window.performance.now():()=>Date.now(),$=m?t=>requestAnimationFrame(t):t;const g=new Set;function x(t){g.forEach((e=>{e.c(t)||(g.delete(e),e.f())})),0!==g.size&&$(x)}function v(t){let e;return 0===g.size&&$(x),{promise:new Promise((n=>{g.add(e={c:t,f:n})})),abort(){g.delete(e)}}}function b(t,e){t.appendChild(e)}function y(t,e,n){t.insertBefore(e,n||null)}function k(t){t.parentNode.removeChild(t)}function w(t){return document.createElement(t)}function _(t){return document.createTextNode(t)}function E(){return _(" ")}function I(){return _("")}function C(t,e,n,s){return t.addEventListener(e,n,s),()=>t.removeEventListener(e,n,s)}function q(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function N(t){return""===t?null:+t}function S(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function j(t,e){t.value=null==e?"":e}const M=new Set;let A,O=0;function T(t,e,n,s,r,o,c,i=0){const l=16.666/s;let u="{\n";for(let t=0;t<=1;t+=l){const s=e+(n-e)*o(t);u+=100*t+`%{${c(s,1-s)}}\n`}const a=u+`100% {${c(n,1-n)}}\n}`,f=`__svelte_${function(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}(a)}_${i}`,d=t.ownerDocument;M.add(d);const p=d.__svelte_stylesheet||(d.__svelte_stylesheet=d.head.appendChild(w("style")).sheet),m=d.__svelte_rules||(d.__svelte_rules={});m[f]||(m[f]=!0,p.insertRule(`@keyframes ${f} ${a}`,p.cssRules.length));const h=t.style.animation||"";return t.style.animation=`${h?`${h}, `:""}${f} ${s}ms linear ${r}ms 1 both`,O+=1,f}function z(t,e){const n=(t.style.animation||"").split(", "),s=n.filter(e?t=>t.indexOf(e)<0:t=>-1===t.indexOf("__svelte")),r=n.length-s.length;r&&(t.style.animation=s.join(", "),O-=r,O||$((()=>{O||(M.forEach((t=>{const e=t.__svelte_stylesheet;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.__svelte_rules={}})),M.clear())})))}function R(t){A=t}const L=[],P=[],B=[],D=[],F=Promise.resolve();let G=!1;function J(t){B.push(t)}let K=!1;const V=new Set;function Y(){if(!K){K=!0;do{for(let t=0;t<L.length;t+=1){const e=L[t];R(e),H(e.$$)}for(R(null),L.length=0;P.length;)P.pop()();for(let t=0;t<B.length;t+=1){const e=B[t];V.has(e)||(V.add(e),e())}B.length=0}while(L.length);for(;D.length;)D.pop()();G=!1,K=!1,V.clear()}}function H(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(J)}}let Q;function U(){return Q||(Q=Promise.resolve(),Q.then((()=>{Q=null}))),Q}function W(t,e,n){t.dispatchEvent(function(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}(`${e?"intro":"outro"}${n}`))}const X=new Set;let Z;function tt(){Z={r:0,c:[],p:Z}}function et(){Z.r||o(Z.c),Z=Z.p}function nt(t,e){t&&t.i&&(X.delete(t),t.i(e))}function st(t,e,n,s){if(t&&t.o){if(X.has(t))return;X.add(t),Z.c.push((()=>{X.delete(t),s&&(n&&t.d(1),s())})),t.o(e)}}const rt={duration:0};function ot(n,s,r){let o,i,l=s(n,r),u=!1,a=0;function f(){o&&z(n,o)}function d(){const{delay:s=0,duration:r=300,easing:c=e,tick:d=t,css:p}=l||rt;p&&(o=T(n,0,1,r,s,c,p,a++)),d(0,1);const m=h()+s,$=m+r;i&&i.abort(),u=!0,J((()=>W(n,!0,"start"))),i=v((t=>{if(u){if(t>=$)return d(1,0),W(n,!0,"end"),f(),u=!1;if(t>=m){const e=c((t-m)/r);d(e,1-e)}}return u}))}let p=!1;return{start(){p||(z(n),c(l)?(l=l(),U().then(d)):d())},invalidate(){p=!1},end(){u&&(f(),u=!1)}}}function ct(n,s,r,i){let l=s(n,r),u=i?0:1,a=null,f=null,d=null;function p(){d&&z(n,d)}function m(t,e){const n=t.b-u;return e*=Math.abs(n),{a:u,b:t.b,d:n,duration:e,start:t.start,end:t.start+e,group:t.group}}function $(s){const{delay:r=0,duration:c=300,easing:i=e,tick:$=t,css:g}=l||rt,x={start:h()+r,b:s};s||(x.group=Z,Z.r+=1),a||f?f=x:(g&&(p(),d=T(n,u,s,c,r,i,g)),s&&$(0,1),a=m(x,c),J((()=>W(n,s,"start"))),v((t=>{if(f&&t>f.start&&(a=m(f,c),f=null,W(n,a.b,"start"),g&&(p(),d=T(n,u,a.b,a.duration,0,i,l.css))),a)if(t>=a.end)$(u=a.b,1-u),W(n,a.b,"end"),f||(a.b?p():--a.group.r||o(a.group.c)),a=null;else if(t>=a.start){const e=t-a.start;u=a.a+a.d*i(e/a.duration),$(u,1-u)}return!(!a&&!f)})))}return{run(t){c(l)?U().then((()=>{l=l(),$(t)})):$(t)},end(){p(),a=f=null}}}function it(t,e){st(t,1,1,(()=>{e.delete(t.key)}))}function lt(t,e,n,s,r,o,c,i,l,u,a,f){let d=t.length,p=o.length,m=d;const h={};for(;m--;)h[t[m].key]=m;const $=[],g=new Map,x=new Map;for(m=p;m--;){const t=f(r,o,m),i=n(t);let l=c.get(i);l?s&&l.p(t,e):(l=u(i,t),l.c()),g.set(i,$[m]=l),i in h&&x.set(i,Math.abs(m-h[i]))}const v=new Set,b=new Set;function y(t){nt(t,1),t.m(i,a),c.set(t.key,t),a=t.first,p--}for(;d&&p;){const e=$[p-1],n=t[d-1],s=e.key,r=n.key;e===n?(a=e.first,d--,p--):g.has(r)?!c.has(s)||v.has(s)?y(e):b.has(r)?d--:x.get(s)>x.get(r)?(b.add(s),y(e)):(v.add(r),d--):(l(n,c),d--)}for(;d--;){const e=t[d];g.has(e.key)||l(e,c)}for(;p;)y($[p-1]);return $}function ut(t){t&&t.c()}function at(t,e,n,r){const{fragment:i,on_mount:l,on_destroy:u,after_update:a}=t.$$;i&&i.m(e,n),r||J((()=>{const e=l.map(s).filter(c);u?u.push(...e):o(e),t.$$.on_mount=[]})),a.forEach(J)}function ft(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function dt(t,e){-1===t.$$.dirty[0]&&(L.push(t),G||(G=!0,F.then(Y)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function pt(e,n,s,c,i,l,u=[-1]){const a=A;R(e);const f=e.$$={fragment:null,ctx:null,props:l,update:t,not_equal:i,bound:r(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(a?a.$$.context:n.context||[]),callbacks:r(),dirty:u,skip_bound:!1};let d=!1;if(f.ctx=s?s(e,n.props||{},((t,n,...s)=>{const r=s.length?s[0]:n;return f.ctx&&i(f.ctx[t],f.ctx[t]=r)&&(!f.skip_bound&&f.bound[t]&&f.bound[t](r),d&&dt(e,t)),n})):[],f.update(),d=!0,o(f.before_update),f.fragment=!!c&&c(f.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);f.fragment&&f.fragment.l(t),t.forEach(k)}else f.fragment&&f.fragment.c();n.intro&&nt(e.$$.fragment),at(e,n.target,n.anchor,n.customElement),Y()}R(a)}class mt{$destroy(){ft(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const ht=[];function $t(e,n=t){let s;const r=[];function o(t){if(i(e,t)&&(e=t,s)){const t=!ht.length;for(let t=0;t<r.length;t+=1){const n=r[t];n[1](),ht.push(n,e)}if(t){for(let t=0;t<ht.length;t+=2)ht[t][0](ht[t+1]);ht.length=0}}}return{set:o,update:function(t){o(t(e))},subscribe:function(c,i=t){const l=[c,i];return r.push(l),1===r.length&&(s=n(o)||t),c(e),()=>{const t=r.indexOf(l);-1!==t&&r.splice(t,1),0===r.length&&(s(),s=null)}}}}function gt(e){let n,s,r,o;return{c(){n=w("button"),s=_(e[1]),q(n,"class","svelte-19o5qlr")},m(t,i){y(t,n,i),b(n,s),r||(o=C(n,"click",(function(){c(e[0])&&e[0].apply(this,arguments)})),r=!0)},p(t,[n]){e=t,2&n&&S(s,e[1])},i:t,o:t,d(t){t&&k(n),r=!1,o()}}}function xt(t,e,n){let{callback:s=function(){}}=e,{text:r="+"}=e;return t.$$set=t=>{"callback"in t&&n(0,s=t.callback),"text"in t&&n(1,r=t.text)},[s,r]}class vt extends mt{constructor(t){super(),pt(this,t,xt,gt,i,{callback:0,text:1})}}function bt(t){let e,n,s,r,o;const i=t[3].default,l=function(t,e,n,s){if(t){const r=f(t,e,n,s);return t[0](r)}}(i,t,t[2],null);return{c(){e=w("button"),l&&l.c(),q(e,"class","svelte-1jyxh9d")},m(n,i){y(n,e,i),l&&l.m(e,null),s=!0,r||(o=C(e,"click",(function(){c(t[0])&&t[0].apply(this,arguments)})),r=!0)},p(e,[n]){t=e,l&&l.p&&4&n&&d(l,i,t,t[2],n,null,null)},i(r){s||(nt(l,r),r&&J((()=>{n||(n=ct(e,t[1],{},!0)),n.run(1)})),s=!0)},o(r){st(l,r),r&&(n||(n=ct(e,t[1],{},!1)),n.run(0)),s=!1},d(t){t&&k(e),l&&l.d(t),t&&n&&n.end(),r=!1,o()}}}function yt(t,e,n){let{$$slots:s={},$$scope:r}=e,{callback:o=function(){}}=e,{trans:c=function(t,{duration:e=200,delay:n=0}){let s=+getComputedStyle(t).opacity,r=+getComputedStyle(t).height.slice(0,-2);return{duration:e,delay:n,css:t=>`\n\t\t\t\t\topacity: ${s*t};\n\t\t\t\t\theight: ${r*t}px;\n\t\t\t\t`}}}=e;return t.$$set=t=>{"callback"in t&&n(0,o=t.callback),"trans"in t&&n(1,c=t.trans),"$$scope"in t&&n(2,r=t.$$scope)},[o,c,r,s]}class kt extends mt{constructor(t){super(),pt(this,t,yt,bt,i,{callback:0,trans:1})}}function wt(t,e=750){let n,s=!1,r=!0;function o(){s=!0,r=!0,n=setTimeout((function(){s=!1,r=!1,t.dispatchEvent(new CustomEvent("hold"))}),e)}function c(){clearTimeout(n),r=!0,s=!1}return t.addEventListener("mousedown",o),t.addEventListener("mouseup",(function(){clearTimeout(n),r&&s&&t.dispatchEvent(new CustomEvent("press")),r=!0,s=!1})),t.addEventListener("mouseleave",c),t.addEventListener("touchstart",o),t.addEventListener("touchcancel",c),{destroy(){t.onmousedown=null,t.onmouseup=null,t.ontouchstart=null}}}function _t(e){let n,s,r,c,i,l,u,a,f,d,p,m,h,$,g,x,v,_;return{c(){n=w("h1"),s=E(),r=w("info"),c=w("div"),i=w("input"),l=w("span"),l.textContent="kcal.",u=E(),a=w("div"),f=w("input"),d=w("span"),d.textContent="seconds",p=E(),m=w("div"),h=w("input"),$=w("span"),$.textContent="reps",g=E(),x=w("button"),x.textContent="OK",q(n,"contenteditable","true"),q(n,"class","svelte-13v6m4t"),void 0===e[1].name&&J((()=>e[4].call(n))),q(i,"type","number"),q(i,"class","svelte-13v6m4t"),q(c,"class","svelte-13v6m4t"),q(f,"type","number"),q(f,"class","svelte-13v6m4t"),q(a,"class","svelte-13v6m4t"),q(h,"type","number"),q(h,"class","svelte-13v6m4t"),q(m,"class","svelte-13v6m4t"),q(r,"class","svelte-13v6m4t"),q(x,"class","svelte-13v6m4t")},m(t,o){y(t,n,o),void 0!==e[1].name&&(n.textContent=e[1].name),y(t,s,o),y(t,r,o),b(r,c),b(c,i),j(i,e[1].calories),b(c,l),b(r,u),b(r,a),b(a,f),j(f,e[0].time),b(a,d),b(r,p),b(r,m),b(m,h),j(h,e[0].reps),b(m,$),y(t,g,o),y(t,x,o),v||(_=[C(n,"input",e[4]),C(i,"input",e[5]),C(f,"input",e[6]),C(h,"input",e[7]),C(x,"click",e[8])],v=!0)},p(t,[e]){2&e&&t[1].name!==n.textContent&&(n.textContent=t[1].name),2&e&&N(i.value)!==t[1].calories&&j(i,t[1].calories),1&e&&N(f.value)!==t[0].time&&j(f,t[0].time),1&e&&N(h.value)!==t[0].reps&&j(h,t[0].reps)},i:t,o:t,d(t){t&&k(n),t&&k(s),t&&k(r),t&&k(g),t&&k(x),v=!1,o(_)}}}function Et(t,e,n){let s,r;a(t,fe,(t=>n(9,s=t))),a(t,de,(t=>n(10,r=t)));let{routineIndex:o=0}=e,{routineExerciseIndex:c=0}=e,i=s[o].exercises[c],l=r.find((function(t){return t.id===i.exerciseId}));return t.$$set=t=>{"routineIndex"in t&&n(2,o=t.routineIndex),"routineExerciseIndex"in t&&n(3,c=t.routineExerciseIndex)},[i,l,o,c,function(){l.name=this.textContent,n(1,l)},function(){l.calories=N(this.value),n(1,l)},function(){i.time=N(this.value),n(0,i)},function(){i.reps=N(this.value),n(0,i)},function(){me.update((function(t){return t.shift(),"Add Exercise"===t[0].title&&t.shift(),t}))}]}class It extends mt{constructor(t){super(),pt(this,t,Et,_t,i,{routineIndex:2,routineExerciseIndex:3})}}function Ct(t,{delay:n=0,duration:s=400,easing:r=e}={}){const o=+getComputedStyle(t).opacity;return{delay:n,duration:s,easing:r,css:t=>"opacity: "+t*o}}function qt(t,e,n){const s=t.slice();return s[6]=e[n],s[8]=n,s}function Nt(e){let n,s;return{c(){n=w("h1"),n.textContent="No exercises.",q(n,"id","notfound"),q(n,"class","svelte-1qz3wnl")},m(t,e){y(t,n,e)},p:t,i(t){s||J((()=>{s=ot(n,Ct,{}),s.start()}))},o:t,d(t){t&&k(n)}}}function St(t){let e,n,s=t[1],r=[];for(let e=0;e<s.length;e+=1)r[e]=Mt(qt(t,s,e));const o=t=>st(r[t],1,1,(()=>{r[t]=null}));return{c(){for(let t=0;t<r.length;t+=1)r[t].c();e=I()},m(t,s){for(let e=0;e<r.length;e+=1)r[e].m(t,s);y(t,e,s),n=!0},p(t,n){if(7&n){let c;for(s=t[1],c=0;c<s.length;c+=1){const o=qt(t,s,c);r[c]?(r[c].p(o,n),nt(r[c],1)):(r[c]=Mt(o),r[c].c(),nt(r[c],1),r[c].m(e.parentNode,e))}for(tt(),c=s.length;c<r.length;c+=1)o(c);et()}},i(t){if(!n){for(let t=0;t<s.length;t+=1)nt(r[t]);n=!0}},o(t){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)st(r[t]);n=!1},d(t){!function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(r,t),t&&k(e)}}}function jt(t){let e,n,s,r,o,c,i=t[6].name+"",l=t[6].calories+"";return{c(){e=w("b"),n=_(i),s=E(),r=w("p"),o=_(l),c=_(" kcal.")},m(t,i){y(t,e,i),b(e,n),y(t,s,i),y(t,r,i),b(r,o),b(r,c)},p(t,e){2&e&&i!==(i=t[6].name+"")&&S(n,i),2&e&&l!==(l=t[6].calories+"")&&S(o,l)},d(t){t&&k(e),t&&k(s),t&&k(r)}}}function Mt(t){let e,n,s,r,c,i;function l(){return t[3](t[6])}function u(){return t[4](t[6],t[8])}return n=new kt({props:{$$slots:{default:[jt]},$$scope:{ctx:t}}}),{c(){e=w("div"),ut(n.$$.fragment),s=E()},m(t,o){y(t,e,o),at(n,e,null),b(e,s),r=!0,c||(i=[p(wt.call(null,e)),C(e,"press",l),C(e,"hold",u)],c=!0)},p(e,s){t=e;const r={};514&s&&(r.$$scope={dirty:s,ctx:t}),n.$set(r)},i(t){r||(nt(n.$$.fragment,t),r=!0)},o(t){st(n.$$.fragment,t),r=!1},d(t){t&&k(e),ft(n),c=!1,o(i)}}}function At(t){let e,n,s,r,o,c,i;const l=[St,Nt],u=[];function a(t,e){return t[1].length?0:1}return n=a(t),s=u[n]=l[n](t),c=new vt({props:{callback:t[5]}}),{c(){e=w("list"),s.c(),r=E(),o=w("div"),ut(c.$$.fragment),q(e,"class","svelte-1qz3wnl"),q(o,"id","button"),q(o,"class","svelte-1qz3wnl")},m(t,s){y(t,e,s),u[n].m(e,null),y(t,r,s),y(t,o,s),at(c,o,null),i=!0},p(t,[r]){let o=n;n=a(t),n===o?u[n].p(t,r):(tt(),st(u[o],1,1,(()=>{u[o]=null})),et(),s=u[n],s?s.p(t,r):(s=u[n]=l[n](t),s.c()),nt(s,1),s.m(e,null));const i={};7&r&&(i.callback=t[5]),c.$set(i)},i(t){i||(nt(s),nt(c.$$.fragment,t),i=!0)},o(t){st(s),st(c.$$.fragment,t),i=!1},d(t){t&&k(e),u[n].d(),t&&k(r),t&&k(o),ft(c)}}}function Ot(t,e,n){let s,r;a(t,de,(t=>n(1,s=t))),a(t,fe,(t=>n(2,r=t)));let{routineIndex:o=0}=e;return t.$$set=t=>{"routineIndex"in t&&n(0,o=t.routineIndex)},[o,s,r,function(t){r[o].exercises.push({id:ye(),exerciseId:t.id,reps:0,time:30}),he(It,{routineIndex:o,routineExerciseIndex:r[o].exercises.length-1},"")},async function(t,e){await ve(`Delete "${t.name}"?`)&&de.update((function(t){return[...t.slice(0,e),...t.slice(e+1)]}))},function(){s.push({id:ye(),name:"New Exercise",calories:.1}),r[o].exercises.push({id:ye(),exerciseId:s[s.length-1].id,reps:0,time:30}),he(It,{routineIndex:o,routineExerciseIndex:r[o].exercises.length-1},"")}]}class Tt extends mt{constructor(t){super(),pt(this,t,Ot,At,i,{routineIndex:0})}}let zt=new AudioContext;function Rt(t="triangle",e=2){let n=zt.createOscillator(),s=zt.createGain();n.connect(s),s.connect(zt.destination),n.type=t,n.start(0),s.gain.exponentialRampToValueAtTime(1e-4,zt.currentTime+e)}function Lt(t){let e,n,s,r,o,c,i,l,u,a,f,d=(t[4]?"Break":t[5].name)+"",p=((t[4]?t[2][t[0]].break:t[5].time)-t[3]).toFixed(1)+"",m=t[5].reps&&Bt(t);return{c(){e=w("div"),s=E(),r=w("roundthing"),o=w("h1"),c=_(d),i=E(),m&&m.c(),l=E(),u=w("h2"),a=_(p),f=_(" sec."),q(e,"id","circle"),q(e,"style",n=`--rotate: ${t[4]?360-t[3]/t[2][t[0]].break*360:t[3]/t[5].time*360}deg`),q(e,"class","svelte-196c4sj"),q(o,"class","svelte-196c4sj"),q(u,"class","svelte-196c4sj"),q(r,"class","svelte-196c4sj")},m(t,n){y(t,e,n),y(t,s,n),y(t,r,n),b(r,o),b(o,c),b(r,i),m&&m.m(r,null),b(r,l),b(r,u),b(u,a),b(u,f)},p(t,s){61&s&&n!==(n=`--rotate: ${t[4]?360-t[3]/t[2][t[0]].break*360:t[3]/t[5].time*360}deg`)&&q(e,"style",n),48&s&&d!==(d=(t[4]?"Break":t[5].name)+"")&&S(c,d),t[5].reps?m?m.p(t,s):(m=Bt(t),m.c(),m.m(r,l)):m&&(m.d(1),m=null),61&s&&p!==(p=((t[4]?t[2][t[0]].break:t[5].time)-t[3]).toFixed(1)+"")&&S(a,p)},d(t){t&&k(e),t&&k(s),t&&k(r),m&&m.d()}}}function Pt(e){let n,s,r;return{c(){n=w("button"),n.textContent="Start",q(n,"class","svelte-196c4sj")},m(t,o){y(t,n,o),s||(r=C(n,"click",e[6]),s=!0)},p:t,d(t){t&&k(n),s=!1,r()}}}function Bt(t){let e,n,s,r=t[5].reps+"";return{c(){e=w("h2"),n=_(r),s=_(" reps"),q(e,"class","svelte-196c4sj")},m(t,r){y(t,e,r),b(e,n),b(e,s)},p(t,e){32&e&&r!==(r=t[5].reps+"")&&S(n,r)},d(t){t&&k(e)}}}function Dt(e){let n;function s(t,e){return-1==t[1]?Pt:Lt}let r=s(e),o=r(e);return{c(){n=w("container"),o.c(),q(n,"class","svelte-196c4sj")},m(t,e){y(t,n,e),o.m(n,null)},p(t,[e]){r===(r=s(t))&&o?o.p(t,e):(o.d(1),o=r(t),o&&(o.c(),o.m(n,null)))},i:t,o:t,d(t){t&&k(n),o.d()}}}const Ft=100;function Gt(t,e,n){let s,r;a(t,pe,(t=>n(2,r=t)));let{i:o=0}=e,c=-1,i=0,l=!1;setInterval((function(){-1!=c&&(n(3,i+=.1),l?i>=r[o].break&&(n(3,i=.1),n(4,l=!1),Rt("triangle",4)):i>=s.time&&(Rt("sine",4),n(3,i=.1),n(4,l=!0),c<r[o].computedExercises.length-1?n(1,c++,c):n(1,c=-1)))}),Ft);return t.$$set=t=>{"i"in t&&n(0,o=t.i)},t.$$.update=()=>{7&t.$$.dirty&&n(5,s=r[o].computedExercises[c])},[o,c,r,i,l,s,function(){n(1,c=0)}]}class Jt extends mt{constructor(t){super(),pt(this,t,Gt,Dt,i,{i:0})}}function Kt(t,e,n){const s=t.slice();return s[10]=e[n].name,s[11]=e[n].reps,s[12]=e[n].time,s[13]=e[n].calories,s[14]=e[n].id,s[16]=n,s}function Vt(t){let e,n,s,r=t[1][t[0]].exercises.length+"";return{c(){e=w("p"),n=_(r),s=_(" exercises"),q(e,"class","svelte-17s8mnq")},m(t,r){y(t,e,r),b(e,n),b(e,s)},p(t,e){3&e&&r!==(r=t[1][t[0]].exercises.length+"")&&S(n,r)},d(t){t&&k(e)}}}function Yt(t){let e,n,s,r,o,c,i,l,u,a=Math.round($e(t[0])/60)+"",f=ge(t[0])+"",d=t[1][t[0]].exercises&&Vt(t);return{c(){e=w("p"),n=_(a),s=_(" minute(s)"),r=E(),o=w("p"),c=_(f),i=_(" kcal."),l=E(),d&&d.c(),u=I(),q(e,"class","svelte-17s8mnq"),q(o,"class","svelte-17s8mnq")},m(t,a){y(t,e,a),b(e,n),b(e,s),y(t,r,a),y(t,o,a),b(o,c),b(o,i),y(t,l,a),d&&d.m(t,a),y(t,u,a)},p(t,e){1&e&&a!==(a=Math.round($e(t[0])/60)+"")&&S(n,a),1&e&&f!==(f=ge(t[0])+"")&&S(c,f),t[1][t[0]].exercises?d?d.p(t,e):(d=Vt(t),d.c(),d.m(u.parentNode,u)):d&&(d.d(1),d=null)},d(t){t&&k(e),t&&k(r),t&&k(o),t&&k(l),d&&d.d(t),t&&k(u)}}}function Ht(e){let n,s;return{c(){n=w("p"),n.textContent="No exercises.",q(n,"id","notfound"),q(n,"class","svelte-17s8mnq")},m(t,e){y(t,n,e)},p:t,i(t){s||J((()=>{s=ot(n,Ct,{}),s.start()}))},o:t,d(t){t&&k(n)}}}function Qt(t){let e,n,s=[],r=new Map,o=t[3][t[0]].computedExercises;const c=t=>t[14];for(let e=0;e<o.length;e+=1){let n=Kt(t,o,e),i=c(n);r.set(i,s[e]=Zt(i,n))}return{c(){for(let t=0;t<s.length;t+=1)s[t].c();e=I()},m(t,r){for(let e=0;e<s.length;e+=1)s[e].m(t,r);y(t,e,r),n=!0},p(t,n){11&n&&(o=t[3][t[0]].computedExercises,tt(),s=lt(s,n,c,1,t,o,r,e.parentNode,it,Zt,e,Kt),et())},i(t){if(!n){for(let t=0;t<o.length;t+=1)nt(s[t]);n=!0}},o(t){for(let t=0;t<s.length;t+=1)st(s[t]);n=!1},d(t){for(let e=0;e<s.length;e+=1)s[e].d(t);t&&k(e)}}}function Ut(t){let e,n,s,r,o,c,i,l=t[12]+"",u=t[12]*t[13]+"";return{c(){e=w("p"),n=_(l),s=_(" seconds"),r=E(),o=w("p"),c=_(u),i=_(" kcal.")},m(t,l){y(t,e,l),b(e,n),b(e,s),y(t,r,l),y(t,o,l),b(o,c),b(o,i)},p(t,e){9&e&&l!==(l=t[12]+"")&&S(n,l),9&e&&u!==(u=t[12]*t[13]+"")&&S(c,u)},d(t){t&&k(e),t&&k(r),t&&k(o)}}}function Wt(t){let e,n,s,r,o,c,i,l=t[11]+"",u=t[11]*t[13]+"";return{c(){e=w("p"),n=_(l),s=_(" reps"),r=E(),o=w("p"),c=_(u),i=_(" kcal.")},m(t,l){y(t,e,l),b(e,n),b(e,s),y(t,r,l),y(t,o,l),b(o,c),b(o,i)},p(t,e){9&e&&l!==(l=t[11]+"")&&S(n,l),9&e&&u!==(u=t[11]*t[13]+"")&&S(c,u)},d(t){t&&k(e),t&&k(r),t&&k(o)}}}function Xt(t){let e,n,s,r,o=t[10]+"";function c(t,e){return t[11]?Wt:Ut}let i=c(t),l=i(t);return{c(){e=w("b"),n=_(o),s=E(),l.c(),r=I()},m(t,o){y(t,e,o),b(e,n),y(t,s,o),l.m(t,o),y(t,r,o)},p(t,e){9&e&&o!==(o=t[10]+"")&&S(n,o),i===(i=c(t))&&l?l.p(t,e):(l.d(1),l=i(t),l&&(l.c(),l.m(r.parentNode,r)))},d(t){t&&k(e),t&&k(s),l.d(t),t&&k(r)}}}function Zt(t,e){let n,s,r,c,i,l;function u(){return e[6](e[16])}function a(){return e[7](e[10],e[16])}return s=new kt({props:{$$slots:{default:[Xt]},$$scope:{ctx:e}}}),{key:t,first:null,c(){n=w("div"),ut(s.$$.fragment),r=E(),q(n,"class","svelte-17s8mnq"),this.first=n},m(t,e){y(t,n,e),at(s,n,null),b(n,r),c=!0,i||(l=[p(wt.call(null,n)),C(n,"hold",u),C(n,"press",a)],i=!0)},p(t,n){e=t;const r={};131081&n&&(r.$$scope={dirty:n,ctx:e}),s.$set(r)},i(t){c||(nt(s.$$.fragment,t),c=!0)},o(t){st(s.$$.fragment,t),c=!1},d(t){t&&k(n),ft(s),i=!1,o(l)}}}function te(t){let e,n,s,r,c,l,u,a,f,d,p,m,h,$,g,x,v,_,I,S,M=(t[1][t[0]],t[2]),A=Yt(t);const O=[Qt,Ht],T=[];function z(t,e){return t[1][t[0]].exercises&&t[1][t[0]].exercises.length?0:1}return p=z(t),m=T[p]=O[p](t),v=new vt({props:{callback:t[9]}}),{c(){e=w("h1"),n=E(),s=w("info"),A.c(),r=E(),c=w("div"),l=w("input"),u=E(),a=w("span"),a.textContent="second breaks",f=E(),d=w("list"),m.c(),h=E(),$=w("button"),$.textContent="Go!",g=E(),x=w("div"),ut(v.$$.fragment),q(e,"contenteditable","true"),q(e,"class","svelte-17s8mnq"),void 0===t[1][t[0]].name&&J((()=>t[4].call(e))),q(l,"type","number"),q(l,"class","svelte-17s8mnq"),q(c,"class","svelte-17s8mnq"),q(s,"class","svelte-17s8mnq"),q(d,"class","svelte-17s8mnq"),q($,"id","go"),q($,"class","svelte-17s8mnq"),q(x,"id","button"),q(x,"class","svelte-17s8mnq")},m(o,i){y(o,e,i),void 0!==t[1][t[0]].name&&(e.textContent=t[1][t[0]].name),y(o,n,i),y(o,s,i),A.m(s,null),b(s,r),b(s,c),b(c,l),j(l,t[1][t[0]].break),b(c,u),b(c,a),y(o,f,i),y(o,d,i),T[p].m(d,null),y(o,h,i),y(o,$,i),y(o,g,i),y(o,x,i),at(v,x,null),_=!0,I||(S=[C(e,"input",t[4]),C(l,"input",t[5]),C($,"click",t[8])],I=!0)},p(t,[n]){3&n&&t[1][t[0]].name!==e.textContent&&(e.textContent=t[1][t[0]].name),7&n&&i(M,(t[1][t[0]],M=t[2]))?(A.d(1),A=Yt(t),A.c(),A.m(s,r)):A.p(t,n),3&n&&N(l.value)!==t[1][t[0]].break&&j(l,t[1][t[0]].break);let o=p;p=z(t),p===o?T[p].p(t,n):(tt(),st(T[o],1,1,(()=>{T[o]=null})),et(),m=T[p],m?m.p(t,n):(m=T[p]=O[p](t),m.c()),nt(m,1),m.m(d,null));const c={};1&n&&(c.callback=t[9]),v.$set(c)},i(t){_||(nt(m),nt(v.$$.fragment,t),_=!0)},o(t){st(m),st(v.$$.fragment,t),_=!1},d(t){t&&k(e),t&&k(n),t&&k(s),A.d(t),t&&k(f),t&&k(d),T[p].d(),t&&k(h),t&&k($),t&&k(g),t&&k(x),ft(v),I=!1,o(S)}}}function ee(t,e,n){let s,r,o;a(t,fe,(t=>n(1,s=t))),a(t,de,(t=>n(2,r=t))),a(t,pe,(t=>n(3,o=t)));let{i:c=0}=e;return t.$$set=t=>{"i"in t&&n(0,c=t.i)},[c,s,r,o,function(){s[c].name=this.textContent,fe.set(s),n(0,c)},function(){s[c].break=N(this.value),fe.set(s),n(0,c)},function(t){!function(t,e,n=e){t.set(n)}(fe,s[c].exercises=[...s[c].exercises.slice(0,t),...s[c].exercises.slice(t+1)],s),fe.update((function(t){return t}))},function(t,e){void 0!==t&&he(It,{routineIndex:c,routineExerciseIndex:e})},function(){o[c].computedExercises.length&&he(Jt,{i:c},"")},function(){he(Tt,{routineIndex:c},"Add Exercise")}]}class ne extends mt{constructor(t){super(),pt(this,t,ee,te,i,{i:0})}}function se(t,e,n){const s=t.slice();return s[4]=e[n],s[6]=n,s}function re(t){let e,n,s,r,o,c,i,l,u,a,f=t[4].name+"",d=Math.round($e(t[6])/60)+"",p=ge(t[6])+"";return{c(){e=w("b"),n=_(f),s=E(),r=w("p"),o=_(d),c=_(" min."),i=E(),l=w("p"),u=_(p),a=_(" kcal.")},m(t,f){y(t,e,f),b(e,n),y(t,s,f),y(t,r,f),b(r,o),b(r,c),y(t,i,f),y(t,l,f),b(l,u),b(l,a)},p(t,e){1&e&&f!==(f=t[4].name+"")&&S(n,f),1&e&&d!==(d=Math.round($e(t[6])/60)+"")&&S(o,d),1&e&&p!==(p=ge(t[6])+"")&&S(u,p)},d(t){t&&k(e),t&&k(s),t&&k(r),t&&k(i),t&&k(l)}}}function oe(t,e){let n,s,r,c,i;function l(){return e[1](e[6])}function u(){return e[2](e[4],e[6])}return s=new kt({props:{$$slots:{default:[re]},$$scope:{ctx:e}}}),{key:t,first:null,c(){n=w("div"),ut(s.$$.fragment),q(n,"class","svelte-ha7zre"),this.first=n},m(t,e){y(t,n,e),at(s,n,null),r=!0,c||(i=[p(wt.call(null,n)),C(n,"press",l),C(n,"hold",u)],c=!0)},p(t,n){e=t;const r={};129&n&&(r.$$scope={dirty:n,ctx:e}),s.$set(r)},i(t){r||(nt(s.$$.fragment,t),r=!0)},o(t){st(s.$$.fragment,t),r=!1},d(t){t&&k(n),ft(s),c=!1,o(i)}}}function ce(t){let e;return{c(){e=w("p"),e.textContent="No routines",q(e,"id","notfound"),q(e,"class","svelte-ha7zre")},m(t,n){y(t,e,n)},d(t){t&&k(e)}}}function ie(t){let e,n,s,r,o,c,i=[],l=new Map,u=t[0];const a=t=>t[4].id;for(let e=0;e<u.length;e+=1){let n=se(t,u,e),s=a(n);l.set(s,i[e]=oe(s,n))}let f=0==t[0].length&&ce();return o=new vt({props:{callback:t[3]}}),{c(){e=w("div");for(let t=0;t<i.length;t+=1)i[t].c();n=E(),f&&f.c(),s=E(),r=w("div"),ut(o.$$.fragment),q(e,"id","list"),q(e,"class","svelte-ha7zre"),q(r,"id","button"),q(r,"class","svelte-ha7zre")},m(t,l){y(t,e,l);for(let t=0;t<i.length;t+=1)i[t].m(e,null);b(e,n),f&&f.m(e,null),y(t,s,l),y(t,r,l),at(o,r,null),c=!0},p(t,[s]){1&s&&(u=t[0],tt(),i=lt(i,s,a,1,t,u,l,e,it,oe,n,se),et()),0==t[0].length?f||(f=ce(),f.c(),f.m(e,null)):f&&(f.d(1),f=null);const r={};1&s&&(r.callback=t[3]),o.$set(r)},i(t){if(!c){for(let t=0;t<u.length;t+=1)nt(i[t]);nt(o.$$.fragment,t),c=!0}},o(t){for(let t=0;t<i.length;t+=1)st(i[t]);st(o.$$.fragment,t),c=!1},d(t){t&&k(e);for(let t=0;t<i.length;t+=1)i[t].d();f&&f.d(),t&&k(s),t&&k(r),ft(o)}}}function le(t,e,n){let s;a(t,fe,(t=>n(0,s=t)));return[s,function(t){he(ne,{i:t},"")},async function(t,e){await ve(`Delete "${t.name}"?`)&&fe.update((function(t){return[...t.slice(0,e),...t.slice(e+1)]}))},function(){s.push({id:ye(),name:"New Routine",break:10,exercises:[]}),he(ne,{i:s.length-1},"")}]}class ue extends mt{constructor(t){super(),pt(this,t,le,ie,i,{})}}function ae(t,e){let n=JSON.parse(localStorage.getItem(t)),s=$t(null===n?e:n);return window.addEventListener("beforeunload",(function(){localStorage.setItem(t,JSON.stringify(u(s)))})),s}const fe=ae("routines",[{id:0,name:"Example Routine",break:10,exercises:[{id:1,exerciseId:5,reps:10,time:60},{id:2,exerciseId:5,reps:20,time:120},{id:3,exerciseId:5,reps:25,time:120},{id:4,exerciseId:5,reps:30,time:120}]}]),de=ae("exerciseTable",[{id:5,name:"Example Exercise",calories:2}]),pe=function(e,n,s){const r=!Array.isArray(e),i=r?[e]:e,u=n.length<2;return{subscribe:$t(s,(e=>{let s=!1;const a=[];let f=0,d=t;const p=()=>{if(f)return;d();const s=n(r?a[0]:a,e);u?e(s):d=c(s)?s:t},m=i.map(((t,e)=>l(t,(t=>{a[e]=t,f&=~(1<<e),s&&p()}),(()=>{f|=1<<e}))));return s=!0,p(),function(){o(m),d()}})).subscribe}}([fe,de],(function([t,e],n){let s=[];for(let n of t){let t=n.exercises.map((function(t){return{...e.find((function(e){return t.exerciseId===e.id})),...t}}));s.push({...n,computedExercises:t})}n(s)})),me=$t([{page:ue,props:{},title:"Routines"}]),he=function(t=ue,e={},n="Routines"){me.update((function(s){return[{page:t,props:e,title:n},...s]}))},$e=function(t){try{let e=u(fe)[t],n=0;for(let{time:t}of e.exercises)n+=t||0;return n+=e.break*(e.exercises.length-1),n}catch{return 0}},ge=function(t){try{let e=u(fe)[t],n=u(de),s=0;for(let{exerciseId:t,reps:r,time:o}of e.exercises){let e=n.find((function(e){return e.id===t}));void 0!==e&&(s+=e.calories*(r||o))}return s}catch{return 0}};let xe=$t({text:"",callback:function(){}});const ve=async function(t){return u(xe).text?new Promise((function(t){t(!1)})):new Promise((function(e){xe.set({text:t,callback:function(t){xe.set({text:"",callback:function(){}}),e(t)}})}))};let be=Number(localStorage.getItem("id"))||99;const ye=function(){return localStorage.setItem("id",`${be+1}`),be++};function ke(e){let n,s,r,o,c,i,l,u,a,f,d,p,m=e[0][0].title+"";return{c(){n=w("div"),s=w("button"),r=_("<"),c=E(),i=w("p"),l=_(m),a=E(),f=w("div"),q(s,"style",o=1==e[0].length?"display: none;":""),q(s,"class","svelte-5w25g5"),q(i,"class","svelte-5w25g5"),q(n,"id","bar"),q(n,"style",u=e[0][0].title?"":"border: none;"),q(n,"class","svelte-5w25g5"),q(f,"id","space"),q(f,"class","svelte-5w25g5")},m(t,o){y(t,n,o),b(n,s),b(s,r),b(n,c),b(n,i),b(i,l),y(t,a,o),y(t,f,o),d||(p=C(s,"click",e[1]),d=!0)},p(t,[e]){1&e&&o!==(o=1==t[0].length?"display: none;":"")&&q(s,"style",o),1&e&&m!==(m=t[0][0].title+"")&&S(l,m),1&e&&u!==(u=t[0][0].title?"":"border: none;")&&q(n,"style",u)},i:t,o:t,d(t){t&&k(n),t&&k(a),t&&k(f),d=!1,p()}}}function we(t,e,n){let s;a(t,me,(t=>n(0,s=t)));return[s,function(){!function(t=1){if(u(me).length<=1)return!0;me.update((function(e){return e.slice(Math.min(t,e.length-1))}))}(1)}]}window.log=function(){console.log(u(fe),u(de),u(me),u(xe))},window.wipe=function(){fe.set(null),de.set(null),localStorage.removeItem("routines"),localStorage.removeItem("exerciseTable"),window.location.reload()},window.ask=ve;class _e extends mt{constructor(t){super(),pt(this,t,we,ke,i,{})}}function Ee(t){let e,n,s,r,c,i,l,u,a,f,d,p,m,h=t[0].text+"";return{c(){e=w("darken"),n=w("box"),s=w("h1"),r=_(h),c=E(),i=w("buttoncontainer"),l=w("button"),l.textContent="Yes",u=E(),a=w("button"),a.textContent="No",q(s,"class","svelte-f4ee0"),q(l,"id","yes"),q(l,"class","svelte-f4ee0"),q(a,"id","no"),q(a,"class","svelte-f4ee0"),q(i,"class","svelte-f4ee0"),q(n,"class","svelte-f4ee0"),q(e,"class","svelte-f4ee0")},m(o,f){y(o,e,f),b(e,n),b(n,s),b(s,r),b(n,c),b(n,i),b(i,l),b(i,u),b(i,a),d=!0,p||(m=[C(l,"click",t[1]),C(a,"click",t[2])],p=!0)},p(t,e){(!d||1&e)&&h!==(h=t[0].text+"")&&S(r,h)},i(t){d||(J((()=>{f||(f=ct(e,Ct,{duration:100},!0)),f.run(1)})),d=!0)},o(t){f||(f=ct(e,Ct,{duration:100},!1)),f.run(0),d=!1},d(t){t&&k(e),t&&f&&f.end(),p=!1,o(m)}}}function Ie(t){let e,n,s=t[0].text&&Ee(t);return{c(){s&&s.c(),e=I()},m(t,r){s&&s.m(t,r),y(t,e,r),n=!0},p(t,[n]){t[0].text?s?(s.p(t,n),1&n&&nt(s,1)):(s=Ee(t),s.c(),nt(s,1),s.m(e.parentNode,e)):s&&(tt(),st(s,1,1,(()=>{s=null})),et())},i(t){n||(nt(s),n=!0)},o(t){st(s),n=!1},d(t){s&&s.d(t),t&&k(e)}}}function Ce(t,e,n){let s;a(t,xe,(t=>n(0,s=t)));return[s,function(){s.callback(!0)},function(){s.callback(!1)}]}class qe extends mt{constructor(t){super(),pt(this,t,Ce,Ie,i,{})}}function Ne(t){let e,s,r,o;const c=[t[0][0].props];var i=t[0][0].page;function l(t){let e={};for(let t=0;t<c.length;t+=1)e=n(e,c[t]);return{props:e}}return i&&(s=new i(l())),{c(){e=w("div"),s&&ut(s.$$.fragment),q(e,"class","svelte-19uewan")},m(t,n){y(t,e,n),s&&at(s,e,null),o=!0},p(t,n){const r=1&n?function(t,e){const n={},s={},r={$$scope:1};let o=t.length;for(;o--;){const c=t[o],i=e[o];if(i){for(const t in c)t in i||(s[t]=1);for(const t in i)r[t]||(n[t]=i[t],r[t]=1);t[o]=i}else for(const t in c)r[t]=1}for(const t in s)t in n||(n[t]=void 0);return n}(c,[(o=t[0][0].props,"object"==typeof o&&null!==o?o:{})]):{};var o;if(i!==(i=t[0][0].page)){if(s){tt();const t=s;st(t.$$.fragment,1,0,(()=>{ft(t,1)})),et()}i?(s=new i(l()),ut(s.$$.fragment),nt(s.$$.fragment,1),at(s,e,null)):s=null}else i&&s.$set(r)},i(t){o||(s&&nt(s.$$.fragment,t),r||J((()=>{r=ot(e,Ct,{duration:100,delay:50}),r.start()})),o=!0)},o(t){s&&st(s.$$.fragment,t),o=!1},d(t){t&&k(e),s&&ft(s)}}}function Se(e){let n,s,r,o,c,l=e[0][0];n=new _e({});let u=Ne(e);return o=new qe({}),{c(){ut(n.$$.fragment),s=E(),u.c(),r=E(),ut(o.$$.fragment)},m(t,e){at(n,t,e),y(t,s,e),u.m(t,e),y(t,r,e),at(o,t,e),c=!0},p(e,[n]){1&n&&i(l,l=e[0][0])?(tt(),st(u,1,1,t),et(),u=Ne(e),u.c(),nt(u),u.m(r.parentNode,r)):u.p(e,n)},i(t){c||(nt(n.$$.fragment,t),nt(u),nt(o.$$.fragment,t),c=!0)},o(t){st(n.$$.fragment,t),st(u),st(o.$$.fragment,t),c=!1},d(t){ft(n,t),t&&k(s),u.d(t),t&&k(r),ft(o,t)}}}function je(t,e,n){let s;return a(t,me,(t=>n(0,s=t))),[s]}return new class extends mt{constructor(t){super(),pt(this,t,je,Se,i,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
