import express from 'express';
import { Event, Registration, User } from '../models/index.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// protect all admin routes
router.use(authenticate, requireAdmin);

// POST /api/admin/events - create event
router.post('/events', async (req, res) => {
  try {
    const data = req.body;
    const ev = await Event.create({ ...data, createdBy: req.user.id });
    res.json(ev);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/admin/events/:id
router.put('/events/:id', async (req, res) => {
  try {
    const ev = await Event.findByPk(req.params.id);
    if (!ev) return res.status(404).json({ message: 'Not found' });
    await ev.update(req.body);
    res.json(ev);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/admin/events/:id
router.delete('/events/:id', async (req, res) => {
  try {
    const ev = await Event.findByPk(req.params.id);
    if (!ev) return res.status(404).json({ message: 'Not found' });
    await ev.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/admin/events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.findAll({ order: [['createdAt', 'DESC']] });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/admin/reports - simplified report
router.get('/reports', async (req, res) => {
  try {
    const totalEvents = await Event.count();
    const totalAttendees = await Registration.count({ where: { status: 'confirmed' } });
    res.json({ totalEvents, totalAttendees });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/admin/attendees/:eventId
router.get('/attendees/:eventId', async (req, res) => {
  try {
    const regs = await Registration.findAll({ where: { eventId: req.params.eventId }, include: [{ model: User }] });
    res.json(regs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/admin/attendees/:id - update registration status (approve/reject)
router.put('/attendees/:id', async (req, res) => {
  try {
    const reg = await Registration.findByPk(req.params.id);
    if (!reg) return res.status(404).json({ message: 'Registration not found' });
    const { status, paymentStatus } = req.body;
    if (status) reg.status = status;
    if (paymentStatus) reg.paymentStatus = paymentStatus;
    await reg.save();
    res.json(reg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
