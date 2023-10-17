import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slice/userSlice"
import departreducer from "./slice/departmentslice";
export const store=configureStore({
    reducer:{
employeedata:todoReducer,
departmentdata:departreducer,
    },
});