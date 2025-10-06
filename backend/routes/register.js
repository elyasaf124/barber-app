const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  const { phone, name, role } = req.body;

  try {
    const user = new User({ phone, name, role });
    await user.save();
    res.json({ success: true, token: 'dummy-token', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error creating user' });
  }
});

module.exports = router;
