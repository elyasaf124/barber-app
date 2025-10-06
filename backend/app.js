require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const otpRoutes = require('./routes/otp');
const registerRoutes = require('./routes/register');
const authRoutes = require('./routes/auth');
const barbersRoutes = require('./routes/barbers');
const appointmentsRoutes = require('./routes/appointments');
const adminRoutes = require('./routes/admin');
const messagesRoutes = require('./routes/messages');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=> console.log('MongoDB connected'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Routes
app.use('/api/otp', otpRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/barbers', barbersRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/register', registerRoutes);

// Basic health
app.get('/api/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
