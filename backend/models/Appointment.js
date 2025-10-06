const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  barberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Barber', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  clientName: String,
  clientPhone: String,
  serviceName: String,
  startDatetime: Date,
  endDatetime: Date,
  status: { type: String, enum: ['booked','cancelled','completed'], default: 'booked' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
