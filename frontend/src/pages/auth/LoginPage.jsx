import React, { useState } from 'react';
import axios from 'axios';

export default function LoginPage({ onCodeSent }) {
  const [phone, setPhone] = useState('');
  const [remember, setRemember] = useState(true);

  const handleSendCode = async () => {
    try {
      await axios.post('http://localhost:5000/api/otp/request', { phone });
      alert('OTP generated! Check the backend console.');
      onCodeSent(phone, remember);
    } catch (err) {
      console.error(err);
      alert('שגיאה בבקשת הקוד');
    }
  };

  return (
    <div>
      <h1>כניסה</h1>
      <input
        type="tel"
        placeholder="מספר טלפון"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={remember}
          onChange={e => setRemember(e.target.checked)}
        /> זכור אותי
      </label>
      <button onClick={handleSendCode}>שלח קוד</button>
    </div>
  );
}
