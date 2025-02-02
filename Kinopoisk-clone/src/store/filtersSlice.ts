import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IFiltersState } from "../types/types";

export const GetFilters = createAsyncThunk(
  "filters/GetFilters",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://kinopoiskapiunofficial.tech/api/v2.2/films/filters`,
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

const initialState: IFiltersState = {
  genres: [],
  countries: [],
  loading: false,
  error: null as string | null,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.genres = action.payload.genres;
        state.countries = action.payload.countries;
      })
      .addCase(GetFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export default filtersSlice.reducer;
