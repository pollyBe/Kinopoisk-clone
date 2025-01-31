import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMovie } from "../types/types";

 export const GetMovieByID = createAsyncThunk(
    "movie/GetMovieByID",
    async (objectFromMoviePage, { rejectWithValue }) => {
      const { kinopoiskId }: any = objectFromMoviePage;
      try {
        const response = await fetch(
          `https://kinopoiskapiunofficial.tech/api/v2.2/films/${kinopoiskId}`,
          {
            method: "GET",
            headers: {
              "X-API-KEY": "75a3a176-fdd5-47ef-9828-159d9d1426a6",
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    }
  );

interface IMovieState{
  movie: IMovie,
  loading: boolean,
  error: string | null
}

const initialState: IMovieState = {
  movie: {
    countries: [],
    coverUrl: '',
    description: '',
    genres: [],
    imdbId: '',
    kinopoiskId: 0,
    logoUrl: '',
    nameEn: '',
    nameOriginal: '',
    nameRu: '',
    posterUrl: '',
    posterUrlPreview: '',
    ratingAgeLimits: '',
    ratingImdb: 0,
    ratingKinopoisk: 0,
    type: '',
    year: 0,
  },
  loading: false,
  error: null as string | null,
};
const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetMovieByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetMovieByID.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload;
      })
      .addCase(GetMovieByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
    })
  }
})
export default movieSlice.reducer;