import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isAuthenticated: false,
    loading: false,
    error: null,
    data: null,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.data = action.payload
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
    return new Promise((resolve, reject) => {
        axios
            .post('http://localhost:5000/api/v1/login', credentials)
            .then((response) => {
                if (response.data) {
                    console.log("response",response)
                    resolve(response.data);
                } else {
                    reject('Failed to Get All Docs.');
                }
            })
            .catch((error) => {
                reject(error);
                dispatch(loginFailure(error.message));
            });
    });
};

export default loginSlice.reducer;
