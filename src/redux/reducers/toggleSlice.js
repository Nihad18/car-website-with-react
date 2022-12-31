import { createSlice } from "@reduxjs/toolkit";

export const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
    value: true,
    language: null,
    resetToggle:true,
  },
  reducers: {
    setToggle: (state) => {
      state.value = !state.value;
    },
    setLanguage: (state,action) => {
      state.language = action.payload;
    },
    setResetToggle: (state,action) => {
      state.resetToggle = action.payload;;
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { setToggle,setLanguage,setResetToggle } = toggleSlice.actions;

export default toggleSlice.reducer;
