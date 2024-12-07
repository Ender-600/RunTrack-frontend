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
import api from "../../services/api"; // 导入 api 实例

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
    const url = tab === 0 ? "/api/auth/login" : "/api/auth/register";

    // 发送表单数据到后端
    try {
      const requestData =
          tab === 0
              ? { firstName: formData.firstName, lastName: formData.lastName, password: formData.password }
              : formData;

      const response = await api.post(url, requestData);
      alert(response.data.message || "Success");

      if (tab === 0) {
        localStorage.setItem("userId", response.data.userId); // 保存登录用户的 ID
        navigate("/home");
      } else {
        setTab(0); // 注册成功后切换到登录页面
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message || "Error occurred");
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
