import { useContext } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';

import MovieSmall from '../components/MovieSmall';
import { FiSearch } from 'react-icons/fi';
import { MovieContext } from '../context/movies.context';

const Movies = () => {
  const { filterTopRated } = useContext(MovieContext);

  return (
    <div>
      <Navbar />
      <div className="max-w-[450px] mx-auto mt-8">
        <div className="flex items-center">
          <div className="mr-4 text-2xl">
            <FiSearch />
          </div>
          <div className="w-full">
            <SearchBar />
          </div>
        </div>
      </div>
      <div className="max-w-[450px] mx-auto">
        <h1 className="text-3xl my-7">Movies</h1>
        <div className="grid grid-cols-2 gap-x-5">
          {filterTopRated.map((movie, id) => (
            <MovieSmall key={id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;
