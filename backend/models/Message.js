const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  scope: { type: String, enum: ['global','barber'], default: 'global' },
  barberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Barber', default: null },
  title: String,
  body: String,
  publishedAt: { type: Date, default: Date.now },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
});

module.exports = mongoose.model('Message', MessageSchema);
