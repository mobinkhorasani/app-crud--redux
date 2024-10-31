import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { updateSearchQuery } from '../redux/movieSlice';


const MovieSearch: React.FC = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.movies.searchQuery);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSearchQuery(e.target.value));
  };

  return (
    <input
      type="text"
      placeholder="Search movies..."
      value={searchQuery}
      onChange={handleSearch}
      className="p-2 border border-gray-300 rounded w-full"
    />
  );
};

export default MovieSearch;
