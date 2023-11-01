import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import ReusableDialog from '../Utils/ReusableDialog';
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
    id: null, // Add an ID field for updates
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
  const [selectedReport, setSelectedReport] = useState(null);
  const [visible, setVisible] = useState(false);
  const [usersData, setUsersData] = useState([]); // Store the user data

  const addfields = [
    {
      label: 'User ID',
      type: 'text',
      name: 'id',
      disabled: true,
    },
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
      options: designationOptions.map(option => ({ label: option.designation, value: option.id })),
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
        'Authorization': `Bearer ${token}`,
      },
    };

    fetchDepartments('http://13.228.165.0/api/departments', setDepartmentOptions, requestOptions);
    fetchDesignations('http://13.228.165.0/api/designations', setDesignationOptions, requestOptions);
    fetchProjects('http://13.228.165.0/api/projects', setProjectOptions, requestOptions);
    fetchAllUsers('http://13.228.165.0/api/users', setUserOptions, requestOptions);
  }, []);

  // Fetch user data when the component mounts
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };

  }, [token]);
  const fetchAllUsers = (apiUrl, setState, options) => {
    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data && Array.isArray(data.data)) {
          setState(data.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching designations from API:', error);
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
        if (data && data.projects && Array.isArray(data.projects)) {
          setState(data.projects);
        }
      })
      .catch((error) => {
        console.error('Error fetching projects from API:', error);
      });
  };

  const handleDesignationChange = (value) => {
    setSelectedDesignation(value);
  };

  const handleDepartmentChange = (value) => {
    setSelectedDepartment(value);
  };

  const handleProjectChange = (value) => {
    setSelectedProject(value);
  };

  const handleUserChange = (value) => {
    setSelectedReport(value);
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

  const handleUpdateUser = (data) => {
    // Make a PUT request to the API endpoint with the user's ID
    fetch(`http://13.228.165.0/api/user/${data.id}/update`, {
      method: 'PUT',
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
        <Button
          label="Add User"
          onClick={() => {
            setFormData({
              id: null,
              name: '',
              email: '',
              password: '',
              department: null,
              designation: null,
              project: null,
              report_to: null,
            });
            setVisible(true);
          }}
        />
        <Button
          label="Edit User"
          onClick={() => {
            // Fetch the user's data to edit from the API
            const userId = 134;
            const userToUpdate = usersData.find((user) => user.id === userId);
            if (userToUpdate) {
              setFormData({
                id: userToUpdate.id,
                name: userToUpdate.name,
                email: userToUpdate.email,
                password: '',
                department: userToUpdate.department_id,
                designation: userToUpdate.designation_id,
                project: userToUpdate.project_id,
                report_to: userToUpdate.report_to,
              });
              setVisible(true);
            } else {
              console.error(`User with ID ${userId} not found.`);
            }
          }}
        />
        <ReusableDialog
          width="50vw"
          height="70vh"
          title={formData.id ? 'Edit User' : 'Add User'}
          visible={visible}
          onHide={() => {
            setFormData({
              id: null,
              name: '',
              email: '',
              password: '',
              department: null,
              designation: null,
              project: null,
              report_to: null,
            });
            setVisible(false);
          }}
          fields={addfields}
          onSubmit={formData.id ? handleUpdateUser : handleAddUser}
          onDesignationChange={handleDesignationChange}
          onDepartmentChange={handleDepartmentChange}
          onProjectChange={handleProjectChange}
          onUserChange={handleUserChange}
          buttonLabel={formData.id ? 'Update' : 'Add'}
        />
      </div>
    </div>
  );
}

export default MyComponent;
