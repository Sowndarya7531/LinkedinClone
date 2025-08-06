import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <h2 className="logo">Linkedin-Clone</h2>
        
      </div>
      <div className="nav-right">
        <Link to="/">Home</Link>
        {token && (
          <>
            
            <Link to={`/profile/${user?._id}`}>Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
