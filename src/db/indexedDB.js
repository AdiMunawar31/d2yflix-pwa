import { openDB } from "idb";
import toast from "react-hot-toast";

const DB_NAME = "movieDatabase";
const STORE_MOVIES = "movies";
const STORE_MOVIE_DETAIL = "movies_detail";
const STORE_WATCHLIST_MOVIE = "watchlist_movie"

const dbPromise = openDB(DB_NAME, 2, { 
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_MOVIES)) {
      db.createObjectStore(STORE_MOVIES, { keyPath: "id" });
    }
    if (!db.objectStoreNames.contains(STORE_MOVIE_DETAIL)) {
      db.createObjectStore(STORE_MOVIE_DETAIL, { keyPath: "id" });
    }
    if (!db.objectStoreNames.contains(STORE_WATCHLIST_MOVIE)) {
      db.createObjectStore(STORE_WATCHLIST_MOVIE, { keyPath: "id" });
    }
  },
});

const indexedDBHelper = {
  async saveMovies(movies) {
    const db = await dbPromise;
    const tx = db.transaction(STORE_MOVIES, "readwrite");
    const store = tx.objectStore(STORE_MOVIES);
    movies.forEach((movie) => store.put(movie));
    await tx.done;
  },

  async getMovies() {
    const db = await dbPromise;
    return db.getAll(STORE_MOVIES);
  },

  async clearMovies() {
    const db = await dbPromise;
    return db.clear(STORE_MOVIES);
  },

  async saveMovieDetail(movie) {
    const db = await dbPromise;
    const tx = db.transaction(STORE_MOVIE_DETAIL, "readwrite");
    const store = tx.objectStore(STORE_MOVIE_DETAIL);
    store.put(movie);
    await tx.done;
  },

  async getMovieDetail(id) {
    const db = await dbPromise;
    return db.get(STORE_MOVIE_DETAIL, id);
  },
  
   async addWatchlist(movie) {
    const db = await dbPromise;
    const tx = db.transaction(STORE_WATCHLIST_MOVIE, "readwrite");
    const store = tx.objectStore(STORE_WATCHLIST_MOVIE);
    store.put(movie);
    await tx.done;

    toast.success(`${movie.title} Added to Watchlist!`);
  },
  
   async getAllWatchlists() {
    const db = await dbPromise;
    return db.getAll(STORE_WATCHLIST_MOVIE);
  },
  
   async removeWatchlist(id) {
    const db = await dbPromise;
    const tx = db.transaction(STORE_WATCHLIST_MOVIE, "readwrite");
    const store = tx.objectStore(STORE_WATCHLIST_MOVIE);
    store.delete(id);
    await tx.done;

    toast.error("Movie Removed from Watchlist.");
  },
};

export default indexedDBHelper;