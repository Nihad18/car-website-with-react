import { createSlice } from "@reduxjs/toolkit";
import GetCookie from "../../hooks/GetCookie";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    // value:localStorage.getItem("token"),
    value:GetCookie("token"),
    name:''
  },
  
  reducers: {
    setAuth: (state, action) => {
      state.value =action.payload;
    },
    setName: (state, action) => {
      state.name =action.payload;
    },
  },
});

export const { setAuth,setName} = authSlice.actions;

export default authSlice.reducer;
