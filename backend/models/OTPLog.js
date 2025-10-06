const mongoose = require('mongoose');

const OTPLogSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  otpHash: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  attempts: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

OTPLogSchema.index({ phone: 1, createdAt: -1 });

module.exports = mongoose.model('OTPLog', OTPLogSchema);
