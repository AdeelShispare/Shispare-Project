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
function Users() {
  const token = localStorage.getItem('token');
  const dispatch=useDispatch();
  const users = useSelector((state) => state.employeedata.data.users);
   console.log(users)
   
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
  const [userOptions, setuserOptions] = useState([]);
  const [selecteduser, setSelecteduser] = useState(null)
  
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
    fetchallusers('http://13.228.165.0/api/users', setuserOptions, requestOptions);
  }, []);

  
  const fetchallusers = (apiUrl, setState, options) => {
    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.users && Array.isArray(data.users)) {
          setState(data.users);
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



  
  const handleDeleteuser = async (id) => {
    
    const success = await dispatch(deleteDepartments({
    method: 'DELETE',
    url: `http://13.228.165.0/api/user/${id}/delete`,
    headers: {
      'Authorization': `Bearer ${token}` 
    }
  }
  ));
  if (success) {
    console.log(id,success)
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
  
  }
};



const handleAddUser = async (newUser) => {
  try {
    
    const response = await dispatch(
      addDepartment({
        method: 'POST',
        url: 'http://13.228.165.0/api/userstore',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          user_relation: {
            department_id: newUser.department.department,
            designation_id: newUser.designation.designation,
            project_id: newUser.project.project,
            report_to: newUser.reports_to,
          },
        },
      })
    );

    if (response.error) {
      console.error('User creation error:', response.error);
    } else {
      console.log('User created successfully:', response.payload);
      // Refresh the user list
      dispatch(
        fetchUsers({
          method: 'GET',
          url: 'http://13.228.165.0/api/users',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
      );
      // Close the dialog
      setVisible(false);
    }
  } catch (error) {
    console.error('API request failed:', error.message);
    // Handle API request error
  }
};


  const addfields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'Muhammad Adeel',
      required: true,
    },
    {
      name: 'email',
      label: 'email',
      type: 'email',
      placeholder: 'adeelmuhammad@gmail.com',
      required: true,
    },
    {
      name: 'password',
      label: 'password',
      type: 'password',
      placeholder: '******',
      required: true,
    },
    {
      name: 'designation',
      label: 'Designation',
      type: 'dropdown',
      options: designationOptions.map(option => ({ label: option.designation, value: option.designation, })),
      required: true,
    },
    {
      name: 'department',
      label: 'Department',
      type: 'dropdown',
      options: departmentOptions.map(option => ({ label: option.department, value: option.department })),
      required: true,
    },
    {
      name: 'project',
      label: 'Project',
      type: 'dropdown',
      options: projectOptions.map(option => ({ label: option.project, value: option.project })),
      required: true,
    },
    {
      name: 'users',
      label: 'Report',
      type: 'dropdown',
      options: userOptions.map(option => ({ label: option.name, value: option.name })),
      required: true,
    },
    // {
    //   name: 'report',
    //   label: 'Report to',
    //   type: 'text',
    //   placeholder: 'report to',
    //   required: true,
    // },
  ];
   console.log(departmentOptions.map(option => ({ label: option.department, value: option.id })))
  // const [data, setData] = useState([]);

 


  const UsersColumns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: ' Name' },
    { field: 'email', header: 'Email' },
    { field: 'user_relation.department.department', header: 'Department' },
  { field: 'user_relation.designation.designation', header: 'Designation' },
  { field: 'user_relation.project.project', header: 'Project' },
  { field: 'user_relation.reports_to.name', header: 'User' },
    // { field: 'project', header: 'Project' },
    // { field: 'Manager', header: 'Manager Name' },
  ];  
  const handleFormSubmit = (formData) => {
   
  };
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
  setSelecteduser(value);
  console.log("setSelecteduser",value)
};
if (!users) {
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
      {/* <YourComponent/> */}
      <CreateUser/>
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
       height="70vh"
        title="Add User"
        visible={visible}
        onHide={() => setVisible(false)}
        fields={addfields}
        onSubmit={handleAddUser}
        buttonLabel="Add" 
        onDesignationChange={handleDesignationChange}
        onDepartmentChange={handleDepartmentChange}
        onProjectChange={handleProjectChange}
        onuserChange={handleuserChange}
        buttonStyle={{ marginTop: '15px',float:"right" }}
        // onChange={(e) => setSelectedProject(e.value)}
      />
      
      <SharedGrid data={users} columns={UsersColumns}
        // handleUpdate={(id,previousdesignation) => {
        //   setdesignationIdToUpdate(id,previousdesignation);
        //   setUpdatedesignation(previousdesignation.designation); // Clear the input field
        //   setUpdateVisible(true);
        // }}
        handleDelete={handleDeleteuser} 
        />

    </div>
  )
}

export default Users
  