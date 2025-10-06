import React, { useEffect, useState } from 'react';
import { getBarbers } from '../api/api';

export default function BarberProfile({ barberId }) {
  const [barber, setBarber] = useState(null);

  useEffect(() => {
    getBarbers().then(res => {
      const found = res.data.find(b => b._id === barberId);
      setBarber(found);
    });
  }, [barberId]);

  if (!barber) return <p>טוען...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans text-right">
      {/* כותרת */}
      <h1 className="text-3xl font-bold mb-4">{barber.name}</h1>

      {/* תמונה וביוגרפיה */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <img
          src={barber.image || '/images/default-barber.jpg'}
          alt={barber.name}
          className="w-full md:w-1/3 h-64 object-cover rounded"
        />
        <div>
          <p className="text-gray-700 mb-2">{barber.bio}</p>
          <p className="text-gray-600 text-sm mb-1">
            כתובת: {barber.location?.address || 'לא צוינה'}
          </p>
          <p className="text-gray-600 text-sm">
            שעות פעילות: {barber.workingHours?.map(w => `${w.day}: ${w.start}-${w.end}`).join(', ') || 'לא צוינה'}
          </p>
        </div>
      </div>

      {/* כפתורי פעולה */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
          קבע תור
        </button>
        <a
          href={`tel:${barber.phone || ''}`}
          className="flex-1 text-center bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
        >
          התקשר לספר
        </a>
      </div>

      {/* גלריה */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-3">גלריית עבודות</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {barber.gallery?.map(img => (
            <img
              key={img._id}
              src={img.url}
              alt={img.caption || ''}
              className="w-full h-32 object-cover rounded"
            />
          )) || <p>אין תמונות זמינות</p>}
        </div>
      </div>
    </div>
  );
}
