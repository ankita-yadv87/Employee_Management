import { configureStore, combineReducers } from '@reduxjs/toolkit';
import signupReducer from './features/signUpSlice.js';
import loginReducer from './features/loginSlice.js';
import employeeReducer from './features/employeeSlice.js';

const rootReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,
  employee: employeeReducer
});

export const store = configureStore({
  reducer: rootReducer,
});
