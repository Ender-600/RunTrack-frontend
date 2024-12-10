import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // 用于路由跳转
import { getUserProfile } from "../../services/api";

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const email = localStorage.getItem("email");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getUserProfile(email); // 使用 email 获取用户数据
                setUserData(data);
            } catch (error) {
                console.error("Failed to fetch user profile:", error);
            }
        };
        fetchProfile();
    }, [email]);

    const handleSave = async () => {
        try {
            // 保存更新的用户数据
            alert("Profile updated successfully");
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update user profile:", error);
            alert("Failed to update profile");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("email"); // 清除登录状态
        navigate("/login"); // 跳转回登录页面
    };

    if (!userData) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Profile
            </Typography>
            {["firstName", "lastName", "email", "phoneNumber"].map((field) => (
                <TextField
                    key={field}
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    name={field}
                    value={userData[field]}
                    onChange={(e) =>
                        setUserData({ ...userData, [field]: e.target.value })
                    }
                    fullWidth
                    margin="normal"
                    InputProps={{
                        readOnly: !isEditing,
                    }}
                />
            ))}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={isEditing ? handleSave : () => setIsEditing(true)}
                >
                    {isEditing ? "Save" : "Edit Profile"}
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Box>
        </Box>
    );
};

export default ProfilePage;
