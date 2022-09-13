import { createSlice } from "@reduxjs/toolkit";
import GetCookie from "../../hooks/GetCookie";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    // postId:localStorage.getItem("postId"),
    postId:GetCookie("postId"),
    postDetail:[],
    postDetailImages:null,
},
  
  reducers: {
    setPostId: (state, action) => {
      state.postId =action.payload;
    },
    setPostDetail: (state, action) => {
      state.postDetail = action.payload;
    },
    setPostDetailImages:(state, action) => {
      state.postDetailImages = action.payload;
    },
  },
});

export const { setPostId,setPostDetail,setPostDetailImages } = postSlice.actions;

export default postSlice.reducer;
