import React from 'react'
import logoutIcon from './../imgs/shutdown.png';
import './../css/AdminHeader.css';

const AdminHeader = () => {

  const logout = () => {

     localStorage.removeItem("token");
     window.location = "/admins/login";
  }
  return (
    
    <header className="admin-header">
        <h3 className="logo">
            HITSTORE
        </h3>

        <button onClick={logout} className="logout-btn">
            <img src={logoutIcon} alt="logout icon" />
        </button>
        
    </header>
  )
}

export default AdminHeader