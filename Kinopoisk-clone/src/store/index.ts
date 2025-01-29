import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import moviesSlice from "./moviesSlice";
import isActiveSlice from "./isActiveSlice";
import sliderMoviesSlice from "./sliderMoviesSlice";
import tvShowsSlice from "./tvShowsSlice";

const store = configureStore({
  reducer: {
    theme: themeSlice,
    movies: moviesSlice,
    isActive: isActiveSlice,
    slider: sliderMoviesSlice,
    TVShows: tvShowsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
