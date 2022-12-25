import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./reducers/loginSlice";
import registerSlice from "./reducers/registerSlice";
import toggleSlice from "./reducers/toggleSlice";
import imageSlice from "./reducers/imageSlice";
import fileSlice from "./reducers/fileSlice";
import authSlice from "./reducers/authSlice";
import postSlice from "./reducers/postSlice";
import searchSlice from "./reducers/searchSlice";
import dataSlice from "./reducers/dataSlice";
import newPostSlice from "./reducers/newPostSlice";
export const store = configureStore({
  reducer: {
    login: loginSlice,
    register: registerSlice,
    toggle: toggleSlice,
    selectedImages: imageSlice,
    file:fileSlice,
    auth:authSlice,
    post:postSlice,
    search:searchSlice,
    data: dataSlice,
    newPost:newPostSlice,
  },
});
