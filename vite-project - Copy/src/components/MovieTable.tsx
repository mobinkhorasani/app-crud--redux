import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { deleteMovie } from "../redux/movieSlice";
import MovieSearch from "./SearchBox";

const MovieTable: React.FC = () => {
  const dispatch = useDispatch();
  const { movies, searchQuery } = useSelector(
    (state: RootState) => state.movies
  );

  const [sortColumn, setSortColumn] = useState<string | null>(null);

  const handleSort = (column: string) => {
    setSortColumn(column);
  };

  const sortedMovies = [...movies].sort((a, b) => {
    if (sortColumn === "title" || sortColumn === "genre") {
      return String(a[sortColumn]).localeCompare(String(b[sortColumn]));
    }
    if (sortColumn === "rating") {
      return b.rating - a.rating; 
    }
    return 0;
  });

  const filteredMovies = sortedMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <MovieSearch />
      <div className="overflow-x-auto">
        <table className="min-w-full mt-4 bg-white shadow-lg rounded-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th
                onClick={() => handleSort("title")}
                className="p-4 cursor-pointer hover:bg-blue-600 transition duration-200"
              >
                Title
              </th>
              <th
                onClick={() => handleSort("rating")}
                className="p-4 cursor-pointer hover:bg-blue-600 transition duration-200"
              >
                Rating
              </th>
              <th
                onClick={() => handleSort("genre")}
                className="p-4 cursor-pointer hover:bg-blue-600 transition duration-200"
              >
                Genre
              </th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="text-center p-4 text-red-500 font-semibold"
                >
                  No movies found.
                </td>
              </tr>
            ) : (
              filteredMovies.map((movie) => (
                <tr
                  key={movie.id}
                  className="border-b text-center hover:bg-gray-100 transition duration-200"
                >
                  <td className="p-4">{movie.title}</td>
                  <td className="p-4">{movie.rating}</td>
                  <td className="p-4">{movie.genre}</td>
                  <td className="p-4">
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded transition duration-300 hover:bg-red-600 hover:shadow-md"
                      onClick={() => dispatch(deleteMovie(movie.id))}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MovieTable;
