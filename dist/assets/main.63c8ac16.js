import"./modulepreload-polyfill.c7c6310f.js";function u(){return fetch("https://api.github.com/repos/sujin22/singpost-route/contents/data/input-data/").then(t=>{if(!t.ok)throw new Error("Failed to fetch file list");return t.json()}).then(t=>{console.log(t);const r=t.map(c=>c.name);return console.log(r),r}).catch(t=>(console.error("Error:",t),[]))}function d(e){return fetch(e).then(n=>{if(!n.ok)throw new Error(`JSON \uC77D\uAE30 \uC624\uB958: ${n.status} ${n.statusText}`);return n.json()}).then(n=>{const o=new Map;return n.forEach(t=>{var a;const{ORDER_DATE:r,CAR_NUM:c}=t;o.has(r)||o.set(r,new Set),(a=o.get(r))==null||a.add(c)}),o})}function h(e){const n=document.createDocumentFragment();return e.forEach(o=>{const t=document.createElement("details");t.className="tree-nav__item is-expandable";const r=document.createElement("summary");r.className="tree-nav__item-title",r.textContent=o,t.appendChild(r),n.appendChild(t)}),n}function p(e){const n="./route.html?",o=document.createDocumentFragment();return e.forEach((t,r,c)=>{const a=document.createElement("details");a.className="tree-nav__item is-expandable";const m=document.createElement("summary");m.className="tree-nav__item-title",m.textContent=r;const i=document.createElement("div");i.className="tree-nav__item",t.forEach((l,f,_)=>{const s=document.createElement("a");s.className="tree-nav__item",s.href=n+"date="+r+"&car_id="+l,s.textContent=l,i.appendChild(s)}),a.appendChild(i),a.appendChild(m),o.appendChild(a)}),o}u().then(e=>{h(e)}).catch(e=>{console.error("Error:",e)});const E="/singpost-route/20230201_001.json";d(E).then(e=>{console.log(e);const n=p(e),o=document.querySelector(".tree-nav");o?o.appendChild(n):console.error("Container Element Not Found")}).catch(e=>{console.error("JSON \uC77D\uAE30 \uC624\uB958:",e)});
