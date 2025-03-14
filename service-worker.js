const CACHE_NAME = 'campus-navigation-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/location3.png',
  '/crane.gif',
  '/flag.png',
  '/images/bg15.jpg',
  '/images/bg12.jpg',
  '/images/gate.jpg',
  '/images/Parking Lot.JPG',
  '/images/Admin Block.JPG',
  '/images/Staffroom.JPG',
  '/images/Tuition Block.JPG',
  '/images/Laboratories.JPG',
  '/images/Male Hostel.JPG',
  '/images/Female Hostel.JPG',
  '/images/Cafeteria.JPG',
  '/images/Mosque.JPG',
  '/images/Ablution Block.JPG',
  '/images/L_Block.JPG',
  '/images/Library.JPG',
  '/images/NTC.JPG',
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
