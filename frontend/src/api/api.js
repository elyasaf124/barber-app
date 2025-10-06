import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

// ברברים
export const getBarbers = () => axios.get(`${API_BASE}/barbers`);
export const getBarber = (id) => axios.get(`${API_BASE}/barbers/${id}`);

// OTP
export const requestOTP = (phone) => axios.post(`${API_BASE}/otp/request`, { phone });
export const verifyOTP = (phone, otp, deviceId = null, remember = true) =>
  axios.post(`${API_BASE}/otp/verify`, { phone, otp, deviceId, remember });

// הרשמה
export const registerUser = (phone, fullName, role = 'user', deviceId = null, remember = true) =>
  axios.post(`${API_BASE}/admin/register`, { phone, fullName, role, deviceId, remember });

// תורים
export const createAppointment = (data) => axios.post(`${API_BASE}/appointments`, data);
export const getAppointments = (token) =>
  axios.get(`${API_BASE}/appointments`, { headers: { Authorization: `Bearer ${token}` } });
export const cancelAppointment = (id, token) =>
  axios.post(`${API_BASE}/appointments/${id}/cancel`, {}, { headers: { Authorization: `Bearer ${token}` } });

// הודעות
export const getMessages = (scope, id) => axios.get(`${API_BASE}/messages?scope=${scope}&id=${id}`);
