import React,{useEffect,useState} from 'react'
import SharedGrid from './SharedGrid.jsx';
import Navbar from '../Utils/Navbar.js';
import Sidebar from '../Utils/Sidebar.js';
import Menu from '../Utils/Menu.jsx';
import { BsPerson } from 'react-icons/bs';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/slice/userSlice.jsx';
import { fetchData } from "../redux/apiUtils.js"
import ReusableDialog from '../Utils/ReusableDialog.jsx';
import { addDepartment, deleteDepartments, updateDepartments } from '../redux/slice/departmentslice.jsx';
import { Dropdown } from 'primereact/dropdown';
import YourComponent from './YourComponent.jsx';
import CreateUser from './CreateUser.js';
import MyComponent from './MyComponent.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeApiRequest } from '../redux/slice/addUserSlice.jsx';
function Users() {
  const token = localStorage.getItem('token');
  const dispatch=useDispatch();
  const data = useSelector((state) => state.employeedata.data.data);
  const [validationErrors, setValidationErrors] = useState({});
   console.log(data)
   const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department_id: null,
    designation_id: null,
    project_id: null,
    report_to: null,
  });

   useEffect(() => {
    if (token) {
      dispatch(
        fetchUsers({
          method: 'GET',
          url: 'http://13.228.165.0/api/users',
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        })
      );
    }
  }, [dispatch, token]);
  const [visible, setVisible] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDesignation, setSelectedDesignation] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [designationOptions, setDesignationOptions] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);
  const [reportOptions, setreportOptions] = useState([]);
  const [selectedreport, setSelectedreport] = useState(null)
  const [updateVisible, setUpdateVisible] = useState(false);
  const [updateuser, setUpdateuser] = useState('');
  const [userIdToUpdate, setUserIdToUpdate] = useState(null);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  
    fetchDepartments('http://13.228.165.0/api/departments', setDepartmentOptions, requestOptions);
    fetchDesignations('http://13.228.165.0/api/designations', setDesignationOptions, requestOptions);
    fetchProjects('http://13.228.165.0/api/projects', setProjectOptions, requestOptions);
    fetchallusers('http://13.228.165.0/api/users', setreportOptions, requestOptions);
  }, []);

  
  const fetchallusers = (apiUrl, setState, options) => {
    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data && Array.isArray(data.data)) {
          setState(data.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching users from API:', error);
      });
  };
  const fetchDesignations = (apiUrl, setState, options) => {
    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.designations && Array.isArray(data.designations)) {
          setState(data.designations);
        }
      })
      .catch((error) => {
        console.error('Error fetching designations from API:', error);
      });
  };
  
  const fetchDepartments = (apiUrl, setState, options) => {
    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.departments && Array.isArray(data.departments)) {
          setState(data.departments);
        }
      })
      .catch((error) => {
        console.error('Error fetching departments from API:', error);
      });
  };
  
  const fetchProjects = (apiUrl, setState, options) => {
    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(options)
        if (data && data.projects && Array.isArray(data.projects)) {
          setState(data.projects);
          console.log(data.projects)
        }
      })
      .catch((error) => {
        console.error('Error fetching projects from API:', error);
      });
  };


  const handleDeleteuser = (id) => {
    const requestData = {
      method: 'DELETE',
      url: `http://13.228.165.0/api/user/${id}/delete`,
      headers: {
       
        'Authorization': `Bearer ${token}`,
      },

    };
  
    dispatch(makeApiRequest(requestData))
      .then((responseData) => {
        console.log('Response from the API:', responseData);
        // Handle the response as needed
  
        if (responseData) {
          toast.success('User deleted successfully', {
            position: 'top-right',
            autoClose: 3000, // Close the toast after 3 seconds (adjust as needed)
          });
          console.log(id,responseData)
          dispatch(
            fetchUsers({
              method: 'GET',
              url: 'http://13.228.165.0/api/users',
              headers: {
                'Authorization': `Bearer ${token}` 
              }
            })
          );
        } else {
          toast.error('Failed to delete department', {
            position: 'top-right',
            autoClose: 3000, // Close the toast after 3 seconds (adjust as needed)
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        console.error('Error response:', error.response); // Log the error response
      });
  };
  
  
//   const handleDeleteuser = async (id) => {
    
//     const success = await dispatch(deleteDepartments({
//     method: 'DELETE',
//     url: `http://13.228.165.0/api/user/${id}/delete`,
//     headers: {
//       'Authorization': `Bearer ${token}` 
//     }
//   }
//   ));
//   if (success) {
//     toast.success('User deleted successfully', {
//       position: 'top-right',
//       autoClose: 3000, // Close the toast after 3 seconds (adjust as needed)
//     });
//     console.log(id,success)
//     dispatch(
//       fetchUsers({
//         method: 'GET',
//         url: 'http://13.228.165.0/api/users',
//         headers: {
//           'Authorization': `Bearer ${token}` 
//         }
//       })
//     );
//   } else {
//     toast.error('Failed to delete department', {
//       position: 'top-right',
//       autoClose: 3000, // Close the toast after 3 seconds (adjust as needed)
//     });
//   }
// };
const handleAddUser = (data) => {
  const requestData = {
    method: 'POST',
    url: 'http://13.228.165.0/api/userstore',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    data: data,
  };

  dispatch(makeApiRequest(requestData))
    .then((responseData) => {
      console.log('Response from the API add:', responseData);
      // Handle the response as needed
      const apierr = responseData?.payload?.response?.data?.errors;
console.log("adeel",responseData.payload.response.data.errors)

       dispatch(
        fetchUsers({
          method: 'GET',
          url: 'http://13.228.165.0/api/users',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
      );
      
       setVisible(false);
    })
    .catch((error) => {
      console.error('Error:', error);
      console.error('Error response:', error.response); // Log the error response
    });
};


// const handleAddUser = (data) => {
//   // Make a POST request to the API endpoint
//   fetch('http://13.228.165.0/api/userstore', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//     },
//     body: JSON.stringify(data),
//   })
//     .then((response) => response.json())
//     .then((responseData) => {
//       // Handle the response from the API if needed
//       console.log('Response from the API:', responseData);
//       // Close the dialog
//       dispatch(
//         fetchUsers({
//           method: 'GET',
//           url: 'http://13.228.165.0/api/users',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         })
//       );
//       toast.success(`${data.name} User has created successfully`, {
//         position: 'top-right',
//         autoClose: 3000, // Close the toast after 3 seconds (adjust as needed)
//       });
//       setVisible(false);
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
// };

const addfields = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: '',
    required: true,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: '',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '******',
    required: true,
  },
  {
    name: 'designation_id',
    label: 'Designation',
    type: 'dropdown',
    options: designationOptions.map(option => ({
      label: option.designation,
      value: option.id,
    })),
    required: true,
  },
  {
    name: 'department_id',
    label: 'Department',
    type: 'dropdown',
    options: departmentOptions.map(option => ({
      label: option.department,
      value: option.id,
    })),
    required: true,
  },
  {
    name: 'project_id',
    label: 'Project',
    type: 'dropdown',
    options: projectOptions.map(option => ({
      label: option.project,
      value: option.id,
    })),
    required: true,
  },
  {
    name: 'report_to',
    label: 'Report To',
    type: 'dropdown',
    options: reportOptions.map(option => ({
      label: option.name,
      value: option.id,
    })),
    required: true,
  },
];



  const UsersColumns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: ' Name' },
    { field: 'email', header: 'Email' },
    { field: 'department_id', header: 'Department' },
  { field: 'designation_id', header: 'Designation' },
  { field: 'project_id', header: 'Project' },
  { field: 'report_to', header: 'Report to' },
    // { field: 'project', header: 'Project' },
    // { field: 'Manager', header: 'Manager Name' },
  ];  

  const handleDesignationChange = (value) => {
  setSelectedDesignation(value);
  console.log("setSelectedDesignation",value)
};

const handleDepartmentChange = (value) => {
  
  setSelectedDepartment(value);
  console.log("setSelectedDepartment",value)
};

const handleProjectChange = (value) => {
  setSelectedProject(value);
  console.log("setSelectedProject",value)
};
const handleuserChange = (value) => {
  setSelectedreport(value);
  console.log("setSelecteduser",value)
};


const handleUpdateUser = (data) => {
  const requestData = {
    method: 'PUT',
    url: `http://13.228.165.0/api/user/${userIdToUpdate}/update`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    data: data,
  };

  dispatch(makeApiRequest(requestData))
    .then((responseData) => {
      console.log('Response from the API:', responseData);
     
      if(responseData.type==="users/makeApiRequest/rejected"){
                  toast.warning(`User has not updated  all fields are required to fill`, {
                    position: 'top-right',
                    autoClose: 3000, 
                  });
                }
                else{
                  toast.success(`${data.name} User Updated successfully`, {
                    position: 'top-right',
                    autoClose: 3000, 
                  });
       dispatch(
        fetchUsers({
          method: 'GET',
          url: 'http://13.228.165.0/api/users',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
      );
      }
      setUpdateVisible(false);
        setUserIdToUpdate(null);
    })
    .catch((error) => {
      console.error('Error:', error);
      console.error('Error response:', error.response); 
    });
};


// const handleUpdateUser = (data) => {
//   // Make a PUT request to the API endpoint with the user's ID
//   if (userIdToUpdate) {
    
//     fetch(`http://13.228.165.0/api/user/${userIdToUpdate}/update`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => response.json())
//       .then((responseData) => {
//         // Handle the response from the API if needed
//         console.log('Response from the API:', responseData);
//         if(responseData.message==="Validation error"){
//           toast.warning(`User has not updated  all fields are required to fill`, {
//             position: 'top-right',
//             autoClose: 3000, // Close the toast after 3 seconds (adjust as needed)
//           });
//         }
//         else{
//           toast.success(`${data.name} User Updated successfully`, {
//             position: 'top-right',
//             autoClose: 3000, // Close the toast after 3 seconds (adjust as needed)
//           });
//           dispatch(
//             fetchUsers({
//               method: 'GET',
//               url: 'http://13.228.165.0/api/users',
//               headers: {
//                 'Authorization': `Bearer ${token}`,
//               },
//             })
//           );
           
//         }
//         // Close the dialog
       
//         setUpdateVisible(false);
//         setUserIdToUpdate(null);
//       })
//       .catch((error) => {
      
//         console.error('Error:', error);
//       });
//   } else {
//     // Handle the case where userIdToUpdate is not available
//   }
// };
const [selectedUserForUpdate, setSelectedUserForUpdate] = useState(null);
if (!data) {
  // Handle the case where data is not available yet
  return (
    <div>
      <Navbar />
      <Sidebar />
      <h1 style={{marginRight:"1020px",paddingTop: "40px",paddingBottom:"10px" }}>Users</h1>
      <Menu />
      <p>Loading...</p>
    </div>
  );
}

  return (
    <div>
      <Navbar/>
      <Sidebar/>
      <h1 style={{marginRight:"1020px",paddingTop: "40px",paddingBottom:"10px" }}>Users</h1>
      <Menu/>
   {/* <MyComponent/> */}
   
      <div className="department-container">
      <div className="departbutton">
          <Button
            label="Add User"
            icon="pi pi-plus"
             onClick={() => setVisible(true)}
          />
        </div>
        </div>
  
        <ReusableDialog
      width="50vw"
       height="85vh"
        title="Add User"
        visible={visible}
        onHide={() => setVisible(false)}
        fields={addfields}
        onSubmit={handleAddUser}
        buttonLabel="Add" 
        validationErrors={validationErrors}
        // onDesignationChange={handleDesignationChange}
        // onDepartmentChange={handleDepartmentChange}
        // onProjectChange={handleProjectChange}
        // onuserChange={handleuserChange}
        buttonStyle={{ marginTop: '15px',float:"right" }}
        // onChange={(e) => setSelectedProject(e.value)}
      />
       <ReusableDialog
 width="50vw"
 height="85vh"
        title="Update Designation"
        visible={updateVisible}
        onHide={() => setUpdateVisible(false)}
        fields={addfields}
        onSubmit={handleUpdateUser}
        buttonLabel="Update"
        initialValues={formData}
        // onDesignationChange={handleDesignationChange}
        // onDepartmentChange={handleDepartmentChange}
        // onProjectChange={handleProjectChange}
        // onuserChange={handleuserChange}
     
        // initialValues={{ updateuser }} // Pass the initial value to the dialog
      //  onChange={(e) => setUpdateuser(e.target.value)} // Update the state when the user changes the input
      />
        <ToastContainer />
      <SharedGrid data={data} columns={UsersColumns}
        handleUpdate={(id, userData) => {
          setUserIdToUpdate(id);
           setSelectedUserForUpdate(userData);
          
            setFormData({
              name: userData.name,
              email: userData.email,
              password: userData.password, 
              department_id: userData.department_id,
              designation_id: userData.designation_id,
              project_id: userData.project_id,
              report_to: userData.report_to,
            });
          
          console.log(id)
          
          // setUpdateuser(previoususer.name); // Clear the input field
          setUpdateVisible(true);
        }}
        handleDelete={handleDeleteuser} 
        />

    </div>
  )
}

export default Users
  