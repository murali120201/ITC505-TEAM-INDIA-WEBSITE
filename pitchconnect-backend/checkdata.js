const db = require('./db');

(async () => {
  try {
    const users = await db.query('SELECT * FROM users');
    console.log('\n👤 USERS IN DB:\n', users.rows);

    const pitches = await db.query('SELECT * FROM pitches');
    console.log('\n📢 PITCHES IN DB:\n', pitches.rows);

    process.exit();
  } catch (err) {
    console.error('❌ Error querying data:', err);
    process.exit(1);
  }
})();
