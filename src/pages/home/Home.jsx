import React, { useEffect, useState } from "react";
import { Box, Typography, Grid2 as Grid, Container, Paper } from "@mui/material";
import StatsCards from "./StatsCards";
//import axios from "../../services/api";
import axios from "axios";
import { Line } from "react-chartjs-2";

export default function Home() {
    const [weeklyStats, setWeeklyStats] = useState(null);
    const userId = localStorage.getItem("userId"); // 从 Local Storage 获取用户 ID
  
    useEffect(() => {
      axios
        .get(`/api/run-sessions/user/${userId}/all-stats`)
        .then((response) => setWeeklyStats(response.data))
        .catch((error) => console.error("Error fetching stats:", error));
    }, [userId]);
  
    if (!weeklyStats) {
      return <Typography>Loading...</Typography>;
    }
  
    return (
      <Container>
        <Typography variant="h4" sx={{ my: 4, textAlign: "center" }}>
          Welcome Back!
        </Typography>
        <StatsCards stats={weeklyStats} />
  
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Weekly Summary</Typography>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="body1">
              Total Distance: {weeklyStats.totalDistance || 0} km
            </Typography>
            <Typography variant="body1">
              Total Time: {weeklyStats.totalTime || 0} hours
            </Typography>
            <Typography variant="body1">
              Calories Burned: {weeklyStats.caloriesBurned || 0} kcal
            </Typography>
          </Paper>
        </Box>
      </Container>
    );
  }