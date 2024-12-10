import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import ShopPage from "./pages/shop/ShopPage";
import EventPage from "./pages/EventPage/EventPage";
import LoginRegister from "./features/auth/LoginRegister";
import Navbar from "./components/Navbar";
import Run from "./pages/run/Run";
import PrivateRoute from "./features/auth/PrivateRoute";
import ProfilePage from "./pages/profile/ProfilePage";
import CreateEventPage from "./pages/EventPage/CreateEventPage";

function App() {
    const [value, setValue] = useState(0);

    const handleNavChange = (newValue) => {
        setValue(newValue);
    };

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
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/events" element={<EventPage />} />
                <Route path="/run" element={<Run />} />
                <Route path="/create-event" element={<CreateEventPage />} />
            </Routes>
            <Navbar value={value} onChange={handleNavChange} />
        </Router>
    );
}

export default App;
