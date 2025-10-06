// זוהי גרסת seed פשוטה שמוסיפה 2 ספרים ודוגמאות. השתמש רק כשאתה יודע ש־MONGO_URI נכון.
const mongoose = require('mongoose');
require('dotenv').config();
const Barber = require('./models/Barber');
const Message = require('./models/Message');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Barber.deleteMany({});
  await Message.deleteMany({});
  const b1 = await Barber.create({
    name: 'יוסי כהן',
    bio: 'ספר ותיק ומנוסה',
    phone: '0501111111',
    image: '/images/barber1.jpg',
    services: [{ name: 'תספורת גברים', duration_minutes: 30, price: 100 }],
    workingHours: [{ day: 'ראשון', start: '09:00', end: '18:00' }],
    gallery: [{ url: '/images/h1.jpg' }]
  });
  const b2 = await Barber.create({
    name: 'רונית לוי',
    bio: 'ספרית מקצועית',
    phone: '0502222222',
    image: '/images/barber2.jpg'
  });
  await Message.create({ scope: 'global', title: 'מבצע', body: '10% הנחה לתלמידים' });
  console.log('seed done');
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
