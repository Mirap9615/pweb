import React, { useState } from 'react';
import './MALUserSearch.css'

// design architecture:
// section 1: basic info
// profile pic, username, join date, mean score and then days watched, and THEN a visually distinct div that contains # watching, # completed, # on hold, # dropped, # plan to watch, # total entries, and # episodes. That's 7 items, so we can potentially do a 3 3 1 layout (where it's n elements per row). 
// section 2: favorites
// anime, manga, characters, people, companies, with graceful handling, row-based architecture and failsafe 
// a design dilemma: MAL itself displays the images in rows, but I want to also include the names, which means it is unrealistic to include more than a few anime per row. Maybe we can just do what mal does and make it display more information on hover. 
function MALUserSearch() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      console.log(data);
      setUserData(data);
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  const FavoriteItem = ({ item, type }) => (
    <div className="favorite-item">
      <img src={item.imageUrl} alt={item.title} />
      <div className="favorite-info">
        <h4>{item.title}</h4>
        {type === 'anime' || type === 'manga' ? (
          <>
            <p>{item.type}</p>
            <p>{item.year}</p>
          </>
        ) : type === 'characters' ? (
          <p>{item.from}</p>
        ) : null}
      </div>
    </div>
  );
  
  const FavoritesSection = ({ title, items, type }) => (
    <div className="favorites-section">
      <h3>{title}</h3>
      {items && items.length > 0 ? (
        <div className="favorites-grid">
          {items.map((item, index) => (
            <FavoriteItem key={index} item={item} type={type} />
          ))}
        </div>
      ) : (
        <p>No {title.toLowerCase()} found</p>
      )}
    </div>
  );

  return (
    <div>
      <div className="form-container-MAL">
        <form onSubmit={handleSubmit} className="search">
            <div className="form-group">
                <label>Search MAL Profile</label>
                <input
                    type="text"
                    placeholder="Enter MAL username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="form-input"
                />
            </div>
            <button type="submit" className="form-button">Search</button>
        </form>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {userData && (
        <div>
          <div className="profile-section-one">
            <div className="profile-header">
              <img 
                src={userData.profileData.profileImageUrl} 
                alt={`${userData.profileData.username}'s profile picture`} 
                className="profile-image"
              />
              <div className="profile-info">
                <h2>{userData.profileData.username}'s Profile</h2>
                <p>Joined: {userData.profileData.joinDate}</p>
                <p>Last Online: {userData.profileData.lastOnline}</p>
                <p>Mean Score: {userData.profileData.animeStats.meanScore}</p>
                <p>Days Watched: {userData.profileData.animeStats.daysWatched}</p>
              </div>
            </div>
      
            <div className="anime-stats">
              <h3>Anime Stats</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-label">Watching</div>
                  <div className="stat-value">{userData.profileData.animeStats.watching}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Completed</div>
                  <div className="stat-value">{userData.profileData.animeStats.completed}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">On Hold</div>
                  <div className="stat-value">{userData.profileData.animeStats.onHold}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Dropped</div>
                  <div className="stat-value">{userData.profileData.animeStats.dropped}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Plan to Watch</div>
                  <div className="stat-value">{userData.profileData.animeStats.planToWatch}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Total Entries</div>
                  <div className="stat-value">{userData.profileData.animeStats.totalEntries}</div>
                </div>
                <div className="stat-item wide">
                  <div className="stat-label">Episodes</div>
                  <div className="stat-value">{userData.profileData.animeStats.episodes}</div>
                </div>
              </div>
            </div>
          </div>

<div className="user-favorites-section-two">
    <FavoritesSection 
      title="Favorite Anime" 
      items={userData.profileData?.favoriteAnime} 
      type="anime"
    />
    <FavoritesSection 
      title="Favorite Manga" 
      items={userData.profileData?.favoriteManga} 
      type="manga"
    />
    <FavoritesSection 
      title="Favorite Characters" 
      items={userData.profileData?.favoriteCharacters} 
      type="characters"
    />
    <FavoritesSection 
      title="Favorite People" 
      items={userData.profileData?.favoritePeople} 
      type="people"
    />
    <FavoritesSection 
      title="Favorite Companies" 
      items={userData.profileData?.favoriteCompanies} 
      type="companies"
    />
  </div>

          <h3>Completed Anime List</h3>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Score</th>
                <th>Type</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {userData.animeListData.map((anime, index) => (
                <tr key={index}>
                  <td>{anime.title}</td>
                  <td>{anime.score}</td>
                  <td>{anime.type}</td>
                  <td>{anime.progress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MALUserSearch;