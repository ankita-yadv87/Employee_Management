// signupSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isRegistered: false,
    loading: false,
    error: null,
    data:null,
};

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        signupStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signupSuccess: (state,action) => {
            state.loading = false;
            state.isRegistered = true;
            state.data = action.payload;
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
    console.log("signupaction", userData)
    dispatch(signupStart());

    try {
        // Simulate an API call (replace with your actual API endpoint)
        const response = await axios.post('http://localhost:5000/api/v1/signup', userData);

        console.log("response", response)
        // Assuming a successful signup, update state
        dispatch(signupSuccess(response.data));
    } catch (error) {
        console.log("Error", error)
        if(error.response.data.message){
            alert(error.response.data.message)
        }
        dispatch(signupFailure(error.message));
    }
};

export default signupSlice.reducer;
