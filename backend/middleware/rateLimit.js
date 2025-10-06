// backend/middleware/rateLimit.js
const rateLimit = require('express-rate-limit');

const otpLimiter = rateLimit({
  windowMs: 60 * 1000, // חלון 1 דקה
  max: 3, // מקסימום בקשות OTP לדקה ממקור אחד
  message: { message: 'יותר מדי בקשות. נסה שנית בעוד דקה.' }
});

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // שעה
  max: 20, // בקשות אימות/כניסה לשעה ממקור אחד
  message: { message: 'שגיאת עומס — נסה שוב מאוחר יותר.' }
});

module.exports = { otpLimiter, authLimiter };
