import React, { useEffect, useState } from 'react';
import LoginPage from './pages/auth/LoginPage';
import VerifyPage from './pages/auth/VerifyPage';
import RegisterPage from './pages/auth/RegisterPage';
import Home from './pages/Home'; // דף הבית שלך

export default function App() {
  const [page, setPage] = useState('login');
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setPage('home');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setPage('login');
  };

  if (user) return <Home user={user} onLogout={handleLogout} />;

  if (page === 'login') {
    return <LoginPage onCodeSent={(p) => { setPhone(p); setPage('verify'); }} />;
  }
  if (page === 'verify') {
    return (
      <VerifyPage
        phone={phone}
        onVerified={(u, token) => {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(u));
          setUser(u);
          setPage('home');
        }}
        onNewUser={() => setPage('register')}
      />
    );
  }
  if (page === 'register') {
    return <RegisterPage phone={phone} onRegistered={(u, token) => {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(u));
      setUser(u);
      setPage('home');
    }} />;
  }

  return null;
}
