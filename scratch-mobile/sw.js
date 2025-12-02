// Simple service worker for offline shell
const CACHE = 'iscratch-shell-v1';
const FILES = [
  '.',
  '/index.html',
  '/manifest.json',
  '/sw.js'
];

// On install cache basic shell
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES)).then(()=>self.skipWaiting())
  );
});

// Activate
self.addEventListener('activate', evt => {
  evt.waitUntil(self.clients.claim());
});

// Fetch from cache-first, fallback to network
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cached => cached || fetch(evt.request).catch(()=>cached))
  );
});