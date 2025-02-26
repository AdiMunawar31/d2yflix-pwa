import { useEffect, useState } from "react";
import indexedDBHelper from "../db/indexedDB";
import { apiClient } from "../api/apiClient";

const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const cachedMovies = await indexedDBHelper.getMovies();

        if (cachedMovies.length > 0) {
          console.log("Using cached data from IndexedDB");
          setMovies(cachedMovies);
          setLoading(false);
        }

        const response = await apiClient.get("/discover/movie", {
          params: { sort_by: "popularity.desc" },
        });

        setMovies(response.data.results);
        indexedDBHelper.saveMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading };
};

export default useMovies;
