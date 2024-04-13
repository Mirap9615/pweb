import React from 'react';
import './AniPage.css';
import Menu from './Menu.jsx';
import { useEffect } from 'react';


function AniPage() {
  // turning off background for this page
  useEffect(() => {
    document.body.classList.add('no-background');

    return () => {
      document.body.classList.remove('no-background');
    };
  }, []);

  return (
    <>
        <Menu/>
        <div className="AniPage">
            <div className="center">
                <img src="https://i.imgur.com/Gx5nP2q.jpg" alt="Banner" />
            </div>
      <div className="center">
        <blockquote>
          <p className="large pink">Character Enthusiast</p>
          <p className="medium orange">Spicy Wolf ▪️ </p>
          <p className="medium pinkish">Madoka Magica ▪️ </p>
          <p className="medium red">Heaven's Feel</p>
          <br></br>
          <p className="medium blue">Raildex ▪️ </p>
          <p className="medium green">Sound Euphonium ▪️ </p>
          <p className="medium purple">Re:Zero</p>
          <br></br>
          <p className="medium gold">Bookworm ▪️ </p>
          <p className="medium cyan">Average Abilities ▪️ </p>
          <p className="medium teal">CoTE</p>
        </blockquote>
      </div>
      <div className="center">
        <details>
          <summary>Favorite AniSongs</summary>
          {/* Example content, you can embed videos or links here */}
        </details>
      </div>
      <div className="center">
        <img src="https://i.imgur.com/s0dJUkH.jpg" alt="Footer Banner" />
      </div>
    </div>
    </>
  );
}

export default AniPage;