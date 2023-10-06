import React from 'react'
import Navbar from '../Utils/Navbar.js';
import Sidebar from '../Utils/Sidebar';
import Menu from '../Utils/Menu.jsx';
import { BsPerson } from 'react-icons/bs';
import SharedGrid from './SharedGrid.jsx';
function Reports() {
  const data = [];

  for (let i = 3; i <= 27; i++) {
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
    // Add more columns as needed
  ];
  return (
    <div>
        <Navbar/>
      <Sidebar/>
      <h1 style={{textAlign:"center"}}>Reports</h1>
      <Menu/>
      <SharedGrid data={data} columns={ReportsColumns}/>
    </div>
  )
}

export default Reports
