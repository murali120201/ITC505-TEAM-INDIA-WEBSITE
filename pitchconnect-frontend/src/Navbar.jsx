import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';


function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/')}>
        PitchConnect
      </div>

      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>

            {user.role === 'startup' && (
              <>
                <Link to="/upload">Upload</Link>
                <Link to="/mypitches">My Pitches</Link>
              </>
            )}

            {user.role === 'investor' && (
              <Link to="/startups">Browse Startups</Link>
            )}

            <button onClick={handleLogout} className="btn logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/choose">Get Started</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
