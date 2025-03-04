importScripts('./cache-helper.js');

const ASSETS_TO_CACHE = [
  './',
  '../index.html',
  './offline.html',
  './icons',
  './app.webmanifest',
  '../src/main.jsx',
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

self.addEventListener("push", (event) => {
  console.log("📩 Push event diterima:", event);
  
  let data;
  try {
    data = event.data ? event.data.json() : {};
  } catch (error) {
    console.error("❌ Error parsing push data:", error);
    data = { title: "D2YFLIX Notification", body: "Anda punya pesan baru!" };
  }

  const title = data.title || "D2YFLIX Notification";
  const options = {
    body: data.body || "Anda punya pesan baru!",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-192x192.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/") // Arahkan ke halaman utama saat diklik
  );
});