import React, { useState } from "react";

export default function AdminEditableTable({ title, columns, data, isAdmin, onSave }) {
  const [rows, setRows] = useState(data);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (index, key, value) => {
    const updated = [...rows];
    updated[index][key] = value;
    setRows(updated);
  };

  const handleAddRow = () => {
    const emptyRow = {};
    columns.forEach((col) => (emptyRow[col.key] = ""));
    setRows([...rows, emptyRow]);
  };

  const handleDeleteRow = (index) => {
    const updated = rows.filter((_, i) => i !== index);
    setRows(updated);
  };

  const handleSave = () => {
    onSave(rows);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-full max-w-md mx-auto mt-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        {isAdmin && (
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-sm text-blue-500 hover:underline"
          >
            {isEditing ? "ביטול" : "✏️ ערוך"}
          </button>
        )}
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((col) => (
              <th key={col.key} className="text-right p-2 border-b text-gray-600 text-sm">
                {col.label}
              </th>
            ))}
            {isEditing && <th className="p-2"></th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key} className="p-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={row[col.key]}
                      onChange={(e) => handleChange(index, col.key, e.target.value)}
                      className="border rounded px-2 py-1 text-sm w-full"
                    />
                  ) : (
                    <span className="text-gray-800">{row[col.key]}</span>
                  )}
                </td>
              ))}
              {isEditing && (
                <td className="p-2 text-center">
                  <button
                    onClick={() => handleDeleteRow(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    🗑️
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && (
        <div className="flex justify-between mt-3">
          <button
            onClick={handleAddRow}
            className="text-green-600 text-sm hover:underline"
          >
            ➕ הוסף שורה
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600"
          >
            שמור שינויים
          </button>
        </div>
      )}
    </div>
  );
}
