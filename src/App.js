import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import LoginRegister from "./features/auth/LoginRegister";
import Navbar from "./components/Navbar";
import PrivateRoute from "./features/auth/PrivateRoute";
import ProfilePage from "./pages/profile/ProfilePage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginRegister />} />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <ProfilePage />
                        </PrivateRoute>
                    }
                />
                <Route path="/home" element={<Home />} />
            </Routes>
            <Navbar />
        </Router>
    );
}

export default App;
