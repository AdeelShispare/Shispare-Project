// userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const makeApiRequest = createAsyncThunk('users/makeApiRequest', async (inputData, { dispatch }) => {
  const { method, url, headers, data } = inputData;

  try {
    let response = await axios({
      method,
      url,
      data,
      headers,
    });

    // if (response.status === 200) {
    //   // Handle a successful GET request (status code 200)
    //   console.log('GET request successful');
    //   return response.data;
    // } else if (response.status === 201) {
    //   // Handle a successful creation (status code 201)
    //   console.log('POST request successful');
    //   return response.data;
    // } else if (response.status === 204) {
    //   // Handle a successful delete (status code 204)
    //   console.log('DELETE request successful');
    //   return null; // You might return null for a successful delete
    // } else if (response.status === 204) {
    //   // Handle a successful update (status code 204)
    //   console.log('PUT request successful');
    //   return response.data;
    // } else {
    //   throw new Error('API request failed');
    // }
    return response.data;
  } catch (error) {
    throw error;
  }
});

// The rest of your code remains the same

const initialState = {

    isLoading: false,
    users: [], 
    isError: false,
    validationErrors: [],
  };
const adduserSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearValidationErrors: (state) => {
      state.validationErrors = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(makeApiRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
    });
    builder.addCase(makeApiRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.error.message)
        state.validationErrors = action.payload || [];
    });
  },
});

export const { clearValidationErrors } = adduserSlice.actions;

export default adduserSlice.reducer;
