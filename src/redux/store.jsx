import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slice/userSlice"
export const store=configureStore({
    reducer:{
data:todoReducer,
    },
});