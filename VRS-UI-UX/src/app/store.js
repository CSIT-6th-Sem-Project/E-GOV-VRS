import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./alertSlice";
import authReducer from "./authSlice";
export const store = configureStore({
    reducer:{
        alert:alertReducer,
        auth:authReducer
    }
})