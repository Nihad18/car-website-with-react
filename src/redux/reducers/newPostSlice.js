import { createSlice } from "@reduxjs/toolkit";
export const newPostSlice = createSlice({
  name: "data",
  initialState: {
    brandValue: null,
    modelValue: null,
    extraBooleanFieldsValue: [],
    values: {
      gearValue: null,
      fuelValue: null,
      categoryValue: null,
      yearValue: null,
      colorValue: null,
      transmissionValue: null,
      mileageValue: null,
      engineVolumeValue: null,
      enginePowerValue: null,
      priorOwnerCountValue: null,
      marketValue: null,
      cityValue: null,
      seatsCountValue: null,
      priceValue: null,
      priceTypeValue: 1,
      mileageTypeValue: 1,
      phoneNumberValue: null,
      descriptionValue: null,
      crashedValue: null,
      paintedValue: null,
      loanValue: null,
      barterValue: null,
    },
  },

  reducers: {
    setBrandVals: (state, action) => {
      state.brandValue = action.payload;
    },
    setModelVals: (state, action) => {
      state.modelValue = action.payload;
    },
    setExtraBooleanValue: (state, action) => {
      state.modelValue = action.payload;
    },
    setVals: (state, action) => {
      state.values = action.payload;
    },
  },
});

export const {
  setBrandVals,
  setModelVals,
  setExtraBooleanFieldsValue,
  setVals,
} = newPostSlice.actions;

export default newPostSlice.reducer;
