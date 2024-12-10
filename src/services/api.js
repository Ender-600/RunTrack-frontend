import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // 根据你的后端地址调整

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

export default api;


export const updateUserProfile = async (email, userData) => {
  try {
    const response = await api.put(`/api/users/profile?email=${email}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};


export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/api/users/login", null, {
      params: { email, password }, // 将 email 和 password 作为查询参数发送
    });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};


// 注册请求
export const registerUser = async (userData) => {
  const response = await api.post('/api/users/register', userData);
  return response.data;
};

export const getUserProfile = async (email) => {
  try {
    const response = await api.get(`/api/users/profile?email=${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

