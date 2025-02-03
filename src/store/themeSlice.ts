import { createSlice } from "@reduxjs/toolkit";

const MyThemeSlice = createSlice({
  name: "myAppTheme",
  initialState: {
    theme: "light",
  },
  reducers: {
    switchTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

export const { switchTheme } = MyThemeSlice.actions;
export default MyThemeSlice.reducer;
