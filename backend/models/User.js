const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  deviceId: String,
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

const UserSchema = new mongoose.Schema({
  fullName: { type: String, default: '' },
  phone: { type: String, required: true, unique: true },
  role: { type: String, enum: ['admin','user'], default: 'user' },
  rememberedDevices: [deviceSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
