import React, { useState } from "react";
import axios from "axios";

export default function LoginPage({ onCodeSent }) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    setLoading(true);
    try {
      await axios.post("/auth/send-code", { phone });
      onCodeSent(phone);
    } catch (err) {
      alert("שגיאה בשליחת קוד");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      <h2 className="text-2xl font-bold mb-4">התחברות</h2>
      <input
        type="tel"
        placeholder="מספר טלפון"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 rounded w-64 text-center"
      />
      <button
        onClick={handleSendCode}
        className="bg-blue-600 text-white px-4 py-2 mt-3 rounded w-64"
      >
        {loading ? "שולח..." : "שלח קוד"}
      </button>
    </div>
  );
}
