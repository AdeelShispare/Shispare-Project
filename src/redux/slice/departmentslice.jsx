import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addDepart } from '../apiUtils';

export const addDepartment = createAsyncThunk(
  'addDepartment',
  async ({method, url, headers, data }) => {
    try {
      // Make an API request to add a new department
      const response = await addDepart(method, url, headers, data
      );
      console.log(response)
      return response;
    } catch (error) {
      throw new Error(`Add Department API error: ${error.message}`);
    }
  }
);


const initialState = {
  isLoading: false,
  data: [], // This might hold an array of departments
  isError: false,
};

const departmentSlice = createSlice({
  name: 'departments',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addDepartment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addDepartment.fulfilled, (state, action) => {
      state.isLoading = false;
      // Assuming the response contains the newly added department data
      state.data.push(action.payload);
    });
    builder.addCase(addDepartment.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default departmentSlice.reducer;
