const express = require('express');
const Barber = require('../models/Barber');
const router = express.Router();

// List barbers
router.get('/', async (req, res) => {
  const barbers = await Barber.find().lean();
  res.json(barbers);
});

// Get barber by id
router.get('/:id', async (req, res) => {
  const barber = await Barber.findById(req.params.id).lean();
  if (!barber) return res.status(404).json({ message: 'Not found' });
  res.json(barber);
});

module.exports = router;
