import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function Startups() {
  const [pitches, setPitches] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== 'investor') {
      navigate('/dashboard');
      return;
    }

    setUser(parsedUser);

    const storedPitches = JSON.parse(localStorage.getItem('pitches')) || [];
    setPitches(storedPitches);
  }, [navigate]);

  return (
    <div className="auth-container">
      <h2>Startup Pitches</h2>
      {pitches.length === 0 ? (
        <p>No pitches submitted yet.</p>
      ) : (
        <div className="pitch-list">
          {pitches.map((pitch) => (
            <div key={pitch.id} className="pitch-card">
              <h3>{pitch.title}</h3>
              <p><strong>Description:</strong> {pitch.description}</p>
              <p><strong>Category:</strong> {pitch.category}</p>
              <p><strong>Submitted by:</strong> {pitch.userEmail}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Startups;
