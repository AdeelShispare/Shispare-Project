import './App.css';
import Login from "../src/components/Login.jsx"

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

import { BrowserRouter as   Router, Route, Routes } from 'react-router-dom';
import Dashboard from  "../src/dashboardcomponents/Dashboard"
import Recruitment from  "../src/dashboardcomponents/Recruitment"
import Employee from  "../src/dashboardcomponents/Employee"
import Attendence from  "../src/dashboardcomponents/Attendence"
import Leave from  "../src/dashboardcomponents/Leave"
import Payroll from  "../src/dashboardcomponents/Payroll"
import Reports from  "../src/dashboardcomponents/Reports"
function App() {
  return (
    <div className="App">
  
   
 <Routes>
          <Route path="/" exact element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/recruitment" element={<Recruitment/>} />
          <Route path="/employee" element={<Employee/>} />
          <Route path="/attendance" element={<Attendence/>} />
          <Route path="/leave" element={<Leave/>} />
          <Route path="/payroll" element={<Payroll/>} />
          <Route path="/reports" element={<Reports/>} />
        </Routes>
     
    
 
  
    </div>
  );
}

export default App;
