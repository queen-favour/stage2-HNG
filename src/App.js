// App.js

import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import MovieDetails from "../src/components/MovieDetail";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;

