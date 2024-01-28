import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isAuthenticated: false,
    loading: false,
    error: null,
    data: null,
};

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        employeeStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        employeeSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.data = action.payload
        },
        employeeFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { employeeStart, employeeSuccess, employeeFailure } = employeeSlice.actions;

// Async action using redux-thunk
export const getEmployee = () => async (dispatch) => {
    dispatch(employeeStart());

    const access_token = localStorage.getItem('jwt_access_token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;

    return new Promise((resolve, reject) => {
        axios
            .get('http://localhost:5000/api/v1/me')
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

}

export default employeeSlice.reducer;