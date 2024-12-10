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
      if (tab === 0) { // Login logic
        const { email, password } = formData;
        if (!email || !password) {
          alert("Please enter both email and password.");
          return;
        }
        const data = await loginUser(email, password); // 调用 loginUser API
        alert(data.message || "Login successful");
        localStorage.setItem("email", email); // 将 email 存储到 localStorage
        navigate("/profile"); // 登录成功后跳转到 profile 页面
      } else { // Register logic
        const { firstName, lastName, email, phoneNumber, password } = formData;
        const data = await registerUser({ firstName, lastName, email, phoneNumber, password });
        alert(data.message || "Register successful");
        setTab(0); // 注册成功后切换到登录 tab
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message || "An error occurred");
      } else {
        alert("An error occurred. Please try again.");
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
