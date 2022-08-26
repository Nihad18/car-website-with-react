import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "token",
  initialState: {
    value: ""
  },
  
  reducers: {
    setToken: (state, action) => {
      state.value =action.payload;
    },
  },
});

export const { setToken } = authSlice.actions;

export default authSlice.reducer;
