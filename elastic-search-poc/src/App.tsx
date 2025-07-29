import React, { useState } from 'react';
import './App.css';

interface Hit {
  _id: string;
  _score: number;
  _source: {
    text?: string;
    [key: string]: unknown;
  };
}

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Hit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = process.env.REACT_APP_ES_API_URL;
    const apiKey = process.env.REACT_APP_ES_API_KEY;
    const index = process.env.REACT_APP_ES_INDEX;

    if (!url || !apiKey || !index) {
      setError('Missing Elastic search configuration');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${url.replace(/\/$/, '')}/${index}/_search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `ApiKey ${apiKey}`,
        },
        body: JSON.stringify({
          query: {
            match: {
              text: query,
            },
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      setResults(data.hits?.hits || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Elastic Search POC</h1>
      <form onSubmit={search} className="search-form">
        <input
          className="search-box"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" disabled={loading}>Search</button>
      </form>
      {error && <p className="error">{error}</p>}
      <ul className="results">
        {results.map((hit) => (
          <li key={hit._id} className="result-item">
            <span className="score">{hit._score.toFixed(2)}</span>
            <span className="text">{hit._source.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
