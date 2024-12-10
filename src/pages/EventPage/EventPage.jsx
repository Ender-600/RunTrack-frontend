import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EventPage = () => {
  const [city, setCity] = useState(""); // State to store the city name
  const [fetchedEvents, setFetchedEvents] = useState([]); // State to store fetched events
  const navigate = useNavigate();

  const handleCreateEvent = () => {
    navigate("/create-event");
  };

  const handleShowEvents = async () => {
    if (!city.trim()) { // Trim to avoid spaces-only input
      alert("Please enter a city name!");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8080/events/city?city=${encodeURIComponent(city.trim())}`);
      if (!response.ok) {
        // Attempt to retrieve error details from the server
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
    <div style={{ padding: "20px" }}>
      <h1>Events</h1>
      <p>Discover events happening near you!</p>

      {/* Create Event Button */}
      <button
        onClick={handleCreateEvent}
        style={{
          padding: "10px 20px",
          margin: "10px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Create Event
      </button>

      {/* Show Events by City */}
      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button
          onClick={handleShowEvents}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Show Events
        </button>
      </div>

      {/* Render Fetched Events */}
      <div style={{ marginTop: "20px" }}>
        {fetchedEvents.length > 0 ? (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {fetchedEvents.map((event) => (
              <li
                key={event.eventId} // Ensure eventId is unique
                style={{
                  marginBottom: "20px",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              >
                {/* Updated to use 'location' instead of 'city' */}
                <h3>Event in {event.city}</h3>
                <p>
                  <strong>Location:</strong> {event.city}
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
