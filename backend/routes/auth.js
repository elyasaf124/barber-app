// backend/routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch'); // for reCAPTCHA verification
const OTPLog = require('../models/OTPLog');
const User = require('../models/User');
const { sendSms, hashOtp } = require('../utils/sms');
const { otpLimiter, authLimiter } = require('../middleware/rateLimit');

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'secretkey';
const EXPIRES_SHORT = process.env.JWT_EXPIRES_SHORT || '1h';
const EXPIRES_LONG = process.env.JWT_EXPIRES_LONG || '30d';

function issueToken(user, remember = false) {
  const expiresIn = remember ? EXPIRES_LONG : EXPIRES_SHORT;
  return jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn });
}

// helper: verify reCAPTCHA token (optional)
async function verifyRecaptcha(token) {
  if (!process.env.RECAPTCHA_SECRET) return true; // not configured -> skip
  const secret = process.env.RECAPTCHA_SECRET;
  const res = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${secret}&response=${token}`
  });
  const data = await res.json();
  return data.success;
}

// Request OTP (6-digit) - protected by rate limiter
router.post('/request-code', otpLimiter, async (req, res) => {
  try {
    const { phone, recaptchaToken } = req.body;
    if (!phone) return res.status(400).json({ message: 'phone required' });

    // optional reCAPTCHA guard
    const recaptchaOk = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaOk) return res.status(400).json({ message: 'reCAPTCHA failed' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
    const otpHash = hashOtp(otp);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await OTPLog.create({ phone, otpHash, expiresAt, attempts: 0 });
    await sendSms(phone, `הקוד שלך: ${otp} (תוקף 5 דקות)`);

    return res.json({ message: 'OTP sent' });
  } catch (err) {
    console.error('request-code error', err);
    return res.status(500).json({ message: 'server error' });
  }
});

// Verify code -> returns token if user exists, otherwise { newUser: true }
router.post('/verify-code', authLimiter, async (req, res) => {
  try {
    const { phone, code, deviceId, remember } = req.body;
    if (!phone || !code) return res.status(400).json({ message: 'phone+code required' });

    const otpHash = hashOtp(code);
    const log = await OTPLog.findOne({ phone }).sort({ createdAt: -1 });
    if (!log) return res.status(400).json({ message: 'OTP not found' });
    if (new Date() > log.expiresAt) return res.status(400).json({ message: 'OTP expired' });
    if (log.otpHash !== otpHash) {
      log.attempts = (log.attempts || 0) + 1;
      await log.save();
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // OTP OK — find or indicate register
    let user = await User.findOne({ phone });
    if (!user) {
      // keep verified OTP logged; front will request registration
      return res.json({ newUser: true });
    }

    // remember device: add only if recall requested
    if (deviceId && remember) {
      const exists = user.rememberedDevices?.some(d => d.deviceId === deviceId);
      if (!exists) {
        user.rememberedDevices = user.rememberedDevices || [];
        user.rememberedDevices.push({ deviceId });
        await user.save();
      }
    }

    const token = issueToken(user, !!remember);
    return res.json({ token, user });
  } catch (err) {
    console.error('verify-code error', err);
    return res.status(500).json({ message: 'server error' });
  }
});

// Register after verified OTP
router.post('/register', authLimiter, async (req, res) => {
  try {
    const { phone, fullName, role, deviceId, remember } = req.body;
    if (!phone || !fullName) return res.status(400).json({ message: 'phone+fullName required' });

    const existing = await User.findOne({ phone });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ phone, fullName, role: role || 'user' });
    if (deviceId && remember) user.rememberedDevices = [{ deviceId }];
    await user.save();

    const token = issueToken(user, !!remember);
    return res.json({ token, user });
  } catch (err) {
    console.error('register error', err);
    return res.status(500).json({ message: 'server error' });
  }
});

// Logout endpoint (optional)
router.post('/logout', async (req, res) => {
  try {
    const { phone, deviceId } = req.body;
    if (!phone || !deviceId) return res.status(400).json({ message: 'phone+deviceId required' });
    await User.updateOne({ phone }, { $pull: { rememberedDevices: { deviceId } } });
    return res.json({ message: 'logged out' });
  } catch (err) {
    console.error('logout error', err);
    return res.status(500).json({ message: 'server error' });
  }
});

module.exports = router;
