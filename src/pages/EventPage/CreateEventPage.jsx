import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EventPage = () => {
  const [city, setCity] = useState(""); // State to store the city name
  const [date, setDate] = useState(""); // State to store the event date
  const [fetchedEvents, setFetchedEvents] = useState([]); // State to store fetched events
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  // Handle creating a new event
  const handleCreateEvent = async () => {
    if (!city || !date) {
      alert("Please fill in both the city name and date!");
      return;
    }

    if (!userId || userId === "undefined") {
      alert("User ID is missing or invalid. Please log in again.");
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
        handleShowEvents(); // Refresh the event list after creation
      } else {
        const errorData = await response.json();
        alert(`Failed to create event: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("An error occurred while creating the event.");
    }
  };

  // Handle fetching events by city
  const handleShowEvents = async () => {
    if (!city.trim()) {
      alert("Please enter a city name!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/events/city?city=${encodeURIComponent(city.trim())}`);
      if (!response.ok) {
        const errorDetails = await response.text();
        console.error("Server Error Details:", errorDetails);
        throw new Error("Failed to fetch events");
      }
      const events = await response.json();
      if (events.length === 0) {
        alert("No events found for the given city.");
      } else {
        setFetchedEvents(events);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      alert("An error occurred while fetching events.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Events</h1>
      <p>Discover or create events happening near you!</p>

      {/* City and Date Inputs for Creating Event */}
      <div style={{ marginBottom: "20px" }}>
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
            marginBottom: "10px",
          }}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
        />
        <button
          onClick={handleCreateEvent}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          Create Event
        </button>
      </div>

      {/* Button to Show Events */}
      <button
        onClick={handleShowEvents}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Show Events
      </button>

      {/* Render Fetched Events */}
      <div style={{ marginTop: "20px" }}>
        {fetchedEvents.length > 0 ? (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {fetchedEvents.map((event) => (
              <li
                key={event.eventId}
                style={{
                  marginBottom: "20px",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              >
                <h3>Event in {event.location}</h3>
                <p>
                  <strong>Location:</strong> {event.location}
                </p>
                <p>
                  <strong>Date:</strong> {event.date}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No events found</p>
        )}
      </div>
    </div>
  );
};

export default EventPage;
