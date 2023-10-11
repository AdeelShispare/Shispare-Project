import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
// import fetchData from "../apiUtils";
import { fetchData } from "../apiUtils";
export const fetchUsers=createAsyncThunk(
    "fetchusers",
    async ({ method, url }) => {
      // const { method, url } = options;
      try {
        const response = await fetchData(method,url );
      console.log(response)
        return response;
      } catch (error) {
        throw new Error(`Fetch API data error: ${error.message}`);
      }
    }
  );
//   export const fetchUsers=createAsyncThunk("fetchusers",async()=>{
//     fetchData({ method, url, body, headers });
   
// })
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
});


export default userSlice.reducer;