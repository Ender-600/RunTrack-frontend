import React from "react";
import { useNavigate } from "react-router-dom"; // 用于路由跳转
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EventIcon from "@mui/icons-material/Event";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun"; // 跑步图标

const Navbar = ({ value, onChange }) => {
  const navigate = useNavigate(); // 路由跳转

  const handleNavigation = (newValue) => {
    onChange(newValue);
    switch (newValue) {
      case 0:
        navigate("/home"); // 跳转到主页
        break;
      case 1:
        navigate("/run"); // 跳转到跑步页面
        break;
      case 2:
        navigate("/shop"); // 跳转到购物车页面
        break;
      case 3:
        navigate("/events"); // Navigate to the Events page
        break;
      case 4:
        navigate("/profile"); // 跳转到个人页面
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
