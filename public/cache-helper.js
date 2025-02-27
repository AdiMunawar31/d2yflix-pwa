const CACHE_NAME = 'd2yflix-cache-v1';

const CacheHelper = {
  async cachingAppShell(requests) {
    const cache = await this._openCache();
    const validRequests = requests.filter((request) => request.startsWith('./'));
    console.log('✅ Caching assets:', validRequests);
    await cache.addAll(validRequests);
  },

  async deleteOldCache() {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames
        .filter((name) => name !== CACHE_NAME)
        .map((oldCache) => {
          console.log(`🗑 Deleting old cache: ${oldCache}`);
          return caches.delete(oldCache);
        })
    );
  },

  async revalidateCache(request) {
    if (!request.url.startsWith('http')) return fetch(request); // Abaikan non-HTTP request

    const cache = await this._openCache();
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      this._fetchAndUpdateCache(request);
      return cachedResponse;
    }

    return this._fetchAndUpdateCache(request);
  },

  async _openCache() {
    return caches.open(CACHE_NAME);
  },

  async _fetchAndUpdateCache(request) {
    try {
      const response = await fetch(request);
      if (!response || response.status !== 200) throw new Error("Fetch failed");

      await this._addCache(request, response.clone());
      return response;
    } catch (error) {
      console.warn("⚠️ Network error, serving from cache if available.");
      return caches.match(request) || caches.match('./offline.html');
    }
  },

  async _addCache(request, response) {
    if (!request.url.startsWith('http')) return;
    
    const cache = await this._openCache();
    await cache.put(request, response);
  }
};