import { createSlice } from "@reduxjs/toolkit";

const schoolSlice = createSlice({
  name: "school",
  initialState: {
    schoolDetails: null,
    schoolInvoices: null,
    schoolCollections: null,
    schoolsList: null
  },
  reducers: {
    setSchoolDetails: (state, action) => {
      const { schoolDetails } = action.payload;
      state.schoolDetails = schoolDetails;
    },
    setSchoolInvoices: (state, action) => {
      const { schoolInvoices } = action.payload;
      state.schoolInvoices = schoolInvoices;
    },
    setSchoolCollections: (state, action) => {
      const { schoolCollections } = action.payload;
      state.schoolCollections = schoolCollections;
    },
    setSchoolsList: (state, action) => {
      const { schoolsList } = action.payload;
      state.schoolsList = schoolsList;
    },
  },
  // extraReducers: {},
});

export const {
  setSchoolDetails,
  setSchoolInvoices,
  setSchoolCollections,
  setSchoolsList,
} = schoolSlice.actions;

export const selectSchoolDetails = (state) =>
  state?.school?.schoolDetails;
export const selectSchoolInvoices = (state) =>
  state?.school?.schoolInvoices;
export const selectSchoolsList = (state) =>
state?.school?.schoolsList;
export const selectSchoolCollections = (state) =>
  state?.school?.schoolCollections;


export default schoolSlice.reducer;
