import React, { useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import axios from "axios";

const Run = () => {
  const [isRunning, setIsRunning] = useState(false);

  const handleStart = async () => {
    setIsRunning(true);

    try {
      const response = await axios.post("http://localhost:8080/events", {
        userId: localStorage.getItem("userId"),
        eventName: "Running Session",
        startTime: new Date().toISOString(),
      });

      alert(`Event created with ID: ${response.data.eventId}`);
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to start running session. Please try again.");
    }
  };

  return (
    <Box sx={{ textAlign: "center", marginTop: "20px" }}>
      <Typography variant="h4">Start Running</Typography>
      {!isRunning ? (
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4 }}
          onClick={handleStart}
        >
          Start
        </Button>
      ) : (
        <Typography variant="h6" color="green" sx={{ mt: 4 }}>
          Running in progress...
        </Typography>
      )}
    </Box>
  );
};

export default Run;
