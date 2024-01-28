// signupSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isRegistered: false,
  loading: false,
  error: null,
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state) => {
      state.loading = false;
      state.isRegistered = true;
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signupStart, signupSuccess, signupFailure } = signupSlice.actions;

// Async action using redux-thunk
export const signupUser = (userData) => async (dispatch) => {
  dispatch(signupStart());

  try {
    // Simulate an API call (replace with your actual API endpoint)
    const response = await axios.post('/api/v1/signup', userData);
    
    // Assuming a successful signup, update state
    dispatch(signupSuccess());
  } catch (error) {
    dispatch(signupFailure(error.message));
  }
};

export default signupSlice.reducer;
