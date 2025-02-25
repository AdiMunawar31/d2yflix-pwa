importScripts('./cache-helper.js');

const ASSETS_TO_CACHE = [
  './',
  '../index.html',
  './offline.html',
  './app.webmanifest',
  '../src/main.jsx'
];

self.addEventListener('install', (event) => {
  event.waitUntil(CacheHelper.cachingAppShell([...ASSETS_TO_CACHE]));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request));
});