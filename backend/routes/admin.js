const express = require('express');
const Barber = require('../models/Barber');
const Message = require('../models/Message');
const { authMiddleware, adminOnly } = require('../middleware/auth');
const router = express.Router();

router.use(authMiddleware); // all admin routes require auth
router.use(adminOnly);

// Create barber
router.post('/barbers', async (req, res) => {
  const data = req.body;
  const barber = await Barber.create(data);
  res.json(barber);
});

// Update barber
router.put('/barbers/:id', async (req, res) => {
  const barber = await Barber.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(barber);
});

// Delete barber
router.delete('/barbers/:id', async (req, res) => {
  await Barber.findByIdAndDelete(req.params.id);
  res.json({ message: 'deleted' });
});

// Create global message
router.post('/messages', async (req, res) => {
  const { title, body } = req.body;
  const message = await Message.create({ scope: 'global', title, body, publishedAt: new Date(), authorId: req.user._id });
  res.json(message);
});

module.exports = router;
