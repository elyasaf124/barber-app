const Twilio = require('twilio');
const crypto = require('crypto');
require('dotenv').config();

const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSMS = async (to, body) => {
  try {
    const message = await client.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to
    });
    console.log('SMS sent:', message.sid);
    return message;
  } catch (err) {
    console.error('Error sending SMS:', err);
    throw err;
  }
};

function hashOtp(otp) {
  return crypto.createHash('sha256').update(otp).digest('hex');
}

module.exports = { sendSMS, hashOtp };
