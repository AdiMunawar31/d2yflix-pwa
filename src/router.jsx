import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import WatchlistMovie from "./pages/WatchlistMovie";

const Router = () => (
  <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/*" element={<NotFound />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="/watchlist" element={<WatchlistMovie />} />
    </Routes>
  </>
);

export default Router;
