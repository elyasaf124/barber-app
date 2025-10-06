const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const OTPLog = require('../models/OTPLog');
const { hashOtp, sendSms } = require('../utils/sms');

const SECRET = process.env.JWT_SECRET || 'secretkey';
const EXPIRES_SHORT = process.env.JWT_EXPIRES_SHORT || '1h';
const EXPIRES_LONG = process.env.JWT_EXPIRES_LONG || '30d';

// helper - issue token
function issueToken(user, remember=false) {
  const expires = remember ? EXPIRES_LONG : EXPIRES_SHORT;
  const token = jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: expires });
  return token;
}

// Endpoint: request code (wrapper; calls OTP flow or can be used directly)
router.post('/request-code', async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: 'phone required' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
    const otpHash = hashOtp(otp);
    const expiresAt = new Date(Date.now() + 5*60000);

    await OTPLog.create({ phone, otpHash, expiresAt });
    await sendSms(phone, `קוד האימות שלך: ${otp} (תוקף 5 דקות)`);

    res.json({ message: 'code sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'server error' });
  }
});

// Endpoint: verify & login/register flow
router.post('/verify-code', async (req, res) => {
  try {
    const { phone, code, deviceId, remember } = req.body;
    if (!phone || !code) return res.status(400).json({ message: 'phone+code required' });

    const otpHash = hashOtp(code);
    const log = await OTPLog.findOne({ phone }).sort({ createdAt: -1 });
    if (!log) return res.status(400).json({ message: 'OTP not found' });
    if (new Date() > log.expiresAt) return res.status(400).json({ message: 'OTP expired' });
    if (log.otpHash !== otpHash) return res.status(400).json({ message: 'Invalid OTP' });

    // OTP good -> find or create user
    let user = await User.findOne({ phone });
    if (!user) {
      // indicate frontend to proceed to registration
      return res.json({ newUser: true });
    }

    // remember device?
    if (deviceId && remember) {
      // only add if not present
      const exists = user.rememberedDevices?.some(d => d.deviceId === deviceId);
      if (!exists) {
        user.rememberedDevices = user.rememberedDevices || [];
        user.rememberedDevices.push({ deviceId });
        await user.save();
      }
    }

    // create token
    const token = issueToken(user, !!remember);
    return res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'server error' });
  }
});

// Endpoint: complete registration for new user after OTP verified
router.post('/register', async (req, res) => {
  try {
    const { phone, fullName, role, deviceId, remember } = req.body;
    if (!phone || !fullName) return res.status(400).json({ message: 'phone+fullName required' });

    // If exists, return error or merge
    let existing = await User.findOne({ phone });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ phone, fullName, role: role || 'user' });
    if (deviceId && remember) user.rememberedDevices = [{ deviceId }];
    await user.save();

    const token = issueToken(user, !!remember);
    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'server error' });
  }
});

// Logout (optional) - remove remembered device
router.post('/logout', async (req, res) => {
  try {
    const { phone, deviceId } = req.body;
    if (!phone || !deviceId) return res.status(400).json({ message: 'phone+deviceId required' });
    await User.updateOne({ phone }, { $pull: { rememberedDevices: { deviceId } } });
    res.json({ message: 'logged out' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'server error' });
  }
});

module.exports = router;
