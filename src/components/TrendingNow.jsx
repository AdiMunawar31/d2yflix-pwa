import React, { useEffect, useState } from "react";
import { apiClient } from "../api/apiClient";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w342";

const TrendingNow = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await apiClient.get("/discover/movie", {
          params: { sort_by: "popularity.desc" },
        });
        console.log("response data : ", response);

        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="text-white bg-black p-16">
      <h1 className="text-3xl font-bold">Trending Now</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {movies.slice(0, 8).map((movie) => (
          <div key={movie.id}>
            <div className="w-2 bg-gray-800" />
            <div
              className="overflow-hidden rounded-xl relative transform hover:-translate-y-2 transition ease-in-out duration-500 shadow-lg hover:shadow-2xl movie-item text-white movie-card"
              data-movie-id={movie.id}
            >
              <div className="absolute inset-0 z-10 transition duration-300 ease-in-out bg-gradient-to-t from-black via-gray-900 to-transparent" />
              <div
                className="relative cursor-pointer group z-10 px-10 pt-10 space-y-6 movie_info"
                data-lity
                href="https://www.youtube.com/embed/aSHs224Dge0"
              >
                <div className="poster__info align-self-end w-full">
                  <div className="h-32" />
                  <div className="space-y-6 detail_info">
                    <div className="flex flex-col space-y-2 inner">
                      <a
                        className="relative flex items-center w-min flex-shrink-0 p-1 text-center text-white bg-red-500 rounded-full group-hover:bg-red-700"
                        data-unsp-sanitized="clean"
                      >
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
                      </a>
                      <h3
                        className="text-2xl font-bold text-white w-44 sm:w-60 truncate"
                        data-unsp-sanitized="clean"
                      >
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
                        <div className="text-xs text-gray-400">
                          Release date:
                        </div>
                      </div>
                      <div className="hidden sm:flex flex-col px-2">
                        <div className="text-sm">{movie.vote_count}</div>
                        <div className="text-xs text-gray-400">Vote:</div>
                      </div>
                    </div>
                    <div className="flex flex-col overview">
                      <div className="flex flex-col" />
                      <div className="text-xs text-gray-400 mb-2">
                        Overview:
                      </div>
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
              />
              <div className="poster__footer flex flex-row relative pb-10 space-x-4 z-10">
                <a
                  className="flex items-center py-2 px-4 rounded-full mx-auto text-white bg-red-500 hover:bg-red-700"
                  href="#"
                  target="_blank"
                  data-unsp-sanitized="clean"
                >
                  <div className="text-sm text-white ml-2">Watch Now</div>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingNow;
