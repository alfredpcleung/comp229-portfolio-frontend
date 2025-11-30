import axios from 'axios';

// This sets up a reusable Axios client for your backend
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://comp229-portfolio-backend-etmg.onrender.com',
  headers: { 'Content-Type': 'application/json' },
});

export default api;