import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'


import './nav.css'

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <NavLink
        className="dropdown-toggle"
        type="button"
        onClick={handleToggle}
      >
       Posts
      </NavLink>
      <div className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
        <NavLink
          to="/posts/pptx"
          className="dropdown-item"
          onClick={handleItemClick}
        >
          Powerpoint
        </NavLink>
        <NavLink
          to="/posts/word"
          className="dropdown-item"
          onClick={handleItemClick}
        >
          Word
        </NavLink>
        <NavLink
          to="/pdf"
          className="dropdown-item"
          onClick={handleItemClick}
        >
          PDF
        </NavLink>
      </div>
    </div>
  );
};


const Navbar = () => {
  
  return (
    <div className='jnav-container'>
    <div className='jright'>
        <div>Wada</div>
    </div>
    
    <div className='jleft'>

    <NavLink to = '/pptx'>pptx</NavLink>
        <NavLink to = '/word'>Word</NavLink>
      <DropdownMenu />
    </div>
</div>
  )
}

export default Navbar