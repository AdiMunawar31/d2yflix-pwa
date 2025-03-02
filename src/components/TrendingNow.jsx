import React from "react";
import useMovies from "../hooks/useMovies";
import MovieCard from "./MovieCard";

const TrendingNow = () => {
  const { movies, loading, error } = useMovies();

  if (loading) {
    return <p className="text-white text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-white text-center">Error...</p>;
  }

  return (
    <div className="text-white bg-black p-16">
      <h1 className="text-3xl font-bold">Trending Now</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {movies.slice(0, 8).map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default TrendingNow;
