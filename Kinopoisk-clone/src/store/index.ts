import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import moviesSlice from "./moviesSlice";
import isActiveSlice from "./isActiveSlice";
import sliderMoviesSlice from "./sliderMoviesSlice";
import filtersSlice from "./filtersSlice";
import filtredMoviesSlice from "./filtredMoviesSlice";
import movieSlice from "./movieSlice";

const store = configureStore({
  reducer: {
    theme: themeSlice,
    movies: moviesSlice,
    isActive: isActiveSlice,
    slider: sliderMoviesSlice,
    filters: filtersSlice,
    filtredMovies: filtredMoviesSlice,
    movie: movieSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
