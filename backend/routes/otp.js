const express = require('express');
const router = express.Router();
const OTPLog = require('../models/OTPLog');
const { sendSms, hashOtp } = require('../utils/sms');

const OTP_TTL_MIN = 5; // דקות

// בקשת OTP - מייצר קוד, שומר ב־DB (מוצפן) ושולח SMS
router.post('/request', async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: 'phone required' });

    const otp = Math.floor(1000 + Math.random() * 9000).toString(); // 4 ספרות
    const otpHash = hashOtp(otp);
    const expiresAt = new Date(Date.now() + OTP_TTL_MIN * 60 * 1000);

    await OTPLog.create({ phone, otpHash, expiresAt });
    await sendSms(phone, `קוד האימות שלך: ${otp} (תוקף ${OTP_TTL_MIN} דקות)`);

    return res.json({ message: 'OTP sent' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'server error' });
  }
});

// אימות OTP - שווה HASH של הקוד האחרון ב־DB
router.post('/verify', async (req, res) => {
  try {
    const { phone, otp, deviceId, remember } = req.body;
    if (!phone || !otp) return res.status(400).json({ message: 'phone+otp required' });

    const otpHash = hashOtp(otp);
    // מחפש את ההכנסה האחרונה עבור הטלפון
    const log = await OTPLog.findOne({ phone }).sort({ createdAt: -1 });
    if (!log) return res.status(400).json({ message: 'OTP not found' });
    if (new Date() > log.expiresAt) return res.status(400).json({ message: 'OTP expired' });
    if (log.otpHash !== otpHash) {
      log.attempts = (log.attempts || 0) + 1;
      await log.save();
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // סליחה — אימות עובר לחלק של auth/registration (handled in auth routes)
    return res.json({ message: 'OTP verified' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'server error' });
  }
});

module.exports = router;
