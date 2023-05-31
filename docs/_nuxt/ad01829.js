/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{428:function(t,e,n){"use strict";var r=n(429);e.a=r.a},443:function(t,e,n){"use strict";n.d(e,"a",(function(){return Ut})),n.d(e,"b",(function(){return Nt})),n.d(e,"c",(function(){return Dt})),n.d(e,"d",(function(){return St})),n.d(e,"e",(function(){return Ct}));var r=n(131),o=n(36),l=n(108);const c="firebasestorage.googleapis.com",h="storageBucket";class d extends o.c{constructor(code,t,e=0){super(m(code),`Firebase Storage: ${t} (${m(code)})`),this.status_=e,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,d.prototype)}get status(){return this.status_}set status(t){this.status_=t}_codeEquals(code){return m(code)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(t){this.customData.serverResponse=t,this.customData.serverResponse?this.message=`${this._baseMessage}\n${this.customData.serverResponse}`:this.message=this._baseMessage}}var f,_;function m(code){return"storage/"+code}function v(){return new d(f.UNKNOWN,"An unknown error occurred, please check the error payload for server response.")}function w(){return new d(f.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function y(){return new d(f.CANCELED,"User canceled the upload/download.")}function O(){return new d(f.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function R(t){return new d(f.INVALID_ARGUMENT,t)}function T(){return new d(f.APP_DELETED,"The Firebase app was deleted.")}function E(t,e){return new d(f.INVALID_FORMAT,"String does not match format '"+t+"': "+e)}function x(t){throw new d(f.INTERNAL_ERROR,"Internal error: "+t)}!function(t){t.UNKNOWN="unknown",t.OBJECT_NOT_FOUND="object-not-found",t.BUCKET_NOT_FOUND="bucket-not-found",t.PROJECT_NOT_FOUND="project-not-found",t.QUOTA_EXCEEDED="quota-exceeded",t.UNAUTHENTICATED="unauthenticated",t.UNAUTHORIZED="unauthorized",t.UNAUTHORIZED_APP="unauthorized-app",t.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",t.INVALID_CHECKSUM="invalid-checksum",t.CANCELED="canceled",t.INVALID_EVENT_NAME="invalid-event-name",t.INVALID_URL="invalid-url",t.INVALID_DEFAULT_BUCKET="invalid-default-bucket",t.NO_DEFAULT_BUCKET="no-default-bucket",t.CANNOT_SLICE_BLOB="cannot-slice-blob",t.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",t.NO_DOWNLOAD_URL="no-download-url",t.INVALID_ARGUMENT="invalid-argument",t.INVALID_ARGUMENT_COUNT="invalid-argument-count",t.APP_DELETED="app-deleted",t.INVALID_ROOT_OPERATION="invalid-root-operation",t.INVALID_FORMAT="invalid-format",t.INTERNAL_ERROR="internal-error",t.UNSUPPORTED_ENVIRONMENT="unsupported-environment"}(f||(f={}));class k{constructor(t,path){this.bucket=t,this.path_=path}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){const t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o/"+t(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(t,e){let n;try{n=k.makeFromUrl(t,e)}catch(e){return new k(t,"")}if(""===n.path)return n;throw r=t,new d(f.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+r+"'.");var r}static makeFromUrl(t,e){let n=null;const r="([A-Za-z0-9.\\-_]+)";const o=new RegExp("^gs://"+r+"(/(.*))?$","i");function l(t){t.path_=decodeURIComponent(t.path)}const h=e.replace(/[.]/g,"\\."),_=[{regex:o,indices:{bucket:1,path:3},postModify:function(t){"/"===t.path.charAt(t.path.length-1)&&(t.path_=t.path_.slice(0,-1))}},{regex:new RegExp(`^https?://${h}/v[A-Za-z0-9_]+/b/${r}/o(/([^?#]*).*)?$`,"i"),indices:{bucket:1,path:3},postModify:l},{regex:new RegExp(`^https?://${e===c?"(?:storage.googleapis.com|storage.cloud.google.com)":e}/${r}/([^?#]*)`,"i"),indices:{bucket:1,path:2},postModify:l}];for(let i=0;i<_.length;i++){const e=_[i],r=e.regex.exec(t);if(r){const t=r[e.indices.bucket];let o=r[e.indices.path];o||(o=""),n=new k(t,o),e.postModify(n);break}}if(null==n)throw function(t){return new d(f.INVALID_URL,"Invalid URL '"+t+"'.")}(t);return n}}class A{constructor(t){this.promise_=Promise.reject(t)}getPromise(){return this.promise_}cancel(t=!1){}}function I(p){return"string"==typeof p||p instanceof String}function C(p){return N()&&p instanceof Blob}function N(){return"undefined"!=typeof Blob&&!Object(o.l)()}function U(t,e,n,r){if(r<e)throw R(`Invalid value for '${t}'. Expected ${e} or greater.`);if(r>n)throw R(`Invalid value for '${t}'. Expected ${n} or less.`)}function S(t,e,n){let r=e;return null==n&&(r=`https://${e}`),`${n}://${r}/v0${t}`}function D(t){const e=encodeURIComponent;let n="?";for(const r in t)if(t.hasOwnProperty(r)){n=n+(e(r)+"="+e(t[r]))+"&"}return n=n.slice(0,-1),n}function P(t,e){const n=t>=500&&t<600,r=-1!==[408,429].indexOf(t),o=-1!==e.indexOf(t);return n||r||o}!function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"}(_||(_={}));class L{constructor(t,e,n,r,o,l,c,h,d,f,_,m=!0){this.url_=t,this.method_=e,this.headers_=n,this.body_=r,this.successCodes_=o,this.additionalRetryCodes_=l,this.callback_=c,this.errorCallback_=h,this.timeout_=d,this.progressCallback_=f,this.connectionFactory_=_,this.retry=m,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise(((t,e)=>{this.resolve_=t,this.reject_=e,this.start_()}))}start_(){const t=(t,e)=>{if(e)return void t(!1,new j(!1,null,!0));const n=this.connectionFactory_();this.pendingConnection_=n;const r=t=>{const e=t.loaded,n=t.lengthComputable?t.total:-1;null!==this.progressCallback_&&this.progressCallback_(e,n)};null!==this.progressCallback_&&n.addUploadProgressListener(r),n.send(this.url_,this.method_,this.body_,this.headers_).then((()=>{null!==this.progressCallback_&&n.removeUploadProgressListener(r),this.pendingConnection_=null;const e=n.getErrorCode()===_.NO_ERROR,o=n.getStatus();if(!e||P(o,this.additionalRetryCodes_)&&this.retry){const e=n.getErrorCode()===_.ABORT;return void t(!1,new j(!1,null,e))}const l=-1!==this.successCodes_.indexOf(o);t(!0,new j(l,n))}))},e=(t,e)=>{const n=this.resolve_,r=this.reject_,o=e.connection;if(e.wasSuccessCode)try{const t=this.callback_(o,o.getResponse());void 0!==t?n(t):n()}catch(t){r(t)}else if(null!==o){const t=v();t.serverResponse=o.getErrorText(),this.errorCallback_?r(this.errorCallback_(o,t)):r(t)}else if(e.canceled){r(this.appDelete_?T():y())}else{r(w())}};this.canceled_?e(0,new j(!1,null,!0)):this.backoffId_=function(t,e,n){let r=1,o=null,l=null,c=!1,h=0;function d(){return 2===h}let f=!1;function _(...t){f||(f=!0,e.apply(null,t))}function m(e){o=setTimeout((()=>{o=null,t(w,d())}),e)}function v(){l&&clearTimeout(l)}function w(t,...e){if(f)return void v();if(t)return v(),void _.call(null,t,...e);if(d()||c)return v(),void _.call(null,t,...e);let n;r<64&&(r*=2),1===h?(h=2,n=0):n=1e3*(r+Math.random()),m(n)}let y=!1;function O(t){y||(y=!0,v(),f||(null!==o?(t||(h=2),clearTimeout(o),m(0)):t||(h=1)))}return m(0),l=setTimeout((()=>{c=!0,O(!0)}),n),O}(t,e,this.timeout_)}getPromise(){return this.promise_}cancel(t){this.canceled_=!0,this.appDelete_=t||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingConnection_&&this.pendingConnection_.abort()}}class j{constructor(t,e,n){this.wasSuccessCode=t,this.connection=e,this.canceled=!!n}}function B(){return"undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof WebKitBlobBuilder?WebKitBlobBuilder:void 0}function V(...t){const e=B();if(void 0!==e){const n=new e;for(let i=0;i<t.length;i++)n.append(t[i]);return n.getBlob()}if(N())return new Blob(t);throw new d(f.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}function $(t){if("undefined"==typeof atob)throw e="base-64",new d(f.UNSUPPORTED_ENVIRONMENT,`${e} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`);var e;return atob(t)}const F={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class z{constructor(data,t){this.data=data,this.contentType=t||null}}function M(t,e){switch(t){case F.RAW:return new z(H(e));case F.BASE64:case F.BASE64URL:return new z(W(t,e));case F.DATA_URL:return new z(function(t){const e=new K(t);return e.base64?W(F.BASE64,e.rest):function(t){let e;try{e=decodeURIComponent(t)}catch(t){throw E(F.DATA_URL,"Malformed data URL.")}return H(e)}(e.rest)}(e),new K(e).contentType)}throw v()}function H(t){const b=[];for(let i=0;i<t.length;i++){let e=t.charCodeAt(i);if(e<=127)b.push(e);else if(e<=2047)b.push(192|e>>6,128|63&e);else if(55296==(64512&e)){if(i<t.length-1&&56320==(64512&t.charCodeAt(i+1))){e=65536|(1023&e)<<10|1023&t.charCodeAt(++i),b.push(240|e>>18,128|e>>12&63,128|e>>6&63,128|63&e)}else b.push(239,191,189)}else 56320==(64512&e)?b.push(239,191,189):b.push(224|e>>12,128|e>>6&63,128|63&e)}return new Uint8Array(b)}function W(t,e){switch(t){case F.BASE64:{const n=-1!==e.indexOf("-"),r=-1!==e.indexOf("_");if(n||r){throw E(t,"Invalid character '"+(n?"-":"_")+"' found: is it base64url encoded?")}break}case F.BASE64URL:{const n=-1!==e.indexOf("+"),r=-1!==e.indexOf("/");if(n||r){throw E(t,"Invalid character '"+(n?"+":"/")+"' found: is it base64 encoded?")}e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=$(e)}catch(e){if(e.message.includes("polyfill"))throw e;throw E(t,"Invalid character found")}const r=new Uint8Array(n.length);for(let i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return r}class K{constructor(t){this.base64=!1,this.contentType=null;const e=t.match(/^data:([^,]+)?,/);if(null===e)throw E(F.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const n=e[1]||null;null!=n&&(this.base64=function(s,t){if(!(s.length>=t.length))return!1;return s.substring(s.length-t.length)===t}(n,";base64"),this.contentType=this.base64?n.substring(0,n.length-7):n),this.rest=t.substring(t.indexOf(",")+1)}}class X{constructor(data,t){let e=0,n="";C(data)?(this.data_=data,e=data.size,n=data.type):data instanceof ArrayBuffer?(t?this.data_=new Uint8Array(data):(this.data_=new Uint8Array(data.byteLength),this.data_.set(new Uint8Array(data))),e=this.data_.length):data instanceof Uint8Array&&(t?this.data_=data:(this.data_=new Uint8Array(data.length),this.data_.set(data)),e=data.length),this.size_=e,this.type_=n}size(){return this.size_}type(){return this.type_}slice(t,e){if(C(this.data_)){const n=function(t,e,n){return t.webkitSlice?t.webkitSlice(e,n):t.mozSlice?t.mozSlice(e,n):t.slice?t.slice(e,n):null}(this.data_,t,e);return null===n?null:new X(n)}{const n=new Uint8Array(this.data_.buffer,t,e-t);return new X(n,!0)}}static getBlob(...t){if(N()){const e=t.map((t=>t instanceof X?t.data_:t));return new X(V.apply(null,e))}{const e=t.map((t=>I(t)?M(F.RAW,t).data:t.data_));let n=0;e.forEach((t=>{n+=t.byteLength}));const r=new Uint8Array(n);let o=0;return e.forEach((t=>{for(let i=0;i<t.length;i++)r[o++]=t[i]})),new X(r,!0)}}uploadData(){return this.data_}}function Z(s){let t;try{t=JSON.parse(s)}catch(t){return null}return"object"!=typeof(p=t)||Array.isArray(p)?null:t;var p}function G(path){const t=path.lastIndexOf("/",path.length-2);return-1===t?path:path.slice(t+1)}function J(t,e){return e}class Y{constructor(t,e,n,r){this.server=t,this.local=e||t,this.writable=!!n,this.xform=r||J}}let Q=null;function tt(){if(Q)return Q;const t=[];t.push(new Y("bucket")),t.push(new Y("generation")),t.push(new Y("metageneration")),t.push(new Y("name","fullPath",!0));const e=new Y("name");e.xform=function(t,e){return function(t){return!I(t)||t.length<2?t:G(t)}(e)},t.push(e);const n=new Y("size");return n.xform=function(t,e){return void 0!==e?Number(e):e},t.push(n),t.push(new Y("timeCreated")),t.push(new Y("updated")),t.push(new Y("md5Hash",null,!0)),t.push(new Y("cacheControl",null,!0)),t.push(new Y("contentDisposition",null,!0)),t.push(new Y("contentEncoding",null,!0)),t.push(new Y("contentLanguage",null,!0)),t.push(new Y("contentType",null,!0)),t.push(new Y("metadata","customMetadata",!0)),Q=t,Q}function et(t,e,n){const r={type:"file"},o=n.length;for(let i=0;i<o;i++){const t=n[i];r[t.local]=t.xform(r,e[t.server])}return function(t,e){Object.defineProperty(t,"ref",{get:function(){const n=t.bucket,path=t.fullPath,r=new k(n,path);return e._makeStorageReference(r)}})}(r,t),r}function nt(t,e,n){const r=Z(e);if(null===r)return null;return et(t,r,n)}function it(t,e){const n={},r=e.length;for(let i=0;i<r;i++){const r=e[i];r.writable&&(n[r.server]=t[r.local])}return JSON.stringify(n)}class ot{constructor(t,e,n,r){this.url=t,this.method=e,this.handler=n,this.timeout=r,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}function st(t){if(!t)throw v()}function at(t,e){return function(n,text){const r=nt(t,text,e);return st(null!==r),r}}function lt(t,e){return function(n,text){const r=nt(t,text,e);return st(null!==r),function(t,e,n,r){const o=Z(e);if(null===o)return null;if(!I(o.downloadTokens))return null;const l=o.downloadTokens;if(0===l.length)return null;const c=encodeURIComponent;return l.split(",").map((e=>{const o=t.bucket,path=t.fullPath;return S("/b/"+c(o)+"/o/"+c(path),n,r)+D({alt:"media",token:e})}))[0]}(r,text,t.host,t._protocol)}}function ut(t){return function(e,n){let r;var path,o;return 401===e.getStatus()?r=e.getErrorText().includes("Firebase App Check token is invalid")?new d(f.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project."):new d(f.UNAUTHENTICATED,"User is not authenticated, please authenticate using Firebase Authentication and try again."):402===e.getStatus()?(o=t.bucket,r=new d(f.QUOTA_EXCEEDED,"Quota for bucket '"+o+"' exceeded, please view quota on https://firebase.google.com/pricing/.")):403===e.getStatus()?(path=t.path,r=new d(f.UNAUTHORIZED,"User does not have permission to access '"+path+"'.")):r=n,r.status=e.getStatus(),r.serverResponse=n.serverResponse,r}}function ct(t){const e=ut(t);return function(n,r){let o=e(n,r);var path;return 404===n.getStatus()&&(path=t.path,o=new d(f.OBJECT_NOT_FOUND,"Object '"+path+"' does not exist.")),o.serverResponse=r.serverResponse,o}}function ht(t,e,n){const r=Object.assign({},n);return r.fullPath=t.path,r.size=e.size(),r.contentType||(r.contentType=function(t,e){return t&&t.contentType||e&&e.type()||"application/octet-stream"}(null,e)),r}function pt(t,e,n,r,o){const l=e.bucketOnlyServerUrl(),c={"X-Goog-Upload-Protocol":"multipart"};const h=function(){let t="";for(let i=0;i<2;i++)t+=Math.random().toString().slice(2);return t}();c["Content-Type"]="multipart/related; boundary="+h;const d=ht(e,r,o),f="--"+h+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+it(d,n)+"\r\n--"+h+"\r\nContent-Type: "+d.contentType+"\r\n\r\n",_="\r\n--"+h+"--",body=X.getBlob(f,r,_);if(null===body)throw O();const m={name:d.fullPath},v=S(l,t.host,t._protocol),w=t.maxUploadRetryTime,y=new ot(v,"POST",at(t,n),w);return y.urlParams=m,y.headers=c,y.body=body.uploadData(),y.errorHandler=ut(e),y}let ft=null;class _t{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=_.NO_ERROR,this.sendPromise_=new Promise((t=>{this.xhr_.addEventListener("abort",(()=>{this.errorCode_=_.ABORT,t()})),this.xhr_.addEventListener("error",(()=>{this.errorCode_=_.NETWORK_ERROR,t()})),this.xhr_.addEventListener("load",(()=>{t()}))}))}send(t,e,body,n){if(this.sent_)throw x("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(e,t,!0),void 0!==n)for(const t in n)n.hasOwnProperty(t)&&this.xhr_.setRequestHeader(t,n[t].toString());return void 0!==body?this.xhr_.send(body):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw x("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw x("cannot .getStatus() before sending");try{return this.xhr_.status}catch(t){return-1}}getResponse(){if(!this.sent_)throw x("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw x("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(header){return this.xhr_.getResponseHeader(header)}addUploadProgressListener(t){null!=this.xhr_.upload&&this.xhr_.upload.addEventListener("progress",t)}removeUploadProgressListener(t){null!=this.xhr_.upload&&this.xhr_.upload.removeEventListener("progress",t)}}class gt extends _t{initXhr(){this.xhr_.responseType="text"}}function mt(){return ft?ft():new gt}class bt{constructor(t,e){this._service=t,this._location=e instanceof k?e:k.makeFromUrl(e,t.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(t,e){return new bt(t,e)}get root(){const t=new k(this._location.bucket,"");return this._newRef(this._service,t)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return G(this._location.path)}get storage(){return this._service}get parent(){const t=function(path){if(0===path.length)return null;const t=path.lastIndexOf("/");return-1===t?"":path.slice(0,t)}(this._location.path);if(null===t)return null;const e=new k(this._location.bucket,t);return new bt(this._service,e)}_throwIfRoot(t){if(""===this._location.path)throw function(t){return new d(f.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}(t)}}function vt(t,data,e){t._throwIfRoot("uploadBytes");const n=pt(t.storage,t._location,tt(),new X(data,!0),e);return t.storage.makeRequestWithTokens(n,mt).then((e=>({metadata:e,ref:t})))}function wt(t){t._throwIfRoot("getDownloadURL");const e=function(t,e,n){const r=S(e.fullServerUrl(),t.host,t._protocol),o=t.maxOperationRetryTime,l=new ot(r,"GET",lt(t,n),o);return l.errorHandler=ct(e),l}(t.storage,t._location,tt());return t.storage.makeRequestWithTokens(e,mt).then((t=>{if(null===t)throw new d(f.NO_DOWNLOAD_URL,"The given file does not have any download URLs.");return t}))}function yt(t){t._throwIfRoot("deleteObject");const e=function(t,e){const n=S(e.fullServerUrl(),t.host,t._protocol),r=t.maxOperationRetryTime,o=new ot(n,"DELETE",(function(t,e){}),r);return o.successCodes=[200,204],o.errorHandler=ct(e),o}(t.storage,t._location);return t.storage.makeRequestWithTokens(e,mt)}function Ot(t,e){const n=function(path,t){const e=t.split("/").filter((component=>component.length>0)).join("/");return 0===path.length?e:path+"/"+e}(t._location.path,e),r=new k(t._location.bucket,n);return new bt(t.storage,r)}function Rt(t,path){if(t instanceof xt){const e=t;if(null==e._bucket)throw new d(f.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+h+"' property when initializing the app?");const n=new bt(e,e._bucket);return null!=path?Rt(n,path):n}return void 0!==path?Ot(t,path):t}function Tt(t,e){if(e&&/^[A-Za-z]+:\/\//.test(e)){if(t instanceof xt)return new bt(t,e);throw R("To use ref(service, url), the first argument must be a Storage instance.")}return Rt(t,e)}function Et(t,e){const n=null==e?void 0:e[h];return null==n?null:k.makeFromBucketSpec(n,t)}class xt{constructor(t,e,n,r,o){this.app=t,this._authProvider=e,this._appCheckProvider=n,this._url=r,this._firebaseVersion=o,this._bucket=null,this._host=c,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,this._bucket=null!=r?k.makeFromBucketSpec(r,this._host):Et(this._host,this.app.options)}get host(){return this._host}set host(t){this._host=t,null!=this._url?this._bucket=k.makeFromBucketSpec(this._url,t):this._bucket=Et(t,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(time){U("time",0,Number.POSITIVE_INFINITY,time),this._maxUploadRetryTime=time}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(time){U("time",0,Number.POSITIVE_INFINITY,time),this._maxOperationRetryTime=time}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const t=this._authProvider.getImmediate({optional:!0});if(t){const e=await t.getToken();if(null!==e)return e.accessToken}return null}async _getAppCheckToken(){const t=this._appCheckProvider.getImmediate({optional:!0});if(t){return(await t.getToken()).token}return null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach((t=>t.cancel())),this._requests.clear()),Promise.resolve()}_makeStorageReference(t){return new bt(this,t)}_makeRequest(t,e,n,r,o=!0){if(this._deleted)return new A(T());{const l=function(t,e,n,r,o,l,c=!0){const h=D(t.urlParams),d=t.url+h,f=Object.assign({},t.headers);return function(t,e){e&&(t["X-Firebase-GMPID"]=e)}(f,e),function(t,e){null!==e&&e.length>0&&(t.Authorization="Firebase "+e)}(f,n),function(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(null!=e?e:"AppManager")}(f,l),function(t,e){null!==e&&(t["X-Firebase-AppCheck"]=e)}(f,r),new L(d,t.method,f,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,o,c)}(t,this._appId,n,r,e,this._firebaseVersion,o);return this._requests.add(l),l.getPromise().then((()=>this._requests.delete(l)),(()=>this._requests.delete(l))),l}}async makeRequestWithTokens(t,e){const[n,r]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(t,e,n,r).getPromise()}}const kt="@firebase/storage",At="0.11.2",It="storage";function Ct(t,data,e){return vt(t=Object(o.i)(t),data,e)}function Nt(t){return wt(t=Object(o.i)(t))}function Ut(t){return yt(t=Object(o.i)(t))}function St(t,e){return Tt(t=Object(o.i)(t),e)}function Dt(t=Object(r.e)(),e){t=Object(o.i)(t);const n=Object(r.b)(t,It).getImmediate({identifier:e}),l=Object(o.h)("storage");return l&&function(t,e,n,r={}){!function(t,e,n,r={}){t.host=`${e}:${n}`,t._protocol="http";const{mockUserToken:l}=r;l&&(t._overrideAuthToken="string"==typeof l?l:Object(o.e)(l,t.app.options.projectId))}(t,e,n,r)}(n,...l),n}function Pt(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),o=t.getProvider("auth-internal"),l=t.getProvider("app-check-internal");return new xt(n,o,l,e,r.a)}Object(r.c)(new l.a(It,Pt,"PUBLIC").setMultipleInstances(!0)),Object(r.g)(kt,At,""),Object(r.g)(kt,At,"esm2017")},454:function(t,e,n){var content=n(455);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(32).default)("735d40bc",content,!0,{sourceMap:!1})},455:function(t,e,n){var r=n(31)((function(i){return i[1]}));r.push([t.i,".theme--light.v-file-input .v-file-input__text{color:rgba(0,0,0,.87)}.theme--light.v-file-input .v-file-input__text--placeholder{color:rgba(0,0,0,.6)}.theme--light.v-file-input.v-input--is-disabled .v-file-input__text,.theme--light.v-file-input.v-input--is-disabled .v-file-input__text .v-file-input__text--placeholder{color:rgba(0,0,0,.38)}.theme--dark.v-file-input .v-file-input__text{color:#fff}.theme--dark.v-file-input .v-file-input__text--placeholder{color:hsla(0,0%,100%,.7)}.theme--dark.v-file-input.v-input--is-disabled .v-file-input__text,.theme--dark.v-file-input.v-input--is-disabled .v-file-input__text .v-file-input__text--placeholder{color:hsla(0,0%,100%,.5)}.v-file-input input[type=file]{left:0;max-width:0;opacity:0;pointer-events:none;position:absolute;width:0}.v-file-input .v-file-input__text{align-items:center;align-self:stretch;display:flex;flex-wrap:wrap;width:100%}.v-file-input .v-file-input__text.v-file-input__text--chips{flex-wrap:wrap}.v-file-input .v-file-input__text .v-chip{margin:4px}.v-file-input .v-text-field__slot{min-height:32px}.v-file-input.v-input--dense .v-text-field__slot{min-height:26px}.v-file-input.v-text-field--filled:not(.v-text-field--single-line) .v-file-input__text{padding-top:22px}.v-file-input.v-text-field--outlined .v-text-field__slot{padding:6px 0}.v-file-input.v-text-field--outlined.v-input--dense .v-text-field__slot{padding:3px 0}",""]),r.locals={},t.exports=r},511:function(t,e,n){"use strict";n(13),n(14),n(16),n(20),n(21);var r=n(430),o=n(2),l=n(15),c=(n(34),n(60),n(6),n(66),n(38),n(35),n(205),n(17),n(57),n(454),n(428)),h=n(441),d=n(1),f=n(8),_=n(75);function m(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function v(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=c.a.extend({name:"v-file-input",model:{prop:"value",event:"change"},props:{chips:Boolean,clearable:{type:Boolean,default:!0},counterSizeString:{type:String,default:"$vuetify.fileInput.counterSize"},counterString:{type:String,default:"$vuetify.fileInput.counter"},hideInput:Boolean,multiple:Boolean,placeholder:String,prependIcon:{type:String,default:"$file"},readonly:{type:Boolean,default:!1},showSize:{type:[Boolean,Number],default:!1,validator:function(t){return"boolean"==typeof t||[1e3,1024].includes(t)}},smallChips:Boolean,truncateLength:{type:[Number,String],default:22},type:{type:String,default:"file"},value:{default:void 0,validator:function(t){return Object(d.y)(t).every((function(t){return null!=t&&"object"===Object(l.a)(t)}))}}},computed:{classes:function(){return v(v({},c.a.options.computed.classes.call(this)),{},{"v-file-input":!0})},computedCounterValue:function(){var t=this.multiple&&this.lazyValue?this.lazyValue.length:this.lazyValue instanceof File?1:0;if(!this.showSize)return this.$vuetify.lang.t(this.counterString,t);var e=this.internalArrayValue.reduce((function(t,e){var n=e.size;return t+(void 0===n?0:n)}),0);return this.$vuetify.lang.t(this.counterSizeString,t,Object(d.q)(e,1024===this.base))},internalArrayValue:function(){return Object(d.y)(this.internalValue)},internalValue:{get:function(){return this.lazyValue},set:function(t){this.lazyValue=t,this.$emit("change",this.lazyValue)}},isDirty:function(){return this.internalArrayValue.length>0},isLabelActive:function(){return this.isDirty},text:function(){var t=this;return this.isDirty||!this.persistentPlaceholder&&!this.isFocused&&this.hasLabel?this.internalArrayValue.map((function(e){var n=e.name,r=void 0===n?"":n,o=e.size,l=void 0===o?0:o,c=t.truncateText(r);return t.showSize?"".concat(c," (").concat(Object(d.q)(l,1024===t.base),")"):c})):[this.placeholder]},base:function(){return"boolean"!=typeof this.showSize?this.showSize:void 0},hasChips:function(){return this.chips||this.smallChips}},watch:{readonly:{handler:function(t){!0===t&&Object(f.b)("readonly is not supported on <v-file-input>",this)},immediate:!0},value:function(t){var e=this.multiple?t:t?[t]:[];Object(d.i)(e,this.$refs.input.files)||(this.$refs.input.value="")}},methods:{clearableCallback:function(){this.internalValue=this.multiple?[]:null,this.$refs.input.value=""},genChips:function(){var t=this;return this.isDirty?this.text.map((function(text,e){return t.$createElement(h.a,{props:{small:t.smallChips},on:{"click:close":function(){var n=t.internalValue;n.splice(e,1),t.internalValue=n}}},[text])})):[]},genControl:function(){var t=c.a.options.methods.genControl.call(this);return this.hideInput&&(t.data.style=Object(_.b)(t.data.style,{display:"none"})),t},genInput:function(){var input=c.a.options.methods.genInput.call(this);return input.data.attrs.multiple=this.multiple,delete input.data.domProps.value,delete input.data.on.input,input.data.on.change=this.onInput,[this.genSelections(),input]},genPrependSlot:function(){var t=this;if(!this.prependIcon)return null;var e=this.genIcon("prepend",(function(){t.$refs.input.click()}));return this.genSlot("prepend","outer",[e])},genSelectionText:function(){var t=this.text.length;return t<2?this.text:this.showSize&&!this.counter?[this.computedCounterValue]:[this.$vuetify.lang.t(this.counterString,t)]},genSelections:function(){var t=this,e=[];return this.isDirty&&this.$scopedSlots.selection?this.internalArrayValue.forEach((function(n,r){t.$scopedSlots.selection&&e.push(t.$scopedSlots.selection({text:t.text[r],file:n,index:r}))})):e.push(this.hasChips&&this.isDirty?this.genChips():this.genSelectionText()),this.$createElement("div",{staticClass:"v-file-input__text",class:{"v-file-input__text--placeholder":this.placeholder&&!this.isDirty,"v-file-input__text--chips":this.hasChips&&!this.$scopedSlots.selection}},e)},genTextFieldSlot:function(){var t=this,e=c.a.options.methods.genTextFieldSlot.call(this);return e.data.on=v(v({},e.data.on||{}),{},{click:function(e){e.target&&"LABEL"===e.target.nodeName||t.$refs.input.click()}}),e},onInput:function(t){var e=Object(r.a)(t.target.files||[]);this.internalValue=this.multiple?e:e[0],this.initialValue=this.internalValue},onKeyDown:function(t){this.$emit("keydown",t)},truncateText:function(t){if(t.length<Number(this.truncateLength))return t;var e=Math.floor((Number(this.truncateLength)-1)/2);return"".concat(t.slice(0,e),"…").concat(t.slice(t.length-e))}}})}}]);