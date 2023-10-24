import React from 'react';
import './Utils.css';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="Sidebar">
      <ul className="hello">
        <li className='li'>
          <Link to="/dashboard">
            <div className="sidebar-item">
              <i className="fas fa-th"></i>
              <span>Dashboard</span>
            </div>
          </Link>
        </li>
        <li className='li'>
          <Link to="/department">
            <div className="sidebar-item">
              <i className="fa-solid fa-users"></i>
              <span>Department</span>
            </div>
          </Link>
        </li>
        <li className='li'>
          <Link to="/users">
            <div className="sidebar-item">
              <i className="fas fa-user-tie"></i>
              <span>Users</span>
              <i class="fas fa-chevron-circle-down adeeluser"></i>
            </div>
          </Link>
        </li>
        <li className='li'>
          <Link to="/designation">
            <div className="sidebar-item">
              <i className="far fa-calendar-check"></i>
              <span>Designation</span>
            </div>
          </Link>
        </li>
        <li className='li'>
          <Link to="/projects">
            <div className="sidebar-item">
              <i className="fa-solid fa-right-to-bracket"></i>
              <span>Project</span>
              <i class="fas fa-chevron-circle-down adeel"></i>
            </div>
          </Link>
        </li>
        <li className='li'>
          <Link to="/payroll">
            <div className="sidebar-item">
              <i className="fa-solid fa-hand-holding-dollar"></i>
              <span>Payroll</span>
              <i class="fas fa-chevron-circle-down adeel"></i>
            </div>
          </Link>
        </li>
        <li className='li'>
          <Link to="/reports">
            <div className="sidebar-item">
              <i className="fas fa-file"></i>
              <span>Reports</span>
              <i class="fas fa-chevron-circle-down adeel"></i>
            </div>
          </Link>
        </li>
      </ul>
      <ul className="help">
        <li className='li'>
          <Link to="/help">
            <div className="sidebar-item">
              <i className="far fa-question-circle"></i>
              <span>Help</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
