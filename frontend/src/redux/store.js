import { configureStore, combineReducers } from '@reduxjs/toolkit';
import signupReducer from './features/signUpSlice.js';
import loginReducer from './features/loginSlice.js';

const rootReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
