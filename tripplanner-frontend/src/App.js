import React from 'react';
import './App.css';
import TripList from './components/TripList';
import TripForm from './components/TripForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Trip Planner</h1>
      </header>
      <TripForm />
      <TripList />
    </div>
  );
}

export default App;
