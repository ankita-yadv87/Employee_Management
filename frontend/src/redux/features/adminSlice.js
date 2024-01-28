import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  employees: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    fetchEmployeesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchEmployeesSuccess: (state, action) => {
      state.loading = false;
      state.employees = action.payload;
    },
    fetchEmployeesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchEmployeesStart, fetchEmployeesSuccess, fetchEmployeesFailure } = adminSlice.actions;

// Async action using redux-thunk
export const fetchEmployees = () => async (dispatch) => {
  dispatch(fetchEmployeesStart());

  const access_token = localStorage.getItem('token') || '';
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/admin/employees');
      dispatch(fetchEmployeesSuccess(response.data.employee));
      resolve(response.data);
    } catch (error) {
      dispatch(fetchEmployeesFailure(error.message));
      if(error.response.data.message){
        alert(error.response.data.message)
    }
      reject(error);
    }
  });
};

export default adminSlice.reducer;
