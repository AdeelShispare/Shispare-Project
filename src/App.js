import './App.css';
import Login from "../src/components/Login.jsx"

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

import { BrowserRouter as   Router, Route, Routes } from 'react-router-dom';
import Dashboard from  "../src/dashboardcomponents/Dashboard"
import Reports from  "../src/dashboardcomponents/Reports"
import Registration from './components/Registration';
import Department from './dashboardcomponents/Department';
import Users from './dashboardcomponents/Users';
import Designation from './dashboardcomponents/Designation';
import Projects from './dashboardcomponents/Projects';
import Employee from './dashboardcomponents/Employee.js';
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
          <Route path="/projects" element={<Projects/>} />
          <Route path="/employee" element={<Employee/>} />
          <Route path="/reports" element={<Reports/>} />
        </Routes>
     
    
 
  
    </div>
  );
}

export default App;
