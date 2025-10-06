import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBarber, createAppointment } from '../api/api';
import AppointmentForm from '../components/AppointmentForm';

function BookAppointment() {
  const { barberId } = useParams();
  const [barber, setBarber] = useState(null);

  useEffect(() => {
    getBarber(barberId).then(res => setBarber(res.data));
  }, [barberId]);

  const handleSubmit = async (data) => {
    await createAppointment(data);
    alert('התור נקבע בהצלחה!');
  };

  if (!barber) return <div>טוען...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">קביעת תור</h1>
      <div className="flex flex-col gap-3 max-w-md">
        <input type="text" placeholder="שם מלא" value={name} onChange={e => setName(e.target.value)} className="p-2 border rounded"/>
        <input type="text" placeholder="טלפון" value={phone} onChange={e => setPhone(e.target.value)} className="p-2 border rounded"/>
        <input type="text" placeholder="שירות (id)" value={service} onChange={e => setService(e.target.value)} className="p-2 border rounded"/>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="p-2 border rounded"/>
        <input type="time" value={time} onChange={e => setTime(e.target.value)} className="p-2 border rounded"/>
        <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded mt-2">קבע תור</button>
      </div>
    </div>
  );
}

export default BookAppointment;
