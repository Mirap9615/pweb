import React, { useState } from 'react';
import './MenuItem.jsx'
import './Menu.css';

function Menu() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  return (
    <div className="menu-container"
         onMouseEnter={() => setIsDropdownVisible(true)}
         onMouseLeave={() => setIsDropdownVisible(false)}>
      <button className="menu-button">Menu</button>
      {isDropdownVisible && (
        <div className="dropdown">
          <a href="/home" className="dropdown-item">Home</a>
          <a href="/portfolio" className="dropdown-item">Portfolio</a>
          <a href="/about" className="dropdown-item">About</a>
          <a href="/charts" className="dropdown-item">Charts</a>
          <a href="/reviews" className="dropdown-item">Reviews</a>
          <a href="/register" className="dropdown-item">Register</a>
    
        </div>
      )}
    </div>
  );
}

export default Menu;