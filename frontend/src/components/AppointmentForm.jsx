import React, { useState } from 'react';

function AppointmentForm({ barberId, services, onSubmit }) {
  const [serviceId, setServiceId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = () => {
    onSubmit({ barberId, serviceId, date, time, name, phone });
  };

  return (
    <div>
      <select onChange={e => setServiceId(e.target.value)}>
        <option value="">בחר שירות</option>
        {services.map(s => <option key={s.id} value={s.id}>{s.name} - {s.price}₪</option>)}
      </select>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <input type="time" value={time} onChange={e => setTime(e.target.value)} />
      <input type="text" placeholder="שם מלא" value={name} onChange={e => setName(e.target.value)} />
      <input type="text" placeholder="טלפון" value={phone} onChange={e => setPhone(e.target.value)} />
      <button onClick={handleSubmit}>קבע תור</button>
    </div>
  );
}

export default AppointmentForm;
