var app=function(){"use strict";function e(){}const t=e=>e;function n(e,t){for(const n in t)e[n]=t[n];return e}function o(e){return e()}function s(){return Object.create(null)}function r(e){e.forEach(o)}function c(e){return"function"==typeof e}function i(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function l(t,...n){if(null==t)return e;const o=t.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}function u(e){let t;return l(e,(e=>t=e))(),t}function a(e,t,n){e.$$.on_destroy.push(l(t,n))}function d(e,t,o,s){return e[1]&&s?n(o.ctx.slice(),e[1](s(t))):o.ctx}function f(e,t,n,o,s,r,c){const i=function(e,t,n,o){if(e[2]&&o){const s=e[2](o(n));if(void 0===t.dirty)return s;if("object"==typeof s){const e=[],n=Math.max(t.dirty.length,s.length);for(let o=0;o<n;o+=1)e[o]=t.dirty[o]|s[o];return e}return t.dirty|s}return t.dirty}(t,o,s,r);if(i){const s=d(t,n,o,c);e.p(s,i)}}function p(e,t,n=t){return e.set(n),t}function m(t){return t&&c(t.destroy)?t.destroy:e}const h="undefined"!=typeof window;let g=h?()=>window.performance.now():()=>Date.now(),$=h?e=>requestAnimationFrame(e):e;const v=new Set;function x(e){v.forEach((t=>{t.c(e)||(v.delete(t),t.f())})),0!==v.size&&$(x)}function b(e){let t;return 0===v.size&&$(x),{promise:new Promise((n=>{v.add(t={c:e,f:n})})),abort(){v.delete(t)}}}function k(e,t){e.appendChild(t)}function y(e,t,n){e.insertBefore(t,n||null)}function w(e){e.parentNode.removeChild(e)}function E(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function _(e){return document.createElement(e)}function C(e){return document.createTextNode(e)}function I(){return C(" ")}function M(){return C("")}function N(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function S(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function A(e){return""===e?null:+e}function R(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function L(e,t){e.value=null==t?"":t}const T=new Set;let O,P=0;function j(e,t,n,o,s,r,c,i=0){const l=16.666/o;let u="{\n";for(let e=0;e<=1;e+=l){const o=t+(n-t)*r(e);u+=100*e+`%{${c(o,1-o)}}\n`}const a=u+`100% {${c(n,1-n)}}\n}`,d=`__svelte_${function(e){let t=5381,n=e.length;for(;n--;)t=(t<<5)-t^e.charCodeAt(n);return t>>>0}(a)}_${i}`,f=e.ownerDocument;T.add(f);const p=f.__svelte_stylesheet||(f.__svelte_stylesheet=f.head.appendChild(_("style")).sheet),m=f.__svelte_rules||(f.__svelte_rules={});m[d]||(m[d]=!0,p.insertRule(`@keyframes ${d} ${a}`,p.cssRules.length));const h=e.style.animation||"";return e.style.animation=`${h?`${h}, `:""}${d} ${o}ms linear ${s}ms 1 both`,P+=1,d}function D(e,t){const n=(e.style.animation||"").split(", "),o=n.filter(t?e=>e.indexOf(t)<0:e=>-1===e.indexOf("__svelte")),s=n.length-o.length;s&&(e.style.animation=o.join(", "),P-=s,P||$((()=>{P||(T.forEach((e=>{const t=e.__svelte_stylesheet;let n=t.cssRules.length;for(;n--;)t.deleteRule(n);e.__svelte_rules={}})),T.clear())})))}function B(e){O=e}function F(e){(function(){if(!O)throw new Error("Function called outside component initialization");return O})().$$.on_destroy.push(e)}const q=[],z=[],G=[],J=[],K=Promise.resolve();let U=!1;function V(e){G.push(e)}let W=!1;const Y=new Set;function H(){if(!W){W=!0;do{for(let e=0;e<q.length;e+=1){const t=q[e];B(t),Q(t.$$)}for(B(null),q.length=0;z.length;)z.pop()();for(let e=0;e<G.length;e+=1){const t=G[e];Y.has(t)||(Y.add(t),t())}G.length=0}while(q.length);for(;J.length;)J.pop()();U=!1,W=!1,Y.clear()}}function Q(e){if(null!==e.fragment){e.update(),r(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(V)}}let X;function Z(){return X||(X=Promise.resolve(),X.then((()=>{X=null}))),X}function ee(e,t,n){e.dispatchEvent(function(e,t){const n=document.createEvent("CustomEvent");return n.initCustomEvent(e,!1,!1,t),n}(`${t?"intro":"outro"}${n}`))}const te=new Set;let ne;function oe(){ne={r:0,c:[],p:ne}}function se(){ne.r||r(ne.c),ne=ne.p}function re(e,t){e&&e.i&&(te.delete(e),e.i(t))}function ce(e,t,n,o){if(e&&e.o){if(te.has(e))return;te.add(e),ne.c.push((()=>{te.delete(e),o&&(n&&e.d(1),o())})),e.o(t)}}const ie={duration:0};function le(n,o,s){let r,i,l=o(n,s),u=!1,a=0;function d(){r&&D(n,r)}function f(){const{delay:o=0,duration:s=300,easing:c=t,tick:f=e,css:p}=l||ie;p&&(r=j(n,0,1,s,o,c,p,a++)),f(0,1);const m=g()+o,h=m+s;i&&i.abort(),u=!0,V((()=>ee(n,!0,"start"))),i=b((e=>{if(u){if(e>=h)return f(1,0),ee(n,!0,"end"),d(),u=!1;if(e>=m){const t=c((e-m)/s);f(t,1-t)}}return u}))}let p=!1;return{start(){p||(D(n),c(l)?(l=l(),Z().then(f)):f())},invalidate(){p=!1},end(){u&&(d(),u=!1)}}}function ue(n,o,s,i){let l=o(n,s),u=i?0:1,a=null,d=null,f=null;function p(){f&&D(n,f)}function m(e,t){const n=e.b-u;return t*=Math.abs(n),{a:u,b:e.b,d:n,duration:t,start:e.start,end:e.start+t,group:e.group}}function h(o){const{delay:s=0,duration:c=300,easing:i=t,tick:h=e,css:$}=l||ie,v={start:g()+s,b:o};o||(v.group=ne,ne.r+=1),a||d?d=v:($&&(p(),f=j(n,u,o,c,s,i,$)),o&&h(0,1),a=m(v,c),V((()=>ee(n,o,"start"))),b((e=>{if(d&&e>d.start&&(a=m(d,c),d=null,ee(n,a.b,"start"),$&&(p(),f=j(n,u,a.b,a.duration,0,i,l.css))),a)if(e>=a.end)h(u=a.b,1-u),ee(n,a.b,"end"),d||(a.b?p():--a.group.r||r(a.group.c)),a=null;else if(e>=a.start){const t=e-a.start;u=a.a+a.d*i(t/a.duration),h(u,1-u)}return!(!a&&!d)})))}return{run(e){c(l)?Z().then((()=>{l=l(),h(e)})):h(e)},end(){p(),a=d=null}}}function ae(e,t){ce(e,1,1,(()=>{t.delete(e.key)}))}function de(e,t,n,o,s,r,c,i,l,u,a,d){let f=e.length,p=r.length,m=f;const h={};for(;m--;)h[e[m].key]=m;const g=[],$=new Map,v=new Map;for(m=p;m--;){const e=d(s,r,m),i=n(e);let l=c.get(i);l?o&&l.p(e,t):(l=u(i,e),l.c()),$.set(i,g[m]=l),i in h&&v.set(i,Math.abs(m-h[i]))}const x=new Set,b=new Set;function k(e){re(e,1),e.m(i,a),c.set(e.key,e),a=e.first,p--}for(;f&&p;){const t=g[p-1],n=e[f-1],o=t.key,s=n.key;t===n?(a=t.first,f--,p--):$.has(s)?!c.has(o)||x.has(o)?k(t):b.has(s)?f--:v.get(o)>v.get(s)?(b.add(o),k(t)):(x.add(s),f--):(l(n,c),f--)}for(;f--;){const t=e[f];$.has(t.key)||l(t,c)}for(;p;)k(g[p-1]);return g}function fe(e){e&&e.c()}function pe(e,t,n,s){const{fragment:i,on_mount:l,on_destroy:u,after_update:a}=e.$$;i&&i.m(t,n),s||V((()=>{const t=l.map(o).filter(c);u?u.push(...t):r(t),e.$$.on_mount=[]})),a.forEach(V)}function me(e,t){const n=e.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function he(e,t){-1===e.$$.dirty[0]&&(q.push(e),U||(U=!0,K.then(H)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function ge(t,n,o,c,i,l,u=[-1]){const a=O;B(t);const d=t.$$={fragment:null,ctx:null,props:l,update:e,not_equal:i,bound:s(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(a?a.$$.context:n.context||[]),callbacks:s(),dirty:u,skip_bound:!1};let f=!1;if(d.ctx=o?o(t,n.props||{},((e,n,...o)=>{const s=o.length?o[0]:n;return d.ctx&&i(d.ctx[e],d.ctx[e]=s)&&(!d.skip_bound&&d.bound[e]&&d.bound[e](s),f&&he(t,e)),n})):[],d.update(),f=!0,r(d.before_update),d.fragment=!!c&&c(d.ctx),n.target){if(n.hydrate){const e=function(e){return Array.from(e.childNodes)}(n.target);d.fragment&&d.fragment.l(e),e.forEach(w)}else d.fragment&&d.fragment.c();n.intro&&re(t.$$.fragment),pe(t,n.target,n.anchor,n.customElement),H()}B(a)}class $e{$destroy(){me(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const ve=[];function xe(t,n=e){let o;const s=[];function r(e){if(i(t,e)&&(t=e,o)){const e=!ve.length;for(let e=0;e<s.length;e+=1){const n=s[e];n[1](),ve.push(n,t)}if(e){for(let e=0;e<ve.length;e+=2)ve[e][0](ve[e+1]);ve.length=0}}}return{set:r,update:function(e){r(e(t))},subscribe:function(c,i=e){const l=[c,i];return s.push(l),1===s.length&&(o=n(r)||e),c(t),()=>{const e=s.indexOf(l);-1!==e&&s.splice(e,1),0===s.length&&(o(),o=null)}}}}function be(e,t){let n=JSON.parse(localStorage.getItem(e)),o=xe(null===n?t:n);return o.save=function(){localStorage.setItem(e,JSON.stringify(u(o)))},window.addEventListener("beforeunload",o.save),o}const ke=be("routines",[{id:0,name:"Example Routine",break:10,exercises:[{id:1,exerciseId:5,reps:10,time:60},{id:2,exerciseId:5,reps:20,time:120},{id:3,exerciseId:5,reps:25,time:120},{id:4,exerciseId:5,reps:30,time:120}]}]),ye=be("exerciseTable",[{id:5,name:"Example Exercise",calories:2}]),we=function(t,n,o){const s=!Array.isArray(t),i=s?[t]:t,u=n.length<2;return{subscribe:xe(o,(t=>{let o=!1;const a=[];let d=0,f=e;const p=()=>{if(d)return;f();const o=n(s?a[0]:a,t);u?t(o):f=c(o)?o:e},m=i.map(((e,t)=>l(e,(e=>{a[t]=e,d&=~(1<<t),o&&p()}),(()=>{d|=1<<t}))));return o=!0,p(),function(){r(m),f()}})).subscribe}}([ke,ye],(function([e,t],n){let o=[];for(let n of e){let e=n.exercises.map((function(e){return{...t.find((function(t){return e.exerciseId===t.id})),...e}}));o.push({...n,computedExercises:e})}n(o)})),Ee=function(e){let t;try{t=u(ke)[e]}catch{return 0}if(0==t.exercises.length)return 0;let n=0;for(let{time:e}of t.exercises)n+=e||0;return n+=t.break*(t.exercises.length-1),Math.round(n)},_e=function(e){try{let t=u(ke)[e],n=u(ye),o=0;for(let{exerciseId:e,reps:s,time:r}of t.exercises){let t=n.find((function(t){return t.id===e}));void 0!==t&&(o+=t.calories*(s||r))}return 10*Math.round(o/10)}catch{return 0}};let Ce=Number(localStorage.getItem("id"))||99;const Ie=function(){return localStorage.setItem("id",`${Ce+1}`),Ce++};window.log=function(){console.log(u(ke),u(ye),u(hist),u(dialogue))},window.wipe=function(){ke.set(null),ye.set(null),localStorage.removeItem("routines"),localStorage.removeItem("exerciseTable"),window.location.reload()};let Me=xe({text:"",callback:function(){}});const Ne=async function(e){return u(Me).text?new Promise((function(e){e(!1)})):new Promise((function(t){Me.set({text:e,callback:function(e){Me.set({text:"",callback:function(){}}),t(e)}})}))};function Se(t){let n,o,s,r;return{c(){n=_("button"),o=C(t[1]),S(n,"class","svelte-19o5qlr")},m(e,i){y(e,n,i),k(n,o),s||(r=N(n,"click",(function(){c(t[0])&&t[0].apply(this,arguments)})),s=!0)},p(e,[n]){t=e,2&n&&R(o,t[1])},i:e,o:e,d(e){e&&w(n),s=!1,r()}}}function Ae(e,t,n){let{callback:o=function(){}}=t,{text:s="+"}=t;return e.$$set=e=>{"callback"in e&&n(0,o=e.callback),"text"in e&&n(1,s=e.text)},[o,s]}class Re extends $e{constructor(e){super(),ge(this,e,Ae,Se,i,{callback:0,text:1})}}function Le(e){let t,n,o,s,r;const i=e[3].default,l=function(e,t,n,o){if(e){const s=d(e,t,n,o);return e[0](s)}}(i,e,e[2],null);return{c(){t=_("button"),l&&l.c(),S(t,"class","svelte-1jyxh9d")},m(n,i){y(n,t,i),l&&l.m(t,null),o=!0,s||(r=N(t,"click",(function(){c(e[0])&&e[0].apply(this,arguments)})),s=!0)},p(t,[n]){e=t,l&&l.p&&4&n&&f(l,i,e,e[2],n,null,null)},i(s){o||(re(l,s),s&&V((()=>{n||(n=ue(t,e[1],{},!0)),n.run(1)})),o=!0)},o(s){ce(l,s),s&&(n||(n=ue(t,e[1],{},!1)),n.run(0)),o=!1},d(e){e&&w(t),l&&l.d(e),e&&n&&n.end(),s=!1,r()}}}function Te(e,t,n){let{$$slots:o={},$$scope:s}=t,{callback:r=function(){}}=t,{trans:c=function(e,{duration:t=200,delay:n=0}){let o=+getComputedStyle(e).opacity,s=+getComputedStyle(e).height.slice(0,-2);return{duration:t,delay:n,css:e=>`\n\t\t\t\t\topacity: ${o*e};\n\t\t\t\t\theight: ${s*e}px;\n\t\t\t\t`}}}=t;return e.$$set=e=>{"callback"in e&&n(0,r=e.callback),"trans"in e&&n(1,c=e.trans),"$$scope"in e&&n(2,s=e.$$scope)},[r,c,s,o]}class Oe extends $e{constructor(e){super(),ge(this,e,Te,Le,i,{callback:0,trans:1})}}function Pe(e,t=750){let n,o=!1,s=!0;function r(){o=!0,s=!0,n=setTimeout((function(){o=!1,s=!1,e.dispatchEvent(new CustomEvent("hold"))}),t)}function c(){clearTimeout(n),s=!0,o=!1}return e.addEventListener("mousedown",r),e.addEventListener("click",(function(){clearTimeout(n),s&&o&&e.dispatchEvent(new CustomEvent("press")),s=!0,o=!1})),e.addEventListener("touchstart",r),e.addEventListener("touchmove",c),e.addEventListener("touchcancel",c),{destroy(){e.onmousedown=null,e.onmouseup=null,e.ontouchstart=null,e.ontouchmove=null,e.ontouchcancel=null}}}function je(t){let n,o,s,c,i,l,u,a,d,f,p,m,h,g,$,v,x,b;return{c(){n=_("h1"),o=I(),s=_("info"),c=_("div"),i=_("input"),l=_("span"),l.textContent="kcal.",u=I(),a=_("div"),d=_("input"),f=_("span"),f.textContent="seconds",p=I(),m=_("div"),h=_("input"),g=_("span"),g.textContent="reps",$=I(),v=_("button"),v.textContent="OK",S(n,"contenteditable","true"),S(n,"class","svelte-kgr7km"),void 0===t[1].name&&V((()=>t[4].call(n))),S(i,"type","number"),S(i,"class","svelte-kgr7km"),S(c,"class","svelte-kgr7km"),S(d,"type","number"),S(d,"class","svelte-kgr7km"),S(a,"class","svelte-kgr7km"),S(h,"type","number"),S(h,"class","svelte-kgr7km"),S(m,"class","svelte-kgr7km"),S(s,"class","svelte-kgr7km"),S(v,"class","svelte-kgr7km")},m(e,r){y(e,n,r),void 0!==t[1].name&&(n.textContent=t[1].name),y(e,o,r),y(e,s,r),k(s,c),k(c,i),L(i,t[1].calories),k(c,l),k(s,u),k(s,a),k(a,d),L(d,t[0].time),k(a,f),k(s,p),k(s,m),k(m,h),L(h,t[0].reps),k(m,g),y(e,$,r),y(e,v,r),x||(b=[N(n,"input",t[4]),N(i,"input",t[5]),N(d,"input",t[6]),N(h,"input",t[7]),N(v,"click",t[8])],x=!0)},p(e,[t]){2&t&&e[1].name!==n.textContent&&(n.textContent=e[1].name),2&t&&A(i.value)!==e[1].calories&&L(i,e[1].calories),1&t&&A(d.value)!==e[0].time&&L(d,e[0].time),1&t&&A(h.value)!==e[0].reps&&L(h,e[0].reps)},i:e,o:e,d(e){e&&w(n),e&&w(o),e&&w(s),e&&w($),e&&w(v),x=!1,r(b)}}}function De(e,t,n){let o,s;a(e,ke,(e=>n(9,o=e))),a(e,ye,(e=>n(10,s=e)));let{routineIndex:r=0}=t,{routineExerciseIndex:c=0}=t,i=o[r].exercises[c],l=s.find((function(e){return e.id===i.exerciseId}));return e.$$set=e=>{"routineIndex"in e&&n(2,r=e.routineIndex),"routineExerciseIndex"in e&&n(3,c=e.routineExerciseIndex)},e.$$.update=()=>{2&e.$$.dirty&&(l.name,l.calories,ye.save()),1&e.$$.dirty&&(i.time,i.reps,ke.save())},[i,l,r,c,function(){l.name=this.textContent,n(1,l)},function(){l.calories=A(this.value),n(1,l)},function(){i.time=A(this.value),n(0,i)},function(){i.reps=A(this.value),n(0,i)},function(){_t.update((function(e){return e.shift(),"Add Exercise"===e[0].title&&e.shift(),e})),n(1,l.lastReps=i.reps,l),n(1,l.lastTime=i.time,l)}]}class Be extends $e{constructor(e){super(),ge(this,e,De,je,i,{routineIndex:2,routineExerciseIndex:3})}}function Fe(e,{delay:n=0,duration:o=400,easing:s=t}={}){const r=+getComputedStyle(e).opacity;return{delay:n,duration:o,easing:s,css:e=>"opacity: "+e*r}}function qe(e,t,n){const o=e.slice();return o[6]=t[n],o[8]=n,o}function ze(t){let n,o;return{c(){n=_("h1"),n.textContent="No exercises.",S(n,"id","notfound"),S(n,"class","svelte-10vtxhh")},m(e,t){y(e,n,t)},p:e,i(e){o||V((()=>{o=le(n,Fe,{}),o.start()}))},o:e,d(e){e&&w(n)}}}function Ge(e){let t,n,o=e[1],s=[];for(let t=0;t<o.length;t+=1)s[t]=Ke(qe(e,o,t));const r=e=>ce(s[e],1,1,(()=>{s[e]=null}));return{c(){for(let e=0;e<s.length;e+=1)s[e].c();t=M()},m(e,o){for(let t=0;t<s.length;t+=1)s[t].m(e,o);y(e,t,o),n=!0},p(e,n){if(7&n){let c;for(o=e[1],c=0;c<o.length;c+=1){const r=qe(e,o,c);s[c]?(s[c].p(r,n),re(s[c],1)):(s[c]=Ke(r),s[c].c(),re(s[c],1),s[c].m(t.parentNode,t))}for(oe(),c=o.length;c<s.length;c+=1)r(c);se()}},i(e){if(!n){for(let e=0;e<o.length;e+=1)re(s[e]);n=!0}},o(e){s=s.filter(Boolean);for(let e=0;e<s.length;e+=1)ce(s[e]);n=!1},d(e){E(s,e),e&&w(t)}}}function Je(e){let t,n,o,s,r,c,i=e[6].name+"",l=e[6].calories+"";return{c(){t=_("b"),n=C(i),o=I(),s=_("p"),r=C(l),c=C(" kcal.")},m(e,i){y(e,t,i),k(t,n),y(e,o,i),y(e,s,i),k(s,r),k(s,c)},p(e,t){2&t&&i!==(i=e[6].name+"")&&R(n,i),2&t&&l!==(l=e[6].calories+"")&&R(r,l)},d(e){e&&w(t),e&&w(o),e&&w(s)}}}function Ke(e){let t,n,o,s,c,i;function l(){return e[3](e[6])}function u(){return e[4](e[6],e[8])}return n=new Oe({props:{$$slots:{default:[Je]},$$scope:{ctx:e}}}),{c(){t=_("div"),fe(n.$$.fragment),o=I(),S(t,"id","exercise"),S(t,"class","svelte-10vtxhh")},m(e,r){y(e,t,r),pe(n,t,null),k(t,o),s=!0,c||(i=[m(Pe.call(null,t)),N(t,"press",l),N(t,"hold",u)],c=!0)},p(t,o){e=t;const s={};514&o&&(s.$$scope={dirty:o,ctx:e}),n.$set(s)},i(e){s||(re(n.$$.fragment,e),s=!0)},o(e){ce(n.$$.fragment,e),s=!1},d(e){e&&w(t),me(n),c=!1,r(i)}}}function Ue(e){let t,n,o,s,r,c,i;const l=[Ge,ze],u=[];function a(e,t){return e[1].length?0:1}return n=a(e),o=u[n]=l[n](e),c=new Re({props:{callback:e[5]}}),{c(){t=_("list"),o.c(),s=I(),r=_("div"),fe(c.$$.fragment),S(t,"class","svelte-10vtxhh"),S(r,"id","button"),S(r,"class","svelte-10vtxhh")},m(e,o){y(e,t,o),u[n].m(t,null),y(e,s,o),y(e,r,o),pe(c,r,null),i=!0},p(e,[s]){let r=n;n=a(e),n===r?u[n].p(e,s):(oe(),ce(u[r],1,1,(()=>{u[r]=null})),se(),o=u[n],o?o.p(e,s):(o=u[n]=l[n](e),o.c()),re(o,1),o.m(t,null));const i={};7&s&&(i.callback=e[5]),c.$set(i)},i(e){i||(re(o),re(c.$$.fragment,e),i=!0)},o(e){ce(o),ce(c.$$.fragment,e),i=!1},d(e){e&&w(t),u[n].d(),e&&w(s),e&&w(r),me(c)}}}function Ve(e,t,n){let o,s;a(e,ye,(e=>n(1,o=e))),a(e,ke,(e=>n(2,s=e)));let{routineIndex:r=0}=t;return e.$$set=e=>{"routineIndex"in e&&n(0,r=e.routineIndex)},[r,o,s,function(e){s[r].exercises.push({id:Ie(),exerciseId:e.id,reps:e.lastReps??0,time:e.lastTime??30}),ke.save(),Ct(Be,{routineIndex:r,routineExerciseIndex:s[r].exercises.length-1},"")},async function(e,t){await Ne(`Delete "${e.name}"?`)&&(ye.update((function(e){return[...e.slice(0,t),...e.slice(t+1)]})),ye.save())},function(){o.push({id:Ie(),name:"New Exercise",calories:.1}),s[r].exercises.push({id:Ie(),exerciseId:o[o.length-1].id,reps:0,time:30}),ke.save(),ye.save(),Ct(Be,{routineIndex:r,routineExerciseIndex:s[r].exercises.length-1},"")}]}class We extends $e{constructor(e){super(),ge(this,e,Ve,Ue,i,{routineIndex:0})}}let Ye=new AudioContext;function He(e="triangle",t=2){let n=Ye.createOscillator(),o=Ye.createGain();n.connect(o),o.connect(Ye.destination),n.type=e,n.start(0),o.gain.exponentialRampToValueAtTime(1e-4,Ye.currentTime+t)}function Qe(e){let t,n,o,s,r,c,i,l,u,a,d,f=(e[4]?"Break":e[5].name)+"",p=((e[4]?e[2][e[0]].break:e[5].time)-e[3]).toFixed(1)+"";function m(e,t){return!e[4]&&e[5].reps?et:e[4]?Ze:void 0}let h=m(e),g=h&&h(e);return{c(){t=_("div"),o=I(),s=_("roundthing"),r=_("h1"),c=C(f),i=I(),g&&g.c(),l=I(),u=_("h2"),a=C(p),d=C(" sec."),S(t,"id","circle"),S(t,"style",n=`--rotate: ${e[4]?360-e[3]/e[2][e[0]].break*360:e[3]/e[5].time*360}deg`),S(t,"class","svelte-1k01av7"),S(r,"class","svelte-1k01av7"),S(u,"class","svelte-1k01av7"),S(s,"class","svelte-1k01av7")},m(e,n){y(e,t,n),y(e,o,n),y(e,s,n),k(s,r),k(r,c),k(s,i),g&&g.m(s,null),k(s,l),k(s,u),k(u,a),k(u,d)},p(e,o){61&o&&n!==(n=`--rotate: ${e[4]?360-e[3]/e[2][e[0]].break*360:e[3]/e[5].time*360}deg`)&&S(t,"style",n),48&o&&f!==(f=(e[4]?"Break":e[5].name)+"")&&R(c,f),h===(h=m(e))&&g?g.p(e,o):(g&&g.d(1),g=h&&h(e),g&&(g.c(),g.m(s,l))),61&o&&p!==(p=((e[4]?e[2][e[0]].break:e[5].time)-e[3]).toFixed(1)+"")&&R(a,p)},d(e){e&&w(t),e&&w(o),e&&w(s),g&&g.d()}}}function Xe(t){let n,o,s;return{c(){n=_("button"),n.textContent="Start",S(n,"id","start"),S(n,"class","svelte-1k01av7")},m(e,r){y(e,n,r),o||(s=N(n,"click",t[6]),o=!0)},p:e,d(e){e&&w(n),o=!1,s()}}}function Ze(e){let t,n,o,s=e[5].name+"";return{c(){t=_("h2"),n=C("Next: "),o=C(s),S(t,"class","svelte-1k01av7")},m(e,s){y(e,t,s),k(t,n),k(t,o)},p(e,t){32&t&&s!==(s=e[5].name+"")&&R(o,s)},d(e){e&&w(t)}}}function et(e){let t,n,o,s=e[5].reps+"";return{c(){t=_("h2"),n=C(s),o=C(" reps"),S(t,"class","svelte-1k01av7")},m(e,s){y(e,t,s),k(t,n),k(t,o)},p(e,t){32&t&&s!==(s=e[5].reps+"")&&R(n,s)},d(e){e&&w(t)}}}function tt(t){let n,o,s,c,i,l,u,a;return{c(){n=_("div"),o=_("button"),o.textContent="<",s=I(),c=_("button"),c.textContent="○",i=I(),l=_("button"),l.textContent=">",S(o,"class","svelte-1k01av7"),S(c,"class","svelte-1k01av7"),S(l,"class","svelte-1k01av7"),S(n,"id","controlbuttons"),S(n,"class","svelte-1k01av7")},m(e,r){y(e,n,r),k(n,o),k(n,s),k(n,c),k(n,i),k(n,l),u||(a=[N(o,"click",t[8]),N(c,"click",t[7]),N(l,"click",t[9])],u=!0)},p:e,d(e){e&&w(n),u=!1,r(a)}}}function nt(t){let n,o,s;function r(e,t){return-1==e[1]?Xe:Qe}let c=r(t),i=c(t),l=-1!==t[1]&&tt(t);return{c(){n=_("container"),i.c(),o=I(),l&&l.c(),s=M(),S(n,"class","svelte-1k01av7")},m(e,t){y(e,n,t),i.m(n,null),y(e,o,t),l&&l.m(e,t),y(e,s,t)},p(e,[t]){c===(c=r(e))&&i?i.p(e,t):(i.d(1),i=c(e),i&&(i.c(),i.m(n,null))),-1!==e[1]?l?l.p(e,t):(l=tt(e),l.c(),l.m(s.parentNode,s)):l&&(l.d(1),l=null)},i:e,o:e,d(e){e&&w(n),i.d(),e&&w(o),l&&l.d(e),e&&w(s)}}}const ot=.1;function st(e,t,n){let o,s;a(e,we,(e=>n(2,s=e)));let{i:r=0}=t,c=-1,i=0,l=!1,u=!1,d=setInterval((function(){-1==c||u||(n(3,i+=ot),l?i>=s[r].break&&(He("triangle",4),n(3,i=ot),n(4,l=!1)):i>=o.time&&(He("sine",4),n(3,i=ot),n(4,l=!0),c<s[r].computedExercises.length-1?n(1,c++,c):n(1,c=-1)))}),100);function f(){n(1,c=0),n(3,i=0),u=!1}function p(){if(-1==c)return f();u=!u}function m(){if(!(i>3))return l?(n(1,c--,c),n(4,l=!1),void n(3,i=0)):void(0!=c?(n(4,l=!0),n(3,i=0)):n(1,c=-1));n(3,i=0)}function h(){n(3,i=l?s[r].break:o.time)}function g(e){switch(e.key){case" ":e.preventDefault(),p();break;case"ArrowLeft":m();break;case"ArrowRight":h()}}return document.addEventListener("keydown",g),F((function(){clearInterval(d),document.removeEventListener("keydown",g)})),e.$$set=e=>{"i"in e&&n(0,r=e.i)},e.$$.update=()=>{7&e.$$.dirty&&n(5,o=s[r].computedExercises[c])},[r,c,s,i,l,o,f,p,m,h]}class rt extends $e{constructor(e){super(),ge(this,e,st,nt,i,{i:0})}}function ct(e,t,n){const o=e.slice();return o[10]=t[n].name,o[11]=t[n].reps,o[12]=t[n].time,o[13]=t[n].calories,o[14]=t[n].id,o[16]=n,o}function it(e){let t,n,o,s=e[1][e[0]].exercises.length+"";return{c(){t=_("p"),n=C(s),o=C(" exercises"),S(t,"class","svelte-19o1eed")},m(e,s){y(e,t,s),k(t,n),k(t,o)},p(e,t){3&t&&s!==(s=e[1][e[0]].exercises.length+"")&&R(n,s)},d(e){e&&w(t)}}}function lt(e){let t,n,o,s,r,c,i,l,u,a=Math.round(Ee(e[0])/60)+"",d=_e(e[0])+"",f=e[1][e[0]].exercises&&it(e);return{c(){t=_("p"),n=C(a),o=C(" minute(s)"),s=I(),r=_("p"),c=C(d),i=C(" kcal."),l=I(),f&&f.c(),u=M(),S(t,"class","svelte-19o1eed"),S(r,"class","svelte-19o1eed")},m(e,a){y(e,t,a),k(t,n),k(t,o),y(e,s,a),y(e,r,a),k(r,c),k(r,i),y(e,l,a),f&&f.m(e,a),y(e,u,a)},p(e,t){1&t&&a!==(a=Math.round(Ee(e[0])/60)+"")&&R(n,a),1&t&&d!==(d=_e(e[0])+"")&&R(c,d),e[1][e[0]].exercises?f?f.p(e,t):(f=it(e),f.c(),f.m(u.parentNode,u)):f&&(f.d(1),f=null)},d(e){e&&w(t),e&&w(s),e&&w(r),e&&w(l),f&&f.d(e),e&&w(u)}}}function ut(t){let n,o;return{c(){n=_("p"),n.textContent="No exercises.",S(n,"id","notfound"),S(n,"class","svelte-19o1eed")},m(e,t){y(e,n,t)},p:e,i(e){o||V((()=>{o=le(n,Fe,{}),o.start()}))},o:e,d(e){e&&w(n)}}}function at(e){let t,n,o=[],s=new Map,r=e[3][e[0]].computedExercises;const c=e=>e[14];for(let t=0;t<r.length;t+=1){let n=ct(e,r,t),i=c(n);s.set(i,o[t]=mt(i,n))}return{c(){for(let e=0;e<o.length;e+=1)o[e].c();t=M()},m(e,s){for(let t=0;t<o.length;t+=1)o[t].m(e,s);y(e,t,s),n=!0},p(e,n){11&n&&(r=e[3][e[0]].computedExercises,oe(),o=de(o,n,c,1,e,r,s,t.parentNode,ae,mt,t,ct),se())},i(e){if(!n){for(let e=0;e<r.length;e+=1)re(o[e]);n=!0}},o(e){for(let e=0;e<o.length;e+=1)ce(o[e]);n=!1},d(e){for(let t=0;t<o.length;t+=1)o[t].d(e);e&&w(t)}}}function dt(e){let t,n,o,s,r,c,i,l=e[12]+"",u=Math.round(e[12]*e[13])+"";return{c(){t=_("p"),n=C(l),o=C(" seconds"),s=I(),r=_("p"),c=C(u),i=C(" kcal.")},m(e,l){y(e,t,l),k(t,n),k(t,o),y(e,s,l),y(e,r,l),k(r,c),k(r,i)},p(e,t){9&t&&l!==(l=e[12]+"")&&R(n,l),9&t&&u!==(u=Math.round(e[12]*e[13])+"")&&R(c,u)},d(e){e&&w(t),e&&w(s),e&&w(r)}}}function ft(e){let t,n,o,s,r,c,i,l=e[11]+"",u=Math.round(e[11]*e[13])+"";return{c(){t=_("p"),n=C(l),o=C(" reps"),s=I(),r=_("p"),c=C(u),i=C(" kcal.")},m(e,l){y(e,t,l),k(t,n),k(t,o),y(e,s,l),y(e,r,l),k(r,c),k(r,i)},p(e,t){9&t&&l!==(l=e[11]+"")&&R(n,l),9&t&&u!==(u=Math.round(e[11]*e[13])+"")&&R(c,u)},d(e){e&&w(t),e&&w(s),e&&w(r)}}}function pt(e){let t,n,o,s,r=e[10]+"";function c(e,t){return e[11]?ft:dt}let i=c(e),l=i(e);return{c(){t=_("b"),n=C(r),o=I(),l.c(),s=M()},m(e,r){y(e,t,r),k(t,n),y(e,o,r),l.m(e,r),y(e,s,r)},p(e,t){9&t&&r!==(r=e[10]+"")&&R(n,r),i===(i=c(e))&&l?l.p(e,t):(l.d(1),l=i(e),l&&(l.c(),l.m(s.parentNode,s)))},d(e){e&&w(t),e&&w(o),l.d(e),e&&w(s)}}}function mt(e,t){let n,o,s,c,i,l;function u(){return t[6](t[10],t[16])}function a(){return t[7](t[10],t[16])}return o=new Oe({props:{$$slots:{default:[pt]},$$scope:{ctx:t}}}),{key:e,first:null,c(){n=_("div"),fe(o.$$.fragment),s=I(),S(n,"class","svelte-19o1eed"),this.first=n},m(e,t){y(e,n,t),pe(o,n,null),k(n,s),c=!0,i||(l=[m(Pe.call(null,n)),N(n,"hold",u),N(n,"press",a)],i=!0)},p(e,n){t=e;const s={};131081&n&&(s.$$scope={dirty:n,ctx:t}),o.$set(s)},i(e){c||(re(o.$$.fragment,e),c=!0)},o(e){ce(o.$$.fragment,e),c=!1},d(e){e&&w(n),me(o),i=!1,r(l)}}}function ht(e){let t,n,o,s,c,l,u,a,d,f,p,m,h,g,$,v,x,b,E,C,M=(e[1][e[0]],e[2]),R=lt(e);const T=[at,ut],O=[];function P(e,t){return e[1][e[0]].exercises&&e[1][e[0]].exercises.length?0:1}return p=P(e),m=O[p]=T[p](e),x=new Re({props:{callback:e[9]}}),{c(){t=_("h1"),n=I(),o=_("info"),R.c(),s=I(),c=_("div"),l=_("input"),u=I(),a=_("span"),a.textContent="second breaks",d=I(),f=_("list"),m.c(),h=I(),g=_("button"),g.textContent="Go!",$=I(),v=_("div"),fe(x.$$.fragment),S(t,"contenteditable","true"),S(t,"class","svelte-19o1eed"),void 0===e[1][e[0]].name&&V((()=>e[4].call(t))),S(l,"type","number"),S(l,"class","svelte-19o1eed"),S(c,"class","svelte-19o1eed"),S(o,"class","svelte-19o1eed"),S(f,"class","svelte-19o1eed"),S(g,"id","go"),S(g,"class","svelte-19o1eed"),S(v,"id","button"),S(v,"class","svelte-19o1eed")},m(r,i){y(r,t,i),void 0!==e[1][e[0]].name&&(t.textContent=e[1][e[0]].name),y(r,n,i),y(r,o,i),R.m(o,null),k(o,s),k(o,c),k(c,l),L(l,e[1][e[0]].break),k(c,u),k(c,a),y(r,d,i),y(r,f,i),O[p].m(f,null),y(r,h,i),y(r,g,i),y(r,$,i),y(r,v,i),pe(x,v,null),b=!0,E||(C=[N(t,"input",e[4]),N(l,"input",e[5]),N(g,"click",e[8])],E=!0)},p(e,[n]){3&n&&e[1][e[0]].name!==t.textContent&&(t.textContent=e[1][e[0]].name),7&n&&i(M,(e[1][e[0]],M=e[2]))?(R.d(1),R=lt(e),R.c(),R.m(o,s)):R.p(e,n),3&n&&A(l.value)!==e[1][e[0]].break&&L(l,e[1][e[0]].break);let r=p;p=P(e),p===r?O[p].p(e,n):(oe(),ce(O[r],1,1,(()=>{O[r]=null})),se(),m=O[p],m?m.p(e,n):(m=O[p]=T[p](e),m.c()),re(m,1),m.m(f,null));const c={};1&n&&(c.callback=e[9]),x.$set(c)},i(e){b||(re(m),re(x.$$.fragment,e),b=!0)},o(e){ce(m),ce(x.$$.fragment,e),b=!1},d(e){e&&w(t),e&&w(n),e&&w(o),R.d(e),e&&w(d),e&&w(f),O[p].d(),e&&w(h),e&&w(g),e&&w($),e&&w(v),me(x),E=!1,r(C)}}}function gt(e,t,n){let o,s,r;a(e,ke,(e=>n(1,o=e))),a(e,ye,(e=>n(2,s=e))),a(e,we,(e=>n(3,r=e)));let{i:c=0}=t;return e.$$set=e=>{"i"in e&&n(0,c=e.i)},e.$$.update=()=>{3&e.$$.dirty&&(o[c].name,o[c].break,ke.save())},[c,o,s,r,function(){o[c].name=this.textContent,ke.set(o),n(0,c)},function(){o[c].break=A(this.value),ke.set(o),n(0,c)},async function(e,t){switch(await async function(e,t){return u(Me).text?new Promise((function(e){e(!1)})):new Promise((function(n){Me.set({text:e,options:t,callback:function(e){Me.set({text:"",callback:function(){}}),n(e)}})}))}(`What do you want to do with "${e}"?`,["Remove","Move Up","Move Down","Cancel"])){case 0:p(ke,o[c].exercises=[...o[c].exercises.slice(0,t),...o[c].exercises.slice(t+1)],o);break;case 1:if(0==t)break;let e=o[c].exercises[t];p(ke,o[c].exercises[t]=o[c].exercises[t-1],o),p(ke,o[c].exercises[t-1]=e,o);break;case 2:if(t==o[c].exercises.length-1)break;let n=o[c].exercises[t];p(ke,o[c].exercises[t]=o[c].exercises[t+1],o),p(ke,o[c].exercises[t+1]=n,o)}ke.update((function(e){return e})),ke.save()},function(e,t){void 0!==e&&Ct(Be,{routineIndex:c,routineExerciseIndex:t})},function(){r[c].computedExercises.length&&Ct(rt,{i:c},"")},function(){Ct(We,{routineIndex:c},"Add Exercise")}]}class $t extends $e{constructor(e){super(),ge(this,e,gt,ht,i,{i:0})}}function vt(e,t,n){const o=e.slice();return o[4]=t[n],o[6]=n,o}function xt(e){let t,n,o,s,r,c,i,l,u,a,d=e[4].name+"",f=Math.round(Ee(e[6])/60)+"",p=_e(e[6])+"";return{c(){t=_("b"),n=C(d),o=I(),s=_("p"),r=C(f),c=C(" min."),i=I(),l=_("p"),u=C(p),a=C(" kcal.")},m(e,d){y(e,t,d),k(t,n),y(e,o,d),y(e,s,d),k(s,r),k(s,c),y(e,i,d),y(e,l,d),k(l,u),k(l,a)},p(e,t){1&t&&d!==(d=e[4].name+"")&&R(n,d),1&t&&f!==(f=Math.round(Ee(e[6])/60)+"")&&R(r,f),1&t&&p!==(p=_e(e[6])+"")&&R(u,p)},d(e){e&&w(t),e&&w(o),e&&w(s),e&&w(i),e&&w(l)}}}function bt(e,t){let n,o,s,c,i;function l(){return t[1](t[6])}function u(){return t[2](t[4],t[6])}return o=new Oe({props:{$$slots:{default:[xt]},$$scope:{ctx:t}}}),{key:e,first:null,c(){n=_("div"),fe(o.$$.fragment),S(n,"class","svelte-1n6ushe"),this.first=n},m(e,t){y(e,n,t),pe(o,n,null),s=!0,c||(i=[m(Pe.call(null,n)),N(n,"press",l),N(n,"hold",u)],c=!0)},p(e,n){t=e;const s={};129&n&&(s.$$scope={dirty:n,ctx:t}),o.$set(s)},i(e){s||(re(o.$$.fragment,e),s=!0)},o(e){ce(o.$$.fragment,e),s=!1},d(e){e&&w(n),me(o),c=!1,r(i)}}}function kt(e){let t;return{c(){t=_("p"),t.textContent="No routines",S(t,"id","notfound"),S(t,"class","svelte-1n6ushe")},m(e,n){y(e,t,n)},d(e){e&&w(t)}}}function yt(e){let t,n,o,s,r,c,i=[],l=new Map,u=e[0];const a=e=>e[4].id;for(let t=0;t<u.length;t+=1){let n=vt(e,u,t),o=a(n);l.set(o,i[t]=bt(o,n))}let d=0==e[0].length&&kt();return r=new Re({props:{callback:e[3]}}),{c(){t=_("div");for(let e=0;e<i.length;e+=1)i[e].c();n=I(),d&&d.c(),o=I(),s=_("div"),fe(r.$$.fragment),S(t,"id","list"),S(t,"class","svelte-1n6ushe"),S(s,"id","button"),S(s,"class","svelte-1n6ushe")},m(e,l){y(e,t,l);for(let e=0;e<i.length;e+=1)i[e].m(t,null);k(t,n),d&&d.m(t,null),y(e,o,l),y(e,s,l),pe(r,s,null),c=!0},p(e,[o]){1&o&&(u=e[0],oe(),i=de(i,o,a,1,e,u,l,t,ae,bt,n,vt),se()),0==e[0].length?d||(d=kt(),d.c(),d.m(t,null)):d&&(d.d(1),d=null);const s={};1&o&&(s.callback=e[3]),r.$set(s)},i(e){if(!c){for(let e=0;e<u.length;e+=1)re(i[e]);re(r.$$.fragment,e),c=!0}},o(e){for(let e=0;e<i.length;e+=1)ce(i[e]);ce(r.$$.fragment,e),c=!1},d(e){e&&w(t);for(let e=0;e<i.length;e+=1)i[e].d();d&&d.d(),e&&w(o),e&&w(s),me(r)}}}function wt(e,t,n){let o;a(e,ke,(e=>n(0,o=e)));return[o,function(e){Ct($t,{i:e},"")},async function(e,t){await Ne(`Delete "${e.name}"?`)&&ke.update((function(e){return[...e.slice(0,t),...e.slice(t+1)]}))},function(){o.push({id:Ie(),name:"New Routine",break:10,exercises:[]}),ke.save(),Ct($t,{i:o.length-1},"")}]}class Et extends $e{constructor(e){super(),ge(this,e,wt,yt,i,{})}}const _t=xe([{page:Et,props:{},title:"Routines"}]),Ct=function(e=Et,t={},n="Routines"){window.history.pushState({},n,location.href),_t.update((function(o){return[{page:e,props:t,title:n},...o]}))},It=function(e=1){if(u(_t).length<=1)return!0;window.history.go(-e)};function Mt(t){let n,o,s,r,c,i,l,u,a,d,f,p,m=t[0][0].title+"";return{c(){n=_("div"),o=_("button"),s=C("<"),c=I(),i=_("p"),l=C(m),a=I(),d=_("div"),S(o,"style",r=1==t[0].length?"display: none;":""),S(o,"class","svelte-5w25g5"),S(i,"class","svelte-5w25g5"),S(n,"id","bar"),S(n,"style",u=t[0][0].title?"":"border: none;"),S(n,"class","svelte-5w25g5"),S(d,"id","space"),S(d,"class","svelte-5w25g5")},m(e,r){y(e,n,r),k(n,o),k(o,s),k(n,c),k(n,i),k(i,l),y(e,a,r),y(e,d,r),f||(p=N(o,"click",t[1]),f=!0)},p(e,[t]){1&t&&r!==(r=1==e[0].length?"display: none;":"")&&S(o,"style",r),1&t&&m!==(m=e[0][0].title+"")&&R(l,m),1&t&&u!==(u=e[0][0].title?"":"border: none;")&&S(n,"style",u)},i:e,o:e,d(e){e&&w(n),e&&w(a),e&&w(d),f=!1,p()}}}function Nt(e,t,n){let o;a(e,_t,(e=>n(0,o=e)));return[o,function(){It(1)}]}window.onpopstate=function(){u(_t).length<=1||_t.update((function(e){return e.slice(1)}))};class St extends $e{constructor(e){super(),ge(this,e,Nt,Mt,i,{})}}function At(e,t,n){const o=e.slice();return o[4]=t[n],o[6]=n,o}function Rt(e){let t,n,o,s,r,c,i,l,u=e[0].text+"";function a(e,t){return void 0===e[0].options?Tt:Lt}let d=a(e),f=d(e);return{c(){t=_("darken"),n=_("box"),o=_("h1"),s=C(u),r=I(),c=_("buttoncontainer"),f.c(),S(o,"class","svelte-7vg1f8"),S(c,"class","svelte-7vg1f8"),S(n,"class","svelte-7vg1f8"),S(t,"class","svelte-7vg1f8")},m(e,i){y(e,t,i),k(t,n),k(n,o),k(o,s),k(n,r),k(n,c),f.m(c,null),l=!0},p(e,t){(!l||1&t)&&u!==(u=e[0].text+"")&&R(s,u),d===(d=a(e))&&f?f.p(e,t):(f.d(1),f=d(e),f&&(f.c(),f.m(c,null)))},i(e){l||(V((()=>{i||(i=ue(t,Fe,{duration:100},!0)),i.run(1)})),l=!0)},o(e){i||(i=ue(t,Fe,{duration:100},!1)),i.run(0),l=!1},d(e){e&&w(t),f.d(),e&&i&&i.end()}}}function Lt(e){let t,n=e[0].options,o=[];for(let t=0;t<n.length;t+=1)o[t]=Ot(At(e,n,t));return{c(){for(let e=0;e<o.length;e+=1)o[e].c();t=M()},m(e,n){for(let t=0;t<o.length;t+=1)o[t].m(e,n);y(e,t,n)},p(e,s){if(1&s){let r;for(n=e[0].options,r=0;r<n.length;r+=1){const c=At(e,n,r);o[r]?o[r].p(c,s):(o[r]=Ot(c),o[r].c(),o[r].m(t.parentNode,t))}for(;r<o.length;r+=1)o[r].d(1);o.length=n.length}},d(e){E(o,e),e&&w(t)}}}function Tt(t){let n,o,s,c,i;return{c(){n=_("button"),n.textContent="Yes",o=I(),s=_("button"),s.textContent="No",S(n,"id","yes"),S(n,"class","svelte-7vg1f8"),S(s,"id","no"),S(s,"class","svelte-7vg1f8")},m(e,r){y(e,n,r),y(e,o,r),y(e,s,r),c||(i=[N(n,"click",t[1]),N(s,"click",t[2])],c=!0)},p:e,d(e){e&&w(n),e&&w(o),e&&w(s),c=!1,r(i)}}}function Ot(e){let t,n,o,s,r=e[4]+"";function c(){return e[3](e[6])}return{c(){var e,o,s;t=_("button"),n=C(r),e="width",o="100%",t.style.setProperty(e,o,s?"important":""),S(t,"class","svelte-7vg1f8")},m(e,r){y(e,t,r),k(t,n),o||(s=N(t,"click",c),o=!0)},p(t,o){e=t,1&o&&r!==(r=e[4]+"")&&R(n,r)},d(e){e&&w(t),o=!1,s()}}}function Pt(e){let t,n,o=e[0].text&&Rt(e);return{c(){o&&o.c(),t=M()},m(e,s){o&&o.m(e,s),y(e,t,s),n=!0},p(e,[n]){e[0].text?o?(o.p(e,n),1&n&&re(o,1)):(o=Rt(e),o.c(),re(o,1),o.m(t.parentNode,t)):o&&(oe(),ce(o,1,1,(()=>{o=null})),se())},i(e){n||(re(o),n=!0)},o(e){ce(o),n=!1},d(e){o&&o.d(e),e&&w(t)}}}function jt(e,t,n){let o;a(e,Me,(e=>n(0,o=e)));return[o,function(){o.callback(!0)},function(){o.callback(!1)},function(e){o.callback(e)}]}class Dt extends $e{constructor(e){super(),ge(this,e,jt,Pt,i,{})}}function Bt(e){let t,o,s,r;const c=[e[0][0].props];var i=e[0][0].page;function l(e){let t={};for(let e=0;e<c.length;e+=1)t=n(t,c[e]);return{props:t}}return i&&(o=new i(l())),{c(){t=_("div"),o&&fe(o.$$.fragment),S(t,"class","svelte-19uewan")},m(e,n){y(e,t,n),o&&pe(o,t,null),r=!0},p(e,n){const s=1&n?function(e,t){const n={},o={},s={$$scope:1};let r=e.length;for(;r--;){const c=e[r],i=t[r];if(i){for(const e in c)e in i||(o[e]=1);for(const e in i)s[e]||(n[e]=i[e],s[e]=1);e[r]=i}else for(const e in c)s[e]=1}for(const e in o)e in n||(n[e]=void 0);return n}(c,[(r=e[0][0].props,"object"==typeof r&&null!==r?r:{})]):{};var r;if(i!==(i=e[0][0].page)){if(o){oe();const e=o;ce(e.$$.fragment,1,0,(()=>{me(e,1)})),se()}i?(o=new i(l()),fe(o.$$.fragment),re(o.$$.fragment,1),pe(o,t,null)):o=null}else i&&o.$set(s)},i(e){r||(o&&re(o.$$.fragment,e),s||V((()=>{s=le(t,Fe,{duration:100,delay:50}),s.start()})),r=!0)},o(e){o&&ce(o.$$.fragment,e),r=!1},d(e){e&&w(t),o&&me(o)}}}function Ft(t){let n,o,s,r,c,l=t[0][0];n=new St({});let u=Bt(t);return r=new Dt({}),{c(){fe(n.$$.fragment),o=I(),u.c(),s=I(),fe(r.$$.fragment)},m(e,t){pe(n,e,t),y(e,o,t),u.m(e,t),y(e,s,t),pe(r,e,t),c=!0},p(t,[n]){1&n&&i(l,l=t[0][0])?(oe(),ce(u,1,1,e),se(),u=Bt(t),u.c(),re(u),u.m(s.parentNode,s)):u.p(t,n)},i(e){c||(re(n.$$.fragment,e),re(u),re(r.$$.fragment,e),c=!0)},o(e){ce(n.$$.fragment,e),ce(u),ce(r.$$.fragment,e),c=!1},d(e){me(n,e),e&&w(o),u.d(e),e&&w(s),me(r,e)}}}function qt(e,t,n){let o;return a(e,_t,(e=>n(0,o=e))),document.addEventListener("keydown",(function(e){switch(e.key){case"Escape":It();break;case" ":let e=document.createEvent("MouseEvents");e.initEvent("mousedown",!0,!0),document.activeElement.dispatchEvent(e)}})),[o]}return new class extends $e{constructor(e){super(),ge(this,e,qt,Ft,i,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
