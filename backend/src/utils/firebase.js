import admin from 'firebase-admin';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

let initialized = false;
export function initFirebase() {
  if (initialized) return;
  const path = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  if (!path || !fs.existsSync(path)) {
    console.warn('Firebase service account not found. Notifications will not work until you add the file and set FIREBASE_SERVICE_ACCOUNT_PATH');
    return;
  }
  const serviceAccount = JSON.parse(fs.readFileSync(path, 'utf8'));
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  initialized = true;
}

export async function sendNotificationToToken(token, payload) {
  if (!initialized) initFirebase();
  if (!initialized) throw new Error('Firebase not initialized');
  return admin.messaging().sendToDevice(token, { notification: payload });
}
