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
  rememberMeCheck : false,
  userCredentials: {
    email: '',
    password: ''
  },
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
    }
  }
});

export const {setJobPost, login, isRememberMe, saveUserCredential} = slices.actions;

//Selectors
export const jobPostedSelector = (state) => state.nav.jobPosted;
export const userLogin = (state) => state.nav.userDetails;
export const rememberMeOperation = (state) => state.nav.rememberMeCheck;
export const userCredential = (state) => state.nav.userCredentials;


export default slices.reducer;