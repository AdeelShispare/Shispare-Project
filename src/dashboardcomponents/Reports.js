import React,{useEffect,useState} from 'react'
import Navbar from '../Utils/Navbar.js';
import Sidebar from '../Utils/Sidebar';
import Menu from '../Utils/Menu.jsx';
import { BsPerson } from 'react-icons/bs';
import SharedGrid from './SharedGrid.jsx';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/slice/userSlice.jsx';
import ReusableDialog from '../Utils/ReusableDialog.jsx';
import { Dialog } from 'primereact/dialog';
import UserData from './UserData.jsx';
function Reports() {
  // const dispatch=useDispatch();
  // const state = useSelector((state) => state.todo);
  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, [dispatch]);

  // const data = state.data; // Initialize as an empty array
  // console.log(data)
  const [visible, setVisible] = useState(false);
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
  const ReportsColumns = [
    { field: 'employeeNumber', header: 'EMPLOYEE#' },
    { field: 'employeeName', header: 'EMPLOYEE' },
    { field: 'attendanceDate', header: 'ATTENDENCE DATE' },
    { field: 'changeType', header: 'CHANGE TYPE' },
    { field: 'status', header: 'STATUS' },
    { field: 'approval', header: 'APPROVALS' },
    { field: 'addedOn', header: 'ADDED ON' },
    { field: 'action', header: 'ACTION' },

  ];
  return (
    <div>
        <Navbar/>
        
      <Sidebar/>
      <h1 style={{marginRight:"990px",paddingTop: "32px",paddingBottom:"10px" }}>Reports</h1>
      <Menu/>
      {/* <UserData/> */}
      <div className="department-container">
      <div className="departbutton">
          <Button
            label="Add Report"
            icon="pi pi-plus"
            // onClick={() => setVisible(true)}
          />
        </div>
        </div>
       
      <SharedGrid data={data} columns={ReportsColumns}/>
      <div>
     
    </div>
      
    </div>
  )
}

export default Reports
