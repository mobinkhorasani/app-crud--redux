import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Movie {
  id: number;
  title: string;
  rating: number;
  genre: string;
}

interface MovieState {
  movies: Movie[];
  searchQuery: string;
}

const initialState: MovieState = {
  movies: [
    { id: 1, title: "Inception", rating: 8.8, genre: "Sci-Fi" },
    { id: 2, title: "The Godfather", rating: 9.2, genre: "Crime" },
    { id: 3, title: "Toy Story", rating: 8.3, genre: "Animation" },
  ],
  searchQuery: "",
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<Movie>) => {
      state.movies.push(action.payload);
    },
    deleteMovie: (state, action: PayloadAction<number>) => {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload
      );
    },
    updateSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { addMovie, deleteMovie, updateSearchQuery } = movieSlice.actions;
export const moviereducer = movieSlice.reducer;
