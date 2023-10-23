import React,{useEffect,useState} from 'react'
import Navbar from '../Utils/Navbar.js';
import Sidebar from '../Utils/Sidebar.js';
import Menu from '../Utils/Menu.jsx';
import SharedGrid from './SharedGrid.jsx';
import { BsPerson } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/slice/userSlice.jsx';
import { addDepartment, deleteDepartments, updateDepartments } from '../redux/slice/departmentslice.jsx';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { updateDepartment } from '../redux/slice/userSlice.jsx';

import "./Department.css"
function Department() {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.employeedata.data.departments); 
  // const [editingDepartment, setEditingDepartment] = useState(null);
  const token = localStorage.getItem('token');
  const [newDepartment, setNewDepartment] = useState('');
 
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [updateDepartment, setUpdateDepartment] = useState('');
  const [departmentIdToUpdate, setDepartmentIdToUpdate] = useState(null);
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

  const handleupdateDepartment = async () => {
    if (departmentIdToUpdate && updateDepartment) {
      const success = await dispatch(
        updateDepartments({
          method: 'PUT',
          url: `http://13.228.165.0/api/department/${departmentIdToUpdate}/update`,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          data: {
            department: updateDepartment, // Use the user-input department name
          },
        })
      );

      if (success) {
        dispatch(
          fetchUsers({
            method: 'GET',
            url: 'http://13.228.165.0/api/departments',
            headers: {
              'Authorization': `Bearer ${token}` 
            }
          })
        );
        setUpdateVisible(false);
        // Reset departmentIdToUpdate and updateDepartment
        setDepartmentIdToUpdate(null);
        setUpdateDepartment('');
      }
    }
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
          header="Add Department"
          visible={visible}
          style={{ width: '50vw', top: 350, right: 0 }}
          onHide={() => setVisible(false)}
        >
          <form onSubmit={(e) => handleAddDepartment(e)}>
            <div>
              <p>Add a new department:</p>
              <input
                type="text"
                placeholder="Department Name"
                required
                value={newDepartment}
                onChange={(e) => setNewDepartment(e.target.value)}
              />
              <button type="submit" className='departbtn'>
                Add
              </button>
            </div>
          </form>
        </Dialog>
        <Dialog
        header="Update Department"
        visible={updateVisible}
        style={{ width: '50vw',  top: 350, right: 0 }}
        onHide={() => setUpdateVisible(false)}
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          handleupdateDepartment();
        }}>
          <div>
            <p>Update department:</p>
            <input
              type="text"
              placeholder="Department Name"
              required
              value={updateDepartment}
              onChange={(e) => setUpdateDepartment(e.target.value)}
            />
            <button type="submit" className='departbtn'>
              Update
            </button>
          </div>
        </form>
      </Dialog>
        
      </div>
      <SharedGrid
        data={departments}
        columns={RecruitmentColumns}
        handleUpdate={(id,previousDepartment) => {
          setDepartmentIdToUpdate(id,previousDepartment);
          setUpdateDepartment(previousDepartment.department); // Clear the input field
          setUpdateVisible(true);
        }}
        handleDelete={handleDeleteDepartment}
      />
    </div>
  );
}

export default Department