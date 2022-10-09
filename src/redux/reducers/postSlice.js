import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    postDetail:[],
    postDetailImages:null,
},
  
  reducers: {
    setPostDetail: (state, action) => {
      state.postDetail = action.payload;
    },
    setPostDetailImages:(state, action) => {
      state.postDetailImages = action.payload;
    },
  },
});

export const { setPostDetail,setPostDetailImages } = postSlice.actions;

export default postSlice.reducer;
