import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import UserModel from './user.js';
import EventModel from './event.js';
import RegistrationModel from './registration.js';

dotenv.config();

// Simplified: require MySQL configuration. No SQLite fallback.
const DB_DIALECT = process.env.DB_DIALECT || 'mysql';

if (DB_DIALECT !== 'mysql') {
  throw new Error('Unsupported DB_DIALECT. This app is simplified to use MySQL only. Set DB_DIALECT=mysql in .env');
}

if (!process.env.DB_NAME || !process.env.DB_USER) {
  throw new Error('Missing DB configuration. Please set DB_NAME and DB_USER (and DB_PASS/DB_HOST) in backend/.env');
}

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS || '', {
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
  logging: false,
});

const User = UserModel(sequelize);
const Event = EventModel(sequelize);
const Registration = RegistrationModel(sequelize);

// associations
User.hasMany(Registration, { foreignKey: 'userId' });
Registration.belongsTo(User, { foreignKey: 'userId' });

Event.hasMany(Registration, { foreignKey: 'eventId' });
Registration.belongsTo(Event, { foreignKey: 'eventId' });

export { sequelize, User, Event, Registration };
