import React, { useEffect, useState } from 'react';
import { getBarbers, createBarber } from '../api/api';

function AdminDashboard() {
  const [barbers, setBarbers] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    getBarbers().then(res => setBarbers(res.data));
  }, []);

  const handleAddBarber = async () => {
    const res = await createBarber({ name });
    setBarbers([...barbers, res.data]);
    setName('');
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <input placeholder="Barber Name" value={name} onChange={e => setName(e.target.value)} />
      <button onClick={handleAddBarber}>Add Barber</button>
      <ul>
        {barbers.map(b => <li key={b._id}>{b.name}</li>)}
      </ul>
    </div>
  );
}

export default AdminDashboard;
