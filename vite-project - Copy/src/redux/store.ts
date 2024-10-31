import { configureStore } from '@reduxjs/toolkit';
import { moviereducer } from './movieSlice';


export const store = configureStore({
  reducer: {
    movies: moviereducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
