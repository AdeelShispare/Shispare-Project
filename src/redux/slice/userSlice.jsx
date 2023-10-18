import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

import { fetchData } from "../apiUtils";
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
  // reducers: {
  //   updateDepartments: (state, action) => {
  //     // Update the departments data in the state
  //     state.data = action.payload;
  //   },
  //   deleteDepartment: (state, action) => {
  //     // Delete a department by its ID from the state
  //     state.data = state.data.filter((department) => department.id !== action.payload);
  //   },
  // },
});


export default userSlice.reducer;