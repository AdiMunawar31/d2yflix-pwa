import { openDB } from "idb";

const DB_NAME = "movieDatabase";
const STORE_NAME = "movies";

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: "id" });
    }
  },
});

const indexedDBHelper = {
  async saveMovies(movies) {
    const db = await dbPromise;
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    movies.forEach((movie) => store.put(movie));
    await tx.done;
  },

  async getMovies() {
    const db = await dbPromise;
    return db.getAll(STORE_NAME);
  },

  async clearMovies() {
    const db = await dbPromise;
    return db.clear(STORE_NAME);
  },
};

export default indexedDBHelper;