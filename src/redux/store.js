import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./reducers/loginSlice";
import registerSlice from "./reducers/registerSlice";
import toggleSlice from "./reducers/toggleSlice";
import imageSlice from "./reducers/imageSlice";
import authSlice from "./reducers/authSlice";
import fileSlice from "./reducers/fileSlice";

export const store = configureStore({
  reducer: {
    login: loginSlice,
    register: registerSlice,
    toggle: toggleSlice,
    selectedImages: imageSlice,
    token:authSlice,
    file:fileSlice,
  },
});
