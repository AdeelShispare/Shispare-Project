import React from 'react'
import "../App.css"
import { MdNotifications } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import { FaBell } from 'react-icons/fa';

function Navbar() {
  return (
    <div className='navbar'>
        <div className='search'>
     <h1>L0G0
       <span>IPSUM</span>
       </h1> 
       <div className='icon'>
       <FaBell />
      </div>
      <div className='Icon'>
      <FaSearch/>
      </div>
      
       <div className='nameicon'>
       <p>devon lane</p>
       </div>
       <div className='person'>
       <FaUserCircle size={50} />
       </div>
       </div>
    </div>
    
  )
}

export default Navbar
