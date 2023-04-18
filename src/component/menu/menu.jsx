import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./menu.css";

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
      <div className={`menu-overlay ${isOpen ? "visible" : "hidden"}`}>
        <div className="menu-close" onClick={handleToggle}>
          &times;
        </div>
        <div className="menu">
          <ul>
          <li>
              <Link to="/" onClick={handleToggle}>
                Moon Station
              </Link>
            </li>
            <li>
              <Link to="/blog" onClick={handleToggle}>
                Blog
              </Link>
            </li>
            <li>
              <Link to="/services" onClick={handleToggle}>
                Services
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={handleToggle}>
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={handleToggle}>
                Contact
              </Link>
            </li>
            {/* Add other menu items here */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;
