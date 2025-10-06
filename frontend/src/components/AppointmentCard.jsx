import React from 'react';

export default function AppointmentCard({ appointment, onCancel }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center mb-2">
      <div>
        <h3 className="font-bold">{appointment.serviceName}</h3>
        <p>{new Date(appointment.start_datetime).toLocaleString('he-IL')}</p>
      </div>
      <button
        onClick={() => onCancel(appointment.id)}
        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
      >
        ביטול
      </button>
    </div>
  );
}
