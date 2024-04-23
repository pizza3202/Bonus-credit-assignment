import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import backgroundImage from './image/jason-leung-Xaanw0s0pMk-unsplash.jpg';
function App() {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(false);
  const fetchUselessFact = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
      setFact(response.data.text);
    } catch (error) {
      console.error('Error fetching random fact:', error);
      setFact('Failed to fetch a new fact. Please try again.');
    }
    setLoading(false);
  };
  const fetchNumberFact = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://numbersapi.com/random/trivia');
      setFact(response.data);
    } catch (error) {
      console.error('Error fetching number fact:', error);
      setFact('Failed to fetch a new fact. Please try again.');
    }
    setLoading(false);
  };
  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <div className="container">
        <h1>😆😆😆Random Fun Facts😆😆😆</h1>
        <button onClick={fetchUselessFact} disabled={loading} className="fact-button get-useless-facts-button">
          {loading ? 'Fetching Fact...' : 'Get Useless Fact'}
        </button>
        <button onClick={fetchNumberFact} disabled={loading} className="fact-button get-number-fact-button">
          {loading ? 'Fetching Fact...' : 'Get Number Fact'}
        </button>
        <div className="fact-display output-text">{fact}</div>
      </div>
    </div>
  );
}
export default App;
