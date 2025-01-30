import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  movie: {}
}
const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers:{},
})
export default movieSlice.reducer;