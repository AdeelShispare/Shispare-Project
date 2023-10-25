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

import { Dropdown } from 'primereact/dropdown';
function Users() {
  // const dispatch=useDispatch();
  // const state = useSelector((state) => state.employeedata.data);
  // console.log(state)
  // useEffect(() => {
  //   dispatch(fetchUsers({ method:"GET", url: 'http://127.0.0.1:8000/api/designations',headers:{
  //     "content-type": "application/json",
  //     "accept": "application/json"
  //   } }));
  // }, [dispatch]);
  // const data = state.data; 
  // console.log(data)
  const [visible, setVisible] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDesignation, setSelectedDesignation] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [designationOptions, setDesignationOptions] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);
  const token = localStorage.getItem('token');
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
  }, []);

 
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
  
  const addfields = [
    {
      name: 'firstname',
      label: 'First Name',
      type: 'text',
      placeholder: 'Muhammad',
      required: true,
    },
    {
      name: 'lastname',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Adeel',
      required: true,
    },
    {
      name: 'designation',
      label: 'Designation',
      type: 'dropdown',
      options: designationOptions.map(option => ({ label: option.designation })),
     
      required: true,
    },
    {
      name: 'department',
      label: 'Department',
      type: 'dropdown',
      options: departmentOptions.map(option => ({ label: option.department })),
      required: true,
    },
    {
      name: 'project',
      label: 'Project',
      type: 'dropdown',
      options: projectOptions.map(option => ({ label: option.project })),
      required: true,
    },
    {
      name: 'Manager',
      label: 'Manager Name',
      type: 'dropdown',
      placeholder: 'Manager Name',
      required: true,
    },
  ];
  console.log(designationOptions);
  const data = [];

  for (let i = 3; i <= 17; i++) {
    const entry = {
      id: i,
      employeeNumber: `EMP00${i}`,
      employeeName: `Employee ${i}`,
      attendanceDate: '2023-01-07',
      changeType: i % 2 === 0 ? 'In' : 'Out',
      status: i % 3 === 0 ? 'Approved' : 'Pending',
      approval:   <BsPerson />,
      addedOn: `2023-01-07 ${(i % 12) + 1}:${(i % 60).toString().padStart(2, '0')} ${i < 12 ? 'AM' : 'PM'}`,
      action: '...'
    };
    
    data.push(entry);
  }
  const UsersColumns = [
    { field: "employeeNumber", header: "EMPLOYEE#" },
    { field: "employeeName", header: "EMPLOYEE" },
    { field: "attendanceDate", header: "ATTENDENCE DATE" },
    { field: "changeType", header: "CHANGE TYPE" },
    { field: "status", header: "STATUS" },
    { field: "approval", header: "APPROVALS" },
    { field: "addedOn", header: "ADDED ON" },
    
 
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
  return (
    <div>
      <Navbar/>
      <Sidebar/>
      <h1 style={{marginRight:"1020px",paddingTop: "40px",paddingBottom:"10px" }}>Users</h1>
      <Menu/>
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
        title="Add User"
        visible={visible}
        onHide={() => setVisible(false)}
        fields={addfields}
        // onSubmit={handleAdddesignation}
        buttonLabel="Add" 
        onDesignationChange={handleDesignationChange}
        onDepartmentChange={handleDepartmentChange}
        onProjectChange={handleProjectChange}
        buttonStyle={{ marginTop: '15px',float:"right" }}
        // onChange={(e) => setSelectedProject(e.value)}
      />
      
      <SharedGrid data={data} columns={UsersColumns} />

    </div>
  )
}

export default Users
  