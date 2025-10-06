// src/components/BarberCard.jsx - placeholder
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BarberCard({ barber }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4 flex flex-col items-center">
      <img src={barber.image || '/placeholder.png'} alt={barber.name} className="w-32 h-32 rounded-full mb-2" />
      <h2 className="text-lg font-bold">{barber.name}</h2>
      <p className="text-sm text-gray-500">{barber.bio}</p>
      <button
        onClick={() => navigate(`/barber/${barber.id}`)}
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        קבע תור
      </button>
    </div>
  );
}
