importScripts('./cache-helper.js');

const ASSETS_TO_CACHE = [
  './',
  '../index.html',
  './offline.html',
  './icons',
  './app.webmanifest',
  '../src/main.jsx',
  'https://image.tmdb.org/t/p/w342'
];

self.addEventListener('install', (event) => {
  console.log('🔹 Service Worker: Installing...');
  event.waitUntil(CacheHelper.cachingAppShell(ASSETS_TO_CACHE));
});

self.addEventListener('activate', (event) => {
  console.log('🔹 Service Worker: Activated');
  event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Cek apakah request adalah gambar dari TMDb
  if (request.url.includes('image.tmdb.org/t/p/')) {
    event.respondWith(
      caches.open('movie-images-cache').then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            console.log('📦 Serving cached image:', request.url);
            return cachedResponse; // Kembalikan gambar dari cache jika tersedia
          }

          return fetch(request)
            .then((networkResponse) => {
              cache.put(request, networkResponse.clone()); // Simpan gambar ke cache
              return networkResponse;
            })
            .catch(() => {
              console.log('⚠️ Image request failed, showing placeholder');
              return caches.match('/fallback-image.png'); // Gambar placeholder jika offline
            });
        });
      })
    );
    return;
  }

  // Default behavior untuk request lainnya
  event.respondWith(CacheHelper.revalidateCache(event.request));
});

// self.addEventListener('push', (event) => {
//   const data = event.data ? event.data.json() : {};
//   const title = data.title || "New Notification from D2YFLIX";
//   const options = {
//     body: data.body || "You have a new message!",
//     icon: "./icons/icon-192x192.png",
//     badge: "./icons/icon-192x192.png",
//     data: { url: data.url || "/" }
//   };

//   event.waitUntil(self.registration.showNotification(title, options));
// });

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("https://adi31.vercel.app") 
  );
});