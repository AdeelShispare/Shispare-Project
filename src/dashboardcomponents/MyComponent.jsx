import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import ReusableDialog from '../Utils/ReusableDialog'; // Import the ReusableDialog component


import { Dropdown } from 'primereact/dropdown';

const centerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  };
  
  const formStyle = {
    maxWidth: '400px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };
  
  function MyComponent() {
    const token = localStorage.getItem('token');
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      department: null,
      designation: null,
      project: null,
      report_to: null,
    });
  
    const [designationOptions, setDesignationOptions] = useState([]);
    const [departmentOptions, setDepartmentOptions] = useState([]);
    const [projectOptions, setProjectOptions] = useState([]);
    const [userOptions, setUserOptions] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDesignation, setSelectedDesignation] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
 
  const [selectedreport, setSelectedreport] = useState(null)
    const [visible, setVisible] = useState(false);
  
    const addfields = [
      {
        label: 'Name',
        type: 'text',
        name: 'name',
      },
      {
        label: 'Email',
        type: 'text',
        name: 'email',
      },
      {
        label: 'Password',
        type: 'password',
        name: 'password',
      },
      {
        label: 'Designation',
        type: 'dropdown',
        name: 'designation_id',
        options: designationOptions.map(option => ({ label: option.designation, value: option.id, })), // Pass designationOptions here
      },
      {
        label: 'Department',
        type: 'dropdown',
        name: 'department_id',
        options: departmentOptions.map(option => ({ label: option.department, value: option.id })),
      },
      {
        label: 'Project',
        type: 'dropdown',
        name: 'project_id',
        options: projectOptions.map(option => ({ label: option.project, value: option.id })),
      },
      {
        label: 'Report To',
        type: 'dropdown',
        name: 'report_to',
        options: userOptions.map(option => ({ label: option.name, value: option.id })),
      },
    ];
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
      fetchallusers('http://13.228.165.0/api/users', setUserOptions, requestOptions);
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
    const handleAddUser = (data) => {
      // Make a POST request to the API endpoint
      fetch('http://13.228.165.0/api/userstore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((responseData) => {
          // Handle the response from the API if needed
          console.log('Response from the API:', responseData);
          // Close the dialog
          setVisible(false);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };
  
    return (
      <div style={centerStyle}>
        <div style={formStyle}>
          <Button label="Add User" onClick={() => setVisible(true)} />
          <ReusableDialog
            width="50vw"
            height="70vh"
            title="Add User"
            visible={visible}
            onHide={() => setVisible(false)}
            fields={addfields}
            onSubmit={handleAddUser}
            onDesignationChange={handleDesignationChange}
        onDepartmentChange={handleDepartmentChange}
        onProjectChange={handleProjectChange}
        onuserChange={handleuserChange}
            buttonLabel="Add"
          />
        </div>
      </div>
    );
  }
  
  export default MyComponent;