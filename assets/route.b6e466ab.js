import{P as f}from"./papaparse.min.3ece8788.js";/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */const l=new URLSearchParams(window.location.search),u=l.get("date"),d=l.get("car_id");console.log("date: "+u);console.log("carID : "+d);function w(e){return fetch(e).then(t=>{if(!t.ok)throw new Error(`CSV \uC77D\uAE30 \uC624\uB958: ${t.status} ${t.statusText}`);return t.text()}).then(t=>{const{data:a,errors:n}=f.parse(t,{header:!0,delimiter:",",skipEmptyLines:!0});if(n.length>0){const r=n.map(s=>s.message).join(`
`);throw new Error(`CSV \uD30C\uC2F1 \uC624\uB958:
${r}`)}const o=[];return a.forEach(r=>{const{ORDER_DATE:s,CAR_NUM:g,Y:m,X:p}=r;if(s!=u||g!=d)return;const c=parseFloat(m),i=parseFloat(p);if(!isNaN(c)&&!isNaN(i)){const h={latitude:c,longitude:i};o.push(h)}}),o})}const C="./20230201_000000000001_result_df_postprocessed.csv";w(C).then(e=>{function t(){const a=new google.maps.Map(document.getElementById("map"),{zoom:4}),n=new google.maps.DirectionsService,o=new google.maps.DirectionsRenderer({draggable:!1,map:a,panel:document.getElementById("panel")});o.addListener("directions_changed",()=>{const r=o.getDirections();r&&E(r)}),D(e,n,o)}t()}).catch(e=>{console.error("CSV \uC77D\uAE30 \uC624\uB958:",e)});function D(e,t,a){const n=[];e.slice(1,e.length-1).forEach(o=>{const r={location:new google.maps.LatLng(o.latitude,o.longitude)};n.push(r)}),console.log(e),console.log("latitude: "+e[0]),t.route({origin:{lat:e[0].latitude,lng:e[0].longitude},destination:{lat:e[e.length-1].latitude,lng:e[e.length-1].longitude},waypoints:n,travelMode:google.maps.TravelMode.DRIVING,avoidTolls:!0}).then(o=>{a.setDirections(o)}).catch(o=>{alert("Could not display directions due to: "+o)})}function E(e){let t=0;const a=e.routes[0];if(!!a){for(let n=0;n<a.legs.length;n++)t+=a.legs[n].distance.value;t=t/1e3,document.getElementById("total").innerHTML=t+" km"}}
