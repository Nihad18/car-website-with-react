import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "data",
  initialState: {
    brands: [],
    models: [],
    brandValue: null,
    modelValue: null,
    values: {
      gearValue: null,
      fuelValue: null,
      categoryValue: null,
      minYearValue: null,
      maxYearValue: null,
      colorValue: null,
      transmissionValue: null,
      mileageValue: null,
      engineVolumeValue: null,
      enginePowerValue: null,
      priorOwnerCountValue: null,
      marketValue: null,
      cityValue: [],
      seatsCountValue: null,
      minPriceValue: null,
      maxPriceValue: null,
      priceTypeValue: 1,
      mileageTypeValue: 1,
      phoneNumberValue: null,
      descriptionValue: null,
      crashedValue: null,
      paintedValue: null,
      loanValue: null,
      barterValue: null,
    },

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
    setBrandValue: (state, action) => {
      state.brandValue = action.payload;
    },
    setModelValue: (state, action) => {
      state.modelValue = action.payload;
    },
    setValues: (state, action) => {
      state.values = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {
  setBrands,
  setModels,
  setBrandValue,
  setModelValue,
  setValues,
  setData,
} = searchSlice.actions;

export default searchSlice.reducer;
