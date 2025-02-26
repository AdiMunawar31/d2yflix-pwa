const CACHE_NAME = 'd2yflix-cache-v1';

const CacheHelper = {
  async cachingAppShell(requests) {
    const cache = await this._openCache();
    const validRequests = requests.filter((request) => 
      request.startsWith('http')
    ); 
    
    await cache.addAll(validRequests);
  },

  async deleteOldCache() {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames
        .filter((name) => name !== CACHE_NAME)
        .map((filteredName) => caches.delete(filteredName))
    );
  },

  async revalidateCache(request) {
    if (!request.url.startsWith('http')) return fetch(request); // Abaikan permintaan non-HTTP

    const response = await caches.match(request);
    if (response) {
      this._fetchAndUpdateCache(request);
      return response;
    }
    return this._fetchAndUpdateCache(request);
  },

  async _openCache() {
    return caches.open(CACHE_NAME);
  },

  async _fetchAndUpdateCache(request) {
    try {
      const response = await fetch(request);
      if (!response || response.status !== 200) return response;

      await this._addCache(request, response.clone());
      return response;
    } catch (error) {
      return caches.match(request) || Response.error();
    }
  },

  async _addCache(request, response) {
    if (!request.url.startsWith('http')) return;
    
    const cache = await this._openCache();
    await cache.put(request, response);
  }
};