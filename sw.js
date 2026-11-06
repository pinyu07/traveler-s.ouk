// 離線快取：有網路時照常更新，沒網路時改用上次存下的版本
const C='trip-cache-v1';
const HOSTS=['cdn.tailwindcss.com','cdnjs.cloudflare.com','fonts.googleapis.com','fonts.gstatic.com'];
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{
 const r=e.request,u=new URL(r.url);
 if(r.method!=='GET')return;
 if(u.origin===location.origin||HOSTS.includes(u.hostname)){
  e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(C).then(x=>x.put(r,c));return res}).catch(()=>caches.match(r,{ignoreSearch:true})))}});
