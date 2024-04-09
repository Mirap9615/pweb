import React, { useState, useEffect, useRef } from 'react';
import Menu from './Menu.jsx';
import ReviewedItem from './ReviewedItem.jsx';
import ReviewModal from './ReviewModal.jsx';
import './ReviewsMainMan.css'
import LycorisRecoilReviewIcon from './assets/reviewIcons/LycorisRecoilReviewIcon.jpeg';

function ReviewsMainMan() {
  const [expandedItem, setExpandedItem] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null); 


  const reviewedItems = [
    { id: 86, name: "Lycoris Recoil", score: 8.3, image: LycorisRecoilReviewIcon, finished: true, reviewsNotes: "Good show!" },
    { id: 170, name: "Oshi no Ko", score: 8.6, image: null, finished: true, reviewsNotes: "Good show!" },
    { id: 169, name: "The Vexations of a Shut-In Vampire Princess", score: 7.15, image: null, finished: true, reviewsNotes: "Good show!" },
    { id: 168, name: "Fullmetal Alchemist: Brotherhood", score: 9.1, image: null, finished: true, reviewsNotes: "Good show!" },
    { id: 167, name: "Jujutsu Kaisen", score: 8.4, image: null, finished: true, reviewsNotes: "Good show!" },
    { id: 166, name: "Magnus Bridge S2 Part 1", score: 8, image: null, finished: true, reviewsNotes: "Good show!" },
    { id: 164, name: "Goblin Slayer 2", score: 7.2, image: null, finished: true, reviewsNotes: "Good show!" },
    { id: 161, name: "Shingeki no Kyojin: The Final Season Part 2", score: 7.6, image: null, finished: true, reviewsNotes: "Good show!" },
    { id: 155, name: "Fate/kaleid liner Prisma Illya 3rei!!", score: 7.75, image: null, finished: true, reviewsNotes: "Good show!" },
    { id: 150, name: "Maoujou de Oyasumi", score: 7.5, image: null, finished: true, reviewsNotes: "Good show!" },
    { id: 149, name: "Machikado Mazoku", score: 7.3, image: null, finished: true, reviewsNotes: "Good show!" },
    { id: 148, name: "Jahy-sama wa Kujikenai!", score: 0, image: null, finished: true, reviewsNotes: "Bad show!" },
    { id: 147, name: "Mahoutsukai no Yome", score: 8.4, image: null, finished: true, reviewsNotes: "Good show!" },
    { id: 146, name: "Level 1 Demon Lord and One Room Hero", score: 7.3, image: null, finished: true, reviewsNotes: "Good show!" },
    { id: 145, name: "The Duke of Death and His Maid", score: 6.4, image: null, finished: true, reviewsNotes: "Bad show!" },
    { id: 301, name: "Whispers of the Ancient Forest", score: 8.2, image: null, finished: true, reviewsNotes: "Good show!" },
    { id: 302, name: "Echoes from the Silent Hills", score: 7.5, image: null, finished: true, reviewsNotes: "Good show!" },
    { id: 303, name: "The Chronicles of the Sea", score: 9.1, image: null, finished: true, reviewsNotes: "Good show!" },
    { id: 304, name: "Lost in the Starlight", score: 8.7, image: null, finished: true, reviewsNotes: "Good show!" },
    { id: 305, name: "Glimpses of the Past", score: 6.8, image: null, finished: true, reviewsNotes: "Good show!" },
    { id: 306, name: "Riddles of the Frozen Realm", score: 7.3, image: null, finished: true, reviewsNotes: "Good show!" },
    { id: 307, name: "Shadows Over the Moon", score: 5.9, image: null, finished: true, reviewsNotes: "Bad show!" },
    { id: 308, name: "Tales of the Forgotten", score: 6.2, image: null, finished: true, reviewsNotes: "Bad show!" },
    { id: 309, name: "Mysteries of the Desert", score: 8.9, image: null, finished: true, reviewsNotes: "Good show!" },
    { id: 310, name: "Legends of the Ancient City", score: 9.4, image: null, finished: true, reviewsNotes: "Good show!" },
    { id: 311, name: "Secrets of the Deep Ocean", score: 7.7, image: null, finished: true, reviewsNotes: "Good show!" },
    { id: 312, name: "Whispering Winds", score: 5.4, image: null, finished: true, reviewsNotes: "Bad show!" },
    { id: 313, name: "Guardians of the Light", score: 9.9, image: null, finished: true, reviewsNotes: "Good show!" },
    { id: 314, name: "Echoes of Darkness", score: 4.6, image: null, finished: true, reviewsNotes: "Bad show!" },
    { id: 315, name: "Dance of the Fireflies", score: 8.0, image: null, finished: true, reviewsNotes: "Good show!" },
    { id: 316, name: "Rage Against the Storm", score: 6.1, image: null, finished: true, reviewsNotes: "Bad show!" },
    { id: 317, name: "Beneath the Frozen Sky", score: 7.9, image: null, finished: true, reviewsNotes: "Good show!" },
    { id: 318, name: "Journey Through the Mist", score: 8.4, image: null, finished: true, reviewsNotes: "Good show!" },
    { id: 319, name: "Chants of the Ancients", score: 7.0, image: null, finished: true, reviewsNotes: "Good show!" },
    { id: 320, name: "Silent Whispers of the Night", score: 5.8, image: null, finished: true, reviewsNotes: "Bad show!" },
  ];

  // Modals
  const expandItem = (item) => {
    setExpandedItem(item);
  };

  const closeModal = () => {
    setExpandedItem(null);
  };

  // Search 
  const handleSearchChange = (event) => {
    const userInput = event.target.value;
    setSearchInput(userInput);
    setSearchQuery(userInput.trim().toLowerCase()); 
  };

  const filteredItems = reviewedItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery)
  );

  // Sort By 
  const getSortedItems = (items, type) => {
    switch (type) {
      case 'score':
        return [...items].sort((a, b) => b.score - a.score); 
      case 'name':
        return [...items].sort((a, b) => a.name.localeCompare(b.name)); 
      default:
        return items;
    }
  };
  
  const handleSortOptionClick = (value) => {
    setSortType(value);
    setShowDropdown(false);
  };

  const sortOptions = {
    "": "None",
    "score": "Score",
    "name": "Name",
  };

  const sortedItems = getSortedItems(filteredItems, sortType);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };  

  // When the showDropdown constant of the sort-container div is shown, the useEffect adds an EventListener to the general registar
  // 'document' that calls handleClickOutside when a mousedown event is registered. When a mousedown event occurs, handleClickOutside
  // first shows setShowDropdown to false and then removes the EventListener. 
  useEffect(() => {
    // Function to detect clicks outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
  
    // Add event listener when dropdown is shown
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);
  

  return (
    <>
      <Menu />
      <div className="sticky-title">
        <h1>Welcome to M's Reviews!</h1>
      </div>
      
      <div className="search-and-sort">

      <div className="sort-container" ref={dropdownRef}>
        <button className="sort-button" onClick={() => setShowDropdown(!showDropdown)}>
          Sort By: {sortOptions[sortType]}
          </button>
          {showDropdown && (<div className="sort-dropdown">
            {Object.entries(sortOptions).map(([value, label]) => (
              <div key={value} className="sort-option" onClick={() => handleSortOptionClick(value)}>
                {label}
              </div>
            ))}
          </div>
        )}
      </div>

        <div className="search-container">
          <input
          type="text"
          placeholder="Search reviews..."
          value={searchInput}
          onChange={handleSearchChange}
          className="search-input" 
          />
        </div>
      </div>
     
      
      <div className="reviews-container">
        {sortedItems.map((item) => (
          <ReviewedItem
            key={item.id}
            name={item.name}
            score={item.score}
            image={item.image}
            finished={item.finished}
            reviewsNotes={item.reviewsNotes}
            onClick={() => expandItem(item)}
          />
        ))}
      </div>
      <ReviewModal item={expandedItem} onClose={closeModal} />
    </>
  );
}

export default ReviewsMainMan;
