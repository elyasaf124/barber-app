import React, { useState } from 'react';

function OTPInput({ phone, onVerify }) {
  const [otp, setOtp] = useState('');

  const handleSubmit = () => {
    onVerify(otp);
  };

  return (
    <div>
      <input
        type="text"
        value={otp}
        onChange={e => setOtp(e.target.value)}
        placeholder="הכנס קוד OTP"
      />
      <button onClick={handleSubmit}>אימות</button>
    </div>
  );
}

export default OTPInput;
