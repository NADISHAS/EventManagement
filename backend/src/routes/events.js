import express from 'express';
import { Event, Registration } from '../models/index.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// GET /api/events - list upcoming
router.get('/', async (req, res) => {
  try {
    const events = await Event.findAll({ order: [['date', 'ASC']] });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/events/:id
// NOTE: place specific routes (like /my-registrations) BEFORE the dynamic `/:id` route
// so Express does not treat 'my-registrations' as an event id.

// GET /api/my-registrations - list registrations for the current user including event details
router.get('/my-registrations', authenticate, async (req, res) => {
  try {
    const regs = await Registration.findAll({
      where: { userId: req.user.id },
      include: [{ model: Event }],
      order: [['created_at', 'DESC']]
    });
    res.json(regs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/events/:id
router.get('/:id', async (req, res) => {
  try {
    const ev = await Event.findByPk(req.params.id);
    if (!ev) return res.status(404).json({ message: 'Event not found' });
    res.json(ev);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/events/:id/register - register user for event
router.post('/:id/register', authenticate, async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user.id;
    const existing = await Registration.findOne({ where: { eventId, userId } });
    if (existing) return res.status(400).json({ message: 'Already registered' });
    const registration = await Registration.create({ eventId, userId, status: 'pending', paymentStatus: 'n/a' });
    res.json({ registration });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/events/:id/registrations - for event owner/admin => simplified: protected
router.get('/:id/registrations', authenticate, async (req, res) => {
  try {
    const regs = await Registration.findAll({ where: { eventId: req.params.id } });
    res.json(regs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// (moved above to avoid being shadowed by '/:id')

export default router;
