import React,{useState} from 'react';
import './Utils.css';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  return (
    <div className="Sidebar">
      <ul className="hello">
        <li className='li'>
        <Link
            to="/dashboard"
            onClick={() => handleLinkClick("/dashboard")}
            className={activeLink === "/dashboard" ? "active" : ""}
          >
            <div className="sidebar-item">
              <i className="fas fa-th"></i>
              <span>Dashboard</span>
            </div>
          </Link>
        </li>
        <li className='li'>
        <Link
            to="/department"
            onClick={() => handleLinkClick("/department")}
            className={activeLink === "/department" ? "active" : ""}
          >
            <div className="sidebar-item">
              <i className="fa-solid fa-users"></i>
              <span>Department</span>
            </div>
          </Link>
        </li>
        <li className='li'>
          <Link 
          to="/users"
          onClick={() => handleLinkClick("/users")}
            className={activeLink === "/users" ? "active" : ""}
          >
            <div className="sidebar-item">
              <i className="fas fa-user-tie"></i>
              <span>Users</span>
              <i class="fas fa-chevron-circle-down adeeluser"></i>
            </div>
          </Link>
        </li>
        <li className='li'>
          <Link to="/designation"
                    onClick={() => handleLinkClick("/designation")}
                    className={activeLink === "/designation" ? "active" : ""}
          >
            <div className="sidebar-item">
              <i className="far fa-calendar-check"></i>
              <span>Designation</span>
            </div>
          </Link>
        </li>
        <li className='li'>
          <Link to="/projects"
            onClick={() => handleLinkClick("/projects")}
            className={activeLink === "/projects" ? "active" : ""}
          >
            <div className="sidebar-item">
              <i className="fa-solid fa-right-to-bracket"></i>
              <span>Project</span>
              <i class="fas fa-chevron-circle-down adeel"></i>
            </div>
          </Link>
        </li>
        <li className='li'>
          <Link to="/employee"
          onClick={() => handleLinkClick("/employee")}
          className={activeLink === "/employee" ? "active" : ""}
          >
            <div className="sidebar-item">
              <i className="fa-solid fa-hand-holding-dollar"></i>
              <span>Employee</span>
             
            </div>
          </Link>
        </li>
        <li className='li'>
          <Link to="/reports"
          onClick={() => handleLinkClick("/reports")}
          className={activeLink === "/reports" ? "active" : ""}
          >
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
          <Link to="">
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
