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
import ReusableDialog from '../Utils/ReusableDialog.jsx';
function Designation() {
  const addfields =[
    {
        name: 'newdesignation', // Use a proper name, not a state variable
        label: 'Designation Name',
        type: 'text',
        placeholder: 'Designation Name',
        required: true,
    },
   
];
const updatefields =[
  {
      name: 'updatedesignation', // Use a proper name, not a state variable
      label: 'Designation Name',
      type: 'text',
      placeholder: 'Designation Name',
      required: true,
  },
];

  const dispatch = useDispatch();
  const designations = useSelector((state) => state.employeedata.data.designations); 
  // const [editingDepartment, setEditingDepartment] = useState(null);
  const token = localStorage.getItem('token');
  const [newdesignation, setNewdesignation] = useState('');
 
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [updatedesignation, setUpdatedesignation] = useState('');
  const [designationIdToUpdate, setdesignationIdToUpdate] = useState(null);
  console.log(designations);
   useEffect(() => {
    if (token) {
      dispatch(
        fetchUsers({
          method: 'GET',
          url: 'http://13.228.165.0/api/designations',
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        })
      );
    }
  }, [dispatch, token]);

  const handleDeletedesignation = async (id) => {
  
      const success = await dispatch(deleteDepartments({
      method: 'DELETE',
      url: `http://13.228.165.0/api/designation/${id}/delete`,
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
          url: 'http://13.228.165.0/api/designations',
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        })
      );
    } else {
    
    }
  };

  const handleupdatedesignation = async (data) => {
    if (designationIdToUpdate && updatedesignation) {
      const success = await dispatch(
        updateDepartments({
          method: 'PUT',
          url: `http://13.228.165.0/api/designation/${designationIdToUpdate}/update`,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          data: {
            designation: data.updatedesignation, // Use the user-input department name
          },
        })
      );

      if (success) {
        dispatch(
          fetchUsers({
            method: 'GET',
            url: 'http://13.228.165.0/api/designations',
            headers: {
              'Authorization': `Bearer ${token}` 
            }
          })
        );
        setUpdateVisible(false);
        // Reset departmentIdToUpdate and updateDepartment
        setdesignationIdToUpdate(null);
        setUpdatedesignation('');
      }
    }
  };
  
    const handleAdddesignation = async (e) => {
    // e.preventDefault()
    try {
      
      const response = await dispatch(
        addDepartment({
          method: 'POST',
          url: 'http://13.228.165.0/api/designationstore',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', 
          },
          data: {
            designation: e.newdesignation, 
          }
        })
      );
      console.log(response);

    
      if (response) {
        console.log('designation created successfully:', response);
        dispatch(
          fetchUsers({
            method: 'GET',
            url: 'http://13.228.165.0/api/designations',
            headers: {
              'Authorization': `Bearer ${token}` 
            }
          })
        );
       
        setNewdesignation(''); 
       
  
       

        setVisible(false);
      }
    } catch (error) {
      console.error('API request failed:', error.message);
      setError('designation creation failed. Please try again.');
    }
  };

  // const handleUpdateDepartment = (id, updatedData) => {
  //   // Call the updateDepartment action with the id and updated data
  //   dispatch(updateDepartment(id, updatedData));
  // };

  if (!designations) {
    // Handle the case where data is not available yet
    return (
      <div>
        <Navbar />
        <Sidebar />
        <h1 style={{ marginRight: "900px", paddingTop: "40px",paddingBottom:"10px" }}>Designations</h1>
        <Menu />
        <p>Loading...</p>
      </div>
    );
  }
  
  const designationColumns = [
    { field: 'id', header: 'ID#' },
    { field: 'designation', header: 'Designation' },
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
      <h1 style={{ marginRight: "900px", paddingTop: "40px",paddingBottom:"10px" }}>Designations</h1>
      <Menu />
      <div className="department-container">
        <div className="departbutton">
          <Button
            label="Add Designation"
            icon="pi pi-plus"
            onClick={() => setVisible(true)}
          />
        </div>
{/* 
        <Dialog
          header="Add Designation"
          visible={visible}
          style={{ width: '50vw', top: 350,right: 0 }}
          onHide={() => setVisible(false)}
        >
          <form onSubmit={(e) => handleAdddesignation(e)}>
            <div>
              <p>Add a new Designation:</p>
              <input
                type="text"
                placeholder="Designation Name"
                required
                value={newdesignation}
                onChange={(e) => setNewdesignation(e.target.value)}
              />
              <button type="submit" className='departbtn'>
                Add
              </button>
            </div>
          </form>
        </Dialog>
        <Dialog
        header="Update Designation"
        visible={updateVisible}
        style={{ width: '50vw',  top: 350, right: 0 }}
        onHide={() => setUpdateVisible(false)}
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          handleupdatedesignation();
        }}>
          <div>
            <p>Update Designation:</p>
            <input
              type="text"
              placeholder="Designation Name"
              required
              value={updatedesignation}
              onChange={(e) => setUpdatedesignation(e.target.value)}
            />
            <button type="submit" className='departbtn'>
              Update
            </button>
          </div>
        </form>
      </Dialog> */}
        
      </div>
      <ReusableDialog
      width="30vw"
        title="Add Designation"
        visible={visible}
        onHide={() => setVisible(false)}
        fields={addfields}
        onSubmit={handleAdddesignation}
        buttonLabel="Add" 
        // onChange={(e) => setNewDepartment(e.target.value)}
      />
 <ReusableDialog
width="30vw"
        title="Update Designation"
        visible={updateVisible}
        onHide={() => setUpdateVisible(false)}
        fields={updatefields}
        onSubmit={handleupdatedesignation}
        buttonLabel="Update"
        initialValues={{ updatedesignation }} // Pass the initial value to the dialog
        onChange={(e) => setUpdatedesignation(e.target.value)} // Update the state when the user changes the input
      />
      <SharedGrid
        data={designations}
        columns={designationColumns}
        handleUpdate={(id,previousdesignation) => {
          setdesignationIdToUpdate(id,previousdesignation);
          setUpdatedesignation(previousdesignation.designation); // Clear the input field
          setUpdateVisible(true);
        }}
        handleDelete={handleDeletedesignation}
      />
    </div>
  );
}

export default Designation
