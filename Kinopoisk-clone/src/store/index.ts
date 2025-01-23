import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import moviesSlice from "./moviesSlice";

export default configureStore({
  reducer: {
    theme: themeSlice,
    movies: moviesSlice,
  },
});
