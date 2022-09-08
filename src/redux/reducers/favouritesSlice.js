import { createSlice } from "@reduxjs/toolkit";

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favPosts:[],
    favIsLoading:true,
    favPageCount:0,
    favActivePage:1,
    favPostsCount:0,
},
  
  reducers: {
    setFavPosts: (state, action) => {
      state.favPosts =action.payload
    },
    setFavIsLoading: (state) => {   
        state.favIsLoading =!state.favIsLoading
    },
    setFavPageCount: (state, action) => { 
        state.favPageCount = action.payload
    },
    setFavActivePage: (state, action) => { 
        state.favActivePage = action.payload
    },
    setFavPostsCount: (state, action) => { 
        state.favPostsCount = action.payload
    },
  },
});

export const {setFavPosts,setFavIsLoading, setFavPageCount,setFavActivePage,setFavPostsCount} = favouritesSlice.actions;

export default favouritesSlice.reducer;