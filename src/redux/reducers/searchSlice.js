import { createSlice } from "@reduxjs/toolkit";
const types = [" Bütün", "Yeni", "İşlənmiş"];
const searchTypes = ["Sadə axtarış", "Ətraflı axtarış"];
export const searchSlice = createSlice({
  name: "data",
  initialState: {
    brands: [],
    models: [],
    brandValue: null,
    modelValue: null,
    extraBooleanFieldsValue:[],
    values: {
      gearValue: [],
      fuelValue: [],
      categoryValue: [],
      minYearValue: null,
      maxYearValue: null,
      colorValue: [],
      transmissionValue: [],
      minMileageValue: null,
      maxMileageValue: null,
      minEngineVolumeValue: null,
      maxEngineVolumeValue: null,
      minEnginePowerValue: null,
      maxEnginePowerValue: null,
      priorOwnerCountValue: null,
      marketValue: [],
      cityValue: [],
      // extraBooleanFieldsValue: [],
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
    activeButton: types[0],
    searchActiveButton:searchTypes[0],
    detailedSearchToggle:false
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
    setExtraBooleanFieldsValue: (state, action) => {
      state.extraBooleanFieldsValue = action.payload;
    },
    setValues: (state, action) => {
      state.values = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setActiveButton: (state, action) => {
      state.activeButton = action.payload;
    },
    setSearchActiveButton: (state, action) => {
      state.searchActiveButton = action.payload;
    },
    setDetailedSearchToggle: (state,action) => {
      state.detailedSearchToggle =  action.payload;
    },
  },
});

export const {
  setBrands,
  setModels,
  setBrandValue,
  setModelValue,
  setExtraBooleanFieldsValue,
  setValues,
  setData,
  setActiveButton,
  setSearchActiveButton,
  setDetailedSearchToggle,
} = searchSlice.actions;

export default searchSlice.reducer;
