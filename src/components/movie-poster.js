import "./movie-poster.css";
import Watch from "../asset/watch";
import tomatoe from '../asset/RottenTomatoes.png'

const MoviePoster = ({ movies }) => {
  const backdropImg = `https://image.tmdb.org/t/p/original/${movies[0].backdrop_path}`;
  return (
    <div
      className="w-full pt-[80px] h-[600px] relative p-[20px] lg:px-[95px]" data-testid = "movie-poster"
      style={{
        backgroundImage: `url(${backdropImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      <div class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"></div>
      <div className="z-10 relative mt-[80px] sm:w-[70%] md:w-[50%] lg:w-[30%]">
        <h1 className="text-3xl text-white font-bold mb-4" data-testid = "movie-title">
          {movies[0].title}
        </h1>
        <div className="flex items-center gap-4 mb-4">
          <p className="text-gray-300 text-sm">IMDB</p>
          <p className="text-gray-300 mx-4 text-sm">80D/100</p>
          <div className="flex items-center gap-1">
            <img src={tomatoe} alt="rotten tomatoe" />
            <p className="text-gray-300 text-sm">97%</p>
          </div>
        </div>
        <div className="">
          <p className="text-white block text-sm">{movies[0].overview}</p>
          <span className="bg-red-600 my-2 flex items-center justify-center rounded-md p-2 mt-8">
            <Watch />
            <span className="text-white px-2 text-center"> WATCH TRAILER</span>
          </span>
        </div>
      </div>
      {/* <div className="absolute w-full left-0 top-0 z-0">
        <div className="w-full relative h-min overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/original/${movies[0].backdrop_path}`}
            alt=" val"
            className="h-full absolute object-cover w-full"
          />
        </div>
      </div> */}
    </div>
  );
};

export default MoviePoster;
