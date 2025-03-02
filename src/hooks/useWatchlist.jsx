import { useEffect, useState } from "react";
import indexedDBHelper from "../db/indexedDB";

export const useWatchlist = (movieId) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const fetchWatchlist = async () => {
      const storedWatchlist = await indexedDBHelper.getAllWatchlists();
      setIsInWatchlist(
        storedWatchlist.some((movie) => movie.id === parseInt(movieId, 10))
      );
    };
    fetchWatchlist();
  }, [movieId]);

  const toggleWatchlist = async (movie) => {
    if (isInWatchlist) {
      await indexedDBHelper.removeWatchlist(movie.id);
      setIsInWatchlist(false);
    } else {
      await indexedDBHelper.addWatchlist(movie);
      setIsInWatchlist(true);
    }
  };

  return { isInWatchlist, toggleWatchlist };
};
