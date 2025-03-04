import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import indexedDBHelper from "../db/indexedDB";
import { apiClient } from "../api/apiClient";
import {
  Star,
  Globe,
  Calendar,
  Clock,
  UsersRoundIcon,
  StarIcon,
  Share,
} from "lucide-react";
import { useWatchlist } from "../hooks/useWatchlist";
import WatchlistButton from "../components/WatchlistButton";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isInWatchlist, toggleWatchlist } = useWatchlist(id);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await apiClient.get(`movie/${id}`);
        if (response.status === 200) {
          setMovie(response.data);
          await indexedDBHelper.saveMovieDetail(response.data);
        } else {
          const cachedMovie = await indexedDBHelper.getMovieDetail(
            parseInt(id, 10)
          );
          if (cachedMovie) setMovie(cachedMovie);
        }
      } catch (error) {
        console.error("Failed to fetch movie:", error);
        const cachedMovie = await indexedDBHelper.getMovieDetail(
          parseInt(id, 10)
        );
        if (cachedMovie) setMovie(cachedMovie);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (!movie) return <p className="text-white text-center">Movie not found</p>;

  return (
    <div className="min-h-screen bg-black pt-10 text-white px-4 sm:px-6 lg:px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 bg-gray-900 rounded-xl shadow-xl border border-gray-800">
        {/* Movie Poster */}
        <div className="md:col-span-6 flex justify-center p-6">
          <img
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg shadow-lg border border-gray-700 w-full max-w-sm md:max-w-full"
            onError={(e) => (e.target.src = "/fallback-image.png")}
          />
        </div>

        {/* Movie Details */}
        <div className="md:col-span-6 p-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">{movie.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-300 text-lg">
            <span className="flex items-center">
              <Calendar size={20} className="mr-1" />{" "}
              {new Date(movie.release_date).getFullYear()}
            </span>
            <span className="flex items-center">
              <Clock size={20} className="mr-1" />{" "}
              {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min
            </span>
          </div>

          <span className="flex items-center mt-4 text-gray-400">
            <Globe size={20} className="mr-1" />{" "}
            {movie.spoken_languages.map((lang) => lang.english_name).join(", ")}
          </span>

          <div className="flex items-center text-yellow-400 font-semibold mt-4">
            <Star size={20} fill="#FDC800" className="mr-1" />{" "}
            {movie.vote_average.toFixed(1)}
          </div>

          <div className="flex items-center font-semibold mt-4 text-gray-300">
            <UsersRoundIcon size={20} className="mr-1" />{" "}
            {movie.popularity.toFixed(1)}
          </div>

          <p className="text-gray-300 mt-4 text-lg italic">“{movie.tagline}”</p>

          {/* Watchlist Button */}
          <WatchlistButton
            isInWatchlist={isInWatchlist}
            onToggle={() => toggleWatchlist(movie)}
          />

          {/* Movie Overview */}
          <div className="mt-6">
            <p className="text-gray-400">Overview:</p>
            <p className="text-white">{movie.overview}</p>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div>
              <p className="text-gray-400">Genres:</p>
              <p className="text-white">
                {movie.genres.map((g) => g.name).join(", ")}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Production Companies:</p>
              <p className="text-white">
                {movie.production_companies.map((c) => c.name).join(", ")}
              </p>
            </div>
          </div>

          {/* Official Website */}
          <div className="mt-6">
            <p className="text-gray-400">Official Website:</p>
            <a
              href={movie.homepage}
              className="text-blue-400 hover:text-blue-300 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              {movie.homepage}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-3 my-14">
        <div className="flex flex-col gap-4 bg-gray-900 rounded-lg p-4">
          {/* Profile and Rating */}
          <div className="flex justify justify-between">
            <div className="flex gap-2">
              <div className="w-7 h-7 text-center rounded-full bg-red-500">
                J
              </div>
              <span>Jess Hopkins</span>
            </div>
          </div>
          <div>
            Gorgeous design! Even more responsive than the previous version. A
            pleasure to use!
          </div>
          <div className="flex justify-between">
            <span>Feb 13, 2021</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
