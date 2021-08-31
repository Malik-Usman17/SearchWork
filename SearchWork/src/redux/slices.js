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
  userDetails: null
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
    }
  }
});

export const {setJobPost, login} = slices.actions;

//Selectors
export const jobPostedSelector = (state) => state.nav.jobPosted;
export const userLogin = (state) => state.nav.userDetails;


export default slices.reducer;