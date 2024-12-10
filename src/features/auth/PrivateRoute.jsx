import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('email'); // 检查 localStorage 是否有 email
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
