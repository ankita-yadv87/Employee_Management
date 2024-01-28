import {configureStore} from '@reduxjs/toolkit'
import signupReducer from './features/signUpSlice.js'

export const store = configureStore({
    reducer: signupReducer
});