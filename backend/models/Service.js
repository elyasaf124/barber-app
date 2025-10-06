const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  barber_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Barber', required: true },
  name: { type: String, required: true },
  duration_minutes: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String },
});

module.exports = mongoose.model('Service', serviceSchema);
