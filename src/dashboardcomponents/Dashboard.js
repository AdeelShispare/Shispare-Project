import React, { useEffect, useState } from "react";
import Navbar from "../Utils/Navbar.js";
import Sidebar from "../Utils/Sidebar";
import SharedGrid from "./SharedGrid";
import { BsPerson } from "react-icons/bs";
import "./Dashboard.css";
import Menu from "../Utils/Menu";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [selectedAction, setSelectedAction] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const navigate=useNavigate();
useEffect(()=>{
  if(!localStorage.getItem("token")){
    navigate("/")
  }
})
  const data = [];

  const handleActionClick = (entryId) => {
    setSelectedAction(entryId);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEditClick = (entry) => {
    // Implement edit functionality here for the selected entry
    console.log("Editing entry:", entry);
  };

  const handleViewClick = (entry) => {
    // Implement view functionality here for the selected entry
    console.log("Viewing entry:", entry);
  };

  for (let i = 3; i <= 7; i++) {
    const entry = {
      id: i,
      employeeNumber: `EMP00${i}`,
      employeeName: `Employee ${i}`,
      attendanceDate: "2023-01-07",
      changeType: i % 2 === 0 ? "In" : "Out",
      status: i % 3 === 0 ? "Approved" : "Pending",
      approval: <BsPerson />,
      addedOn: `2023-01-07 ${(i % 12) + 1}:${(i % 60)
        .toString()
        .padStart(2, "0")} ${i < 12 ? "AM" : "PM"}`,
    };

    data.push({
      ...entry,
      actions: (
        <div className="dropdown">
          <button
            className="action-button"
            onClick={() => handleActionClick(entry.id)}
          >
            ...
          </button>
          {isDropdownOpen && selectedAction === entry.id && (
            <div className="dropdown-content">
              <button onClick={() => handleEditClick(entry)}>Edit</button>
              <button onClick={() => handleViewClick(entry)}>View</button>
            </div>
          )}
        </div>
      ),
    });
  }

  const DashboardColumns = [
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
      <Navbar />
      <Sidebar />

      <h1 className="h1">Dashboard</h1>
      <Menu />
  
      <SharedGrid
        data={data}
        columns={DashboardColumns}
        flex
        justify-content-center
        align-content-center
      />
    </div>
  );
}

export default Dashboard;
