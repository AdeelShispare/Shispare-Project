import React, { useState } from 'react';
import axios from 'axios';

function CreateUser() {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    department: { id: 91, name: 'Muhammad Adeel' }, // Replace with actual department data
    designation: { id: 10, name: 'Senior Software' }, // Replace with actual designation data
    project: { id: 34, name: 'Adeel' }, // Replace with actual project data
    report_to: { id: 111, name: 'Muhammad adeel' }, // Replace with actual report_to data
  });
  const token = localStorage.getItem('token');
  const handleCreateUser = async () => {
    try {
      const response = await axios.post('http://13.228.165.0/api/userstore', {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        user_relation: {
          department_id: newUser.department.id,
          designation_id: newUser.designation.id,
          project_id: newUser.project.id,
          report_to: newUser.report_to.id,
        },
      },{ headers: {
        'Authorization': `Bearer ${token}` 
      }});

      console.log('User created:', response.data);
      // Handle success or redirect to another page
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle the error, show a message, or handle accordingly
    }
  };

  return (
    <div>
      <h1>Create User</h1>
      <input
        type="text"
        placeholder="Name"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
      />
      <button onClick={handleCreateUser}>Create User</button>
    </div>
  );
}

export default CreateUser;
