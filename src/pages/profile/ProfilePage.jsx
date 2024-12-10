import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { getUserProfile, updateUserProfile } from "../../services/api";

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
    });

    useEffect(() => {
        const email = localStorage.getItem("email");
        if (!email) {
            console.error("User not logged in");
            return;
        }

        const fetchUserProfile = async () => {
            try {
                const data = await getUserProfile(email);
                setUserData(data);
            } catch (error) {
                console.error("Failed to fetch user profile:", error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            const updatedData = await updateUserProfile(userData.email, userData);
            setUserData(updatedData);
            setIsEditing(false);
            alert("Profile updated successfully");
        } catch (error) {
            console.error("Failed to update user profile:", error);
            alert("Failed to update profile");
        }
    };

    return (
        <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Profile
            </Typography>
            {["firstName", "lastName", "email", "phoneNumber", "password"].map(
                (field) => (
                    <TextField
                        key={field}
                        label={field.charAt(0).toUpperCase() + field.slice(1)}
                        name={field}
                        type={field === "password" ? "password" : "text"}
                        value={userData[field]}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputProps={{
                            readOnly: !isEditing || field === "email", // Email is non-editable
                        }}
                    />
                )
            )}
            <Button
                variant="contained"
                color="primary"
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                sx={{ mt: 2 }}
            >
                {isEditing ? "Save" : "Edit Profile"}
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                    localStorage.clear();
                    window.location.href = "/login";
                }}
                sx={{ mt: 2, ml: 2 }}
            >
                Logout
            </Button>
        </Box>
    );
};

export default ProfilePage;
