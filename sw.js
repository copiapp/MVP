const C='copi-v6',SHELL=['./','index.html','config.js','manifest.webmanifest','logo-claro.png','logo-oscuro.png','favicon.ico','mascota-hello.png','copi-sil.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)).catch(()=>{}))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
const put=(r,x)=>{if(x&&x.ok)caches.open(C).then(c=>c.put(r,x.clone()));return x};
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 const code=r.mode==='navigate'||/\.(html|js)$/.test(new URL(r.url).pathname);
 if(code){/* código: red primero (siempre la última versión), pero si tarda más de 3 s sale del caché */
  e.respondWith(new Promise(ok=>{const t=setTimeout(()=>caches.match(r).then(m=>m&&ok(m)),3000);fetch(r).then(x=>{clearTimeout(t);ok(put(r,x))}).catch(()=>{clearTimeout(t);caches.match(r).then(m=>ok(m||Response.error()))})}));return}
 /* imágenes y demás: caché primero, y se actualiza en segundo plano */
 e.respondWith(caches.match(r).then(m=>{const n=fetch(r).then(x=>put(r,x)).catch(()=>m);return m||n}))});
