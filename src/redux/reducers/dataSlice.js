import { createSlice } from "@reduxjs/toolkit";
export const dataSlice = createSlice({
    name: "data",
    initialState: {
      brands: [],
      models: [],
      data: {
        fuels: null,
        gears: null,
        category: null,
        transmission: null,
        year: null,
        color: null,
        engineVolume: null,
        priorOwnerCount: null,
        market: null,
        city: null,
        seatsCount: null,
        priceType: null,
        mileageType: null,
        extraBooleanFields: [],
      },
    },
    reducers: {
      setBrands: (state, action) => {
        state.brands = action.payload;
      },
      setModels: (state, action) => {
        state.models = action.payload;
      },
      setData: (state, action) => {
        state.data = action.payload;
      },
    },
  });
  
  export const {
    setBrands,
    setModels,
    setData,
  } = dataSlice.actions;
  
  export default dataSlice.reducer;