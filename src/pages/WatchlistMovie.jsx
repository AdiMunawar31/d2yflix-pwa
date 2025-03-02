import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import indexedDBHelper from "../db/indexedDB";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const WatchlistMovie = () => {
  const [watchlistMovie, setWatchlistMovies] = useState([]);

  useEffect(() => {
    const fetchWatchlists = async () => {
      const watchlists = await indexedDBHelper.getAllWatchlists();
      setWatchlistMovies(watchlists);
    };

    fetchWatchlists();
  }, []);

  const removeWatchlist = async (id) => {
    await indexedDBHelper.removeWatchlist(id);
    setWatchlistMovies((prev) => prev.filter((movie) => movie.id !== id));
  };

  return (
    <div className="min-h-screen bg-black mx-auto p-16">
      <h2 className="text-2xl font-bold text-white mb-4">Watchlist Movies</h2>
      {watchlistMovie.length === 0 ? (
        <p className="text-gray-100 text-center mt-60">
          No favorite movies yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {watchlistMovie.map((movie) => (
            <div key={movie.id} className="relative group">
              <Link to={`/movie/${movie.id}`}>
                <img
                  className="w-full rounded-lg shadow-md transition-transform transform group-hover:scale-105"
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  onError={(e) => (e.target.src = "/fallback-image.png")}
                />
              </Link>

              {/* Remove Favorite Button */}
              <button
                className="absolute top-2 right-2 bg-black/50 p-2 rounded-full"
                onClick={() => removeWatchlist(movie.id)}
              >
                <Heart fill="#FA2C37" className="text-white" size={24} />
              </button>

              <div className="text-white text-center mt-2">
                <h3 className="text-lg font-semibold truncate">
                  {movie.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchlistMovie;
