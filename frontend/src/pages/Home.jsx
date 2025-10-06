import React, { useState } from "react";

export default function HomePage() {
  const isAdmin = true; // החלף ל-false כדי לבדוק מצב משתמש רגיל

  const [editingPrices, setEditingPrices] = useState(false);
  const [editingHours, setEditingHours] = useState(false);

  const [prices, setPrices] = useState([
    { id: 1, service: "תספורת רגילה", price: "70 ₪" },
    { id: 2, service: "תספורת + זקן", price: "100 ₪" },
    { id: 3, service: "זקן בלבד", price: "50 ₪" },
  ]);

  const [hours, setHours] = useState([
    { id: 1, day: "ראשון", hours: "9:00 - 19:00" },
    { id: 2, day: "שני", hours: "9:00 - 19:00" },
    { id: 3, day: "שלישי", hours: "9:00 - 19:00" },
    { id: 4, day: "רביעי", hours: "9:00 - 19:00" },
    { id: 5, day: "חמישי", hours: "9:00 - 19:00" },
    { id: 6, day: "שישי", hours: "8:00 - 14:00" },
  ]);

  const handleEditToggle = (type) => {
    if (type === "prices") setEditingPrices(!editingPrices);
    if (type === "hours") setEditingHours(!editingHours);
  };

  const handleChange = (type, id, field, value) => {
    if (type === "prices") {
      setPrices(prices.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
    } else {
      setHours(hours.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
    }
  };

  const handleAddRow = (type) => {
    const newRow =
      type === "prices"
        ? { id: Date.now(), service: "", price: "" }
        : { id: Date.now(), day: "", hours: "" };

    if (type === "prices") setPrices([...prices, newRow]);
    else setHours([...hours, newRow]);
  };

  const handleDeleteRow = (type, id) => {
    if (type === "prices") setPrices(prices.filter((row) => row.id !== id));
    else setHours(hours.filter((row) => row.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 text-gray-800 p-4">
      {/* לוגו */}
      <div className="text-center mt-6">
        <img
          src="/logo.png"
          alt="Barber Logo"
          className="w-24 h-24 mx-auto rounded-full shadow-md"
        />
        <h1 className="text-3xl font-bold mt-3">מספרת BarberTime</h1>
        <p className="text-gray-600 mt-1">📞 050-1234567</p>
      </div>

      {/* כפתור קבע תור */}
      <button className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md mt-6 hover:bg-blue-700">
        קבע תור
      </button>

      {/* גלריית תמונות */}
      <div className="grid grid-cols-3 gap-2 mt-8 w-full max-w-md">
        <img src="/hair1.jpg" alt="Haircut 1" className="rounded-lg shadow" />
        <img src="/hair2.jpg" alt="Haircut 2" className="rounded-lg shadow" />
        <img src="/hair3.jpg" alt="Haircut 3" className="rounded-lg shadow" />
      </div>

      {/* מחירון */}
      <div className="w-full max-w-md mt-8 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">💈 מחירון</h2>
          {isAdmin && (
            <button
              onClick={() => handleEditToggle("prices")}
              className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md"
            >
              {editingPrices ? "סיים עריכה" : "ערוך"}
            </button>
          )}
        </div>
        <table className="w-full text-right">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-2">שירות</th>
              <th className="py-2">מחיר</th>
              {editingPrices && <th></th>}
            </tr>
          </thead>
          <tbody>
            {prices.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-2">
                  {editingPrices ? (
                    <input
                      value={item.service}
                      onChange={(e) => handleChange("prices", item.id, "service", e.target.value)}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    item.service
                  )}
                </td>
                <td className="py-2">
                  {editingPrices ? (
                    <input
                      value={item.price}
                      onChange={(e) => handleChange("prices", item.id, "price", e.target.value)}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    item.price
                  )}
                </td>
                {editingPrices && (
                  <td className="text-center">
                    <button
                      onClick={() => handleDeleteRow("prices", item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {editingPrices && (
          <button
            onClick={() => handleAddRow("prices")}
            className="bg-green-500 text-white w-full py-2 rounded-md mt-3 hover:bg-green-600"
          >
            ➕ הוסף שורה
          </button>
        )}
      </div>

      {/* שעות פעילות */}
      <div className="w-full max-w-md mt-8 bg-white rounded-2xl shadow-lg p-4 mb-10">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">⏰ שעות פעילות</h2>
          {isAdmin && (
            <button
              onClick={() => handleEditToggle("hours")}
              className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md"
            >
              {editingHours ? "סיים עריכה" : "ערוך"}
            </button>
          )}
        </div>
        <table className="w-full text-right">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-2">יום</th>
              <th className="py-2">שעות</th>
              {editingHours && <th></th>}
            </tr>
          </thead>
          <tbody>
            {hours.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-2">
                  {editingHours ? (
                    <input
                      value={item.day}
                      onChange={(e) => handleChange("hours", item.id, "day", e.target.value)}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    item.day
                  )}
                </td>
                <td className="py-2">
                  {editingHours ? (
                    <input
                      value={item.hours}
                      onChange={(e) => handleChange("hours", item.id, "hours", e.target.value)}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    item.hours
                  )}
                </td>
                {editingHours && (
                  <td className="text-center">
                    <button
                      onClick={() => handleDeleteRow("hours", item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {editingHours && (
          <button
            onClick={() => handleAddRow("hours")}
            className="bg-green-500 text-white w-full py-2 rounded-md mt-3 hover:bg-green-600"
          >
            ➕ הוסף יום
          </button>
        )}
      </div>
    </div>
  );
}
