const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ✅ Test DB connection
db.query('SELECT NOW()', (err, resDB) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
  } else {
    console.log('✅ PostgreSQL connected at:', resDB.rows[0].now);
  }
});

// ✅ Register route
app.post('/api/register', async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Please fill in all fields.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user already exists
    const userExists = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Insert new user
    await db.query(
      'INSERT INTO users (email, password, role) VALUES ($1, $2, $3)',
      [email, hashedPassword, role]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter both email and password.' });
    }
  
    try {
      const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  
      if (result.rows.length === 0) {
        return res.status(401).json({ message: 'User not found' });
      }
  
      const user = result.rows[0];
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Incorrect password' });
      }
  
      // Success 🎉
      res.status(200).json({
        message: 'Login successful',
        user: {
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.post('/api/pitches', async (req, res) => {
    const { title, description, category, userEmail } = req.body;
    console.log('📩 Incoming pitch:', { title, description, category, userEmail });
  
    if (!title || !description || !category || !userEmail) {
      console.log('❌ Missing field in pitch upload');
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
    try {
      const userResult = await db.query('SELECT id FROM users WHERE email = $1', [userEmail]);
      if (userResult.rows.length === 0) {
        console.log('❌ User not found for email:', userEmail);
        return res.status(404).json({ message: 'User not found.' });
      }
  
      const userId = userResult.rows[0].id;
      console.log('✅ Found user ID:', userId);
  
      await db.query(
        'INSERT INTO pitches (title, description, category, user_id) VALUES ($1, $2, $3, $4)',
        [title, description, category, userId]
      );
  
      console.log('✅ Pitch saved to DB');
      res.status(201).json({ message: 'Pitch submitted successfully!' });
    } catch (err) {
      console.error('❌ Pitch upload error:', err);
      res.status(500).json({ message: 'Server error. Try again.' });
    }
  });
  
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
