import React, { useEffect, useState } from "react";
import { 
    Box, 
    TextField, 
    Button, 
    Typography, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUserById, updateUserProfile, deleteUser } from "../../services/api";

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId"); // 从 localStorage 获取 userId

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getUserById(userId);
                setUserData(data);
            } catch (error) {
                console.error("Failed to fetch user profile:", error);
            }
        };
        fetchProfile();
    }, [userId]);

    const handleSave = async () => {
        try {
            await updateUserProfile(userId, userData);
            alert("Profile updated successfully");
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update user profile:", error);
            alert("Failed to update profile");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("userId");
        navigate("/login");
    };

    const handleDeleteUser = async () => {
        try {
            await deleteUser(userId);
            alert("User deleted successfully");
            localStorage.removeItem("userId");
            navigate("/login");
        } catch (error) {
            console.error("Failed to delete user:", error);
            alert("Failed to delete user");
        }
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
                    value={userData[field] || ""}
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
                <Box>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => setOpenLogoutDialog(true)}
                        sx={{ mr: 2 }}
                    >
                        Logout
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => setOpenDeleteDialog(true)}
                    >
                        Delete User
                    </Button>
                </Box>
            </Box>

            {/* 确认注销的弹窗 */}
            <Dialog open={openLogoutDialog} onClose={() => setOpenLogoutDialog(false)}>
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to log out? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenLogoutDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleLogout} color="secondary">
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>

            {/* 确认删除用户的弹窗 */}
            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Confirm Delete User</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete your account? This action cannot be undone and you will lose all your data.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteUser} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProfilePage;
