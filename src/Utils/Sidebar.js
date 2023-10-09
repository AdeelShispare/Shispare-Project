import React from 'react'
import "./Utils.css"
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div className="Sidebar">
 
      <ul className='hello'>
        <li>
          <Link className='hello' to="/dashboard">
            <i className="fas fa-th"></i> Dashboard
          </Link>
        </li>
        <li>
          <Link className='hello' to="/recruitment">
            <i className="fa-solid fa-users"></i> Recruitment
          </Link>
        </li>
        <li>
          <Link className='hello' to="/employee">
            <i className="fas fa-user-tie"></i> Employee 
            <item className="dropdowns"><i class="fas fa-chevron-circle-down"></i> </item> 
          </Link>
        </li>
        <li>
          <Link className='hello' to="/attendance">
            <i className="far fa-calendar-check"></i> Attendance
          </Link>
        </li>
        <li>
          <Link className='hello' to="/leave">
            <i className="fa-solid fa-right-to-bracket"></i> Leave
            <item className="dropdown1"><i class="fas fa-chevron-circle-down"></i> </item> 
          </Link>
        </li>
        <li>
          <Link className='hello' to="/payroll">
            <i className="fa-solid fa-hand-holding-dollar"></i> Payroll
            <item className="dropdown2"><i class="fas fa-chevron-circle-down"></i> </item> 
          </Link>
        </li>
        <li>
          <Link className='hello' to="/reports">
            <i className="fas fa-file"></i> Reports
            <item className="dropdown3"><i class="fas fa-chevron-circle-down"></i> </item> 
          </Link>
        </li>
        
      </ul>
      <ul className='help'>
          
          <i class="far fa-question-circle"></i> Help
          
        </ul>

    </div>
  )
}

export default Sidebar

