import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobPosted: {
    jobTitle: '',
    hourlyPay: '',
    duration: 0,
    jobCategory: 0,
    jobSubCategory: 0,
    jobDescription: '',
    noOfEmployees: 0,
    state: 0,
    city: 0,
    zipCode: '',
    address: '',
  },
  userDetails: null,
  rememberMeCheck: false,
  userCredentials: {
    email: '',
    password: ''
  },
  jobsCategory: [],
  jobsList : []
}

export const slices = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setJobPost: (state, action) => {
      state.jobPosted = action.payload;
    },

    login: (state, action) => {
      state.userDetails = action.payload
    },

    saveUserCredential: (state, action) => {
      state.userCredentials = action.payload
    },

    isRememberMe: (state, action) => {
      state.rememberMeCheck = action.payload
    },

    getJobCategory: (state, action) => {
      state.jobsCategory = action.payload
    },
    getJobList: (state, action) => {
      state.jobsList = action.payload
    }
  }
});

export const { setJobPost, login, isRememberMe, saveUserCredential, getJobCategory, getJobList } = slices.actions;

//Selectors
export const jobPostedSelector = (state) => state.nav.jobPosted;
export const userLogin = (state) => state.nav.userDetails;
export const rememberMeOperation = (state) => state.nav.rememberMeCheck;
export const userCredential = (state) => state.nav.userCredentials;
export const jobsCategoryList = (state) => state.nav.jobsCategory;
export const jobsListing = (state) => state.nav.jobsList;

export default slices.reducer;