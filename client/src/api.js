import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

const instance = axios.create({ baseURL: API_BASE });

// Beginner-friendly: set simple x-user-id header (no JWT)
export function setAuthUserId(userId) {
  if (userId) instance.defaults.headers.common['x-user-id'] = String(userId);
  else delete instance.defaults.headers.common['x-user-id'];
}

export default instance;
