import { createSlice } from "@reduxjs/toolkit";

export const registerSlice = createSlice({
  name: "data",
  initialState: {
    data: [{username:"", email: "", password: ""}],
  },
  
  reducers: {
    setData: (state, action) => {
      state.data =action.payload;
    },
    setError: (state) => {
      state.value = "";
    },
  },
});

export const { setData, setError } = registerSlice.actions;

export default registerSlice.reducer;
