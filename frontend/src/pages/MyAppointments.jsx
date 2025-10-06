import React, { useEffect, useState } from 'react';
import { getAppointments, cancelAppointment } from '../api/api';

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      getAppointments(token)
        .then(res => setAppointments(res.data))
        .catch(err => console.error(err));
    }
  }, [token]);

  const handleCancel = async (id) => {
    try {
      await cancelAppointment(id, token);
      setAppointments(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      console.error('שגיאה בביטול התור:', err);
    }
  };

 return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">התורים שלי</h1>
      <ul className="space-y-2">
        {appointments.map(a => (
          <li key={a.id} className="bg-white p-3 rounded shadow flex justify-between items-center">
            <span>{a.client_name} - {new Date(a.start_datetime).toLocaleString('he-IL')}</span>
            <button onClick={() => handleCancel(a.id)} className="bg-red-500 text-white px-2 py-1 rounded">בטל</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyAppointments;
