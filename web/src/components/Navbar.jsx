"use client"
import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isHovering, setIsHovering] = useState(false);

  // Function to handle the delayed hover effect
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div className={styles.navbar} onMouseLeave={handleMouseLeave}>
      <div 
        className={styles.navbarTab} 
        onMouseEnter={handleMouseEnter}
      >
        {/* Content of the navbar goes here */}
        <ul className={isHovering ? styles.navMenuVisible : ''}>
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Contact</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;