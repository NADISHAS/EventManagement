import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS || '';
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;

if (!DB_USER || !DB_NAME) {
  throw new Error('Missing DB configuration for mysql2 pool. Set DB_USER and DB_NAME in backend/.env');
}

// Create a connection pool using mysql2/promise
const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  port: DB_PORT,
  waitForConnections: true,
  connectionLimit: parseInt(process.env.DB_POOL_LIMIT || '10', 10),
  queueLimit: 0,
  namedPlaceholders: true,
});

export { pool };
