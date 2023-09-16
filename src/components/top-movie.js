import MovieCard from "./movie-card";

import './movie-poster.css'

const TopMovies = ({ movies }) => {
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-20 gap-y-12">
      {movies.map((el) => {
        return <MovieCard key={el.id} {...el}/>;
      })}
    </div>
  );
};
export default TopMovies;