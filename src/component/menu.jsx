import React, { useState } from 'react';
import './menu.css';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu">
      {!isOpen && (
        <div className={`hamburger-icon`} onClick={handleToggle}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
      <div className={`menu-overlay ${isOpen ? 'visible' : 'hidden'}`}>
        <div className="menu-close" onClick={handleToggle}>
          &times;
        </div>
        <div className="menu">
          <ul>
            <li>Blog</li>
            <li>Services</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;
