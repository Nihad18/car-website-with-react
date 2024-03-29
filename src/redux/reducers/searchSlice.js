import { createSlice } from "@reduxjs/toolkit";
const types = [" Bütün", "Yeni", "İşlənmiş"];
const searchTypes = ["Sadə axtarış", "Ətraflı axtarış"];
export const searchSlice = createSlice({
  name: "data",
  initialState: {
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
    activeButton: types[0],
    searchActiveButton:searchTypes[0],
    detailedSearchToggle:false
  },

  reducers: {
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
  setBrandValue,
  setModelValue,
  setExtraBooleanFieldsValue,
  setValues,
  setActiveButton,
  setSearchActiveButton,
  setDetailedSearchToggle,
} = searchSlice.actions;

export default searchSlice.reducer;
