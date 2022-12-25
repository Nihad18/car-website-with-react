import { createSlice } from "@reduxjs/toolkit";

export const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
    value: true,
    language: null,
  },
  reducers: {
    setToggle: (state) => {
      state.value = !state.value;
    },
    setLanguage: (state,action) => {
      state.language = action.payload;
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { setToggle,setLanguage } = toggleSlice.actions;

export default toggleSlice.reducer;
