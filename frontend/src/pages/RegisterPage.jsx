import React, { useState } from "react";
import axios from "axios";

export default function RegisterPage({ phone, onRegistered }) {
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/auth/register", {
        fullName,
        phone,
        role: "user",
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      onRegistered(res.data.user);
    } catch {
      alert("שגיאה בהרשמה");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      <h2 className="text-2xl font-bold mb-4">השלמת הרשמה</h2>
      <input
        type="text"
        placeholder="שם מלא"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="border p-2 rounded w-64 text-center"
      />
      <button
        onClick={handleRegister}
        className="bg-green-600 text-white px-4 py-2 mt-3 rounded w-64"
      >
        {loading ? "נרשם..." : "סיום הרשמה"}
      </button>
    </div>
  );
}
