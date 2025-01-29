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
  },
});

export const { switchIsActive } = IsActiveSlice.actions;
export default IsActiveSlice.reducer;