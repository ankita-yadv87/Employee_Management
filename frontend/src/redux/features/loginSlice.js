import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isAuthenticated: false,
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state) => {
      state.loading = false;
      state.isAuthenticated = true;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = loginSlice.actions;

// Async action using redux-thunk
export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginStart());

  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', credentials);
    
    // Assuming a successful login, update state
    dispatch(loginSuccess());
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export default loginSlice.reducer;
