import"./modulepreload-polyfill.c7c6310f.js";var ke=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},ye={exports:{}};/* @license
Papa Parse
v5.4.1
https://github.com/mholt/PapaParse
License: MIT
*/(function(Z,Q){(function(se,m){Z.exports=m()})(ke,function se(){var m=typeof self<"u"?self:typeof window<"u"?window:m!==void 0?m:{},B=!m.document&&!!m.postMessage,Y=m.IS_PAPA_WORKER||!1,N={},fe=0,h={parse:function(t,e){var r=(e=e||{}).dynamicTyping||!1;if(p(r)&&(e.dynamicTypingFunction=r,r={}),e.dynamicTyping=r,e.transform=!!p(e.transform)&&e.transform,e.worker&&h.WORKERS_SUPPORTED){var i=function(){if(!h.WORKERS_SUPPORTED)return!1;var f=(T=m.URL||m.webkitURL||null,E=se.toString(),h.BLOB_URL||(h.BLOB_URL=T.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",E,")();"],{type:"text/javascript"})))),d=new m.Worker(f),T,E;return d.onmessage=ve,d.id=fe++,N[d.id]=d}();return i.userStep=e.step,i.userChunk=e.chunk,i.userComplete=e.complete,i.userError=e.error,e.step=p(e.step),e.chunk=p(e.chunk),e.complete=p(e.complete),e.error=p(e.error),delete e.worker,void i.postMessage({input:t,config:e,workerId:i.id})}var s=null;return h.NODE_STREAM_INPUT,typeof t=="string"?(t=function(f){return f.charCodeAt(0)===65279?f.slice(1):f}(t),s=e.download?new ae(e):new ie(e)):t.readable===!0&&p(t.read)&&p(t.on)?s=new ue(e):(m.File&&t instanceof File||t instanceof Object)&&(s=new oe(e)),s.stream(t)},unparse:function(t,e){var r=!1,i=!0,s=",",f=`\r
`,d='"',T=d+d,E=!1,a=null,C=!1;(function(){if(typeof e=="object"){if(typeof e.delimiter!="string"||h.BAD_DELIMITERS.filter(function(n){return e.delimiter.indexOf(n)!==-1}).length||(s=e.delimiter),(typeof e.quotes=="boolean"||typeof e.quotes=="function"||Array.isArray(e.quotes))&&(r=e.quotes),typeof e.skipEmptyLines!="boolean"&&typeof e.skipEmptyLines!="string"||(E=e.skipEmptyLines),typeof e.newline=="string"&&(f=e.newline),typeof e.quoteChar=="string"&&(d=e.quoteChar),typeof e.header=="boolean"&&(i=e.header),Array.isArray(e.columns)){if(e.columns.length===0)throw new Error("Option columns is empty");a=e.columns}e.escapeChar!==void 0&&(T=e.escapeChar+d),(typeof e.escapeFormulae=="boolean"||e.escapeFormulae instanceof RegExp)&&(C=e.escapeFormulae instanceof RegExp?e.escapeFormulae:/^[=+\-@\t\r].*$/)}})();var u=new RegExp(ne(d),"g");if(typeof t=="string"&&(t=JSON.parse(t)),Array.isArray(t)){if(!t.length||Array.isArray(t[0]))return P(null,t,E);if(typeof t[0]=="object")return P(a||Object.keys(t[0]),t,E)}else if(typeof t=="object")return typeof t.data=="string"&&(t.data=JSON.parse(t.data)),Array.isArray(t.data)&&(t.fields||(t.fields=t.meta&&t.meta.fields||a),t.fields||(t.fields=Array.isArray(t.data[0])?t.fields:typeof t.data[0]=="object"?Object.keys(t.data[0]):[]),Array.isArray(t.data[0])||typeof t.data[0]=="object"||(t.data=[t.data])),P(t.fields||[],t.data||[],E);throw new Error("Unable to serialize unrecognized input");function P(n,y,S){var b="";typeof n=="string"&&(n=JSON.parse(n)),typeof y=="string"&&(y=JSON.parse(y));var I=Array.isArray(n)&&0<n.length,x=!Array.isArray(y[0]);if(I&&i){for(var A=0;A<n.length;A++)0<A&&(b+=s),b+=D(n[A],A);0<y.length&&(b+=f)}for(var o=0;o<y.length;o++){var l=I?n.length:y[o].length,v=!1,O=I?Object.keys(y[o]).length===0:y[o].length===0;if(S&&!I&&(v=S==="greedy"?y[o].join("").trim()==="":y[o].length===1&&y[o][0].length===0),S==="greedy"&&I){for(var g=[],L=0;L<l;L++){var w=x?n[L]:L;g.push(y[o][w])}v=g.join("").trim()===""}if(!v){for(var _=0;_<l;_++){0<_&&!O&&(b+=s);var q=I&&x?n[_]:_;b+=D(y[o][q],_)}o<y.length-1&&(!S||0<l&&!O)&&(b+=f)}}return b}function D(n,y){if(n==null)return"";if(n.constructor===Date)return JSON.stringify(n).slice(1,25);var S=!1;C&&typeof n=="string"&&C.test(n)&&(n="'"+n,S=!0);var b=n.toString().replace(u,T);return(S=S||r===!0||typeof r=="function"&&r(n,y)||Array.isArray(r)&&r[y]||function(I,x){for(var A=0;A<x.length;A++)if(-1<I.indexOf(x[A]))return!0;return!1}(b,h.BAD_DELIMITERS)||-1<b.indexOf(s)||b.charAt(0)===" "||b.charAt(b.length-1)===" ")?d+b+d:b}}};if(h.RECORD_SEP=String.fromCharCode(30),h.UNIT_SEP=String.fromCharCode(31),h.BYTE_ORDER_MARK="\uFEFF",h.BAD_DELIMITERS=["\r",`
`,'"',h.BYTE_ORDER_MARK],h.WORKERS_SUPPORTED=!B&&!!m.Worker,h.NODE_STREAM_INPUT=1,h.LocalChunkSize=10485760,h.RemoteChunkSize=5242880,h.DefaultDelimiter=",",h.Parser=de,h.ParserHandle=pe,h.NetworkStreamer=ae,h.FileStreamer=oe,h.StringStreamer=ie,h.ReadableStreamStreamer=ue,m.jQuery){var re=m.jQuery;re.fn.parse=function(t){var e=t.config||{},r=[];return this.each(function(f){if(!(re(this).prop("tagName").toUpperCase()==="INPUT"&&re(this).attr("type").toLowerCase()==="file"&&m.FileReader)||!this.files||this.files.length===0)return!0;for(var d=0;d<this.files.length;d++)r.push({file:this.files[d],inputElem:this,instanceConfig:re.extend({},e)})}),i(),this;function i(){if(r.length!==0){var f,d,T,E,a=r[0];if(p(t.before)){var C=t.before(a.file,a.inputElem);if(typeof C=="object"){if(C.action==="abort")return f="AbortError",d=a.file,T=a.inputElem,E=C.reason,void(p(t.error)&&t.error({name:f},d,T,E));if(C.action==="skip")return void s();typeof C.config=="object"&&(a.instanceConfig=re.extend(a.instanceConfig,C.config))}else if(C==="skip")return void s()}var u=a.instanceConfig.complete;a.instanceConfig.complete=function(P){p(u)&&u(P,a.file,a.inputElem),s()},h.parse(a.file,a.instanceConfig)}else p(t.complete)&&t.complete()}function s(){r.splice(0,1),i()}}}function K(t){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(e){var r=le(e);r.chunkSize=parseInt(r.chunkSize),e.step||e.chunk||(r.chunkSize=null),this._handle=new pe(r),(this._handle.streamer=this)._config=r}.call(this,t),this.parseChunk=function(e,r){if(this.isFirstChunk&&p(this._config.beforeFirstChunk)){var i=this._config.beforeFirstChunk(e);i!==void 0&&(e=i)}this.isFirstChunk=!1,this._halted=!1;var s=this._partialLine+e;this._partialLine="";var f=this._handle.parse(s,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var d=f.meta.cursor;this._finished||(this._partialLine=s.substring(d-this._baseIndex),this._baseIndex=d),f&&f.data&&(this._rowCount+=f.data.length);var T=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(Y)m.postMessage({results:f,workerId:h.WORKER_ID,finished:T});else if(p(this._config.chunk)&&!r){if(this._config.chunk(f,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);f=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(f.data),this._completeResults.errors=this._completeResults.errors.concat(f.errors),this._completeResults.meta=f.meta),this._completed||!T||!p(this._config.complete)||f&&f.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),T||f&&f.meta.paused||this._nextChunk(),f}this._halted=!0},this._sendError=function(e){p(this._config.error)?this._config.error(e):Y&&this._config.error&&m.postMessage({workerId:h.WORKER_ID,error:e,finished:!1})}}function ae(t){var e;(t=t||{}).chunkSize||(t.chunkSize=h.RemoteChunkSize),K.call(this,t),this._nextChunk=B?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(r){this._input=r,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(e=new XMLHttpRequest,this._config.withCredentials&&(e.withCredentials=this._config.withCredentials),B||(e.onload=$(this._chunkLoaded,this),e.onerror=$(this._chunkError,this)),e.open(this._config.downloadRequestBody?"POST":"GET",this._input,!B),this._config.downloadRequestHeaders){var r=this._config.downloadRequestHeaders;for(var i in r)e.setRequestHeader(i,r[i])}if(this._config.chunkSize){var s=this._start+this._config.chunkSize-1;e.setRequestHeader("Range","bytes="+this._start+"-"+s)}try{e.send(this._config.downloadRequestBody)}catch(f){this._chunkError(f.message)}B&&e.status===0&&this._chunkError()}},this._chunkLoaded=function(){e.readyState===4&&(e.status<200||400<=e.status?this._chunkError():(this._start+=this._config.chunkSize?this._config.chunkSize:e.responseText.length,this._finished=!this._config.chunkSize||this._start>=function(r){var i=r.getResponseHeader("Content-Range");return i===null?-1:parseInt(i.substring(i.lastIndexOf("/")+1))}(e),this.parseChunk(e.responseText)))},this._chunkError=function(r){var i=e.statusText||r;this._sendError(new Error(i))}}function oe(t){var e,r;(t=t||{}).chunkSize||(t.chunkSize=h.LocalChunkSize),K.call(this,t);var i=typeof FileReader<"u";this.stream=function(s){this._input=s,r=s.slice||s.webkitSlice||s.mozSlice,i?((e=new FileReader).onload=$(this._chunkLoaded,this),e.onerror=$(this._chunkError,this)):e=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var s=this._input;if(this._config.chunkSize){var f=Math.min(this._start+this._config.chunkSize,this._input.size);s=r.call(s,this._start,f)}var d=e.readAsText(s,this._config.encoding);i||this._chunkLoaded({target:{result:d}})},this._chunkLoaded=function(s){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(s.target.result)},this._chunkError=function(){this._sendError(e.error)}}function ie(t){var e;K.call(this,t=t||{}),this.stream=function(r){return e=r,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var r,i=this._config.chunkSize;return i?(r=e.substring(0,i),e=e.substring(i)):(r=e,e=""),this._finished=!e,this.parseChunk(r)}}}function ue(t){K.call(this,t=t||{});var e=[],r=!0,i=!1;this.pause=function(){K.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){K.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(s){this._input=s,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){i&&e.length===1&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),e.length?this.parseChunk(e.shift()):r=!0},this._streamData=$(function(s){try{e.push(typeof s=="string"?s:s.toString(this._config.encoding)),r&&(r=!1,this._checkIsFinished(),this.parseChunk(e.shift()))}catch(f){this._streamError(f)}},this),this._streamError=$(function(s){this._streamCleanUp(),this._sendError(s)},this),this._streamEnd=$(function(){this._streamCleanUp(),i=!0,this._streamData("")},this),this._streamCleanUp=$(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function pe(t){var e,r,i,s=Math.pow(2,53),f=-s,d=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,T=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,E=this,a=0,C=0,u=!1,P=!1,D=[],n={data:[],errors:[],meta:{}};if(p(t.step)){var y=t.step;t.step=function(o){if(n=o,I())b();else{if(b(),n.data.length===0)return;a+=o.data.length,t.preview&&a>t.preview?r.abort():(n.data=n.data[0],y(n,E))}}}function S(o){return t.skipEmptyLines==="greedy"?o.join("").trim()==="":o.length===1&&o[0].length===0}function b(){return n&&i&&(A("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+h.DefaultDelimiter+"'"),i=!1),t.skipEmptyLines&&(n.data=n.data.filter(function(o){return!S(o)})),I()&&function(){if(!n)return;function o(v,O){p(t.transformHeader)&&(v=t.transformHeader(v,O)),D.push(v)}if(Array.isArray(n.data[0])){for(var l=0;I()&&l<n.data.length;l++)n.data[l].forEach(o);n.data.splice(0,1)}else n.data.forEach(o)}(),function(){if(!n||!t.header&&!t.dynamicTyping&&!t.transform)return n;function o(v,O){var g,L=t.header?{}:[];for(g=0;g<v.length;g++){var w=g,_=v[g];t.header&&(w=g>=D.length?"__parsed_extra":D[g]),t.transform&&(_=t.transform(_,w)),_=x(w,_),w==="__parsed_extra"?(L[w]=L[w]||[],L[w].push(_)):L[w]=_}return t.header&&(g>D.length?A("FieldMismatch","TooManyFields","Too many fields: expected "+D.length+" fields but parsed "+g,C+O):g<D.length&&A("FieldMismatch","TooFewFields","Too few fields: expected "+D.length+" fields but parsed "+g,C+O)),L}var l=1;return!n.data.length||Array.isArray(n.data[0])?(n.data=n.data.map(o),l=n.data.length):n.data=o(n.data,0),t.header&&n.meta&&(n.meta.fields=D),C+=l,n}()}function I(){return t.header&&D.length===0}function x(o,l){return v=o,t.dynamicTypingFunction&&t.dynamicTyping[v]===void 0&&(t.dynamicTyping[v]=t.dynamicTypingFunction(v)),(t.dynamicTyping[v]||t.dynamicTyping)===!0?l==="true"||l==="TRUE"||l!=="false"&&l!=="FALSE"&&(function(O){if(d.test(O)){var g=parseFloat(O);if(f<g&&g<s)return!0}return!1}(l)?parseFloat(l):T.test(l)?new Date(l):l===""?null:l):l;var v}function A(o,l,v,O){var g={type:o,code:l,message:v};O!==void 0&&(g.row=O),n.errors.push(g)}this.parse=function(o,l,v){var O=t.quoteChar||'"';if(t.newline||(t.newline=function(w,_){w=w.substring(0,1048576);var q=new RegExp(ne(_)+"([^]*?)"+ne(_),"gm"),F=(w=w.replace(q,"")).split("\r"),j=w.split(`
`),W=1<j.length&&j[0].length<F[0].length;if(F.length===1||W)return`
`;for(var M=0,k=0;k<F.length;k++)F[k][0]===`
`&&M++;return M>=F.length/2?`\r
`:"\r"}(o,O)),i=!1,t.delimiter)p(t.delimiter)&&(t.delimiter=t.delimiter(o),n.meta.delimiter=t.delimiter);else{var g=function(w,_,q,F,j){var W,M,k,R;j=j||[",","	","|",";",h.RECORD_SEP,h.UNIT_SEP];for(var X=0;X<j.length;X++){var c=j[X],te=0,H=0,ee=0;k=void 0;for(var J=new de({comments:F,delimiter:c,newline:_,preview:10}).parse(w),V=0;V<J.data.length;V++)if(q&&S(J.data[V]))ee++;else{var G=J.data[V].length;H+=G,k!==void 0?0<G&&(te+=Math.abs(G-k),k=G):k=G}0<J.data.length&&(H/=J.data.length-ee),(M===void 0||te<=M)&&(R===void 0||R<H)&&1.99<H&&(M=te,W=c,R=H)}return{successful:!!(t.delimiter=W),bestDelimiter:W}}(o,t.newline,t.skipEmptyLines,t.comments,t.delimitersToGuess);g.successful?t.delimiter=g.bestDelimiter:(i=!0,t.delimiter=h.DefaultDelimiter),n.meta.delimiter=t.delimiter}var L=le(t);return t.preview&&t.header&&L.preview++,e=o,r=new de(L),n=r.parse(e,l,v),b(),u?{meta:{paused:!0}}:n||{meta:{paused:!1}}},this.paused=function(){return u},this.pause=function(){u=!0,r.abort(),e=p(t.chunk)?"":e.substring(r.getCharIndex())},this.resume=function(){E.streamer._halted?(u=!1,E.streamer.parseChunk(e,!0)):setTimeout(E.resume,3)},this.aborted=function(){return P},this.abort=function(){P=!0,r.abort(),n.meta.aborted=!0,p(t.complete)&&t.complete(n),e=""}}function ne(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function de(t){var e,r=(t=t||{}).delimiter,i=t.newline,s=t.comments,f=t.step,d=t.preview,T=t.fastMode,E=e=t.quoteChar===void 0||t.quoteChar===null?'"':t.quoteChar;if(t.escapeChar!==void 0&&(E=t.escapeChar),(typeof r!="string"||-1<h.BAD_DELIMITERS.indexOf(r))&&(r=","),s===r)throw new Error("Comment character same as delimiter");s===!0?s="#":(typeof s!="string"||-1<h.BAD_DELIMITERS.indexOf(s))&&(s=!1),i!==`
`&&i!=="\r"&&i!==`\r
`&&(i=`
`);var a=0,C=!1;this.parse=function(u,P,D){if(typeof u!="string")throw new Error("Input must be a string");var n=u.length,y=r.length,S=i.length,b=s.length,I=p(f),x=[],A=[],o=[],l=a=0;if(!u)return z();if(t.header&&!P){var v=u.split(i)[0].split(r),O=[],g={},L=!1;for(var w in v){var _=v[w];p(t.transformHeader)&&(_=t.transformHeader(_,w));var q=_,F=g[_]||0;for(0<F&&(L=!0,q=_+"_"+F),g[_]=F+1;O.includes(q);)q=q+"_"+F;O.push(q)}if(L){var j=u.split(i);j[0]=O.join(r),u=j.join(i)}}if(T||T!==!1&&u.indexOf(e)===-1){for(var W=u.split(i),M=0;M<W.length;M++){if(o=W[M],a+=o.length,M!==W.length-1)a+=i.length;else if(D)return z();if(!s||o.substring(0,b)!==s){if(I){if(x=[],ee(o.split(r)),he(),C)return z()}else ee(o.split(r));if(d&&d<=M)return x=x.slice(0,d),z(!0)}}return z()}for(var k=u.indexOf(r,a),R=u.indexOf(i,a),X=new RegExp(ne(E)+ne(e),"g"),c=u.indexOf(e,a);;)if(u[a]!==e)if(s&&o.length===0&&u.substring(a,a+b)===s){if(R===-1)return z();a=R+S,R=u.indexOf(i,a),k=u.indexOf(r,a)}else if(k!==-1&&(k<R||R===-1))o.push(u.substring(a,k)),a=k+y,k=u.indexOf(r,a);else{if(R===-1)break;if(o.push(u.substring(a,R)),G(R+S),I&&(he(),C))return z();if(d&&x.length>=d)return z(!0)}else for(c=a,a++;;){if((c=u.indexOf(e,c+1))===-1)return D||A.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:x.length,index:a}),V();if(c===n-1)return V(u.substring(a,c).replace(X,e));if(e!==E||u[c+1]!==E){if(e===E||c===0||u[c-1]!==E){k!==-1&&k<c+1&&(k=u.indexOf(r,c+1)),R!==-1&&R<c+1&&(R=u.indexOf(i,c+1));var te=J(R===-1?k:Math.min(k,R));if(u.substr(c+1+te,y)===r){o.push(u.substring(a,c).replace(X,e)),u[a=c+1+te+y]!==e&&(c=u.indexOf(e,a)),k=u.indexOf(r,a),R=u.indexOf(i,a);break}var H=J(R);if(u.substring(c+1+H,c+1+H+S)===i){if(o.push(u.substring(a,c).replace(X,e)),G(c+1+H+S),k=u.indexOf(r,a),c=u.indexOf(e,a),I&&(he(),C))return z();if(d&&x.length>=d)return z(!0);break}A.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:x.length,index:a}),c++}}else c++}return V();function ee(U){x.push(U),l=a}function J(U){var me=0;if(U!==-1){var ce=u.substring(c+1,U);ce&&ce.trim()===""&&(me=ce.length)}return me}function V(U){return D||(U===void 0&&(U=u.substring(a)),o.push(U),a=n,ee(o),I&&he()),z()}function G(U){a=U,ee(o),o=[],R=u.indexOf(i,a)}function z(U){return{data:x,errors:A,meta:{delimiter:r,linebreak:i,aborted:C,truncated:!!U,cursor:l+(P||0)}}}function he(){f(z()),x=[],A=[]}},this.abort=function(){C=!0},this.getCharIndex=function(){return a}}function ve(t){var e=t.data,r=N[e.workerId],i=!1;if(e.error)r.userError(e.error,e.file);else if(e.results&&e.results.data){var s={abort:function(){i=!0,ge(e.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:_e,resume:_e};if(p(r.userStep)){for(var f=0;f<e.results.data.length&&(r.userStep({data:e.results.data[f],errors:e.results.errors,meta:e.results.meta},s),!i);f++);delete e.results}else p(r.userChunk)&&(r.userChunk(e.results,s,e.file),delete e.results)}e.finished&&!i&&ge(e.workerId,e.results)}function ge(t,e){var r=N[t];p(r.userComplete)&&r.userComplete(e),r.terminate(),delete N[t]}function _e(){throw new Error("Not implemented.")}function le(t){if(typeof t!="object"||t===null)return t;var e=Array.isArray(t)?[]:{};for(var r in t)e[r]=le(t[r]);return e}function $(t,e){return function(){t.apply(e,arguments)}}function p(t){return typeof t=="function"}return Y&&(m.onmessage=function(t){var e=t.data;if(h.WORKER_ID===void 0&&e&&(h.WORKER_ID=e.workerId),typeof e.input=="string")m.postMessage({workerId:h.WORKER_ID,results:h.parse(e.input,e.config),finished:!0});else if(m.File&&e.input instanceof File||e.input instanceof Object){var r=h.parse(e.input,e.config);r&&m.postMessage({workerId:h.WORKER_ID,results:r,finished:!0})}}),(ae.prototype=Object.create(K.prototype)).constructor=ae,(oe.prototype=Object.create(K.prototype)).constructor=oe,(ie.prototype=Object.create(ie.prototype)).constructor=ie,(ue.prototype=Object.create(K.prototype)).constructor=ue,h})})(ye);const Ee=ye.exports;function be(Z){return fetch(Z).then(Q=>{if(!Q.ok)throw new Error(`CSV \uC77D\uAE30 \uC624\uB958: ${Q.status} ${Q.statusText}`);return Q.text()}).then(Q=>{const{data:se,errors:m}=Ee.parse(Q,{header:!0});if(console.log(Q),m.length>0){const Y=m.map(N=>N.message).join(`
`);throw new Error(`CSV \uD30C\uC2F1 \uC624\uB958:
${Y}`)}const B=new Map;return se.forEach(Y=>{var h;const{ORDER_DATE:N,CAR_NUM:fe}=Y;B.has(N)||B.set(N,[]),(h=B.get(N))==null||h.push(fe)}),B})}const Ce="./data.csv";be(Ce).then(Z=>{console.log(Z)}).catch(Z=>{console.error("CSV \uC77D\uAE30 \uC624\uB958:",Z)});
