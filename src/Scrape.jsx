// ScrapedData.jsx
import React, { useState, useEffect } from 'react';

function ScrapedData() {
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/scrape')
      .then(response => response.text())
      .then(data => {
        setHtml(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.toString());
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Scraped HTML:</h2>
      <pre>{html}</pre>
    </div>
  );
}

export default ScrapedData;