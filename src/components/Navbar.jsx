import React from "react";
import { useNavigate } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EventIcon from "@mui/icons-material/Event";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";

const Navbar = ({ value, onChange }) => {
  const navigate = useNavigate();

  const handleNavigation = (newValue) => {
    onChange(newValue);
    switch (newValue) {
      case 0:
        navigate("/home");
        break;
      case 1:
        navigate("/run");
        break;
      case 2:
        navigate("/shop");
        break;
      case 3:
        navigate("/events");
        break;
      case 4:
        navigate("/profile");
        break;
      default:
        break;
    }
  };

  return (
      <BottomNavigation
          value={value}
          onChange={(event, newValue) => handleNavigation(newValue)}
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            boxShadow: "0px -2px 5px rgba(0, 0, 0, 0.1)",
          }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Run" icon={<DirectionsRunIcon />} />
        <BottomNavigationAction label="Cart" icon={<ShoppingCartIcon />} />
        <BottomNavigationAction label="Events" icon={<EventIcon />} />
        <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
      </BottomNavigation>
  );
};

export default Navbar;
