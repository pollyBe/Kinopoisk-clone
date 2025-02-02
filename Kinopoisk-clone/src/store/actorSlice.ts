import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IActor, IMovie } from "../types/types";

export const GetActorInfo = createAsyncThunk(
  "actor/GetActorInfo",
  async (objectFromMoviePage, { rejectWithValue }) => {
    const { staffId }: any = objectFromMoviePage;
    try {
      const response = await fetch(
        `https://kinopoiskapiunofficial.tech/api/v1/staff/${staffId}`,
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

interface IActorState {
  actor: IActor;
  loading: boolean;
  error: string | null;
}

const initialState: IActorState = {
  actor: {
    personId: 0,
    webUrl: "",
    nameRu: "",
    nameEn: "",
    sex: "",
    posterUrl: "",
    growth: 0,
    birthday: "",
    death: "",
    age: 0,
    birthplace: "",
    deathplace: "",
    spouses: [],
    hasAwards: 0,
    profession: "",
    facts: [],
    films: [],
  },
  loading: false,
  error: null as string | null,
};
const actorSlice = createSlice({
  name: "actor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetActorInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetActorInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.actor = action.payload;
      })
      .addCase(GetActorInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export default actorSlice.reducer;
