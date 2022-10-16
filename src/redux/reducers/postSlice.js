import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    postDetail: [],
    postDetailImages: null,
    posts: [],
    filteredPosts: [],
    query: "",
    pageCount: 0,
    activePage: 1,
    isLoading: true,
    pageNotLoading: false,
  },

  reducers: {
    setPostDetail: (state, action) => {
      state.postDetail = action.payload;
    },
    setPostDetailImages: (state, action) => {
      state.postDetailImages = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setFilteredPosts: (state, action) => {
      state.posts = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setPageCount: (state, action) => {
      state.pageCount = action.payload;
    },
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setPageNotLoading: (state, action) => {
      state.pageNotLoading = action.payload;
    },
  },
});

export const {
  setPostDetail,
  setPostDetailImages,
  setPosts,
  setFilteredPosts,
  setQuery,
  setPageCount,
  setActivePage,
  setIsLoading,
  setPageNotLoading,
} = postSlice.actions;

export default postSlice.reducer;
