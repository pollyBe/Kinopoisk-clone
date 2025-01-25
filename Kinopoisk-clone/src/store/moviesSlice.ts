import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const FetchMovies = createAsyncThunk(
  "posts/fetchMovies",
  async (objectFromMainPage, { rejectWithValue }) => {
    const { limit, offset, searchQuery, ordering } = objectFromMainPage;
    try {
      const responce = await fetch(
        `https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=1&limit=${limit}&offset=${offset}&ordering=${ordering}&search=${searchQuery}`,
        {
          method: "GET",
          headers: {
            "X-API-KEY": "75a3a176-fdd5-47ef-9828-159d9d1426a6",
            "Content-Type": "application/json",
          },
        }
      );
      if (!responce.ok) {
        throw new Error("error");
      }
      const data = await responce.json();
      return data.items;
    } catch (error) {
      return rejectWithValue(error.message || "error");
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    loading: false,
    error: null as string | null,
    selectedMovie: null,
    totalItems: 0,
    currentPage: 1,
    itemsPerPage: 20,
    searchQuery: "",
    ordering: "",
    selectedImage: null,
  },
  reducers: {
    selectMovie(state, action) {
      state.selectedMovie = action.payload;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setOrdering: (state, action) => {
      state.ordering = action.payload;
    },
    setSelectedImage: (state, action) => {
      state.selectedImage = action.payload;
    },
    clearSelectedImage: (state) => {
      state.selectedImage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
        state.totalItems = action.payload.length;
      })
      .addCase(FetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearSelectedImage,
  setSelectedImage,
  selectMovie,
  setPage,
  setSearchQuery,
  setOrdering,
} = moviesSlice.actions;
export default moviesSlice.reducer;
