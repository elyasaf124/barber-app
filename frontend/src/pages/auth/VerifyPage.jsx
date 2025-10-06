import React, { useState } from 'react';
import axios from 'axios';

export default function VerifyPage({ phone, onVerified, onNewUser }) {
  const [otp, setOtp] = useState('');

  const handleVerify = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/otp/verify', { phone, otp });
      if (res.data.success) {
        if (res.data.newUser) {
          onNewUser();
        } else {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          onVerified(res.data.user);
        }
      }
    } catch (err) {
      console.error(err);
      alert('OTP לא תקין');
    }
  };

  return (
    <div>
      <h1>הכנס קוד OTP</h1>
      <input
        type="text"
        placeholder="קוד OTP"
        value={otp}
        onChange={e => setOtp(e.target.value)}
      />
      <button onClick={handleVerify}>אימות</button>
    </div>
  );
}
