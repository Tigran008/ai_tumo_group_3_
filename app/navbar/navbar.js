import React, { useState } from 'react';
import Logo from "../../public/logo.png"
import User from "../../public/user.png"
import Credit from "../../public/credit.png"
import Image from 'next/image';
import './navbar.css'; 


const Navbar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <Image alt="logo" src={Logo} className="logo"/>
        <span className="logo-name"><span style={{color:"#176B87"}}>Image</span>Generator</span>
      </div>
      
      <div className="user-container" onClick={toggleUserMenu}>
        <div className={`user-menu ${isUserMenuOpen ? 'open' : ''}`}>
          <button onClick={() => console.log('Profile')}>Profile</button>
          <button style={{color: "red"}} onClick={() => console.log('Log Out')}>LogOut</button>
        </div>
        <Image src={User} alt="user" className="user-circle"/>
      </div>
    </nav>
  );
};

export default Navbar;
