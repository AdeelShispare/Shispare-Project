import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

import { fetchData } from "../apiUtils";
import { logindata } from "../apiUtils";


export const fetchUsers=createAsyncThunk(
    "fetchusers",
    async ({ method, url,headers}) => {
      // const { method, url } = options;
      try {
        const response = await fetchData(method, url,headers);
      console.log(response)
        return response;
      } catch (error) {
        throw new Error(`Fetch API data error: ${error.message}`);
      }
    }
  );
  
  export const loginuser=createAsyncThunk("loginuser",
  async({method,url,headers,body})=>{
  
    try{
      const response=await logindata(method,url,headers,body);
      // console.log(response)
      // console.log(method)
      // console.log(url)
      // console.log(headers)
      console.log(body)
       
      return response
    }
    catch (error) {
      throw new Error(`Fetch API data error: ${error.message}`);
    }
  })
  export const updateDepartment = (id, updatedData) => async (dispatch, getState) => {
    const token = localStorage.getItem('token');
    // const token = getState().employeedata.token; // Assuming you store the token in employeedata
    try {
      const response = await fetch(`http://13.228.165.0/api/department/${id}/update`, {
        method: 'PUT', // Use the appropriate HTTP method for updating
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      if (response.status === 200) {
        // Update the local state with the updated data
        dispatch(updateDepartments(response.data));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('API request failed:', error.message);
      return false;
    }
  };
const initialState = {

    isLoading: false,
    data: [], 
    isError: false,
  };
const userSlice=createSlice({
   name:"data",
   initialState, 
   extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state,action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state,action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
  reducers: {
    updateDepartments: (state, action) => {
      // Update the departments data in the state
      state.data.departments = action.payload;
    },
    // deleteDepartment: (state, action) => {
    //   // Delete a department by its ID from the state
    //   state.data = state.data.filter((department) => department.id !== action.payload);
    // },
  },
});

export const { updateDepartments, deleteDepartment } = userSlice.actions;
export default userSlice.reducer;