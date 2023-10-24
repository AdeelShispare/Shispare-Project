import React,{useEffect} from 'react'
import SharedGrid from './SharedGrid.jsx';
import Navbar from '../Utils/Navbar.js';
import Sidebar from '../Utils/Sidebar.js';
import Menu from '../Utils/Menu.jsx';
import { BsPerson } from 'react-icons/bs';
import { Button } from 'primereact/button';
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
  const UsersColumns = [
    { field: "employeeNumber", header: "EMPLOYEE#" },
    { field: "employeeName", header: "EMPLOYEE" },
    { field: "attendanceDate", header: "ATTENDENCE DATE" },
    { field: "changeType", header: "CHANGE TYPE" },
    { field: "status", header: "STATUS" },
    { field: "approval", header: "APPROVALS" },
    { field: "addedOn", header: "ADDED ON" },
    
 
  ];
  return (
    <div>
      <Navbar/>
      <Sidebar/>
      <h1 style={{marginRight:"1020px",paddingTop: "40px",paddingBottom:"10px" }}>Users</h1>
      <Menu/>
      <div className="department-container">
      <div className="departbutton">
          <Button
            label="Add User"
            icon="pi pi-plus"
            // onClick={() => setVisible(true)}
          />
        </div>
        </div>
      <SharedGrid data={data} columns={UsersColumns} />
    </div>
  )
}

export default Users
  