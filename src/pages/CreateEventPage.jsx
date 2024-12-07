import React, { useState } from "react";

const CreateEventPage = () => {
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");

  const userId = "8b6ad701-ef1f-405e-8366-ad0a99344559"; 

  const handleCreateEvent = async () => {
    if (!city || !date) {
      alert("Please fill in both the city name and date!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city, date, userId }),
      });

      if (response.ok) {
        alert("Event created successfully!");
        setCity("");
        setDate("");
        window.location.href = "/events";
      } else {
        const errorData = await response.json();
        alert(`Failed to create event: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("An error occurred while creating the event.");
    }
  };


  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Create Event</h1>
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          City Name:
        </label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Event Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </div>
      <button
        onClick={handleCreateEvent}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Create Event
      </button>
    </div>
  );
};

export default CreateEventPage;
