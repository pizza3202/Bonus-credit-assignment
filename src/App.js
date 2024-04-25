import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import backgroundImage from './image/jason-leung-Xaanw0s0pMk-unsplash.jpg';
function App() {
  const [fact, setFact] = useState('');
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fetchUselessFact = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
      setFact(response.data.text);
    } catch (error) {
      console.error('Error fetching random fact:', error);
      setFact('Failed to fetch a new fact. Please try again.');
    }
    setLoading(false);
  };
  const fetchGifs = async () => {
    if (!keyword.trim()) {
      setError('Input cannot be empty. Please enter a keyword.');
      setFact('');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=1OB7erHZUFbQUIfCLa8PoxzutQW0eQXr&q=${keyword}&limit=1`);
      if (response.data.data.length > 0) {
        const gifUrl = response.data.data[0].images.fixed_height.url;
        setFact(<img src={gifUrl} alt="GIF" />);
      } else {
        setError('No GIFs found. Try a different keyword.');
        setFact('');
      }
    } catch (error) {
      console.error('Error fetching GIF:', error);
      setError('Failed to fetch a GIF. Please try again.');
      setFact('');
    }
    setLoading(false);
  };
  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <div className="container">
        <h1>😆😆😆Random Fun Facts😆😆😆</h1>
        <section>
          <button onClick={fetchUselessFact} disabled={loading} className="fact-button get-useless-facts-button">
            {loading ? 'Fetching Fact...' : 'Get Useless Fact'}
          </button>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter a keyword for a GIF"
            className="keyword-input"
          />
          <button onClick={fetchGifs} disabled={loading} className="fact-button get-gif-button">
            {loading ? 'Searching...' : 'Search GIF'}
          </button>
        </section>
        <section className="fact-display output-text">
          {error && <div className="error-message">{error}</div>}
          {fact && !error && fact}
        </section>
      </div>
    </div>
  );
}
export default App;
