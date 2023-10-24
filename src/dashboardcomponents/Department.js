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
import ReusableDialog from '../Utils/ReusableDialog.jsx';
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
  const [updateDepartmentName, setUpdateDepartmentName] = useState('');
  const [departmentIdToUpdate, setDepartmentIdToUpdate] = useState(null);


  const [reusablevisible, setreusableVisible] = useState(false);

  const addfields =[
    {
        name: 'newDepartment', // Use a proper name, not a state variable
        label: 'Department Name',
        type: 'text',
        placeholder: 'Department Name',
        required: true,
    },
];
const updatefields =[
  {
      name: 'updateDepartmentName', // Use a proper name, not a state variable
      label: 'Department Name',
      type: 'text',
      placeholder: 'Department Name',
      required: true,
  },
];

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle the form submission here, data contains the form field values
    handleAddDepartment();
    console.log(e);
    setVisible(false);
  };

 
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

  const handleupdateDepartment = async (data) => {
    if (departmentIdToUpdate && updateDepartmentName) {
      const success = await dispatch(
        updateDepartments({
          method: 'PUT',
          url: `http://13.228.165.0/api/department/${departmentIdToUpdate}/update`,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          data: {
            department: data.updateDepartmentName, // Use the user-input department name
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
        setUpdateDepartmentName('');
      }
    }
  };
  
    const handleAddDepartment = async (data) => {
    // data.preventDefault()
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
            department: data.newDepartment, 
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
      
        setreusableVisible(false)
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
        <h1 style={{ marginRight: "920px",paddingTop: "40px",paddingBottom:"10px" }}>Department</h1>
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
      <h1 style={{ marginRight: "920px", paddingTop: "40px",paddingBottom:"10px" }}>Department</h1>
      <Menu />
      <div className="department-container">
        <div className="departbutton">
          <Button
            label="Add Department"
            icon="pi pi-plus"
            onClick={() => setreusableVisible(true)}
          />
        </div>

        {/* <Dialog
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
      </Dialog> */}
        
      </div>
      <ReusableDialog
        title="Add Department"
        visible={reusablevisible}
        onHide={() => setreusableVisible(false)}
        fields={addfields}
        onSubmit={handleAddDepartment}
        buttonLabel="Add" 
        // onChange={(e) => setNewDepartment(e.target.value)}
      />
 <ReusableDialog
 
        title="Update Department"
        visible={updateVisible}
        onHide={() => setUpdateVisible(false)}
        fields={updatefields}
        onSubmit={handleupdateDepartment}
        buttonLabel="Update"
        initialValues={{ updateDepartmentName }} // Pass the initial value to the dialog
        onChange={(e) => setUpdateDepartmentName(e.target.value)} // Update the state when the user changes the input
      />

      <SharedGrid
      data={departments}
      columns={RecruitmentColumns}
      handleUpdate={(id, previousDepartment) => {
        console.log(id, previousDepartment);
        setDepartmentIdToUpdate(id, previousDepartment);
        console.log(previousDepartment.department);
        setUpdateDepartmentName(previousDepartment.department); // Set the value to be updated
        setUpdateVisible(true);
      }}
      
        handleDelete={handleDeleteDepartment}
      />
    </div>
  );
}

export default Department