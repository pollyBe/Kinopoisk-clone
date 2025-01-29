import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import moviesSlice from "./moviesSlice";
import isActiveSlice from "./isActiveSlice";

export default configureStore({
  reducer: {
    theme: themeSlice,
    movies: moviesSlice,
    isActive: isActiveSlice,
  },
});
