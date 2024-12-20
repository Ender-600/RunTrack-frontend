import React from "react";
import { Grid, Paper, Typography } from "@mui/material";

export default function StatsCards({ stats }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6">Total Distance</Typography>
          <Typography variant="h4">
            {typeof stats.totalDistance === "number" ? stats.totalDistance.toFixed(2) : "0.00"} km
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6">Total Time</Typography>
          <Typography variant="h4">
            {typeof stats.totalTime === "number" ? stats.totalTime.toFixed(2) : "0.00"} hrs
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6">Calories Burned</Typography>
          <Typography variant="h4">
            {typeof stats.totalCalories === "number" ? stats.totalCalories.toFixed(0) : "0"} kcal
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
