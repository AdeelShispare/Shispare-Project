import React from "react";
import Navbar from "../Utils/Navbar.js";
import Sidebar from "../Utils/Sidebar";
import SharedGrid from "./SharedGrid";
import { BsPerson } from "react-icons/bs";
import "./Dashboard.css";
import Menu from "../Utils/Menu";
function Dashboard() {
  
 
  const data = [];

  for (let i = 3; i <= 17; i++) {
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
      action: "...",
    };

    data.push(entry);
  }
  const DashboardColumns = [
    { field: "employeeNumber", header: "EMPLOYEE#" },
    { field: "employeeName", header: "EMPLOYEE" },
    { field: "attendanceDate", header: "ATTENDENCE DATE" },
    { field: "changeType", header: "CHANGE TYPE" },
    { field: "status", header: "STATUS" },
    { field: "approval", header: "APPROVALS" },
    { field: "addedOn", header: "ADDED ON" },
    { field: "action", header: "ACTION" },
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
