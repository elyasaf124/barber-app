import React, { useState } from "react";
import axios from "axios";

export default function VerifyCode({ phone, onVerified, onNewUser }) {
  const [code, setCode] = useState("");

  const handleVerify = async () => {
    try {
      const res = await axios.post("/auth/verify-code", { phone, code });
      if (res.data.newUser) onNewUser(phone);
      else {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        onVerified(res.data.user);
      }
    } catch (err) {
      alert("קוד שגוי");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      <h2 className="text-2xl font-bold mb-4">אמת את הקוד</h2>
      <input
        type="text"
        placeholder="הכנס קוד"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="border p-2 rounded w-64 text-center"
      />
      <button
        onClick={handleVerify}
        className="bg-green-600 text-white px-4 py-2 mt-3 rounded w-64"
      >
        אשר
      </button>
    </div>
  );
}
