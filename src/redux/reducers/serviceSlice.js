import { createSlice } from "@reduxjs/toolkit";

export const serviceSlice = createSlice({
  name: "services",
  initialState: {
    posts:null,
    postId:null,
  },
  
  reducers: {
    setPost: (state, action) => {
      state.posts =action.payload;
    },
    setPostId: (state, action) => {
      state.postId =action.payload;
    },
  },
});

export const { setPosts,setPostId} = serviceSlice.actions;

export default serviceSlice.reducer;