const CACHE = "doorcode-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});
self.addEventListener("fetch", (e) => {
  const { request } = e;
  const isHTML = request.headers.get("accept")?.includes("text/html");
  e.respondWith(
    (async () => {
      if (isHTML) {
        try {
          const net = await fetch(request);
          const cache = await caches.open(CACHE);
          cache.put(request, net.clone());
          return net;
        } catch {
          const cached = await caches.match(request);
          return cached || new Response("Offline", { status: 503 });
        }
      } else {
        const cached = await caches.match(request);
        return cached || fetch(request);
      }
    })()
  );
});
