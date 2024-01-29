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
        logoutStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        logoutSuccess: (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.data = null
        },
        logoutFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

// const logoutSlice = createSlice({
//     name: 'logout',
//     initialState,
//     reducers: {
//         logoutStart: (state) => {
//             state.loading = true;
//             state.error = null;
//         },
//         logoutSuccess: (state) => {
//             state.loading = false;
//             state.isAuthenticated = false;
//             state.data = null
//         },
//         logoutFailure: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         },
//     },
// });

export const { loginStart, loginSuccess, loginFailure, logoutStart, logoutSuccess, logoutFailure } = loginSlice.actions;

// Async action using redux-thunk
export const loginUser = (credentials) => async (dispatch) => {
    dispatch(loginStart());
    return new Promise((resolve, reject) => {
        axios
            .post('http://localhost:5000/api/v1/login', credentials)
            .then((response) => {
                if (response.data) {
                    console.log("response", response)
                    resolve(response.data);
                } else {
                    reject('Failed to Login');
                }
            })
            .catch((error) => {
                if (error.response) {

                    if (error.response.data?.message) {
                        alert(error.response.data.message)
                    }
                    console.error("Server responded with error status:", error.response.status);
                    console.error("Error data:", error.response.data);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error("No response received from server");
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error("Error setting up the request:", error.message);
                }

                reject(error);
                dispatch(loginFailure(error.message));
            });
    });
};

export const logoutUser = () => async (dispatch) => {
    dispatch(logoutStart());

    const access_token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;

    return new Promise((resolve, reject) => {
        axios
            .get('http://localhost:5000/api/v1/logout')
            .then((response) => {
                if (response.data) {
                    console.log("response", response)
                    dispatch(logoutSuccess());
                    resolve(response.data);
                } else {
                    reject('Failed to logout');
                }
            })
            .catch((error) => {
                reject(error);
                dispatch(logoutFailure(error.message));
            });
    });
};

export default loginSlice.reducer;
