import React, { useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import axios from "axios";

const Run = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [eventId, setEventId] = useState(null); // 保存创建的事件ID

  // 开始运行的函数
  const handleStart = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User ID is missing or invalid. Please log in again.");
      return;
    }

    const city = prompt("Please enter the city for the running session:");
    const date = new Date().toISOString().split("T")[0];

    if (!city) {
      alert("City is required to start the running session.");
      return;
    }

    setIsRunning(true);

    try {
      const response = await axios.post("http://localhost:8080/events", {
        userId: userId,
        eventName: "Running Session",
        city: city,
        date: date,
        startTime: new Date().toISOString(),
      });

      setEventId(response.data.eventId); // 保存事件ID
      alert(`Event created with ID: ${response.data.eventId}`);
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to start running session. Please try again.");
      setIsRunning(false);
    }
  };

  // 停止运行的函数
  const handleStop = async () => {
    if (!eventId) {
      alert("No running session found to stop.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8080/events/${eventId}/stop`, {
        endTime: new Date().toISOString(),
      });

      alert(`Running session stopped. Duration: ${response.data.duration} minutes`);
      setIsRunning(false);
      setEventId(null);
    } catch (error) {
      console.error("Error stopping event:", error);
      alert("Failed to stop running session. Please try again.");
    }
  };

  return (
    <Box sx={{ textAlign: "center", marginTop: "20px" }}>
      <Typography variant="h4">Running Session</Typography>
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
        <>
          <Typography variant="h6" color="green" sx={{ mt: 4 }}>
            Running in progress...
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 4 }}
            onClick={handleStop}
          >
            Stop
          </Button>
        </>
      )}
    </Box>
  );
};

export default Run;
