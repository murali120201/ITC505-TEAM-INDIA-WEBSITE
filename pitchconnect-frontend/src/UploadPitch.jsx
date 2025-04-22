import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function UploadPitch() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || storedUser.role !== 'startup') {
      navigate('/dashboard');
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !category) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/pitches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          category,
          userEmail: user.email,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        navigate('/dashboard');
      } else {
        alert(data.message || 'Pitch submission failed.');
      }
    } catch (err) {
      console.error('Pitch upload error:', err);
      alert('Something went wrong. Try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Upload Your Pitch</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          placeholder="Pitch title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description</label>
        <textarea
          placeholder="Brief description of your startup"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
        />

        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">-- Select --</option>
          <option value="tech">Tech</option>
          <option value="health">Health</option>
          <option value="education">Education</option>
          <option value="finance">Finance</option>
        </select>

        <button type="submit" className="btn filled">Submit Pitch</button>
      </form>
    </div>
  );
}

export default UploadPitch;
