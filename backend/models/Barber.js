const mongoose = require('mongoose');

const BarberSchema = new mongoose.Schema({
  name: String,
  bio: String,
  phone: String,
  image: String,
  location: {
    lat: Number,
    lng: Number,
    address: String
  },
  services: [{ // embedded basic service list for quick reads
    name: String,
    duration_minutes: Number,
    price: Number,
    description: String
  }],
  workingHours: [{ day: String, start: String, end: String }],
  gallery: [{ url: String, caption: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Barber', BarberSchema);
