import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import fetchData from "../apiUtils"
export const fetchUsers=createAsyncThunk(
    "fetchApiData",
    async ({ method, url, body, headers }) => {
      try {
        const response = await fetchData({ method, url, body, headers });
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
   extraReducers:(builder)=>{
    builder.addCase(fetchUsers.pending,(state,action)=>{
        state.isLoading=true;
       
});
    builder.addCase(fetchUsers.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.data=action.payload;
    });
    builder.addCase(fetchUsers.rejected,(state,action)=>{
        console.log("error",action.payload);
        state.isError=true;
});
   }
});


export default userSlice.reducer;