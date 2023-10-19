import React,{useEffect,useState} from 'react'
import Navbar from '../Utils/Navbar.js';
import Sidebar from '../Utils/Sidebar.js';
import Menu from '../Utils/Menu.jsx';
import SharedGrid from './SharedGrid.jsx';
import { BsPerson } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/slice/userSlice.jsx';
import { addDepartment, deleteDepartments } from '../redux/slice/departmentslice.jsx';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { updateDepartment } from '../redux/slice/userSlice.jsx';

import "./Department.css"
function Department() {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.employeedata.data.departments); 
  const [editingDepartment, setEditingDepartment] = useState(null);
  const token = localStorage.getItem('token');
  const [newDepartment, setNewDepartment] = useState('');
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  console.log(departments);
   useEffect(() => {
    if (token) {
      dispatch(
        fetchUsers({
          method: 'GET',
          url: 'http://13.228.165.0/api/departments',
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        })
      );
    }
  }, [dispatch, token]);

  const handleDeleteDepartment = async (id) => {
  
      const success = await dispatch(deleteDepartments({
      method: 'DELETE',
      url: `http://13.228.165.0/api/department/${id}/delete`,
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
          url: 'http://13.228.165.0/api/departments',
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        })
      );
    } else {
    
    }
  };
  const handleUpdateDepartment = async (id, updatedData) => {
    const success = await dispatch(updateDepartment(id, updatedData));
    if (success) {
      // Close the editing form and clear the editing department
      setEditingDepartment(null);
    } else {
      // Handle failure, e.g., show an error message
    }
  };

  const handleEditDepartment = (id) => {
    // Set the department ID you want to edit
    setEditingDepartment(id);

    // Retrieve the department data based on the ID
    const departmentToEdit = departments.find((department) => department.id === id);

    // Set the current department name in the input field
    setNewDepartment(departmentToEdit.department);

    // Display the editing form
    setVisible(true);
  };

  const handleCancelEdit = () => {
    // Cancel the editing and clear the input field
    setEditingDepartment(null);
    setNewDepartment('');

    // Hide the editing form
    setVisible(false);
  };

  
  const handleAddDepartment = async (e) => {
    e.preventDefault()
    try {
      
      const response = await dispatch(
        addDepartment({
          method: 'POST',
          url: 'http://13.228.165.0/api/departmentstore',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', 
          },
          data: {
            department: newDepartment, 
          }
        })
      );
      console.log(response);

    
      if (response) {
        console.log('Department created successfully:', response);
        dispatch(
          fetchUsers({
            method: 'GET',
            url: 'http://13.228.165.0/api/departments',
            headers: {
              'Authorization': `Bearer ${token}` 
            }
          })
        );
       
        setNewDepartment(''); 
       
  
       

        setVisible(false);
      }
    } catch (error) {
      console.error('API request failed:', error.message);
      setError('Department creation failed. Please try again.');
    }
  };

  // const handleUpdateDepartment = (id, updatedData) => {
  //   // Call the updateDepartment action with the id and updated data
  //   dispatch(updateDepartment(id, updatedData));
  // };

  if (!departments) {
    // Handle the case where data is not available yet
    return (
      <div>
        <Navbar />
        <Sidebar />
        <h1 style={{ marginRight: "920px", paddingTop: "50px" }}>Department</h1>
        <Menu />
        <p>Loading...</p>
      </div>
    );
  }
  
  const RecruitmentColumns = [
    { field: 'id', header: 'ID#' },
    { field: 'department', header: 'Department' },
    //  { field: 'created_at', header: 'created_at ' },
    // { field: 'changeType', header: 'CHANGE TYPE' },
    // { field: 'status', header: 'STATUS' },
    // { field: 'approval', header: 'APPROVALS' },
    // { field: 'addedOn', header: 'ADDED ON' },
    // { field: 'action', header: 'ACTION' },
    
  ];

  return (
    <div>
      <Navbar />
      <Sidebar />
      <h1 style={{ marginRight: "920px", paddingTop: "50px" }}>Department</h1>
      <Menu />
      <div className="department-container">
        <div className="departbutton">
          <Button
            label="Add Department"
            icon="pi pi-plus"
            onClick={() => setVisible(true)}
          />
        </div>

        <Dialog
          header={editingDepartment ? "Edit Department" : "Add Department"}
          visible={visible}
          style={{ width: '50vw', top: 0, right: 0 }}
          onHide={() => setVisible(false)}
        >
          <form onSubmit={editingDepartment ? (e) => handleUpdateDepartment(editingDepartment, { department: newDepartment }) : (e) => handleAddDepartment(e)}>
            <div>
              <p>{editingDepartment ? "Edit the department:" : "Add a new department:"}</p>
              <input
                type="text"
                placeholder="Department Name"
                required
                value={newDepartment}
                onChange={(e) => setNewDepartment(e.target.value)}
              />
              <button type="submit" className='departbtn'>
                {editingDepartment ? "Update" : "Add"}
              </button>
              {editingDepartment && (
                <button type="button" className='departbtn' onClick={handleCancelEdit}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </Dialog>
      </div>
      <SharedGrid
        data={departments}
        columns={RecruitmentColumns}
        handleUpdate={handleEditDepartment}
        handleDelete={handleDeleteDepartment}
      />
    </div>
  );
}

export default Department;