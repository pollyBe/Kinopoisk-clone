import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMovie, IMoviesState, IObjectFrommainPage } from "../types/types";

export const FetchMovies = createAsyncThunk<
  { items: IMovie[]; total: number; totalPages: number },
  IObjectFrommainPage,
  { rejectValue: string }
>("movies/fetchMovies", async (objectFromMainPage, { rejectWithValue }) => {
  const { limit, page, searchQuery, ordering, type } = objectFromMainPage;
  try {
    const response = await fetch(
      `https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=${type}&page=${page}&limit=${limit}&ordering=${ordering}&search=${searchQuery}`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": "75a3a176-fdd5-47ef-9828-159d9d1426a6",
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("error");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message || "error");
  }
});

const initialState: IMoviesState = {
  movies: [],
  loading: false,
  error: null as string | null,
  selectedMovie: null,
  totalItems: 0,
  totalPages: 0,
  currentPage: 1,
  itemsPerPage: 20,
  searchQuery: "",
  ordering: "",
  selectedImage: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSelectedMovie(state, action) {
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
        state.movies = action.payload.items;
        state.totalItems = action.payload.total;
        state.totalPages = action.payload.totalPages;
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
  setSelectedMovie,
  setPage,
  setSearchQuery,
  setOrdering,
} = moviesSlice.actions;
export default moviesSlice.reducer;
