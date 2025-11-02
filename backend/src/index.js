import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize, User, Event } from './models/index.js';
import { pool } from './db/pool.js';
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 4000;

async function start() {
  try {
  await sequelize.authenticate();
  console.log('Database connection authenticated (Sequelize).');

  await sequelize.sync();
  console.log('Sequelize models synchronized (sync without alter).');

    const userCount = await User.count();
    if (userCount === 0) {
      console.log('No users found — creating default admin user and sample event');
      const admin = await User.create({ name: 'Admin User', email: 'admin@example.com', password: 'admin123', role: 'admin' });
      await Event.create({ title: 'Sample Online Event', description: 'This is a sample event for testing', date: '2025-11-15', time: '18:00', venue: 'Online', mode: 'online', maxAttendees: 100, fee: 0.00, createdBy: admin.id });
      console.log('Seed data created: admin@example.com / admin123');
    }
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
