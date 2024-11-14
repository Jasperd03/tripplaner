import React, { useState } from 'react';
import axios from 'axios';
import './TripForm.css';

function TripForm() {
  const [trip, setTrip] = useState({
    name: '',
    destination: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrip(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5004/trips', trip)  // Ensure the port matches your server's port
      .then(response => {
        console.log('Trip created:', response.data);
      })
      .catch(error => {
        console.error('There was an error creating the trip!', error);
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={trip.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Destination:</label>
          <input type="text" name="destination" value={trip.destination} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Start Date:</label>
          <input type="date" name="startDate" value={trip.startDate} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>End Date:</label>
          <input type="date" name="endDate" value={trip.endDate} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea name="description" value={trip.description} onChange={handleChange} required></textarea>
        </div>
        <button type="submit">Add Trip</button>
      </form>
    </div>
  );
}

export default TripForm;
