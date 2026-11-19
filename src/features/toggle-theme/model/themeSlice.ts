import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { getInitialTheme, type Theme } from "../lib/storage"

interface IThemeState {
  theme: Theme
}

const initialState: IThemeState = { theme: getInitialTheme() }

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload
    },
  },
})

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer
