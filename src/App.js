import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import LoginRegister from "./features/auth/LoginRegister";
import Navbar from "./components/Navbar";
import PrivateRoute from "./features/auth/PrivateRoute";
import ShopPage from "./pages/shop/ShopPage";
import Run from "./pages/run/Run";
import EventPage from "./pages/EventPage/EventPage";
import CreateEventPage from "./pages/CreateEventPage";


function App() {
  const [value, setValue] = React.useState(0);
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<ShopPage />}/>
        <Route path="/login" element={<LoginRegister />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <h1>Profile</h1>
            </PrivateRoute>
          }
        />
        <Route
          path="/run"
          element={<Run/>}
        />
        <Route path="/events" element={<EventPage />} />
        <Route path="/create-event" element={<CreateEventPage />} />
      </Routes>
      <Navbar value={value} onChange={setValue} />
    </Router>
  );
}

export default App;
