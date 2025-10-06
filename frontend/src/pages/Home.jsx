import React, { useState } from 'react';

export default function Home({ user = { name: 'יוסי כהן', phone: '050-1234567', role: 'לקוח' }, onLogout = () => {} }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header with Background Image */}
      <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 ">
        {/* Overlay Pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)'
        }}></div>
        
        {/* Header Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold mb-2 tracking-wide">Barbershop</h1>
          <p className="text-2xl mb-4 font-light">מספרה</p>
          <a href="tel:0545303032" className="flex items-center gap-2 text-lg bg-white bg-opacity-20 px-4 py-2 rounded-full">
            <span>📞</span>
            <span className="font-medium">0545303032</span>
          </a>
        </div>
        
        {/* Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="absolute top-4 right-4 z-20 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
        >
          {menuOpen ? (
            <span className="text-2xl">✕</span>
          ) : (
            <div className="space-y-1.5">
              <div className="w-6 h-0.5 bg-gray-800"></div>
              <div className="w-6 h-0.5 bg-gray-800"></div>
              <div className="w-6 h-0.5 bg-gray-800"></div>
            </div>
          )}
        </button>

        {/* User Menu Dropdown */}
        {menuOpen && (
          <div className="absolute top-20 right-4 w-72 bg-white rounded-2xl shadow-2xl p-5 z-30 border border-gray-100">
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">שם משתמש</p>
                  <p className="font-bold text-gray-800 text-lg">{user.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📱</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">מספר טלפון</p>
                  <p className="font-bold text-gray-800 text-lg">{user.phone}</p>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold transition-colors shadow-md hover:shadow-lg"
              >
                התנתק מהמערכת
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Logo Circle - Overlapping Header */}
      <div className="flex justify-center -mt-20 mb-6 relative z-10">
        <div className="w-36 h-36 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-white">
          <div className="text-center">
            <span className="text-5xl block mb-1">✂️</span>
            <span className="text-xs text-gray-600 font-semibold">RON BAR</span>
          </div>
        </div>
      </div>

      {/* Opening Hours Badge */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-full px-6 py-3 shadow-md flex items-center gap-2 border border-gray-200">
          <span className="text-xl">🕐</span>
          <span className="text-gray-800 font-semibold">פתוח עד 20:00</span>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="px-4 mb-8">
        <div className="flex justify-center gap-3 flex-wrap">
          <a href="#" className="w-14 h-14 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg border border-gray-200">
            <span className="text-2xl">🌐</span>
          </a>
          <a href="#" className="w-14 h-14 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg border border-gray-200">
            <span className="text-2xl">💬</span>
          </a>
          <a href="#" className="w-14 h-14 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg border border-gray-200">
            <span className="text-2xl">📱</span>
          </a>
          <a href="#" className="w-14 h-14 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg border border-gray-200">
            <span className="text-2xl">🎵</span>
          </a>
          <a href="#" className="w-14 h-14 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg border border-gray-200">
            <span className="text-2xl">📷</span>
          </a>
          <a href="#" className="w-14 h-14 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg border border-gray-200">
            <span className="text-2xl">👍</span>
          </a>
        </div>
      </div>

      {/* Main CTA Button */}
      <div className="px-6 mb-10">
        <button className="w-full bg-green-500 hover:bg-green-600 text-white py-5 rounded-full font-bold text-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
          קביעת תור
        </button>
      </div>

      {/* Photo Gallery */}
      <div className="px-4 mb-10">
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
            <div key={num} className="aspect-square bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-4xl text-gray-400">💈</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Information Cards */}
      <div className="px-4 mb-24 space-y-6">
        {/* Opening Hours Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🕐</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">שעות פעילות</h3>
          </div>
          <div className="space-y-3">
            {[
              { day: 'ראשון', hours: '08:00 - 20:00' },
              { day: 'שני', hours: '08:00 - 20:00' },
              { day: 'שלישי', hours: '08:00 - 20:00' },
              { day: 'רביעי', hours: '08:00 - 20:00' },
              { day: 'חמישי', hours: '08:00 - 20:00' },
              { day: 'שישי', hours: '08:00 - 14:00' },
              { day: 'שבת', hours: 'סגור', closed: true }
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                <span className="text-gray-700 font-medium text-lg">{item.day}</span>
                <span className={`font-bold text-lg ${item.closed ? 'text-red-500' : 'text-gray-900'}`}>
                  {item.hours}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-200">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">מחירון</h3>
          </div>
          <div className="space-y-3">
            {[
              { service: 'תספורת ילדים', price: '50₪', emoji: '👶' },
              { service: 'תספורת מבוגרים', price: '80₪', emoji: '👨' },
              { service: 'תספורת + זקן', price: '100₪', emoji: '🧔' },
              { service: 'עיצוב זקן', price: '40₪', emoji: '💈' },
              { service: 'צביעה', price: '120₪', emoji: '🎨' }
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center py-4 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="text-gray-700 font-medium text-lg">{item.service}</span>
                </div>
                <span className="text-gray-900 font-bold text-xl">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-40">
        <div className="flex justify-around items-center py-2 max-w-lg mx-auto">
          <button className="flex flex-col items-center gap-1 px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors flex-1">
            <span className="text-2xl">📅</span>
            <span className="text-xs text-gray-600 font-medium">התורים שלי</span>
          </button>
          <button className="flex flex-col items-center gap-1 px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors flex-1">
            <span className="text-2xl">🏠</span>
            <span className="text-xs text-gray-600 font-medium">שעות פתיחה</span>
          </button>
          <button className="flex flex-col items-center gap-1 px-4 py-3 bg-green-50 rounded-xl flex-1">
            <span className="text-2xl">💚</span>
            <span className="text-xs text-green-600 font-bold">קצת עלינו</span>
          </button>
        </div>
      </div>
    </div>
  );
}