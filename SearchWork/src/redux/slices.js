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
  jobsList : [],
  viewJob: null,
  savedJobList: [],
  applicants: [],
  profile: null,
  loggedInProfile: null
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
    },
    getViewJob: (state, action) => {
      state.viewJob = action.payload
    },
    getSaveJobList: (state, action) => {
      state.savedJobList = action.payload
    },
    getApplicantsList: (state, action) => {
      state.applicants = action.payload
    },
    getProfile: (state, action) => {
      state.profile = action.payload
    },
    getLoggedInProfile: (state, action) => {
      state.loggedInProfile = action.payload
    }
  }
});

export const { 
  setJobPost, 
  login, 
  isRememberMe, 
  saveUserCredential, 
  getJobCategory, 
  getJobList, 
  getViewJob, 
  getSaveJobList, 
  getApplicantsList, 
  getProfile, 
  getLoggedInProfile 
 } = slices.actions;
 

//Selectors
export const jobPostedSelector = (state) => state.nav.jobPosted;
export const userLogin = (state) => state.nav.userDetails;
export const rememberMeOperation = (state) => state.nav.rememberMeCheck;
export const userCredential = (state) => state.nav.userCredentials;
export const jobsCategoryList = (state) => state.nav.jobsCategory;
export const jobsListing = (state) => state.nav.jobsList;
export const jobViewDetails = (state) => state.nav.viewJob;
export const savedJobsList = (state) => state.nav.savedJobList;
export const applicants = (state) => state.nav.applicants;
export const applicantProfile = (state) => state.nav.profile;
export const loginUserProfile = (state) => state.nav.loggedInProfile;

export default slices.reducer;