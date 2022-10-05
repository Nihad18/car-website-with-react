import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./reducers/loginSlice";
import registerSlice from "./reducers/registerSlice";
import toggleSlice from "./reducers/toggleSlice";
import imageSlice from "./reducers/imageSlice";
import fileSlice from "./reducers/fileSlice";
import authSlice from "./reducers/authSlice";
import postSlice from "./reducers/postSlice";
export const store = configureStore({
  reducer: {
    login: loginSlice,
    register: registerSlice,
    toggle: toggleSlice,
    selectedImages: imageSlice,
    file:fileSlice,
    auth:authSlice,
    post:postSlice,
  },
});
