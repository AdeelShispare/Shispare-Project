import React,{useEffect} from 'react'
import SharedGrid from './SharedGrid.jsx';
import Navbar from '../Utils/Navbar.js';
import Sidebar from '../Utils/Sidebar.js';
import Menu from '../Utils/Menu.jsx';
import { BsPerson } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/slice/userSlice.jsx';
import { fetchData } from "../redux/apiUtils.js"
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
  const EmployeeeColumns = [
    { field: 'id', header: 'ID' },
    { field: 'designation', header: 'FIRST NAME' },
    // { field: 'lastName', header: 'LAST NAME' },
    // { field: 'address', header: 'ADDRESS' },
    // { field: 'age', header: 'AGE' },
    // { field: 'contactNumber', header: 'CONTACT NUMBER' },
    // { field: 'dob', header: 'DATE OF BIRTH' },
    // { field: 'email', header: 'EMAIL' },
   
    
 
  ];
  return (
    <div>
      <Navbar/>
      <Sidebar/>
      <h1 style={{marginRight:"920px",paddingTop:"50px"}}>Employee</h1>
      <Menu/>
      <SharedGrid data={data} columns={EmployeeeColumns} />
    </div>
  )
}

export default Users
  