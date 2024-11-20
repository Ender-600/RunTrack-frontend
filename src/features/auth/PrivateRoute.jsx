import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem("user"); // 假设登录后存储用户信息
  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
