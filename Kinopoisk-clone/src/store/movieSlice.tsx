import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovie } from "../types/types";

// Измените тип параметра с "any" на конкретный тип
interface IObjectFromMoviePage {
  kinopoiskId?: string;
}

export const GetMovieByID = createAsyncThunk<IMovie, IObjectFromMoviePage, { rejectValue: string }>(
  "movie/GetMovieByID",
  async (objectFromMoviePage, { rejectWithValue }) => {
    const { kinopoiskId } = objectFromMoviePage;
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
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: IMovie = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Обновите интерфейс состояния фильма
interface IMovieState {
  movie: IMovie;
  loading: boolean;
  error: string | null;
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
  error: null,
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
      .addCase(GetMovieByID.fulfilled, (state, action: PayloadAction<IMovie>) => {
        state.loading = false;
        state.movie = action.payload;
      })
      .addCase(GetMovieByID.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
    });
  },
});

export default movieSlice.reducer;
