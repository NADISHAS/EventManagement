import { User } from '../models/index.js';

// Beginner-friendly authentication middleware
// Expects a header `x-user-id` with the ID of the logged-in user (no JWT)
export const authenticate = async (req, res, next) => {
  const userId = req.headers['x-user-id'];
  if (!userId) return res.status(401).json({ message: 'Missing user id header (x-user-id)' });
  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(401).json({ message: 'Invalid user' });
    req.user = { id: user.id, role: user.role };
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export const requireAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  next();
};
