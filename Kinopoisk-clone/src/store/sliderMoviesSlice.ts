import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSliderMovies = createAsyncThunk(
  "slidermovies/fetchSliderMovies",
  async () => {}
);
const sliderMoviesSlice = createSlice({
  name: "slider",
  initialState: {
    sliderContent: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSliderMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSliderMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.items;
        state.totalItems = action.payload.total;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchSliderMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
