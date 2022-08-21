import { createSlice } from "@reduxjs/toolkit";

export const imageSlice = createSlice({
  name: "selectedImages",
  initialState: {
    value: [],
  },
  
  reducers: {
    setSelectedImages: (state, {payload}) => {
      state.value = payload.value;
    }}
});

export const { setSelectedImages } = imageSlice.actions;

export default imageSlice.reducer;

