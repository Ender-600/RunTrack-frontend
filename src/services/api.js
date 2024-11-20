import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // Spring Boot 后端地址

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default api;
