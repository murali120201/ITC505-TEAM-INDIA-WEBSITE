import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  return (
    <div className="auth-container">
      {user && (
        <>
          <h2>
            {user.role === 'startup'
              ? 'Welcome back, Founder 👋'
              : 'Welcome, Investor! 💼'}
          </h2>

          {/* ✅ Scrolling line inside a container */}
          <div className="scroll-container">
            <p className="scrolling-line">
              {user.role === 'startup'
                ? 'Ready to pitch your next big idea? Upload your startup pitch below.'
                : 'Explore fresh ideas from brilliant startups across the world.'}
            </p>
          </div>

          {user.role === 'startup' && (
            <button
              onClick={() => navigate('/upload')}
              className="btn filled"
              style={{ marginTop: '20px' }}
            >
              Upload a New Pitch
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;
