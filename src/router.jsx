import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

const Router = () => (
  <>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/movie-search-pwa/search" element={<Search />} />
      <Route path="/movie-search-pwa/favorite" element={<Favorite />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

export default Router;