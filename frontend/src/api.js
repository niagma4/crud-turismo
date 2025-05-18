import axios from 'axios';

// Configuración base para axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export default api;