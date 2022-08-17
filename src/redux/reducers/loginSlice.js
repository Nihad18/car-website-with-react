import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "data",
  initialState: {
    data: [{ email: "", password: ""}],
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

export const { setData, setError } = loginSlice.actions;

export default loginSlice.reducer;
