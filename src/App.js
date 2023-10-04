import logo from './logo.svg';
import './App.css';
import Sidebar from './sharedcomponents/Sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./sharedcomponents/Navbar";
import Dashboard from './components/Dashboard';
import Recruitment from './components/Recruitment';
import Employee from './components/Employee';
import Leave from './components/Leave';
import Attendence from './components/Attendence';
import Payroll from './components/Payroll';
import Reports from './components/Reports';

function App() {
  return (
    <div className="App">
    <Router>
      <div>
        <Navbar/>
        <Sidebar />
        <Routes>
          <Route path="/" exact element={<Dashboard/>} />
          <Route path="/recruitment" element={<Recruitment/>} />
          <Route path="/employee" element={<Employee/>} />
          <Route path="/attendance" element={<Attendence/>} />
          <Route path="/leave" element={<Leave/>} />
          <Route path="/payroll" element={<Payroll/>} />
          <Route path="/reports" element={<Reports/>} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
