import React, { useEffect, useState } from "react";
import "./MovieDetail.css";

import { Link, useParams } from "react-router-dom";
import Logo from "../asset/logo";
import Home from "../asset/home";
import Movie from "../asset/movie";
import TV from "../asset/tv";
import Upcoming from "../asset/Upcoming";
import Logout from "../asset/logout";
import LIst from "../asset/list";
import Ticket from "../asset/ticket";
import Open from "../asset/open";
import config from "../config";

function MovieDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const [error, setError] = useState(null);

  // 'https://api.themoviedb.org/3/movie/movie_id?language=en-US'
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
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
        setMovie(result);
        setLoading(false);
      }
    });
  }, [id]);

  return (
    <div className="w-full bg-white flex justify-center">
      <div className="fixed bottom-0 left-0 w-full z-20 lg:w-3/12  bg-white sm:bg-transparent sm:px-[10px] border_style flex sm:flex-col sm:items-center sm:justify-evenly sm:sticky sm:top-0 sm:left-0 sm:h-max sm:w-[10%]">
        <div className="text-2xl text-black font-bold flex items-center">
          <Link to="/" className="flex justify-center items-center">
            <Logo />
            <span className="text-2xl text-black font-bold ml-2 hidden lg:block">
              MovieBox
            </span>
          </Link>
        </div>
        <div className="flex justify-between sm:flex-col sm:h-2/6 sm:justify-evenly w-full sm:space-y-1">
          <span className="block  w-full py-5 text-center hover:bg-red-200 hover:text-red-700 hover:border-r-4 hover:border-red-800">
            <Link to={"/"} className="flex justify-center items-center">
              {" "}
              <Home />
              <span className="text-gray-900 font-semibold ml-5 hidden lg:block">
                Home
              </span>
            </Link>
          </span>
          <span className="flex justify-center items-center w-full py-5 bg-red-200  text-red-700 border-r-4 border-red-800">
            <Movie />
            <span className="text-center font-semibold ml-4 hidden lg:block">
              Movies
            </span>
          </span>
          <span className="flex items-center justify-center font-semibold w-full py-5  hover:bg-red-200 hover:text-red-700 hover:border-r-4 hover:border-red-800">
            <TV />
            <span className="text-gray-900 text-center ml-2 font-semibold hidden lg:block">
              TV Series
            </span>
          </span>
          <span className="flex items-center justify-center font-semibold w-full py-5  hover:bg-red-200 hover:text-red-700 hover:border-r-4 hover:border-red-800">
            <Upcoming />
            <span className="text-gray-900 text-center ml-2 font-semibold hidden lg:block">
              Upcoming
            </span>
          </span>
        </div>
        <div className="py-4 px-5 border-red-400 border-2 rounded-xl break-words hidden xl:block">
          <h1 className="block text-sm font-semibold text-gray-700 ">
            play movie quizes and <br />
            earn free ticket
          </h1>
          <p className="text-gray-500 text-xs text-center w-full">
            50k people are playing now
          </p>
          <div className="rounded-full bg-red-300 text-red-700 mt-4 text-center py-1 px-4 ">
            start playing
          </div>
        </div>
        <div className="flex flex-row items-center justify-center ">
          <div className="hidden lg:block">
            <Logout />
          </div>
          <span className="text-gray-700 lg:text-xl font-semibold ml-2 hidden lg:block">
            Log out
          </span>
        </div>
      </div>
      <div className="w-full h-full flex pt-5 flex-col justify-center items-center">
        {loading && (
          <div className="w-full h-min flex justify-center items-center ">
            Loading ....
          </div>
        )}
        {!loading && error && (
          <div className="w-full h-min flex justify-center items-center ">
            {error}
          </div>
        )}
        {!loading && !error && (
          <>
            <div className="w-[90%] relative h-[400px] overflow-hidden shadow-xl rounded-xl">
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                alt={movie.title}
                className="absolute z-0 top-0 left-0 h-full w-full object-cover" data-testid="movie-title"
              />
            </div>

            <div className="w-4/5 flex flex-row justify-between items-center mt-5 mb-1">
              <span className="">
                <hi className="mr-2 text-gray-700 text-3xl font-normal mb-4" data-testid="movie-title">{movie.title}</hi>
                <ul className="flex gap-2">
                  <li className="mr-3 text-gray-700 text-sm" data-testid="movie-release-date">
                    {movie.release_date.split("-")[0]}
                  </li>
                  <li className="mr-3 text-gray-700 text-sm">PG-13</li>
                  {/* <li className="text-gray-700 text-sm"> 2h 10m </li> */}
              <div className="flex items-center gap-1 mr-3 text-gray-700 text-sm">
                <p  data-testid="movie-runtime">
                  {movie.runtime}
                </p>
                <span>minutes</span>
              </div>
                  {movie.genres.map((el) => {
                    return (
                      <span
                        className="ml-5 text-red-500 text-xs border-red-400 font-bold rounded-md px-2 p_small hidden lg:block"
                        key={el.id}
                      >
                        {el.name}
                      </span>
                    );
                  })}
                </ul>
              </span>
              <div className="">
                <span className="text-gray-400 text-sm">8.5</span>
                <span className="text-gray-600 text-sm">{" "} | {" "}350k</span>
              </div>
            </div>

            <div className="w-4/5 flex md:flex-row flex-col mt-4 gap-2">
              <div className="w-full flex flex-col">
                <div className=" text-gray-500 my-5 text-sm" data-testid="movie-overview">
                  {movie.overview}
                </div>
                <div className="mb-2">
                  <p className="my-5 text-sm">
                    Director:{" "}
                    <span className="text-red-400">Joseph Koniski</span>
                  </p>
                  <p className="mb-5 text-sm">
                    Writers:{" "}
                    <span className="text-red-400">
                      Jim Cash, Jack Epps Jr, Peter Craig
                    </span>
                  </p>
                  <p className="mb-3 text-sm">
                    Director:{" "}
                    <span className="text-red-400">
                      Tom Cruise, Jennifer Conneliy, Miles Teiller
                    </span>
                  </p>
                </div>

                <div className="w-full flex md:flex-row flex-col mb-2 items-center justify-center">
                  <div className="flex items-center py-3 px-2 w-full rounded-xl justify-center text-white bg-red-500 mb-2 h-[60px]">
                    {" "}
                    Top rated Movies #65
                  </div>
                  <div className="mr-1 py-3 px-2 flex items-center justify-center border-2 border-l-0 rounded-xl gap-2 h-[60px] w-full">
                    <span className="block pl-3 whitespace-nowrap">Awards: 9 nominations</span>
                    <span className="block">
                      <Open />
                    </span>
                  </div>
                </div>

              </div>

              <div className="w-full flex flex-col mb-24 sm:mb-0">
                <span className="px-5 py-2 flex  justify-center items-center rounded-xl bg-red-700 text-white">
                  <Ticket />
                  <span className="text-center ml-2">See Showtimes</span>
                </span>
                <span className="px-5 py-2 mt-4 rounded-xl bg-red-300 text-gray-800 flex justify-center items-center">
                  <LIst />
                  <span className="text-center ml-2">More watch options</span>
                </span>
                <span className="flex h-44 w-full rounded-xl overflow-hidden justify-between items-center flex-wrap bg-white mt-2 relative">
                  <span className="z-0 block h-full relative w-full overflow-hidden">
                    <img
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      alt={movie.title}
                      className="object-cover absolute h-full w-full"
                    />
                  </span>
                  <span className="z-10 w-full absolute bottom-0 text-center left-0 opacity-70 bg-gray-800  h-8 flex justify-center items-center">
                    <LIst />
                    <span className="text-sm ml-2 text-gray-200">
                      {" "}
                      The best movie shows in september
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
