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
    setUser(parsedUser);

    const fetchPitches = async () => {
      try {
        const res = await fetch(
          `https://itc505-team-india-website.onrender.com/api/pitches?userEmail=${parsedUser.email}&role=${parsedUser.role}`
        );

        if (!res.ok) throw new Error('Failed to fetch pitches');

        const data = await res.json();
        setMyPitches(data);
      } catch (err) {
        console.error('Error fetching pitches:', err);
        setMyPitches([]); // fallback
      }
    };

    fetchPitches();
  }, [navigate]);

  return (
    <div className="auth-container">
      <h2>{user?.role === 'startup' ? 'My Submitted Pitches' : 'All Startup Pitches'}</h2>

      {myPitches.length === 0 ? (
        <p>No pitches found.</p>
      ) : (
        <div className="pitch-list">
          {myPitches.map((pitch) => (
            <div key={pitch.id || pitch.title} className="pitch-card">
              <h3>{pitch.title}</h3>
              <p><strong>Description:</strong> {pitch.description}</p>
              <p><strong>Category:</strong> {pitch.category}</p>
              {user?.role === 'investor' && (
                <p><strong>Submitted by:</strong> {pitch.user_email}</p>
              )}
              <p><strong>Submitted on:</strong> {new Date(pitch.created_at || Date.now()).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyPitches;
