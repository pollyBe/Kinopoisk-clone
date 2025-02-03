import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMovie, ISliderState } from "../types/types";

export const fetchSliderMovies = createAsyncThunk<
  { items: IMovie[]; total: number },
  void,
  { rejectValue: string }
>("slidermovies/fetchSliderMovies", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=1`,
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

const initialState: ISliderState = {
  sliderContent: [],
  totalItems: 0,
  selectedMovie: null,
  loading: false,
  error: null,
};

const sliderMoviesSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    setSelectedMovie(state, action: PayloadAction<IMovie | null>) {
      state.selectedMovie = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSliderMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSliderMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.sliderContent = action.payload.items;
        state.totalItems = action.payload.total;
      })
      .addCase(fetchSliderMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { setSelectedMovie } = sliderMoviesSlice.actions;
export default sliderMoviesSlice.reducer;
