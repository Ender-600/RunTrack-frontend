import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // 根据你的后端地址调整

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

export default api;


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

export const getUserById = async (userId) => {
  console.log("Fetching userssssss...");
  const response = await api.get(`/api/users/${userId}`);
  console.log(response);
  return response.data;
};

export const updateUserProfile = async (userId, userData) => {
  console.log("UserData:", userData);
  const response = await api.put(`/api/users/${userId}`, userData);
  return response.data;
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/api/users/${userId}`);
    console.log("User deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};