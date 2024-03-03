import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from "../../public/logo.png"
import User from "../../public/user.png"
import Image from 'next/image';
import './navbar.css'; 


export default function Navbar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter()

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  function handleLogoutClick(){
    localStorage.removeItem("token");
    router.push("/login")
  }

  return (
    <nav className="navbar">
      <div className="logo-container">
        <Image alt="logo" src={Logo} className="logo"/>
        <span className="logo-name"><span style={{color:"#176B87"}}>Image</span>itory</span>
      </div>
      
      <div className="user-container" onClick={toggleUserMenu}>
        <div className={`user-menu ${isUserMenuOpen ? 'open' : ''}`}>
          <button onClick={() => console.log('Profile')}>Profile</button>
          <button style={{color: "red"}} onClick={handleLogoutClick}>LogOut</button>
        </div>
        <Image src={User} alt="user" className="user-circle"/>
      </div>
    </nav>
  );
};

