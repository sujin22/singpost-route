import"./modulepreload-polyfill.c7c6310f.js";function m(){return fetch("https://api.github.com/repos/sujin22/singpost-route/contents/data/input-data/").then(e=>{if(!e.ok)throw new Error("Failed to fetch file list");return e.json()}).then(e=>{console.log(e);const o=e.map(s=>s.name);return console.log(o),o}).catch(e=>(console.error("Error:",e),[]))}function h(r){return fetch(r).then(n=>{if(!n.ok)throw new Error(`JSON \uC77D\uAE30 \uC624\uB958: ${n.status} ${n.statusText}`);return n.json()}).then(n=>{const t=new Set;return n.result.forEach(e=>{t.add(e.CAR_NUM)}),t})}function p(r){const n=document.createDocumentFragment();return r.forEach(t=>{const e=document.createElement("details");e.className="tree-nav__item is-expandable";const o=document.createElement("summary");o.className="tree-nav__item-title",o.textContent=t.replace(".json",""),console.log("fname: "+t),o.addEventListener("click",function(){const a="/singpost-route/data/input-data/"+t;console.log("jsonUrl: "+a),d.has(t)||(h(a).then(u=>{console.log(u),f(t,u)}).catch(u=>{console.error("JSON \uC77D\uAE30 \uC624\uB958:",u)}),d.add(t))});const s=document.createElement("div");s.className="tree-nav__item";const l="./data/all-route/",c=document.createElement("a");c.className="tree-nav__item";const i=l+t.replace("json","html");console.log("href url: "+i),c.href=i,c.textContent="All Route",s.appendChild(c),e.appendChild(s),e.appendChild(o),n.appendChild(e)}),n}function f(r,n){const t="./route.html?",e=r.replace(".json",""),o=document.querySelector(".tree-nav");if(o&&o.children){for(const s of o.children)if(s.tagName==="DETAILS"){const l=s.querySelector(".tree-nav__item-title");if(l&&l.textContent===e){const c=s.querySelector(".tree-nav__item");c&&g(n).forEach(i=>{const a=document.createElement("a");a.className="tree-nav__item",a.href=t+"fname="+r+"&car_id="+i,a.textContent=i,c.appendChild(a)});break}}}}function E(r){return r.sort((n,t)=>{const e=parseInt(n.substring(0,8)),o=parseInt(n.substring(9,n.lastIndexOf("."))),s=parseInt(t.substring(0,8)),l=parseInt(t.substring(9,t.lastIndexOf(".")));return e===s?o-l:s-e}),console.log(r),r}function g(r){return Array.from(r).sort()}const d=new Set;m().then(r=>{const n=E(r),t=p(n),e=document.querySelector(".tree-nav");e?e.appendChild(t):console.error("Container Element Not Found")}).catch(r=>{console.error("Error:",r)});