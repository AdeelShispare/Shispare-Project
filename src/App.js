import './App.css';
import Login from "../src/components/Login.jsx"

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

import { BrowserRouter as   Router, Route, Routes } from 'react-router-dom';
import Dashboard from  "../src/dashboardcomponents/Dashboard"
import Leave from  "../src/dashboardcomponents/Leave"
import Payroll from  "../src/dashboardcomponents/Payroll"
import Reports from  "../src/dashboardcomponents/Reports"
import Registration from './components/Registration';
import Department from './dashboardcomponents/Department';
import Users from './dashboardcomponents/Users';
import Designation from './dashboardcomponents/Designation';
function App() {
  return (
    <div className="App">
  
   
 <Routes>
          <Route path="/" exact element={<Login/>} />
          <Route path="/register" exact element={<Registration/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/department" element={<Department/>} />
          <Route path="/users" element={<Users/>} />
          <Route path="/designation" element={<Designation/>} />
          <Route path="/leave" element={<Leave/>} />
          <Route path="/payroll" element={<Payroll/>} />
          <Route path="/reports" element={<Reports/>} />
        </Routes>
     
    
 
  
    </div>
  );
}

export default App;
