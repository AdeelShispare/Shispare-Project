import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers=createAsyncThunk("fetchusers",async()=>{
    const response=await fetch("https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1001");
    return response.json();
})
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