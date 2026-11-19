const CACHE = "hello-v1";
const FILES = ["index.html", "manifest.json", "icon-192.png", "icon-512.png"];

// Install: save our files into the cache
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)));
});

// Fetch: serve from cache first, fall back to the network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});