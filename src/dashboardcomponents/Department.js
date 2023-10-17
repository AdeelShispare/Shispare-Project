import React,{useEffect} from 'react'
import Navbar from '../Utils/Navbar.js';
import Sidebar from '../Utils/Sidebar.js';
import Menu from '../Utils/Menu.jsx';
import SharedGrid from './SharedGrid.jsx';
import { BsPerson } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/slice/userSlice.jsx';
function Department() {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.employeedata.data.departments); // Access "departments" from state
  const token = localStorage.getItem('token');
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
      <SharedGrid data={departments} columns={RecruitmentColumns}/>
    </div>
  )
}

export default Department;
