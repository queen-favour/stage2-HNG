// components/Home.js
import "./Home.css";
import React, { useEffect, useState } from "react";
import MoviePoster from "./movie-poster";
import TopMovies from "./top-movie";
import Logo from "../asset/logo";
import SIgnIN from "../asset/signin";
import Search from "../asset/search";
import config from "../config";
import tv from "../asset/tv.png";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [val, setVal] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch(config.moviedbApiUrl, {
      headers: {
        "content-type": "application/json",
        Authorization: config.moviedbAuthToken,
      },
    }).then(async (res) => {
      if (!res.ok) {
        const errorRes = await res.json();
        setError(errorRes.message);
        setLoading(false);
      } else {
        const result = await res.json();
        const movieToSet = result.results.slice(0, 10);
        console.log(movieToSet[1]);
        setMovies(movieToSet);
        setLoading(false);
      }
    });
  }, []);

  const search = (event) => {
    event.preventDefault();
    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: config.moviedbAuthToken,
      },
    };
    fetch(config.moviedbApiUrl, options)
      .then((response) => response.json())
      .then((response) => {
        const result = response.results.slice(0, 10);
        setMovies(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    setShow(true);
  };

  return (
    <div className="w-full relative">
      {loading && (
        <div className="h-min flex items-center text-center justify-center text-lg">
          Loading....
        </div>
      )}
      {loading && error && (
        <div className="h-min flex items-center text-center justify-center text-lg">
          {error}
        </div>
      )}
      {!loading && !error && (
        <>
          <div>
            <div className="w-full relative">
              <nav
                className="z-10 py-2 flex items-center w-full h-[80px] absolute top-0 left-0 px-[20px] lg:px-[95px]"
                style={{ zIndex: 100 }}
              >
                <img className="w-[30px]" src={tv} alt="Logo" />
                {/* <Logo /> */}
                <h1 className="pl-2 text-white font-bold text-2xl hidden lg:block ">
                  MovieBox
                </h1>
                <form
                  onSubmit={(event) => search(event)}
                  className="relative flex items-center border-2 rounded-[6px] ml-auto"
                >
                  <input
                    className="input px-2 bg-transparent border-none placeholder:text-white text-white"
                    onChange={(event) => {
                      setShow(false);
                      setVal(event.target.value);
                    }}
                    placeholder="Search..."
                  />
                  <button className="cursor-pointer flex items-center">
                    <Search />
                  </button>
                </form>
                <div className="md:flex items-center hidden ml-4">
                  <span className="whitespace-nowrap mr-4 text-white font-semibold">
                    Sign in
                  </span>
                  <span className="bg-red-800 rounded-full p-2">
                    <SIgnIN />
                  </span>
                </div>
              </nav>
              {movies && <MoviePoster movies={movies} />}
              {movies.length < 1 && <div>no movie yet</div>}
            </div>

            <div className="p-[20px] lg:px-[95px] w-full">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-black font-semibold whitespace-nowrap text-xl lg:text-4xl">
                  Featured Movies {val && show && `for search result "${val}"`}
                </h1>
                <span className="block text-red-500 cursor-pointer text-md">
                  See more
                </span>
              </div>
              <div className="flex justify-center">
                <TopMovies movies={movies} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
