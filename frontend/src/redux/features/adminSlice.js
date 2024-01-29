import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  employees: [],
  departments: [],
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
    fetchDepartmentsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDepartmentsSuccess: (state, action) => {
      state.loading = false;
      state.departments = action.payload;
    },
    fetchDepartmentsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createDepartmentStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createDepartmentSuccess: (state, action) => {
      state.loading = false;
      state.departments.push(action.payload);
    },
    createDepartmentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { 
  fetchEmployeesStart, 
  fetchEmployeesSuccess, 
  fetchEmployeesFailure, 
  fetchDepartmentsStart,
  fetchDepartmentsSuccess,
  fetchDepartmentsFailure,
  createDepartmentStart,
  createDepartmentSuccess,
  createDepartmentFailure, 
} = adminSlice.actions;

// Async action using redux-thunk
export const fetchEmployees = (location, name, role) => async (dispatch) => {
  dispatch(fetchEmployeesStart());

  const access_token = localStorage.getItem('token') || '';
  const config = {
    headers: {
      "Authorization": `Bearer ${access_token}`,
      "Content-Type": "application/json"
    },
  };

  let link = `http://localhost:5000/api/v1/admin/employees?name=${name}&location=${location}&role=${role}`;
  
  if((name && location && role) == undefined){
    link = `http://localhost:5000/api/v1/admin/employees`
  }


  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`${link}`, config);
      dispatch(fetchEmployeesSuccess(response.data.employee));
      resolve(response.data);
    } catch (error) {
      dispatch(fetchEmployeesFailure(error.message));
      if (error.response.data.message) {
        alert(error.response.data.message)
      }
      reject(error);
    }
  });
};

export const fetchAllDepartments = () => async (dispatch) => {
  dispatch(fetchDepartmentsStart());

  const access_token = localStorage.getItem('token') || '';
  const config = {
    headers: {
      "Authorization": `Bearer ${access_token}`,
      "Content-Type": "application/json"
    },
  };

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/admin/department`, config);
      dispatch(fetchDepartmentsSuccess(response.data));
      resolve(response.data);
    } catch (error) {
      dispatch(fetchDepartmentsFailure(error.message));
      if (error.response.data.message) {
        alert(error.response.data.message)
      }
      reject(error);
    }
  });
};

export const addDepartment = (departmentData) => async (dispatch) => {
  dispatch(createDepartmentStart());
  const access_token = localStorage.getItem('token') || '';
  const config = {
    headers: {
      "Authorization": `Bearer ${access_token}`,
      "Content-Type": "application/json"
    },
  };

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/v1/admin/department`,departmentData, config);
      dispatch(createDepartmentSuccess(response.data));
      console.log("response slice",response)
      resolve(response.data);
    } catch (error) {
      dispatch(createDepartmentFailure(error.message));
      if (error.response.data.message) {
        alert(error.response.data.message)
      }
      reject(error);
    }
  });
};

export default adminSlice.reducer;
