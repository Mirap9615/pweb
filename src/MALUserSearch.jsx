import React, { useState } from 'react';
import Menu from './Menu.jsx';
import './MALUserSearch.css';

function MALUserSearch() {
  const [username, setUsername] = useState('');
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/getUserAnimeList?username=${encodeURIComponent(username)}`);
      const data = await response.json();
      if (data && data.data) {
        setAnimeList(data.data);
      } else {
        setAnimeList([]);
      }
    } catch (error) {
      console.error('Error fetching anime list:', error);
      setAnimeList([]);
    }
    setLoading(false);
  };

  const AnimeRow = ({ anime }) => (
    <div className="anime-row">
      <img src={anime.node.main_picture.medium} alt={anime.node.title} className="anime-image" />
      <div className="anime-info">
        <h3>{anime.node.title}</h3>
        <p>Status: {anime.list_status.status}</p>
        <p>Score: {anime.list_status.score}</p>
        <p>Episodes Watched: {anime.list_status.num_watched_episodes}</p>
      </div>
    </div>
  );

  return (
    <>
      <Menu />
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter MAL username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} disabled={loading} className="search-button">
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>
      <div className="results-container">
        {animeList.length > 0 ? (
          animeList.map(anime => <AnimeRow key={anime.node.id} anime={anime} />)
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
}

export default MALUserSearch;
