import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TripList.css';

function TripList() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5004/trips')  // Ensure the port matches your server's port
      .then(response => {
        setTrips(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the trips!', error);
      });
  }, []);

  return (
    <div className="list-container">
      <h2>All Trips</h2>
      <ul>
        {trips.map(trip => (
          <li key={trip._id} className="list-item">
            {trip.name} - {trip.destination}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TripList;
