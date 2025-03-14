const CACHE_NAME = 'campus-navigation-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/service-worker.js',
  '/location3.png',
  '/crane.gif',
  '/flag.png',
  '/bg15.jpg',
  '/bg12.jpg',
  '/gate.jpg',
  '/Parking Lot.JPG',
  '/Admin Block.JPG',
  '/Staffroom.JPG',
  '/Tuition Block.JPG',
  '/Laboratories.JPG',
  '/Male Hostel.JPG',
  '/Female Hostel.JPG',
  '/Cafeteria.JPG',
  '/Mosque1.jpg',
  '/Ablution Block1.jpg',
  '/L_Block.JPG',
  '/Library.JPG',
  '/NTC.JPG',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
  'https://unpkg.com/leaflet/dist/leaflet.css',
  'https://unpkg.com/leaflet/dist/leaflet.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
