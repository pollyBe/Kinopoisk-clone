import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IFiltredMoviesState, IFiltredObject, IMovie } from "../types/types";


export const GetFiltredMovies = createAsyncThunk<
{ items: IMovie[]; total: number; totalPages: number },
IFiltredObject,
{ rejectValue: string }
>('filtredMovies/GetFiltredMovies', async (objectFromMoviesPage, { rejectWithValue }) => {
  const { country, page, genre, order, type, yearFrom, yearTo } = objectFromMoviesPage;
  try {
    const response = await fetch(
      `https://kinopoiskapiunofficial.tech/api/v2.2/films?countries=${country}&genres=${genre}&order=${order}&type=${type}&ratingFrom=0&ratingTo=10&yearFrom=${yearFrom}&yearTo=${yearTo}&page=${page}`,
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
})

const initialState: IFiltredMoviesState = {
  movies: [],
  loading: false,
  error: null as string | null,
  selectedMovie: null,
  totalItems: 0,
  totalPages: 0,
  currentPage: 1,
  itemsPerPage: 20,
  order: "",
  countryId: "",
  genreId: "",
  yearTo: 0,
  yearFrom: 0,
  type: "",
}

const filtredMoviesSlice = createSlice({
  name: 'filtredMovies',
  initialState,
  reducers: {
    setSelectedMovie(state, action) {
      state.selectedMovie = action.payload;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setOrdering: (state, action) => {
      state.order = action.payload;
    },
    setCountryId: (state, action) => {
      state.countryId = action.payload;
    },
    setGenreId: (state, action) => {
      state.genreId = action.payload;
    },
    setYearTo: (state, action) => {
      state.yearTo = action.payload;
    },
    setYearFrom: (state, action) => {
      state.yearFrom = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    }
  },
})

export const { setCountryId, setGenreId, setOrdering, setPage, setSelectedMovie, setType, setYearFrom, setYearTo } = filtredMoviesSlice.actions;
export default filtredMoviesSlice.reducer;