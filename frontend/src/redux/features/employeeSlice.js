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

    const access_token = localStorage.getItem('token') || '';
    const config = {
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "Content-Type": "application/json"
        },
      };

    return new Promise((resolve, reject) => {
        axios
            .get(`http://localhost:5000/api/v1/me`,config)
            .then((response) => {
                if (response.data) {
                    console.log("response",response)
                    resolve(response.data);
                } else {
                    reject('Failed to Get All Docs.');
                }
            })
            .catch((error) => {
                if (error.response) {

                    if(error.response.data.message){
                        alert(error.response.data.message)
                    }
                    console.error("Server responded with error status:", error.response.status);
                    console.error("Error data:", error.response.data);
                } else if (error.request) {
                    console.error("No response received from server");
                } else {
                    console.error("Error setting up the request:", error.message);
                }
            
                reject(error);
                dispatch(employeeFailure(error.message));
            });
    });

}

export default employeeSlice.reducer;