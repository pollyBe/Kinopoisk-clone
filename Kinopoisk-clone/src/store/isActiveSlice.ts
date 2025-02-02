import { createSlice } from "@reduxjs/toolkit";

const IsActiveSlice = createSlice({
  name: "isActive",
  initialState: {
    isActive: false,
  },
  reducers: {
    switchIsActive(state, action) {
      state.isActive = action.payload;
    },
    toggleIsActive(state) {
      state.isActive = !state.isActive;
    },
  },
});

export const { switchIsActive, toggleIsActive } = IsActiveSlice.actions;
export default IsActiveSlice.reducer;
