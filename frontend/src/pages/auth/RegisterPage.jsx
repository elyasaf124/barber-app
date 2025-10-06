import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterPage({ phone, onRegistered }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('user');

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/register', { phone, name, role });
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        onRegistered(res.data.user);
      }
    } catch (err) {
      console.error(err);
      alert('שגיאה בהרשמה');
    }
  };

  return (
    <div>
      <h1>הרשמה</h1>
      <input type="text" placeholder="שם מלא" value={name} onChange={e => setName(e.target.value)} />
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="user">משתמש רגיל</option>
        <option value="admin">אדמין</option>
      </select>
      <button onClick={handleRegister}>סיים הרשמה</button>
    </div>
  );
}
