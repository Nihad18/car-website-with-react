import { createSlice } from "@reduxjs/toolkit";

export const registerSlice = createSlice({
  name: "data",
  initialState: {
    registerData: [{username:"", email: "", password: ""}],
  },
  
  reducers: {
    setRegisterData: (state, action) => {
      state.registerData =action.payload;
    },
    setError: (state) => {
      state.value = "";
    },
  },
});

export const { setRegisterData, setError } = registerSlice.actions;

export default registerSlice.reducer;
