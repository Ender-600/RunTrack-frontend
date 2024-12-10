import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../services/api"; // 使用刚定义的函数

export default function LoginRegister() {
  const [tab, setTab] = useState(0); // 0 = Login, 1 = Register
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    setFormData({
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      phoneNumber: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (tab === 0) {
        // 登录逻辑
        const { email, password } = formData;
        const response = await loginUser(email, password);

        // 检查响应是否正确
        if (response.status === 200 && response.data.email) {
          alert(response.data.message || "Login successful");
          localStorage.setItem("email", response.data.email); // 保存 email
          navigate("/profile"); // 跳转到 Profile 页面
        } else {
          alert("Invalid server response");
        }
      } else {
        // 注册逻辑
        const { firstName, lastName, email, phoneNumber, password } = formData;
        const response = await registerUser({ firstName, lastName, email, phoneNumber, password });

        if (response.status === 200) {
          alert(response.data.message || "Register successful");
          setTab(0); // 切换到登录页面
        } else {
          alert("Invalid server response");
        }
      }
    } catch (error) {
      if (error.response) {
        // 显示后端返回的错误信息
        alert(error.response.data.message || "Error occurred");
      } else {
        // 网络错误或其他问题
        alert("An error occurred. Please check your network connection.");
      }
    }
  };



  return (
      <Paper
          elevation={3}
          style={{
            padding: "20px",
            maxWidth: "400px",
            margin: "auto",
            marginTop: "50px",
          }}
      >
        <Tabs
            value={tab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        <Box mt={3}>
          {tab === 1 && (
              <>
                <TextField
                    label="First Name"
                    name="firstName"
                    fullWidth
                    margin="normal"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Last Name"
                    name="lastName"
                    fullWidth
                    margin="normal"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    fullWidth
                    margin="normal"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    fullWidth
                    margin="normal"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />
              </>
          )}

          {tab === 0 && (
              <>
                <TextField
                    label="Email"
                    name="email"
                    fullWidth
                    margin="normal"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
              </>
          )}

          <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              required
          />

          <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              style={{ marginTop: "20px" }}
          >
            {tab === 0 ? "Login" : "Register"}
          </Button>
        </Box>
      </Paper>
  );
}
