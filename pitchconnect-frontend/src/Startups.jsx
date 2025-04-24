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

    const fetchPitches = async () => {
      try {
        const res = await fetch(
          `https://itc505-team-india-website.onrender.com/api/pitches?userEmail=${parsedUser.email}&role=investor`
        );
        const data = await res.json();
        setPitches(data);
      } catch (err) {
        console.error('Error fetching startup pitches:', err);
      }
    };

    fetchPitches();
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
              <p><strong>Submitted by:</strong> {pitch.user_email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Startups;
