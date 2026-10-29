const C='shopingg-v9',F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const q=e.request,u=new URL(q.url);if(q.method!=='GET')return;
if(/(^|\.)fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)){e.respondWith(caches.match(q).then(r=>r||fetch(q).then(x=>{const c=x.clone();caches.open(C).then(k=>k.put(q,c));return x})));return}
if(u.origin!==location.origin)return;
e.respondWith(fetch(q).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(q,c));return r}).catch(()=>caches.match(q)))});
