const CACHE = "hello-v1";
const FILES = ["index.html", "manifest.json", "images/icon-192.png", "images/icon-512.png"];

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

// Activate: delete if old cache is outdated
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});