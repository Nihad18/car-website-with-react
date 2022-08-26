import { createSlice } from "@reduxjs/toolkit";

export const imageSlice = createSlice({
  name: "selectedImages",
  initialState: {
    value: [],
  },
  
  reducers: {
    setSelectedImages: (state,action) => {
      state.value =[...action.payload];
    }}
});

export const { setSelectedImages } = imageSlice.actions;

export default imageSlice.reducer;

