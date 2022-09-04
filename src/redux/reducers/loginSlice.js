import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "data",
  initialState: {
    loginData: [{ email: "", password: ""}],
  },
  
  reducers: {
    setLoginData: (state, action) => {
      state.loginData =action.payload;
    },
    setError: (state) => {
      state.value = "";
    },
  },
});

export const { setLoginData, setError } = loginSlice.actions;

export default loginSlice.reducer;
