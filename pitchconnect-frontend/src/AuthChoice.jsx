import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AuthChoice.css';

function AuthChoice() {
  const location = useLocation();
  const role = location.state?.role || '';

  useEffect(() => {
    localStorage.removeItem('user'); // 🧹 Clear user session
  }, []);

  return (
    <div className="auth-choice-container">
      <h2>Welcome!</h2>
      {role && (
        <p>
          You're joining as a{' '}
          <strong>{role.charAt(0).toUpperCase() + role.slice(1)}</strong>
        </p>
      )}
      <p>To continue, please create an account or log in.</p>

      <div className="auth-choice-buttons">
        <Link to="/register" state={{ role }} className="btn filled">
          Create Account
        </Link>
        <Link to="/login" className="btn outline">
          Log In
        </Link>
      </div>
    </div>
  );
}

export default AuthChoice;
