// Minimal service worker — enables PWA installability
// No aggressive caching since app relies on real-time data
const CACHE = 'hk-parking-v1';
const SHELL = [
  '/hk-parking-vacancy/',
  '/hk-parking-vacancy/index.html',
  '/hk-parking-vacancy/list.html',
  '/hk-parking-vacancy/detail.html',
  '/hk-parking-vacancy/map.html',
  '/hk-parking-vacancy/app.js',
  '/hk-parking-vacancy/icon.svg',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Network-first: always try live data, fall back to cache for app shell
self.addEventListener('fetch', e => {
  // Skip non-GET and external requests (API, tiles, CDN)
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
