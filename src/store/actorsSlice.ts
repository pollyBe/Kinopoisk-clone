import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const GetActorsInfo = createAsyncThunk(
  "actors/GetActorsInfo",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${id}
`,
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

interface IActorsState {
  actors: IActor[];
  loading: boolean;
  error: string | null;
}

export interface IActor {
  staffId: number;
  nameRu?: string;
  nameEn?: string;
  description?: string;
  posterUrl: string;
  professionText: string;
  professionKey: string;
}

const initialState: IActorsState = {
  actors: [],
  loading: false,
  error: null as string | null,
};
const actorsSlice = createSlice({
  name: "actors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetActorsInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetActorsInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.actors = action.payload;
      })
      .addCase(GetActorsInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export default actorsSlice.reducer;
