// backend/utils/sms.js
const crypto = require('crypto');
const provider = process.env.SMS_PROVIDER || 'mock';

let twilioClient = null;
if (provider === 'twilio') {
  const Twilio = require('twilio');
  twilioClient = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
}

async function sendSms(phone, message) {
  if (provider === 'mock') {
    console.log(`[MOCK SMS] to ${phone}: ${message}`);
    return { ok: true, mock: true };
  }
  if (provider === 'twilio' && twilioClient) {
    const from = process.env.TWILIO_FROM;
    const res = await twilioClient.messages.create({ body: message, from, to: phone });
    return res;
  }
  throw new Error('SMS provider not configured');
}

function hashOtp(otp) {
  return crypto.createHash('sha256').update(otp).digest('hex');
}

module.exports = { sendSms, hashOtp };
