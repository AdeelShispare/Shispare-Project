import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addDepart, deleteDepart } from '../apiUtils';

export const addDepartment = createAsyncThunk(
  'addDepartment',
  async ({method, url, headers, data }) => {
    try {
     
      const response = await addDepart(method, url, headers, data
      );
      console.log(response)
      return response;
    } catch (error) {
      throw new Error(`Add Department API error: ${error.message}`);
    }
  }
);

export const deleteDepartments=createAsyncThunk(
  'deletedepart',
  async({method, url, headers})=>{
    try{
      const response=await deleteDepart(method, url, headers);
      console.log(response)
      if (response.status === 204) {
        return true; 
      } else {
        return false;
      }
    }
    catch(error){
      throw new Error(`Delete Department API error: ${error.message}`)
    }
  }
)

// export const updateDepartment = (id, updatedData) => async (dispatch, getState) => {
//   const token = localStorage.getItem('token');
//   // const token = getState().employeedata.token; // Assuming you store the token in employeedata
//   try {
//     const response = await fetch(`http://13.228.165.0/api/department/${id}/update`, {
//       method: 'PUT', // Use the appropriate HTTP method for updating
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedData),
//     });

//     if (response.status === 200) {
//       // Update the local state with the updated data
//       dispatch(updateDepartments(response.data));
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     console.error('API request failed:', error.message);
//     return false;
//   }
// };

// export const deleteDepartmentById = (id) => async (dispatch, getState) => {
//   // const token = getState().employeedata.token;
//   const token = localStorage.getItem('token');
//   try {
//     const response = await fetch(`http://13.228.165.0/api/department/${id}/delete`, {
//       method: 'DELETE', // Use the appropriate HTTP method for deleting
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });

//     if (response.status === 204) {
//       // Delete the department from the local state
//       dispatch(deleteDepartment(id));
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     console.error('API request failed:', error.message);
//     return false;
//   }
// };

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
