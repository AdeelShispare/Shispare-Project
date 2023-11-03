import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slice/userSlice"
import departmentReducer from "./slice/departmentslice";
import adduserreducer from "./slice/addUserSlice"
export const store=configureStore({
    reducer:{
employeedata:todoReducer,
departmentdata:departmentReducer,
adduserdata:adduserreducer,
    },
});