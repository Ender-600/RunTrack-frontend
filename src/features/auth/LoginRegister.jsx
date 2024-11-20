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
  const [tab, setTab] = useState(0);
  const [formData, setFormData] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    setFormData({
      userId: "",
      firstName: "",
      lastName: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const url = tab === 0 ? "/api/auth/login" : "/api/auth/register";

    try {
      const response = await api.post(url, formData);
      alert(response.data.message || "Success");

      if (tab === 0) {
        localStorage.setItem("userId", formData.userId); // 保存登录用户的 ID
      }

      navigate("/home");
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
        <TextField
          label="User ID"
          name="userId"
          fullWidth
          margin="normal"
          value={formData.userId}
          onChange={handleChange}
        />

        {tab === 1 && (
          <>
            <TextField
              label="First Name"
              name="firstName"
              fullWidth
              margin="normal"
              value={formData.firstName}
              onChange={handleChange}
            />
            <TextField
              label="Last Name"
              name="lastName"
              fullWidth
              margin="normal"
              value={formData.lastName}
              onChange={handleChange}
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
