// config.js
const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';

export const API_URL = isLocal 
  ? 'http://localhost:3000' 
  : 'https://backend-asistencia-3yb4.onrender.com'; // cambia por el tuyo real
