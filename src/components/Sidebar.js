import React from 'react'
import "../App.css"
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div className="Sidebar">
 
      <ul className='hello'>
        <li>
          <Link className='hello' to="/">
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
          </Link>
        </li>
        <li>
          <Link className='hello' to="/payroll">
            <i className="fa-solid fa-hand-holding-dollar"></i> Payroll
          </Link>
        </li>
        <li>
          <Link className='hello' to="/reports">
            <i className="fas fa-file"></i> Reports
          </Link>
        </li>
      </ul>

    </div>
  )
}

export default Sidebar

