import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { getUserProfile, updateUserProfile } from '../../services/api';

const ProfilePage = ({ userId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const data = await getUserProfile(userId);
                setUserData(data);
            } catch (error) {
                console.error("Failed to fetch user profile:", error);
            }
        };

        fetchUserProfile();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            const updatedData = await updateUserProfile(userId, userData);
            setUserData(updatedData);
            setIsEditing(false);
            alert('Profile updated successfully');
        } catch (error) {
            console.error("Failed to update user profile:", error);
            alert('Failed to update profile');
        }
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Profile
            </Typography>
            {['firstName', 'lastName', 'email', 'phoneNumber', 'password'].map((field) => (
                <TextField
                    key={field}
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    name={field}
                    type={field === 'password' ? 'password' : 'text'}
                    value={userData[field]}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        readOnly: !isEditing,
                    }}
                />
            ))}
            <Button
                variant="contained"
                color="primary"
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                sx={{ mt: 2 }}
            >
                {isEditing ? 'Save' : 'Edit Profile'}
            </Button>
        </Box>
    );
};

export default ProfilePage;
