import dotenv from 'dotenv';
import { sequelize, User, Event, Registration } from '../models/index.js';
import { pool } from '../db/pool.js';

dotenv.config();

async function run() {
  try {
    console.log('Testing mysql2/promise pool connection (direct)...');
    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query('SELECT 1 as ok');
      console.log('Pool test ok:', Array.isArray(rows) && rows.length > 0);
    } finally {
      conn.release();
    }

    console.log('Testing Sequelize connection...');
    await sequelize.authenticate();
    console.log('Sequelize connection has been established successfully.');

    const users = await User.findAll({ limit: 10 });
    console.log('Users found:', users.length);
    users.forEach(u => console.log(`- ${u.id} ${u.email} ${u.name} role=${u.role}`));

    const events = await Event.findAll({ limit: 10 });
    console.log('Events found:', events.length);

    const regs = await Registration.findAll({ limit: 10 });
    console.log('Registrations found:', regs.length);

    // close pool gracefully
    await pool.end();

    process.exit(0);
  } catch (err) {
    console.error('Unable to connect to the database:', err.message || err);
    try { await pool.end(); } catch (e) {}
    process.exit(1);
  }
}

run();
