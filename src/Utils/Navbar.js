import React from 'react'
import "./Utils.css"

import { FaSearch } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import { FaBell } from 'react-icons/fa';

function Navbar() {
  return (
    <div className='navbar'>
        <div className='search'>
     <h1 style={{color:"darkblue", marginLeft:"20px"}}>L0G0
       <span className='ipsum'>IPSUM</span>
       </h1> 
       <div className='icon'>
       <FaBell size={15}/>
      </div>
      <div className='Icon'>
      <FaSearch size={15}/>
      </div>
      
       <div className='nameicon'>
       <p>Devon Lane</p>
       </div>
       <div className='person'>
       <FaUserCircle size={35} />
       <item className="dropdown4"><i class="fas fa-chevron-circle-down"></i></item>
       </div>
       </div>
    </div>
    
  )
}

export default Navbar
