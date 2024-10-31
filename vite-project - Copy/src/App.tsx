import React from "react";
import AddMovieForm from "./components/AddMovieForm";
import MovieTable from "./components/MovieTable";

const App: React.FC = () => (
  <div className="container mx-auto p-4 ">
    <h1 className="text-3xl font-bold text-indigo-800 p-4 transition-all duration-300 ease-in-out hover:text-indigo-600">
      ADD YOUR MOVIE
    </h1>

    <AddMovieForm />
    <MovieTable />
  </div>
);

export default App;
