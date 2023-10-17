import React,{useEffect,useState} from 'react'
import Navbar from '../Utils/Navbar.js';
import Sidebar from '../Utils/Sidebar.js';
import Menu from '../Utils/Menu.jsx';
import SharedGrid from './SharedGrid.jsx';
import { BsPerson } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/slice/userSlice.jsx';
import { addDepartment } from '../redux/slice/departmentslice.jsx';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';
import "./Department.css"
function Department() {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.employeedata.data.departments); // Access "departments" from state
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
            'Authorization': `Bearer ${token}` // Include the bearer token in the headers
          }
        })
      );
    }
  }, [dispatch, token]);

 
  const handleAddDepartment = async () => {
    try {
      // Make an API request to add a new department
      const response = await dispatch(
        addDepartment({
          method: 'POST',
          url: 'http://13.228.165.0/api/departmentstore',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', // Set the content type
          },
          data: {
            department: newDepartment, // Include the department name
          }
        })
      );
      console.log(response);

      // Assuming the response contains the newly added department data
      if (response) {
        console.log('Department created successfully:', response);
        // You may want to refresh the department list here
        setNewDepartment(''); // Reset the input field
       
  
       

        setVisible(false);
      }
    } catch (error) {
      console.error('API request failed:', error.message);
      setError('Department creation failed. Please try again.');
    }
  };

  

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
  // const data = Array.isArray(state) ? state.slice() : [];
  // const data = [];

  // for (let i = 3; i <= 17; i++) {
  //   const entry = {
  //     id: i,
  //     employeeNumber: `EMP00${i}`,
  //     employeeName: `Employee ${i}`,
  //     attendanceDate: '2023-01-07',
  //     changeType: i % 2 === 0 ? 'In' : 'Out',
  //     status: i % 3 === 0 ? 'Approved' : 'Pending',
  //     approval:   <BsPerson />,
  //     addedOn: `2023-01-07 ${(i % 12) + 1}:${(i % 60).toString().padStart(2, '0')} ${i < 12 ? 'AM' : 'PM'}`,
  //     action: '...'
  //   };
    
  //   data.push(entry);
  // }
  const RecruitmentColumns = [
    { field: 'id', header: 'ID#' },
    { field: 'department', header: 'Department' },
    // { field: 'attendanceDate', header: 'ATTENDENCE DATE' },
    // { field: 'changeType', header: 'CHANGE TYPE' },
    // { field: 'status', header: 'STATUS' },
    // { field: 'approval', header: 'APPROVALS' },
    // { field: 'addedOn', header: 'ADDED ON' },
    // { field: 'action', header: 'ACTION' },
   
  ];
  return (
    <div>
         <Navbar/>
      <Sidebar/>
      <h1 style={{marginRight:"920px",paddingTop:"50px"}}>Department</h1>
      <Menu/>
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
        style={{ width: '50vw', top: 0, right: 0 }}
        onHide={() => setVisible(false)}
      >
        <div>
          <p>Add a new department:</p>
          <input
            type="text"
            placeholder="Department Name"
            value={newDepartment}
            onChange={(e) => setNewDepartment(e.target.value)}
          />
          <button onClick={handleAddDepartment} className='departbtn'>Add</button>
     
        </div>
      </Dialog>
    </div>
      <SharedGrid data={departments} columns={RecruitmentColumns}/>
      {/* <div className="add-department">
        <input
          type="text"
          placeholder="New Department Name"
          value={newDepartment}
          onChange={(e) => setNewDepartment(e.target.value)}
        />
        <button onClick={handleAddDepartment}>Add Department</button>
            </div> */}
    </div>
  )
}

export default Department;
