import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMovie } from "../types/types";
interface IobjectFromSearchPage {
  keyword: string;
  page: number;
}

export const FetchSearchMovies = createAsyncThunk<
  { films: IMovie[]; pagesCount: number },
  IobjectFromSearchPage,
  { rejectValue: string }
>(
  "search/FetchSearchMovies",
  async (objectFromSearchPage, { rejectWithValue }) => {
    const { keyword, page } = objectFromSearchPage;
    try {
      const response = await fetch(
        `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${keyword}&page=${page}`,
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
  }
);

interface ISearchstate {
  movies: IMovie[];
  keyword: string;
  loading: boolean;
  error: string | null;
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

const initialState: ISearchstate = {
  movies: [],
  keyword: "",
  loading: false,
  error: null as string | null,
  totalItems: 0,
  totalPages: 0,
  currentPage: 1,
  itemsPerPage: 20,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchSearchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchSearchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.films;
        state.totalPages = action.payload.pagesCount;
        state.totalItems = action.payload.pagesCount * state.itemsPerPage;
      })
      .addCase(FetchSearchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPage, setKeyword } = searchSlice.actions;
export default searchSlice.reducer;
