// service-worker.js

// Name of the cache
const CACHE_NAME = 'webapp-cache-v1';
// Files to cache for offline access
const FILES_TO_CACHE = [
    './index.html',
    './templates/videocall.html',
    './templates/home.html',
    './templates/editor.html',
    './styles/style.css',
    './js/videocall.js',
    './icons/icon-512x512.png'
];

// Install event - cache files for offline use
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event - serve files from cache when offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
