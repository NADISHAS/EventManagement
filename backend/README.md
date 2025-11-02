Event Management Backend

Quick start

1. Copy `.env.example` to `.env` and fill values (DB credentials).
2. Install dependencies: npm install
3. Start dev server: npm run dev

Notes
- Uses Sequelize with MySQL. This simplified project no longer falls back to SQLite. Please set MySQL credentials in `.env`.
- Firebase notifications require a service account JSON and FIREBASE_SERVICE_ACCOUNT_PATH in .env.
