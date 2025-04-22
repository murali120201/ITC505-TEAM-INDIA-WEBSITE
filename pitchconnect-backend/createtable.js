const db = require('./db');

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL
  );
`;

const createPitchesTable = `
  CREATE TABLE IF NOT EXISTS pitches (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    user_email TEXT REFERENCES users(email) ON DELETE CASCADE
  );
`;

async function run() {
  try {
    await db.query(createUsersTable);
    console.log('✅ users table created');
    await db.query(createPitchesTable);
    console.log('✅ pitches table created');
    process.exit();
  } catch (err) {
    console.error('❌ Error creating tables:', err);
    process.exit(1);
  }
}

run();
