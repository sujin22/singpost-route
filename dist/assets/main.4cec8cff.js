import"./modulepreload-polyfill.c7c6310f.js";function i(n){return fetch(n).then(e=>{if(!e.ok)throw new Error(`JSON \uC77D\uAE30 \uC624\uB958: ${e.status} ${e.statusText}`);return e.json()}).then(e=>{const t=new Map;return e.forEach(r=>{var a;const{ORDER_DATE:o,CAR_NUM:u}=r;t.has(o)||t.set(o,new Set),(a=t.get(o))==null||a.add(u)}),t})}function l(n){const e="./route.html?",t=document.createDocumentFragment();return n.forEach((r,o,u)=>{const a=document.createElement("details");a.className="tree-nav__item is-expandable";const s=document.createElement("summary");s.className="tree-nav__item-title",s.textContent=o;const m=document.createElement("div");m.className="tree-nav__item",r.forEach((d,E,p)=>{const c=document.createElement("a");c.className="tree-nav__item",c.href=e+"date="+o+"&car_id="+d,c.textContent=d,m.appendChild(c)}),a.appendChild(m),a.appendChild(s),t.appendChild(a)}),t}const h="/singpost-route/input-data/20230201_00001.json";i(h).then(n=>{console.log(n);const e=l(n),t=document.querySelector(".tree-nav");t?t.appendChild(e):console.error("Container Element Not Found")}).catch(n=>{console.error("JSON \uC77D\uAE30 \uC624\uB958:",n)});
