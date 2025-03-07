import { Heart, HeartIcon, HeartOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import indexedDBHelper from "../db/indexedDB";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }) => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      const storedWatchlist = await indexedDBHelper.getAllWatchlists();
      setWatchlist(storedWatchlist.map((movie) => movie.id));
    };

    fetchWatchlist();
  }, []);

  const toggleWatchlist = async (movie) => {
    if (watchlist.includes(movie.id)) {
      await indexedDBHelper.removeWatchlist(movie.id);
      setWatchlist((prev) => prev.filter((id) => id !== movie.id));
    } else {
      await indexedDBHelper.addWatchlist(movie);
      setWatchlist((prev) => [...prev, movie.id]);
    }
  };

  return (
    <div key={movie.id}>
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="w-2 bg-gray-800" />
        <div
          className="overflow-hidden rounded-xl relative transform hover:-translate-y-2 transition ease-in-out duration-500 shadow-lg hover:shadow-2xl movie-item text-white movie-card"
          data-movie-id={movie.id}
        >
          <div className="absolute inset-0 z-10 transition duration-300 ease-in-out bg-gradient-to-t from-black via-gray-900 to-transparent" />
          <div className="relative cursor-pointer group z-10 px-10 pt-10 space-y-6 movie_info">
            <div className="poster__info align-self-end w-full">
              <div className="h-32" />
              <div className="space-y-6 detail_info">
                <div className="flex flex-col space-y-2 inner">
                  <button className="relative flex items-center w-min flex-shrink-0 p-1 text-center text-white bg-red-500 rounded-full group-hover:bg-red-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM9.555 7.168A1 1 0 0 0 8 8v4a1 1 0 0 0 1.555.832l3-2a1 1 0 0 0 0-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="absolute transition opacity-0 duration-500 ease-in-out transform group-hover:opacity-100 group-hover:translate-x-16 text-xl font-bold text-white group-hover:pr-2">
                      Trailer
                    </div>
                  </button>
                  <h3 className="text-2xl font-bold text-white w-44 sm:w-60 truncate">
                    {movie.title}
                  </h3>
                  <div className="mb-0 text-lg text-gray-400">
                    Beyond fear, destiny awaits.
                  </div>
                </div>
                <div className="flex flex-row justify-between ">
                  <div className="flex flex-col px-2">
                    <div className="text-sm">{movie.popularity}</div>
                    <div className="text-xs text-gray-400">Popularity:</div>
                  </div>
                  <div className="flex flex-col px-2">
                    <div className="text-sm">{movie.release_date}</div>
                    <div className="text-xs text-gray-400">Release date:</div>
                  </div>
                  <div className="hidden sm:flex flex-col px-2">
                    <div className="text-sm">{movie.vote_count}</div>
                    <div className="text-xs text-gray-400">Vote:</div>
                  </div>
                </div>
                <div className="flex flex-col overview">
                  <div className="flex flex-col" />
                  <div className="text-xs text-gray-400 mb-2">Overview:</div>
                  <p className="text-xs text-gray-100 mb-6">
                    {movie.overview.slice(0, 100)}...
                  </p>
                </div>
              </div>
            </div>
          </div>
          <img
            className="absolute inset-0 transform w-full -translate-y-4"
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            style={{ filter: "grayscale(0)" }}
            onError={(e) => (e.target.src = "/public/fallback-image.png")}
          />
        </div>
      </Link>
      <div className="poster__footer flex flex-row relative pb-10 space-x-4 z-10">
        <div className="flex items-center justify-center mx-auto">
          <button className="text-sm py-2 px-4 rounded-full mr-4 text-white bg-red-500 hover:bg-red-700">
            Watch Now
          </button>
          <button
            className="py-2 px-4 ml-4 text-white bg-gray-800 hover:bg-gray-700 p-2 rounded-full"
            onClick={() => toggleWatchlist(movie)}
          >
            {watchlist.includes(movie.id) ? (
              <Heart fill="#FA2C37" size={24} />
            ) : (
              <HeartIcon className="text-white" size={24} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
