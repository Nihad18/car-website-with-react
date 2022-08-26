import { createSlice } from "@reduxjs/toolkit";

export const fileSlice = createSlice({
  name: "file",
  initialState: {
    value: []
  },
  
  reducers: {
    setFile: (state, action) => {
      state.value =action.payload;
    },
  },
});

export const { setFile } = fileSlice.actions;

export default fileSlice.reducer;
