import { useState, useEffect } from "react";
import IndexedDBHelper from "../db/indexedDB";
import { apiClient } from "../api/apiClient";
import indexedDBHelper from "../db/indexedDB";

const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      console.log("isOnline : ", navigator.onLine);

      try {
        if (!navigator.onLine) {
          // Jika offline, ambil dari IndexedDB
          const offlineMovies = await IndexedDBHelper.getMovies();
          setMovies(offlineMovies);
          console.log("Menampilkan data dari IndexedDB (Offline Mode)");
        } else {
          // Jika online, fetch dari API
          const response = await apiClient.get(
            "discover/movie?sort_by=popularity.desc"
          );
          setMovies(response.data.results);

          // Simpan ke IndexedDB untuk penggunaan offline
          await IndexedDBHelper.clearMovies();
          indexedDBHelper.saveMovies(response.data.results);

          console.log("Data diupdate dari API");
        }
      } catch (err) {
        setError("Gagal memuat data.");
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
};

export default useMovies;
