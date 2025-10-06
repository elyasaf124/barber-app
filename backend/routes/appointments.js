const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const Appointment = require('../models/Appointment');
const Barber = require('../models/Barber');
const router = express.Router();

// Create appointment (requires token from verify/register or guest token)
// For guests you can allow no auth but require phone in body; here we show token usage
router.post('/', async (req, res) => {
  try {
    const { barberId, clientName, clientPhone, serviceName, startDatetime } = req.body;
    // TODO: add availability checks / locking to prevent double booking
    const appt = await Appointment.create({
      barberId, clientName, clientPhone, serviceName, startDatetime, endDatetime: null
    });
    res.json(appt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'server error' });
  }
});

// Get appointments for a phone or user (simple)
router.get('/', async (req, res) => {
  const { phone, userId } = req.query;
  const q = {};
  if (userId) q.userId = userId;
  if (phone) q.clientPhone = phone;
  const appts = await Appointment.find(q).sort({ startDatetime: 1 }).lean();
  res.json(appts);
});

// Cancel appointment
router.post('/:id/cancel', async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.id);
    if (!appt) return res.status(404).json({ message: 'Not found' });
    appt.status = 'cancelled';
    await appt.save();
    res.json({ message: 'Cancelled' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'server error' });
  }
});

module.exports = router;
