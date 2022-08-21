import { createSlice } from "@reduxjs/toolkit";
import photo from '../../images/profileImg.png'

// const addItemToArray = (state, action) => {
//     state.push(action.payload)
//   }
export const imageSlice = createSlice({
  name: "selectedImages",
  initialState: {
    value: [photo],
  },
  
  reducers: {
    setSelectedImages: (state, { payload }) => {
      if (payload.length > 0) {
        state = payload
  }}
    },
});

export const { setSelectedImages } = imageSlice.actions;

export default imageSlice.reducer;

