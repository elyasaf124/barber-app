const express = require('express');
const router = express.Router();
const User = require('../models/User');

const otpStore = {}; // { phone: otp }

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// בקשה ל-OTP
router.post('/request', async (req, res) => {
  const { phone } = req.body;
  const otp = generateOTP();
  otpStore[phone] = otp;

  console.log(`OTP for ${phone}: ${otp}`); // במקום לשלוח SMS

  res.json({ success: true, message: 'OTP generated' });
});

// אימות OTP
router.post('/verify', async (req, res) => {
  const { phone, otp } = req.body;

  if (otpStore[phone] && otpStore[phone] === otp) {
    delete otpStore[phone];

    let user = await User.findOne({ phone });
    if (!user) {
      // משתמש חדש, מחזיר סמן ל-register
      return res.json({ success: true, newUser: true });
    }

    // משתמש קיים
    res.json({ success: true, token: 'dummy-token', user });
  } else {
    res.status(400).json({ success: false, message: 'Invalid OTP' });
  }
});

module.exports = router;
