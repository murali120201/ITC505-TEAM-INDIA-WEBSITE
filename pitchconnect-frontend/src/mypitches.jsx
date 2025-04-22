import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function MyPitches() {
  const [user, setUser] = useState(null);
  const [myPitches, setMyPitches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== 'startup') {
      navigate('/dashboard');
      return;
    }

    setUser(parsedUser);

    // 🔍 Filter only this user's pitches
    const allPitches = JSON.parse(localStorage.getItem('pitches')) || [];
    const userPitches = allPitches.filter(
      (pitch) => pitch.userEmail === parsedUser.email
    );
    setMyPitches(userPitches);
  }, [navigate]);

  return (
    <div className="auth-container">
      <h2>My Submitted Pitches</h2>
      {myPitches.length === 0 ? (
        <p>You haven’t submitted any pitches yet.</p>
      ) : (
        <div className="pitch-list">
          {myPitches.map((pitch) => (
            <div key={pitch.id} className="pitch-card">
              <h3>{pitch.title}</h3>
              <p><strong>Description:</strong> {pitch.description}</p>
              <p><strong>Category:</strong> {pitch.category}</p>
              <p><strong>Submitted on:</strong> {new Date(pitch.id).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyPitches;
