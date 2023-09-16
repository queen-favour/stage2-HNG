import "./movie-card.css";
import HeartIcon from "./Utils/heart-icon";
import { useNavigate } from "react-router-dom";
import tomatoe from "../asset/RottenTomatoes.png";

const MovieCard = ({ poster_path, title, release_date, id }) => {
  const navigate = useNavigate();
  const clicked = () => {
    navigate(`/movies/${id}`, { replace: false });
  };

  const posterImg = `https://image.tmdb.org/t/p/w500/${poster_path}`;

  return (
    <div data-testid="movie-card">
    <div
      className="cursor-pointer relative h-[370px] w-[250px] p-[15px] overflow-hidden" data-testid="movie-poster"
      onClick={clicked}
      style={{
        backgroundImage: `url(${posterImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      <div class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

      <div class="w-full m-2 flex items-center justify-between ">
        <HeartIcon isChecked={false} />
        <span class="rounded-full bg-white opacity-80 whitespace-nowrap px-4 py-1 font-bold ml-2 mr-4">
          MOVIE
        </span>
      </div>

      <div className="relative z-30 mt-[100px]">
        <h1 className="text-4xl font-semibold text-white block mb-4" data-testid="movie-title">{title}</h1>

        <div className="flex items-center gap-1 mb-4">
          <p className="text-gray-300 text-sm">IMDB</p>
          <p className="text-gray-300 mx-4 text-sm">80D/100</p>
          <div className="flex items-center gap-1">
            <img src={tomatoe} alt="rotten tomatoe" />
            <p className="text-gray-300 text-sm">97%</p>
          </div>
        </div>

        <span className="text-gray-200 text-sm">Action, Adventure, Horror</span>

        <div className="mt-2">
          <h1 className="text-gray-200 text-min ">Released On</h1>
          <p
            className="text-white text-sm text-left py-1 block"
            data-testid="movie-release-date"
          >
            {release_date}
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MovieCard;
